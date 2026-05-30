import { lazy, Suspense } from 'react';
import { portfolioData } from './data/portfolio';
import { useActiveSection } from './hooks/useActiveSection';

import Navbar from './components/layout/Navbar';
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

function Loader() {
  return <div className="section-loader" />;
}

export default function App() {
  const activeSection = useActiveSection();
  const { hero, about, skills, education, experience, stats, featuredProject, projects, certifications, codingProfiles, contact } = portfolioData;

  return (
    <div className="app">
      <a href="#main" className="skip-link">Skip to content</a>
      <Navbar activeSection={activeSection} contact={contact} />

      <main id="main">
        <Hero hero={hero} contact={contact} />
        <FeaturedProject project={featuredProject} />
        <About about={about} />
        <Skills skills={skills} />
        <Experience experience={experience} />
        <Education education={education} />
        <Stats stats={stats} />
        <CodingProfiles profiles={codingProfiles} />

        <Suspense fallback={<Loader />}>
          <Projects projects={projects} />
        </Suspense>

        <CertificationGallery certifications={certifications} />
        <ContactForm contact={contact} resumeUrl={hero.resumeUrl} />
      </main>

      <Footer contact={contact} />
    </div>
  );
}
