const HEADER_OFFSET = 80;

export function scrollToSection(id) {
  const element = document.getElementById(id);
  if (!element) return;

  const offset = element.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;
  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: offset, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
}
