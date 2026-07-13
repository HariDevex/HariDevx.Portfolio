import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS } from '../../constants/navigation';
import { scrollToSection } from '../../utils/scrollTo';
import ThemeToggle from './ThemeToggle';

function handleScrollNav(navigate, location, id) {
  if (location.pathname === '/') {
    scrollToSection(id);
  } else {
    navigate('/', { state: { scrollTo: id } });
  }
}

function MobileMenu({ onClose, activeSection, contact }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleNavClick = (e, item) => {
    e.preventDefault();
    if (item.path) {
      navigate(item.path);
    } else {
      handleScrollNav(navigate, location, item.id);
    }
    onClose();
  };

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
      {NAV_ITEMS.map((item) => (
        <a
          key={item.id}
          href={item.path || `#${item.id}`}
          className={`mobile-link ${activeSection === item.id ? 'mobile-link--active' : ''}`}
          onClick={(e) => handleNavClick(e, item)}
        >
          {item.label}
        </a>
      ))}
      <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
        <a href={contact.linkedin} className="mobile-cta" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="/documents/Hariharan.pdf#Hariharan_Resume" className="mobile-cta" target="_blank" rel="noreferrer">Resume</a>
      </div>
    </motion.div>
  );
}

export default function Navbar({ activeSection, contact, theme, toggleTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e, item) => {
    e.preventDefault();
    if (item.path) {
      navigate(item.path);
    } else {
      handleScrollNav(navigate, location, item.id);
    }
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar-inner">
          <a href="#Home" className="navbar-brand" onClick={(e) => { e.preventDefault(); scrollToSection('Home'); }}>
            Hariharan<span className="navbar-brand-accent">.N</span>
          </a>

          <div className="navbar-links">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.path || `#${item.id}`}
                className={`navbar-link ${activeSection === item.id ? 'navbar-link--active' : ''}`}
                onClick={(e) => handleNavClick(e, item)}
                aria-current={activeSection === item.id ? 'true' : undefined}
              >
                {item.label}
              </a>
            ))}
            <ThemeToggle theme={theme} toggle={toggleTheme} />
            <a href={contact.linkedin} className="navbar-social" target="_blank" rel="noreferrer">
              <span className="navbar-social-icon">in</span>
              LinkedIn
            </a>
            <a href="/documents/Hariharan.pdf#Hariharan_Resume" className="navbar-cta" target="_blank" rel="noreferrer">Resume</a>
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
