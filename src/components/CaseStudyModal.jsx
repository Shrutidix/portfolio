import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Sparkles } from 'lucide-react';
import ProjectMockup from './ProjectMockup';
import { PERSONAL_INFO, EDITORIAL_PROJECTS } from '../content';

export default function CaseStudyModal({ spread, isOpen, onClose, onSelectSpread }) {
  const [currentPage, setCurrentPage] = useState(1);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !spread) return null;

  // Find index of current project and get next project
  const currentIndex = EDITORIAL_PROJECTS.findIndex((p) => p.id === spread.id);
  const nextProject =
    EDITORIAL_PROJECTS[(currentIndex + 1) % EDITORIAL_PROJECTS.length];

  const handleNextProject = () => {
    if (onSelectSpread && nextProject) {
      onSelectSpread(nextProject);
      setCurrentPage(1);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window: High-Contrast Case Study */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-5xl max-h-[92vh] bg-[#FAF6EF] text-[#1C1512] rounded-2xl shadow-2xl border border-black/20 flex flex-col overflow-hidden z-10"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#F4ECE0] border-b border-black/15">
            <div className="flex items-center gap-3">
              <div className="px-2.5 py-1 rounded bg-[#222B31] text-[#FAF6EF] text-xs font-mono font-bold tracking-wider uppercase">
                CASE STUDY
              </div>
              <span className="font-display font-bold text-base sm:text-lg text-[#1C1512] truncate max-w-md">
                {spread.title}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Mobile View Toggle */}
              <div className="flex md:hidden items-center gap-1 text-xs font-mono">
                <button
                  onClick={() => setCurrentPage(1)}
                  className={`px-3 py-1 rounded font-bold ${
                    currentPage === 1
                      ? 'bg-[#222B31] text-[#FAF6EF]'
                      : 'bg-black/10 text-[#1C1512]'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setCurrentPage(2)}
                  className={`px-3 py-1 rounded font-bold ${
                    currentPage === 2
                      ? 'bg-[#222B31] text-[#FAF6EF]'
                      : 'bg-black/10 text-[#1C1512]'
                  }`}
                >
                  Methodology
                </button>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-black/10 text-[#1C1512] transition-colors focus:outline-none"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Body: Open-Book 2-Page Layout with EB Garamond Typography */}
          <div className="overflow-y-auto flex-1 p-6 sm:p-8 md:p-10 select-text">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative book-spine">
              
              {/* Center Divider on Desktop */}
              <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-[1px] -translate-x-1/2 bg-black/10 pointer-events-none" />

              {/* ================= OVERVIEW SECTION ================= */}
              <div className={`space-y-6 ${currentPage === 2 ? 'hidden md:block' : 'block'}`}>
                <div className="flex justify-between items-center text-xs font-mono text-[#1C1512] pb-2 border-b border-black/10 uppercase font-bold">
                  <span>{spread.tagLeft}</span>
                  <span className="text-[#3F6253]">Overview</span>
                </div>

                <div className="w-fit px-4 py-2 bg-[#222B31] text-[#FAF6EF] rounded-lg text-base sm:text-lg font-display font-bold shadow-sm">
                  {spread.title}
                </div>

                {/* Problem Statement */}
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#3F6253] font-bold block">
                    Problem Statement
                  </span>
                  <p className="font-serif text-base sm:text-lg text-[#3B2F2A] leading-relaxed">
                    {spread.caseStudy.problem}
                  </p>
                </div>

                {/* Methodology & Architecture */}
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#3F6253] font-bold block">
                    Methodology &amp; Architecture
                  </span>
                  <p className="font-serif text-base sm:text-lg text-[#3B2F2A] leading-relaxed">
                    {spread.caseStudy.approach}
                  </p>
                </div>

                {/* Mockup Preview on Left Page */}
                <div className="pt-2">
                  <ProjectMockup
                    type={spread.mockupType}
                    screenshotUrl={spread.screenshotUrl}
                    screenshotAlt={spread.screenshotAlt}
                    title={spread.title}
                  />
                </div>
              </div>

              {/* ================= METHODOLOGY SECTION ================= */}
              <div className={`space-y-6 ${currentPage === 1 ? 'hidden md:block' : 'block'}`}>
                <div className="flex justify-between items-center text-xs font-mono text-[#1C1512] pb-2 border-b border-black/10 uppercase font-bold">
                  <span>{spread.tagRight}</span>
                  <span className="text-[#3F6253]">Implementation</span>
                </div>

                {/* Implementation & Tools */}
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#3F6253] font-bold block">
                    Implementation &amp; Tools
                  </span>
                  <p className="font-serif text-base sm:text-lg text-[#3B2F2A] leading-relaxed">
                    {spread.caseStudy.build}
                  </p>

                  {/* Tech Stack */}
                  <div className="pt-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#7E9387] font-bold block mb-1.5">
                      Tech Stack
                    </span>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {spread.tech.map((t, idx) => (
                        <div
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#222B31] text-[#FAF6EF] text-xs font-mono font-bold shadow-xs hover:bg-black transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]" />
                          <span>{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Business Impact & Outcome */}
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#3F6253] font-bold block">
                    Business Impact &amp; Outcome
                  </span>
                  <p className="font-serif text-base sm:text-lg text-[#3B2F2A] leading-relaxed">
                    {spread.caseStudy.outcome}
                  </p>
                </div>

                {/* What I'd improve next */}
                {Boolean(spread.caseStudy?.whatIdImproveNext && spread.caseStudy.whatIdImproveNext.trim().length > 0) && (
                  <div className="p-4 rounded-xl bg-white border border-[#7E9387]/40 shadow-xs space-y-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#3F6253] font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
                      <span>Next Iteration Focus</span>
                    </span>
                    <p className="font-serif text-sm text-[#3B2F2A] leading-relaxed">
                      {spread.caseStudy.whatIdImproveNext}
                    </p>
                  </div>
                )}

                {/* Metric Tiles */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="h-28 rounded-xl bg-[#3F6253] text-white p-3.5 flex flex-col justify-between shadow-sm">
                    <span className="text-[10px] font-mono uppercase text-slate-200 font-bold">
                      Specification
                    </span>
                    <span className="font-display font-extrabold text-lg sm:text-xl leading-tight">
                      {spread.leftTile}
                    </span>
                    <span className="text-[10px] font-mono text-slate-200">
                      Analytical Focus
                    </span>
                  </div>

                  <div className="h-28 rounded-xl bg-[#222B31] text-[#FAF6EF] p-3.5 flex flex-col justify-between shadow-sm">
                    <span className="text-[10px] font-mono uppercase text-slate-300 font-bold">
                      Validation
                    </span>
                    <span className="font-display font-extrabold text-lg sm:text-xl leading-tight">
                      {spread.rightTile}
                    </span>
                    <span className="text-[10px] font-mono text-slate-300">
                      Model Evaluation
                    </span>
                  </div>
                </div>

                {/* Next Project Button */}
                <div className="pt-4 border-t border-black/10 flex items-center justify-between">
                  <div className="text-xs font-mono text-[#53453E]">
                    Next Project: <strong className="text-[#1C1512]">{nextProject.shortTitle}</strong>
                  </div>
                  <button
                    onClick={handleNextProject}
                    className="px-4 py-2 rounded-xl bg-[#222B31] hover:bg-black text-[#FAF6EF] text-xs font-mono font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    <span>Next Project</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#22D3EE]" />
                  </button>
                </div>

              </div>

            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-3 bg-[#F4ECE0] border-t border-black/15 flex items-center justify-between text-xs font-mono text-[#1C1512] font-bold">
            <span>Shruti Dixit &bull; Data Analyst</span>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="text-[#222B31] hover:text-[#3F6253] underline font-extrabold flex items-center gap-1"
            >
              View on GitHub &rarr;
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
