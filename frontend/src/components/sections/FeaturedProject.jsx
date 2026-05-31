import { motion } from 'framer-motion';
import Section from '../ui/Section';
import Tag from '../ui/Tag';
import Button from '../ui/Button';

export default function FeaturedProject({ project }) {
  return (
    <Section id="featured">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
      >
        <div className="section-header">
          <span className="text-label section-label">Case Study</span>
          <h2 className="section-title text-display">Featured Project</h2>
          <p className="section-desc">A detailed look at one of my recent projects — from problem to solution.</p>
        </div>

        <div className="case-study">
          <div className="case-visual">
            {project.image ? (
              <img src={project.image} alt={project.title} loading="lazy" />
            ) : (
              <span className="case-placeholder">Project Screenshot</span>
            )}
          </div>
          <div className="case-content">
            <span className="text-label case-label">Featured</span>
            <h3 className="case-title">{project.title}</h3>
            <p className="case-desc">{project.description}</p>

            <div className="case-details">
              <div className="case-detail">
                <p className="case-detail-title">Problem</p>
                <p className="case-detail-text">{project.problem}</p>
              </div>
              <div className="case-detail">
                <p className="case-detail-title">Solution</p>
                <p className="case-detail-text">{project.solution}</p>
              </div>
              <div className="case-detail">
                <p className="case-detail-title">Result</p>
                <p className="case-detail-text"><strong>{project.result}</strong></p>
              </div>
            </div>

            <div className="case-tech">
              {project.techStack.map((tech) => (
                <Tag key={tech} variant="accent">{tech}</Tag>
              ))}
            </div>

            <div className="case-actions">
              {project.liveUrl && project.liveUrl !== '#' && (
                <Button href={project.liveUrl} variant="primary" target="_blank" rel="noreferrer">Live Demo</Button>
              )}
              <Button href={project.repoUrl} variant="secondary" target="_blank" rel="noreferrer">View Code</Button>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
