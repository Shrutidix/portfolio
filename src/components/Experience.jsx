import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Calendar, MapPin, Sparkles } from 'lucide-react';
import { EXPERIENCE_ITEM } from '../content';

export default function Experience() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  // Scroll-linked progress for timeline line and glowing node
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const nodeTop = useTransform(scrollYProgress, [0, 1], ['0%', '95%']);

  return (
    <section id="experience" className="py-20 relative bg-transparent scroll-mt-28" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Eyebrow Header */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[var(--border-hairline)]">
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[var(--sage-accent)] uppercase">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--sage-accent)]" />
            <span>EXPERIENCE</span>
          </div>
          <div className="text-xs font-mono font-bold text-[var(--text-page-muted)] tracking-wider uppercase">
            CAREER CHRONICLE
          </div>
        </div>

        {/* Large Cream Paper Container with Solid Dark Text */}
        <div className="rounded-2xl bg-[#FAF6EF] text-[#1C1512] shadow-book border border-black/15 p-6 sm:p-10 md:p-12 relative overflow-hidden">
          
          {/* Top Page Header */}
          <div className="pb-5 border-b border-black/15 mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-[#3F6253] font-bold block mb-1">
              EXPERIENCE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-[#1C1512] tracking-tight">
              Experience
            </h2>
          </div>

          {/* Timeline with Self-Drawing Line & Glowing Node */}
          <div className="relative pl-7 sm:pl-10">
            
            {/* Timeline Track Line */}
            <div className="absolute left-2.5 sm:left-3 top-3 bottom-6 w-[2px] bg-black/10 overflow-hidden">
              <motion.div
                style={{ height: lineHeight }}
                className="w-full bg-[#3F6253]"
              />
            </div>

            {/* Glowing Node that follows scroll */}
            <motion.div
              style={{ top: nodeTop }}
              className="absolute left-0.5 sm:left-1 w-5 h-5 rounded-full bg-[#222B31] border-2 border-[#FAF6EF] shadow-md flex items-center justify-center z-10"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
            </motion.div>

            {/* Experience Card */}
            <div className="p-6 sm:p-8 rounded-xl bg-white border border-black/15 shadow-sm space-y-5">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/10 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#222B31] text-white text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
                    <Sparkles className="w-3 h-3 text-[#22D3EE]" />
                    <span>{EXPERIENCE_ITEM.badge}</span>
                  </div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-[#1C1512]">
                    {EXPERIENCE_ITEM.role}
                  </h3>
                  <div className="text-sm font-mono text-[#3F6253] font-bold mt-0.5">
                    {EXPERIENCE_ITEM.company}
                  </div>
                </div>

                <div className="text-xs font-mono text-[#1C1512] flex flex-col sm:items-end gap-1.5 font-bold">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#3F6253]" />
                    {EXPERIENCE_ITEM.period}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#3F6253]" />
                    {EXPERIENCE_ITEM.location}
                  </span>
                </div>
              </div>

              {/* Responsibilities with Staggered Framer Motion Bullets */}
              <div className="space-y-3 pt-1">
                <span className="text-xs font-mono uppercase tracking-wider text-[#3F6253] font-bold block">
                  KEY RESPONSIBILITIES &amp; TECHNICAL DELIVERABLES
                </span>
                <ul className="space-y-3">
                  {EXPERIENCE_ITEM.bullets.map((bullet, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.45, delay: 0.15 * idx, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-start gap-3 font-serif text-base text-[#3B2F2A] leading-relaxed"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#3F6253] mt-2 flex-shrink-0" />
                      <span>{bullet}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Technologies Applied */}
              <div className="pt-3 border-t border-black/10 flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-mono uppercase tracking-wider text-[#1C1512] font-bold mr-1">
                  TOOLS APPLIED:
                </span>
                {EXPERIENCE_ITEM.stack.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-[#FAF6EF] border border-black/15 text-xs font-mono font-bold text-[#1C1512]"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Architectural Technical Schematic: Transformer & Attention Matrix */}
              <div className="pt-4 border-t border-black/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#3F6253] font-bold">
                    TRANSFORMER &amp; MULTI-HEAD ATTENTION SCHEMATIC
                  </span>
                  <span className="text-[10px] font-mono text-[#7E9387]">
                    IBM GENAI ARCHITECTURE
                  </span>
                </div>
                <div className="rounded-xl overflow-hidden border border-black/15 bg-[#171B1E] p-2 sm:p-4 shadow-inner group">
                  <img
                    src="./images/transformer-network.svg"
                    alt="Transformer Attention Architecture Diagram for IBM Generative AI Internship"
                    className="w-full h-auto max-h-56 object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.01]"
                    width="800"
                    height="320"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="mt-2 text-center text-[10px] font-mono text-white/50 tracking-wider">
                    ATTENTION MATRIX &bull; ENCODER-DECODER MAPPINGS &bull; HUGGING FACE &amp; TENSORFLOW WORKFLOW
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Footer Marker */}
          <div className="mt-8 pt-4 border-t border-black/15 flex items-center justify-between text-xs font-mono text-[#1C1512] font-bold">
            <span>Shruti Dixit</span>
            <span>Professional Internship Record</span>
          </div>

        </div>

      </div>
    </section>
  );
}
