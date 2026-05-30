import { motion } from 'framer-motion';
import { fadeInUp } from '../../utils/animations';

export default function SectionHeader({ label, title, desc }) {
  return (
    <motion.div className="section-header" variants={fadeInUp}>
      <motion.span className="section-label" variants={fadeInUp}>
        <span className="section-label-icon">✦</span>
        {label}
      </motion.span>
      <motion.h2 className="section-title" variants={fadeInUp}>
        {title}
      </motion.h2>
      {desc && (
        <motion.p className="section-desc" variants={fadeInUp}>
          {desc}
        </motion.p>
      )}
    </motion.div>
  );
}
