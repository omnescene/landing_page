import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CornerDownLeftIcon, SearchIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUI } from '../contexts/UIContext';
import { searchIndex } from '../data/site';
import { useSectionNav } from '../hooks/useSectionNav';

export function SearchOverlay() {
  const { searchOpen, setSearchOpen, openModal } = useUI();
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const goToSection = useSectionNav();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return searchIndex.slice(0, 7);
    return searchIndex.filter(
      (item) =>
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.keywords.includes(q)
    );
  }, [query]);

  useEffect(() => {
    if (!searchOpen) return;
    setQuery('');
    setCursor(0);
    const timer = window.setTimeout(() => inputRef.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', onKey);
    };
  }, [searchOpen, setSearchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setSearchOpen]);

  const select = (index: number) => {
    const item = results[index];
    if (!item) return;
    setSearchOpen(false);
    if (item.path) {
      navigate(item.path);
    } else if (item.section === 'docs') {
      openModal('docs');
    } else if (item.section) {
      goToSection(item.section);
    }
  };

  return (
    <AnimatePresence>
      {searchOpen ?
      <div className="fixed inset-0 z-[95] flex items-start justify-center p-4 pt-[14vh]">
          <motion.button
          type="button"
          aria-label="Close search"
          onClick={() => setSearchOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 cursor-default bg-void/85 backdrop-blur-sm" />
        
          <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          role="dialog"
          aria-label="Search OmneScene"
          className="relative w-full max-w-xl border border-cyan/25 bg-abyss/95">
          
            <div className="flex items-center gap-3 border-b border-cyan/15 px-4 py-3.5">
              <SearchIcon className="h-4 w-4 text-cyan" />
              <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCursor(0);
              }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  setCursor((c) => Math.min(c + 1, results.length - 1));
                }
                if (e.key === 'ArrowUp') {
                  e.preventDefault();
                  setCursor((c) => Math.max(c - 1, 0));
                }
                if (e.key === 'Enter') select(cursor);
              }}
              placeholder="Search simulation, robotics, pricing…"
              aria-label="Search the site"
              className="w-full bg-transparent text-sm text-chalk placeholder:text-mist/50 focus:outline-none" />
            
              <span className="hidden font-mono text-[10px] uppercase tracking-tech text-mist/50 sm:block">Esc</span>
            </div>
            <ul className="omne-scroll max-h-[52vh] overflow-y-auto py-2">
              {results.length === 0 ?
            <li className="px-4 py-6 text-center font-mono text-[11px] uppercase tracking-tech text-mist/60">
                  No matching sections
                </li> :

            results.map((item, i) =>
            <li key={item.title}>
                    <button
                type="button"
                onMouseEnter={() => setCursor(i)}
                onClick={() => select(i)}
                data-cursor="OPEN"
                className={`flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition-colors duration-150 ease-out ${
                i === cursor ? 'bg-cyan/10' : 'hover:bg-cyan/[0.05]'}`
                }>
                
                      <span>
                        <span className="block font-display text-sm font-semibold uppercase tracking-wide text-chalk">
                          {item.title}
                        </span>
                        <span className="block text-xs text-mist">{item.description}</span>
                      </span>
                      {i === cursor ? <CornerDownLeftIcon className="h-3.5 w-3.5 shrink-0 text-cyan" /> : null}
                    </button>
                  </li>
            )
            }
            </ul>
          </motion.div>
        </div> :
      null}
    </AnimatePresence>);

}