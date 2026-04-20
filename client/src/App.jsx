import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { mockPortfolio } from './mockData';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const API_BASE = import.meta.env.VITE_API_URL || '';

const HEADER_OFFSET = 80;

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    const offset = element.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'backOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const FloatingOrb = ({ delay = 0, size = 400, color = 'cyan', position = {} }) => (
  <motion.div
    style={{ position: 'absolute', width: size, height: size, borderRadius: '50%', filter: 'blur(100px)', ...position }}
    animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
    transition={{ duration: 8 + delay, repeat: Infinity, delay, ease: 'easeInOut' }}
    className={color === 'cyan' ? 'bg-[radial-gradient(circle,rgba(0,245,255,0.2)_0%,transparent_70%)]' : color === 'purple' ? 'bg-[radial-gradient(circle,rgba(124,58,237,0.2)_0%,transparent_70%)]' : ''}
  />
);

const GridBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(0,245,255,0.3) 1px, transparent 1px), linear-gradient(90deg,rgba(0,245,255,0.3) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
  </div>
);

const Section = ({ id, children, className = '' }) => (
  <motion.section
    id={id}
    className={`py-24 px-6 md:px-12 max-w-7xl mx-auto ${className}`}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-100px' }}
    variants={fadeInUp}
  >
    {children}
  </motion.section>
);

const SectionHeader = ({ label, title, desc }) => (
  <motion.div className="text-center mb-16" variants={fadeInUp}>
    <motion.span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-accent font-mono mb-4" variants={fadeInUp}>
      <motion.span animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }} className="inline-block">✦</motion.span>
      {' '}{label}
    </motion.span>
    <motion.h2 className="text-4xl md:text-5xl font-bold text-white mb-4" variants={fadeInUp}>{title}</motion.h2>
    {desc && <motion.p className="text-text-secondary text-lg max-w-xl mx-auto" variants={fadeInUp}>{desc}</motion.p>}
  </motion.div>
);

const Button = ({ children, href, primary = false, className = '', onClick }) => {
  const handleClick = (e) => {
    if (href?.startsWith('#')) {
      e.preventDefault();
      scrollToSection(href.substring(1));
    }
    onClick?.(e);
  };

  return (
    <a href={href} onClick={handleClick} className={`
      inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300
      ${primary
        ? 'bg-gradient-primary text-primary hover:shadow-glow transform hover:-translate-y-1'
        : 'border border-accent text-accent hover:bg-accent/10 hover:shadow-glow'
      } ${className}
    `}>
      {children}
    </a>
  );
};

const SkillCard = ({ icon, title, items, delay }) => (
  <motion.div
    className="bg-secondary/50 backdrop-blur-xl border border-white/5 rounded-2xl p-6 hover:border-accent/30 transition-all duration-300 group relative overflow-hidden"
    variants={fadeInUp}
    custom={delay}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <motion.span
            key={item}
            className="px-3 py-1.5 bg-white/5 rounded-full text-sm text-text-secondary border border-white/5 hover:border-accent/50 hover:text-accent transition-all duration-200 cursor-default"
            whileHover={{ scale: 1.05, y: -2 }}
          >
            {item}
          </motion.span>
        ))}
      </div>
    </div>
  </motion.div>
);

