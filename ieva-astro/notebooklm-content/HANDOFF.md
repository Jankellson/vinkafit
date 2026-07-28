# NotebookLM Multimedia Workflow — Handoff

> **Status:** Sagaida Ievas Gmail piekļuvi auth solim.
> Kad piekļuve būs, izpildi šī faila soļus secīgi.

---

## Konteksts

- **Mērķis:** Šķīvja metodes rakstam pievienot NotebookLM ģenerētu video + 2 infografikas
- **Video uz YouTube:** Ievas kanāls, publicēt kā **Unlisted** (tikai mājaslapas apmeklētāji redz)
- **NotebookLM MCP CLI:** Jau uzstādīts šajā datorā (v0.6.12)
- **Sloti lapā:** Jau gatavi, gaida video ID + WebP failu ceļus

---

## Soļi kad būs Ievas Gmail piekļuve

### 1. Autentificē NotebookLM ar Ievas kontu

PowerShell:
```powershell
& "$env:APPDATA\Python\Python313\Scripts\nlm.exe" login
```

Atvērsies Chrome. Ielogojies ar **Ievas Gmail** (svarīgi — ne tava paša!).

### 2. Pārbaudi vai autentifikācija veiksmīga

```powershell
& "$env:APPDATA\Python\Python313\Scripts\nlm.exe" login --check
```

Vajadzētu redzēt: "Authenticated as ieva@..."

### 3. Pasaki Claude (manai sesijai) "turpini"

Es turpināšu automātiski:
1. Izveidošu NotebookLM notebook ("Šķīvja metode")
2. Augšupielādēšu avota failu: `notebooklm-content/skivja-metode-source.md`
3. Ģenerēšu video ar custom prompt no `PROMPTS.md`
4. Ģenerēšu 2 infografikas (galvenā + 5 kļūdas)
5. Lejupielādēšu rezultātus

### 4. Tu manuāli augšupielādē video uz YouTube

Es iedošu MP4 failu. Tu:
1. youtube.com → Upload
2. Visibility: **Unlisted**
3. Title: "Šķīvja metode — vienkāršs veids, kā plānot ēdienreizi"
4. Description: "Pilns raksts: https://ievajekabsone.lv/uztura-abc/skivja-metode"
5. Iedod man video ID (no URL pēc `v=`)

### 5. Es pabeidzu integrāciju

- Konvertēšu infografikas uz WebP
- Saglabāšu `/public/assets/images/`
- Atjaunoju `skivja-metode.astro` ar video ID + attēlu ceļiem
- Build + verify

---

## Gatavie faili šobrīd

```
ieva-astro/
├── notebooklm-content/
│   ├── skivja-metode-source.md     ← avots NotebookLM
│   ├── PROMPTS.md                  ← brand-pielāgoti prompti
│   └── HANDOFF.md                  ← šis fails
├── src/
│   ├── components/
│   │   ├── VideoEmbed.astro        ← YouTube lazy embed
│   │   └── Infographic.astro       ← attēlu bloks
│   └── pages/uztura-abc/
│       └── skivja-metode.astro     ← sloti: videoId, infographicMain, infographicMistakes
```

## Sloti lapā — kā tos aizpildīt

Failā `src/pages/uztura-abc/skivja-metode.astro` augšā:

```ts
const videoId: string | null      = null;  // ← šeit YouTube ID
const videoTitle: string          = '...';
const videoDuration: string       = '4:12';  // ← faktiskais video garums

const infographicMain: string | null = null;       // ← '/assets/images/skivja-metode-infografika-1.webp'
const infographicMistakes: string | null = null;   // ← '/assets/images/skivja-metode-infografika-2.webp'
```

Kad šie iestatīti — sloti automātiski parādās lapā.

---

## Piezīmes par YouTube Unlisted stratēģiju

- ✅ Video pieejams tikai ar tiešu saiti
- ✅ Neparādās YouTube meklēšanā
- ✅ Neparādās kanāla publiskajā sarakstā
- ✅ Var iebūvēt mājaslapā normāli
- ✅ Var dalīties ar saiti (mērķa cilvēkiem) bez SEO konkurences

Šī ir laba stratēģija sākumā — vēlāk, ja video labi strādā, var pārslēgt uz Public, lai YouTube algoritms arī palīdz.

---

## Ja kaut kas neiet kā plānots

1. `nlm doctor` — pārbauda visu sistēmu
2. `nlm login --check` — pārbauda auth
3. `nlm notebook list` — pārbauda vai redz notebookus
4. Ja problēmas — `nlm login --clear && nlm login` (reset + jauns login)
