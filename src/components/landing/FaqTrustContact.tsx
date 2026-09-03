import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRightIcon, BookOpenIcon, MapPinIcon, PhoneIcon, PlusIcon, ShieldCheckIcon, UsersIcon } from 'lucide-react';
import { Eyebrow, Headline, Lede } from '../Typography';
import { ActionButton } from '../Button';
import { ContactForm } from '../ContactForm';
import { SimulationScene } from '../SimulationScene';
import { contactInfo, faqs } from '../../data/site';
import { useUI } from '../../contexts/UIContext';
import { useSectionNav } from '../../hooks/useSectionNav';

function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div id="faq" className="relative scroll-mt-28 px-5 py-28 sm:px-8 lg:py-36">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.4fr]">
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <Eyebrow index="13">FAQ</Eyebrow>
            <Headline text="QUESTIONS, *ANSWERED*." className="mt-5 text-[11vw] sm:text-[7vw] lg:text-[3.2vw]" />
            <Lede className="mt-5">Still unresolved? The engineering team answers directly.</Lede>
          </div>

          <ul className="border-t border-cyan/15">
            {faqs.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.q} className="border-b border-cyan/15">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      data-cursor={isOpen ? 'CLOSE' : 'OPEN'}
                      className="group flex w-full items-start gap-5 py-5 text-left">
                      
                      <span className="mt-1 font-mono text-[11px] text-cyan/50">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`flex-1 font-display text-lg font-bold uppercase tracking-[0.08em] transition-colors duration-200 ease-out sm:text-xl ${
                        isOpen ? 'text-cyan' : 'text-chalk group-hover:text-cyan-soft'}`
                        }>
                        
                        {item.q}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                        className="mt-1 shrink-0 text-cyan"
                        aria-hidden="true">
                        
                        <PlusIcon className="h-4 w-4" />
                      </motion.span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen ?
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}
                      className="overflow-hidden">
                      
                        <p className="max-w-2xl pb-6 pl-10 text-sm leading-relaxed text-mist sm:text-base">
                          {item.a}
                        </p>
                      </motion.div> :
                    null}
                  </AnimatePresence>
                </li>);

            })}
          </ul>
        </div>
      </div>
    </div>);

}

function Trust() {
  const { openModal } = useUI();
  const items = [
  {
    icon: UsersIcon,
    title: 'Built for engineering teams',
    copy: 'Designed with autonomy, controls and validation engineers working on physical AI -not for a marketing dashboard.'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Security & deployment',
    copy: 'SSO, role-based access, audit logging, and VPC or air-gapped deployment for regulated programmes.'
  },
  {
    icon: BookOpenIcon,
    title: 'Technical ecosystem',
    copy: 'Omniverse, Cosmos, OpenUSD and Isaac interoperability, with documented APIs and reproducible run seeds.'
  }];


  return (
    <div className="relative px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-[1500px] border-y border-cyan/15 py-12">
        <p className="font-display text-xl font-bold uppercase tracking-[0.12em] text-chalk sm:text-2xl">
          Built for engineering teams working on <span className="text-cyan">physical AI</span>.
        </p>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {items.map((item) =>
          <div key={item.title} className="flex gap-4">
              <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
              <div>
                <h3 className="font-mono text-[11px] uppercase tracking-tech text-cyan/80">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{item.copy}</p>
              </div>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => openModal('docs')}
          data-cursor="OPEN"
          className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-tech text-cyan transition-colors duration-200 ease-out hover:text-cyan-soft">
          
          View documentation <ArrowRightIcon className="h-3 w-3" />
        </button>
      </div>
    </div>);

}

function Contact() {
  return (
    <div id="contact" className="relative isolate scroll-mt-28 overflow-hidden px-5 py-28 sm:px-8 lg:py-36">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-50">
        <SimulationScene kind="robot" speed={0.04} labels={false} ariaLabel="" />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-void via-void/70 to-void" />

      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <Eyebrow index="12">Contact</Eyebrow>
            <Headline
              text="BUILD YOUR NEXT *SIMULATION*."
              className="mt-5 text-[11vw] sm:text-[7vw] lg:text-[4vw]" />
            
            <Lede className="mt-5">Tell us what you are building and where simulation can help.</Lede>

            <dl className="mt-10 space-y-5 border-t border-cyan/15 pt-8">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-tech text-cyan/70">General</dt>
                <dd>
                  <a href={`mailto:${contactInfo.email}`} className="text-sm text-chalk transition-colors duration-200 ease-out hover:text-cyan" data-cursor="MAIL">
                    {contactInfo.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-tech text-cyan/70">Sales & enterprise</dt>
                <dd>
                  <a href={`mailto:${contactInfo.sales}`} className="text-sm text-chalk transition-colors duration-200 ease-out hover:text-cyan" data-cursor="MAIL">
                    {contactInfo.sales}
                  </a>
                </dd>
              </div>
              {contactInfo.offices.map((office) =>
              <div key={office.region} className="flex gap-3">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-cyan/70" />
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-tech text-cyan/70">{office.region}</dt>
                  <dd className="mt-1 text-sm text-chalk">{office.company}</dd>
                  <dd className="mt-1 text-sm leading-relaxed text-mist">{office.address}</dd>
                  <dd className="mt-1">
                    <a href={`tel:${office.phoneHref}`} className="inline-flex items-center gap-1.5 text-sm text-mist transition-colors duration-200 ease-out hover:text-cyan" data-cursor="CALL">
                      <PhoneIcon className="h-3.5 w-3.5" />
                      {office.phone}
                    </a>
                  </dd>
                </div>
              </div>
              )}
              <div>
                <a
                  href="/sitemap.xml"
                  className="inline-flex text-sm text-cyan transition-colors duration-200 ease-out hover:text-cyan-soft"
                  data-cursor="OPEN">
                  Sitemap
                </a>
              </div>
            </dl>
          </div>

          <div className="mx-auto w-full max-w-2xl border border-cyan/20 bg-abyss/60 p-4 backdrop-blur-sm sm:p-8 lg:mx-0 lg:max-w-none">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>);

}

function FinalCta() {
  const { openModal } = useUI();
  const goToSection = useSectionNav();

  return (
    <div className="relative px-5 pb-28 sm:px-8">
      <div className="mx-auto flex max-w-[1500px] flex-col items-start gap-8 border-t border-cyan/20 pt-14 lg:flex-row lg:items-end lg:justify-between">
        <h2 className="max-w-3xl font-display text-[11vw] font-extrabold uppercase leading-[0.9] text-chalk sm:text-[7vw] lg:text-[4.2vw]">
          Generate the world.
          <br />
          <span className="text-cyan">Simulate every possibility.</span>
        </h2>
        <div className="flex flex-wrap gap-3">
          <ActionButton onClick={() => openModal('register')} cursorLabel="START">
            Start with OmneScene
          </ActionButton>
          <ActionButton variant="ghost" onClick={() => goToSection('architecture')} cursorLabel="VIEW">
            View workflow
          </ActionButton>
        </div>
      </div>
    </div>);

}

export function FaqTrustContact() {
  return (
    <section aria-label="FAQ, trust and contact">
      <Faq />
      <Trust />
      <Contact />
      <FinalCta />
    </section>);

}