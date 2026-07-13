import { forwardRef } from 'react';

const Footer = forwardRef(function Footer({ contact }, ref) {
  return (
    <footer ref={ref} className="footer">
      <div className="footer-links">
        <a href={contact.github} className="footer-link" target="_blank" rel="noreferrer">GitHub</a>
        <a href={contact.linkedin} className="footer-link" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href={`mailto:${contact.email}`} className="footer-link">Email</a>
        <a href="/documents/Hariharan.pdf#Hariharan_Resume" className="footer-link" target="_blank" rel="noreferrer">Resume</a>
      </div>
      <p className="footer-text">Hariharan N &middot; {new Date().getFullYear()}</p>
    </footer>
  );
});

export default Footer;
