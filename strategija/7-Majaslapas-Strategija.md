# SKILL 7 OUTPUT — MĀJASLAPAS STRATĒĢIJA
**Klients:** Ieva Jēkabsone — VinkaFit
**Platforma:** Astro (Vercel) + Systeme.io (biznesa backend)
**Mērķis:** SEO-optimizēts informācijas hub + trafika virziena uz Systeme.io

## ARHITEKTŪRAS PRINCIPS
```
ASTRO (public-facing)          SYSTEME.IO (biznesa backend)
─────────────────────          ────────────────────────────
✓ Sākumlapa                    ✓ E-pasta mārketings
✓ SEO info lapas / blogi       ✓ Lead magnet delivery
✓ Par mani                     ✓ Konsultāciju rezervācija
✓ Pakalpojumu apraksti         ✓ Digitālo produktu pārdošana
✓ Atsauksmes                   ✓ Klientu pieteikšanās / login
✗ Formas / kases               ✗ (nav uz Astro)
✗ Pirkumu apstrāde
✗ Login / konti

CTA uz Astro → link uz Systeme.io lapu (nav iframe)
```

---

## 1. MĀJASLAPAS GALVENAIS MĒRĶIS (Laja)

### PRIMĀRAIS APMEKLĒTĀJS

| Aspekts | Atbilde |
|---------|---------|
| Kas viņa ir | Sieviete 30-50, Latvija, latviski vai krieviski runājoša |
| Ko meklē kad ierodas | Vai šis "tiešām strādās tieši man?" — pārbaudu uzticamību |
| No kurienes ierodas | Google search (SEO) → blog raksts → sākumlapa; TikTok/IG bio → landing page |
| Kādā prātā ierodas | Skeptiska ("jau esmu izmēģinājusi daudz"), izpētes režīmā, cerīga |

### MĀJASLAPAS PRIMĀRAIS DARBĪBAS MĒRĶIS

**E-pasta abonents caur lead magnet** — lejupielādē "5 uztura kļūdas" PDF
*(Kāpēc nevis tieši konsultācija: apmeklētājs vispirms vajag uzticēšanos — e-pasts ļauj to veidot ar laiku)*

**Sekundārie mērķi (max 2):**
1. Konsultācijas pieteikums (tiešais pirkums no lapas)
2. Blog rakstu lasīšana (trafika noturēšana + SEO signals)

### KO LAPAI NAV JĀDARA
- Nav jāpārdod visus pakalpojumus vienā apmeklējumā
- Nav jāiepazīstina ar visu Ievas biogrāfiju
- Nav jāizskaidro katra uztura teorija
- Nav jābūt "fitnesa" dizainam (nav sporta lapa)

---

## 2. PLATFORMAS IZVĒLE

### SECINĀJUMS: ASTRO + VERCEL + SYSTEME.IO

**Astro priekšrocības:**
- Core Web Vitals 95-100 (WordPress 60-75) — Google ranki tieši atkarīgi
- Nulles JavaScript default — ātrākā iespējamā ielāde
- Content Collections — blogi un lapas kā Markdown faili, Ieva var rediģēt
- Statiskā ģenerācija — nav servera izmaksu (Vercel free tier pietiek)

**Systeme.io (biznesa loģika — pilnīgi ārpus Astro):**
- Lead magnet forma + delivery
- E-pasta sekvences (welcome, newsletter)
- Konsultāciju rezervācija
- Digitālo produktu pārdošana
- Klientu login zona

**Integrācija:** Astro lapā ir poga/saite → ved uz Systeme.io lapu (jauns tab vai redirect).

**Stack:**
```
Astro 4+ (static)
Tailwind CSS
Vercel (hosting, bezmaksas)
Markdown/MDX (blog saturs)
Systeme.io (viss biznesa)
```

---

## 3. SITEMAP STRATĒĢIJA

### GALVENĀ NAVIGĀCIJA (top nav — max 6 saites)

```
[Logo/VinkaFit]    Par mani | Pakalpojumi | Zināšanas | Atsauksmes | Blogs    [Piesakies →]
```

### PILNS SITEMAP

