import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToSection } from '../utils/scroll';

/**
 * Scrolls to a landing-page section, routing back to the landing page first
 * when the user is on /about, /terms or /privacy.
 */
export function useSectionNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(
    (sectionId: string) => {
      if (location.pathname !== '/') {
        navigate('/', { state: { section: sectionId } });
        return;
      }
      scrollToSection(sectionId);
    },
    [location.pathname, navigate]
  );
}