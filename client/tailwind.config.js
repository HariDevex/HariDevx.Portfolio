/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0A0F1C',
        secondary: '#0F172A',
        elevated: '#111827',
        accent: '#00F5FF',
        'accent-glow': '#00D9FF',
        purple: '#7C3AED',
        'purple-soft': '#A78BFA',
        highlight: '#00FF9C',
        'text-primary': '#E5E7EB',
        'text-secondary': '#9CA3AF',
        muted: '#6B7280',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #00F5FF, #7C3AED)',
        'gradient-glow': 'linear-gradient(135deg, #00F5FF, #00FF9C)',
        'gradient-hero': 'linear-gradient(180deg, rgba(0, 245, 255, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(0, 245, 255, 0.3)',
        'glow-purple': '0 0 20px rgba(124, 58, 237, 0.3)',
        'glow-green': '0 0 20px rgba(0, 255, 156, 0.3)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'grid': 'grid 20s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 245, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 245, 255, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        grid: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(50px)' },
        },
      },
    },
  },
  plugins: [],
};