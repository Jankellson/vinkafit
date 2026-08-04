# Ievas Jēkabsones mājaslapa — projekta noteikumi

Astro + Tailwind. Latviešu valoda. SEO un YMYL (Your Money Your Life)
veselības saturs.

> ⚠️ **Sanity CMS izņemts 2026-07-28.** Emuāra raksti dzīvo TIKAI Markdown failos
> `src/content/blog/`. Jaunam rakstam — jauns `.md` fails, **slugs obligāti ASCII**
> (bez ā/ē/ž utt., citādi URL salūzt). Neatjauno Sanity, nepievieno CMS atkarības.

> 🚪 **Šī mape = TIKAI mājaslapa (kods).** Stāvoklis, stratēģija un lēmumi ir mātes mapē.
> **Sāc ar `../00-SAKUMS.md`** (priekšdurvis: kur esam / kas tālāk / kur ko meklēt).
>
> 📌 **PIRMS jebkura satura rakstīšanas izlasi `../klients/IEVA-POZICIJA.md`** — tas ir Ievas
> balss, filozofija un nostājas (no intervijas). Tas atšķir "Ievas saturu" no
> ģeneriska AI teksta. Ja tēma tur nav apskatīta, jautā Ievai, neizdomā.

---

## 💾 SAGLABĀŠANAS RITUĀLS (lai izmaiņas nepazūd)

⚠️ AI neko nesaglabā automātiski. Stāvoklis paliek tikai tad, ja to ieraksta failā.
Tāpēc, kad Jānis saka **"saglabā"** vai **"saglabā stāvokli"** (vai sarunas beigās) —
izpildi šo checklist un parādi rezultātu tabulā:

1. **Recap** — uzskaiti, kas šajā sesijā mainījās (lēmumi + kods).
2. **Katram** — kurš dokuments to "pārvalda"? Atjauno tieši to (faili tagad mātes mapē):
   - `../STATUSS.md` — **vienotais darāmo saraksts** (pabeigts/jādara) — VIENMĒR atjauno
   - `CLAUDE.md` (šis) — koda/satura noteikumi, filozofija, apjoms, virziens
   - `../klients/IEVA-POZICIJA.md` — balss, nostājas
   - `../klients/PRODUKTI-STRATEGIJA.md` — produkti, lead magnets, cenas
   - `../LEMUMI.md` — **viena rinda par katru virziena maiņu/lēmumu** (append, nedzēš)
   - `../00-SAKUMS.md` — priekšdurvis / handoff stāvoklis (aizstāj veco NAKAMA-SESIJA)
   - memory `ieva-website-status.md` — starpsesiju indekss
3. **PĀRBAUDI vecos stratēģijas dokumentus `../strategija/`** — vai izmaiņa NEKONFLIKTĒ ar:
   `4-Zimola-Plans.md` (pozicionējums!), `5-SEO-Strategija.md`, `6-Marketinga-Strategija.md`,
   `7-Majaslapas-Strategija.md`, `1-Konkurenti.md`. Ja konfliktē → vai nu atjauno veco TŪLĪT,
   vai ieraksti `../STATUSS.md` zem "Veco dokumentu saskaņošana" + `../LEMUMI.md`. NEKAD neatstāj konfliktu klusībā.
4. **Apstiprini tabulā:** kas mainījās → kur saglabāts.
5. **Atzīmē nezināmos** — kas vēl jānoskaidro no Ievas.

---

## ⚠️ MULTIMEDIA FILOZOFIJA — lasi pirms taisi jaunu rakstu

**Vecais modelis (slikts):** "Skill prasa 5 multimedia elementus, ievietojam no
saraksta." → rezultātā dekoratīvi elementi, kas izpilda formu, bet nepalīdz
lasītājam.

**Jaunais modelis (lieto šo):** Katrai sekcijai jautā **"kāds lēmums vai izziņa
lasītājam ir vajadzīga šeit?"** un tad izvēlies elementu, kas to **tieši
atrisina**. Ja proza vai īss saraksts strādā tikpat labi — neliec tabulu vai
diagrammu.

