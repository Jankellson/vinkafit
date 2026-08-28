import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const layoutPath = new URL('./BaseLayout.astro', import.meta.url);

test('loads the configured GA4 property only after an analytics consent choice', async () => {
  const layout = await readFile(layoutPath, 'utf8');

  assert.match(layout, /G-807WDRDGZP/);
  assert.match(layout, /analytics_storage:\s*'denied'/);
  assert.match(layout, /id="cookieConsent"/);
  assert.match(layout, /data-cookie-choice="accept"/);
  assert.match(layout, /data-cookie-choice="reject"/);
});
