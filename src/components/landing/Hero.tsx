import React, { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownIcon, PlayIcon } from 'lucide-react';
import { SimulationScene } from '../SimulationScene';
import { ActionButton } from '../Button';
import { TechLabel } from '../Typography';
import { scrollToSection } from '../../utils/scroll';

const readouts = [
{ label: 'Simulation engine', value: 'ONLINE' },
{ label: 'Environments', value: 'GENERATIVE' },
{ label: 'Physical AI', value: 'ACTIVE' }];


const stages = ['REAL WORLD', 'VIRTUAL WORLD', 'AUTONOMOUS TESTING'];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [overlay, setOverlay] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const stepped = Math.round(v * 10) / 10;
    setOverlay((prev) => prev === stepped ? prev : stepped);
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -140]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, reduced ? 1 : 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.14]);

  const activeStage = overlay < 0.28 ? 0 : overlay < 0.62 ? 1 : 2;

  return (
    <section
      id="hero"
      ref={ref}
      aria-label="OmneScene simulation platform"
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden pb-10 pt-28 sm:pb-14">
      
      <motion.div style={{ scale: sceneScale }} className="absolute inset-0 -z-10">
        <SimulationScene
          kind="road"
          traffic={1}
          speed={0.22}
          overlay={overlay}
          labels
          ariaLabel="Live simulated road environment with an autonomous vehicle, sensor rays and generated buildings" />
        
      </motion.div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-void via-void/55 to-transparent" />
      <div className="pointer-events-none absolute inset-0 -z-10 hero-grid" aria-hidden="true" />
      <div className="pointer-events-none absolute right-[7%] top-[16%] hidden h-56 w-56 rounded-full border border-cyan/20 lg:block" aria-hidden="true" />
      <div className="pointer-events-none absolute right-[14%] top-[26%] hidden h-28 w-28 rounded-full border border-cyan/15 lg:block" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-void to-transparent" />

      <div className="pointer-events-none absolute right-6 top-24 hidden w-56 rounded-2xl border border-cyan/20 bg-void/70 p-4 shadow-[0_0_25px_rgba(46,230,214,0.12)] backdrop-blur-sm lg:block">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-tech text-mist/70">
          <span>Scene mesh</span>
          <span className="text-cyan">LIVE</span>
        </div>
        <div className="mt-4 space-y-2">
          {['Terrain', 'Agents', 'Sensors'].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_10px_rgba(46,230,214,0.9)]" aria-hidden="true" />
              <span className="text-[11px] uppercase tracking-[0.12em] text-chalk/80">{label}</span>
              <span className="ml-auto h-1.5 w-20 overflow-hidden rounded-full bg-cyan/10">
                <span
                  className="block h-full rounded-full bg-cyan"
                  style={{ width: `${72 + i * 10}%` }}
                  aria-hidden="true"
                />
              </span>
            </div>
          ))}
        </div>
      </div>

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="mx-auto w-full max-w-[1500px] px-5 sm:px-8">
        
        <div className="grid gap-10 lg:grid-cols-[1.5fr_0.85fr] lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 animate-pulseline bg-cyan" aria-hidden="true" />
              <TechLabel>Generative physical-world simulation</TechLabel>
            </div>
            <h1 className="mt-5 font-display text-[10vw] font-extrabold uppercase leading-[0.85] tracking-[-0.02em] text-chalk sm:text-[7.5vw] lg:text-[4.8vw]">
             Transform Real <span className="text-cyan [text-shadow:0_0_40px_rgba(46,230,214,0.45)]">world</span>.
              <br />
              Complexity Into  <span className="text-cyan [text-shadow:0_0_40px_rgba(46,230,214,0.45)]">Scalable</span> AI-Powered Simulations.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-chalk/80 sm:text-lg">
              AI-powered simulation for robotics and autonomous systems.
            </p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-mist sm:text-base">
              Generate realistic environments, test physical behavior, and validate intelligent machines before
              deployment.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ActionButton onClick={() => scrollToSection('platform')} cursorLabel="EXPLORE">
                Explore OmneCore 
              </ActionButton>
              <ActionButton
                variant="ghost"
                onClick={() => scrollToSection('workflow')}
                cursorLabel="WATCH"
                icon={<PlayIcon className="h-3 w-3" />}>
                
                See how it works
              </ActionButton>
            </div>
          </div>

          {/* Status readout, wired into the environment rather than boxed */}
          <div className="lg:pb-3">
            <div className="space-y-0 border-l border-cyan/30 pl-5">
              {readouts.map((r, i) =>
              <div key={r.label} className="relative py-3">
                  <span
                  className="absolute -left-[23px] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_10px_rgba(46,230,214,0.9)]"
                  style={{ animationDelay: `${i * 0.4}s` }}
                  aria-hidden="true" />
                
                  <span className="block font-mono text-[10px] uppercase tracking-tech text-mist/70">{r.label}</span>
                  <span className="mt-1 block font-display text-lg font-bold uppercase tracking-[0.12em] text-cyan">
                    {r.value}
                  </span>
                </div>
              )}
              <div className="border-t border-cyan/15 pt-3 font-mono text-[10px] uppercase tracking-tech text-mist/60">
                Scenarios generated today · 48,912
              </div>
            </div>
          </div>
        </div>

        {/* Hero → product transition ladder */}
        <div className="mt-10 flex items-center gap-3 sm:mt-14 sm:gap-5">
          {stages.map((s, i) =>
          <React.Fragment key={s}>
              <div className="flex items-center gap-2">
                <span
                className={`h-px w-4 transition-colors duration-300 ease-out sm:w-8 ${
                i <= activeStage ? 'bg-cyan' : 'bg-cyan/20'}`
                }
                aria-hidden="true" />
              
                <span
                className={`font-mono text-[9px] uppercase tracking-[0.18em] transition-colors duration-300 ease-out sm:text-[11px] ${
                i <= activeStage ? 'text-cyan' : 'text-mist/40'}`
                }>
                
                  {s}
                </span>
              </div>
              {i < stages.length - 1 ?
            <span className="hidden h-px flex-1 bg-cyan/15 sm:block" aria-hidden="true" /> :
            null}
            </React.Fragment>
          )}
          <button
            type="button"
            onClick={() => scrollToSection('platform')}
            data-cursor="SCROLL"
            aria-label="Scroll to product explanation"
            className="ml-auto hidden h-10 w-10 items-center justify-center border border-cyan/30 text-cyan transition-colors duration-200 ease-out hover:border-cyan hover:bg-cyan/10 sm:flex">
            
            <ArrowDownIcon className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </section>);

}