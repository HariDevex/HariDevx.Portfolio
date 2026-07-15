<div align="center">
  <br/>
  <img src="https://img.shields.io/badge/Hariharan%20N-Portfolio-0ea5e9?style=for-the-badge&logo=react&logoColor=61DAFB" alt="Portfolio Name"/>
  
  # 🌌 Hariharan N · Immersive 3D Portfolio
  
  <p><strong>✨ Electronics & Communication Engineering Graduate · Full Stack Developer · WebGL Creator ✨</strong></p>

  <p>
    <a href="https://haridevx.vercel.app" target="_blank">
      <img src="https://img.shields.io/badge/Live%20Demo-haridevx.vercel.app-0ea5e9?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Site"/>
    </a>
    <a href="https://www.linkedin.com/in/haridevx" target="_blank">
      <img src="https://img.shields.io/badge/LinkedIn-Connect%20%E2%9E%9F-0a66c2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
    </a>
    <a href="mailto:052005hari@gmail.com">
      <img src="https://img.shields.io/badge/Gmail-Contact%20%E2%9C%89-ea4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"/>
    </a>
    <a href="https://github.com/HariDevex/HariDevx.Portfolio">
      <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
    </a>
  </p>
  
  <br/>
</div>

---

## 📖 Overview

Welcome to my **highly-interactive single-page portfolio**. Combining hardware principles with modern web engineering, this build implements a cutting-edge creative front-end stack using **React 19**, **Vite 8**, and dedicated **WebGL** libraries. It features an interactive 3D centerpiece, scroll-bound camera coordinates, custom background shaders, and an animated terminal-themed boot process designed to provide recruiters with an unforgettable first impression.

---

## 🎨 Creative Design & Aesthetics

This portfolio rejects generic layouts in favor of an **immersive, alive interface** using a curated dark-neon aesthetic:

* **🌌 3D Centerpiece Kinetic Engine:** Powered by **React Three Fiber**, a central morphing `torusKnotGeometry` mesh scales, twists, and changes color in real-time as the user scrolls.
* **🧪 Interactive WebGL Aurora (OGL):** A custom WebGL shader computes multi-octave Perlin noise in real-time, responding gracefully to mouse drag and drift.
* **💫 Neon Mouse Glow & Chroma spots:** Floating ambient blur regions and interactive canvas lights trace client inputs with dynamic spring-based damping coordinates.

---

## 🛠️ Stack & Technologies

### 🚀 Core Framework
<p>
  <img src="https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React 19"/>
  <img src="https://img.shields.io/badge/Vite%208-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 8"/>
  <img src="https://img.shields.io/badge/React%20Router%20v7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" alt="React Router v7"/>
</p>

### 🎭 Visuals & 3D WebGL
<p>
  <img src="https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=threedotjs&logoColor=white" alt="Three.js"/>
  <img src="https://img.shields.io/badge/Fiber-R3F-0ea5e9?style=for-the-badge" alt="React Three Fiber"/>
  <img src="https://img.shields.io/badge/Drei-Components-ff69b4?style=for-the-badge" alt="Drei"/>
  <img src="https://img.shields.io/badge/OGL%20WebGL-00bcd4?style=for-the-badge" alt="OGL Library"/>
</p>

### 📈 Kinetics & Styling
<p>
  <img src="https://img.shields.io/badge/GSAP%20ScrollTrigger-88CE02?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP"/>
  <img src="https://img.shields.io/badge/Framer%20Motion%2012-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion"/>
  <img src="https://img.shields.io/badge/CSS3%20Variables-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3"/>
</p>

---

## 📈 Interactive 3D Scroll States

As the visitor scrolls, **GSAP ScrollTrigger** modifies properties inside the 3D Canvas context, transitioning the colors and dimensions of the centerpiece:

| 📍 Trigger Section | 🎨 Target Color | 🛠️ Desktop Position | 📏 Scale | 🌀 Distortion |
| :--- | :--- | :--- | :--- | :--- |
| **🚀 Home (Hero)** | <kbd>🟦 #0ea5e9 (Cyan)</kbd> | `[2.0, 0.0, 0.0]` | **1.15** | **0.28** |
| **🔍 About** | <kbd>🟪 #8b5cf6 (Purple)</kbd> | `[-2.3, 0.2, -0.6]` | **0.85** | **0.38** |
| **⚡ Skills** | <kbd>🟥 #ec4899 (Pink)</kbd> | `[2.3, -0.2, 0.2]` | **1.05** | **0.20** |
| **💼 Experience** | <kbd>🟩 #10b981 (Emerald)</kbd> | `[-2.3, 0.3, -0.8]` | **0.85** | **0.35** |
| **🎓 Education** | <kbd>🟧 #f59e0b (Amber)</kbd> | `[2.3, -0.4, 0.0]` | **1.00** | **0.42** |
| **📊 Stats & Profiles** | <kbd>🔷 #06b6d4 (Teal)</kbd> | `[0.0, 1.6, -2.2]` | **1.35** | **0.18** |
| **💻 Projects** | <kbd>🔵 #6366f1 (Indigo)</kbd> | `[-2.4, 0.0, -0.4]` | **0.80** | **0.40** |
| **🏆 Certifications** | <kbd>🧿 #3b82f6 (Blue)</kbd> | `[0.0, 0.0, -3.5]` | **2.60** | **0.10** |

