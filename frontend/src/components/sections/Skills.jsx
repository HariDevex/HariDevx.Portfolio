import { motion } from 'framer-motion';
import Section from '../ui/Section';

const profColors = {
  proficient: 'var(--green)',
  familiar: 'var(--accent)',
  learning: 'var(--text-muted)',
};

function SkillTag({ name, proficiency }) {
  return (
    <span className="tag tag--accent skill-tag">
      <span className="skill-proficiency" style={{ background: profColors[proficiency] || 'var(--text-muted)' }} />
      {name}
    </span>
  );
}

export default function Skills({ skills }) {
  return (
    <Section id="Skills">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
      >
        <div className="section-header">
          <span className="text-label section-label">Skills</span>
          <h2 className="section-title text-display">Technologies I Work With</h2>
          <p className="section-desc">Tools and languages I&apos;ve used across academic projects, freelance work, and self-directed learning.</p>
        </div>

        <div className="skills-grid">
          {skills.map(({ category, items, logo }, i) => (
            <motion.div
              key={category}
              className="skill-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <div className="skill-header">
                {logo && <img src={logo} alt={category} className="skill-logo" width={24} height={24} />}
                <p className="skill-category">{category}</p>
              </div>
              <div className="skill-items">
                {items.map((item) => (
                  <SkillTag key={item.name || item} name={item.name || item} proficiency={item.proficiency} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
