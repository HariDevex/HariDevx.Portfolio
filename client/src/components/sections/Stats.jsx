import { motion } from 'framer-motion';
import Section from '../ui/Section';

export default function Stats({ stats }) {
  return (
    <Section id="stats">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
      >
        <div className="section-header">
          <span className="text-label section-label">Metrics</span>
          <h2 className="section-title text-display">By the Numbers</h2>
        </div>

        <div className="stats-grid">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <p className="stat-value">{stat.value}{stat.suffix}</p>
              <p className="stat-label">{stat.label}</p>
              <p className="stat-context">{stat.context}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
