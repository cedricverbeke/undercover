import { createClient } from "npm:@supabase/supabase-js@2.57.4";
import Stripe from "npm:stripe@17.3.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY") || "";
const STRIPE_PRICE_PARTY_PASS = Deno.env.get("STRIPE_PRICE_PARTY_PASS") || "";
const STRIPE_PRICE_LIFETIME = Deno.env.get("STRIPE_PRICE_LIFETIME") || "";

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

interface CheckoutRequest {
  purchaseType: "party_pass" | "lifetime";
  deviceId: string;
  lang: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    if (!STRIPE_SECRET_KEY) {
      return new Response(
        JSON.stringify({ error: "Stripe not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { purchaseType, deviceId, lang } = (await req.json()) as CheckoutRequest;

    if (!purchaseType || !deviceId) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const stripe = new Stripe(STRIPE_SECRET_KEY);

    const priceId =
      purchaseType === "party_pass"
        ? STRIPE_PRICE_PARTY_PASS
        : STRIPE_PRICE_LIFETIME;

    if (!priceId) {
      return new Response(
        JSON.stringify({ error: "Price ID not configured for this product" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const origin = req.headers.get("origin") || "https://example.com";

    const session = await stripe.checkout.sessions.create({
      ui_mode: "hosted",
      mode: "payment",
      billing_address_collection: "auto",
      phone_number_collection: { enabled: false },
      automatic_tax: { enabled: false },
      allow_promotion_codes: false,
      submit_type: "auto",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/?success=true`,
      cancel_url: `${origin}/?canceled=true`,
      metadata: {
        device_id: deviceId,
        purchase_type: purchaseType,
        lang,
      },
      client_reference_id: deviceId,
    });

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    await supabase.from("purchases").insert({
      device_id: deviceId,
      purchase_type: purchaseType,
      stripe_session_id: session.id,
      expires_at:
        purchaseType === "party_pass"
          ? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
          : null,
    });

    return new Response(
      JSON.stringify({ url: session.url }),
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
