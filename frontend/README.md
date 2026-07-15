<div align="center">
  <br/>
  <img src="https://img.shields.io/badge/Hariharan%20N-Client--App-0ea5e9?style=for-the-badge&logo=react&logoColor=61DAFB" alt="Client App Header"/>
  
  # 💻 Frontend Workspace Directory
  
  <p><strong>React 19 · Vite 8 · React Three Fiber · WebGL Aurora Shaders</strong></p>
  
  <br/>
</div>

---

## 📂 Overview

This directory contains the primary client-side web application for the **Hariharan N Portfolio**. Built using the latest **React 19 (Release Candidate/Stable)** and compiled via **Vite 8**, it leverages advanced 3D rendering engines and custom WebGL shaders to create a fluid, responsive, and hardware-accelerated user experience.

---

## 🎨 Component Ecosystem

The client codebase is structured around modular, reusable UI components and effects:

```bash
src/
├── components/
│   ├── 3d/               # React Three Fiber Canvas modules
│   │   ├── Scene3D.jsx   # 3D core canvas & environment setup
│   │   └── ...           # CameraController, MorphingShape, FloatingNodes
│   ├── effects/          # WebGL & Canvas visual backdrops
│   │   ├── SoftAurora    # OGL WebGL fragment shader aurora
│   │   ├── MouseGlow     # Spring-dampened pointer glow circle
│   │   └── ChromaGrid    # Static neon background blur hotspots
│   ├── layout/           # Global wrappers (Navbar, Dock navigation)
│   ├── loader/           # Terminal-theme boot loader phases
│   └── sections/         # Profile content sections (Hero, About, Skills...)
├── content/              # portfolio.js profile configuration schema
├── hooks/                # useTheme / useActiveSection viewport hooks
└── styles/               # System CSS design sheets
```

---

## ⚙️ Core Modules Breakdown

### 🌌 1. 3D Canvas Environment (`components/3d/`)
* **`Scene3D.jsx`**: Houses the main `<Canvas>` layer. Disables default pointer events via CSS (`pointer-events: none`) so that client scroll and clicks pass directly through to HTML sections.
* **`MorphingShape.jsx`**: Renders a `<mesh>` with a `<torusKnotGeometry>` using `@react-three/drei`'s `<MeshDistortMaterial>` for smooth interactive deformation.
* **`FloatingNodes.jsx`**: Placed below the fold. Houses floating technology wireframes (dodecahedron, octahedron, etc.) that float up to center stage during the **Skills** section scroll trigger.

### 🧪 2. WebGL Shaders & Canvas FX (`components/effects/`)
* **`SoftAurora.jsx`**: Leverages the lightweight **OGL** renderer. Instantiates a full-screen quad (Triangle) and binds a GLSL Fragment Shader calculating fractional Perlin 3D noise over time coordinates. Features responsive mouse coordinates listeners to shift noise bounds.
* **`MouseGlow.jsx`**: Employs **Framer Motion** spring variables (`useSpring`, `useMotionValue`) to smoothly lag mouse coordinates, creating a responsive aura circle behind the cursor.

### 💻 3. Terminal Loader (`components/loader/`)
* **`LoadingScreen.jsx`**: Manages initial viewport visibility states. Blocks screen interactions until boot commands complete.
* **`TerminalLines.jsx`**: Executes staggered console lines mimicking a true dev boot sequence with terminal style blinkers.

---

## 🛠️ Local Development & Commands

Run all command scripts from the `/frontend` sub-directory or through root delegations:

| Command | Action | Description |
| :--- | :--- | :--- |
| `npm run dev` | **Start Dev Server** | Launches Vite local development instance on port `5173`. |
| `npm run build` | **Production Compile** | Invokes Rolldown bundle compiler optimizing React chunks into `frontend/dist/`. |
| `npm run preview` | **Preview Build** | Launches local preview server routing to the compiled production assets. |

---

## 📝 Configuration Schema (`content/portfolio.js`)

All descriptive content, project names, certification links, and metadata are defined in `src/content/portfolio.js`. Modify this schema to update details sitewide:

```javascript
export const portfolioData = {
  seo: {
    title: 'Hariharan N — Full Stack Developer',
    description: '...',
    url: 'https://hari-devx-portfolio.vercel.app/',
  },
  hero: {
    name: 'Hariharan N',
    title: 'Full Stack Developer',
    techStack: ['React', 'JavaScript', 'Node.js', 'Tailwind CSS', 'Git'],
  },
  // Add additional project definitions, experiences, and academic metrics here...
};
```

---

<div align="center">
  <p><strong>Developed with 💙 by <a href="https://github.com/HariDevex">Hariharan N</a></strong></p>
</div>
