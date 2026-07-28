# 00 — SĀKUMS (priekšdurvis) · VinkaFit / Ieva Jēkabsone

> **Šo failu lasa PIRMO katrā jaunā sesijā.** Te ir: kur esam · kas tālāk · kur ko meklēt.
> Detaļas tikai attiecīgajā Tier-2 failā — nelasi visu uzreiz.
>
> **Ground-truth princips:** uzticamā patiesība = reālais **kods** (`ieva-astro/`) + **Ievas vārdi**
> (`klients/IEVA-POZICIJA.md`, `klients/avoti/Q&A.txt`) + **saglabātie lēmumi** (`LEMUMI.md`).
> Vecie stratēģijas dokumenti (`strategija/`) var būt daļēji novecojuši — saskaņot, ne uzticēties akli.

---

## 1. Kur esam (state · 2026-06)

Ievas (uztura konsultante) mājaslapa **Astro + Sanity** pašlaik ir tikai lokāli uz Jāņa datora; tā nav publicēta.
13 lapas gatavas + 2 Uztura ABC raksti (šķīvja metode, makrouzturvielas).

**Fundamentāla virziena maiņa šajā posmā:** no "SEO satura bibliotēka / viss bez maksas"
uz **"produkti = prioritāte, saturs = dzinējs"**. Robeža: bezmaksas = zināšanas (kas/kāpēc),
maksas = pielāgošana / gatavs darbs (kā tieši man). Sk. `klients/PRODUKTI-STRATEGIJA.md`.

