import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Route transition: a cyan scan line crosses the screen, resolves into a
 * coordinate grid, and the new page emerges from it.
 */
export function PageTransition({ children }: {children: React.ReactNode;}) {
  const reduced = useReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
      className="relative">
      
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'linear' }}
        className="pointer-events-none fixed inset-0 z-[75] bg-[linear-gradient(to_right,rgba(46,230,214,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(46,230,214,0.10)_1px,transparent_1px)] [background-size:46px_46px]" />
      
      <motion.div
        aria-hidden="true"
        initial={{ scaleX: 1, opacity: 1 }}
        animate={{ scaleX: 0, opacity: 0 }}
        style={{ originX: 1 }}
        transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
        className="pointer-events-none fixed left-0 top-0 z-[76] h-full w-full bg-[linear-gradient(90deg,rgba(3,8,9,0)_0%,rgba(3,8,9,0.9)_60%,rgba(46,230,214,0.9)_100%)]" />
      
      <motion.div
        initial={{ y: 18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.06, ease: [0.23, 1, 0.32, 1] }}>
        
        {children}
      </motion.div>
    </motion.div>);

}