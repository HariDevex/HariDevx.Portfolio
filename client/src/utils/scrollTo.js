const HEADER_OFFSET = 80;

export function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    const offset = element.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  }
}
