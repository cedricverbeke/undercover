import { useState } from 'react';
import {
  Users,
  Plus,
  Trash2,
  Settings,
  Eye,
  EyeOff,
  Play,
  Lock,
  Check,
} from 'lucide-react';
import type { RoleConfig, SetupConfig, LangCode, WordCategory } from '@/game/types';
import type { Translation } from '@/game/i18n';
import { WORD_DATA, FREE_PAIR_COUNT, getFreeWordPairs } from '@/game/words';
import { CATEGORY_NAMES } from '@/game/i18n';

interface SetupProps {
  onStart: (config: SetupConfig) => void;
  initialConfig: SetupConfig | null;
  t: Translation;
  lang: LangCode;
  isPremium: boolean;
  onUpgradeClick: () => void;
}

export function Setup({ onStart, initialConfig, t, lang, isPremium, onUpgradeClick }: SetupProps) {
  const [players, setPlayers] = useState<string[]>(
    initialConfig?.playerNames || ['', '', '', '']
  );
  const [focusedPlayer, setFocusedPlayer] = useState<number | null>(null);
  const [categories, setCategories] = useState<string[]>(initialConfig?.categoryIds || ['nature']);
  const [blindMode, setBlindMode] = useState(initialConfig?.blindMode || false);
  const [roles, setRoles] = useState<RoleConfig>(
    initialConfig?.roleConfig || {
      undercoverCount: 1,
      mrWhite: false,
      mrGreen: false,
      ange: false,
      voleur: false,
      chasseur: false,
      voyante: false,
    }
  );
  const [error, setError] = useState('');

  const allCategories: WordCategory[] = WORD_DATA[lang];
  const freePairs = getFreeWordPairs(lang);
  const freePairKeys = new Set(
    freePairs.map((p) => [p.civil, p.undercover].sort().join('|'))
  );

  function isCategoryFree(cat: WordCategory): boolean {
    return cat.words.every((w) =>
      freePairKeys.has([w.civil, w.undercover].sort().join('|'))
    );
  }

  function getCategoryFreeCount(cat: WordCategory): number {
    return cat.words.filter((w) =>
      freePairKeys.has([w.civil, w.undercover].sort().join('|'))
    ).length;
  }

  const addPlayer = () => setPlayers([...players, '']);

  const removePlayer = (index: number) => {
    if (players.length > 3) {
      setPlayers(players.filter((_, i) => i !== index));
    }
  };

  const updatePlayer = (index: number, val: string) => {
    const newP = [...players];
    newP[index] = val;
    setPlayers(newP);
  };

  const toggleCategory = (key: string) => {
    if (categories.includes(key)) {
      if (categories.length > 1) {
        setCategories(categories.filter((c) => c !== key));
      }
    } else {
      setCategories([...categories, key]);
    }
  };

  const handleStart = () => {
    const totalSpecial =
      (roles.mrWhite ? 1 : 0) +
      (roles.mrGreen ? 1 : 0) +
      (roles.ange ? 1 : 0) +
      (roles.voleur ? 1 : 0) +
      (roles.chasseur ? 1 : 0) +
      (roles.voyante ? 1 : 0) +
      roles.undercoverCount;
    if (totalSpecial >= players.length) {
      setError(t.errorNeedCivil);
      return;
    }
    if (categories.length === 0) {
      setError(t.errorNeedCategory);
      return;
    }
    setError('');
    onStart({ playerNames: players, roleConfig: roles, categoryIds: categories, blindMode });
  };

  const roleKeys: { key: keyof RoleConfig; label: string; activeColor: string }[] = [
    { key: 'mrWhite', label: t.roleMrWhite, activeColor: 'bg-slate-400' },
    { key: 'mrGreen', label: t.roleMrGreen, activeColor: 'bg-emerald-500' },
    { key: 'ange', label: t.roleAnge, activeColor: 'bg-amber-500' },
    { key: 'voleur', label: t.roleVoleur, activeColor: 'bg-pink-500' },
    { key: 'chasseur', label: t.roleChasseur, activeColor: 'bg-orange-500' },
    { key: 'voyante', label: t.roleVoyante, activeColor: 'bg-violet-500' },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 space-y-5">
      <div className="card space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2 text-slate-100">
          <Users className="w-5 h-5 text-cyan-400" />
          {t.players} ({players.length})
        </h2>
        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
          {players.map((p, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                value={focusedPlayer === i ? p : (p || `${t.roleCivil} ${i + 1}`)}
                placeholder={`${t.roleCivil} ${i + 1}`}
                onFocus={() => setFocusedPlayer(i)}
                onChange={(e) => updatePlayer(i, e.target.value)}
                onBlur={() => setFocusedPlayer(null)}
                className="input-field flex-grow"
              />
              {players.length > 3 && (
                <button
                  onClick={() => removePlayer(i)}
                  className="btn-icon text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
        <button onClick={addPlayer} className="btn btn-secondary w-full">
          <Plus className="w-4 h-4" /> {t.addPlayer}
        </button>
      </div>

      <div className="card space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold flex items-center gap-2 text-slate-100">
            <Settings className="w-5 h-5 text-cyan-400" />
            {t.categories}
          </h2>
          {!isPremium && (
            <span className="text-xs text-amber-400 font-medium">
              {FREE_PAIR_COUNT} {t.freeVersionDesc}
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {allCategories.map((cat) => {
            const isSelected = categories.includes(cat.id);
            const freeCount = getCategoryFreeCount(cat);
            const isFullyFree = isCategoryFree(cat);
            const showLock = !isPremium && !isFullyFree;
            return (
              <button
                key={cat.id}
                onClick={() => toggleCategory(cat.id)}
                className={`relative p-4 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all duration-200 ${
                  isSelected
                    ? 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/10'
                    : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 text-cyan-400">
                    <Check className="w-4 h-4" />
                  </div>
                )}
                {showLock && (
                  <div className="absolute top-2 left-2 text-amber-400/70">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                )}
                <span className="text-3xl">{cat.emoji}</span>
                <span className="font-semibold text-xs text-center text-slate-200">{CATEGORY_NAMES[lang][cat.id] || cat.id}</span>
                {!isPremium && !isFullyFree && freeCount > 0 && (
                  <span className="text-[10px] text-slate-500">{freeCount}/{cat.words.length}</span>
                )}
              </button>
            );
          })}
        </div>
        {!isPremium && (
          <button
            onClick={onUpgradeClick}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500/20 to-cyan-500/20 border border-amber-500/30 text-amber-300 text-sm font-medium hover:from-amber-500/30 hover:to-cyan-500/30 transition-all"
          >
            {t.premiumBanner}
          </button>
        )}
      </div>

      <div className="card space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2 text-slate-100">
          <Settings className="w-5 h-5 text-cyan-400" />
          {t.settingsRoles}
        </h2>

        <label className="flex items-center justify-between p-3 bg-cyan-500/10 border border-cyan-600/30 rounded-xl cursor-pointer hover:bg-cyan-500/20 transition">
          <div className="flex flex-col pr-3">
            <span className="font-bold text-cyan-300 text-sm">{t.blindMode}</span>
            <span className="text-xs text-cyan-400/70 mt-0.5">{t.blindModeDesc}</span>
          </div>
          <button
            onClick={() => setBlindMode(!blindMode)}
            className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${
              blindMode ? 'bg-cyan-500' : 'bg-slate-600'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                blindMode ? 'translate-x-6' : ''
              }`}
            />
          </button>
        </label>

        <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl">
          <span className="text-slate-200 text-sm">{t.undercoverCount}</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setRoles({ ...roles, undercoverCount: Math.max(1, roles.undercoverCount - 1) })}
              className="btn btn-secondary px-3 py-1 text-lg"
            >
              −
            </button>
            <span className="font-bold text-cyan-400 min-w-[2ch] text-center">{roles.undercoverCount}</span>
            <button
              onClick={() => setRoles({ ...roles, undercoverCount: roles.undercoverCount + 1 })}
              className="btn btn-secondary px-3 py-1 text-lg"
            >
              +
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {roleKeys.map(({ key, label, activeColor }) => (
            <label
              key={key}
              className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl cursor-pointer hover:bg-slate-700/50 transition"
            >
              <span className="text-slate-200 text-sm">{label}</span>
              <button
                onClick={() => setRoles({ ...roles, [key]: !roles[key] } as RoleConfig)}
                className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${
                  roles[key] ? activeColor : 'bg-slate-600'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                    roles[key] ? 'translate-x-6' : ''
                  }`}
                />
              </button>
            </label>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500/30 rounded-xl px-4 py-3 text-red-300 text-sm">
          {error}
        </div>
      )}

      <button onClick={handleStart} className="btn btn-primary w-full py-4 text-lg">
        <Play className="w-5 h-5" /> {t.startGame}
      </button>
    </div>
  );
}
