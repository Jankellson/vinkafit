// Ģenerators: <produkts>/data.mjs -> <produkts>/dist/index.html (drukai gatavs A4, Ievas zīmols)
//
// Viens dzinējs visiem PDF produktiem. Produkta mape padodas kā arguments:
//   node kopigais/build.mjs 10-dienu-plans
// Produktā mainās tikai `data.mjs` — saturs un `product` konfigurācija (vāks, nosaukumi).
// Dizains, aprēķins un fonti dzīvo šeit, vienā vietā, lai trīs produkti nesāktu atšķirties.
import { calcAll, shoppingFor, planAverage, N as NUTR } from "./uzturvertibas.mjs";
import { C, pamataStils, KONSULT_URL } from "./pamata-stils.mjs";
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const __dir = dirname(fileURLToPath(import.meta.url));

const folder = process.argv[2];
if (!folder) throw new Error("Norādi produkta mapi: node kopigais/build.mjs 10-dienu-plans");
const productDir = join(__dir, "..", folder);
const { meta, product, copy, allergens, swaps, days, catalog, pantry, sections, sectionOrder, dietSwaps } =
  await import(pathToFileURL(join(productDir, "data.mjs")).href);

/* Fonti iegulti failā, ne no tīkla — sk. fonti.mjs komentāru par Comic Sans kļūdu. */
const fontiCss = readFileSync(join(__dir, "fonti.css"), "utf8");

// ---------- palīgi ----------
const mealLabel = { brokastis: "Brokastis", otras: "Otrās brokastis", pusdienas: "Pusdienas", launags: "Launags", vakarinas: "Vakariņas" };

const coverVariant = ["a", "b", "c"].includes(process.env.COVER_VARIANT) ? process.env.COVER_VARIANT : "a";

/* Kalorijas, makro un iepirkumu saraksts nāk no receptēm, ne no roku rakstītiem skaitļiem. */
calcAll(days);
const shoppingByDay = shoppingFor(days);
const planAvg = planAverage(days);

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
    <text x="${cx}" y="${cy - 2}" text-anchor="middle" font-family="Playfair Display, serif" font-size="20" fill="${C.ink}" font-weight="600">${p + t + o ? "" : ""}</text>
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
    bars += `<text x="${(x + bwi / 2).toFixed(1)}" y="${(y - 7).toFixed(1)}" text-anchor="middle" font-size="12" fill="${C.inkSoft}" font-family="Plus Jakarta Sans, sans-serif">${d.kcal}</text>`;
    labels += `<text x="${(x + bwi / 2).toFixed(1)}" y="${h - pad + 18}" text-anchor="middle" font-size="12" fill="${C.inkSoft}" font-family="Plus Jakarta Sans, sans-serif">${d.n}.</text>`;
  });
  const avg = Math.round(days.reduce((s, d) => s + d.kcal, 0) / days.length);
  const ay = h - pad - (avg / max) * (h - pad * 2);
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="Kaloriju grafiks pa dienām">
    <line x1="${pad}" y1="${h - pad}" x2="${w - pad}" y2="${h - pad}" stroke="${C.ivory}" stroke-width="2"/>
    <line x1="${pad}" y1="${ay.toFixed(1)}" x2="${w - pad}" y2="${ay.toFixed(1)}" stroke="${C.gold}" stroke-width="1.5" stroke-dasharray="5 4"/>
    <text x="${w - pad}" y="${(ay - 6).toFixed(1)}" text-anchor="end" font-size="11" fill="${C.gold}" font-family="Plus Jakarta Sans, sans-serif">vidēji ${avg} kcal</text>
    ${bars}${labels}
  </svg>`;
}

/* Makro sadalījums pēc enerģijas, nevis pēc laukuma šķīvī.
   Krāsas tās pašas, ko dienu donutos: zelts = ogļhidrāti, burgunds = olbaltumvielas,
   mīkstā tinte = tauki. */
const MACRO_SPLIT = [
  [C.gold, planAvg.oPct, "Ogļhidrāti", planAvg.o],
  [C.burgundy, planAvg.pPct, "Olbaltumvielas", planAvg.p],
  [C.inkSoft, planAvg.tPct, "Tauki", planAvg.t],
];

/* Tauku piemēri nāk no tās pašas tabulas, ko receptes — lai nav otra skaitļu komplekta.
   [tabulas atslēga, grami, nosaukums tekstā, (mērs)] */
const KAROTE = [
  ["olīveļļa", 13.5, "olīveļļa"], ["zemesriekstu sviests", 16, "zemesriekstu sviests"],
  ["ķirbju sēklas", 10, "ķirbju sēklas"], ["mandeles", 9, "mandeles (veselas)"],
];
const PORCIJA = [
  ["olīveļļa", 5, "olīveļļas", "tējkarote"],
  ["saulespuķu sēklas", 7, "saulespuķu sēklu", "ēdamkarote bez kaudzes"],
  ["avokado", 30, "avokado", "ceturtdaļa augļa"],
];
const kcal = (key, g) => { const [p, t, o] = NUTR[key]; return Math.round((p * 4 + t * 9 + o * 4) * g / 100); };
const tauki = (key, g) => Math.round(NUTR[key][1] * g / 100 * 10) / 10;
const lv = n => String(n).replace(".", ",");

function macroRing() {
  const size = 170, r = size / 2 - 15, cx = size / 2, cy = size / 2, circ = 2 * Math.PI * r;
  let off = 0, arcs = "";
  for (const [col, pct] of MACRO_SPLIT) {
    const len = (pct / 100) * circ;
    arcs += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${col}" stroke-width="18" stroke-dasharray="${len.toFixed(2)} ${(circ - len).toFixed(2)}" stroke-dashoffset="${(-off).toFixed(2)}" transform="rotate(-90 ${cx} ${cy})"/>`;
    off += len;
  }
  return `<svg class="macro-ring" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="Makro sadalījums dienā">
    ${arcs}
    <text x="${cx}" y="${cy - 3}" text-anchor="middle" font-family="Playfair Display, serif" font-size="26" fill="${C.ink}" font-weight="600">${planAvg.kcal}</text>
    <text x="${cx}" y="${cy + 15}" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="11" fill="${C.inkSoft}">kcal dienā</text>
  </svg>`;
}

