// Uzturvērtību tabula un ēdienreižu aprēķins.
//
// Kāpēc atsevišķs fails: `data.mjs` ir Ievas SATURS (receptes, teksti), šis ir ATSAUCES dati —
// uzturvērtības uz 100 g, ko var pārbaudīt pret USDA vai citu tabulu, nemainot nevienu recepti.
// Kaloriju un makro skaitļi vairs netiek rakstīti ar roku: tos rēķina no `ing` teksta, tāpēc
// recepte un skaitlis nevar aiziet viens no otra. Ja recepti maina, skaitlis mainās pats.
//
// Avots: USDA FoodData Central — https://fdc.nal.usda.gov/ (SR Legacy / Foundation Foods).
// Piecām Latvijas precēm USDA neder, jo tur nav tāda produkta: biezpiens 0,5 %, rupjmaize,
// kefīrs, liess siers 10 %, kausētais siers. Tiem lietoti vietējo ražotāju etiķešu VIDĒJIE,
// un tā arī jāpaliek: konkrēts zīmols te neko neuzlabo. Pārbaudīts — pat plašākajās reālajās
// zīmolu robežās katra no tām maina dienas kalorijas par mazāk nekā 1 %, visas kopā par 1,7 %.
// Gabalu svari (banāns 80 vai 140 g) un gatavošanas zudumi svārstās daudz vairāk.
//
// Kausētais siers = Dzintars Light: deklarēti 7,5 % tauku un 138 kcal/100 g (parastajam 292).
// Olbaltumvielas un ogļhidrāti atvasināti tā, lai 4/9/4 dotu tieši tos 138 kcal.
// Šo zīmolu NOSAUCAM, atšķirībā no maizes: light variants ir uz pusi liesāks par parasto,
// tāpēc te izvēle tiešām maina skaitli, ne tikai iepakojumu.
//
// Ieteicamie produkti (iepirkumu sarakstā, `data.mjs` katalogā): biezpiens 0,5 %, grieķu
// jogurts liesākais — tie te ir ierakstīti. Rupjmaizei zīmolu NEnorādām: kritērijs ir
// kvalitatīva maize ar mazāk sāls un cukura, un cilvēks tik un tā nepirks vienu un to pašu.
// Tāpēc paliek vidējais rudzu maizes profils. (Pārbaudīts arī konkrēts zīmols — veikalā
// deklarētā etiķete pati nesaskaitījās: 262 kcal pie 8,4 P / 1,5 T / 59,9 O dod 287 kcal.)
//
// Ogļhidrāti = PILNIE (ar šķiedrvielām), un kalorijas rēķina no makro: 4/9/4.
// Tāpēc dokumentā gramus var pareizināt un iznāks tieši tas kcal skaitlis, kas rakstīts blakus.
// Atsevišķas kaloriju kolonnas nav ar nolūku — divi skaitļi par vienu lietu vienmēr aiziet malā.

