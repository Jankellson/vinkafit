# 03 — ON-PAGE (per-lapa tracker + vietnes struktūra)

> Indekss: [00-INDEX.md](00-INDEX.md) · Atslēgvārdi → [02](02-Atslegvardi.md).
> **Metode (kā izpildīt):** `seo-article-writer/SKILL.md` STEP 7a (1kw→4 vietas) · `seo-growth-loop/PILLAR-ONPAGE.md`
> (ne-rakstu landing/pīlāru on-page) · `astro-builder` seo-checklist (meta/schema/CWV). Šeit = TIKAI Ievas piešķīrumi + statuss.

## Princips: 1 atslēgvārds → 4 vietas (katrai lapai)
(1) URL slug · (2) H1 sākums · (3) meta description pirmie ~10 vārdi · (4) 1. teikums. Viena lapa = viens primārais
atslēgvārds. ⚠️ Divas lapas NEDRĪKST mērķēt vienu atslēgvārdu (kanibalizācija).

## Per-lapa tracker

> Statuss: ✅ izdarīts / kārtībā · ❌ trūkst / jālabo · ⚠️ ir, bet vājš · — neattiecas.
> **Audits veikts 2026-07-28** (kods `src/`, salīdzināts ar `dist/`).
> **Labojumi izpildīti 2026-07-28** — visi 13 punkti (sarkanie, dzeltenie, zaļie). Build iet cauri, 25 lapas.
> Zemāk esošās tabulas rāda stāvokli **pirms** labošanas; izpildes atzīmes sk. faila beigās.

### ⚠️ Kur audits kļūdījās (konstatēts labošanas gaitā)

Trīs atradumi neizturēja pārbaudi kodā. Pierakstu godīgi, lai neviens uz tiem nebalstās:

| Audits apgalvoja | Patiesībā |
|---|---|
| `{totalArticles}` kļūda redzama arī `/uztura-abc` ievadteikumā | **Nē.** Ievadteikums ir JSX iekšpusē un renderējas pareizi ("55 raksti"). Bojāta bija **tikai** meta description. |
| `/pakalpojumi/90-dienu-uztura-programma` H1 ir bez atslēgvārda | **Nē.** H1 jau sākās ar "Individuāls uztura plāns" — tas ir tieši lapas primārais atslēgvārds. Labojamas bija 8 lapas, ne 9. |
| Sitemap satur tikai indeksējamās lapas | **Nē.** Sitemap iekļāva `/start`, `/paldies` un `/paldies-abonentam`, kurām ir `noindex` — pretrunīgs signāls Google. Salabots ar filtru `astro.config.mjs`. |

Papildus: audits pieļāva, ka pārāk garos `<title>` rada `SEOHead.astro`. **Īstais cēlonis** — septiņas Uztura ABC lapas piedēkli `" | Ieva Jēkabsone"` pielika pašas savā `title={...}` izsaukumā, tāpēc `SEOHead` loģika "ja satur Ieva, nepievieno" tās nepasargāja.

### ⚠️ Labojums iepriekšējam atradumam (AUDIT-BRIEF.md 3.2. sadaļa)

Uzdevuma aprakstā teikts, ka `/pakalpojumi` un četrām apakšlapām **trūkst** `Service`/`Offer` schema. **Tā nav taisnība.** Pārbaudīju kodā:
- `pakalpojumi.astro:15,18` — `@graph` ar 4× `Service` + `Offer` (viens katram pakalpojumam)
- `30-dienu-uztura-programma.astro:7,10`, `90-dienu-uztura-programma.astro:7,10`, `sakuma-konsultacija.astro:5`, `vip-uztura-atbalsts.astro:5` — katrai savs `Service`+`Offer` ar pareizu `price`/`priceCurrency`/`url`

Visām piecām pakalpojumu lapām `Service`+`Offer` schema **ir klāt un pareiza**. Iepriekšējā meklēšana, kas uzskaitīja "reāli lietotos tipus", acīmredzot nepamanīja ligzdotos `@graph` ierakstus. Šo atradumu no saraksta var svītrot.

### Esošās lapas (zīmola / komerciālās) — 9 lapas

