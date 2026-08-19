import { useEffect, useState } from 'react';

/**
 * Tracks which of the given section ids currently occupies the viewport,
 * using a scroll listener with a stable activation line near the top third.
 */
export function useActiveSection(ids: string[], enabled: boolean): string | null {
  const [active, setActive] = useState<string | null>(enabled ? ids[0] ?? null : null);

  useEffect(() => {
    if (!enabled) {
      setActive(null);
      return;
    }
    let frame = 0;
    const evaluate = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= line) current = id;
      }
      setActive(current ?? ids[0] ?? null);
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(evaluate);
    };
    evaluate();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [ids, enabled]);

  return active;
}