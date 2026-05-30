export default function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'badge',
    accent: 'badge badge--accent',
    highlight: 'badge badge--highlight',
  };

  return <span className={`${variants[variant]} ${className}`}>{children}</span>;
}
