// Teksti, kas visos trīs plānos ir VIENĀDI: Ievas pieeja, ieteikumi, atruna, alergēnu
// leģenda un veikala sadaļas. Te tie ir vienreiz, lai trīs produkti lēnām neaizietu viens
// no otra. Kas produktā atšķiras (receptes, iepirkumu katalogs, aizstāšana), dzīvo
// attiecīgajā `data.mjs`.

export const allergens = {
  piens: "Piens",
  olas: "Olas",
  zivs: "Zivs",
  juras: "Jūras veltes",
  rieksti: "Rieksti",
  glutens: "Glutēns",
  seklas: "Sēklas",
  soja: "Soja",
};

export const philosophy = [
  ["Pielāgošana, ne aizliegumi", "Neviens produkts nav aizliegts. Svarīgs ir kopums."],
  ["Ilgtspēja, ne ātrums", "Lēni veidotas pārmaiņas paliek. Ātras — pazūd."],
  ["Sīkumi skaitās", "Glāze ūdens, viena maltīte, viens solis. No tā veidojas rezultāts."],
  ["Godīgums", "Ja kaut ko nezinu, tā arī pateikšu. Bez tukšiem solījumiem."],
];

export const aboutLead =
  "Esmu Ieva Jēkabsone, uztura konsultante. Ticu, ka uzturu maina mazi soļi, ne aizliegumi. Negribu, lai tu badojies vai skaiti katru kumosu. Gribu, lai tu saproti, kāpēc ēd tā, kā ēd, un lai tas der tavai ikdienai.";

export const disclaimer =
  "Šis plāns ir vispārīgs un izglītojošs. Tā nav medicīniska ārstēšana vai individuāls uztura plāns. Ja esi grūtniece, baro bērnu ar krūti, lieto medikamentus vai tev ir veselības problēmas (piemēram, diabēts, vairogdziedzera saslimšana vai alerģijas), pirms maini ēšanu konsultējies ar ārstu vai uztura speciālistu. Kaloriju un uzturvielu skaitļi ir aptuveni.";

export const tips = [
  "Ūdeni dzer vismaz 2 l dienā. Tēja un nesaldināti dzērieni skaitās, bet vismaz 1,5 l lai ir tīrs ūdens.",
  "Samazini sāli. Pievieno to jau gatavam ēdienam un izmanto rupjo sāli.",
  "Dzērieniem nepievieno cukuru. Ja vajag, lieto stēviju vai eritritolu.",
  "Izvairies no konservētiem, sālītiem, marinētiem un žāvētiem produktiem.",
  "Termiskai apstrādei izmanto tikai auksta spieduma (Extra Virgin) olīveļļu.",
  "Salātiem pievieno riekstu, avokado vai linsēklu eļļu. Tās nedrīkst karsēt.",
  "Garšvielas lieto pēc savas gaumes, bet bez pievienota sāls.",
  "Ēdot neskaties TV un nelieto telefonu. Koncentrējies uz ēšanu.",
];

export const adapt = [
  ["Izsalcis?", "Palielini olbaltumu un dārzeņu porciju, ne ogļhidrātus."],
  ["Par daudz ēdiena?", "Samazini putraimu vai maizes daudzumu."],
  ["Nepatīk produkts?", "Skaties aizstāšanas tabulu — gandrīz visu var nomainīt."],
  ["Aktīva diena?", "Pievieno uzkodu: olu, 30 g riekstu vai augli."],
];

export const howToUseSteps = [
  "Izlasi vispārīgos ieteikumus.",
  "Saliec nedēļas iepirkumu sarakstu un nopērc pamatproduktus.",
  "Apskati meal-prep karti — daļu ēdienu pagatavo vienreiz, apēd divreiz.",
  "Seko dienām. Ēd mierīgi, bez telefona.",
  "Katru vakaru pieraksti pašsajūtu.",
];

