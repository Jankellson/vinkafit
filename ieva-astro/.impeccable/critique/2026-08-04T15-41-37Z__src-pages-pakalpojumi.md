---
target: pakalpojumu / piedāvājumu lapas
total_score: 31
max_score: 36
na_heuristics: 7
p0_count: 0
p1_count: 2
timestamp: 2026-08-04T15-41-37Z
slug: src-pages-pakalpojumi
---
Method: dual-agent (A: a75d9a87c818c6713 · B: a2929665e2ad7b294), plus operator-verified fixes applied between B and synthesis.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Handoff state is honest, but `mailto:` gives no signal that the mail client opened — inherent to the channel. |
| 2 | Match System / Real World | 3 | Seven feminine-only verb forms remain on pages the project broadened to a mixed audience, including the required consent checkbox. |
| 3 | User Control and Freedom | 3 | Fields are preserved and disabled rather than destroyed; copy-out and reopen paths exist. No edit-and-resend. |
| 4 | Consistency and Standards | 4 | `.applying-for-*` rules moved to globals.css; runtime-injected nodes now render inside the design system. |
| 5 | Error Prevention | 3 | Empty submit blocked by native validation (verified by real click). Consent still auto-checks two hidden legal boxes. |
| 6 | Recognition Rather Than Recall | 4 | `?paka=` renders offer name, price and credit rule at the top of the form, correctly typeset. |
| 7 | Flexibility and Efficiency | n/a | Persuade surface, single linear path. |
| 8 | Aesthetic and Minimalist Design | 4 | Contrast failures cleared; badge is a solid burgundy pill at 9.30:1; numerals at 5.16–6.44:1. |
| 9 | Error Recovery | 3 | The handoff box is a genuine recovery path. The `catch` branch is still unreachable on the mailto path. |
| 10 | Help and Documentation | 4 | FAQ on every page plus honest medical-scope disclaimers. |
| **Total** | | **31/36** | **Good (86%)** |

Heuristic 7 scored n/a. Applicable maximum 36. Previous run: 22/36 (61%).

## Design Specificity Verdict

**LLM assessment:** Authored, not category-interchangeable. The incumbent editorial world — Playfair italic `<em>` accents in plum headings, `--cream`/`--ivory` warm ground, hand-drawn burgundy-and-gold `.bicon` brand icons instead of a library, `border-radius: 180px 180px 14px 14px` arch-topped photos, 11px mono kickers at .14em — is a combination nobody reaches by installing a template.

Of the six elements added this session, five sit inside that world: the "Sāc šeit" badge reuses the kicker's exact typographic signature; `.sales-cta-strip` uses the same hairline (`rgba(132,24,62,.18)`) as the offer index and trust row; `.applying-for` now renders 32px Playfair over plum with a gold mono label. Only `.sales-sticky` is visually neutral — a plain plum bar with no serif, no gold rule, no `<em>`. It is acceptable because it is plain, not because it is designed; it should not be allowed to grow.

**Deterministic scan:** `detect.mjs` exit 2, **1 finding** across 30+ scanned files: `overused-font` at `src/components/SEOHead.astro:68` (Plus Jakarta Sans). This is a live font — `--sans` in `globals.css:21`, the site's body typeface — not dead code. The rule is a taste judgment about a common AI-default font, not a defect. Changing the body face is a redesign decision, deliberately not taken here.

**Visual overlays:** Not available — the browser pane is not displayed in this environment, so screenshot and injection overlay could not run. All measurements are DOM reads via `getComputedStyle` / `getBoundingClientRect`.

## Overall Impression

Previous run's summary was "a beautifully dressed shop with no till." The till now exists but is hand-cranked: applications reach Ieva through the visitor's own mail client, which a meaningful share of desktop and work-laptop visitors do not have configured.

The decision architecture that was missing is now present and measured: the 24-hour credit rule reaches the visitor 717px (desktop) / 338px (mobile) before the first price, one option is named as the starting point, and every page — including the 1500 € VIP page — asks for 49 €.

Biggest remaining opportunity: replace `mailto:` with a real endpoint. The `fetch` branch is already written and correct; it needs one constant.

## What's Working

**1. Every CTA on every page asks for 49 €.** The VIP page's hero button reads "Pieteikt sākuma konsultāciju — 49 €" on a 1500 € product. Most sites would put "Apply for VIP" there. Refusing to is the strongest conversion decision in the codebase and it matches the stated positioning.

**2. The credit rule is architecture, not decoration.** One rule, four touchpoints, each at the moment its specific hesitation occurs: above the price list on the hub, inside `.price-panel` on each detail page, in `.applying-for` on the form, and in the closing CTA strip.

