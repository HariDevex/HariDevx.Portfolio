import { motion } from 'framer-motion';
import Section from '../ui/Section';

export default function Experience({ experience }) {
  return (
    <Section id="experience">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
      >
        <div className="section-header">
          <span className="text-label section-label">Experience</span>
          <h2 className="section-title text-display">Work & Projects</h2>
        </div>

        <div className="exp-grid">
          {experience.map((exp, i) => (
            <motion.div
              key={i}
              className="exp-card"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <div className="exp-header">
                <h3 className="exp-role">{exp.role}</h3>
                <span className="exp-period">{exp.period}</span>
              </div>
              <p className="exp-company">{exp.company}</p>
              <ul className="exp-list">
                {exp.achievements.map((a) => (
                  <li key={a} className="exp-item">{a}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
