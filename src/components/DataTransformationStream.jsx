import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Database, Filter, CheckCircle2, ArrowRight, Sparkles, TrendingUp, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  {
    stage: '01',
    tag: 'INPUT STREAM',
    title: 'Raw Data Ingestion',
    subtitle: 'Consolidating disparate inputs into verified structures',
    icon: Database,
    accent: '#22D3EE',
    bg: '#1C2328',
    details: [
      'Relational transactional tables (PostgreSQL, MySQL)',
      'Unstructured survey text and external CSV feeds',
      'Automated schema type-casting and missing value profiling'
    ],
    metric: '100% Ingestion Fidelity'
  },
  {
    stage: '02',
    tag: 'ANALYTICAL ENGINE',
    title: 'Insight Discovery',
    subtitle: 'Statistical modeling, feature extraction & NLP mining',
    icon: Cpu,
    accent: '#7E9387',
    bg: '#253028',
    details: [
      'Feature engineering and dimensional reduction',
      'TF-IDF n-gram classification & SHAP explainability',
      'DAX measures, star schema relationships & KPI modeling'
    ],
    metric: 'Statistical Rigor'
  },
  {
    stage: '03',
    tag: 'EXECUTIVE ACTION',
    title: 'Decision Enablement',
    subtitle: 'Turning patterns into quantifiable business interventions',
    icon: TrendingUp,
    accent: '#E6C687',
    bg: '#2A241C',
    details: [
      'Interactive Power BI executive dashboards',
      'Proactive retention alerts and risk stratification',
      'Repeatable, documented analytics pipelines'
    ],
    metric: 'Actionable ROI'
  }
];

export default function DataTransformationStream() {
  const containerRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 20%',
        end: 'bottom 80%',
        onUpdate: (self) => {
          const progress = self.progress;
          const step = Math.min(2, Math.floor(progress * 3));
          setActiveStep(step);
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-16 relative overflow-hidden bg-transparent select-none"
      aria-label="Data to Decision Pipeline"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-[var(--border-hairline)] gap-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[var(--sage-accent)] uppercase mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--sage-accent)]" />
              <span>DATA TRANSFORMATION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-[var(--text-page)]">
              Raw Data &rarr; Insight &rarr; Decision
            </h2>
          </div>
          <div className="text-xs font-mono text-[var(--text-page-muted)]">
            Analytical Pipeline Methodology
          </div>
        </div>

        {/* 3 Step Sequence Grid */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {STAGES.map((s, index) => {
            const Icon = s.icon;
            const isActive = activeStep === index;
            return (
              <div
                key={s.title}
                className={`rounded-2xl p-6 sm:p-7 border transition-all duration-500 flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#FAF6EF] text-[#1C1512] shadow-2xl scale-[1.02] border-white/40'
                    : 'bg-[#FAF6EF]/90 text-[#1C1512] border-black/15 opacity-90 hover:opacity-100 hover:shadow-lg'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-black/10 mb-4">
                    <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-[#3F6253]">
                      {s.tag}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#222B31] text-[#FAF6EF] flex items-center justify-center shadow-sm">
                      <Icon className="w-4 h-4 text-[#22D3EE]" />
                    </div>
                  </div>

                  <h3 className="text-xl font-display font-extrabold text-[#1C1512] mb-1">
                    {s.title}
                  </h3>
                  <p className="text-xs font-sans text-[#53453E] mb-5 leading-relaxed">
                    {s.subtitle}
                  </p>

                  <div className="space-y-2.5">
                    {s.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-xs font-mono text-[#2B231F]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#3F6253] mt-0.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between text-xs font-mono font-bold text-[#3F6253]">
                  <span>{s.metric}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#3F6253]" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
