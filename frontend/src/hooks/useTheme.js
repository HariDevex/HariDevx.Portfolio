import { useState, useCallback } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const applyTheme = useCallback((t) => {
    const root = document.documentElement;
    root.classList.add('theme-transition');
    root.setAttribute('data-theme', t);
    setTimeout(() => root.classList.remove('theme-transition'), 300);
    localStorage.setItem('theme', t);
  }, []);

  const toggle = useCallback(() => {
    setTheme((t) => {
      const next = t === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      return next;
    });
  }, [applyTheme]);

  return { theme, toggleTheme: toggle };
}