**3. Brand icon and photographic discipline.** Hand-drawn `ieva-*-ikona.webp` icons with descriptive alt sentences; four distinct photos of Ieva doing nameable things. Every generic-site tell — Lucide, Feather, inline stroke SVG, stock photography — is absent.

**4. Honest scope boundaries.** Medical disclaimers on every page; the VIP page actively tells the visitor not to buy VIP if 90 days suffices, with a link to the cheaper option. In YMYL health, saying what you do not do is the cheapest credibility available.

## Priority Issues

### [P1] `mailto:` is a lossy channel and it is the only one

**What.** `FORM_ENDPOINT` is an empty string, so every application composes a `mailto:` and hands off to the visitor's mail client. The handoff state is now honest — heading reads "Vēl viens solis", the typed text is preserved and copyable, and a reopen link exists — but the channel still depends on the visitor having a configured mail client and completing a second manual send.

**Why it matters.** Chrome on a work laptop, Gmail-web-only users, and most Windows desktops without Outlook get no mail window. Those visitors now see a recovery path instead of a false thank-you, which is a real improvement, but the send still requires them to copy text into a webmail tab.

**Fix.** Set `FORM_ENDPOINT` to a Formspree free-tier endpoint (50 submissions/month). The `fetch` branch, the 2xx check, the error branch and the hidden `paka` field are already written and correct. This deletes the issue rather than mitigating it, and makes the currently-unreachable `catch` live.

**Suggested command:** `/impeccable harden kontakti`

### [P1] Feminine-only verb forms on pages broadened to a mixed audience

**What.** The project's own CLAUDE.md records that on 2026-06-10 the audience widened from "women 30–50" to a broad readership, and lists `pakalpojumi.astro` as still needing the pass. Still present:

- `pakalpojumi/sakuma-konsultacija.astro:12` — "esi izmēģinājusi", "neesi pārliecināta"
- `pakalpojumi/sakuma-konsultacija.astro:14` — "zini, ar ko sākt pati"
- `pakalpojumi/30-dienu-uztura-programma.astro:24` — "gatava"
- `pakalpojumi/90-dienu-uztura-programma.astro:22` — "gatava"
- `kontakti.astro:36` — "Neesmu pārliecināta" (FAQ)
- `kontakti.astro:163` — "Ko esi mēģinājusi?" (textarea placeholder)
- `kontakti.astro:171` — "Esmu izlasījusi un piekrītu…" (**required consent checkbox**)

**Why it matters.** Commercially: a man reading the 49 € consultation page is told twice that the text was not written for him, on the page carrying the entire conversion path — and specifically in the empathy paragraph. Legally: line 171 is the binding consent covering terms, an 18+ declaration, and waiver of the 14-day withdrawal right. A gendered first-person assertion in a binding consent is sloppy in a YMYL context.

**Fix.** Drop the participles rather than swapping gender. Line 12 → "Varbūt izmēģināts ir daudz, un nav skaidrs, kas tieši der tavā situācijā." (matches the existing `index.astro` pattern "Izmēģināts ir viss"). Line 14 → "zini, ar ko sākt saviem spēkiem". "gatava" → "ja ir gatavība sākt". Line 171 → "Piekrītu noteikumiem un privātuma politikai, esmu 18+, …". Also replace the untranslated "newsletter" at line 180 with "jaunumu vēstules". Route final wording through the `latviesu-valoda` skill per the project rules.

**Suggested command:** `/impeccable clarify kontakti`

### [P2] The stretched row link swallows the sibling link's hit area

**What.** `globals.css` — `.offer-index-copy h3 a::after { position: absolute; inset: 0; }` covers the whole `.offer-index-item`. The sibling `.offer-index-action a` ("Skatīt piedāvājumu") is not positioned, so the overlay paints above it.

**Why it matters.** Harmless for mouse users (same `href`), but a keyboard user tabs to a link whose hover and active states never fire and whose hit area belongs to a different element. Two tab stops, one destination, one of them phantom.

**Fix.** Add `position: relative; z-index: 1;` to `.offer-index-action a`, or remove that link entirely now that the whole row is clickable.

**Suggested command:** `/impeccable audit pakalpojumi`

### [P2] Consent bundling remains a legal-review item

**What.** `#c-consent-rules` auto-checks two hidden inputs (`c-consent-age`, `c-consent-service`), bundling terms, privacy, 18+, the medical disclaimer, and waiver of the 14-day withdrawal right into a single checkbox.

