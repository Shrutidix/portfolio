import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, User, Cpu, Briefcase, Award, Mail, 
  Sun, Moon, FileDown, Copy, Check, Search, X, BookOpen, Grid
} from 'lucide-react';
import { PERSONAL_INFO } from '../content';

export default function CommandPalette({
  isOpen,
  onClose,
  onToggleTheme,
  currentTheme,
  onOpenResume,
  onOpenCover,
  onToggleDataGrid,
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const scrollTo = (id) => {
    onClose();
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 110;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const actions = [
    {
      id: 'nav-home',
      label: 'Home // Profile & Cover',
      category: 'NAVIGATION',
      shortcut: 'H',
      icon: <Home className="w-4 h-4 text-[#22D3EE]" />,
      perform: () => scrollTo('home'),
    },
    {
      id: 'nav-about',
      label: 'About // Profile & Methodology',
      category: 'NAVIGATION',
      shortcut: 'A',
      icon: <User className="w-4 h-4 text-[#7C5CFF]" />,
      perform: () => scrollTo('about'),
    },
    {
      id: 'nav-skills',
      label: 'Skills // Tools & Competencies',
      category: 'NAVIGATION',
      shortcut: 'S',
      icon: <Cpu className="w-4 h-4 text-[#FFB020]" />,
      perform: () => scrollTo('skills'),
    },
    {
      id: 'nav-projects',
      label: 'Projects // Featured Case Studies',
      category: 'NAVIGATION',
      shortcut: 'P',
      icon: <BookOpen className="w-4 h-4 text-[#22D3EE]" />,
      perform: () => scrollTo('projects'),
    },
    {
      id: 'nav-experience',
      label: 'Experience // Career Chronicle',
      category: 'NAVIGATION',
      shortcut: 'E',
      icon: <Briefcase className="w-4 h-4 text-[#7E9387]" />,
      perform: () => scrollTo('experience'),
    },
    {
      id: 'nav-credentials',
      label: 'Certifications // Credentials & Education',
      category: 'NAVIGATION',
      shortcut: 'C',
      icon: <Award className="w-4 h-4 text-[#FFB020]" />,
      perform: () => scrollTo('certifications'),
    },
    {
      id: 'nav-contact',
      label: 'Contact // Transmission & Inquiries',
      category: 'NAVIGATION',
      shortcut: 'M',
      icon: <Mail className="w-4 h-4 text-[#22D3EE]" />,
      perform: () => scrollTo('contact'),
    },
    {
      id: 'action-theme',
      label: `Switch Theme to ${currentTheme === 'dark' ? 'Sand Light Paper' : 'Espresso Brown Dark'}`,
      category: 'PREFERENCES',
      shortcut: 'T',
      icon: currentTheme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-violet-400" />,
      perform: () => {
        onToggleTheme();
        onClose();
      },
    },
    {
      id: 'action-copy-email',
      label: `Copy Email Address (${PERSONAL_INFO.email})`,
      category: 'ACTIONS',
      shortcut: 'Y',
      icon: copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#22D3EE]" />,
      perform: () => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(PERSONAL_INFO.email);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      },
    },
    {
      id: 'action-resume',
      label: 'View / Download Resume (PDF)',
      category: 'ACTIONS',
      shortcut: 'R',
      icon: <FileDown className="w-4 h-4 text-[#FFB020]" />,
      perform: () => {
        onClose();
        if (onOpenResume) onOpenResume();
      },
    },
    {
      id: 'action-grid-easter-egg',
      label: 'Toggle Blueprint Data-Grid Overlay',
      category: 'EASTER EGGS',
      shortcut: 'D',
      icon: <Grid className="w-4 h-4 text-[#22D3EE]" />,
      perform: () => {
        onClose();
        if (onToggleDataGrid) onToggleDataGrid();
      },
    },
  ];

  const filtered = actions.filter((act) =>
    act.label.toLowerCase().includes(query.toLowerCase()) ||
    act.category.toLowerCase().includes(query.toLowerCase())
  );

  // Keyboard navigation inside palette
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].perform();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-xl bg-[#231813] border border-[#D9C3A3]/25 rounded-2xl shadow-2xl overflow-hidden z-10"
        >
          {/* Search Input Bar */}
          <div className="flex items-center px-4 py-3.5 border-b border-[#D9C3A3]/20">
            <Search className="w-5 h-5 text-white/50 mr-3" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder="Search sections, actions, shortcuts..."
              className="w-full bg-transparent text-sm text-[#FAF6EF] placeholder-white/40 focus:outline-none font-mono"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-white/40 hover:text-white text-xs mr-2"
                aria-label="Clear search"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-white/40 hover:text-white hover:bg-white/10"
              aria-label="Close command palette"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* List of Actions */}
          <div className="max-h-80 overflow-y-auto p-2 space-y-1">
            {filtered.length === 0 ? (
              <div className="p-6 text-center text-xs font-mono text-white/40">
                No commands matching &ldquo;{query}&rdquo;
              </div>
            ) : (
              filtered.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => item.perform()}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-colors font-mono text-xs ${
                      isSelected
                        ? 'bg-[#FAF6EF] text-[#1C1512] font-extrabold shadow-sm'
                        : 'text-white/90 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <div className={`p-1 rounded-lg ${isSelected ? 'bg-black/10' : 'bg-white/10'}`}>
                        {item.icon}
                      </div>
                      <span className="truncate">{item.label}</span>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`text-[10px] uppercase font-bold tracking-wider ${isSelected ? 'text-[#3F6253]' : 'text-white/40'}`}>
                        {item.category}
                      </span>
                      {item.shortcut && (
                        <kbd className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                          isSelected ? 'bg-black/20 text-[#1C1512]' : 'bg-black/40 text-white/60 border border-white/10'
                        }`}>
                          {item.shortcut}
                        </kbd>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Footer Guide */}
          <div className="px-4 py-2.5 bg-[#1A120E] border-t border-[#D9C3A3]/20 flex items-center justify-between text-[10px] font-mono text-[#FAF6EF]/60">
            <div className="flex items-center gap-3">
              <span>&uarr;&darr; Navigate</span>
              <span>&crarr; Select</span>
              <span>ESC Close</span>
            </div>
            <span className="text-[#D9C3A3]">Quick Navigation</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
