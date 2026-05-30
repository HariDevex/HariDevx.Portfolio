import { motion } from 'framer-motion';
import Section from '../ui/Section';
import { fadeInUp } from '../../utils/animations';

export default function About({ summary }) {
  return (
    <Section id="about">
      <div className="section-header">
        <span className="section-label">
          <span className="section-label-icon">✦</span> About
        </span>
        <h2 className="section-title">About Me</h2>
      </div>
      <motion.div className="about-card" variants={fadeInUp}>
        <div className="about-card-glow" />
        <p className="about-text">{summary}</p>
        <div className="about-stats">
          <div className="about-stat">
            <span className="about-stat-value">3+</span>
            <span className="about-stat-label">Years Coding</span>
          </div>
          <div className="about-stat">
            <span className="about-stat-value">10+</span>
            <span className="about-stat-label">Projects Built</span>
          </div>
          <div className="about-stat">
            <span className="about-stat-value">15+</span>
            <span className="about-stat-label">Technologies</span>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
