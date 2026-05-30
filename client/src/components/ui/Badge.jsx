export default function Badge({ children, className = '' }) {
  return <span className={`hero-badge ${className}`}><span className="hero-dot" />{children}</span>;
}
