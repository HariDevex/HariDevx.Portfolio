import { lazy, Suspense, useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';
import { portfolioData } from './content/portfolio';
import { useActiveSection } from './hooks/useActiveSection';
import { useTheme } from './hooks/useTheme';
import { scrollToSection } from './utils/scrollTo';

import ScrollToTop from './components/ScrollToTop';
import LoadingScreen from './components/loader/LoadingScreen';
import Loader from './components/ui/Loader';

import SoftAurora from './components/effects/SoftAurora';
import Navbar from './components/layout/Navbar';
import Dock from './components/layout/Dock';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';
import FeaturedProject from './components/sections/FeaturedProject';
import ContactForm from './components/sections/ContactForm';

const Stats = lazy(() => import('./components/sections/Stats'));
const CodingProfiles = lazy(() => import('./components/sections/CodingProfiles'));
const Projects = lazy(() => import('./components/sections/Projects'));
const CertificationGallery = lazy(() => import('./components/sections/CertificationGallery'));
const MouseGlow = lazy(() => import('./components/effects/MouseGlow'));

const SITE_URL = 'https://hari-devx-portfolio.vercel.app';
const INTRO_KEY = 'portfolio-intro-seen';

function detectCrawler() {
  if (typeof navigator === 'undefined') return false;
  return /bot|crawl|spider|slurp|bingpreview|headless|lighthouse|google-inspectiontool/i.test(
    navigator.userAgent,
  );
}

function hasSeenIntro() {
  try {
    return sessionStorage.getItem(INTRO_KEY) === '1';
  } catch {
    return false;
  }
}

function markIntroSeen() {
  try {
    sessionStorage.setItem(INTRO_KEY, '1');
  } catch {
    // Storage can be unavailable in private browsing; the intro is optional.
  }
}

function HomePage({ enter }) {
  const { hero, about, skills, education, experience, stats, featuredProject, projects, certifications, codingProfiles } = portfolioData;
  const listedProjects = projects.filter((project) => {
    if (project.title === featuredProject.title) return false;
    if (featuredProject.repoUrl && project.repoUrl === featuredProject.repoUrl) return false;
    if (featuredProject.liveUrl && project.liveUrl === featuredProject.liveUrl) return false;
    return true;
  });

  return (
    <main id="main">
      <Hero hero={hero} contact={portfolioData.contact} enter={enter} />
      <About about={about} />
      <Skills skills={skills} />
      <Experience experience={experience} />
      <Education education={education} />
      <Suspense fallback={<Loader />}>
        <Stats stats={stats} />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <CodingProfiles profiles={codingProfiles} />
      </Suspense>
      <FeaturedProject project={featuredProject} />
      <Suspense fallback={<Loader />}>
        <Projects projects={listedProjects} />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <CertificationGallery title={certifications.title} description={certifications.description} />
      </Suspense>
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
  const [skipIntro] = useState(() => isCrawler || hasSeenIntro());
  const [loading, setLoading] = useState(!skipIntro);
  const [appVisible, setAppVisible] = useState(skipIntro);
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

  const finishIntro = () => {
    markIntroSeen();
    setAppVisible(true);
    setLoading(false);
  };

  useEffect(() => {
    if (!loading || !isHome) return undefined;
    const timer = setTimeout(() => {
      finishIntro();
    }, 13000);
    return () => clearTimeout(timer);
  }, [loading, isHome]);

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
            onComplete={finishIntro}
          />
        )}
      </AnimatePresence>

      <div className="app" style={{ opacity: 1 }}>
        {(appVisible || !isHome) && (
          <>
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
          </>
        )}
        <Suspense fallback={null}>
          <MouseGlow />
        </Suspense>
        <a href="#main" className="skip-link">Skip to content</a>
        <Navbar activeSection={activeSection} contact={contact} theme={theme} toggleTheme={toggleTheme} />

        <Routes>
          <Route path="/" element={<HomePage enter={true} />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>

        <Dock activeSection={activeSection} contact={contact} attached={dockAttached} />
        <Footer ref={footerRef} contact={contact} />
      </div>
    </LazyMotion>
  );
}
