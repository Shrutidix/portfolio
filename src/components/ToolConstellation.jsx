import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, Lightbulb } from 'lucide-react';
import { TOOL_CATEGORIES_CONSTELLATION, CURRENTLY_EXPLORING } from '../content';

export default function ToolConstellation() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [hoveredTool, setHoveredTool] = useState(null);

  return (
    <section id="constellation" className="py-16 relative bg-transparent scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[var(--border-hairline)]">
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[var(--sage-accent)] uppercase">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--sage-accent)]" />
            <span>TOOL CONSTELLATION</span>
          </div>
          <div className="text-xs font-mono font-bold text-[var(--text-page-muted)] tracking-wider uppercase">
            COMPETENCY GRAPH
          </div>
        </div>

        {/* Main Card Container */}
        <div className="rounded-2xl bg-[#FAF6EF] text-[#1C1512] shadow-book border border-black/15 p-6 sm:p-10 relative overflow-hidden">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-black/15">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#3F6253] font-bold block mb-1">
                INTERCONNECTED STACKS
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#1C1512]">
                Tool Constellation &amp; Workflows
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#7E9387] font-semibold bg-white px-3 py-1.5 rounded-lg border border-black/10">
              <Compass className="w-4 h-4 text-[#3F6253]" />
              <span>Hover Hubs to Highlight</span>
            </div>
          </div>

          {/* Constellation Grid: 5 Core Hubs */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
            {TOOL_CATEGORIES_CONSTELLATION.map((hub) => {
              const isHubActive = activeCategory === hub.id;
              return (
                <div
                  key={hub.id}
                  onMouseEnter={() => setActiveCategory(hub.id)}
                  onMouseLeave={() => setActiveCategory(null)}
                  className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isHubActive
                      ? 'bg-[#222B31] text-[#FAF6EF] border-[#22D3EE] shadow-lg -translate-y-1'
                      : 'bg-white text-[#1C1512] border-black/15 hover:border-black/30 shadow-xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: hub.color }}
                      />
                      <span className="text-[10px] font-mono font-bold opacity-60">
                        {hub.tools.length} NODES
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-base mb-3 leading-snug">
                      {hub.category}
                    </h4>

                    {/* Nodes inside Category */}
                    <div className="space-y-1.5">
                      {hub.tools.map((t, idx) => {
                        const isToolHovered = hoveredTool === t;
                        return (
                          <div
                            key={idx}
                            onMouseEnter={(e) => {
                              e.stopPropagation();
                              setHoveredTool(t);
                            }}
                            onMouseLeave={(e) => {
                              e.stopPropagation();
                              setHoveredTool(null);
                            }}
                            className={`text-xs font-mono px-2 py-1 rounded transition-colors flex items-center gap-1.5 truncate ${
                              isToolHovered
                                ? 'bg-white/20 text-[#22D3EE] font-bold'
                                : isHubActive
                                ? 'text-slate-200'
                                : 'text-[#53453E] hover:bg-black/5'
                            }`}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ backgroundColor: hub.color }}
                            />
                            <span className="truncate">{t}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-4 pt-2 border-t border-black/10 text-[9px] font-mono uppercase tracking-wider opacity-60 font-semibold">
                    ANALYTICS PIPELINE
                  </div>
                </div>
              );
            })}
          </div>

          {/* Currently Learning / Exploring Strip */}
          <div className="p-5 sm:p-6 rounded-xl bg-white border border-black/15 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-[#FFB020]" />
              <span className="text-xs font-mono uppercase tracking-wider text-[#3F6253] font-bold">
                Currently Learning &amp; Exploring
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {CURRENTLY_EXPLORING.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg bg-[#FAF6EF] border border-black/10 flex flex-col justify-between"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#3F6253]" />
                    <span className="font-display font-bold text-sm text-[#1C1512]">
                      {item.topic}
                    </span>
                  </div>
                  <p className="font-serif text-xs text-[#53453E] leading-relaxed">
                    {item.context}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Marker */}
          <div className="mt-6 pt-3 border-t border-black/15 flex items-center justify-between text-xs font-mono text-[#1C1512] font-bold">
            <span className="text-[#3F6253]">Competency Mapping</span>
            <span className="text-[#7E9387]">Skills Ecosystem</span>
          </div>

        </div>

      </div>
    </section>
  );
}