```
GALVENĀS LAPAS
/                               Sākumlapa (Miller SB7 wireframe)
/par-mani                       Par Ievu — guide credibility + stāsts
/pakalpojumi                    Pakalpojumu pārskats (ar cenām)
  /pakalpojumi/iepazisanas      Iepazīšanās konsultācija €35
  /pakalpojumi/konsultacija     Konsultācija + plāns €65
  /pakalpojumi/vip              VIP pakete €125-180
/atsauksmes                     Social proof — klientu stāsti
/blogs                          Blog saraksts
  /blogs/[raksts-slug]          Individuāls blog raksts

SEO HUB LAPAS (Skill-5 topic clusters)
/veseligs-uzturs                Hub 1: "Veselīga uztura pamati" (pillar page)
/uzturs-un-veseliha             Hub 2: "Kā uzturs ietekmē tavu ķermeni" (pillar page)
/uztura-miti                    Hub 3: "Patiesība par uzturu: mīti un fakti" (pillar page)
/specifiskas-uztura-vajadzibas  Hub 4: "Specifisku vajadzību ceļvedis" (pillar page)

PROGRAMMATIC/LOKAL SEO
/uztura-konsultacija-riga       Lokālais SEO
/uztura-konsultants-sievietem   Niša SEO
/uztura-plans-insulina-rezistence  Long-tail SEO
/hormonalas-izmainas-uzturs     Long-tail SEO

LEAD MAGNET LANDING PAGE
/start (vai /bezmaksas-celvedis)   Lead magnet — e-pasta capture
/ru/start                          Krievu versija

KRIEVU VERSIJA
/ru/                            Krievu sākumlapa
/ru/par-mani
/ru/pakalpojumi
/ru/blogs

TEHNISKIE
/privatums                      Privacy Policy (GDPR obligāti)
/noteikumi                      Terms of Service
/pieteicies                     Konsultācijas pieteikšanās forma (atsevišķa lapa)
/paldies                        Thank you lapa pēc formas iesniegšanas (GA4 goal tracking)
/paldies-abonentam              Thank you pēc lead magnet reģistrācijas
```

---

## 4. SĀKUMLAPAS STRUKTŪRA — Miller SB7 Wireframe

*Šī ir vissvarīgākā lapa. Sekojam struktūrai precīzi.*

---

### SEKCIJA 1: HEADER (above the fold)

```
╔══════════════════════════════════════════════════╗
║  [VinkaFit logo — burgundy]    [Nav]   [Piesakies →]  ║
║                                                        ║
║   H1: "Izkāp no mūžīgā tievēšanas karuseļa.          ║
║         Kļūsti pati par sava ķermeņa eksperti."        ║
║                                                        ║
║   Subheadline:                                         ║
║   "Individuāla uztura sistēma kas māca saprast         ║
║    savu ķermeni — ne vēl viens PDF fails."             ║
║                                                        ║
║   [PRIMARY CTA: Piesakies iepazīšanās konsultācijai]   ║
║   [SECONDARY CTA: Iegūsti bezmaksas ceļvedi ↓]         ║
║                                                        ║
║   [Ievas profesionāla foto — warm, smart casual,       ║
║    burgundy vai krēma toņi, dabīgs fons, ne studio]    ║
╚══════════════════════════════════════════════════╝
```

**Copywriting principi header:**
- H1 ir no klienta viedokļa (viņa problēma, ne Ievas pakalpojums)
- "Izkāp no karuseļa" — klienta valoda (no VOC Skill 2)
- "Ne vēl viens PDF fails" — tieša diferenciācija no konkurentiem
- Primary CTA — augsts commitment, sekundārais — zems (samazina atteikumu)

---

### SEKCIJA 2: TRUST STRIP (credential bar)

```
ITEC sertifikāts   |   Sievietes 30–50   |   Sistēma, ne diēta   |   Asinsanalīžu integrācija
```

*Apraksta PIEEJU, nevis viltotus skaitļus. Katrs elements atbild uz kādas klientu šaubas.*
- "ITEC sertifikāts" → profesionāla izglītība
- "Sievietes 30–50" → tieši es esmu mērķauditorijā
- "Sistēma, ne diēta" → atšķiras no konkurentiem
- "Asinsanalīžu integrācija" → unikālā kompetence

---

### SEKCIJA 3: STAKES (kas notiks ja nedarīs — negatīvais)

**Headline:** "Vai šī situācija skan pazīstami?"

```
⚠️  Svars atgriežas pēc katras diētas — jo nekas nav mainījies pamatā

⚠️  Ārsts saka "ēdiet veselīgāk" bet nepaskaidro kāpēc asins rādītāji tādi ir

⚠️  Izmēģināts "viss" — kalorijas, intervālbadošanās, maratoni — bez paliekoša rezultāta

⚠️  Katru dienu domāt par ēdienu kā ienaidnieku, justies vainīgai par "gribasspēka trūkumu"
```

