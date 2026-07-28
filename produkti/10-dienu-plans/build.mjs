// Ģenerators: data.mjs -> dist/index.html (drukai gatavs A4, Ievas zīmols)
import { meta, copy, allergens, swaps, days, shoppingByDay, catalog } from "./data.mjs";
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dir = dirname(fileURLToPath(import.meta.url));

// ---------- palīgi ----------
const mealLabel = { brokastis: "Brokastis", otras: "Otrās brokastis", pusdienas: "Pusdienas", launags: "Launags", vakarinas: "Vakariņas" };

const C = { burgundy: "#84183e", gold: "#ebc07e", cream: "#fcfbf7", ivory: "#f0eee9", ink: "#2a1419", inkSoft: "#5a3a40" };

function donut(p, t, o, size = 116) {
  const kp = p * 4, kt = t * 9, ko = o * 4, tot = kp + kt + ko || 1;
  const r = size / 2 - 11, cx = size / 2, cy = size / 2, circ = 2 * Math.PI * r;
  // olbaltumi=burgundijs, ogļhidrāti=zelts, tauki=mīkstā tinte
  const segs = [[C.burgundy, kp], [C.gold, ko], [C.inkSoft, kt]];
  let off = 0, arcs = "";
  for (const [col, val] of segs) {
    const len = (val / tot) * circ;
    arcs += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${col}" stroke-width="14" stroke-linecap="butt" stroke-dasharray="${len.toFixed(2)} ${(circ - len).toFixed(2)}" stroke-dashoffset="${(-off).toFixed(2)}" transform="rotate(-90 ${cx} ${cy})"/>`;
    off += len;
  }
  return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="Makro sadalījums">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${C.ivory}" stroke-width="14"/>
    ${arcs}
    <text x="${cx}" y="${cy - 2}" text-anchor="middle" font-family="Fraunces, serif" font-size="20" fill="${C.ink}" font-weight="600">${p + t + o ? "" : ""}</text>
  </svg>`;
}

function macroLegend(p, t, o) {
  const row = (col, label, g) => `<span class="leg"><span class="dot" style="background:${col}"></span>${label} <b>${g} g</b></span>`;
  return `<div class="legend">${row(C.burgundy, "Olbaltumi", p)}${row(C.gold, "Ogļhidrāti", o)}${row(C.inkSoft, "Tauki", t)}</div>`;
}

function calorieChart() {
  const w = 720, h = 230, pad = 36, max = 1700;
  const bw = (w - pad * 2) / days.length;
  let bars = "", labels = "";
  days.forEach((d, i) => {
    const bh = (d.kcal / max) * (h - pad * 2);
    const x = pad + i * bw + bw * 0.18, y = h - pad - bh, bwi = bw * 0.64;
    bars += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bwi.toFixed(1)}" height="${bh.toFixed(1)}" rx="4" fill="${C.burgundy}"/>`;
    bars += `<text x="${(x + bwi / 2).toFixed(1)}" y="${(y - 7).toFixed(1)}" text-anchor="middle" font-size="12" fill="${C.inkSoft}" font-family="Instrument Sans, sans-serif">${d.kcal}</text>`;
    labels += `<text x="${(x + bwi / 2).toFixed(1)}" y="${h - pad + 18}" text-anchor="middle" font-size="12" fill="${C.inkSoft}" font-family="Instrument Sans, sans-serif">${d.n}.</text>`;
  });
  const avg = Math.round(days.reduce((s, d) => s + d.kcal, 0) / days.length);
  const ay = h - pad - (avg / max) * (h - pad * 2);
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="Kaloriju grafiks pa dienām">
    <line x1="${pad}" y1="${h - pad}" x2="${w - pad}" y2="${h - pad}" stroke="${C.ivory}" stroke-width="2"/>
    <line x1="${pad}" y1="${ay.toFixed(1)}" x2="${w - pad}" y2="${ay.toFixed(1)}" stroke="${C.gold}" stroke-width="1.5" stroke-dasharray="5 4"/>
    <text x="${w - pad}" y="${(ay - 6).toFixed(1)}" text-anchor="end" font-size="11" fill="${C.gold}" font-family="Instrument Sans, sans-serif">vidēji ${avg} kcal</text>
    ${bars}${labels}
  </svg>`;
}

function plateDiagram() {
  // šķīvja metode: 1/2 dārzeņi, 1/4 olbaltums, 1/4 ogļhidrāti
  const cx = 90, cy = 90, r = 78;
  const seg = (a0, a1, col) => {
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const large = a1 - a0 > Math.PI ? 1 : 0;
    return `<path d="M${cx} ${cy} L${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} Z" fill="${col}"/>`;
  };
  const P = Math.PI;
  return `<svg viewBox="0 0 180 180" width="180" height="180" role="img" aria-label="Šķīvja metode">
    ${seg(-P / 2, P / 2, "#7a9a73")}
    ${seg(P / 2, P, C.burgundy)}
    ${seg(P, 1.5 * P, C.gold)}
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#fff" stroke-width="3"/>
  </svg>`;
}

function allergenPills(codes) {
  if (!codes || !codes.length) return `<span class="pill pill-none">Bez galvenajiem alergēniem</span>`;
  return codes.map(c => allergens[c] ? `<span class="pill"><span class="pill-b">${allergens[c][0]}</span>${allergens[c]}</span>` : "").join("");
}

const clock = `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`;

// ---------- iepirkumu agregācija ----------
function buildShopping() {
  const grams = {}, pieces = {};
  for (const day of Object.values(shoppingByDay)) {
    for (const [name, val] of Object.entries(day)) {
      if (Array.isArray(val)) pieces[name] = (pieces[name] || 0) + val[0];
      else grams[name] = (grams[name] || 0) + val;
    }
  }
  const cats = {};
  const add = (name, qtyText) => {
    const c = catalog[name] ? catalog[name][0] : "Eļļas, garšvielas, citi";
    const pkg = catalog[name] ? catalog[name][1] : "";
    (cats[c] ||= []).push({ name, qtyText, pkg });
  };
  for (const [name, g] of Object.entries(grams)) add(name, g >= 1000 ? (g / 1000).toFixed(1).replace(".", ",") + " kg" : g + " g");
  for (const [name, n] of Object.entries(pieces)) add(name, n + " gab");
  const order = ["Graudi un putraimi", "Maize", "Piena produkti", "Olas", "Olbaltums", "Gaļa un zivs", "Dārzeņi un zaļumi", "Augļi", "Rieksti un sēklas", "Eļļas, garšvielas, citi"];
  return order.filter(c => cats[c]).map(c => ({ cat: c, items: cats[c].sort((a, b) => a.name.localeCompare(b.name, "lv")) }));
}

// ---------- meal-prep pāri ----------
const prepPairs = [
  ["1. diena · vakariņas", "Biezpiena plācenīši", "2. diena · brokastis"],
  ["3. diena · pusdienas", "Pupiņu sautējums", "4. diena · otrās brokastis"],
  ["3. diena · vakariņas", "Ķirbja krēmzupa", "4. diena · pusdienas"],
  ["7. diena · vakariņas", "Pildīta paprika", "8. diena · launags"],
  ["9. diena · pusdienas", "Laša zupa", "10. diena · pusdienas"],
  ["9. diena · vakariņas", "Vistas sautējums", "10. diena · otrās brokastis"],
];

// ---------- HTML sekcijas ----------
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function cover() {
  return `<section class="page cover">
    <div class="cover-frame">
      <div class="cover-top">
        <span class="kicker">Uztura ceļvedis</span>
        <span class="cover-author-top">${esc(meta.author)}</span>
      </div>
      <div class="cover-mid">
        <h1>Veselīgu recepšu un<br>ēdienreižu plāns</h1>
        <div class="cover-days"><span>10</span> dienām</div>
        <p class="cover-tag">Sabalansētas, ātri pagatavojamas receptes ar izrēķinātām kalorijām, iepirkumu sarakstu un pagatavošanas soļiem.</p>
      </div>
      <div class="cover-bot">
        <div class="cover-author"><b>${esc(meta.author)}</b><span>${esc(meta.authorRole)} · ${esc(meta.site)}</span></div>
      </div>
    </div>
  </section>`;
}

function toc() {
  const items = [
    "Kā lietot šo plānu", "Par Ievu un manu pieeju", "Kam šis plāns domāts", "Kā pielāgot sev",
    "Vispārīgie ieteikumi", "Nedēļas iepirkumu saraksts", "Pagatavo vienreiz, ēd divreiz",
    "10 dienu ēdienreižu plāns", "Aizstāšanas tabula", "Biežākie jautājumi", "Pašsajūtas dienasgrāmata",
  ];
  return `<section class="page sect">
    <h2 class="sect-h">Saturs</h2>
    <ol class="toc">${items.map(i => `<li>${i}</li>`).join("")}</ol>
    <div class="plate-note">
      ${plateDiagram()}
      <div>
        <h3>Šķīvja metode</h3>
        <p>Vienkāršs princips katrai maltītei: puse šķīvja — dārzeņi, ceturtdaļa — olbaltums, ceturtdaļa — pilngraudu ogļhidrāti.</p>
        <div class="legend">
          <span class="leg"><span class="dot" style="background:#7a9a73"></span>Dārzeņi ½</span>
          <span class="leg"><span class="dot" style="background:${C.burgundy}"></span>Olbaltums ¼</span>
          <span class="leg"><span class="dot" style="background:${C.gold}"></span>Ogļhidrāti ¼</span>
        </div>
      </div>
    </div>
  </section>`;
}

function howToUse() {
  return `<section class="page sect">
    <h2 class="sect-h">Kā lietot šo plānu</h2>
    <p class="lead">${esc(copy.howToUseLead)}</p>
    <ol class="steps-big">${copy.howToUseSteps.map((s, i) => `<li><span class="num">${i + 1}</span><span>${esc(s)}</span></li>`).join("")}</ol>
    <div class="callout">
      <b>Mazs sīkums, kas skaitās</b>
      <p>Dažas receptes pagatavo lielāku porciju un daļu apēd nākamajā dienā. Tā ietaupīsi laiku un produkti nepaliks pāri.</p>
    </div>
  </section>`;
}

function about() {
  return `<section class="page sect">
    <h2 class="sect-h">Par Ievu un manu pieeju</h2>
    <p class="lead">${esc(copy.aboutLead)}</p>
    <div class="phil-grid">${copy.philosophy.map(([t, d]) => `<div class="phil"><h4>${esc(t)}</h4><p>${esc(d)}</p></div>`).join("")}</div>
  </section>`;
}

function forWhom() {
  return `<section class="page sect">
    <h2 class="sect-h">Kam šis plāns domāts</h2>
    <p class="lead">${esc(copy.forWhom)}</p>
    <h3 class="mini-h">Kā pielāgot sev</h3>
    <div class="adapt-grid">${copy.adapt.map(([t, d]) => `<div class="adapt"><b>${esc(t)}</b><span>${esc(d)}</span></div>`).join("")}</div>
    <div class="callout warn">
      <b>Svarīgi</b>
      <p>${esc(copy.disclaimer)}</p>
    </div>
  </section>`;
}

function tips() {
  return `<section class="page sect">
    <h2 class="sect-h">Vispārīgie ieteikumi</h2>
    <ul class="tips">${copy.tips.map(t => `<li>${esc(t)}</li>`).join("")}</ul>
    <div class="water">
      <b>Ūdens dienā</b>
      <div class="glasses">${Array.from({ length: 8 }, () => `<span class="glass"></span>`).join("")}</div>
      <span class="water-note">≈ 8 glāzes (vismaz 2 l)</span>
    </div>
  </section>`;
}

function shopping() {
  const groups = buildShopping();
  return `<section class="page sect">
    <h2 class="sect-h">Nedēļas iepirkumu saraksts</h2>
    <p class="lead">Viss plānam vienā sarakstā. Daudzumi ir summa par 10 dienām — iepakojumu ieteikums palīdz nepārpirkt. Ātrbojīgos (zivs, ogas, zaļumi) pērc tuvāk lietošanai.</p>
    <div class="shop-grid">
      ${groups.map(g => `<div class="shop-cat">
        <h4>${esc(g.cat)}</h4>
        <table class="shop-tbl"><tbody>
          ${g.items.map(it => `<tr><td class="ck">☐</td><td class="nm">${esc(it.name)}</td><td class="qt">${esc(it.qtyText)}</td><td class="pk">${esc(it.pkg)}</td></tr>`).join("")}
        </tbody></table>
      </div>`).join("")}
    </div>
  </section>`;
}

function mealprep() {
  return `<section class="page sect">
    <h2 class="sect-h">Pagatavo vienreiz, ēd divreiz</h2>
    <p class="lead">Sešas receptes plānā gatavo lielāku porciju. Daļu apēd uzreiz, otru — nākamajā dienā. Tā tu pavadi mazāk laika virtuvē.</p>
    <div class="prep-list">
      ${prepPairs.map(([from, dish, to]) => `<div class="prep-row">
        <span class="prep-from">${esc(from)}</span>
        <span class="prep-dish">${esc(dish)}</span>
        <span class="prep-arrow">→</span>
        <span class="prep-to">${esc(to)}</span>
      </div>`).join("")}
    </div>
    <div class="callout"><b>Padoms</b><p>Pagatavoto ēdienu atdzesē un glabā ledusskapī slēgtā traukā. Zupas un sautējumus droši lieto 2–3 dienas.</p></div>
  </section>`;
}

function dayPage(d) {
  return `<section class="page day">
    <header class="day-head">
      <div class="day-no"><span>Diena</span><b>${d.n}</b></div>
      <div class="day-sum">
        <div class="day-kcal">${d.kcal} <span>kcal</span></div>
        ${macroLegend(d.macros.p, d.macros.t, d.macros.o)}
      </div>
      <div class="day-donut">${donut(d.macros.p, d.macros.t, d.macros.o)}</div>
    </header>
    ${d.batch ? `<div class="day-batch">${clock}<span>${esc(d.batch)}</span></div>` : ""}
    <div class="meals">
      ${d.meals.map(m => `<article class="meal">
        <div class="meal-top">
          <span class="meal-type">${mealLabel[m.type]}</span>
          <span class="meal-time">${clock}${m.time} min</span>
          <span class="meal-kcal">${m.kcal} kcal</span>
        </div>
        <h3 class="meal-title">${esc(m.title)}</h3>
        <p class="meal-ing">${esc(m.ing)}</p>
        <ol class="meal-steps">${m.steps.map(s => `<li>${esc(s)}</li>`).join("")}</ol>
        <div class="meal-aller">${allergenPills(m.a)}</div>
      </article>`).join("")}
    </div>
  </section>`;
}

function swapsPage() {
  return `<section class="page sect">
    <h2 class="sect-h">Aizstāšanas tabula</h2>
    <p class="lead">Nepatīk kāds produkts vai tas nav pieejams? Nomaini to. Plāns ir elastīgs — galvenais ir princips, ne konkrēta sastāvdaļa.</p>
    <table class="swap-tbl">
      <thead><tr><th>Ja receptē ir…</th><th>Vari likt vietā</th></tr></thead>
      <tbody>${swaps.map(([a, b]) => `<tr><td>${esc(a)}</td><td>${esc(b)}</td></tr>`).join("")}</tbody>
    </table>
  </section>`;
}

function faqPage() {
  return `<section class="page sect">
    <h2 class="sect-h">Biežākie jautājumi</h2>
    <div class="faq">${copy.faq.map(([q, a]) => `<div class="faq-item"><h4>${esc(q)}</h4><p>${esc(a)}</p></div>`).join("")}</div>
  </section>`;
}

function journalPage() {
  const rows = Array.from({ length: 10 }, (_, i) => `<tr><td class="jd">${i + 1}.</td><td></td><td></td><td></td><td></td><td></td></tr>`).join("");
  return `<section class="page sect">
    <h2 class="sect-h">Pašsajūtas dienasgrāmata</h2>
    <p class="lead">Katru vakaru atzīmē, kā jūties. Ne svars, bet pašsajūta rāda, vai esi uz pareizā ceļa.</p>
    <table class="journal">
      <thead><tr><th>Diena</th><th>Ūdens (glāzes)</th><th>Miegs (h)</th><th>Enerģija (1–5)</th><th>Izsalkums (1–5)</th><th>Piezīmes</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <div class="closing">
      <p>${esc(copy.closing)}</p>
      <span class="sign">— ${esc(meta.author)}</span>
      <span class="sign-site">${esc(meta.site)}</span>
    </div>
  </section>`;
}

// ---------- CSS ----------
const css = `
:root{--burgundy:${C.burgundy};--gold:${C.gold};--cream:${C.cream};--ivory:${C.ivory};--ink:${C.ink};--ink-soft:${C.inkSoft}}
*{box-sizing:border-box}
@page{size:A4;margin:0}
html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{margin:0;font-family:'Instrument Sans',system-ui,sans-serif;color:var(--ink);background:#d8d4cc;font-size:15px;line-height:1.6}
h1,h2,h3,h4,.fraunces{font-family:'Fraunces','Georgia',serif;font-weight:600;letter-spacing:-.01em}
.page{width:210mm;min-height:297mm;background:var(--cream);margin:0 auto;padding:24mm 20mm;position:relative;page-break-after:always;overflow:hidden}
.page:last-child{page-break-after:auto}
@media screen{body{padding:24px 0}.page{margin:0 auto 24px;box-shadow:0 12px 40px rgba(42,20,25,.18)}}

/* gold rule under section titles */
.sect-h{font-size:30px;color:var(--burgundy);margin:0 0 6px}
.sect-h::after{content:"";display:block;width:54px;height:3px;background:var(--gold);margin-top:12px;border-radius:2px}
.lead{font-size:16px;color:var(--ink-soft);max-width:62ch;margin:18px 0 22px}
.mini-h{font-size:20px;color:var(--burgundy);margin:26px 0 12px}

/* COVER */
.cover{background:var(--ink);color:var(--cream);padding:0}
.cover-frame{position:absolute;inset:14mm;border:1px solid rgba(235,192,126,.45);padding:18mm 14mm;display:flex;flex-direction:column;justify-content:space-between}
.cover-top{display:flex;justify-content:space-between;align-items:center;font-size:13px;letter-spacing:.22em;text-transform:uppercase;color:var(--gold)}
.kicker{border:1px solid rgba(235,192,126,.5);padding:6px 14px;border-radius:30px}
.cover-author-top{opacity:.75}
.cover-mid h1{font-size:52px;line-height:1.05;margin:0;color:var(--cream)}
.cover-days{font-family:'Fraunces',serif;font-size:30px;color:var(--gold);margin:14px 0 0;display:flex;align-items:baseline;gap:12px}
.cover-days span{font-size:96px;line-height:.9;color:var(--cream)}
.cover-tag{max-width:46ch;color:rgba(252,251,247,.8);font-size:16px;margin-top:22px}
.cover-bot{display:flex;justify-content:space-between;align-items:flex-end}
.cover-author{display:flex;flex-direction:column;gap:4px}
.cover-author b{font-family:'Fraunces',serif;font-size:22px;color:var(--gold)}
.cover-author span{font-size:13px;letter-spacing:.04em;color:rgba(252,251,247,.7)}

/* TOC */
.toc{list-style:none;counter-reset:t;padding:0;margin:8px 0 30px;columns:2;column-gap:40px}
.toc li{counter-increment:t;padding:11px 0;border-bottom:1px solid var(--ivory);break-inside:avoid;font-size:16px}
.toc li::before{content:counter(t,decimal-leading-zero);color:var(--gold);font-family:'Fraunces',serif;margin-right:14px;font-size:15px}
.plate-note{display:flex;gap:26px;align-items:center;background:var(--ivory);border-radius:14px;padding:22px 26px;margin-top:14px}
.plate-note h3{margin:0 0 6px;color:var(--burgundy);font-size:20px}
.plate-note p{margin:0 0 10px;color:var(--ink-soft);font-size:14px}

/* steps */
.steps-big{list-style:none;padding:0;margin:0 0 26px;display:grid;gap:14px}
.steps-big li{display:flex;align-items:center;gap:16px;background:var(--ivory);border-radius:12px;padding:14px 18px}
.steps-big .num{flex:0 0 36px;height:36px;border-radius:50%;background:var(--burgundy);color:var(--cream);display:flex;align-items:center;justify-content:center;font-family:'Fraunces',serif;font-size:18px}

/* callout */
.callout{border-left:4px solid var(--gold);background:var(--ivory);border-radius:0 12px 12px 0;padding:16px 22px;margin:8px 0}
.callout b{color:var(--burgundy);display:block;margin-bottom:4px}
.callout p{margin:0;color:var(--ink-soft);font-size:14px}
.callout.warn{border-left-color:var(--burgundy)}

/* philosophy / adapt */
.phil-grid,.adapt-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:18px}
.phil{background:var(--ivory);border-radius:12px;padding:18px 20px}
.phil h4{margin:0 0 6px;color:var(--burgundy);font-size:18px}
.phil p{margin:0;color:var(--ink-soft);font-size:14px}
.adapt{display:flex;flex-direction:column;gap:3px;padding:14px 18px;border:1px solid var(--ivory);border-radius:12px}
.adapt b{color:var(--burgundy)}
.adapt span{color:var(--ink-soft);font-size:14px}

