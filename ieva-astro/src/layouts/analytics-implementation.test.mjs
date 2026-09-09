import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const layoutPath = new URL('./BaseLayout.astro', import.meta.url);

test('does not ship a client-side analytics script or a cookie consent gate', async () => {
  const layout = await readFile(layoutPath, 'utf8');

  // Cloudflare Web Analytics is injected automatically server-side (proxied zone) —
  // no beacon script, no consent banner needed.
  assert.doesNotMatch(layout, /id="cookieConsent"/);
  assert.doesNotMatch(layout, /googletagmanager\.com/);
  assert.doesNotMatch(layout, /cloudflareinsights\.com/);
});
