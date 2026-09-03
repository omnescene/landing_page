import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { UIProvider } from './contexts/UIContext';
import { BackgroundField } from './components/BackgroundField';
import { CustomCursor } from './components/CustomCursor';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { ModalHost } from './components/ModalHost';
import { SearchOverlay } from './components/SearchOverlay';
import { PageTransition } from './components/PageTransition';
import { Landing } from './pages/Landing';
import { About } from './pages/About';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { Product } from './pages/Product';
import { CookieConsent, type CookieConsentValue } from './components/CookieConsent';

function ScrollReset() {
  const location = useLocation();
  useEffect(() => {
    if (location.state && (location.state as {section?: string;}).section) return;
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname, location.state]);
  return null;
}

function TawkChat({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    if (!enabled) return;
    const tawkWindow = window as Window & {
      Tawk_API?: Record<string, unknown>;
      Tawk_LoadStart?: Date;
    };
    const scriptId = 'tawk-to-script';

    tawkWindow.Tawk_API = tawkWindow.Tawk_API || {};
    tawkWindow.Tawk_LoadStart = tawkWindow.Tawk_LoadStart || new Date();

    if (document.getElementById(scriptId)) return;

    const script = document.createElement('script');
    script.id = scriptId;
    script.async = true;
    script.src = 'https://embed.tawk.to/6a84bfc55981892f72ddf63a/1k0b8q7ef';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    document.body.appendChild(script);
  }, [enabled]);

  return null;
}

function Shell() {
  const location = useLocation();
  const [cookieConsent, setCookieConsent] = React.useState<CookieConsentValue | null>(null);
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:bg-cyan focus:px-4 focus:py-2 focus:font-display focus:text-xs focus:uppercase focus:tracking-widest focus:text-void">
        
        Skip to content
      </a>
      <BackgroundField />
      <CustomCursor />
      <Navigation />
      <ScrollReset />
      <div id="main" className="relative z-10">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
              <PageTransition>
                  <Landing />
                </PageTransition>
              } />
            
            <Route
              path="/about"
              element={
              <PageTransition>
                  <About />
                </PageTransition>
              } />
            
            <Route
              path="/terms"
              element={
              <PageTransition>
                  <Terms />
                </PageTransition>
              } />
            
            <Route
              path="/privacy"
              element={
              <PageTransition>
                  <Privacy />
                </PageTransition>
              } />

            <Route
              path="/product"
              element={
              <PageTransition>
                  <Product />
                </PageTransition>
              } />
            
            <Route
              path="*"
              element={
              <PageTransition>
                  <Landing />
                </PageTransition>
              } />
            
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
      <SearchOverlay />
      <ModalHost />
      <CookieConsent onChange={setCookieConsent} />
      <TawkChat enabled={cookieConsent === 'accepted'} />
    </>);

}

export function App() {
  return (
    <BrowserRouter>
      <UIProvider>
        <Shell />
      </UIProvider>
    </BrowserRouter>);

}