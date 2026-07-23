# sitenetsoft.org splash/index page — design

Date: 2026-07-22
Status: approved

## Purpose

sitenetsoft.org (served from the `sitenetsoft.github.io` org Pages repo) is the front door
and index for SiteNetSoft's open source work. It introduces the company, lists its open
source projects, and points to family organizations. It hosts no project documentation:
each project repo enables GitHub Pages and automatically owns
`sitenetsoft.org/<repo-name>`, so this repo only ever contains the root page.

## Scope & stack

- Hand-crafted static site: one `index.html`, one `assets/css/main.css`, one
  `assets/js/theme.js`.
- No build step, no framework, no generator. JavaScript is limited to the optional
  color-scheme toggle (vanilla JS, progressive enhancement — without JS the page
  follows the OS preference and the toggle button stays hidden).
- Current `index.html` is replaced entirely.
- `CNAME` changes from `sitenetsoft.com` to `sitenetsoft.org` (canonical domain;
  sitenetsoft.com may redirect at the DNS level, outside this repo's scope).
- Design docs live in `_specs/` — underscore-prefixed directories are excluded from the
  published site by GitHub Pages' default Jekyll processing.

## Page structure

1. **Splash/hero** — SiteNetSoft logo, name, tagline, short intro, link to
   https://github.com/SiteNetSoft.
   - Tagline: "Business software, built in the open."
   - Intro: "SiteNetSoft is an industry-agnostic software company. Alongside our
     commercial work we develop open source building blocks — Quarkus extensions, web
     protocol implementations, and developer tooling. This site is the index: each
     project keeps its own documentation in its own space."
2. **Open Source Projects** — responsive card grid; each card has name, one-line
   description, status chip, and a link (GitHub repo for now; later a card can point to
   its `sitenetsoft.org/<name>` docs):

   | Project | Description | Status |
   |---|---|---|
   | quarkus-tus | Quarkus extension for the tus resumable-upload protocol (client & server) | Experimental |
   | quarkus-pha | Quarkus extension for pha-kit — PatternFly, HTMX, Alpine.js with Qute templates | In progress |
   | quarkus-vdp | Quarkus extension for the View Descriptor Protocol | In progress |
   | htmx-tus | HTMX extension for the tus client protocol | Experimental |
   | olinguito-odata4 | OData 4 tooling (work currently spread across branches) | Upcoming |
   | ai-skills | Public, tool-agnostic AI skill files for dev practices and writing | Active |
   | resources | Shared images and other static files | Active |

3. **Family** — orgs listed as single entries only, never their sub-projects:
   - **Amadla** — amadla logo (`assets/amadla/amadla-logo.svg`), "Simplifying
     infrastructure management", links to https://amadla.org/ and
     https://github.com/AmadlaOrg.
   - **View Descriptor Protocol (VDP)** — "A standard integrating REST principles with
     dynamic view management", links to https://vdprotocol.org/ and
     https://github.com/ViewDescriptorProtocol.
4. **Footer** — © SiteNetSoft, GitHub org link.

## Visual design

- Clean, typography-led, minimal; logo blue as accent color in both themes.
- Automatic light/dark via `prefers-color-scheme`; design tokens as CSS custom
  properties.
- Manual scheme toggle (system → light → dark) persisted in localStorage under
  `pha-color-scheme` with values `system | light | dark` — the same key/values
  quarkus-pha uses, so the choice stays consistent across sitenetsoft.org and
  same-origin project docs. An early inline script applies the stored choice
  before first paint via `data-theme` on `<html>`.
- Mobile-first; CSS grid for card layouts; system font stack.
- Subtle fade-up entrance animation on the hero, guarded by `prefers-reduced-motion`.
- Low-specificity class selectors; `:focus-visible` styles; semantic landmarks and alt
  text throughout.

## Meta / SEO

- Canonical `https://sitenetsoft.org/`.
- Updated meta description; Open Graph tags (incl. site_name, image dimensions/alt) and
  Twitter `summary_large_image` card using a dedicated 1200×630 `assets/og-banner.png`
  (dark background, logo + wordmark + tagline).
- Vector logo `assets/sitenetsoft-logo.svg` rebuilt from the mark's original
  construction — per wing, an eccentric circle-in-circle cut by a rectangle, with a
  1.5px hairline border (#082335) matching the PNG — used for the hero,
  SVG favicon, and Safari `mask-icon`; PNG favicon set retained as fallback;
  `site.webmanifest` with 192/512 icons; light/dark `theme-color` metas; JSON-LD
  Organization structured data.
- `robots.txt` + single-URL `sitemap.xml`; styled `404.html` (noindex) that also covers
  paths of projects that haven't published docs yet.

## Constraints

- No local filesystem paths from any development environment in code or docs.
- Follows the SiteNetSoft ai-skills css and html dev-practices.

## Testing / verification

- HTML validation.
- Manual render check in both color schemes and at narrow/wide viewports via a local
  static server.
- Link check (HTTP status) on all external project URLs.
