// Zīmola krāsas un drukas modelis — kopīgi VISIEM PDF produktiem (uztura plāni un ceļveži).
// Te ir tikai tas, kas nedrīkst atšķirties starp produktiem: krāsas, fonti, lapas modelis,
// virsraksti, callout un citāts. Produkta specifiskais izkārtojums paliek attiecīgajā būvētājā.
//
// ⚠️ Atpakaļpēdiņas šajā failā (arī komentāros) lauž būvi — CSS dzīvo JS template literal iekšpusē.

export const C = {
  burgundy: "#84183e", gold: "#ebc07e", cream: "#fcfbf7",
  ivory: "#f0eee9", ink: "#2a1419", inkSoft: "#5a3a40",
};

export const pamataStils = `
:root{--plum:#3c1220;--panel:#fbfaf8;--panel-line:#edeae3;--burgundy:${C.burgundy};--gold:${C.gold};--cream:${C.cream};--ivory:${C.ivory};--ink:${C.ink};--ink-soft:${C.inkSoft}}
*{box-sizing:border-box}

/* ══ DRUKAS MODELIS ═══════════════════════════════════════════════
   Saturs PLŪST pa loksnēm; pārlūks lapo pats. Agrāk katra sadaļa bija
   fiksēta 297 mm kaste ar min-height + overflow:hidden — kaste, kas
   nesatilpa, izauga garāka par A4 un tika pārgriezta pušu nejaušā vietā.
   Tagad lūzuma vietas nosaka break-* likumi.
   ═════════════════════════════════════════════════════════════════ */
@page{size:A4;margin:15mm 16mm}
@page:first{margin:0}
html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{background:#fff;margin:0;font-family:'Plus Jakarta Sans',system-ui,sans-serif;color:var(--ink);font-size:14.5px;line-height:1.55}
h1,h2,h3,h4{font-family:'Playfair Display','Georgia',serif;font-weight:600;letter-spacing:-.01em}

/* Sadaļa sākas jaunā loksnē, bet drīkst brīvi turpināties nākamajā. */
.page{break-before:page;position:relative}
.page:first-child{break-before:auto}
.callout{break-inside:avoid}
tr,img,svg{break-inside:avoid}
/* Virsraksts nekad nepaliek viens loksnes apakšā. */
.sect-h,.mini-h,h1,h2,h3,h4{break-after:avoid}
p,li{orphans:3;widows:3}
thead{display:table-header-group}

/* Vāks — vienīgā fiksētā loksne, pilnā izlaidumā. */
.cover{height:297mm;width:210mm;margin:0 auto;overflow:hidden}

@media screen{
  body{background:#d8d4cc;padding:24px 0}
  .page{width:210mm;margin:0 auto 24px;background:#fff;padding:15mm 16mm;box-shadow:0 12px 40px rgba(42,20,25,.18)}
  .cover{padding:0}
}

/* Sadaļas virsraksts ar zelta svītru. */
.sect-h{font-size:30px;color:var(--burgundy);margin:0 0 6px}
.sect-h::after{content:"";display:block;width:54px;height:3px;background:var(--gold);margin-top:12px;border-radius:2px}
.lead{font-size:16px;color:var(--ink-soft);max-width:62ch;margin:18px 0 22px}
.mini-h{font-size:20px;color:var(--burgundy);margin:26px 0 12px}

/* Izcēlums. Gaišs panelis ar zelta svītru — zīmola standarts, NE smags bēšs. */
.callout{border-left:4px solid var(--gold);background:var(--panel);border-radius:0 12px 12px 0;padding:16px 22px;margin:8px 0}
.callout>b{color:var(--burgundy);display:block;margin-bottom:4px}
.callout p{margin:0;color:var(--ink-soft);font-size:14px}
.callout p+p{margin-top:8px}
.callout p b{color:var(--burgundy)}
.callout.warn{border-left-color:var(--burgundy)}

/* Pieteikšanās poga — konsultācijas saite visos produktos. */
.btn-cta{display:inline-block;background:var(--burgundy);color:var(--cream);text-decoration:none;font-weight:600;font-size:14.5px;padding:13px 28px;border-radius:30px;margin-top:6px}
.cta-box{text-align:center;background:var(--panel);border:1px solid var(--panel-line);border-radius:16px;padding:30px 24px;margin:20px 0}
.cta-box p{max-width:52ch;margin:0 auto 16px;color:var(--ink-soft);font-size:14.5px}
.cta-box p b{color:var(--burgundy)}
`;

export const KONSULT_URL = "https://ievajekabsone.lv/pakalpojumi/sakuma-konsultacija/";