### Noteikumi

1. **Interaktīvs = ievads → personalizēts izvads, kas dod jaunu izziņu.**
   Jā/nē quizzes, kas tikai saskaita atbildes ("3/6 — vāji"), ir **aizliegti** —
   lietotājs jau zināja savu atbildi.
2. **Mērķos balstīts personalizators** ir noklusētais YMYL kontekstos, kur
   konteksts maina atbildi (svara zaudēšana vs muskuļu vairošana vs uzturēšana).
   Vairāki izvadi, nevis viens cipars.
3. **Tabula tikai tad, ja datus nevar pateikt teikumā vienlīdz labi.** "Produkts
   → grami/100g" — der. "Šķīvja metode vs kaloriju skaitīšana ar 7 rindām" —
   der. Statiska 50/30/20 tabula — neder.
4. **Citāti inline pie fakta, ne atsevišķā "Ko saka zinātne" sekcijā.**
   Apkopojuma saraksts "Avoti un atsauces" lapas apakšā paliek (SEO + auditējamība),
   bet tas ir apkopojums, ne galvenā glabātuve.
5. **1 izcils interaktīvs > 3 viduvēji.** Skill maksimums (1 kalk/quiz/wizard
   per raksts) ir slieksnis pareizajā virzienā — neapiet to.
6. **Mobilā lasāmība pirms vizuāla efekta.** Kalk ar 5+ ievades laukiem uz
   telefona kļūst neērts. Plāno responsīvi no sākuma.

### Pārbaude pirms publicēt

Katram multimedia elementam atbildi: **"Kāds konkrēts lasītāja jautājums šis
atbild un kā tā atbilde ir labāka nekā proza?"** Ja nevari atbildēt — dzēs.

---

## VALODAS POLITIKA (svarīgākais)

### Zīmola lapas — plašs klientu loks (MAINĪTS 2026-06-10, Jāņa lēmums)

⚠️ **"Sievietes 30–50" VAIRS NAV prioritāte zīmola lapās.** Auditorija paplašināta
(sk. `../strategija/5-SEO-Strategija.md`): plašs uztura klientu loks — sievietes,
vīrieši, sportisti, vegāni, ģimenes. Sociālais pierādījums: **"vairāk nekā 50 klienti"**.
Valoda neitrāla (bez dzimtes formām, kur iespējams — "Izmēģināts ir viss", ne
"Tu esi izmēģinājusi"). `index.astro` jau pārrakstīts šādi (2026-06-10); atlikušas:

- `src/pages/par-mani.astro`
- `src/pages/pakalpojumi.astro`
- `src/pages/start.astro` (lead magnet — arī PDF nosaukums "sievietes 30–50" jānomaina)
- `src/pages/paldies.astro`, `src/pages/paldies-abonentam.astro`

### Izglītojošais saturs — NEITRĀLA valoda

Šādam saturam vienmēr lieto neitrālu valodu (bez "sievietes", "viņas",
"klientēm" un tml.) — tas paplašina SEO sasniedzamību un nezaudē nišas
pozīciju, jo nišas konversija notiek uz zīmola lapām:

- `src/pages/uztura-abc/*` — visi raksti
- `src/content/blog/*` — visi turpmākie raksti
- `src/pages/blog/index.astro` description

**Praktiski:** "sievietes" → "cilvēki" / "daudzi" / "pieaugušie"; "sievietei
70 kg" → "70 kg cilvēkam"; "klientes/viņas" → "klienti/viņi" vai pilnībā
pārformulēt bez vietniekvārdiem; "Daudzas sievietes" → "Daudzi".

Izņēmums: ja konkrēts skaitlis tiešām ir sieviešu-specifisks (piem.,
PVO statistika par grūtniecību), saglabā precizitāti ar atsauci.

---

## Uztura ABC rakstu šablons

Visi raksti šajā sadaļā seko `src/pages/uztura-abc/skivja-metode.astro` un
`makrouzturvielas.astro` struktūrai:

