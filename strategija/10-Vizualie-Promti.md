# Vizuālie prompti — Ievas zīmola attēli

Kopējama promptu bibliotēka produktu vākiem, publikācijām un lapai.
Neviens cits fails šo nesatur: `ieva.brand.json` ir konfigurācija, `ieva-astro/CLAUDE.md` ir
noteikumi, bet gatavu promptu tekstu, ko iemest ģeneratorā, līdz šim nebija.

---

## Pirms sāc — četri noteikumi, kas izšķir rezultātu

**1. Prompti ir angliski, apzināti.** Attēlu modeļi ir trenēti angliski. Latviešu prompts dod
manāmi sliktāku rezultātu. Dokuments ir latviski, prompti — angliski.

**2. Attēlā NEKAD nav teksta.** Katrā promptā ir `no text, no letters, no numbers`. Iemesls:
neviens modelis nepareizi neuzraksta „ēdienreižu" vai „šķīvis" — garumzīmes sagrozās, un
sanāk viltus latviešu valoda. Tekstu uzliekam pēc tam ar SVG (`scripts/generate-infographic.mjs`),
kā jau darām rakstu infografikām.

**3. Tukšā vieta ir jāpasūta.** Ja neprasīsi tukšu vietu virsrakstam, modelis piepildīs kadru
no malas līdz malai un teksts būs jāliek uz ēdiena. Katrā vāka promptā ir norādīts, kura kadra
daļa paliek tukša.

**4. ChatGPT nav labākais rīks šim.** Projektā jau ir `npm run gen:image` ar Nano Banana Pro
(`google/gemini-3-pro-image-preview`), kas fotoreālistisku ēdienu taisa labāk un ātrāk nekā
ChatGPT attēlu modelis. Šie prompti der abiem — bet, ja rezultāts ChatGPT ir plastmasīgs,
tā nav prompta vaina.

---

## Bāzes formula — no šīs izriet viss pārējais

Iemācies šo vienu, un pārējos vari uztaisīt pats. Aizvieto tikai `[SASTĀVDAĻAS]` un `[PALETE]`.

```
Overhead flat-lay food photograph. [SASTĀVDAĻAS], arranged naturally in the lower third
of the frame. The upper two-thirds is completely empty warm linen tablecloth — clean
negative space, nothing on it.

Soft natural window light from the left, gentle realistic shadows, shallow depth of field.
Muted warm palette: [PALETE]. Editorial magazine quality, premium but honest, appetizing,
styled without looking staged.

No people, no hands, no text, no letters, no numbers, no labels, no packaging, no logos,
no branding, no cutlery arranged in patterns.

Photorealistic, natural food textures, 2:3 vertical composition.
```

**Kāpēc tieši šī formula:** vienāds kadra leņķis + vienāds galds + vienāda gaisma = trīs vāki,
kas izskatās pēc **vienas sērijas**, ne pēc trim skaistām bildēm. Tā ir atšķirība starp zīmolu
un stoka attēlu kolekciju.

---

## 1 · Trīs produktu vāki

Visiem trim: **2:3 vertikāli** (A4 proporcija), ēdiens apakšā, tukšums augšā virsrakstam.

### 1.1 Pamata plāns — „Uzturs 10 dienām"

```
Overhead flat-lay food photograph. Rolled oats in a ceramic bowl, fresh cottage cheese,
two brown eggs, a red apple, a few walnuts, a slice of dark Latvian rye bread, a small
bunch of dill, one raw chicken fillet on parchment, a beetroot and a carrot — arranged
naturally in the lower third of the frame. The upper two-thirds is completely empty warm
linen tablecloth — clean negative space, nothing on it.

Soft natural window light from the left, gentle realistic shadows, shallow depth of field.
Muted warm palette: cream, oatmeal beige, deep burgundy and muted gold accents.
Editorial magazine quality, premium but honest, appetizing, styled without looking staged.

No people, no hands, no text, no letters, no numbers, no labels, no packaging, no logos,
no branding.

Photorealistic, natural food textures, 2:3 vertical composition.
```

### 1.2 Vasaras plāns

Atšķirība: gaišāks, vairāk zaļa un sarkana, sajūta par karstu dienu — bet **tas pats galds
un tā pati gaisma**, lai sērija turas kopā.

