import { useEffect, useState } from 'react';
import axios from 'axios';
import { mockPortfolio } from './mockData';
import { motion } from 'framer-motion';

const API_BASE = import.meta.env.VITE_API_URL || '';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const Section = ({ children }) => (
  <motion.section 
    className="section"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-80px' }}
    variants={fadeInUp}
  >
    {children}
  </motion.section>
);

const SectionHeader = ({ label, title, desc }) => (
  <motion.div className="section-header" variants={fadeInUp}>
    <motion.span className="section-label" variants={fadeInUp}>{label}</motion.span>
    <motion.h2 className="section-title" variants={fadeInUp}>{title}</motion.h2>
    {desc && <motion.p className="section-desc" variants={fadeInUp}>{desc}</motion.p>}
  </motion.div>
);

export default function App() {
  const [portfolio, setPortfolio] = useState(mockPortfolio);
  const [status, setStatus] = useState('idle');
  const [activeSection, setActiveSection] = useState('home');

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
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.div 
          className="brand"
          whileHover={{ scale: 1.02 }}
        >
          <span>Mr. Hariharan N</span>
        </motion.div>
        <div className="nav-links">
          {navItems.map((item, i) => (
            <motion.a
              key={item}
              href={`#${navIds[i]}`}
              className={activeSection === navIds[i] ? 'active' : ''}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              whileHover={{ y: -2 }}
            >
              {item}
            </motion.a>
          ))}
        </div>
      </motion.nav>

      <section id="home" className="hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />
        
        <motion.div 
          className="hero-content"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-badge" variants={fadeInUp}>
            <span className="hero-badge-dot" />
            {status === 'ready' ? 'Connected to API' : 'Viewing Portfolio'}
          </motion.div>
          
          <motion.img 
            src={hero.nameLogo} 
            alt="Hariharan" 
            className="hero-logo"
            variants={fadeInUp}
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: 'spring', stiffness: 200 }}
          />
          
          <motion.p className="hero-tagline" variants={fadeInUp}>
            {hero.tagline}
          </motion.p>
          
          <motion.h1 className="hero-title" variants={fadeInUp}>
            Mr. Hariharan N
          </motion.h1>
          
          <motion.p className="hero-subtitle" variants={fadeInUp}>
            {hero.lines.join(' ')}
          </motion.p>
          
          <motion.div className="hero-cta" variants={fadeInUp}>
            <motion.a 
              href="#projects"
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              View Projects
            </motion.a>
            <motion.a 
              href="#contact"
              className="btn btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Get in Touch
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      <Section>
        <SectionHeader label="About" title="Executive Summary" />
        <motion.div className="summary-section" variants={fadeInUp}>
          <p className="summary-text">{summary}</p>
        </motion.div>
      </Section>

      <Section>
        <SectionHeader 
          label="Background" 
          title="Education" 
          desc="Academic journey and achievements"
        />
        <motion.div className="grid-3" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {education.map((edu, i) => (
            <motion.article key={edu.degree} className="card" variants={fadeInUp}>
              <div className="card-icon">{['🎓', '📚', '🎯'][i]}</div>
              <h3 className="card-title">{edu.degree}</h3>
              <p className="card-meta">{edu.school}<br/>{edu.years}</p>
              <span className="card-score">{edu.score}</span>
            </motion.article>
          ))}
        </motion.div>
      </Section>

      <Section>
        <SectionHeader 
          label="Expertise" 
          title="Skills & Technologies" 
          desc="Tools and technologies I work with"
        />
        <motion.div className="skills-container" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {Object.entries(groupedSkills).filter(([_, v]) => v.length > 0).map(([category, items]) => (
            <motion.div key={category} className="skill-category" variants={fadeInUp}>
              <h3 className="skill-category-title">{category}</h3>
              <div className="skill-list">
                {items.map((skill) => (
                  <motion.span 
                    key={skill} 
                    className="skill-tag"
                    whileHover={{ scale: 1.05, y: -3 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div className="marquee-container" variants={fadeInUp}>
          <div className="marquee-track">
            {[...skillLogos, ...skillLogos].map((logo, idx) => (
              <img key={`${logo}-${idx}`} src={logo} alt="tech" className="marquee-item" />
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
        <motion.div className="gallery-grid" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {gallery.slice(0, 12).map((img, i) => (
            <motion.div 
              key={img} 
              className="gallery-item"
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
            >
              <img src={img} alt={`Certificate ${i + 1}`} loading="lazy" />
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <Section>
        <SectionHeader 
          label="Work" 
          title="Featured Projects" 
          desc="Things I've built and shipped"
        />
        <motion.div className="grid-3" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {projects.map((project, i) => (
            <motion.article key={project.title} className="card" variants={fadeInUp}>
              <div className="card-icon">{['🌐', '📺', '⚡', '🤖'][i] || '💻'}</div>
              <h3 className="card-title">{project.title}</h3>
              <p className="card-desc">{project.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </Section>

      <Section>
        <SectionHeader 
          label="Connect" 
          title="Let's Work Together" 
          desc="Feel free to reach out"
        />
        <motion.div className="contact-grid" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.div className="contact-info" variants={fadeInUp}>
            <div className="contact-item">
              <div className="contact-icon">📧</div>
              <div>
                <p className="contact-label">Email</p>
                <p className="contact-value">
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📱</div>
              <div>
                <p className="contact-label">Phone</p>
                <p className="contact-value">{contact.phone}</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">💼</div>
              <div>
                <p className="contact-label">LinkedIn</p>
                <p className="contact-value">
                  <a href={contact.linkedin} target="_blank" rel="noreferrer">Connect</a>
                </p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">🐙</div>
              <div>
                <p className="contact-label">GitHub</p>
                <p className="contact-value">
                  <a href={contact.github} target="_blank" rel="noreferrer">Follow</a>
                </p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">🎮</div>
              <div>
                <p className="contact-label">Discord</p>
                <p className="contact-value">{contact.discord}</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <div className="contact-info" style={{ marginBottom: '24px' }}>
              <p className="card-desc" style={{ fontSize: '18px', marginBottom: '16px' }}>
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
              <p className="card-desc">
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
            </div>
            <div className="contact-cta">
              <motion.a 
                href={contact.resume}
                className="btn btn-secondary"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                📄 Download Resume
              </motion.a>
              <motion.a 
                href={`mailto:${contact.email}`}
                className="btn btn-primary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                ✉️ Send Message
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </Section>

      <footer className="footer">
        <p className="footer-text">
          Designed & Built by <a href={contact.github}>Mr. Hariharan N</a> · {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
