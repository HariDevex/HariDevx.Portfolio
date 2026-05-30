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
import Stats from './components/sections/Stats';
import FeaturedProject from './components/sections/FeaturedProject';
import Contact from './components/sections/Contact';

const Projects = lazy(() => import('./components/sections/Projects'));

function Loader() {
  return <div className="section-loader" />;
}

export default function App() {
  const activeSection = useActiveSection();
  const { hero, about, skills, education, experience, stats, featuredProject, projects, contact } = portfolioData;

  return (
    <div className="app">
      <Navbar activeSection={activeSection} />

      <main>
        <Hero hero={hero} github={contact.github} />
        <About about={about} />
        <Skills skills={skills} />
        <Education education={education} />
        <Experience experience={experience} />
        <Stats stats={stats} />
        <FeaturedProject project={featuredProject} />

        <Suspense fallback={<Loader />}>
          <Projects projects={projects} />
        </Suspense>

        <Contact contact={contact} resumeUrl={hero.resumeUrl} />
      </main>

      <Footer contact={contact} />
    </div>
  );
}
