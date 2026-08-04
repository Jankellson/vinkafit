---
target: pakalpojumu / piedāvājumu lapas
total_score: 22
max_score: 36
na_heuristics: 7
p0_count: 1
p1_count: 2
timestamp: 2026-08-04T14-17-36Z
slug: src-pages-pakalpojumi
---
Method: dual-agent (A: a16eabdbb9f31327e · B: a696f6c63d42448ca)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 1 | Form reports "Paldies!" while sending nothing. Success state is unconditional. |
| 2 | Match System / Real World | 4 | Native, idiomatic Latvian throughout. No calque, no marketing patois. |
| 3 | User Control and Freedom | 2 | Submission irreversible and unconfirmed; no review step, no email receipt. |
| 4 | Consistency and Standards | 4 | Shared class contract across all four offer pages; prices identical everywhere. |
| 5 | Error Prevention | 0 | `novalidate` disables native validation; four `required` fields enforce nothing. |
| 6 | Recognition Rather Than Recall | 2 | Prices on hub (good), but `/kontakti` shows no "you are applying for X · 49 €" summary. |
| 7 | Flexibility and Efficiency | n/a | Persuade surface, single linear path, no repeat/expert usage to optimise. |
| 8 | Aesthetic and Minimalist Design | 4 | Restrained palette, hairline rules, 60–66ch prose, generous vertical rhythm. |
| 9 | Error Recovery | 0 | No error states exist anywhere in the form. Not weak — absent. |
| 10 | Help and Documentation | 3 | FAQ + medical-scope disclaimer do real work, but collapsed by default. |
| **Total** | | **22/36** | **Acceptable (61%)** |

Heuristic 7 scored n/a (Persuade surface). Applicable maximum 36.

## Design Specificity Verdict

**LLM assessment:** Authored for this product, not category-interchangeable. The offer hub uses a hairline-ruled editorial index (`border-top: 1px solid rgba(132,24,62,.18)`), not a 3-up SaaS card grid. Photo crops use `border-radius: 180px 180px 14px 14px` — a deliberate arch/apse silhouette recurring across hero and content images. Palette (`--plum #3c1220`, `--burgundy #841e3e`, `--gold`, `--cream #fcfbf7`) with serif H1s carrying burgundy italic `<em>` emphasis is a real typographic voice applied with discipline. Every image is Ieva doing a specific nameable thing; every icon is a custom brand icon (`.bicon`), not a library icon. Weak spot: `.sales-hero::after` renders a 360px blurred gold circle — a 2019 SaaS gradient blob, the one borrowed element.

**Deterministic scan:** `detect.mjs` exit code 2, **1 finding** across `pakalpojumi.astro`, `src/pages/pakalpojumi/`, `kontakti.astro`, `BaseLayout.astro`, `src/components/`. Rule `overused-font` (warning/slop) at `src/components/SEOHead.astro:68` — a Google Fonts reference to Plus Jakarta Sans. Likely stale: the rendered UI computes to the project's serif/burgundy system, not Plus Jakarta Sans. Worth removing as a dead font request either way (it costs a preconnect and a download).

A near-clean deterministic scan on 30+ scanned files is a genuinely strong result. The detector found almost nothing because the craft layer is solid.

**Visual overlays:** Not available. Browser pane is not displayed in this environment, so screenshot and script-injection overlay flow could not run. All measurements below come from `read_page`, `get_page_text`, and `javascript_tool` computed-style / `getBoundingClientRect` reads — DOM-measured, not eyeballed.

## Overall Impression

The craft layer is 4/4 and the transaction layer is 0/4. Photography, typography, palette, spacing, copy voice, and honesty are executed at a level most Latvian service sites never reach. What is missing is not taste. It is (a) a working form, and (b) an opinion about which of the four offers the visitor should buy.

Biggest opportunity: the site currently converts at zero regardless of design quality, because every lead is discarded.

## What's Working

**1. The photographic and iconographic system is the moat.** Four distinct photos of Ieva, each doing a nameable thing, with alt text carrying offer meaning rather than describing pixels. Custom `.bicon` brand icons instead of Lucide/Feather. This sells a person, and the visitor's real question is "can I work with this woman for three months?" The photos answer it. No competitor copies this without hiring a photographer.