| Lapa | Prim. kw | Slug | H1 kw | Meta kw+garums | 1.teik kw | Title | Schema | Canonical |
|---|---|---|---|---|---|---|---|---|
| `/` | uztura konsultante + USP | ✅ | ❌ nav kw | ❌ kw nav pirmajos 10 vārdos (157 rakstz., OK garums) | ❌ nav kw | ⚠️ 43 rakstz. (īss), kw ne priekšā | ✅ Person+LocalBusiness+FAQPage | ✅ |
| `/par-mani` | Ieva Jēkabsone uztura konsultante | ✅ | ❌ nav kw | ⚠️ kw ne priekšā, 172 rakstz. (par garš, Google apcirps) | ✅ "Ieva Jēkabsone — ITEC sertificēta..." | ⚠️ 45 rakstz., kw ne priekšā | ✅ ProfilePage+Person+Credential×5 | ✅ |
| `/pakalpojumi` | individuāls uztura plāns / konsultācija | ✅ | ❌ nav kw | ⚠️ tuvu, bet ne precīzā formā (133 rakstz., garums labs) | ⚠️ tuvu ("Sākam ar tavu situāciju"), ne precīzā formā | ❌ 35 rakstz. — par īss un vispārīgs | ✅ 4× Service+Offer (sk. labojumu augstāk) | ✅ |
| `/kontakti` | uztura konsultācija rīga (online) | ❌ nav "rīga"/"online" slugā | ❌ nav kw | ⚠️ kw daļēji, 91 rakstz. (par īss) | ❌ nav kw | ⚠️ 45 rakstz. | ✅ ContactPage+Person | ✅ |
| `/start` | — (bezmaksas ceļvedis, nav SEO mērķis) | — | — | — | — | — | — | ✅ (un **noindex** uzlikts pareizi) |
| `/pakalpojumi/30-dienu-uztura-programma` | ❌ **nav piešķirts** failā `02-Atslegvardi.md` (tuvākais: "uztura plāns svara zaudēšanai") | ✅ | ❌ nav kw | ✅ tuvu (114 rakstz.) | ✅ tuvu | ✅ 55 rakstz. | ✅ Service+Offer | ✅ |
| `/pakalpojumi/90-dienu-uztura-programma` | ❌ **nav piešķirts** (tuvākais: "individuāls uztura plāns") | ✅ | ❌ nav kw | ✅ (129 rakstz.) | ⚠️ vispārīgs | ✅ 51 rakstz. | ✅ Service+Offer | ✅ |
| `/pakalpojumi/sakuma-konsultacija` | ❌ **nav piešķirts** | ✅ | ❌ nav kw | ✅ (135 rakstz.) | ⚠️ vispārīgs | ⚠️ 61 rakstz. (uz robežas) | ✅ Service+Offer | ✅ |
| `/pakalpojumi/vip-uztura-atbalsts` | ❌ **nav piešķirts** | ✅ | ❌ nav kw | ✅ (137 rakstz.) | ⚠️ vispārīgs | ✅ 56 rakstz. | ✅ Service+Offer | ✅ |

**Deviņas lapas ar H1 bez atslēgvārda** (brīfa 3.1. saraksts apstiprinās; te precizēts): `/`, `/par-mani`, `/pakalpojumi`, `/kontakti`, `/uztura-abc`, `30-dienu`, `90-dienu`, `sakuma-konsultacija`, `vip-uztura-atbalsts`. ⚠️ Esošos virsrakstus nemet ārā — risinājumu Jānis apstiprina atsevišķi (sk. brīfa 3.1).

### 🔴 Sistēmiska tehniska kļūda — pārāk gari `<title>` (iepriekš nepamanīta)

