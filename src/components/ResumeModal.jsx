import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, MapPin, Mail, Phone } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCE_ITEM, CERTIFICATIONS, EDUCATION_RECORD, SKILL_FLIP_CARDS } from '../content';

export default function ResumeModal({ isOpen, onClose }) {
  const [viewMode, setViewMode] = useState('pdf'); // 'pdf' or 'dossier'

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = './resume.pdf';
    link.download = 'Shruti_Dixit_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          className="absolute inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Window: High-Contrast White Resume Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl max-h-[92vh] bg-[#FAF6EF] text-[#1C1512] rounded-2xl shadow-2xl border border-black/20 flex flex-col overflow-hidden z-10"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#F4ECE0] border-b border-black/15">
            <div className="flex items-center gap-3">
              <img
                src="./profile.jpg"
                alt="Shruti Dixit"
                className="w-10 h-10 rounded-lg object-cover object-top border border-black/20"
              />
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#3F6253] font-bold block">
                  CURRICULUM VITAE
                </span>
                <div className="font-display font-bold text-base sm:text-lg text-[#1C1512] leading-none">
                  Shruti Dixit &bull; Official Resume
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* View Toggle */}
              <div className="hidden sm:flex items-center rounded-lg bg-black/10 p-0.5 text-xs font-mono">
                <button
                  onClick={() => setViewMode('pdf')}
                  className={`px-3 py-1.5 rounded-md font-bold transition-all ${
                    viewMode === 'pdf'
                      ? 'bg-[#222B31] text-[#FAF6EF] shadow-xs'
                      : 'text-[#1C1512] hover:text-black'
                  }`}
                >
                  Inline PDF
                </button>
                <button
                  onClick={() => setViewMode('dossier')}
                  className={`px-3 py-1.5 rounded-md font-bold transition-all ${
                    viewMode === 'dossier'
                      ? 'bg-[#222B31] text-[#FAF6EF] shadow-xs'
                      : 'text-[#1C1512] hover:text-black'
                  }`}
                >
                  Structured Text
                </button>
              </div>

              {/* Download PDF Button */}
              <button
                onClick={handleDownload}
                className="px-3.5 py-1.5 rounded-lg bg-[#222B31] hover:bg-black text-[#FAF6EF] text-xs font-mono font-bold tracking-wider flex items-center gap-1.5 transition-colors shadow-sm min-h-[38px]"
                aria-label="Download resume PDF"
              >
                <Download className="w-3.5 h-3.5 text-[#22D3EE]" />
                <span>DOWNLOAD PDF</span>
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-black/10 text-[#1C1512] transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="overflow-y-auto p-4 sm:p-6 md:p-8 flex-1">
            {viewMode === 'pdf' ? (
              <div className="flex flex-col h-full space-y-3">
                {/* PDF Viewer Frame */}
                <div className="w-full h-[65vh] rounded-xl border border-black/15 overflow-hidden bg-white shadow-inner relative">
                  <iframe
                    src="./resume.pdf#toolbar=0&navpanes=0"
                    aria-label="Shruti Dixit Official Resume PDF"
                    className="w-full h-full border-0"
                  />
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-[#53453E]">
                  <span>Source: <code className="bg-black/5 px-1.5 py-0.5 rounded text-[#1C1512]">./resume.pdf</code></span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewMode('dossier')}
                      className="text-[#3F6253] font-bold underline hover:text-[#1C1512]"
                    >
                      Switch to Structured Text View
                    </button>
                    <span>&bull;</span>
                    <a
                      href="./resume.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#222B31] font-bold underline hover:text-[#3F6253]"
                    >
                      Open in New Tab &rarr;
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6 select-text">
                {/* Header info with Photo */}
                <div className="border-b border-black/15 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src="./profile.jpg"
                      alt="Shruti Dixit"
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover object-top border-2 border-black/20 shadow-sm flex-shrink-0"
                    />
                    <div>
                      {/* Non-heading element to strictly preserve single h1 rule */}
                      <div className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-[#1C1512]">
                        Shruti Dixit
                      </div>
                      <p className="font-mono text-xs text-[#3F6253] uppercase tracking-wider mt-0.5 font-bold">
                        Data Analyst &bull; Power BI Developer &bull; ML Practitioner
                      </p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-mono text-[#1C1512] mt-1.5 font-semibold">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#3F6253]" />
                          {PERSONAL_INFO.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-[#3F6253]" />
                          {PERSONAL_INFO.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-[#3F6253]" />
                          {PERSONAL_INFO.phone}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs font-mono space-y-1 text-[#1C1512] font-semibold">
                    <div>LinkedIn: <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-[#222B31] underline font-bold">shruti-dixit-3023512b5</a></div>
                    <div>GitHub: <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-[#222B31] underline font-bold">github.com/Shrutidix</a></div>
                  </div>
                </div>

                {/* Executive Summary in EB Garamond */}
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#3F6253] font-bold mb-1.5">
                    EXECUTIVE SUMMARY
                  </h3>
                  <p className="font-serif text-base text-[#3B2F2A] leading-relaxed">
                    {PERSONAL_INFO.summary}
                  </p>
                </div>

                {/* Experience */}
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#3F6253] font-bold mb-2">
                    PROFESSIONAL EXPERIENCE
                  </h3>
                  <div className="bg-white p-5 rounded-xl border border-black/15 space-y-2 shadow-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="font-display font-bold text-base sm:text-lg text-[#1C1512]">
                        {EXPERIENCE_ITEM.role}
                      </div>
                      <span className="text-xs font-mono font-bold text-[#1C1512]">
                        {EXPERIENCE_ITEM.period}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-[#3F6253] font-bold">
                      {EXPERIENCE_ITEM.company} &bull; {EXPERIENCE_ITEM.location}
                    </div>
                    <ul className="mt-2.5 space-y-1.5 font-serif text-sm sm:text-base text-[#3B2F2A]">
                      {EXPERIENCE_ITEM.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-2 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3F6253] mt-2 flex-shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Core Competencies */}
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#3F6253] font-bold mb-2">
                    CORE TECHNICAL COMPETENCIES
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs font-mono">
                    {SKILL_FLIP_CARDS.map((cat) => (
                      <div key={cat.id} className="p-3 bg-white rounded-lg border border-black/15 shadow-xs">
                        <span className="font-extrabold text-[#1C1512] block mb-1">
                          {cat.title}:
                        </span>
                        <span className="text-[#53453E] text-xs leading-normal font-sans">
                          {cat.skills.join(', ')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education & Certifications */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[#3F6253] font-bold mb-2">
                      EDUCATION
                    </h3>
                    <div className="p-4 bg-white rounded-xl border border-black/15 space-y-1 shadow-xs">
                      <div className="font-display font-bold text-base text-[#1C1512]">
                        {EDUCATION_RECORD.degree} (Bachelor of Technology)
                      </div>
                      <p className="text-xs text-[#53453E] font-medium">{EDUCATION_RECORD.institution}</p>
                      <p className="text-xs font-mono text-[#3F6253] font-bold pt-1">
                        Official CGPA: {EDUCATION_RECORD.cgpa} ({EDUCATION_RECORD.expectedYear})
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[#3F6253] font-bold mb-2">
                      CERTIFICATIONS
                    </h3>
                    <div className="space-y-1.5">
                      {CERTIFICATIONS.slice(0, 3).map((c) => (
                        <div key={c.id} className="p-2.5 bg-white rounded-lg border border-black/15 text-xs shadow-xs">
                          <div className="font-bold text-[#1C1512]">{c.title}</div>
                          <div className="text-[11px] font-mono text-[#7E9387] font-semibold">{c.issuer} &bull; {c.date}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-3 bg-[#F4ECE0] border-t border-black/15 flex items-center justify-between text-xs font-mono text-[#1C1512] font-bold">
            <span>Resume Document</span>
            <span>Shruti Dixit &bull; Data Analyst</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
