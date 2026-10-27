import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import CaseStudyModal from './CaseStudyModal';
import ProjectMockup from './ProjectMockup';
import { EDITORIAL_PROJECTS, PROJECT_FILTERS } from '../content';

// Individual Open-Book Spread Card Component
function OpenBookSpreadCard({ spread, onOpenSpread }) {
  const [mobileTab, setMobileTab] = useState('overview'); // 'overview' | 'details'
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="spread-card group relative w-full rounded-2xl bg-[#FAF6EF] text-[#1C1512] shadow-book border border-black/15 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:border-black/30"
      onClick={() => onOpenSpread(spread)}
      style={{
        transform: isHovered ? 'perspective(1500px) rotateX(1deg) scale(1.005)' : 'none',
        transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease',
      }}
    >
      {/* Mobile View Toggle */}
      <div className="md:hidden flex items-center justify-between px-4 py-2.5 bg-[#F4ECE0] border-b border-black/15 text-xs font-mono font-bold">
        <span className="text-[#3F6253]">
          {spread.tagLeft}
        </span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMobileTab('overview');
            }}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors min-h-[32px] ${
              mobileTab === 'overview' ? 'bg-[#222B31] text-white' : 'bg-black/10 text-[#1C1512]'
            }`}
          >
            Overview
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMobileTab('details');
            }}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors min-h-[32px] ${
              mobileTab === 'details' ? 'bg-[#222B31] text-white' : 'bg-black/10 text-[#1C1512]'
            }`}
          >
            Methodology
          </button>
        </div>
      </div>

      {/* Two-Page Spread Container with Center Spine Shadow */}
      <div className="relative p-6 sm:p-8 md:p-10 book-spine">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative">
          
          {/* ================= LEFT SPREAD ================= */}
          <div
            className={`flex flex-col justify-between space-y-5 ${
              mobileTab === 'details' ? 'hidden md:flex' : 'flex'
            }`}
          >
            {/* Left Page Header */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono text-[#1C1512] pb-2 border-b border-black/10 uppercase tracking-wider mb-3.5 font-bold">
                <span className="text-[#7E9387]">{spread.tagLeft}</span>
                <span className="text-[#3F6253]">Overview</span>
              </div>

              {/* Project Title Box */}
              <div className="w-fit max-w-full px-4 py-2 bg-[#222B31] text-[#FAF6EF] rounded-lg text-sm sm:text-base font-display font-bold shadow-sm mb-3.5">
                <h3>{spread.title}</h3>
              </div>

              {/* Two Text Columns in EB Garamond */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm sm:text-base font-serif text-[#3B2F2A] leading-relaxed">
                <p className="border-l sm:border-l-0 sm:border-r border-black/10 pl-2 sm:pl-0 sm:pr-3">
                  {spread.leftColumns[0]}
                </p>
                <p className="pl-2 sm:pl-1">
                  {spread.leftColumns[1]}
                </p>
              </div>
            </div>

            {/* Left Page Dashboard Mockup */}
            <div className="pt-2">
              <ProjectMockup
                type={spread.mockupType}
                screenshotUrl={spread.screenshotUrl}
                screenshotAlt={spread.screenshotAlt}
                title={spread.title}
              />
            </div>
          </div>

          {/* ================= RIGHT SPREAD ================= */}
          <div
            className={`flex flex-col justify-between space-y-5 ${
              mobileTab === 'overview' ? 'hidden md:flex' : 'flex'
            }`}
          >
            {/* Right Page Header */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono text-[#1C1512] pb-2 border-b border-black/10 uppercase tracking-wider mb-3.5 font-bold">
                <span className="text-[#3F6253]">{spread.tagRight}</span>
                <span className="text-[#7E9387]">Implementation</span>
              </div>

              {/* Two Text Columns in EB Garamond */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm sm:text-base font-serif text-[#3B2F2A] leading-relaxed mb-4">
                <p className="border-l sm:border-l-0 sm:border-r border-black/10 pl-2 sm:pl-0 sm:pr-3">
                  {spread.rightColumns[0]}
                </p>
                <p className="pl-2 sm:pl-1">
                  {spread.rightColumns[1]}
                </p>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {spread.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-white border border-black/15 text-xs font-mono font-bold text-[#1C1512] shadow-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Page Metric Tiles: Factual from Project Description */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {/* Tile 1 */}
              <div className="h-28 rounded-xl bg-[#3F6253] text-white p-3.5 flex flex-col justify-between shadow-sm">
                <span className="text-[10px] font-mono tracking-wider uppercase font-bold text-slate-200">
                  SPECIFICATION
                </span>
                <span className="font-display font-extrabold text-xl leading-tight">
                  {spread.leftTile}
                </span>
                <span className="text-[10px] font-mono text-slate-200 font-semibold flex items-center gap-1">
                  <Check className="w-3 h-3 text-[#22D3EE]" />
                  <span>Analytical Focus</span>
                </span>
              </div>

              {/* Tile 2 */}
              <div className="h-28 rounded-xl bg-[#222B31] text-[#FAF6EF] p-3.5 flex flex-col justify-between shadow-sm">
                <span className="text-[10px] font-mono tracking-wider uppercase font-bold text-slate-300">
                  SYSTEM CAPABILITY
                </span>
                <span className="font-display font-extrabold text-xl leading-tight">
                  {spread.rightTile}
                </span>
                <span className="text-[10px] font-mono text-slate-300 font-semibold flex items-center gap-1">
                  <Check className="w-3 h-3 text-[#22D3EE]" />
                  <span>Model Evaluation</span>
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Spread Footer Bar */}
        <div className="mt-6 pt-3.5 border-t border-black/10 flex items-center justify-between text-xs font-mono text-[#1C1512] font-bold">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded bg-white border border-black/15 text-[#3F6253]">
              {spread.tagLeft}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[#222B31] font-extrabold group-hover:text-[#3F6253] transition-colors">
            <span>Read case study</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedSpread, setSelectedSpread] = useState(null);
  const scrollContainerRef = useRef(null);

  const filteredProjects =
    activeFilter === 'All'
      ? EDITORIAL_PROJECTS
      : EDITORIAL_PROJECTS.filter((p) => p.categories.includes(activeFilter));

  const handleScroll = (direction) => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = scrollContainerRef.current.clientWidth * 0.85;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="projects" className="py-20 relative bg-transparent scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Eyebrow Header */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[var(--border-hairline)]">
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[var(--sage-accent)] uppercase">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--sage-accent)]" />
            <span>PROJECTS</span>
          </div>
          <div className="text-xs font-mono font-bold text-[var(--text-page-muted)] tracking-wider uppercase">
            FEATURED CASE STUDIES
          </div>
        </div>

        {/* Section Headline */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-[var(--text-page)] tracking-tight">
              Featured Projects
            </h2>
            <p className="mt-2 text-base sm:text-lg font-serif text-[var(--text-page-muted)] max-w-2xl">
              Flagship analytics and machine learning systems presented as detailed case studies. Click any card to read the complete breakdown.
            </p>
          </div>

          {/* Carousel Navigation Buttons on Desktop */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => handleScroll('left')}
              className="p-2.5 rounded-xl bg-[#FAF6EF] text-[#1C1512] border border-black/15 shadow-sm hover:bg-white transition-colors"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-2.5 rounded-xl bg-[#FAF6EF] text-[#1C1512] border border-black/15 shadow-sm hover:bg-white transition-colors"
              aria-label="Next project"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-10 overflow-x-auto pb-2 no-scrollbar">
          <div className="inline-flex items-center gap-1.5 p-1.5 rounded-xl bg-[#FAF6EF] border border-black/15 shadow-sm">
            {PROJECT_FILTERS.map((tab) => {
              const isActive = activeFilter === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider font-extrabold transition-all duration-200 whitespace-nowrap min-h-[40px] ${
                    isActive
                      ? 'bg-[#222B31] text-[#FAF6EF] shadow-sm'
                      : 'text-[#1C1512] hover:bg-black/5'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Horizontal Scroll Gallery on Desktop / Swipeable Snap on Mobile */}
        <div
          ref={scrollContainerRef}
          className="flex flex-col lg:flex-row lg:overflow-x-auto lg:snap-x lg:snap-mandatory gap-8 pb-4 no-scrollbar scroll-smooth"
        >
          <AnimatePresence>
            {filteredProjects.map((spread) => (
              <div
                key={spread.id}
                className="w-full lg:min-w-[950px] lg:max-w-[1000px] lg:snap-center flex-shrink-0"
              >
                <OpenBookSpreadCard
                  spread={spread}
                  onOpenSpread={(s) => setSelectedSpread(s)}
                />
              </div>
            ))}
          </AnimatePresence>
        </div>

        {/* Full-Screen Case Study Modal */}
        <CaseStudyModal
          spread={selectedSpread}
          isOpen={Boolean(selectedSpread)}
          onClose={() => setSelectedSpread(null)}
          onSelectSpread={(s) => setSelectedSpread(s)}
        />

      </div>
    </section>
  );
}
