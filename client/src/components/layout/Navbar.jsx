import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS } from '../../constants/navigation';
import { scrollToSection } from '../../utils/scrollTo';
import MobileMenu from './MobileMenu';

export default function Navbar({ activeSection }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <motion.nav
        className="navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <a
          href="#home"
          className="navbar-brand"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
          }}
        >
          <img src="/img/haridevx.png" alt="Hariharan N" className="navbar-logo" />
          <span className="navbar-name">Hariharan N</span>
        </a>

        <div className="navbar-links" role="navigation" aria-label="Main navigation">
          {NAV_ITEMS.map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`navbar-link ${activeSection === id ? 'navbar-link--active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(id);
              }}
            >
              {label}
            </a>
          ))}
        </div>

        <button
          className={`navbar-hamburger ${mobileOpen ? 'navbar-hamburger--open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <MobileMenu
            isOpen={mobileOpen}
            onClose={() => setMobileOpen(false)}
            activeSection={activeSection}
          />
        )}
      </AnimatePresence>
    </>
  );
}
