import { motion } from 'framer-motion';
import Section from '../ui/Section';
import Tag from '../ui/Tag';
import Button from '../ui/Button';

function ProjectCard({ title, description, techStack, image, liveUrl, repoUrl, achievements, index }) {
  return (
    <motion.article
      className="project-card"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
    >
      <div className="project-image">
        {image ? (
          <img src={image} alt={title} loading="lazy" />
        ) : (
          <span className="project-placeholder">Project</span>
        )}
      </div>
      <div className="project-body">
        <h3 className="project-title">{title}</h3>
        <p className="project-desc">{description}</p>

        {achievements && achievements.length > 0 && (
          <div className="project-achievements">
            {achievements.map((a) => (
              <p key={a} className="project-achievement">{a}</p>
            ))}
          </div>
        )}

        <div className="project-tech">
          {techStack.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>

        <div className="project-actions">
          {liveUrl && liveUrl !== '#' && (
            <Button href={liveUrl} variant="secondary" target="_blank" rel="noreferrer">Live Demo</Button>
          )}
          <Button href={repoUrl} variant="ghost" target="_blank" rel="noreferrer">GitHub</Button>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects({ projects }) {
  return (
    <Section id="Projects">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
      >
        <div className="section-header">
          <span className="text-label section-label">Projects</span>
          <h2 className="section-title text-display">Things I&apos;ve Built</h2>
          <p className="section-desc">A selection of projects showcasing my frontend, IoT, and problem-solving skills.</p>
        </div>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} {...project} index={i} />
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
