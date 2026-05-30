const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/HariDevex', icon: '🖥️' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mrnobody1305', icon: '💼' },
  { label: 'Email', href: 'mailto:052005hari@gmail.com', icon: '✉️' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-socials">
          {socialLinks.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              className="footer-social"
              target="_blank"
              rel="noreferrer"
              aria-label={label}
            >
              {icon}
            </a>
          ))}
        </div>
        <p className="footer-text">
          Designed & Built by{' '}
          <a href="https://github.com/HariDevex" target="_blank" rel="noreferrer">
            Mr. Hariharan N
          </a>{' '}
          &middot; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