**Why it matters.** Outside design remit, but bundling a statutory withdrawal waiver with a privacy consent is worth a lawyer's eye before launch. Unchanged from the previous run.

**Fix.** Legal review, not a code change.

### [P3] TrustRow reads as a compliance strip

**What.** Three 11px uppercase mono strings at identical size, colour and letter-spacing, on a hairline-topped row — the same visual register as `.offer-disclaimer` two elements below. On mobile it collapses to three stacked lines.

**Why it matters.** All three claims check out against the authorised evidence list, and the component's own comment enforces that discipline. The problem is weight, not honesty: the strongest available fact ("vairāk nekā 50 klienti") renders smaller than the FAQ questions above it.

**Fix.** Break the parallelism — render "50+" at 32px `var(--serif)` `var(--plum)` with "klienti individuālajā darbā" beneath it at the current 11px mono; leave the other two as-is. Invents nothing. Do not add testimonials, screenshots or result claims — none exist.

**Suggested command:** `/impeccable bolder pakalpojumi`

## Regressions Introduced and Fixed This Session

Recorded because they were operator-caused, caught by the re-run, and verified fixed:

1. **`.applying-for` rendered unstyled.** Astro scopes `<style>` by stamping `data-astro-cid-*` on build-time elements. The panel's children were injected via `innerHTML` and carried only `class`, so every rule failed — measured 17px Plus Jakarta Sans inline where 32px Playfair block was authored, producing the run-together string "Piesakies30 dienu programma249 €". Fixed by moving the rules to `globals.css`. Verified: 32px Playfair, block, gold label.
2. **False success plus data loss on the mailto path.** `showSent(true)` fired unconditionally after `window.location.href = mailto:` — which never throws — setting the heading to "Paldies!" and hiding `#contactFields`. A visitor with no mail client lost both the lead and their typed message. Replaced with `showHandoff()`: heading "Vēl viens solis", fields preserved and disabled, a read-only copyable transcript, a copy button, and a reopen link. `aria-live="polite"` added so screen readers hear the change. Verified end to end.
3. **Badge contrast 1.03:1.** The new solid burgundy pill inherited `--ink-soft` because `.offer-index-copy p` (specificity 0,1,1) outranked `.offer-index-badge` (0,1,0). Fixed by scoping to `.offer-index-copy .offer-index-badge`. Verified 9.30:1.
4. **Global mobile padding.** `body { padding-bottom: 64px }` applied to every mobile page, not only those with a sticky bar. Scoped to `body:has(.sales-sticky)`. Verified: 64px with the bar, 0px without.

## Verified Fixed Since the Previous Run

- Empty submit no longer produces a false success — confirmed by real button click on the live page.
- Dead address `info@ievajekabsone.lv` replaced in 17 lines across six files, including both legal pages where it served as the data-controller contact.
- 24-hour credit rule now precedes the price list by 717px (1440px) / 338px (390px).
- Contact form moved from y=1509 to y=578 on mobile; social exit links moved below it.
- Step numerals: 2.09:1 → 6.44:1. Offer index numerals → 5.16–6.44:1.
- Heading level skip (H2→H4) cleared on all three pages; one H1 each.
- All images on all three pages carry alt, width and height.
- Sticky bar does not overlap the footer: footer bottom 780.5px, sticky top 789.3px at full scroll.
- Broken TikTok link (`@ieva.jekabson`) corrected in the footer.
- No console errors on any page.

## Questions to Consider

1. **What is actually blocking Formspree?** The constant exists, the fetch branch is written, the free tier covers 50 submissions a month, and a practice booking four clients a month will not exceed it. Cost, an account, or that nobody has said "do it today"?
2. **If everyone starts with the 49 € consultation, why does the hub render four offers as peers?** The 30/90/VIP pages exist to be read after the consultation or by someone already convinced. What breaks if the hub leads with one large consultation block and demotes the other three to a compact "kas notiek pēc tam" list? That is the layout the copy already argues for.
3. **"Vairāk nekā 50 klienti" and not one of them is quotable — is that a proof problem or a permission problem?** Fabrication is off the table. But 50 real clients is 50 people who could be asked one question by email. The gap between "no proof exists" and "no proof has been requested" is one afternoon, and it is the highest-leverage unbuilt asset on this site.
4. **Who is the 1500 € VIP page for, and do they read websites?** Someone buying six months of priority access almost certainly arrives through the consultation or a referral, not a cold read. If so, the VIP page's real job is to anchor the other three prices — which changes how it should be designed, and might make it a section on the hub rather than a page.
