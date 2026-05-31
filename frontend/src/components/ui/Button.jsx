import { scrollToSection } from '../../utils/scrollTo';

export default function Button({ children, href, variant = 'secondary', size, className = '', onClick, target, rel }) {
  const handleClick = (e) => {
    if (href?.startsWith('#')) {
      e.preventDefault();
      scrollToSection(href.substring(1));
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
