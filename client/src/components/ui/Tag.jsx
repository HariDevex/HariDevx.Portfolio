export default function Tag({ children, variant = 'default', className = '' }) {
  return <span className={`tag ${variant === 'accent' ? 'tag--accent' : ''} ${className}`}>{children}</span>;
}