`SEOHead.astro` automātiski pievieno `" | Ieva Jēkabsone"` (16 rakstzīmes), **ja** virsrakstā vēl nav vārda "Ieva". Visām septiņām Uztura ABC lapām un abiem emuāra rakstiem sākotnējais virsraksts jau ir 58–73 rakstzīmes garš, tāpēc ar piedēkli faktiskais `<title>` sanāk **74–89 rakstzīmes** — krietni pāri Google apcirpuma robežai (~580 px jeb ~60 rakstzīmes). Skar lapas: `esanas-biezums`, `makrouzturvielas`, `nedelas-edienkarte`, `partikas-etiketes`, `skivja-metode`, `udens-daudzums`, `uztura-bogatinatajs`, `5-uztura-kludas`. Izņēmums ir `kapeec-svars-atgriežas` — 43 + 16 = 59 rakstzīmes, vēl pieņemami.

### Uztura ABC raksti (7 publicēti) — šeit četru vietu princips lielākoties ievērots

| Lapa | Prim. kw | Slug | H1 kw | Meta kw+garums | 1.teik kw | Title (sākotn.+piedēklis) | Schema | Canonical |
|---|---|---|---|---|---|---|---|---|
| `esanas-biezums` | ēšanas biežums | ✅ | ✅ | ✅ (147) | ✅ | ❌ 68+16=84 | ✅ Article+FAQPage(6)+Breadcrumb | ✅ |
| `makrouzturvielas` | makrouzturvielas | ✅ | ✅ | ✅ (141) | ✅ | ❌ 71+16=87 | ✅ Article+FAQPage(7)+Breadcrumb | ✅ |
| `nedelas-edienkarte` | nedēļas ēdienkarte | ✅ | ✅ | ❌ 175 (par garš) | ✅ | ❌ 71+16=87 | ✅ Article+FAQPage(6)+Breadcrumb | ✅ |
| `partikas-etiketes` | pārtikas etiķetes | ✅ | ✅ | ❌ 166 (par garš) | — nav pārbaudīts | ❌ 73+16=89 | ✅ (pēc parauga, atsevišķi nepārbaudīts) | ✅ |
| `skivja-metode` | šķīvja metode | ✅ | ✅ | ❌ 170 (par garš) | ✅ | ❌ 62+16=78 | ✅ Article+FAQPage(8)+Breadcrumb | ✅ |
| `udens-daudzums` | ūdens daudzums dienā | ✅ | ✅ | ✅ (155) | ✅ | ❌ 72+16=88 | ✅ (pēc parauga, atsevišķi nepārbaudīts) | ✅ |
| `uztura-bogatinatajs` | uztura bagātinātāji | ✅ | ✅ | ❌ 178 (garākais no visiem) | ✅ | ❌ 59+16=75 | ✅ (pēc parauga, atsevišķi nepārbaudīts) | ✅ |

⚠️ **Svarīgi:** neviena no šīm septiņām tēmām (ēšanas biežums, makrouzturvielas, nedēļas ēdienkarte, etiķetes, šķīvja metode, ūdens, bagātinātāji) **nav minēta `02-Atslegvardi.md` prioritāšu sarakstā**. Tur pirmajās vietās ir "paaugstināts holesterīns", "homa indekss" un "insulīna rezistence" — nevienai no tām vēl nav uzrakstītas lapas. Publicētais saturs neatbilst dokumentētajām prioritātēm. Tā nav kļūda, bet to vērts paturēt prātā, izvēloties nākamo rakstu.

### `/uztura-abc/` (sākumlapa) — viena kļūda kodā

- **Kļūda:** meta description tekstā ir neaizvietots `{totalArticles}` — apstiprināts `dist/uztura-abc/index.html`, kur tas parādās burtiski ar figūriekavām: `"...{totalArticles} raksti, loģiska secība..."`. Tas pats redzams arī lapas ievadteikumā ("{totalArticles} raksti. 6 tēmas."). Cēlonis: vērtība ierakstīta kā parasts teksts, nevis kā Astro izteiksme.
- H1 ❌ bez atslēgvārda ("Viss, ko gribi zināt — vienā vietā").
- Schema `CollectionPage` ✅. Canonical ✅.

### Emuārs (3 lapas)

