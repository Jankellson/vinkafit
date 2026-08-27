// Ģenerators īsajiem ceļvežiem (lead magnetiem): <produkts>/data.mjs -> <produkts>/dist/index.html
//
//   node kopigais/build-celvedis.mjs 5-kludas
//
// Kāpēc atsevišķs no build.mjs: uztura plānam ir dienas, ēdienreizes, iepirkumu saraksts un
// aprēķins; ceļvedim nekā no tā nav. Kopīgais — zīmols un drukas modelis — nāk no
// pamata-stils.mjs, tāpēc abi izskatās pēc vienas sērijas, nedublējot izkārtojumu.
import { C, pamataStils, KONSULT_URL } from "./pamata-stils.mjs";
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const __dir = dirname(fileURLToPath(import.meta.url));

const folder = process.argv[2];
if (!folder) throw new Error("Norādi produkta mapi: node kopigais/build-celvedis.mjs 5-kludas");
const productDir = join(__dir, "..", folder);
const { meta, product, intro, kludas, riciba, parMani } =
  await import(pathToFileURL(join(productDir, "data.mjs")).href);

/* Fonti iegulti failā, ne no tīkla — sk. fonti.mjs komentāru par Comic Sans kļūdu. */
const fontiCss = readFileSync(join(__dir, "fonti.css"), "utf8");

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const IMG = "../../../ieva-astro/public/assets/images";

const callout = ([b, p], warn = false) =>
  `<div class="callout${warn ? " warn" : ""}"><b>${esc(b)}</b><p>${esc(p)}</p></div>`;

function cover() {
  return `<section class="page cover">
    <div class="cover-txt">
      <div class="cover-top">
        <span class="kicker">${esc(product.coverKicker)}</span>
        <span class="cover-time">${esc(product.readTime)}</span>
      </div>
      <h1>${esc(meta.title)}</h1>
      <p class="cover-sub">${esc(meta.subtitle)}</p>
      <p class="cover-tag">${esc(product.coverTag)}</p>
      <div class="cover-author">
        <b class="script">${esc(meta.author)}</b>
        <span>${esc(meta.authorRole)} · ${esc(meta.site)}</span>
      </div>
    </div>
    <img class="cover-foto" src="${IMG}/${product.cover}" alt="${esc(meta.author)}, ${esc(meta.authorRole)}">
  </section>`;
}

function introPage() {
  return `<section class="page sect">
    <h2 class="sect-h">${esc(intro.h)}</h2>
    ${intro.p.map((t, i) => `<p class="${i === 0 ? "lead" : ""}">${esc(t)}</p>`).join("")}
    ${callout(intro.callout, true)}
    <h3 class="mini-h">Piecas kļūdas šajā ceļvedī</h3>
    <ol class="saturs">${kludas.map(k => `<li><span class="sn">${k.n}</span>${esc(k.h)}</li>`).join("")}</ol>
  </section>`;
}

/* Katrai kļūdai viena loksne ar to pašu trīsdaļu ritmu: kā izskatās -> kāpēc nestrādā -> ko darīt.
   Vienāda struktūra ir apzināta: lasītājs pēc pirmās lapas zina, kur meklēt risinājumu. */
function kludasPage(k) {
  return `<section class="page sect kluda">
    <div class="kluda-head">
      <span class="kluda-n">${k.n}</span>
      <h2 class="sect-h">${esc(k.h)}</h2>
    </div>
    <h3 class="mini-h">Kā tas izskatās</h3>
    <p>${esc(k.izskatas)}</p>
    <h3 class="mini-h">Kāpēc tas nestrādā</h3>
    <p>${esc(k.nestrada)}</p>
    <h3 class="mini-h">Ko darīt vietā</h3>
    <ol class="soli">${k.dari.map(s => `<li>${esc(s)}</li>`).join("")}</ol>
    ${callout(k.callout)}
  </section>`;
}

function ricibaPage() {
  return `<section class="page sect">
    <h2 class="sect-h">${esc(riciba.h)}</h2>
    <p class="lead">${esc(riciba.lead)}</p>
    <ol class="steps-big">${riciba.soli.map(([t, d], i) =>
      `<li><span class="num">${i + 1}</span><span><b>${esc(t)}</b><br>${esc(d)}</span></li>`).join("")}</ol>
    ${callout(riciba.callout)}
  </section>`;
}

function parManiPage() {
  return `<section class="page sect">
    <h2 class="sect-h">${esc(parMani.h)}</h2>
    ${parMani.p.map((t, i) => `<p class="${i === 0 ? "lead" : ""}">${esc(t)}</p>`).join("")}
    <h3 class="mini-h">Ja gribi turpināt kopā</h3>
    <table class="cenas"><tbody>
      ${parMani.saites.map(([a, b]) => `<tr><td class="c-n">${esc(a)}</td><td class="c-c">${esc(b)}</td></tr>`).join("")}
    </tbody></table>
    <p class="sait">${esc(meta.site)}</p>
    <p class="atruna">${esc(parMani.atruna)}</p>
  </section>`;
}

function ctaPage() {
  return `<section class="page sect">
    <h2 class="sect-h">Vēlies personalizētu pieeju?</h2>
    <p class="lead">Šis ceļvedis parāda biežākās kļūdas. Ja gribi risinājumu savai konkrētajai
    situācijai — pieteicies sākuma konsultācijai.</p>
    <div class="cta-box">
      <p><b>Sākuma konsultācija</b> — stunda, kurā izrunājam tavu situāciju, ēšanas paradumus un mērķi. 49 €.</p>
      <a class="btn-cta" href="${KONSULT_URL}">Pieteikties konsultācijai →</a>
    </div>
  </section>`;
}

