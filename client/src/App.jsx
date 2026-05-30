import { lazy, Suspense } from 'react';
import { portfolioData } from './data/portfolio';
import { useActiveSection } from './hooks/useActiveSection';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Education from './components/sections/Education';
import Experience from './components/sections/Experience';
import CodingProfiles from './components/sections/CodingProfiles';
import CertificationGallery from './components/sections/CertificationGallery';
import Contact from './components/sections/Contact';

const FeaturedProject = lazy(() => import('./components/sections/FeaturedProject'));
const Projects = lazy(() => import('./components/sections/Projects'));

function Loader() {
  return <div className="section-loader" />;
}

export default function App() {
  const activeSection = useActiveSection();
  const { hero, about, skills, education, experience, featuredProject, projects, certifications, codingProfiles, contact } = portfolioData;

  return (
    <div className="app">
      <a href="#main" className="skip-link">Skip to content</a>
      <Navbar activeSection={activeSection} contact={contact} />

      <main id="main">
        <Hero hero={hero} contact={contact} />
        <About about={about} />
        <Skills skills={skills} />
        <Education education={education} />
        <Experience experience={experience} />

        <CodingProfiles profiles={codingProfiles} />

        <Suspense fallback={<Loader />}>
          <FeaturedProject project={featuredProject} />
        </Suspense>

        <Suspense fallback={<Loader />}>
          <Projects projects={projects} />
        </Suspense>

        <CertificationGallery certifications={certifications} />

        <Contact contact={contact} resumeUrl={hero.resumeUrl} />
      </main>

      <Footer contact={contact} />
    </div>
  );
}
