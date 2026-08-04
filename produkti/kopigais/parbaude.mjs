// Pārbaudes pirms „gatavs": node kopigais/parbaude.mjs <produkta-mape>
// Krīt ar kļūdu, ja kāda no metodes dokumenta prasībām nav izpildīta.
import { pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { calcAll, shoppingFor, mealMacros, KCAL_MAX } from "./uzturvertibas.mjs";

const __dir = dirname(fileURLToPath(import.meta.url));
const folder = process.argv[2];
if (!folder) throw new Error("Norādi produkta mapi: node kopigais/parbaude.mjs vasaras-plans");
const { days, catalog, pantry } = await import(pathToFileURL(join(__dir, "..", folder, "data.mjs")).href);

const kludas = [];
calcAll(days);

for (const d of days) {
  if (d.kcal > KCAL_MAX) kludas.push(`${d.n}. diena: ${d.kcal} kcal > ${KCAL_MAX}`);
  if (d.meals.length !== 5) kludas.push(`${d.n}. diena: ${d.meals.length} ēdienreizes, jābūt 5`);
  for (const m of d.meals) {
    const r = mealMacros(days, d, m);
    // Kalorijas nāk no makro (4/9/4) — lasītājs to var pārbaudīt ar kalkulatoru.
    if (r.kcal !== r.p * 4 + r.t * 9 + r.o * 4) kludas.push(`${d.n}./${m.type}: kcal nesakrīt ar makro`);
    if (r.p < 11) kludas.push(`${d.n}./${m.type} („${m.title}"): tikai ${r.p} g olbaltumvielu (min 11)`);
  }
}

// Iepirkumu saraksts un katalogs viens otru sedz pilnībā.
const vajag = new Set();
for (const dienasProdukti of Object.values(shoppingFor(days))) {
  for (const name of Object.keys(dienasProdukti)) vajag.add(name);
}
for (const n of vajag) if (!catalog[n]) kludas.push(`Katalogā trūkst: ${n}`);
for (const n of Object.keys(catalog)) if (!vajag.has(n)) kludas.push(`Katalogā lieks: ${n}`);
for (const n of pantry) if (!catalog[n]) kludas.push(`Pamatkrājumā produkts, kas nav katalogā: ${n}`);

/* Spoku sastāvdaļas: solī pieminēts produkts, kura receptē vairs nav.
   Tā rodas, labojot porcijas — `ing` samazina, bet soļus aizmirst. Klusa kļūda: skaitļi
   ir pareizi, bet virtuvē cilvēks meklē produktu, kuru nav nopircis. Brīdinājums, ne kļūda —
   locījumi („ogas" / „ogām") dod viltus trauksmi. */
const SPOKI = ["banān", "ābol", "apelsīn", "persik", "kivi", "mango", "greipfrūt", "bumbier",
  "jogurt", "krējum", "biezpien", "kefīr", "hummus", "tofu", "medus", "kļavu sīrup", "avokado"];
const brid = [];
for (const d of days) {
  for (const m of d.meals) {
    const ing = (m.ing + " " + (m.serve || "") + " " + m.title).toLowerCase();
    const steps = m.steps.join(" ").toLowerCase();
    for (const v of SPOKI) {
      if (steps.includes(v) && !ing.includes(v)) brid.push(`${d.n}./${m.type} („${m.title}"): soļos „${v}", sastāvā nav`);
    }
  }
}

const kcal = days.map(d => d.kcal);
console.log(`${folder}: kcal ${Math.min(...kcal)}–${Math.max(...kcal)}, vidēji ${Math.round(kcal.reduce((a, b) => a + b) / days.length)}`);
if (brid.length) console.warn("\nBRĪDINĀJUMI (pārbaudi ar aci):\n" + brid.map(k => " • " + k).join("\n"));
if (kludas.length) {
  console.error("\nKĻŪDAS:\n" + kludas.map(k => " • " + k).join("\n"));
  process.exit(1);
}
console.log("Visas pārbaudes izturētas.");
