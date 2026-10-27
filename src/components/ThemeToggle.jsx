import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ onThemeChange }) {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('atelier-theme');
      if (saved === 'light' || saved === 'dark') return saved;
      return 'dark'; // Default: Luxury Dark Espresso Brown
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
    if (onThemeChange) onThemeChange(theme);
  }, [theme, onThemeChange]);

  const toggleTheme = (e) => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    // If View Transitions API is supported, run circular clip-path reveal
    if (!document.startViewTransition) {
      setTheme(nextTheme);
      try {
        localStorage.setItem('atelier-theme', nextTheme);
      } catch {}
      return;
    }

    const x = e?.clientX ?? window.innerWidth - 80;
    const y = e?.clientY ?? 40;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      setTheme(nextTheme);
      try {
        localStorage.setItem('atelier-theme', nextTheme);
      } catch {}
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];
      document.documentElement.animate(
        {
          clipPath: nextTheme === 'light' ? clipPath : [...clipPath].reverse(),
        },
        {
          duration: 480,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          pseudoElement:
            nextTheme === 'light'
              ? '::view-transition-new(root)'
              : '::view-transition-old(root)',
        }
      );
    });
  };

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch theme (currently ${theme === 'dark' ? 'Espresso Dark' : 'Warm Sand Light'})`}
      className="relative p-2.5 rounded-xl border border-[#D9C3A3]/25 bg-[#2B1E18]/85 text-[#FAF6EF] hover:text-[#D9C3A3] hover:border-[#D9C3A3]/60 transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D9C3A3]/40 group min-h-[44px] min-w-[44px] flex items-center justify-center"
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {theme === 'dark' ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="w-4 h-4 text-[#D9C3A3] group-hover:text-[#FAF6EF] transition-colors" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: -90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="w-4 h-4 text-[#D9C3A3] group-hover:text-amber-300 transition-colors" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </button>
  );
}
