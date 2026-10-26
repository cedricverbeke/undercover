import { useState } from 'react';
import { FileText } from 'lucide-react';
import type { Translation } from '@/game/i18n';
import { CgvModal } from '@/components/CgvModal';

interface FooterProps {
  t: Translation;
}

export function Footer({ t }: FooterProps) {
  const [showCgv, setShowCgv] = useState(false);

  return (
    <>
      <footer className="mt-auto py-6 border-t border-slate-800 text-center">
        <div className="max-w-xl mx-auto px-4">
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{t.footerTagline}</p>
          <button
            onClick={() => setShowCgv(true)}
            className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-300 text-xs mt-3 transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            {t.cgv}
          </button>
          <p className="text-slate-600 text-[10px] tracking-wider uppercase mt-2">
            {t.footerCopyright} &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>

      {showCgv && <CgvModal onClose={() => setShowCgv(false)} />}
    </>
  );
}