const ProjectCard = ({ title, description, techStack, image, github }) => (
  <motion.div
    className="group relative bg-secondary/50 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden hover:border-accent/30 transition-all duration-300"
    variants={fadeInUp}
    whileHover={{ y: -8 }}
  >
    <div className="aspect-video bg-elevated relative overflow-hidden">
      {image && <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-3">
        <a href={github} target="_blank" rel="noreferrer" className="px-4 py-2 bg-accent text-primary rounded-lg font-semibold text-sm hover:shadow-glow transition-shadow">View Code</a>
      </div>
    </div>
    <div className="p-5">
      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-accent transition-colors">{title}</h3>
      <p className="text-text-secondary text-sm mb-3">{description}</p>
      <div className="flex flex-wrap gap-2">
        {techStack?.map((tech) => (
          <span key={tech} className="px-2 py-1 bg-purple/10 text-purple-soft rounded text-xs font-mono">{tech}</span>
        ))}
      </div>
    </div>
  </motion.div>
);

const FeaturedProject = ({ project }) => (
  <motion.div
    className="bg-secondary/50 backdrop-blur-xl border border-accent/20 rounded-2xl overflow-hidden"
    variants={fadeInUp}
  >
    <div className="grid md:grid-cols-2 gap-0">
      <div className="aspect-video md:aspect-auto bg-elevated relative overflow-hidden">
        {project.image && <img src={project.image} alt={project.title} className="w-full h-full object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/50 to-transparent" />
      </div>
      <div className="p-8 flex flex-col justify-center">
        <span className="text-accent text-sm font-mono mb-2">Featured Project</span>
        <h3 className="text-3xl font-bold text-white mb-4">{project.title}</h3>
        <p className="text-text-secondary mb-6">{project.description}</p>
        <div className="space-y-4 mb-6">
          <div>
            <h4 className="text-white font-semibold text-sm mb-1">Problem</h4>
            <p className="text-text-secondary text-sm">{project.problem}</p>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-1">Solution</h4>
            <p className="text-text-secondary text-sm">{project.solution}</p>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-1">Tech Stack</h4>
            <div className="flex flex-wrap gap-2 mt-1">
              {project.techStack?.map((tech) => (
                <span key={tech} className="px-2 py-1 bg-accent/10 text-accent rounded text-xs font-mono">{tech}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button href={project.liveDemo} primary>Live Demo</Button>
          <Button href={project.github}>GitHub</Button>
        </div>
      </div>
    </div>
  </motion.div>
);

const TestimonialCard = ({ name, role, feedback, rating, avatar, delay }) => (
  <motion.div
    className="bg-secondary/30 backdrop-blur-xl border border-white/5 rounded-2xl p-6 relative overflow-hidden group"
    variants={fadeInUp}
    custom={delay}
  >
    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-accent/10 to-purple/10 rounded-bl-full" />
    <div className="relative z-10">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary font-bold text-lg">
          {name.charAt(0)}
        </div>
        <div>
          <h4 className="text-white font-semibold">{name}</h4>
          <p className="text-text-secondary text-sm">{role}</p>
        </div>
      </div>
      <div className="flex gap-0.5 mb-3">
        {[...Array(5)].map((_, i) => (
          <motion.span
            key={i}
            className="text-highlight text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + i * 0.1 }}
          >
            ★
          </motion.span>
        ))}
      </div>
      <p className="text-text-secondary text-sm leading-relaxed">"{feedback}"</p>
    </div>
  </motion.div>
);

const Terminal = ({ terminal }) => {
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentLine < 3) {
        setLines(prev => [...prev, currentLine]);
        setCurrentLine(prev => prev + 1);
      }
    }, 800);
    return () => clearInterval(timer);
  }, [currentLine]);

  return (
    <motion.div
      className="bg-secondary/80 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden font-mono"
      variants={fadeInUp}
    >
      <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border-b border-white/10">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-4 text-text-secondary text-sm">{terminal.user}@{terminal.hostname}</span>
      </div>
      <div className="p-4 text-sm">
        {lines.includes(0) && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-accent mb-2">
            $ whoami
            <span className="text-white ml-2">{terminal.whoami}</span>
          </motion.div>
        )}
        {lines.includes(1) && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-accent mb-2">
            $ cat stack.txt
            <div className="ml-4 mt-1">
              {terminal.stack.map((cat) => (
                <div key={cat.category} className="text-text-secondary mb-1">
                  <span className="text-purple">{cat.category}:</span> [{cat.items.join(', ')}]
                </div>
              ))}
            </div>
          </motion.div>
        )}
        {lines.includes(2) && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-accent">
            $ echo "Ready to build 🚀"
            <span className="text-highlight ml-2">"Ready to build 🚀"</span>
          </motion.div>
        )}
        <motion.div
          className="text-accent mt-2"
          animate={{ opacity: [1, 1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          $ <span className="animate-pulse">▋</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-primary z-50 origin-left"
      style={{ scaleX }}
    />
  );
};

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', toggle, { passive: true });
    return () => window.removeEventListener('scroll', toggle);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          whileHover={{ scale: 1.1 }}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-xl bg-gradient-primary text-primary flex items-center justify-center shadow-glow z-40"
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const MobileMenu = ({ isOpen, onClose, navItems, navIds, activeSection }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        <motion.nav
          className="fixed top-0 right-0 bottom-0 w-72 max-w-[80vw] bg-secondary z-50 p-6 flex flex-col border-l border-white/10"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
            <span className="bg-gradient-primary bg-clip-text text-transparent font-bold text-xl">Menu</span>
            <button onClick={onClose} className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors">✕</button>
          </div>
          <div className="flex flex-col gap-2">
            {navItems.map((item, i) => (
              <motion.a
                key={item}
                href={`#${navIds[i]}`}
                className={`flex justify-between items-center px-4 py-3 rounded-xl transition-colors ${activeSection === navIds[i] ? 'bg-accent/10 text-accent border-l-2 border-accent' : 'text-text-secondary hover:bg-white/5 hover:text-white'}`}
                onClick={(e) => { e.preventDefault(); scrollToSection(navIds[i]); onClose(); }}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                {item}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </motion.a>
            ))}
          </div>
        </motion.nav>
      </>
    )}
  </AnimatePresence>
);

