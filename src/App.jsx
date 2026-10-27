import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import RibbonBackground from './components/RibbonBackground';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import VerticalSectionIndicator from './components/VerticalSectionIndicator';
import Hero from './components/Hero';
import DataTransformationStream from './components/DataTransformationStream';
import About from './components/About';
import Skills from './components/Skills';
import ToolConstellation from './components/ToolConstellation';
import Projects from './components/Projects';
import GitHubSection from './components/GitHubSection';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import SectionDivider from './components/SectionDivider';
import FloatingHireMe from './components/FloatingHireMe';
import DataGridOverlay from './components/DataGridOverlay';
import ResumeModal from './components/ResumeModal';
import CommandPalette from './components/CommandPalette';
import NotFoundPage from './components/NotFoundPage';

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [dataGridActive, setDataGridActive] = useState(false);

  // Render 404 page only if explicitly navigating to /404 or #404
  const is404 = typeof window !== 'undefined' && 
    (window.location.pathname === '/404' || window.location.hash === '#404');

  if (is404) {
    return <NotFoundPage onReturnHome={() => { window.location.href = './'; }} />;
  }

  // Initialize Lenis Smooth Scroll safely
  useEffect(() => {
    try {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      let animationFrameId;

      function raf(time) {
        lenis.raf(time);
        animationFrameId = requestAnimationFrame(raf);
      }

      animationFrameId = requestAnimationFrame(raf);

      // Handle internal hash scrolling smoothly with Lenis
      const handleHashClick = (e) => {
        const anchor = e.target.closest('a[href^="#"]');
        if (!anchor) return;
        const targetId = anchor.getAttribute('href').slice(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          e.preventDefault();
          lenis.scrollTo(targetEl, { offset: -110 });
        }
      };

      document.addEventListener('click', handleHashClick);

      return () => {
        cancelAnimationFrame(animationFrameId);
        document.removeEventListener('click', handleHashClick);
        lenis.destroy();
      };
    } catch (err) {
      console.warn('Lenis scroll initialization skipped:', err);
    }
  }, []);

  // Global Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleTheme = () => {
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setCurrentTheme(nextTheme);
    const root = document.documentElement;
    if (nextTheme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
    try {
      localStorage.setItem('atelier-theme', nextTheme);
    } catch {}
  };

  return (
    <div className="relative min-h-screen bg-[var(--bg-page)] text-[var(--text-page)] transition-colors duration-400 antialiased selection:bg-[#7E9387] selection:text-[#FAF6EF]">
      {/* Enter Preloader (Counter + Hinge) */}
      {showPreloader && (
        <Preloader onComplete={() => setShowPreloader(false)} />
      )}

      {/* Floating Organic Ribbons, Film Grain & Soft Vignette */}
      <RibbonBackground />

      {/* Right-Edge Vertical Section Indicator */}
      <VerticalSectionIndicator />

      {/* Navigation Bar */}
      <Navbar
        onOpenCover={() => setShowPreloader(true)}
        onOpenResume={() => setResumeOpen(true)}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />

      {/* Subtle Data-Grid Wireframe Overlay (Press 'D' to toggle) */}
      <DataGridOverlay
        isEnabled={dataGridActive}
        onToggle={(active) => setDataGridActive(active)}
      />

      {/* Floating Hire Me Pill (Appears after hero) */}
      <FloatingHireMe onOpenResume={() => setResumeOpen(true)} />

      {/* Main Sections */}
      <main id="main-content" className="relative z-10">
        <Hero onOpenResume={() => setResumeOpen(true)} />

        {/* GSAP ScrollTrigger Pinned 3-Step Sequence: Raw data -> Insight -> Decision */}
        <DataTransformationStream />
        
        {/* Bar Chart Section Divider */}
        <SectionDivider type="barchart" />

        <About />

        <Skills />

        {/* Tool Constellation Visual */}
        <ToolConstellation />

        {/* Scatter Plot Section Divider */}
        <SectionDivider type="scatterplot" />

        <Projects />

        {/* Real-time GitHub Repositories Section */}
        <GitHubSection />

        <Experience />

        {/* Network Graph Section Divider */}
        <SectionDivider type="network" />

        <Certifications />

        <Contact />
      </main>

      {/* Resume Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />

      {/* Cmd+K Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onToggleTheme={handleToggleTheme}
        currentTheme={currentTheme}
        onOpenResume={() => setResumeOpen(true)}
        onOpenCover={() => setShowPreloader(true)}
        onToggleDataGrid={() => setDataGridActive((prev) => !prev)}
      />
    </div>
  );
}
