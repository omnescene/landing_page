import React, { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Eyebrow, Headline, Lede } from '../Typography';
import { architectureLayers, integrations } from '../../data/site';

const physicalChain = [
{ title: 'Digital environment', note: 'Geometry, materials, lighting, agents.' },
{ title: 'Physical simulation', note: 'Contact, friction, mass, sensor response.' },
{ title: 'AI decision', note: 'Perception, prediction, planning, control.' },
{ title: 'Robot / vehicle', note: 'The same stack that ships on the machine.' },
{ title: 'Real world', note: 'Deployment, with the failure modes already known.' }];


function PhysicalAI() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] });
  const grow = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div id="physical-ai" className="relative scroll-mt-28 px-5 py-28 sm:px-8 lg:py-36">
      <div className="mx-auto max-w-[1500px]">
        <div className="max-w-4xl">
          <Eyebrow index="06">Physical AI</Eyebrow>
          <Headline
            text="FROM DIGITAL WORLD TO *PHYSICAL* INTELLIGENCE."
            className="mt-5 text-[9.5vw] sm:text-[6.4vw] lg:text-[4vw]" />
          
          <Lede className="mt-5">
            Simulation is only useful if it connects to the machine. Each stage feeds the next with the same models,
            the same physics and the same code path.
          </Lede>
        </div>

        <div ref={ref} className="relative mt-16">
          <div className="absolute bottom-0 left-[7px] top-0 w-px bg-cyan/15 lg:hidden" aria-hidden="true" />
          <motion.div
            style={{ height: reduced ? '100%' : grow }}
            className="absolute left-[7px] top-0 w-px bg-cyan lg:hidden"
            aria-hidden="true" />
          
          <div className="absolute left-0 right-0 top-[9px] hidden h-px bg-cyan/15 lg:block" aria-hidden="true" />
          <motion.div
            style={{ width: reduced ? '100%' : grow }}
            className="absolute left-0 top-[9px] hidden h-px bg-cyan shadow-[0_0_14px_rgba(46,230,214,0.6)] lg:block"
            aria-hidden="true" />
          

          <ol className="grid gap-8 pl-8 lg:grid-cols-5 lg:gap-4 lg:pl-0">
            {physicalChain.map((step, i) =>
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-15%' }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: [0.23, 1, 0.32, 1] }}
              className="relative">
              
                <span
                className="absolute -left-8 top-1 h-[15px] w-[15px] rounded-full border border-cyan/60 bg-void lg:-left-0 lg:top-[2px]"
                aria-hidden="true" />
              
                <span
                className="absolute -left-[26px] top-[7px] h-[3px] w-[3px] rounded-full bg-cyan lg:left-[6px]"
                aria-hidden="true" />
              
                <div className="lg:pt-8">
                  <h3 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-chalk">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-mist">{step.note}</p>
                </div>
              </motion.li>
            )}
          </ol>
        </div>
      </div>
    </div>);

}

function Architecture() {
  const [activeId, setActiveId] = useState(architectureLayers[0].id);
  const active = architectureLayers.find((l) => l.id === activeId) ?? architectureLayers[0];

  return (
    <div id="architecture" className="relative scroll-mt-28 px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <Eyebrow index="07">Product architecture</Eyebrow>
            <Headline text="HOW OMNESCENE *WORKS*." className="mt-5 text-[11vw] sm:text-[7vw] lg:text-[4.4vw]" />
          </div>
          <Lede className="lg:pb-3">
            Five layers, one pipeline. Hover or focus a layer to see what happens inside it.
          </Lede>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <ul className="relative space-y-2">
            {architectureLayers.map((layer, i) => {
              const isActive = layer.id === activeId;
              return (
                <li key={layer.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveId(layer.id)}
                    onFocus={() => setActiveId(layer.id)}
                    onClick={() => setActiveId(layer.id)}
                    data-cursor="INSPECT"
                    aria-pressed={isActive}
                    className={`relative flex w-full items-center gap-5 border-l-2 px-5 py-5 text-left transition-colors duration-200 ease-out ${
                    isActive ?
                    'border-l-cyan bg-cyan/[0.07]' :
                    'border-l-cyan/20 hover:border-l-cyan/60 hover:bg-cyan/[0.03]'}`
                    }
                    style={{ marginLeft: `${i * 18}px` }}>
                    
                    <span
                      className={`font-mono text-[11px] transition-colors duration-200 ease-out ${
                      isActive ? 'text-cyan' : 'text-mist/50'}`
                      }>
                      
                      {`L${i + 1}`}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={`block font-display text-lg font-bold uppercase tracking-[0.14em] transition-colors duration-200 ease-out sm:text-xl ${
                        isActive ? 'text-cyan' : 'text-chalk'}`
                        }>
                        
                        {layer.title}
                      </span>
                      <span className="mt-1 block text-xs text-mist">{layer.items.join(' · ')}</span>
                    </span>
                    {isActive ?
                    <motion.span
                      layoutId="arch-glow"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-0 -z-10 shadow-[inset_0_0_60px_-24px_rgba(46,230,214,0.9)]"
                      aria-hidden="true" /> :

                    null}
                  </button>
                  {i < architectureLayers.length - 1 ?
                  <span
                    className="ml-6 block h-4 w-px bg-cyan/25"
                    style={{ marginLeft: `${i * 18 + 24}px` }}
                    aria-hidden="true" /> :

                  null}
                </li>);

            })}
          </ul>

          <div className="lg:sticky lg:top-32 lg:h-fit">
            <motion.div key={active.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}>
              <span className="font-mono text-[10px] uppercase tracking-tech text-cyan/70">Layer detail</span>
              <h3 className="mt-3 font-display text-2xl font-extrabold uppercase tracking-[0.1em] text-chalk sm:text-3xl">
                {active.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-mist sm:text-base">{active.detail}</p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {active.items.map((item) =>
                <li key={item} className="flex items-center gap-2 text-sm text-chalk/85">
                    <span className="h-1 w-1 shrink-0 bg-cyan" aria-hidden="true" />
                    {item}
                  </li>
                )}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>);

}

