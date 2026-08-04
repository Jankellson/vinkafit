# Kā mēs veidojam PDF produktus — metode, stils, lamatas

Šis ir nodošanas dokuments. Trīs produkti ir uzbūvēti; ar šo pietiek, lai uzbūvētu ceturto,
neatkārtojot nevienu no kļūdām, kas maksāja laiku.

Gatavi: `10-dienu-plans/`, `vasaras-plans/`, `veganais-plans/` (katrs 26 lapas) un
`5-kludas/` — bezmaksas ceļvedis, 9 lapas.

Divi ģeneratori, viens zīmols: `build.mjs` (uztura plāni, ar aprēķinu) un `build-celvedis.mjs`
(īsie ceļveži, bez aprēķina). Kopīgais — krāsas, fonti un drukas modelis — ir
`pamata-stils.mjs`, tāpēc visi pieci PDF izskatās pēc vienas sērijas.

---

## 1. Arhitektūra — viens dzinējs, trīs saturi

Dzinējs dzīvo `produkti/kopigais/` un ir **viens visiem produktiem**. Produkta mapē ir tikai
`data.mjs` un `dist/`. Tas nav skaistuma dēļ: trīs 800 rindu ģeneratora kopijas nozīmētu, ka
labojums vienā PDF klusi nenonāk pārējos divos.

| Fails | Kas tur dzīvo |
|---|---|
| `<produkts>/data.mjs` | **Saturs**: receptes, teksti, produktu katalogs, `product` konfigurācija (vāks, nosaukumi, meal-prep pāri). Ievas materiāls. |
| `kopigais/kopigie-teksti.mjs` | Teksti, kas visos trijos ir vienādi: Ievas pieeja, ieteikumi, atruna, alergēnu leģenda, veikala sadaļas, aizstāšanas pamatgrupas. |
| `kopigais/uzturvertibas.mjs` | **Atsauces dati un aprēķins**: uzturvērtības uz 100 g, parseris, makro, iepirkumu saraksts. |
| `kopigais/build.mjs` | **Dizains**: HTML + CSS ģenerators. |
| `kopigais/parbaude.mjs` | Automātiskās pārbaudes (7. sadaļa). Palaid pirms katras drukas. |
| `kopigais/fonti.mjs` → `fonti.css` | Zīmola fonti, iegulti kā base64. Palaid vienreiz. |
| `kopigais/pdf.mjs` | Drukā PDF ar Edge/Chrome headless. |

**Zelta likums: neviens skaitlis netiek rakstīts ar roku.** Kalorijas, dienas makro, iepirkumu
saraksts un pat lapu skaits — visi rēķinās no receptes `ing` teksta. Ja maini recepti, viss
pārējais mainās pats.

Kāpēc tas ir svarīgs: pirmajā versijā recepte, kaloriju skaitlis un iepirkumu saraksts dzīvoja
trijās vietās un lēnām aizgāja viens no otra. 9. dienā bija rakstīts 1325 kcal, bet makro deva
1617 — 22 % starpība, ko nekas nevar izskaidrot.

Palaiž no `produkti/`, norādot produkta mapi:

```bash
node kopigais/build.mjs vasaras-plans
```

```bash
node kopigais/parbaude.mjs vasaras-plans
```

```bash
node kopigais/pdf.mjs vasaras-plans
```

`node kopigais/fonti.mjs` palaiž tikai pirmoreiz vai mainot fontu sarakstu.

**Jauns produkts = viens fails.** Nokopē tuvāko `data.mjs`, pārraksti `product`, `copy`,
`days`, `catalog`, `pantry`. Neko citu neaiztiec.

---

## 2. Receptes datu modelis

