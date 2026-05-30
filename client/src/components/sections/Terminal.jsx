import { motion } from 'framer-motion';
import Section from '../ui/Section';
import { fadeInUp } from '../../utils/animations';

function TerminalLine({ prompt, command, output, delay }) {
  return (
    <motion.div
      className="terminal-line"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      <span className="terminal-prompt">$ </span>
      <span className="terminal-command">{command}</span>
      {output && (
        <div className="terminal-output">
          {typeof output === 'string' ? (
            <span>{output}</span>
          ) : (
            output.map(({ category, items }) => (
              <div key={category} className="terminal-output-line">
                <span className="terminal-category">{category}:</span>
                {' '}
                <span className="terminal-value">[{items.join(', ')}]</span>
              </div>
            ))
          )}
        </div>
      )}
    </motion.div>
  );
}

export default function Terminal({ terminal }) {
  const lines = [
    { command: 'whoami', output: terminal.whoami, delay: 0.3 },
    { command: 'cat stack.txt', output: terminal.stack, delay: 0.8 },
    { command: 'echo "$FOCUS"', output: 'Building performant web apps 🚀', delay: 1.3 },
  ];

  return (
    <Section id="terminal">
      <motion.div className="terminal" variants={fadeInUp}>
        <div className="terminal-header">
          <div className="terminal-btn terminal-btn--red" />
          <div className="terminal-btn terminal-btn--yellow" />
          <div className="terminal-btn terminal-btn--green" />
          <span className="terminal-title">
            {terminal.user}@{terminal.hostname}
          </span>
        </div>
        <div className="terminal-body">
          {lines.map(({ command, output, delay }) => (
            <TerminalLine
              key={command}
              command={command}
              output={output}
              delay={delay}
            />
          ))}
          <div className="terminal-line">
            <span className="terminal-prompt">$ </span>
            <span className="terminal-cursor" />
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
