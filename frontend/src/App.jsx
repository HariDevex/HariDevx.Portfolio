import { lazy, Suspense, useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { portfolioData } from './content/portfolio';
import { useActiveSection } from './hooks/useActiveSection';
import { useTheme } from './hooks/useTheme';

import LoadingScreen from './components/loader/LoadingScreen';
import Loader from './components/ui/Loader';
import MouseGlow from './components/effects/MouseGlow';
import ChromaGrid from './components/effects/ChromaGrid';
import FloatingLines from './components/effects/FloatingLines';
import Navbar from './components/layout/Navbar';
import Dock from './components/layout/Dock';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import FeaturedProject from './components/sections/FeaturedProject';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';
import Stats from './components/sections/Stats';
import CodingProfiles from './components/sections/CodingProfiles';
import CertificationGallery from './components/sections/CertificationGallery';
import ContactForm from './components/sections/ContactForm';

const Projects = lazy(() => import('./components/sections/Projects'));

export default function App() {
  const [loading, setLoading] = useState(true);
  const [appVisible, setAppVisible] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const activeSection = useActiveSection();
  const footerRef = useRef(null);
  const [dockAttached, setDockAttached] = useState(false);
  const { hero, about, skills, education, experience, stats, featuredProject, projects, certifications, codingProfiles, contact } = portfolioData;

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setDockAttached(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <LoadingScreen
            onExit={() => setAppVisible(true)}
            onComplete={() => { setAppVisible(true); setLoading(false); }}
          />
        )}
      </AnimatePresence>

      <div className="app" style={{ opacity: appVisible ? 1 : 0, transition: 'opacity 0.5s ease' }}>
        <div className="floating-lines-background">
          <FloatingLines
            enabledWaves={['top', 'middle', 'bottom']}
            lineCount={[8, 12, 16]}
            lineDistance={[10, 8, 6]}
            bendRadius={6.0}
            bendStrength={-0.6}
            parallaxStrength={0.15}
            animationSpeed={0.8}
            mixBlendMode={theme === 'dark' ? 'screen' : 'normal'}
          />
        </div>
        <ChromaGrid />
        <MouseGlow />
        <a href="#main" className="skip-link">Skip to content</a>
        <Navbar activeSection={activeSection} contact={contact} theme={theme} toggleTheme={toggleTheme} />

        <main id="main">
          <Hero hero={hero} contact={contact} enter={appVisible} />
          <About about={about} />
          <Skills skills={skills} />
          <Experience experience={experience} />
          <Education education={education} />
          <Stats stats={stats} />
          <CodingProfiles profiles={codingProfiles} />
          <FeaturedProject project={featuredProject} />

          <Suspense fallback={<Loader />}>
            <Projects projects={projects} />
          </Suspense>

          <CertificationGallery certifications={certifications} />
          <ContactForm contact={contact} resumeUrl={hero.resumeUrl} />
        </main>

        <Dock activeSection={activeSection} contact={contact} attached={dockAttached} />
        <Footer ref={footerRef} contact={contact} />
      </div>
    </>
  );
}
