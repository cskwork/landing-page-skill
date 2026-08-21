---
name: landing-page-builder
description: Use when building a landing page, marketing site, product showcase, documentation site, or any single-page web experience that needs polished visual design, dark/light themes, scroll animations, interactive tooltips, code blocks, responsive layouts, or GitHub Pages deployment
---

# Landing Page Builder

## Overview

A complete design system + component library for building beautiful, interactive landing pages in plain HTML/CSS/JS — no frameworks, no build step. Ships as reusable CSS design tokens, JS interaction patterns, and HTML component templates.

**Core principle:** Copy the design system files, compose sections from component templates, customize tokens. Everything works with zero dependencies (optional: Google Fonts CDN).

## When to Use

- Building a product landing page, marketing site, or showcase
- Creating documentation sites with interactive elements
- Deploying to GitHub Pages, Netlify, or any static host
- Need dark/light theme switching, scroll animations, tooltips
- Want polished design without React/Vue/build tooling

**When NOT to use:**
- Complex web apps with state management (use a framework)
- Server-rendered pages (this is static-only)
- Internal admin dashboards (overkill)

## Quick Reference

| Component | File | Key Classes |
|-----------|------|-------------|
| Design tokens | `design-system/design-system.css` | `:root` variables, `--accent-*`, `--gradient-*` |
| Navbar | components-reference.html | `.navbar`, `.nav-links`, `.lang-toggle` |
| Hero | components-reference.html | `.hero`, `.hero-title`, `.gradient-text`, `.hero-stats` |
| Feature cards | components-reference.html | `.feature-grid`, `.feature-card`, `.reveal` |
| Code blocks | components-reference.html | `.code-block`, `.code-header`, `.code-copy` |
| Tooltips | components-reference.html | `.tooltip-trigger`, `[data-tooltip]` |
| Tabs | components-reference.html | `.tab-list`, `.tab-btn`, `.tab-panel` |
| Theme toggle | design-system.css + app-template.js | `[data-theme]`, `.icon-btn[data-toggle="theme"]` |
| Language buttons | design-system.css | `.lang-toggle`, `.lang-btn[data-lang]` |
| Scroll reveal | app-template.js | `.reveal` → `.visible` via IntersectionObserver |
| i18n | app-template.js | `[data-i18n]` + translations dict |

## Design System

`design-system.css` ships the complete token set for both themes. Retune these for your brand; read the file for the rest.

### CSS Tokens

```css
:root {
    --bg-primary: #0a0e17;
    --bg-secondary: #0f1521;
    --bg-card: #131a2a;
    --bg-card-hover: #1a2238;
    --text-primary: #e8ecf4;
    --text-secondary: #9ba3b4;
    --accent-cyan: #06b6d4;
    --accent-purple: #8b5cf6;
    --accent-pink: #ec4899;
    --accent-green: #10b981;
    --gradient-primary: linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%);
    --gradient-secondary: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
    --shadow-sm: 0 2px 8px rgba(0,0,0,0.3);
    --shadow-md: 0 4px 20px rgba(0,0,0,0.4);
    --shadow-lg: 0 8px 40px rgba(0,0,0,0.5);
    --shadow-glow: 0 0 40px rgba(6, 182, 212, 0.15);
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 20px;
    --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
    --transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Light Theme Override

```css
[data-theme="light"] {
    --bg-primary: #f8fafc;
    --bg-secondary: #ffffff;
    --bg-card: #ffffff;
    --text-primary: #1a202c;
    --text-secondary: #4a5568;
    --border: #e2e8f0;
    --shadow-sm: 0 2px 8px rgba(0,0,0,0.06);
    --shadow-md: 0 4px 20px rgba(0,0,0,0.08);
}
```

## Files

| File | Purpose |
|------|---------|
| `design-system/design-system.css` | Full CSS: tokens, navbar, hero, cards, code blocks, tooltips, tabs, footer, responsive |
| `design-system/app-template.js` | JS: scroll reveal, navbar scroll, code copy, tabs, theme toggle, mobile menu, i18n |
| `design-system/components-reference.html` | Every component with copy-paste HTML snippets |
| `templates/landing-template.html` | Complete starting template — wireframe with all sections |

## Tooltip Pattern

Tooltips work on desktop (hover) **and** mobile/touch (tap to toggle). Requires `app-template.js` for touch support.

```html
<!-- Opens upward (default) -->
<span class="tooltip-trigger" data-tooltip="Helpful explanation here">
    Hover me
