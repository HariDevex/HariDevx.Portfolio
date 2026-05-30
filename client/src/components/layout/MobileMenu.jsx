import { motion } from 'framer-motion';
import { NAV_ITEMS } from '../../constants/navigation';
import { scrollToSection } from '../../utils/scrollTo';

export default function MobileMenu({ onClose, activeSection }) {
  return (
    <>
      <motion.div
        className="mobile-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.nav
        className="mobile-menu"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="mobile-menu-header">
          <span className="mobile-menu-title">Navigation</span>
          <button className="mobile-menu-close" onClick={onClose} aria-label="Close menu">
            ✕
          </button>
        </div>
        <div className="mobile-menu-links">
          {NAV_ITEMS.map(({ label, id }, i) => (
            <motion.a
              key={id}
              href={`#${id}`}
              className={activeSection === id ? 'mobile-link mobile-link--active' : 'mobile-link'}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(id);
                onClose();
              }}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              {label}
              <span className="mobile-link-arrow">→</span>
            </motion.a>
          ))}
        </div>
      </motion.nav>
    </>
  );
}
