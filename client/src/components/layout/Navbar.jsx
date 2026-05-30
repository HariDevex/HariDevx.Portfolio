import { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../../constants/navigation';
import { scrollToSection } from '../../utils/scrollTo';

function MobileMenu({ onClose, activeSection }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="mobile-menu" role="dialog" aria-modal="true">
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
      <a href="/Doc/Hariharan.pdf" className="mobile-cta" onClick={onClose} target="_blank" rel="noreferrer">Resume</a>
    </div>
  );
}

export default function Navbar({ activeSection }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
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
              >
                {label}
              </a>
            ))}
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

      {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} activeSection={activeSection} />}
    </>
  );
}
