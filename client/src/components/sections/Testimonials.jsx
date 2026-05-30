import { motion } from 'framer-motion';
import Section from '../ui/Section';
import SectionHeader from '../ui/SectionHeader';
import { fadeInUp } from '../../utils/animations';

function TestimonialCard({ name, role, feedback, rating, delay }) {
  return (
    <motion.div className="testimonial-card" variants={fadeInUp} custom={delay}>
      <div className="testimonial-corner" />
      <div className="testimonial-header">
        <div className="testimonial-avatar">{name.charAt(0)}</div>
        <div className="testimonial-meta">
          <h4 className="testimonial-name">{name}</h4>
          <span className="testimonial-role">{role}</span>
        </div>
      </div>
      <div className="testimonial-stars">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="testimonial-star">
            ★
          </span>
        ))}
      </div>
      <p className="testimonial-text">&ldquo;{feedback}&rdquo;</p>
    </motion.div>
  );
}

export default function Testimonials({ testimonials }) {
  return (
    <Section id="testimonials">
      <SectionHeader
        label="Reviews"
        title="What People Say"
        desc="Feedback from people I've worked with"
      />
      <div className="testimonials-grid">
        {testimonials.map((t, i) => (
          <TestimonialCard key={t.name} {...t} delay={i * 0.2} />
        ))}
      </div>
    </Section>
  );
}