// nosaukuma daļa (mazie burti) -> [olbaltumvielas, tauki, ogļhidrāti] gramos uz 100 g
export const N = {
  // graudi, maize
  "auzu pārsl": [16.9, 6.9, 67.7], "griķu pārsl": [13.3, 3.4, 71.5],
  "kuskuss": [12.8, 0.6, 77.4], "grūbas": [9.9, 1.2, 77.7],
  "brūnie rīsi": [2.7, 1.0, 25.6], "muslis": [9.7, 5.6, 72.0],
  "lēcas": [25.8, 1.1, 60.1], "sarkanās lēcas": [23.9, 1.1, 63.1], "pupiņas": [8.7, 0.5, 22.8],
  "čia sēklas": [16.5, 30.7, 42.1], "rīsu vai auzu milti": [5.9, 1.4, 80.1],
  "rupjmaize": [8.5, 3.3, 48.3], "galetes": [8.2, 2.8, 81.5],
  "tortilja": [8.7, 7.9, 51.0],
  // piena produkti — Latvijas etiķešu vidējie, nevis USDA
  "vājpiens": [3.4, 0.5, 4.8], "biezpien": [16.0, 0.5, 3.0],
  "grieķu jogurt": [10.3, 0.4, 3.6], "kefīr": [3.3, 2.5, 4.0],
  "liess siers": [27.0, 10.0, 1.5], "kausētais siers": [13.0, 7.5, 4.6],
  "krējums": [2.6, 13.5, 3.4],
  // olbaltumvielu avoti
  "olu baltum": [10.9, 0.2, 0.7], "olas": [12.6, 9.5, 0.7], "ola": [12.6, 9.5, 0.7],
  "tofu": [8.1, 4.8, 1.9], "vistas fileja": [23.0, 1.6, 0],
  "vistas gaļa": [23.0, 1.6, 0], "tītara fileja": [24.0, 1.0, 0],
  "baltās zivs": [18.0, 0.7, 0], "foreles": [20.8, 6.2, 0],
  "laša": [20.4, 13.4, 0], "garneles": [24.0, 0.3, 0.2],
  // dārzeņi
  "spināt": [2.9, 0.4, 3.6], "rukola": [2.6, 0.7, 3.7],
  "romiešu salāt": [1.2, 0.3, 3.3], "kalē": [4.3, 0.9, 8.8],
  "gurķ": [0.7, 0.1, 3.6], "tomāt": [0.9, 0.2, 3.9],
  "paprik": [1.0, 0.3, 6.0], "burkān": [0.9, 0.2, 9.6],
  "cukīni": [1.2, 0.3, 3.1], "ziedkāpost": [1.9, 0.3, 5.0],
  "brokolis": [2.8, 0.4, 6.6], "briseles kāposti": [3.4, 0.3, 8.9],
  "baklažān": [1.0, 0.2, 5.9], "šampinjon": [3.1, 0.3, 3.3],
  "sīpol": [1.1, 0.1, 9.3], "ķiplok": [6.4, 0.5, 33.1],
  "ķirbis": [1.0, 0.1, 6.5], "kartupeļi": [2.0, 0.1, 17.5],
  "saldais kartupelis": [1.6, 0.1, 20.1], "kālis": [1.8, 0.1, 6.2],
  "bietes": [1.7, 0.2, 10.0], "sēklu dīgsti": [3.0, 0.5, 6.0],
  "selerija": [0.7, 0.2, 3.0],
  // augļi
  "ābol": [0.3, 0.2, 13.8], "apelsīn": [0.9, 0.1, 11.8],
  "banān": [1.1, 0.3, 22.8], "kivi": [1.1, 0.5, 14.7],
  "persik": [0.9, 0.3, 9.5], "mango": [0.8, 0.4, 15.0],
  "greipfrūt": [0.8, 0.1, 10.7], "ogas": [0.8, 0.4, 11.0], "ogu": [0.8, 0.4, 11.0],
  // rieksti, sēklas, tauki, saldie
  "zemesriekstu sviests": [25.0, 50.0, 20.0], "rieksti": [21.2, 49.9, 21.6],
  "mandeles": [21.2, 49.9, 21.6], "saulespuķu sēklas": [20.8, 51.5, 20.0],
  "ķirbju sēklas": [30.2, 49.0, 10.7], "olīveļļa": [0, 100, 0],
  "avokado": [2.0, 14.7, 8.5], "medus": [0.3, 0, 82.4],
  "pesto": [5.0, 45.0, 5.0], "ievārījums": [0.4, 0.1, 62.0],
  "šokolādes": [7.8, 43.0, 46.0], "zivju mērce": [5.0, 0, 3.0],

  // ---- vasaras plāns ----
  "griķi": [13.3, 3.4, 71.5], "kvinoja": [14.1, 6.1, 64.2],
  "pilngraudu pasta": [13.0, 2.5, 71.0], "pilngraudu milti": [13.2, 2.5, 72.0],
  "turku zirņi": [20.5, 6.0, 62.9], "sviesta pupiņas": [1.8, 0.2, 7.1],
  "kliju maize": [9.0, 3.5, 43.0], "tomātu pasta": [4.3, 0.5, 18.9],
  "tuncis": [23.6, 0.8, 0], "kazas siers": [18.5, 21.1, 2.2],
  "krēmsiers": [6.0, 12.0, 5.5], "kokosriekstu piens": [1.5, 7.5, 2.0],
  "kukurūza": [3.3, 1.3, 19.0], "redīsi": [0.7, 0.1, 3.4],
  "puravs": [1.5, 0.3, 14.2], "sinepes": [3.7, 4.4, 5.8],
  "proteīna pulveris": [75.0, 6.0, 10.0],

  /* ---- vegānais plāns ----
     Augu produktiem USDA neder tāpat kā Latvijas piena precēm: „vegānais siers" nav viens
     produkts, bet vesela plaukta rinda. Te lietoti Latvijā pieejamo zīmolu etiķešu vidējie
     (Violife, Alpro, Oatly). Zīmolu NENOSAUCAM — cilvēks pirks to, kas ir veikalā, un
     starpība dienas kalorijās ir zem 2 %. */
  "sojas dzēriens": [3.3, 1.8, 3.0], "vegānais siers": [0.5, 23.0, 22.0],
  "vegānais jogurts": [4.0, 2.0, 2.5], "vegānais krējums": [1.5, 15.0, 3.0],
  "augu krēmsiers": [2.0, 22.0, 3.0], "auzu kulinārijas krēms": [1.0, 10.0, 8.0],
  "sojas pupiņas": [36.5, 19.9, 30.2], "piecu graudu pārslas": [12.0, 5.0, 66.0],
  "polārmaize": [8.5, 1.5, 52.0], "mangolds": [1.8, 0.2, 3.7],
  "sparģeļi": [2.2, 0.1, 3.9], "baltais kāposts": [1.3, 0.1, 5.8],
  "zaļās pupiņas": [1.8, 0.2, 7.1], "kukurūzas ciete": [0.3, 0.1, 91.3],
  "bumbier": [0.4, 0.1, 15.2], "kļavu sīrups": [0, 0, 67.0],
  "hummuss": [7.9, 17.1, 14.9],
};