function allergenPills(codes) {
  if (!codes || !codes.length) return `<span class="pill pill-none">Bez galvenajiem alergēniem</span>`;
  return codes.map(c => allergens[c] ? `<span class="pill"><span class="pill-b">${allergens[c][0]}</span>${allergens[c]}</span>` : "").join("");
}

const clock = `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`;

// ---------- iepirkumu agregācija ----------
/* Saskaita produktus norādītajām dienām; filtrs izšķir pamatkrājumu no svaigā. */
function tally(dayNumbers, keep) {
  const grams = {}, pieces = {};
  for (const n of dayNumbers) {
    for (const [name, val] of Object.entries(shoppingByDay[n] || {})) {
      if (!keep(name)) continue;
      if (Array.isArray(val)) pieces[name] = (pieces[name] || 0) + val[0];
      else grams[name] = (grams[name] || 0) + val;
    }
  }
  const secs = {};
  const add = (name, qtyText) => {
    const cat = catalog[name] ? catalog[name][0] : "Eļļas, garšvielas, citi";
    const pkg = catalog[name] ? catalog[name][1] : "";
    (secs[sections[cat] || "Bakaleja"] ||= []).push({ name, qtyText, pkg });
  };
  for (const [name, g] of Object.entries(grams)) add(name, g >= 1000 ? (g / 1000).toFixed(1).replace(".", ",") + " kg" : g + " g");
  for (const [name, n] of Object.entries(pieces)) add(name, n + " gab");
  return sectionOrder.filter(s => secs[s]).map(s => ({ cat: s, items: secs[s].sort((a, b) => a.name.localeCompare(b.name, "lv")) }));
}

const DAYS_1 = [1, 2, 3, 4, 5], DAYS_2 = [6, 7, 8, 9, 10];
const isPantry = n => pantry.has(n);
const isFresh = n => !pantry.has(n);

function shopBlock(groups) {
  return `<div class="shop-grid">
    ${groups.map(g => `<div class="shop-cat">
      <h4>${esc(g.cat)}</h4>
      <table class="shop-tbl"><tbody>
        ${g.items.map(it => `<tr><td class="ck"></td><td class="nm">${esc(it.name)}</td><td class="qt">${esc(it.qtyText)}</td><td class="pk">${esc(it.pkg)}</td></tr>`).join("")}
      </tbody></table>
    </div>`).join("")}
  </div>`;
}

/* Meal-prep pāri nāk no data.mjs: tie ir produkta saturs, ne dizains. */
const prepPairs = product.prepPairs;

// ---------- HTML sekcijas ----------
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* Attēli dzīvo mājaslapas projektā — nedublējam, atsaucamies relatīvi no dist/. */
const IMG = "../../../ieva-astro/public/assets/images";

function cover() {
  return `<section class="page cover cover-${coverVariant}">
    <img class="cover-bg" src="${IMG}/produktu-vaki/${product.cover}" alt="">
    <div class="cover-frame">
      <span class="kicker">${esc(product.coverKicker)}</span>
      <h1>${product.coverTitle}</h1>
      <div class="cover-days"><span>${days.length}</span> dienām</div>
      <p class="cover-tag">${esc(product.coverTag)}</p>
      <div class="cover-author"><b class="script">${esc(meta.author)}</b><span>${esc(meta.authorRole)} · ${esc(meta.site)}</span></div>
    </div>
  </section>`;
}

function toc() {
  const items = [
    "Kā sadalās diena", "Kā lietot šo plānu", "Mana pieeja", "Kam šis plāns domāts", "Kā pielāgot sev",
    "Vispārīgie ieteikumi",
    "1. iepirkums — pamatprodukti", "1. iepirkums — svaigie produkti 1.–5. dienai", "2. iepirkums — svaigie produkti 6.–10. dienai",
    "Pagatavo vienreiz, ēd divreiz",
    `${days.length} dienu ēdienreižu plāns`, "Ja kaut kas negaršo — ar ko aizstāt", "Aizstāšana — graudi, dārzeņi, augļi", "Ja jāatsakās no produktu grupas", "Biežākie jautājumi", "Pašsajūtas dienasgrāmata", "Vēlies personalizētu plānu?",
  ];
  return `<section class="page sect">
    <h2 class="sect-h">Saturs</h2>
    <p class="lead">Plāns ir sadalīts trijās daļās: vispirms kā to lietot, tad divi iepirkumi,
    tad desmit dienas ar receptēm. Beigās — aizstāšanas tabulas un pašsajūtas dienasgrāmata.</p>
    <ol class="toc toc-2">${items.map(i => `<li>${i}</li>`).join("")}</ol>
  </section>`;
}

