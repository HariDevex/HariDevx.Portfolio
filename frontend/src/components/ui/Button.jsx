import { useNavigate } from 'react-router-dom';
import { scrollToSection } from '../../utils/scrollTo';

export default function Button({ children, href, variant = 'secondary', size, className = '', onClick, target, rel }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (href?.startsWith('#')) {
      e.preventDefault();
      scrollToSection(href.substring(1));
    } else if (href?.startsWith('/') && !target && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
      e.preventDefault();
      navigate(href);
    }
    onClick?.(e);
  };

  const classes = ['btn', `btn--${variant}`, size && `btn--${size}`, className].filter(Boolean).join(' ');

  return (
    <a href={href} onClick={handleClick} className={classes} target={target} rel={rel}>
      {children}
    </a>
  );
}
