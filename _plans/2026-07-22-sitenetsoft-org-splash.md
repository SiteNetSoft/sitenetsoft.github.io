# sitenetsoft.org Splash/Index Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the placeholder sitenetsoft.github.io page with a clean, typography-led splash/index page for sitenetsoft.org listing SiteNetSoft's open source projects and family orgs.

**Architecture:** Single static page — `index.html` plus `assets/css/main.css`. No JavaScript, no build step, no external requests (system font stacks, local assets only). Light/dark via `prefers-color-scheme` on CSS custom-property tokens. Served by GitHub Pages; project docs are NOT hosted here (each project repo's own Pages site owns `sitenetsoft.org/<repo>`).

**Tech Stack:** HTML5, native CSS (custom properties, grid), GitHub Pages.

## Global Constraints

- Canonical domain: `https://sitenetsoft.org/` (CNAME file content: `sitenetsoft.org`).
- Accent color derives from logo blue `#2183c5`.
- No local development filesystem paths anywhere in code or docs.
- No JavaScript, no external fonts/CDNs, no analytics.
- Tagline: "Business software, built in the open."
- `_specs/` and `_plans/` stay underscore-prefixed so GitHub Pages' Jekyll does not publish them.
- WCAG 2.1 AA: semantic landmarks, alt text, `:focus-visible`, `prefers-reduced-motion` guard.

---

### Task 1: Repo hygiene — untrack IDE config, fix CNAME

**Files:**
- Create: `.gitignore`
- Modify: `CNAME`
- Delete (from tracking only): `.idea/*`

**Interfaces:**
- Consumes: nothing.
- Produces: repo state later tasks commit onto; CNAME content `sitenetsoft.org` referenced by canonical/OG URLs in Task 2.

- [ ] **Step 1: Create `.gitignore`**

```gitignore
.idea/
```

- [ ] **Step 2: Untrack `.idea/` and update CNAME**

```bash
git rm -r --cached .idea
printf 'sitenetsoft.org\n' > CNAME
```

- [ ] **Step 3: Verify**

Run: `git status --short && cat CNAME`
Expected: `.idea/*` shown as deleted (`D`), `.gitignore` and `CNAME` staged/modified, CNAME prints `sitenetsoft.org`.

- [ ] **Step 4: Commit**

```bash
git add .gitignore CNAME
git commit -m "chore: untrack IDE config, set canonical domain to sitenetsoft.org"
```

---

### Task 2: Page implementation — stylesheet and index.html

**Files:**
- Create: `assets/css/main.css`
- Modify: `index.html` (full replacement)

**Interfaces:**
- Consumes: `assets/SiteNetSoft-Logo.png`, `assets/amadla/amadla-logo.svg`, favicon set under `assets/`, root `favicon.ico`.
- Produces: class names `hero`, `hero-logo`, `hero-title`, `hero-tagline`, `hero-intro`, `hero-link`, `section`, `section-title`, `section-note`, `card-grid`, `card`, `card-top`, `card-name`, `chip` (+ `data-status`), `card-desc`, `org-grid`, `org-card`, `org-logo`, `org-name`, `org-desc`, `org-links`, `site-footer`.

- [ ] **Step 1: Write `assets/css/main.css`**

```css
/* sitenetsoft.org — hand-crafted, no build step.
   Order: tokens → base → layout → components → motion. */

/* ---------- tokens ---------- */
:root {
  color-scheme: light dark;

  /* primitive */
  --blue-logo: #2183c5;

  /* semantic — light */
  --color-bg: #f6f9fb;
  --color-surface: #ffffff;
  --color-text: #16222c;
  --color-muted: #51626f;
  --color-accent: #1a6aa2; /* logo blue darkened for AA on light bg */
  --color-line: #dce4ea;

  --dot-experimental: #b97a1c;
  --dot-progress: var(--blue-logo);
  --dot-upcoming: #8195a1;
  --dot-active: #35855b;

  --font-body: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-mono: ui-monospace, "Cascadia Code", "JetBrains Mono", Menlo, Consolas, monospace;

  --space-2: 0.5rem;
  --space-3: 1rem;
  --space-4: 1.5rem;
  --space-5: 2.5rem;
  --space-6: 4.5rem;

  --radius: 0.625rem;
  --measure: 42rem;
  --page-max: 64rem;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #0e161d;
    --color-surface: #17222b;
    --color-text: #e6edf3;
    --color-muted: #94a6b3;
    --color-accent: #4da3d9;
    --color-line: #24313c;
    --dot-experimental: #d99a3d;
    --dot-upcoming: #6d8290;
    --dot-active: #4caf7d;
  }
}

/* ---------- base ---------- */
* { box-sizing: border-box; }

body {
  margin: 0;
  font-family: var(--font-body);
  line-height: 1.6;
  background: var(--color-bg);
  color: var(--color-text);
}

a {
  color: var(--color-accent);
  text-decoration-thickness: 1px;
  text-underline-offset: 0.2em;
}

a:hover { text-decoration-thickness: 2px; }

:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
  border-radius: 2px;
}

/* ---------- layout ---------- */
.hero,
.section {
  max-width: var(--page-max);
  margin-inline: auto;
  padding-inline: var(--space-4);
}

/* ---------- hero ---------- */
.hero {
  text-align: center;
  padding-block: var(--space-6) var(--space-5);
}

.hero-logo {
  width: 7.5rem;
  height: auto;
}

.hero-title {
  margin: var(--space-3) 0 0;
  font-size: clamp(2.25rem, 6vw, 3.25rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.hero-tagline {
  margin: var(--space-2) 0 0;
  font-size: clamp(1.125rem, 2.5vw, 1.375rem);
  font-weight: 500;
  color: var(--color-accent);
}

.hero-intro {
  max-width: var(--measure);
  margin: var(--space-4) auto 0;
  color: var(--color-muted);
}

.hero-link {
  display: inline-block;
  margin-top: var(--space-4);
  font-family: var(--font-mono);
  font-size: 0.9375rem;
}

/* ---------- sections ---------- */
.section { padding-block: var(--space-5); }

.section-title {
  margin: 0;
  font-size: 1.375rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.section-note {
  margin: var(--space-2) 0 var(--space-4);
  max-width: var(--measure);
  color: var(--color-muted);
  font-size: 0.9375rem;
}

/* ---------- project cards ---------- */
.card-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr));
  gap: var(--space-3);
}

.card {
  background: var(--color-surface);
  border: 1px solid var(--color-line);
  border-radius: var(--radius);
  transition: border-color 0.15s ease, translate 0.15s ease;
}

.card:hover {
  border-color: var(--color-accent);
  translate: 0 -2px;
}

.card-link {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  height: 100%;
  padding: var(--space-3) var(--space-3) var(--space-4);
  text-decoration: none;
  color: inherit;
}

.card-top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.card-name {
  font-family: var(--font-mono);
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-accent);
  overflow-wrap: anywhere;
}

.chip {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-muted);
  white-space: nowrap;
}

.chip::before {
  content: "";
  display: inline-block;
  width: 0.5em;
  height: 0.5em;
  margin-right: 0.4em;
  border-radius: 50%;
  background: var(--color-muted);
}

.chip[data-status="experimental"]::before { background: var(--dot-experimental); }
.chip[data-status="in-progress"]::before  { background: var(--dot-progress); }
.chip[data-status="upcoming"]::before     { background: var(--dot-upcoming); }
.chip[data-status="active"]::before       { background: var(--dot-active); }

.card-desc {
  margin: 0;
  font-size: 0.9375rem;
  color: var(--color-muted);
}

/* ---------- family orgs ---------- */
.org-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(19rem, 1fr));
  gap: var(--space-3);
}

.org-card {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-3);
  align-items: start;
  background: var(--color-surface);
  border: 1px solid var(--color-line);
  border-radius: var(--radius);
  padding: var(--space-4);
}

.org-logo {
  width: 3.5rem;
  height: 3.5rem;
}

.org-name {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 700;
}

.org-desc {
  margin: var(--space-2) 0;
  font-size: 0.9375rem;
  color: var(--color-muted);
}

.org-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  font-family: var(--font-mono);
  font-size: 0.875rem;
}

/* ---------- footer ---------- */
.site-footer {
  margin-top: var(--space-5);
  padding: var(--space-4);
  border-top: 1px solid var(--color-line);
  text-align: center;
  font-size: 0.875rem;
  color: var(--color-muted);
}

/* ---------- motion ---------- */
@media (prefers-reduced-motion: no-preference) {
  .hero > * {
    animation: rise 0.5s ease-out backwards;
  }

  .hero > :nth-child(2) { animation-delay: 0.08s; }
  .hero > :nth-child(3) { animation-delay: 0.16s; }
  .hero > :nth-child(4) { animation-delay: 0.24s; }
  .hero > :nth-child(5) { animation-delay: 0.32s; }

  @keyframes rise {
    from {
      opacity: 0;
      translate: 0 0.75rem;
    }
  }
}
```

- [ ] **Step 2: Replace `index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>SiteNetSoft — Business software, built in the open</title>
	<meta name="description" content="SiteNetSoft is an industry-agnostic software company building open source Quarkus extensions, web protocol implementations, and developer tooling.">
	<link rel="canonical" href="https://sitenetsoft.org/">
	<meta property="og:type" content="website">
	<meta property="og:title" content="SiteNetSoft">
	<meta property="og:description" content="Business software, built in the open — Quarkus extensions, web protocol implementations, and developer tooling.">
	<meta property="og:url" content="https://sitenetsoft.org/">
	<meta property="og:image" content="https://sitenetsoft.org/assets/android-chrome-512x512.png">
	<link rel="icon" href="favicon.ico" sizes="32x32">
	<link rel="icon" type="image/png" href="assets/favicon-32x32.png" sizes="32x32">
	<link rel="icon" type="image/png" href="assets/android-chrome-192x192.png" sizes="192x192">
	<link rel="apple-touch-icon" href="assets/apple-touch-icon.png">
	<link rel="stylesheet" href="assets/css/main.css">
</head>
<body>
	<header class="hero">
		<img class="hero-logo" src="assets/SiteNetSoft-Logo.png" alt="" width="120" height="120">
		<h1 class="hero-title">SiteNetSoft</h1>
		<p class="hero-tagline">Business software, built in the open.</p>
		<p class="hero-intro">SiteNetSoft is an industry-agnostic software company. Alongside our commercial work we develop open source building blocks — Quarkus extensions, web protocol implementations, and developer tooling. This site is the index: each project keeps its own documentation in its own space.</p>
		<a class="hero-link" href="https://github.com/SiteNetSoft">github.com/SiteNetSoft</a>
	</header>
	<main>
		<section class="section" aria-labelledby="projects-title">
			<h2 class="section-title" id="projects-title">Open source projects</h2>
			<p class="section-note">Each project owns its own path on sitenetsoft.org and publishes its own documentation there.</p>
			<ul class="card-grid">
				<li class="card">
					<a class="card-link" href="https://github.com/SiteNetSoft/quarkus-tus">
						<span class="card-top">
							<span class="card-name">/quarkus-tus</span>
							<span class="chip" data-status="experimental">experimental</span>
						</span>
						<span class="card-desc">Quarkus extension for the tus resumable-upload protocol — client and server.</span>
					</a>
				</li>
				<li class="card">
					<a class="card-link" href="https://github.com/SiteNetSoft/quarkus-pha">
						<span class="card-top">
							<span class="card-name">/quarkus-pha</span>
							<span class="chip" data-status="in-progress">in progress</span>
						</span>
						<span class="card-desc">Quarkus extension for pha-kit — PatternFly, HTMX, and Alpine.js with Qute templates.</span>
					</a>
				</li>
				<li class="card">
					<a class="card-link" href="https://github.com/SiteNetSoft/quarkus-vdp">
						<span class="card-top">
							<span class="card-name">/quarkus-vdp</span>
							<span class="chip" data-status="in-progress">in progress</span>
						</span>
						<span class="card-desc">Quarkus extension for the View Descriptor Protocol.</span>
					</a>
				</li>
				<li class="card">
					<a class="card-link" href="https://github.com/SiteNetSoft/htmx-tus">
						<span class="card-top">
							<span class="card-name">/htmx-tus</span>
							<span class="chip" data-status="experimental">experimental</span>
						</span>
						<span class="card-desc">HTMX extension for the tus client protocol.</span>
					</a>
				</li>
				<li class="card">
					<a class="card-link" href="https://github.com/SiteNetSoft/olinguito-odata4">
						<span class="card-top">
							<span class="card-name">/olinguito-odata4</span>
							<span class="chip" data-status="upcoming">upcoming</span>
						</span>
						<span class="card-desc">OData 4 tooling — active development currently spread across branches.</span>
					</a>
				</li>
				<li class="card">
					<a class="card-link" href="https://github.com/SiteNetSoft/ai-skills">
						<span class="card-top">
							<span class="card-name">/ai-skills</span>
							<span class="chip" data-status="active">active</span>
						</span>
						<span class="card-desc">Public, tool-agnostic AI skill files for dev practices and writing.</span>
					</a>
				</li>
				<li class="card">
					<a class="card-link" href="https://github.com/SiteNetSoft/resources">
						<span class="card-top">
							<span class="card-name">/resources</span>
							<span class="chip" data-status="active">active</span>
						</span>
						<span class="card-desc">Shared images and other static files.</span>
					</a>
				</li>
			</ul>
		</section>
		<section class="section" aria-labelledby="family-title">
			<h2 class="section-title" id="family-title">Family</h2>
			<p class="section-note">Organizations in the SiteNetSoft family, each with its own projects and site.</p>
			<ul class="org-grid">
				<li class="org-card">
					<img class="org-logo" src="assets/amadla/amadla-logo.svg" alt="" width="56" height="56">
					<div>
						<h3 class="org-name">Amadla</h3>
						<p class="org-desc">Simplifying infrastructure management.</p>
						<p class="org-links">
							<a href="https://github.com/AmadlaOrg">github.com/AmadlaOrg</a>
						</p>
					</div>
				</li>
				<li class="org-card">
					<div>
						<h3 class="org-name">View Descriptor Protocol</h3>
						<p class="org-desc">A standard integrating REST principles with dynamic view management.</p>
						<p class="org-links">
							<a href="https://vdprotocol.org/">vdprotocol.org</a>
							<a href="https://github.com/ViewDescriptorProtocol">github.com/ViewDescriptorProtocol</a>
						</p>
					</div>
				</li>
			</ul>
		</section>
	</main>
	<footer class="site-footer">
		<p>© SiteNetSoft · <a href="https://github.com/SiteNetSoft">GitHub</a></p>
	</footer>
</body>
</html>
```

- [ ] **Step 3: Render check**

```bash
python3 -m http.server 8123 >/dev/null 2>&1 &
sleep 1
curl -s http://localhost:8123/ | head -5
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:8123/assets/css/main.css
kill %1
```

Expected: HTML doctype in output; `200` for the stylesheet. Additionally render a screenshot (browser tooling if available) in both light and dark schemes and at a ~375px-wide viewport; verify layout matches the approved wireframe.

- [ ] **Step 4: Commit**

```bash
git add index.html assets/css/main.css
git commit -m "feat: rebuild sitenetsoft.org splash/index page"
```

---

### Task 3: Verification and README

**Files:**
- Modify: `README.md`

**Interfaces:**
- Consumes: the page from Task 2.
- Produces: verified, documented repo ready to push.

- [ ] **Step 1: Validate HTML**

Run: `tidy -q -e index.html` (if `tidy` is unavailable: `python3 -c "from html.parser import HTMLParser; HTMLParser().feed(open('index.html').read()); print('parsed ok')"`)
Expected: no errors (tidy warnings about trailing slashes or similar cosmetics are acceptable; errors are not).

- [ ] **Step 2: Link check all external URLs**

```bash
for u in \
  https://github.com/SiteNetSoft \
  https://github.com/SiteNetSoft/quarkus-tus \
  https://github.com/SiteNetSoft/quarkus-pha \
  https://github.com/SiteNetSoft/quarkus-vdp \
  https://github.com/SiteNetSoft/htmx-tus \
  https://github.com/SiteNetSoft/olinguito-odata4 \
  https://github.com/SiteNetSoft/ai-skills \
  https://github.com/SiteNetSoft/resources \
  https://github.com/AmadlaOrg \
  https://github.com/ViewDescriptorProtocol \
  https://vdprotocol.org/ ; do
  printf '%s %s\n' "$(curl -s -o /dev/null -L -w '%{http_code}' "$u")" "$u"
done
```

Expected: `200` for every URL.

- [ ] **Step 3: Update `README.md`**

```markdown
<img src="./assets/SiteNetSoft-Logo.png" alt="SiteNetSoft logo" style="width: 450px;" align="right">

# sitenetsoft.github.io

Source for [sitenetsoft.org](https://sitenetsoft.org/) — the index and introduction for
SiteNetSoft's open source work.

- Static HTML/CSS, no build step. Edit `index.html` and `assets/css/main.css` directly.
- Served by GitHub Pages with the custom domain in `CNAME`.
- This repo hosts only the root page. Each project repo publishes its own documentation
  via its own GitHub Pages site, which appears at `sitenetsoft.org/<repo-name>`.
- `_specs/` and `_plans/` hold design documents; underscore-prefixed directories are not
  published by GitHub Pages.
```

- [ ] **Step 4: Commit**

```bash
git add README.md
git commit -m "docs: describe repo purpose and structure"
```
