const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactSubmission(values) {
  const name = String(values.name || '').trim();
  const email = String(values.email || '').trim();
  const message = String(values.message || '').trim();

  if (!name || !email || !message) {
    return { ok: false, error: 'Lūdzu aizpildi visus obligātos laukus.' };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, error: 'Ievadi derīgu e-pasta adresi.' };
  }

  if (!values.consent_rules) {
    return { ok: false, error: 'Lūdzu apstiprini noteikumus un privātuma politiku.' };
  }

  return { ok: true };
}
