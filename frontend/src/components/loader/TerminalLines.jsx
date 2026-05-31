import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LINES = [
  { cmd: 'whoami', output: 'Hariharan' },
  { cmd: 'initialize_portfolio', output: 'Loading projects...' },
  { cmd: 'load_skills', output: 'Loading experience...' },
  { cmd: 'start_server', output: 'Portfolio ready' },
];

const CMD_DELAY = 350;
const CHAR_DELAY = 45;
const OUTPUT_VISIBLE_DELAY = 300;

function TypewriterText({ text, startDelay, onComplete }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
          onCompleteRef.current?.();
        }
      }, CHAR_DELAY);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(startTimeout);
  }, [text, startDelay]);

  return (
    <span>
      {displayed}
      {!done && <span className="terminal-cursor" />}
    </span>
  );
}

export default function TerminalLines({ onAllComplete }) {
  const [visibleLines, setVisibleLines] = useState(1);
  const lineCompleteCalled = useRef(new Set());

  const handleLineComplete = useCallback((index) => {
    if (lineCompleteCalled.current.has(index)) return;
    lineCompleteCalled.current.add(index);

    const nextVisible = index + 2;
    if (nextVisible <= LINES.length) {
      setTimeout(() => setVisibleLines(nextVisible), OUTPUT_VISIBLE_DELAY);
    } else {
      setTimeout(() => onAllComplete?.(), OUTPUT_VISIBLE_DELAY);
    }
  }, [onAllComplete]);

  return (
    <motion.div
      className="terminal-window"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="terminal-header">
        <span className="terminal-dot" style={{ background: '#ef4444' }} />
        <span className="terminal-dot" style={{ background: '#f59e0b' }} />
        <span className="terminal-dot" style={{ background: '#10b981' }} />
        <span className="terminal-title">bash — hari@devx:~/portfolio</span>
      </div>
      <div className="terminal-body">
        <AnimatePresence>
          {LINES.slice(0, visibleLines).map((line, i) => (
            <motion.div
              key={i}
              className="terminal-line"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <span className="terminal-prompt">$</span>{' '}
              <span className="terminal-cmd">{line.cmd}</span>
              <span className="terminal-output">
                {' // '}
                <TypewriterText
                  text={line.output}
                  startDelay={CMD_DELAY}
                  onComplete={() => handleLineComplete(i)}
                />
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
