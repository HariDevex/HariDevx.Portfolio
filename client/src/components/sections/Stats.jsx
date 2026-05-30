import { motion } from 'framer-motion';
import Section from '../ui/Section';
import SectionHeader from '../ui/SectionHeader';
import { scaleIn } from '../../utils/animations';

function StatCard({ icon, value, label }) {
  return (
    <motion.div className="stat-card" variants={scaleIn}>
      <div className="stat-card-icon">{icon}</div>
      <div className="stat-card-value">{value}</div>
      <div className="stat-card-label">{label}</div>
    </motion.div>
  );
}

export default function Stats({ stats }) {
  const items = [
    { icon: '🚀', value: `${stats.projectsBuilt}+`, label: 'Projects Built' },
    { icon: '⚛️', value: `${stats.technologiesUsed}+`, label: 'Technologies Used' },
    { icon: '💼', value: `${stats.yearsCoding}+`, label: 'Years Coding' },
    { icon: '🏆', value: `${stats.certifications}+`, label: 'Certifications' },
  ];

  return (
    <Section id="stats">
      <SectionHeader
        label="Metrics"
        title="By the Numbers"
        desc="A snapshot of my development journey"
      />
      <div className="stats-grid">
        {items.map((item, i) => (
          <StatCard key={item.label} {...item} />
        ))}
      </div>
    </Section>
  );
}
