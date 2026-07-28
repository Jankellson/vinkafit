# Sanity CMS + Analytics uzstādīšana

## ✅ Jau izdarīts automātiski
- Project ID: `cdmsq1y8` — konfigurēts `.env` un `studio/sanity.config.ts`
- CORS pievienots: `localhost:4321`, `ievajekabsone.lv`, `*.vercel.app`
- Shēma izvietota: `blogPost` + `testimonial`
- Studio live: **https://ieva-jekabsone.sanity.studio/**
- Abi blog raksti importēti un publicēti Sanity

---

## Tavs uzdevums: GA4 + Clarity (10 min)

Skatīt sadaļas 7 un 8 zemāk.

---

## 1. Sanity projekts

1. Atver **https://sanity.io** → "Start for free"
2. Izveido kontu (Google login ir ātrākais)
3. Izveido jaunu projektu:
   - Project name: `Ieva Jekabsone`
   - Dataset: `production` (noklusējums)
4. Kopē **Project ID** — tas izskatās kā `abc12def`

## 2. Konfigurēt projektu

Atver failu `.env` šajā mapē (`ieva-astro/.env`) un nomainīt `placeholder`:

```
PUBLIC_SANITY_PROJECT_ID=abc12def   ← ieliec savu Project ID
PUBLIC_SANITY_DATASET=production
```

Tad atver `studio/sanity.config.ts` un nomainīt arī tur:
```ts
const PROJECT_ID = 'abc12def';  ← ieliec savu Project ID
```

## 3. Uzstādīt CORS (lai mājaslapa var lasīt datus)

Sanity.io/manage → sava projekta **API** → **CORS Origins** → Add origin:
- `http://localhost:4321` (development)
- `https://ievajekabsone.lv` (production)

## 4. Palaist Sanity Studio

```bash
cd studio
npm install      # tikai pirmo reizi
npm run dev      # palaiž studio uz http://localhost:3333
```

Pirmajā reizē tiks lūgts pieslēgties Sanity kontam.

Pēc pieslēgšanās: **http://localhost:3333** — tur ir redaktors.

## 5. Pievienot pirmos blog rakstus

Studio → 📝 Blog raksti → + New document

Pieejamie lauki:
- **Virsraksts** — automātiski ģenerē URL (slug)
- **Apraksts** — redzams Google meklētājā (120–160 simboli)
- **Saturs** — pilns teksts ar formatējumu
- **Vāka attēls** — ielādē tieši no datora
- **Melnraksts** — atzīmē ja vēl nav gatavs publicēšanai

## 6. Eksportēt Sanity Studio internetā (pēc izvēles)

Ja gribi redaktoru atvērt no jebkuras vietas (ne tikai lokāli):

```bash
cd studio
npm run deploy
```

Sanity piedāvās URL kā `ieva-jekabsone.sanity.studio` — tas ir bezmaksas hosting no Sanity puses.

## 7. Uzstādīt automātisku lapu atjaunošanu (Vercel webhook)

Lai lapa atjaunotos automātiski kad saglabā Sanity:

1. Vercel Dashboard → sava projekta **Settings** → **Git** → **Deploy Hooks**
2. Izveido jaunu hook ar nosaukumu `sanity-rebuild`
3. Kopē webhook URL (izskatās kā `https://api.vercel.com/v1/integrations/deploy/...`)
4. Sanity.io/manage → sava projekta **API** → **Webhooks** → Add webhook:
   - URL: ieliec Vercel webhook URL
   - Trigger on: `create`, `update`, `delete`
   - Dataset: `production`

Tagad: Ieva saglabā rakstu → Sanity nosūta webhook → Vercel rebuild → lapa atjaunojas ~60 sekundēs.

---

## Google Analytics 4

1. Atver **https://analytics.google.com**
2. Admin → Create Property → ievajekabsone.lv
3. Data Streams → Web → iegūsti **Measurement ID** (G-XXXXXXXXXX formāts)
4. Ieliec `.env` failā: `PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX`

---

## Microsoft Clarity (ieteicams — bezmaksas sesiju ieraksti + heatmaps)

1. Atver **https://clarity.microsoft.com**
2. Add new project → ievajekabsone.lv
3. Settings → iegūsti **Project ID** (8 simbolu kods)
4. Ieliec `.env` failā: `PUBLIC_CLARITY_PROJECT_ID=xxxxxxxx`

---

## Vercel uzstādīšana (production)

Pievienot `.env` vērtības arī Vercel:
- Vercel Dashboard → Settings → Environment Variables
- Pievienot visus 3 mainīgos (`PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_GA_MEASUREMENT_ID`, `PUBLIC_CLARITY_PROJECT_ID`)
