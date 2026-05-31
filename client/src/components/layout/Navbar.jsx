import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS } from '../../constants/navigation';
import { scrollToSection } from '../../utils/scrollTo';

function MobileMenu({ onClose, activeSection, contact }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <motion.div
      className="mobile-menu"
      role="dialog"
      aria-modal="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <button className="mobile-menu-close" onClick={onClose} aria-label="Close menu">✕</button>
      {NAV_ITEMS.map(({ label, id }) => (
        <a
          key={id}
          href={`#${id}`}
          className={`mobile-link ${activeSection === id ? 'mobile-link--active' : ''}`}
          onClick={(e) => { e.preventDefault(); scrollToSection(id); onClose(); }}
        >
          {label}
        </a>
      ))}
      <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
        <a href={contact.linkedin} className="mobile-cta" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="/Doc/Hariharan.pdf" className="mobile-cta" target="_blank" rel="noreferrer">Resume</a>
      </div>
    </motion.div>
  );
}

export default function Navbar({ activeSection, contact }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar-inner">
          <a href="#home" className="navbar-brand" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
            Hariharan<span className="navbar-brand-accent">.N</span>
          </a>

          <div className="navbar-links">
            {NAV_ITEMS.map(({ label, id }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`navbar-link ${activeSection === id ? 'navbar-link--active' : ''}`}
                onClick={(e) => { e.preventDefault(); scrollToSection(id); }}
                aria-current={activeSection === id ? 'true' : undefined}
              >
                {label}
              </a>
            ))}
            <a href={contact.linkedin} className="navbar-social" target="_blank" rel="noreferrer">
              <span className="navbar-social-icon">in</span>
              LinkedIn
            </a>
            <a href="/Doc/Hariharan.pdf" className="navbar-cta" target="_blank" rel="noreferrer">Resume</a>
          </div>

          <button
            className={`navbar-hamburger ${mobileOpen ? 'navbar-hamburger--open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} activeSection={activeSection} contact={contact} />}
      </AnimatePresence>
    </>
  );
}
