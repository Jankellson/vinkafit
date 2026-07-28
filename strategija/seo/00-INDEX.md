# SEO — INDEKSS (sāc šeit)

> **Mērķis:** katrs fails = viena lieta. Atver TIKAI vajadzīgo, ne visu stratēģiju.
> Klients: Ieva Jēkabsone — uztura konsultante · Domēns: ievajekabsone.lv (Astro + Sanity · Systeme.io) · Tirgus: LV + RU.
> Iepriekš viss bija vienā failā `../5-SEO-Strategija.md` (35 KB) → sadalīts 2026-06-15.

## Kuru failu lasīt kad

| Fails | Kas iekšā | Kad atver |
|---|---|---|
| [01-Pamats.md](01-Pamats.md) | Pozīcija, biznesa modelis, auditorija, **konkurences realitāte**, E-E-A-T/YMYL | Reti — pamata lēmumi |
| [02-Atslegvardi.md](02-Atslegvardi.md) | LV/RU atslēgvārdu tabulas, long-tail, ZSV, Avalanche, 1kw→4 vietas | Pirms plāno saturu/lapu |
| [03-OnPage.md](03-OnPage.md) | **Per-lapa tracker** (lapa → atslēgvārds → 4 vietas → statuss) + vietnes URL struktūra | Pirms aiztiec konkrētu lapu |
| [04-Saturs.md](04-Saturs.md) | Klasteri, hub-and-spoke, SXO, publ. secība, 55-lapu ABC, attēlu-SEO | Pirms raksta |
| [05-Tehniskais.md](05-Tehniskais.md) | Tehniskā SEO + schema checklist + statuss | Setup / audits |
| [06-OffPage-Local-AEO.md](06-OffPage-Local-AEO.md) | Off-page/saites, lokālā SEO (GBP/NAP), AEO/GEO (AI redzamība) | Setup / autoritāte |
| [07-Prioritates.md](07-Prioritates.md) | Pārskatītās prioritātes, ceļvedis (roadmap), prognoze, KPI | Plānošana |

## Metode dzīvo skilos (NE šeit — atkārtoti lietojama)

Šie faili = **Ievas lēmumi**. *Kā* tehniski izpildīt → skili `~/.claude/skills/`:

| Vajadzība | Skils / fails |
|---|---|
| On-page (1kw→4 vietas, raksta on-page) | `seo-article-writer/SKILL.md` STEP 7a · `seo-growth-loop/PILLAR-ONPAGE.md` |
| Raksta izpilde (CITE, E-E-A-T, anti-slop) | `seo-article-writer` (+ ANTI-SLOP, EEAT, GEO-CITE, MULTIMEDIA, PUBLISH-GATE) |
| Satura veidu šabloni | `seo-article-writer/templates/` (faq-page, pillar, service-city, comparison…) |
| Tehniskā būve (schema, sitemap, CWV) | `astro-builder` |
| Lokālā SEO pilnā izpilde | `local-seo` |
| Service×city lapas mērogā | `local-seo` (Part 4) + `seo-article-writer/templates/service-city.md` |
| Atslēgvārdu izpēte / pēc-palaišanas cilpa | `seo-strategy-router/KEYWORD-RESEARCH.md` · `seo-growth-loop` |

## Saistītie konteksta dokumenti

- Konkurenti (+ digitālo produktu audits) → [../1-Konkurenti.md](../1-Konkurenti.md)
- Ievas balss/nostājas → `../../klients/IEVA-POZICIJA.md`
- Tehniskie kods-noteikumi (image-SEO, YMYL, ABC šablons) → `../../ieva-astro/CLAUDE.md`
- Vecā monolītā versija (arhīvs) → `../5-SEO-Strategija_OLD-2026-06-10.md`

> Marķieri visos failos: 🟢 CORE | 🟡 ADVANCED | 🔴 NEMĒRĶĒ/sarkanā līnija | 🥇/🥈 prioritāte.