// Aizstāšanas grupas, kas neatkarīgas no plāna veida (graudi, dārzeņi, augļi, tauki).
// Olbaltumvielu un piena grupas atšķiras pa produktiem, tāpēc tās raksta katrs `data.mjs` pats.
export const swapsBase = [
  ["Graudi un ogļhidrāti", [
    ["Auzu pārslas", "Griķu pārslas vai muslis", "Muslim skaties sastāvu: bieži tur ir pievienots cukurs un eļļa."],
    ["Kuskuss", "Brūnie rīsi, kvinoja vai griķi", "Kuskuss ir gatavs 5 minūtēs, brūnie rīsi vārās ap 25. Plāno laiku."],
    ["Grūbas", "Mieži, kvinoja vai brūnie rīsi", "Grūbas pirms vārīšanas var izmērcēt — tad tās gatavojas ātrāk."],
    ["Lēcas", "Turku zirņi vai pupiņas", "Konservētās pirms lietošanas izskalo — tā atbrīvojies no liekā sāls."],
    ["Rupjmaize", "Rudzu vai pilngraudu maize", "Sastāvā pilngraudu miltiem jābūt pirmajiem, ne trešajiem."],
    ["Kartupeļi", "Saldais kartupelis, kālis vai ķirbis", "Saldais kartupelis ir saldenāks un gatavojas nedaudz ātrāk."],
  ]],
  ["Dārzeņi", [
    ["Spināti", "Rukola, kalē vai romiešu salāti", "Der jebkuri lapu zaļumi — svaigi vai saldēti."],
    ["Brokolis", "Ziedkāposts vai Briseles kāposti", "Tvaicē, nevis vāri ilgi — tā saglabājas vairāk vitamīnu."],
    ["Cukīni", "Baklažāns vai kabacis", "Baklažāns uzsūc vairāk eļļas — cep uz pannas ar mazāku liesmu."],
    ["Paprika", "Tomāti vai svaigs burkāns", "Ja recepte prasa ceptu papriku, burkānu sagriez plānāk."],
    ["Šampinjoni", "Jebkuras citas sēnes", "Meža sēnes ir aromātiskākas — tad garšvielu vajag mazāk."],
    ["Ķirbis", "Saldais kartupelis vai burkāns", "Garša sanāks saldenāka, bet kaloriju daudzums ir līdzīgs."],
  ]],
  ["Augļi un saldais", [
    ["Banāns", "Bumbieris vai ābols", "Ābolā ir mazāk cukura un vairāk šķiedrvielu — tas sātina ilgāk."],
    ["Svaigas ogas", "Saldētas ogas", "Saldētās ir tikpat vērtīgas un ziemā daudz lētākas."],
    ["Mango", "Persiks, nektarīns vai ananāss", "Ananāsu ņem svaigu vai savā sulā, ne sīrupā."],
    ["Greipfrūts", "Apelsīns vai mandarīni", "Ja lieto medikamentus, par greipfrūtu pajautā ārstam vai farmaceitam."],
    ["Tumšā šokolāde", "Sauja riekstu vai divas dateles", "Dateles ir saldas — divas ir porcija, ne sauja."],
    ["Medus", "Kļavu sīrups vai banāna biezenis", "Medu nekarsē virs 40 °C — tad tas zaudē daļu vērtīgā."],
  ]],
  ["Tauki un uzkodas", [
    ["Olīveļļa (cepšanai)", "Rapšu vai avokado eļļa", "Salātu eļļas — riekstu, linsēklu — karsēt nedrīkst."],
    ["Zemesriekstu sviests", "Mandeļu sviests vai tahini", "Sastāvā ideāli ir tikai rieksti un varbūt šķipsna sāls."],
    ["Rieksti", "Saulespuķu vai ķirbju sēklas", "Nosver 30 g. Sauja mēdz būt 50 g, un paka nav porcija."],
    ["Pesto", "Sasmalcināti zaļumi ar eļļu", "Mājās gatavotajā vari pats izvēlēties, cik daudz eļļas likt."],
  ]],
];

// Veikala sadaļas — lai staigā pa veikalu vienu reizi, nevis turp un atpakaļ.
export const sections = {
  "Dārzeņi un zaļumi": "Dārzeņi un augļi",
  "Augļi": "Dārzeņi un augļi",
  "Gaļa un zivs": "Gaļa, zivs, olas",
  "Olas": "Gaļa, zivs, olas",
  "Olbaltums": "Gaļa, zivs, olas",
  "Piena produkti": "Piena produkti",
  "Maize": "Maize un graudi",
  "Graudi un putraimi": "Maize un graudi",
  "Rieksti un sēklas": "Bakaleja",
  "Eļļas, garšvielas, citi": "Bakaleja",
};
export const sectionOrder = ["Dārzeņi un augļi", "Gaļa, zivs, olas", "Piena produkti", "Maize un graudi", "Bakaleja"];
