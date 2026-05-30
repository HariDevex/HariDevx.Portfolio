import { lazy, Suspense } from 'react';
import { portfolioData } from './data/portfolio';
import { useActiveSection } from './hooks/useActiveSection';

import Navbar from './components/layout/Navbar';
import ScrollProgress from './components/layout/ScrollProgress';
import BackToTop from './components/layout/BackToTop';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Terminal from './components/sections/Terminal';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import FeaturedProject from './components/sections/FeaturedProject';
import Testimonials from './components/sections/Testimonials';
import Contact from './components/sections/Contact';

const Projects = lazy(() => import('./components/sections/Projects'));
const Stats = lazy(() => import('./components/sections/Stats'));
const Certifications = lazy(() => import('./components/sections/Certifications'));
const GitHubStats = lazy(() => import('./components/sections/GitHubStats'));

function SectionLoader() {
  return (
    <div className="section-loader">
      <div className="section-loader-spinner" />
    </div>
  );
}

export default function App() {
  const activeSection = useActiveSection();
  const { hero, summary, skills, experience, featuredProject, projects, certifications, testimonials, stats, contact, githubStats, terminal, resume } = portfolioData;

  return (
    <div className="app">
      <ScrollProgress />
      <Navbar activeSection={activeSection} />
      <BackToTop />

      <main>
        <Hero hero={hero} github={contact.github} resume={resume} />
        <About summary={summary} />
        <Terminal terminal={terminal} />
        <Skills skills={skills} />
        <Experience experience={experience} />

        <Suspense fallback={<SectionLoader />}>
          <Stats stats={stats} />
        </Suspense>

        <FeaturedProject project={featuredProject} />

        <Suspense fallback={<SectionLoader />}>
          <Projects projects={projects} />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Certifications certifications={certifications} />
        </Suspense>

        <Testimonials testimonials={testimonials} />

        <Suspense fallback={<SectionLoader />}>
          <GitHubStats githubStats={githubStats} />
        </Suspense>

        <Contact contact={contact} />
      </main>

      <Footer />
    </div>
  );
}
