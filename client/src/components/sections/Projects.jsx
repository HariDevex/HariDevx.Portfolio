import Section from '../ui/Section';
import SectionHeader from '../ui/SectionHeader';
import ProjectCard from '../ui/ProjectCard';

export default function Projects({ projects }) {
  return (
    <Section id="projects">
      <SectionHeader
        label="Work"
        title="Featured Projects"
        desc="Projects I've built and shipped"
      />
      <div className="projects-grid">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} {...project} delay={i} />
        ))}
      </div>
    </Section>
  );
}
