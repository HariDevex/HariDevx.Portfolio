import { motion } from 'framer-motion';
import Section from '../ui/Section';
import SectionHeader from '../ui/SectionHeader';
import { fadeInUp } from '../../utils/animations';

const skillCategories = [
  { key: 'frontend', icon: '⚛️', title: 'Frontend' },
  { key: 'languages', icon: '💻', title: 'Languages' },
  { key: 'tools', icon: '🔧', title: 'Tools & Design' },
  { key: 'iot', icon: '🔌', title: 'IoT & Hardware' },
];

function SkillCard({ icon, title, items, delay }) {
  return (
    <motion.div className="skill-card" variants={fadeInUp} custom={delay}>
      <div className="skill-card-header">
        <span className="skill-card-icon">{icon}</span>
        <h3 className="skill-card-title">{title}</h3>
      </div>
      <div className="skill-card-tags">
        {items.map((item) => (
          <motion.span
            key={item}
            className="skill-card-tag"
            whileHover={{ scale: 1.05, y: -2 }}
          >
            {item}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills({ skills }) {
  return (
    <Section id="skills">
      <SectionHeader
        label="Expertise"
        title="Skills & Technologies"
        desc="Tools and technologies I work with daily"
      />
      <div className="skills-grid">
        {skillCategories.map(({ key, icon, title }, i) =>
          skills[key] ? (
            <SkillCard
              key={key}
              icon={icon}
              title={title}
              items={skills[key]}
              delay={i}
            />
          ) : null
        )}
      </div>
    </Section>
  );
}
