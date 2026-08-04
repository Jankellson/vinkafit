// Lejupielādē zīmola fontus no Google un iegulst tos CSS kā base64.
//
// Kāpēc: Chrome headless drukā PDF, negaidot tīkla pieprasījumus, tāpēc Google Fonts
// nepaspēja ielādēties un viss dokuments klusi pārgāja uz sistēmas fontiem —
// Playfair kļuva par Times New Roman, Alex Brush par Comic Sans. Kļūda bija redzama
// tikai gatavajā PDF, ne pārlūkā. Iegulti faili šo izslēdz pavisam un ļauj būvēt bez interneta.
//
// Palaid: node fonti.mjs   (raksta fonti.css; atkārto tikai tad, ja maina fontu sarakstu)

import { writeFileSync, existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dir = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dir, "fonti.css");
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

// Tikai tie griezumi, ko dokuments tiešām lieto — katrs lieks fails ir lieki kilobaiti.
const FAMILIES = [
  "Playfair+Display:ital,wght@0,500;0,600;1,500",
  "Plus+Jakarta+Sans:wght@400;500;600;700",
  "Alex+Brush",
];

// Latviešu garumzīmes dzīvo latin-ext apakškopā — bez tās ā/ē/ī/ū/ļ/ņ krīt uz rezervi.
const KEEP = ["latin", "latin-ext"];

const css = await (async () => {
  let out = "/* Ģenerēts ar fonti.mjs — nerediģē ar roku. */\n";
  for (const fam of FAMILIES) {
    const url = `https://fonts.googleapis.com/css2?family=${fam}&display=block`;
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (!res.ok) throw new Error(`Neizdevās ielādēt ${fam}: ${res.status}`);
    const text = await res.text();

    // Katrs @font-face bloks nāk ar komentāru par apakškopu virs tā.
    const blocks = text.split("/*").slice(1);
    for (const b of blocks) {
      const subset = b.slice(0, b.indexOf("*/")).trim();
      if (!KEEP.includes(subset)) continue;
      const face = b.slice(b.indexOf("*/") + 2);
      const src = face.match(/url\((https:[^)]+\.woff2)\)/);
      if (!src) continue;
      const bin = Buffer.from(await (await fetch(src[1], { headers: { "User-Agent": UA } })).arrayBuffer());
      out += face.replace(src[0], `url(data:font/woff2;base64,${bin.toString("base64")}) format('woff2')`)
        .replace(/format\('woff2'\)\s*format\('woff2'\)/, "format('woff2')").trim() + "\n";
    }
  }
  return out;
})();

writeFileSync(OUT, css);
console.log(`fonti.css -> ${(css.length / 1024).toFixed(0)} KB`);