```js
{ type: "vakarinas", title: "...", time: 20, a: ["piens","olas"],
  ing: "180 g biezpiens (0,5 %), 2 olas, 60 g rīsu vai auzu milti.",
  serve: "50 g svaigas ogas, 15 g grieķu jogurts.",   // piedeva VIENAI porcijai
  portions: 2,                                        // gatavo divām reizēm
  from: "9/pusdienas",                                // vakardienas pārpalikums
  steps: ["...", "..."] }
```

- **`portions: 2`** — visu `ing` dala uz pusēm.
- **`serve`** — to NEdala. Radās tāpēc, ka piedevas bija ierakstītas partijas sastāvā, un
  pārpalikuma dienā cilvēks neredzēja nevienu skaitli. Jānis to noķēra trīs reizes pēc kārtas.
- **`from`** — manto pusi no avota; šīs ēdienreizes `ing` skaitļi tiek pieskaitīti virsū.
- Neatpazīta sastāvdaļa **aptur būvi**. Tā ir iecere: labāk kļūda nekā kluss meli.

---

## 3. Skaitļu likumi (izcīnīti, ne izdomāti)

**Ogļhidrāti ir PILNIE (ar šķiedrvielām), kalorijas rēķina 4/9/4.** Lasītājs ar kalkulatoru ir
stiprākais pārbaudītājs — ja viņš pareizina gramus un iznāk cits skaitlis, viņš netic visam
dokumentam. Cena: šķiedrvielas skaitās pa 4 kcal/g, lai gan dod ap 2, tāpēc kaloriju skaitlis
ir ap 3 % lielāks nekā patiesībā. Virziens izvēlēts apzināti — deficīta plānā drošāk apēst
mazāk, nekā skaitlis sola.

**`KCAL_MAX = 1600` ir kods, ne piezīme.** Ja kāda diena pārsniedz, būve krīt ar kļūdu, kas
nosauc dienu un skaitli.

**Nevienā ēdienreizē zem 11 g olbaltumvielu.** Pārbaudi pēc katras izmaiņas.

**Precizitāte tikai tur, kur kļūda maksā:**
- Gramos: eļļa, rieksti, sēklas, riekstu sviests, avokado, sieri.
- Gabalos: augļi — „1 ābols", „½ banāns" (parseris saprot `½`). Neviens nesver pusi ābola.
- Ogas un vārītas bietes paliek gramos — tās neskaita gabalos.

**Zīmolus nenorāda**, izņemot, ja produkta veids tiešām atšķiras: biezpiens 0,5 %, liesākais
grieķu jogurts, kausētais siers **Dzintars Light** (7,5 % pret parastā 20 %). Maizei raksta
kritēriju („kvalitatīva, mazāk sāls"), jo cilvēks nepirks vienmēr vienu un to pašu, un zīmolu
atšķirības maina dienas kalorijas par mazāk nekā 1 %.

**Piena produktu tauku procenti jāraksta RECEPTĒ**, ne tikai iepirkumu sarakstā — citādi
virtuvē cilvēks nezina, ko aprēķins pieņēma.

---

## 4. Vizuālais stils

**Krāsas** (`ieva.brand.json`): burgundijs `#84183e`, plūme `#3c1220`, zelts `#ebc07e`,
krēms `#fcfbf7`, tinte `#2a1419`.

**Fonti — tie paši, kas mājaslapā:**
- Virsraksti: **Playfair Display** (vāka virsraksts — kursīvs, kā lapas `.display`)
- Pamatteksts: **Plus Jakarta Sans**
- **Alex Brush tikai parakstam un atsevišķiem akcentvārdiem.** Nekad veselam virsrakstam —
  lielā izmērā tas ir slikti salasāms un izskatās lēti. Tā to dara arī mājaslapa (`.guide-sig`).

**Lapas ir baltas.** Paneļiem `--panel: #fbfaf8` ar plānu maliņu `--panel-line: #edeae3`.
Nekāda smaga bēša — zīmola standarts saka „balti paneļi ar plānu maliņu, NE smags bēšs".

**Nelieto CSS daudzkolonnas (`columns`).** Tās sadala saturu neparedzami un lauž virsrakstus
pusvārdā. Vietā režģis ar fiksētu rindu skaitu vai `grid-template-columns`.

**Dienas lapa = 2×3 režģis:** piecas ēdienreizes + sestā šūna „Šodien" (8 ūdens glāzes +
5 rakstīšanas rindiņas). Bez sestās šūnas lapa ir puse tukša.

