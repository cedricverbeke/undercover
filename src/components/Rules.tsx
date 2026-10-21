import { BookOpen, X, User, UserRound, Ghost, Leaf, Crown, Eye, Crosshair, VenetianMask } from 'lucide-react';
import type { Translation } from '@/game/i18n';

interface RulesProps {
  onClose: () => void;
  t: Translation;
}

export function Rules({ onClose, t }: RulesProps) {
  const roles = [
    { icon: User, color: 'text-cyan-400', bg: 'bg-cyan-500/10', name: t.roleCivil, desc: t.rulesCivilDesc },
    { icon: UserRound, color: 'text-red-400', bg: 'bg-red-500/10', name: t.roleUndercover, desc: t.rulesUndercoverDesc },
    { icon: Ghost, color: 'text-slate-300', bg: 'bg-slate-500/10', name: t.roleMrWhite, desc: t.rulesMrWhiteDesc },
    { icon: Leaf, color: 'text-emerald-400', bg: 'bg-emerald-500/10', name: t.roleMrGreen, desc: t.rulesMrGreenDesc },
    { icon: Crown, color: 'text-amber-400', bg: 'bg-amber-500/10', name: t.roleAnge, desc: t.rulesAngeDesc },
    { icon: Eye, color: 'text-violet-400', bg: 'bg-violet-500/10', name: t.roleVoyante, desc: t.rulesVoyanteDesc },
    { icon: Crosshair, color: 'text-orange-400', bg: 'bg-orange-500/10', name: t.roleChasseur, desc: t.rulesChasseurDesc },
    { icon: VenetianMask, color: 'text-pink-400', bg: 'bg-pink-500/10', name: t.roleVoleur, desc: t.rulesVoleurDesc },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 border border-slate-700 rounded-t-2xl sm:rounded-2xl w-full max-w-2xl max-h-[90vh] sm:max-h-[85vh] flex flex-col shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2 text-cyan-400">
            <BookOpen className="w-5 h-5" /> {t.rules}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-2">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-6">
          <section>
            <h3 className="text-lg font-bold text-white mb-2">{t.rulesGoal}</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              <strong className="text-cyan-400">{t.rulesGoalCivils}</strong>
              <br />
              <strong className="text-red-400">{t.rulesGoalUndercovers}</strong>
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2">
              {t.rulesRolesTitle}
            </h3>
            {roles.map(({ icon: Icon, color, bg, name, desc }) => (
              <div key={name} className="flex gap-3 items-start">
                <div className={`p-2.5 rounded-xl ${bg} shrink-0`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <div>
                  <h4 className={`font-bold text-sm ${color}`}>{name}</h4>
                  <p className="text-slate-400 text-sm mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </section>
        </div>

        <div className="p-4 border-t border-slate-800">
          <button onClick={onClose} className="btn btn-primary w-full py-3">
            {t.gotIt}
          </button>
        </div>
      </div>
    </div>
  );
}
