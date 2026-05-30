import { motion } from 'framer-motion';
import { fadeInUp } from '../../utils/animations';

export default function ProjectCard({
  title,
  description,
  techStack,
  image,
  github,
  liveDemo,
  achievements,
  delay,
}) {
  return (
    <motion.article
      className="project-card"
      variants={fadeInUp}
      custom={delay}
      whileHover={{ y: -8 }}
    >
      <div className="project-card-image">
        {image ? (
          <img src={image} alt={title} loading="lazy" />
        ) : (
          <div className="project-card-placeholder">
            <span className="project-card-icon">⚡</span>
          </div>
        )}
        <div className="project-card-overlay">
          <div className="project-card-links">
            {liveDemo && liveDemo !== '#' && (
              <a
                href={liveDemo}
                target="_blank"
                rel="noreferrer"
                className="project-card-link project-card-link--primary"
              >
                Live Demo
              </a>
            )}
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="project-card-link"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
      <div className="project-card-body">
        <h3 className="project-card-title">{title}</h3>
        <p className="project-card-desc">{description}</p>
        {achievements && achievements.length > 0 && (
          <ul className="project-card-achievements">
            {achievements.map((a) => (
              <li key={a} className="project-card-achievement">
                {a}
              </li>
            ))}
          </ul>
        )}
        <div className="project-card-tech">
          {techStack?.map((tech) => (
            <span key={tech} className="project-card-tech-tag">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
