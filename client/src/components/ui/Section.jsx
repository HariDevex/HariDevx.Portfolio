import { motion } from 'framer-motion';
import { fadeInUp } from '../../utils/animations';

export default function Section({ id, children, className = '' }) {
  return (
    <motion.section
      id={id}
      className={`section ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={fadeInUp}
    >
      <div className="section-inner">{children}</div>
    </motion.section>
  );
}