```
Overhead flat-lay food photograph. Fresh strawberries, sliced cucumber, ripe tomatoes on
the vine, a bunch of dill and spring onion, small new potatoes, radishes, a bowl of cold
kefir soup, a peach cut in half, crisp lettuce leaves — arranged naturally in the lower
third of the frame. The upper two-thirds is completely empty warm linen tablecloth — clean
negative space, nothing on it.

Bright soft natural window light from the left, gentle realistic shadows, shallow depth of
field, a feeling of a warm summer morning. Muted warm palette with fresh green and soft
red accents, cream linen background, no oversaturation.

No people, no hands, no text, no letters, no numbers, no labels, no packaging, no logos,
no branding.

Photorealistic, natural food textures, 2:3 vertical composition.
```

### 1.3 Vegānais plāns

Atšķirība: zemes toņi, pākšaugi, sēklas, zaļumi. Nekādu „aizvietotāju" produktu iepakojumā —
tas nesaskan ar Ievas anti-modes nostāju.

```
Overhead flat-lay food photograph. Red lentils and chickpeas in small ceramic bowls, firm
tofu cubes, buckwheat groats, pumpkin seeds and sunflower seeds, half an avocado, curly
kale leaves, a sweet potato, cherry tomatoes, fresh parsley — arranged naturally in the
lower third of the frame. The upper two-thirds is completely empty warm linen tablecloth —
clean negative space, nothing on it.

Soft natural window light from the left, gentle realistic shadows, shallow depth of field.
Muted warm palette: earthy greens, terracotta, oatmeal beige and muted gold, on cream linen.
Editorial magazine quality, premium but honest, appetizing, wholesome, not "vegan marketing".

No people, no hands, no text, no letters, no numbers, no labels, no packaging, no logos,
no branding, no meat substitutes in packaging.

Photorealistic, natural food textures, 2:3 vertical composition.
```

> **Pēc ģenerēšanas:** vāka virsrakstu uzliek `build.mjs` (teksts jau ir kodā). Foto liec kā
> fonu ar tumšu plūmju gradientu augšā, lai krēma teksts paliek salasāms — tāpat kā rakstu
> `.ip-cover` blokos.

---

## 2 · Sociālie tīkli

### 2.1 Instagram ieraksts — ēdiena kadrs (4:5)

```
Overhead flat-lay food photograph. A single balanced meal on a plain ceramic plate:
grilled chicken fillet, buckwheat, roasted vegetables and a small side salad. Warm linen
tablecloth, one linen napkin, a glass of water. Soft natural window light from the left,
shallow depth of field, muted warm palette of cream, beige and burgundy.

No people, no hands, no text, no letters, no numbers, no logos.
Photorealistic, editorial magazine quality, 4:5 vertical.
```

### 2.2 Instagram karuselis — vienkrāsains fons ar vietu tekstam (4:5)

Šis ir darba zirgs: uz tā liec tekstu ar savu fontu, un visi slaidi izskatās vienādi.

```
Minimal abstract background. Warm cream linen texture, very soft natural light gradient
from the top left, a single subtle deep burgundy brush stroke in the lower right corner
and one thin gold hairline. Extremely simple, mostly empty, calm.

No objects, no food, no people, no text, no letters, no numbers, no logos, no patterns.
Flat lighting, high resolution, 4:5 vertical.
```

### 2.3 Stāsts / Reels fons (9:16)

```
Vertical minimal background. Deep plum and burgundy soft gradient with a faint warm linen
texture, one thin gold hairline arc in the lower third, subtle vignette. Calm, premium,
lots of empty space in the middle for text.

No objects, no people, no text, no letters, no numbers, no logos.
High resolution, 9:16 vertical.
```

### 2.4 Sastāvdaļu tuvplāns — „viena produkta portrets"

Der visam: olbaltumvielām, taukiem, šķiedrvielām. Aizvieto tikai produktu.

```
Close-up overhead photograph of [PRODUKTS] on a warm cream linen surface, arranged in a
small loose pile slightly off-centre to the right, the left half of the frame completely
empty for text. Soft natural window light from the left, visible natural texture, shallow
depth of field, muted warm palette.

No people, no hands, no text, no letters, no numbers, no labels, no packaging, no logos.
Photorealistic, editorial quality, 4:5 vertical.
```

