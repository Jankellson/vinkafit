# STATUSS — vienotais darāmo saraksts (todo/done)

## 2026-07-25 — Galvene sakārtota lokāli

Galvene ir samazināta līdz paredzamai navigācijai: Sākums, Par mani, Uztura ABC, Blogs, Kontakti un viena
“Pakalpojumi” izvēlne. Nolaižamajā izvēlnē ir saite uz visu piedāvājumu hubu un visas četras pakalpojumu lapas ar
cenu orientieri. No galvenes noņemts “Bezmaksas ceļvedis” un `LV` pie logotipa; galvenais CTA “Sākuma konsultācija”
paliek viens un skaidrs. Mobilajā skatā izvēlne sakrīt hamburgera izvēlnē, pakalpojumu saites paliek atveramā blokā,
un salabota 13 px horizontālā pārplūde. Pārbaudīts lokāli 1366 px un 390 px platumā; `npm run build` pabeigts
veiksmīgi (24 lapas), Impeccable layout detektors — tīrs. Nekas nav publicēts.

## 2026-07-25 — Četras pakalpojumu pārdošanas lapas pārbūvētas lokāli

`/pakalpojumi` tagad ir četru skaidri atdalītu piedāvājumu izvēles lapa: sākuma konsultācija, 30 dienu programma,
90 dienu programma un VIP uztura atbalsts. Izveidotas atsevišķas sales pages `sakuma-konsultacija`,
`30-dienu-uztura-programma`, `90-dienu-uztura-programma` un `vip-uztura-atbalsts`; vecā apvienotā 30/90 dienu
lapa ir noņemta, lai neradītu divējādu piedāvājuma struktūru. Katra jaunā lapa izskaidro situāciju, kam tā der,
procesu, iekļauto saturu, cenu, 49 € konsultācijas ieskaitu, biežākos jautājumus un atkārtotu CTA uz sākuma
konsultāciju. Nav pievienotas atsauksmes vai rezultātu solījumi.

SEO nodalījums: sākuma konsultācija mērķē “uztura konsultācija”, 30 dienu programma — “uztura plāns svara
zaudēšanai”, 90 dienu programma — “individuāls uztura plāns”; VIP ir zīmola/augstas nodoma lapa un nekonkurē ar
90 dienu lapu par to pašu frāzi. Hubā un kājenē saites pārkārtotas uz četrām lapām, kontakta forma ļauj izvēlēties
30 vai 90 dienu programmu atsevišķi. Izmantoti četri atšķirīgi reāli Ievas foto no esošās bibliotēkas.

`npm run build` pabeigts veiksmīgi — 24 statiskas lapas. Lokāli vizuāli pārbaudīti hub, 30 dienu lapa datorā un
VIP lapa mobilajā skatā: pa vienam H1, nav horizontālas pārplūdes un nav bojātu attēlu. Impeccable detektors
atrada sešus iepriekš esošus globālā CSS brīdinājumus (`side-tab`, `border-accent-on-rounded`, `max-height`
animācija), kas nav jaunajos pakalpojumu blokos. Latviešu valodas skripts tika palaists, bet šīs vides Python
instalācija nevar ielādēt jau uzstādīto `spylls`, tāpēc automātiskā pareizrakstības pārbaude neizdevās; jaunais
teksts ir manuāli pārskatīts. Nekas nav publicēts.

## 2026-07-24 — Daudzveidīga Ievas foto bibliotēka mājaslapai

Pirmais vienveidīgais 10 AI attēlu komplekts ir aizstāts ar daudzveidīgāku komplektu, izmantojot trīs papildu reālus
Ievas foto kā vizuālās identitātes atsauces. Katrs kadrs ir WebP, maksimāli 2400 px plata mala, kvalitāte 85; faili
glabājas `ieva-astro/public/assets/images/`. Ainas: dārza maltīte, vasaras parks, rozā kafejnīca, tirgus, krāsaina
virtuve, grāmatnīca, ezera pikniks, konsultācija kafejnīcā, vakara virtuve un jūrmala. Foto vēl nav piesaistīti
konkrētiem lapu blokiem. Nekas nav publicēts.

## 2026-07-24 — Piedāvājumu pārbūve lokāli pabeigta

