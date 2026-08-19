import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
  wide?: boolean;
};

export function Modal({ open, onClose, title, eyebrow, children, wide = false }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    const focusTimer = window.setTimeout(() => panelRef.current?.focus(), 40);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
      window.clearTimeout(focusTimer);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ?
      <div className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto p-4 py-10 sm:p-8">
          <motion.button
          type="button"
          aria-label="Close dialog"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="fixed inset-0 cursor-default bg-void/85 backdrop-blur-sm" />
        
          <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          tabIndex={-1}
          initial={{ opacity: 0, y: 18, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.98 }}
          transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}
          className={`relative w-full ${wide ? 'max-w-4xl' : 'max-w-xl'} border border-cyan/25 bg-abyss/95 outline-none`}>
          
            <span className="absolute -left-px -top-px h-5 w-5 border-l-2 border-t-2 border-cyan" aria-hidden="true" />
            <span className="absolute -bottom-px -right-px h-5 w-5 border-b-2 border-r-2 border-cyan" aria-hidden="true" />
            <div className="flex items-start justify-between gap-6 border-b border-cyan/15 px-6 py-5 sm:px-8">
              <div>
                {eyebrow ?
              <span className="font-mono text-[10px] uppercase tracking-tech text-cyan/70">{eyebrow}</span> :
              null}
                <h2 className="mt-1 font-display text-xl font-bold uppercase tracking-wide text-chalk sm:text-2xl">
                  {title}
                </h2>
              </div>
              <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              data-cursor="CLOSE"
              className="mt-1 shrink-0 border border-cyan/25 p-2 text-mist transition-colors duration-200 ease-out hover:border-cyan/60 hover:text-cyan">
              
                <XIcon className="h-4 w-4" />
              </button>
            </div>
            <div className="px-6 py-6 sm:px-8">{children}</div>
          </motion.div>
        </div> :
      null}
    </AnimatePresence>);

}