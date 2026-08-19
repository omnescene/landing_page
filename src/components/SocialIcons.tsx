import React from 'react';

type IconProps = {className?: string;};

const base = 'h-4 w-4';

export function LinkedInIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5ZM3 9.75h4v11.25H3V9.75Zm6.5 0h3.83v1.54h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75v5.91h-4v-5.24c0-1.25-.02-2.86-1.83-2.86-1.83 0-2.11 1.36-2.11 2.77v5.33h-4V9.75Z" />
    </svg>);

}

export function YouTubeIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26.2 26.2 0 0 0 2 12a26.2 26.2 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26.2 26.2 0 0 0 22 12a26.2 26.2 0 0 0-.4-4.8ZM10 15.02V8.98L15.2 12 10 15.02Z" />
    </svg>);

}

export function FacebookIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H16.7V3.62A21 21 0 0 0 14.28 3.5c-2.4 0-4.03 1.46-4.03 4.14V9.9H7.5V13h2.75v8h3.25Z" />
    </svg>);

}

export function XIconBrand({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.53 3h3.14l-6.86 7.84L22 21h-6.33l-4.96-6.48L4.99 21H1.85l7.34-8.39L2 3h6.49l4.48 5.92L17.53 3Zm-1.1 16.13h1.74L7.66 4.78H5.79l10.64 14.35Z" />
    </svg>);

}

export function PinterestIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.5a9.5 9.5 0 0 0-3.46 18.35c-.08-.77-.15-1.96.03-2.8.17-.77 1.1-4.9 1.1-4.9s-.28-.56-.28-1.4c0-1.3.76-2.28 1.7-2.28.8 0 1.19.6 1.19 1.33 0 .8-.51 2.01-.78 3.13-.22.94.47 1.7 1.4 1.7 1.68 0 2.97-1.77 2.97-4.33 0-2.26-1.63-3.85-3.95-3.85a4.1 4.1 0 0 0-4.27 4.11c0 .82.31 1.7.7 2.18a.28.28 0 0 1 .07.27c-.07.3-.23.94-.26 1.07-.04.17-.14.21-.32.13-1.2-.56-1.95-2.3-1.95-3.7 0-3.01 2.19-5.78 6.31-5.78 3.31 0 5.89 2.36 5.89 5.52 0 3.29-2.08 5.94-4.96 5.94-.97 0-1.88-.5-2.19-1.1l-.6 2.28c-.21.83-.79 1.87-1.18 2.5A9.5 9.5 0 1 0 12 2.5Z" />
    </svg>);

}

export const socialIconMap: Record<string, React.ComponentType<IconProps>> = {
  linkedin: LinkedInIcon,
  youtube: YouTubeIcon,
  facebook: FacebookIcon,
  x: XIconBrand,
  pinterest: PinterestIcon
};