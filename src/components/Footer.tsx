import type { Translation } from '@/game/i18n';

interface FooterProps {
  t: Translation;
}

export function Footer({ t }: FooterProps) {
  return (
    <footer className="mt-auto py-6 border-t border-slate-800 text-center">
      <div className="max-w-xl mx-auto px-4">
        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{t.footerTagline}</p>
        <p className="text-slate-600 text-[10px] tracking-wider uppercase mt-2">
          {t.footerCopyright} &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
