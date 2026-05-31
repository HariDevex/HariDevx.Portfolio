import { useState } from 'react';
import { motion } from 'framer-motion';
import Section from '../ui/Section';

export default function ContactForm({ contact, resumeUrl }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(contact.formAction || '/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('sent');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <Section id="contact">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-header">
          <span className="text-label section-label">Contact</span>
          <h2 className="section-title text-display">Get in Touch</h2>
        </div>

        <div className="contact-form-wrapper">
          <p className="contact-form-text text-body">
            Looking for a frontend engineering intern starting Summer 2026?
            Drop me a message and I&apos;ll get back to you within 24 hours.
          </p>

          {status === 'sent' ? (
            <div className="contact-form-success">
              <span className="contact-form-success-icon">✓</span>
              <p>Thanks! I&apos;ll respond within 24 hours.</p>
              <p className="text-small">In the meantime, check my <a href={contact.github} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>GitHub</a>.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} className="form-input" placeholder="Your name" />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="form-input" placeholder="you@example.com" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea id="message" name="message" required value={formData.message} onChange={handleChange} className="form-textarea" placeholder="What would you like to discuss?" rows={4} />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn--primary btn--large" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
                <a href={contact.linkedin} className="btn btn--secondary btn--large" target="_blank" rel="noreferrer">LinkedIn</a>
                <a href={resumeUrl} className="btn btn--ghost btn--large" target="_blank" rel="noreferrer">Resume</a>
              </div>
              {status === 'error' && <p className="form-error">Something went wrong. Try emailing directly: <a href={`mailto:${contact.email}`} style={{ color: 'var(--accent)' }}>{contact.email}</a></p>}
            </form>
          )}
        </div>
      </motion.div>
    </Section>
  );
}
