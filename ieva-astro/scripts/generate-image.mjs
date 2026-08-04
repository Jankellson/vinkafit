#!/usr/bin/env node
/**
 * AI Image Generator → WebP Pipeline
 *
 * Usage:
 *   node scripts/generate-image.mjs --prompt "..." --slug "skivja-metode" --type hero
 *
 * Flags:
 *   --prompt    Image prompt (REQUIRED)
 *   --slug      Article slug, e.g. "skivja-metode" (REQUIRED)
 *   --type      hero | inline | decorative | cover | social | story (default: hero)
 *   --name      Filename descriptor without .webp, e.g. "darzenu-proporcijas" (optional; defaults by type)
 *   --model     OpenRouter model id (optional; auto-picks based on whether prompt mentions text)
 *   --alt       Alt text in target language (RECOMMENDED — needed for SEO)
 *
 * Produces:
 *   public/images/raksti/[slug]/[filename].webp
 * Prints to stdout: ready-to-paste <img> tag.
 *
 * Requires .env: OPENROUTER_API_KEY
 */

import 'dotenv/config';
import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

// --- CLI parsing -----------------------------------------------------------
const rawArgs = process.argv.slice(2);
const args = rawArgs.some((arg) => arg.startsWith('--'))
  ? Object.fromEntries(rawArgs.reduce((acc, val, i, arr) => {
    if (val.startsWith('--')) acc.push([val.slice(2), arr[i + 1]]);
    return acc;
  }, []))
  : Object.fromEntries(['slug', 'type', 'name', 'alt', 'model', 'prompt'].map((key, i) => [key, rawArgs[i]]));

const { prompt, slug, type = 'hero', name, alt = '' } = args;
let { model } = args;

if (!prompt || !slug) {
  console.error('❌ Required: --prompt "..." --slug "article-slug"');
  process.exit(1);
}

// --- Defaults by type ------------------------------------------------------
const TYPE_DEFAULTS = {
  hero:       { width: 1200, height: 630, maxKB: 120, defaultName: 'hero',     loading: 'eager' },
  inline:     { width: 800,  height: 600, maxKB: 80,  defaultName: 'inline',   loading: 'lazy'  },
  decorative: { width: 600,  height: 400, maxKB: 60,  defaultName: 'visual',   loading: 'lazy'  },
  cover:      { width: 1200, height: 1800, maxKB: 220, defaultName: 'cover',   loading: 'eager' },
  social:     { width: 1080, height: 1350, maxKB: 180, defaultName: 'social',  loading: 'lazy'  },
  story:      { width: 1080, height: 1920, maxKB: 220, defaultName: 'story',   loading: 'lazy'  },
};
const cfg = TYPE_DEFAULTS[type];
if (!cfg) {
  console.error(`❌ Invalid --type. Use one of: ${Object.keys(TYPE_DEFAULTS).join(', ')}`);
  process.exit(1);
}

// --- Model auto-selection --------------------------------------------------
// If prompt mentions text/headline/title rendering → GPT-5.4 Image 2 (text-accurate).
// Otherwise default to Nano Banana Pro (cheaper, more photographic).
if (!model) {
  const textHints = /\b(text|headline|title|"[^"]+"|caption|wordmark|label)\b/i;
  model = textHints.test(prompt)
    ? 'openai/gpt-5.4-image-2'
    : 'google/gemini-3-pro-image-preview';
}

// --- Slug & filename hygiene -----------------------------------------------
const stripDiacritics = (s) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

const cleanSlug = stripDiacritics(slug);
const cleanName = stripDiacritics(name || cfg.defaultName);
const filename = `${cleanSlug}-${cleanName}.webp`;

const projectRoot = path.resolve(import.meta.dirname, '..');
const outDir = path.join(projectRoot, 'public', 'images', 'raksti', cleanSlug);
const outPath = path.join(outDir, filename);
const webPath = `/images/raksti/${cleanSlug}/${filename}`;

// --- OpenRouter API call ---------------------------------------------------
const apiKey = process.env.OPENROUTER_API_KEY;
if (!apiKey) {
  console.error('❌ Missing OPENROUTER_API_KEY in .env');
  process.exit(1);
}

console.log(`🎨 Generating image…`);
console.log(`   Model:   ${model}`);
console.log(`   Type:    ${type} (${cfg.width}×${cfg.height})`);
console.log(`   Output:  ${webPath}`);

const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': 'https://ievajekabsone.lv',
    'X-Title': 'Ievas raksti - image generation',
  },
  body: JSON.stringify({
    model,
    modalities: ['image', 'text'],
    messages: [{ role: 'user', content: prompt }],
  }),
});

if (!response.ok) {
  console.error(`❌ OpenRouter API error: ${response.status} ${response.statusText}`);
  console.error(await response.text());
  process.exit(1);
}

const result = await response.json();

// --- Extract image from response -------------------------------------------
// OpenRouter returns images via message.images[].image_url.url (data URL base64).
const message = result.choices?.[0]?.message;
const imageUrl = message?.images?.[0]?.image_url?.url;

if (!imageUrl?.startsWith('data:image/')) {
  console.error('❌ No image data in response. Response shape:');
  console.error(JSON.stringify(result, null, 2).slice(0, 1500));
  process.exit(1);
}

const base64 = imageUrl.split(',')[1];
const rawBuffer = Buffer.from(base64, 'base64');

// --- Sharp pipeline: resize → WebP at quality 85 ---------------------------
await mkdir(outDir, { recursive: true });

let webpBuffer = await sharp(rawBuffer)
  .resize(cfg.width, cfg.height, { fit: 'cover', position: 'attention' })
  .webp({ quality: 85, effort: 5 })
  .toBuffer();

// If over budget, step down quality until under maxKB
let quality = 85;
while (webpBuffer.length > cfg.maxKB * 1024 && quality > 50) {
  quality -= 5;
  webpBuffer = await sharp(rawBuffer)
    .resize(cfg.width, cfg.height, { fit: 'cover', position: 'attention' })
    .webp({ quality, effort: 5 })
    .toBuffer();
}

await writeFile(outPath, webpBuffer);

const sizeKB = (webpBuffer.length / 1024).toFixed(1);
console.log(`✅ Saved ${sizeKB} KB at quality ${quality}`);

// --- Output the <img> tag --------------------------------------------------
const altText = alt || `[ADD ALT TEXT — describes ${cleanName} for article "${cleanSlug}"]`;
const imgTag = `<img src="${webPath}" alt="${altText}" width="${cfg.width}" height="${cfg.height}" loading="${cfg.loading}">`;

console.log('\n📋 Paste this into the article:\n');
console.log(imgTag);
console.log('');
