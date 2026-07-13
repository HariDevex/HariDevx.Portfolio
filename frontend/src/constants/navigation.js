export const NAV_ITEMS = [
  { label: 'About', id: 'About' },
  { label: 'Skills', id: 'Skills' },
  { label: 'Experience', id: 'Experience' },
  { label: 'Projects', id: 'Projects' },
  { label: 'Certs', id: 'Certificates' },
  { label: 'Contact', id: 'Contact', path: '/contact' },
];

export const SECTION_IDS = ['Home', ...NAV_ITEMS.filter((n) => !n.path).map((n) => n.id)];