- BaseLayout + ArticleNav + ip-* CSS klases (scoped style)
- Hero ar `ip-hero-layout` (grid 1fr 360px), eyebrow, h1, lede, quick-answer
- Sticky TOC + Ieva sidebar card (ip-toc-ieva)
- TL;DR box + Key Takeaways block pēc H1
- Vismaz 5 multimedia elementi (sk. seo-article-writer skill)
- FAQ ar accordion + FAQPage schema
- Avoti ar primārajām atsaucēm (PVO, EFSA, Hārvarda, NIH)
- Article + FAQPage + BreadcrumbList JSON-LD
- prev/next navigācija footer

Jaunam rakstam: kopē kādu no esošajiem ABC failiem kā šablonu, mainī
saturu, atjauno `tocItems`, `faqItems`, `jsonLd.datePublished/Modified`.

---

## YMYL (medicīna/veselība) noteikumi

- Katrs skaitlis (deva, %, daudzums) → primārais avots ar atsauci
- Katrai sekcijai vismaz viena atsauce
- "Konsultējies ar speciālistu" brīdinājumi par medicīniskiem stāvokļiem
  (diabēts, nieru slimības, grūtniecība, vairogdziedzeris)
- Ieva kā autore ar Person schema un pilnu byline
- dateModified vienmēr atjaunots schema un `ip-sources-updated` blokā

---

## Tehniskie noteikumi

- **Attēli:** ģenerē ar `npm run gen:image -- --slug X --type hero --alt "..." --prompt "..."`
  (sk. `scripts/generate-image.mjs`). WebP, hero <120KB, Ievas brand-style block.
  Foto attēliem bez teksta pievieno `--model "google/gemini-3-pro-image-preview"`
  (Nano Banana Pro — ātrāks; GPT image modelis mēdz "karāties" un to lieto tikai
  ja attēlā tiešām jārenderē teksts).
- **OG attēli (social share):** katram rakstam ģenerē OG attēlu ar virsrakstu —
  `node scripts/generate-og.mjs --slug X --src "public/images/raksti/X/X-hero.webp"
  --eyebrow "Uztura ABC" --title "..." --subtitle "..."`. Tas uzliek tekstu uz foto
  ar SVG (precīzas garumzīmes). Pēc tam BaseLayout: `ogImage="/images/raksti/X/X-og.webp"`.
- **Hero stils — vienots visos Uztura ABC rakstos:** žurnāla vāks (`.ip-cover`).
  Foto pilnā platumā ar virsrakstu virsū (tumšs gradients lasāmībai) +
  gaišs `.ip-cover-strip` apakšā ar īso atbildi un statistikām. Sk.
  `skivja-metode.astro` vai `makrouzturvielas.astro` kā šablonu.
- **Krāsu palete (silta, bet ne dzeltena):** `--cream: #fcfbf7` (pamata fons),
  `--ivory: #f0eee9` (paneļiem un sekciju izceļumiem), `--cream-deep: #e6e2d9`
  (akcentiem). Definētas `src/styles/globals.css`. Krēms vairs nav par dzeltenu.
- **Latviešu valoda:** pirms commit invocē `latviesu-valoda` skill;
  diakritiskās zīmes obligātas saturā; slug-os strip uz ASCII.
- **Lapu pārbaude:** `npm run build` jāiet caur bez kļūdām pirms commit.
- **Attēlu saišu pārbaude:** `npm run check:images` OBLIGĀTI pirms katra commit. Foto dzīvo TIKAI
  git — ja kāds tos izdzēš no darba mapes, kods turpina uz tiem norādīt un lapā parādās tukši
  kvadrāti. Šī kļūda atkārtojusies divreiz (2026-07-28, 2026-07-29).
