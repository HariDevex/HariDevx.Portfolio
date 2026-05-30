import Badge from '../ui/Badge';
import Button from '../ui/Button';

export default function Hero({ hero, github }) {
  return (
    <section id="home" className="hero">
      <div className="hero-grid">
        <div>
          <Badge>{hero.availability}</Badge>

          <h1 className="hero-title text-hero">{hero.name}</h1>

          <p className="hero-subtitle">{hero.valueProp}</p>

          <p className="hero-meta">
            <span>{hero.title}</span>
            <span className="hero-meta-sep">/</span>
            <span>{hero.location}</span>
            <span className="hero-meta-sep">/</span>
            <span>Grad {hero.gradYear}</span>
          </p>

          <div className="hero-actions">
            <Button href={hero.resumeUrl} variant="primary" size="large" target="_blank" rel="noreferrer">
              Download Resume
            </Button>
            <Button href={github} variant="secondary" size="large" target="_blank" rel="noreferrer">
              View GitHub
            </Button>
            <Button href="#contact" variant="ghost" size="large">
              Get in Touch →
            </Button>
          </div>
        </div>

        <div className="hero-image">
          <div className="hero-image-frame">
            <span className="hero-image-placeholder">HN</span>
          </div>
        </div>
      </div>
    </section>
  );
}
