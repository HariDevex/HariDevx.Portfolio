export const portfolioData = {
  seo: {
    title: 'Hariharan N — Full Stack Developer',
    description:
      'Full Stack developer specializing in React, Node.js/Express, and PostgreSQL. Electronics & Communication Engineering graduate open to full-time Full Stack Developer roles.',
    url: 'https://haridevx.vercel.app/',
    image: '/images/og-image.webp',
  },
  hero: {
    name: 'Hariharan N',
    title: 'Full Stack Developer',
    edu: 'B.E. ECE · Anna University',
    location: 'Tamil Nadu, India',
    gradYear: '2026',
    valueProp: 'Final Year ECE Student — Building React applications, Linux-based tools, and full-stack systems. Currently preparing for placements while shipping projects publicly.',
    availability: 'Full Stack Developer — Open to Full-Time Opportunities',
    resumeUrl: '/documents/Hariharan.pdf#Hariharan_Resume',
    techStack: ['React', 'JavaScript', 'Node.js', 'Tailwind CSS', 'Git'],
  },
  about: {
    summary:
      `I'm Hariharan, a final-year ECE student from Tamil Nadu.

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
      degree: '$_ B.E. in Electronics & Communication Engineering',
      school: 'Study World College of Engineering (Anna University)',
      years: '2022 – 2026',
      score: 'CGPA: 7.8 / 10',
    },
    {
      degree: '$_ Higher Secondary (HSC)',
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
      logo: '/images/logo/git.png',
      items: [
        { name: 'Git', proficiency: 'proficient' },
        { name: 'GitHub', proficiency: 'proficient' },
        { name: 'VS Code', proficiency: 'proficient' },
        { name: 'Vercel', proficiency: 'familiar' },
        { name: 'Figma', proficiency: 'familiar' },
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
      role: '$_ Full Stack Engineer Intern',
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
    image: '/images/projects/J_Visual_Studio.png',
    liveUrl: 'https://j-visula-studio.vercel.app/',
    repoUrl: 'https://github.com/HariDevex/j-visula-studio.git',
  },
  projects: [
    {
      title: 'Portfolio Website',
      description: 'This portfolio — built with React, designed for recruiter conversion. Features structured data for SEO, lazy-loaded sections for performance, and a clean dark theme.',
      techStack: ['React', 'JavaScript', 'HTML5', 'CSS3'],
      image: '/images/projects/Portfolio.png',
      liveUrl: 'https://hari-devx-portfolio.vercel.app/',
      repoUrl: 'https://github.com/HariDevex/HariDevx.Portfolio.git',
      achievements: ['90+ Lighthouse across all categories', 'SEO-structured with JSON-LD', 'Lazy-loaded sections for faster initial load'],
    },
    {
      title: 'Mytube UI Clone',
      description: 'Frontend recreation of YouTube\'s layout using pure HTML, CSS and React. Built to practice responsive grid systems, semantic HTML, and pixel-accurate design implementation.',
      techStack: ['React', 'JavaScript', 'HTML5', 'CSS3'],
      image: '/images/projects/My_tube.png',
      liveUrl: 'https://mytube-zeta-ten.vercel.app/',
      repoUrl: 'https://github.com/HariDevex/Mytube-haridevxx.git',
      achievements: ['Responsive grid layout matching YouTube breakpoints', 'Semantic HTML structure', 'Optimized asset loading'],
    },
    {
      title: 'Employee Management System',
      description: 'Full-stack employee management system with JWT authentication, attendance tracking, and role-based access control across 6 roles. Reduced manual record handling through centralized management.',
      techStack: ['React', 'Node.js', 'Express', 'PostgreSQL'],
      image: '/images/projects/EMS.png',
      liveUrl: 'https://elegance-it-geo-infotech.vercel.app/login',
      repoUrl: 'https://github.com/HariDevex/Elegance-IT-Geo-Infotech.git',
      achievements: ['Role-based access control across 6 roles', 'Attendance tracking system', 'Centralized record management'],
    },
    {
      title: 'Company Portal',
      description: 'Designed and developed a responsive corporate website for Elegance IT Geo Infotech featuring service showcases, company profile, project portfolio, and contact integration.',
      techStack: ['React', 'JavaScript', 'HTML5', 'CSS3'],
      image: '/images/projects/ejs_portfolio.png',
      liveUrl: 'https://elegance-it-geo-infotech.vercel.app/login',
      repoUrl: 'https://github.com/HariDevex/Elegance-Portfolio',
      achievements: ['Responsive layout across breakpoints', 'Semantic HTML structure', 'Optimized asset loading'],
    },
    {
      title: 'Footstep Power Generator',
      description: 'IoT hardware prototype that converts mechanical energy from footsteps into electrical energy using piezoelectric sensor arrays and an Arduino microcontroller.',
      techStack: ['Arduino', 'C++', 'Sensors', 'Circuit Design'],
      image: '/images/projects/footstep.webp',
      liveUrl: null,
      repoUrl: null,
      achievements: ['Functional energy harvesting prototype', 'Led team of 3', 'Presented at department symposium'],
    },
    {
      title: 'Smart Vacuum Cleaner',
      description: 'Autonomous vacuum prototype with ultrasonic obstacle detection and avoidance. Programmed navigation firmware on Arduino with real-time sensor processing.',
      techStack: ['Arduino', 'C++', 'Motor Control', 'Sensors'],
      image: '/images/projects/vacuum.webp',
      liveUrl: null,
      repoUrl: null,
      achievements: ['Real-time obstacle avoidance algorithm', 'Autonomous room navigation', 'Hardware-software integration'],
    },
  ],
  certifications: {
    title: 'Certifications & Workshops',
    description: 'Academic and professional certifications earned alongside my engineering degree.',
  },
  codingProfiles: [
    { platform: 'GitHub', username: 'HariDevex', url: 'https://github.com/HariDevex', icon: '🖥️' },
  ],
  stats: [
    { value: 6, suffix: '+', label: 'Projects Built', context: 'Web apps, IoT prototypes, and tools' },
    { value: 7, suffix: '+', label: 'GitHub Repos', context: 'Public and private repositories' },
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