| Lapa | Slug ASCII | H1/Title kw | Meta (garums) | Schema | Canonical | Iekšējās saites |
|---|---|---|---|---|---|---|
| `/blog/` (saraksts) | ✅ | — (saraksta lapa) | ✅ (113) | ❌ **nav nekāda JSON-LD** | ✅ | ✅ (4 vietas) |
| `/blog/5-uztura-kludas` | ✅ | ✅ kw, bet ❌ title 62+16=78 rakstz. | ✅ (132) | ✅ Article (bez FAQPage/Breadcrumb — atšķiras no ABC lapām) | ✅ | ⚠️ tikai viena saite (`paldies-abonentam`) |
| `/blog/kapeec-svars-atgriežas` | ❌ **satur "ž" un drukas kļūdu "kapeec" → "kapec"** (apstiprināts baitu līmenī: `kapeec-svars-atgrie\xc5\xbeas`) | ✅ kw | ✅ (149) | ✅ Article | ✅ (ar burtisku "ž" adresē) | ❌ **neviena iekšēja saite** — atrodama tikai caur emuāra saraksta lapu |

⚠️ **Kanibalizācija:** `/blog/5-uztura-kludas` un `/start` mērķē uz **vienu un to pašu** frāzi "5 uztura kļūdas, ko sievietes 30–50 pieļauj". `/start` ir `noindex`, tāpēc Google rezultātos tās nesacenšas, tomēr viens un tas pats ceļveža saturs atkārtojas indeksētā un neindeksētā lapā.

### Juridiskās un servisa lapas (5) — pārbaudīts `noindex` un canonical (pēc brīfa 4. punkta)

| Lapa | Schema | Canonical | noindex | Piezīme |
|---|---|---|---|---|
| `/noteikumi` | ❌ nav (nav arī vajadzīga) | ✅ | ❌ **indeksēta** (varētu likt `noindex`, jo SEO vērtības nav; nav steidzami) | Meta 211 rakstz. — juridiskai lapai nav būtiski |
| `/privatums` | ❌ nav | ✅ | ❌ **indeksēta** | Meta 206 rakstz. — nav būtiski |
| `/paldies` | ❌ nav | ⚠️ **canonical nav norādīts tieši** — vienīgā lapa, kas paļaujas uz `Astro.url` automātisko vērtību | ✅ `noindex` pareizi | **Neviena iekšēja saite visā `src/`** — `kontakti.astro` forma uz šo lapu nepāradresē, tikai nomaina saturu turpat lapā |
| `/paldies-abonentam` | ❌ nav | ⚠️ tas pats — automātiskā vērtība | ✅ `noindex` pareizi | Sasniedzama tikai caur `window.location.href` no `start.astro` |

### Pārējie atradumi (brīfa 5. sadaļas saraksts par visu vietni)

```
✅ Sitemap satur tikai indeksējamās lapas (noindex lapas dist/ ir izslēgtas; sitemap ģenerē astrojs/sitemap)
❌ 404 lapas nav — nav ne src/pages/404.astro, ne maršruta dist/. Pārbaudīts ar glob.
⚠️ /paldies — uz to nenorāda neviena saite; teorētiski sasniedzama tikai tad, ja forma pāradresētu, ko tā pašlaik nedara
⚠️ /blog/kapeec-svars-atgriežas — uz to nenorāda neviena saite, tikai emuāra saraksta lapa
✅ Attēlu alt teksti ir klāt un jēgpilni gandrīz visur (/kontakti attēlu nav vispār; VIP lapa izmanto to pašu sākumlapas portretu, tikai ar citu alt tekstu)
```

### ✅ Piešķirtie primārie atslēgvārdi (izlemts 2026-07-28, labojumu punkts 6)

Katrai lapai viens atslēgvārds, bez pārklāšanās. Šis ir saistošais saraksts — jaunas lapas pret to jāpārbauda.

