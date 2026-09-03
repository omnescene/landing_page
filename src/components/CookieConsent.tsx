import React, { useEffect, useState } from 'react';
import { Settings2Icon, XIcon } from 'lucide-react';

const CONSENT_COOKIE = 'omnescene_cookie_consent';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 180;

export type CookieConsentValue = 'accepted' | 'rejected';

function readConsent(): CookieConsentValue | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=([^;]*)`));
  const value = match ? decodeURIComponent(match[1]) : null;
  return value === 'accepted' || value === 'rejected' ? value : null;
}

function writeConsent(value: CookieConsentValue) {
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(value)}; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Lax`;
}

export function CookieConsent({ onChange }: { onChange: (value: CookieConsentValue) => void }) {
  const [consent, setConsent] = useState<CookieConsentValue | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const storedConsent = readConsent();
    setConsent(storedConsent);
    if (storedConsent) onChange(storedConsent);
  }, [onChange]);

  const choose = (value: CookieConsentValue) => {
    writeConsent(value);
    setConsent(value);
    setOpen(false);
    onChange(value);
  };

  if (consent && !open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open cookie settings"
        className="fixed bottom-4 left-4 z-[100] border border-cyan/25 bg-abyss/95 p-3 text-cyan shadow-2xl backdrop-blur-md transition-colors hover:border-cyan/70 hover:text-cyan-soft"
      >
        <Settings2Icon className="h-4 w-4" />
      </button>
    );
  }

  return (
    <aside
      role="dialog"
      aria-label="Cookie preferences"
      aria-live="polite"
      className="fixed inset-x-4 bottom-4 z-[100] border border-cyan/30 bg-abyss/95 p-5 shadow-2xl backdrop-blur-md sm:inset-x-auto sm:left-6 sm:max-w-xl sm:p-6"
    >
      {consent ? (
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close cookie settings"
          className="absolute right-4 top-4 p-1 text-mist transition-colors hover:text-cyan"
        >
          <XIcon className="h-4 w-4" />
        </button>
      ) : null}
      <p className="font-mono text-[10px] uppercase tracking-tech text-cyan/70">Privacy controls</p>
      <h2 className="mt-2 pr-8 font-display text-lg font-bold uppercase tracking-wide text-chalk">Cookies, your call</h2>
      <p className="mt-2 max-w-lg text-sm leading-relaxed text-mist">
        We use essential cookies to remember this choice. With your permission, OmneScene can also load its support chat and related third-party cookies.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <button type="button" onClick={() => choose('accepted')} className="border border-cyan bg-cyan px-4 py-2 font-display text-xs font-bold uppercase tracking-widest text-void transition-colors hover:bg-cyan-soft">
          Accept optional
        </button>
        <button type="button" onClick={() => choose('rejected')} className="border border-cyan/30 px-4 py-2 font-display text-xs font-bold uppercase tracking-widest text-chalk transition-colors hover:border-cyan/70 hover:text-cyan">
          Essential only
        </button>
        <a href="/privacy" className="px-1 py-2 font-mono text-[10px] uppercase tracking-tech text-mist underline decoration-cyan/40 underline-offset-4 hover:text-cyan">
          Privacy policy
        </a>
      </div>
    </aside>
  );
}