Astro vietnē izveidota jaunā pakalpojumu informācijas arhitektūra: `/pakalpojumi` ir izvēles lapa, bet detalizētās
lapas ir `/pakalpojumi/sakuma-konsultacija`, `/pakalpojumi/personalizeta-uztura-programma` un
`/pakalpojumi/vip-uztura-atbalsts`. Sākumlapas, navigācijas, kājenes, kontaktu izvēlnes, bloga CTA un noteikumu
norādes saskaņotas ar 49 € konsultāciju, 249 € / 549 € programmām un 1500 € VIP atbalstu. 30 un 90 dienu programmas
paliek vienā SEO lapā; 90 dienu variants ir atzīmēts kā Ievas ieteiktā izvēle. Asinsanalīžu atruna ir redzama
programmas un VIP lapā. Izmantoti esošie Ievas foto — netika radīti jauni attēli. `npm run build` ir pabeigts
veiksmīgi (23 statiskas lapas). Sākumlapa, pakalpojumu pārskats un visas trīs detalizētās pakalpojumu lapas
pārbaudītas lokāli datora un mobilajā skatā bez horizontālas pārplūdes; gala auditā salabots neredzamais VIP
hero CTA teksts. Nekas nav publicēts.

## 2026-07-24 — Piedāvājuma un asinsanalīžu pozicionējums saskaņots

Saskaņots vienotais formulējums: **“Asinsanalīžu rādītāju izvērtēšana uztura un dzīvesveida kontekstā.”**
Analīzes paliek 30 un 90 dienu personalizētajos piedāvājumos kā informācijas avots uztura un dzīvesveida
ieteikumiem. Ieva nenosaka diagnozes, neārstē un nenozīmē medikamentus; šī robeža jānorāda īsā, redzamā
atrunā pie piedāvājuma, ne tikai lietošanas noteikumos. Pilnā terminoloģija, atļautie/neizmantojamie formulējumi,
pakalpojumu uzmetumi un vēl atvērtie cenu jautājumi saglabāti `klients/PRODUKTI-STRATEGIJA.md`; virziena
lēmumi — `LEMUMI.md`. Mājaslapas kods un novecojušais Word cenu pārskats nav mainīti.

## 2026-07-24 — Produkts #1 atjaunots

10 dienu uztura plāns atjaunots no Claude Code saglabātā ģeneratora un satura, nevis no vecā PDF.
Avots + dizains: `produkti/10-dienu-plans/`; gala PDF: `produkti/10-dienu-plans/dist/10-Dienu-Uztura-Plans.pdf`.
UTF-8 un vāks vizuāli pārbaudīti. Vasaras un vegānais plāns jāatjauno tikai pēc šīs versijas apstiprināšanas.

> **Šis ir VIENĪGAIS vieta, kur redzēt, kas pabeigts un kas vēl jādara.**
> Atjauno katru reizi uz "saglabā". Sākums: `00-SAKUMS.md`.
> Detaļas: `LEMUMI.md`, `ieva-astro/CLAUDE.md`, `klients/IEVA-POZICIJA.md`, `klients/PRODUKTI-STRATEGIJA.md`.

## 🧪 #PP AKTĪVS (2026-07-22) — Payload lokālais lab

Izveidota specifikācija `strategija/9-Payload-Prototips.md` un palaists izolēts `payload-lab` ar SQLite.
Admin panelī ir `Lapas`, `Media` un `Vietnes iestatījumi`; `Lapas` dod 7 fiksētus blokus, SEO laukus, Payload drafts un
Jāņa apstiprināšanas statusu. Preview ir `localhost:3000/preview/[slug]`. AI MCP, Cloudflare un publicēšana vēl nav
ieslēgti. Tas **nav** lēmums migrēt esošo Astro + Sanity + Systeme.io vietni vai kaut ko publicēt.

## ✅ #0 PABEIGTS (2026-06-03) — Projekta failu pārkārtošana (Jāņa direktīva)

