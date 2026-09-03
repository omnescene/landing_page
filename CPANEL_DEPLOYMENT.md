# Deployment Guide for cPanel

## Problem
Form submission fails on production (cPanel) but works locally.

## Solution

### Step 1: Set Environment Variables in cPanel

1. Log into your **cPanel**
2. Go to **Advanced > Terminal** or SSH into your server
3. Navigate to your OmneScene project directory (typically in `public_html`)
4. Create a `.env.local` file:

```bash
nano .env.local
```

5. Add these two lines with your actual reCAPTCHA keys:

```
VITE_RECAPTCHA_SITE_KEY=YOUR_RECAPTCHA_SITE_KEY
RECAPTCHA_SECRET_KEY=YOUR_RECAPTCHA_SECRET_KEY
```

6. Save and exit (Ctrl+X, then Y, then Enter)

### Step 2: Get Your reCAPTCHA Keys

If you don't have reCAPTCHA keys yet:

1. Go to https://www.google.com/recaptcha/admin
2. Create a new site:
   - **Display name**: OmneScene
   - **reCAPTCHA type**: reCAPTCHA v3
   - **Domains**: omnescene.com (and www.omnescene.com)
3. Copy the **Site Key** and **Secret Key**

### Step 3: How the API Works

The form submission flow:
1. **Browser** → reCAPTCHA widget generates a token
2. **Browser** → Sends form data + token to `/api/verify-recaptcha`
3. **Server** → Verifies token with Google's API using your Secret Key
4. **Server** → If valid, forwards to Formspree
5. **Formspree** → Email is sent to you

### Step 4: Debug Logs

The API now outputs detailed logs to your cPanel error logs when something fails. Check:
- `/public_html/error_log`
- Or SSH: `tail -f error_log` in your project directory

Look for messages starting with `[API]` to see what's happening.

### Step 5: Common Issues

**"reCAPTCHA secret key is not configured"**
- Make sure `.env.local` has `RECAPTCHA_SECRET_KEY=YOUR_KEY` (not empty)
- Restart your application

**"Google reCAPTCHA verification failed"**
- Check that your reCAPTCHA keys are correct
- Verify your domain is added to the reCAPTCHA v3 site settings
- Check cPanel logs for the actual error codes

**"Submission delivery failed after verification"**
- Formspree might be rate-limiting or experiencing issues
- Check `https://formspree.io/` status
- Verify your form ID `xljroanj` is still valid

## For Node.js on cPanel

If you're using Node.js hosting on cPanel:

1. Upload your project files
2. Run `npm install` and `npm run build`
3. Set `.env.local` with your keys
4. Restart your Node.js application in cPanel

## Questions?

If you still see errors, check the logs and share the error message with timestamp. The `[API]` logs will show exactly where the failure occurs.
