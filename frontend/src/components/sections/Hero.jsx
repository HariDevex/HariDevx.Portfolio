import { m } from 'framer-motion';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Tag from '../ui/Tag';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Hero({ hero, contact, enter }) {
  return (
    <section id="Home" className="hero">
      <m.div className="hero-grid" variants={container} initial="hidden" animate={enter ? "visible" : "hidden"}>
        <div>
          <m.div variants={fadeUp}>
            <Badge>{hero.availability}</Badge>
          </m.div>

          <m.h1 className="hero-title text-hero" variants={fadeUp}>
            {hero.name}
          </m.h1>

          <m.div className="hero-tech" variants={fadeUp}>
            {hero.techStack.map((t) => (
              <Tag key={t} variant="accent">{t}</Tag>
            ))}
          </m.div>

          <m.p className="hero-subtitle" variants={fadeUp}>
            {hero.valueProp}
          </m.p>

          <m.p className="hero-meta" variants={fadeIn}>
            <span>{hero.title}</span>
            <span className="hero-meta-sep">/</span>
            <span>{hero.edu}</span>
            <span className="hero-meta-sep">/</span>
            <span>{hero.location}</span>
            <span className="hero-meta-sep">/</span>
            <span>Grad {hero.gradYear}</span>
          </m.p>

          <m.div className="hero-actions" variants={fadeUp}>
            <Button href={hero.resumeUrl} variant="primary" size="large" target="_blank" rel="noreferrer">
              Download Resume
            </Button>
            <Button href={contact.github} variant="secondary" size="large" target="_blank" rel="noreferrer">
              View GitHub
            </Button>
            <Button href={contact.linkedin} variant="secondary" size="large" target="_blank" rel="noreferrer">
              LinkedIn
            </Button>
            <Button href="#contact" variant="ghost" size="large">
              Get in Touch →
            </Button>
          </m.div>
        </div>

        <m.div className="hero-image" variants={scaleIn}>
          <div className="hero-image-frame">
            <img
              src="/images/hari-280.webp"
              srcSet="/images/hari-280.webp 280w, /images/hari.webp 560w"
              sizes="280px"
              alt="Hariharan N"
              width="280"
              height="280"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </m.div>
      </m.div>
    </section>
  );
}
