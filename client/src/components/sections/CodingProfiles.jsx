import { motion } from 'framer-motion';
import Section from '../ui/Section';
import Button from '../ui/Button';

export default function CodingProfiles({ profiles }) {
  return (
    <Section id="coding">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
      >
        <div className="section-header">
          <span className="text-label section-label">Profiles</span>
          <h2 className="section-title text-display">Coding & Professional Profiles</h2>
          <p className="section-desc">Connect with me on platforms where I solve problems and collaborate on open source.</p>
        </div>

        <div className="coding-grid">
          {profiles.map((p) => (
            <motion.div
              key={p.platform}
              className="coding-card"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <div className="coding-icon">{p.icon}</div>
              <h3 className="coding-platform">{p.platform}</h3>
              <p className="coding-username">@{p.username}</p>
              <Button href={p.url} variant="secondary" target="_blank" rel="noreferrer">
                View Profile
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
