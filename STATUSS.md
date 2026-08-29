# STATUSS — vienotais darāmo saraksts (todo/done)

## 2026-08-29 (2) — Salabota lead magnet forma, kas klusi nestrādāja pēc iekšējas navigācijas

**Bug:** Ceļveža ("5 uztura kļūdas") pieteikšanās forma sākumlapā (`#start`) un `/start`
lapā dažreiz nerādījās vispār — cilvēks redzēja tikai virsrakstu "Saņem savu ceļvedi" bez
e-pasta lauka, un pieteikums NEnonāca Systeme CRM. Strādāja tikai pēc pilnas lapas pārlādes
(F5), ne pēc klikšķina uz saiti.

**Cēlonis:** Systeme.io iegultais skripts (`<script id="form-script-tag-25249110">`)
izmanto `document.currentScript`, lai atrastu savu pozīciju DOM un ievietotu iframe blakus.
Šis pārlūka API strādā TIKAI sākotnējās HTML parsēšanas laikā. Astro `<ClientRouter />`
(SPA pārejas starp lapām) skriptu pēc navigācijas ievieto no jauna dinamiski — tur
`document.currentScript` vairs neuzticami norāda uz pareizo skriptu, un vendor kods klusi
neko neievieto (bez kļūdas konsolē, tāpēc pamanīt bija grūti).

**Labojums** (`src/layouts/BaseLayout.astro`): pievienots `astro:before-preparation`
notikuma klausītājs — ja navigācijas mērķis ir `/` vai `/start`, SPA pāreja tiek atcelta
un aizstāta ar parastu `window.location.href` pilnu pārlādi. Aptver visus navigācijas
veidus (klikšķi UZ šīm lapām no jebkuras vietas + pārlūka atpakaļ/uz priekšu pogas), ne
tikai konkrētas saites — nav jāatrod un jāatzīmē katra saite manuāli.

**Pārbaudīts** lokāli (dev serverī): SPA klikšķis no `/par-mani` uz `/` un uz `/start`
tagad izraisa reālu pilnu pārlādi (apstiprināts ar `window` sentinel mainīgo, kas
pazuda), un abās lapās iframe ar formu parādās korekti (`iframeCount: 1`).

## 2026-08-29 — PageSpeed Insights: mobilais Performance 67 → labots render-blocking + oversized attēli

Analizēju `pagespeed.web.dev` rezultātu (mobile 67/100 Performance; Accessibility/Best
Practices/SEO jau 100). Divi lielākie punkti:

1. **Google Fonts bloķēja renderēšanu (est. 2100 ms).** `SEOHead.astro` fontu `<link
   rel="stylesheet">` bija sinhrons. Pārtaisīts uz preload+swap paternu (`media="print"
   onload="this.media='all'"` + `<noscript>` fallback) — teksts rādās uzreiz ar fallback
   fontu, Google fonti pielaikojas, kad ielādējušies.
2. **4 attēli bija 3–10× lielāki par renderēto izmēru (kopā ~228 KiB atkritums).** Hero
   portrets (`ieva-consultant-portrait.webp`, LCP elements) un trīs foto sadaļās "guide"/
   "stakes" bija augšupielādēti pilnā izšķirtspējā, kaut renderējas 100–400px platumā.
   Pārmērogoti uz 2× renderēto izmēru ar `sharp` (piem. `photo-stack` attēls 135→23 KiB).
   Hero attēlam papildus `fetchpriority="high"`, jo tas ir LCP elements.

`npm run build` un `npm run check:images` iet cauri bez kļūdām. Vizuāli pārbaudīts
lokālajā preview — attēli un fonti ielādējas pareizi, izkārtojums nemainījās.

**Otrā caurlaide (tajā pašā dienā), pēc atkārtota PageSpeed testa (mobile 73, desktop
~90+):** vēl aizvien 261 KiB (desktop) / 116 KiB (mobile) "improve image delivery" un 70 KiB
"unused JavaScript". Salaboti abi:

1. **Attēli joprojām 2-3× lielāki par reāli izmērīto "displayed dimensions"** no PSI
   pārskata (ne tikai CSS-aprēķinātu minējumu). Vēlreiz pārmērogoti ciešāk (piem.
   `ieva-vakarinas-majas-virtuve.webp` 700→320px platumā, 72→21 KiB) + **7 zīmola ikonas**
   (`ieva-uztura-*-ikona.webp`, 200×200), kas visur renderējas ≤92px — pārmērogotas uz
   180px. Kopā vēl ~130 KiB.
2. **Google Tag Manager (`gtag.js`, ~70 KiB) ielādējās visiem apmeklētājiem uzreiz**, kaut
   analītika tik un tā sākas tikai pēc piekrišanas (Consent Mode "denied" pēc noklusējuma).
   `BaseLayout.astro`: skripta `<script src=gtag.js>` tags vairs neierakstās statiski —
   `window.__loadGtagScript()` to ievieto DOM tikai tad, kad `localStorage` jau ir
   "accepted" vai lietotājs uzspiež "Piekrītu" cookie banerī. Rezultātā liela daļa
   apmeklējumu (arī pats Lighthouse tests, kas nekad neklikšķina "Piekrītu") šo JS vispār
   neielādē.
3. **Sīkfailu banera ARIA labota** (`role="dialog"` → `role="region"`) — PSI jaunā
   "Agentic Browsing" kategorija atzīmēja, ka `dialog` role neder ne-modālam baneriem
   (nebloķē pārējo lapu, tāpēc nav "dialogs").

Pārbaudīts: `npm run build` + `npm run check:images` tīri; attēlu ielāde un GA
atlikšanas loģika pārbaudīta ar reālu GA ID testa build (dev serverī `.env` placeholder
`G-XXXXXXXXXX` GA vienmēr izslēdz, kā jau bija iepriekš — normāli).

**Nav vēl salabots (mazāka vērtība, apzināti atstāts):** "1 non-composited animation" un
"forced reflow ~54ms" — abi nediagnosticējami bez reāla Chrome trace ieraksta, zem
proporcijas sliekšņa vērtībai, ko tie dotu.

**Commitots un pushots uz `master` (Cloudflare Pages auto-deploy).**

## 2026-08-27 — Sākuma konsultācijas checkout pilnībā gatavs un notestēts; FAQ lapa, lead magnet forma salabota

