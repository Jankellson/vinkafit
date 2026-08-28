import { validateContactSubmission } from './contact-validation.mjs';

type Env = {
  TURNSTILE_SECRET_KEY?: string;
  RESEND_API_KEY?: string;
  RESEND_FROM_EMAIL?: string;
};

const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });

const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
};

const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => HTML_ESCAPES[character]);

export const onRequestPost = async ({ request, env }: { request: Request; env: Env }) => {
  if (!env.TURNSTILE_SECRET_KEY || !env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL) {
    return json({ error: 'Kontaktforma vēl tiek iestatīta. Lūdzu uzraksti uz ieva.vinka@gmail.com.' }, 503);
  }

  const formData = await request.formData();
  const values = Object.fromEntries(formData.entries());
  const validation = validateContactSubmission(values);
  if (!validation.ok) return json({ error: validation.error }, 400);

  const turnstileToken = String(formData.get('cf-turnstile-response') || '');
  if (!turnstileToken) return json({ error: 'Lūdzu apstiprini, ka neesi robots.' }, 400);

  const verification = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: env.TURNSTILE_SECRET_KEY,
      response: turnstileToken,
      remoteip: request.headers.get('CF-Connecting-IP') || '',
    }),
  });
  const turnstile = await verification.json() as { success?: boolean };
  if (!turnstile.success) return json({ error: 'Drošības pārbaude neizdevās. Pamēģini vēlreiz.' }, 400);

  const name = String(values.name).trim();
  const email = String(values.email).trim();
  const phone = String(values.phone || '—').trim();
  const service = String(values.service || 'Cits jautājums').trim();
  const message = String(values.message).trim();
  const packageName = String(values.paka || '').trim();
  const newsletter = values.consent_newsletter ? 'jā' : 'nē';
  const text = [
    `Vārds: ${name}`,
    `E-pasts: ${email}`,
    `Tālrunis: ${phone}`,
    `Interesē: ${service}`,
    packageName ? `Paka URL parametrā: ${packageName}` : '',
    '',
    message,
    '',
    `Newsletter: ${newsletter}`,
  ].filter(Boolean).join('\n');

  const resend = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.RESEND_FROM_EMAIL,
      to: ['ieva.vinka@gmail.com'],
      reply_to: email,
      subject: `Mājaslapas pieteikums — ${service}`,
      text,
      html: `<pre style="font:14px/1.5 system-ui, sans-serif;white-space:pre-wrap">${escapeHtml(text)}</pre>`,
    }),
  });

  if (!resend.ok) {
    console.error('Resend contact-form delivery failed', resend.status);
    return json({ error: 'Neizdevās nosūtīt ziņu. Lūdzu uzraksti uz ieva.vinka@gmail.com.' }, 502);
  }

  return json({ ok: true });
};
