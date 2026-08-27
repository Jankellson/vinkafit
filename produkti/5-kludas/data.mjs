// Saturs — bezmaksas ceļvedis „5 uztura kļūdas“ (lead magnet, piltuves āķis).
//
// Avoti, uz kuriem šis balstās:
//   · strategija/6F-Email-Marketing.md — piecu kļūdu struktūra un loma piltuvē
//   · klients/IEVA-POZICIJA.md — balss, nostājas un reālie piemēri (cīsiņu princips,
//     salātu mānība, 300 kcal piemērs). Nekas te nav izdomāts par Ievu.
//   · PRODUCT.md — cenas. Konsultācija ir 49 €, NE 35 € (tas ir novecojis skaitlis 6F failā).
//
// Divas apzinātas atkāpes no vecās specifikācijas:
//   1) Nosaukumā NAV „sievietes 30–50“. ieva-astro/CLAUDE.md (2026-06-10) auditoriju
//      paplašināja un prasa neitrālu valodu. Vecais nosaukums palicis tikai start.astro.
//   2) Kļūdas NEDUBLĒ jau publicēto rakstu par šķīvja metodi. Tur ir kļūdas šķīvja
//      sastāvā (augļi dārzeņu vietā, baltie graudi). Te ir kļūdas pieejā. Ja abi saraksti
//      sakristu, cilvēkam nebūtu iemesla atdot e-pastu par to, ko var izlasīt lapā.
//
// Visi kaloriju skaitļi nāk no tās pašas tabulas, ko uztura plāni (kopigais/uzturvertibas.mjs),
// tāpēc ceļvedis un produkti nevar sākt runāt pretī viens otram.

export const meta = {
  title: "5 uztura kļūdas, ko redzu visbiežāk",
  subtitle: "un kā tās labot",
  author: "Ieva Jēkabsone",
  authorRole: "uztura konsultante",
  site: "ievajekabsone.lv",
};

export const product = {
  pdfName: "5-Uztura-Kludas",
  cover: "ieva-consultant-portrait.webp",
  coverKicker: "Bezmaksas ceļvedis",
  coverTag: "Piecas uztura kļūdas, kuras bieži redzu klientu ikdienā — kas notiek patiesībā un kā tās izlabot.",
  readTime: "8 minūtes lasīšanai",
};

export const intro = {
  h: "Kāpēc es to rakstu",
  p: [
    "Es esmu Ieva Jēkabsone, uztura konsultante. Lielākā daļa manu klientu nav slinki. Viņi ir mēģinājuši — bieži vairākas reizes — un katru reizi kaut kas nostrādājis neilgu laiku, tad beidzies.",
    "Gandrīz vienmēr atkārtojas tās pašas piecas kļūdas. Tās nav lielas. Tieši tāpēc tās ir grūti pamanīt pašam: katra atsevišķi izskatās pēc sīkuma, un kopā tās izšķir rezultātu.",
    "Šajā ceļvedī nav aizliegumu un nav brīnumdiētu. Ir piecas situācijas, kuras tu, iespējams, atpazīsi, un pie katras — konkrēts nākamais solis.",
  ],
  callout: ["Ko šis ceļvedis nedara", "Tas nav individuāls uztura plāns. Es tevi neredzu, nezinu tavu vecumu, aktivitāti vai veselības situāciju. Tāpēc te ir principi, ne devas. Ja tev ir hroniska saslimšana, tu esi grūtniece vai lieto medikamentus, par izmaiņām uzturā vispirms parunā ar ārstu."],
};

