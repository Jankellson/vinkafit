#!/usr/bin/env node
/**
 * Foto-infografikas ģenerators — REĀLS ēdiena foto + precīzs latviešu teksts virsū.
 *
 * Stils: kā "Fast Food Calories" Pinterest-pin, bet ar īstu fotogrāfiju fonā
 * (nevis SVG formām) un ar pixel-perfect latviešu tekstu (NE AI-renderētu).
 *
 * Pipeline:
 *   1. node scripts/generate-image.mjs ... → ēdiena foto BEZ teksta (ar tukšu malu)
 *   2. node scripts/generate-infographic.mjs ... → uzliek tekstu/skaitļus/kopsummu
 *
 * Usage:
 *   node scripts/generate-infographic.mjs \
 *     --slug esanas-biezums \
 *     --name uzkodu-kalorijas-infografika \
 *     --bg public/images/raksti/esanas-biezums/esanas-biezums-uzkodu-infografika-bg.webp \
 *     --eyebrow "Uztura ABC" \
 *     --title "Nemanāmās kalorijas" \
 *     --subtitle "Uzkodas «neko daudz» starp ēdienreizēm" \
 *     --items "Kafija ar pienu|~70 kcal;;Divi cepumi|~140 kcal;;Sauja riekstu|~190 kcal;;Šokolāde|~85 kcal" \
 *     --total "≈ 485 kcal" \
 *     --total-caption "vēl viena neierakstīta ēdienreize dienā" \
 *     --note "Aptuvenas vērtības · ievajekabsone.lv"
 *
 * Produces: public/images/raksti/[slug]/[slug]-[name].webp  (kvadrāts, default 1080×1080)
 *
 * Flags:
 *   --w --h        kanvas izmērs (default 1080×1080; Pinterest pin: 1080 1350)
 *   --side         teksta puse: "left" (default) vai "right"
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

const {
  slug, name, bg,
  eyebrow = 'Uztura ABC',
  title = '',
  subtitle = '',
  items = '',
  total = '',
  'total-caption': totalCaption = '',
  note = 'ievajekabsone.lv',
  side = 'left',
} = args;
const W = parseInt(args.w || '1080', 10);
const H = parseInt(args.h || '1080', 10);

if (!slug || !name || !bg || !title) {
  console.error('❌ Required: --slug --name --bg --title');
  process.exit(1);
}

const projectRoot = path.resolve(import.meta.dirname, '..');
const bgPath = path.isAbsolute(bg) ? bg : path.join(projectRoot, bg);
const outDir = path.join(projectRoot, 'public', 'images', 'raksti', slug);
const outPath = path.join(outDir, `${slug}-${name}.webp`);

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const wrap = (text, max) => {
  const words = String(text).split(/\s+/);
  const lines = []; let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > max && line) { lines.push(line); line = w; }
    else line = (line + ' ' + w).trim();
  }
  if (line) lines.push(line);
  return lines;
};

// brand
const CREAM = '#fcfbf7', PLUM = '#3c1220', BURG = '#84183e', GOLD = '#ebc07e', INK = '#2a1419', INKSOFT = '#5a3a40';

const pad = Math.round(W * 0.066);
const colW = Math.round(W * 0.46);               // teksta kolonnas platums
const isLeft = side !== 'right';
const x0 = isLeft ? pad : W - pad - colW;          // kolonnas kreisā mala
const colR = x0 + colW;                            // kolonnas labā mala (vērtībām)

// ── scrim: gaišs krēma gradients zem teksta puses, lai teksts lasāms ──
const scrimDir = isLeft ? { x1: 0, x2: 1 } : { x1: 1, x2: 0 };
const scrimX = isLeft ? 0 : W - Math.round(W * 0.62);

const itemRows = items
  ? items.split(';;').map(s => { const [l, v] = s.split('|'); return { l: (l || '').trim(), v: (v || '').trim() }; }).filter(r => r.l)
  : [];

// ── vertikālais izkārtojums ──
let y = Math.round(H * 0.085);

// eyebrow
const eyebrowSvg = `
  <line x1="${x0}" y1="${y}" x2="${x0 + 46}" y2="${y}" stroke="${GOLD}" stroke-width="3"/>
  <text x="${x0 + 60}" y="${y + 7}" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="22" letter-spacing="4" fill="${BURG}">${esc(eyebrow.toUpperCase())}</text>`;
y += 56;

// title (serif italic, plum)
const titleLines = wrap(title, 16);
const titleSize = titleLines.length > 2 ? 52 : 62;
const titleLH = Math.round(titleSize * 1.05);
const titleSvg = titleLines.map((ln, i) =>
  `<text x="${x0}" y="${y + titleSize + i * titleLH}" font-family="Georgia,'Playfair Display',serif" font-style="italic" font-weight="500" font-size="${titleSize}" fill="${PLUM}">${esc(ln)}</text>`
).join('');
y += titleSize + (titleLines.length - 1) * titleLH + 30;

// subtitle
let subSvg = '';
if (subtitle) {
  const subLines = wrap(subtitle, 34);
  subSvg = subLines.map((ln, i) =>
    `<text x="${x0}" y="${y + 22 + i * 30}" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="21" fill="${INKSOFT}">${esc(ln)}</text>`
  ).join('');
  y += subLines.length * 30 + 26;
}

// items — divkolonnu saraksts ar zelta punktu + plānu līniju zem
let itemsSvg = '';
const rowPitch = 58;
y += 18;
for (const r of itemRows) {
  const ry = y;
  itemsSvg += `
    <circle cx="${x0 + 7}" cy="${ry - 7}" r="6" fill="${GOLD}"/>
    <text x="${x0 + 28}" y="${ry}" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="24" fill="${INK}">${esc(r.l)}</text>
    <text x="${colR}" y="${ry}" text-anchor="end" font-family="Georgia,'Playfair Display',serif" font-style="italic" font-size="27" fill="${BURG}">${esc(r.v)}</text>
    <line x1="${x0}" y1="${ry + 20}" x2="${colR}" y2="${ry + 20}" stroke="${BURG}" stroke-width="1" opacity="0.14"/>`;
  y += rowPitch;
}

// total badge
let totalSvg = '';
if (total) {
  y += 22;
  const bw = colW, bh = totalCaption ? 132 : 96;
  totalSvg = `
    <rect x="${x0}" y="${y}" width="${bw}" height="${bh}" rx="6" fill="${BURG}"/>
    <rect x="${x0}" y="${y}" width="6" height="${bh}" fill="${GOLD}"/>
    <text x="${x0 + 30}" y="${y + (totalCaption ? 62 : 60)}" font-family="Georgia,'Playfair Display',serif" font-style="italic" font-weight="600" font-size="50" fill="${CREAM}">${esc(total)}</text>
    ${totalCaption ? `<text x="${x0 + 32}" y="${y + 100}" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="19" fill="${GOLD}">= ${esc(totalCaption)}</text>` : ''}`;
  y += bh;
}

// footer note — plūst zem kopsummas, ne absolūti (lai nepārklājas)
y += 30;
const footSvg = `
  <line x1="${x0}" y1="${y - 6}" x2="${x0 + 40}" y2="${y - 6}" stroke="${GOLD}" stroke-width="2"/>
  <text x="${x0 + 52}" y="${y}" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="18" letter-spacing="1" fill="${INKSOFT}">${esc(note)}</text>`;

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="scrim" x1="${scrimDir.x1}" y1="0" x2="${scrimDir.x2}" y2="0">
      <stop offset="0"    stop-color="#fcfbf7" stop-opacity="0.95"/>
      <stop offset="0.42" stop-color="#fcfbf7" stop-opacity="0.86"/>
      <stop offset="0.72" stop-color="#fcfbf7" stop-opacity="0.30"/>
      <stop offset="1"    stop-color="#fcfbf7" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect x="${scrimX}" y="0" width="${Math.round(W * 0.62)}" height="${H}" fill="url(#scrim)"/>
  ${eyebrowSvg}
  ${titleSvg}
  ${subSvg}
  ${itemsSvg}
  ${totalSvg}
  ${footSvg}
</svg>`;

const base = await sharp(bgPath).resize(W, H, { fit: 'cover', position: 'attention' }).toBuffer();
let buf = await sharp(base).composite([{ input: Buffer.from(svg), top: 0, left: 0 }]).webp({ quality: 88, effort: 5 }).toBuffer();
let q = 88;
while (buf.length > 180 * 1024 && q > 55) {
  q -= 6;
  buf = await sharp(base).composite([{ input: Buffer.from(svg), top: 0, left: 0 }]).webp({ quality: q, effort: 5 }).toBuffer();
}

await mkdir(outDir, { recursive: true });
await sharp(buf).toFile(outPath);
const webPath = `/images/raksti/${slug}/${slug}-${name}.webp`;
console.log(`✅ Infografika: ${webPath}  (${(buf.length / 1024).toFixed(1)} KB, q${q}, ${W}×${H})`);
console.log(`\n<img src="${webPath}" alt="[ADD ALT]" width="${W}" height="${H}" loading="lazy">`);