**Pašsajūtas dienasgrāmata ir ainavas lapa** — `@page land{size:A4 landscape}` + `.page-land`.
Piezīmju aile 44 % no platuma; tā ir vienīgā aile, kurā tiešām jāraksta.

**Attēls bez paraksta ir dekorācija.** Ja nevari uzrakstīt teikumu, ko tas paskaidro, tas nav
vajadzīgs. (Izņēmumus apstiprina Jānis.)

---

## 5. Vāks

Foto: `ieva-astro/public/assets/images/produktu-vaki/`. Stils — **quiet luxury**: gluds silts
ziloņkaula/marmora fons, burgundijas trauks, zelta detaļa, **ēdiens apakšējā pusē, augšā tukšums**.
Bez lina, koka, pergamenta un pārblīvēta „saimniecības galda".

Izkārtojums: teksts uz **tīra balta** augšējā daļā, foto apakšējos 52 % ar baltām maliņām
(13 mm). Uz foto gradienta teksts ir grūti salasāms — tas jau tika mēģināts un atmests.

Ievas vārds vākā **vienreiz**.

⚠️ Trīs vākiem jāizskatās kā **vienai sērijai**: tas pats kadra leņķis, tā pati gaisma, tas pats
trauks. Atšķiras tikai ēdiens. Prompti — `strategija/10-Vizualie-Promti.md`.

---

## 6. Lamatas, kas jau maksāja laiku

**Comic Sans PDF.** Chrome headless drukā, negaidot Google Fonts, un viss dokuments klusi
pāriet uz sistēmas rezervi: Playfair → Times New Roman, Alex Brush → **Comic Sans**. Redzams
tikai gatavajā PDF, ne pārlūkā. Risinājums: `fonti.mjs` iegulst fontus base64. Nelieto tīkla
saites.

**PDF fontu pārbaude ar teksta skenēšanu nestrādā** — mūsdienu PDF glabā objektus saspiestās
plūsmās, tāpēc `/BaseFont` atrodams tikai daļēji. Dod viltus trauksmi. Ticamais avots ir
Chrome CDP `CSS.getPlatformFontsForNode` vai vienkārši atver PDF pārlūkā un paskaties.

**Atpakaļpēdiņas CSS komentāros lauž būvi** — CSS dzīvo JS template literal iekšpusē.

**Lapu pārplūdi mēra pret 1009 px**, ne pret lapas augstumu ekrānā. A4 mīnus 15 mm maliņas =
267 mm = 1009 px. Ekrānā `.page` augstums ir automātisks, tāpēc procenti maldina.

**Pēc fontu vai teksta maiņas vienmēr pārmēri visas lapas** — cita metrika nozīmē citu
sadalījumu.

**Attēli PDF uzpūš failu** (0,8 → 6,6 MB). Chrome tos pārkodē. Ja vajag mazāk, jāsamazina
attēlu izmērs pirms iegulšanas.

**Pārpalikuma ēdienreizes `ing` nedrīkst saturēt produkta nosaukumu.** „Vakar gatavotā
tortilja" izskatās nevainīgi, bet parseris tajā atpazīst vārdu „tortilja", pieskaita vēl vienu
50 g tortilju virsū mantotajai porcijai, un diena kļūst par 155 kcal smagāka. Kļūda ir klusa —
skaitlis vienkārši ir nepareizs. Raksti „Vakar pagatavotā otrā porcija" vai tādu apzīmējumu,
kas nesakrīt ne ar vienu tabulas atslēgu.