// Katra kļūda: kā tas izskatās -> kāpēc tas nestrādā -> ko darīt vietā.
export const kludas = [
  {
    n: 1,
    h: "Kalorijas skaita mūžīgi vai neskaita nekad",
    izskatas: "Ir divas galējības, un abas nāk pie manis vienlīdz bieži. Viens cilvēks ievada lietotnē katru kumosu un uztraucas par 30 kcal starpību. Otrs saka, ka skaitīšana ir slimīga, ēd pēc sajūtas un nesaprot, kāpēc nekas nemainās.",
    nestrada: "Skaitīšana nav mērķis. Tā ir mācību rīks, un tam ir beigu datums. Ja tu nekad neesi nosvēris 30 g riekstu vai ielējis eļļu ar karoti, tad „pēc sajūtas“ nozīmē „pēc paraduma“. Bet, ja tu skaiti trešo gadu, tu vairs nemācies — tu tikai uztraucies.",
    dari: [
      "Skaiti divas nedēļas, ne mūžīgi. Mērķis ir ieraudzīt, ne kontrolēt.",
      "Sākumā sver visu, ko ēd — gaļu, zivi, graudaugus, sieru, krējumu, sviestu, eļļu, riekstus, sēklas, riekstu sviestu u.t.t. Tieši šeit precizitāte nosaka, vai skaitītais atbilst realitātei.",
      "No acs vari likt tikai lapu salātus un zaļumus — tur kļūda ir dažas kalorijas, ne desmitiem.",
    ],
    callout: ["Cik kaloriju paslēpjas vienā karotē vai saujā", "Ēdamkarote olīveļļas ir 122 kcal. 30 g mandeļu — 175 kcal. Vesela 200 g paka — vairāk nekā 1000 kcal. Sauja nav mērvienība: vienam tā ir 20 g, otram 50."],
  },
  {
    n: 2,
    h: "Paņem plānu, kas domāts citam cilvēkam",
    izskatas: "Draudzenei nostrādāja, un tu paņem to pašu. Vai atrodi internetā plānu ar 1200 kcal un sāc no pirmdienas. Pirmās dienas iet labi, pēc divām nedēļām gribas ēst pastāvīgi.",
    nestrada: "Cik tev vajag, ir atkarīgs no vecuma, svara, aktivitātes, darba ritma un gremošanas. Tas pats plāns vienam ir mērens deficīts, otram — bads. Un ir vēl viena lieta, ko no malas neredz: kas notiek asinīs. Bieži cilvēks saka „nav spēka un nesaprotu kāpēc“, un izrādās, ka trūkst konkrēta vitamīna vai minerālvielas.",
    dari: [
      "Pirms maini ēšanu, nedēļu vienkārši pieraksti, ko tu ēd. Bez vērtējuma.",
      "Nosaki, ko tu gribi: zaudēt svaru, saglabāt muskuļus vai vienkārši justies labāk. Atbilde maina plānu.",
      "Ja nogurums turas mēnešiem, palūdz ģimenes ārstam asinsanalīzes. Es tās skatos uztura kontekstā; diagnozes noteikšana ir ārsta darbs.",
    ],
    callout: ["Kur ir mana robeža", "Es nediagnosticēju un neizrakstu zāles. Ja kāds rādītājs ir stipri novirzījies — piemēram, vairogdziedzeris —, tas ir jautājums ārstam, ne uztura plānam. Bet nereti tieši analīzes paskaidro, kāpēc citādi pareizs plāns nedod rezultātu."],
  },
  {
    n: 3,
    h: "Ēd „veselīgi“, bet neskaita to, kas ir virsū",
    izskatas: "Šo es dzirdu biežāk par visu: „Es taču ēdu salātus, kāpēc nekas nemainās?“ Tad izrunājam, kā tie salāti izskatās. Lapas, tomāti, gurķis — un sešas ēdamkarotes eļļas.",
    nestrada: "Sešas ēdamkarotes eļļas ir aptuveni 700 kcal. Tas ir gandrīz puse dienas, un neviens to neieskaita, jo eļļa nav ēdiens — tā ir kustība ar roku. Tas pats notiek ar mērcēm, sieru virsū un „tikai vienu“ karoti riekstu sviesta.",
    dari: [
      "Eļļu lej ar karoti, ne no pudeles. Atšķirība mēdz būt trīskārša.",
      "Riekstus nosver un liec bļodiņā. No pakas neviens neapstājas laikā.",
      "Mērci pagatavo mājās: jogurts, sinepes, citrons. Veikala mērcē eļļa ir pirmajā vietā.",
    ],
    callout: ["Sīkumi skaitās, bet ne visi", "Gurķis, salātlapa un burkāns — tos vari neskaitīt. Eļļu, riekstus, sēklas, sierus un mērces — skaiti. Kalorijas nav vienmērīgi izklātas pa šķīvi; tās koncentrējas dažos produktos."],
  },
  {
    n: 4,
    h: "Izmet veselu produktu grupu bez iemesla",
    izskatas: "Kartupeļi ir „slikti“. Krējums ir „slikts“. Maize ir „slikta“, un bezglutēna produkti tiek pirkti bez jebkādas nepanesības. Saraksts ar aizliegtajām lietām aug, un ēšana kļūst arvien šaurāka.",
    nestrada: "Aizliegums nostrādā labākajā gadījumā mēnesi. Pēc tam cilvēks „norauj“, atgriežas pie vecajiem ieradumiem un vēl jūtas vainīgs. Vainas sajūta pie galda neko labu nedod. Turklāt daļa izmesto lietu nemaz nav problēma: vārīti kartupeļi ir normāls ēdiens, un karote krējuma nevienu plānu nesabojā.",
    dari: [
      "Nevis „nedrīkstu“, bet „cik un cik bieži“. Gandrīz visam var atrast vietu.",
      "Ja kaut ko tiešām gribas, ieplāno to, ne cīnies ar to. Es tā daru ar klientiem: ja no rīta gribas cīsiņus, atrodam kvalitatīvākus, ieliekam brokastīs un sabalansējam pārējo dienu.",
      "Bezglutēna, bezlaktozes un citas izslēgšanas — tikai tad, ja tev tās tiešām vajag.",
    ],
    callout: ["Taukus neizmet", "Tie ir vajadzīgi smadzenēm un hormoniem, un bez tiem neuzsūcas A, D, E un K vitamīni. Jautājums nav, vai ēst taukus, bet kurus: olīveļļa, rieksti, avokado, treknās zivis — jā; transtauki un pusfabrikāti — cik iespējams mazāk."],
  },
  {
    n: 5,
    h: "Gaida rezultātu divās nedēļās",
    izskatas: "Sākas pirmdiena, un līdz mēneša beigām jābūt redzamām pārmaiņām. Uz svariem kāpj katru rītu. Pēc desmit dienām skaitlis nekustas, motivācija beidzas, un viss atgriežas atpakaļ.",
    nestrada: "Svars dabīgi svārstās par vienu līdz diviem kilogramiem — ūdens, sāls, cikls, miegs. Svēršanās katru dienu mēra troksni, ne rezultātu. Un tā dēvētie divu dienu attīrīšanās kursi neko nemaina: organisms attīrās pats, ja tu ēd normāli un kvalitatīvi.",
    dari: [
      "Rēķinies ar trim mēnešiem, ne trim nedēļām. Ar ātru rezultātu es nestrādāju.",
      "Mēries reizi nedēļā, vienā un tajā pašā rīta laikā, un skaties uz mēneša tendenci.",
      "Ņem mērenu deficītu. Piemēram, no 1900 uz 1600 kcal dienā — tikai 300 kcal starpība, un tā strādā ilgtermiņā.",
    ],
    callout: ["Kāpēc mazais deficīts uzvar", "Liels deficīts ātri dod rezultātu un tikpat ātri beidzas — ar pārēšanos vai zaudētiem muskuļiem. 300 kcal dienā ir tik maz, ka tu to gandrīz nejūti, bet trijos mēnešos tā ir reāla pārmaiņa. Un tikpat viegli 300 kcal var nemanot pielikt klāt — divas ēdamkarotes eļļas un sauja riekstu."],
  },
];