*Valoda no VOC (Skill 2). Ne apsūdzēt — identificēt.*

---

### SEKCIJA 4: VALUE PROPOSITION (pozitīvais)

**Headline:** "Ar VinkaFit sistēmu tu iegūsti:"

```
✅  Skaidru izpratni KĀPĒC svars neatkāpjas — ne minējumus, bet faktus

✅  Individuālu plānu tieši tavam ķermenim — ne vispārīgu tabulu

✅  Rīkus lai pieņemtu labākus lēmumus pati — bez atkarības no konsultanta

✅  Mieru ap ēdienu — pārstāj cīnīties, sāc saprast
```

---

### SEKCIJA 5: GUIDE (Ieva kā ceļvedis)

```
[Ievas foto — personīgs, empātisks, smart casual]

"Kad klientas nāk pie manis, viņas bieži saka vienu un to pašu:
'neviens vēl nav izskaidrojis KĀPĒC.'"

Es neiesaku diētas. Es meklēju cēloņus.

Esmu Ieva Jēkabsone — uztura konsultante ar ITEC sertifikātu.
Savā darbā es apvienoju uztura zinātni ar konkrētiem datiem
par tavu ķermeni — lai saprastu ne tikai KO ēst, bet KĀPĒC
tieši tev vajag tieši to.

Šajā lapā ir apkopota visa informācija ko zinu — bez maksas.
Jo māca, ne nosaka.

   ✓ ITEC sertifikāts
   ✓ Asinsanalīžu un uztura saistības
   ✓ Sievietes 30–50 kā galvenā specializācija

[→ Uzzini vairāk par mani]
```

*Galvenā izmaiņa: sākam ar KLIENTA frāzi ("neviens nav izskaidrojis KĀPĒC") — ne ar Ievas self-introduction. Uzsvars uz informācijas hub aspektu ("šajā lapā ir visa informācija").*

---

### SEKCIJA 6: PLAN (3 soļi)

**Headline:** "Kā tas darbojas"

```
     ①                    ②                    ③
  Iepazīšanās          Tavs plāns           Kļūsti eksperte
  konsultācija
                                             
  Pasaksti savu       Individuāla sistēma   Iegūsti zināšanas
  situāciju.          tieši tavam           lai šī būtu
  Es uzdošu           ķermenim un           pēdējā "tievēšanas"
  jautājumus          ritmam.               reize.
  ko neviens
  iepriekš nav
  uzdāvis.

             [Piesakies iepazīšanās konsultācijai →]
```

---

### SEKCIJA 7: TRUST SIGNAL (Hormozi differentiator)

**Headline:** "Izvēle ir tava."

```
Visu ko zinu — ir publiski. Blogā, TikTokā, newsletter — vienmēr bez maksas.

Ceļveži un veidnes ir priekš tiem, kas vēlas gatavu sistēmu —
bez mēnešiem meklēšanas.

Konsultācija ir priekš tiem, kas grib kādu kas domā tieši ar viņiem.

Izvēle ir tava.

[→ Apskatīt bezmaksas resursus]
```

*Apstiprināts teksts. Saglabā Hormozi trust signālu + godīgi izskaidro produktu loģiku (zināšanas bezmaksas, struktūra maksas, personalizācija maksas). Ievas galvenā diferenciācija — nevienam konkurentam tā nav.*

---

### SEKCIJA 8: PAKALPOJUMI (īss pārskats)

**Headline:** "Kā mēs varam strādāt kopā"

```
┌─────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐
│  Iepazīšanās        │  │  Konsultācija + Plāns │  │  VIP Pakete          │
│  €35 / 30 min       │  │  €65                  │  │  €125–180            │
│                     │  │                       │  │                      │
│  Ideāli ja:         │  │  Ideāli ja:           │  │  Ideāli ja:          │
│  Gribi saprast vai  │  │  Esi gatava sākt      │  │  Gribi dziļu         │
│  VinkaFit piemērots │  │  un vajag konkrētu    │  │  analīzi ar          │
│  tev                │  │  individuālu plānu    │  │  asinsanalīzēm       │
│                     │  │                       │  │                      │
│  [Piesakies →]      │  │  [Uzzināt vairāk →]   │  │  [Uzzināt vairāk →]  │
└─────────────────────┘  └──────────────────────┘  └──────────────────────┘
```

