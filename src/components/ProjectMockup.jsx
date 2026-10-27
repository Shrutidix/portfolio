import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { UploadCloud, FileSpreadsheet, GitFork, Check, ArrowRight, Filter, Search, Layers, LayoutDashboard, Cpu } from 'lucide-react';

export default function ProjectMockup({ type, screenshotUrl, screenshotAlt, title }) {
  const [viewMode, setViewMode] = useState(screenshotUrl ? 'graphic' : 'interactive');

  // 3D Tilt on hover for laptop/browser mockup frame
  const frameRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.1 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);

  const handleMouseMove = (e) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // If user is in graphic view and screenshotUrl is available, show the graphic
  if (screenshotUrl && viewMode === 'graphic') {
    return (
      <motion.div
        ref={frameRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="w-full rounded-xl overflow-hidden border border-[#323E45] shadow-lg bg-[#141A1E] transition-transform duration-300"
      >
        {/* Browser Frame Titlebar with Mode Toggle */}
        <div className="flex items-center justify-between px-3.5 py-2 bg-[#101518] border-b border-slate-700/60">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="ml-2 text-[10px] font-mono text-slate-300 truncate max-w-[200px]">
              {title}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setViewMode('interactive')}
              className="px-2 py-0.5 rounded bg-[#1E252A] hover:bg-[#2B353C] text-[9px] font-mono text-[#22D3EE] border border-slate-700 flex items-center gap-1 transition-colors"
              aria-label="Switch to interactive UI simulation"
            >
              <Cpu className="w-2.5 h-2.5" />
              <span>Interactive View</span>
            </button>
            <span className="text-[9px] font-mono text-slate-400 hidden sm:inline">HIGH-RES DASHBOARD</span>
          </div>
        </div>
        <div className="w-full min-h-[220px] sm:min-h-[260px] p-2 bg-[#12171A] flex items-center justify-center overflow-hidden">
          <img
            src={screenshotUrl}
            alt={screenshotAlt || title || "Project Screenshot"}
            className="w-full h-auto max-h-[380px] object-contain rounded-lg shadow-sm"
            loading="lazy"
            width="800"
            height="480"
          />
        </div>
        <div className="px-3 py-1.5 bg-[#0F1316] border-t border-slate-800 text-[8.5px] font-mono text-slate-400 flex items-center justify-between">
          <span className="flex items-center gap-1 text-emerald-400">
            <Check className="w-3 h-3 text-emerald-400" />
            <span>Verified System Architecture</span>
          </span>
          <button
            onClick={() => setViewMode('interactive')}
            className="text-[#22D3EE] hover:underline"
          >
            Explore Interactive Elements &rarr;
          </button>
        </div>
      </motion.div>
    );
  }

  // 1. AI-Driven Academic Risk & Student Retention System Mockup
  if (type === 'ml-dashboard') {
    return (
      <motion.div
        ref={frameRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="w-full rounded-xl overflow-hidden border border-[#323E45] shadow-lg bg-[#1E252A] text-slate-200 text-xs font-mono select-none"
      >
        {/* Streamlit Top App Frame Bar */}
        <div className="flex items-center justify-between px-3.5 py-2 bg-[#141A1E] border-b border-slate-700/60">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="ml-2 text-[10px] font-sans text-slate-300 font-medium">
              streamlit // academic-retention.streamlit.app
            </span>
          </div>
          <div className="flex items-center gap-2">
            {screenshotUrl && (
              <button
                onClick={() => setViewMode('graphic')}
                className="px-2 py-0.5 rounded bg-[#1E252A] hover:bg-[#2B353C] text-[9px] font-mono text-[#FFB020] border border-slate-700 flex items-center gap-1 transition-colors"
                aria-label="Switch back to high-res dashboard preview"
              >
                <LayoutDashboard className="w-2.5 h-2.5" />
                <span>Dashboard View</span>
              </button>
            )}
            <span className="text-[9px] px-2 py-0.5 rounded bg-violet-900/60 text-violet-300 border border-violet-700/50">
              5-Fold CV
            </span>
            <span className="text-[9px] text-[#22D3EE] hidden sm:inline">Port 8501</span>
          </div>
        </div>

        <div className="p-3.5 sm:p-4 space-y-3 bg-[#1E252A]">
          {/* Top Row: CSV Upload Box + Risk Category Bar Chart */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-stretch">
            
            {/* CSV Upload Box */}
            <div className="sm:col-span-5 p-2.5 rounded-lg border-2 border-dashed border-slate-700 bg-slate-900/80 flex flex-col items-center justify-center text-center space-y-1">
              <UploadCloud className="w-5 h-5 text-[#22D3EE]" />
              <div className="text-[10px] font-sans font-bold text-slate-200">
                Upload class_roster.csv
              </div>
              <div className="text-[8px] text-slate-400">
                Drag &amp; drop or click to browse
              </div>
              <div className="mt-1 px-2 py-0.5 rounded bg-[#222B31] text-[8px] text-slate-300 border border-slate-700 flex items-center gap-1">
                <FileSpreadsheet className="w-3 h-3 text-emerald-400" />
                <span>student_cohort_2026.csv (Ready)</span>
              </div>
            </div>

            {/* Risk-Category Distribution Bar Chart */}
            <div className="sm:col-span-7 p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[10px] font-sans mb-1.5">
                <span className="font-bold text-slate-300">Cohort Risk Distribution</span>
                <span className="text-[#22D3EE] text-[9px] font-mono">Classifier Output</span>
              </div>
              <div className="space-y-1.5">
                <div>
                  <div className="flex justify-between text-[9px] text-slate-400">
                    <span>Low Risk (On Track)</span>
                    <span className="text-emerald-400">68%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-[68%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[9px] text-slate-400">
                    <span>Medium Risk (Monitoring)</span>
                    <span className="text-amber-400">22%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full w-[22%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[9px] text-slate-400">
                    <span>High Risk (Intervention Needed)</span>
                    <span className="text-rose-400">10%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full w-[10%]" />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Row: SHAP Feature-Importance Bar Chart (Labelled "illustrative") */}
          <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-sans">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-200">SHAP Feature Importance</span>
                <span className="px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-800/60 text-[8px] font-mono uppercase font-bold">
                  illustrative
                </span>
              </div>
              <span className="text-[#22D3EE] text-[9px] font-mono">Mean(|SHAP value|)</span>
            </div>

            <div className="space-y-1 pt-0.5">
              <div>
                <div className="flex justify-between text-[9px] text-slate-400">
                  <span>Semester 1 GPA</span>
                  <span className="text-cyan-300">+0.38</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '84%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full bg-gradient-to-r from-[#7C5CFF] to-[#22D3EE]"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[9px] text-slate-400">
                  <span>Course Attendance %</span>
                  <span className="text-cyan-300">+0.29</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '68%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full bg-gradient-to-r from-[#7C5CFF] to-[#22D3EE]"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[9px] text-slate-400">
                  <span>Assignment Submission Rate</span>
                  <span className="text-cyan-300">+0.21</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '52%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full bg-gradient-to-r from-[#7C5CFF] to-[#22D3EE]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Ribbon */}
          <div className="flex items-center justify-between text-[8.5px] text-slate-400 border-t border-slate-800 pt-1.5">
            <span className="text-emerald-400 flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-400" />
              <span>RandomForest &bull; GradientBoosting Pipelines</span>
            </span>
            <span className="text-[#22D3EE] font-mono">STREAMLIT INTERACTION SIMULATION</span>
          </div>
        </div>
      </motion.div>
    );
  }

  // 2. Maven Market Power BI Executive Dashboard Mockup
  if (type === 'bi-dashboard') {
    return (
      <motion.div
        ref={frameRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="w-full rounded-xl overflow-hidden border border-[#323E45] shadow-lg bg-[#1E252A] text-slate-200 text-xs font-mono select-none"
      >
        {/* Power BI Titlebar */}
        <div className="flex items-center justify-between px-3.5 py-2 bg-[#141A1E] border-b border-slate-700/60">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="ml-2 text-[10px] font-sans text-amber-300 font-bold">
              Power BI Desktop // Maven Market Retail Model
            </span>
          </div>
          <div className="flex items-center gap-2">
            {screenshotUrl && (
              <button
                onClick={() => setViewMode('graphic')}
                className="px-2 py-0.5 rounded bg-[#1E252A] hover:bg-[#2B353C] text-[9px] font-mono text-[#FFB020] border border-slate-700 flex items-center gap-1 transition-colors"
                aria-label="Switch back to high-res dashboard preview"
              >
                <LayoutDashboard className="w-2.5 h-2.5" />
                <span>Dashboard View</span>
              </button>
            )}
            <span className="text-[9px] px-2 py-0.5 rounded bg-amber-950/70 text-amber-300 border border-amber-800/60 font-sans">
              Star Schema Model
            </span>
          </div>
        </div>

        <div className="p-3.5 sm:p-4 space-y-3 bg-[#1E252A]">
          {/* Main Grid: Left Filter Pane (Sidebar) + Main Report View */}
          <div className="grid grid-cols-12 gap-3 items-stretch">
            
            {/* Filter Pane on Side */}
            <div className="col-span-12 sm:col-span-3 p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 flex flex-col justify-between space-y-2">
              <div>
                <div className="flex items-center gap-1 text-[9px] font-bold text-amber-300 uppercase pb-1 border-b border-slate-800">
                  <Filter className="w-3 h-3 text-amber-400" />
                  <span>Filters</span>
                </div>
                <div className="space-y-1.5 mt-2 text-[8px] text-slate-300">
                  <div className="p-1 rounded bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block">Region:</span>
                    <span className="font-bold text-white">All Store Regions</span>
                  </div>
                  <div className="p-1 rounded bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block">Store Type:</span>
                    <span className="font-bold text-white">Supermarket Chain</span>
                  </div>
                  <div className="p-1 rounded bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block">Fiscal Year:</span>
                    <span className="font-bold text-white">2026 (YTD)</span>
                  </div>
                </div>
              </div>
              <div className="text-[7.5px] text-slate-500 font-mono">
                Power Query Slicers
              </div>
            </div>

            {/* Main Area: 3 KPI Cards (no numbers, just "—") + Trend Line & Decomposition Tree */}
            <div className="col-span-12 sm:col-span-9 space-y-2.5">
              
              {/* 3 KPI Cards: Total Sales, Total Profit Margin, Inventory Shelf Life (strictly no numbers, just "—") */}
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <div className="text-[8px] text-slate-400 font-sans truncate">Total Sales</div>
                  <div className="text-base sm:text-lg font-bold text-amber-300 font-mono mt-0.5">—</div>
                  <div className="text-[7.5px] text-slate-400 font-sans">DAX Measure</div>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <div className="text-[8px] text-slate-400 font-sans truncate">Total Profit Margin</div>
                  <div className="text-base sm:text-lg font-bold text-cyan-300 font-mono mt-0.5">—</div>
                  <div className="text-[7.5px] text-slate-400 font-sans">Target Margin</div>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <div className="text-[8px] text-slate-400 font-sans truncate">Inventory Shelf Life</div>
                  <div className="text-base sm:text-lg font-bold text-violet-300 font-mono mt-0.5">—</div>
                  <div className="text-[7.5px] text-slate-400 font-sans">Turnover Metric</div>
                </div>
              </div>

              {/* Trend Line Visual & Decomposition Tree Visual */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {/* Trend Line Chart */}
                <div className="p-2 rounded bg-slate-900/90 border border-slate-800 flex flex-col justify-between h-24">
                  <div className="text-[8px] font-sans font-bold text-slate-300">
                    Monthly Revenue Trend Line
                  </div>
                  <div className="my-auto h-12 flex items-center justify-center">
                    <svg className="w-full h-10" viewBox="0 0 160 40">
                      <path
                        d="M 5 35 Q 35 15, 65 25 T 125 10 T 155 5"
                        fill="none"
                        stroke="#FFB020"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <circle cx="5" cy="35" r="2" fill="#FFB020" />
                      <circle cx="65" cy="25" r="2" fill="#FFB020" />
                      <circle cx="125" cy="10" r="2" fill="#FFB020" />
                      <circle cx="155" cy="5" r="2.5" fill="#22D3EE" />
                    </svg>
                  </div>
                  <div className="text-[7.5px] text-slate-500 flex justify-between">
                    <span>Jan</span>
                    <span>Jun</span>
                    <span>Dec</span>
                  </div>
                </div>

                {/* Decomposition Tree Visual */}
                <div className="p-2 rounded bg-slate-900/90 border border-slate-800 flex flex-col justify-between h-24">
                  <div className="text-[8px] font-sans font-bold text-slate-300 flex items-center gap-1">
                    <GitFork className="w-3 h-3 text-amber-400" />
                    <span>Decomposition Tree</span>
                  </div>
                  <div className="space-y-1 my-auto text-[7.5px]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span className="text-slate-300">Total Sales</span>
                      <span className="text-slate-500">&rarr; Region</span>
                    </div>
                    <div className="flex items-center gap-1.5 pl-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span className="text-slate-300">Region</span>
                      <span className="text-slate-500">&rarr; Product Category</span>
                    </div>
                  </div>
                  <div className="text-[7.5px] text-amber-300 font-mono">
                    DAX Root Breakdown
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Footer Strip */}
          <div className="flex items-center justify-between text-[8.5px] text-slate-400 border-t border-slate-800 pt-1.5">
            <span>Automated Power Query ETL &bull; Star Schema Dimensional Model</span>
            <span className="text-amber-300 font-mono">POWER BI INTERACTION SIMULATION</span>
          </div>
        </div>
      </motion.div>
    );
  }

  // 3. Fake News NLP Classification Pipeline Mockup & Word Cloud Card
  return (
    <motion.div
      ref={frameRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="w-full rounded-xl overflow-hidden border border-[#323E45] shadow-lg bg-[#1E252A] text-slate-200 text-xs font-mono select-none"
    >
      {/* Titlebar */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-[#141A1E] border-b border-slate-700/60">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
          <span className="ml-2 text-[10px] font-sans text-cyan-300 font-bold">
            NLP Pipeline // Article Veracity Classifier
          </span>
        </div>
        <div className="flex items-center gap-2">
          {screenshotUrl && (
            <button
              onClick={() => setViewMode('graphic')}
              className="px-2 py-0.5 rounded bg-[#1E252A] hover:bg-[#2B353C] text-[9px] font-mono text-[#22D3EE] border border-slate-700 flex items-center gap-1 transition-colors"
              aria-label="Switch back to high-res dashboard preview"
            >
              <LayoutDashboard className="w-2.5 h-2.5" />
              <span>Dashboard View</span>
            </button>
          )}
          <span className="text-[9px] px-2 py-0.5 rounded bg-cyan-950/70 text-cyan-300 border border-cyan-800/60">
            TF-IDF Feature Space
          </span>
        </div>
      </div>

      <div className="p-3.5 sm:p-4 space-y-3 bg-[#1E252A]">
        {/* Pipeline Diagram (Tokenization, Stop-word removal, TF-IDF n-grams, Classifier, Precision/Recall/F1) */}
        <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
          <div className="text-[9px] font-sans font-bold text-slate-300 mb-2">
            5-Stage NLP Processing Pipeline
          </div>
          <div className="grid grid-cols-5 gap-1 text-center text-[7.5px]">
            <div className="p-1 rounded bg-slate-950 border border-slate-800">
              <span className="text-cyan-300 block font-bold">01</span>
              <span className="text-white block font-medium">Tokenization</span>
              <span className="text-slate-500">NLTK Split</span>
            </div>
            <div className="p-1 rounded bg-slate-950 border border-slate-800">
              <span className="text-cyan-300 block font-bold">02</span>
              <span className="text-white block font-medium">Stop-Words</span>
              <span className="text-slate-500">Pruning</span>
            </div>
            <div className="p-1 rounded bg-slate-950 border border-slate-800">
              <span className="text-violet-300 block font-bold">03</span>
              <span className="text-white block font-medium">TF-IDF</span>
              <span className="text-slate-500">N-Grams</span>
            </div>
            <div className="p-1 rounded bg-slate-950 border border-slate-800">
              <span className="text-emerald-300 block font-bold">04</span>
              <span className="text-white block font-medium">Classifier</span>
              <span className="text-slate-500">Supervised</span>
            </div>
            <div className="p-1 rounded bg-slate-950 border border-slate-800">
              <span className="text-[#22D3EE] block font-bold">05</span>
              <span className="text-white block font-medium">Evaluation</span>
              <span className="text-slate-500">P / R / F1</span>
            </div>
          </div>
        </div>

        {/* Word-Cloud Card Visual with Typographic Lexicon in Lookbook Palette */}
        <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
          <div className="flex items-center justify-between text-[9px] font-sans mb-1.5">
            <span className="font-bold text-slate-300">Feature Word Cloud &bull; Linguistic Frequency</span>
            <span className="text-cyan-300 text-[8px] font-mono">Weighted N-Grams</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 py-1 text-center select-none">
            <span className="text-sm font-bold text-[#FAF6EF]">headline_sentiment</span>
            <span className="text-xs font-semibold text-[#22D3EE]">veracity_index</span>
            <span className="text-base font-extrabold text-[#7E9387]">source_reputation</span>
            <span className="text-[10px] text-[#D9C3A3]">n_gram_weight</span>
            <span className="text-xs font-medium text-[#FAF6EF]">clickbait_entropy</span>
            <span className="text-sm font-bold text-[#FFB020]">linguistic_cues</span>
            <span className="text-[11px] text-[#22D3EE]">corpus_frequency</span>
            <span className="text-xs text-[#7E9387]">named_entities</span>
            <span className="text-sm font-bold text-[#D9C3A3]">stylometry</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-[8.5px] text-slate-400 border-t border-slate-800 pt-1.5">
          <span>Scikit-learn &bull; NLTK Supervised Classification</span>
          <span className="text-cyan-300 font-mono">NLP PIPELINE SIMULATION</span>
        </div>
      </div>
    </motion.div>
  );
}
