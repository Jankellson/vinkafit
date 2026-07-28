#!/usr/bin/env node
/**
 * OG / Social-share image generator (foto + virsraksts ar Ievas zīmola stilu)
 *
 * Usage:
 *   node scripts/generate-og.mjs \
 *     --slug "skivja-metode" \
 *     --src "public/images/raksti/skivja-metode/skivja-metode-cover.webp" \
 *     --eyebrow "Uztura ABC" \
 *     --title "Šķīvja metode" \
 *     --subtitle "Proporcijas un kā to izmantot ikdienā"
 *
 * Produces: public/images/raksti/[slug]/[slug]-og.webp  (1200×630)
 * Pixel-perfect Latvian text (no AI text rendering). Brand: plum scrim + gold + cream serif.
 */

import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, val, i, arr) => {
    if (val.startsWith('--')) acc.push([val.slice(2), arr[i + 1]]);
    return acc;
  }, [])
);

const { slug, src, title, subtitle = '', eyebrow = 'Uztura ABC' } = args;
if (!slug || !src || !title) {
  console.error('❌ Required: --slug --src --title');
  process.exit(1);
}

const W = 1200, H = 630;
const projectRoot = path.resolve(import.meta.dirname, '..');
const srcPath = path.isAbsolute(src) ? src : path.join(projectRoot, src);
const outDir = path.join(projectRoot, 'public', 'images', 'raksti', slug);
const outPath = path.join(outDir, `${slug}-og.webp`);

// XML-escape for SVG text
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// naive word-wrap by approx char budget
const wrap = (text, max) => {
  const words = text.split(/\s+/);
  const lines = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > max && line) { lines.push(line); line = w; }
    else line = (line + ' ' + w).trim();
  }
  if (line) lines.push(line);
  return lines;
};

const titleLines = wrap(title, 22);
const subLines   = subtitle ? wrap(subtitle, 40) : [];

// vertical layout (left-aligned text block, bottom-anchored)
const titleSize = titleLines.length > 1 ? 66 : 80;
const titleLH   = titleSize * 1.06;
const subSize   = 30;
const startX    = 72;

// build title tspans
let y = 250;
const titleSvg = titleLines.map((ln, i) =>
  `<text x="${startX}" y="${y + i * titleLH}" font-family="Georgia, 'Playfair Display', serif" font-style="italic" font-weight="500" font-size="${titleSize}" fill="#fff8f2">${esc(ln)}</text>`
).join('');
const titleBottom = y + (titleLines.length - 1) * titleLH;

const subSvg = subLines.map((ln, i) =>
  `<text x="${startX}" y="${titleBottom + 56 + i * (subSize * 1.4)}" font-family="Georgia, 'Playfair Display', serif" font-style="italic" font-size="${subSize}" fill="rgba(255,248,242,0.92)">${esc(ln)}</text>`
).join('');

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="h" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#1e080f" stop-opacity="0.88"/>
      <stop offset="0.45" stop-color="#1e080f" stop-opacity="0.6"/>
      <stop offset="0.85" stop-color="#1e080f" stop-opacity="0.08"/>
    </linearGradient>
    <linearGradient id="v" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stop-color="#1e080f" stop-opacity="0.6"/>
      <stop offset="0.5" stop-color="#1e080f" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#h)"/>
  <rect width="${W}" height="${H}" fill="url(#v)"/>
  <!-- eyebrow -->
  <line x1="${startX}" y1="178" x2="${startX + 46}" y2="178" stroke="#ebc07e" stroke-width="2"/>
  <text x="${startX + 60}" y="184" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="22" letter-spacing="4" fill="#ebc07e">${esc(eyebrow.toUpperCase())}</text>
  ${titleSvg}
  ${subSvg}
  <!-- footer brand -->
  <line x1="${startX}" y1="556" x2="${startX + 46}" y2="556" stroke="#ebc07e" stroke-width="2"/>
  <text x="${startX + 60}" y="563" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="22" letter-spacing="2" fill="rgba(255,248,242,0.85)">ievajekabsone.lv</text>
</svg>`;

const base = await sharp(srcPath).resize(W, H, { fit: 'cover', position: 'attention' }).toBuffer();
let buf = await sharp(base).composite([{ input: Buffer.from(svg), top: 0, left: 0 }]).webp({ quality: 88, effort: 5 }).toBuffer();

let q = 88;
while (buf.length > 130 * 1024 && q > 55) {
  q -= 6;
  buf = await sharp(base).composite([{ input: Buffer.from(svg), top: 0, left: 0 }]).webp({ quality: q, effort: 5 }).toBuffer();
}

await mkdir(outDir, { recursive: true });
await sharp(buf).toFile(outPath);
console.log(`✅ OG saved: /images/raksti/${slug}/${slug}-og.webp  (${(buf.length / 1024).toFixed(1)} KB, q${q})`);
