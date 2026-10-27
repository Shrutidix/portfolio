import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, BarChart3, Code2, BrainCircuit, Wrench, Sparkles, RotateCw } from 'lucide-react';
import { SKILL_FLIP_CARDS, ALL_SKILL_TAGS, SKILL_CATEGORIES } from '../content';

function getCategoryIcon(id) {
  switch (id) {
    case 'databases':
      return <Database className="w-5 h-5 text-[#3F6253]" />;
    case 'bi':
      return <BarChart3 className="w-5 h-5 text-[#3F6253]" />;
    case 'programming':
      return <Code2 className="w-5 h-5 text-[#3F6253]" />;
    case 'aiml':
      return <BrainCircuit className="w-5 h-5 text-[#3F6253]" />;
    case 'tools':
      return <Wrench className="w-5 h-5 text-[#3F6253]" />;
    default:
      return <Sparkles className="w-5 h-5 text-[#3F6253]" />;
  }
}

// 3D Flip Card Component with Hover Lift
function SkillFlipCard({ card }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="flip-card group perspective-1000 h-[320px] w-full cursor-pointer select-none"
      onClick={() => setIsFlipped(!isFlipped)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsFlipped(!isFlipped);
        }
      }}
      aria-label={`${card.title}. Tap or click to flip.`}
    >
      <div
        style={{ transformStyle: 'preserve-3d', WebkitTransformStyle: 'preserve-3d' }}
        className={`relative w-full h-full duration-700 transform-style-3d transition-all group-hover:-translate-y-1.5 ${
          isFlipped ? 'rotate-y-180' : 'group-hover:[@media(hover:hover)]:rotate-y-180'
        }`}
      >
        {/* FRONT FACE: Cream Card */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#FFFFFF',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
          className="absolute inset-0 backface-hidden rounded-2xl bg-white text-[#1C1512] border border-black/15 shadow-md p-6 flex flex-col justify-between overflow-hidden"
        >
          {/* Top Marker */}
          <div>
            <div className="flex justify-between items-start mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF6EF] border border-black/15 flex items-center justify-center shadow-sm">
                {getCategoryIcon(card.id)}
              </div>
              <span className="text-xs font-mono tracking-wider text-[#3F6253] uppercase font-bold">
                {card.skills.length} Skills
              </span>
            </div>

            <h3 className="font-display font-bold text-xl text-[#1C1512] mt-1 leading-snug">
              {card.title}
            </h3>
          </div>

          {/* Quick Preview Bullets: 3 Sample Skills */}
          <div className="space-y-2 my-auto">
            {card.skills.slice(0, 3).map((s, idx) => (
              <div key={idx} className="text-xs font-mono font-bold text-[#1C1512] flex items-center gap-2 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3F6253]" />
                <span className="truncate">{s}</span>
              </div>
            ))}
          </div>

          {/* Card Footer with Small Rotate Icon */}
          <div className="pt-3 border-t border-black/10 flex items-center justify-between text-xs font-mono text-[#1C1512] font-bold">
            <span className="text-[#7E9387]">Flip Card</span>
            <span className="flex items-center gap-1.5 text-[#222B31] group-hover:text-[#3F6253]">
              <RotateCw className="w-3.5 h-3.5 text-[#3F6253]" />
              <span>Details</span>
            </span>
          </div>
        </div>

        {/* BACK FACE: Competency Pills */}
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
          }}
          className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl bg-[#FAF6EF] text-[#1C1512] border-2 border-[#222B31] shadow-xl p-6 flex flex-col justify-between overflow-hidden"
        >
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-black/10 text-xs font-mono text-[#3F6253] font-bold">
              <span>Competencies</span>
              <span>{card.skills.length} Tools</span>
            </div>

            <h3 className="font-display font-bold text-base text-[#1C1512] mt-2.5 mb-3">
              {card.title}
            </h3>

            {/* Pills */}
            <div className="flex flex-wrap gap-1.5 overflow-y-auto max-h-[175px] pr-1">
              {card.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-[#222B31] text-white text-xs font-mono font-bold leading-tight"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-black/10 text-center text-xs font-mono text-[#3F6253] font-bold flex items-center justify-center gap-1.5">
            <RotateCw className="w-3 h-3" />
            <span>Click to flip front</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // Filter tags according to active filter
  const displayedTags =
    activeCategoryFilter === 'all'
      ? ALL_SKILL_TAGS
      : ALL_SKILL_TAGS.filter((t) => t.category === activeCategoryFilter);

  return (
    <section id="skills" className="py-20 relative bg-transparent scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Eyebrow Header */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[var(--border-hairline)]">
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[var(--sage-accent)] uppercase">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--sage-accent)]" />
            <span>SKILLS &amp; TOOLS</span>
          </div>
          <div className="text-xs font-mono font-bold text-[var(--text-page-muted)] tracking-wider uppercase">
            TECHNICAL COMPETENCIES
          </div>
        </div>

        {/* Section Headline */}
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-[var(--text-page)] tracking-tight">
            Skills &amp; Tools
          </h2>
          <p className="mt-2 text-base sm:text-lg font-serif text-[var(--text-page-muted)] max-w-2xl">
            Core competencies spanning databases, business intelligence, data science, machine learning and developer tools. Tap any card to flip.
          </p>
        </div>

        {/* Five Flip Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          {SKILL_FLIP_CARDS.map((card) => (
            <SkillFlipCard key={card.id} card={card} />
          ))}
        </div>

        {/* Dynamic Skill Roster with Filter Chips & Staggered Cascade */}
        <div className="rounded-2xl bg-[#FAF6EF] text-[#1C1512] border border-black/15 p-6 sm:p-8 shadow-book">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-black/15">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#3F6253] font-bold block mb-1">
                COMPREHENSIVE ROSTER
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-[#1C1512]">
                Technologies &amp; Analytical Methods
              </h3>
            </div>

            {/* Category Filter Chips that re-flow tags with layout animation */}
            <div className="flex flex-wrap gap-1.5">
              {SKILL_CATEGORIES.map((cat) => {
                const isActive = activeCategoryFilter === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategoryFilter(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all duration-200 uppercase tracking-wider ${
                      isActive
                        ? 'bg-[#222B31] text-[#FAF6EF] shadow-sm'
                        : 'bg-white text-[#1C1512] border border-black/15 hover:border-black/40'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Staggered Tag Roster with Magnetic Pull on Hover */}
          <motion.div layout className="flex flex-wrap gap-2 sm:gap-2.5">
            <AnimatePresence mode="popLayout">
              {displayedTags.map((tag, idx) => {
                const isCategoryHighlighted = hoveredCategory
                  ? tag.category === hoveredCategory
                  : true;
                const isHovered = hoveredCategory === tag.category;

                return (
                  <motion.div
                    key={tag.name}
                    layout
                    initial={{ opacity: 0, scale: 0.85, y: 15 }}
                    animate={{
                      opacity: isCategoryHighlighted ? 1 : 0.4,
                      scale: 1,
                      y: 0,
                    }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{
                      duration: 0.35,
                      delay: idx * 0.015,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    onMouseEnter={() => setHoveredCategory(tag.category)}
                    onMouseLeave={() => setHoveredCategory(null)}
                    className={`cursor-pointer px-3.5 py-1.5 rounded-lg font-mono text-xs font-bold tracking-wide transition-all duration-200 select-none ${
                      isHovered
                        ? 'bg-[#222B31] text-[#FAF6EF] shadow-md shadow-[#7E9387]/20 -translate-y-1'
                        : 'bg-white text-[#1C1512] border border-black/15 hover:border-black/40'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isHovered ? 'bg-[#22D3EE]' : 'bg-[#3F6253]'
                        }`}
                      />
                      <span>{tag.name}</span>
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          <div className="mt-8 pt-3 border-t border-black/15 flex items-center justify-between text-xs font-mono text-[#1C1512] font-bold">
            <span className="text-[#3F6253]">Core Competencies</span>
            <span className="text-[#7E9387]">Proficiency Applied in Case Studies</span>
          </div>

        </div>

      </div>
    </section>
  );
}
