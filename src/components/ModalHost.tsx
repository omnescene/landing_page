import React, { useState } from 'react';
import { BookOpenIcon, CheckIcon, LoaderIcon, LockIcon, ShieldCheckIcon } from 'lucide-react';
import { Modal } from './Modal';
import { ActionButton } from './Button';
import { ContactForm } from './ContactForm';
import { useUI } from '../contexts/UIContext';
import { contactInfo } from '../data/site';

const benefits = [
'Generate virtual environments from a single description',
'Test autonomous systems against thousands of scenarios',
'Explore end-to-end simulation workflows',
'Access technical resources and reference scenes',
'Connect with the OmneScene engineering team'];


const inputClass =
'w-full border border-cyan/20 bg-void/60 px-3.5 py-2.5 text-sm text-chalk placeholder:text-mist/45 transition-colors duration-200 ease-out focus:border-cyan/70 focus:outline-none';

function Registration({ plan }: {plan: string | null;}) {
  const [form, setForm] = useState({ name: '', email: '', company: '' });
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length < 2) return setError('Enter your full name.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) return setError('Enter a valid work email.');
    if (form.company.trim().length < 2) return setError('Enter your company.');
    setError(null);
    setState('loading');
    window.setTimeout(() => setState('done'), 1300);
  };

  if (state === 'done') {
    return (
      <div className="text-center" role="status">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-cyan/60">
          <CheckIcon className="h-5 w-5 text-cyan" />
        </div>
        <h3 className="mt-5 font-display text-lg font-bold uppercase tracking-wide text-chalk">Workspace queued</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-mist">
          Your sandbox is being provisioned. We will send access instructions and a starter scenario pack to your
          work email.
        </p>
      </div>);

  }

  return (
    <div className="grid gap-8 md:grid-cols-[1.05fr_1fr]">
      <div>
        <p className="text-sm leading-relaxed text-mist">
          A sandbox workspace with a live simulation cluster, reference environments and the scenario generation
          API. {plan ? `Requested plan: ${plan}.` : ''}
        </p>
        <ul className="mt-5 space-y-2.5">
          {benefits.map((b) =>
          <li key={b} className="flex items-start gap-3 text-sm text-chalk/85">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-cyan" aria-hidden="true" />
              {b}
            </li>
          )}
        </ul>
        <div className="mt-6 space-y-2 border-t border-cyan/15 pt-4">
          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-tech text-cyan/80">
            <ShieldCheckIcon className="h-3.5 w-3.5" /> No credit card required
          </p>
          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-tech text-mist/70">
            <LockIcon className="h-3.5 w-3.5" /> SSO, audit logging and VPC deployment available
          </p>
        </div>
      </div>
      <form onSubmit={submit} noValidate className="space-y-3.5 border border-cyan/15 bg-void/40 p-5">
        <span className="font-mono text-[10px] uppercase tracking-tech text-cyan/70">Access request</span>
        <div>
          <label htmlFor="reg-name" className="sr-only">
            Full name
          </label>
          <input id="reg-name" className={inputClass} placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" />
        </div>
        <div>
          <label htmlFor="reg-email" className="sr-only">
            Work email
          </label>
          <input id="reg-email" type="email" className={inputClass} placeholder="Work email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} autoComplete="email" />
        </div>
        <div>
          <label htmlFor="reg-company" className="sr-only">
            Company
          </label>
          <input id="reg-company" className={inputClass} placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} autoComplete="organization" />
        </div>
        {error ?
        <p className="font-mono text-[10px] text-orange-300" role="alert">
            {error}
          </p> :
        null}
        <ActionButton
          type="submit"
          disabled={state === 'loading'}
          className="w-full"
          cursorLabel="ENTER"
          icon={state === 'loading' ? <LoaderIcon className="h-3.5 w-3.5 animate-spin" /> : undefined}>
          
          {state === 'loading' ? 'Provisioning' : 'Create workspace'}
        </ActionButton>
        <p className="text-center font-mono text-[9px] uppercase tracking-[0.16em] text-mist/50">
          Existing account? Sign in at app.{contactInfo.domain.toLowerCase()}
        </p>
      </form>
    </div>);

}

export function ModalHost() {
  const { modal, modalPlan, closeModal } = useUI();

  return (
    <>
      <Modal open={modal === 'register'} onClose={closeModal} title="Start Exploring OmneScene" eyebrow="Platform Access" wide>
        <Registration plan={modalPlan} />
      </Modal>

      <Modal open={modal === 'docs'} onClose={closeModal} title="Documentation" eyebrow="Technical Resources">
        <div className="flex gap-4">
          <BookOpenIcon className="mt-1 h-5 w-5 shrink-0 text-cyan" />
          <div className="space-y-3 text-sm leading-relaxed text-mist">
            <p>
              The OmneScene documentation portal, including scenario DSL reference, sensor models, physics configuration and
              the REST/gRPC API, is opening alongside general availability.
            </p>
            <p>
              Request access and we will send the current engineering handbook, including the OpenUSD import guide
              and Isaac bridge setup.
            </p>
            <p className="font-mono text-[11px] uppercase tracking-tech text-cyan/80">
              Interim contact: {contactInfo.email}
            </p>
          </div>
        </div>
      </Modal>

      <Modal open={modal === 'contact'} onClose={closeModal} title="Request Access" eyebrow="Talk to Engineering" wide>
        <ContactForm compact />
      </Modal>
    </>);

}