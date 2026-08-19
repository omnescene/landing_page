/** Vertical offset reserved for the floating navigation capsule. */
const NAV_OFFSET = 96;

export function scrollToSection(id: string, behavior: ScrollBehavior = 'smooth'): boolean {
  const el = document.getElementById(id);
  if (!el) return false;
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top: Math.max(top, 0), behavior });
  return true;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function isCoarsePointer(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return !window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}