> [!NOTE]
> When the user hovers over the 3D canvas, a gentle pointer coordinate listener introduces subtle **interactive 3D parallax** that tilts the mesh slightly relative to the cursor position.

---

## ⚡ Key Highlights

### 🏎️ Terminal Boot Loader
* 💻 Simulated bash shell boot queries (`whoami`, `load_skills`, `start_server`).
* 📊 Real-time dynamic progress percentage indicator.
* 🏷️ Multi-letter staggered entrance brand label transition.

### 🍃 High Performance & SEO
* 📦 Integrated **lazy loading modules** using React's `<Suspense>` boundary.
* 🖼️ Media compression utilizing optimized WebP elements (<10KB icons).
* 🏷️ Built-in **Schema.org LD+JSON** graphs, Open Graph metadata, sitemap files, and robots configuration.

> [!TIP]
> To optimize CPU and GPU cycles on mobile platforms, the canvas automatically downsizes resolution parameters (dpr coordinates capped between `[1, 2]`) and limits frame computations if page scrolls outside interactive thresholds.

---

## 🎨 Color Palette & Design Tokens

Define custom variables inside your workspace styles to alter the full theme instantly:

<table>
  <tr>
    <th>Swatch</th>
    <th>Token</th>
    <th>Hex Code</th>
    <th>Theme Usage</th>
  </tr>
  <tr>
    <td><img src="https://via.placeholder.com/20/0d0d0d/000000?text=+" alt="Dark BG"/></td>
    <td><code>--bg-dark</code></td>
    <td><code>#0d0d0d</code></td>
    <td>Dark theme canvas background</td>
  </tr>
  <tr>
    <td><img src="https://via.placeholder.com/20/f5f5f0/000000?text=+" alt="Light BG"/></td>
    <td><code>--bg-light</code></td>
    <td><code>#f5f5f0</code></td>
    <td>Light theme background</td>
  </tr>
  <tr>
    <td><img src="https://via.placeholder.com/20/0ea5e9/000000?text=+" alt="Sky Cyan"/></td>
    <td><code>--accent-sky</code></td>
    <td><code>#0ea5e9</code></td>
    <td>Primary glow elements & buttons</td>
  </tr>
  <tr>
    <td><img src="https://via.placeholder.com/20/8b5cf6/000000?text=+" alt="Purple Accent"/></td>
    <td><code>--accent-violet</code></td>
    <td><code>#8b5cf6</code></td>
    <td>Section gradients & lighting spheres</td>
  </tr>
</table>

---

## 📂 Project Structure

```bash
.
├── frontend/                     # Client application bundle
│   ├── public/
│   │   ├── images/
│   │   │   ├── logo/             # Tech stack SVGs & icons
│   │   │   └── projects/         # Gallery project images
│   │   ├── documents/            # PDF resume attachments
│   │   └── robots.txt
│   └── src/
│       ├── components/
│       │   ├── 3d/               # Scene3D, CameraController, MorphingShape
│       │   ├── effects/          # SoftAurora WebGL, MouseGlow, ChromaGrid
│       │   ├── loader/           # LoadingScreen terminal components
│       │   └── sections/         # Hero, About, Skills, Projects, Certs
│       ├── content/              # Data configuration models
│       ├── hooks/                # Active section & Theme observers
│       └── styles/               # Main typography & structural designs
├── package.json                  # Parent run scripts
├── vercel.json                   # Deployment redirects
└── .gitignore
```

---

## ⚙️ Quick Start

> [!IMPORTANT]
> Ensure **Node.js** (v18+) and **npm** are installed prior to starting the development process.

1. **Install workspace dependencies:**
   ```bash
   npm install
   ```

2. **Launch dev compiler (Vite dev server):**
   ```bash
   npm run dev
   ```

3. **Build deployment package:**
   ```bash
   npm run build
   ```

---

<div align="center">
  <p><strong>Made with 💙 by <a href="https://github.com/HariDevex">Hariharan N</a></strong></p>
  <p>
    <a href="https://haridevx.vercel.app">Website</a> ·
    <a href="https://www.linkedin.com/in/haridevx">LinkedIn</a> ·
    <a href="https://github.com/HariDevex">GitHub</a>
  </p>
</div>
