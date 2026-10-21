import { Trophy, RotateCw, Users, Power } from 'lucide-react';
import type { Player, WordPair, GameResult } from '@/game/types';
import type { Translation } from '@/game/i18n';
import { roleLabel } from '@/game/i18n';

interface GameOverProps {
  result: GameResult;
  players: Player[];
  wordPair: WordPair;
  onRestart: (mode: 'same_all' | 'same_players' | 'full_reset') => void;
  scores: Record<string, number>;
  t: Translation;
}

export function GameOver({ result, players, wordPair, onRestart, scores, t }: GameOverProps) {
  const getWinMessage = (): string => {
    if (result.message) return result.message;
    if (result.winners.includes('ANGE')) return t.angeWinMsg;
    if (result.winners.includes('CIVIL')) return t.civilsWinMsg;
    if (result.winners.includes('UNDERCOVER')) return t.undercoverWinMsg;
    if (result.winners.includes('MR_WHITE')) {
      const p = players.find((pl) => result.winningIds.includes(pl.id));
      return `${p?.name || ''} (${t.roleMrWhite}) ${t.mrWhiteWinMsg}`;
    }
    if (result.winners.includes('MR_GREEN')) {
      const p = players.find((pl) => result.winningIds.includes(pl.id));
      return `${p?.name || ''} (${t.roleMrGreen}) ${t.mrGreenWinMsg}`;
    }
    return '';
  };

  const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 space-y-6 text-center">
      <div className="space-y-2">
        <Trophy className="w-14 h-14 mx-auto text-amber-400" />
        <h1 className="text-4xl font-black text-slate-100">{t.gameOver}</h1>
      </div>
      <p className="text-lg text-cyan-400 font-bold max-w-lg mx-auto">{getWinMessage()}</p>

      {sortedScores.length > 0 && (
        <div className="card border border-amber-500/30">
          <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-3">{t.scores}</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {sortedScores.map(([name, score]) => (
              <div
                key={name}
                className="bg-slate-800/80 px-4 py-2 rounded-full flex gap-2 items-center"
              >
                <span className="font-bold text-white text-sm">{name}</span>
                <span className="bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded text-xs font-black">
                  {score} {t.points}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="card bg-slate-800/50">
          <h3 className="text-xs text-slate-500 uppercase tracking-wider mb-2">{t.civilWord}</h3>
          <p className="text-2xl font-bold text-cyan-400">{wordPair.civil}</p>
        </div>
        <div className="card bg-slate-800/50">
          <h3 className="text-xs text-slate-500 uppercase tracking-wider mb-2">{t.undercoverWord}</h3>
          <p className="text-2xl font-bold text-red-400">{wordPair.undercover}</p>
        </div>
      </div>

      <div className="card space-y-3">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider border-b border-slate-700 pb-2">
          {t.roleReveal}
        </h3>
        <div className="space-y-2">
          {players.map((p) => (
            <div
              key={p.id}
              className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg"
            >
              <span
                className={`font-bold text-sm ${
                  p.isAlive ? 'text-white' : 'text-slate-500 line-through'
                }`}
              >
                {p.name}
              </span>
              <span
                className={`px-2.5 py-1 rounded text-xs font-bold ${
                  p.currentRole === 'UNDERCOVER'
                    ? 'bg-red-500/20 text-red-300'
                    : p.currentRole === 'CIVIL'
                    ? 'bg-cyan-500/20 text-cyan-300'
                    : p.currentRole === 'VOLEUR'
                    ? 'bg-pink-500/20 text-pink-300'
                    : p.currentRole === 'MR_WHITE'
                    ? 'bg-slate-500/20 text-slate-300'
                    : p.currentRole === 'MR_GREEN'
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : p.currentRole === 'ANGE'
                    ? 'bg-amber-500/20 text-amber-300'
                    : p.currentRole === 'VOYANTE'
                    ? 'bg-violet-500/20 text-violet-300'
                    : p.currentRole === 'CHASSEUR'
                    ? 'bg-orange-500/20 text-orange-300'
                    : 'bg-slate-600/20 text-slate-300'
                }`}
              >
                {roleLabel(p.currentRole, t)}
                {p.currentRole === 'VOLEUR' && p.voleurSide && ` (${p.voleurSide === 'Civil' ? t.sideCivils : t.sideUndercovers})`}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button onClick={() => onRestart('same_all')} className="btn btn-primary w-full py-4">
          <RotateCw className="w-5 h-5" /> {t.sameSettings}
        </button>
        <button onClick={() => onRestart('same_players')} className="btn btn-secondary w-full py-3">
          <Users className="w-5 h-5" /> {t.samePlayers}
        </button>
        <button
          onClick={() => onRestart('full_reset')}
          className="btn border border-slate-600 hover:bg-slate-800 text-slate-300 w-full py-3"
        >
          <Power className="w-5 h-5" /> {t.fullReset}
        </button>
      </div>
    </div>
  );
}
