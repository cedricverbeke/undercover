import { createClient } from "npm:@supabase/supabase-js@2.57.4";
import Stripe from "npm:stripe@17.3.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY") || "";
const STRIPE_WEBHOOK_SECRET = Deno.env.get("STRIPE_WEBHOOK_SECRET") || "";

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature || !STRIPE_WEBHOOK_SECRET || !STRIPE_SECRET_KEY) {
      return new Response(
        JSON.stringify({ error: "Webhook not configured" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const stripe = new Stripe(STRIPE_SECRET_KEY);
    const event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      STRIPE_WEBHOOK_SECRET
    );

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const deviceId = session.client_reference_id || session.metadata?.device_id;
      const purchaseType = session.metadata?.purchase_type as
        | "party_pass"
        | "lifetime"
        | undefined;

      const customerEmail =
        session.customer_details?.email ||
        (session.customer as string | undefined) ||
        session.metadata?.email ||
        null;

      if (deviceId && purchaseType) {
        const { data: existing } = await supabase
          .from("purchases")
          .select("id")
          .eq("device_id", deviceId)
          .eq("stripe_session_id", session.id)
          .maybeSingle();

        if (!existing) {
          await supabase.from("purchases").insert({
            device_id: deviceId,
            purchase_type: purchaseType,
            stripe_session_id: session.id,
            email: customerEmail,
            expires_at:
              purchaseType === "party_pass"
                ? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
                : null,
          });
        }
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
