import React, { useEffect, useState } from 'react';
import { Eyebrow, Headline } from '../Typography';

const testimonials = [
  {
    quote: 'OmneScene helped us reproduce the failure mode we had been chasing for six months. The simulation gave us a repeatable test harness in days, not quarters.',
    name: 'Priya Shah',
    role: 'Director of Robotics, Northstar Labs',
    metric: '6 months → 2 weeks',
    initials: 'PS',
    image: '/testimonial (2).png',
    tone: 'from-cyan-500/30 via-cyan/10 to-transparent'
  },
  {
    quote: 'We used it to generate edge cases across weather, density and road layout. It changed the way we test our autonomy stack before each release.',
    name: 'David Kwan',
    role: 'VP Autonomous Systems, Velora Mobility',
    metric: '3x more edge cases',
    initials: 'DK',
    image: '/testimonial(1).png',
    tone: 'from-violet-500/25 via-cyan/10 to-transparent'
  },
  {
    quote: 'The platform lets our engineering team work from the same scenario library. Every result is replayable and every failure mode is measurable.',
    name: 'Ana Ribeiro',
    role: 'Head of Validation, ArcGrid Robotics',
    metric: '99.2% replayability',
    initials: 'AR',
    image: '/testimonial (3).png',
    tone: 'from-emerald-500/25 via-cyan/10 to-transparent'
  }
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="relative scroll-mt-28 px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-[1500px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow index="11">Testimonials</Eyebrow>
            <Headline text="THE TEAMS BUILDING *PHYSICAL AI* TALK ABOUT IT." className="mt-5 text-[10vw] sm:text-[6.4vw] lg:text-[4vw]" />
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-mist sm:text-base">
            Real teams use OmneScene to find hard failures earlier, run more scenarios, and validate autonomous behavior with repeatable evidence.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-[28px] border border-cyan/15 bg-[rgba(5,12,14,0.72)] p-3 shadow-[0_0_30px_rgba(46,230,214,0.05)] sm:p-5">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            aria-live="polite"
          >
            {testimonials.map((item) => (
              <article key={item.name} className="w-full shrink-0 px-1">
                <div className="grid gap-6 rounded-[22px] border border-cyan/10 bg-void/50 p-5 lg:grid-cols-[220px_1fr] lg:p-7">
                  <div className={`flex items-center justify-center rounded-2xl border border-cyan/10 bg-gradient-to-br ${item.tone} p-5`}>
                    <img
                      src={item.image}
                      alt={`${item.name} portrait`}
                      className="h-36 w-full rounded-xl object-cover object-top shadow-[0_0_25px_rgba(46,230,214,0.18)]"
                    />
                  </div>

                  <div className="flex flex-col justify-center">
                    <div className="flex items-center justify-between gap-3 border-b border-cyan/10 pb-4">
                      <span className="font-mono text-[10px] uppercase tracking-tech text-cyan/70">Customer story</span>
                      <span className="rounded-full border border-cyan/15 bg-cyan/5 px-2 py-1 font-mono text-[9px] uppercase tracking-tech text-cyan">
                        {item.metric}
                      </span>
                    </div>

                    <blockquote className="mt-5 text-lg leading-relaxed text-chalk sm:text-xl">
                      “{item.quote}”
                    </blockquote>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-cyan/10 pt-4">
                      <div>
                        <div className="font-display text-[0.9rem] font-bold uppercase tracking-[0.12em] text-chalk">
                          {item.name}
                        </div>
                        <div className="mt-1 font-mono text-[10px] uppercase tracking-tech text-mist/70">
                          {item.role}
                        </div>
                      </div>

                      <div className="flex gap-2" aria-label="Testimonial navigation">
                        {testimonials.map((_, index) => (
                          <button
                            key={index}
                            type="button"
                            aria-label={`Show testimonial ${index + 1}`}
                            aria-pressed={activeIndex === index}
                            onClick={() => setActiveIndex(index)}
                            className={`h-2.5 rounded-full transition-all duration-300 ${
                              activeIndex === index ? 'w-8 bg-cyan' : 'w-2.5 bg-cyan/25 hover:bg-cyan/45'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
