import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
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
    const timer = setTimeout(() => setPhase('running'), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase !== 'running') return;
    const controls = animate(progress, 100, {
      duration: 0.7,
      ease: 'easeInOut',
      onComplete: () => {
        setTimeout(() => onComplete?.(), 100);
      },
    });
    return () => controls.stop();
  }, [phase, progress, onComplete]);

  return (
    <motion.div
      className="progress-wrapper"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <div className="progress-container">
        <div className="progress-percentage">
          {displayValue}%
        </div>
        <div className="progress-track">
          <motion.div className="progress-fill" style={{ width }} />
        </div>
        <div className="progress-label">
          Initializing portfolio...
        </div>
      </div>
    </motion.div>
  );
}
