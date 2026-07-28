# Lēmumu žurnāls

- **2026-07-27 Vietnes foto virziens — premium redakcionāls dzīvesstils.** Pievienots 14 vertikālu Ievas uztura konsultantes foto komplekts `ieva-astro/public/assets/images/`: gaiša virtuve, tirgus, brokastis, plānošana, attālināta konsultācija, dārza maltīte, šķīvja metode, etiķetes, rīta tēja, vakara maltīte, iepirkumu saraksts, darba dienas uzkoda, pastaiga un svētdienas maltīšu sagatavošana. Vizuālā valoda: krēmkrāsa, klusināts bordo/plūmju akcents, dabiska gaisma, bez teksta vai sociālo tīklu filtra.

- **2026-07-25 Četras atsevišķas pakalpojumu sales pages, nevis viena 30/90 dienu lapa.** Piedāvājumu hubā ir
  četras ieejas: sākuma konsultācija, 30 dienu programma, 90 dienu programma un VIP. Katras lapas galvenais CTA
  ved uz 49 € sākuma konsultāciju ar atbilstoši priekšizvēlētu interesi kontakta formā. Šis aizstāj iepriekšējo
  vienas 30/90 dienu detalizētās lapas IA lēmumu.
- **2026-07-25 SEO frāzes atdalītas pa piedāvājumiem.** Sākuma konsultācija mērķē “uztura konsultācija”; 30 dienu
  programma — “uztura plāns svara zaudēšanai”; 90 dienu programma — “individuāls uztura plāns”. VIP lapa ir
  zīmola un augstas pirkuma gatavības lapa, nevis konkurents 90 dienu programmai par vispārīgu individuālā plāna
  atslēgvārdu.
- **2026-07-25 Bez sociālā pierādījuma, kamēr nav verificējamu materiālu.** Pakalpojumu lapās neliek atsauksmes,
  klientu rezultātus, skaitliskus uzlabojumus vai “pirms/pēc” stāstus. Uzticību pelna procesa skaidrība, cenas,
  piedāvājuma robežas un Ievas reālie foto.
- **2026-07-25 VIP pozicionējums.** VIP nepārdod kā vienkārši labāku 90 dienu programmu. Tā atšķirība ir sešu
  mēnešu darbā, prioritārā tajā pašā darba dienā atbildē, praktiskā atbalstā ikdienas situācijās un mazākā slodzē
  klientam pašam risināt uztura jautājumus.

- **2026-07-24 Piedāvājumu arhitektūra ir ieviesta lokālajā Astro vietnē.** Pakalpojumu pārskats ir `/pakalpojumi`; detalizētās lapas ir sākuma konsultācijai, vienai 30/90 dienu programmu lapai un VIP atbalstam. Galvenais CTA visur ir “Pieteikt sākuma konsultāciju — 49 €”. 30 dienu programma maksā 249 € (200 € pēc apmaksātas konsultācijas), 90 dienu programma maksā 549 € (500 € pēc apmaksātas konsultācijas) un ir Ievas ieteiktā izvēle; VIP maksā 1500 € / 6 mēneši, pēc konsultācijas atlikums ir 1451 €. Nekas nav publicēts.

- **2026-07-24 Asinsanalīzes paliek Ievas personalizētajos piedāvājumos.** Vienotais publiskais formulējums:
  **“Asinsanalīžu rādītāju izvērtēšana uztura un dzīvesveida kontekstā.”** Rezultātus izmanto kopā ar klienta
  uzturu, dzīvesveidu, pašsajūtu un mērķiem, lai noteiktu uztura plāna prioritātes. Nelieto “atšifrēšana”,
  “medicīniska interpretācija”, “noviržu cēloņu noteikšana”, “analīžu koriģēšana” vai “organisma atjaunošanas
  protokols”. Redzamā robežu atruna: “Asinsanalīžu rezultāti tiek apskatīti tikai uztura un dzīvesveida kontekstā.
  Pakalpojums neietver diagnozes noteikšanu, ārstēšanu vai medikamentu nozīmēšanu.”
- **2026-07-24 Ievas analīžu apmācību drīkst aprakstīt tikai faktiski.** Esošais GogoSchool dokuments apliecina
  privāta kursa “Deciphering Analyzes” pabeigšanu; tas pats par sevi neapliecina universitātes izglītību,
  medicīnisku kvalifikāciju vai Latvijas profesionālo reģistrāciju. Nelieto “sertificēta analīžu speciāliste”.
