import { m } from 'framer-motion';

const SIZES = {
  sm: { ring: 20, border: 2 },
  md: { ring: 32, border: 3 },
  lg: { ring: 48, border: 4 },
};

export default function Loader({ size = 'md', text, className = '' }) {
  const dims = SIZES[size] || SIZES.md;

  return (
    <div className={`loader ${className}`} data-size={size}>
      <m.div
        className="loader-ring"
        style={{ width: dims.ring, height: dims.ring }}
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
      >
        <div
          className="loader-ring-track"
          style={{ borderWidth: dims.border }}
        />
        <m.div
          className="loader-ring-fill"
          style={{ borderWidth: dims.border }}
        />
      </m.div>
      {text && <p className="loader-text">{text}</p>}
    </div>
  );
}
