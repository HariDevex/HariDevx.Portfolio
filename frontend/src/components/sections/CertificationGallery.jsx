import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '../ui/Section';

const imageModules = import.meta.glob('../../assets/certificates/*', {
  eager: true,
  query: '?url',
  import: 'default',
});

const certifications = Object.entries(imageModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url]) => url);

const INITIAL_COUNT = 8;

function Lightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onPrev();
    if (e.key === 'ArrowRight') onNext();
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <motion.div
      className="lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button className="lightbox-close" onClick={onClose} aria-label="Close">✕</button>
      <img src={images[currentIndex]} alt={`Certificate ${currentIndex + 1}`} onClick={(e) => e.stopPropagation()} />
      <p className="lightbox-counter">{currentIndex + 1} / {images.length}</p>
    </motion.div>
  );
}

export default function CertificationGallery({ title, description }) {
  const [showAll, setShowAll] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const visibleImages = showAll ? certifications : certifications.slice(0, INITIAL_COUNT);

  const handlePrev = useCallback(() => {
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : certifications.length - 1));
  }, []);

  const handleNext = useCallback(() => {
    setLightboxIndex((prev) => (prev < certifications.length - 1 ? prev + 1 : 0));
  }, []);

  return (
    <Section id="Certificates">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
      >
        <div className="section-header">
          <span className="text-label section-label">Certifications</span>
          <h2 className="section-title text-display">{title}</h2>
          <p className="section-desc">{description}</p>
        </div>

        <div className="gallery-grid" role="list" aria-label="Certification gallery">
          {visibleImages.map((src, i) => (
            <motion.div
              key={src}
              className="gallery-item"
              role="listitem"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (i % INITIAL_COUNT) * 0.03, duration: 0.3 }}
              onClick={() => setLightboxIndex(i)}
            >
              <img src={src} alt={`Certification ${i + 1}`} loading="lazy" />
            </motion.div>
          ))}
        </div>

        {certifications.length > INITIAL_COUNT && (
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <button
              className="btn btn--ghost"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? 'Show less' : `Show all ${certifications.length} certifications`}
            </button>
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={certifications}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </Section>
  );
}
