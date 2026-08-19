import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type Variant = 'primary' | 'ghost' | 'quiet';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: Variant;
  icon?: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  cursorLabel?: string;
  ariaLabel?: string;
};

const base =
'group relative inline-flex items-center justify-center gap-2.5 px-6 py-3 font-display text-[12px] font-semibold uppercase tracking-[0.18em] transition-[background-color,border-color,color,box-shadow] duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary:
  'bg-cyan text-void hover:bg-cyan-soft [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] shadow-[0_0_36px_-10px_rgba(46,230,214,0.75)]',
  ghost:
  'border border-cyan/35 bg-cyan/[0.04] text-chalk hover:border-cyan/70 hover:bg-cyan/10 [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)]',
  quiet: 'text-mist hover:text-cyan px-0 py-1 tracking-[0.16em]'
};

/** Button with subtle magnetic response to the pointer. */
export function ActionButton({
  children,
  onClick,
  variant = 'primary',
  icon,
  className = '',
  type = 'button',
  disabled = false,
  cursorLabel,
  ariaLabel
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setOffset({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 10,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 6
    });
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      data-cursor={cursorLabel ?? 'ACT'}
      onMouseMove={handleMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 260, damping: 18, mass: 0.4 }}
      whileTap={reduced ? undefined : { scale: 0.97 }}
      className={`${base} ${variants[variant]} ${className}`}>
      
      {icon}
      <span>{children}</span>
    </motion.button>);

}