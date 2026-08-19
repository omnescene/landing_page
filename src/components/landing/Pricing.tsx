import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, MinusIcon } from 'lucide-react';
import { Eyebrow, Headline, Lede } from '../Typography';
import { ActionButton } from '../Button';
import { pricingTiers } from '../../data/site';
import { useUI } from '../../contexts/UIContext';

export function Pricing() {
  const [activeId, setActiveId] = useState(pricingTiers[1].id);
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const [compare, setCompare] = useState(false);
  const { openModal } = useUI();
  const active = pricingTiers.find((t) => t.id === activeId) ?? pricingTiers[0];
  const isEnterprise = active.id === 'enterprise';
  const displayPrice = isEnterprise ? active.price : billing === 'monthly' ? (active.monthlyPrice ?? active.price) : (active.annualPrice ?? active.price);

  useEffect(() => {
    if (!isEnterprise) setBilling('monthly');
  }, [activeId, isEnterprise]);

  return (
    <section id="pricing" className="relative scroll-mt-28 px-5 py-28 sm:px-8 lg:py-36">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <Eyebrow index="12">Pricing</Eyebrow>
            <Headline text="PAY FOR *SIMULATION*, NOT SEATS." className="mt-5 text-[10vw] sm:text-[6.6vw] lg:text-[4vw]" />
          </div>
          <Lede className="lg:pb-3">
            Capacity is the unit that matters. Move the selector to size a plan against the workload you actually
            run.
          </Lede>
        </div>

        {/* Horizontal plan selector */}
        <div className="mt-14">
          <div
            role="tablist"
            aria-label="Pricing plans"
            className="relative grid grid-cols-3 border-y border-cyan/20">
            
            {pricingTiers.map((tier) => {
              const isActive = tier.id === activeId;
              return (
                <button
                  key={tier.id}
                  role="tab"
                  aria-selected={isActive}
                  type="button"
                  onClick={() => setActiveId(tier.id)}
                  data-cursor="SELECT"
                  className="relative px-3 py-5 text-left transition-colors duration-200 ease-out sm:px-6">
                  
                  {isActive ?
                  <motion.span
                    layoutId="plan-active"
                    transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                    className="absolute inset-0 bg-cyan/[0.08]"
                    aria-hidden="true" /> :

                  null}
                  {isActive ?
                  <motion.span
                    layoutId="plan-line"
                    transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                    className="absolute inset-x-0 bottom-0 h-[2px] bg-cyan"
                    aria-hidden="true" /> :

                  null}
                  <span className="relative block">
                    <span
                      className={`block font-display text-lg font-extrabold uppercase tracking-[0.16em] transition-colors duration-200 ease-out sm:text-2xl ${
                      isActive ? 'text-cyan' : 'text-chalk/70'}`
                      }>
                      
                      {tier.name}
                    </span>
                    <span className="mt-1 hidden text-xs text-mist sm:block">{tier.tagline}</span>
                  </span>
                </button>);

            })}
          </div>

          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}
            className="grid gap-10 py-10 lg:grid-cols-[0.85fr_1.15fr]">
            
            <div>
              <span className="font-mono text-[10px] uppercase tracking-tech text-cyan/70">{active.cadence}</span>

              {!isEnterprise ? (
                <div className="mt-3 inline-flex rounded-full border border-cyan/20 bg-void/40 p-1">
                  {(['monthly', 'annual'] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setBilling(option)}
                      aria-pressed={billing === option}
                      data-cursor="SELECT"
                      className={`rounded-full px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] transition-colors duration-200 ease-out ${
                        billing === option ? 'bg-cyan text-void' : 'text-mist hover:text-chalk'
                      }`}>
                      {option}
                    </button>
                  ))}
                </div>
              ) : null}

              <motion.p
                key={`${active.id}-${billing}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                className="mt-3 font-display text-5xl font-extrabold leading-none text-chalk sm:text-6xl">
                {displayPrice}
              </motion.p>

              {!isEnterprise ? (
                <p className="mt-2 font-mono text-[10px] uppercase tracking-tech text-cyan/70">
                  {billing === 'monthly' ? 'Billed monthly' : 'Billed annually'}
                </p>
              ) : (
                <div className="mt-3 space-y-1.5 text-sm text-mist">
                  <div className="font-mono text-[10px] uppercase tracking-tech text-cyan/70">Annual agreement</div>
                </div>
              )}

              <p className="mt-4 max-w-sm text-sm leading-relaxed text-mist sm:hidden">{active.tagline}</p>
              <p className="mt-5 border-l-2 border-cyan pl-4 font-display text-sm font-semibold uppercase tracking-[0.12em] text-chalk">
                {active.capacity}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                {active.id !== 'enterprise' ? (
                  <ActionButton onClick={() => openModal('register', active.name)} cursorLabel="START">
                    Checkout
                  </ActionButton>
                ) : null}
                {active.id === 'enterprise' ? (
                  <ActionButton variant="primary" onClick={() => openModal('contact')} cursorLabel="TALK">
                    Talk to engineering
                  </ActionButton>
                ) : null}
              </div>
            </div>

            <dl className="divide-y divide-cyan/12 border-y border-cyan/15">
              {active.features.map((f) =>
              <div key={f.label} className="flex items-baseline justify-between gap-6 py-3.5">
                  <dt className="font-mono text-[11px] uppercase tracking-tech text-mist/75">{f.label}</dt>
                  <dd
                  className={`text-right text-sm ${f.value === '—' ? 'text-mist/40' : 'text-chalk'}`}>
                  
                    {f.value}
                  </dd>
                </div>
              )}
            </dl>
          </motion.div>

          <button
            type="button"
            onClick={() => setCompare((c) => !c)}
            aria-expanded={compare}
            data-cursor="COMPARE"
            className="font-mono text-[11px] uppercase tracking-tech text-cyan transition-colors duration-200 ease-out hover:text-cyan-soft">
            
            {compare ? '— Hide full comparison' : '+ Compare all plans'}
          </button>

          <motion.div
            initial={false}
            animate={{ height: compare ? 'auto' : 0, opacity: compare ? 1 : 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden">
            
            <div className="omne-scroll mt-6 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <caption className="sr-only">Full plan comparison</caption>
                <thead>
                  <tr className="border-b border-cyan/25">
                    <th scope="col" className="py-3 pr-4 font-mono text-[10px] uppercase tracking-tech text-mist/60">
                      Capability
                    </th>
                    {pricingTiers.map((t) =>
                    <th
                      key={t.id}
                      scope="col"
                      className="py-3 pr-4 font-display text-sm font-bold uppercase tracking-[0.14em] text-chalk">
                      
                        {t.name}
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {pricingTiers[0].features.map((f, rowIndex) =>
                  <tr key={f.label} className="border-b border-cyan/10">
                      <th scope="row" className="py-3 pr-4 font-mono text-[11px] uppercase tracking-tech text-mist/75">
                        {f.label}
                      </th>
                      {pricingTiers.map((t) => {
                      const value = t.features[rowIndex]?.value ?? '—';
                      return (
                        <td key={t.id} className="py-3 pr-4 text-sm text-chalk/85">
                            <span className="flex items-center gap-2">
                              {value === '—' ?
                            <MinusIcon className="h-3 w-3 text-mist/40" /> :

                            <CheckIcon className="h-3 w-3 shrink-0 text-cyan" />
                            }
                              {value}
                            </span>
                          </td>);

                    })}
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </section>);

}