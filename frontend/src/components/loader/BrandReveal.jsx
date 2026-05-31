import { motion } from 'framer-motion';
import { useEffect, useRef, useMemo } from 'react';

const WORDS = ['HARI', 'DEVX'];
const SUBTITLES = [
  'Full Stack Developer',
  'Linux Enthusiast',
  'Problem Solver',
];

const charVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.04, duration: 0.4, ease: 'easeOut' },
  }),
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.6 + i * 0.12, duration: 0.4, ease: 'easeOut' },
  }),
};

function buildChars() {
  let idx = 0;
  return WORDS.flatMap((word, wi) =>
    word.split('').map((ch, ci) => ({
      char: ch,
      globalIndex: idx++,
      key: `${wi}-${ci}`,
    }))
  );
}

export default function BrandReveal({ onComplete }) {
  const flatChars = useMemo(buildChars, []);
  const doneRef = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!doneRef.current) {
        doneRef.current = true;
        onComplete?.();
      }
    }, 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="brand-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      onAnimationComplete={() => {
        if (!doneRef.current) {
          doneRef.current = true;
          onComplete?.();
        }
      }}
    >
      <div className="brand-text">
        <div className="brand-word">
          {flatChars.map(({ char, globalIndex, key }) => (
            <motion.span
              key={key}
              className={`brand-char${char === ' ' ? ' brand-char-space' : ''}`}
              custom={globalIndex}
              variants={charVariants}
              initial="hidden"
              animate="visible"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </div>
      </div>

      <div className="brand-subtitles">
        {SUBTITLES.map((text, i) => (
          <motion.p
            key={text}
            className="brand-subtitle"
            custom={i}
            variants={subtitleVariants}
            initial="hidden"
            animate="visible"
          >
            {text}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
}