**2. Latvian copy is native-thought, not translated.** "Tu negribi vēl vienu PDF, kas paliek mapē." "Vērtība nav vairāk lapās. Vērtība ir pieejamībā." "Neesmu treneris ar garantijām — esmu speciālists ar procesu." Idiomatic, specific, structurally un-English. The audience is sceptical of being sold to, and translated marketing Latvian triggers that scepticism instantly. This copy never trips it.

**3. Honest scope boundaries as a trust device.** Every page carries a disclaimer limiting blood-test interpretation to nutrition/lifestyle context. VIP's FAQ states outright that future courses are not included. The 30-day FAQ answers "does 30 days solve everything?" with "Nē." In YMYL health, saying what you don't do is the cheapest credibility available, and most competitors won't do it.

## Priority Issues

### [P0] The application form sends nothing and reports success anyway

**What.** `src/pages/kontakti.astro:238-248`. The `<form id="contactForm" novalidate>` has no `action` and no `method` (verified: both null). A grep of the entire file for `fetch(`, `action=`, `method=`, `formspree`, `api/` returns zero matches. The only submit handler calls `e.preventDefault()` and then unconditionally rewrites the H2 to "Paldies!", sets the note to "Saņēmu tavu ziņu. Atbildēšu 24 stundu laikā uz norādīto e-pastu.", and hides `#contactFields`. Assessment B dispatched a submit with all fields empty and captured the network log: no POST, no fetch, no XHR — only pre-existing Vite dev-asset GETs. `novalidate` also disables native constraint checking, so the four `required` fields (`c-name`, `c-email`, `c-message`, `c-consent-rules`) enforce nothing on a real click either.

**Why it matters.** This is the terminal node of the entire site. Every CTA on all four offer pages, both header CTAs, and the mobile menu funnel to `/kontakti?paka=…`. 100% of leads are destroyed, and each person is told their message was received and will get an answer within 24 hours. The GDPR consent checkbox is recorded nowhere while the page promises "Tava informācija paliek pie manis." Every other finding here is cosmetic next to this one.

**Fix.** (a) Add a real endpoint — Formspree `action`/`method`, or an Astro server endpoint at `src/pages/api/pieteikums.ts`. Keep the JS handler, but make it `await fetch()` and only show the success state on a 2xx. (b) Remove `novalidate`, or add explicit per-field error rendering. (c) Add a failure branch: on non-2xx show "Neizdevās nosūtīt. Uzraksti tieši: info@ievajekabsone.lv" with a mailto fallback. (d) Add a hidden `<input name="paka">` populated from the URL param, so the tier the lead came from is actually transmitted — right now that intent lives only in a `<select>` that is never sent.

**Suggested command:** `/impeccable harden kontakti`

### [P1] The offer hub shows four options with no recommendation, and hides the tie-breaker below them

**What.** `src/pages/pakalpojumi.astro`, `.offer-index-list`. Four `.offer-index-item` rows measure exactly 194px each at 1440px — identical visual weight. No featured state, no badge, no default. Price renders at 16px while the offer name renders at 28px serif, so the number the visitor is scanning for is the smallest text in the row. The `.offer-note-section` carrying "Ja nezini, ar ko sākt, sāc ar konsultāciju" and the 24-hour credit rule sits at y=1991 of a 2899px page — 69% down, entirely below the list.

**Why it matters.** PRODUCT.md states the goal is helping the visitor pick a level and apply for the 49 € consultation. The page does the first half and abandons the second. A visitor facing 49/249/549/1500 € — a 30× spread — with no guidance defaults to the safest available action: leaving. The 24-hour credit is what makes 49 € feel like zero risk, and it arrives after the price objection has already formed. On mobile the four rows span y=1272→2644 of a 4372px page, so two options are never visible at once and comparison is pure memory work.

**Fix.** (1) Move the entire `.offer-note-section` block above `.offer-index`, immediately after the hero. (2) Add a `.offer-index-item--featured` modifier to the consultation row: `background: var(--ivory); border-left: 3px solid var(--gold); padding-left: 20px;` plus a "Sāc šeit" badge using the existing `.offer-kicker` treatment. (3) Raise `.offer-index-action strong` from 16px to 22px and set `font-family: var(--serif)`.

**Suggested command:** `/impeccable layout pakalpojumi`

### [P1] Four thousand pixels of persuasion with nowhere to act, and pages that end on a legal disclaimer

