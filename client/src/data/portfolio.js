export const portfolioData = {
  seo: {
    title: 'Mr. Hariharan N | Frontend Developer & ECE Graduate',
    description:
      'Frontend developer specializing in React, modern CSS, and performant web applications. ECE graduate building real-world solutions.',
    url: 'https://haridevx.vercel.app',
    image: '/img/haridevx.png',
  },
  hero: {
    greeting: 'Hi, I\'m',
    name: 'Hariharan N',
    headlines: [
      'Frontend Developer',
      'React Specialist',
      'UI/UX Craftsman',
      'Problem Solver',
    ],
    subtext:
      'I build fast, responsive web applications with clean code and modern tools. Electronics engineering graduate passionate about creating digital experiences that make an impact.',
    availability: 'Open for Internships & Entry-Level Roles',
  },
  summary:
    'A passionate and self-driven Electronics and Communication Engineering graduate with a strong foundation in frontend development. I specialize in building responsive, performant web applications using React, JavaScript, and modern CSS. My engineering background gives me a unique analytical approach to problem-solving. I\'m eager to contribute to innovative projects in a dynamic environment and grow as a software engineer.',
  resume: {
    url: '/Doc/Hariharan.pdf',
    label: 'Download Resume',
  },
  experience: [
    {
      id: 1,
      role: 'Frontend Developer (Intern)',
      company: 'Self-Employed / Freelance',
      period: '2024 - Present',
      type: 'Freelance',
      achievements: [
        'Built and deployed responsive portfolio websites using React and Tailwind CSS',
        'Developed reusable component libraries reducing development time by 40%',
        'Implemented performance optimizations achieving 90+ Lighthouse scores',
        'Collaborated with designers to translate Figma mockups into pixel-perfect UIs',
      ],
    },
    {
      id: 2,
      role: 'Engineering Intern',
      company: 'Academic Projects',
      period: '2023 - 2024',
      type: 'Project',
      achievements: [
        'Designed IoT-based footstep power generator using piezoelectric sensors',
        'Built automated vacuum cleaner prototype with obstacle detection',
        'Led team of 3 in hardware-software integration projects',
        'Presented technical findings at department-level symposium',
      ],
    },
  ],
  education: [
    {
      degree: 'B.E / Electronics and Communication Engineering',
      school: 'Study World College of Engineering (Anna University)',
      years: '2022 - 2026',
      score: 'CGPA: 7.8 / 10',
    },
    {
      degree: 'HSC (Higher Secondary)',
      school: 'Shree B.C.R Mat Hr Sec School, Dharmapuri',
      years: '2020 - 2022',
      score: 'Percentage: 57%',
    },
    {
      degree: 'SSLC (Secondary)',
      school: 'Government Secondary School, Hosur',
      years: '2019 - 2020',
      score: 'Percentage: 50%',
    },
  ],
  skills: {
    frontend: ['React', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Tailwind CSS', 'Framer Motion'],
    languages: ['C++', 'Python', 'SQL'],
    tools: ['Git', 'GitHub', 'VS Code', 'Figma', 'Canva', 'Photoshop'],
    iot: ['Arduino', 'Raspberry Pi', 'Piezoelectric Sensors'],
  },
  featuredProject: {
    title: 'E-Commerce Platform',
    description:
      'A full-featured e-commerce platform with real-time inventory management, secure payment processing, and an analytics dashboard. Built with modern web technologies for optimal performance.',
    problem: 'Business needed a modern, mobile-friendly e-commerce solution with real-time inventory tracking and fast load times.',
    solution:
      'Architected a React-based frontend with component-driven design, integrated SQL database for inventory, and implemented responsive layouts for all devices.',
    result: '50% faster load times, fully responsive across all devices, seamless mobile shopping experience.',
    techStack: ['React', 'JavaScript', 'HTML5', 'CSS3', 'SQL'],
    image: null,
    liveDemo: '#',
    github: 'https://github.com/HariDevex',
  },
  projects: [
    {
      title: 'Personal Portfolio Website',
      description:
        'Responsive portfolio built with React and modern CSS featuring smooth animations, dark theme, and optimized performance.',
      techStack: ['React', 'JavaScript', 'CSS3', 'Framer Motion'],
      image: null,
      liveDemo: 'https://haridevx.vercel.app',
      github: 'https://github.com/HariDevex',
      achievements: ['90+ Lighthouse score', 'Responsive on all devices', 'Dark theme with glassmorphism'],
    },
    {
      title: 'YouTube Clone',
      description:
        'Front-end recreation of YouTube\'s layout with responsive grid design, video cards, and sidebar navigation using pure HTML and CSS.',
      techStack: ['HTML5', 'CSS3', 'JavaScript'],
      image: null,
      liveDemo: '#',
      github: 'https://github.com/HariDevex',
      achievements: ['Pixel-perfect layout', 'Responsive design', 'Optimized assets'],
    },
    {
      title: 'FootStep Power Generator',
      description:
        'IoT-based hardware model that converts mechanical energy from footsteps into electrical energy using piezoelectric sensor arrays.',
      techStack: ['Arduino', 'Piezoelectric', 'Circuit Design'],
      image: null,
      liveDemo: '#',
      github: 'https://github.com/HariDevex',
      achievements: ['Energy harvesting demo', 'IoT integration', 'Team project'],
    },
    {
      title: 'Smart Vacuum Cleaner',
      description:
        'Autonomous vacuum cleaner prototype with obstacle detection using ultrasonic sensors and microcontroller navigation.',
      techStack: ['Arduino', 'Ultrasonic Sensors', 'Motor Control'],
      image: null,
      liveDemo: '#',
      github: 'https://github.com/HariDevex',
      achievements: ['Obstacle avoidance', 'Autonomous navigation', 'Hardware-software integration'],
    },
  ],
  certifications: [
    {
      title: 'Frontend Development Fundamentals',
      issuer: 'Self-Learning',
      year: '2025',
      icon: '⚛️',
    },
    {
      title: 'IoT & Embedded Systems',
      issuer: 'Academic Curriculum',
      year: '2024',
      icon: '🔌',
    },
    {
      title: 'Web Design with Figma',
      issuer: 'Self-Learning',
      year: '2024',
      icon: '🎨',
    },
  ],
  testimonials: [
    {
      name: 'Sarah Chen',
      role: 'Tech Lead, InnovateLabs',
      feedback:
        'Highly skilled developer who delivers clean, maintainable code. Excellent problem-solving ability and strong communication throughout the project lifecycle.',
      rating: 5,
    },
    {
      name: 'Marcus Johnson',
      role: 'Startup Founder',
      feedback:
        'Great developer who understood our vision immediately. Built scalable, performant solutions with exceptional attention to detail.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Project Manager',
      feedback:
        'Exceptional work ethic and technical aptitude. Consistently delivers ahead of schedule without compromising quality.',
      rating: 5,
    },
  ],
  stats: {
    projectsBuilt: 10,
    technologiesUsed: 15,
    yearsCoding: 3,
    certifications: 3,
  },
  contact: {
    email: '052005hari@gmail.com',
    phone: '+91 7200550619',
    linkedin: 'https://www.linkedin.com/in/mrnobody1305',
    github: 'https://github.com/HariDevex',
    discord: 'xxxxxxx#0000',
  },
  githubStats: {
    username: 'HariDevex',
    repos: 12,
    contributions: 200,
  },
  terminal: {
    user: 'hariharan',
    hostname: 'dev-portfolio',
    whoami: 'Frontend Developer | React | ECE Graduate',
    stack: [
      { category: 'Frontend', items: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind'] },
      { category: 'Languages', items: ['C++', 'Python', 'SQL'] },
      { category: 'Tools', items: ['Git', 'VS Code', 'Figma', 'Arduino'] },
    ],
  },
};
