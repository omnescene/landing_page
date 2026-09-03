export default async function handler(req: any, res: any) {
  // Set CORS headers for localhost development
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed.' });
  }

  try {
    let body;
    
    // Handle different body formats
    if (typeof req.body === 'string') {
      body = JSON.parse(req.body);
    } else if (req.body && typeof req.body === 'object') {
      body = req.body;
    } else if (req.bodyUsed) {
      // Body was already consumed, return error
      return res.status(400).json({ success: false, message: 'Request body was already consumed.' });
    } else {
      // Try to parse from raw stream
      body = await parseBody(req);
    }

    const { token, values } = body || {};

    if (!token) {
      console.error('[API] Missing reCAPTCHA token');
      return res.status(400).json({ success: false, message: 'reCAPTCHA token is missing.' });
    }

    if (!values) {
      console.error('[API] Missing form values');
      return res.status(400).json({ success: false, message: 'Form values are missing.' });
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!secretKey) {
      console.error('[API] RECAPTCHA_SECRET_KEY not configured. Available env keys:', Object.keys(process.env).filter(k => k.includes('RECAPTCHA') || k.includes('SECRET')));
      return res.status(500).json({ success: false, message: 'reCAPTCHA secret key is not configured on the server.' });
    }

    console.log('[API] Verifying reCAPTCHA token with secret key...');
    
    const captchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: secretKey,
        response: token
      }).toString()
    });

    const captchaData = (await captchaResponse.json()) as {
      success?: boolean;
      'error-codes'?: string[];
    };

    console.log('[API] reCAPTCHA response:', { status: captchaResponse.status, success: captchaData.success, errors: captchaData['error-codes'] });

    if (!captchaResponse.ok || !captchaData.success) {
      return res.status(400).json({
        success: false,
        message: 'Google reCAPTCHA verification failed.',
        errors: captchaData['error-codes'] || []
      });
    }

    const formspreeEndpoint = 'https://formspree.io/f/xljroanj';
    
    // Format data as application/x-www-form-urlencoded for Formspree
    const formData = new URLSearchParams();
    if (values) {
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, String(value || ''));
      });
    }
    
    console.log('[API] Submitting to Formspree with fields:', Object.keys(values || {}));
    
    const formspreeResponse = await fetch(formspreeEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData.toString()
    });

    const formspreeData = await formspreeResponse.json().catch(() => ({}));

    console.log('[API] Formspree response:', { status: formspreeResponse.status, data: formspreeData });

    if (!formspreeResponse.ok) {
      console.error('[API] Formspree submission failed:', formspreeResponse.status, formspreeData);
      return res.status(502).json({
        success: false,
        message: 'Submission delivery failed after verification.'
      });
    }

    console.log('[API] Form submission successful');
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while verifying the contact form.'
    });
  }
}

async function parseBody(req: any): Promise<any> {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk: any) => {
      data += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}
