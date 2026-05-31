<div align="center">
  <br/>
  <h1>Hariharan N · Portfolio</h1>
  <p><strong>Frontend Developer · React · JavaScript</strong></p>
  <p>
    <a href="https://haridevx.vercel.app" target="_blank">
      <img src="https://img.shields.io/badge/Live%20Site-haridevx.vercel.app-0ea5e9?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Site"/>
    </a>
    <a href="https://www.linkedin.com/in/mrnobody1305" target="_blank">
      <img src="https://img.shields.io/badge/LinkedIn-Connect-0a66c2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
    </a>
    <a href="mailto:052005hari@gmail.com">
      <img src="https://img.shields.io/badge/Email-Contact-ea4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"/>
    </a>
    <a href="https://github.com/HariDevex/HariDevx.Portfolio">
      <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
    </a>
  </p>
  <br/>
</div>

---

## Overview

Production-grade single-page portfolio built with **React 18** and **Vite**. Features a terminal-inspired animated loading screen, scroll reveals, light/dark theme, interactive Dock navigation, and a recruiter-first section layout.

---

## Tech Stack

<div align="center">

| | | |
|:---:|:---:|:---:|
| <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/> | <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/> | <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion"/> |
| <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3"/> | <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel"/> | <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/> |

</div>

---

## Sections

| # | Section | Purpose |
|:-:|---------|---------|
| 1 | **Hero** | Staggered entrance animation, tagline, CTA buttons |
| 2 | **Featured Project** | Spotlight project shown immediately after hero |
| 3 | **About** | Professional summary with system-thinking approach |
| 4 | **Skills** | Tech stack with proficiency indicators |
| 5 | **Experience** | Work history with achievements |
| 6 | **Education** | Academic background |
| 7 | **Stats** | Key metrics with count-up animation |
| 8 | **Coding Profiles** | GitHub, LeetCode, HackerRank links |
| 9 | **Projects** | Project cards with lazy loading |
| 10 | **Certifications** | 23 certifications in grid lightbox |
| 11 | **Contact** | Contact form with validation |

---

## Features

| Feature | Details |
|---------|---------|
| **Loading Screen** | Terminal-boot sequence → animated progress bar → brand reveal with letter-stagger animation (~3.5s, respects `prefers-reduced-motion`) |
| **Light/Dark Theme** | Persisted in localStorage, respects `prefers-color-scheme`, no flash on load |
| **Animations** | Framer Motion — staggered hero, count-up stats, scroll reveals, mouse glow, loader phases |
| **Dock Navigation** | macOS-style floating bottom nav with fisheye hover |
| **Responsive** | Mobile-first, hamburger menu, touch-friendly targets |
| **Accessibility** | Skip-to-content, `aria-current`, keyboard nav on lightbox, reduced-motion support |
| **Performance** | 5s build, lazy-loaded sections, WebP images <10KB, vendor chunking |
| **SEO** | Schema.org LD+JSON, Open Graph, sitemap, robots.txt |

---

## Loading Screen

The portfolio opens with a **terminal-inspired 4-phase loading sequence** built with Framer Motion:

| Phase | Component | Animation | Duration |
|:-----:|-----------|-----------|:--------:|
| 1 | **TerminalLines** | Typewriter effect — 4 shell commands (`whoami`, `initialize_portfolio`, `load_skills`, `start_server`) with blinking cursor | ~2.2s |
| 2 | **ProgressBar** | Smooth 0→100% bar with gradient fill and animated percentage counter | ~1.3s |
| 3 | **BrandReveal** | Letter-stagger reveal of "HARI DEVX" (blur→sharp, scale 0.8→1), then 3 subtitle lines slide up | ~1.5s |
| 4 | **Exit** | Full-screen fade out → website appears | ~0.5s |

**Design choices:**
- Terminal window style with macOS-style traffic light dots reinforces the developer/Linux enthusiast identity
- Commands are actual developer actions (`whoami`, `initialize_portfolio`) rather than generic "Loading..." text
- The accent-colored progress bar and gradient brand text match the existing site design system
- Entire sequence respects `prefers-reduced-motion` (skips immediately if enabled)
- No new dependencies — all animations use the existing Framer Motion library

---

## Project Structure

```
.
├── frontend/                    # React 18 + Vite application
│   ├── public/
│   │   ├── images/
│   │   │   ├── logo/           # Tech stack icons
│   │   │   ├── projects/       # Project thumbnails
│   │   │   └── certificates/   # Certification scans
│   │   ├── documents/          # Resume PDF
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   └── src/
│       ├── components/
│       │   ├── effects/        # ChromaGrid, MouseGlow
│       │   ├── layout/         # Navbar, Dock, Footer, ThemeToggle
│       │   ├── loader/         # LoadingScreen, TerminalLines, ProgressBar, BrandReveal
│       │   ├── sections/       # Hero, About, Skills, etc.
│       │   └── ui/             # Badge, Button, Loader, Section, Tag
│       ├── content/            # Portfolio data
│       ├── hooks/              # useTheme, useActiveSection
│       ├── styles/             # main.css (full design system)
│       └── utils/              # scrollTo helper
├── package.json                # Root scripts → delegates to frontend/
├── vercel.json                 # Deployment configuration
└── .gitignore
```

---

## Quick Start

**Prerequisites:** Node.js 18+, npm

```bash
git clone https://github.com/HariDevex/HariDevx.Portfolio.git
cd HariDevx.Portfolio

npm install          # installs frontend dependencies
npm run dev          # starts Vite dev server at localhost:5173
```

**Build for production:**

```bash
npm run build        # outputs to frontend/dist/
npm run preview      # preview the production build locally
```

---

## Deployment

Deployed via **Vercel** with automatic SPA rewrites. The `vercel.json` at project root handles build commands and output directory routing.

---

## Color Palette

<div align="center">

| Role | Hex | Usage |
|:----:|:---:|:------|
| <img src="https://via.placeholder.com/16/0d0d0d/0d0d0d?text=+" alt="#0d0d0d"/> `#0d0d0d` | Background | Dark theme base |
| <img src="https://via.placeholder.com/16/f5f5f0/f5f5f0?text=+" alt="#f5f5f0"/> `#f5f5f0` | Background | Light theme base |
| <img src="https://via.placeholder.com/16/0ea5e9/0ea5e9?text=+" alt="#0ea5e9"/> `#0ea5e9` | Accent | Links, highlights, gradients |
| <img src="https://via.placeholder.com/16/f59e0b/f59e0b?text=+" alt="#f59e0b"/> `#f59e0b` | Warm Accent | Secondary highlights |
| <img src="https://via.placeholder.com/16/a855f7/a855f7?text=+" alt="#a855f7"/> `#a855f7` | Violet | Chroma grid glow spots |

</div>

---

## License

This project is open source under the [MIT License](LICENSE).

---

<div align="center">
  <p><strong>Built by <a href="https://github.com/HariDevex">Hariharan N</a></strong></p>
  <p>
    <a href="https://haridevx.vercel.app">Website</a> ·
    <a href="https://www.linkedin.com/in/mrnobody1305">LinkedIn</a> ·
    <a href="https://github.com/HariDevex">GitHub</a>
  </p>
</div>