/* Makro riņķis un tauku bloks bija uzlikti virsū saturam — tagad tiem ir sava lapa. */
function principlesPage() {
  return `<section class="page sect">
    <h2 class="sect-h">Kā sadalās diena</h2>
    <div class="plate-note">
      ${macroRing()}
      <div>
        <h3>Enerģija, ne laukums šķīvī</h3>
        <p>Aptuveni puse enerģijas nāk no ogļhidrātiem, nedaudz vairāk par ceturtdaļu —
        no olbaltumvielām, atlikums — no taukiem. Šī nav diagramma par to, cik daudz vietas
        produkts aizņem šķīvī, bet par to, cik kaloriju tas dod.</p>
        <div class="legend">
          ${MACRO_SPLIT.map(([col, pct, name, g]) => `<span class="leg"><span class="dot" style="background:${col}"></span>${name} ${pct} % · <b>${g} g</b></span>`).join("")}
        </div>
        <p class="plate-fine">Ogļhidrātus ņem no dārzeņiem un pilngraudiem — dārzeņu vajag
        apmēram divreiz vairāk nekā graudu. Taukus neizmet: bez tiem neuzsūcas A, D, E un
        K vitamīni. Ogļhidrātos ieskaitītas arī šķiedrvielas, tāpēc gramus vari pareizināt
        pats — 4 kcal olbaltumvielām, 9 taukiem, 4 ogļhidrātiem — un iznāks tas pats skaitlis,
        kas rakstīts pie katras ēdienreizes.</p>
      </div>
    </div>

    <div class="callout warn">
      <b>Riekstus un eļļu sver, ne liec pēc acumēra</b>
      <p>${planAvg.t} g tauku dienā nav daudz: 30 g mandeļu vien aizņem gandrīz pusi. Rieksti, sēklas,
      eļļa un avokado ir kalorijām visblīvākie produkti uz šķīvja, tāpēc tos sver. Sauja nav
      mērvienība — vienam tā ir 20 g, otram 50 g.</p>
      <p>Ja svaru nelieto, mēri ar <b>nolīdzinātu ēdamkaroti</b> — kaudzē uzlikta karote ir
      apmēram divreiz vairāk. Nolīdzinātā ēdamkarotē ir:</p>
      <ul class="fat-list">
        ${KAROTE.map(([key, g, nos]) => `<li><b>${nos} — ${lv(g)} g</b><br>${lv(tauki(key, g))} g tauku, ${kcal(key, g)} kcal</li>`).join("")}
      </ul>
      <p class="fat-note">Šajā plānā tauku porcijas ir mazas ar nolūku:
      ${PORCIJA.map(([key, g, nos, mers]) => `<b>${g} g ${nos}</b> ir ${mers} (${kcal(key, g)} kcal)`).join(" · ")}.
      Tieši tāpēc tos ir vērts nosvērt: kļūda par vienu karoti šeit ir kļūda par desmito daļu
      dienas tauku.</p>
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
    <h2 class="sect-h">Mana pieeja</h2>
    <p class="lead">${esc(copy.aboutLead)}</p>
    <div class="phil-grid">${copy.philosophy.map(([t, d]) => `<div class="phil"><h4>${esc(t)}</h4><p>${esc(d)}</p></div>`).join("")}</div>

    <h3 class="mini-h">Kāpēc aizliegumi nestrādā</h3>
    <p>Aizliegums nostrādā labākajā gadījumā mēnesi. Pēc tam cilvēks „norauj”, atgriežas pie
    vecajiem ieradumiem un jūtas vainīgs — un vainas sajūta pie galda neko labu nedod.
    Tāpēc šajā plānā nav neviena aizliegta produkta. Ja tev no rīta gribas cīsiņus, meklējam
    kvalitatīvākus, ieliekam brokastīs un sabalansējam pārējo dienu. Ja gribas saldējumu,
    atrodam tam vietu. Tā ir vienīgā pieeja, kas turas ilgāk par mēnesi.</p>

    <h3 class="mini-h">Kāpēc sīkumi izšķir</h3>
    <p>Bieži dzirdu: „Es taču ēdu salātus, kāpēc nekas nemainās?” Tad izrādās, ka salātiem
    pievienotas sešas ēdamkarotes eļļas — tie ir ap 700 kcal, ko neviens neieskaita.
    Trīsdesmit gramos riekstu ir ap 175 kcal, bet visā 200 g pakā — virs tūkstoša.
    Tieši tāpēc pirmajās dienās ir vērts svērt un skaitīt: ne tāpēc, lai to darītu mūžīgi,
    bet lai tu ieraudzītu, kur patiesībā aiziet kalorijas. Sver visu, ko ēd — gaļu, zivi,
    graudaugus, sieru, krējumu, sviestu, eļļu, riekstus, sēklas. No acs vari likt tikai
    lapu salātus un zaļumus.</p>

    <p>Un vēl viens godīgs brīdinājums: ar ātru rezultātu mēs nestrādājam. Šīs desmit dienas
    nav mērķis, bet sākums — vieta, kur redzēt, kā izskatās sabalansēta diena, un saprast,
    ka normāla ēšana nav ne sarežģīta, ne garlaicīga.</p>

    <figure class="about-photo">
      <img src="${IMG}/${product.aboutPhoto[0]}" alt="${esc(product.aboutPhoto[1])}">
    </figure>
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

/* Trīs lapas, DIVI iepirkumi. Pirmajā reizē pērc 1. un 2. lapu kopā.
   Sadalījums pa lapām, nevis viens garš saraksts, jo 97 preces ar
   ķeksīšiem vienā blāķī izskatās pēc darba, ne pēc plāna. */
function shopStep(n, kicker, title, lead, band, bandNote, fresh, groups, tail = "") {
  return `<section class="page sect">
    <div class="shop-step">${esc(kicker)}</div>
    <h2 class="sect-h">${esc(title)}</h2>
    <p class="lead">${lead}</p>
    <div class="shop-block${fresh ? "" : " shop-pantry"}">
      <div class="shop-band${fresh ? " shop-band--fresh" : ""}">
        <b>${esc(band)}</b><span>${esc(bandNote)}</span>
      </div>
      ${shopBlock(groups)}
    </div>
    ${tail}
  </section>`;
}

function shoppingPantry() {
  return shopStep(1,
    "1. iepirkums · 1. no 2 lapām",
    `Pamatprodukti visām ${days.length} dienām`,
    `<b>Divi iepirkumi</b>, ne viens milzīgs. Pirmajā reizē pērc no šī saraksta un nākamā.
     Pamatprodukti uzglabājas ilgi, tāpēc otrreiz tos pirkt nevajadzēs.`,
    "Pērc vienreiz", "Sausā bakaleja, olas un ilgi stāvoši dārzeņi", false,
    tally([...DAYS_1, ...DAYS_2], isPantry));
}

function shoppingFresh1() {
  return shopStep(2,
    "1. iepirkums · 2. no 2 lapām",
    "Svaigie produkti 1.–5. dienai",
    `Tā pati iepirkuma otrā daļa. Šie produkti ātrāk bojājas, tāpēc te ir tikai pirmās
     piecas dienas — pārējo nopirksi pēc piecām dienām.`,
    "Svaigie produkti", "Gaļa, zivs, piena produkti, zaļumi", true,
    tally(DAYS_1, isFresh),
    `<div class="callout">
      <b>Ja tomēr negribi iet divreiz</b>
      <p>Nopērc visu uzreiz, bet gaļu un zivi 6.–10. dienai tūlīt ieliec saldētavā.
      Zaļumus uzglabā glāzē ar ūdeni ledusskapī — tā tie iztur ilgāk.</p>
    </div>`);
}

function shoppingFresh2() {
  return shopStep(3,
    "2. iepirkums · pēc 5. dienas",
    "Svaigie produkti 6.–10. dienai",
    `Šis iepirkums ir mazs. Pamatprodukti jau ir mājās — jāpapildina tikai svaigie produkti.
     Pirms ej, ieskaties ledusskapī: daļa no pirmās reizes, visticamāk, vēl ir palikusi.`,
    "Svaigie produkti", "Gaļa, zivs, piena produkti, zaļumi", true,
    tally(DAYS_2, isFresh));
}

function mealprep() {
  return `<section class="page sect">
    <h2 class="sect-h">Pagatavo vienreiz, ēd divreiz</h2>
    <p class="lead">${esc(product.mealprepLead)}</p>
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
        <p class="meal-ing">${esc(m.ing)}${m.serve ? ` <span class="serve">Vienai porcijai virsū: ${esc(m.serve)}</span>` : ""}</p>
        <ol class="meal-steps">${m.steps.map(s => `<li>${esc(s)}</li>`).join("")}</ol>
        <div class="meal-aller">${allergenPills(m.a)}</div>
      </article>`).join("")}
      <article class="meal meal-today">
        <div class="meal-top"><span class="meal-type">Šodien</span></div>
        <h3 class="meal-title">Ūdens un pašsajūta</h3>
        <p class="today-lbl">Ūdens — atzīmē katru glāzi (mērķis 8, vismaz 2 l)</p>
        <div class="glasses">${Array.from({ length: 8 }, () => `<span class="glass"></span>`).join("")}</div>
        <p class="today-lbl">Piezīmes — kā jutos, kas izdevās, kas bija grūti</p>
        <div class="note-lines"><i></i><i></i><i></i><i></i><i></i></div>
      </article>
    </div>
  </section>`;
}