/* Gabalu svari gramos — vidēja lieluma auglis, ēdamā daļa.
   Augļus receptē rakstām gabalos („1 ābols", „½ banāns"), ne gramos: neviens nesver pusi ābola,
   un dažu desmitu kaloriju kļūda te neko nemaina. Gramos rakstām tikai to, kur kļūda maksā —
   eļļu, riekstus, sēklas, riekstu sviestu. Ogas un bietes arī paliek gramos: tās neskaita gabalos. */
const PIECE = {
  "olu baltumi": 33, "olu baltums": 33, "olas": 55, "ola": 55,
  "banāns": 120, "ābols": 180, "apelsīns": 130, "kivi": 70,
  "persiks": 140, "greipfrūts": 240, "mango": 200, "bumbieris": 170,
  "galetes": 9, "tortilja": 50, "paprikas": 120, "rieksti": 1.4,
  "gabaliņi tumšās šokolādes": 7,
};

// Garšvielas, ūdens un teksta atlikas — uzturvērtībā nenozīmīgas.
const IGNORE = /^(dilles|pētersīļi|sāls|pipari|baziliks|zaļumi|garšvielas|šķipsniņa|paprika$|abām reizēm|var aplaistīt vai vārīt ūdenī|ūdens|lauru lapa|romiešu ķimenes|citronu sula|cepamais pulveris|\d+\s*(ml|l)\s+ūdens)/i;

function lookup(name) {
  const s = name.toLowerCase();
  let best = null, len = 0;
  for (const k of Object.keys(N)) if (s.includes(k) && k.length > len) { best = k; len = k.length; }
  return best;
}

/* Izlasa sastāvdaļu tekstu -> [[atslēga, grami], ...].
   Neatpazītās atdod atsevišķi, lai būve varētu apstāties, nevis klusi samelot. */
