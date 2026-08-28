import test from 'node:test';
import assert from 'node:assert/strict';
import { validateContactSubmission } from './contact-validation.mjs';

test('accepts a complete contact submission', () => {
  const result = validateContactSubmission({
    name: 'Anna',
    email: 'anna@example.com',
    phone: '+371 20000000',
    service: 'sakuma-konsultacija',
    message: 'Vēlos pieteikties konsultācijai.',
    paka: '',
    consent_rules: 'on',
  });

  assert.equal(result.ok, true);
});

test('rejects a submission without required consent', () => {
  const result = validateContactSubmission({
    name: 'Anna',
    email: 'anna@example.com',
    message: 'Vēlos pieteikties konsultācijai.',
  });

  assert.deepEqual(result, { ok: false, error: 'Lūdzu apstiprini noteikumus un privātuma politiku.' });
});

test('rejects an invalid email address', () => {
  const result = validateContactSubmission({
    name: 'Anna',
    email: 'nav-epasts',
    message: 'Vēlos pieteikties konsultācijai.',
    consent_rules: 'on',
  });

  assert.deepEqual(result, { ok: false, error: 'Ievadi derīgu e-pasta adresi.' });
});
