export default function Footer({ contact }) {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href={contact.github} className="footer-link" target="_blank" rel="noreferrer">GitHub</a>
        <a href={contact.linkedin} className="footer-link" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href={`mailto:${contact.email}`} className="footer-link">Email</a>
        <a href="/Doc/Hariharan.pdf" className="footer-link" target="_blank" rel="noreferrer">Resume</a>
      </div>
      <p className="footer-text">Hariharan N &middot; {new Date().getFullYear()}</p>
    </footer>
  );
}
