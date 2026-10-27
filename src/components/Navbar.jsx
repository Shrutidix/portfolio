import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText, ArrowUpRight, Search, Command } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { PERSONAL_INFO } from '../content';

const NAV_ITEMS = [
  { id: 'home', name: 'Home' },
  { id: 'about', name: 'About' },
  { id: 'skills', name: 'Skills' },
  { id: 'projects', name: 'Projects' },
  { id: 'experience', name: 'Experience' },
  { id: 'certifications', name: 'Certifications' },
  { id: 'contact', name: 'Contact' },
];

export default function Navbar({ onOpenCover, onOpenResume, onOpenCommandPalette }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
      setScrollProgress(progress);
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver to accurately track active section
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.id);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -65% 0px',
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navHeight = headerRef.current ? headerRef.current.offsetHeight + 24 : 110;
      const top = element.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'py-2.5' : 'py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-[#231813]/92 backdrop-blur-xl border border-[#D9C3A3]/20 shadow-[0_12px_40px_-8px_rgba(15,10,8,0.7)] px-3.5 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between overflow-hidden">
          
          {/* Scroll-Progress Line: Sage & Sand Gradient */}
          <div
            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#7E9387] via-[#D9C3A3] to-[#7E9387] transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />

          {/* Left: Brand Monogram & Name */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              if (onOpenCover && window.scrollY < 120) {
                onOpenCover();
              } else {
                scrollTo('home');
              }
            }}
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none select-none"
            aria-label="Shruti Dixit - Scroll to top"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#2B1E18] border border-[#D9C3A3]/35 shadow-sm flex items-center justify-center transition-all duration-300 group-hover:border-[#D9C3A3] group-hover:bg-[#35261E] group-hover:scale-105">
              <span className="font-display font-bold text-xs sm:text-sm text-[#FAF6EF] tracking-wider">
                {PERSONAL_INFO.monogram}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-display font-bold text-xs sm:text-base text-[#FAF6EF] group-hover:text-[#D9C3A3] transition-colors leading-tight">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-[#7E9387] uppercase font-semibold">
                DATA ANALYST
              </span>
            </div>
          </a>

          {/* Center: Navigation Links in Exact Required Order */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#1A120E]/80 p-1 rounded-xl border border-[#D9C3A3]/20">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`relative px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'text-[#1C1512] bg-[#FAF6EF] font-extrabold shadow-sm'
                      : 'text-[#EFE6DA]/75 hover:text-[#FAF6EF] hover:bg-white/10 font-bold'
                  }`}
                >
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Right: Cmd+K + Theme Toggle + RESUME Button + Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Command Palette Trigger */}
            <button
              onClick={onOpenCommandPalette}
              type="button"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-[#D9C3A3]/25 bg-[#2B1E18]/85 text-[#EFE6DA]/75 hover:text-[#FAF6EF] hover:border-[#D9C3A3]/60 text-xs font-mono transition-colors min-h-[38px]"
              aria-label="Open Command Palette"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="text-[10px] text-[#D9C3A3] px-1 py-0.5 rounded bg-[#1A120E] border border-[#D9C3A3]/20 font-mono">
                ⌘K
              </span>
            </button>

            {/* Moon/Sun Theme Toggle */}
            <ThemeToggle />

            {/* Tactile Cream Paper RESUME Pill Button */}
            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-[#1C1512] bg-[#FAF6EF] hover:bg-white border border-[#D9C3A3]/70 hover:border-[#D9C3A3] shadow-[0_2px_14px_rgba(217,195,163,0.22)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 min-h-[40px]"
              aria-label="Open Resume modal"
            >
              <FileText className="w-3.5 h-3.5 text-[#3F6253]" />
              <span>RESUME</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl border border-[#D9C3A3]/25 bg-[#2B1E18]/85 text-[#FAF6EF] hover:text-[#D9C3A3] hover:border-[#D9C3A3]/60 transition-colors focus:outline-none flex items-center justify-center min-h-[44px] min-w-[44px]"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden mt-2 p-3 rounded-2xl bg-[#231813]/98 backdrop-blur-2xl border border-[#D9C3A3]/25 shadow-2xl space-y-1 overflow-hidden"
            >
              <div className="px-3 py-1.5 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-[#7E9387] border-b border-[#D9C3A3]/15 mb-2">
                <span>NAVIGATION</span>
                <span className="text-[#FAF6EF]">MENU</span>
              </div>

              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left font-mono text-xs transition-all min-h-[44px] ${
                      isActive
                        ? 'bg-[#FAF6EF] text-[#1C1512] font-extrabold shadow-md'
                        : 'text-[#EFE6DA]/85 hover:text-[#FAF6EF] hover:bg-white/10 font-bold'
                    }`}
                  >
                    <span className="font-display font-semibold text-sm">
                      {item.name}
                    </span>
                    <ArrowUpRight className={`w-3.5 h-3.5 ${isActive ? 'text-[#1C1512]' : 'opacity-50'}`} />
                  </button>
                );
              })}

              {/* Mobile Command Palette Button */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenCommandPalette) onOpenCommandPalette();
                }}
                className="w-full mt-2 pt-2 border-t border-[#D9C3A3]/15 flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-mono text-[#D9C3A3] hover:text-[#FAF6EF] font-bold"
              >
                <span>OPEN COMMAND PALETTE</span>
                <Command className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
