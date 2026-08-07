# AINativeX — Launch Website

**Live at:** <https://akm98074.github.io/AINativeX/> — GitHub Pages serves the
repo root straight from `main`, no workflow and no build step. Moving to the
`ainativex.ai` custom domain
later is a small, documented change: see [DEPLOY.md](DEPLOY.md#switching-to-the-custom-domain).

A fast, single-page marketing site for **AINativeX**, the enterprise door of the
practice. It reuses the AIUdaan design system (palette, type, components) with
copy written for the *AI Transformation* deck's audience: enterprises, startups,
and venture funds — not individuals.

No framework, no build step, no database. Plain HTML/CSS/JS, so it loads
instantly and can be hosted anywhere. See **[DEPLOY.md](DEPLOY.md)**.

---

## What the page argues, in order

| # | Section | Job |
|---|---------|-----|
| 1 | **Hero** | Positioning — "The hard part of AI-native isn't the model", plus the operator credibility card |
| 2 | **The premise** | The 70-20-10 split: people and process, data and evaluation, the model — argued from first-hand programs, and reused as the diligence rubric |
| 3 | **Where it breaks** | The two gaps every program stalls in — the first mile and the last mile |
| 4 | **Expertise** | Enterprise infra and applied AI at every layer: application, RAG, models, data and eval, big data, infra and hardware |
| 5 | **Engagements** | Three depths, ascending by duration — due diligence (2–3 weeks), AI-native transformation (3–6 months), product and technical scale (6+ months) |
| 6 | **Why AINativeX** | Changed how 30,000 people work · shipped agents people adopted · where AI has to be trusted · transfer, not dependency |
| 7 | **Testimonials** | Social proof — **placeholders today** (see below) |
| 8 | **FAQ** | Fit, scope, build-vs-advise, timing, enterprise track record, regulated environments, how to start |
| 9 | **Final CTA** | Start scoped: a working session, then a two-to-three-week first phase |

Copy is drawn from the *AI Transformation* deck (premise, the two gaps, and the
operator credentials), with the individual-facing slogans of AIUdaan replaced by
enterprise ones — see [BRAND.md](BRAND.md#taglines).

---

## Directory structure

```
AINativeX/
├── index.html                  # The one-page site (all copy lives here)
├── 404.html                    # Friendly not-found page
├── .htaccess                   # Apache config for cPanel hosting
│                               #   (HTTPS + www redirect, caching, headers)
├── robots.txt                  # Search-engine crawl directives
├── sitemap.xml                 # Single-URL sitemap
├── site.webmanifest            # PWA / installable metadata
├── README.md                   # This file
├── DEPLOY.md                   # How to publish
├── BRAND.md                    # Brand tokens (colors, logo, taglines, voice)
└── assets/
    ├── css/styles.css          # All styling (brand palette as CSS variables)
    ├── js/main.js              # Mobile-menu toggle, scroll-spy, footer year
    └── img/
        ├── logo-primary.png    # Wordmark for light backgrounds (header)
        ├── logo-dark.png       # Wordmark for dark backgrounds (footer)
        ├── icon.png            # Phoenix mark, transparent background
        ├── icon-192.png        # PWA icon / 404 mark
        ├── icon-512.png        # PWA icon
        ├── apple-touch-icon.png# 180×180 iOS home-screen icon
        ├── favicon.ico         # Multi-size .ico (16–64)
        ├── favicon-32.png      # 32×32 PNG favicon
        ├── favicon-64.png      # 64×64 PNG favicon
        ├── og-image.png        # 1200×630 social-share image
        └── abhishek-mishra.*   # Portrait used in the hero credibility card
```

Asset references are relative, which is what lets the site work from the
`/AINativeX/` subpath of `akm98074.github.io`. The one exception is `404.html`:
GitHub Pages serves it for missing paths at any depth, so its references are
absolute (`/AINativeX/...`) and would need updating alongside the site's base URL.

> `robots.txt` only takes effect at a host root, so `akm98074.github.io/robots.txt`
> — not this file — governs crawling while the site lives on the github.io
> subpath. It becomes authoritative once the site moves to its own domain.

---

## Preview locally

```bash
cd AINativeX
python3 -m http.server 8099
# then visit http://localhost:8099/
```

The site works fully without JavaScript — `main.js` only adds the mobile menu,
the scroll-spy nav highlight, and the footer year.

---

## Before launch

| Where | Replace with |
|-------|--------------|
| `index.html` → Testimonials (`.tcard`) | **Placeholders.** `CEO A · Company A`, `CEO B · Company B`, `Partner C · Fund C`, `CTO D · Company D` are stand-ins — swap in real, attributed quotes with permission. |
| `index.html` → `mailto:akmishra@ainativex.ai` | Confirm this is the address you want public, or swap in a scheduling link. |
| `sitemap.xml` → `lastmod` | Bump on significant content changes. |

The bar for "done": an enterprise buyer lands, understands the 70-20-10 thesis
in ten seconds, sees which of the three engagements is theirs, and gets in touch.
Resist adding a blog or a services matrix — they dilute that.
