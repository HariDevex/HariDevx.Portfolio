import { lazy, Suspense, useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { portfolioData } from './content/portfolio';
import { useActiveSection } from './hooks/useActiveSection';
import { useTheme } from './hooks/useTheme';
import { scrollToSection } from './utils/scrollTo';

import ScrollToTop from './components/ScrollToTop';
import LoadingScreen from './components/loader/LoadingScreen';
import Loader from './components/ui/Loader';
import MouseGlow from './components/effects/MouseGlow';

import SoftAurora from './components/effects/SoftAurora';
import Scene3D from './components/3d/Scene3D';
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

function HomePage({ appVisible, enter }) {
  const { hero, about, skills, education, experience, stats, featuredProject, projects, certifications, codingProfiles } = portfolioData;
  return (
    <main id="main">
      <Hero hero={hero} contact={portfolioData.contact} enter={enter} />
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
      <CertificationGallery title={certifications.title} description={certifications.description} />
    </main>
  );
}

function ContactPage() {
  const { contact, hero } = portfolioData;
  return (
    <main id="main">
      <ContactForm contact={contact} resumeUrl={hero.resumeUrl} />
    </main>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [appVisible, setAppVisible] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const activeSection = useActiveSection();
  const footerRef = useRef(null);
  const [dockAttached, setDockAttached] = useState(false);
  const { contact } = portfolioData;
  const location = useLocation();
  const isHome = location.pathname === '/';

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

  useEffect(() => {
    if (location.state?.scrollTo) {
      const id = location.state.scrollTo;
      window.history.replaceState({}, '');
      requestAnimationFrame(() => {
        scrollToSection(id);
      });
    }
  }, [location.state]);

  return (
    <>
      <ScrollToTop />

      <AnimatePresence>
        {loading && isHome && (
          <LoadingScreen
            onExit={() => setAppVisible(true)}
            onComplete={() => { setAppVisible(true); setLoading(false); }}
          />
        )}
      </AnimatePresence>

      <div className="app" style={{ opacity: appVisible || !isHome ? 1 : 0, transition: 'opacity 0.5s ease' }}>
        <div className="soft-aurora-background">
          <SoftAurora
            speed={2}
            scale={2}
            brightness={1.0}
            color1="#7415dc"
            color2="#e100ff"
            noiseFrequency={1}
            noiseAmplitude={3.5}
            bandHeight={0.5}
            bandSpread={0.6}
            octaveDecay={0.1}
            layerOffset={0}
            colorSpeed={1.8}
            enableMouseInteraction={true}
            mouseInfluence={1}
          />
        </div>
        <div className="app-background-overlay" />
        <MouseGlow />
        <Scene3D theme={theme} />
        <a href="#main" className="skip-link">Skip to content</a>
        <Navbar activeSection={activeSection} contact={contact} theme={theme} toggleTheme={toggleTheme} />

        <Routes>
          <Route path="/" element={<HomePage appVisible={appVisible} enter={appVisible} />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>

        <Dock activeSection={activeSection} contact={contact} attached={dockAttached} />
        <Footer ref={footerRef} contact={contact} />
      </div>
    </>
  );
}
