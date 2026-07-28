# 9 — Payload lokālais lab Ievai: AI → melnraksts → rediģēšana → preview

> **Statuss:** BŪVĒJAM. Tas ir lokāls izmēģinājums, nevis esošās Astro + Sanity vietnes migrācija.
> **Mērķis:** Jānis redz un izmēģina Payload admin paneli, blokus, preview un AI MCP plūsmu pirms arhitektūras lēmuma.
> **Pašreiz:** manuālais CMS slānis ir palaists; AI MCP un ārēja publicēšana vēl nav ieslēgti.

---

## 1. Hipotēze

Ja Payload dod AI tikai strukturētu piekļuvi atļautiem lapas blokiem, tad AI var izveidot lietojamu landing lapas **melnrakstu**, Ieva var to saprotami izlabot bez koda, un Jānis var to redzēt lokālā preview pirms jebkāda publicēšanas lēmuma. Rezultāts: Jānis var izmērīt, vai Payload ir patīkamāks un ātrāks par Sanity viņa reālajā darba veidā.

## 2. Viens prototipa scenārijs

**Pilot-lapa:** izdomāta demonstrācijas landing lapa ar testa saturu; tā nav vēl jāsaista ar reālu produktu vai checkout. Tēma: “7 dienu maltīšu ritma ceļvedis”. Tas dod pietiekami daudz teksta, attēlu un CTA, bet neprasa nepieejamos 10 dienu plāna avota failus.

1. Jānis iedod AI strukturētu briefu: auditorija, demonstrācijas piedāvājums, solījums, CTA, aizliegtie apgalvojumi un Ievas balss avots.
2. AI ar Payload MCP izveido lapu statusā **Melnraksts** tikai no atļautajiem blokiem.
3. Jānis un pēc tam Ieva ieiet Payload admin panelī, izlabo tekstu, maina attēlus un pārkārto atļautos blokus.
4. Jānis apskata lokālo preview, pārbauda latviešu valodu, uztura apgalvojumus, dizainu, SEO un CTA.
5. Jānis pārslēdz statusu uz **Apstiprināts testam** un pārliecinās, ka AI to pats nevar izdarīt.

## 3. P0 — kas obligāti jāuzbūvē

### 3.1. Tehniskā robeža

```text
Payload admin + API            → localhost:3000
Payload demonstrācijas preview → localhost:3000/preview/[slug]
SQLite                          → lokāla testa datubāze
Lokāla media mape               → testa attēli
```

Labs dzīvo izolētā `payload-lab` mapē Ievas projekta iekšienē; tas nekopē esošo vietni un tai nepieskaras. P0 nelieto Cloudflare, domēnu, Postgres, R2 vai īstus klientu datus.

### 3.2. Kolekcijas un globālie iestatījumi

| Tips | Vienums | P0 nolūks |
|---|---|---|
| Collection | `users` | Jānis = admin, Ieva = editor |
| Collection | `pages` | landing lapas, URL, statuss, bloki, SEO |
| Collection | `media` | attēli ar alt tekstu un kredītu/licences lauku |
| Global | `site-settings` | zīmola nosaukums, noklusējuma CTA, sociālie tīkli |
| Sistēma | `mcp-api-keys` | AI piekļuves atslēgas un precīzas atļaujas |

### 3.3. Atļautie lapas bloki

P0 blokiem jābūt pietiekamiem vienai produktu lapai, bet ne universālam page builder.

1. `hero` — virsraksts, apakšvirsraksts, hero attēls, viena CTA poga.
2. `text-with-image` — virsraksts, teksts, attēls, attēla novietojums.
3. `benefit-list` — 3–6 ieguvumi ar īsu aprakstu.
4. `what-you-get` — produkta saturs / piegādes veids.
5. `faq` — jautājums un atbilde.
6. `cta` — virsraksts, īss teksts, poga uz Systeme.io checkout vai e-pasta sarakstu.
7. `disclaimer` — uztura/veselības robeža un nepieciešamā juridiskā informācija.

AI drīkst izmantot tikai šos blokus. Ja vajag jaunu vizuālu ideju, tā ir koda izmaiņa, nevis brīva AI improvizācija produkcijā.

### 3.4. Lapas datu modelis

`pages` dokumentam:

```text
title
slug
status: draft | in_review | published
blocks[]
meta.title
meta.description
meta.ogImage
noIndex
lastReviewedBy
lastReviewedAt
```

### 3.5. Lomas un piekļuves

| Loma | Drīkst | Nedrīkst |
|---|---|---|
| Jānis / admin | viss, ieskaitot apstiprināšanu, lietotājus un MCP atslēgas | — |
| Ieva / editor | veidot un labot melnrakstus, augšupielādēt attēlus, sagatavot review | apstiprināt, mainīt lietotājus, AI atslēgas, globālos tehniskos iestatījumus |
| AI Content Agent | lasīt atļautos avotus; veidot un labot tikai `draft` lapas | dzēst, publicēt, mainīt media, lietotājus, cenas, maksājumus vai iestatījumus |

