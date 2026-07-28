# 03 — ON-PAGE (per-lapa tracker + vietnes struktūra)

> Indekss: [00-INDEX.md](00-INDEX.md) · Atslēgvārdi → [02](02-Atslegvardi.md).
> **Metode (kā izpildīt):** `seo-article-writer/SKILL.md` STEP 7a (1kw→4 vietas) · `seo-growth-loop/PILLAR-ONPAGE.md`
> (ne-rakstu landing/pīlāru on-page) · `astro-builder` seo-checklist (meta/schema/CWV). Šeit = TIKAI Ievas piešķīrumi + statuss.

## Princips: 1 atslēgvārds → 4 vietas (katrai lapai)
(1) URL slug · (2) H1 sākums · (3) meta description pirmie ~10 vārdi · (4) 1. teikums. Viena lapa = viens primārais
atslēgvārds. ⚠️ Divas lapas NEDRĪKST mērķēt vienu atslēgvārdu (kanibalizācija).

## Per-lapa tracker

> Statuss: ✅ izdarīts · 🔲 jādara · ❓ jāpārbauda (vēl nav auditēts kodā). Aizpildi, kad implementē.

### Esošās lapas (zīmola / komerciālās)

| Lapa | Primārais atslēgvārds | URL slug | H1 | Meta desc | 1. teik. | Schema |
|---|---|---|---|---|---|---|
| `/` Sākums | uztura konsultante (zīmols) + USP | ✅ | ❓ | ❓ | ❓ | ❓ Person+Service |
| `/par-mani` | Ieva Jēkabsone uztura konsultante | ✅ | ❓ | ❓ | ❓ | ❓ Person |
| `/pakalpojumi` | individuāls uztura plāns / konsultācija | ❓ | ❓ | ❓ | ❓ | ❓ Service+Offer |
| `/kontakti` | uztura konsultācija rīga (online) | ❓ | ❓ | ❓ | ❓ | ❓ LocalBusiness |
| `/start` | (lead magnet, ne SEO primārais) | — | — | — | — | — |

### Jaunās lapas (plānotas, sk. struktūru zemāk)

| Lapa (plāns) | Primārais atslēgvārds | Tips | Prioritāte |
|---|---|---|---|
| `/uztura-konsultacija-online` | uztura konsultācija online | landing | 🥈 |
| `/uztura-speciālists-[pilsēta]` (×N) | uztura speciālists [pilsēta] | service×city | 🥇 QUICK-WIN |
| `/produkti/10-dienu-uztura-plans` | 10 dienu uztura plāns | produkts | 🥇 (zīmola) |
| `/produkti/insulina-rezistences-edienkarte` | uztura plāns insulīna rezistencei | produkts | 🥇 diferenciators |
| `/atsauksmes` | Ieva Jēkabsone atsauksmes | reputācija | 🥈 |

### Uztura ABC raksti (on-page status)

> Publicēti (5): `skivja-metode`, `makrouzturvielas`, `partikas-etiketes`, `udens-daudzums`, `esanas-biezums`
> + (2026-06-14) `uztura-bogatinatajs`, `nedelas-edienkarte`. Katram: H1+kw · meta · tūlītēja atbilde ·
> H2 jautājumi · FAQ+schema · autora bio · CTA. Pilns saraksts + nākamie → [04-Saturs.md](04-Saturs.md).

## SOLIS 5 — Vietnes SEO struktūra (URL karte)

```
/ (Sākumlapa)        H1: primārais atslēgvārds + USP · Schema: Person + Service
                     (jau: "Zināšanas ir brīvas. Tava sistēma — tas ir darbs.")
/par-mani            E-E-A-T pierādījumi (ITEC, pieredze) · Schema: Person
/pakalpojumi/        cenas (Hormozi tier-i) · Schema: Service + Offer
  /uztura-konsultacija-online
  /uztura-konsultacija-riga
/produkti/           ⭐ Systeme.io checkout
  /10-dienu-uztura-plans (Produkts #1)
  /makro-gatavas-porcijas (Produkts #2)
  /asinsanalizu-celvedis (Produkts #5)
/uztura-abc/         55 informācijas lapas, hub-and-spoke (sk. [04](04-Saturs.md))
/atsauksmes/         Schema: Review (zvaigznītes!)
/kontakti/           Schema: LocalBusiness + Google Maps
/ru/                 hreflang; galvenās lapas obligāti krieviski
```

> Schema implementācija un tehniskais → [05-Tehniskais.md](05-Tehniskais.md). Lokālās lapas mērogā → skils `local-seo` (Part 4) + `seo-article-writer/templates/service-city.md`.
