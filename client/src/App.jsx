import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { mockPortfolio } from './mockData';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const API_BASE = import.meta.env.VITE_API_URL || '';

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'backOut' } }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 }
  }
};

const wordAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const FloatingOrb = ({ delay = 0, size = 400, color = 'cyan', position = {} }) => (
  <motion.div
    style={{
      position: 'absolute',
      width: size,
      height: size,
      borderRadius: '50%',
      background: color === 'cyan' 
        ? 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)'
        : color === 'violet'
        ? 'radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, transparent 70%)'
        : 'radial-gradient(circle, rgba(236, 72, 153, 0.25) 0%, transparent 70%)',
      filter: 'blur(80px)',
      ...position
    }}
    animate={{
      y: [0, -40, 0],
      x: [0, 30, 0],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: 10 + delay,
      repeat: Infinity,
      delay,
      ease: 'easeInOut'
    }}
  />
);

const Particle = ({ index }) => {
  const randomX = Math.random() * 100;
  const randomY = Math.random() * 100;
  const randomDelay = Math.random() * 5;
  const randomDuration = 15 + Math.random() * 10;
  const randomSize = 2 + Math.random() * 4;
  
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${randomX}%`,
        top: `${randomY}%`,
        width: randomSize,
        height: randomSize,
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.6)',
        boxShadow: '0 0 10px rgba(139, 92, 246, 0.8)',
      }}
      animate={{
        y: [-20, 20, -20],
        opacity: [0.2, 0.8, 0.2],
        scale: [1, 1.5, 1],
      }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        delay: randomDelay,
        ease: 'easeInOut'
      }}
    />
  );
};

const AnimatedText = ({ text, className }) => {
  const words = text.split(' ');
  return (
    <span className={className} style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0.3em' }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordAnimation}
          style={{ display: 'inline-block' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

const MagneticButton = ({ children, href, className }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x * 0.15, y: position.y * 0.15 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.a>
  );
};

const Section = ({ children }) => (
  <motion.section 
    className="section"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-100px' }}
    variants={fadeInUp}
  >
    {children}
  </motion.section>
);

const SectionHeader = ({ label, title, desc }) => (
  <motion.div className="section-header" variants={fadeInUp}>
    <motion.span className="section-label" variants={fadeInUp}>
      <motion.span
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'inline-block' }}
      >
        ✦
      </motion.span>
      {' '}{label}
    </motion.span>
    <motion.h2 className="section-title" variants={fadeInUp}>{title}</motion.h2>
    {desc && <motion.p className="section-desc" variants={fadeInUp}>{desc}</motion.p>}
  </motion.div>
);

const GlowCard = ({ children, index, icon }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.article
      className="glow-card"
      variants={fadeInUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={isHovered ? { y: -12 } : { y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <motion.div 
        className="glow-card-glow"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div 
        className="glow-card-icon"
        animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {icon}
      </motion.div>
      {children}
    </motion.article>
  );
};

export default function App() {
  const [portfolio, setPortfolio] = useState(mockPortfolio);
  const [status, setStatus] = useState('idle');
  const [activeSection, setActiveSection] = useState('home');
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3]);

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
      const sections = ['home', 'summary', 'education', 'skills', 'gallery', 'projects', 'contact'];
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

  const { hero, summary, education, skills, skillLogos, gallery, projects, contact } = portfolio;

  const navItems = ['Home', 'Education', 'Skills', 'Gallery', 'Projects', 'Contact'];
  const navIds = ['home', 'summary', 'education', 'skills', 'gallery', 'projects', 'contact'];

  const groupedSkills = {
    'Design & Frontend': skills.filter(s => s.includes('Web') || s.includes('Figma') || s.includes('Canva') || s.includes('Photoshop')),
    'Programming': skills.filter(s => s.includes('Programming') || s.includes('C++') || s.includes('Python')),
    'Tools & Platforms': skills.filter(s => s.includes('Git') || s.includes('Arduino') || s.includes('Raspberry') || s.includes('Problem') || s.includes('Strong')),
  };

  return (
    <div className="page">
      <motion.nav 
        className="nav"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.div 
          className="brand"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <motion.span 
            className="brand-text"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            Mr. Hariharan N
          </motion.span>
        </motion.div>
        <div className="nav-links">
          {navItems.map((item, i) => (
            <motion.a
              key={item}
              href={`#${navIds[i]}`}
              className={activeSection === navIds[i] ? 'active' : ''}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, type: 'spring', stiffness: 300 }}
              whileHover={{ y: -3, scale: 1.05 }}
            >
              <motion.span
                animate={activeSection === navIds[i] ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {item}
              </motion.span>
            </motion.a>
          ))}
        </div>
      </motion.nav>

      <section id="home" className="hero" ref={heroRef}>
        <motion.div 
          className="hero-bg" 
          style={{ scale: heroScale, opacity: heroOpacity }}
        />
        <div className="hero-overlay" />
        
        {[...Array(30)].map((_, i) => (
          <Particle key={i} index={i} />
        ))}
        
        <FloatingOrb delay={0} size={500} color="cyan" position={{ top: '5%', left: '5%' }} />
        <FloatingOrb delay={2} size={600} color="violet" position={{ bottom: '10%', right: '10%' }} />
        <FloatingOrb delay={4} size={400} color="pink" position={{ top: '40%', right: '20%' }} />
        
        <motion.div 
          className="hero-content"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-badge" variants={scaleIn}>
            <motion.span 
              className="hero-badge-dot"
              animate={{ 
                scale: [1, 1.3, 1],
                boxShadow: [
                  '0 0 10px #10b981',
                  '0 0 25px #10b981',
                  '0 0 10px #10b981'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <AnimatePresence mode="wait">
              <motion.span
                key={status}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {status === 'ready' ? 'Connected to API' : 'Available for Hire'}
              </motion.span>
            </AnimatePresence>
          </motion.div>
          
          <motion.p className="hero-tagline" variants={fadeInUp}>
            {hero.tagline}
          </motion.p>
          
          <motion.h1 className="hero-title" variants={fadeInUp}>
            <AnimatedText text="Mr. Hariharan N" className="hero-title-text" />
          </motion.h1>
          
          <motion.p className="hero-subtitle" variants={fadeInUp}>
            <AnimatedText text={hero.lines.join(' ')} />
          </motion.p>
          
          <motion.div className="hero-cta" variants={fadeInUp}>
            <MagneticButton href="#projects" className="btn btn-primary">
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🚀
              </motion.span>
              View Projects
            </MagneticButton>
            <MagneticButton href="#contact" className="btn btn-secondary">
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ✨
              </motion.span>
              Get in Touch
            </MagneticButton>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="scroll-indicator"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div 
            className="scroll-mouse"
            animate={{ height: [20, 35, 20] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </section>

      <Section>
        <SectionHeader label="About" title="Executive Summary" />
        <motion.div 
          className="summary-section" 
          variants={fadeInUp}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.4 }}
        >
          <p className="summary-text">{summary}</p>
        </motion.div>
      </Section>

      <Section>
        <SectionHeader 
          label="Background" 
          title="Education" 
          desc="Academic journey and achievements"
        />
        <motion.div 
          className="grid-3" 
          variants={staggerContainer} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
        >
          {education.map((edu, i) => (
            <GlowCard key={edu.degree} index={i} icon={['🎓', '📚', '🎯'][i]}>
              <h3 className="card-title">{edu.degree}</h3>
              <p className="card-meta">{edu.school}<br/>{edu.years}</p>
              <motion.span 
                className="card-score"
                whileHover={{ scale: 1.05 }}
              >
                {edu.score}
              </motion.span>
            </GlowCard>
          ))}
        </motion.div>
      </Section>

      <Section>
        <SectionHeader 
          label="Expertise" 
          title="Skills & Technologies" 
          desc="Tools and technologies I work with"
        />
        <motion.div 
          className="skills-container" 
          variants={staggerContainer} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
        >
          {Object.entries(groupedSkills).filter(([_, v]) => v.length > 0).map(([category, items], catIndex) => (
            <motion.div 
              key={category} 
              className="skill-category" 
              variants={catIndex % 2 === 0 ? slideInLeft : slideInRight}
              whileHover={{ scale: 1.02, borderColor: 'rgba(139, 92, 246, 0.5)' }}
            >
              <h3 className="skill-category-title">
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  {category === 'Design & Frontend' ? '🎨' : category === 'Programming' ? '💻' : '🔧'}
                </motion.span>
                {category}
              </h3>
              <div className="skill-list">
                {items.map((skill, j) => (
                  <motion.span 
                    key={skill} 
                    className="skill-tag"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: j * 0.1, type: 'spring', stiffness: 300 }}
                    whileHover={{ 
                      scale: 1.1, 
                      y: -5,
                      borderColor: 'rgba(139, 92, 246, 0.8)',
                      backgroundColor: 'rgba(139, 92, 246, 0.15)'
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="marquee-container" 
          variants={fadeInUp}
          whileHover={{ scale: 1.02 }}
        >
          <div className="marquee-track">
            {[...skillLogos, ...skillLogos].map((logo, idx) => (
              <motion.img 
                key={`${logo}-${idx}`} 
                src={logo} 
                alt="tech" 
                className="marquee-item"
                whileHover={{ scale: 1.2, filter: 'brightness(1.3)' }}
                transition={{ type: 'spring', stiffness: 400 }}
              />
            ))}
          </div>
        </motion.div>
      </Section>

      <Section>
        <SectionHeader 
          label="Achievements" 
          title="Certificate Gallery" 
          desc="Certifications and accomplishments"
        />
        <div className="gallery-grid">
          {gallery.slice(0, 12).map((img, i) => {
            const row = Math.floor(i / 4);
            const col = i % 4;
            const delay = (row + col) * 0.1;
            
            return (
              <motion.div
                key={img}
                className="gallery-item"
                initial={{ 
                  opacity: 0,
                  scale: 0.5,
                  rotateX: -30,
                  y: 80
                }}
                whileInView={{ 
                  opacity: 1,
                  scale: 1,
                  rotateX: 0,
                  y: 0
                }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ 
                  duration: 0.8,
                  delay,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover="hover"
              >
                <motion.div
                  className="gallery-image-container"
                  variants={{
                    hover: { scale: 1.08 }
                  }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <motion.img 
                    src={img} 
                    alt={`Certificate ${i + 1}`} 
                    loading="lazy"
                    initial={{ filter: 'blur(10px)' }}
                    whileInView={{ filter: 'blur(0px)' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: delay + 0.3 }}
                  />
                </motion.div>
                
                <motion.div 
                  className="gallery-overlay"
                  variants={{
                    initial: { opacity: 0 },
                    hover: { opacity: 1 }
                  }}
                >
                  <motion.div className="gallery-content">
                    <motion.div 
                      className="gallery-icon"
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                        scale: { duration: 2, repeat: Infinity }
                      }}
                    >
                      📜
                    </motion.div>
                    <motion.span 
                      className="gallery-title"
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                    >
                      Certificate {i + 1}
                    </motion.span>
                    <motion.div 
                      className="gallery-actions"
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                    >
                      <motion.span
                        className="gallery-btn"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        View
                      </motion.span>
                    </motion.div>
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  className="gallery-glow"
                  animate={{ 
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
                
                <motion.div 
                  className="gallery-border"
                  variants={{
                    initial: { pathLength: 0 },
                    hover: { pathLength: 1 }
                  }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            );
          })}
        </div>
      </Section>

      <Section>
        <SectionHeader 
          label="Work" 
          title="Featured Projects" 
          desc="Things I've built and shipped"
        />
        <motion.div 
          className="grid-3" 
          variants={staggerContainer} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
        >
          {projects.map((project, i) => (
            <GlowCard key={project.title} index={i} icon={['🌐', '📺', '⚡', '🤖'][i] || '💻'}>
              <h3 className="card-title">{project.title}</h3>
              <p className="card-desc">{project.description}</p>
              <motion.div className="project-link" whileHover={{ x: 5 }}>
                View Project →
              </motion.div>
            </GlowCard>
          ))}
        </motion.div>
      </Section>

      <Section>
        <SectionHeader 
          label="Connect" 
          title="Let's Work Together" 
          desc="Feel free to reach out"
        />
        <motion.div 
          className="contact-grid" 
          variants={staggerContainer} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
        >
          <motion.div className="contact-info" variants={slideInLeft}>
            {[
              { icon: '📧', label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
              { icon: '📱', label: 'Phone', value: contact.phone, href: null },
              { icon: '💼', label: 'LinkedIn', value: 'Connect', href: contact.linkedin },
              { icon: '🐙', label: 'GitHub', value: 'Follow', href: contact.github },
              { icon: '🎮', label: 'Discord', value: contact.discord, href: null },
            ].map((item) => (
              <motion.div 
                key={item.label} 
                className="contact-item"
                whileHover={{ x: 10, backgroundColor: 'rgba(139, 92, 246, 0.1)' }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="contact-icon"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  {item.icon}
                </motion.div>
                <div>
                  <p className="contact-label">{item.label}</p>
                  <p className="contact-value">
                    {item.href 
                      ? <a href={item.href} target="_blank" rel="noreferrer">{item.value}</a>
                      : item.value
                    }
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div variants={slideInRight}>
            <motion.div 
              className="contact-info" 
              style={{ marginBottom: '24px' }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.p 
                className="card-desc" 
                style={{ fontSize: '18px', marginBottom: '16px' }}
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </motion.p>
              <p className="card-desc">
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
            </motion.div>
            <div className="contact-cta">
              <MagneticButton href={contact.resume} className="btn btn-secondary" target="_blank">
                📄 Download Resume
              </MagneticButton>
              <MagneticButton href={`mailto:${contact.email}`} className="btn btn-primary">
                ✉️ Send Message
              </MagneticButton>
            </div>
          </motion.div>
        </motion.div>
      </Section>

      <footer className="footer">
        <motion.p 
          className="footer-text"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Designed & Built by <a href={contact.github}>Mr. Hariharan N</a> · {new Date().getFullYear()}
        </motion.p>
        <motion.div 
          className="footer-socials"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {['🌐', '🐙', '💼'].map((icon, i) => (
            <motion.a
              key={i}
              href="#"
              whileHover={{ scale: 1.3, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              {icon}
            </motion.a>
          ))}
        </motion.div>
      </footer>
    </div>
  );
}
