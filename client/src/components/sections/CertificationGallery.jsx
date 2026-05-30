import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '../ui/Section';

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

export default function CertificationGallery({ certifications }) {
  const [showAll, setShowAll] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const visibleImages = showAll ? certifications.images : certifications.images.slice(0, INITIAL_COUNT);

  const handlePrev = useCallback(() => {
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : certifications.images.length - 1));
  }, [certifications.images.length]);

  const handleNext = useCallback(() => {
    setLightboxIndex((prev) => (prev < certifications.images.length - 1 ? prev + 1 : 0));
  }, [certifications.images.length]);

  return (
    <Section id="certifications">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
      >
        <div className="section-header">
          <span className="text-label section-label">Certifications</span>
          <h2 className="section-title text-display">{certifications.title}</h2>
          <p className="section-desc">{certifications.description}</p>
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

        {certifications.images.length > INITIAL_COUNT && (
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <button
              className="btn btn--ghost"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? `Show less` : `Show all ${certifications.images.length} certifications`}
            </button>
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={certifications.images}
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
