import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type PurchaseType = 'party_pass' | 'lifetime';

export interface PurchaseRecord {
  id: string;
  device_id: string;
  purchase_type: PurchaseType;
  stripe_session_id: string | null;
  expires_at: string | null;
  created_at: string;
}

export function getDeviceId(): string {
  const KEY = 'undercover_device_id';
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = 'dev_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem(KEY, id);
  }
  return id;
}

export async function fetchPurchases(deviceId: string): Promise<PurchaseRecord[]> {
  const { data, error } = await supabase
    .from('purchases')
    .select('*')
    .eq('device_id', deviceId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch purchases:', error);
    return [];
  }
  return (data || []) as PurchaseRecord[];
}

export interface PremiumState {
  hasLifetime: boolean;
  partyPassUntil: number | null;
}

export function computePremiumState(purchases: PurchaseRecord[]): PremiumState {
  const now = Date.now();
  const hasLifetime = purchases.some((p) => p.purchase_type === 'lifetime');
  const partyPass = purchases.find((p) => {
    if (p.purchase_type !== 'party_pass' || !p.expires_at) return false;
    return new Date(p.expires_at).getTime() > now;
  });
  const partyPassUntil = partyPass?.expires_at
    ? new Date(partyPass.expires_at).getTime()
    : null;
  return { hasLifetime, partyPassUntil };
}

export function isPremiumActive(state: PremiumState): boolean {
  return state.hasLifetime || (state.partyPassUntil !== null && state.partyPassUntil > Date.now());
}
