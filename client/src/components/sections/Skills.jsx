import { motion } from 'framer-motion';
import Section from '../ui/Section';
import Tag from '../ui/Tag';

export default function Skills({ skills }) {
  return (
    <Section id="skills">
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
          {skills.map(({ category, items }) => (
            <div key={category} className="skill-card">
              <p className="skill-category">{category}</p>
              <div className="skill-items">
                {items.map((item) => (
                  <Tag key={item} variant="accent">{item}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
