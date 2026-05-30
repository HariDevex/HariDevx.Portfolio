import { motion } from 'framer-motion';
import { scrollToSection } from '../../utils/scrollTo';

export default function Button({
  children,
  href,
  primary = false,
  className = '',
  onClick,
  target,
  rel,
}) {
  const handleClick = (e) => {
    if (href?.startsWith('#')) {
      e.preventDefault();
      scrollToSection(href.substring(1));
    }
    onClick?.(e);
  };

  const classes = [
    'btn',
    primary ? 'btn--primary' : 'btn--secondary',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      className={classes}
      target={target}
      rel={rel}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.a>
  );
}