- **2026-07-24 Personīgo piedāvājumu darba uzmetums (AIZSTĀTS ar šīs dienas gala lēmumu augstāk).** Pirmā konsultācija = **49 €**; ja klients tajā
  pašā dienā izvēlas programmu, 49 € ieskaita programmas cenā. 30 dienu programma = sākuma konsultācija,
  30 konkrētu dienu ēdienkartes ar receptēm, porcijām un iepirkumu sarakstiem, praktiski ieteikumi,
  asinsanalīžu rādītāju izvērtēšana uztura kontekstā, rakstisks/balss atbalsts un noslēguma konsultācija.
  Atbalsta robeža: reizi nedēļā viens apvienots ziņojums ar novērojumiem un līdz 3 jautājumiem; Ieva atbild
  vienu reizi rakstiski vai balss ziņā 2 darba dienu laikā. 90 dienu programma = trīs secīgi 30 dienu posmi,
  katru nākamo pielāgojot pēc iepriekšējā rezultātiem, 3 konsultācijas un tāds pats atbalsta modelis.
  30/90 dienu gala cenas vēl nav apstiprinātas; iepriekš apspriestie 299 €/699 € ir tikai darba hipotēze.

- **2026-07-24 Produkts #1 ir atjaunots no Claude Code vēstures, nevis no vecā PDF.** Vienīgais avots ir `produkti/10-dienu-plans/` ar `data.mjs` (saturs), `build.mjs` (dizains) un `pdf.mjs` (Edge PDF eksports). Gala fails `dist/10-Dienu-Uztura-Plans.pdf` ir 21 lapa; UTF-8 vizuāli pārbaudīts. Neveidot paralēlas kopijas Desktop mapēs.

> Viena rinda par katru virziena maiņu vai svarīgu lēmumu. Append-only (nedzēš veco).
> Mērķis: kad rodas šaubas "kāpēc mēs tā darām?" vai "kurš dokuments ir aktuāls?" — skaties šeit.
> Jaunākais augšā.

- **2026-07-23 ✅ Payload ir piemērots klientu satura rediģēšanai, nevis brīvam dizaina būvētājam.** Lokālais prototips apstiprina paredzēto lomu: klients varēs labot atļautos tekstus, detaļas un publicēt bloga rakstus, bet bloku dizains, responsivitāte un SEO struktūra paliek kontrolēta kodā. Pirms produkcijas lēmuma vēl jāizbūvē attēlu bloki, bloga kolekcija, lomas un viena reāla esošās vietnes lapas migrācijas pārbaude.

## 2026-07

- **2026-07-22 Payload prototips ir lokāls labs, nevis esošās vietnes migrācija.** Viena izolēta demonstrācijas
  landing lapa testē Payload blokus, AI MCP melnrakstu, Ievas rediģēšanu un Jāņa apstiprināšanas kontroli ar SQLite
  un testa saturu. Esošā Astro + Sanity + Systeme.io vietne ir tikai lokāli uz Jāņa datora un netiek publicēta līdz
  atsevišķam lēmumam.

## 2026-06

- **2026-06-21 Piedāvājumu/cenu arhitektūra izstrādāta (MELNRAKSTS) + pārskata DOCX Ievai.** Produkti sadalīti
  3 kategorijās pēc dabas: **A pasīvie digitālie** (izveido 1×, pārdod ∞) · **B personīgie pakalpojumi** (Ievas laiks) ·
  **C abonementi** (atkārtota peļņa). UI likums: viena lapa = max 2 cenas (decoy/anchor). Kāpne (cenas = melnraksts,
  Ievai jāapstiprina): izaicinājums €69 · 10 recepšu plāni €9/gab. vai €49 komplekts · konsultācija €65 ·
  90-dienu programma €349 (anchor) · VIP "done-for-you" €1500 (6 mēn, 3 vietas) · AI uztura asistents €12/mēn ·
  alumni €19/mēn · mazie produkti €5–29. Artefakts: `VinkaFit-piedavajumu-un-cenu-parskats.docx`. Detaļas: `klients/PRODUKTI-STRATEGIJA.md`.
- **2026-06-21 Ievas ierobežojumi piedāvājuma dizainam (no Jāņa).** BEZ bezmaksas pārdošanas zvaniem (Ievai nepatīk
  tāda pārdošana) · BEZ treniņiem (nejūtas ērti) · grupas PAGAIDĀM nē (negrib vadīt; arī "nav telpas" — bet kohorta ir online).
  → Risinājums: tiešais checkout (Stripe, kā Zanei) · self-paced produkti ar fiksētu sākuma datumu (scarcity bez grupas) ·
  VIP piekļuve = async, NE live zvani.
