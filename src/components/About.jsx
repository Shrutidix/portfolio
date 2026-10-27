import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  GraduationCap,
  Award,
  FolderGit2,
  Sparkles,
  Check,
  Maximize2,
  X,
  Database,
  Filter,
  LineChart,
  BarChart3,
  CheckCircle2,
  FileQuestion
} from 'lucide-react';
import { PERSONAL_INFO, HOW_I_WORK_STEPS, EDUCATION_RECORD } from '../content';

// Count-up Hook for factual numbers
function useCountUp(endVal, duration = 1400, trigger = false, isFloat = false) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let startTimestamp = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = progress * endVal;
      setVal(isFloat ? parseFloat(current.toFixed(2)) : Math.floor(current));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setVal(endVal);
      }
    };

    const animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [endVal, duration, trigger, isFloat]);

  return val;
}

// Icon mapping for workflow steps
const WORKFLOW_ICONS = [Database, Filter, LineChart, BarChart3, CheckCircle2];

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });
  const [activeCollageModal, setActiveCollageModal] = useState(null); // 'schema' | 'dashboard' | null
  const [imgError, setImgError] = useState({ photo: false, dashboard: false, schema: false });

  // Real count-up stats: 7.52 CGPA, 5 Certifications, 3 Projects
  const animatedCgpa = useCountUp(7.52, 1400, isInView, true);
  const animatedCerts = useCountUp(5, 1200, isInView);
  const animatedProjects = useCountUp(3, 1000, isInView);

  // Animated CGPA ring (7.52 / 10)
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (7.52 / 10) * circumference;

  return (
    <section id="about" className="py-20 relative bg-transparent scroll-mt-28" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Eyebrow Header */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[var(--border-hairline)]">
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[var(--sage-accent)] uppercase">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--sage-accent)]" />
            <span>ABOUT ME</span>
          </div>
          <div className="text-xs font-mono font-bold text-[var(--text-page-muted)] tracking-wider uppercase">
            PROFILE &amp; METHODOLOGY
          </div>
        </div>

        {/* Large Cream Paper Card Container */}
        <div className="rounded-2xl bg-[#FAF6EF] text-[#1C1512] shadow-book border border-black/15 p-6 sm:p-10 md:p-12 relative overflow-hidden transition-all duration-300 hover:shadow-2xl">
          
          {/* Section Heading */}
          <div className="pb-5 border-b border-black/15 mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-[#3F6253] font-bold block mb-1">
              ABOUT ME
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-[#1C1512] tracking-tight">
              About Me
            </h2>
          </div>

          {/* Top Half: Left Layered Collage + Right Narrative Bio */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-14">
            
            {/* Left: 3-Layer Collage (Photo Frame + Laptop Dashboard + Star Schema) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-[380px] min-h-[380px] sm:min-h-[420px] flex items-center justify-center select-none py-4">
                
                {/* 1. Base Layer: Portrait Photo Frame with Rotating Circular Badge */}
                <div className="relative w-[82%] sm:w-[84%] h-[300px] sm:h-[330px] rounded-2xl overflow-hidden shadow-xl border border-black/20 group bg-[#222B31] z-10">
                  {!imgError.photo ? (
                    <img
                      src="./profile.jpg"
                      alt="Shruti Dixit - Data Analyst"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      width="315"
                      height="330"
                      decoding="async"
                      onError={() => setImgError((prev) => ({ ...prev, photo: true }))}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-[#FAF6EF] p-4 text-center">
                      <FileQuestion className="w-10 h-10 text-[#22D3EE] mb-2" />
                      <span className="font-display font-bold text-lg">Shruti Dixit</span>
                      <span className="text-xs font-mono text-[#D9C3A3]">Data Analyst</span>
                    </div>
                  )}

                  {/* Perfectly Sized Circular Rotating Badge (Explicit Tailwind size, pinned top-right) */}
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-30 pointer-events-none select-none">
                    <div className="relative w-[72px] h-[72px] lg:w-[88px] lg:h-[88px] rounded-full bg-[#222B31]/95 backdrop-blur-md border border-[#22D3EE]/30 shadow-xl flex items-center justify-center animate-spin-slow">
                      <svg className="w-full h-full p-0.5" viewBox="0 0 100 100">
                        <defs>
                          <path
                            id="circlePathAboutFixed"
                            d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                          />
                        </defs>
                        <text className="text-[8.5px] font-mono font-bold uppercase fill-[#FAF6EF] tracking-[0.18em]">
                          <textPath href="#circlePathAboutFixed" startOffset="0%">
                            • SHRUTI DIXIT • DATA ANALYST •
                          </textPath>
                        </text>
                      </svg>
                      {/* Center sparkle */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <Sparkles className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-[#22D3EE]" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom Photo Name Tag (Never overlapped by badge) */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 text-white z-20">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#22D3EE] font-bold">
                      PORTFOLIO
                    </div>
                    <div className="font-display font-extrabold text-xl text-white leading-tight">
                      Shruti Dixit
                    </div>
                  </div>
                </div>

                {/* 2. Layer: Star Schema Sketch (Top-left offset, visible on md+, tucks smoothly) */}
                <motion.div
                  whileHover={{ scale: 1.04, y: -2 }}
                  onClick={() => setActiveCollageModal('schema')}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActiveCollageModal('schema')}
                  role="button"
                  tabIndex={0}
                  aria-label="Expand Star Schema Diagram"
                  className="hidden sm:block absolute top-6 -left-3 lg:-left-6 w-[48%] h-[120px] rounded-xl overflow-hidden border border-black/25 shadow-xl bg-[#FAF6EF] p-1.5 cursor-pointer z-20 transition-all rotate-[-3deg] hover:rotate-0"
                >
                  {!imgError.schema ? (
                    <img
                      src="./images/star-schema-sketch.svg"
                      alt="Dimensional Star Schema Modeling Sketch"
                      className="w-full h-full object-contain pointer-events-none"
                      width="160"
                      height="110"
                      loading="lazy"
                      decoding="async"
                      onError={() => setImgError((prev) => ({ ...prev, schema: true }))}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs font-mono text-[#3F6253]">
                      Star Schema
                    </div>
                  )}
                  <div className="absolute top-1 left-1.5 px-1.5 py-0.5 rounded bg-[#3F6253] text-[7.5px] font-mono text-white font-bold flex items-center gap-1">
                    <span>STAR SCHEMA</span>
                    <Maximize2 className="w-2 h-2" />
                  </div>
                </motion.div>

                {/* 3. Layer: Laptop Dashboard Card (Bottom-right offset, always visible) */}
                <motion.div
                  whileHover={{ scale: 1.04, y: -3 }}
                  onClick={() => setActiveCollageModal('dashboard')}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActiveCollageModal('dashboard')}
                  role="button"
                  tabIndex={0}
                  aria-label="Expand Dashboard Illustration"
                  className="absolute bottom-2 -right-2 sm:-right-4 w-[58%] sm:w-[54%] h-[128px] sm:h-[136px] rounded-xl overflow-hidden border border-black/25 shadow-2xl bg-[#1E252A] p-1.5 cursor-pointer z-30 transition-all"
                >
                  {!imgError.dashboard ? (
                    <img
                      src="./images/laptop-dashboard.svg"
                      alt="Analytics Dashboard on Laptop"
                      className="w-full h-full object-contain pointer-events-none"
                      width="190"
                      height="120"
                      loading="lazy"
                      decoding="async"
                      onError={() => setImgError((prev) => ({ ...prev, dashboard: true }))}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs font-mono text-[#22D3EE]">
                      Dashboard UI
                    </div>
                  )}
                  <div className="absolute top-1 left-2 px-1.5 py-0.5 rounded bg-black/80 text-[7.5px] font-mono text-[#22D3EE] font-bold flex items-center gap-1">
                    <span>DASHBOARD UI</span>
                    <Maximize2 className="w-2 h-2 text-[#22D3EE]" />
                  </div>
                </motion.div>

              </div>

              {/* Editorial Pull-Quote */}
              <div className="w-full max-w-[380px] pt-2">
                <blockquote className="font-serif italic text-sm text-[#4A3B34] leading-relaxed border-l-2 border-[#3F6253] pl-3">
                  “{PERSONAL_INFO.aboutQuote}”
                </blockquote>
              </div>
            </div>

            {/* Right: Bio strictly from verified facts */}
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#3F6253] font-bold block">
                  PROFESSIONAL SUMMARY
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[#1C1512] tracking-tight leading-snug">
                  Turning Complex Business Data into Actionable Insights
                </h3>
              </div>

              {/* Bio narrative in EB Garamond */}
              <p className="font-serif text-lg text-[#3B2F2A] leading-relaxed">
                {PERSONAL_INFO.aboutBio}
              </p>

              {/* Factual attributes strip */}
              <div className="p-4 rounded-xl bg-white border border-black/15 text-xs font-mono text-[#1C1512] space-y-2.5 font-semibold shadow-sm">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#3F6253]" />
                  <span><strong>Role:</strong> Data Analyst &bull; Power BI Developer &bull; ML Practitioner</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#3F6253]" />
                  <span><strong>Core Technologies:</strong> SQL, Python, Power BI, Advanced Excel</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#3F6253]" />
                  <span><strong>Key Strengths:</strong> Statistical Modeling, EDA, Feature Engineering, NLP</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#3F6253]" />
                  <span><strong>Location:</strong> {PERSONAL_INFO.location}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Middle: Bento Layout of Real Resume Facts & Animated Stats */}
          <div className="mb-14">
            <div className="flex items-center justify-between mb-5">
              <span className="text-xs font-mono uppercase tracking-wider text-[#1C1512] font-bold">
                HIGHLIGHTS AT A GLANCE
              </span>
              <span className="text-xs font-mono text-[#3F6253] font-semibold">
                RESUME RECORDS
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">
              
              {/* Card 1: Education + Animated CGPA Ring */}
              <div className="lg:col-span-4 p-5 rounded-xl bg-white border border-black/15 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#3F6253] font-bold">
                      ACADEMIC FOUNDATION
                    </span>
                    <GraduationCap className="w-5 h-5 text-[#3F6253]" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#1C1512]">
                    {EDUCATION_RECORD.degree} (Expected 2027)
                  </h3>
                  <p className="text-xs text-[#53453E] mt-1 font-sans">
                    {EDUCATION_RECORD.institution}
                  </p>
                </div>

                {/* Animated CGPA Ring */}
                <div className="mt-5 pt-3 border-t border-black/10 flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] font-mono text-[#7E9387] font-bold uppercase">Official CGPA</span>
                    <span className="font-display font-extrabold text-2xl text-[#1C1512]">
                      {animatedCgpa}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#53453E]"> / 10.0</span>
                  </div>

                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg className="w-16 h-16 -rotate-90" viewBox="0 0 80 80">
                      <circle
                        cx="40"
                        cy="40"
                        r={radius}
                        fill="none"
                        stroke="#E2E8F0"
                        strokeWidth="5"
                      />
                      <motion.circle
                        cx="40"
                        cy="40"
                        r={radius}
                        fill="none"
                        stroke="#3F6253"
                        strokeWidth="5"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: isInView ? strokeDashoffset : circumference }}
                        transition={{ duration: 1.6, ease: 'easeOut', delay: 0.2 }}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute text-[11px] font-mono font-bold text-[#1C1512]">
                      7.52
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 2: 4 Core Focus Areas */}
              <div className="lg:col-span-4 p-5 rounded-xl bg-white border border-black/15 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#3F6253] font-bold">
                      CORE FOCUS AREAS
                    </span>
                    <Sparkles className="w-5 h-5 text-[#3F6253]" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#1C1512] mb-3">
                    Analytical Pillars
                  </h3>
                  <div className="space-y-1.5">
                    {[
                      "Exploratory Data Analysis (EDA)",
                      "Feature Engineering",
                      "Natural Language Processing (NLP)",
                      "Statistical Modeling"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-mono font-bold text-[#1C1512]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3F6253]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-black/10 text-[10px] font-mono text-[#7E9387] font-semibold">
                  Applied across analytical case studies
                </div>
              </div>

              {/* Card 3: Real Animated Count-Up Numbers */}
              <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                
                {/* 5 Certifications */}
                <div className="p-3.5 rounded-xl bg-white border border-black/15 flex items-center justify-between shadow-sm">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#7E9387] font-bold">CREDENTIALS</span>
                    <div className="font-display font-extrabold text-2xl text-[#1C1512]">
                      {animatedCerts} Certifications
                    </div>
                    <span className="text-[11px] font-mono text-[#3F6253] font-bold">NASSCOM Gold, AWS, IBM</span>
                  </div>
                  <Award className="w-7 h-7 text-[#3F6253]" />
                </div>

                {/* 3 Key Projects */}
                <div className="p-3.5 rounded-xl bg-white border border-black/15 flex items-center justify-between shadow-sm">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#7E9387] font-bold">PROJECTS</span>
                    <div className="font-display font-extrabold text-2xl text-[#1C1512]">
                      {animatedProjects} Key Projects
                    </div>
                    <span className="text-[11px] font-mono text-[#3F6253] font-bold">Predictive ML &amp; Power BI</span>
                  </div>
                  <FolderGit2 className="w-7 h-7 text-[#3F6253]" />
                </div>

                {/* Location */}
                <div className="p-3.5 rounded-xl bg-white border border-black/15 flex items-center justify-between shadow-sm">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#7E9387] font-bold">LOCATION</span>
                    <div className="font-display font-bold text-base text-[#1C1512]">
                      {PERSONAL_INFO.location}
                    </div>
                    <span className="text-[11px] font-mono text-[#3F6253] font-bold">India</span>
                  </div>
                  <MapPin className="w-6 h-6 text-[#3F6253]" />
                </div>

              </div>

            </div>
          </div>

          {/* Bottom: "How I Work" Strip with Line Icons */}
          <div className="pt-6 border-t border-black/15 relative">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono uppercase tracking-wider text-[#1C1512] font-bold">
                HOW I WORK
              </span>
              <span className="text-xs font-mono text-[#3F6253] font-semibold">
                SYSTEMATIC DELIVERY
              </span>
            </div>

            {/* Self-drawing SVG line connecting steps */}
            <div className="hidden md:block absolute top-[94px] left-12 right-12 h-1 pointer-events-none z-0">
              <svg className="w-full h-2" preserveAspectRatio="none">
                <motion.line
                  x1="0%"
                  y1="50%"
                  x2="100%"
                  y2="50%"
                  stroke="#7E9387"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: isInView ? 1 : 0 }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                />
              </svg>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3.5 relative z-10">
              {HOW_I_WORK_STEPS.map((s, index) => {
                const StepIcon = WORKFLOW_ICONS[index] || CheckCircle2;
                return (
                  <div
                    key={s.name}
                    className="p-4 rounded-xl bg-white border border-black/15 flex flex-col justify-between shadow-sm hover:border-[#222B31] transition-all hover:-translate-y-0.5"
                  >
                    <div>
                      {/* Line Icon instead of numeric step counter */}
                      <div className="w-8 h-8 rounded-full bg-[#222B31] text-[#22D3EE] flex items-center justify-center mb-2.5 shadow-sm">
                        <StepIcon className="w-4 h-4 text-[#22D3EE]" />
                      </div>
                      <h3 className="font-display font-bold text-base text-[#1C1512] mb-1">
                        {s.name}
                      </h3>
                      <p className="text-xs font-sans text-[#53453E] leading-relaxed font-normal">
                        {s.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* Modal Zoom for Collage Elements */}
      <AnimatePresence>
        {activeCollageModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none"
            onClick={() => setActiveCollageModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-[#FAF6EF] text-[#1C1512] rounded-2xl shadow-2xl border border-black/20 p-6 overflow-hidden"
            >
              <div className="flex items-center justify-between pb-3 border-b border-black/15 mb-4">
                <span className="font-display font-bold text-lg">
                  {activeCollageModal === 'schema'
                    ? 'Star Schema Dimensional Modeling Sketch'
                    : 'Analytics Console & Executive Dashboard'}
                </span>
                <button
                  onClick={() => setActiveCollageModal(null)}
                  className="p-1 rounded-lg hover:bg-black/10 text-[#1C1512]"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="h-80 w-full flex items-center justify-center bg-[#1E252A]/10 rounded-xl p-2">
                <img
                  src={
                    activeCollageModal === 'schema'
                      ? './images/star-schema-sketch.svg'
                      : './images/laptop-dashboard.svg'
                  }
                  alt={
                    activeCollageModal === 'schema'
                      ? 'Star Schema Sketch'
                      : 'Laptop Dashboard'
                  }
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>

              <div className="mt-4 pt-3 border-t border-black/10 text-xs font-mono text-[#7E9387] flex justify-between">
                <span>ANALYTICAL ASSET</span>
                <span>ESC TO CLOSE</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
