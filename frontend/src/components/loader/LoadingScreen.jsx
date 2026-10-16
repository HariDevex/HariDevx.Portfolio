import { useState, useEffect, useCallback, useRef } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import TerminalLines from './TerminalLines';
import ProgressBar from './ProgressBar';
import BrandReveal from './BrandReveal';
import SoftAurora from '../effects/SoftAurora';

const MAX_DURATION = 2200;

const PHASE_DURATIONS = {
  terminal: 1100,
  progress: 1000,
  brand: 900,
  exit: 350,
};

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

function forceComplete(onComplete, onExit) {
  onExit?.();
  onComplete?.();
}

export default function LoadingScreen({ onComplete, onExit }) {
  const [phase, setPhase] = useState('terminal');
  const reduceMotion = useReducedMotion();
  const mountedRef = useRef(true);
  const completedRef = useRef(false);

  useEffect(() => {
    return () => { mountedRef.current = false; };
  }, []);

  const safeComplete = useCallback(() => {
    if (mountedRef.current && !completedRef.current) {
      completedRef.current = true;
      onComplete?.();
    }
  }, [onComplete]);

  const safeExit = useCallback(() => {
    if (!completedRef.current) onExit?.();
  }, [onExit]);

  // Safety timeout — force-finish regardless of animation state
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!completedRef.current) forceComplete(onComplete, onExit);
    }, MAX_DURATION);
    return () => clearTimeout(timer);
  }, [onComplete, onExit]);

  useEffect(() => {
    if (reduceMotion) {
      forceComplete(onComplete, onExit);
      return;
    }
  }, [reduceMotion, onComplete, onExit]);

  const safeSetPhase = useCallback((p) => {
    if (mountedRef.current) setPhase(p);
  }, []);

  const handleTerminalComplete = useCallback(() => {
    setPhase('progress');
  }, []);

  const handleProgressComplete = useCallback(() => {
    setPhase('brand');
  }, []);

  const handleBrandComplete = useCallback(() => {
    setTimeout(() => {
      setPhase('exit');
      safeExit();
      setTimeout(safeComplete, PHASE_DURATIONS.exit);
    }, 150);
  }, [safeExit, safeComplete]);

  if (reduceMotion) return null;

  return (
    <m.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'exit' ? 0 : 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="loading-aurora-bg">
        <SoftAurora
          speed={2}
          scale={2}
          brightness={1.0}
          color1="#7415dc"
          color2="#e100ff"
          noiseFrequency={1}
          noiseAmplitude={3.5}
          bandHeight={0.5}
          bandSpread={0.6}
          octaveDecay={0.1}
          layerOffset={0}
          colorSpeed={1.8}
          enableMouseInteraction={false}
        />
      </div>
      <div className="loading-aurora-overlay" />
      <div className="loading-content" style={{ willChange: 'opacity' }}>
        <AnimatePresence mode="wait" initial={false}>
          {phase === 'terminal' && (
            <m.div
              key="terminal"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{ willChange: 'opacity, transform' }}
            >
              <TerminalLines onAllComplete={handleTerminalComplete} />
            </m.div>
          )}

          {phase === 'progress' && (
            <m.div
              key="progress"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <ProgressBar onComplete={handleProgressComplete} />
            </m.div>
          )}

          {phase === 'brand' && (
            <m.div
              key="brand"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <BrandReveal onComplete={handleBrandComplete} />
            </m.div>
          )}

          {phase === 'exit' && (
            <m.div
              key="exit"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>
      </div>
    </m.div>
  );
}