export function parseIng(str) {
  const items = [], miss = [];
  const clean = str.replace(/\([^)]*\)/g, "").replace(/\bPasniedz ar\b/gi, "")
    .replace(/\bsauja spinātu\b/gi, "20 g spināti").replace(/½/g, "0,5");
  // Sadala pa komatiem un punktiem, BET ne decimāldaļā („0,5 banāns" paliek vesels).
  for (let part of clean.split(/[,.](?!\d)|\s+un\s+/)) {
    part = part.trim();
    if (!part || IGNORE.test(part)) continue;
    let grams, name;
    let m = part.match(/^(\d+(?:[.,]\d+)?)\s*(?:g|ml)\s+(.+)$/i);
    if (m) { grams = parseFloat(m[1].replace(",", ".")); name = m[2]; }
    else if ((m = part.match(/^(\d+(?:[.,]\d+)?)\s+(.+)$/))) {
      name = m[2];
      const pk = Object.keys(PIECE).find(k => name.toLowerCase().includes(k));
      if (!pk) { miss.push(part); continue; }
      grams = parseFloat(m[1].replace(",", ".")) * PIECE[pk];
    } else {
      const pk = Object.keys(PIECE).find(k => part.toLowerCase().includes(k));
      if (!pk) { miss.push(part); continue; }
      grams = PIECE[pk]; name = part;
    }
    const key = lookup(name);
    if (!key) { miss.push(part); continue; }
    items.push([key, grams]);
  }
  return { items, miss };
}

const sum = items => items.reduce((a, [k, g]) => {
  const [p, t, o] = N[k];
  return { p: a.p + p * g / 100, t: a.t + t * g / 100, o: a.o + o * g / 100 };
}, { p: 0, t: 0, o: 0 });

// Kalorijas no makro (4/9/4) — noapaļotajiem gramiem, lai lasītājs var pārbaudīt ar kalkulatoru.
const round = v => {
  const p = Math.round(v.p), t = Math.round(v.t), o = Math.round(v.o);
  return { kcal: p * 4 + t * 9 + o * 4, p, t, o };
};

/* Vienas porcijas makro.
   `portions: 2` = gatavo divām reizēm, tāpēc dala uz pusēm.
   `from: "3/pusdienas"` = vakardienas pārpalikums; manto pusi no avota un pieskaita svaigo klāt. */
export function mealMacros(days, day, meal) {
  const own = parseIng(meal.ing);
  /* Pārpalikuma ēdienreizēs `ing` sākas ar aprakstu („Vakar gatavotā zupa"), kam skaitļu nav —
     tas nav kļūda. Visur citur neatpazīta sastāvdaļa aptur būvi, lai skaitlis nesamelotu. */
  const real = meal.from ? own.miss.filter(x => /\d/.test(x)) : own.miss;
  if (real.length) {
    throw new Error(`Neatpazīta sastāvdaļa (${day.n}. diena / ${meal.type}): ${real.join(" | ")}`);
  }
  /* `serve` = tas, ko liek virsū VIENAI porcijai (ogas, jogurts). To nedala uz pusēm,
     pat ja pamatu gatavo divām reizēm — citādi pārpalikuma diena sanāktu bez piedevām. */
  const extra = meal.serve ? parseIng(meal.serve) : { items: [], miss: [] };
  if (extra.miss.length) {
    throw new Error(`Neatpazīta piedeva (${day.n}. diena / ${meal.type}): ${extra.miss.join(" | ")}`);
  }
  let v = sum(own.items);
  if (meal.from) {
    const [sn, st] = meal.from.split("/");
    const sd = days.find(x => x.n === +sn);
    if (!sd) throw new Error(`Nav ${meal.from} avota dienas`);
    const sm = sd.meals.find(x => x.type === st);
    if (!sm) throw new Error(`Nav ${meal.from} avota ēdienreizes`);
    const base = sum(parseIng(sm.ing).items), d = sm.portions || 1;
    v = { p: v.p + base.p / d, t: v.t + base.t / d, o: v.o + base.o / d };
  } else if (meal.portions) {
    v = { p: v.p / meal.portions, t: v.t / meal.portions, o: v.o / meal.portions };
  }
  const e = sum(extra.items);
  return round({ p: v.p + e.p, t: v.t + e.t, o: v.o + e.o });
}

// Neviena diena nedrīkst pārsniegt šo. Būve krīt, ja kāda recepte to izsit.
export const KCAL_MAX = 1600;