---

### SEKCIJA 9: ATSAUKSMES (social proof)

**Headline:** "Ko saka cilvēki ar kuriem esmu strādājusi"

*3 atsauksmes ar foto, pilnu vārdu (ja atļauts), un KONKRĒTU rezultātu:*

```
"Tas bija kā saņemt lietošanas instrukciju savam ķermenim.
Beidzot esmu atradusi ilgtermiņa balansu un izprotu sava
ķermeņa bioloģiju."
— Ginta, 36 gadi

"Man beidzot kāds izskaidroja manas asinsanalīzes un
saistīja tās ar to kā es jūtos katru dienu."
— [Vārds], [vecums]

"[Specifisks rezultāts — enerģija, svars, asins rādītāji —
klienta vārdiem]"
— [Vārds], [vecums]
```

---

### SEKCIJA 10: LEAD MAGNET (e-pasta capture)

**Headline:** "Sāc šeit — bez maksas"

```
┌──────────────────────────────────────────────────────┐
│  [PDF mockup attēls — burgundy cover ar Ievas foto]   │
│                                                       │
│  "5 uztura kļūdas ko sievietes 30-50 pieļauj          │
│   (un kā tās labot)"                                  │
│                                                       │
│  Iegūsti bezmaksas ceļvedi — es nosūtīšu uz e-pastu  │
│                                                       │
│  [Vārds _____________]   [E-pasts ___________]        │
│                                                       │
│         [Nosūtīt man ceļvedi →]                       │
│                                                       │
│  Bez surogātpasta. Atrakstīties 1 klikšķī.           │
└──────────────────────────────────────────────────────┘
```

---

### SEKCIJA 11: FAQ (galvenie iebildumi)

**Headline:** "Biežākie jautājumi"

```
Q: Vai šis ir kārtējais PDF plāns ar pārtikas tabulu?
A: Nē. VinkaFit sākas no tevis — tavas situācijas, paradumiem,
   un ja vajag, asinsanalīžu rādītājiem. Neviena gatava tabula
   nevar aizstāt to.

Q: Cik ilgi pirms rezultātiem?
A: Enerģijas uzlabošanās — bieži jau 2-4 nedēļās kad ķermenis
   saņem ko vajag. Svara izmaiņas — 2-3 mēneši (reāli, stabili,
   ilgtermiņa). Es nesolu ātru "magiju" — solu sistēmu.

Q: Man ir [specifiska veselības problēma]. Vai tu strādā ar to?
A: Holesterīns, insulīna rezistence, vairogdziedzeris, hormonu
   izmaiņas — jā, ar šiem es strādāju bieži. Iepazīšanās
   konsultācijā pastāsti savu situāciju — es pateikšu godīgi
   vai varu palīdzēt.

Q: Vai man vajag konsultāciju vai pietiek ar bezmaksas saturu?
A: Viss bezmaksas saturs ir šeit — blogā, Instagram, newsletter.
   Ja tas atbild uz taviem jautājumiem — lieliski, to es gribu.
   Konsultācija ir tad, kad grib individuālu pieeju tieši savai
   situācijai, ar kādu kas jautā, klausās un prasa atbildību.

Q: Cik maksā un kā piesakīties?
A: Iepazīšanās konsultācija €35 / 30 min. Pietiek aizpildīt
   formu zemāk — es sazināšos 24h laikā.
```

---

### SEKCIJA 12: FINAL CTA

```
═══════════════════════════════════════════════════════
  Gatava sākt? Piesakies iepazīšanās konsultācijai.

  [PIESAKIES TAGAD — €35 / 30 min]

  vai vispirms: [Iegūsti bezmaksas ceļvedi →]
═══════════════════════════════════════════════════════
```

---

### SEKCIJA 13: FOOTER

```
[VinkaFit logo]
"Sava ķermeņa lietošanas instrukcija."

Pakalpojumi          Saturs              Kontakti
Iepazīšanās          Blogs               ieva@vinkafit.lv
Konsultācija         Bezmaksas ceļvedis  Instagram
VIP pakete           Newsletter          TikTok
Par mani             YouTube             Facebook

[MailerLite newsletter signup — 1 lauks: e-pasts]

© 2025 VinkaFit | Ieva Jēkabsone
Privātuma politika | Noteikumi
LV | RU
```