function swapGrid(list) {
  return `<div class="swap-grid">
    ${list.map(([cat, rows]) => `<div class="swap-cat">
      <h4>${esc(cat)}</h4>
      <table class="swap-tbl"><tbody>
        ${rows.map(([a, b, note]) => `<tr>
          <td class="sw-a">${esc(a)}</td>
          <td class="sw-b">${esc(b)}</td>
        </tr><tr><td colspan="2" class="sw-note">${esc(note)}</td></tr>`).join("")}
      </tbody></table>
    </div>`).join("")}
  </div>`;
}

function swapsPage1() {
  return `<section class="page sect">
    <h2 class="sect-h">Ja kaut kas negaršo — ar ko aizstāt</h2>
    <p class="lead">Nepatīk kāds produkts, tā nav veikalā vai tu to vienkārši nepanes? Nomaini.
    Plānā svarīgs ir princips — olbaltumvielas, dārzeņi un pilngraudu ogļhidrāti šķīvī —, nevis
    konkrēta sastāvdaļa. Zem katra pāra ir īsa piezīme: tā pasaka, kas maiņā jāņem vērā, lai
    maltīte paliktu tikpat sātīga un garšīga.</p>
    ${swapGrid(swaps.slice(0, 3))}
  </section>`;
}

function swapsPage2() {
  return `<section class="page sect">
    <h2 class="sect-h">Aizstāšana — graudi, dārzeņi, augļi, tauki</h2>
    <p class="lead">Turpinājums — graudi un ogļhidrāti, dārzeņi, augļi un tauki. Šeit maiņas ir
    visvieglākās: dārzeņus un augļus var mainīt gandrīz brīvi, ja vien saglabā apmēram to pašu
    daudzumu šķīvī.</p>
    ${swapGrid(swaps.slice(3))}
  </section>`;
}

function dietSwapsPage() {
  return `<section class="page sect">
    <h2 class="sect-h">Ja jāatsakās no visas produktu grupas</h2>
    <p class="lead">Dažreiz runa nav par vienu produktu, bet par veselu grupu — piena produktiem,
    glutēnu vai gaļu. Iemesls var būt alerģija, nepanesība vai apzināta izvēle. Arī tad plānu nav
    jāmet malā: mainās sastāvdaļas, nemainās princips.</p>

    <div class="diet-grid">
      ${dietSwaps.map(([t, d]) => `<div class="diet-card"><h4>${esc(t)}</h4><p>${esc(d)}</p></div>`).join("")}
    </div>

    <h3 class="mini-h">Viens noteikums, kas attiecas uz visiem trim</h3>
    <p>Ja kaut ko izņem, ieliec vietā kaut ko <b>ar to pašu lomu</b>, nevis vienkārši samazini
    porciju. Ja no pusdienām pazūd vistas fileja un vietā nenāk nekas, maltīte kļūst par
    piedevu — tā vairs nesātina, un pēc divām stundām tu meklē uzkodu. Tieši tāpēc lielākā daļa
    izslēgšanas mēģinājumu izgāžas: cilvēks izņem, bet neaizvieto.</p>

    <p>Praktiskākais veids ir skatīties uz olbaltumvielām. Tās sātina visilgāk un tieši tās
    parasti pazūd, kad no ēdienkartes izņem gaļu vai piena produktus. Ja saglabā olbaltumvielu
    daudzumu, pārējais parasti sakārtojas pats.</p>

    <div class="callout">
      <b>Ilgākā laikā</b>
      <p>Ja vesela produktu grupa no uztura izslēgta ilgstoši, ir vērts pārbaudīt asinsanalīzes —
      īpaši B12, dzelzi un D vitamīnu. Šis plāns ir vispārīgs; individuālus ieteikumus var dot
      tikai pēc konkrētas situācijas izvērtēšanas.</p>
    </div>
  </section>`;
}

function faqPage() {
  return `<section class="page sect">
    <h2 class="sect-h">Biežākie jautājumi</h2>
    <div class="faq">${copy.faq.map(([q, a]) => `<div class="faq-item"><h4>${esc(q)}</h4><p>${esc(a)}</p></div>`).join("")}</div>
  </section>`;
}

