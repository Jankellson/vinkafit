import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const layoutPath = new URL('./BaseLayout.astro', import.meta.url);

test('loads Cloudflare Web Analytics beacon without a cookie consent gate', async () => {
  const layout = await readFile(layoutPath, 'utf8');

  assert.match(layout, /PUBLIC_CF_BEACON_TOKEN/);
  assert.match(layout, /static\.cloudflareinsights\.com\/beacon\.min\.js/);
  assert.doesNotMatch(layout, /id="cookieConsent"/);
  assert.doesNotMatch(layout, /googletagmanager\.com/);
});
