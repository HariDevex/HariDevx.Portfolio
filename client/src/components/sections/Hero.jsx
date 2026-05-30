import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp, scaleIn } from '../../utils/animations';
import { scrollToSection } from '../../utils/scrollTo';
import Button from '../ui/Button';

export default function Hero({ hero, github, resume }) {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = hero.headlines[headlineIndex];
    let timeout;

    if (!isDeleting && displayText === current) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setHeadlineIndex((i) => (i + 1) % hero.headlines.length);
    } else {
      timeout = setTimeout(
        () => {
          setDisplayText(
            isDeleting
              ? current.substring(0, displayText.length - 1)
              : current.substring(0, displayText.length + 1)
          );
        },
        isDeleting ? 40 : 80
      );
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, headlineIndex, hero.headlines]);

  return (
    <section id="home" className="hero">
      <div className="hero-glow hero-glow--1" />
      <div className="hero-glow hero-glow--2" />
      <div className="hero-glow hero-glow--3" />

      <motion.div
        className="hero-content"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="hero-badge" variants={scaleIn}>
          <span className="hero-badge-dot" />
          {hero.availability}
        </motion.div>

        <motion.p className="hero-greeting" variants={fadeInUp}>
          {hero.greeting}
        </motion.p>

        <motion.h1 className="hero-name" variants={fadeInUp}>
          {hero.name}
        </motion.h1>

        <motion.div className="hero-headline" variants={fadeInUp}>
          <span className="hero-headline-label">I&apos;m a </span>
          <span className="hero-headline-text">
            {displayText}
            <span className="hero-headline-cursor">|</span>
          </span>
        </motion.div>

        <motion.p className="hero-subtitle" variants={fadeInUp}>
          {hero.subtext}
        </motion.p>

        <motion.div className="hero-cta" variants={fadeInUp}>
          <Button href="#projects" primary>
            <span className="btn-icon">🚀</span> View Projects
          </Button>
          <Button href={github}>
            <span className="btn-icon">🖥️</span> GitHub
          </Button>
          {resume?.url && (
            <Button href={resume.url} target="_blank" rel="noreferrer">
              <span className="btn-icon">📄</span> {resume.label}
            </Button>
          )}
        </motion.div>
      </motion.div>

      <motion.button
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        onClick={() => scrollToSection('about')}
        aria-label="Scroll to about section"
      >
        <div className="scroll-mouse" />
        <span className="scroll-text">Scroll</span>
      </motion.button>
    </section>
  );
}
