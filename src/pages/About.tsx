import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRightIcon } from 'lucide-react';
import { SimulationScene } from '../components/SimulationScene';
import { Eyebrow, Headline, Lede } from '../components/Typography';
import { ActionButton } from '../components/Button';
import { contactInfo, team, values } from '../data/site';
import { useUI } from '../contexts/UIContext';
import { useSectionNav } from '../hooks/useSectionNav';

const whatWeDo = [
{
  k: 'We generate worlds',
  v: 'Describe an environment once and OmneScene builds thousands of physically plausible variants of it.'
},
{
  k: 'We simulate physics',
  v: 'Contact, motion, sensors, traffic and weather run together so behaviour emerges instead of being scripted.'
},
{
  k: 'We test machines',
  v: 'Your robot or vehicle stack runs unchanged inside the simulation, and every decision is scored.'
},
{
  k: 'We validate before deployment',
  v: 'Teams leave with reproducible evidence of what their system does in the situations that matter.'
}];


export function About() {
  const [activeValue, setActiveValue] = useState(values[0].id);
  const { openModal } = useUI();
  const goToSection = useSectionNav();
  const value = values.find((v) => v.id === activeValue) ?? values[0];

  return (
    <main>
      <section className="relative isolate flex min-h-[86svh] flex-col justify-end overflow-hidden px-5 pb-14 pt-32 sm:px-8">
        <div className="absolute inset-0 -z-10">
          <SimulationScene
            kind="robot"
            speed={0.05}
            labels={false}
            ariaLabel="Simulated environment where machines are trained" />
          
        </div>
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-void via-void/60 to-void/40" />
        <div className="mx-auto w-full max-w-[1500px]">
          <Eyebrow>Company</Eyebrow>
          <h1 className="mt-5 max-w-5xl font-display text-[11vw] font-extrabold uppercase leading-[0.88] tracking-[-0.02em] text-chalk sm:text-[7.4vw] lg:text-[4.6vw]">
            We build the worlds where{' '}
            <span className="text-cyan [text-shadow:0_0_40px_rgba(46,230,214,0.4)]">intelligent machines</span> learn.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-chalk/80">
            OmneScene is a simulation company. We make the environments, physics and scenarios that let robotics and
            automotive teams find out what their systems do — before those systems move in the real world.
          </p>
        </div>
      </section>

      <section className="relative px-5 py-24 sm:px-8 lg:py-32" aria-labelledby="mission-heading">
        <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[0.9fr_1.3fr]">
          <div>
            <Eyebrow index="01">Our mission</Eyebrow>
            <Headline
              text="MAKE PHYSICAL-WORLD AI *FASTER*, SAFER, MORE SCALABLE."
              as="h2"
              className="mt-5 text-[8.5vw] sm:text-[5.6vw] lg:text-[3vw]" />
            
            <div id="mission-heading" className="sr-only">
              Our mission
            </div>
          </div>
          <div className="lg:pt-2">
            <Lede>
              Every hour a robot spends failing on a test track is an hour it is not improving. Simulation moves that
              work into an environment where failure is cheap, repeatable and measurable.
            </Lede>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-mist sm:text-base">
              We started OmneScene because generating scenarios by hand does not scale, and because the rarest
              failures — the ones that actually matter — only appear in volume. The platform exists to produce that
              volume with physical fidelity intact.
            </p>

            <dl className="mt-10 divide-y divide-cyan/12 border-y border-cyan/15">
              {whatWeDo.map((item) =>
              <div key={item.k} className="grid gap-2 py-5 sm:grid-cols-[210px_1fr] sm:gap-6">
                  <dt className="font-display text-sm font-bold uppercase tracking-[0.14em] text-cyan">{item.k}</dt>
                  <dd className="text-sm leading-relaxed text-mist">{item.v}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </section>

      <section id="team" className="relative scroll-mt-28 px-5 py-20 sm:px-8 lg:py-28" aria-labelledby="team-heading">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow index="02">Team</Eyebrow>
              <Headline text="THE PEOPLE BUILDING *IT*." as="h2" className="mt-4 text-[10vw] sm:text-[6vw] lg:text-[3.2vw]" />
              <div id="team-heading" className="sr-only">
                Team
              </div>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-tech text-mist/60">
              San Francisco · Munich · Remote
            </span>
          </div>

          <ul className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, i) =>
            <motion.li
              key={member.name}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.45, delay: i % 3 * 0.06, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col">
              
                <div className="relative mx-auto w-full max-w-[440px] overflow-hidden sm:max-w-[480px] lg:max-w-[520px]">
                  <img
                  src={member.image}
                  alt={`${member.name}, ${member.role} at OmneScene`}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover grayscale-[35%] transition-[filter,transform] duration-300 ease-out hover:scale-[1.02] hover:grayscale-0" />
                
                  <span className="absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-cyan" aria-hidden="true" />
                  <span className="absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-cyan" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold uppercase tracking-[0.1em] text-chalk">
                  {member.name}
                </h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-tech text-cyan/80">{member.role}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-mist">{member.bio}</p>
                <a
                href={member.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                data-cursor="PROFILE"
                className="mt-4 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-tech text-cyan transition-colors duration-200 ease-out hover:text-cyan-soft">
                
                  LinkedIn <ArrowUpRightIcon className="h-3 w-3" />
                </a>
              </motion.li>
            )}
          </ul>
        </div>
      </section>

      <section className="relative px-5 py-24 sm:px-8 lg:py-32" aria-labelledby="values-heading">
        <div className="mx-auto max-w-[1500px]">
          <Eyebrow index="03">Company values</Eyebrow>
          <h2 id="values-heading" className="sr-only">
            Company values
          </h2>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:items-center">
            <ul className="border-t border-cyan/15">
              {values.map((v, i) => {
                const isActive = v.id === activeValue;
                return (
                  <li key={v.id} className="border-b border-cyan/15">
                    <button
                      type="button"
                      onMouseEnter={() => setActiveValue(v.id)}
                      onFocus={() => setActiveValue(v.id)}
                      onClick={() => setActiveValue(v.id)}
                      data-cursor="VIEW"
                      aria-pressed={isActive}
                      className="flex w-full items-center gap-5 py-5 text-left">
                      
                      <span className={`font-mono text-[11px] ${isActive ? 'text-cyan' : 'text-mist/40'}`}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`font-display text-xl font-bold uppercase tracking-[0.08em] transition-colors duration-200 ease-out sm:text-2xl ${
                        isActive ? 'text-cyan' : 'text-chalk/70'}`
                        }>
                        
                        {v.title}
                      </span>
                    </button>
                  </li>);

              })}
            </ul>
            <motion.blockquote
              key={value.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}
              className="border-l-2 border-cyan pl-6">
              
              <p className="font-display text-2xl font-bold uppercase leading-[1.15] tracking-[0.02em] text-chalk sm:text-3xl">
                {value.copy}
              </p>
              <footer className="mt-4 font-mono text-[10px] uppercase tracking-tech text-cyan/70">
                Value {String(values.findIndex((v) => v.id === value.id) + 1).padStart(2, '0')} / {values.length}
              </footer>
            </motion.blockquote>
          </div>
        </div>
      </section>

      <section className="relative px-5 pb-28 sm:px-8" aria-label="Contact OmneScene">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-8 border-t border-cyan/20 pt-14 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="max-w-2xl font-display text-[9vw] font-extrabold uppercase leading-[0.92] text-chalk sm:text-[5.6vw] lg:text-[3.2vw]">
              Work with the <span className="text-cyan">simulation team</span>.
            </h2>
            <p className="mt-4 text-sm text-mist">
              {contactInfo.email} · {contactInfo.phone} · {contactInfo.address}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ActionButton onClick={() => openModal('contact')} cursorLabel="OPEN">
              Contact us
            </ActionButton>
            <ActionButton variant="ghost" onClick={() => goToSection('platform')} cursorLabel="EXPLORE">
              Explore the platform
            </ActionButton>
          </div>
        </div>
      </section>
    </main>);

}