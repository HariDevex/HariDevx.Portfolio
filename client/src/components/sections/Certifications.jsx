import { motion } from 'framer-motion';
import Section from '../ui/Section';
import SectionHeader from '../ui/SectionHeader';
import { fadeInUp } from '../../utils/animations';

function CertCard({ title, issuer, year, icon, delay }) {
  return (
    <motion.div className="cert-card" variants={fadeInUp} custom={delay}>
      <div className="cert-card-icon">{icon}</div>
      <div className="cert-card-body">
        <h3 className="cert-card-title">{title}</h3>
        <p className="cert-card-issuer">{issuer}</p>
        <span className="cert-card-year">{year}</span>
      </div>
    </motion.div>
  );
}

export default function Certifications({ certifications }) {
  return (
    <Section id="certifications">
      <SectionHeader
        label="Credentials"
        title="Certifications"
        desc="Courses and credentials I've earned"
      />
      <div className="cert-grid">
        {certifications.map((cert, i) => (
          <CertCard key={cert.title} {...cert} delay={i} />
        ))}
      </div>
    </Section>
  );
}
