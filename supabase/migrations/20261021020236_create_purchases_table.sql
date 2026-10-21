/*
# Create purchases table for premium feature tracking

## Overview
Creates a `purchases` table to track Stripe payments for the Undercover game's
premium features. This is a no-auth app — purchases are tied to a device_id
stored in the browser's localStorage, not to a user account.

## New Tables
- `purchases`
  - `id` (uuid, primary key)
  - `device_id` (text, not null) — anonymous browser identifier stored in localStorage
  - `purchase_type` (text, not null) — either 'party_pass' or 'lifetime'
  - `stripe_session_id` (text, nullable) — Stripe checkout session ID for verification
  - `expires_at` (timestamptz, nullable) — for party_pass: when the 24h access expires; null for lifetime
  - `created_at` (timestamptz, default now())

## Indexes
- Index on `device_id` for fast lookups of a device's purchase history

## Security
- RLS enabled on `purchases`
- SELECT: anyone can read (the app needs to check purchase status via anon key)
- INSERT: anyone can insert (Stripe webhook writes purchase records)
- No UPDATE or DELETE policies — purchase records are immutable once created

## Important Notes
1. This is a single-tenant/no-auth app. The browser generates a random device_id
   stored in localStorage and sends it with purchase lookups.
2. The Stripe webhook edge function will INSERT rows here after successful payment.
3. Party pass rows have an `expires_at` 24 hours after purchase; lifetime rows have NULL.
*/
CREATE TABLE IF NOT EXISTS purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id text NOT NULL,
  purchase_type text NOT NULL CHECK (purchase_type IN ('party_pass', 'lifetime')),
  stripe_session_id text,
  expires_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_purchases_device_id ON purchases(device_id);

ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_purchases" ON purchases;
CREATE POLICY "anon_select_purchases"
ON purchases FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "anon_insert_purchases" ON purchases;
CREATE POLICY "anon_insert_purchases"
ON purchases FOR INSERT
TO anon, authenticated
WITH CHECK (true);
