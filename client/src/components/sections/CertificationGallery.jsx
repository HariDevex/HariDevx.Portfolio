import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '../ui/Section';

function Lightbox({ images, currentIndex, onClose }) {
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  return (
    <div className="lightbox" onClick={onClose} onKeyDown={handleKeyDown} role="dialog" aria-modal="true" tabIndex={-1}>
      <button className="lightbox-close" onClick={onClose} aria-label="Close">✕</button>
      <img src={images[currentIndex]} alt={`Certificate ${currentIndex + 1}`} onClick={(e) => e.stopPropagation()} />
      <p className="lightbox-counter">{currentIndex + 1} / {images.length}</p>
    </div>
  );
}

export default function CertificationGallery({ certifications }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

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

        <div className="gallery-grid">
          {certifications.images.map((src, i) => (
            <motion.div
              key={src}
              className="gallery-item"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 12) * 0.03, duration: 0.3 }}
              onClick={() => setLightboxIndex(i)}
            >
              <img src={src} alt={`Certificate ${i + 1}`} loading="lazy" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={certifications.images}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </Section>
  );
}
