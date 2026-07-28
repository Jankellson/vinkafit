# NotebookLM Custom Prompti — Ievas brand

Lieto šos promptus NotebookLM "Customize" laukā **pirms** ģenerēšanas pogas nospiešanas.

---

## 🎬 VIDEO EXPLAINER prompt

```text
LANGUAGE: Latvian (latviešu valoda) — every word
VOICE: Female voice ONLY — warm, professional, conversational
       Like a trusted nutrition consultant explaining to a friend over coffee
LENGTH: 3–5 minutes
PACING: Slow, calm — no rapid cuts

TONE:
- Empathetic, not preachy
- Clear, not academic
- Confident, not corporate
- Use "tu" form (not "jūs")

CONTENT FOCUS for this notebook:
- Explain the topic visually with real-life examples
- Use Latvian food context: griķi, brūnie rīsi, lasis, brokoļi, auzas,
  pilngraudu maize, ogas, avokado, olīveļļa
- Show "do this" alongside "avoid this" guidance
- Mention that this is a starting point, not a strict rule
- End with a soft call to think about own meals

AVOID:
- Anglicisms ("vs", "lifestyle", "tips & tricks", "challenge")
- Compound sentences longer than 20 words
- Medical jargon without explanation
- Aggressive sales language
- Generic stock footage unrelated to topic

VISUAL STYLE:
- Warm earthy color palette: burgundy (#84183e), gold (#c9a45c),
  cream (#faf3ec), deep plum (#2a1419)
- Natural food photography — not sterile commercial shots
- Editorial, magazine-like feel — not corporate, not Instagram-influencer
- Hand-drawn or organic graphic elements preferred over corporate icons
- Soft natural light, wooden surfaces, ceramic plates

OUTPUT:
- Video should feel like an excerpt from a calm Sunday morning
  nutrition magazine — not a rapid TikTok explainer
```

---

## 🎨 INFOGRAPHIC prompt

```text
LANGUAGE: Latvian (latviešu valoda)
FORMAT: Vertical 1080x1350 (Instagram + Pinterest optimal)
STYLE: Elegant, editorial, warm — NOT corporate, NOT clinical, NOT cartoonish

EXACT COLOR PALETTE (use these hex codes):
- Primary dark: #84183e (burgundy / wine)
- Accent: #c9a45c (warm gold)
- Background: #faf3ec (cream)
- Deep background: #2a1419 (deep plum)
- Text on cream: #2a1419 (deep plum)
- Text on burgundy: #ffffff (white)
- Subtle accent: #b8d4a8 (sage green) — use sparingly

TYPOGRAPHY:
- Headlines: Serif italic (Cormorant, Playfair Display, EB Garamond style)
- Body: Clean sans-serif (Inter, Outfit style)
- Numbers/fractions (½, ¼): Large decorative serif italic
- AVOID: rounded "friendly" fonts (Quicksand, Comic Sans), Helvetica,
  rounded sans-serif

LAYOUT PRINCIPLES:
- Generous whitespace (30%+ of canvas)
- Strong visual hierarchy: one BIG element, supporting smaller elements
- One central focal point per infographic
- Editorial column structure, not card grid

ICONOGRAPHY:
- Minimalist line icons (1.5px stroke weight)
- OR hand-drawn organic illustrations
- AVOID: emojis, 3D icons, flat colorful illustrations, gradients

CONTENT:
- Title: Topic name (e.g., "Šķīvja metode")
- Subtitle: 1-line context
- 3–5 key points with examples
- Footer: "ievajekabsone.lv"

AVOID COMPLETELY:
- Emojis as design elements
- Generic stock photo backgrounds
- Bright neon colors
- More than 3 fonts
- Crowded text
- Drop shadows on text
- Gradient backgrounds
```

---

## 🎙 AUDIO DEEP DIVE prompt (sarežģītām tēmām)

Lieto TIKAI sarežģītām zinātniskām tēmām — ne katram rakstam.

```text
LANGUAGE: Latvian (latviešu valoda)
VOICES: Two female voices — warm, intelligent, conversational
LENGTH: 12–18 minutes
FORMAT: Natural conversation between two nutrition consultants

TONE:
- Two friends discussing topic over coffee
- Not lecture format
- One asks clarifying questions, other explains
- Personal stories and analogies welcome
- Pauses for reflection — not rushed

AVOID:
- Anglicisms
- Medical jargon without explanation
- Sales pitches
- "And now..." style transitions

USE Latvian food/cultural context throughout.
```

---

## 📋 Kā lietot

1. Atver NotebookLM (notebooklm.google.com)
2. Izveido jaunu notebook ("Šķīvja metode")
3. Ielādē avota failu: `notebooklm-content/skivja-metode-source.md`
4. Klikšķini "Studio" panelī labajā pusē
5. Izvēlies "Video Overview" (vai "Audio Overview" / "Infographic")
6. Spied "Customize" pogu
7. **Iekopē augšminēto promptu** atbilstoši formātam
8. Spied "Generate"
9. Pagaidi 5–15 min
10. Lejupielādē rezultātu
11. Iedod failu Claude — es konvertēšu un ievietošu lapā
