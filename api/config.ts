// This file stores sensitive configuration for the API
// For cPanel: Create this file on your server or set via environment variables

export const getRecaptchaSecret = (): string => {
  // Try environment variable first (for Vercel, Docker, etc.)
  if (process.env.RECAPTCHA_SECRET_KEY) {
    return process.env.RECAPTCHA_SECRET_KEY;
  }

  // Fallback to direct value for cPanel
  // IMPORTANT: In production, replace with your actual secret key
  const secret = process.env.RECAPTCHA_SECRET_KEY || 'YOUR_RECAPTCHA_SECRET_KEY_HERE';

  if (secret === 'YOUR_RECAPTCHA_SECRET_KEY_HERE') {
    throw new Error(
      'reCAPTCHA secret key not configured. ' +
      'Set RECAPTCHA_SECRET_KEY environment variable or update api/config.ts'
    );
  }

  return secret;
};