**Sākuma konsultācija (49 €) tagad ir reāli pērkama.** Systeme.io: funnel `Sakuma-konsultacija`
(Order Form + Thank You), Stripe live savienots, kartes maksājums strādā, Klarna/Multibanco
izslēgti (Funnel settings, ne Stripe konfigurācija — tas ir funnel-specifisks slēdzis).
Business name Stripe pusē salabots (bija „VinkaFit", tagad „Ieva Jēkabsone"; pamanīts arī
otrs, nesaistīts, novecojis Stripe konts ar tagu „Squarespace" — neietekmē, bet nav aizvērts).
**Notestēts ar reālu 1 € pirkumu (kupons, tagad izdzēsts) un refundēts.**

Visas „Pieteikt konsultāciju" pogas (`sakuma-konsultacija.astro`, `pakalpojumi.astro`) tagad
ved TIEŠI uz `https://pirkt.ievajekabsone.lv/1c583d0d` — vairs ne uz `/kontakti` kontaktformu.

**30/90 dienu un VIP — apzināta izvēle NEBŪVĒT Systeme funnel.** Free plāns ļauj 3 funnels ×
15 soļi, un šie produkti tāpat prasa personisku sarunu pirms pirkuma (klients jau ir bijis uz
sākuma konsultāciju). CTA paliek uz `/kontakti?paka=...`; Ieva pēc sarunas izraksta rēķinu ar
**Stripe Invoicing** (manuāli, nav automātisks solis).

**Jauna lapa `/biezi-jautajumi`** — FAQPage + BreadcrumbList schema, 21 jautājums/atbilde,
savākti no jau esošā (apstiprinātā) satura vietnē + izvērsti garāki/praktiskāki AI meklētāju
labad. Saite pievienota kājenē.

**Lead magnet forma (bezmaksas ceļvedis „5 uztura kļūdas") salabota — iepriekš bija FAKE.**
Gan `start.astro`, gan `index.astro` lead magnet sekcijā forma tikai pāradresēja uz „paldies"
lapu, neko nesaglabājot. Tagad abas ir reālas HTML formas (`method="post"
action="https://systeme.io/embedded/43938776/subscription"`, lauki `surname` + `email`),
kas kontaktu saglabā Systeme CRM. **Pirmais mēģinājums (Systeme "Popup form" skripts)
nestrādāja — tas atveras tikai pēc klikšķa, ne uzreiz; pareizais risinājums ir "Inline form"
HTML, ko Ieva atrada un iedeva.**

**Blogs tagad tukšs — apzināti.** Abi vecie raksti (`5-uztura-kludas.md`,
`kapec-svars-atgriezas.md`) dzēsti pēc Jāņa lēmuma („labāk nekādu bloga rakstu nevajag").
`blog/index.astro` jau bija iebūvēts tukšais stāvoklis „Raksti drīz parādīsies" — nekas
papildu nebija jātaisa. Saite `paldies-abonentam.astro` uz dzēsto rakstu noņemta.

**E-pasts `info@ievajekabsone.lv` AKTIVIZĒTS un darbojas** (2026-08-29). Namecheap Private
Email pastkaste izveidota; visas atsauces kodā (kontakti, sākumlapa, FAQ, footer, par-mani,
privātuma un lietošanas noteikumu lapas — 7 faili) nomainītas no pagaidu `ieva.vinka@gmail.com`
uz galīgo `info@ievajekabsone.lv`. Publiskota, commitota, pushota.

**`.sales-fit-note` CSS salabots** — kastīte iepriekš stiepās pilnā augstumā ar tukšu vietu
apakšā (`align-self: stretch`), tagad `align-self: start` + burgundijas kreisā mala, izskatās
pēc īsta callout bloka, ne tukšas kastes.

**Izveidots `ieva-astro/public/assets/images/ieva-logo.png`** — precīzs header logo kā PNG
(Playfair Display kursīvā, burgundijas krāsā, caurspīdīgs fons), Systeme.io lapu vajadzībām.

- [ ] **E-pasta automatizācija priekš lead magnet vēl NAV izveidota.** Cilvēks tagad var
      pieteikties formā, bet **nekas viņam netiek nosūtīts** — nav email campaign/workflow,
      kas nosūta PDF saiti. Jāizveido Systeme.io: Email campaign ar 1. e-pastu (saite uz
      failu) + automation „Funnel form subscribed → Subscribe to campaign" (sk. Systeme
      dokumentāciju: help.systeme.io/article/284).
- [x] E-pasts aktivizēts, kods nomainīts uz `info@ievajekabsone.lv` visur (2026-08-29).
- [x] Astro vietne publiskota uz `ievajekabsone.lv` (Cloudflare Pages, savienots ar
      `github.com/Jankellson/vinkafit`, auto-deploy pēc katra push uz `master`).
- [ ] Git: šīs sesijas izmaiņas vēl nav commitotas.
- [ ] Funnel 2 (3 PDF produkti: 10 dienu, vasaras, vegānais plāns) — **cenas vēl nav
      apstiprinātas** (`PRODUKTI-STRATEGIJA.md` dod tikai melnraksta diapazonu €9–19).
      Jāapstiprina ar Ievu pirms Systeme iestatīšanas.
- [ ] Vecais Stripe konts ar tagu „Squarespace"/„VinkaFit.lv" — pārbaudīt, vai vajadzīgs, ja
      nē, aizvērt, lai nesajauc ar reālo („Systeme.io") kontu.

## 2026-08-24 — PDF faili augšupielādēti Systeme.io

Produktu PDF faili ir augšupielādēti Systeme.io platformā (sadaļā „Your files"). **Vēl NAV**
izveidoti pārdodami produkti — nav ne cenas, ne order form (maksājumu lapas), ne „paldies"
lapas ar lejupielādes saiti. Tātad nekas vēl nav pērkams.

- [ ] Katram PDF: order form ar cenu (Digital product) + Thank you lapa ar saiti uz failu
      (viens funnels, vairākas order forms — sk. sarunu par Systeme.io struktūru).
- [ ] Pirmais reālais produkts pēc plāna (`STATUSS.md` 2026-07-28 ieraksts, solis 10):
      49 € sākuma konsultācija ar booking calendar, ne PDF komplekts.
- [ ] Checkout teksti jāpārtulko latviski (order form, thank you lapa, e-pasta veidne).
- [ ] Astro pogas/saites jāsavieno ar konkrētajām order form URL adresēm.

## 2026-08-02 — Bezmaksas ceļvedis „5 uztura kļūdas" gatavs

**`produkti/5-kludas/` — 9 lapas, 1,26 MB.** Vāks ar Ievas foto, ievads, piecas kļūdu lapas,
rīcības lapa un „Par mani" ar cenu tabulu. Katrai kļūdai viens ritms: kā tas izskatās →
kāpēc tas nestrādā → ko darīt vietā (trīs soļi) → izcēlums ar skaitli.

**Saturs balstīts uz `klients/IEVA-POZICIJA.md`, ne izdomāts.** Cīsiņu princips, salātu
mānība, 300 kcal piemērs, asinsanalīžu robeža („nediagnosticēju, neizrakstu zāles").
Kaloriju skaitļi nāk no tās pašas tabulas, ko uztura plāni, tāpēc ceļvedis un produkti
nevar sākt runāt pretī viens otram.

**Divas apzinātas atkāpes no `strategija/6F-Email-Marketing.md`:**
- Nosaukumā NAV „sievietes 30–50" — `ieva-astro/CLAUDE.md` (2026-06-10) auditoriju paplašināja.
- CTA ir **49 €**, ne 35 € (6F failā palicis vecais skaitlis; `PRODUCT.md` ir patiesība).

**Jauns `kopigais/pamata-stils.mjs`** — zīmola krāsas un drukas modelis vienuviet. To lieto
gan uztura plānu, gan ceļvežu ģenerators, tāpēc visi pieci PDF ir viena sērija.
Pārbaudīts: pēc izdalīšanas 10 dienu plāna HTML korpuss nemainījās un lapu augstumi sakrīt.

- [ ] **`start.astro` teksts nesakrīt ar PDF** — lapā vēl „5 uztura kļūdas, ko sievietes
      30–50 pieļauj", PDF ir neitrālais nosaukums. Jāpārraksta lapa (tas jau bija
      `ieva-astro/CLAUDE.md` sarakstā).
- [ ] Ievas apstiprinājums ceļveža tekstam

## 2026-08-02 — Vasaras un vegānais plāns gatavi · viens dzinējs trim produktiem

**Trīs PDF produkti, katrs 26 lapas:** `10-dienu-plans`, `vasaras-plans`, `veganais-plans`.

**Dzinējs izdalīts uz `produkti/kopigais/`** — `build.mjs`, `uzturvertibas.mjs`, `pdf.mjs`,
`fonti.*`, jauns `kopigie-teksti.mjs` (Ievas pieeja, ieteikumi, atruna, aizstāšanas
pamatgrupas) un jauns `parbaude.mjs`. Produkta mapē paliek tikai `data.mjs` un `dist/`.
Pārbaudīts: pēc pārcelšanas 10 dienu plāna `dist/index.html` ir baits pret baitu tāds pats.

**Vasaras plāns** (1384–1551 kcal, vidēji 1448). Ievas oriģinālā vairākās dienās bija četras
ēdienreizes un uzkodas bez olbaltumvielām; te ir piecas, un katrā vismaz 11 g. Trīs
meal-prep pāri: kabaču plācenīši, pildīti kabači, banānu–mango saldējums.

**Vegānais plāns** (1471–1539 kcal, vidēji 1510, ~70 g olbaltumvielu). **Trīs labojumi
oriģinālā, kas jāapstiprina Ievai:** 7. dienas cepts lasis → cepts tofu (vegānā plānā tā bija
kļūda); medus → kļavu sīrups; olbaltumvielas celtas no ~40–55 g dienā uz ~70 g, jo vairākās
ēdienreizēs to praktiski nebija. Sešas meal-prep pāreja. Pievienota B12 piezīme un jautājums
par dzelzi.

**7. diena pārtaisīta (Jānis):** tofu bija trijās no piecām ēdienreizēm. Tagad vienā —
plācenīši ir no turku zirņiem, vakariņu maize ar hummusu. Hummuss pievienots uzturvērtību
tabulai un iepirkumu sarakstam, izmantots arī 3. dienas launagā.

**Jauna automātiskā pārbaude:** `node kopigais/parbaude.mjs <mape>` — kcal atbilst makro
4/9/4, ≥11 g olbaltumvielu ēdienreizē, ≤1600 kcal dienā, piecas ēdienreizes, iepirkumu
saraksts un katalogs sedz viens otru. Visi trīs produkti to iztur.

**Divas jaunas lamatas ierakstītas metodē:** pārpalikuma ēdienreizes tekstā nedrīkst būt
produkta nosaukums (parseris to pieskaita otrreiz), un jauna tabulas atslēga var nozagt veco
(„kāposts" nozaga „kalē kāposts").

- [ ] Ievas apstiprinājums vegānā plāna labojumiem
- [ ] Vāka kompozīcija visiem trim (skat. zemāk)
- [ ] PDF kompresija zem 2 MB — tagad 6,6 / 6,6 / 7,0 MB

## 2026-08-02 — Izkārtojuma kārta + fontu kļūda + metodes dokuments

**Jauns `produkti/PDF-PRODUKTU-METODE.md`** — nodošanas dokuments nākamajām sarunām. Ar to
pietiek, lai uzbūvētu vasaras un vegāno plānu: arhitektūra, datu modelis, skaitļu likumi,
vizuālais stils un **septiņas lamatas, kas jau maksāja laiku**.

**Izkārtojums pārkārtots pēc Jāņa piezīmēm:** satura lapā tikai saturs (makro riņķis pārcelts
uz savu lapu „Kā sadalās diena") · lapas baltas, paneļi `--panel #fbfaf8` ar plānu maliņu
(13 vietās bija smilšains ziloņkauls) · dienas lapa tagad 2×3 ar sesto šūnu „Šodien" (8 ūdens
glāzes + 5 rakstīšanas rindiņas), piepildījums no ~50 % uz 95 % · aizstāšanas lapās CSS
daudzkolonnas nomainītas pret režģi, trešā kategorija iet pilnā platumā · pašsajūtas
dienasgrāmata ir **ainavas lapa** ar piezīmju aili 44 % platumā · vāks ar foto un baltām
maliņām · noslēguma lapa un foto paraksts izņemti pēc Jāņa lēmuma.

**⚠️ Atrasta un salabota nopietna kļūda: PDF nebija neviena zīmola fonta.** Chrome headless
drukāja, negaidot Google Fonts, tāpēc viss dokuments klusi pārgāja uz sistēmas rezervi —
Playfair kļuva par Times New Roman, Plus Jakarta par Segoe UI un **Alex Brush par Comic Sans**.
Ievas paraksts vākā bija Comic Sans. Redzams tikai gatavajā PDF, ne pārlūkā; Jānis to pamanīja.
Risinājums: jauns `fonti.mjs` lejupielādē fontus un iegulst tos base64 (`fonti.css`, 544 KB) —
tīkla atkarības vairs nav. Pārbaudīts ar Chrome CDP, ka visi trīs fonti tiek reāli lietoti.

**Fonti tagad tie paši, kas mājaslapā:** Playfair Display virsrakstiem (vāks — kursīvs),
Plus Jakarta Sans pamattekstam, Alex Brush **tikai parakstam** (kā `.guide-sig` lapā).
Pārbaudīts, ka Alex Brush satur `latin-ext`, tāpēc „Jēkabsone" garumzīme nekrīt uz rezervi.

**Pašreiz:** 26 lapas (25 portreta + 1 ainavas), 27 / 21 / 52, 6,6 MB.

- [ ] Vāka kompozīcija vēl jāpārstrādā — tehniski pareiza, bet par daudz tukšuma un cieta šuve
      starp balto daļu un foto. Plāns: mazāk elementu, lielāks virsraksts, apraksts nost.
- [x] Vasaras un vegānā vāka attēli — abi jau bija `produktu-vaki/` mapē un tagad ir ielikti.

## 2026-08-02 — Pamata vizuālie materiāli izveidoti

- [x] Trīs 1200×1800 produktu vāki: pamata, vasaras un vegānais plāns — pārgenerēti kā gluda ziloņkaula fona “quiet luxury” sērija, bez lina un lauku virtuves estētikas.
- [x] Divi papildu pamata vāka kandidāti saglabāti kā atsevišķi faili (`...-luxury-01.webp`, `...-luxury-02.webp`); tie neaizvieto iepriekšējos attēlus.
- [x] Pievienoti sērijas partneri izvēlētajam pamata `...-luxury-02.webp` vākam: vasaras `...-luxury-02.webp` un vegānais `...-luxury-01.webp`. Visi ir bordo, krēmkrāsas un gaiša akmens virzienā, ar vietu vāka tekstam.
- [x] Izveidoti trīs pilni PDF vāka priekšskatījumi (`10-Dienu-Uztura-Plans-vaks-a.pdf`, `-b.pdf`, `-c.pdf`), lai izvēlētos teksta un foto kompozīciju pirms gala vāka aizvietošanas.
- [x] Trīs sociālo tīklu materiāli: maltītes ieraksts (1080×1350), karuseļa fons (1080×1350) un stāsta/Reels fons (1080×1920) — pārgenerēti tajā pašā “quiet luxury” pilsētnieciskajā stilā.
- [x] Faili sakārtoti: `ieva-astro/public/assets/images/produktu-vaki/` un `ieva-astro/public/assets/images/socialie-tikli/`.
- [x] Attēlu ģenerators papildināts ar `cover`, `social` un `story` izmēriem, lai netiktu sabojātas dokumentā prasītās proporcijas.

## 2026-08-01 — Vizuālo promptu bibliotēka

Jaunais `strategija/10-Vizualie-Promti.md` — kopējami prompti trīs produktu vākiem
(pamata, vasaras, vegānais), sociālajiem tīkliem, rakstu hero un infografiku foniem.

**Galvenā doma: trīs vāki kā VIENA sērija.** Vienāds kadra leņķis, vienāds linu galds, vienāda
gaisma; atšķiras tikai sastāvdaļas un palete. Citādi sanāk trīs skaistas, bet nesaistītas bildes.

**Balstīts uz reālo, ne izdomāto:** `ieva.brand.json` krāsas, jau esošais foto stils
(`raksti/*/hero.webp`) un `ieva-astro/CLAUDE.md` attēlu konveijera noteikumi. Katrā promptā
ir `no text, no letters, no numbers` — modeļi latviešu garumzīmes sagroza, tekstu liekam
pēc tam ar SVG.

**Piezīme Jānim:** ChatGPT attēlu modelis šim ir vājākais variants. Projektā jau ir
`npm run gen:image` ar Nano Banana Pro, kas fotoreālistisku ēdienu taisa labāk. Prompti der abiem.

- [ ] Ģenerēt vākus un pārbaudīt, vai virsraksts ietilpst tukšajā zonā
- [ ] Vāka izkārtojums `build.mjs` jāpapildina ar foto fonu + tumšu gradientu (tagad vienkrāsains)

## 2026-08-01 — Produkts #1: šķīvja metode izmesta, makro sadalījums vietā

Ieva atzina, ka „Šķīvja metode" (½ dārzeņi · ¼ graudi · ¼ olbaltumvielas + tauki klāt) neatbilst
viņas pieejai. Aizstāta ar **makro sadalījumu pēc enerģijas: 50 % ogļhidrāti · 28 % olbaltumvielas ·
22 % tauki** (pie ~1450 kcal = 180 / 100 / 35 g). Riņķis lieto tās pašas krāsas, ko dienu donuti,
tāpēc dokuments runā vienā vizuālā valodā.

Otrā Ievas iebilde — rieksti un sēklas nedrīkst būt „pēc acumēra". Pievienots precizitātes bloks:
**nolīdzinātā ēdamkarotē** olīveļļa 13,5 g (120 kcal) · zemesriekstu sviests 16 g (95 kcal) ·
ķirbju sēklas 10 g (55 kcal) · mandeles 9 g (52 kcal), plus biežākās porcijas 30 g mandeļu
(175 kcal), 20 g ķirbju sēklu (110 kcal), ½ avokado (110 kcal). Ēdamkarote der kā mērs tikai
tad, ja pateikts, cik tā sver un ka tā ir nolīdzināta — kaudzē uzlikta ir ap divreiz vairāk.

**Salaboti nepatiesi skaitļi tekstā:** 6 ēd.k. eļļas 600 → **~700 kcal**; „sauja riekstu ~100 kcal"
→ **30 g = ~175 kcal**, paka (200 g) **virs 1000**. BUJ „svari vairs nav vajadzīgi" pārrakstīts —
dārzeņus no acs, riekstus/sēklas/eļļu/sierus sver arī pēc tam.

**Formulējumi pēc Jāņa:** pamatkrājums → **pamatprodukti** · svaigais → **svaigie produkti** ·
„svarīgs ir kopējais" → **kopums** · „vainas sajūta … sliktākais padomdevējs" → **neko labu nedod** ·
„veselības stāvoklis" → **veselības problēmas**.

**Pārbaudīts:** `node build.mjs` 26 lapas · `node pdf.mjs` PDF pārģenerēts · `latviesu-valoda`
check.py — 0 anglicismu, 0 pārgaru teikumu · izkārtojums apskatīts pārlūkā.

Saknes `10-Dienu-Uztura-Plans.pdf` (55 KB, oriģinālais) **paliek** — Jāņa lēmums 2026-08-01.

## 2026-08-01 (vēlāk) — Skaitļi tagad saskaitās ar kalkulatoru

Iepriekš kaloriju skaitlis nāca no tabulas kcal kolonnas, bet ogļhidrāti bija rēķināti **bez
šķiedrvielām** (ES etiķešu norma). Rezultāts: ja lasītājs pareizinātu gramus pēc 4/9/4, sanāktu
vidēji 4,6 % (sliktākajā ēdienreizē 10 %) mazāk, nekā rakstīts blakus. Nebija kļūda, bet izskatījās
pēc kļūdas.

**Novērsts.** Tabulā tagad ir **pilnie ogļhidrāti (ar šķiedrvielām)**, un kaloriju kolonnas vairs
nav vispār — kcal rēķina no makro (4/9/4) uz noapaļotajiem gramiem. **Nesakritības: 0 no 50
ēdienreizēm.** Tas pats attiecas uz tauku bloka piemēriem (ēdamkarotes, porcijas) — arī tie tagad
nāk no tabulas, ne no roku ierakstītiem skaitļiem.

**Blakus efekts: makro sanāca 27 / 22 / 51** — praktiski tieši Ievas mērķis 28/22/50. Iemesls
proza: šķiedrvielas ir ogļhidrāti, un, tās ieskaitot, ogļhidrātu daļa pieaug. Vidēji 1506 kcal,
diapazons 1379–1567 (`forWhom` un BUJ teksti atjaunināti).

**Godīgā atruna:** šķiedrvielas šādi tiek skaitītas pa 4 kcal/g, lai gan tās dod ap 2. Tāpēc
kaloriju skaitlis ir **par ~45 kcal dienā (ap 3 %) lielāks** nekā patiesībā. Virziens ir drošais:
cilvēks apēd mazāk, nekā skaitlis sola. Alternatīva — rādīt patiesās kalorijas, bet tad gramus
pareizināt vairs nevar.

**Piecu Latvijas produktu jautājums ir SLĒGTS** (Jānis, 2026-08-01): vidējie skaitļi paliek, zīmolus
neprasām. Es biju to pārspīlējis kā risku — pārbaude rāda pretējo:

| Produkts | Cik plānā | Zīmolu robežas | Ietekme uz dienu |
|---|---|---|---|
| Rupjmaize | 370 g | 220–280 kcal/100 g | −14 … +8 kcal (≤1,0 %) |
| Biezpiens 0,5 % | 1040 g | 68–88 | −7 … +14 kcal (≤0,9 %) |
| Kefīrs | 320 g | 48–58 | ±2 kcal (0,1 %) |
| Liess siers 10 % | 75 g | 170–210 | ±2 kcal (0,1 %) |

Visi četri sliktākajā galā vienlaikus = ±26 kcal dienā jeb 1,7 %. **Gabalu svari (banāns 80 vai
140 g) un gatavošanas zudumi svārstās daudz vairāk**, tāpēc zīmolu precizēšana būtu darbs bez
rezultāta. Pamatojums ierakstīts arī `uzturvertibas.mjs` komentārā, lai to vēlāk neatver no jauna.

**Ieteicamie produkti ierakstīti** (Jānis, 2026-08-01): rupjmaize **„Ķelmēnu"**, biezpiens **0,5 %**,
grieķu jogurts **liesākais**. Tie tagad stāv iepirkumu saraksta iepakojuma ailē.

- Biezpiens 0,5 % jau bija tabulā — bez izmaiņām.
- **Grieķu jogurts pārlikts uz liesāko (0 %):** 9 P / 2 T / 4 O → **10,3 P / 0,4 T / 3,6 O**.
  Vienīgā izmaiņa, kas ko maina: tauki −1 g dienā, olbaltumvielas +1 g. Jaunais vidējais 1502 kcal.
- **Ķelmēnu rupjmaizei paliek USDA rudzu maizes profils.** Veikala deklarētā etiķete (262 kcal pie
  8,4 P / 1,5 T / 59,9 O) **pati nesaskaitās** — no tiem makro sanāk 287 kcal, 9 % vairāk. Kopējās
  kalorijas tāpat sakrīt ar USDA uz 1 % (262 pret 259), tāpēc tur nav ko iegūt. Ja Ievai ir pakas
  foto ar pilnu tabulu (arī šķiedrvielām), ielikšu to.

## 2026-08-01 (vēl vēlāk) — Augļi gabalos, ne gramos + cieta 1600 kcal robeža

**Jāņa kritērijs:** precizitāte tur, kur kļūda maksā. Eļļa, rieksti, sēklas, riekstu sviests —
gramos. Augļi — gabalos („1 ābols", „½ banāns", vidēja lieluma), jo neviens nesver pusi ābola un
dažu desmitu kaloriju kļūda tur neko nemaina. Ogas un vārītas bietes paliek gramos: tās neskaita
gabalos. Kritēriji saglabāti arī atmiņā turpmākajiem projektiem.

Visi „50 g ābols / 50 g banāns" tipa ieraksti pārrakstīti. Gabalu svari salikti reālie (ābols 180 g,
banāns 120 g, apelsīns 130 g, kivi 70 g, persiks 140 g, greipfrūts 240 g, mango 200 g) — iepriekš
tie bija apaļi 100 g, kas nesakrita ar dzīvi. Parseris tagad saprot arī „½".

**Rupjmaizei zīmols NEtiek norādīts.** Kritērijs ir „kvalitatīva, mazāk sāls un cukura", un ņemam
vidējo kaloriju daudzumu — cilvēks veikalā nepirks vienmēr vienu un to pašu maizi. Iepirkumu
sarakstā tā arī rakstīts. Biezpiens 0,5 % un liesākais grieķu jogurts paliek norādīti, jo tur
produkta veids tiešām atšķiras.

**Jauna cietā robeža: `KCAL_MAX = 1600`.** Ja kāda diena to pārsniedz, būve krīt ar kļūdu, kas
nosauc dienu un skaitli. Pārbaudīts, ka sargs tiešām nostrādā.

**2. dienas plācenīšiem trūka piedevu daudzumu — salabota struktūra, ne tikai teksts.** Ogas un
jogurts bija ierakstīti 1. dienas partijā ar piezīmi „abām reizēm": aprēķins pareizs, bet cilvēks
2. dienā neredzēja nevienu skaitli. Receptēm tagad ir lauks **`serve`** — tas, ko liek virsū VIENAI
porcijai, un ko `portions: 2` **nedala uz pusēm**. 1. dienā mīkla atsevišķi, piedevas atsevišķi;
2. dienā piedevas uzrakstītas savā `ing`. Pārbaudīts, ka nav dubultas skaitīšanas: abas ēdienreizes
338 kcal, un katra diena iepirkumā saņem savas 50 g ogu. Pārējās pārpalikumu dienas pārbaudītas —
tur skaitļi bija.

**1. dienas zemesriekstu sviests: 10 g** (Jānis; ceļā bija 7 → 15 → 8 → 10). Izvēle apzināta —
mazliet vairāk tauku, bet bez lielas kaloriju cenas.

**Ķirbja krēmzupā vistas NAV** (Ievas/Jāņa lēmums) — vietā **80 g sarkano lēcu**, kas vārīšanās
laikā izjūk un sablenderējas gludi. Zupa: 349 kcal, 16 g olbaltumvielu (ar vistu bija 278 / 21).
Nosaukums „Ķirbja krēmzupa ar lēcām", arī meal-prep lapā. Sarkanās lēcas ir atsevišķs produkts
iepirkumu sarakstā — parastās brūnās neizjūk un krēmzupai neder.

**Pildītajā paprikā vista PALIEK**, bet kā filejas gabaliņi, ne sīki sagriezta.

**Pārpalikumu laiki pārbaudīti** — visi seši ir uz nākamo dienu: 12 h (plācenīši), 15 h (vistas
sautējums), 18 h (ķirbja zupa), 21 h (pupiņu sautējums, paprika), 24 h (laša zupa). Laša zupa ir
garākā; piedāvāju to pārcelt uz 10. dienas brokastīm — **Jānis: nevajag.**

**Visām trim partijas receptēm ar piedevām tagad ir `serve` lauks** — piedeva uz VIENU porciju, ko
`portions: 2` nedala. Jānis atrada šo pašu kļūdu trīs reizes pēc kārtas, tāpēc pārlaidu visas:

| Recepte | Piedeva | Uz porciju |
|---|---|---|
| Biezpiena plācenīši (1.→2. d.) | ogas + grieķu jogurts | 50 g + 15 g |
| Ķirbja krēmzupa (3.→4. d.) | ķirbju sēklas | 5 g |
| Pildīta paprika (7.→8. d.) | krējums | 10 g |

Pārējām trim (pupiņu sautējums, laša zupa, vistas sautējums) piedevu nav. Kalorijas nemainījās —
tikai tagad daudzums ir uzrakstīts abās dienās, ne jāizrēķina. **Ja kādreiz pievieno jaunu partijas
recepti ar piedevu, tā jāraksta `serve`, ne pamatsastāvā.**

**Piena produktu tauku procenti tagad ir RECEPTĒS, ne tikai iepirkumu sarakstā** — 35 vietās.
Iepriekš cilvēks virtuvē redzēja tikai „80 g biezpiens" un nezināja, ka aprēķins pieņem 0,5 %.
Tagad: vājpiens (0,5 %) · biezpiens (0,5 %) · grieķu jogurts (0 %) · kefīrs (2,5 %) ·
liess siers (10 %) · **krējums (12–15 %)**. Krējuma tabulas vērtība pacelta no 12 % uz **13,5 %**
(diapazona vidus); ietekme mikroskopiska, jo plānā ir 20 g krējuma. Kaloriju skaitļi nemainījās.

**Kausētais siers = Dzintars Light** (Jānis). Deklarēti 7,5 % tauku un 138 kcal/100 g, parastajam
Dzintaram 292 — uz pusi mazāk. Tabulā bija vispārīgais 20 % profils; tagad 13 P / 7,5 T / 4,6 O,
kas dod tieši tos 138 kcal. Zupa 349 → 344 kcal. **Šo zīmolu nosaucam, atšķirībā no maizes**, jo
light variants tiešām maina skaitli, ne tikai iepakojumu. Krēmsiera plānā nav; ja kādreiz parādās —
Philadelphia Light.

**Iepirkumu sarakstā tagad katram piena produktam redzams tauku procents**, lai veikalā nav jāmin:
vājpiens 1 l (0,5 %) · biezpiens ~1 kg (0,5 %) · grieķu jogurts ~400 g (0 %) · kefīrs 0,5 l (2,5 %) ·
liess siers 1 gabals (10 %) · krējums 1 maza paka (12–15 %) · kausētais siers Dzintars Light (7,5 %) ·
rupjmaize „kvalitatīva, mazāk sāls".

**Stāvoklis pēc visa:** 27 / 21 / 52 · vidēji **1529 kcal** · diapazons **1470–1559** · 0 nesakritību
no 50 ēdienreizēm · nevienā ēdienreizē zem 11 g olbaltumvielu · visi produkti katalogā, katalogā
nav lieku · iepakojumu ieteikumi pārrēķināti pēc jaunajiem augļu daudzumiem.

**Rezerve līdz 1600 kcal tagad ir 41–130 kcal katrā dienā.** Jebkurš papildinājums prasa kaut ko
atņemt — būve krīt pati, ja robeža pārsniegta.

## 2026-08-01 — Produkts #1: visas 50 ēdienreizes pārbalansētas, skaitļi tagad rēķinās paši

Jānis: „lai visur ir sabalansētas olbaltumvielas … kaloriju daudzumus sabalansē, lai viss atbilst."

**Diagnoze pirms darba** (rēķināts no sastāvdaļām, ne pārrakstīts): plāns bija **25 % olbaltumvielu /
34 % tauku / 41 % ogļhidrātu**. **14 ēdienreizes zem 12 g olbaltumvielu**, sliktākā — pildītā paprika
ar 4 g (rīsi un dārzeņi, gaļas nebija vispār). Tauki krājās salātos: 20 g sēklu + 10 g eļļas = 26 g
tauku vienā uzkodā, trīs ceturtdaļas dienas budžeta.

**Rezultāts pēc pārbalansēšanas: 29 % / 24 % / 47 %, vidēji 1461 kcal, diapazons 1330–1521.**
Nevienā no 50 ēdienreizēm nav zem 11 g olbaltumvielu. Ievas mērķis bija 28/22/50; 22 % tauku nav
sasniedzami, nesagraujot ēdienu (olas, lasis, avokado, rieksti nes taukus), tāpēc dokuments tagad
rāda **īstos** skaitļus, ne solījumu.

**Kā tas panākts:** olu baltumi putrās · biezpiens augļu launagos un čia pudiņā · vista ķirbja
krēmzupā, pildītajā paprikā un grūbās · tofu no 100 g uz 150 g · sēklas salātos 20 g → 7 g ·
olīveļļa 10 g → 5 g · vairāk kartupeļu, maizes un augļu, lai ogļhidrāti pieaugtu.

**Galvenā strukturālā maiņa — jauns `uzturvertibas.mjs`.** Kaloriju un makro skaitļus vairs neraksta
ar roku: tos rēķina no receptes `ing` teksta. Tas pats attiecas uz iepirkumu sarakstu — roku
rakstītais `shoppingByDay` **izdzēsts**, sarakstu saskaita no to pašu recepšu sastāvdaļām.
Ja maina recepti, skaitlis un saraksts mainās paši. Neatpazīta sastāvdaļa **aptur būvi**, nevis
klusi samelo. Makro riņķis ievadlapā arī nāk no aprēķina — tas fiziski nevar rādīt ko citu, nekā ēd.

**Salabots pa ceļam:** 9. dienas makro (deklarēts 1325 kcal, makro deva 1617) · 1. dienas plācenīši
nebija atzīmēti kā 2 porcijas · avokado krita nepareizā veikala nodaļā (nebija katalogā) · alergēns
„seklas" bija receptēs, bet ne leģendā — tāpēc pazuda bez pēdas · pievienota selerija · iepakojumu
ieteikumi (vistas fileja 450 g → 800 g, kartupeļi 350 g → 1 kg) · dzeltenumu piezīme, lai olu
baltumu receptes neradītu izmešanu.

**Pārbaudīts:** `node build.mjs` 26 lapas, 0 neatpazītu sastāvdaļu · visi 74 iepirkumu produkti ir
katalogā, katalogā nav lieku · `node pdf.mjs` PDF pārģenerēts · `latviesu-valoda` check.py — 0
anglicismu (atzīmētie vārdi: kuskuss, tofu, muslis, čia u.c. — vārdnīcas robi, ne kļūdas) ·
lapu pārpildes pārbaude pārlūkā: nevienas.

**Jāapstiprina Ievai:**
- [ ] **Skaitļi tagad ir mani, ne viņas.** Visi 50 kcal un 10 dienu makro nāk no `uzturvertibas.mjs`
      tabulas (USDA + Latvijas ražotāju vidējie). Ieva to var pārbaudīt rindiņu pa rindiņai.
- [ ] **Vai 29/24/47 ir pieņemami**, vai gribam spiest tuvāk 28/22/50 — pēdējais nozīmē izņemt
      olu dzeltenumus, lasi vai avokado.
- [ ] Receptes, kur pievienota gaļa, mainīja raksturu: pildītā paprika un ķirbja krēmzupa vairs nav
      veģetāras. Aizstāšanas tabulā tas ir segts, bet Ievai jāapstiprina.

## 2026-08-01 — Sertifikāti atrasti un ielikti lapā + izkārtojuma otrā kārta

**Galvenais:** seši Ievas sertifikātu skenējumi ATRASTI `_TRASH/cleanup-2026-06-16/Ieva-arhivs/`.
Jūlija secinājums, ka tie „nekad nav eksistējuši", bija nepareizs — toreiz pārmeklēta tikai
`ieva-astro` mape un tās git vēsture, ne `_TRASH` arhīvs. `par-mani` teksta saraksts aizstāts
ar attēlu režģi (`.cert-grid`, 3 kolonnas, `object-fit: contain`, lai dokuments netiek apgriezts):

| Dokuments | Izdevējs | Gads |
|---|---|---|
| ITEC nutrioloģijā (Level 3 Diet and Nutrition, Merit) | iTEC / VTCT, **Ofqual regulēta kvalifikācija** | 2022 |
| C kategorijas sporta speciālists (fitness) | Latvijas Treneru tālākizglītības centrs | 2021 |
| Praktiskā nutrioloģija (kurss + eksāmens) | LMacademy | 2022 |
| Zarnu mikrobioma bioķīmija | Starptautiskais integratīvās nutrioloģijas institūts | 2022 |
| Uzturs un hormoni | GOGO school | — |
| Analīžu rādītāji uzturā | GOGO school | — |

**Privātums:** ITEC skenējumam aizmiglots Learner/Certificate Number bloks (sk. `LEMUMI.md`).

**Pārējie labojumi:** metodes soļos numuri kļuvuši mazi (mono 12 px), ikona lielāka — ikona ir
galvenā · principu sadaļā skaitļi izņemti pavisam · „Nodaļa 01/02/03" → tikai `Sākums`/`Izglītība`/`Šodiena` ·
Uztura ABC statistika pārtaisīta par trim baltām kartēm ar zelta augšmalu (mono-uppercase ar
garumzīmēm 10 px izmērā nebija salasāms) · sākumlapas BUJ foto pārbīdīts uz leju · bloga karte
dabūja citu foto, lai abas nav vienādas.

**Izņemts pēc Jāņa vērtējuma:** „Viena diena šķīvī" (sākumlapa) un „No sarunas līdz šķīvim" (par-mani).
Līdz ar to `.dayline`, `.photo-band`, `.abc-stats`, `.cert-list` un `.cert-layout` CSS izdzēsts kā miris kods.

**Pārbaudīts:** `npm run build` 25 lapas · `npm run check:images` 46 saites, **0 salauztas**
(t.sk. visi 6 sertifikāti) · sertifikātu kartes 358×268 px vienādas, 0 bojātu attēlu.

**Atlikums / izlemt Ievai:**
- [ ] **Vai rādīt visus sešus?** ITEC un LTTC ir formāli, regulēti dokumenti. Pārējie četri ir
      īsi tiešsaistes kursi ar dekoratīvu noformējumu (melns fons ar zīmētiem dārzeņiem). Blakus
      viens otram vājākie var mazināt spēcīgāko svaru. Alternatīva: rādīt divus formālos kā attēlus,
      pārējos kā teksta rindu zem tiem.
- [ ] Vai ITEC numurus atstāt aizmiglotus (šobrīd jā) vai rādīt.

## 2026-07-29 (vēls vakars) — Izkārtojuma labojumi pēc Jāņa atsauksmēm

Pirmā kārta ielika attēlus, bet vairākās vietās izkārtojums nederēja. Sešas lietas pārtaisītas:

| Kas nederēja | Kā izlabots |
|---|---|
| „Izmēģināts ir viss" — foto zem īsā teksta, puse sekcijas tukša | 3 kolonnas: teksts · foto **pilnā augstumā** · saraksts. Foto stiepjas tieši līdz saraksta apakšai (476 px = 476 px) |
| „Trīs soļi" — ikonas nejauki novietotas | Viss centrēts: SOLIS 01 → ikona (92 px disks) → virsraksts → teksts |
| Ēdiena fotojosla — „vispār neder, ļoti neloģiska" | Pārtaisīta par **`dayline`**: 4 bildes ar laiku, virsrakstu un paskaidrojumu. Sākumlapā „Viena diena šķīvī"; `par-mani` „No sarunas līdz šķīvim" |
| VIP banneris — tekstu grūti salasīt | Foto vairs nav režģa kolonna, bet 118 px sānu josla (`absolute`). Teksts atguva pilnu platumu |
| BUJ — par maz jautājumu izkārtojumam | 5 → **8 jautājumi** (teksts pārcelts no `kontakti.astro`, nekas nav izdomāts). Kolonnas 736 pret 722 px |
| `par-mani` un `uztura-abc` — vājš hero | Jauna vienota `.phero` sistēma: teksts + 3 faktu josla pa kreisi, attēls ar zelta maliņu un parakstu pa labi |

**Iztīrīts:** `.photo-band` / `.band-track` / `.band-cap` CSS (35 rindas) un `.abc-stats` CSS — vairs nekur netiek lietoti.

**Pārbaudīts:** `npm run build` 25 lapas · `npm run check:images` 0 salauztas · 1440 px un 375 px: 0 bojātu attēlu, 0 horizontālas pārplūdes. Nekas nav publicēts, nav commitots.

> ⚠️ **Pārlūka rīks neatveido lapas apakšu** (Playwright pilnas lapas uzņēmums pārtrūkst ap 10 000 px, un `.reveal` animācija vēl nav nostrādājusi). BUJ un kājene pārbaudītas ar DOM mērījumiem, ne vizuāli. Jānim jāapskata `npm run dev` pašam.

## 2026-07-29 (vakars) — Vizuālais slānis ieviests visās lapās + 6 salauztas bilžu saites salabotas

Ikonas un foto piesaistīti lapu blokiem (iepriekšējā ieraksta "nākamais UI darbs" — pabeigts).
Teksts nav dzēsts nekur; sākumlapas hero nav aiztikts.

**Salabots (bija salauzts pirms sesijas):** 6 bilžu saites uz izdzēstiem failiem — `ieva-krasaine-virtuve`,
`ieva-gramatuve`, `ieva-konsultacija-kafejnica`, `ieva-darza-maltite`, `ieva-vakara-virtuve`, `og-ieva.jpg`.
Pakalpojumu lapās rādījās tukši kvadrāti; visām lapām bez sava OG attēla soc. tīklos nebija priekšskatījuma.

**Attēlu bāze sakārtota:** 9 PNG (~2 MB katrs) → WebP + latviski SEO nosaukumi · 25 ikonas apgrieztas
un samazinātas uz 200 px (4–26 KB vietā 44–155 KB) · smagākie foto pārkodēti q78 · `og-ieva.webp` 1200×630
uzģenerēts. Kopā `public/assets/images/`: **23 MB → 4,7 MB**.

**Kur kas ielikts:**
- `index.astro` — 4 vērtību ikonas (SVG vietā) · foto stakes un BUJ kolonnās · pārklājošs foto guide blokā ·
  krēma diska ikonas tumšajā "Trīs soļi" sekcijā · **jauna pilna platuma fotojosla** starp plānu un pakalpojumiem ·
  foto VIP bannerī · ceļveža vāks lead-magnet formā.
- `par-mani.astro` — foto empātijas un sertifikātu sekcijās · ikonas 5 metodes soļos un 3 principos · fotojosla pirms noslēguma.
- `uztura-abc.astro` — 6 kategoriju ikonas (Lucide SVG izdzēsti kā miris kods).
- `pakalpojumi.astro` + 4 apakšlapas — salabotas bildes · ikonas visos "kā notiek" soļos.
- `kontakti.astro`, `blog/index.astro` — foto teksta kolonnās.
- `globals.css` — jauna sadaļa "ZĪMOLA IKONAS UN FOTO BLOKI": `.bicon`, `.bicon-disc`, `.side-photo`,
  `.photo-stack`, `.photo-band` (+ `prefers-reduced-motion`, mobilais horizontālais ritinājums).

**Pārbaudīts:** `npm run build` 25 lapas bez kļūdām · skripts pār `src/` — **0 salauztas saites**
(3 atlikušie treāfieni ir koda komentāros par vēl netaisītām infografikām) · pārlūkā 1440 px un 375 px:
0 bojātu attēlu, 0 horizontālas pārplūdes, 0 konsoles kļūdu. Nekas nav publicēts.

**Atlikums no šīs sesijas:**
- [ ] **11 `*-ikona-ar-baltu-fonu.webp` netiek lietotas nekur** (tumšajā sekcijā izmantots CSS krēma disks
      ar caurspīdīgo ikonu — izskatās labāk). Izlemt: dzēst vai atstāt soc. tīkliem.
- [ ] Neizmantoti paliek arī `ieva-nutrition-1.webp` un `ieva-portrait.webp` (izgriezumi uz balta —
      neder `.side-photo` pilnajam kadram; der `.frame.cutout` blokiem).

## 2026-07-28 — `pakalpojumi` pārrakstīta + salaboti 20 bojāti attēli visā vietnē

Pakalpojumu hubs izgāja to pašu īsināšanas kārtu: H1 saīsināts, "sadarbības dziļums" izņemts (Ievas
iebildums), katra piedāvājuma apraksts kļuvis konkrēts (cik konsultāciju, kas iekļauts), dzimtes formas
noņemtas, `Service` schema papildināta ar cenām, un pievienota asinsanalīžu robežu atruna, kuras hubā nebija.

**Ceļā atradās lielāka problēma:** vietnē bija **20 bojāti attēli**. 13 no tiem bija Ievas foto, ko kāds
pēc sākotnējā commit izdzēsa no darba mapes — atgūti ar `git checkout` (sk. `LEMUMI.md`). Pārējie 7 ir
sertifikātu attēli, kas **nekad nav eksistējuši** — ne diskā, ne git vēsturē. Sertifikātu sadaļa `par-mani`
lapā pārtaisīta par teksta sarakstu, līdz Ieva atsūta skenējumus.

`npm run build` veiksmīgs (25 lapas). Visai `dist` mapei pārbaudīts katrs `src=""` pret failu sistēmu —
**nulle bojātu attēlu**. 1366 px un 390 px: viens H1, nulle pārplūdes. Latviešu skripts tīrs. Nekas nav publicēts.

> ⚠️ Iepriekšējā ieraksta (2026-07-25) apgalvojums "Izmantoti četri atšķirīgi reāli Ievas foto no esošās
> bibliotēkas" bija patiess rakstīšanas brīdī, bet faili vēlāk pazuda. Foto dzīvo TIKAI git.

## 2026-07-28 — Sākumlapa pārrakstīta pēc Ievas komentāriem

Visa `index.astro` teksta kārta pārstrādāta pēc balss sesijas ar Ievu (lēmumi `LEMUMI.md`).
Galvenais: noņemts "tievēšanas karuselis", jauns H1 "Kļūsti par sava ķermeņa ekspertu", teksts saīsināts
un atbrīvots no poētikas, vārdi "nosaka" un "sistēma" nomainīti. Atsauksmju sadaļa dzēsta pilnībā
(arī tās CSS). Uzticības josla pārtaisīta bez 01–04 numuriem, ar lielākiem rādītājiem. Pakalpojumu režģī
pievienota trūkstošā 30 dienu programma — tagad 49 € / 249 € / 549 €, katra ar 5–6 punktiem; VIP pārcelts uz
rindu zem režģa. BUJ: izņemts rezultātu laika solījums, pievienoti jautājumi par mīļākajiem ēdieniem un
asinsanalīzēm, kā arī redzama atruna "Neesmu ārste". "Godīga saruna" teksta bloks aizstāts ar divām
attēlu kartēm uz Uztura ABC un blogu. Noslēguma CTA saīsināts līdz vienai pogai.

`npm run build` veiksmīgs (25 lapas). Pārbaudīts lokāli 1366 px un 390 px: viens H1, nav horizontālas
pārplūdes, nav bojātu attēlu. Latviešu valodas skripts — tīrs (tikai īpašvārdi). Nekas nav publicēts.

**Atlikums no šīs sesijas:**
- `pakalpojumi.astro` teksts vēl nav izgājis to pašu īsināšanas kārtu.
- Bezmaksas ceļvedis "5 uztura kļūdas" joprojām neeksistē, bet sākumlapa uz to ved divās vietās.
- Publiskā e-pasta adrese kodā ir `info@`, bet `LEMUMI.md` (2026-07-28) nosaka `ieva@` — jāsaskaņo.

## 2026-07-28 — `par-mani` pārrakstīta (satura kļūdas, ne tikai stils)

Lapa izgāja to pašu īsināšanas kārtu, bet ceļā atradās trīs lietas, kas nebija stila jautājumi
(detaļas `LEMUMI.md`): asinsanalīzes bija aprakstītas ar aizliegto vārdu "interpretācija" un konkrētu
rādītāju uzskaitījumu; teksts apgalvoja, ka analīzes ir tikai VIP paketē un ka atbalsts notiek "2 nedēļas
vai mēnesis pa e-pastu" — abi nesakrita ar apstiprinātajiem piedāvājumiem; visa lapa bija sieviešu dzimtes
formās pretrunā ar 2026-06-10 lēmumu par paplašinātu auditoriju. Papildus: H1 saīsināts, izņemts nepamatotais
"80 % no vienādojuma", izmesta "es mācu makšķerēt" klišeja, un pēdējā "viss bez maksas" sadaļa aizstāta ar
to pašu robežu, kas sākumlapā. Noslēguma CTA saīsināts līdz vienai pogai.

`npm run build` veiksmīgs (25 lapas). Pārbaudīts 1366 px un 390 px: viens H1, septiņi sertifikāti ielādējas,
nulle horizontālās pārplūdes. Latviešu skripts — tīrs. Nekas nav publicēts.

## 2026-07-28 — Palaišanas plāns nolemts, izpilde vēl nav sākta

Pārrunāta un apstiprināta visa palaišanas arhitektūra (detaļas `LEMUMI.md`): Cloudflare Pages hostings,
Systeme.io kā vienīgais komerciālais slānis, Stripe uz Ievas pašnodarbinātās vārda, Zoho personīgajam pastam.
Domēns `ievajekabsone.lv` rezervēts. Kodā nekas nav mainīts, nekas nav publicēts.

**Darāmais secībā:**

1. Domēna nameserveri → Cloudflare; pievienot domēnu Cloudflare kontā (DNS izplatīšanās 24–48 h).
2. Cloudflare Email Routing ieslēgt uzreiz (pāradresācija uz Gmail), lai neviena vēstule nepazūd.
3. `ieva-astro` → privāts GitHub repo → Cloudflare Pages projekts (`ai-projects/` pati nav repo).
4. Astro lapa pabeigta un publicēta uz `ievajekabsone.lv`.
5. Uzrakstīt trīs juridiskās lapas latviski: lietošanas noteikumi, privātuma politika, **atteikuma politika**
   (digitālie produkti un konsultācijas atsevišķi). Caur `latviesu-valoda` skill. Pēc tam juristam/grāmatvedei.
6. Palaišanas rīki: Google Search Console, sitemap, robots.txt, Cloudflare Web Analytics (bez sīkdatnēm →
   nevajag cookie banneri), Bing Webmaster (imports no GSC), 404, favicon, OG attēli, Google Business Profile.
7. Zoho Mail konts → `ieva@ievajekabsone.lv`; MX/SPF/DKIM Cloudflare DNS.
8. Systeme.io konts. **Vispirms pārbaudīt: vai bezmaksas plāns atļauj savu domēnu checkout lapām**,
   kontaktu limitu, kursu/piltuvju skaitu, automatizāciju skaitu.
9. Stripe konts uz Ievas vārda (pase/eID, personas kods, IBAN, lapas URL) → savienot ar Systeme →
   testēt pilnu pirkumu test mode.
10. Pirmais produkts publiski: 49 € sākuma konsultācija. Pārējie produkti tikai pēc tam.

**Bloķētāji:** Stripe verifikācija neies cauri, kamēr lapa nav publiska ar juridiskajām sadaļām (5. solis
pirms 9.). Grāmatvedes apstiprinājums par PVN/OSS un NACE kodu pirms pirmās pārdošanas.

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
- [x] **4. SEO meta visām lapām** — ✅ **PABEIGTS 2026-07-28.** On-page audits + labojumi visām 23 lapām (sk. `strategija/seo/03-OnPage.md`): 8 H1 papildināti ar atslēgvārdu, visām 25 lapām `<title>` ≤ 60 rakstz. un meta description 70–160 rakstz., izveidota 404 lapa, `noindex` lapas izmestas no sitemap, emuāram pievienota prev/next navigācija + `BreadcrumbList`/`Blog` schema, `/paldies*` lapām pievienots canonical. **Atlikums: Uztura ABC kategoriju apraksti** (tie jau ir `uztura-abc.astro`, bet nav SEO auditēti).
- [x] **4b. Sanity CMS izņemts** — ✅ 2026-07-28 (Jāņa lēmums). Blogs = Markdown faili `src/content/blog/`, slugs obligāti ASCII. Noņemtas atkarības, `studio/` mape (540 MB), `.env` mainīgie. Nekas nepazuda — abi Sanity raksti jau bija Markdown failos.
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
- [ ] **`strategija/7-Majaslapas-Strategija.md`** — arhitektūra PAREIZA, bet ⚠️ tur rakstīts "Astro+Sanity+Systeme.io";
      **Sanity izņemts 2026-07-28** → lasi "Astro + Markdown + Systeme.io". Atlicis: "viss bez maksas" copy + produktu pārdošana jāsaskaņo.
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

- [ ] **Septiņu sertifikātu skenējumi vai foto** — `par-mani` lapā tie šobrīd ir tikai teksta saraksts
- [ ] Konkrētās biežās frāzes, ko viņa lieto
- [ ] Kādi zīmoli/speciālisti viņai patīk vai kaitina
- [ ] Sociālo mediju stila virziens (atlikts uz vēlāk)