**What.** `/pakalpojumi/sakuma-konsultacija` measures 6870px at 390px wide with CTAs only at y=572 and y=4625. `.sales-faq` runs y=5066→6870 and terminates the page. On the 30-day and VIP pages the final DOM element is the medical disclaimer about diagnoses and medication.

**Why it matters.** Peak-end rule: the last impression on every sales page is a liability warning. The visitor whose conviction peaks during `.sales-process` or `.sales-fit` — the two sections doing the actual persuading — must scroll roughly 2500px further to find a button. On mobile that is exactly where people quit.

**Fix.** (a) Add a `.sales-cta-strip` after `.sales-faq` on all four detail pages: `background: var(--ivory)`, one H2, one `.btn.btn-primary` to `/kontakti?paka=…`, with the disclaimer demoted below it at 13px italic. (b) Add a mobile-only sticky footer CTA: `@media (max-width: 620px) { .sales-sticky { position: sticky; bottom: 0; padding: 12px 16px; background: var(--plum); } }` carrying "Pieteikt konsultāciju — 49 €".

**Suggested command:** `/impeccable layout pakalpojumi`

### [P2] `/kontakti` loses the momentum it was handed

**What.** The `?paka=` param works (verified: `#c-service` value resolves to `sakuma-konsultacija`), but that silent preselect is the entire handoff. At 390px `#contactForm` starts at y=1509 — behind a hero, three saturated social buttons, a four-row contact table, a pull-quote and a photo. Nothing on the page states what the visitor is applying for or that it costs 49 €. The 24-hour credit rule exists only inside a collapsed `<details>` and is absent from `document.body.innerText`.

**Why it matters.** The visitor just crossed from browsing to buying. Landing on a page that treats them as a generic enquiry — with three exit links competing above the form — reopens a decision they had already closed.

**Fix.** (a) When `?paka=` is present, render a summary panel above the form reusing `.price-panel` styling: "Piesakies: Sākuma konsultācija · 49 € — ja 24 stundu laikā izvēlies programmu, šo summu ieskaitu tās cenā." (b) On mobile reorder: `@media (max-width: 850px) { .contact-form { order: -1; } }`. (c) Move `.social-icons-row` below `.contact-details`.

**Suggested command:** `/impeccable layout kontakti`

### [P2] The one hard credential exists only inside an alt attribute

**What.** "ITEC sertificēta uztura konsultante" appears on `/pakalpojumi` exclusively inside `alt=""` on `.offer-hero-photo img` (line 72). No sighted visitor ever reads it. Across all four offer pages: zero visible credentials, zero testimonials, zero client counts, zero result data. The project's own CLAUDE.md records approved social proof — "vairāk nekā 50 klienti" — used on `index.astro` but not on the pages where money is asked for.

**Why it matters.** These pages ask up to 1500 € from a sceptical stranger on Ieva's word alone. She has real, non-fabricated assets — a certification, a client count, a stated response-time commitment — and none appear at the point of purchase.

**Fix — using only what already exists.** Add a `.trust-row` strip below `.offer-index-list` on the hub: three items in `.offer-kicker` type — "ITEC sertificēta uztura konsultante" · "Vairāk nekā 50 klienti" · "Konsultācijas latviski un krieviski, tiešsaistē". Repeat under `.price-panel` on each detail page. Do not fabricate testimonials or results; the project has none and inventing them is forbidden.

**Suggested command:** `/impeccable clarify pakalpojumi`

## Persona Red Flags

**Riley (stress tester):** Fills nothing, clicks "Nosūtīt ziņu", receives "Paldies! Saņēmu tavu ziņu." Opens DevTools, sees `<form novalidate>` with no `action`, sees `preventDefault()` with no `fetch`, concludes the business is theatre. Exact failures: `#contactForm[novalidate]`, missing action/method, unconditional `preventDefault()` at `kontakti.astro:241`, four `[required]` attributes that enforce nothing.

**Casey (distracted mobile user):** Lands on a 6870px page, gets interrupted, returns mid-`.sales-process` around y=2000 and finds no button within reach — the next CTA is 2600px away. Via the hub, `.offer-index-action a` measures 143×23px, roughly half the 44px minimum touch target; `.nav-toggle` is 36×36px. Exact failures: no sticky mobile CTA, the y=572→y=4625 CTA gap, 23px-tall offer links, 36px nav toggle.

