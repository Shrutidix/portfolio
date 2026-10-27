import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Sparkles, ArrowRight, FileDown, RotateCw, 
  BarChart2, Brain, Database, Code 
} from 'lucide-react';
import { PERSONAL_INFO, TOOL_MARQUEE } from '../content';

// Magnetic Button Wrapper
function MagneticButton({ children, className, onClick, ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.25);
    y.set((clientY - centerY) * 0.25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export default function Hero({ onOpenResume }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [isCoverFlipped, setIsCoverFlipped] = useState(false);

  // Vertical slot machine role rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % PERSONAL_INFO.roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  // Spring tilt physics (max 8 degrees)
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 220, mass: 0.12 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);
  const sheenX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-50, 150]), springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const xPct = (e.clientX - rect.left) / width - 0.5;
    const yPct = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 110;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const greetingText = "Hi, I'm Shruti Dixit";

  return (
    <section id="home" className="relative pt-28 pb-16 overflow-hidden bg-transparent scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Eyebrow Marker */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-3 border-b border-[var(--border-hairline)]">
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[var(--sage-accent)] uppercase">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--sage-accent)]" />
            <span>HOME</span>
          </div>
          <div className="text-xs font-mono font-bold text-[var(--text-page-muted)] tracking-wider uppercase">
            DATA ANALYST PORTFOLIO
          </div>
        </div>

        {/* Main 2-Column Grid: 3D Cover on Left / Intro Dossier on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-16">
          
          {/* ==========================================================
              LEFT: 3D PORTFOLIO COVER CARD
              ========================================================== */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            
            {/* 3D Perspective Card Wrapper */}
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="flip-card relative perspective-2000 w-full max-w-[390px] h-[500px] sm:h-[540px] cursor-pointer select-none"
              onClick={() => setIsCoverFlipped(!isCoverFlipped)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setIsCoverFlipped(!isCoverFlipped)}
              role="button"
              tabIndex={0}
              aria-label="Interactive 3D portfolio card - click or press enter to flip"
            >
              {/* Inner card with 3D Flip & Mouse Tilt */}
              <motion.div
                style={{
                  rotateX: isCoverFlipped ? 0 : rotateX,
                  rotateY: isCoverFlipped ? 180 : rotateY,
                  transformStyle: 'preserve-3d',
                  WebkitTransformStyle: 'preserve-3d',
                }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full transform-style-3d relative rounded-2xl shadow-book border border-black/15 bg-[#FAF6EF]"
              >
                
                {/* ---------------- FRONT FACE: FULL SIZE PORTRAIT COVER ---------------- */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#231813',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    opacity: isCoverFlipped ? 0 : 1,
                    visibility: isCoverFlipped ? 'hidden' : 'visible',
                    pointerEvents: isCoverFlipped ? 'none' : 'auto',
                    transition: 'opacity 0.25s ease',
                  }}
                  className="absolute inset-0 backface-hidden rounded-2xl bg-[#231813] text-[#FAF6EF] border border-[#D9C3A3]/25 flex flex-col justify-between overflow-hidden p-5 sm:p-6 select-none shadow-book"
                >
                  {/* Full-bleed Portrait Photo Background */}
                  <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <motion.img
                      src="./profile.jpg"
                      alt="Shruti Dixit"
                      animate={{ scale: [1, 1.04, 1] }}
                      transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-full h-full object-cover object-top filter contrast-[1.05]"
                      width="390"
                      height="540"
                    />
                    
                    {/* Editorial Vignette & Gradient Overlays for perfect legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#231813] via-[#231813]/40 to-[#231813]/60 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#231813]/70 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Spine gradient on left edge */}
                  <div className="absolute left-0 top-0 bottom-0 w-5 bg-gradient-to-r from-black/40 via-black/10 to-transparent pointer-events-none z-30" />

                  {/* Moving Light Sheen on Mouse Movement */}
                  <motion.div
                    style={{ left: `${sheenX.get()}%` }}
                    className="absolute top-0 bottom-0 w-28 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none z-30"
                  />

                  {/* Top Header Row */}
                  <div className="relative z-20 flex items-center justify-between text-xs font-mono font-bold text-[#FAF6EF] pb-1">
                    <span className="px-2.5 py-1 rounded-full bg-[#231813]/80 backdrop-blur-md border border-[#D9C3A3]/30 text-[#D9C3A3] flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7E9387]" />
                      PORTFOLIO
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#231813]/80 backdrop-blur-md border border-[#D9C3A3]/30 text-[#FAF6EF] text-[10px] tracking-wider font-mono">
                      SHRUTI DIXIT
                    </span>
                  </div>

                  {/* Floating Skill Badges over the Photo */}
                  <div className="relative z-20 my-auto py-6 flex flex-col gap-3 pointer-events-none">
                    <div className="flex justify-start">
                      <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="px-2.5 py-1 rounded-full bg-[#231813]/85 backdrop-blur-md border border-[#D9C3A3]/35 text-[#D9C3A3] text-[10px] font-mono font-bold tracking-wider shadow-md flex items-center gap-1.5 pointer-events-auto"
                      >
                        <Database className="w-3 h-3 text-[#D9C3A3]" />
                        <span>SQL</span>
                      </motion.div>
                    </div>

                    <div className="flex justify-end">
                      <motion.div
                        animate={{ y: [0, 4, 0] }}
                        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                        className="px-2.5 py-1 rounded-full bg-[#231813]/85 backdrop-blur-md border border-[#7E9387]/50 text-[#FAF6EF] text-[10px] font-mono font-bold tracking-wider shadow-md flex items-center gap-1.5 pointer-events-auto"
                      >
                        <Code className="w-3 h-3 text-[#7E9387]" />
                        <span>Python</span>
                      </motion.div>
                    </div>

                    <div className="flex justify-end pr-2">
                      <motion.div
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                        className="px-2.5 py-1 rounded-full bg-[#231813]/85 backdrop-blur-md border border-[#D9C3A3]/35 text-[#D9C3A3] text-[10px] font-mono font-bold tracking-wider shadow-md flex items-center gap-1.5 pointer-events-auto"
                      >
                        <BarChart2 className="w-3 h-3 text-[#D9C3A3]" />
                        <span>Power BI</span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Bottom Editorial Details Box */}
                  <div className="relative z-20 space-y-2 pt-2">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-[#7E9387] uppercase font-bold block mb-1">
                        DATA ANALYST
                      </span>
                      <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#FAF6EF] tracking-tight leading-tight">
                        Shruti Dixit
                      </h2>
                      <p className="text-xs font-serif text-[#D9C3A3] mt-0.5 leading-snug">
                        Turning complex data into clear, actionable business intelligence.
                      </p>
                    </div>

                    {/* Bottom Affordance Strip */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#D9C3A3] pt-2 border-t border-[#D9C3A3]/20 font-bold">
                      <span className="text-[#FAF6EF]/85">Click card to view summary</span>
                      <span className="flex items-center gap-1 text-[#D9C3A3]">
                        <RotateCw className="w-3.5 h-3.5 text-[#D9C3A3]" />
                      </span>
                    </div>
                  </div>

                </div>

                {/* ---------------- BACK FACE ---------------- */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#FAF6EF',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    WebkitTransform: 'rotateY(180deg)',
                    opacity: isCoverFlipped ? 1 : 0,
                    visibility: isCoverFlipped ? 'visible' : 'hidden',
                    pointerEvents: isCoverFlipped ? 'auto' : 'none',
                    transition: 'opacity 0.25s ease',
                  }}
                  className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl bg-[#FAF6EF] text-[#1C1512] border border-black/15 flex flex-col justify-between p-6 shadow-xl select-none"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-[#1C1512] pb-3 border-b border-black/15 font-bold">
                      <span>PROFILE SUMMARY</span>
                      <span className="text-[#3F6253]">SHRUTI DIXIT</span>
                    </div>

                    <div className="mt-4 space-y-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-[#3F6253] font-bold block">
                        ANALYTICAL OBJECTIVE
                      </span>
                      <h3 className="font-display font-extrabold text-xl text-[#1C1512] leading-snug">
                        Turning Data Into Decisions
                      </h3>
                      <p className="font-serif text-sm text-[#4A3B34] leading-relaxed">
                        {PERSONAL_INFO.summary}
                      </p>
                    </div>

                    <div className="mt-5 p-3.5 rounded-xl bg-white border border-black/15 space-y-1.5 shadow-sm">
                      <div className="text-xs font-mono text-[#3F6253] font-bold uppercase tracking-wider">
                        KEY HIGHLIGHTS
                      </div>
                      <div className="text-xs font-mono text-[#1C1512] space-y-1 font-semibold">
                        <div>&bull; 5 Industry Certifications (NASSCOM Gold, AWS, IBM)</div>
                        <div>&bull; 3 Flagship Analytics Projects (ML, Power BI, NLP)</div>
                        <div>&bull; B.Tech Expected 2027 (Undergrad CGPA: 7.52 / 10)</div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center pt-3 border-t border-black/15 text-xs font-mono text-[#3F6253] font-bold flex items-center justify-center gap-1.5">
                    <RotateCw className="w-3 h-3" />
                    <span>Click to flip front</span>
                  </div>
                </div>

              </motion.div>
            </div>

            {/* Flip Controller Pill */}
            <div className="mt-4 w-full max-w-[390px] rounded-xl bg-[#FAF6EF] text-[#1C1512] border border-black/15 px-4 py-2 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#3F6253]" />
                <span className="text-xs font-mono uppercase tracking-wider font-bold">
                  Card Overview
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCoverFlipped(!isCoverFlipped);
                }}
                className="px-3 py-1 rounded bg-[#231813] hover:bg-black text-[#FAF6EF] text-xs font-mono font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                aria-label="Flip card view"
              >
                <RotateCw className="w-3 h-3 text-[#D9C3A3]" />
                <span>{isCoverFlipped ? 'Front' : 'Flip'}</span>
              </button>
            </div>

          </div>

          {/* ==========================================================
              RIGHT: HERO INTRO & VALUE PROPOSITION
              ========================================================== */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6 text-left rounded-2xl bg-[#FAF6EF] text-[#1C1512] p-7 sm:p-10 shadow-book border border-black/15">
            
            {/* Status Pill & Avatar */}
            <div className="flex items-center gap-3">
              <img
                src="./profile.jpg"
                alt="Shruti Dixit"
                className="w-12 h-12 rounded-full object-cover object-top border-2 border-[#3F6253] shadow-md flex-shrink-0"
              />
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/15 text-xs font-mono font-bold text-[#1C1512] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#3F6253] animate-ping" />
                <span className="w-2 h-2 rounded-full bg-[#3F6253] -ml-4" />
                <span>Available for Data Analyst &amp; BI Roles</span>
              </div>
            </div>

            {/* Single H1 with Character-by-Character Entrance & Slot Machine Rotating Role */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-[#1C1512] tracking-tight leading-[1.1] flex flex-wrap gap-x-3">
                {greetingText.split(' ').map((word, wordIdx) => (
                  <span key={wordIdx} className="inline-flex overflow-hidden">
                    {word.split('').map((char, charIdx) => (
                      <motion.span
                        key={charIdx}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          duration: 0.6,
                          ease: [0.22, 1, 0.36, 1],
                          delay: (wordIdx * 4 + charIdx) * 0.035,
                        }}
                        className={`inline-block ${
                          word === 'Shruti' || word === 'Dixit'
                            ? 'text-[#1C1512] underline decoration-[#7E9387] decoration-2 underline-offset-8'
                            : ''
                        }`}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </h1>

              {/* Slot-Machine Roll for Roles */}
              <div className="h-10 sm:h-12 flex items-center overflow-hidden pt-1">
                <span className="font-mono text-sm sm:text-base text-[#3F6253] mr-2 uppercase tracking-wider font-extrabold">&gt;</span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={PERSONAL_INFO.roles[roleIndex]}
                    initial={{ y: 32, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -32, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-[#1C1512]"
                  >
                    {PERSONAL_INFO.roles[roleIndex]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Factual Resume Summary in EB Garamond */}
            <p className="font-serif text-lg sm:text-xl text-[#3B2F2A] leading-relaxed max-w-2xl">
              {PERSONAL_INFO.summary}
            </p>

            {/* 3 Core Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-white border border-black/15 shadow-sm flex items-start gap-3">
                <BarChart2 className="w-5 h-5 text-[#3F6253] mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-xs font-mono font-extrabold text-[#1C1512] block">Power BI &amp; Dashboards</h3>
                  <span className="text-xs text-[#53453E] font-sans font-normal leading-relaxed block mt-0.5">Interactive executive reports, KPI visuals &amp; Star Schemas</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-black/15 shadow-sm flex items-start gap-3">
                <Brain className="w-5 h-5 text-[#B89F7D] mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-xs font-mono font-extrabold text-[#1C1512] block">Python &amp; ML</h3>
                  <span className="text-xs text-[#53453E] font-sans font-normal leading-relaxed block mt-0.5">Predictive forecasting, data cleaning &amp; SHAP explainability</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-black/15 shadow-sm flex items-start gap-3">
                <Database className="w-5 h-5 text-[#222B31] mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-xs font-mono font-extrabold text-[#1C1512] block">SQL &amp; Databases</h3>
                  <span className="text-xs text-[#53453E] font-sans font-normal leading-relaxed block mt-0.5">Relational queries, automated ETL &amp; clean data structures</span>
                </div>
              </div>
            </div>

            {/* Magnetic CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <MagneticButton
                onClick={onOpenResume}
                className="px-6 py-3.5 rounded-xl font-mono text-xs uppercase tracking-wider font-extrabold text-[#FAF6EF] bg-[#231813] hover:bg-[#1A120E] border border-[#D9C3A3]/30 shadow-md transition-all duration-300 flex items-center gap-2"
              >
                <FileDown className="w-4 h-4 text-[#D9C3A3]" />
                <span>Download Resume</span>
              </MagneticButton>

              <MagneticButton
                onClick={() => scrollTo('contact')}
                className="px-6 py-3.5 rounded-xl font-mono text-xs uppercase tracking-wider font-extrabold text-[#1C1512] bg-[#FAF6EF] border-2 border-[#231813] hover:bg-white shadow-sm transition-all duration-300 flex items-center gap-2"
              >
                <span>Get In Touch</span>
                <ArrowRight className="w-4 h-4 text-[#3F6253]" />
              </MagneticButton>
            </div>

            {/* Micro Stats Row */}
            <div className="pt-3 border-t border-black/15 flex flex-wrap items-center gap-6 text-xs font-mono text-[#1C1512]">
              <div>
                <span className="block text-[10px] text-[#3F6253] font-bold uppercase">Location</span>
                <span className="text-[#1C1512] font-extrabold">{PERSONAL_INFO.location}</span>
              </div>
              <div className="h-6 w-[1px] bg-black/15 hidden sm:block" />
              <div>
                <span className="block text-[10px] text-[#3F6253] font-bold uppercase">Education</span>
                <span className="text-[#1C1512] font-extrabold">B.Tech (Expected 2027)</span>
              </div>
              <div className="h-6 w-[1px] bg-black/15 hidden sm:block" />
              <div>
                <span className="block text-[10px] text-[#3F6253] font-bold uppercase">Undergrad CGPA</span>
                <span className="text-[#1C1512] font-extrabold">7.52 / 10.0</span>
              </div>
            </div>

          </div>

        </div>

        {/* Tools Marquee Strip */}
        <div className="mt-4 pt-4 border-t border-[var(--border-hairline)]">
          <div className="flex items-center gap-2 mb-3 text-xs font-mono uppercase tracking-wider text-[var(--text-page)] font-bold">
            <span className="w-2 h-2 rounded-full bg-[var(--sage-accent)]" />
            <span>CORE TOOLKIT &amp; SKILLS</span>
          </div>

          <div className="overflow-hidden relative py-3 bg-[#FAF6EF] text-[#1C1512] rounded-xl border border-black/15 shadow-sm">
            <div className="animate-marquee">
              {[...TOOL_MARQUEE, ...TOOL_MARQUEE].map((tool, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-8 mx-5 text-xs sm:text-sm font-mono font-bold tracking-wider text-[#1C1512] whitespace-nowrap"
                >
                  <span className="hover:text-[#3F6253] transition-colors">{tool}</span>
                  <span className="text-black/30">&bull;</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