---

## 5. KATRAS LAPAS PURPOSE (Wiebe Hook-Hold-Hand-off)

### PAR MANI LAPA

**Hook:** "Kāpēc sporta zāle vien neatrisina visu" (klienta sāpe, ne Ievas biogrāfija)

**Hold:**
- Ievas stāsts: sporta zāle → 3x nedēļā, ēda "pareizi" → minimāli rezultāti → atklājums: uzturs ir 80% → ITEC izglītība
- Kad sapratu ka asinsanalīzes izskaidro ko neviens cits nepasaka
- Kāpēc mācīšana, ne noteikšana — "mans mērķis: ka tu mani vairs nevajadzētu"
- Credentials: ITEC sertifikāts, specializācija sievietes 30-50, asinsanalīžu pieeja
- 1 liela personīga foto

**Hand-off:** → "Piesakies iepazīšanās konsultācijai" + "Apskatīt pakalpojumus"

---

### PAKALPOJUMU LAPA — IEPAZĪŠANĀS KONSULTĀCIJA (€35)

**Hook:** "Pirms iegulda lielāku summu — saproti vai esam piemēroti."

**Hold:**
- Kas notiek 30 minutēs: Ieva uzklausa, uzdod jautājumus, novērtē situāciju
- Klients aiziet ar konkrētiem soļiem — neatkarīgi vai turpinām
- Piemērots ja: [3 bullet points — klientu situācijas]
- Nav piemērots ja: [1-2 bullet — honesty signal]
- Cena: €35 / 30 min
- 1 atsauksme par iepazīšanās pieredzi

**Hand-off:** → Poga "Piesakīties" → Systeme.io rezervācijas lapa (ārējs links)

---

### PAKALPOJUMU LAPA — VIP PAKETE (€125-180)

**Hook:** "Asinsanalīzes + individuāls plāns + divas konsultācijas — pilnīga sistēma."

**Hold:**
- Kas iekļauts: sākotnējā konsultācija + asinsanalīžu pārskatīšana + individuāls plāns + follow-up konsultācija
- Process: 4-6 nedēļas
- Kam der: sievietes ar zemu enerģiju, holesterīnu, insulīna jautājumiem
- Salīdzinājums ar €35 opciju (kad katra ir piemērota)
- Konkrēts klienta piemērs (Ginta stāsts)

**Hand-off:** → Poga "Iegādāties VIP" → Systeme.io checkout (ārējs links)

---

### BLOG RAKSTI (katrs)

**Hook:** Virsraksts + 1. paragrāfs atbild uz meklēšanas nolūku

**Hold:** Pilna vērtīga informācija (Hormozi — dod visu)

**Hand-off (rotējoši):**
- Atsevišķi raksti: "Šajā tēmā ir arī [saistīts raksts]" → iekšējā linkošana
- 50% rakstu: Lead magnet: "Iegūsti bezmaksas ceļvedi — 5 kļūdas"
- 30% rakstu: Maigs CTA uz konsultāciju

---

### INFORMĀCIJAS LAPAS — E-E-A-T DIZAINA PRINCIPS

**Koncepcija:** Katra uztura informācijas lapa (arī pamata tēmas — kas ir olbaltumvielas, kas ir magnijs, ko nozīmē holesterīns) satur vizuāli izceltu "Ievas komentāru" bloku. Tas ir Google E-E-A-T signals — redzams pierādījums ka saturu radījis cilvēks ar pieredzi.

**"Ievas komentārs" bloka dizains:**
```
┌─────────────────────────────────────────────────────┐
│  [Ievas mini foto, apaļš]  Ievas komentārs          │
│  ─────────────────────────────────────────────────  │
│  "Savā praksē esmu redzējusi ka lielākā daļa         │
│   sieviešu kurām ir šis jautājums, patiesībā         │
│   nezina vienu konkrētu lietu: [specifisks punkts]. │
│   Manuprāt tas ir svarīgāk nekā [common belief]."   │
│                              — Ieva Jēkabsone, ITEC │
└─────────────────────────────────────────────────────┘
```
- Fons: Silts krēms #fff8f2 ar burgundy kreisā mala (#84183e)
- Fonts: Plus Jakarta Sans italic
- Ievas paraksts: Alex Brush
- Pozīcija: Pēc 1. vai 2. sadaļas rakstā (ne sākumā, ne beigās)

