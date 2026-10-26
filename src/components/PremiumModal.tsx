import { X, Check, Sparkles, Clock, Infinity as InfinityIcon, Lock, Mail, ArrowLeft, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Translation } from '@/game/i18n';
import type { PremiumState } from '@/lib/supabase';

type RestoreView = 'main' | 'email' | 'sent' | 'success' | 'error';

interface PremiumModalProps {
  onClose: () => void;
  onBuy: (type: 'party_pass' | 'lifetime') => void;
  onRestoreCurrent: () => void;
  onRequestRestoreEmail: (email: string) => Promise<void>;
  t: Translation;
  premiumState: PremiumState;
  loading: boolean;
  purchaseError: string | null;
  purchaseErrorLabel: string;
  restoreView: RestoreView;
  restoreError: string | null;
  onRestoreViewChange: (view: RestoreView) => void;
}

export function PremiumModal({
  onClose,
  onBuy,
  onRestoreCurrent,
  onRequestRestoreEmail,
  t,
  premiumState,
  loading,
  purchaseError,
  purchaseErrorLabel,
  restoreView,
  restoreError,
  onRestoreViewChange,
}: PremiumModalProps) {
  const [purchasing, setPurchasing] = useState<string | null>(null);
  const [restoreEmail, setRestoreEmail] = useState('');
  const [emailSending, setEmailSending] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && purchasing) {
      setPurchasing(null);
    }
  }, [loading, purchasing]);

  const handleBuy = (type: 'party_pass' | 'lifetime') => {
    setPurchasing(type);
    onBuy(type);
  };

  const handleSendRestoreEmail = async () => {
    setEmailError(null);
    if (!restoreEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(restoreEmail)) {
      setEmailError(t.restoreErrorGeneric);
      return;
    }
    setEmailSending(true);
    try {
      await onRequestRestoreEmail(restoreEmail);
      onRestoreViewChange('sent');
    } catch {
      onRestoreViewChange('error');
    } finally {
      setEmailSending(false);
    }
  };

  const isPassActive = premiumState.partyPassUntil !== null && premiumState.partyPassUntil > Date.now();

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 border border-slate-700 rounded-t-2xl sm:rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {restoreView === 'main' && (
          <>
            <div className="relative p-6 border-b border-slate-800">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-white">{t.upgradeTitle}</h2>
                </div>
              </div>
              <p className="text-slate-400 text-sm">{t.upgradeDesc}</p>
            </div>

            <div className="p-5 space-y-4">
              {premiumState.hasLifetime ? (
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-center gap-3">
                  <InfinityIcon className="w-6 h-6 text-amber-400 shrink-0" />
                  <div>
                    <p className="font-bold text-amber-400">{t.premiumActive}</p>
                    <p className="text-xs text-amber-400/70">{t.lifetimeDesc}</p>
                  </div>
                </div>
              ) : isPassActive ? (
                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 flex items-center gap-3">
                  <Clock className="w-6 h-6 text-cyan-400 shrink-0" />
                  <div>
                    <p className="font-bold text-cyan-400">{t.partyPass}</p>
                    <p className="text-xs text-cyan-400/70">
                      {new Date(premiumState.partyPassUntil!).toLocaleString()}
                    </p>
                  </div>
                </div>
              ) : null}

              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Lock className="w-4 h-4 text-slate-500" />
                  <span className="font-bold text-slate-300 text-sm">{t.freeVersion}</span>
                </div>
                <p className="text-slate-500 text-xs">{t.freeVersionDesc}</p>
              </div>

              {!premiumState.hasLifetime && (
                <button
                  onClick={() => handleBuy('party_pass')}
                  disabled={loading || purchasing !== null}
                  className="w-full text-left bg-slate-800/80 border-2 border-slate-700 hover:border-cyan-500 rounded-xl p-4 transition-all disabled:opacity-50 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">{t.partyPass}</p>
                        <p className="text-slate-400 text-xs">{t.partyPassDesc}</p>
                      </div>
                    </div>
                    <span className="text-lg font-black text-cyan-400">{t.partyPassPrice}</span>
                  </div>
                </button>
              )}

              {!premiumState.hasLifetime && (
                <button
                  onClick={() => handleBuy('lifetime')}
                  disabled={loading || purchasing !== null}
                  className="w-full text-left bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-2 border-amber-500/30 hover:border-amber-500 rounded-xl p-4 transition-all disabled:opacity-50 group relative overflow-hidden"
                >
                  <div className="absolute top-3 right-3 text-[10px] font-black text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-full">
                    {t.unlockAll}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                        <InfinityIcon className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">{t.lifetime}</p>
                        <p className="text-slate-400 text-xs">{t.lifetimeDesc}</p>
                      </div>
                    </div>
                    <span className="text-lg font-black text-amber-400">{t.lifetimePrice}</span>
                  </div>
                </button>
              )}

              {purchasing && !purchaseError && (
                <div className="text-center text-sm text-slate-400 py-2">
                  {t.loading}
                </div>
              )}

              {purchaseError && (
                <div className="text-center text-sm text-red-400 py-2 break-words">
                  {purchaseErrorLabel}
                  <div className="text-xs text-red-400/70 mt-1 font-mono">{purchaseError}</div>
                </div>
              )}

              <div className="pt-2 border-t border-slate-800 space-y-2">
                <button
                  onClick={onRestoreCurrent}
                  disabled={loading}
                  className="w-full text-center text-sm text-slate-500 hover:text-slate-300 transition-colors py-2"
                >
                  {t.restorePurchase}
                </button>
                <button
                  onClick={() => onRestoreViewChange('email')}
                  className="w-full text-center text-sm text-amber-400/70 hover:text-amber-400 transition-colors py-2 flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  {t.restoreByEmail}
                </button>
              </div>
            </div>
          </>
        )}

        {restoreView === 'email' && (
          <>
            <div className="relative p-6 border-b border-slate-800">
              <button
                onClick={() => onRestoreViewChange('main')}
                className="absolute top-4 left-4 text-slate-400 hover:text-white p-1"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-white">{t.restoreByEmail}</h2>
                </div>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <p className="text-slate-400 text-sm leading-relaxed">{t.restoreByEmailDesc}</p>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">{t.restoreEmailLabel}</label>
                <input
                  type="email"
                  value={restoreEmail}
                  onChange={(e) => setRestoreEmail(e.target.value)}
                  placeholder={t.restoreEmailPlaceholder}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none transition-colors"
                  autoFocus
                />
              </div>

              {emailError && (
                <p className="text-sm text-red-400">{t.restoreErrorGeneric}</p>
              )}

              <button
                onClick={handleSendRestoreEmail}
                disabled={emailSending}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {emailSending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t.restoreSending}
                  </>
                ) : (
                  t.restoreSendLink
                )}
              </button>
            </div>
          </>
        )}

        {restoreView === 'sent' && (
          <>
            <div className="relative p-6 border-b border-slate-800">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto">
                <Mail className="w-8 h-8 text-amber-400" />
              </div>
              <h2 className="text-xl font-black text-white">{t.restoreSent}</h2>
              <p className="text-slate-400 text-sm leading-relaxed">{t.restoreSentDesc}</p>
              <button
                onClick={onClose}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 rounded-xl transition-colors"
              >
                {t.close}
              </button>
            </div>
          </>
        )}

        {restoreView === 'success' && (
          <>
            <div className="relative p-6 border-b border-slate-800">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-xl font-black text-white">{t.restoreSuccess}</h2>
              <p className="text-slate-400 text-sm leading-relaxed">{t.restoreSuccessDesc}</p>
              <button
                onClick={onClose}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 rounded-xl transition-colors"
              >
                {t.close}
              </button>
            </div>
          </>
        )}

        {restoreView === 'error' && (
          <>
            <div className="relative p-6 border-b border-slate-800">
              <button
                onClick={() => onRestoreViewChange('email')}
                className="absolute top-4 left-4 text-slate-400 hover:text-white p-1"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto">
                <X className="w-8 h-8 text-red-400" />
              </div>
              <h2 className="text-xl font-black text-white">{t.restoreErrorGeneric}</h2>
              {restoreError && (
                <p className="text-slate-400 text-sm">
                  {restoreError === 'invalid_token'
                    ? t.restoreErrorInvalid
                    : restoreError === 'already_used'
                      ? t.restoreErrorUsed
                      : restoreError === 'expired'
                        ? t.restoreErrorExpired
                        : t.restoreErrorGeneric}
                </p>
              )}
              <button
                onClick={() => onRestoreViewChange('email')}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 rounded-xl transition-colors"
              >
                {t.restoreByEmail}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
