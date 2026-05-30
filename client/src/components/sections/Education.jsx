import { motion } from 'framer-motion';
import Section from '../ui/Section';

export default function Education({ education }) {
  return (
    <Section id="education">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
      >
        <div className="section-header">
          <span className="text-label section-label">Education</span>
          <h2 className="section-title text-display">Academic Background</h2>
        </div>

        <div className="edu-grid">
          {education.map((item) => (
            <div key={item.degree} className="edu-card">
              <div>
                <h3 className="edu-degree">{item.degree}</h3>
                <p className="edu-school">{item.school}</p>
              </div>
              <div className="edu-right">
                <p className="edu-score">{item.score}</p>
                <p className="edu-years">{item.years}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
