import { useEffect, useState } from 'react';
import axios from 'axios';
import { mockPortfolio } from './mockData';

const API_BASE = import.meta.env.VITE_API_URL || '';

const Section = ({ id, title, children, accent = 'var(--cyan)' }) => (
  <section id={id} className="section">
    <div className="section__header">
      <span className="accent" style={{ background: accent }}></span>
      <h2>{title}</h2>
    </div>
    <div className="section__body">{children}</div>
  </section>
);

const Pill = ({ children }) => <span className="pill">{children}</span>;

export default function App() {
  const [portfolio, setPortfolio] = useState(mockPortfolio);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setStatus('loading');
        const { data } = await axios.get(`${API_BASE}/api/portfolio`);
        setPortfolio(data);
        setStatus('ready');
      } catch (err) {
        console.warn('API unreachable, using bundled data', err);
        setStatus('offline');
      }
    };

    fetchData();
  }, []);

  const { hero, summary, education, skills, skillLogos, gallery, projects, contact } = portfolio;

  return (
    <div className="page">
      <header className="nav">
        <div className="brand">
          <img src={hero.nameLogo} alt="logo" height={42} />
          <span>Hariharan N</span>
        </div>
        <nav>
          <a href="#home">Home</a>
          <a href="#education">Education</a>
          <a href="#skills">Skills</a>
          <a href="#gallery">Gallery</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section id="home" className="hero" style={{ backgroundImage: `url(${hero.bannerImage})` }}>
          <div className="hero__overlay" />
          <div className="hero__content">
            <img src={hero.nameLogo} alt="Hariharan" className="hero__logo" />
            <p className="hero__tag">{hero.tagline}</p>
            {hero.lines.map((line) => (
              <p key={line} className="hero__line">
                {line}
              </p>
            ))}
            <div className="hero__status">
              <span className={`dot ${status === 'ready' ? 'dot--live' : 'dot--offline'}`} />
              {status === 'ready' ? 'Live API' : 'Offline sample'}
            </div>
            <a className="primary" href="#projects">
              View Projects
            </a>
          </div>
        </section>

        <Section id="summary" title="Executive Summary" accent="var(--pink)">
          <p className="lede">{summary}</p>
        </Section>

        <Section id="education" title="Education" accent="var(--amber)">
          <div className="grid two">
            {education.map((edu) => (
              <article key={edu.degree} className="card">
                <h3>{edu.degree}</h3>
                <p className="muted">{edu.school}</p>
                <p>{edu.years}</p>
                <p className="muted">{edu.score}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="skills" title="Skills" accent="var(--cyan)">
          <div className="stack">
            <div className="pill-row">
              {skills.map((item) => (
                <Pill key={item}>{item}</Pill>
              ))}
            </div>
            <div className="marquee">
              <div className="marquee__track">
                {[...skillLogos, ...skillLogos].map((logo, idx) => (
                  <img key={`${logo}-${idx}`} src={logo} alt="logo" />
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section id="gallery" title="Gallery" accent="var(--violet)">
          <div className="gallery">
            {gallery.slice(0, 12).map((img) => (
              <img key={img} src={img} alt="Certificate" loading="lazy" />
            ))}
          </div>
        </Section>

        <Section id="projects" title="Projects" accent="var(--green)">
          <div className="grid two">
            {projects.map((project) => (
              <article key={project.title} className="card">
                <h3>{project.title}</h3>
                <p className="muted">{project.description}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="contact" title="Contact" accent="var(--cyan)">
          <div className="contact">
            <div>
              <p><strong>Email</strong> — <a href={`mailto:${contact.email}`}>{contact.email}</a></p>
              <p><strong>Phone</strong> — {contact.phone}</p>
              <p>
                <strong>LinkedIn</strong> — <a href={contact.linkedin} target="_blank" rel="noreferrer">{contact.linkedin}</a>
              </p>
              <p>
                <strong>GitHub</strong> — <a href={contact.github} target="_blank" rel="noreferrer">{contact.github}</a>
              </p>
              <p><strong>Discord</strong> — {contact.discord}</p>
            </div>
            <div className="cta-col">
              <a className="secondary" href={contact.resume} target="_blank" rel="noreferrer">
                Download Resume
              </a>
              <a className="primary" href="/api/contact" target="_blank" rel="noreferrer">
                Ping API
              </a>
            </div>
          </div>
        </Section>
      </main>

      <footer className="footer">Built with MERN · React + Vite front-end · Express API · Ready for MongoDB</footer>
    </div>
  );
}
