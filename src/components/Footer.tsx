import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRightIcon, MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import { SimulationScene } from './SimulationScene';
import { contactInfo, socialLinks } from '../data/site';
import { socialIconMap } from './SocialIcons';
import { useSectionNav } from '../hooks/useSectionNav';
import { useUI } from '../contexts/UIContext';

type Item = {label: string;section?: string;path?: string;modal?: 'docs' | 'contact' | 'register';};

const columns: {title: string;items: Item[];}[] = [
{
  title: 'Platform',
  items: [
  { label: 'Generative Environments', section: 'environments' },
  { label: 'Physical Simulation', section: 'workflow' },
  { label: 'Robotics', section: 'robotics' },
  { label: 'Autonomous Vehicles', section: 'autonomous' },
  { label: 'Intelligence', section: 'architecture' }]

},
{
  title: 'Company',
  items: [
  { label: 'About', path: '/about' },
  { label: 'Team', path: '/about' },
  { label: 'Contact', section: 'contact' },
  { label: 'Careers', modal: 'contact' }]

},
{
  title: 'Resources',
  items: [
  { label: 'Documentation', modal: 'docs' },
  { label: 'Technology', section: 'technology' },
  { label: 'FAQ', section: 'faq' },
  { label: 'Updates', modal: 'docs' }]

},
{
  title: 'Legal',
  items: [
  { label: 'Privacy Policy', path: '/privacy' },
  { label: 'Terms & Conditions', path: '/terms' }]

}];


export function Footer() {
  const goToSection = useSectionNav();
  const { openModal } = useUI();

  const renderItem = (item: Item) => {
    const cls =
    'group flex w-full items-center justify-start gap-1.5 text-left text-sm text-mist transition-colors duration-200 ease-out hover:text-cyan';
    if (item.path) {
      return (
        <Link to={item.path} className={cls} data-cursor="OPEN">
          {item.label}
          <ArrowUpRightIcon className="h-3 w-3 opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100" />
        </Link>);

    }
    return (
      <button
        type="button"
        data-cursor="GO"
        className={cls}
        onClick={() => item.modal ? openModal(item.modal) : item.section ? goToSection(item.section) : undefined}>
        
        {item.label}
        <ArrowUpRightIcon className="h-3 w-3 opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100" />
      </button>);

  };

  return (
    <footer className="relative isolate overflow-hidden border-t border-cyan/20 bg-void/70">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] opacity-40" aria-hidden="true">
        <SimulationScene kind="road" speed={0.06} labels={false} traffic={0.5} night ariaLabel="" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-void via-void/60 to-transparent" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1500px] px-5 pb-10 pt-16 sm:px-8 lg:pt-24">
        <div className="grid gap-10 border-b border-cyan/15 pb-12 lg:grid-cols-[1.15fr_1.85fr]">
          <div>
            <img
              src="/logo.svg"
              alt="OmneScene"
              className="h-20 w-auto sm:h-24 lg:h-28"
            />
            <p className="mt-4 max-w-sm font-display text-sm font-semibold uppercase tracking-[0.14em] text-mist">
              Generate the world. <span className="text-cyan">Simulate every possibility.</span>
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {socialLinks.map((s) => {
                const Icon = socialIconMap[s.id];
                return (
                  <a
                    key={s.id}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`OmneScene on ${s.label}`}
                    data-cursor="VISIT"
                    className="flex h-10 w-10 items-center justify-center border border-cyan/25 text-mist transition-colors duration-200 ease-out hover:border-cyan/70 hover:bg-cyan/10 hover:text-cyan">
                    
                    <Icon />
                  </a>);

              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) =>
            <nav key={col.title} aria-label={col.title} className="flex flex-col">
                <h3 className="mb-4 font-mono text-[10px] uppercase tracking-tech text-cyan/70">{col.title}</h3>
                <ul className="space-y-2.5">
                  {col.items.map((item) =>
                <li key={item.label} className="w-full">{renderItem(item)}</li>
                )}
                </ul>
              </nav>
            )}
          </div>
        </div>

        <div className="grid gap-8 border-b border-cyan/15 py-8 sm:grid-cols-3">
          <a
            href={`mailto:${contactInfo.email}`}
            data-cursor="MAIL"
            className="group flex items-start gap-3 text-sm text-mist transition-colors duration-200 ease-out hover:text-cyan">
            
            <MailIcon className="mt-0.5 h-4 w-4 text-cyan/70" />
            <span>
              <span className="block font-mono text-[10px] uppercase tracking-tech text-cyan/60">General</span>
              {contactInfo.email}
            </span>
          </a>
          <div className="flex items-start gap-3 text-sm text-mist">
            <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-cyan/70" />
            <div>
              <span className="block font-mono text-[10px] uppercase tracking-tech text-cyan/60">Sri Lanka</span>
              <strong className="mt-1 block font-display text-sm uppercase tracking-[0.08em] text-chalk">
                OmneScene Technologies (Pvt) Ltd.
              </strong>
              <span className="mt-2 block leading-relaxed">
                73 Havelock Road, Colombo 05,<br /> Sri Lanka
              </span>
              <a
                href="tel:+14155558743"
                data-cursor="CALL"
                className="mt-2 block transition-colors duration-200 ease-out hover:text-cyan">
                +1 415 555 8743
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3 text-sm text-mist">
            <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-cyan/70" />
            <div>
              <span className="block font-mono text-[10px] uppercase tracking-tech text-cyan/60">USA</span>
              <strong className="mt-1 block font-display text-sm uppercase tracking-[0.08em] text-chalk">
                OmneScene AI Inc.
              </strong>
              <span className="mt-2 block leading-relaxed">
                201 Mission Street, Suite 1200,<br /> San Francisco, CA 94105, USA
              </span>
              <a
                href="tel:+14155558743"
                data-cursor="CALL"
                className="mt-2 block transition-colors duration-200 ease-out hover:text-cyan">
                +1 415 555 8743
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-display text-sm font-bold uppercase tracking-[0.3em] text-cyan">
            {contactInfo.domain}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-tech text-mist/60">© 2026 OmneScene</span>
        </div>
      </div>
    </footer>);

}