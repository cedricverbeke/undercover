import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

interface ClaimRequest {
  token: string;
  deviceId: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { token, deviceId } = (await req.json()) as ClaimRequest;

    if (!token || !deviceId) {
      return new Response(
        JSON.stringify({ error: "Missing token or deviceId" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch the token row
    const { data: tokenRow, error: tokenError } = await supabase
      .from("restore_tokens")
      .select("id, token, email, purchase_type, expires_at, used")
      .eq("token", token)
      .maybeSingle();

    if (tokenError || !tokenRow) {
      return new Response(
        JSON.stringify({ error: "invalid_token" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (tokenRow.used) {
      return new Response(
        JSON.stringify({ error: "already_used" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (new Date(tokenRow.expires_at).getTime() < Date.now()) {
      return new Response(
        JSON.stringify({ error: "expired" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Mark the token as used BEFORE inserting the purchase to prevent re-use races
    const { error: markError } = await supabase
      .from("restore_tokens")
      .update({ used: true })
      .eq("id", tokenRow.id);

    if (markError) {
      return new Response(
        JSON.stringify({ error: "Failed to mark token" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const purchaseType = tokenRow.purchase_type as "party_pass" | "lifetime";

    // Check if this device already has an active purchase of the same type
    const { data: existingPurchases } = await supabase
      .from("purchases")
      .select("id, purchase_type, expires_at")
      .eq("device_id", deviceId)
      .order("created_at", { ascending: false });

    const now = Date.now();
    const alreadyHasLifetime = (existingPurchases || []).some(
      (p: { purchase_type: string }) => p.purchase_type === "lifetime"
    );
    const alreadyHasActivePartyPass = (existingPurchases || []).some(
      (p: { purchase_type: string; expires_at: string | null }) => {
        if (p.purchase_type !== "party_pass" || !p.expires_at) return false;
        return new Date(p.expires_at).getTime() > now;
      }
    );

    if (purchaseType === "lifetime" && alreadyHasLifetime) {
      return new Response(
        JSON.stringify({ restored: true, purchaseType, alreadyActive: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (purchaseType === "party_pass" && alreadyHasActivePartyPass) {
      return new Response(
        JSON.stringify({ restored: true, purchaseType, alreadyActive: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Insert the restored purchase for this device
    const { error: insertError } = await supabase.from("purchases").insert({
      device_id: deviceId,
      purchase_type: purchaseType,
      email: tokenRow.email,
      expires_at:
        purchaseType === "party_pass"
          ? new Date(now + 24 * 60 * 60 * 1000).toISOString()
          : null,
    });

    if (insertError) {
      return new Response(
        JSON.stringify({ error: "Failed to restore purchase" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ restored: true, purchaseType }),
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