- **2026-06-21 Zane/veselibaskods funelis dekonstruēts.** Tehnika = Taplink (link-in-bio) + Stripe poga, NE dārga sistēma.
  Produkts = "20. Detoksa maratons" €47, 2 ned., TIEŠAIS pirkums bez zvana, atkārtojamas kohortas + scarcity (taimeris,
  ierobežotas vietas) + bonusa "dāvana". Ievas pārspēja = ANTI-detox godīgs mehānisms (pret "izskalošanu") → pievelk Zanes vīlušos klientus.
- **2026-06-21 AI = VIP done-for-you svira.** AI dod ātrumu/apjomu (ēdienkartes priekš klienta · etiķešu/restorāna/ledusskapja
  foto-concierge · 24/7 asistents), Ieva dod spriedumu. Robeža: AI viens pats → produkts/zemāks līmenis; vajag Ievas spriedumu → VIP.
  KRITISKI: medicīnisko (analīzes/bagātinātāji) AI sagatavo, Ieva APSTIPRINA; veselības dati tikai GDPR-atbilstošos rīkos.
  AI asistents arī = continuity dzinējs (€12/mēn). AI custom-GPT āķis: ChatGPT custom GPT prasa klientam savu Plus kontu → praktiskāk iegults chatbots.
- **2026-06-10 SEO stratēģija pārģenerēta + auditorija paplašināta.** `strategija/5-SEO-Strategija.md`
  pārtaisīts ar atjaunināto `Brand-Marketing-Skills/Skill-5` (8 soļi, visi jaunie paņēmieni). Galvenā virziena
  maiņa: **prom no šaurā "asinsanalīzes + uzturs sievietēm 30-50" → plašāks uztura klientu loks.** Jānis (2026-06-10):
  sievietes 30-50 = KODOLS + paralēli segmenti (vīrieši, sportisti, vegāni, ģimenes); **asinsanalīzes = VIENS no
  vairākiem diferenciatoriem**, ne vadošais grāvis (saskan ar 3-Unikalais-Lenkis robežu: instruments, ne H1/medic.
  atšifrēšana). Saskaņots arī: domēns ievajekabsone.lv (ne vinkafit.lv) · produkti=prioritāte, "viss bez maksas" nost.
  Vecā versija saglabāta `5-SEO-Strategija_OLD-2026-06-10.md`.
- **2026-06-10 REĀLO foto-infografiku pipeline ieviests** (`generate-infographic.mjs` / `npm run gen:infographic`).
  Stils, ko Jānis gribēja: Pinterest-tipa "chart no reāliem objektiem" — Nano Banana Pro ēdiena foto fonā +
  latviešu teksts/skaitļi/kopsumma uzlikti ar SVG (NE AI-renderēts, lai garumzīmes nesagrozītos). Dokumentēts
  `ieva-astro/CLAUDE.md` (3 infografiku stili A/B/C + image-SEO). YMYL: skaitļi ilustratīvi → `~`/`≈` + "Aptuvenas vērtības".
- **2026-06-10 Vizuālā daudzveidība = noteikums.** Raksts nedrīkst būt viens teksta blāķis; ~katras 2–3 sekcijas
  pārtrauc ar CITU vizuālo formu (diagramma/tabula/fakt-kartes/foto-infografika/soļi). Paterni `ip-factgrid`, `ip-split`.
- **2026-06-10 Ēdienreižu ritma personalizators NOŅEMTS** (`esanas-biezums`). Iemesls: ēdienreižu skaits ir pārāk
  individuāls (katram savas vajadzības/īpatnības), jā/nē quiz neko jaunu nepateica. NB: tas NEatceļ CLAUDE.md
  multimedia filozofiju — mērķos balstīti personalizatori paliek noklusētais TUR, kur konteksts maina atbildi (piem. makro kalk).
- **2026-06-10 Maldinošais hero-stats bloks noņemts** (`esanas-biezums`): "3–5 / ~10% / 0 / =" — triviāls/neskaidrs,
  turklāt grāva raksta poanti ("nav maģiska skaitļa"). "Īsā atbilde" bloks dara to darbu labāk.

- **2026-06-03 Cena NAV €40.** €40 bija sens viena mēneša darbs ar cilvēku, kad cenas vēl nebija
  pārdomātas. Cenu + piedāvājuma struktūra jāveido no jauna ar **Hormozi** metodi (Grand Slam Offer /
  value equation). Kods (€35/65/125) = pagaidu, nav autoritatīvs.