| Lapa | Primārais atslēgvārds | H1 pēc labojuma |
|---|---|---|
| `/` | uztura konsultante | "Uztura konsultante, kas palīdz izkāpt no tievēšanas karuseļa." |
| `/par-mani` | Ieva Jēkabsone uztura konsultante | "Ieva Jēkabsone — uztura konsultante, kas saprot ne tikai uzturu, bet arī tevi." |
| `/pakalpojumi` | uztura programmas un cenas | "Uztura programmas un cenas — nevis vēl viena diēta, bet plāns, kas iederas tavā ikdienā." |
| `/kontakti` | pieteikties uztura konsultācijai tiešsaistē | "Piesakies uztura konsultācijai tiešsaistē — sazināšos 24 stundu laikā." |
| `/uztura-abc` | uztura ABC | "Uztura ABC — viss, ko gribi zināt par uzturu, vienā vietā." |
| `.../30-dienu-uztura-programma` | uztura plāns svara zaudēšanai | "30 dienu uztura plāns svara zaudēšanai — lai beigtu minēt, ko ēst katru dienu." |
| `.../90-dienu-uztura-programma` | individuāls uztura plāns | (nemainīts — jau bija pareizs) |
| `.../sakuma-konsultacija` | uztura konsultācija | "Uztura konsultācija — saruna, kas iedod skaidru nākamo soli." |
| `.../vip-uztura-atbalsts` | VIP uztura atbalsts | "VIP uztura atbalsts — kad nevajag vēl vienu plānu, bet ātru atbalstu ikdienā." |

⚠️ Kanibalizācija novērsta apzināti: `/pakalpojumi` mērķē "programmas un cenas" (mezgla lapa), nevis "uztura konsultācija" — to mērķē `/sakuma-konsultacija`. `/kontakti` mērķē pieteikšanās nodomu, ne pašu pakalpojumu.

### Jaunās lapas (plānotas, sk. struktūru zemāk)

| Lapa (plāns) | Primārais atslēgvārds | Tips | Prioritāte |
|---|---|---|---|
| `/uztura-konsultacija-online` | uztura konsultācija online | landing | 🥈 |
| `/uztura-speciālists-[pilsēta]` (×N) | uztura speciālists [pilsēta] | service×city | 🥇 QUICK-WIN |
| `/produkti/10-dienu-uztura-plans` | 10 dienu uztura plāns | produkts | 🥇 (zīmola) |
| `/produkti/insulina-rezistences-edienkarte` | uztura plāns insulīna rezistencei | produkts | 🥇 diferenciators |
| `/atsauksmes` | Ieva Jēkabsone atsauksmes | reputācija | 🥈 |

### Uztura ABC raksti (on-page status)

> Publicēti (5): `skivja-metode`, `makrouzturvielas`, `partikas-etiketes`, `udens-daudzums`, `esanas-biezums`
> + (2026-06-14) `uztura-bogatinatajs`, `nedelas-edienkarte`. Katram: H1+kw · meta · tūlītēja atbilde ·
> H2 jautājumi · FAQ+schema · autora bio · CTA. Pilns saraksts + nākamie → [04-Saturs.md](04-Saturs.md).

## SOLIS 5 — Vietnes SEO struktūra (URL karte)

```
/ (Sākumlapa)        H1: primārais atslēgvārds + USP · Schema: Person + Service
                     (jau: "Zināšanas ir brīvas. Tava sistēma — tas ir darbs.")
/par-mani            E-E-A-T pierādījumi (ITEC, pieredze) · Schema: Person
/pakalpojumi/        cenas (Hormozi tier-i) · Schema: Service + Offer
  /uztura-konsultacija-online
  /uztura-konsultacija-riga
/produkti/           ⭐ Systeme.io checkout
  /10-dienu-uztura-plans (Produkts #1)
  /makro-gatavas-porcijas (Produkts #2)
  /asinsanalizu-celvedis (Produkts #5)
/uztura-abc/         55 informācijas lapas, hub-and-spoke (sk. [04](04-Saturs.md))
/atsauksmes/         Schema: Review (zvaigznītes!)
/kontakti/           Schema: LocalBusiness + Google Maps
/ru/                 hreflang; galvenās lapas obligāti krieviski
```

> Schema implementācija un tehniskais → [05-Tehniskais.md](05-Tehniskais.md). Lokālās lapas mērogā → skils `local-seo` (Part 4) + `seo-article-writer/templates/service-city.md`.

---

## Labojumi prioritātē (audits 2026-07-28) — ✅ VISI IZPILDĪTI 2026-07-28

