export const NAV_ITEMS = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Certs', id: 'certifications' },
  { label: 'Contact', id: 'contact' },
];

export const SECTION_IDS = ['home', ...NAV_ITEMS.map((n) => n.id)];
