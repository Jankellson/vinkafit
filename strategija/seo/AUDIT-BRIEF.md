---
type: task-brief
title: On-page SEO audits — ieva-astro
description: Izpildāms brīfs jaunai sesijai. Auditē visas 23 lapas, ieraksti rezultātu 03-OnPage.md.
updated: 2026-07-28
---

# AUDITA BRĪFS — Ievas lapa, on-page SEO

> **Kā palaist:** jaunā čatā ieraksti:
> `Izpildi Projekti/VinkaFit-Ieva/strategija/seo/AUDIT-BRIEF.md`

---

## 0. Konteksts (izlasi pirms sākt)

| | |
|---|---|
| **Klients** | Ieva Jēkabsone — uztura konsultante, sievietes 30–50, LV (+RU nākotnē) |
| **Projekts** | `Projekti/VinkaFit-Ieva/ieva-astro` — Astro 6 + Sanity + React |
| **Domēns** | `ievajekabsone.lv` — **vēl NAV dzīvs** (HTTP 000). Auditē KODU un `dist/`, ne tiešsaisti |
| **Statuss** | Pirms palaišanas. Nav hostinga, nav GSC datu |
| **Lapu skaits** | 23 |

**Metode NEDZĪVO šeit.** Lieto:
- `seo-strategy-router` **Step 5** — on-page audita čeklists (A–F sadaļas)
- `Skill-05-SEO-Strategija.md` **SOLIS 2** — kārtula "1 atslēgvārds → 4 vietas"
- `Skill-05` **SOLIS 7** — tehniskais čeklists
- `02-Atslegvardi.md` — **kuriem atslēgvārdiem** katrai lapai jāmērķē
- `03-OnPage.md` — esošie piešķīrumi + kur ierakstīt rezultātu

Neatkārto šo failu saturu. Atver un lieto.

---

## 1. ⛔ Stingrā kārtula

**AUDITĒ. NELABO.**

Šī sesija tikai konstatē un ieraksta. Nemaini nevienu `.astro` failu. Labošana ir atsevišķs solis, ko Jānis apstiprina pēc audita.

Ja atrodi kaut ko, kas izskatās pēc 5 sekunžu labojuma — **tāpat neaiztiec.** Ieraksti sarakstā.

---

## 2. Jau pārbaudīts — NEATKĀRTO

Šo es pārbaudīju 2026-07-28. Ir kārtībā:

| Lieta | Rezultāts |
|---|---|
| Build | ✅ 24 lapas, 11,4 s, bez kļūdām |
| `astro.config.mjs` | ✅ `site` iestatīts, `@astrojs/sitemap` aktīvs |
| `sitemap-index.xml` | ✅ ģenerējas |
| `robots.txt.ts` | ✅ dinamisks, norāda uz sitemap |
| `SEOHead.astro` | ✅ title, description, canonical, OG, Twitter, noindex, JSON-LD slots |
| GA4 | ✅ iebūvēts `BaseLayout.astro`, `anonymize_ip` |
| `.gitignore` | ✅ eksistē |

Sāc no 3. sadaļas.

---

## 3. Jau atrastie robi — APSTIPRINI un PAPLAŠINI

Šos es atradu virspusēji. Tavs uzdevums: apstiprināt kodā un **atrast pārējos**.

### 3.1 H1 bez atslēgvārda (apstiprināts 9 lapās)

Visi H1 ir emocionāli virsraksti bez primārā atslēgvārda → **krīt 2. vieta no 4** (Skill-05 SOLIS 2).

| Lapa | Tagadējais H1 |
|---|---|
| `/` | "Izkāp no tievēšanas karuseļa." |
| `/par-mani` | "Tu meklē kādu, kurš saprot ne tikai uzturu, bet arī tevi." |
| `/pakalpojumi` | "Nevis vēl viena diēta. Plāns, kas iederas tavā ikdienā." |
| `/kontakti` | "Aizpildi formu — sazināšos 24 stundu laikā." |
| `/uztura-abc` | "Viss, ko gribi zināt — vienā vietā." |
| 4× `/pakalpojumi/*` | visi emocionāli |

⚠️ **Šī kopija ir laba — to NEMET ārā.** Risinājums ir savienot abus:
`"Izkāp no tievēšanas karuseļa"` → `"Uztura konsultante, kas palīdz izkāpt no tievēšanas karuseļa"`
Auditā piedāvā katrai lapai **vienu** šādu variantu, kas satur atslēgvārdu UN saglabā āķi.

### 3.2 Service + Offer schema trūkst

`/pakalpojumi` + 4 apakšlapas rāda cenas, bet schema tipos NAV ne `Service`, ne `Offer`.
Reāli lietotie tipi: `Person`(20) `ListItem`(22) `Question`/`Answer`(10) `WebPage`(8) `FAQPage`(8) `BreadcrumbList`(8) `Article`(8) `EducationalOccupationalCredential`(5) `PostalAddress`(3) `ProfilePage` `Place` `LocalBusiness` `ContactPage` `CollectionPage`.

### 3.3 Nav 404 lapas

`src/pages/404.astro` neeksistē.

### 3.4 Slug ar ne-ASCII + drukas kļūdu