**Jauna atslēga tabulā var nozagt veco.** Parseris ņem GARĀKO sakritību. Kad pievienoja
„kāposts", 10 dienu plāna „kalē kāposts" pārstāja būt kalē un kļuva par balto kāpostu —
citas uzturvērtības, cits produkts iepirkumu sarakstā. Pēc katras jaunas atslēgas palaid
`parbaude.mjs` VISIEM trim produktiem, ne tikai tam, ko būvē.

**Labojot `ing`, vienmēr pārlasi `steps`.** Kaloriju samazināšana ir masveida `ing` labošana,
un soļi paliek stāvam par produktiem, kuru receptē vairs nav: „Pasniedz ar maizes šķēli, sēklām
un banānu", kad banāns jau ir izņemts. Skaitļi paliek pareizi, tāpēc būve neko nepamana —
virtuvē cilvēks meklē produktu, kuru nav nopircis. `parbaude.mjs` tagad par to brīdina.

**Numurēts solis ir darbība, ne teikums.** Aukstā uzkodā „1. Maizi apziež ar hummusu.
2. Pārkaisa ar sēklām." ir viena kustība, sadalīta divos numuros — izskatās pēc instrukcijas
IKEA plauktam. Saliec vienā teikumā ar komatu. **Atsevišķu numuru pelna tikai tas, kas prasa
gaidīšanu vai plīti**: olas vārīšana, ledusskapis, cepeškrāsns, otrs ēdiens uz tā paša šķīvja.
Pēc šīs kārtas: 150 ēdienreizes, 367 soļi, vidēji 2,4 uz recepti.

**Auglis blakus maizei ir savs solis, ne piebilde.** „Pasniedz ar persiku" pēc teikuma par
maizes apziešanu izlasās kā „liec persiku uz maizes". Bet arī aizliegums („ne uz maizes")
skan pamācoši. Pareizi ir dot auglim savu numurēto rindu ar vienu vārdu: **„Persiks."**
Numurs pats pasaka, ka tā ir atsevišķa darbība; nekādu „blakus" vai „atsevišķi" nevajag.

**Attēls uz „Mana pieeja" lapas ir produkta konfigurācijā ar nolūku.** Vegānajā plānā tur
sākotnēji bija laša šķīvis. Tehniski nekas nesabojājās; produktu tas nogalinātu.

---

## 7. Pārbaudes pirms „gatavs"

`kopigais/parbaude.mjs` pārbauda automātiski un krīt ar kļūdu, kas nosauc dienu un skaitli:

- katrai ēdienreizei `kcal === p*4 + t*9 + o*4` un `p >= 11`;
- katrai dienai `kcal <= 1600` un tieši piecas ēdienreizes;
- visi iepirkumu produkti ir katalogā, un katalogā nav lieku.

Ar roku paliek trīs lietas: `latviesu-valoda` skill uz visu jauno tekstu, PDF atver pārlūkā
un **paskaties**, un pārbaudi, ka lapu skaits ir 26 — to nosauc `build.mjs`.

Lapu pārplūdes mērīšana pret 1009 px vairs nav kritērijs: kopš drukas modelis ir plūstošs,
sadaļa drīkst turpināties nākamajā loksnē, un etalonā tā dara četras.

---

## 8. Kas atlicis

- [ ] Vāka pārstrāde visiem trim: mazāk elementu (aplītis + virsraksts ar „10 dienām" +
      paraksts), lielāks virsraksts, apraksts nost, foto lielāks. Pašreizējais ir tehniski
      pareizs, bet kompozīcijā vājš — par daudz tukšuma un cieta šuve starp balto un foto.
- [ ] PDF kompresija zem 2 MB (tagad 6,6–7,0 MB)
- [ ] Ievas apstiprinājums makro sadalījumam un vegānā plāna labojumiem
      (lasis → tofu, medus → kļavu sīrups, olbaltumvielu celšana līdz 11 g ēdienreizē)