> Visi 13 punkti izpildīti tajā pašā dienā. `npm run build` iet cauri: 25 lapas, bez kļūdām.
> Pārbaudīts uz `dist/`: visām 25 lapām `<title>` ≤ 60 rakstz. un meta description 70–160 rakstz.
> Papildus atrasti un saloboti divi punkti, kas auditā nebija (14. un 15. zemāk).

🔴 BLOĶĒ PALAIŠANU
1. **Nav 404 lapas.** Trūkst `src/pages/404.astro`. ⏱ 20 min · 🤖 Claude
2. **`/uztura-abc/` meta description kļūda** — `{totalArticles}` parādās burtiski, jo vērtība ierakstīta kā parasts teksts, nevis kā Astro izteiksme. Tas pats redzams lapas ievadteikumā. ⏱ 10 min · 🤖 Claude
3. **`kapeec-svars-atgriežas` adrese** — satur "ž" (nav ASCII) un drukas kļūdu ("kapeec" → "kapec"). Lapa vēl nav publiska, tāpēc var labot brīvi, 301 pāradresācija nav vajadzīga. ⏱ 15 min (pārsaukt failu, vēlāk pielabot atsauces) · 🤖 Claude

🟡 PIRMS PALAIŠANAS, JA PAGŪST
4. **Deviņas lapas ar H1 bez atslēgvārda** (`/`, `/par-mani`, `/pakalpojumi`, `/kontakti`, `/uztura-abc` un četras pakalpojumu apakšlapas) — no četrām atslēgvārda vietām aizpildītas tikai trīs. Esošie virsraksti ir labi, tāpēc tos nemet ārā, bet savieno ar atslēgvārdu. Variantus sagatavo nākamā sesija. ⏱ 1–2 h teksta darba · 🤖 Claude melnraksts + 👤 Jānis apstiprina
5. **Astoņām lapām `<title>` par garš** (septiņas Uztura ABC lapas un `5-uztura-kludas`) — sākotnējais virsraksts 58–73 rakstzīmes, kam `SEOHead.astro` pieliek `" | Ieva Jēkabsone"`, sanāk 74–89 rakstzīmes. Google to apcirps. Divi ceļi: saīsināt pašus virsrakstus līdz ~45 rakstzīmēm vai nepievienot piedēkli, ja virsraksts jau pārsniedz 50 rakstzīmes. ⏱ 45 min (loģika `SEOHead.astro` + astoņi virsraksti) · 🤖 Claude
6. **Četrām pakalpojumu apakšlapām nav piešķirts primārais atslēgvārds** failā `02-Atslegvardi.md` (30 dienu, 90 dienu, sākuma konsultācija, VIP). Saturs pats ir labs, trūkst tikai pieraksta. ⏱ 15 min · 👤 Jānis izlemj + 🤖 Claude ieraksta
7. **Četrām ABC lapām meta description par garš** (`nedelas-edienkarte` 175, `partikas-etiketes` 166, `skivja-metode` 170, `uztura-bogatinatajs` 178 rakstzīmes) — Google tos apcirps. ⏱ 20 min · 🤖 Claude
8. **`/kontakti` atslēgvārda nav ne adresē, ne H1, ne meta, ne pirmajā teikumā** — četru vietu ziņā vājākā no visām komerciālajām lapām. ⏱ 30 min · 🤖 Claude melnraksts + 👤 Jānis apstiprina

🟢 PĒC PALAIŠANAS
9. Uz `/blog/kapeec-svars-atgriežas` nenorāda neviena iekšēja saite, uz `/blog/5-uztura-kludas` — tikai viena. Pēc palaišanas pievienot saites no saistītajām ABC un emuāra lapām. ⏱ 20 min · 🤖 Claude
10. Emuāra saraksta lapai un rakstiem nav `BreadcrumbList` un `FAQPage` schema, lai gan ABC lapām tā ir. Apsvērt, vai vienādot. ⏱ 30 min · 🤖 Claude
11. `/noteikumi` un `/privatums` ir indeksētas, kaut SEO vērtības tām nav — apsvērt `noindex`. Nav steidzami. ⏱ 10 min · 👤 Jānis izlemj + 🤖 Claude izpilda
12. Uz `/paldies` nenorāda neviena saite (forma nepāradresē), un tā ir vienīgā lapa bez tieši norādīta canonical. Prioritāte zema — lapa ir `noindex` un darbībai netraucē. ⏱ 15 min · 🤖 Claude
13. `/blog/5-uztura-kludas` un `/start` mērķē uz vienu un to pašu frāzi "5 uztura kļūdas". `/start` ir `noindex`, tāpēc Google rezultātos risks nepastāv, tomēr to vērts atcerēties, veidojot jaunu saturu par šo tēmu. ⏱ — (tikai jāzina, darāmā nav)

