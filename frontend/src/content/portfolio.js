export const portfolioData = {
  seo: {
    title: 'Hariharan N — Frontend Developer & ECE Graduate',
    description:
      'Frontend developer specializing in React, JavaScript, and modern CSS. Electronics & Communication Engineering graduate seeking SWE internships.',
    url: 'https://haridevx.vercel.app',
    image: '/images/og-image.webp',
  },
  hero: {
    name: 'Hariharan N',
    title: 'Frontend Developer',
    edu: 'B.E. ECE · Anna University',
    location: 'Tamil Nadu, India',
    gradYear: '2026',
    valueProp: 'I build production-quality React applications with clean architecture and measurable performance. My electronics engineering background gives me a system-thinking approach to frontend development — I don\'t just build UIs, I build reliable systems.',
    availability: 'Seeking SWE Internships — Available Summer 2026',
    resumeUrl: '/documents/Hariharan.pdf',
    techStack: ['React', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Git'],
  },
  about: {
    summary:
      'Electronics and Communication Engineering student at Anna University with a focus on frontend engineering. My engineering training teaches me to think in systems, not just components — I approach UI development the same way I approach circuit design: break down complexity, isolate variables, test systematically, and iterate.',
    highlights: [
      'Built 10+ web projects with React, JavaScript, and modern CSS — achieving 90+ Lighthouse scores',
      'Engineering coursework in C++, Python, data structures, and embedded systems',
      'Self-taught frontend development alongside a full-time engineering curriculum — 3 years of consistent practice',
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
      logo: '/images/logo/html.png',
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
      category: 'Languages',
      items: [
        { name: 'C++', proficiency: 'familiar' },
        { name: 'Python', proficiency: 'familiar' },
        { name: 'SQL', proficiency: 'familiar' },
      ],
    },
    {
      category: 'Tools',
      logo: '/images/logo/git.png',
      items: [
        { name: 'Git', proficiency: 'proficient' },
        { name: 'GitHub', proficiency: 'proficient' },
        { name: 'VS Code', proficiency: 'proficient' },
        { name: 'Vercel', proficiency: 'familiar' },
        { name: 'Figma', proficiency: 'familiar' },
        { name: 'Photoshop', proficiency: 'familiar' },
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
      role: 'Frontend Developer (Freelance)',
      company: 'Self-Employed',
      period: '2024 – Present',
      achievements: [
        'Built responsive portfolio sites and landing pages using React, consistently achieving 90+ Lighthouse scores across performance, accessibility, and SEO',
        'Created reusable component libraries that cut repeat work by 40% — standardized buttons, cards, forms, and layout primitives across projects',
        'Translated Figma design files into pixel-perfect responsive UIs supporting desktop, tablet, and mobile breakpoints',
        'Managed full deployment pipeline: custom domains, Vercel hosting, CI preview deployments, and DNS configuration',
      ],
    },
    {
      role: 'Engineering Project Lead',
      company: 'Academic Capstone',
      period: '2023 – 2024',
      achievements: [
        'Led a 3-person team to build a piezoelectric footstep power generator — designed the energy harvesting circuit, wrote the Arduino firmware, and demonstrated functional power output at a department symposium',
        'Developed an autonomous vacuum cleaner prototype with ultrasonic obstacle detection — programmed navigation logic on Arduino, integrated motor drivers, and tested in real environments',
        'Presented technical architecture and results to faculty and ~50 students, translating complex hardware-software integration into accessible explanations',
      ],
    },
  ],
  featuredProject: {
    title: 'E-Commerce Dashboard',
    description: 'Full-featured e-commerce platform with real-time inventory, cart management, and order tracking.',
    problem: 'A small retail business needed a modern online store. Their existing site was slow, not mobile-friendly, and had no inventory management — every stock update required manual spreadsheet work.',
    solution: 'Built a component-driven React frontend with a layered architecture: UI components, state management, and API integration layers. SQL backend handled inventory CRUD, cart persistence, and order lifecycle.',
    result: '50% faster page loads than their previous site, fully responsive across devices, and real-time inventory tracking that eliminated daily manual stock checks.',
    techStack: ['React', 'JavaScript', 'HTML5', 'CSS3', 'SQL'],
    image: '/images/projects/ecommerce.webp',
    liveUrl: 'https://haridevx.vercel.app',
    repoUrl: 'https://github.com/HariDevex/ecommerce-dashboard',
  },
  projects: [
    {
      title: 'Portfolio Website',
      description: 'This portfolio — built with React, designed for recruiter conversion. Features structured data for SEO, lazy-loaded sections for performance, and a clean dark theme.',
      techStack: ['React', 'JavaScript', 'CSS3', 'Framer Motion'],
      image: '/images/projects/portfolio.webp',
      liveUrl: 'https://haridevx.vercel.app',
      repoUrl: 'https://github.com/HariDevex/haridevx-portfolio',
      achievements: ['90+ Lighthouse across all categories', 'SEO-structured with JSON-LD', 'Lazy-loaded sections for faster initial load'],
    },
    {
      title: 'YouTube UI Clone',
      description: 'Frontend recreation of YouTube\'s layout using pure HTML and CSS. Built to practice responsive grid systems, semantic HTML, and pixel-accurate design implementation.',
      techStack: ['HTML5', 'CSS3', 'JavaScript'],
      image: '/images/projects/youtube.webp',
      liveUrl: '#',
      repoUrl: 'https://github.com/HariDevex/youtube-ui-clone',
      achievements: ['Responsive grid layout matching YouTube breakpoints', 'Semantic HTML structure', 'Optimized asset loading'],
    },
    {
      title: 'Footstep Power Generator',
      description: 'IoT hardware prototype that converts mechanical energy from footsteps into electrical energy using piezoelectric sensor arrays and an Arduino microcontroller.',
      techStack: ['Arduino', 'C++', 'Sensors', 'Circuit Design'],
      image: '/images/projects/footstep.webp',
      liveUrl: null,
      repoUrl: 'https://github.com/HariDevex/footstep-power-generator',
      achievements: ['Functional energy harvesting prototype', 'Led team of 3', 'Presented at department symposium'],
    },
    {
      title: 'Smart Vacuum Cleaner',
      description: 'Autonomous vacuum prototype with ultrasonic obstacle detection and avoidance. Programmed navigation firmware on Arduino with real-time sensor processing.',
      techStack: ['Arduino', 'C++', 'Motor Control', 'Sensors'],
      image: '/images/projects/vacuum.webp',
      liveUrl: null,
      repoUrl: 'https://github.com/HariDevex/smart-vacuum-cleaner',
      achievements: ['Real-time obstacle avoidance algorithm', 'Autonomous room navigation', 'Hardware-software integration'],
    },
  ],
  certifications: {
    title: 'Certifications & Workshops',
    description: '23 academic and professional certifications earned alongside my engineering degree.',
    images: [
      ...Array.from({ length: 21 }, (_, i) => `/images/certificates/cer.${String(i + 1).padStart(2, '0')}.jpg`),
      '/images/certificates/cer.22.jpeg',
      '/images/certificates/cer.23.jpeg',
    ],
  },
  codingProfiles: [
    { platform: 'GitHub', username: 'HariDevex', url: 'https://github.com/HariDevex', icon: '🖥️' },
  ],
  stats: [
    { value: 10, suffix: '+', label: 'Projects Built', context: 'Web apps, IoT prototypes, and tools' },
    { value: 15, suffix: '+', label: 'GitHub Repos', context: 'Public and private repositories' },
    { value: 23, suffix: '', label: 'Certifications', context: 'Academic and professional workshops' },
    { value: 2, suffix: '+', label: 'Years Learning', context: 'Self-taught alongside engineering degree' },
  ],
  contact: {
    email: '052005hari@gmail.com',
    phone: '+91 7200550619',
    linkedin: 'https://www.linkedin.com/in/mrnobody1305',
    github: 'https://github.com/HariDevex',
    formAction: '', // Set to your Formspree endpoint: https://formspree.io/f/your_form_id
  },
};