</span>

<!-- Opens downward (for triggers near top of page) -->
<span class="tooltip-trigger tooltip-bottom" data-tooltip="Explanation">
    Hover me
</span>

<!-- Wide variant for longer text (wraps on mobile) -->
<span class="tooltip-trigger tooltip-wide" data-tooltip="Longer multi-line explanation...">
    Hover me
</span>
```

**Desktop:** CSS `:hover` shows tooltip. **Mobile/tablet:** JS adds tap-to-toggle with outside-click-to-close. **Keyboard:** Tab to focus, Enter/Space to toggle, Escape to close.

The touch and keyboard paths work by toggling `.tooltip-active` on the trigger. Hand-written tooltip CSS must style
`.tooltip-trigger:hover::after` and `.tooltip-trigger.tooltip-active::after` together, or tap does nothing — read
`design-system/design-system.css` section 10 (Tooltips) before writing your own.

**Stacking:** tooltips escape their container via `z-index:10` on `.feature-card:hover`, `.code-block:hover`, and
`.callout:hover`. Keep those rules, and clip rounded corners with `border-radius` on the child element (as
`.feature-card::before` does) — `overflow:hidden` on the container clips the tooltip and no z-index can rescue it.

## Build Workflow

1. **Copy** `design-system.css`, `app-template.js`, and `templates/landing-template.html` (renamed `index.html`) into your
   project — all three side by side, since the template links them by bare filename
2. **Add sections** from `components-reference.html` (features, code blocks, tabs, callouts, footer) into the wireframe
3. **Customize tokens** in `:root` (colors, fonts, gradients)
4. **Add content** to HTML, wire up `data-i18n` keys if multilingual
5. **Test** locally — open `index.html` in a browser and walk every row of Common Mistakes below; done when each row checks out
6. **Deploy** to GitHub Pages (see below)

## Deploy to GitHub Pages

```bash
# 1. Create repo (or use existing)
gh repo create my-landing-page --public

# 2. Push your files
git add . && git commit -m "Add landing page" && git push

# 3. Enable GitHub Pages (serves from main branch root or /docs)
# Settings → Pages → Source: Deploy from branch → main → / (root)

# Or use /docs subfolder:
# Settings → Pages → Source: Deploy from branch → main → /docs
```

**Live URL:** `https://<username>.github.io/<repo-name>/`

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| No meta viewport | Add `<meta name="viewport" content="width=device-width, initial-scale=1.0">` |
| Missing `[data-theme]` on `<html>` | Set `<html data-theme="dark">` for default theme |
| Reveal elements invisible | Ensure `app-template.js` loaded and `.reveal` has matching `.visible` logic |
| Reveal inside hidden tab panel | Tab switch auto-reveals; or remove `.reveal` from tab content |
| Tooltips cut off at top | Use `.tooltip-bottom` variant for triggers near viewport top |
| Theme flash on load | Inline `<script>` in `<head>` reading `localStorage.getItem('lp-theme')` into `data-theme` before render — already in `templates/landing-template.html` |
| No-JS content invisible | `class="no-js"` on `<html>` + `.no-js .reveal { opacity:1 }` fallback |
| Code copy not working | Check `.code-copy` button exists and JS is loaded |
| Flash of unstyled content | Put font `<link>` in `<head>` before stylesheet |
| Missing focus styles | All interactive elements have `:focus-visible` outline built in |

## Accessibility

The design system includes:
- `:focus-visible` outlines on all interactive elements (keyboard navigation)
- `prefers-reduced-motion` media query (disables animations)
- `.no-js` fallback (content visible without JavaScript)
- ARIA labels on icon-only buttons
- Semantic HTML structure (proper heading hierarchy)
- WCAG AA color contrast on all text
