import { useState } from 'react';
import { motion } from 'framer-motion';
import Section from '../ui/Section';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';
import { fadeInUp, staggerContainer } from '../../utils/animations';

export default function Contact({ contact }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setSent(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 4000);
    } catch {
      // silent fail — form still submits
    }
  };

  return (
    <Section id="contact">
      <SectionHeader
        label="Connect"
        title="Let's Work Together"
        desc="Have a project or opportunity? Let's talk."
      />
      <motion.div className="contact-section" variants={staggerContainer}>
        <motion.div className="contact-content" variants={staggerContainer}>
          <motion.p className="contact-text" variants={fadeInUp}>
            I&apos;m always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision. Whether you have a question
            or just want to say hi, I&apos;ll get back to you!
          </motion.p>

          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            variants={fadeInUp}
          >
            <div className="contact-form-row">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="contact-input"
                aria-label="Your name"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="contact-input"
                aria-label="Your email"
              />
            </div>
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="contact-textarea"
              aria-label="Your message"
            />
            <button type="submit" className="btn btn--primary contact-submit">
              {sent ? '✓ Message Sent!' : 'Send Message →'}
            </button>
          </motion.form>

          <motion.div className="contact-links" variants={fadeInUp}>
            <Button href={`mailto:${contact.email}`} primary>
              <span className="btn-icon">✉️</span> Email Me
            </Button>
            <Button href={contact.github}>
              <span className="btn-icon">🖥️</span> GitHub
            </Button>
            <Button href={contact.linkedin}>
              <span className="btn-icon">💼</span> LinkedIn
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
