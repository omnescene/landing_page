import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Hero } from '../components/landing/Hero';
import { PlatformStory } from '../components/landing/PlatformStory';
import { WorldsAndMachines } from '../components/landing/WorldsAndMachines';
import { SystemArchitecture } from '../components/landing/SystemArchitecture';
import { Solutions } from '../components/landing/Solutions';
import { GraphicShowcase } from '../components/landing/GraphicShowcase';
import { Testimonials } from '../components/landing/Testimonials';
import { Pricing } from '../components/landing/Pricing';
import { FaqTrustContact } from '../components/landing/FaqTrustContact';
import { scrollToSection } from '../utils/scroll';

export function Landing() {
  const location = useLocation();

  useEffect(() => {
    const target = (location.state as {section?: string;} | null)?.section;
    if (!target) return;
    const timer = window.setTimeout(() => scrollToSection(target), 120);
    return () => window.clearTimeout(timer);
  }, [location.state]);

  return (
    <main>
      <Hero />
      <PlatformStory />
      <WorldsAndMachines />
      <SystemArchitecture />
      <Solutions />
      <GraphicShowcase />
      <Testimonials />
      <Pricing />
      <FaqTrustContact />
    </main>);

}