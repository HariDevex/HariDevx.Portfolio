import { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NAV_ITEMS } from '../../constants/navigation';
import { scrollToSection } from '../../utils/scrollTo';

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function ProjectsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function ResumeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function ContactIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

const DOCK_ITEMS = [
  { id: 'Home', label: 'Home', Icon: HomeIcon, action: 'scroll' },
  { id: 'featured', label: 'Projects', Icon: ProjectsIcon, action: 'scroll' },
  { id: 'github', label: 'GitHub', Icon: GitHubIcon, action: 'link' },
  { id: 'linkedin', label: 'LinkedIn', Icon: LinkedInIcon, action: 'link' },
  { id: 'resume', label: 'Resume', Icon: ResumeIcon, action: 'resume' },
  { id: 'contact', label: 'Contact', Icon: ContactIcon, action: 'scroll' },
];

export default function Dock({ activeSection, contact, attached }) {
  const dockRef = useRef(null);
  const [isTouch, setIsTouch] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    if (isTouch) return;
    const dock = dockRef.current;
    if (!dock) return;
    const items = dock.querySelectorAll('.dock-item');
    const handleHover = (e) => {
      const target = e.currentTarget;
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const dist = Math.abs(rect.left + rect.width / 2 - targetRect.left - targetRect.width / 2);
        const maxDist = 120;
        if (dist < maxDist) {
          const scale = 1 + (1 - dist / maxDist) * 0.4;
          item.style.setProperty('--dock-scale', scale);
        } else {
          item.style.setProperty('--dock-scale', '1');
        }
      });
    };
    const handleLeave = () => {
      items.forEach((item) => item.style.setProperty('--dock-scale', '1'));
    };
    items.forEach((item) => {
      item.addEventListener('mousemove', handleHover);
      item.addEventListener('mouseleave', handleLeave);
    });
    return () => {
      items.forEach((item) => {
        item.removeEventListener('mousemove', handleHover);
        item.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, [isTouch]);

  if (isTouch) return null;

  const handleClick = (item) => {
    if (item.action === 'scroll') {
      if (item.id === 'contact') {
        navigate('/contact');
      } else if (location.pathname === '/') {
        scrollToSection(item.id);
      } else {
        navigate('/', { state: { scrollTo: item.id } });
      }
    } else if (item.action === 'link') {
      if (item.id === 'github') window.open(contact.github, '_blank', 'noreferrer');
      if (item.id === 'linkedin') window.open(contact.linkedin, '_blank', 'noreferrer');
    } else if (item.action === 'resume') {
      window.open('/documents/Hariharan.pdf#Hariharan_Resume', '_blank', 'noreferrer');
    }
  };

  return (
    <motion.div
      ref={dockRef}
      className={`dock ${attached ? 'dock--attached' : ''}`}
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1, ease: 'easeOut' }}
    >
      {DOCK_ITEMS.map(({ id, label, Icon, action }) => {
        const isActive = activeSection === id && action === 'scroll';
        return (
          <button
            key={id}
            className={`dock-item ${isActive ? 'dock-item--active' : ''}`}
            onClick={() => handleClick({ id, action })}
            aria-label={label}
            title={label}
          >
            <div className="dock-icon">
              <Icon />
            </div>
            <span className="dock-label">{label}</span>
            {isActive && <span className="dock-indicator" />}
          </button>
        );
      })}
    </motion.div>
  );
}