- **2026-06-03 "Viss bez maksas" pozīcija jāņem nost.** Iemesls: vajadzīgi digitālie produkti, kuriem
  "viss bezmaksas" ir pretrunā. Robeža paliek: bezmaksas = zināšanas (kas/kāpēc) + lead magnets;
  maksas = pielāgošana / gatavi produkti. (Bezmaksas lead magnet "5 kļūdas" paliek — tas ir piltuves āķis.)
- **2026-06-03 Systeme.io PALIEK plānā** (produkti, mārketings, e-pasts, checkout). Sanity = TIKAI CMS
  (blogs/saturs), nav produktu/mārketinga sistēma. → `7-Majaslapas` arhitektūra (Astro+Sanity+Systeme.io) pareiza.
- **2026-06-03 Produkts #1 (10-dienu plāns) BLOĶĒTS** — nav source failu (atgūt no vecās platformas). Darām nebloķētos.
- **2026-06-03 ĢENERĀLTĪRĪŠANA — failu reorg 2-līmeņu sistēmā.** `ieva-astro/` = tikai mājaslapa;
  state+stratēģija mātes mapē: `00-SAKUMS.md` (priekšdurvis), `STATUSS.md` (ex-TODO), `LEMUMI.md`,
  `strategija/`, `klients/`(+`avoti/`), `arhivs/`. Backup: `_BACKUP-pirms-reorg_2026-06-03/`. Ground-truth
  pārbaude pret kodu: dzīvā mājaslapa vēl rāda "viss bez maksas" + €35/65/125 — jaunais virziens kodā
  vēl NAV ielikts. Dublikāti (PROJEKTS/START-HERE/KONTEKSTS/NAKAMA) → arhivs (nedzēsti).
- **PROJEKTA OS izveidots sistēmas līmenī** (`Brand-Marketing-Skills/PROJEKTA-OS.md`) — SSOT +
  lēmumu žurnāls + saskaņošanas cilpa visiem projektiem. README papildināts (Solis 0).
- **Staleness check atrada:** `START-HERE.md`/`KONTEKSTS.md` novecojuši (WordPress→Astro, Hormozi, vecās cenas). → TODO.
- **`TODO.md` izveidots** kā vienotais darāmo saraksts. Rituāls papildināts, lai pārbauda vecos stratēģijas dokumentus.
- **KONFLIKTS atrasts:** `4-Zimola-Plans.md` un `6-Marketinga-Strategija.md` balstīti uz "viss bez maksas"
  (Hormozi modelis) — konfliktē ar jauno produktu virzienu. Jāpārstrādā (sk. TODO "Veco dokumentu saskaņošana").
- **Saglabāšanas rituāls ieviests** + šis žurnāls izveidots, lai virziena maiņas neizjūk.
- **Filozofijas maiņa: produkti = prioritāte, NE "viss info bez maksas".** Iemesls: 1:1 kapacitāte
  max 4/mēn; e-pasta saraksts 0. Robeža: bezmaksas = zināšanas, maksas = pielāgošana. → `PRODUKTI-STRATEGIJA.md`
- **`IEVA-POZICIJA.md` izveidots** no Ievas intervijas (balss + 14 nostājas + stāsti). Avota dokuments visam saturam.
- **Galveno lapu teksts jāpārraksta** Ievas balsī, noņemot "viss bez maksas". (Vēl nav izdarīts.)
- **Krāsu palete atvieglota** (mazāk bēša): `--cream #fcfbf7`, `--ivory #f0eee9`. Etalons = makrouzturvielas lapa.
- **Hero stils vienots: žurnāla vāks** (`.ip-cover`) abām ABC lapām.
- **Multimedia: decision-driven, NE kontrolsaraksts.** Katrs elements atrisina lasītāja jautājumu vai dzēš.
- **Valodas politika:** zīmola lapas = "sievietes 30–50"; izglītojošais saturs (ABC, blogi) = neitrāls.
- **Solis B (vēl nav):** dzēst "Ko saka zinātne" sekcijas, citātus pārvietot inline.

## 2026-05

- Divi pirmie Uztura ABC raksti uzbūvēti (skivja-metode, makrouzturvielas).
- Uztura ABC pārstrukturēts uz 55 lapām, 6 kategorijas, URL `/uztura-abc/`.
- 2026-06-10 · Sākumlapa pārrakstīta plašajam klientu lokam (ne tikai 'sievietes 30-50'); sociālais pierādījums 'vairāk nekā 50 klienti'; romiešu ciparu vietā SVG ikonas value-grid; hero ieejas animācija + zelta detaļas; latviešu pēdiņas „…”. Zīmola lapu valodas politika CLAUDE.md atjaunota.