AI piekļuvei izmanto atsevišķu MCP API atslēgu ar `find`, `create`, `update` tikai `pages` kolekcijai. `delete` ir izslēgts. Payload hook papildus piespiež AI rakstīt statusā `draft`, pat ja pieprasījumā ir cits statuss.

### 3.6. Preview un apstiprināšana

- **Melnraksts:** eksistē tikai lokālajā SQLite datubāzē.
- **Preview:** `localhost` adrese, kas lasa konkrēto melnrakstu no Payload.
- **Apstiprināšana:** tikai Jāņa admin darbība maina statusu uz `in_review` vai `approved_for_test`.
- **Publicēšana:** P0 apzināti neeksistē.

## 4. AI briefa līgums

AI nesaņem komandu “uztaisi skaistu landing lapu”. Tas saņem šādu ievadi:

```text
Produkts:
Auditorija:
Problēma, ko produkts risina:
Piedāvājuma saturs:
Cena un CTA URL:
Apstiprinātie pierādījumi / avoti:
Ievas balss avots:
Aizliegtie medicīniskie vai pārdošanas apgalvojumi:
SEO galvenā frāze:
```

Atbilde ir Payload `pages` melnraksts ar atļautajiem blokiem, nevis gatavs HTML vai brīva koda maiņa.

## 5. P0 pieņemšanas kritēriji

- [ ] Codex vai Claude Code ar MCP spēj izveidot vienu `draft` lapu no atļautajiem blokiem.
- [ ] AI nevar publicēt vai dzēst lapu, pat ja tas mēģina.
- [ ] Ieva bez GitHub un koda var nomainīt tekstu, attēlu, CTA URL un FAQ.
- [ ] Jānis redz savu melnrakstu `localhost` preview adresē.
- [ ] Jānis vienīgais var apstiprināt lapu testam.
- [ ] Lapai ir title, meta description, OG attēls un alt teksti.
- [ ] Melnraksta un apstiprinātā testa versija nav savstarpēji sajaucamas.
- [ ] Tests neglabā uztura klientu veselības datus Payload datubāzē.

## 6. Apzināti ārpus P0

- Esošās 13 lapu Sanity vietnes migrācija.
- Cloudflare, domēns, produkcijas deploy, Postgres, R2 vai īstu kontu konfigurācija.
- Courses, maksājumi, checkout, e-pasta automatizācijas vai kopiena — to dara Systeme.io.
- AI automātiska publicēšana.
- Klienta čats, kurš tieši labo kodu vai GitHub.
- Vairāku klientu kopīga Payload instance.
- Brīvs drag-and-drop dizaina redaktors.
- Video ģenerēšana, sociālo tīklu automatizācija un pilns CRM.

## 7. Būves fāzes

### Fāze 0 — tehniskais spikes

1. Payload startē lokāli ar SQLite un vienu admin lietotāju.
2. Pārbauda admin paneli, media upload un vienu `pages` ierakstu.
3. Pārbauda Payload MCP ar tikai lasīšanas testatslēgu.

**Stop noteikums:** ja Payload lokāli neļauj ērti rediģēt blokus un redzēt preview vienā fokusētā izpētes vienībā, nepaplašina funkcijas un neiegulda hostingā.

### Fāze 1 — manuāls CMS prototips

1. `users`, `pages`, `media`, `site-settings`.
2. Septiņi P0 bloki un Payload Next demonstrācijas renderer.
3. Viena manuāli izveidota pilot-lapa.
4. Draft/publish lomas un preview.

### Fāze 2 — AI melnrakstu plūsma

1. Payload MCP ar atsevišķu AI atslēgu.
2. AI briefa validācija un `draft` piespiedu statuss.
3. Viens pilns AI → Ieva → Jānis cikls.

### Fāze 3 — izvērtēšana

1. Jānis izmēģina AI → draft → preview plūsmu vismaz divas reizes.
2. Ieva, ja pieejama, izdara trīs satura izmaiņas bez palīdzības.
3. Tikai tad tiek pieņemts lēmums: Payload, CloudCannon, Sanity vai cita pieeja reālajai vietnei.

## 8. Mērījumi

Prototips ir veiksmīgs, ja:

- viena jauna demonstrācijas landing lapa no briefa līdz preview top mazāk nekā 60 minūtēs;
- Jānis un, ja iespējams, Ieva bez palīdzības veic vismaz 3 satura izmaiņas;
- AI neizdara nevienu neatļautu apstiprināšanu vai dzēšanu;
- Jāņa review laiks ir līdz 20 minūtēm;
- Jānis pēc izmēģinājuma skaidri spēj pateikt, vai Payload admin panelis ir ērtāks par Sanity.

## 9. Lēmuma vārti pēc prototipa

**Turpinām ar Payload**, ja lokālā plūsma ir droša, admin panelis ir saprotams un jaunā lapa ir ātrāk uzbūvējama nekā pašreizējā Astro + Sanity plūsma.

**Neturpinām**, ja backend uzturēšana, preview vai AI piekļuves kontrole rada vairāk darba nekā ietaupa. Tad Client Website OS paliek Astro + CloudCannon vai Astro + Sanity atkarībā no klienta rediģēšanas vajadzības.
