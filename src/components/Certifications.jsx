import React, { useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Award, Check } from 'lucide-react';
import { CERTIFICATIONS, EDUCATION_RECORD, ISSUER_MARQUEE } from '../content';

// Collectible 3D-Tilt Ticket Card with max 6 deg tilt
function CollectibleTicketCard({ cert }) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.1 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const hasBadgeImage = Boolean(cert.badgeImageUrl && cert.badgeImageUrl.trim().length > 0);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="ticket-shimmer relative rounded-2xl bg-white text-[#1C1512] border border-black/15 p-6 shadow-sm overflow-hidden flex flex-col justify-between select-none cursor-pointer group hover:border-[#222B31] hover:shadow-md transition-shadow duration-300"
    >
      {/* Decorative Ticket Notches */}
      <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FAF6EF] border border-black/15 pointer-events-none" />
      <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FAF6EF] border border-black/15 pointer-events-none" />

      {/* Ticket Header */}
      <div>
        <div className="flex justify-between items-start mb-3">
          <span className="px-2.5 py-1 rounded bg-[#222B31] text-[#FAF6EF] text-[10px] font-mono font-bold tracking-wider uppercase">
            {cert.badge}
          </span>
          <span className="text-xs font-mono font-bold text-[#1C1512]">
            {cert.date}
          </span>
        </div>

        <h3 className="font-display font-bold text-lg sm:text-xl text-[#1C1512] leading-snug group-hover:text-[#3F6253] transition-colors">
          {cert.title}
        </h3>

        <p className="text-xs font-mono font-bold text-[#3F6253] mt-1.5">
          {cert.category}
        </p>

        {/* Badge Slot */}
        <div className="mt-4 pt-3 border-t border-black/10">
          {hasBadgeImage ? (
            <div className="flex items-center gap-3.5 p-2.5 rounded-xl bg-[#FAF6EF] border border-black/15 shadow-xs">
              <img
                src={cert.badgeImageUrl}
                alt={`${cert.title} badge`}
                className="w-14 h-14 object-contain filter drop-shadow-sm flex-shrink-0"
                width="56"
                height="56"
                loading="lazy"
                decoding="async"
              />
              <div className="text-xs font-mono">
                <span className="font-bold text-[#1C1512] block">ACCREDITED CREDENTIAL</span>
                <span className="text-[#3F6253] text-[10px] uppercase font-bold">{cert.issuer}</span>
                <span className="text-[9px] text-[#7E9387] block mt-0.5">Completed</span>
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-[#FAF6EF] border border-black/10 space-y-1">
              <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-wider text-[#3F6253]">
                <span>ISSUING BODY</span>
                <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                  <Check className="w-3 h-3" /> Accredited
                </span>
              </div>
              <div className="font-sans font-bold text-xs text-[#1C1512] leading-tight">
                {cert.issuer}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Perforated Divider */}
      <div className="my-4 border-t border-dashed border-black/15 relative" />

      {/* Ticket Footer */}
      <div className="flex items-center justify-between text-xs font-mono text-[#1C1512] font-bold">
        <div>
          <span className="block uppercase text-[9px] text-[#7E9387]">ISSUING BODY</span>
          <span className="text-[#1C1512] truncate max-w-[190px] block font-extrabold">
            {cert.issuer}
          </span>
        </div>
        <div className="text-right">
          <span className="block uppercase text-[9px] text-[#7E9387]">STATUS</span>
          <span className="text-[#3F6253] font-extrabold flex items-center gap-1 justify-end">
            <Check className="w-3.5 h-3.5 text-[#3F6253]" />
            <span>Active</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Certifications() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  // Animated CGPA ring (7.52 / 10)
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (7.52 / 10) * circumference;

  return (
    <section id="certifications" className="py-20 relative bg-transparent scroll-mt-28" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Eyebrow Header */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[var(--border-hairline)]">
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[var(--sage-accent)] uppercase">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--sage-accent)]" />
            <span>CERTIFICATIONS</span>
          </div>
          <div className="text-xs font-mono font-bold text-[var(--text-page-muted)] tracking-wider uppercase">
            CREDENTIALS &amp; ACADEMICS
          </div>
        </div>

        {/* Section Headline */}
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-[var(--text-page)] tracking-tight">
            Certifications &amp; Education
          </h2>
          <p className="mt-2 text-base sm:text-lg font-serif text-[var(--text-page-muted)] max-w-2xl">
            Official industry certifications from NASSCOM FutureSkills Prime, AWS Academy, and IBM Developer Skills Network, alongside degree records.
          </p>
        </div>

        {/* Marquee of Credential Issuers */}
        <div className="mb-10 overflow-hidden py-3 bg-[#FAF6EF] text-[#1C1512] rounded-xl border border-black/15 shadow-sm">
          <div className="animate-marquee">
            {[...ISSUER_MARQUEE, ...ISSUER_MARQUEE].map((issuer, idx) => (
              <div
                key={idx}
                className="flex items-center gap-8 mx-6 text-xs sm:text-sm font-mono font-bold tracking-wider text-[#1C1512] whitespace-nowrap"
              >
                <span className="flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-[#3F6253]" />
                  <span>{issuer}</span>
                </span>
                <span className="text-black/30">&bull;</span>
              </div>
            ))}
          </div>
        </div>

        {/* 5 Collectible Ticket Cards + 1 Academic Foundation Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {CERTIFICATIONS.map((cert) => (
            <CollectibleTicketCard key={cert.id} cert={cert} />
          ))}

          {/* Academic Foundation Card with Animated CGPA Ring */}
          <div
            className="ticket-shimmer relative rounded-2xl bg-white text-[#1C1512] border-2 border-[#222B31] p-6 shadow-md overflow-hidden flex flex-col justify-between select-none group hover:shadow-lg transition-all"
          >
            {/* Ticket Notches */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FAF6EF] border border-black/15 pointer-events-none" />
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FAF6EF] border border-black/15 pointer-events-none" />

            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="px-2.5 py-1 rounded bg-[#222B31] text-[#FAF6EF] text-[10px] font-mono font-bold tracking-wider uppercase">
                  ACADEMIC FOUNDATION
                </span>
                <span className="text-xs font-mono font-bold text-[#1C1512]">
                  {EDUCATION_RECORD.expectedYear}
                </span>
              </div>

              <h3 className="font-display font-bold text-xl text-[#1C1512] leading-snug">
                {EDUCATION_RECORD.degree} (Bachelor of Technology)
              </h3>

              <p className="text-xs text-[#53453E] mt-1.5 font-sans font-medium">
                {EDUCATION_RECORD.institution}
              </p>
            </div>

            {/* Perforated Divider */}
            <div className="my-5 border-t border-dashed border-black/15 relative" />

            {/* Footer with Animated CGPA Ring */}
            <div className="flex items-center justify-between text-xs font-mono text-[#1C1512] font-bold">
              <div>
                <span className="block uppercase text-[9px] text-[#7E9387]">LOCATION</span>
                <span className="text-[#1C1512] font-extrabold">
                  {EDUCATION_RECORD.location}
                </span>
              </div>

              <div className="flex items-center gap-2.5 text-right">
                <div>
                  <span className="block uppercase text-[9px] text-[#7E9387]">OFFICIAL CGPA</span>
                  <span className="text-base font-display font-extrabold text-[#1C1512]">
                    7.52 / 10.0
                  </span>
                </div>
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <svg className="w-12 h-12 -rotate-90" viewBox="0 0 70 70">
                    <circle cx="35" cy="35" r={radius} fill="none" stroke="#E2E8F0" strokeWidth="4" />
                    <motion.circle
                      cx="35"
                      cy="35"
                      r={radius}
                      fill="none"
                      stroke="#3F6253"
                      strokeWidth="4"
                      strokeDasharray={circumference}
                      initial={{ strokeDashoffset: circumference }}
                      animate={{ strokeDashoffset: isInView ? strokeDashoffset : circumference }}
                      transition={{ duration: 1.4, ease: 'easeOut', delay: 0.1 }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-[9px] font-mono font-bold text-[#1C1512]">
                    7.52
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