---

### Izpildes atzīme (2026-07-28)

| # | Ko izdarīju | Kur |
|---|---|---|
| 1 | Izveidota 404 lapa, pārizmantoti esošie `.thanks-page` stili (jauns CSS nebija vajadzīgs) | `src/pages/404.astro` |
| 2 | `description` pārtaisīts par Astro izteiksmi; renderējas "55 raksti" | `uztura-abc.astro:155` |
| 3 | Fails pārsaukts uz ASCII, drukas kļūda labota | `kapec-svars-atgriezas.md` |
| 4 | 8 jauni H1 ar atslēgvārdu priekšā, āķis saglabāts | 8 lapas, sk. tabulu augstāk |
| 5 | `SEOHead` vairs nepieliek zīmola piedēkli, ja title pārsniegtu 60 rakstz.; 7 ABC lapām noņemts pašu pieliktais piedēklis; saīsināti 10 virsraksti | `SEOHead.astro` + 10 lapas |
| 6 | Piešķirti primārie atslēgvārdi visām 9 komerciālajām lapām | tabula augstāk |
| 7 | Saīsināti 6 par gari meta description (176→137, 173→129, 170→125, 167→113, 206→136, 204→129) | ABC + par-mani + juridiskās |
| 8 | `/kontakti` atslēgvārds ielikts H1 un title | `kontakti.astro` |
| 9 | Emuāra rakstiem pieslēgta prev/next navigācija — abi raksti tagad saistīti, bāreņlapu nav | `blog/[...slug].astro` |
| 10 | Rakstiem pievienots `BreadcrumbList`, emuāra sarakstam `Blog`+`BlogPosting` schema (agrāk nebija nekāda) | `blog/[...slug].astro`, `blog/index.astro` |
| 11 | **Lēmums: juridiskās lapas paliek indeksētas.** YMYL vietnei redzamas juridiskās lapas ir uzticamības signāls; `noindex` nedotu neko. Saīsināti tikai to meta description | `noteikumi.astro`, `privatums.astro` |
| 12 | Abām pateicības lapām pievienots tieši norādīts canonical | `paldies.astro`, `paldies-abonentam.astro` |
| 13 | Nekas nebija jādara — tikai jāzina | — |
| **14** | **Sitemap filtrs** — `noindex` lapas izmestas no sitemap (bija pretruna: sitemap saka "indeksē", meta saka "neindeksē"). Tagad 21 URL | `astro.config.mjs` |
| **15** | **Sanity CMS izņemts pilnībā** (Jāņa lēmums, sk. `../../LEMUMI.md`) — tas ģenerēja dublētu lapu ar veco slugu | sk. zemāk |

### Sanity CMS izņemšana (2026-07-28)

Slugu labošana atsedza, ka emuārs ņēma rakstus no **diviem avotiem** — Markdown failiem un Sanity CMS. Kad slugi vairs nesakrita, būvējās divas gandrīz identiskas lapas. Pārbaudīju Sanity saturu: tur bija tieši 2 raksti, un **abi jau eksistēja Markdown failos** — nekas unikāls nepazuda.

Noņemts: `src/lib/sanity.ts`, `src/lib/portableText.ts`, `studio/` mape (540 MB), atkarības `@sanity/client` un `@sanity/image-url`, `PUBLIC_SANITY_*` mainīgie no `.env`. Emuāra loģika abos failos vienkāršota uz vienu avotu.

**Sekas:** raksti tagad dzīvo tikai Markdown failos repo — versiju kontrolē, bez atsevišķas CMS pieteikšanās.
