import React, { useState } from 'react';
import { AlertTriangleIcon, CheckIcon, LoaderIcon, SendIcon } from 'lucide-react';
import { ActionButton } from './Button';

type Status = 'idle' | 'loading' | 'success' | 'error';

type Fields = {
  name: string;
  email: string;
  company: string;
  jobTitle: string;
  industry: string;
  building: string;
  message: string;
};

const empty: Fields = {
  name: '',
  email: '',
  company: '',
  jobTitle: '',
  industry: '',
  building: '',
  message: ''
};

const formspreeEndpoint = 'https://formspree.io/f/xljroanj';

const industries = [
'Robotics',
'Automotive',
'Autonomous Systems',
'Industrial Automation',
'Research & Development',
'Other'];


const fieldClass =
'w-full border border-cyan/20 bg-void/60 px-3.5 py-2.5 font-sans text-sm text-chalk placeholder:text-mist/45 transition-colors duration-200 ease-out focus:border-cyan/70 focus:outline-none';

function Field({
  id,
  label,
  children,
  error





}: {id: string;label: string;children: React.ReactNode;error?: string;}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-mono text-[10px] uppercase tracking-tech text-cyan/70">
        {label}
      </label>
      {children}
      {error ?
      <p className="mt-1 font-mono text-[10px] text-orange-300" role="alert">
          {error}
        </p> :
      null}
    </div>);

}

export function ContactForm({ compact = false }: {compact?: boolean;}) {
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<Status>('idle');

  const set = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<keyof Fields, string>> = {};
    if (values.name.trim().length < 2) next.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) next.email = 'Enter a valid work email address.';
    if (values.company.trim().length < 2) next.company = 'Company is required.';
    if (!values.industry) next.industry = 'Select an industry.';
    if (values.message.trim().length < 12) next.message = 'Tell us a little more (12+ characters).';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    if (!validate()) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values)
      });

      if (!response.ok) throw new Error('Form submission failed');
      setStatus('success');
      setValues(empty);
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="border border-cyan/30 bg-cyan/[0.05] p-8 text-center" role="status">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-cyan/60">
          <CheckIcon className="h-5 w-5 text-cyan" />
        </div>
        <h3 className="mt-5 font-display text-xl font-bold uppercase tracking-wide text-chalk">Request received</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-mist">
          A simulation engineer will reply within one business day. Reference your request with the address you
          submitted from.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          data-cursor="RESET"
          className="mt-5 font-mono text-[11px] uppercase tracking-tech text-cyan transition-colors duration-200 ease-out hover:text-cyan-soft">
          
          Send another request
        </button>
      </div>);

  }

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="cf-name" label="Name" error={errors.name}>
          <input id="cf-name" name="name" value={values.name} onChange={set('name')} className={fieldClass} placeholder="Alex Rivera" autoComplete="name" />
        </Field>
        <Field id="cf-email" label="Work Email" error={errors.email}>
          <input id="cf-email" name="email" type="email" value={values.email} onChange={set('email')} className={fieldClass} placeholder="alex@company.com" autoComplete="email" />
        </Field>
        <Field id="cf-company" label="Company" error={errors.company}>
          <input id="cf-company" name="company" value={values.company} onChange={set('company')} className={fieldClass} placeholder="Company name" autoComplete="organization" />
        </Field>
        <Field id="cf-title" label="Job Title" error={errors.jobTitle}>
          <input id="cf-title" name="jobTitle" value={values.jobTitle} onChange={set('jobTitle')} className={fieldClass} placeholder="Autonomy Lead" autoComplete="organization-title" />
        </Field>
        <Field id="cf-industry" label="Industry" error={errors.industry}>
          <select id="cf-industry" name="industry" value={values.industry} onChange={set('industry')} className={fieldClass}>
            <option value="">Select industry</option>
            {industries.map((i) =>
            <option key={i} value={i}>
                {i}
              </option>
            )}
          </select>
        </Field>
        <Field id="cf-building" label="What are you building?" error={errors.building}>
          <input id="cf-building" name="building" value={values.building} onChange={set('building')} className={fieldClass} placeholder="Warehouse AMR fleet" />
        </Field>
      </div>
      <Field id="cf-message" label="Message" error={errors.message}>
        <textarea
          id="cf-message"
          name="message"
          rows={compact ? 3 : 5}
          value={values.message}
          onChange={set('message')}
          className={`${fieldClass} resize-y`}
          placeholder="Where could simulation help your team?" />
        
      </Field>

      {status === 'error' ?
      <p className="flex items-center gap-2 border border-orange-400/40 bg-orange-400/[0.06] px-3 py-2 font-mono text-[11px] text-orange-200" role="alert">
          <AlertTriangleIcon className="h-3.5 w-3.5 shrink-0" />
          {Object.keys(errors).length ? 'Check the highlighted fields and try again.' : 'Transmission failed. Please retry or email support@omnescene.com.'}
        </p> :
      null}

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <ActionButton
          type="submit"
          disabled={status === 'loading'}
          cursorLabel="SEND"
          icon={
          status === 'loading' ?
          <LoaderIcon className="h-3.5 w-3.5 animate-spin" /> :

          <SendIcon className="h-3.5 w-3.5" />

          }>
          
          {status === 'loading' ? 'Transmitting' : 'Send Request'}
        </ActionButton>
        <span className="font-mono text-[10px] uppercase tracking-tech text-mist/70">
          Encrypted in transit · No marketing lists
        </span>
      </div>
    </form>);

}