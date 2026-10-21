import { useState } from 'react';
import { Mic, UserRound, Skull, Crosshair, Sparkles } from 'lucide-react';
import type { Player, WordPair, GameResult } from '@/game/types';
import type { Translation } from '@/game/i18n';
import { roleLabel } from '@/game/i18n';

interface GameTurnProps {
  players: Player[];
  round: number;
  onEliminate: (playerIds: number | number[], currentRound: number) => void;
  wordPair: WordPair;
  onGameOver: (result: GameResult) => void;
  firstPlayerId: number;
  t: Translation;
}

export function GameTurn({
  players,
  round,
  onEliminate,
  wordPair,
  onGameOver,
  firstPlayerId,
  t,
}: GameTurnProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
  const [chasseurAction, setChasseurAction] = useState(false);
  const [chasseurTarget, setChasseurTarget] = useState<number | null>(null);
  const [mrAction, setMrAction] = useState(false);
  const [mrGuess, setMrGuess] = useState('');

  const alivePlayers = players.filter((p) => p.isAlive);

  const handleEliminate = () => {
    if (selectedPlayer === null) return;
    const playerToKill = players.find((p) => p.id === selectedPlayer);
    if (!playerToKill) return;

    if (playerToKill.currentRole === 'CHASSEUR') {
      setChasseurAction(true);
    } else if (playerToKill.currentRole === 'MR_WHITE' || playerToKill.currentRole === 'MR_GREEN') {
      setMrAction(true);
    } else {
      onEliminate(selectedPlayer, round);
      setSelectedPlayer(null);
    }
  };

  const handleMrGuess = () => {
    const playerToKill = players.find((p) => p.id === selectedPlayer);
    if (!playerToKill) return;
    if (mrGuess.trim().toLowerCase() === wordPair.civil.trim().toLowerCase()) {
      onGameOver({
        over: true,
        winners: [playerToKill.currentRole],
        winningIds: [playerToKill.id],
        message: '',
      });
    } else {
      if (selectedPlayer !== null) onEliminate(selectedPlayer, round);
      setSelectedPlayer(null);
      setMrAction(false);
      setMrGuess('');
    }
  };

  const handleChasseurEliminate = () => {
    if (chasseurTarget === null || selectedPlayer === null) return;
    onEliminate([selectedPlayer, chasseurTarget], round);
    setSelectedPlayer(null);
    setChasseurAction(false);
    setChasseurTarget(null);
  };

  if (mrAction) {
    const player = players.find((p) => p.id === selectedPlayer);
    return (
      <div className="w-full max-w-2xl mx-auto px-4 py-6 space-y-6 text-center">
        <div className="card border-2 border-cyan-500/50">
          <Sparkles className="w-10 h-10 mx-auto text-cyan-400 mb-3" />
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">{t.lastChance}</h2>
          <p className="mb-6 text-slate-300">
            <strong className="text-white">{player?.name}</strong> ({roleLabel(player?.currentRole || 'CIVIL', t)}), {t.mrWhiteGuessPrompt}
          </p>
          <input
            type="text"
            value={mrGuess}
            onChange={(e) => setMrGuess(e.target.value)}
            placeholder={t.guessCivilWord}
            className="input-field mb-6 text-center text-xl"
            autoFocus
          />
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleMrGuess}
              disabled={mrGuess.trim() === ''}
              className="btn btn-primary flex-1 py-3 disabled:opacity-40"
            >
              {t.tryLuck}
            </button>
            <button
              onClick={() => {
                if (selectedPlayer !== null) onEliminate(selectedPlayer, round);
                setSelectedPlayer(null);
                setMrAction(false);
                setMrGuess('');
              }}
              className="btn btn-danger flex-1 py-3"
            >
              {t.iDontKnow}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (chasseurAction) {
    const player = players.find((p) => p.id === selectedPlayer);
    return (
      <div className="w-full max-w-2xl mx-auto px-4 py-6 space-y-6 text-center">
        <div className="card border-2 border-red-500/50">
          <Crosshair className="w-10 h-10 mx-auto text-red-400 mb-3" />
          <h2 className="text-2xl font-bold text-red-400 mb-4">{t.chasseurAction}</h2>
          <p className="mb-6 text-slate-300">
            <strong className="text-white">{player?.name}</strong> — {t.chasseurPrompt}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            {alivePlayers
              .filter((p) => p.id !== selectedPlayer)
              .map((p) => (
                <button
                  key={p.id}
                  onClick={() => setChasseurTarget(p.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    chasseurTarget === p.id
                      ? 'border-red-500 bg-red-500/20'
                      : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                  }`}
                >
                  {p.name}
                </button>
              ))}
          </div>
          <button
            onClick={handleChasseurEliminate}
            disabled={chasseurTarget === null}
            className="btn btn-danger w-full py-3 disabled:opacity-40"
          >
            {t.shootAndDie}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          {t.round} {round}
        </h2>
        <p className="text-slate-400 mt-2 text-sm">{t.turnInstructions}</p>
        {round === 1 && (
          <div className="mt-4 p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-300 text-sm flex items-center justify-center gap-2">
            <Mic className="w-4 h-4" />
            {t.firstToSpeak} <strong>{players.find((p) => p.id === firstPlayerId)?.name}</strong>
          </div>
        )}
      </div>

      <div className="card space-y-4">
        <h3 className="text-sm font-bold text-center text-slate-300 uppercase tracking-wider">
          {t.alivePlayers}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {alivePlayers.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPlayer(p.id)}
              className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                selectedPlayer === p.id
                  ? 'border-red-500 bg-red-500/10 scale-105'
                  : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
              }`}
            >
              <UserRound className="w-6 h-6 text-slate-400" />
              <span className="font-bold text-sm text-slate-200">{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      {selectedPlayer !== null && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 shadow-2xl flex justify-center pb-6 sm:pb-4 z-50">
          <button
            onClick={handleEliminate}
            className="btn btn-danger w-full max-w-md py-4 text-lg flex items-center justify-center gap-2 animate-pulse-slow"
          >
            <Skull className="w-5 h-5" /> {t.eliminate} {players.find((p) => p.id === selectedPlayer)?.name}
          </button>
        </div>
      )}
    </div>
  );
}
