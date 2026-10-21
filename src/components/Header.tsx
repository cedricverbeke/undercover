import { Search, HelpCircle, Crown, Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import type { LangCode } from '@/game/types';
import type { Translation } from '@/game/i18n';
import { LANGUAGES } from '@/game/i18n';

interface HeaderProps {
  onShowRules: () => void;
  onShowPremium: () => void;
  onLanguageChange: (lang: LangCode) => void;
  currentLang: LangCode;
  t: Translation;
  isPremium: boolean;
}

export function Header({
  onShowRules,
  onShowPremium,
  onLanguageChange,
  currentLang,
  t,
  isPremium,
}: HeaderProps) {
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLangInfo = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  return (
    <header className="sticky top-0 z-40 py-3 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
        <button
          onClick={onShowPremium}
          className={`flex items-center gap-1.5 text-xs sm:text-sm transition-colors ${
            isPremium ? 'text-amber-400' : 'text-slate-400 hover:text-amber-400'
          }`}
        >
          <Crown className="w-4 h-4" />
          {isPremium ? <span className="hidden sm:inline font-medium">{t.premiumActive}</span> : <span className="hidden sm:inline font-medium">{t.premium}</span>}
        </button>

        <div className="flex items-center gap-2 text-lg font-black tracking-wider">
          <Search className="w-5 h-5 text-cyan-400" />
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            {t.appTitle}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="text-slate-400 hover:text-white p-2 transition-colors"
              title={t.language}
            >
              <Globe className="w-5 h-5" />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-slate-800 border border-slate-700 rounded-xl shadow-xl py-1 min-w-[140px] z-50">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onLanguageChange(lang.code);
                      setLangOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 transition-colors ${
                      lang.code === currentLang
                        ? 'text-cyan-400 bg-cyan-500/10'
                        : 'text-slate-300 hover:bg-slate-700/50'
                    }`}
                  >
                    <span className="text-base">{lang.flag}</span>
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={onShowRules}
            className="text-slate-400 hover:text-white p-2 transition-colors"
            title={t.rules}
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