/* Papildina dienas un ēdienreizes ar aprēķinātajiem skaitļiem. Izsauc vienreiz pirms būves. */
export function calcAll(days) {
  for (const d of days) {
    let k = 0, p = 0, t = 0, o = 0;
    for (const m of d.meals) {
      const r = mealMacros(days, d, m);
      m.kcal = r.kcal;
      k += r.kcal; p += r.p; t += r.t; o += r.o;
    }
    if (k > KCAL_MAX) {
      throw new Error(`${d.n}. diena ir ${k} kcal — virs ${KCAL_MAX} kcal robežas. Samazini porcijas.`);
    }
    d.kcal = k;
    d.macros = { p, t, o };
  }
  return days;
}

/* Sastāvdaļas atslēga -> produkta nosaukums iepirkumu sarakstā.
   Tāpēc sarakstu vairs neraksta ar roku: to saskaita no to pašu recepšu teksta. */
const VEIKALS = {
  "auzu pārsl": "Pilngraudu auzu pārslas", "griķu pārsl": "Griķu pārslas", "kuskuss": "Kuskuss",
  "grūbas": "Grūbas", "brūnie rīsi": "Brūnie rīsi", "muslis": "Muslis", "lēcas": "Lēcas", "sarkanās lēcas": "Sarkanās lēcas",
  "pupiņas": "Vārītas pupiņas", "čia sēklas": "Čia sēklas", "rīsu vai auzu milti": "Rīsu milti",
  "rupjmaize": "Rupjmaize", "galetes": "Rīsu galetes", "tortilja": "Pilngraudu tortilja",
  "vājpiens": "Vājpiens", "biezpien": "Biezpiens", "grieķu jogurt": "Grieķu jogurts",
  "kefīr": "Kefīrs", "liess siers": "Liess siers", "kausētais siers": "Kausētais siers",
  "krējums": "Krējums", "olu baltum": "Olas", "olas": "Olas", "ola": "Olas", "tofu": "Tofu",
  "vistas fileja": "Vistas fileja", "vistas gaļa": "Vistas fileja", "tītara fileja": "Tītara fileja",
  "baltās zivs": "Baltā zivs", "foreles": "Forele", "laša": "Lasis", "garneles": "Garneles",
  "spināt": "Spināti", "rukola": "Rukola", "romiešu salāt": "Romiešu salāti", "kalē": "Kalē kāposts",
  "gurķ": "Gurķi", "tomāt": "Tomāti", "paprik": "Paprika", "burkān": "Burkāni", "cukīni": "Cukīni",
  "ziedkāpost": "Ziedkāposts", "brokolis": "Brokolis", "briseles kāposti": "Briseles kāposti",
  "baklažān": "Baklažāns", "šampinjon": "Šampinjoni", "sīpol": "Sīpoli", "ķiplok": "Ķiploki",
  "ķirbis": "Ķirbis", "kartupeļi": "Kartupeļi", "saldais kartupelis": "Saldais kartupelis",
  "kālis": "Kālis (kolrābis)", "bietes": "Bietes", "sēklu dīgsti": "Sēklu dīgsti", "selerija": "Selerija",
  "ābol": "Ābols", "apelsīn": "Apelsīns", "banān": "Banāns", "kivi": "Kivi", "persik": "Persiki",
  "mango": "Mango", "greipfrūt": "Greipfrūts", "ogas": "Svaigas ogas", "ogu": "Svaigas ogas",
  "zemesriekstu sviests": "Zemesriekstu sviests", "rieksti": "Rieksti (mandeles, valrieksti)",
  "mandeles": "Rieksti (mandeles, valrieksti)", "saulespuķu sēklas": "Saulespuķu sēklas",
  "ķirbju sēklas": "Ķirbju sēklas", "olīveļļa": "Olīveļļa", "avokado": "Avokado", "medus": "Medus",
  "pesto": "Pesto", "ievārījums": "Ievārījums", "šokolādes": "Tumšā šokolāde", "zivju mērce": "Zivju mērce",
  // vasaras plāns
  "griķi": "Griķi", "kvinoja": "Kvinoja", "pilngraudu pasta": "Pilngraudu pasta",
  "pilngraudu milti": "Pilngraudu milti", "turku zirņi": "Turku zirņi",
  "sviesta pupiņas": "Sviesta pupiņas", "kliju maize": "Kliju maize",
  "tomātu pasta": "Tomātu pasta", "tuncis": "Tuncis savā sulā", "kazas siers": "Kazas siers",
  "krēmsiers": "Krēmsiers", "kokosriekstu piens": "Kokosriekstu piens", "kukurūza": "Kukurūza",
  "redīsi": "Redīsi", "puravs": "Puravs", "sinepes": "Sinepes", "proteīna pulveris": "Proteīna pulveris",
  // vegānais plāns
  "sojas dzēriens": "Sojas dzēriens", "vegānais siers": "Vegānais siers", "vegānais jogurts": "Vegānais jogurts",
  "vegānais krējums": "Vegānais krējums", "augu krēmsiers": "Augu krēmsiers",
  "auzu kulinārijas krēms": "Auzu kulinārijas krēms", "sojas pupiņas": "Sojas pupiņas",
  "piecu graudu pārslas": "Piecu graudu pārslas", "polārmaize": "Rudzu polārmaize",
  "mangolds": "Mangolds vai kalē", "sparģeļi": "Sparģeļi", "baltais kāposts": "Baltais kāposts",
  "zaļās pupiņas": "Zaļās pupiņas", "kukurūzas ciete": "Kukurūzas ciete",
  "bumbier": "Bumbieris", "kļavu sīrups": "Kļavu sīrups", "hummuss": "Hummuss",
};