/* Ainavas orientācija ar nolūku: piezīmju ailei vajag platumu, lai tajā tiešām var rakstīt. */
function journalPage() {
  const rows = Array.from({ length: 10 }, (_, i) => `<tr>
    <td class="jd">${i + 1}.</td>
    <td class="jw">${Array.from({ length: 8 }, () => `<span class="glass glass-sm"></span>`).join("")}</td>
    <td></td><td class="js"></td><td class="js"></td><td></td>
  </tr>`).join("");
  return `<section class="page sect page-land">
    <h2 class="sect-h">Pašsajūtas dienasgrāmata</h2>
    <p class="lead">Katru vakaru atzīmē, kā jūties. Ne svars, bet pašsajūta rāda, vai esi uz pareizā ceļa.
    Ūdens ailē nokrāso katru izdzerto glāzi; enerģiju un izsalkumu vērtē no 1 līdz 5.</p>
    <table class="journal">
      <thead><tr><th>Diena</th><th>Ūdens — 8 glāzes</th><th>Miegs (h)</th><th>Enerģija 1–5</th><th>Izsalkums 1–5</th><th>Piezīmes</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </section>`;
}

function ctaPage() {
  return `<section class="page sect">
    <h2 class="sect-h">Vēlies personalizētu plānu?</h2>
    <p class="lead">Šis plāns ir sākumpunkts. Ja gribi individuālu pieeju — savām vēlmēm, veselības
    situācijai un mērķim — pieteicies sākuma konsultācijai.</p>
    <div class="cta-box">
      <p><b>Sākuma konsultācija</b> — stunda, kurā izrunājam tavu situāciju, ēšanas paradumus un mērķi. 49 €.</p>
      <a class="btn-cta" href="${KONSULT_URL}">Pieteikties konsultācijai →</a>
    </div>
  </section>`;
}

