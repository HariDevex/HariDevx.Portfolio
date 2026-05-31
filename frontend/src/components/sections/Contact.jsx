import { motion } from 'framer-motion';
import Section from '../ui/Section';
import Button from '../ui/Button';

export default function Contact({ contact, resumeUrl }) {
  return (
    <Section id="contact">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
      >
        <div className="section-header">
          <span className="text-label section-label">Contact</span>
          <h2 className="section-title text-display">Get in Touch</h2>
        </div>

        <div className="contact-section">
          <p className="contact-text text-body">
            I&apos;m looking for software engineering internships and entry-level roles starting Summer 2026.
            If you have an opening or just want to connect, reach out.
          </p>
          <div className="contact-actions">
            <Button href={`mailto:${contact.email}`} variant="primary" size="large">
              Email Me
            </Button>
            <Button href={contact.linkedin} variant="secondary" size="large" target="_blank" rel="noreferrer">
              LinkedIn
            </Button>
            <Button href={contact.github} variant="secondary" size="large" target="_blank" rel="noreferrer">
              GitHub
            </Button>
            <Button href={resumeUrl} variant="ghost" size="large" target="_blank" rel="noreferrer">
              Resume
            </Button>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
