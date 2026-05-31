import { motion } from 'framer-motion';

const SIZES = {
  sm: { ring: 20, border: 2 },
  md: { ring: 32, border: 3 },
  lg: { ring: 48, border: 4 },
};

export default function Loader({ size = 'md', text, className = '' }) {
  const dims = SIZES[size] || SIZES.md;

  return (
    <div className={`loader ${className}`} data-size={size}>
      <motion.div
        className="loader-ring"
        style={{ width: dims.ring, height: dims.ring }}
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
      >
        <div
          className="loader-ring-track"
          style={{ borderWidth: dims.border }}
        />
        <motion.div
          className="loader-ring-fill"
          style={{ borderWidth: dims.border }}
        />
      </motion.div>
      {text && <p className="loader-text">{text}</p>}
    </div>
  );
}
