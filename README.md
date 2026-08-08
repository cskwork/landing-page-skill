# Landing Page Builder 🎨

A complete design system + AI skill for building beautiful, interactive landing pages in plain HTML/CSS/JS.

**Zero dependencies. No frameworks. No build step.**

🔗 **Live Demo:** [https://cskwork.github.io/landing-page-skill/](https://cskwork.github.io/landing-page-skill/)

## What's Included

| File | Purpose |
|------|---------|
| `SKILL.md` | AI agent skill spec (follows writing-great-skills guidelines) |
| `index.html` | This landing page (built with the design system itself) |
| `design-system/design-system.css` | Full CSS: tokens, navbar, hero, cards, tooltips, tabs, footer, responsive |
| `design-system/app-template.js` | JS: scroll reveal, navbar scroll, code copy, tabs, theme toggle, i18n |
| `design-system/components-reference.html` | Interactive component library |

## Quick Start

```bash
# Clone
git clone https://github.com/cskwork/landing-page-skill.git

# Copy the design system to your project
cp -r landing-page-skill/design-system/ your-project/
```

```html
<!-- Link the files -->
<link rel="stylesheet" href="design-system.css">
<script src="app-template.js"></script>

<!-- Start building -->
<section class="hero">
  <h1 class="hero-title">
    <span class="gradient-text">Hello World</span>
  </h1>
</section>
```

## Features

- 🌓 **Dark & Light themes** — CSS variables, instant switching
- ✨ **Scroll animations** — IntersectionObserver, progressive enhancement
- 💬 **Pure CSS tooltips** — `data-tooltip`, no JavaScript needed
- 📋 **Code blocks** — Terminal-style with copy buttons
- 📑 **Tabs** — Content panels with smooth transitions
- 🌍 **i18n** — Built-in multi-language support
- 📱 **Responsive** — Mobile-first, adapts to any screen
- 🎯 **16+ components** — Navbar, hero, cards, callouts, footer, and more

## Design Tokens

Customize your brand in one place:

```css
:root {
  --accent-cyan: #06b6d4;
  --accent-purple: #8b5cf6;
  --gradient-primary: linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%);
  --font-sans: 'Inter', sans-serif;
  --radius-md: 12px;
  /* ... and more */
}
```

## Deploy to GitHub Pages

```bash
gh repo create my-landing-page --public
git add . && git commit -m "Add landing page" && git push
# Settings → Pages → Source: Deploy from branch → main → / (root)
```

## As an AI Skill

This repository is also a skill for AI coding agents. Copy `SKILL.md` to your skills directory:

```bash
cp SKILL.md ~/.agents/skills/landing-page-builder/SKILL.md
cp -r design-system ~/.agents/skills/landing-page-builder/
```

The agent can then build landing pages using the design system patterns.

## License

MIT