/* tips */
.tips{margin:18px 0 24px;padding:0;list-style:none;display:grid;gap:10px}
.tips li{position:relative;padding:10px 14px 10px 34px;background:var(--ivory);border-radius:10px;font-size:14.5px}
.tips li::before{content:"";position:absolute;left:14px;top:18px;width:8px;height:8px;border-radius:50%;background:var(--gold)}
.water{display:flex;align-items:center;gap:16px;flex-wrap:wrap;margin-top:6px;background:var(--ink);color:var(--cream);border-radius:14px;padding:18px 24px}
.water b{font-family:'Fraunces',serif;color:var(--gold)}
.glasses{display:flex;gap:8px}
.glass{width:16px;height:22px;border:2px solid var(--gold);border-radius:3px 3px 6px 6px;display:inline-block}
.water-note{font-size:13px;opacity:.8}

/* shopping */
.shop-grid{columns:2;column-gap:32px;margin-top:8px}
.shop-cat{break-inside:avoid;margin-bottom:18px}
.shop-cat h4{margin:0 0 6px;color:var(--burgundy);font-size:16px;border-bottom:2px solid var(--gold);padding-bottom:4px;display:inline-block}
.shop-tbl{width:100%;border-collapse:collapse;font-size:13.5px}
.shop-tbl td{padding:4px 4px;border-bottom:1px solid var(--ivory);vertical-align:top}
.shop-tbl .ck{color:var(--gold);width:16px}
.shop-tbl .nm{width:auto}
.shop-tbl .qt{text-align:right;white-space:nowrap;color:var(--ink);font-weight:600}
.shop-tbl .pk{color:var(--ink-soft);font-size:11.5px;text-align:right;white-space:nowrap;padding-left:8px}

