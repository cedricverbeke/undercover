import { useState } from 'react';
import { UserRound, Eye, Sparkles } from 'lucide-react';
import type { Player, WordPair, VoleurSide } from '@/game/types';
import type { Translation } from '@/game/i18n';
import { roleLabel } from '@/game/i18n';

interface RevealRoleProps {
  players: Player[];
  wordPair: WordPair;
  onRevealComplete: () => void;
  updatePlayer: (id: number, updates: Partial<Player>) => void;
  blindMode: boolean;
  t: Translation;
}

export function RevealRole({
  players,
  wordPair,
  onRevealComplete,
  updatePlayer,
  blindMode,
  t,
}: RevealRoleProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [step, setStep] = useState<'pass' | 'reveal' | 'action' | 'voleur_result' | 'voyante_result'>('pass');
  const [voleurChoice, setVoleurChoice] = useState<VoleurSide | null>(null);
  const [voyanteTarget, setVoyanteTarget] = useState<number | null>(null);

  const currentPlayer = players[currentIndex];

  const nextPlayer = () => {
    if (currentIndex < players.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setStep('pass');
      setVoleurChoice(null);
      setVoyanteTarget(null);
    } else {
      onRevealComplete();
    }
  };

  const handleSpecialAction = () => {
    if (currentPlayer.currentRole === 'VOLEUR' && voleurChoice) {
      updatePlayer(currentPlayer.id, {
        voleurSide: voleurChoice,
        word: voleurChoice === 'Civil' ? wordPair.civil : wordPair.undercover,
      });
      setStep('voleur_result');
    } else if (currentPlayer.currentRole === 'VOYANTE' && voyanteTarget !== null) {
      updatePlayer(currentPlayer.id, { hasPlayedSpecial: true, voyanteTarget });
      setStep('voyante_result');
    } else {
      nextPlayer();
    }
  };

  if (step === 'pass') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <div className="card w-full max-w-sm space-y-6 animate-fade-in">
          <div className="w-20 h-20 mx-auto rounded-full bg-cyan-500/10 flex items-center justify-center">
            <UserRound className="w-10 h-10 text-cyan-400" />
          </div>
          <div className="space-y-1">
            <p className="text-slate-400 text-sm">{t.passDeviceTo}</p>
            <p className="text-3xl font-black text-cyan-400">{currentPlayer.name}</p>
          </div>
          <button onClick={() => setStep('reveal')} className="btn btn-primary w-full py-3">
            {t.iAm} {currentPlayer.name}
          </button>
        </div>
      </div>
    );
  }

  if (step === 'voyante_result') {
    const target = players.find((p) => p.id === voyanteTarget);
    if (!target) return null;
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <div className="card w-full max-w-sm space-y-6 border-2 border-violet-500/50">
          <Sparkles className="w-12 h-12 mx-auto text-violet-400" />
          <h2 className="text-xl font-bold">{t.voyanteVision}</h2>
          <p className="text-lg text-slate-300">
            {t.isRole} <strong className="text-white">{target.name}</strong>:
          </p>
          <p className="text-3xl font-bold text-violet-400">{roleLabel(target.originalRole, t)}</p>
          <button onClick={nextPlayer} className="btn btn-primary w-full py-3">
            {t.hideAndNext}
          </button>
        </div>
      </div>
    );
  }

  if (step === 'voleur_result') {
    const wordToDisplay = voleurChoice === 'Civil' ? wordPair.civil : wordPair.undercover;
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <div className="card w-full max-w-sm space-y-6 border-2 border-pink-500/50">
          <h2 className="text-xl font-bold">{t.voleurYourWord}</h2>
          <p className="text-sm text-slate-300">{t.voleurAsWord}</p>
          <p className="text-3xl font-bold text-cyan-400 bg-slate-800/80 p-4 rounded-xl">{wordToDisplay}</p>
          <button onClick={nextPlayer} className="btn btn-primary w-full py-3">
            {t.hideAndPass}
          </button>
        </div>
      </div>
    );
  }

  const needsAction =
    currentPlayer.currentRole === 'VOLEUR' || currentPlayer.currentRole === 'VOYANTE';
  const isBlindRole =
    blindMode &&
    (currentPlayer.currentRole === 'CIVIL' || currentPlayer.currentRole === 'UNDERCOVER');

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="card w-full max-w-sm space-y-5">
        <h2 className="text-sm uppercase tracking-widest text-slate-500">
          {t.roleOf} {currentPlayer.name}
        </h2>
        <div className="py-2">
          <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">{t.yourRole}</p>
          <p className="text-3xl font-black text-cyan-400 mb-4">
            {isBlindRole ? t.civilOrUndercover : roleLabel(currentPlayer.currentRole, t)}
          </p>

          {currentPlayer.word && (
            <div className="bg-slate-800/80 p-4 rounded-xl mb-3">
              <p className="text-xs text-slate-400 mb-1">{t.yourSecretWord}</p>
              <p className="text-2xl font-bold text-white">{currentPlayer.word}</p>
            </div>
          )}

          {currentPlayer.theme && (
            <div className="bg-slate-800/80 p-4 rounded-xl mb-3">
              <p className="text-xs text-slate-400 mb-1">{t.theTheme}</p>
              <p className="text-2xl font-bold text-white">{currentPlayer.theme}</p>
            </div>
          )}

          {currentPlayer.currentRole === 'MR_WHITE' && (
            <p className="text-slate-400 italic text-sm">{t.mrWhiteNoWord}</p>
          )}
        </div>

        {currentPlayer.currentRole === 'VOLEUR' && step === 'reveal' && (
          <div className="space-y-3">
            <p className="font-bold text-slate-200">{t.chooseSide}</p>
            <div className="flex gap-2">
              <button
                onClick={() => setVoleurChoice('Civil')}
                className={`flex-1 py-3 rounded-xl transition-all ${
                  voleurChoice === 'Civil'
                    ? 'bg-cyan-500 text-white'
                    : 'bg-slate-700 text-slate-300'
                }`}
              >
                {t.sideCivils}
              </button>
              <button
                onClick={() => setVoleurChoice('Undercover')}
                className={`flex-1 py-3 rounded-xl transition-all ${
                  voleurChoice === 'Undercover'
                    ? 'bg-red-500 text-white'
                    : 'bg-slate-700 text-slate-300'
                }`}
              >
                {t.sideUndercovers}
              </button>
            </div>
          </div>
        )}

        {currentPlayer.currentRole === 'VOYANTE' && step === 'reveal' && (
          <div className="space-y-3">
            <p className="font-bold text-slate-200">{t.choosePlayerToScan}</p>
            <div className="grid grid-cols-2 gap-2">
              {players
                .filter((p) => p.id !== currentPlayer.id)
                .map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setVoyanteTarget(p.id)}
                    className={`py-2.5 rounded-lg text-sm transition-all ${
                      voyanteTarget === p.id
                        ? 'bg-violet-500 text-white'
                        : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
            </div>
          </div>
        )}

        <button
          onClick={needsAction ? handleSpecialAction : nextPlayer}
          disabled={
            needsAction &&
            (currentPlayer.currentRole === 'VOLEUR' ? !voleurChoice : voyanteTarget === null)
          }
          className="btn btn-primary w-full py-3 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {needsAction ? t.validate : t.hideAndPass}
        </button>
      </div>
    </div>
  );
}