`/blog/kapeec-svars-atgriežas/` — divi defekti: **`ž`** URL slugā (jābūt ASCII) un **`kapeec`** (jābūt `kapec`).
⚠️ Ja labo — vajag 301. Bet lapa vēl nav dzīva, tāpēc labot var brīvi. Atzīmē to.

---

## 4. Ko auditēt — visas 23 lapas

### Komerciālās / zīmola (9)
```
/                                      /pakalpojumi/30-dienu-uztura-programma/
/par-mani/                             /pakalpojumi/90-dienu-uztura-programma/
/pakalpojumi/                          /pakalpojumi/sakuma-konsultacija/
/kontakti/                             /pakalpojumi/vip-uztura-atbalsts/
/start/
```

### Uztura ABC (8)
```
/uztura-abc/                           /uztura-abc/partikas-etiketes/
/uztura-abc/esanas-biezums/            /uztura-abc/skivja-metode/
/uztura-abc/makrouzturvielas/          /uztura-abc/udens-daudzums/
/uztura-abc/nedelas-edienkarte/        /uztura-abc/uztura-bogatinatajs/
```

### Blogs (3)
```
/blog/    /blog/5-uztura-kludas/    /blog/kapeec-svars-atgriežas/
```

### Juridiskās / servisa (3) — auditē tikai `noindex` un canonical
```
/noteikumi/    /privatums/    /paldies/    /paldies-abonentam/
```
> `/paldies*` lapām **vajadzētu būt `noindex`** — pārbaudi. Pateicības lapas Google indeksā ir robs.

---

## 5. Ko pārbaudīt katrai lapai

Aizpildi šo tabulu **katrai** lapai. Statuss: ✅ / ❌ / ⚠️ (ir, bet vājš).

| Lauks | Kritērijs |
|---|---|
| **Primārais kw** | Vai lapai piešķirts viens atslēgvārds? Ņem no `02-Atslegvardi.md`. Ja nav piešķirts — piedāvā |
| **1. URL slug** | Satur kw? ASCII? Bez garumzīmēm? |
| **2. H1** | Satur kw? **Tieši viens H1** lapā? |
| **3. Meta desc** | kw pirmajos ~10 vārdos? 150–160 rakstz.? Rakstīta kā reklāma, ne kopsavilkums? |
| **4. 1. teikums** | kw pirmajā body teikumā? |
| **Title** | kw priekšā? 50–60 rakstz.? |
| **H2 struktūra** | H2 kā jautājumi ("Kā…", "Kas…", "Kāpēc…")? Loģiska hierarhija H1→H2→H3 bez lēcieniem? |
| **Schema** | Pareizais tips lapai? Validējams? Atbilst tam, kas lapā REDZAMS? |
| **Canonical** | Pašatsauce, viens |
| **Kanibalizācija** | Vai kāda cita lapa mērķē to pašu kw? ⚠️ kritiski |
| **Iekšējās saites** | Vai lapa saņem saites? Vai anchor teksts ir kw-bagāts, ne "lasīt vairāk"? |
| **Attēli** | `alt` ar jēgu? Izmērs? |

### Papildus visai vietnei
```
□ Vai kāda lapa ir orphan (neviena iekšējā saite uz to)?
□ Vai kāda lapa ir dziļāk par 3 klikšķiem no sākumlapas?
□ Vai sitemap satur TIKAI indeksējamās lapas?
□ Vai kāds noindex ir nejauši palicis? (pārbaudi dist/, ne tikai src/)
□ Vai visām lapām ir OG attēls?
□ Vai LCP attēli optimizēti (WebP, izmērs)?
```

---

## 6. Kur ierakstīt rezultātu

**`strategija/seo/03-OnPage.md`** — aizpildi esošo per-lapa trackeri (tur šobrīd viss ir `❓`).
Neveido jaunu failu. Nepārraksti failu — aizpildi tabulas.

Beigās pievieno **prioritizētu labojumu sarakstu**, ne atradumu izgāztuvi:

```
### Labojumi prioritātē (audits 2026-07-28)

🔴 BLOĶĒ PALAIŠANU
1. …  (lapa · kas · kāpēc svarīgi)

🟡 PIRMS PALAIŠANAS, JA PAGŪST
2. …

🟢 PĒC PALAIŠANAS
3. …
```

Katram labojumam pievieno **aplēsi**, cik ilgi (⏱) un kas dara (🤖 Claude / 👤 Jānis / 🙋 Ieva).

---

## 7. Formāts atbildei čatā

Neizgāz visu tabulu čatā. Dod:
1. **Kopsavilkums 3 teikumos** — cik lapu tīras, cik ar robiem, kas ir sliktākais
2. **Top 5 labojumi** ar ietekmi
3. Norāde, ka pilnais rezultāts ir `03-OnPage.md`

---

## 8. Ko NEDARĪT

- ❌ Nelabo kodu
- ❌ Neveido jaunus `.md` failus (izņemot ierakstu `03-OnPage.md`)
- ❌ Neauditē tiešsaistē — domēns nav dzīvs, auditē `src/` un `dist/`
- ❌ Nepārraksti H1 kopiju bez atslēgvārda pievienošanas — **piedāvā**, Jānis apstiprina
- ❌ Neizmet emocionālo kopiju SEO dēļ. Abi der kopā
- ❌ Neapgalvo, ka kaut kas ir vai nav, neatverot failu. Ja saki "nav X" — pasaki, kur skatījies