**Kāpēc tas strādā:**
- Google redz unikālu, autentisku ekspertu skatījumu (ne ģenerētu tekstu)
- Lasītājs saprast ka ir dzīvs cilvēks aiz satura
- Veido saistību ar Ievu kā personīgo zīmolu
- Atšķiras no visiem konkurentiem (nevienam cits Latvijā tā nav)

**Satura princips info lapām:**
- Pamata fakti (ko katrs var google) + Ievas perspektīva
- Pat vienkāršas lapas (kas ir magnijs, kas ir D vitamīns) ir vērtīgas — daudzi cilvēki nezina pamatus
- Katrai lapai min. 1 "Ievas komentārs" bloks
- Iekšējā linkošana uz pakalpojumiem kur relevanti

---

### SEO HUB LAPAS (/veseligs-uzturs u.c.)

**Hook:** H1 = galvenais atslēgvārds + skaidrojums kas te ir

**Hold:**
- Ievadrindkopa (150-200 vārdi — atbild uz galveno jautājumu)
- Satura kopsavilkums (ko šī lapa aptver)
- Saites uz visiem spoke rakstiem par šo tēmu
- Ievas komentārs/perspektīva (personalizē, veido E-E-A-T)

**Hand-off:** → Saistītais pakalpojums vai → Lead magnet

---

### /START — LEAD MAGNET LANDING PAGE

**Šai lapai nav navigācijas (distraction-free).**

```
[VinkaFit logo — bez nav linkiem]

H1: "5 uztura kļūdas ko sievietes 30-50 pieļauj
     (un kā tās labot)"

Subheadline: "Bezmaksas ceļvedis — 8 minūtes lasīšanai"

3 bullet benefits:
• Uzzini kāpēc svars atgriežas pat pie "pareizas" ēšanas
• Saproti ko tavi asins rādītāji saka par tavu metabolismu
• Iegūsti 3 konkrētus soļus ko sākt jau šonedēļ

[PDF mockup attēls]

[Forma: Vārds + E-pasts]
[Poga: Nosūtīt man ceļvedi →]

Bez surogātpasta. 1-klikšķu atrakstīšanās.

[Ievas mini-foto + "Ieva, ITEC sertificēta uztura konsultante"]
```

---

## 6. EMOCIONĀLĀ KARTĒŠANA (Talia Wolf)

### SĀKUMLAPA

| | |
|--|--|
| **Emocijas ieejot** | Skeptiska ("varbūt atkal kaut kas kas nestrādās"), cerīga (ir meklējusi risinājumu), apjukusi (daudz pretrunīgas info) |
| **Emocijas izejot** | Pārliecināta ka "šī cilvēka pieeja ir citādāka", iedrošināta, gatava dot kontaktus |
| **Emocionālie triggers** | Stakes → viņa atzīst problēmu, Guide → empātija samazina aizsardzību, Trust signal → noņem "pārdošanas" apdraudējumu, FAQ → jau atbild uz šaubām |

### PAKALPOJUMU LAPA

| | |
|--|--|
| **Emocijas ieejot** | Izvērtē ("vai vērts?"), rēķina ("cik izmaksās?"), trauksme ("un ja atkal nestrādā?") |
| **Emocionālie triggers** | Cena redzama (nav slepta — samazina trauksmi), Process skaidrs (samazina nezināmo), "Nav piemērots ja" (palielina uzticamību) |

### BLOG RAKSTS

| | |
|--|--|
| **Emocijas ieejot** | Meklē konkrētu atbildi, varbūt nedaudz aizsargs |
| **Emocijas izejot** | "Šī cilvēce zina ko runā", "man vajag vairāk no šīs lapas" |
| **Triggers** | Ievas personīgā balss, "visu dodu par brīvu" — uzticas, Lead magnet — vērtīgs solis |

---

## 7. NAVIGĀCIJA UN UX

### GALVENĀ NAVIGĀCIJA (desktop)

```
[Logo]    Par mani | Pakalpojumi ▾ | Zināšanas | Atsauksmes | Blogs    [Piesakies →]

Pakalpojumi dropdown:
  → Iepazīšanās konsultācija €35
  → Konsultācija + Plāns €65
  → VIP Pakete €125-180
```

### MOBILĀ NAVIGĀCIJA

```
[Logo]                              [☰]
Hamburger:
  Sākumlapa
  Par mani
  Pakalpojumi
  Atsauksmes
  Blogs
  [PIESAKIES →]  ← vienmēr pirmais/pēdējais mobilajā
```

