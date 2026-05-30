import { motion } from 'framer-motion';

export default function ScrollReveal({ children, variants, className = '' }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={variants || { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
    >
      {children}
    </motion.div>
  );
}
