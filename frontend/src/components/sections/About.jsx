import { m } from 'framer-motion';
import Section from '../ui/Section';

const COMMANDS = ['whoami', 'cat interests.txt', 'cat goals.txt'];

export default function About({ about }) {
  const summaryBlocks = String(about.summary || '')
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <Section id="About">
      <m.div
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
            {summaryBlocks.map((block, i) => (
              <m.div
                key={`cmd-${i}`}
                className="terminal-line"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.3 }}
              >
                <span className="terminal-prompt">$</span>{' '}
                <span className="terminal-cmd">{COMMANDS[i] || 'cat about.txt'}</span>
              </m.div>
            ))}

            {summaryBlocks.map((block, i) => (
              <m.p
                key={`out-${i}`}
                className="terminal-about-output"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.2, duration: 0.4 }}
              >
                {block}
              </m.p>
            ))}

            <m.div
              className="terminal-line"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.1, duration: 0.3 }}
            >
              <span className="terminal-prompt">$</span>{' '}
              <span className="terminal-cmd">ls achievements/</span>
            </m.div>

            <div className="about-terminal-highlights">
              {about.highlights.map((h, i) => (
                <m.div
                  key={h}
                  className="terminal-highlight-line"
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.4 + i * 0.12, duration: 0.3 }}
                >
                  <span className="terminal-about-arrow">→</span>
                  <span className="terminal-about-text">{h}</span>
                </m.div>
              ))}
            </div>

            <m.div
              className="terminal-line"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 2.0, duration: 0.3 }}
            >
              <span className="terminal-prompt">$</span>{' '}
              <span className="terminal-cmd" style={{ color: 'var(--green)' }}>ready_for_interviews</span>
            </m.div>
          </div>
        </div>
      </m.div>
    </Section>
  );
}