### CTA HIERARHIJA (kur ko likt)

| Prioritāte | CTA teksts | Krāsa | Kur |
|-----------|-----------|-------|-----|
| Primary | "Piesakies iepazīšanās konsultācijai" | Burgundy #84183e | Hero + pakalpojumu lapas + final CTA |
| Secondary | "Iegūsti bezmaksas ceļvedi" | Zelts #ebc07e outline | Header secondary + mid-page |
| Tertiary | "Uzzini vairāk →" | Teksta saite | Pakalpojumu kartītes, blog beigās |

**Sticky header mobilajā:** Logo + "Piesakies →" poga — vienmēr redzama.

---

## 8. KONVERSIJAS ANALĪTIKA

### OBLIGĀTI UZSTĀDĪT (1x, bezmaksas)

```
□ Google Analytics 4
  - Goal: Form submission (/paldies URL = goal completion)
  - Goal: Lead magnet download (/paldies-abonentam)
  - Goal: Scroll depth 75% (engagement signal)

□ Microsoft Clarity (BEZMAKSAS — labāks par Hotjar sākumam)
  - Session recordings (skatīt kur cilvēki apstājas)
  - Heatmaps (kur klikšķina)
  - Scroll maps

□ Google Search Console
  - Izseko kādi meklēšanas termini ved uz lapu
  - Identificē lapas kam vajag uzlabojumus
```

### PĒC 30 DIENĀM — PIRMĀ ANALĪZE

| Metrika | Norma | Mērķis 6 mēn. |
|---------|-------|--------------|
| Bounce rate sākumlapā | <60% | <50% |
| Time on page sākumlapā | >45 sec | >60 sec |
| Konversija uz lead magnet | >1.5% | >3% |
| Konversija uz konsultāciju | >0.5% | >1% |
| Blog raksta vid. laiks | >2 min | >3 min |

---

## 9. CONTENT BRIEF KATRĀ LAPAI (Williams)

### SĀKUMLAPA — CONTENT BRIEF

```
LAPA: Sākumlapa (/)
PRIMARY GOAL: Lead magnet e-pasta abonents
SECONDARY GOAL: Konsultācijas pieteikums
TARGET PERSONA: Liene, 36 gadi (ofisa darbiniece, nogurusi no diētām)
EMOTIONAL JOURNEY: Skeptiska → Identificējas → Uzticas → Rīkojas

SATURA ELEMENTI (pabeidzami pirms dizaina):
H1: "Izkāp no mūžīgā tievēšanas karuseļa. Kļūsti pati par sava ķermeņa eksperti."
Subheadline: "Individuāla uztura sistēma kas māca saprast savu ķermeni — ne vēl viens PDF fails."
Primary CTA: "Piesakies iepazīšanās konsultācijai"
Secondary CTA: "Iegūsti bezmaksas ceļvedi"
Stakes (4): Svars atgriežas / Ārsts tikai "ēdiet veselīgāk" / Izmēģināts viss / Vainas sajūta
Value props (4): Izpratne kāpēc / Individuāls plāns / Rīki neatkarībai / Miers ap ēdienu
Guide copy: "Es saprotu, kā tas ir — pūlēties un neredzēt rezultātus." + credentials
Plan steps: Iepazīšanās → Tavs plāns → Kļūsti eksperte
Trust signal: "Tu, iespējams, pat nevajadzētu pirkt." [pilns teksts sk. sekcija 7]
Testimonials: Min. 3 ar KONKRĒTU rezultātu + vārds + vecums
FAQ: 5 jautājumi (sk. sekcija 11)
Lead magnet CTA: "5 uztura kļūdas..." forma

BRAND ELEMENTI:
Krāsas: #84183e primary, #fff8f2 fons, #ebc07e akcents
Fonti: Playfair Display (virsraksti), Plus Jakarta Sans (teksts), Alex Brush (dekorācija)
Tonis: Empātiska izmeklētāja — siltais zinātnieks
Foto Ieva: smart casual, burgundy/krēms, dabīgs apgaismojums, nekāds fitnesa studio
```

---

## 10. WORDPRESS IMPLEMENTĀCIJAS SOĻI

### NEKAVĒJOTIES DARĀMAIS (1-2 nedēļas)

