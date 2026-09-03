import React, { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { contactInfo } from '../data/site';

export type LegalSection = {id: string;title: string;body: ReactNode[];};

type Props = {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

export function LegalLayout({ eyebrow, title, updated, intro, sections }: Props) {
  return (
    <main className="relative px-5 pb-28 pt-32 sm:px-8 lg:pt-40">
      <div className="mx-auto max-w-[1100px]">
        <span className="font-mono text-[10px] uppercase tracking-tech text-cyan/70">{eyebrow}</span>
        <h1 className="mt-4 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-[-0.01em] text-chalk sm:text-6xl">
          {title}
        </h1>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-tech text-mist/60">Last updated {updated}</p>
        <p className="mt-8 max-w-3xl text-base leading-relaxed text-mist">{intro}</p>

        <div className="mt-12 grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-16">
          <nav aria-label="On this page" className="lg:sticky lg:top-32 lg:h-fit">
            <h2 className="mb-4 font-mono text-[10px] uppercase tracking-tech text-cyan/70">Contents</h2>
            <ol className="space-y-2">
              {sections.map((s, i) =>
              <li key={s.id}>
                  <a
                  href={`#${s.id}`}
                  data-cursor="JUMP"
                  className="flex gap-3 text-sm text-mist transition-colors duration-200 ease-out hover:text-cyan">
                  
                    <span className="font-mono text-[11px] text-cyan/40">{String(i + 1).padStart(2, '0')}</span>
                    {s.title}
                  </a>
                </li>
              )}
            </ol>
          </nav>

          <div className="max-w-3xl [&_a]:underline-offset-2 [&_li]:mb-2 [&_li]:pl-1 [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6">
            {sections.map((s, i) =>
            <section key={s.id} id={s.id} className="scroll-mt-28 border-t border-cyan/12 py-8 first:border-t-0 first:pt-0">
                <h2 className="font-display text-xl font-bold uppercase tracking-[0.1em] text-chalk">
                  <span className="mr-3 font-mono text-[12px] font-normal text-cyan/50">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {s.title}
                </h2>
                <div className="mt-4 space-y-4">
                  {s.body.map((p, pi) =>
                typeof p === 'string' ?
                <p key={pi} className="text-[15px] leading-7 text-mist">
                    {p}
                  </p> :
                <div key={pi} className="text-[15px] leading-7 text-mist">
                    {p}
                  </div>
                )}
                </div>
              </section>
            )}

            <div className="mt-8 border border-cyan/20 p-6">
              <h2 className="font-display text-base font-bold uppercase tracking-[0.14em] text-chalk">Questions</h2>
              <p className="mt-2 text-[15px] leading-7 text-mist">
                Write to{' '}
                <a href={`mailto:${contactInfo.email}`} className="text-cyan hover:text-cyan-soft" data-cursor="MAIL">
                  {contactInfo.email}
                </a>{' '}
                or {contactInfo.address}.
              </p>
              <div className="mt-5 flex flex-wrap gap-4 font-mono text-[11px] uppercase tracking-tech">
                <Link to="/" className="text-cyan hover:text-cyan-soft" data-cursor="HOME">
                  ← Back to OmneScene
                </Link>
                <Link to="/privacy" className="text-mist hover:text-cyan">
                  Privacy
                </Link>
                <Link to="/terms" className="text-mist hover:text-cyan">
                  Terms
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>);

}