// Produkti, ko pērk gabalos, ne gramos: nosaukums -> viena gabala svars gramos
const GABALOS = { "Olas": 55, "Rīsu galetes": 9, "Pilngraudu tortilja": 50 };

/* Zaļumi uzturvērtībā ir nulle, bet veikalā tie ir jānopērk.
   Tāpēc tos meklē receptes tekstā atsevišķi un ieliek sarakstā ar simbolisku svaru. */
const ZALUMI = { "dille": "Dilles", "pētersīļ": "Pētersīļi", "baziliks": "Baziliks", "zaļumi": "Zaļumi" };

/* Saskaita, cik katra produkta vajag katrā dienā.
   Ņem PILNU recepti (ne porciju), jo virtuvē pērk un gatavo visu daudzumu. */
export function shoppingFor(days) {
  const byDay = {};
  for (const d of days) {
    const g = {};
    for (const m of d.meals) {
      const visas = [...parseIng(m.ing).items, ...(m.serve ? parseIng(m.serve).items : [])];
      for (const [key, grams] of visas) {
        const name = VEIKALS[key];
        if (!name) throw new Error(`Nav veikala nosaukuma sastāvdaļai „${key}" (${d.n}. diena)`);
        g[name] = (g[name] || 0) + grams;
      }
      const low = (m.ing + " " + (m.serve || "")).toLowerCase();
      for (const [word, name] of Object.entries(ZALUMI)) if (low.includes(word)) g[name] = (g[name] || 0) + 5;
    }
    const out = {};
    for (const [name, grams] of Object.entries(g)) {
      out[name] = GABALOS[name] ? [Math.ceil(grams / GABALOS[name]), "gab"] : Math.round(grams);
    }
    byDay[d.n] = out;
  }
  return byDay;
}

/* Vidējais sadalījums pa enerģiju — lai var pārbaudīt, vai plāns tur solīto. */
export function planAverage(days) {
  const s = days.reduce((a, d) => ({ p: a.p + d.macros.p, t: a.t + d.macros.t, o: a.o + d.macros.o, k: a.k + d.kcal }), { p: 0, t: 0, o: 0, k: 0 });
  const n = days.length, kc = s.p * 4 + s.t * 9 + s.o * 4;
  return {
    kcal: Math.round(s.k / n), p: Math.round(s.p / n), t: Math.round(s.t / n), o: Math.round(s.o / n),
    pPct: Math.round(s.p * 4 / kc * 100), tPct: Math.round(s.t * 9 / kc * 100), oPct: Math.round(s.o * 4 / kc * 100),
  };
}