```
□ Uzstādi Rank Math SEO plugin
□ Uzstādi Microsoft Clarity (heatmaps) — 5 min, nav izlikt
□ Uzstādi Google Analytics 4 (vai pārstati ja jau ir)
□ Uzstādi MailerLite WordPress plugin — forma sākumlapai + /start
□ Izveido /start lapu (lead magnet) ar Elementor vai Kadence bloki
□ Sākumlapā pievieno lead magnet sekciju (sekcija 10)
□ Pārskatīt navigāciju — samazināt līdz 6 saites
□ Pievieno FAQ sekciju sākumlapai (schema markup automātiski ar Rank Math)
□ Uzstādi caching plugin (WP Rocket vai LiteSpeed)
□ Pārbaudīt PageSpeed Mobile — mērķis 80+
```

### NĀKAMAIS MĒNESIS (satura bāze)

```
□ Izveido 4 SEO hub lapas (pillar pages)
□ Optimizēt par mani lapu (Miller guide struktūra)
□ Izveido atsauksmju lapu (10+ atsauksmes)
□ Pakalpojumu lapas atsevišķi (iepazīšanās / konsultācija / VIP)
□ Uzstādi pieteikšanās formu (/pieteicies) ar auto-reply
□ Izveido /paldies lapas (GA4 goal tracking)
□ Schema markup: Person, Service, FAQ (Rank Math automātiski)
□ Google Search Console uzstādīt un verificēt domēnu
```

### 3+ MĒNEŠI (pilna ekosistēma)

```
□ 20+ blog raksti (cluster par katru hub tēmu)
□ /ru/ krievu versijas galvenajām lapām
□ Programmatic SEO lapas (/uztura-konsultacija-riga/ u.c.)
□ Microsoft Clarity analīze → CRO uzlabojumi
□ A/B test galvenā CTA tekstu
```

---

## 11. VALIDĀCIJA

✅ **1. Vai 5 sekundēs apmeklētājs saprot kas tas ir + kam + ko darīt?**
Jā — H1 nosauc problēmu + risinājumu, primary CTA ir skaidrs, sekundārais CTA ļauj zemas riska soli.

✅ **2. Vai katra lapa ir VIENAM mērķim?**
Jā — sākumlapa → lead magnet/konsultācija; /start → tikai email; pakalpojumu lapas → pieteikšanās; blog → izglītoja + lead magnet.

✅ **3. Vai sitemap atbilst SEO topic clusters (Skill 5)?**
Jā — 4 hub lapas tieši atbilst Skill-5 topic clusters; programmatic lapas aptver long-tail.

✅ **4. Vai emocionālā kartēšana iet caur visu klienta ceļu?**
Jā — no skeptiskas → identificējas (Stakes) → uzticas (Trust signal) → rīkojas (CTA).

✅ **5. Vai cenas un FAQ pievērš objection PIRMS klients to formulē?**
Jā — cenas redzamas pakalpojumu lapās un FAQ, "nav piemērots ja" sekcija disqualificē, Trust signal noņem pārdošanas spiedienu.

---

## 12. KONTEKSTS ATJAUNOJUMS

```
## 7 — Mājaslapa
- Platform: WordPress (vinkafit.lv) + Rank Math + MailerLite + Microsoft Clarity
- H1 sākumlapai: "Izkāp no mūžīgā tievēšanas karuseļa. Kļūsti pati par sava ķermeņa eksperti."
- Galvenais CTA: "Piesakies iepazīšanās konsultācijai" (primary) + "Iegūsti bezmaksas ceļvedi" (secondary)
- Sitemap top-level: / + /par-mani + /pakalpojumi (×3) + /atsauksmes + /blogs + /start + /ru/*
- SEO hubs: /veseligs-uzturs + /uzturs-un-veseliha + /uztura-miti + /specifiskas-uztura-vajadzibas
- Trust signal sekcija sākumlapā: "Tu, iespējams, pat nevajadzētu pirkt."
- Pirmās 2 nedēļas: Rank Math + Clarity + MailerLite forma + /start lapa + navigācija
```

---

*Saistīts: [6F-Email-Marketing.md](6F-Email-Marketing.md) — lead magnet uzstādīšana MailerLite, welcome sekvence*
*Saistīts: [6C-TikTok-Reels.md](6C-TikTok-Reels.md) — bio link stratēģija uz /start landing page*
*Nākamais: Skill-8 — Dizaina specifikācija (krāsas, fonti, komponenti, UI library)*
