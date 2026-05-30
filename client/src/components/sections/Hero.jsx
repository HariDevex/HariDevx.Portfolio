import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Tag from '../ui/Tag';

export default function Hero({ hero, contact }) {
  return (
    <section id="home" className="hero">
      <div className="hero-grid">
        <div>
          <Badge>{hero.availability}</Badge>

          <h1 className="hero-title text-hero">{hero.name}</h1>

          <div className="hero-tech">
            {hero.techStack.map((t) => (
              <Tag key={t} variant="accent">{t}</Tag>
            ))}
          </div>

          <p className="hero-subtitle">{hero.valueProp}</p>

          <p className="hero-meta">
            <span>{hero.title}</span>
            <span className="hero-meta-sep">/</span>
            <span>{hero.edu}</span>
            <span className="hero-meta-sep">/</span>
            <span>{hero.location}</span>
            <span className="hero-meta-sep">/</span>
            <span>Grad {hero.gradYear}</span>
          </p>

          <div className="hero-actions">
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
          </div>
        </div>

        <div className="hero-image">
          <div className="hero-image-frame">
            <img src="/img/hero-photo.webp" alt="Hariharan N" width="280" height="280" />
          </div>
        </div>
      </div>
    </section>
  );
}
