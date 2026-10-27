import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BookOpen, BarChart2, Code, Database, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../content';

export default function Preloader({ onComplete }) {
  const [count, setCount] = useState(0);
  const [isBookOpened, setIsBookOpened] = useState(false);
  const [isExited, setIsExited] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [countdown, setCountdown] = useState(10);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Smooth loading counter from 0 to 100%
  useEffect(() => {
    let startTimestamp = null;
    const duration = 1200; // 1.2s initial loading

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentCount = Math.floor(progress * 100);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        // Automatically open the book after loading completes (calm 3.5s reading window)
        const timer = setTimeout(() => {
          setIsBookOpened(true);
        }, 3500);
        return () => clearTimeout(timer);
      }
    };

    const animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Enter the portfolio website
  const handleEnterWebsite = () => {
    if (isExited) return;
    setIsExited(true);
    try {
      sessionStorage.setItem('portfolio-entered', 'true');
    } catch {}
    if (onComplete) {
      setTimeout(() => {
        onComplete();
      }, 450);
    }
  };

  // 10-Second Wait Timer: Wait 10 seconds then automatically move to the first page
  useEffect(() => {
    if (!isBookOpened || isExited) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleEnterWebsite();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isBookOpened, isExited]);

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        if (!isBookOpened) {
          setIsBookOpened(true);
        } else {
          handleEnterWebsite();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isBookOpened]);

  return (
    <AnimatePresence>
      {!isExited && (
        <motion.div
          key="preloader-overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#231813] overflow-hidden select-none px-3 sm:px-6"
        >
          {/* Subtle background grain & warm radial lighting */}
          <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-50" />
          <div className="grain-overlay opacity-30 pointer-events-none" />

          {/* Quick skip button on top right */}
          <button
            onClick={handleEnterWebsite}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 hover:bg-white/20 border border-[#D9C3A3]/30 text-[#FAF6EF] font-mono text-[11px] sm:text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 backdrop-blur-md shadow-lg"
            aria-label="Skip to portfolio website"
          >
            <span>Skip to Website</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#D9C3A3]" />
          </button>

          {/* 3D Book Stage (Spacious & Clean for Laptop and Mobile) */}
          <div className="relative perspective-2000 flex items-center justify-center w-full max-w-[880px] py-4 overflow-visible">
            
            {/* Book Spine Shifting Container */}
            <motion.div
              animate={{
                x: isBookOpened && !isMobile ? 100 : 0,
              }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-[92vw] max-w-[360px] sm:max-w-[420px] h-[520px] sm:h-[560px]"
              style={{ transformStyle: 'preserve-3d' }}
            >

              {/* ==========================================================
                  BASE CARD: INSIDE RIGHT PAGE (Clean, Spacious, Uncongested)
                  Only rendered when book is opened to prevent Z-fighting!
                  ========================================================== */}
              <div
                className="absolute inset-0 rounded-2xl bg-[#FAF6EF] text-[#1C1512] shadow-2xl p-5 sm:p-6 flex flex-col justify-between border border-black/15 overflow-hidden"
                style={{
                  boxShadow: '0 25px 50px -12px rgba(15, 10, 8, 0.75), 0 0 0 1px rgba(0,0,0,0.1)',
                  display: isBookOpened ? 'flex' : 'none',
                  visibility: isBookOpened ? 'visible' : 'hidden',
                  pointerEvents: isBookOpened ? 'auto' : 'none',
                }}
              >
                {/* Book Spine Crease on Left Edge */}
                <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-8 bg-gradient-to-r from-black/20 via-black/05 to-transparent pointer-events-none z-10" />

                {/* Page Header - Clean & Roomy */}
                <div className="relative z-10 flex justify-between items-center text-xs font-mono font-bold text-[#1C1512] uppercase tracking-wider pb-2.5 border-b border-black/10">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#3F6253]/10 text-[#3F6253] text-[10px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3F6253]" />
                    AVAILABLE FOR ROLES
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsBookOpened(false);
                    }}
                    className="text-[#7E9387] hover:text-[#231813] text-[10px] font-mono font-bold transition-colors flex items-center gap-1"
                    title="Return to front cover"
                  >
                    <span>COVER</span>
                    <span>&rarr;</span>
                  </button>
                </div>

                {/* Identity Header - Large, Crisp & Clear */}
                <div className="relative z-10 space-y-1 pt-1">
                  <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#1C1512] tracking-tight leading-none">
                    {PERSONAL_INFO.name}
                  </h2>
                  <p className="text-xs sm:text-sm font-mono text-[#3F6253] font-bold">
                    Data Analyst &bull; ML Practitioner
                  </p>
                  <p className="text-xs font-serif text-[#6B5A51] leading-relaxed pt-0.5">
                    Turning complex business data into clear, confident executive decisions.
                  </p>
                </div>

                {/* 3 Core Capability Highlights - Spacious with Icons (Not Congested) */}
                <div className="relative z-10 space-y-2.5 my-auto">
                  <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-black/10 shadow-sm flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#FAF6EF] border border-black/05 flex items-center justify-center flex-shrink-0">
                      <BarChart2 className="w-4 h-4 text-[#3F6253]" />
                    </div>
                    <div>
                      <span className="block text-xs font-mono font-bold text-[#1C1512]">Power BI &amp; Executive Dashboards</span>
                      <span className="block text-[11px] text-[#6B5A51] leading-snug">Interactive reports, Star Schema modeling &amp; KPI analytics</span>
                    </div>
                  </div>

                  <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-black/10 shadow-sm flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#FAF6EF] border border-black/05 flex items-center justify-center flex-shrink-0">
                      <Code className="w-4 h-4 text-[#3F6253]" />
                    </div>
                    <div>
                      <span className="block text-xs font-mono font-bold text-[#1C1512]">Python &amp; Machine Learning</span>
                      <span className="block text-[11px] text-[#6B5A51] leading-snug">Scikit-learn predictive modeling, SHAP &amp; automated pipelines</span>
                    </div>
                  </div>

                  <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-black/10 shadow-sm flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#FAF6EF] border border-black/05 flex items-center justify-center flex-shrink-0">
                      <Database className="w-4 h-4 text-[#3F6253]" />
                    </div>
                    <div>
                      <span className="block text-xs font-mono font-bold text-[#1C1512]">SQL &amp; Relational Analytics</span>
                      <span className="block text-[11px] text-[#6B5A51] leading-snug">PostgreSQL, MySQL, CTEs, window functions &amp; structured ETL</span>
                    </div>
                  </div>
                </div>

                {/* Verified Summary Strip */}
                <div className="relative z-10 text-center py-1">
                  <span className="text-[11px] font-mono text-[#7E9387] font-semibold block">
                    5 Industry Certifications &bull; 3 Flagship Projects &bull; B.Tech (CGPA 7.52)
                  </span>
                </div>

                {/* Primary CTA Button & 10-Second Auto-Move Progress Bar */}
                <div className="relative z-10 pt-2 border-t border-black/10 space-y-2">
                  <button
                    onClick={handleEnterWebsite}
                    className="w-full py-3.5 px-5 rounded-xl bg-[#231813] hover:bg-[#1A120E] text-[#FAF6EF] font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-lg border border-[#D9C3A3]/50 transform hover:scale-[1.01] active:scale-[0.99] group"
                  >
                    <span>Enter Portfolio Website</span>
                    <ArrowRight className="w-4 h-4 text-[#D9C3A3] group-hover:translate-x-1 transition-transform" />
                  </button>

                  {/* 10-Second Countdown Progress Line */}
                  <div className="h-1 w-full bg-black/10 rounded-full overflow-hidden mt-1.5">
                    <motion.div
                      key={isBookOpened ? 'open-timer' : 'closed'}
                      initial={{ width: '100%' }}
                      animate={{ width: isBookOpened ? '0%' : '100%' }}
                      transition={{ duration: 10, ease: 'linear' }}
                      className="h-full bg-gradient-to-r from-[#7E9387] to-[#3F6253]"
                    />
                  </div>
                  <span className="block text-center text-[10px] font-mono text-[#8A7A6E]">
                    Moving to portfolio in {countdown}s &bull; Click button above to enter now
                  </span>
                </div>
              </div>

              {/* ==========================================================
                  FLIPPING FRONT COVER (Turns in 3D around Left Spine)
                  ========================================================== */}
              <motion.div
                initial={{ rotateY: 0 }}
                animate={{
                  rotateY: isBookOpened ? (isMobile ? -105 : -140) : 0,
                  opacity: isBookOpened && isMobile ? 0 : 1,
                }}
                transition={{
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  transformOrigin: 'left center',
                  transformStyle: 'preserve-3d',
                  WebkitTransformStyle: 'preserve-3d',
                  display: isMobile && isBookOpened ? 'none' : 'block',
                  pointerEvents: isBookOpened ? 'none' : 'auto',
                }}
                className="absolute inset-0 rounded-2xl cursor-pointer select-none"
              >
                {/* ---------------- FRONT SIDE OF THE COVER (KNOWLEDGEABLE & UNCONGESTED) ---------------- */}
                <div
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                  onClick={() => setIsBookOpened(true)}
                  className="absolute inset-0 rounded-2xl bg-[#FAF6EF] text-[#1C1512] shadow-2xl border border-black/20 p-5 sm:p-6 flex flex-col justify-between overflow-hidden z-20"
                >
                  {/* Spine Crease on Left Edge */}
                  <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-7 bg-gradient-to-r from-black/25 via-black/10 to-transparent pointer-events-none" />

                  {/* Header Row: Technical & Academic Identifier */}
                  <div className="relative z-10 flex justify-between items-center pb-2.5 border-b border-black/10">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#231813] border border-[#D9C3A3]/40 text-[#FAF6EF] flex items-center justify-center font-display font-bold text-xs shadow-sm">
                        <span>{PERSONAL_INFO.monogram}</span>
                      </div>
                      <div>
                        <span className="block text-[11px] font-mono font-bold text-[#1C1512] tracking-wider uppercase leading-tight">
                          TECHNICAL FOLIO
                        </span>
                        <span className="block text-[9px] font-mono text-[#7E9387] tracking-tight leading-tight">
                          DATA ANALYTICS &amp; BI
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#3F6253]/10 text-[#3F6253] text-[10px] font-mono font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3F6253]" />
                        CGPA 7.52
                      </span>
                    </div>
                  </div>

                  {/* Author Portrait & Identity - Centered, Uncongested & Regal */}
                  <div className="relative z-10 text-center py-2 space-y-2">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[#D9C3A3] shadow-lg bg-[#231813] mx-auto">
                      <img
                        src="./profile.jpg"
                        alt="Shruti Dixit"
                        className="w-full h-full object-cover object-top"
                        width="96"
                        height="96"
                      />
                    </div>
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-[#1C1512] tracking-tight leading-tight">
                        {PERSONAL_INFO.name}
                      </h1>
                      <p className="text-xs font-mono text-[#3F6253] font-bold tracking-tight uppercase mt-0.5">
                        Data Analyst &bull; Power BI Developer
                      </p>
                      <p className="text-[11px] font-mono text-[#6B5A51] leading-tight mt-0.5">
                        B.Tech (Expected 2027) &bull; SR Group of Institutions
                      </p>
                    </div>
                  </div>

                  {/* Core Technical Knowledge Pillars (Distinct Competency Chips) */}
                  <div className="relative z-10 space-y-1.5 py-1">
                    <div className="text-[10px] font-mono font-bold text-[#7E9387] uppercase tracking-wider text-center">
                      Core Technical Competencies
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-[320px] mx-auto">
                      <span className="px-2.5 py-1 rounded-lg bg-white/95 border border-black/10 text-[11px] font-mono font-semibold text-[#1C1512] shadow-xs">
                        Power BI &amp; DAX
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-white/95 border border-black/10 text-[11px] font-mono font-semibold text-[#1C1512] shadow-xs">
                        SQL Relational ETL
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-white/95 border border-black/10 text-[11px] font-mono font-semibold text-[#1C1512] shadow-xs">
                        Python &amp; ML
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-white/95 border border-black/10 text-[11px] font-mono font-semibold text-[#1C1512] shadow-xs">
                        Star Schema
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-white/95 border border-black/10 text-[11px] font-mono font-semibold text-[#1C1512] shadow-xs">
                        Scikit-Learn
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-white/95 border border-black/10 text-[11px] font-mono font-semibold text-[#1C1512] shadow-xs">
                        Advanced Excel
                      </span>
                    </div>
                  </div>

                  {/* Knowledge Summary Strip: Verified Certifications */}
                  <div className="relative z-10 px-2.5 py-1.5 rounded-xl bg-[#3F6253]/08 border border-[#3F6253]/20 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-[#3F6253] font-bold">5 Verified Certifications</span>
                    <span className="text-[#6B5A51]">NASSCOM Gold &bull; AWS &bull; IBM</span>
                  </div>

                  {/* Footer Cover Bar */}
                  <div className="relative z-10 pt-2 border-t border-black/15 space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-mono px-0.5">
                      <span className="text-[#7E9387]">
                        {count < 100 ? `Loading Portfolio ${count}%` : 'Portfolio Verified & Ready'}
                      </span>
                      <span className="text-[#3F6253] font-bold">{count}%</span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsBookOpened(true);
                      }}
                      className="w-full py-3 px-4 rounded-xl bg-[#231813] hover:bg-[#1A120E] text-[#FAF6EF] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-between shadow-md border border-[#D9C3A3]/50 transition-all transform hover:scale-[1.01] active:scale-[0.99] group"
                    >
                      <span className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-[#D9C3A3]" />
                        <span>OPEN THE BOOK</span>
                      </span>
                      <span className="flex items-center gap-1 text-[#D9C3A3]">
                        <span className="text-[10px]">CLICK TO FLIP</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>
                  </div>
                </div>

                {/* ---------------- BACK SIDE OF THE COVER (INSIDE LEFT PAGE) ---------------- */}
                <div
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    WebkitTransform: 'rotateY(180deg)',
                  }}
                  className="absolute inset-0 rounded-2xl bg-[#FAF6EF] text-[#1C1512] shadow-2xl border border-black/20 p-5 sm:p-6 flex flex-col justify-between overflow-hidden"
                >
                  {/* Crease shadow on Right Edge (Spine is to its right when flipped) */}
                  <div className="absolute right-0 top-0 bottom-0 w-7 bg-gradient-to-l from-black/20 via-black/05 to-transparent pointer-events-none" />

                  {/* Header */}
                  <div className="flex justify-between items-center text-xs font-mono font-bold text-[#1C1512] pb-2.5 border-b border-black/10">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsBookOpened(false);
                      }}
                      className="inline-flex items-center gap-1 text-[10px] font-mono text-[#3F6253] hover:text-[#231813] font-bold transition-colors"
                      title="Return to front cover"
                    >
                      <span>&larr;</span>
                      <span>COVER</span>
                    </button>
                    <span className="text-[#8A7A6E] text-[10px] tracking-wider uppercase font-mono">PORTFOLIO INDEX</span>
                  </div>

                  {/* Real Portfolio Sections - Clean & Spaced */}
                  <div className="my-auto space-y-3 font-mono text-xs">
                    <div className="space-y-2 text-[#1C1512] font-semibold">
                      <div className="flex items-center justify-between border-b border-black/05 pb-1">
                        <span>About</span>
                        <span className="text-[#7E9387]">Background &amp; Philosophy</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-black/05 pb-1">
                        <span>Skills</span>
                        <span className="text-[#7E9387]">SQL, Python, Power BI</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-black/05 pb-1">
                        <span>Projects</span>
                        <span className="text-[#7E9387]">3 Flagship Case Studies</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-black/05 pb-1">
                        <span>Experience</span>
                        <span className="text-[#7E9387]">IBM Virtual Internship</span>
                      </div>
                      <div className="flex items-center justify-between pb-1">
                        <span>Certifications</span>
                        <span className="text-[#7E9387]">5 Verified Credentials</span>
                      </div>
                    </div>

                    <div className="pt-2 text-xs font-serif italic text-[#53453E] leading-relaxed">
                      "I build interactive dashboards, automated pipelines, and predictive models that transform complex numbers into clear visual insights."
                    </div>
                  </div>

                  {/* Footer contact */}
                  <div className="pt-2.5 border-t border-black/10 text-center text-[11px] font-mono text-[#3F6253] font-bold">
                    <span>{PERSONAL_INFO.email} &bull; {PERSONAL_INFO.phone}</span>
                  </div>
                </div>

              </motion.div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
