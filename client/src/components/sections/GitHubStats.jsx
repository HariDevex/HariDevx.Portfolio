import { motion } from 'framer-motion';
import Section from '../ui/Section';
import SectionHeader from '../ui/SectionHeader';
import { fadeInUp } from '../../utils/animations';

export default function GitHubStats({ githubStats }) {
  const { username, repos, contributions } = githubStats;

  return (
    <Section id="github">
      <SectionHeader
        label="Open Source"
        title="GitHub Activity"
        desc="My open-source contributions and activity"
      />
      <motion.div className="github-section" variants={fadeInUp}>
        <div className="github-stats">
          <div className="github-stat">
            <span className="github-stat-value">{repos}</span>
            <span className="github-stat-label">Repositories</span>
          </div>
          <div className="github-stat">
            <span className="github-stat-value">{contributions}+</span>
            <span className="github-stat-label">Contributions</span>
          </div>
          <div className="github-stat">
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noreferrer"
              className="github-profile-link"
            >
              View GitHub Profile →
            </a>
          </div>
        </div>
        <div className="github-calendar">
          <img
            src={`https://ghchart.rshah.org/${username}`}
            alt={`${username}'s GitHub contribution chart`}
            className="github-chart"
            loading="lazy"
          />
        </div>
      </motion.div>
    </Section>
  );
}
