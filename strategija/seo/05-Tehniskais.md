# 05 — TEHNISKĀ SEO + schema

> Indekss: [00-INDEX.md](00-INDEX.md) · **Metode/būve:** skils `astro-builder` (SEOHead.astro, schema templates,
> sitemap, robots.txt, Core Web Vitals). Kods-noteikumi → `../../ieva-astro/CLAUDE.md` (§ Tehniskie noteikumi).
> Šeit = Ievas checklist + statuss. Statuss: ✅ · 🔲 · ❓.

## SOLIS 7 — checklist

```
AUGSTA (pirmās 30 dienas):
🔲 GSC + GA4 (vai Plausible) — ⚠️ ID vēl nav uzstādīti (sk. ../STATUSS.md tehniskais)
❓ XML sitemap + robots.txt · meta title+desc katrai lapai (LV+RU) · H1+atslēgvārds
❓ Attēlu alt teksti · mobile-first · Core Web Vitals (LCP<2.5s, CLS<0.1) · HTTPS · 404 handling

VIDĒJA (90 dienu):
🔲 Schema (Person + LocalBusiness + Service + FAQ + Article) · GBP pilnībā · hreflang LV↔RU
❓ Internal linking · WebP attēli · canonical URLs

🟡 AEO papildinājumi:
🔲 Kalkulatori/atvērti rīki (AI var izmantot) · llms.txt · robots.txt AI bots (GPTBot/ClaudeBot/PerplexityBot — ATĻAUT)
🔲 Content Signals robots.txt · (opc.) Markdown for Agents tīrākai AI citēšanai

INDEKSĒŠANAS PAĀTRINĀŠANA:
🔲 GSC URL Inspection → Request Indexing svarīgākajām · IndexNow (Bing/Yandex)
🔲 iekšējās saites no indeksētām uz jaunām · pillar lapas indeksē PIRMĀS → nes spokes
```
> Ignorē klientu lapām (tikai API/komercijai): Link headers, API Catalog, OAuth, MCP Server Card, x402 u.c.

## Schema pa lapu tipiem (kuru kur)
- Sākums → `Person` + `Service` · Par mani → `Person` · Pakalpojumi → `Service` + `Offer`
- Kontakti → `LocalBusiness` (+ Google Maps) · Atsauksmes → `Review` · ABC raksts → `Article` + `FAQPage`
- ⭐ **Lokālā schema = ChatGPT svira, NE Google** (sk. [06](06-OffPage-Local-AEO.md)) — pievieno lēti, bet nepaļaujies Google rankingam.
- Schema JSON-LD šabloni → `astro-builder` seo-checklist.

> Per-lapa on-page statuss (H1/meta/slug) → [03-OnPage.md](03-OnPage.md).
