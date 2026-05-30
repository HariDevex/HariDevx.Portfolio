import { motion } from 'framer-motion';
import Section from '../ui/Section';

export default function About({ about }) {
  return (
    <Section id="about">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
      >
        <div className="section-header">
          <span className="text-label section-label">About</span>
          <h2 className="section-title text-display">Background & Focus</h2>
        </div>

        <div className="about-grid">
          <p className="about-text">{about.summary}</p>

          <div className="about-highlights">
            {about.highlights.map((h) => (
              <div key={h} className="about-highlight">
                <span className="about-highlight-marker">→</span>
                <span className="about-highlight-text">{h}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