// ---------- CSS ----------
const css = `
${pamataStils}

/* Neko nepārgriež pušu — plānam specifiskie bloki. */
.meal,.faq-item,.shop-cat,.phil,.adapt,.plate-note,.water,
.steps-big li,.tips li,.toc li,.day-head,.day-batch{break-inside:avoid}
/* Dienas galviņa turas kopā ar pirmo ēdienreizi. */
.day-head,.day-batch{break-after:avoid}
@media screen{
  /* Drukā šī loksne ir ainavā (sk. @page land zemāk). Ekrānā tā rādījās portretā, tāpēc
     priekšskatījums meloja par to, kā lapa izskatīsies gatavajā PDF. */
  .page-land{width:297mm;padding:14mm 16mm}
}

/* COVER */
.cover{background:var(--ink);color:var(--cream);padding:0}
.cover-frame{position:absolute;inset:14mm;border:1px solid rgba(235,192,126,.45);padding:18mm 14mm;display:flex;flex-direction:column;justify-content:space-between}
.cover-top{display:flex;justify-content:space-between;align-items:center;font-size:13px;letter-spacing:.22em;text-transform:uppercase;color:var(--gold)}
.kicker{border:1px solid rgba(235,192,126,.5);padding:6px 14px;border-radius:30px}
.cover-author-top{opacity:.75}
.cover-mid h1{font-size:52px;line-height:1.05;margin:0;color:var(--cream)}
.cover-days{font-family:'Playfair Display',serif;font-size:30px;color:var(--gold);margin:14px 0 0;display:flex;align-items:baseline;gap:12px}
.cover-days span{font-size:96px;line-height:.9;color:var(--cream)}
.cover-tag{max-width:46ch;color:rgba(252,251,247,.8);font-size:16px;margin-top:22px}
.cover-bot{display:flex;justify-content:space-between;align-items:flex-end}
.cover-author{display:flex;flex-direction:column;gap:4px}
.cover-author b{font-family:'Playfair Display',serif;font-size:22px;color:var(--gold)}
.cover-author span{font-size:13px;letter-spacing:.04em;color:rgba(252,251,247,.7)}

/* TOC */
.toc{list-style:none;counter-reset:t;padding:0;margin:8px 0 30px;columns:2;column-gap:40px}
.toc li{counter-increment:t;padding:11px 0;border-bottom:1px solid var(--ivory);break-inside:avoid;font-size:16px}
.toc li::before{content:counter(t,decimal-leading-zero);color:var(--gold);font-family:'Playfair Display',serif;margin-right:14px;font-size:15px}
.plate-note{border:1px solid var(--panel-line);display:flex;gap:26px;align-items:center;background:var(--panel);border-radius:14px;padding:22px 26px;margin-top:14px}
.plate-note h3{margin:0 0 6px;color:var(--burgundy);font-size:20px}
.plate-note p{margin:0 0 10px;color:var(--ink-soft);font-size:14px}
/* --- vāks: foto ar baltām maliņām, teksts foto tukšajā augšdaļā --- */
/* Teksts uz TĪRA BALTA, foto zem tā — uz foto gradienta teksts bija grūti salasāms.
   Baltas maliņas ap foto no trim malām. */
.cover{background:#fff;padding:0}
.cover-bg{position:absolute;left:13mm;bottom:13mm;width:calc(100% - 26mm);height:52%;object-fit:cover;object-position:center 78%;z-index:0;border-radius:2px}
.cover .cover-frame{position:absolute;top:0;left:0;width:100%;height:48%;inset:auto;border:none;padding:20mm 15mm 0;display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-start;z-index:1}
.cover .kicker{border:1px solid rgba(132,24,62,.35);color:var(--burgundy);padding:5px 14px;font-size:10.5px;letter-spacing:.24em;text-transform:uppercase;font-family:'Plus Jakarta Sans',sans-serif}
.cover h1{font-family:'Playfair Display',serif;font-style:italic;font-weight:500;font-size:54px;line-height:1.02;letter-spacing:-.015em;margin:8mm 0 0;color:var(--plum,#3c1220)}
.cover-days{margin:5mm 0 0;align-items:baseline}
.cover-days span{font-size:88px;line-height:.86}
.cover-tag{max-width:44ch;font-size:13.5px;margin-top:5mm}
.cover .cover-author{margin-top:5mm;display:flex;flex-direction:column;gap:0}
/* Rokraksts tikai parakstam — tieši kā mājaslapas .guide-sig, ne visam virsrakstam. */
.script{font-family:'Alex Brush',cursive;color:var(--burgundy);line-height:1}
.cover .cover-author b.script{font-family:'Alex Brush',cursive;font-size:44px;font-weight:400;color:var(--burgundy)}
.cover .cover-author span{font-size:11.5px;letter-spacing:.06em;margin-top:1mm}

.cover-days,.cover-days span,.cover-author b{color:var(--burgundy)}
.cover-tag,.cover-author span{color:var(--ink-soft)}

/* VĀKU VARIANTI — viens saturs, trīs atšķirīgas redakcionālas kompozīcijas salīdzināšanai. */
.cover.cover-a .cover-bg{left:0;bottom:0;width:100%;height:58%;object-position:center 76%;border-radius:0}
.cover.cover-a .cover-frame{height:54%;padding:18mm 15mm 0;background:linear-gradient(180deg,#fff 82%,rgba(255,255,255,.86) 100%)}
.cover.cover-a h1{font-size:50px;max-width:128mm}
.cover.cover-a .cover-author{margin-top:4mm;padding-top:4mm;border-top:1px solid rgba(132,24,62,.24);width:100%}

.cover.cover-b .cover-bg{left:0;bottom:0;width:100%;height:100%;object-position:center 76%;border-radius:0}
.cover.cover-b .cover-frame{top:14mm;left:14mm;width:calc(100% - 28mm);height:52%;padding:15mm 14mm;background:linear-gradient(135deg,rgba(252,251,247,.96),rgba(252,251,247,.78));border:1px solid rgba(132,24,62,.25);justify-content:flex-start}
.cover.cover-b h1{font-size:50px;max-width:124mm}
.cover.cover-b .cover-author{margin-top:5mm;padding-top:4mm;border-top:1px solid rgba(132,24,62,.24);width:100%}

.cover.cover-c{background:var(--plum,#3c1220)}
.cover.cover-c .cover-bg{left:auto;right:0;bottom:0;width:67%;height:100%;object-position:center 76%;border-radius:0}
.cover.cover-c .cover-frame{top:0;left:0;width:46%;height:100%;padding:20mm 11mm 16mm;background:linear-gradient(90deg,#3c1220 88%,rgba(60,18,32,.92));justify-content:flex-start}
.cover.cover-c .kicker{border-color:rgba(235,192,126,.55);color:var(--gold)}
.cover.cover-c h1{font-size:45px;line-height:1.04;color:var(--cream);margin-top:10mm}
.cover.cover-c .cover-days{margin-top:8mm;color:var(--gold)}
.cover.cover-c .cover-days span{font-size:98px;color:var(--gold)}
.cover.cover-c .cover-tag{font-size:12.5px;line-height:1.5;color:rgba(252,251,247,.82);margin-top:7mm}
.cover.cover-c .cover-author{margin-top:auto;padding-top:5mm;border-top:1px solid rgba(235,192,126,.45);width:100%}
.cover.cover-c .cover-author b.script{font-size:38px;color:var(--gold)}
.cover.cover-c .cover-author span{font-size:10.5px;color:rgba(252,251,247,.75)}

/* Attēls ar parakstu, ne dekorācija: paraksts pasaka, ko tieši tas parāda. */
.about-photo{margin:12px 0 0;break-inside:avoid}
.about-photo img{width:100%;height:96px;object-fit:cover;object-position:center 60%;border-radius:12px;display:block}

/* --- satura lapa: divas kolonnas, viena vienība --- */
/* Režģis ar fiksētu rindu skaitu, ne CSS daudzkolonnas — tās sadala neparedzami. */
.toc-2{display:grid;grid-auto-flow:column;grid-template-rows:repeat(8,auto);column-gap:34px}
.toc-2 li{break-inside:avoid}

/* --- dienas sestā šūna: ūdens un piezīmes --- */
/* Balts kā pārējās kartes, atšķiras ar zelta maliņu — tā tas nav smilšains plankums. */
.meal-today{background:#fff;border:1px solid var(--gold);display:flex;flex-direction:column}
.today-lbl{margin:9px 0 5px;font-size:11px;letter-spacing:.02em;color:var(--ink-soft)}
.meal-today .glasses{display:flex;gap:7px;flex-wrap:wrap}
.note-lines{display:flex;flex-direction:column;gap:15px;margin-top:6px;flex:1;justify-content:flex-start}
.note-lines i{display:block;border-bottom:1px solid rgba(90,58,64,.28)}

/* --- pašsajūtas dienasgrāmata: ainavas lapa, lai piezīmēm ir vieta --- */
@page land{size:A4 landscape;margin:14mm 16mm}
.page-land{page:land}
.journal .jw{white-space:nowrap}
.glass-sm{width:12px;height:15px;border-radius:0 0 4px 4px}
/* Piezīmēm dodam visvairāk vietas — tā ir vienīgā aile, kurā tiešām jāraksta. */
.page-land .journal{table-layout:fixed}
.page-land .journal th:nth-child(1),.page-land .journal td:nth-child(1){width:7%}
.page-land .journal th:nth-child(2),.page-land .journal td:nth-child(2){width:19%}
.page-land .journal th:nth-child(3),.page-land .journal td:nth-child(3){width:9%}
.page-land .journal th:nth-child(4),.page-land .journal td:nth-child(4){width:10%}
.page-land .journal th:nth-child(5),.page-land .journal td:nth-child(5){width:11%}
.page-land .journal th:nth-child(6),.page-land .journal td:nth-child(6){width:44%}
.page-land .journal td{height:46px}

.macro-ring{flex:0 0 170px}
.plate-note .legend{margin:12px 0 12px}
.plate-note .leg{font-size:12.5px}
.plate-fine{font-size:12.5px;line-height:1.5;color:var(--ink-soft);margin:0}
.fat-list{margin:10px 0 0;padding:0;list-style:none;display:grid;grid-template-columns:1fr 1fr;gap:5px 20px}
.fat-list li{font-size:13px;line-height:1.45;color:var(--ink-soft);padding-left:12px;position:relative}
.fat-list b{color:var(--burgundy)}
.fat-list li::before{content:"";position:absolute;left:0;top:7px;width:5px;height:5px;border-radius:50%;background:var(--burgundy)}
.fat-note{font-size:12.5px;line-height:1.55;color:var(--ink-soft);margin:12px 0 0}

/* steps */
.steps-big{list-style:none;padding:0;margin:0 0 26px;display:grid;gap:14px}
.steps-big li{border:1px solid var(--panel-line);display:flex;align-items:center;gap:16px;background:var(--panel);border-radius:12px;padding:14px 18px}
.steps-big .num{flex:0 0 36px;height:36px;border-radius:50%;background:var(--burgundy);color:var(--cream);display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-size:18px}

/* callout */

/* philosophy / adapt */
.phil-grid,.adapt-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:18px}
.phil{border:1px solid var(--panel-line);background:var(--panel);border-radius:12px;padding:18px 20px}
.phil h4{margin:0 0 6px;color:var(--burgundy);font-size:18px}
.phil p{margin:0;color:var(--ink-soft);font-size:14px}
.adapt{display:flex;flex-direction:column;gap:3px;padding:14px 18px;border:1px solid var(--ivory);border-radius:12px}
.adapt b{color:var(--burgundy)}
.adapt span{color:var(--ink-soft);font-size:14px}

/* tips */
.tips{margin:18px 0 24px;padding:0;list-style:none;display:grid;gap:10px}
.tips li{border:1px solid var(--panel-line);position:relative;padding:10px 14px 10px 34px;background:var(--panel);border-radius:10px;font-size:14.5px}
.tips li::before{content:"";position:absolute;left:14px;top:18px;width:8px;height:8px;border-radius:50%;background:var(--gold)}
.water{display:flex;align-items:center;gap:16px;flex-wrap:wrap;margin-top:6px;background:var(--panel);color:var(--ink);border-left:3px solid var(--gold);border-radius:0 12px 12px 0;padding:14px 22px}
.water b{font-family:'Playfair Display',serif;color:var(--burgundy)}
.glasses{display:flex;gap:8px}
.glass{width:16px;height:22px;border:2px solid var(--gold-dk,#c9a566);border-radius:3px 3px 6px 6px;display:inline-block}
.water-note{font-size:13px;color:var(--ink-soft)}

/* shopping */
/* IEPIRKUMI — divi braucieni, ne viens gigantisks saraksts. */
.shop-step{font-family:'Playfair Display',serif;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);margin-bottom:4px}
.page:has(.shop-step) .lead{margin:12px 0 14px}
.shop-block{margin-bottom:16px}
.shop-band{display:flex;align-items:baseline;gap:12px;flex-wrap:wrap;background:var(--panel);border-left:3px solid var(--gold);border-radius:0 8px 8px 0;padding:8px 16px;margin-bottom:10px}
.shop-band b{font-family:'Playfair Display',serif;font-size:16px;color:var(--burgundy)}
.shop-band span{font-size:12.5px;color:var(--ink-soft)}
.shop-band--fresh{border-left-color:var(--burgundy)}
.shop-grid{columns:2;column-gap:28px;margin-top:2px}
.shop-cat{break-inside:avoid;margin-bottom:10px}
.shop-cat h4{margin:0 0 4px;color:var(--burgundy);font-size:14.5px;border-bottom:2px solid var(--gold);padding-bottom:3px;display:inline-block}
.shop-tbl{width:100%;border-collapse:collapse;font-size:13px}
.shop-tbl td{padding:2.2px 4px;border-bottom:1px solid var(--ivory);vertical-align:middle}
/* Īsta kvadrātiņa kastīte, ko var atzīmēt ar pildspalvu. */
.shop-tbl .ck{width:22px;padding-left:0}
.shop-tbl .ck::before{content:"";display:inline-block;width:11px;height:11px;border:1.5px solid var(--gold-dk,#c9a566);border-radius:2.5px;vertical-align:middle}
.shop-tbl .nm{width:auto}
.shop-tbl .qt{text-align:right;white-space:nowrap;color:var(--ink);font-weight:600}
.shop-tbl .pk{color:var(--ink-soft);font-size:11.5px;text-align:right;white-space:nowrap;padding-left:8px}
/* Pamatkrājumam gramu kolonna ir troksnis — plauktā pērc iepakojumu, ne gramus.
   Bez tās nosaukumi ietilpst trīs kolonnās, un saraksts noiet uz vienas loksnes. */
.shop-pantry .shop-grid{columns:3;column-gap:22px}
.shop-pantry .shop-tbl .qt{display:none}
.shop-pantry .shop-tbl .pk{text-align:left;padding-left:6px;font-size:11px;white-space:normal}

/* meal-prep */
.prep-list{display:grid;gap:10px;margin:6px 0 18px}
.prep-row{border:1px solid var(--panel-line);display:grid;grid-template-columns:1.1fr 1.4fr auto 1.1fr;align-items:center;gap:14px;background:var(--panel);border-radius:10px;padding:12px 18px}
.prep-from,.prep-to{font-size:13px;color:var(--ink-soft)}
.prep-dish{font-family:'Playfair Display',serif;color:var(--burgundy);font-size:16px}
.prep-arrow{color:var(--gold);font-size:20px;font-weight:700}

/* DAY — kompakta galviņa + ēdienreizes divās kolonnās.
   Vienā kolonnā diena prasīja ~1550 px, bet loksnē ietilpst ~1009 px.
   Divas kolonnas = 3 rindas 5 karšu vietā; tas ir vienīgais, kas
   dienu noliek uz vienas loksnes, nesaspiežot tekstu nelasāmu. */
.day-head{display:grid;grid-template-columns:auto 1fr auto;gap:14px;align-items:center;border-bottom:2px solid var(--ivory);padding-bottom:7px;margin-bottom:7px}
.day-no{display:flex;align-items:baseline;gap:8px;line-height:1}
.day-no span{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--gold)}
.day-no b{font-family:'Playfair Display',serif;font-size:30px;color:var(--burgundy)}
.day-kcal{font-family:'Playfair Display',serif;font-size:20px;color:var(--ink)}
.day-kcal span{font-size:13px;color:var(--ink-soft)}
.day-donut svg{width:64px;height:64px}
.legend{display:flex;gap:10px;flex-wrap:wrap;margin-top:3px}
.leg{font-size:11px;color:var(--ink-soft);display:flex;align-items:center;gap:5px}
.dot{width:9px;height:9px;border-radius:50%;display:inline-block}
/* Gaiša, ne melna — dokumentu drukā, un pilnas lapas melns fons ir tinte par velti. */
.day-batch{display:flex;align-items:center;gap:9px;background:var(--panel);color:var(--ink);border-left:3px solid var(--gold);border-radius:0 8px 8px 0;padding:5px 11px;font-size:12px;margin-bottom:6px}
.day-batch .ic{color:var(--burgundy)}
.meals{display:grid;grid-template-columns:1fr 1fr;gap:7px;align-items:start}
.meal{border:1px solid var(--ivory);border-radius:10px;padding:9px 13px;break-inside:avoid}
.meal-top{display:flex;align-items:center;gap:8px;margin-bottom:2px;flex-wrap:wrap}
.meal-type{background:var(--burgundy);color:var(--cream);font-size:10px;letter-spacing:.08em;text-transform:uppercase;padding:3px 9px;border-radius:30px}
.meal-time{display:flex;align-items:center;gap:5px;font-size:11.5px;color:var(--ink-soft)}
.meal-kcal{margin-left:auto;font-weight:600;color:var(--burgundy);font-size:12.5px}
.meal-title{font-size:16.5px;margin:1px 0 3px;color:var(--ink)}
.serve{display:block;margin-top:4px;color:var(--burgundy)}
.meal-ing{font-size:12px;color:var(--ink-soft);margin:0 0 4px}
.meal-steps{margin:0 0 5px;padding-left:17px;font-size:12.5px;line-height:1.45}
.meal-steps li{margin:1px 0}
.meal-aller{display:flex;gap:5px;flex-wrap:wrap}
.pill{display:inline-flex;align-items:center;gap:6px;font-size:11px;color:var(--ink-soft);background:var(--panel);border-radius:30px;padding:3px 10px 3px 3px}
.pill-b{width:18px;height:18px;border-radius:50%;background:var(--gold);color:var(--ink);display:inline-flex;align-items:center;justify-content:center;font-weight:700;font-size:10px}
.pill-none{padding:3px 10px;color:#7a9a73;background:rgba(122,154,115,.12)}
.ic{width:15px;height:15px;display:inline-block;vertical-align:middle}

/* AIZSTĀŠANA — kategoriju kartes divās kolonnās; zem katra pāra maza piezīme. */
.swap-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px 28px;margin-top:6px;align-items:start}
/* Trīs kategorijas divās kolonnās atstātu trešo vienu — tāpēc pēdējā iet pilnā platumā. */
.swap-grid>.swap-cat:last-child:nth-child(odd){grid-column:1 / -1}
.swap-grid>.swap-cat:last-child:nth-child(odd) .swap-tbl{width:100%}
.swap-cat{break-inside:avoid;margin-bottom:14px}
.swap-cat h4{margin:0 0 5px;color:var(--burgundy);font-size:14.5px;border-bottom:2px solid var(--gold);padding-bottom:3px;display:inline-block}
.swap-tbl{width:100%;border-collapse:collapse;font-size:12.5px}
.swap-tbl tr{break-inside:avoid}
.swap-tbl .sw-a{color:var(--ink);font-weight:600;padding:4px 6px 0 0;width:44%;vertical-align:top}
.swap-tbl .sw-b{color:var(--burgundy);padding:4px 0 0 0;vertical-align:top}
.swap-tbl .sw-a::after{content:" →";color:var(--gold-dk,#c9a566);font-weight:400}
.swap-tbl .sw-note{color:var(--ink-soft);font-size:11px;line-height:1.33;padding:0 0 5px;border-bottom:1px solid var(--ivory)}
.diet-grid{display:grid;gap:12px;margin:14px 0 16px}
.diet-card{background:var(--panel);border-left:3px solid var(--gold);border-radius:0 10px 10px 0;padding:12px 18px}
.diet-card h4{margin:0 0 4px;color:var(--burgundy);font-size:16px}
.diet-card p{margin:0;color:var(--ink-soft);font-size:13.5px;line-height:1.55}
.journal{width:100%;border-collapse:collapse;margin-top:10px;font-size:14px}
.journal th{background:var(--burgundy);color:var(--cream);text-align:left;padding:10px 14px;font-family:'Playfair Display',serif;font-weight:500;font-size:14px}
.faq{display:grid;gap:14px;margin-top:6px}
.faq-item{border:1px solid var(--panel-line);background:var(--panel);border-radius:12px;padding:16px 20px;break-inside:avoid}
.faq-item h4{margin:0 0 4px;color:var(--burgundy);font-size:16px}
.faq-item p{margin:0;color:var(--ink-soft);font-size:14px}
.journal th{font-size:12px;padding:8px 10px}
.journal td{border:1px solid var(--ivory);height:34px;padding:6px 10px}
.journal .jd{font-family:'Playfair Display',serif;color:var(--burgundy);text-align:center;font-weight:600}
.journal tr:nth-child(even) td{background:#fdfcf9}
/* Tumšs fons ar nolūku: teksts un paraksts ir krēmkrāsā un zeltā, uz gaiša tie pazūd. */
`;