const css = `
${pamataStils}

/* ── VĀKS ────────────────────────────────────────────────
   Teksts uz tīra balta, foto apakšējā labajā stūrī. Uz gradienta virs fotogrāfijas
   teksts ir grūti salasāms — tas jau tika mēģināts uztura plānos un atmests. */
.cover{background:#fff;display:block;padding:0}
.cover-txt{position:absolute;top:0;left:0;width:100%;padding:22mm 18mm 0;z-index:1}
.cover-top{display:flex;align-items:center;gap:14px}
.cover .kicker{display:inline-block;border:1px solid rgba(132,24,62,.35);color:var(--burgundy);padding:5px 14px;font-size:10.5px;letter-spacing:.24em;text-transform:uppercase}
.cover-time{font-size:10.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--gold)}
.cover h1{font-size:46px;line-height:1.06;margin:14mm 0 0;color:var(--ink);max-width:15ch}
/* Playfair kursīvs, NE Alex Brush: rokraksta fonts lielā izmērā ir slikti salasāms
   un izskatās lēti. Alex Brush šajā dokumentā ir tikai parakstam. */
.cover-sub{font-family:'Playfair Display',serif;font-style:italic;font-weight:500;font-size:30px;color:var(--burgundy);margin:5mm 0 0}
.cover-tag{max-width:34ch;color:var(--ink-soft);font-size:15px;margin:8mm 0 0}
.cover-author{margin-top:12mm;padding-top:5mm;border-top:1px solid rgba(132,24,62,.24);max-width:34ch;display:flex;flex-direction:column;gap:3px}
.cover-author b{font-family:'Alex Brush',cursive;font-size:30px;color:var(--burgundy);font-weight:400}
.cover-author span{font-size:12px;letter-spacing:.06em;color:var(--ink-soft)}
.cover-foto{position:absolute;right:0;bottom:0;height:70%;object-fit:contain;object-position:bottom right;z-index:0}

/* ── KĻŪDAS LAPA ─────────────────────────────────────── */
.kluda-head{display:flex;align-items:flex-start;gap:14px}
.kluda-n{font-family:'Playfair Display',serif;font-size:64px;line-height:.9;color:var(--gold);flex:0 0 auto}
.kluda .sect-h{font-size:27px;margin-top:4px}
.kluda p{max-width:64ch;color:var(--ink-soft)}
.kluda .mini-h{font-size:16px;margin:20px 0 6px;letter-spacing:.02em}

.soli{counter-reset:s;list-style:none;padding:0;margin:8px 0 0}
.soli li{counter-increment:s;position:relative;padding:0 0 0 32px;margin:0 0 10px;color:var(--ink-soft);font-size:14.5px;break-inside:avoid}
.soli li::before{content:counter(s);position:absolute;left:0;top:1px;width:21px;height:21px;border-radius:50%;background:var(--burgundy);color:var(--cream);font-size:12px;display:flex;align-items:center;justify-content:center;font-family:'Plus Jakarta Sans',sans-serif}

/* ── SATURA SARAKSTS ─────────────────────────────────── */
.saturs{list-style:none;padding:0;margin:10px 0 0}
.saturs li{display:flex;align-items:baseline;gap:12px;padding:9px 0;border-bottom:1px solid var(--panel-line);font-size:15px;break-inside:avoid}
.saturs .sn{font-family:'Playfair Display',serif;color:var(--gold);font-size:20px;width:20px;flex:0 0 auto}

/* ── RĪCĪBAS LAPA ────────────────────────────────────── */
.steps-big{list-style:none;padding:0;margin:0}
.steps-big li{display:flex;gap:16px;align-items:flex-start;padding:14px 0;border-bottom:1px solid var(--panel-line);break-inside:avoid}
.steps-big .num{flex:0 0 auto;width:32px;height:32px;border-radius:50%;background:var(--burgundy);color:var(--cream);display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-size:16px}
.steps-big span:last-child{color:var(--ink-soft);font-size:14.5px}
.steps-big b{color:var(--ink);font-family:'Playfair Display',serif;font-size:16px}

/* ── PAR MANI ────────────────────────────────────────── */
.cenas{width:100%;border-collapse:collapse;margin-top:6px}
.cenas td{padding:11px 0;border-bottom:1px solid var(--panel-line);font-size:14.5px}
.cenas .c-n{font-family:'Playfair Display',serif;color:var(--burgundy);font-size:16px}
.cenas .c-c{text-align:right;color:var(--ink-soft)}
.sait{margin:18px 0 0;font-family:'Alex Brush',cursive;font-size:30px;color:var(--burgundy)}
.atruna{margin-top:26px;padding-top:12px;border-top:1px solid var(--panel-line);font-size:11.5px;line-height:1.5;color:var(--ink-soft)}
`;

const html = `<!DOCTYPE html>
<html lang="lv">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(meta.title)} — ${esc(meta.author)}</title>
<style>${fontiCss}</style>
<style>${css}</style>
</head>
<body>
${cover()}
${introPage()}
${kludas.map(kludasPage).join("\n")}
${ricibaPage()}
${parManiPage()}
${ctaPage()}
</body>
</html>`;

mkdirSync(join(productDir, "dist"), { recursive: true });
writeFileSync(join(productDir, "dist", "index.html"), html, "utf8");
/* Lapu skaits nāk no gatavā HTML, ne no roku saskaitītas summas — tā tas nevar novecot. */
const lapas = (html.match(/<section class="page/g) || []).length;
console.log(`OK -> ${folder}/dist/index.html  (${(html.length / 1024).toFixed(0)} KB, ${lapas} lapas)`);
