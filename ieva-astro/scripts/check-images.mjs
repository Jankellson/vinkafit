/**
 * Pārbauda, vai katra /assets/images/... saite `src/` mapē norāda uz esošu datni.
 *
 * Kāpēc šis skripts eksistē: divreiz (2026-07-28 un 2026-07-29) attēli tika izdzēsti
 * no darba mapes, kods uz tiem turpināja norādīt, un lapās parādījās tukši kvadrāti.
 * Palaid PIRMS katra commit:  npm run check:images
 *
 * Trāpījumi koda komentāros (piem. `// /assets/images/...-infografika-1.webp`) tiek
 * uzskaitīti atsevišķi — tie nav renderēti un neizraisa kļūdu.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const RE = /\/assets\/images\/[A-Za-z0-9._/-]+\.(webp|png|jpe?g|svg|avif)/g;

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const p = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(p) : [p];
  });

const isComment = (line) => /^\s*(\/\/|\*|<!--)/.test(line) || /\/\/.*\/assets\/images\//.test(line);

const hits = new Map(); // saite -> [{ fails, komentārs }]

for (const file of walk(path.join(ROOT, 'src'))) {
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    for (const ref of line.match(RE) ?? []) {
      if (!hits.has(ref)) hits.set(ref, []);
      hits.get(ref).push({ where: `${path.relative(ROOT, file)}:${i + 1}`, comment: isComment(line) });
    }
  });
}

const broken = [];
const inComments = [];

for (const [ref, uses] of [...hits].sort()) {
  if (fs.existsSync(path.join(ROOT, 'public', ref))) continue;
  (uses.every((u) => u.comment) ? inComments : broken).push([ref, uses]);
}

for (const [ref, uses] of broken) {
  console.error(`SALAUZTS  ${ref}`);
  for (const u of uses.filter((x) => !x.comment)) console.error(`          ${u.where}`);
}
for (const [ref, uses] of inComments) {
  console.log(`komentārā ${ref}  (${uses[0].where}) — netiek renderēts`);
}

console.log(`\nPārbaudītas ${hits.size} unikālas saites. Salauztas: ${broken.length}`);
process.exit(broken.length ? 1 : 0);
