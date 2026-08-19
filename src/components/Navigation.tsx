import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MenuIcon, XIcon } from 'lucide-react';
import { navLinks } from '../data/site';
import { useUI } from '../contexts/UIContext';
import { useActiveSection } from '../hooks/useActiveSection';
import { useSectionNav } from '../hooks/useSectionNav';

const sectionIds = navLinks.filter((l) => l.section).map((l) => l.section as string);

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const goToSection = useSectionNav();
  const { openModal } = useUI();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const onLanding = location.pathname === '/';
  const active = useActiveSection(sectionIds, onLanding);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const currentLabel = useMemo(() => {
    if (location.pathname === '/about') return 'COMPANY';
    if (location.pathname === '/terms') return 'LEGAL / TERMS';
    if (location.pathname === '/privacy') return 'LEGAL / PRIVACY';
    return (active ?? 'platform').toUpperCase();
  }, [active, location.pathname]);

  const handle = (link: (typeof navLinks)[number]) => {
    setOpen(false);
    if (link.path) navigate(link.path);else
    if (link.section) goToSection(link.section);
  };

  return (
    <>
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 top-0 z-[80] h-px w-full origin-left bg-cyan/70"
        aria-hidden="true" />
      

      <header className="pointer-events-none fixed inset-x-0 top-0 z-[70] px-3 pt-3 sm:px-6 sm:pt-5">
        <div className="pointer-events-auto mx-auto flex max-w-[1500px] items-center gap-3">
          {/* System control */}
          <Link
            to="/"
            data-cursor="HOME"
            aria-label="OmneScene home"
            className="group flex shrink-0 items-center transition-colors duration-200 ease-out"
          >
            <img
              src="/logo.svg"
              alt="OmneScene"
              className="h-20 w-auto sm:h-24"
            />
          </Link>

          {/* Floating menu */}
          <nav
            aria-label="Primary"
            className={`hidden flex-1 items-center justify-center gap-1 border px-2 py-2 transition-colors duration-200 ease-out lg:flex ${
            scrolled ? 'border-cyan/25 bg-abyss/80 backdrop-blur-md' : 'border-cyan/15 bg-void/40 backdrop-blur-sm'}`
            }>
            
            {navLinks.map((link) => {
              const isActive = link.path ? location.pathname === link.path : onLanding && active === link.section;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handle(link)}
                  data-cursor="GO"
                  aria-current={isActive ? 'page' : undefined}
                  className="relative px-4 py-1.5 font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-mist transition-colors duration-200 ease-out hover:text-chalk">
                  
                  {isActive ?
                  <motion.span
                    layoutId="nav-active"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    className="absolute inset-0 border border-cyan/40 bg-cyan/10"
                    aria-hidden="true" /> :

                  null}
                  <span className={`relative ${isActive ? 'text-cyan' : ''}`}>{link.label}</span>
                </button>);

            })}
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <div
              className={`hidden items-center gap-2 border px-3 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-mist/70 xl:flex ${
              scrolled ? 'border-cyan/25 bg-abyss/80 backdrop-blur-md' : 'border-cyan/15 bg-void/40 backdrop-blur-sm'}`
              }>
              
              <span className="text-cyan/70">SEC</span>
              <span className="text-chalk">{currentLabel}</span>
            </div>

            <Link
              to="/product"
              data-cursor="OPEN"
              className="hidden bg-cyan px-4 py-2.5 font-display text-[11px] font-bold uppercase tracking-[0.18em] text-void transition-colors duration-200 ease-out hover:bg-cyan-soft md:block">
              
              OmneScene
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className={`border p-2.5 text-chalk transition-colors duration-200 ease-out hover:border-cyan/60 hover:text-cyan lg:hidden ${
              scrolled ? 'border-cyan/25 bg-abyss/80 backdrop-blur-md' : 'border-cyan/15 bg-void/40 backdrop-blur-sm'}`
              }>
              
              <MenuIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ?
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          className="fixed inset-0 z-[85] flex flex-col bg-void/97 backdrop-blur-lg lg:hidden">
          
            <div className="flex items-center justify-between border-b border-cyan/15 px-4 py-4">
              <span className="font-display text-sm font-bold uppercase tracking-[0.24em] text-chalk">
                Omne<span className="text-cyan">Scene</span>
              </span>
              <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="border border-cyan/25 p-2.5 text-chalk">
              
                <XIcon className="h-4 w-4" />
              </button>
            </div>
            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 py-6">
              <ul className="space-y-1">
                {navLinks.map((link, i) =>
              <motion.li
                key={link.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * i, duration: 0.24, ease: [0.23, 1, 0.32, 1] }}>
                
                    <button
                  type="button"
                  onClick={() => handle(link)}
                  className="flex w-full items-center justify-between border-b border-cyan/10 py-4 text-left font-display text-2xl font-bold uppercase tracking-wide text-chalk">
                  
                      {link.label}
                      <span className="font-mono text-[10px] text-cyan/50">0{i + 1}</span>
                    </button>
                  </motion.li>
              )}
              </ul>
              <div className="mt-8 grid grid-cols-2 gap-3">
                <Link to="/terms" className="border border-cyan/20 px-3 py-3 text-center font-mono text-[10px] uppercase tracking-tech text-mist">
                  Terms
                </Link>
                <Link to="/privacy" className="border border-cyan/20 px-3 py-3 text-center font-mono text-[10px] uppercase tracking-tech text-mist">
                  Privacy
                </Link>
              </div>
              <button
              type="button"
              onClick={() => {
                setOpen(false);
                openModal('contact');
              }}
              className="mt-3 w-full bg-cyan px-4 py-4 font-display text-sm font-bold uppercase tracking-[0.18em] text-void">
              
                Request Access
              </button>
              <p className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-tech text-cyan/60">
                <span className="h-1 w-1 animate-pulseline rounded-full bg-cyan" /> Simulation engine online
              </p>
            </nav>
          </motion.div> :
        null}
      </AnimatePresence>
    </>);

}