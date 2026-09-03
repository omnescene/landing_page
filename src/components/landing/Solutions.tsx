import React, { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import { Eyebrow, Headline } from '../Typography';
import { solutions } from '../../data/site';


export function Solutions() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [desktop, setDesktop] = useState(false);
  const horizontalProgress = useMotionValue(0);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!desktop || reduced) {
      horizontalProgress.set(0);
      return;
    }

    const controls = animate(horizontalProgress, [0, 1], {
      duration: 34,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'loop'
    });

    return () => controls.stop();
  }, [desktop, horizontalProgress, reduced]);

  const x = useTransform(horizontalProgress, [0, 1], ['0%', '-50%']);

  const horizontal = desktop && !reduced;

  return (
    <section
      id="solutions"
      ref={ref}
      className={`relative scroll-mt-28 isolate ${horizontal ? 'lg:min-h-[calc(100vh+520px)] lg:scroll-mt-0' : ''}`}>

      {/* Complete background cover to hide BackgroundField */}
      <div
        className="fixed inset-0 bg-none pointer-events-none"
        style={{
          backgroundColor: '#030809',
          backgroundImage: 'none',
          zIndex: -100
        }}
      />

      <div
        className={
        horizontal ?
        'lg:sticky lg:top-0 lg:h-[100svh] lg:flex lg:flex-col lg:justify-center lg:py-8 lg:!bg-transparent bg-none' :
        '!bg-transparent bg-none'
        }
        style={{ backgroundColor: 'transparent', backgroundImage: 'none' }}>

        <div className="mx-auto w-full max-w-[1500px] px-5 pt-24 sm:px-8 lg:pt-0">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow index="09">Solutions</Eyebrow>
              <Headline text="WHO BUILDS WITH *OMNESCENE*." className="mt-4 text-[10vw] sm:text-[6.4vw] lg:text-[3.4vw]" />
            </div>
            <span className="hidden font-mono text-[10px] uppercase tracking-tech text-mist/60 lg:block">
              Continuous traverse
            </span>
          </div>
        </div>

        <motion.ul
          style={horizontal ? { x, overflow: 'hidden' } : undefined}
          className={`mx-auto mt-10 flex w-full max-w-[1500px] flex-col gap-12 px-5 pb-20 sm:px-8 lg:mt-14 ${
          horizontal ?
          'lg:max-w-none lg:w-max lg:flex-row lg:gap-14 lg:pb-0 lg:pl-[6vw] lg:pr-[20vw]' :
          'lg:grid lg:grid-cols-2 lg:gap-x-16 lg:gap-y-16'}
          `}>

            {[...solutions, ...solutions].map((s, i) => {
              const tall = i % 2 === 0;
              return (
                <motion.li
                  key={`${s.id}-${i}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  className={`relative shrink-0 lg:w-[38vw] ${tall ? 'lg:self-start lg:pt-4' : 'lg:self-end lg:pb-16'}`}>

                  <div className="flex items-start gap-5">
                    <span className="font-mono text-[11px] text-cyan/60">{`0${i + 1}`}</span>
                    <div className="min-w-0 flex-1">
                      <h3
                        className={`font-display font-extrabold uppercase leading-[0.9] tracking-[-0.01em] text-chalk ${
                        tall ? 'text-[10vw] sm:text-[6vw] lg:text-[3.6vw]' : 'text-[8vw] sm:text-[5vw] lg:text-[2.7vw]'}`
                        }>

                        {s.title}
                      </h3>
                      <p className="mt-3 font-display text-sm font-semibold uppercase tracking-[0.14em] text-cyan">
                        {s.copy}
                      </p>
                      <p className="mt-4 max-w-md text-sm leading-relaxed text-mist sm:text-base">{s.detail}</p>
                      <div className="mt-6 flex items-end gap-4 border-t border-cyan/15 pt-4">
                        <span className="font-display text-3xl font-extrabold leading-none text-chalk sm:text-4xl">
                          {s.metric}
                        </span>
                        <span className="pb-1 font-mono text-[10px] uppercase tracking-tech text-mist/70">
                          {s.metricLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`absolute -left-6 top-1 hidden h-24 w-px bg-cyan/25 lg:block ${tall ? '' : 'top-auto -bottom-2'}`}
                    aria-hidden="true" />

                </motion.li>);

            })}
          </motion.ul>
      </div>

      <div
        className="mx-auto w-full max-w-[1500px] px-5 pb-24 pt-14 sm:px-8 lg:pb-28 lg:pt-14 !bg-transparent bg-none"
        style={{ backgroundColor: 'transparent', backgroundImage: 'none' }}>
        <div
          className="grid items-center gap-8 lg:grid-cols-[minmax(0,600px)_minmax(280px,1fr)] lg:gap-12 !bg-transparent bg-none"
          style={{ backgroundColor: 'transparent', backgroundImage: 'none' }}>
          <div className="overflow-hidden rounded-none bg-transparent shadow-none" style={{ background: 'transparent', boxShadow: 'none' }}>
            <img
              src="/dashboard.webp"
              alt="OmneScene environment explorer dashboard showing simulated environments and system status"
              className="block aspect-[12/7] max-h-[350px] w-full max-w-[600px] object-cover bg-transparent"
              style={{ backgroundColor: 'transparent', backgroundImage: 'none', boxShadow: 'none', borderRadius: '0px' }}
            />
          </div>

          <div>
            <div className="flex items-end justify-between gap-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-tech text-cyan/70">Live system view</span>
                <h2 className="mt-3 max-w-xl font-display text-3xl font-extrabold uppercase leading-[0.95] text-chalk sm:text-5xl">
                  See every environment in motion.
                </h2>
              </div>
              <span className="hidden font-mono text-[10px] uppercase tracking-tech text-mist/60 xl:block">Dashboard / 01</span>
            </div>

            <ul className="mt-6 space-y-3 border-t border-cyan/15 pt-4">
              {[
                'Explore every generated environment from one workspace.',
                'Compare traffic, weather, and layout variations instantly.',
                'Track sensor outputs and system health in real time.',
                'Replay validated scenarios with deterministic results.'
              ].map((point, index) => (
                <li key={point} className="flex gap-4 text-sm leading-relaxed text-mist sm:text-base">
                  <span className="font-mono text-[10px] tracking-tech text-cyan/70">0{index + 1}</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>);

}