🔄 **Maiņa kodā daļēji ielikta (2026-06-03):** sākumlapā (`index.astro`) "viss bez maksas" noņemts
→ *"Zināšanas ir brīvas. Tava sistēma — tas ir darbs."* (Guide + Trust-signal). Atlikušas: `par-mani`,
`pakalpojumi` (STATUSS #3). Bezmaksas lead magnet "5 kļūdas" paliek (piltuves āķis).

🎨 **Vizuālā spēja (2026-06-10):** REĀLO foto-infografiku pipeline — `npm run gen:infographic`
(Nano Banana Pro ēdiena foto + latviešu teksts virsū). 3 infografiku stili + image-SEO dokumentēti
`ieva-astro/CLAUDE.md`. Noteikums: raksts ≠ teksts blāķis (dažādi layouti). Pirmā: `esanas-biezums` "Nemanāmās kalorijas".

## 2. Kas tālāk (prioritāšu secībā — pilns saraksts `STATUSS.md`)

> **Pretparalīzes likums:** pēc šīs tīrīšanas — NEKĀDA meta/sistēmas darba, kamēr nav
> nosūtīts **Produkts #1**. (Produkts #1 šobrīd ⛔ bloķēts — nav source failu — tāpēc darām nebloķētos.)
>
> ⭐ **Nākamais fokuss (Jānis, 2026-06-03): ABC lapas** (precizēt — Solis B #6 / jauni raksti / kategoriju apraksti #4).

1. **Produkts #1 — 10-dienu uztura plāns** — ⛔ BLOĶĒTS (nav source failu; atgūt no vecās platformas). Pulēt, kad pieejami.
2. **Makro kalkulators** ar mērķos balstītu pielāgošanu (CLAUDE.md Solis A).
3. **Galveno lapu teksts** Ievas balsī — noņemt "viss bez maksas", pievienot produktu CTA.
4. **SEO meta visām lapām** + Uztura ABC kategoriju apraksti.
5. **Pakalpojumu lapa + cenas** (sk. atvērto jautājumu par cenu zemāk).
6. **Solis B** — inline citāti, dzēst "Ko saka zinātne" sekcijas (abās ABC lapās).

## 3. Kur ko meklēt (karte)

```
00-SAKUMS.md      ← šis fails (priekšdurvis: state + indekss)
STATUSS.md        ← vienotais todo/done saraksts (VIENMĒR atjauno uz "saglabā")
LEMUMI.md         ← lēmumu žurnāls (1 rinda/lēmums, append-only)

ieva-astro/       ← TIKAI mājaslapa (kods). Sava CLAUDE.md = koda/satura noteikumi.
                    GROUND-TRUTH par to, kas reāli uzbūvēts.

klients/          ← Ievas balss, produkti, konteksts (ground-truth tier)
  IEVA-POZICIJA.md       ← balss + 14 nostājas (audio intervija) — lasi PIRMS satura
  PRODUKTI-STRATEGIJA.md ← produkti + lead magnets + cenu pieeja
  0A-Klienta-Brifs.md, 0B-Dzila-Atklasana.md ← JTBD, pozicionējuma pamati
  avoti/  Q&A.txt (Ievas oriģinālā anketa), Brand-Values-Vinkafit.txt (personas v1)

strategija/       ← Tier 2: 1-Konkurenti … 8-Customer-Journey (lasa TIKAI vajadzīgo)
                    ⚠️ daļa balstīta uz veco "Hormozi bez maksas" modeli — sk. tabulu §4

arhivs/           ← novecojušais (NEDZĒŠ, tikai šeit): KONTEKSTS, START-HERE, PROJEKTS,
                    NAKAMA-SESIJA, Website-text-OLD, website-prototype/
_BACKUP-pirms-reorg_2026-06-03/  ← pilna kopija pirms šīs pārkārtošanas (atkāpšanās versija)
```

## 4. Veco dokumentu statuss (pret ground-truth)

| Statuss | Faili | Piezīme |
|---|---|---|
| ✅ Aktuāls | `ieva-astro/` kods, `klients/IEVA-POZICIJA`, `klients/PRODUKTI-STRATEGIJA`, `LEMUMI`, `STATUSS`, `klients/avoti/Q&A.txt`, `strategija/0B,1,2,2B,8` | Ground-truth + derīga izpēte |
| 🟡 Daļēji | `strategija/0A,3,5,6C,6F` | Saturs der; vinkafit.lv/cenas/"bezmaksas" novecojuši |
| 🟠 Daļēji novecojis | `strategija/4-Zimola`, `6-Marketinga`, `7-Majaslapas` | "Viss bez maksas" (Hormozi) copy jāsaskaņo. (7-Majaslapas arhitektūra Astro+Sanity+Systeme.io = PAREIZA.) |
| ❌ Novecojis (arhīvā) | `arhivs/KONTEKSTS`, `START-HERE`, `PROJEKTS`, `Website-text-OLD`, `website-prototype` | WordPress, vinkafit.lv, Ieva Vinka — vēsturiski |

**Konkrētie konflikti, ko ņemt vērā:**
- **Platforma:** Astro (publiskā) + **Sanity** (CMS/saturs) + **Systeme.io** (biznesa backend: produkti, e-pasts, checkout). NE WordPress.
- **Domēns/zīmols:** **ievajekabsone.lv** (NE vinkafit.lv / @vinkafit / "Ieva Vinka").
- **Filozofija:** produkti = prioritāte; "viss bez maksas" leņķis tiek noņemts.

## 5. Atbildēts (Jānis, 2026-06-03)

1. **Cena:** €35/65/125 (kods) = pagaidu, nav autoritatīvs. €40 bija sens viena mēneša darbs ar cilvēku
   (cenas vēl nebija pārdomātas). → Cenu + piedāvājuma struktūra jāveido no jauna ar **Hormozi** metodi.
2. **"Viss bez maksas" — JĀ, ņem nost.** Vajadzīgi digitālie produkti; "viss bezmaksas" tiem pretrunā.
   Robeža paliek: bezmaksas = zināšanas + lead magnets; maksas = pielāgošana / gatavi produkti.
3. **Systeme.io PALIEK** (produkti, mārketings, e-pasts, checkout). Sanity = TIKAI CMS (blogs/saturs).
   → `strategija/7-Majaslapas` arhitektūra (Astro + Sanity + Systeme.io) ir pareiza.

⛔ **Produkts #1 bloķēts:** nav source failu — atgūt no vecās platformas. Tāpēc darām nebloķētos uzdevumus.

## 6. Saglabāšanas rituāls

Kad Jānis saka "saglabā" (vai sesijas beigās): atjauno `STATUSS.md` (vienmēr) + attiecīgo
pārvaldošo failu, pieraksti virziena maiņu `LEMUMI.md` (1 rinda), pārbaudi vai izmaiņa
nekonfliktē ar `strategija/*` — ja konfliktē, ieraksti STATUSS zem "Veco dokumentu saskaņošana".
Pilns rituāls: `ieva-astro/CLAUDE.md` → "SAGLABĀŠANAS RITUĀLS".

---

*Standarta pieeja (mapju veidne + priekšdurvis) jāieliek `Brand-Marketing-Skills/PROJEKTA-OS.md`,
lai citi projekti sākas tāpat. (STATUSS · pēc Produkta #1.)*
