export const portfolioData = {
  seo: {
    title: 'Hariharan N — Full Stack Developer',
    description:
      'Hariharan N — Full Stack Developer (React, Next.js, Node.js/Express, PostgreSQL). ECE graduate with a production Employee Management System and live client work. Open to full-time roles.',
    url: 'https://hari-devx-portfolio.vercel.app/',
    image: '/images/og-image.webp',
  },
  hero: {
    name: 'Hariharan N',
    title: 'Full Stack Developer',
    edu: 'B.E. ECE · Anna University',
    location: 'Tamil Nadu, India',
    gradYear: '2026',
    valueProp: 'ECE Graduate — Building React applications, Linux-based tools, and full-stack systems. Currently seeking full-time roles while shipping projects publicly.',
    availability: 'Full Stack Developer — Open to Full-Time Opportunities',
    resumeUrl: '/documents/Hariharan.pdf#Hariharan_Resume',
    techStack: ['React', 'JavaScript', 'Node.js', 'Tailwind CSS', 'Git'],
  },
  about: {
    summary:
      `I'm Hariharan, an ECE graduate from Tamil Nadu.

I enjoy building web applications,
working with Linux,
and learning through projects.

Currently focused on placements,
full-stack development,
and improving problem-solving skills.`,
    highlights: [
      'Built 5+ web projects with React, JavaScript, and modern CSS — achieving 90+ Lighthouse scores',
      'Engineering coursework in C++, Python, data structures, and embedded systems',
      'Self-taught full-stack development alongside a full-time engineering curriculum — 6+ months of consistent practice',
      'Experience with Git workflows, responsive design, REST APIs, and Vercel deployments',
    ],
  },
  education: [
    {
      degree: 'B.E. in Electronics & Communication Engineering',
      school: 'Study World College of Engineering (Anna University)',
      years: '2022 – 2026',
      score: 'CGPA: 7.8 / 10',
    },
    {
      degree: 'Higher Secondary (HSC)',
      school: 'Shree B.C.R Mat Hr Sec School, Dharmapuri',
      years: '2020 – 2022',
      score: '57%',
    },
  ],
  skills: [
    {
      category: 'Frontend',
      logo: '/images/logo/html.webp',
      items: [
        { name: 'React', proficiency: 'proficient' },
        { name: 'JavaScript (ES6+)', proficiency: 'proficient' },
        { name: 'HTML5', proficiency: 'proficient' },
        { name: 'CSS3', proficiency: 'proficient' },
        { name: 'Tailwind CSS', proficiency: 'familiar' },
        { name: 'Framer Motion', proficiency: 'familiar' },
      ],
    },
    {
      category: 'Backend',
      items: [
        { name: 'Node.js', proficiency: 'proficient' },
        { name: 'Express.js', proficiency: 'proficient' },
        { name: 'REST APIs', proficiency: 'proficient' },
        { name: 'JWT Authentication', proficiency: 'proficient' },
      ],
    },
    {
      category: 'Database',
      items: [
        { name: 'PostgreSQL', proficiency: 'proficient' },
        { name: 'Knex.js', proficiency: 'familiar' },
      ],
    },
    {
      category: 'Languages',
      items: [
        { name: 'C++', proficiency: 'familiar' },
        { name: 'Python', proficiency: 'familiar' },
        { name: 'SQL', proficiency: 'familiar' },
      ],
    },
    {
      category: 'Tools',
      logo: '/images/logo/git.webp',
      items: [
        { name: 'Git', proficiency: 'proficient' },
        { name: 'GitHub', proficiency: 'proficient' },
        { name: 'VS Code', proficiency: 'proficient' },
        { name: 'Vercel', proficiency: 'familiar' },
        { name: 'Figma', proficiency: 'familiar' },
      ],
    },
    {
      category: 'Testing & QA',
      items: [
        { name: 'Playwright', proficiency: 'familiar' },
        { name: 'Manual Testing', proficiency: 'proficient' },
        { name: 'QA', proficiency: 'familiar' },
      ],
    },
    {
      category: 'Hardware & IoT',
      items: [
        { name: 'Arduino', proficiency: 'proficient' },
        { name: 'Raspberry Pi', proficiency: 'familiar' },
        { name: 'Sensors', proficiency: 'familiar' },
        { name: 'Circuit Design', proficiency: 'familiar' },
      ],
    },
  ],
  experience: [
    {
      role: 'Full Stack Engineer Intern',
      company: 'Elegance Geo Infotech',
      period: 'January 2026 – July 2026',
      achievements: [
        'Built a full-stack Employee Management System on the PERN stack (PostgreSQL, Express, React, Node.js)',
        'Implemented JWT-based authentication with bcrypt password hashing and role-based access control across 6 roles (Root, Admin, Manager, Team Lead, HR, Developer)',
        'Designed and built 20+ REST API endpoints covering employee records, attendance tracking, leave request/approval workflows, and company announcements',
        'Built a real-time dashboard with data visualizations (Recharts) surfacing attendance and workforce statistics',
        'Developed a direct/group messaging feature for internal team communication',
        'Used Knex.js for PostgreSQL schema migrations and query building',
        'Built the frontend in React 18 with React Router and Tailwind CSS, integrating directly with backend APIs',
        'Tech: React, Node.js, Express, PostgreSQL, Knex.js, JWT, Tailwind CSS',
      ],
    },
  ],
  featuredProject: {
    title: 'J Visual Studio',
    description: 'Live production website for a photography & design studio, with an interactive custom-frame configurator and WhatsApp-based booking flow.',
    problem: 'A photography & design studio needed a modern web presence with a way for clients to preview and order custom frames, plus an easy way to receive booking inquiries without a complex backend.',
    solution: 'Built a component-driven React and Next.js frontend with service pages, a filterable gallery, an interactive custom-frame configurator, and a WhatsApp-based booking flow — all animated with Framer Motion.',
    result: 'Fully responsive, production-deployed site the client uses to showcase work and take bookings directly.',
    techStack: ['Next.js', 'React', 'Framer Motion'],
    image: '/images/projects/J_Visual_Studio.webp',
    liveUrl: 'https://j-visula-studio.vercel.app/',
    repoUrl: 'https://github.com/HariDevex/j-visula-studio.git',
  },
  projects: [
    {
      title: 'Elegance EMS — Employee Management System',
      description: 'Full-stack employee management platform built during my internship at Elegance Geo Infotech. JWT authentication with role-based access control, attendance and leave workflows, announcements, internal messaging, and a real-time analytics dashboard.',
      techStack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Knex.js', 'JWT', 'Tailwind CSS', 'Docker'],
      image: '/images/projects/EMS.webp',
      liveUrl: 'https://elegance-it-geo-infotech.vercel.app/login',
      repoUrl: 'https://github.com/HariDevex/Elegance-IT-Geo-Infotech.git',
      achievements: [
        'Role-based access control across 6 roles with bcrypt-hashed passwords',
        '20+ REST API endpoints for employees, attendance, leave and announcements',
        'Recharts dashboard for attendance and workforce statistics',
        'Dockerized environment with PostgreSQL, Knex migrations and seed data',
      ],
    },
    {
      title: 'Hospital Management System (HMS)',
      description: 'Multi-department hospital platform covering consultations, nursing, laboratory, radiology, reception and a patient portal, with strict role-based boundaries between 7 hospital personas.',
      techStack: ['React 19', 'Vite', 'Tailwind CSS', 'React Router', 'Express', 'PostgreSQL', 'SQLite', 'Recharts'],
      image: null,
      liveUrl: 'https://hms-brown-mu.vercel.app',
      repoUrl: 'https://github.com/HariDevex/HMS.git',
      achievements: [
        'RBAC for 7 roles via route guards plus backend middleware',
        'Express API with 10+ modules: patients, appointments, labs, radiology, prescriptions, billing, wards, vitals',
        'In-app PDF viewer with zoom, rotation and tamper-evident SHA-256 seals',
        'Route-level code splitting with lazy loading; 0 lint errors (oxlint)',
      ],
    },
    {
      title: 'NodeRoute — Freight Intelligence Platform',
      description: 'Logistics website with live shipment tracking, a multi-step freight quote flow, an interactive 3D globe background, and a dark/light theme. React frontend with an Express API deployed as a Vercel serverless function.',
      techStack: ['React 19', 'Vite', 'Express', 'Three.js', 'Framer Motion', 'Vercel'],
      image: null,
      liveUrl: 'https://nexus-logistics-platform.vercel.app',
      repoUrl: 'https://github.com/HariDevex/nexus-logistics-platform.git',
      achievements: [
        'Shipment tracking timeline backed by a REST API',
        'Three.js particle globe with mouse parallax',
        'Express app exported as a Vercel serverless function',
        'Persistent dark/light theme and fully responsive layout',
      ],
    },

    {
      title: 'HDX Style — CSS Framework (npm package)',
      description: 'Utility-first CSS framework with a design system, published on npm as @haridevx/hdx-style. Includes a class parser, design tokens, dark mode, a plugin API and Tailwind CSS integration.',
      techStack: ['JavaScript', 'Node.js', 'CSS', 'Vitest', 'GitHub Actions', 'npm'],
      image: null,
      liveUrl: 'https://www.npmjs.com/package/@haridevx/hdx-style',
      repoUrl: 'https://github.com/HariDevex/hdx_style.git',
      achievements: [
        '2,035 utilities, 221 components and 49 variants',
        '383 automated tests; CI verifies README stats against source',
        'Published to npm (v1.0.3)',
      ],
    },
    {
      title: 'Jambhavan Software Systems — Company Website',
      description: 'Marketing website for a software services and IT training company, featuring an interactive 3D project portfolio and smooth animated transitions.',
      techStack: ['React 19', 'Vite', 'Tailwind CSS v4', 'Framer Motion', 'React Three Fiber'],
      image: null,
      liveUrl: null,
      repoUrl: 'https://github.com/HariDevex/JSP.git',
      achievements: [
        'Interactive 3D project showcase with React Three Fiber',
        'Client-side routing across multiple pages',
        'Tailwind CSS v4 design system',
      ],
    },
    {
      title: 'Playwright E2E Test Suite',
      description: 'End-to-end test automation for my own web apps, covering core user flows with reliable selectors and CI-friendly runs.',
      techStack: ['Playwright', 'JavaScript', 'GitHub Actions'],
      image: null,
      liveUrl: null,
      repoUrl: 'https://github.com/HariDevex/Playwright-Testing.git',
      achievements: [
        'End-to-end browser automation across key user flows',
        'Reusable page-object test structure',
        'HTML reports and screenshots on failure',
      ],
    },
    {
      title: 'Mytube — YouTube Clone',
      description: 'YouTube-style video app with a category-filtered feed, search, a video player with related videos, and a responsive dark theme.',
      techStack: ['React', 'Vite', 'React Router', 'CSS'],
      image: '/images/projects/My_tube.webp',
      liveUrl: 'https://mytube-zeta-ten.vercel.app/',
      repoUrl: 'https://github.com/HariDevex/Mytube-haridevxx.git',
      achievements: ['Search across title, description and channel', 'Fully responsive'],
    },
  ],
  certifications: {
    title: 'Certifications & Workshops',
    description: 'Academic and professional certifications earned alongside my engineering degree.',
  },
  codingProfiles: [
    { platform: 'GitHub', username: 'HariDevex', url: 'https://github.com/HariDevex', icon: '🖥️' },
    { platform: 'Vercel', username: 'harizencodedevs-projects', url: 'https://vercel.com/harizencodedevs-projects', icon: '▲' },
  ],
  stats: [
    { value: 8, suffix: '+', label: 'Projects Built', context: 'Web apps and developer tools' },
    { value: 13, suffix: '+', label: 'GitHub Repos', context: 'Public and private repositories' },
    { value: 6, suffix: '+', label: 'Certifications', context: 'Academic and professional workshops' },
    { value: 6, suffix: '+', label: 'Month Learning', context: 'Self-taught alongside engineering degree' },
  ],
  contact: {
    email: '052005hari@gmail.com',
    phone: '+91 7200550619',
    whatsapp: 'https://wa.me/917200550619',
    linkedin: 'https://www.linkedin.com/in/haridevx',
    github: 'https://github.com/HariDevex',
    formAction: '', // Set to your Formspree endpoint: https://formspree.io/f/your_form_id
  },
};