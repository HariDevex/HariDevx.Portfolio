import { useEffect } from 'react';
import { m, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Section from '../ui/Section';

function AnimatedStat({ value, suffix, label, context, index }) {
  const count = useMotionValue(0);
  const spring = useSpring(count, { stiffness: 20, damping: 20 });
  const rounded = useTransform(spring, (v) => Math.round(v));

  useEffect(() => {
    const timer = setTimeout(() => count.set(value), 200 + index * 150);
    return () => clearTimeout(timer);
  }, [value, index, count]);

  return (
    <m.div
      className="stat-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <p className="stat-value">
        <m.span>{rounded}</m.span>{suffix}
      </p>
      <p className="stat-label">{label}</p>
      <p className="stat-context">{context}</p>
    </m.div>
  );
}

export default function Stats({ stats }) {
  return (
    <Section id="stats">
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
      >
        <div className="section-header">
          <span className="text-label section-label">Metrics</span>
          <h2 className="section-title text-display">By the Numbers</h2>
        </div>

        <div className="stats-grid">
          {stats.map((stat, i) => (
            <AnimatedStat key={stat.label} {...stat} index={i} />
          ))}
        </div>
      </m.div>
    </Section>
  );
}