- **Zīmola ikonas** (`public/assets/images/ieva-*-ikona.webp`) — burgundijas + zelta līnijzīmējumi,
  caurspīdīgs fons, 200 px. Lieto TĀS, nevis Lucide/Feather/inline SVG: ģeneriskā ikonu bibliotēka ir
  viens no redzamākajiem "AI uzbūvētas lapas" signāliem. CSS klases (`globals.css` → "ZĪMOLA IKONAS
  UN FOTO BLOKI"):
  - `.bicon` — kaila ikona, izmērs caur `--bi`
  - `.bicon-disc` — ikona uz krēma diska (tumšiem foniem)
  - `.side-photo` — asimetrisks vertikāls foto teksta sekcijā (`--ar`, `--obj`)
  - `.photo-stack` — mazāks attēls, kas pārklāj galvenā stūri
  - `.photo-band` + `.band-track` — pilna platuma fotojosla, kas pārtrauc teksta ritmu
  - `.dayline` + `.dayline-track` — soļi/maltītes ar attēlu, laiku, virsrakstu un paskaidrojumu
  - `.phero` — iekšējo lapu hero (teksts + `.phero-facts` josla pa kreisi, attēls pa labi)
- **Attēls bez paraksta ir dekorācija.** Ja nevari uzrakstīt vienu teikumu, ko attēls paskaidro,
  tas nav vajadzīgs. Bilžu rinda bez parakstiem tika noraidīta ("ļoti neloģiska") — tāpēc
  eksistē `.dayline`. Nekādu uzlīmju/plāksnīšu VIRS fotogrāfijām; paraksts iet zem vai blakus.
- **Attēls sekcijā nedrīkst radīt tukšu vietu.** Ja teksta kolonna ir īsa, foto liec kā atsevišķu
  pilna augstuma kolonnu (`align-self: stretch` + `img { position: absolute; inset: 0 }`), nevis
  bloku zem teksta. Pēc izmaiņas izmēri jāpārbauda: `getBoundingClientRect().height` abām kolonnām.
- **Layout ritms:** ne vairāk kā 2 pēc kārtas "bilde pa kreisi / teksts pa labi" sekcijas — trešo
  pārtrauc ar `.dayline`, ikonu rindu vai teksta pauzi.
- ⚠️ **Pārlūka ekrānuzņēmumi neatveido lapas apakšu** (Playwright pilnas lapas uzņēmums pārtrūkst
  ap 10 000 px; `.reveal` animācija ar `opacity:0` vēl nav nostrādājusi). Pirms uzņēmuma injicē
  `.reveal{opacity:1!important;transform:none!important}`, un garām lapām pārbaudi izkārtojumu
  ar DOM mērījumiem, ne acīm.

---

## 🎨 INFOGRAFIKU UN VIZUĀLO BLOKU DIZAINS (lasi pirms taisi vizuāli)

**Mērķis:** raksts NEDRĪKST izskatīties pēc viena gara teksta blāķa. Sadali info
dažādos blokos, lai to ir interesanti un viegli uztvert. Katra ~2–3 teksta sekciju
pārtrauc ar vizuālu elementu (cita forma katru reizi, ne tas pats).

### Trīs infografiku stili — izvēlies pēc satura

**A · Split-paneļa SVG** (kods, ne ģenerēts attēls)
- Kad: divu opciju salīdzinājums, "kuram der X / kuram Y". Piem.
  `esanas-biezums/3-vai-4-5-edienreizes-diena-kuram-der-katrs-ritms.svg`.
- Izskats: kreisais panelis tumši burgundijs ar krēma tekstu, labais gaišs krēms ar
  burgundija tekstu, lieli **dekoratīvi cipari** (Playfair italic, 80–116px),
  ikonas (apļi/šķīvji), zelta akcenti, tumša apakšjosla ar avotiem + `ievajekabsone.lv`.
- Fails: `public/images/raksti/[slug]/[keyword-rich-nosaukums].svg`, viewBox ~800×500.
- ⚠️ Atsevišķs fails (`<img src>`), NE inline SVG — tikai tā Google Images to indeksē.

**B · Reālā foto-infografika** (Nano Banana foto + latviešu teksts/skaitļi virsū)
- Kad: "chart no reāliem objektiem" — ēdiena foto kā fons, virsū virsraksts, ikonas,
  skaitļi, kopsumma (kā "Fast Food Calories" Pinterest-pin, tikai ar īstu fotogrāfiju,
  NE SVG formām). Koplietojams pin + Google Images. Piem. `esanas-biezums-uzkodu-kalorijas-infografika.webp`.
- Pipeline DIVOS soļos (NEKAD neļauj modelim renderēt latviešu tekstu — sagroza garumzīmes):
  1. `npm run gen:image -- --slug X --type inline --name "...-bg" --model "google/gemini-3-pro-image-preview"
     --prompt "..."` → ēdiena foto BEZ teksta. Promptā OBLIGĀTI: *"no text, no letters,
     no numbers, no labels anywhere"* + ēdiens sakārtots vienā pusē (piem. pa labi), otra puse
     *"completely clean empty table surface — negative space for text"*.
  2. `npm run gen:infographic -- --slug X --name "...-infografika" --bg <foto-ceļš>
     --w 1080 --h 810 --eyebrow "Uztura ABC" --title "..." --subtitle "..."
     --items "Nosaukums|~XX kcal;;Cits|~YY g" --total "≈ ZZ" --total-caption "..."
     --note "Aptuvenas vērtības · ievajekabsone.lv"` → uzliek latviešu tekstu ar SVG
     (precīzas garumzīmes, Ievas zīmols: krēma scrim teksta pusē + zelts + plūmju serif + burgundija kopsummas plāksne).
     `--side left|right` izvēlas teksta pusi (pretēji ēdiena pusei). Skripts: `scripts/generate-infographic.mjs`.
- Foto stils promptā: *warm editorial magazine flat-lay, soft natural window light,
  shallow depth of field, muted warm palette (cream/beige/burgundy/gold), no people, appetizing, premium*.
- YMYL: skaitļi (kcal/g) ir ilustratīvi → vienmēr `~`/`≈` + `--note "Aptuvenas vērtības"`.

**C · CSS/HTML bloki rakstā** (ne attēls — dzīvs HTML, labākais lasāmībai+SEO)
- Fakt-karšu režģis (`ip-factgrid`): 3–4 kartes ar ikonu + lielu vārdu/skaitli + īsu tekstu.
- Bilde+teksts rinda (`ip-split`): attēls vienā pusē, paskaidrojums otrā (mainās puses).
- Pull-stat josla, salīdzinājuma tabula, soļi ar numuriem, callout boxi.
- Šie ir noklusētie info sadalīšanai — ātri, responsīvi, indeksējami. Attēlu (A/B)
  liec tikai tur, kur tas dod ko, ko CSS bloks nevar.

### SEO katram attēlam (Google Images = bezmaksas trafiks)
- **Faila nosaukums = keyword-rich, garš** (ne 2–3 vārdi): `3-vai-4-5-edienreizes-diena-kuram-der-katrs-ritms.svg`, ne `infografika.svg`. ASCII, ar defisēm.
- **Alt teksts = plašs un aprakstošs** (1–3 teikumi): apraksta saturu, mērķauditoriju,
  galveno secinājumu un autori (`Ieva Jēkabsone, uztura konsultante — ievajekabsone.lv`).
- **WebP** (foto) vai **SVG** (diagrammas). Foto kompresē zem budžeta (skripts to dara).
- Brand-vārds attēlā + `ievajekabsone.lv` = simtiem cilvēku redz zīmolu Google Images / ChatGPT.
- `<figcaption>` ir pilns teikums, ne "Diagramma" — tas ir lasītājam redzams konteksts.

---

---

## 📋 PAŠREIZĒJAIS DARBA PLĀNS (2026-05-29)

Pēc pārskata atrasti būtiski uzlabojumi abos Uztura ABC rakstos. Darāmais
sadalīts trīs soļos — **DARI TIEŠI ŠĀDĀ SECĪBĀ**:

### ✅ Solis C — Pierakstīt jauno modeli (PABEIGTS)

Multimedia filozofija ierakstīta šī faila augšā (`⚠️ MULTIMEDIA FILOZOFIJA`).
Lai turpmākajiem rakstiem nekas neaiziet vecajā virzienā.

### ✅ Solis A — Makro centrālais kalkulators (PABEIGTS 2026-05-29)

**Fails:** `src/pages/uztura-abc/makrouzturvielas.astro`

Aizstāj **trīs vājus elementus** ar **vienu spēcīgu mērķos balstītu personalizatoru**:

**Dzēs:**
- Esošo olbaltumvielu kalkulatoru (`#calc-weight`, `#calc-goal`) — par šauru
- Statisko riņķa diagrammu 50/30/20 (`.ip-chart--donut`) — neder lasītājam ar savu mērķi
- AMDR diapazonu joslas (`.ip-amdr`) — sniedz info, kas tagad būs kalkulatora iekšā

**Uzbūvē jauno "Tavs makro plāns":**
- Ievads: svars (kg), aktivitāte (4 līmeņi), **mērķis** (uzturēt / zaudēt svaru /
  vairot muskuļus / zaudēt svaru saglabājot muskuļus)
- Formula: Mifflin-St Jeor BMR × aktivitāte × mērķa koeficients = TDEE
  - Maintenance: TDEE × 1.0
  - Lose: TDEE × 0.80
  - Gain muscle: TDEE × 1.10
  - Cut & preserve: TDEE × 0.85 (ar augstu olb.)
- Izvads, kas atjaunojas LIVE:
  - g olbaltumvielu/dienā (no 1.6–2.2 g/kg pēc mērķa)
  - g tauku/dienā (no 25–30% kaloriju)
  - g ogļhidrātu/dienā (atlikums)
  - Kopā kcal/dienā
  - **Dinamiska riņķa diagrama** ar šī cilvēka %
  - "Kā tas izskatās uz šķīvja" — 3 konkrēti produkti katram mērķim
- Avoti: EFSA, ISSN, Mifflin formula → inline linki kalkulatora pamācībā

Saglabā produktu olbaltumvielu tabulu (vista 31g/100g utt.) — tā ir derīga
skenēšanai.

### ⏭ Solis B — Inline citāti, dzēst "Ko saka zinātne" sekcijas (NĀKAMAIS)

**Abās lapās** (`skivja-metode.astro` un `makrouzturvielas.astro`):

1. Dzēs `<h2 id="zinatne">Ko saka zinātne</h2>` sekciju (un attiecīgu TOC ierakstu)
2. Katru faktu no tās pārvieto **inline** pie konkrētā apgalvojuma:
   - **makro:** PVO <10% piesātinātie → tauku sekcijā; ISSN 1.4–2.0 g/kg →
     kalkulatora pamācībā; AMDR 45–65/20–35/10–35 → sadalījuma sekcijā kā linki
     prozas iekšā
   - **šķīvja:** Hārvarda 20–30% diabēts → jau hero stat (papildināt ar linku);
     PVO 400g → dārzeņu paragrāfā; Nutrients 2016 → vs kaloriju skaitīšanas sekcijā
3. **Saglabā** `ip-sources` apkopojuma sarakstu lapas apakšā — tas ir SEO un
   auditējamība, ne galvenā glabātuve

Šķīvja metodes paškontroli (jā/nē × 6) atstāj **šim solim** — vai nu **dzēst**, vai
pārveidot par "Ātrais šķīvja audits" ar dropdown-iem un mērķtiecīgu padomu
katrai dimensijai. Sarunāsim secīgi.

---

---

## 🔄 PROJEKTA FILOZOFIJAS MAIŅA (2026-06) — lasi

Sarunas laikā ar Jāni mainījās projekta virziens. Svarīgi visam turpmākajam:

1. **Produkti = augšējā prioritāte.** 1:1 kapacitāte ir MAX 4/mēn → pasīvie digitālie
   produkti ir vienīgais ceļš augt. Sk. `PRODUKTI-STRATEGIJA.md`.
2. **VAIRS NE "viss info par brīvu" kā galvenais selling point.** Sākotnējā pozīcija
   ("dodam visu informāciju bez maksas") ir PRETRUNĀ ar maksas produktiem. Jaunā robeža:
   bezmaksas = zināšanas, maksas = pielāgošana/gatavs darbs. Galvenās lapas tekstu
   (sākums, par-mani, pakalpojumi) **jāpārraksta Ievas balsī** (sk. `IEVA-POZICIJA.md`)
   un jānoņem "viss bez maksas" leņķis.
3. **Sistēma/automatizācija ir svarīga** — Ieva grib sagataves (piem. AI izvērtē
   asinsanalīzes pēc viņas noteikumiem). To plānot līdz ar produktiem.

## 🎯 JAUNAIS APJOMS (uzdevumi, kas radās sarunā)

- **Galveno lapu teksta pārrakstīšana** Ievas balsī (sākums, par-mani, pakalpojumi),
  noņemot "viss bez maksas"; pievienot pareizos produktu CTA.
- **SEO meta visām lapām:** katrai lapai optimizēts `<title>` + meta description.
- **Uztura ABC kategoriju apraksti:** zem katras kategorijas `uztura-abc.astro` lapā
  aprakstošs SEO teksts (paskaidro kategoriju + iekšējās saites).
- **Pakalpojumu lapa + cenas** pārtaisīt (€40 → tier-i; sk. Skill-11).
- **Veco produktu/materiālu atgūšana un pulēšana** (10-dienu plāni jau eksistē).

## 🎨 DIZAINA STANDARTS — bēšā balanss

`makrouzturvielas.astro` (un atjaunotā `skivja-metode.astro`) ir **etalons**: balti paneļi
ar plānu maliņu, gaišs `--cream` fons, NE smags bēšs. Šo balansu lieto **visur** —
sākumlapā, par-mani, pakalpojumos. Nepārtaisīt lapas par bēšām. (Globālā palete jau
salabota: `--cream #fcfbf7`, `--ivory #f0eee9`.)

## 📚 STRATĒĢIJAS DOKUMENTI (`../strategija/`)

Pilns komplekts `../strategija/`: `1-Konkurenti`, `2-Reviews`, `2B-AI-Ietekme`,
`3-Unikalais-Lenkis`, `4-Zimola-Plans`, **`seo/` (SEO sadalīts 8 failos — sāc ar `seo/00-INDEX.md`;
vecais `5-SEO-Strategija.md` tagad tikai novirza)**, `6-Marketinga-Strategija`,
`6C-TikTok-Reels`, `6F-Email-Marketing`, `7-Majaslapas-Strategija`, `8-Customer-Journey-Map`.
Klienta pamati: `../klients/0A-Klienta-Brifs`, `0B-Dzila-Atklasana`, `avoti/Q&A.txt`.
⚠️ **Daļa var būt novecojuša pēc filozofijas maiņas** (4/6/7 balstās uz "Hormozi bez maksas") —
pārbaudīt pret `../klients/IEVA-POZICIJA.md` + `../00-SAKUMS.md` §4, pirms paļauties.
Novecojušie (`KONTEKSTS`, `PROJEKTS`, `START-HERE`, `NAKAMA-SESIJA`) → `../arhivs/`.

## Kas NETIEK darīts

- Netulko angļu rakstus latviski mehāniski — domā latviski no nulles.
- Nenoņem nišas valodu no zīmola/pārdošanas lapām.
- Neaiztiek `src/layouts/`, `src/components/` bez vajadzības.
- **Video** slotus (`videoId`) neģenerē — tos pievienos NotebookLM, sloti `null` līdz tam.
- **Infografikas** TAGAD ģenerē ar `npm run gen:infographic` (reālā foto + teksts) un SVG —
  sk. sadaļu "INFOGRAFIKU UN VIZUĀLO BLOKU DIZAINS" augšā. (Vairs nav `null` slots.)