**Jordan (confused first-timer):** Reads "Viena ieeja. Četri piedāvājumi." then meets four rows of identical 194px weight spanning 49 € to 1500 €. No basis to choose. The rescuing sentence sits at y=1991, below every option, so the price objection forms ~900px before the answer appears. Exact failures: no featured state, `.offer-note-section` ordered after `.offer-index`, price 16px vs name 28px.

**"Inese", 41, four failed diets, allergic to being sold to (project-specific):** The copy wins her over — "pirmais solis, nevis pārdošanas zvans", "Šeit nav universālas ēdienkartes", no before/after photos, no countdown timers, and "3 vietas gadā" reads as real capacity rather than manufactured scarcity. No shame problems found anywhere. Then she looks for evidence it worked for someone like her and finds none; the ITEC credential is trapped in an alt attribute. She decides 49 € is survivable anyway — without knowing it is credited back, because that rule is at 69% depth on the hub and inside a closed accordion on `/kontakti`. She reaches the form at y=1509 on mobile, past three social buttons, and is asked "Kāda ir tava lielākā cīņa šobrīd? Ko esi mēģinājusi?" — an emotionally expensive open field on a page that has shown her no proof and no risk-reversal. And if she pushes through, the form throws her application away and thanks her.

## Minor Observations

- **Contrast failure:** `.sales-steps span` (the 01/02/03 step numbers) computes to `rgb(217,168,90)` on `rgb(252,251,247)` = **2.09:1**, against a required 4.5:1. At 12px bold it does not qualify as large text. These carry sequence meaning.
- **Heading level skip on all three pages:** H2 → H4 with no H3, immediately before a trio of H4s — a repeated card component. Affects screen-reader navigation and is a five-minute fix.
- **Two images missing width/height** (layout shift risk): `ieva-relaxed.webp` on the hub, `ieva-jekabsone-uztura-pieraksti-kafejnica.webp` on the consultation page. All other images carry explicit dimensions.
- **Zero images missing alt** across the pages scanned. Alt text quality is genuinely high.
- **Reduced motion is respected** — four `@media (prefers-reduced-motion)` blocks in `globals.css` (lines 739, 2088, 2150, 2421).
- **No console errors** on any of the three pages.
- `.sales-hero::after` — a 360×360px `rgba(235,192,126,.16)` blurred circle bleeding off-canvas. The only generic-SaaS element in an otherwise authored system.
- Three identical CTA destinations visible on one screen (hub hero button, `.offer-note` button, header CTA) all pointing to `/pakalpojumi/sakuma-konsultacija`.
- `.offer-index-copy h3 a` has no visual link affordance; the row's only clickable cue is a small "Skatīt piedāvājumu →". Make the whole 194px row a target.
- The 30-day H1 leads with "svara zaudēšanai" while that page's own FAQ says the programme suits people not chasing weight loss. SEO title contradicts brand positioning ("adaptation, not prohibitions") — the one place copy contradicts itself.
- `.sales-fit-note` cross-links only ever point to the 90-day programme, from both the 30-day and VIP pages. Nothing links back down to the consultation. The ladder is a one-way street toward the middle.
- **Legal, outside design remit but worth a lawyer's eye:** `#c-consent-rules` auto-checks two hidden inputs, bundling terms + privacy + 18+ + medical disclaimer + waiver of the 14-day withdrawal right into a single checkbox.

## Questions to Consider

1. If the 49 € consultation is credited back against any programme bought within 24 hours, why price it rather than frame it as a deposit? "49 € depozīts, ko ieskaitu programmas cenā" converts differently from "49 € konsultācija" — one is a commitment device, the other is a purchase to justify. The mechanic already in place is stronger than the words used for it.
2. Why does the hub sell four things when the stated conversion path is one? Every programme page already routes through the consultation. The four-way comparison answers a question the visitor does not need to answer yet — and that comparison is what causes the paralysis.
3. The site has no proof and will not invent any — so what is the cheapest honest proof available this month? A 60-second video of Ieva explaining what happens in the consultation (proof of manner, which is what this audience actually buys); a photo of the ITEC certificate; one real client quote with consent. Which can she deliver this week?
4. What would this look like if the visitor never had to leave the offer page to apply? Current path is hub → detail → `/kontakti` → form at y=1509 → nothing. An inline form in `.sales-price` — name, email, one sentence, consent — collapses that to zero navigations, and `.sales-price` is already the visual climax of every page.
