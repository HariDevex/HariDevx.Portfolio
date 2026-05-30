import { motion } from 'framer-motion';
import Section from '../ui/Section';
import SectionHeader from '../ui/SectionHeader';
import { fadeInUp, slideInLeft } from '../../utils/animations';

function TimelineItem({ role, company, period, type, achievements, index }) {
  return (
    <motion.div
      className="timeline-item"
      variants={slideInLeft}
      custom={index}
    >
      <div className="timeline-dot" />
      <div className="timeline-card">
        <div className="timeline-meta">
          <span className="timeline-type">{type}</span>
          <span className="timeline-period">{period}</span>
        </div>
        <h3 className="timeline-role">{role}</h3>
        <p className="timeline-company">{company}</p>
        <ul className="timeline-achievements">
          {achievements.map((a) => (
            <li key={a} className="timeline-achievement">
              {a}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function Experience({ experience }) {
  return (
    <Section id="experience">
      <SectionHeader
        label="Career"
        title="Experience"
        desc="My professional journey and key achievements"
      />
      <div className="timeline">
        {experience.map((item, i) => (
          <TimelineItem key={item.id} {...item} index={i} />
        ))}
      </div>
    </Section>
  );
}