2-līmeņu info-arhitektūra ieviesta. `ieva-astro/` = TIKAI mājaslapa; viss state+stratēģija mātes mapē:
`00-SAKUMS.md` (priekšdurvis), `STATUSS.md`, `LEMUMI.md`, `strategija/`, `klients/` (+`avoti/`), `arhivs/`.
Pilns backup pirms kustināšanas: `_BACKUP-pirms-reorg_2026-06-03/`. Dublikāti (PROJEKTS, START-HERE,
KONTEKSTS, NAKAMA-SESIJA, Website-text-OLD, website-prototype) → `arhivs/` (NEDZĒSTI). Pointeri
(CLAUDE.md rituāls + stratēģijas norādes) atjaunoti uz jaunajiem ceļiem.

> Atlikušais meta-uzdevums (**PĒC Produkta #1**, pretparalīzes likums): standarta mapju veidne →
> `Brand-Marketing-Skills/PROJEKTA-OS.md`, lai citi projekti sākas tāpat.

## ✅ #V PABEIGTS (2026-06-10) — Vizuālā daudzveidība + REĀLO FOTO-INFOGRAFIKU pipeline

Jauns atkārtoti lietojams rīks + dizaina sistēma, lai raksti neizskatās pēc teksta blāķa:
- **`generate-infographic.mjs` (`npm run gen:infographic`)** — REĀLA foto-infografika DIVOS soļos:
  (1) Nano Banana Pro ģenerē ēdiena foto BEZ teksta (ēdiens vienā pusē, otra = tukša vieta);
  (2) skripts uzliek latviešu tekstu/skaitļus/kopsummu ar SVG (precīzas garumzīmes, Ievas zīmols).
  Tas ir "chart no reāliem objektiem" (kā Pinterest "Fast Food Calories", tikai ar īstu fotogrāfiju).
- **3 infografiku stili dokumentēti** `ieva-astro/CLAUDE.md` (A: SVG split-panelis · B: reālā foto-infografika ·
  C: HTML/CSS bloki) + kad katru lietot + **image-SEO noteikumi** (gari keyword-rich faila nosaukumi,
  plašs alt teksts, WebP, brand attēlā → Google Images bezmaksas trafiks).
- **`esanas-biezums` restrukturēts** (dažādi layouti): §3 SVG split-panelis "3 vai 4–5 reizes";
  §4 "Individuālie faktori" → 4 **fakt-kartes** (ikona+virsraksts+teksts); §5 "Uzkodu slazds" →
  **pilna platuma foto-infografika** "Nemanāmās kalorijas" (~465 kcal). Build OK (18 lapas).
- **NOŅEMTS** maldinošais hero-stats bloks + **ēdienreižu ritma personalizators** (Jāņa lēmums:
  ēdienreižu skaits ir pārāk individuāls, quiz neko nepateica) → sk. LEMUMI 2026-06-10.

## ✅ #P PABEIGTS (2026-06-21) — Piedāvājumu/cenu arhitektūra + pārskata DOCX Ievai

Pilna piedāvājuma kāpne izstrādāta (Hormozi-stila value ladder) un sakārtota Ievai lasāmā Word dokumentā
`VinkaFit-piedavajumu-un-cenu-parskats.docx` (projekta saknē). Produkti 3 kategorijās: **A pasīvie digitālie** ·
**B personīgie pakalpojumi** · **C abonementi**. UI likums: viena lapa = max 2 cenas (decoy/anchor).
**Cenas = MELNRAKSTS**, gaida Ievas apstiprinājumu. Detaļas + pamatojums: `klients/PRODUKTI-STRATEGIJA.md`
(atjaunināts) un `LEMUMI.md` (2026-06-21). Ievas ierobežojumi fiksēti: bez pārdošanas zvaniem · bez treniņiem ·
grupas pagaidām nē. Zane/veselibaskods funelis dekonstruēts (Taplink+Stripe, €47 detox maratons, tiešais pirkums)
→ Ievas anti-detox pozīcija. **Atlikts (Ievai jāizlemj):** cenas · kurus mazos produktus laist pirmos
(10 recepšu plāni jau gatavi) · 90-dienu programmas nosaukums · AI asistents = custom GPT vai iegults chatbots.

## ✅ Pabeigts

- [x] 5 Uztura ABC raksti: `skivja-metode`, `makrouzturvielas`, `partikas-etiketes`, `udens-daudzums`, `esanas-biezums` (hero, OG, schema, FAQ)
  - `esanas-biezums` (2026-06-09, vizuāli papild. 2026-06-10): rakstīts ar **WordsAtScale seo-article-writer** metodiku (CITE formāts, E-E-A-T, anti-slop) + projekta etalons. Leņķis = First Principles (atspēko vielmaiņas mītu, Bellisle 1997 + Schoenfeld 2015). ~~Personalizators noņemts~~ → tagad vizuāli: SVG timeline (3 vs 4–5), SVG split-panelis, fakt-kartes, foto-infografika. Slug ASCII (`esanas-biezums`). prev/next: udens ↔ esanas-biezums.
  - `udens-daudzums` (2026-06-03): lapa bija izveidota ar SALAUZTU CSS (`--wine`/`--gray-*` mainīgie neeksistē → krāsas nestrādāja; `.ieva-note` pārrakstīts ar broken vars; trūka FAQ-akordeona skripta). PĀRRAKSTĪTS uz etalona (pareizi mainīgie, FAQ+TOC skripti). Saturs: neitralizēta dzimumu valoda, lv komatu decimāldaļas, 30–35 ml/kg vairs nav nepatiesi piedēvēts PVO. Interaktīvs = ūdens kalkulators (svars+aktivitāte → l + glāzes). Hero+OG ģenerēti.
  - `partikas-etiketes` (2026-06-03): jauns interaktīvs = "Uzturvērtības luksofors" (cukurs/piesāt. tauki/sāls uz 100 g → zaļš/dzeltens/sarkans, UK FSA sliekšņi). Inline citāti (ES 1169/2011, PVO, EFSA, UK FSA, Harvard), NAV atsevišķas "Ko saka zinātne" sekcijas (sekoju jaunajam modelim). prev/next sasaistīts ar makrouzturvielas. uztura-abc.astro: makro + etiķetes `available: true`.
- [x] Žurnāla vāka hero stils (vienots abām)
- [x] Krāsu palete atvieglota (mazāk bēša) — globals.css
- [x] Balti paneļi (etalons = makrouzturvielas)
- [x] `generate-image.mjs` + `generate-og.mjs` + **`generate-infographic.mjs`** skripti (Nano Banana Pro foto-infografikas)
- [x] Ievas intervija → `IEVA-POZICIJA.md`
- [x] `PRODUKTI-STRATEGIJA.md` (produkti + lead magnets)
- [x] Valodas politika (zīmola vs izglītojošais)
- [x] Saglabāšanas rituāls + `LEMUMI.md` + šis `STATUSS.md`
- [x] Failu pārkārtošana 2-līmeņu sistēmā + backup + 00-SAKUMS.md (2026-06-03)
- [x] 3 lēmumi (cena≠€40→Hormozi · "viss bez maksas" nost · Systeme.io paliek) + Produkts#1 bloķēts (2026-06-03)
- [x] "Viss bez maksas" noņemts **sākumlapā** (index.astro: Guide + Trust-signal → "Zināšanas ir brīvas. Tava sistēma — tas ir darbs."). Build OK.

## 🔜 Nākamās prioritātes (secībā)

> ⭐ **Nākamais fokuss (Jānis, 2026-06-03): ABC lapas.** Precizēt, kas tieši — Solis B (#6) / jauni ABC raksti / kategoriju apraksti (#4).

- [ ] **1. Produkts #1 — 10-dienu uztura plāns** — ⛔ BLOĶĒTS: nav source failu (atgūt no vecās platformas/Squarespace). Atsākt, kad Ievai ir piekļuve.
- [~] **2. Makro kalkulators** — Solis A (mērķos balstīts kalk) JAU iebūvēts `makrouzturvielas.astro`. Atvērts: atsevišķa lead-magnet lapa.
- [~] **3. Galveno lapu teksts** Ievas balsī — sākumlapa (index.astro) ✅ "viss bez maksas" noņemts. **Atlikušas:** `par-mani.astro` + `pakalpojumi.astro` (tā pati robeža). "Produktu CTA" gaida produktus → pagaidām CTA uz lead magnet + konsultāciju. *(Atlikts — Jānis grib vispirms ABC lapas.)*
- [ ] **4. SEO meta visām lapām** + Uztura ABC kategoriju apraksti
- [x] **5. Pakalpojumu lapa + cenas** — jaunā IA un apstiprinātās cenas ieviestas lokāli 2026-07-24. Veikals un
      asinsanalīžu ABC paliek tikai navigācijas/IA līmeņa nākotnes virzieni, līdz tiem ir pietiekams saturs.
- [ ] **6. Solis B** — inline citāti, dzēst "Ko saka zinātne" sekcijas (abās ABC lapās)

### 💡 Idejas (vizuālie / `gen:infographic`)
- [ ] **Foto-infografikas citiem ABC rakstiem** (`makrouzturvielas` makro proporcijas ar īstu ēdienu;
      `skivja-metode` šķīvja sadalījums; `partikas-etiketes` slēptais cukurs produktos ar kcal/g).
- [ ] **Vertikālie Pinterest-pin** (1080×1350, `--h 1350`) dalīšanai soc. tīklos — tas pats rīks.
- [ ] **Dažādākus layoutus arī citās lapās** (fakt-kartes `ip-factgrid`, bilde+teksts `ip-split`) —
      lai neviena lapa nav viens teksta blāķis. Paterni dok. `ieva-astro/CLAUDE.md` (stils C).

## ⚠️ Veco stratēģijas dokumentu saskaņošana (KONFLIKTI atrasti pēc filozofijas maiņas)

- [ ] **`strategija/4-Zimola-Plans.md`** — STORYLINE 1 *"Zināšanas ir bezmaksas"* + CTA *"Lasi blogu —
      viss ir par brīvu"* KONFLIKTĒ ar produktu virzienu. Pārstrādāt uz: bezmaksas = zināšanas,
      maksas = pielāgošana/produkti. Pievienot Ievas balsi (no klients/IEVA-POZICIJA).
- [ ] **`strategija/6-Marketinga-Strategija.md`** — balstīts uz "Hormozi bezmaksas zināšanu modelis".
      Papildināt ar produktu kāpnēm + lead magnet → e-pasta saraksts (tagad = 0).
- [ ] **`strategija/7-Majaslapas-Strategija.md`** — arhitektūra (Astro+Sanity+Systeme.io) PAREIZA;
      tikai "viss bez maksas" copy + produktu pārdošana jāsaskaņo.
- [~] **`strategija/1-Konkurenti.md`** — Zane/veselibaskods funeļa dekonstrukcija fiksēta `LEMUMI.md` (2026-06-21)
      + `klients/PRODUKTI-STRATEGIJA.md` (Taplink+Stripe, €47 detox maratons, tiešais pirkums, kohortas). Atlikts: pārnest pilno izpēti arī šajā failā, ja vajag.
- [x] ~~**`strategija/5-SEO-Strategija.md`**~~ → **PĀRĢENERĒTS (2026-06-10)** ar atjaunināto
      `Brand-Marketing-Skills/Skill-5` (8 soļi: ZSV, SEO Avalanche, 1kw→4 vietas, SXO pre-write,
      hub-and-spoke publicēšanas secība, slow-is-smooth, off-page/link building, lokālā SEO, engine-specific
      GEO, kvantitatīvā prognozēšana). Saskaņots ar jauno kontekstu: domēns ievajekabsone.lv · produkti=prioritāte
      (NE "viss bez maksas") · **auditorija paplašināta: sievietes 30-50 KODOLS + segmenti** (vīrieši, sportisti,
      vegāni, ģimenes) · asinsanalīzes = VIENS no vairākiem diferenciatoriem (ne vadošais grāvis). Vecā versija:
      `5-SEO-Strategija_OLD-2026-06-10.md`. Saglabāti: 55-lapu ABC, konkurentu analīze, attēlu-SEO §9.
- [x] ~~Cenu jautājums~~ → ATBILDĒTS (2026-06-03): €40 bija sens 1-mēn. darbs; cenas+piedāvājums jāveido ar **Hormozi** (#5). €35/65/125 = pagaidu.
- [x] ~~START-HERE + KONTEKSTS novecojuši~~ → pārvietoti uz `arhivs/` (vēsturei). Fakti dzīvo strategija/+00-SAKUMS.

## 📥 Jāprasa Ievai (balss robi no intervijas)

- [ ] Konkrētās biežās frāzes, ko viņa lieto
- [ ] Kādi zīmoli/speciālisti viņai patīk vai kaitina
- [ ] Sociālo mediju stila virziens (atlikts uz vēlāk)
