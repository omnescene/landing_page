import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Eyebrow, Headline, Lede } from '../Typography';
import { workflowStages } from '../../data/site';

const chain = [
{ title: 'Real environment', note: 'A road, a warehouse, a factory floor.' },
{ title: 'Generated environment', note: 'Rebuilt as a physical world you control.' },
{ title: 'Simulation', note: 'Physics, sensors and agents run together.' },
{ title: 'Test result', note: 'Pass, fail, and the exact seed to replay it.' }];


function TransformChain() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 55%'] });
  const grow = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div ref={ref} className="relative mt-16">
      <div className="absolute left-0 right-0 top-[74px] hidden h-px bg-cyan/15 md:block" aria-hidden="true" />
      <motion.div
        style={{ width: grow }}
        className="absolute left-0 top-[74px] hidden h-px bg-cyan shadow-[0_0_14px_rgba(46,230,214,0.7)] md:block"
        aria-hidden="true" />
      
      <ol className="grid gap-10 md:grid-cols-4 md:gap-6">
        {chain.map((step, i) =>
        <motion.li
          key={step.title}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
          className="relative">
          
            <div className="h-14 md:h-14">
              <span className="font-mono text-[11px] text-cyan/60">{`0${i + 1}`}</span>
              <div className="mt-2 flex h-6 items-end gap-[3px]" aria-hidden="true">
                {Array.from({ length: 14 }).map((_, b) =>
              <span
                key={b}
                className="w-[3px] bg-cyan/50"
                style={{
                  height: `${20 + (b * 37 + i * 53) % 80}%`,
                  opacity: 0.25 + (b + i) % 4 * 0.2
                }} />

              )}
              </div>
            </div>
            <span
            className="absolute left-0 top-[68px] hidden h-2.5 w-2.5 -translate-y-1/2 rotate-45 border border-cyan bg-void md:block"
            aria-hidden="true" />
          
            <h3 className="mt-8 font-display text-base font-bold uppercase tracking-[0.14em] text-chalk md:mt-10">
              {step.title}
            </h3>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-mist">{step.note}</p>
          </motion.li>
        )}
      </ol>
    </div>);

}

function Workflow() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 70%'] });
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div id="workflow" className="relative mt-40 scroll-mt-28">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.6fr]">
        <div className="lg:sticky lg:top-32 lg:h-fit">
          <Eyebrow index="02">Core workflow</Eyebrow>
          <Headline text="FIVE STAGES. ONE *CONTINUOUS* LOOP." className="mt-5 text-3xl sm:text-4xl lg:text-[3.1vw]" />
          <Lede className="mt-5">
            Every OmneScene run moves through the same sequence. Connect what you have, generate the world around it,
            let physics decide what happens, then measure it.
          </Lede>
        </div>

        <div ref={ref} className="relative pl-10 sm:pl-14">
          <div className="absolute bottom-4 left-[15px] top-3 w-px bg-cyan/15 sm:left-[23px]" aria-hidden="true" />
          <motion.div
            style={{ height: reduced ? '100%' : height }}
            className="absolute left-[15px] top-3 w-px bg-cyan shadow-[0_0_12px_rgba(46,230,214,0.8)] sm:left-[23px]"
            aria-hidden="true" />
          
          <ol className="space-y-12 sm:space-y-16">
            {workflowStages.map((stage, i) =>
            <motion.li
              key={stage.index}
              initial={{ opacity: 0, x: 26 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-20%' }}
              transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
              className="relative"
              style={{ marginLeft: `${i * 14}px` }}>
              
                <span
                className="absolute -left-10 top-2 flex h-[9px] w-[9px] items-center justify-center rounded-full border border-cyan bg-void sm:-left-14"
                aria-hidden="true">
                
                  <span className="h-[3px] w-[3px] rounded-full bg-cyan" />
                </span>
                <div className="flex flex-wrap items-baseline gap-4">
                  <span className="font-display text-4xl font-extrabold leading-none text-cyan/25 sm:text-5xl">
                    {stage.index}
                  </span>
                  <h3 className="font-display text-2xl font-bold uppercase tracking-[0.14em] text-chalk sm:text-3xl">
                    {stage.title}
                  </h3>
                </div>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-mist sm:text-base">{stage.copy}</p>
                <span className="mt-4 block h-px w-24 bg-cyan/25" aria-hidden="true" />
              </motion.li>
            )}
          </ol>
        </div>
      </div>
    </div>);

}

export function PlatformStory() {
  return (
    <section id="platform" className="relative scroll-mt-28 px-5 py-28 sm:px-8 lg:py-40">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-end">
          <div>
            <Eyebrow index="01">The problem</Eyebrow>
            <Headline
              text="TEST THE *WORLD* BEFORE YOU ENTER IT."
              className="mt-5 text-[10vw] leading-[0.9] sm:text-[7vw] lg:text-[4.6vw]" />
            
          </div>
          <Lede className="lg:pb-3">
            Real-world testing is expensive. Edge cases are hard to reproduce. OmneScene creates virtual environments
            where intelligent systems can be tested at scale.
          </Lede>
        </div>

        <TransformChain />
        <Workflow />
      </div>
    </section>);

}