Piemēri `[PRODUKTS]` vietā: `raw almonds`, `red lentils`, `rolled oats`, `pumpkin seeds`,
`fresh cottage cheese in a ceramic bowl`, `a whole salmon fillet`, `brown eggs`.

---

## 3 · Rakstiem un lapai

### 3.1 Raksta hero (16:9 vai 2:1)

```
Wide overhead flat-lay food photograph about [TĒMA]. [SASTĀVDAĻAS] spread evenly across a
warm linen tablecloth with generous space between the items. Soft natural window light,
shallow depth of field, muted warm palette of cream, beige, soft green and burgundy.

No people, no hands, no text, no letters, no numbers, no labels, no packaging, no logos.
Photorealistic, editorial magazine quality, 2:1 horizontal.
```

### 3.2 Infografikas fons — ēdiens vienā pusē (4:3)

Tieši tas, ko prasa `gen:infographic` konveijers: foto vienā pusē, otra tukša tekstam.

```
Overhead flat-lay food photograph. [SASTĀVDAĻAS] arranged only on the RIGHT half of the
frame. The LEFT half is a completely clean, empty warm linen table surface — pure negative
space for text, nothing on it at all.

Soft natural window light, shallow depth of field, muted warm palette of cream, beige and
burgundy. No people, no hands, no text, no letters, no numbers, no labels, no logos.
Photorealistic, editorial magazine quality, 4:3 horizontal.
```

> Puses maina ar `--side left|right`. Ja teksts būs pa kreisi, ēdiens jāprasa pa labi.

### 3.3 Sekcijas fons lapai — gandrīz tukšs

```
Very subtle background texture. Warm cream linen fabric, soft even natural light, an
extremely faint gold hairline running horizontally in the lower third. Almost empty,
quiet, unobtrusive — meant to sit behind text.

No objects, no food, no people, no text, no letters, no numbers, no logos.
High resolution, 3:1 horizontal.
```

---

## 4 · Ko NEprasīt

Šie ir tie paši, kas visus uztura zīmolus padara vienādus. Ievas pozīcija ir „māca, ne pārdod" —
un šie attēli pārdod:

| Neprasi | Kāpēc |
|---|---|
| Mērlentas, svarus, „pirms/pēc" | Ieva nestrādā ar ātru rezultātu un ķermeņa kaunināšanu |
| Cilvēkus ar perfektiem ķermeņiem sporta drēbēs | Nesaskan ar „kļūsti par sava ķermeņa ekspertu" |
| Neona zaļu smūtiju, superfood pulverus | Anti-modes nostāja |
| Zāļu tabletes, uztura bagātinātāju burciņas | Ieva nepārdod bagātinātājus |
| Tekstu attēlā | Garumzīmes sagrūst; tekstu liekam ar SVG |
| Pārspīlēti spilgtas krāsas, HDR | Palete ir klusināta un silta |

---

## 5 · Darba secība

1. **Ģenerē 3–4 variantus** vienam promptam, ne vienu. Pirmais reti ir labākais.
2. **Pārbaudi tukšo vietu** — vai virsraksts tur tiešām ietilps, vai ēdiens neieiet augšā.
3. **Pārbaudi sastāvdaļas** — modeļi mēdz pievienot to, ko neprasīji (piemēram, gaļu vegānajā).
4. **Konvertē uz WebP** un pārbaudi izmēru: hero zem 120 KB.
5. **Nosaukums keyword-rich un ASCII** — `10-dienu-uztura-plans-vasaras-vaks.webp`, ne `cover2.webp`.
6. **Alt teksts 1–3 teikumi** ar Ievas vārdu un domēnu — Google Images ir bezmaksas trafiks.

---

## 6 · Ātrā atsauce — zīmola krāsas promptam

Ja gribi krāsu nosaukt precīzi, lieto vārdus, ne HEX (modeļi HEX ignorē):

| Krāsa | HEX | Kā rakstīt promptā |
|---|---|---|
| Krēms | `#fcfbf7` | `warm cream, off-white linen` |
| Ziloņkauls | `#f0eee9` | `soft ivory` |
| Burgundijs | `#84183e` | `deep burgundy, wine red` |
| Plūme | `#3c1220` | `dark plum` |
| Zelts | `#ebc07e` | `muted gold, warm brass` |
| Tinte | `#2a1419` | `very dark warm brown-black` |