/* meal-prep */
.prep-list{display:grid;gap:10px;margin:6px 0 18px}
.prep-row{display:grid;grid-template-columns:1.1fr 1.4fr auto 1.1fr;align-items:center;gap:14px;background:var(--ivory);border-radius:10px;padding:12px 18px}
.prep-from,.prep-to{font-size:13px;color:var(--ink-soft)}
.prep-dish{font-family:'Fraunces',serif;color:var(--burgundy);font-size:16px}
.prep-arrow{color:var(--gold);font-size:20px;font-weight:700}

/* DAY */
.day{padding-top:18mm}
.day-head{display:grid;grid-template-columns:auto 1fr auto;gap:18px;align-items:center;border-bottom:2px solid var(--ivory);padding-bottom:16px;margin-bottom:14px}
.day-no{display:flex;flex-direction:column;line-height:1}
.day-no span{font-size:13px;letter-spacing:.16em;text-transform:uppercase;color:var(--gold)}
.day-no b{font-family:'Fraunces',serif;font-size:54px;color:var(--burgundy)}
.day-kcal{font-family:'Fraunces',serif;font-size:30px;color:var(--ink)}
.day-kcal span{font-size:16px;color:var(--ink-soft)}
.legend{display:flex;gap:14px;flex-wrap:wrap;margin-top:6px}
.leg{font-size:12.5px;color:var(--ink-soft);display:flex;align-items:center;gap:6px}
.dot{width:10px;height:10px;border-radius:50%;display:inline-block}
.day-batch{display:flex;align-items:center;gap:10px;background:var(--ink);color:var(--cream);border-radius:10px;padding:10px 16px;font-size:13.5px;margin-bottom:14px}
.day-batch .ic{color:var(--gold)}
.meals{display:grid;gap:12px}
.meal{border:1px solid var(--ivory);border-radius:12px;padding:14px 18px;break-inside:avoid}
.meal-top{display:flex;align-items:center;gap:10px;margin-bottom:4px}
.meal-type{background:var(--burgundy);color:var(--cream);font-size:11px;letter-spacing:.08em;text-transform:uppercase;padding:4px 11px;border-radius:30px}
.meal-time{display:flex;align-items:center;gap:5px;font-size:12.5px;color:var(--ink-soft)}
.meal-kcal{margin-left:auto;font-weight:600;color:var(--burgundy);font-size:13.5px}
.meal-title{font-size:19px;margin:2px 0 6px;color:var(--ink)}
.meal-ing{font-size:13px;color:var(--ink-soft);margin:0 0 8px}
.meal-steps{margin:0 0 10px;padding-left:20px;font-size:13.5px}
.meal-steps li{margin:3px 0}
.meal-aller{display:flex;gap:6px;flex-wrap:wrap}
.pill{display:inline-flex;align-items:center;gap:6px;font-size:11px;color:var(--ink-soft);background:var(--ivory);border-radius:30px;padding:3px 10px 3px 3px}
.pill-b{width:18px;height:18px;border-radius:50%;background:var(--gold);color:var(--ink);display:inline-flex;align-items:center;justify-content:center;font-weight:700;font-size:10px}
.pill-none{padding:3px 10px;color:#7a9a73;background:rgba(122,154,115,.12)}
.ic{width:15px;height:15px;display:inline-block;vertical-align:middle}

/* swaps / faq / journal */
.swap-tbl,.journal{width:100%;border-collapse:collapse;margin-top:10px;font-size:14px}
.swap-tbl th,.journal th{background:var(--burgundy);color:var(--cream);text-align:left;padding:10px 14px;font-family:'Fraunces',serif;font-weight:500;font-size:14px}
.swap-tbl td{padding:9px 14px;border-bottom:1px solid var(--ivory)}
.swap-tbl tr:nth-child(even) td{background:var(--ivory)}
.swap-tbl td:first-child{color:var(--ink);font-weight:600}
.faq{display:grid;gap:14px;margin-top:6px}
.faq-item{background:var(--ivory);border-radius:12px;padding:16px 20px;break-inside:avoid}
.faq-item h4{margin:0 0 4px;color:var(--burgundy);font-size:16px}
.faq-item p{margin:0;color:var(--ink-soft);font-size:14px}
.journal th{font-size:12px;padding:8px 10px}
.journal td{border:1px solid var(--ivory);height:34px;padding:6px 10px}
.journal .jd{font-family:'Fraunces',serif;color:var(--burgundy);text-align:center;font-weight:600}
.journal tr:nth-child(even) td{background:#fdfcf9}
.closing{margin-top:26px;background:var(--ink);color:var(--cream);border-radius:16px;padding:26px 30px;text-align:center}
.closing p{font-family:'Fraunces',serif;font-size:19px;line-height:1.5;margin:0 0 14px;color:var(--cream)}
.sign{display:block;color:var(--gold);font-family:'Fraunces',serif;font-size:18px}
.sign-site{display:block;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:rgba(252,251,247,.6);margin-top:6px}
`;

// ---------- salikšana ----------
const html = `<!DOCTYPE html>
<html lang="lv">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(meta.title)} ${esc(meta.subtitle)} — ${esc(meta.author)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Instrument+Sans:wght@400;500;600&display=swap" rel="stylesheet">
<style>${css}</style>
</head>
<body>
${cover()}
${toc()}
${howToUse()}
${about()}
${forWhom()}
${tips()}
${shopping()}
${mealprep()}
${days.map(dayPage).join("\n")}
${swapsPage()}
${faqPage()}
${journalPage()}
</body>
</html>`;

mkdirSync(join(__dir, "dist"), { recursive: true });
writeFileSync(join(__dir, "dist", "index.html"), html, "utf8");
console.log("OK -> dist/index.html  (" + (html.length / 1024).toFixed(0) + " KB, " + (document_pages()) + " lapas)");
function document_pages() { return 2 + 6 + days.length + 3; }