function TechnologyNetwork() {
  const reduced = useReducedMotion();
  const nodes = [
  { x: 70, y: 60 },
  { x: 530, y: 60 },
  { x: 70, y: 300 },
  { x: 530, y: 300 }];


  return (
    <div id="technology" className="relative scroll-mt-28 px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <Eyebrow index="08">Technology integration</Eyebrow>
            <Headline
              text="CONNECTS TO THE *STACK* YOU ALREADY RUN."
              className="mt-5 text-[9vw] sm:text-[6vw] lg:text-[3.3vw]" />
            
            <Lede className="mt-5">
              OmneScene interoperates with the simulation and robotics ecosystem rather than replacing it. Scenes,
              assets and control loops move across the boundary.
            </Lede>
            <dl className="mt-8 space-y-3">
              {integrations.map((tech) =>
              <div key={tech.id} className="flex items-baseline justify-between gap-6 border-b border-cyan/12 pb-3">
                  <dt className="font-display text-base font-bold uppercase tracking-[0.16em] text-chalk">
                    {tech.name}
                  </dt>
                  <dd className="text-right font-mono text-[11px] uppercase tracking-[0.12em] text-mist/80">
                    {tech.role}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          <div className="relative">
            <svg viewBox="0 0 600 360" className="h-auto w-full" role="img" aria-label="OmneScene connected to Omniverse, Cosmos, OpenUSD and Isaac">
              <defs>
                <radialGradient id="coreGlow">
                  <stop offset="0%" stopColor="rgba(46,230,214,0.5)" />
                  <stop offset="100%" stopColor="rgba(46,230,214,0)" />
                </radialGradient>
              </defs>
              <circle cx="300" cy="180" r="130" fill="url(#coreGlow)" />
              {nodes.map((n, i) =>
              <g key={i}>
                  <line x1={n.x} y1={n.y} x2={300} y2={180} stroke="rgba(46,230,214,0.28)" strokeWidth="1" />
                  {!reduced ?
                <motion.circle
                  r="3"
                  fill="#7ff5e8"
                  initial={{ cx: n.x, cy: n.y }}
                  animate={{ cx: [n.x, 300], cy: [n.y, 180] }}
                  transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.5, ease: 'linear' }} /> :

                null}
                  <circle cx={n.x} cy={n.y} r="26" fill="rgba(3,8,9,0.9)" stroke="rgba(46,230,214,0.45)" />
                  <text
                  x={n.x}
                  y={n.y + 4}
                  textAnchor="middle"
                  style={{ font: '600 11px Oxanium, sans-serif', fill: '#2ee6d6', letterSpacing: '0.08em' }}>
                  
                    {integrations[i].name.slice(0, 4).toUpperCase()}
                  </text>
                  <text
                  x={n.x}
                  y={n.y + (n.y < 180 ? -36 : 46)}
                  textAnchor="middle"
                  style={{ font: '400 10px "JetBrains Mono", monospace', fill: 'rgba(150,179,178,0.8)', letterSpacing: '0.12em' }}>
                  
                    {integrations[i].name.toUpperCase()}
                  </text>
                </g>
              )}
              <circle cx="300" cy="180" r="54" fill="rgba(3,8,9,0.9)" stroke="rgba(46,230,214,0.8)" strokeWidth="1.4" />
              <circle cx="300" cy="180" r="66" fill="none" stroke="rgba(46,230,214,0.2)" strokeDasharray="4 8" />
              <text
                x="300"
                y="176"
                textAnchor="middle"
                style={{ font: '800 15px Oxanium, sans-serif', fill: '#e6f6f4', letterSpacing: '0.1em' }}>
                
                OMNE
              </text>
              <text
                x="300"
                y="194"
                textAnchor="middle"
                style={{ font: '800 15px Oxanium, sans-serif', fill: '#2ee6d6', letterSpacing: '0.1em' }}>
                
                SCENE
              </text>
            </svg>
          </div>
        </div>
      </div>
    </div>);

}

export function SystemArchitecture() {
  return (
    <section aria-label="Physical AI, product architecture and technology integration">
      <PhysicalAI />
      <Architecture />
      <TechnologyNetwork />
    </section>);

}