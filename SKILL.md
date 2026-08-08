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
| Tooltips | components-reference.html | `.tooltip`, `[data-tooltip]` |
| Tabs | components-reference.html | `.tab-list`, `.tab-btn`, `.tab-panel` |
| Theme toggle | design-system.css | `[data-theme]`, `--bg-*`, `--text-*` |
| Scroll reveal | app-template.js | `.reveal` → `.visible` via IntersectionObserver |
| i18n | app-template.js | `[data-i18n]` + translations dict |

## Design System

### CSS Tokens (copy to your `:root`)

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

Pure CSS tooltip — no JavaScript needed:

```html
<span class="tooltip-trigger" data-tooltip="Helpful explanation here">
    Hover me
</span>
```

```css
.tooltip-trigger { position: relative; cursor: help; }
.tooltip-trigger::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 125%; left: 50%;
    transform: translateX(-50%) scale(0);
    background: var(--bg-card);
    color: var(--text-primary);
    padding: 8px 14px;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border-hover);
    box-shadow: var(--shadow-md);
    font-size: 0.8rem;
    white-space: nowrap;
    pointer-events: none;
    transition: transform 0.2s, opacity 0.2s;
    opacity: 0;
    z-index: 1000;
}
.tooltip-trigger:hover::after {
    transform: translateX(-50%) scale(1);
    opacity: 1;
}
```

## Build Workflow

1. **Copy** `design-system.css` and `app-template.js` to your project
2. **Choose sections** from `components-reference.html` (navbar, hero, features, code blocks, tabs, footer)
3. **Customize tokens** in `:root` (colors, fonts, gradients)
4. **Add content** to HTML, wire up `data-i18n` keys if multilingual
5. **Test** locally — just open `index.html` in a browser
6. **Deploy** to GitHub Pages (see below)

## Deploy to GitHub Pages

```bash
# 1. Create repo (or use existing)
gh repo create my-landing-page --public

# 2. Push your files
git add . && git commit -m "Add landing page" && git push

# 3. Enable GitHub Pages (serves from main branch root or /docs)
gh repo edit --enable-issues
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
| Tooltips cut off | Add `overflow: visible` to parent containers |
| Code copy not working | Check `.code-copy` button exists and JS is loaded |
| Flash of unstyled content | Put font `<link>` in `<head>` before stylesheet |

## Design Decisions

**Why CSS variables over preprocessors:** Instant theme switching, zero build step, works everywhere.

**Why IntersectionObserver for reveal:** Performant, no scroll listeners, progressive enhancement (content visible if JS fails).

**Why no framework:** Landing pages are mostly static. A framework adds 100KB+ for no benefit. Plain HTML/CSS/JS loads fast and deploys anywhere.

**Why data-i18n over i18next:** For 2-3 languages, a simple dictionary + attribute selector is lighter and simpler than a library.