export const riciba = {
  h: "Ko darīt šonedēļ",
  lead: "Neko no šī nevajag darīt visu uzreiz. Izvēlies vienu soli un noturi to septiņas dienas.",
  soli: [
    ["Pieraksti, ko ēd", "Trīs dienas, arī nedēļas nogalē. Neko nemaini — tikai pieraksti. Lielākā daļa cilvēku pirmo kļūdu ierauga paši, bez manis."],
    ["Nosver trīs lietas", "Eļļu, riekstus un sieru. Vienu reizi. Pēc tam tu zināsi, kā izskatās porcija, un vairs nebūs jāsver."],
    ["Izvēlies vienu maltīti, ko sakārtot", "Ne visu dienu. Piemēram, brokastis: olbaltumviela, dārzenis un pilngraudu ogļhidrāts. Kad tas turas divas nedēļas, ķeries pie nākamās."],
  ],
  callout: ["Ja vēlies manu palīdzību", "Sākuma konsultācija maksā 49 €. Tā ir stunda, kurā izrunājam tavu situāciju, ēšanas paradumus, iepriekšējo pieredzi, mērķi un to, ko rāda tavas analīzes, ja tādas ir. Pēc tās tu zini savu nākamo soli — arī tad, ja tālāk turpini pats. Ja divdesmit četru stundu laikā izvēlies 30 vai 90 dienu programmu, konsultācijas maksu ieskaitu programmas cenā."],
};

export const parMani = {
  h: "Par mani",
  p: [
    "Esmu Ieva Jēkabsone, uztura konsultante. Man ir svarīgi, lai tu saproti, kāpēc kaut kas jādara, ne tikai izpildi sarakstu.",
    "Ticu, ka uzturu maina mazi soļi, ne aizliegumi. Negribu, lai tu badojies vai skaiti katru kumosu. Gribu, lai tu saproti, kāpēc ēd tā, kā ēd, un lai tas der tavai ikdienai.",
    "Ja kaut ko nezinu, es to pasaku. Mans uzdevums ir palīdzēt tev saprast, kas notiek, un sasniegt to, ko vēlies.",
  ],
  saites: [
    ["Sākuma konsultācija", "49 €, viena stunda"],
    ["30 dienu programma", "249 €, vai 200 € pēc konsultācijas"],
    ["90 dienu programma", "549 €, vai 500 € pēc konsultācijas"],
  ],
  atruna: "Šis ceļvedis ir vispārīgs un izglītojošs. Tā nav medicīniska ārstēšana vai individuāls uztura plāns. Ja esi grūtniece, baro bērnu ar krūti, lieto medikamentus vai tev ir veselības problēmas, pirms maini ēšanu konsultējies ar ārstu vai uztura speciālistu.",
};
