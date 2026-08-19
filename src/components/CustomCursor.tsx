import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { isCoarsePointer, prefersReducedMotion } from '../utils/scroll';

/**
 * OmneScene sensor cursor: a targeting ring, crosshair and data point that
 * expands and labels itself over interactive elements. Disabled on touch.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 900, damping: 45, mass: 0.25 });
  const springY = useSpring(y, { stiffness: 900, damping: 45, mass: 0.25 });
  const trailX = useSpring(x, { stiffness: 160, damping: 22, mass: 0.6 });
  const trailY = useSpring(y, { stiffness: 160, damping: 22, mass: 0.6 });

  useEffect(() => {
    if (isCoarsePointer() || prefersReducedMotion()) return;
    setEnabled(true);
    document.documentElement.classList.add('omne-cursor');

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      const hit = target?.closest?.('[data-cursor],a,button,input,textarea,select,summary') as HTMLElement | null;
      if (!hit) {
        setLabel(null);
        return;
      }
      setLabel(hit.getAttribute('data-cursor') ?? '');
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    return () => {
      document.documentElement.classList.remove('omne-cursor');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, [x, y]);

  if (!enabled) return null;
  const active = label !== null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
      <motion.div
        style={{ x: trailX, y: trailY }}
        className="absolute -ml-6 -mt-6 h-12 w-12 rounded-full border border-cyan/20" />
      
      <motion.div style={{ x: springX, y: springY }} className="absolute">
        <motion.div
          animate={{ scale: down ? 0.85 : active ? 1.45 : 1, opacity: active ? 1 : 0.8 }}
          transition={{ type: 'spring', stiffness: 420, damping: 28 }}
          className="relative -ml-4 -mt-4 h-8 w-8">
          
          <span className="absolute inset-0 rounded-full border border-cyan/70" />
          <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_10px_rgba(46,230,214,0.9)]" />
          <span className="absolute left-1/2 top-0 h-1.5 w-px -translate-x-1/2 bg-cyan/70" />
          <span className="absolute bottom-0 left-1/2 h-1.5 w-px -translate-x-1/2 bg-cyan/70" />
          <span className="absolute left-0 top-1/2 h-px w-1.5 -translate-y-1/2 bg-cyan/70" />
          <span className="absolute right-0 top-1/2 h-px w-1.5 -translate-y-1/2 bg-cyan/70" />
        </motion.div>
        {label ?
        <motion.span
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.14, ease: [0.23, 1, 0.32, 1] }}
          className="absolute left-6 top-5 whitespace-nowrap bg-cyan px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-void">
          
            {label}
          </motion.span> :
        null}
      </motion.div>
    </div>);

}