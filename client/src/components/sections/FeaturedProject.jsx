import { motion } from 'framer-motion';
import Section from '../ui/Section';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';
import { fadeInUp } from '../../utils/animations';

export default function FeaturedProject({ project }) {
  return (
    <Section id="featured">
      <SectionHeader
        label="Highlight"
        title="Featured Project"
        desc="My best work — end-to-end development"
      />
      <motion.div className="featured-project" variants={fadeInUp}>
        <div className="featured-grid">
          <div className="featured-image">
            {project.image ? (
              <img src={project.image} alt={project.title} />
            ) : (
              <div className="featured-image-placeholder">
                <span>🛒</span>
              </div>
            )}
            <div className="featured-image-overlay" />
          </div>
          <div className="featured-content">
            <span className="featured-label">★ Featured Project</span>
            <h3 className="featured-title">{project.title}</h3>
            <p className="featured-desc">{project.description}</p>
            <div className="featured-details">
              <div className="featured-detail">
                <h4 className="featured-detail-title">Problem</h4>
                <p className="featured-detail-text">{project.problem}</p>
              </div>
              <div className="featured-detail">
                <h4 className="featured-detail-title">Solution</h4>
                <p className="featured-detail-text">{project.solution}</p>
              </div>
              <div className="featured-detail">
                <h4 className="featured-detail-title">Result</h4>
                <p className="featured-result">{project.result}</p>
              </div>
            </div>
            <div className="featured-tech-stack">
              {project.techStack?.map((tech) => (
                <span key={tech} className="featured-tech-badge">
                  {tech}
                </span>
              ))}
            </div>
            <div className="featured-buttons">
              {project.liveDemo && project.liveDemo !== '#' && (
                <Button href={project.liveDemo} primary>
                  Live Demo
                </Button>
              )}
              <Button href={project.github}>GitHub</Button>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
