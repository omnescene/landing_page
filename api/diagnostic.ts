import axios from 'axios';

/**
 * DIAGNOSTIC SCRIPT
 * Run this on your production server to diagnose form submission issues
 * 
 * Usage:
 * 1. Upload this file to your public_html or api folder
 * 2. Access it via: https://omnescene.com/api-diagnostic.ts
 * 3. Check the output
 */

export default async function handler(req: any, res: any) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const diagnostics: Record<string, any> = {
    timestamp: new Date().toISOString(),
    env: {
      hasRecaptchaSecret: !!process.env.RECAPTCHA_SECRET_KEY,
      hasRecaptchaSite: !!process.env.VITE_RECAPTCHA_SITE_KEY,
      nodeEnv: process.env.NODE_ENV,
    },
    server: {
      platform: process.platform,
      node: process.version,
    },
  };

  // Check if we can reach Google reCAPTCHA API
  try {
    const googleResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'secret=test&response=test',
    });
    diagnostics.google = {
      reachable: true,
      status: googleResponse.status,
    };
  } catch (error) {
    diagnostics.google = {
      reachable: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }

  // Check if we can reach Formspree
  try {
    const formspreeResponse = await fetch('https://formspree.io/f/xljroanj', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'test=diagnostic',
    });
    diagnostics.formspree = {
      reachable: true,
      status: formspreeResponse.status,
    };
  } catch (error) {
    diagnostics.formspree = {
      reachable: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }

  return res.status(200).json(diagnostics);
}
