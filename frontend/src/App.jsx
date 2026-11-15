import { lazy, Suspense, useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';
import { portfolioData } from './content/portfolio';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import { useActiveSection } from './hooks/useActiveSection';
import { useTheme } from './hooks/useTheme';
import { scrollToSection } from './utils/scrollTo';

import ScrollToTop from './components/ScrollToTop';
import LoadingScreen from './components/loader/LoadingScreen';
import Loader from './components/ui/Loader';
import MouseGlow from './components/effects/MouseGlow';

import SoftAurora from './components/effects/SoftAurora';
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
const Scene3D = lazy(() => import('./components/3d/Scene3D'));

const SITE_URL = 'https://hari-devx-portfolio.vercel.app';

function detectCrawler() {
  if (typeof navigator === 'undefined') return false;
  return /bot|crawl|spider|slurp|bingpreview|headless|lighthouse|google-inspectiontool/i.test(
    navigator.userAgent,
  );
}

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
  const isCrawler = detectCrawler();
  const [loading, setLoading] = useState(!isCrawler);
  const [appVisible, setAppVisible] = useState(isCrawler);
  const [show3D, setShow3D] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
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
    if (reducedMotion) return undefined;
    if (!(appVisible || !isHome)) return undefined;
    let idleId;
    let timeoutId;
    let cancelled = false;
    const start = () => {
      if (!cancelled) setShow3D(true);
    };
    const schedule = () => {
      if (typeof window.requestIdleCallback === 'function') {
        idleId = window.requestIdleCallback(start, { timeout: 2000 });
      } else {
        timeoutId = setTimeout(start, 300);
      }
    };
    const onLoad = () => schedule();
    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', onLoad, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener('load', onLoad);
      if (idleId) window.cancelIdleCallback?.(idleId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [appVisible, isHome, reducedMotion]);

  useEffect(() => {
    const path = location.pathname === '/' ? '/' : location.pathname;
    const href = `${SITE_URL}${path}`;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', href);
  }, [location.pathname]);

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
    <LazyMotion features={domAnimation}>
      <ScrollToTop />

      <AnimatePresence>
        {loading && isHome && (
          <LoadingScreen
            onExit={() => setAppVisible(true)}
            onComplete={() => { setAppVisible(true); setLoading(false); }}
          />
        )}
      </AnimatePresence>

      <div className="app" style={{ opacity: 1 }}>
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
        <Suspense fallback={null}>
          {show3D && <Scene3D theme={theme} />}
        </Suspense>
        <a href="#main" className="skip-link">Skip to content</a>
        <Navbar activeSection={activeSection} contact={contact} theme={theme} toggleTheme={toggleTheme} />

        <Routes>
          <Route path="/" element={<HomePage appVisible={appVisible} enter={true} />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>

        <Dock activeSection={activeSection} contact={contact} attached={dockAttached} />
        <Footer ref={footerRef} contact={contact} />
      </div>
    </LazyMotion>
  );
}