// ---------- salikšana ----------
const html = `<!DOCTYPE html>
<html lang="lv">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(meta.title)} ${esc(meta.subtitle)} — ${esc(meta.author)}</title>
<style>${fontiCss}</style>
<style>${css}</style>
</head>
<body>
${cover()}
${toc()}
${principlesPage()}
${howToUse()}
${about()}
${forWhom()}
${tips()}
${shoppingPantry()}
${shoppingFresh1()}
${shoppingFresh2()}
${mealprep()}
${days.map(dayPage).join("\n")}
${swapsPage1()}
${swapsPage2()}
${dietSwapsPage()}
${faqPage()}
${journalPage()}
${ctaPage()}
</body>
</html>`;

mkdirSync(join(productDir, "dist"), { recursive: true });
writeFileSync(join(productDir, "dist", "index.html"), html, "utf8");
console.log("OK -> dist/index.html  (" + (html.length / 1024).toFixed(0) + " KB, " + (document_pages()) + " lapas)");
// vāks + saturs + 5 ievadsadaļas + 2 iepirkumi + meal-prep + dienas + 4 noslēguma
/* Lapu skaits nāk no gatavā HTML, ne no roku saskaitītas summas — tā tas nevar novecot. */
function document_pages() { return (html.match(/<section class="page/g) || []).length; }


