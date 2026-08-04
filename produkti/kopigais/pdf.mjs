// Drukā PDF: node kopigais/pdf.mjs <produkta-mape>
import { existsSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import { execFileSync } from "node:child_process";

const directory = dirname(fileURLToPath(import.meta.url));
const folder = process.argv[2];
if (!folder) throw new Error("Norādi produkta mapi: node kopigais/pdf.mjs 10-dienu-plans");
const productDir = join(directory, "..", folder);
const { product } = await import(pathToFileURL(join(productDir, "data.mjs")).href);
const html = join(productDir, "dist", "index.html");
const coverVariant = process.env.COVER_VARIANT;
const output = join(productDir, "dist", coverVariant ? `${product.pdfName}-vaks-${coverVariant}.pdf` : `${product.pdfName}.pdf`);
const browsers = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
];
const browser = browsers.find(existsSync);

if (!browser) {
  throw new Error("Nav atrasta Edge vai Chrome pārlūkprogramma PDF ģenerēšanai.");
}

/* --virtual-time-budget liek pārlūkam nogaidīt, kamēr Google Fonts ir lejupielādēti.
   Bez tā headless drukā uzreiz, un visi zīmola fonti kļūst par sistēmas rezervi —
   Playfair -> Times New Roman, Alex Brush -> Comic Sans. Klusa kļūda, redzama tikai PDF. */
execFileSync(browser, [
  "--headless=new",
  "--disable-gpu",
  "--virtual-time-budget=20000",
  "--run-all-compositor-stages-before-draw",
  `--print-to-pdf=${output}`,
  "--no-pdf-header-footer",
  pathToFileURL(html).href,
], { stdio: "inherit" });

if (!existsSync(output)) {
  throw new Error("PDF netika izveidots.");
}

/* Fontu pārbaudi ar PDF teksta skenēšanu NELIETOJAM: mūsdienu PDF glabā objektus
   saspiestās plūsmās, tāpēc /BaseFont atrodami tikai daļēji un skenēšana dod viltus
   trauksmi. Fontu iegulšanu garantē `fonti.css` (base64) — tur nav tīkla atkarības. */

console.log(`PDF -> ${output}`);