export default function App() {
  const [portfolio, setPortfolio] = useState(mockPortfolio);
  const [status, setStatus] = useState('idle');
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setStatus('loading');
        const { data } = await axios.get(`${API_BASE}/api/portfolio`);
        setPortfolio(data);
        setStatus('ready');
      } catch {
        setStatus('offline');
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'featured', 'projects', 'testimonials', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { hero, summary, skills, testimonials, featuredProject, projects, contact, terminal } = portfolio;

  const navItems = ['Home', 'About', 'Skills', 'Projects', 'Testimonials', 'Contact'];
  const navIds = ['home', 'about', 'skills', 'featured', 'testimonials', 'contact'];

  return (
    <div className="min-h-screen bg-primary text-white overflow-x-hidden">
      <ScrollProgress />
      <BackToTop />

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex justify-between items-center backdrop-blur-xl bg-primary/80 border-b border-white/5"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <a href="#home" className="flex items-center gap-3 font-bold text-xl" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
          <img src="/img/haridevx.png" alt="Logo" className="w-10 h-10 rounded-lg object-contain" />
          <span className="bg-gradient-primary bg-clip-text text-transparent hidden sm:block">Mr. Hariharan</span>
        </a>

        <div className="hidden md:flex gap-2">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${navIds[navItems.indexOf(item)]}`}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeSection === navIds[navItems.indexOf(item)] ? 'text-accent' : 'text-text-secondary hover:text-white'}`}
              onClick={(e) => { e.preventDefault(); scrollToSection(navIds[navItems.indexOf(item)]); }}
            >
              {item}
            </a>
          ))}
        </div>

        <button
          className={`md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="w-6 h-0.5 bg-white transition-transform" />
          <span className="w-6 h-0.5 bg-white transition-opacity" />
          <span className="w-6 h-0.5 bg-white" />
        </button>
      </motion.nav>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={navItems}
        navIds={navIds}
        activeSection={activeSection}
      />

      {/* Hero Section */}
      <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 py-32 overflow-hidden">
        <GridBackground />
        <FloatingOrb delay={0} size={500} color="cyan" position={{ top: '10%', left: '10%' }} />
        <FloatingOrb delay={2} size={400} color="purple" position={{ bottom: '20%', right: '15%' }} />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,245,255,0.05)_0%,transparent_70%)]" />

        <motion.div className="relative z-10 text-center max-w-4xl mx-auto" variants={staggerContainer} initial="hidden" animate="visible">
          <motion.div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-text-secondary mb-8" variants={scaleIn}>
            <span className="w-2 h-2 rounded-full bg-highlight animate-pulse" />
            Available for Work
          </motion.div>

          <motion.h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight" variants={fadeInUp}>
            <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
              {hero.heading}
            </span>
          </motion.h1>

          <motion.p className="text-xl md:text-2xl text-text-secondary mb-10 max-w-2xl mx-auto" variants={fadeInUp}>
            {hero.subtext}
          </motion.p>

          <motion.div className="flex gap-4 justify-center flex-wrap" variants={fadeInUp}>
            <Button href="#projects" primary className="px-8 py-4 text-lg">
              <span>🚀</span> View Projects
            </Button>
            <Button href={contact.github} className="px-8 py-4 text-lg">
              <span>🖥️</span> GitHub
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          onClick={() => scrollToSection('about')}
        >
          <div className="w-6 h-10 border-2 border-text-muted rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-accent rounded-full animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <Section id="about">
        <SectionHeader label="About" title="About Me" desc="Full-stack developer building fast, scalable web applications" />
        <motion.div
          className="bg-secondary/50 backdrop-blur-xl border border-white/5 rounded-2xl p-8 md:p-12 relative overflow-hidden"
          variants={fadeInUp}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-purple/5 opacity-50" />
          <div className="relative z-10">
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto text-center">
              {summary}
            </p>
          </div>
        </motion.div>
      </Section>

      {/* Terminal Section */}
      <Section id="terminal" className="py-16">
        <div className="max-w-3xl mx-auto">
          <Terminal terminal={terminal} />
        </div>
      </Section>

      {/* Skills Section */}
      <Section id="skills">
        <SectionHeader label="Expertise" title="Skills & Technologies" desc="Tools and technologies I work with" />
        <div className="grid md:grid-cols-3 gap-6">
          <SkillCard icon="🎨" title="Frontend" items={skills.frontend} delay={0} />
          <SkillCard icon="⚙️" title="Backend" items={skills.backend} delay={1} />
          <SkillCard icon="🔧" title="Tools" items={skills.tools} delay={2} />
        </div>
      </Section>

      {/* Featured Project Section */}
      <Section id="featured">
        <SectionHeader label="Highlight" title="Featured Project" desc="A showcase of my best work" />
        <FeaturedProject project={featuredProject} />
      </Section>

      {/* Projects Grid */}
      <Section id="projects" className="pb-32">
        <SectionHeader label="Work" title="Projects" desc="Things I've built and shipped" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} {...project} delay={i} />
          ))}
        </div>
      </Section>

      {/* Testimonials Section */}
      <Section id="testimonials">
        <SectionHeader label="Reviews" title="Testimonials" desc="What people say about my work" />
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={testimonial.name} {...testimonial} delay={i * 0.2} />
          ))}
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact">
        <SectionHeader label="Connect" title="Let's Work Together" desc="Feel free to reach out" />
        <motion.div className="text-center" variants={staggerContainer}>
          <motion.p className="text-2xl md:text-3xl font-bold text-white mb-4" variants={fadeInUp}>
            Let's build something great
          </motion.p>
          <motion.p className="text-text-secondary mb-8 max-w-xl mx-auto" variants={fadeInUp}>
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </motion.p>
          <motion.div className="flex gap-4 justify-center flex-wrap" variants={fadeInUp}>
            <Button href={`mailto:${contact.email}`} primary className="px-8 py-4 text-lg">
              <span>✉️</span> Email Me
            </Button>
            <Button href={contact.github} className="px-8 py-4 text-lg">
              <span>🖥️</span> GitHub
            </Button>
            <Button href={contact.linkedin} className="px-8 py-4 text-lg">
              <span>💼</span> LinkedIn
            </Button>
          </motion.div>
        </motion.div>
      </Section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 bg-secondary/30">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center gap-4 mb-6">
            <a href={contact.github} className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-text-secondary hover:bg-accent/20 hover:text-accent transition-colors">🖥️</a>
            <a href={contact.linkedin} className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-text-secondary hover:bg-accent/20 hover:text-accent transition-colors">💼</a>
            <a href={contact.email} className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-text-secondary hover:bg-accent/20 hover:text-accent transition-colors">✉️</a>
          </div>
          <p className="text-text-secondary text-sm">
            Designed & Built by <span className="text-accent">Mr. Hariharan</span> · {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}