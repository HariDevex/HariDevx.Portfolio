import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TerminalLines from './TerminalLines';
import ProgressBar from './ProgressBar';
import BrandReveal from './BrandReveal';
import SoftAurora from '../effects/SoftAurora';

const MAX_DURATION = 5000;

const PHASE_DURATIONS = {
  terminal: 2200,
  progress: 2300,
  brand: 1500,
  exit: 500,
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
    safeSetPhase('progress');
  }, [safeSetPhase]);

  const handleProgressComplete = useCallback(() => {
    safeSetPhase('brand');
  }, [safeSetPhase]);

  const handleBrandComplete = useCallback(() => {
    setTimeout(() => {
      safeSetPhase('exit');
      safeExit();
      setTimeout(safeComplete, PHASE_DURATIONS.exit);
    }, 500);
  }, [safeSetPhase, safeExit, safeComplete]);

  if (reduceMotion) return null;

  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'exit' ? 0 : 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
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
      <div className="loading-content">
        <AnimatePresence mode="wait">
          {phase === 'terminal' && (
            <motion.div
              key="terminal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <TerminalLines onAllComplete={handleTerminalComplete} />
            </motion.div>
          )}

          {phase === 'progress' && (
            <motion.div
              key="progress"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <ProgressBar onComplete={handleProgressComplete} />
            </motion.div>
          )}

          {phase === 'brand' && (
            <motion.div
              key="brand"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <BrandReveal onComplete={handleBrandComplete} />
            </motion.div>
          )}

          {phase === 'exit' && (
            <motion.div
              key="exit"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
