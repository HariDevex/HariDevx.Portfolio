import { m, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ProgressBar({ onComplete }) {
  const progress = useMotionValue(0);
  const [phase, setPhase] = useState('waiting');

  const width = useTransform(progress, (v) => `${v}%`);
  const rounded = useTransform(progress, (v) => Math.round(v));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(
    () => rounded.on('change', (v) => setDisplayValue(v)),
    [rounded]
  );

  useEffect(() => {
    const timer = setTimeout(() => setPhase('running'), 120);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase !== 'running') return;
    const controls = animate(progress, 100, {
      duration: 0.45,
      ease: 'easeInOut',
      onComplete: () => {
        setTimeout(() => onComplete?.(), 60);
      },
    });
    return () => controls.stop();
  }, [phase, progress, onComplete]);

  return (
    <m.div
      className="progress-wrapper"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{ willChange: 'opacity, transform' }}
    >
      <div className="progress-container">
        <div className="progress-percentage">
          {displayValue}%
        </div>
        <div className="progress-track">
          <m.div className="progress-fill" style={{ width }} />
        </div>
        <div className="progress-label">
          Initializing portfolio...
        </div>
      </div>
    </m.div>
  );
}
