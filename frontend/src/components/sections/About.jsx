import { motion } from 'framer-motion';
import Section from '../ui/Section';

const SUMMARY_LINES = [
  { cmd: 'whoami', output: 'Hariharan — final-year student from Tamil Nadu' },
  { cmd: 'cat philosophy.txt', output: 'I enjoy building web applications, experimenting with Linux, and breaking things until they work.' },
  { cmd: 'cat status.txt', output: 'Currently preparing for placements while improving my full-stack development skills.' },
];

export default function About({ about }) {
  return (
    <Section id="about">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-header">
          <span className="text-label section-label">About</span>
          <h2 className="section-title text-display">Background & Focus</h2>
        </div>

        <div className="terminal-window about-terminal">
          <div className="terminal-header">
            <span className="terminal-dot" style={{ background: '#ef4444' }} />
            <span className="terminal-dot" style={{ background: '#f59e0b' }} />
            <span className="terminal-dot" style={{ background: '#10b981' }} />
            <span className="terminal-title">bash — hari@devx:~/about</span>
          </div>
          <div className="terminal-body">
            {SUMMARY_LINES.map((line, i) => (
              <motion.div
                key={i}
                className="terminal-line"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.3 }}
              >
                <span className="terminal-prompt">$</span>{' '}
                <span className="terminal-cmd">{line.cmd}</span>
              </motion.div>
            ))}

            {SUMMARY_LINES.map((line, i) => (
              <motion.p
                key={`out-${i}`}
                className="terminal-about-output"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.2, duration: 0.4 }}
              >
                {line.output}
              </motion.p>
            ))}

            <motion.div
              className="terminal-line"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.1, duration: 0.3 }}
            >
              <span className="terminal-prompt">$</span>{' '}
              <span className="terminal-cmd">ls achievements/</span>
            </motion.div>

            <div className="about-terminal-highlights">
              {about.highlights.map((h, i) => (
                <motion.div
                  key={h}
                  className="terminal-highlight-line"
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.4 + i * 0.12, duration: 0.3 }}
                >
                  <span className="terminal-about-arrow">→</span>
                  <span className="terminal-about-text">{h}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="terminal-line"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 2.0, duration: 0.3 }}
            >
              <span className="terminal-prompt">$</span>{' '}
              <span className="terminal-cmd" style={{ color: 'var(--green)' }}>ready_for_interviews</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
