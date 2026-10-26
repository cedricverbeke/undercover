import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const resendApiKey = Deno.env.get("RESEND_API_KEY") || "";

const FROM_EMAIL = Deno.env.get("RESTORE_FROM_EMAIL") || "no-reply@resend.dev";

interface RestoreRequest {
  email: string;
  lang?: string;
}

const TOKEN_BYTES = 32;
const TOKEN_TTL_MINUTES = 10;

function generateToken(): string {
  const bytes = new Uint8Array(TOKEN_BYTES);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const SUBJECTS: Record<string, string> = {
  fr: "Restaurez votre achat Undercover",
  en: "Restore your Undercover purchase",
  es: "Restaura tu compra de Undercover",
  de: "Stelle deinen Undercover-Kauf wieder her",
  it: "Ripristina il tuo acquisto Undercover",
  pt: "Restaura a tua compra do Undercover",
};

const BODY_INTROS: Record<string, string> = {
  fr: "Cliquez sur le lien ci-dessous pour restaurer votre achat sur cet appareil. Ce lien est valable 10 minutes et ne peut être utilisé qu'une seule fois.",
  en: "Click the link below to restore your purchase on this device. This link is valid for 10 minutes and can only be used once.",
  es: "Haz clic en el enlace de abajo para restaurar tu compra en este dispositivo. Este enlace es válido durante 10 minutos y solo se puede usar una vez.",
  de: "Klicke auf den untenstehenden Link, um deinen Kauf auf diesem Gerät wiederherzustellen. Dieser Link ist 10 Minuten gültig und kann nur einmal verwendet werden.",
  it: "Clicca sul link qui sotto per ripristinare il tuo acquisto su questo dispositivo. Questo link è valido per 10 minuti e può essere usato una sola volta.",
  pt: "Clica no link abaixo para restaurar a tua compra neste dispositivo. Este link é válido por 10 minutos e só pode ser usado uma vez.",
};

const BUTTON_LABELS: Record<string, string> = {
  fr: "Restaurer mon achat",
  en: "Restore my purchase",
  es: "Restaurar mi compra",
  de: "Kauf wiederherstellen",
  it: "Ripristina acquisto",
  pt: "Restaurar compra",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { email, lang = "en" } = (await req.json()) as RestoreRequest;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Look up the most recent valid purchase for this email.
    // Prefer lifetime, then an unexpired party_pass.
    const { data: purchases, error: fetchError } = await supabase
      .from("purchases")
      .select("purchase_type, expires_at, created_at")
      .eq("email", email.toLowerCase())
      .order("created_at", { ascending: false });

    if (fetchError) {
      return new Response(
        JSON.stringify({ error: "Database error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!purchases || purchases.length === 0) {
      // Don't reveal whether the email exists — but still return success
      // to avoid email enumeration. We simply don't send an email.
      return new Response(
        JSON.stringify({ sent: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const now = Date.now();
    const lifetime = purchases.find(
      (p: { purchase_type: string }) => p.purchase_type === "lifetime"
    );
    const partyPass = purchases.find((p: { purchase_type: string; expires_at: string | null }) => {
      if (p.purchase_type !== "party_pass" || !p.expires_at) return false;
      return new Date(p.expires_at).getTime() > now;
    });

    const purchaseToRestore = lifetime || partyPass;

    if (!purchaseToRestore) {
      // No active purchase found — return success without sending.
      return new Response(
        JSON.stringify({ sent: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const token = generateToken();
    const expiresAt = new Date(now + TOKEN_TTL_MINUTES * 60 * 1000).toISOString();

    const { error: insertError } = await supabase.from("restore_tokens").insert({
      token,
      email: email.toLowerCase(),
      purchase_type: purchaseToRestore.purchase_type,
      expires_at: expiresAt,
    });

    if (insertError) {
      return new Response(
        JSON.stringify({ error: "Failed to create restore token" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!resendApiKey) {
      // Resend not configured — return the token in dev so the flow is testable.
      console.warn("RESEND_API_KEY not set — skipping email send");
      return new Response(
        JSON.stringify({ sent: true, dev_token: token }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Build the magic-link URL. The frontend reads ?restore=TOKEN
    const origin = req.headers.get("origin") || "https://example.com";
    const linkUrl = `${origin}/?restore=${token}`;

    const subject = SUBJECTS[lang] || SUBJECTS.en;
    const intro = BODY_INTROS[lang] || BODY_INTROS.en;
    const buttonLabel = BUTTON_LABELS[lang] || BUTTON_LABELS.en;

    const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0f172a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;min-height:100vh">
    <tr>
      <td align="center" style="padding:40px 20px">
        <table width="480" cellpadding="0" cellspacing="0" style="background:#1e293b;border-radius:16px;overflow:hidden">
          <tr>
            <td style="padding:32px 32px 8px 32px;text-align:center">
              <h1 style="color:#f8fafc;font-size:22px;margin:0 0 16px 0;font-weight:800">UNDERCOVER</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 24px 32px">
              <p style="color:#cbd5e1;font-size:15px;line-height:1.6;margin:0 0 24px 0">${escapeHtml(intro)}</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="${escapeHtml(linkUrl)}"
                       style="display:inline-block;background:#f59e0b;color:#0f172a;font-weight:700;font-size:16px;padding:14px 36px;border-radius:10px;text-decoration:none">
                      ${escapeHtml(buttonLabel)}
                    </a>
                  </td>
                </tr>
              </table>
              <p style="color:#64748b;font-size:13px;line-height:1.5;margin:24px 0 0 0">
                ${escapeHtml(linkUrl)}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: email,
        subject,
        html,
      }),
    });

    if (!resendResponse.ok) {
      const errText = await resendResponse.text();
      console.error("Resend API error:", errText);
      return new Response(
        JSON.stringify({ error: "Failed to send email" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ sent: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
