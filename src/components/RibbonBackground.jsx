import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function RibbonBackground() {
  const { scrollYProgress } = useScroll();
  const ribbonDraw1 = useTransform(scrollYProgress, [0, 1], [0.15, 1]);
  const ribbonDraw2 = useTransform(scrollYProgress, [0, 1], [0.25, 0.95]);
  const ribbonParallaxY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      {/* Subtle Animated Gradient Mesh */}
      <motion.div
        animate={{
          x: [0, 25, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-[#7C5CFF]/10 via-[#3F6253]/10 to-transparent blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          x: [0, -25, 20, 0],
          y: [0, 30, -20, 0],
          scale: [1, 0.95, 1.08, 1],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute -bottom-[10%] -right-[10%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-tl from-[#D9C3A3]/8 via-[#7E9387]/8 to-transparent blur-3xl pointer-events-none"
      />

      {/* Film Grain & Soft Vignette Overlays */}
      <div className="grain-overlay" />
      <div className="vignette-overlay" />

      {/* Floating Organic Ribbons SVG with Scroll Drawing & Parallax */}
      <motion.svg
        style={{ y: ribbonParallaxY }}
        className="absolute w-full h-full inset-0 opacity-20 dark:opacity-25"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="ribbonGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D9C3A3" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#7E9387" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#7C5CFF" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id="ribbonGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7E9387" stopOpacity="0.7" />
            <stop offset="60%" stopColor="#D9C3A3" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id="ribbonGrad3" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#7C5CFF" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#FFB020" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#7E9387" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* Ribbon A: Top right looping wave with scroll-drawn length */}
        <motion.path
          d="M 950,-50 C 1150,150 1400,200 1350,450 C 1300,700 1050,650 900,850 C 750,1050 600,950 450,1100"
          stroke="url(#ribbonGrad1)"
          strokeWidth="1.5"
          style={{ pathLength: ribbonDraw1 }}
        />

        {/* Ribbon B: Left diagonal fluid arc */}
        <motion.path
          d="M -80,200 C 200,280 400,120 650,380 C 900,640 680,820 1100,920"
          stroke="url(#ribbonGrad2)"
          strokeWidth="1.8"
          style={{ pathLength: ribbonDraw2 }}
        />

        {/* Ribbon C: Subtle central organic accent */}
        <motion.path
          d="M 200,600 C 450,550 550,750 850,680 C 1150,610 1300,780 1500,720"
          stroke="url(#ribbonGrad3)"
          strokeWidth="1.2"
          strokeDasharray="20 14"
        />

        {/* Gentle background contour loops */}
        <circle cx="85%" cy="20%" r="280" stroke="#7E9387" strokeWidth="0.8" strokeOpacity="0.12" strokeDasharray="8 8" />
        <circle cx="15%" cy="75%" r="320" stroke="#D9C3A3" strokeWidth="0.8" strokeOpacity="0.10" strokeDasharray="12 12" />
      </motion.svg>
    </div>
  );
}
