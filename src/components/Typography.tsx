import React from 'react';

export function TechLabel({
  children,
  className = ''



}: {children: React.ReactNode;className?: string;}) {
  return (
    <span
      className={`font-mono text-[10px] uppercase tracking-tech text-cyan/70 sm:text-[11px] ${className}`}>
      
      {children}
    </span>);

}

export function Eyebrow({ children, index }: {children: React.ReactNode;index?: string;}) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-8 bg-cyan/50" aria-hidden="true" />
      {index ? <span className="font-mono text-[11px] text-cyan/50">{index}</span> : null}
      <TechLabel>{children}</TechLabel>
    </div>);

}

/**
 * Section heading. Words wrapped in asterisks render in cyan,
 * e.g. "TEST THE *WORLD* BEFORE YOU ENTER IT."
 */
export function Headline({
  text,
  as: Tag = 'h2',
  className = ''




}: {text: string;as?: 'h1' | 'h2' | 'h3';className?: string;}) {
  const parts = text.split('*');
  return (
    <Tag
      className={`font-display font-extrabold uppercase leading-[0.92] tracking-[-0.01em] text-chalk ${className}`}>
      
      {parts.map((part, i) =>
      i % 2 === 1 ?
      <span key={i} className="text-cyan [text-shadow:0_0_28px_rgba(46,230,214,0.35)]">
            {part}
          </span> :

      <React.Fragment key={i}>{part}</React.Fragment>

      )}
    </Tag>);

}

export function Lede({ children, className = '' }: {children: React.ReactNode;className?: string;}) {
  return <p className={`max-w-2xl text-base leading-relaxed text-mist sm:text-lg ${className}`}>{children}</p>;
}

export function Rule({ className = '' }: {className?: string;}) {
  return <div className={`omne-hairline h-px w-full ${className}`} aria-hidden="true" />;
}