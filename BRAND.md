# AINativeX — Brand Reference

AINativeX shares the visual system of its sibling brand, **AIUdaan** (AI Udaan
Brand Guidelines v1.0, March 2026): same palette, same type pairing, same
component language. The difference is the audience — AIUdaan speaks to
individuals, AINativeX speaks to **enterprises, startups, and venture funds**.

Tokens are implemented as CSS variables at the top of `assets/css/styles.css`.

## Logo

- **Primary wordmark** (`assets/img/logo-primary.png`) — the phoenix mark beside
  `AINATIVEX` and `Enable the Last Mile`, laid out horizontally. Use on white /
  light backgrounds. Sources: `AINativeX-Primary-Logo.png`.
- **Dark version** (`assets/img/logo-dark.png`) — the stacked lockup with the
  cream wordmark, for dark backgrounds (footer). Source:
  `AINativeX-Footer-DarkBlue.png`.
- **Icon only** (`assets/img/icon-512.png`, `icon-192.png`) — the navy tile with
  the phoenix mark, for favicons, avatars, and app icons.
- **Transparent mark** (`assets/img/icon.png`) — mark without the navy tile, for
  decorative use on light surfaces.

**The mark.** A phoenix rising across a sun arc, its body resolving into circuit
traces: the last mile, where the technology meets the work. Navy and deep amber
carry the form, coral picks out the `X`.

**Adapting the lockup.** The supplied artwork is stacked, and its wordmark is
only about 15% of the lockup height — below roughly 84px the name stops being
readable. Anywhere vertically constrained (the sticky header) uses the
horizontal arrangement; anywhere with room (the footer) uses the stacked one.

**Usage rules (inherited from the guide):**
- Maintain clear space equal to the `AI` text height on all sides.
- Never stretch, rotate, or distort the logo.
- Never recolor the logo outside approved variations.
- Minimum width: 120px digital, 30mm print.
- Never place on busy backgrounds without a solid overlay.

## Color palette

> Warm amber-coral differentiates the brand from cold-blue AI vendors.

| Token | Hex | CSS var | Use |
|-------|-----|---------|-----|
| Navy Blue | `#1A1A5E` | `--navy` | Wordmark, headings, bio card |
| Coral | `#D85A30` | `--coral` | `AI` text, CTAs, the "70%" and the flagship engagement |
| Amber Gold | `#EF9F27` | `--amber` | Accents, card rules, list markers |
| Deep Amber | `#BA7517` | `--deep-amber` | Eyebrows and supporting details |
| Light Cream | `#FAEEDA` | `--cream` | Light backgrounds, layer tags |
| Dark Navy | `#1A1A1E` | `--dark-navy` | Dark sections, footer, pull quote |

## Type

- **Display** — Playfair Display 500/600 for `h1`/`h2`, the big split numerals,
  and pull quotes. Matches the deck's serif headline treatment.
- **Text** — Inter 400/500/600/700/800 for everything else.

## Taglines

The AIUdaan taglines are written for individuals ("Sabka AI, Sabki Udaan", "AI
for the Next 500 Million", "Across the last mile of your career"). None of them
carry over. AINativeX lines are written for the people funding and running
enterprise AI programs:

| Framing | Line | Best for |
|---------|------|----------|
| Positioning (primary) | The hard part of AI-native isn't the model. | Hero headline, OG image |
| Thesis | AI-native is won on people and process. | Site slogan, footer, structured data |
| Offering descriptor | Enterprise AI-Native Transformation | Eyebrow, meta title, LinkedIn |
| Method | Redesign the work, then automate it | Sales conversations, decks |
| Scope | Every layer, not just the top one | Expertise section, capability pitches |
| Footer | Across the last mile of enterprise AI | Footer pill, email signature |

**The 70-20-10 line** — *70% people and process, 20% data and evaluation, 10%
the model* — is the brand's single most repeatable claim, and the frame every
enterprise engagement is sold and scoped against. Argue it from first-hand
programs, not from a third-party citation.

## Voice

Operator, not vendor. Short declaratives, concrete nouns, no hype adjectives.
Claims are sized to what can be defended in a room with the frontline and the
CFO in it. Avoid "revolutionary", "cutting-edge", "unlock" — the deck this site
is built from doesn't use them, and neither should the site.

## Contact / handles

- Email → `akmishra@ainativex.ai`
- LinkedIn → `linkedin.com/in/abhishekkmishra`
- Live URL → `akm98074.github.io/AINativeX/`; `ainativex.ai` once DNS moves
- Favicon → 32px (`assets/img/favicon-32.png`), plus `favicon.ico` at 16–64px
- OG image → 1200×630 (`assets/img/og-image.png`)
