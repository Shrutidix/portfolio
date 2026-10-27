import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function SectionDivider({ type = 'barchart' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className="max-w-4xl mx-auto px-4 py-8 overflow-hidden select-none opacity-90" aria-hidden="true">
      <div className="flex items-center justify-center w-full">
        {type === 'barchart' && (
          <svg viewBox="0 0 600 60" className="w-full max-w-xl h-12" fill="none">
            {/* Baseline */}
            <motion.line
              x1="20" y1="50" x2="580" y2="50"
              stroke="#7E9387" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.4"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 1 }}
            />
            {/* Bar chart vertical lines */}
            <g stroke="#7E9387" strokeWidth="1.5" strokeLinecap="round">
              {[
                { x: 60, y2: 35 }, { x: 90, y2: 25 }, { x: 120, y2: 40 },
                { x: 150, y2: 15 }, { x: 180, y2: 28 }, { x: 210, y2: 10 },
                { x: 390, y2: 18 }, { x: 420, y2: 30 }, { x: 450, y2: 12 },
                { x: 480, y2: 38 }, { x: 510, y2: 22 }, { x: 540, y2: 42 },
              ].map((bar, idx) => (
                <motion.line
                  key={idx}
                  x1={bar.x} y1="50" x2={bar.x} y2={bar.y2}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: idx * 0.05 + 0.2 }}
                />
              ))}
              {/* Central marker */}
              <motion.circle
                cx="300" cy="50" r="4" fill="#3F6253" stroke="#FAF6EF" strokeWidth="1.5"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.6 }}
              />
            </g>
            {/* Wave connecting tops */}
            <motion.path
              d="M 60 35 Q 105 10 150 15 T 210 10 Q 255 35 300 50 Q 345 35 390 18 T 450 12 Q 495 25 540 42"
              stroke="#D9C3A3" strokeWidth="1.4" strokeDasharray="2 3" fill="none"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.4, delay: 0.3, ease: 'easeInOut' }}
            />
          </svg>
        )}

        {type === 'scatterplot' && (
          <svg viewBox="0 0 600 60" className="w-full max-w-xl h-12" fill="none">
            {/* Baseline */}
            <motion.line
              x1="20" y1="52" x2="580" y2="52"
              stroke="#7E9387" strokeWidth="0.8" strokeDasharray="3 3" strokeOpacity="0.3"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 0.9 }}
            />
            {/* Regression trend line */}
            <motion.path
              d="M 40 48 Q 200 38 300 28 T 560 12"
              stroke="#3F6253" strokeWidth="1.8" strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.3, delay: 0.2, ease: 'easeOut' }}
            />
            {/* Data points */}
            <g stroke="#FAF6EF" strokeWidth="1">
              {[
                { cx: 50, cy: 46, r: 3, fill: '#7E9387' },
                { cx: 80, cy: 42, r: 3.5, fill: '#7E9387' },
                { cx: 110, cy: 48, r: 2.5, fill: '#7E9387' },
                { cx: 140, cy: 38, r: 3.5, fill: '#D9C3A3' },
                { cx: 170, cy: 34, r: 3, fill: '#7E9387' },
                { cx: 200, cy: 41, r: 2.5, fill: '#7E9387' },
                { cx: 230, cy: 30, r: 4, fill: '#3F6253' },
                { cx: 260, cy: 36, r: 3, fill: '#7E9387' },
                { cx: 290, cy: 25, r: 3.5, fill: '#D9C3A3' },
                { cx: 320, cy: 29, r: 3, fill: '#7E9387' },
                { cx: 350, cy: 22, r: 4, fill: '#22D3EE' },
                { cx: 380, cy: 26, r: 3, fill: '#7E9387' },
                { cx: 410, cy: 18, r: 3.5, fill: '#3F6253' },
                { cx: 440, cy: 23, r: 3, fill: '#7E9387' },
                { cx: 470, cy: 16, r: 3.5, fill: '#D9C3A3' },
                { cx: 500, cy: 19, r: 2.5, fill: '#7E9387' },
                { cx: 530, cy: 13, r: 4, fill: '#3F6253' },
                { cx: 550, cy: 10, r: 3, fill: '#7E9387' },
              ].map((pt, idx) => (
                <motion.circle
                  key={idx}
                  cx={pt.cx} cy={pt.cy} r={pt.r} fill={pt.fill}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.35, delay: idx * 0.04 + 0.3 }}
                />
              ))}
            </g>
          </svg>
        )}

        {type === 'network' && (
          <svg viewBox="0 0 600 60" className="w-full max-w-xl h-12" fill="none">
            {/* Edges */}
            <g stroke="#7E9387" strokeWidth="1" strokeOpacity="0.6">
              {[
                { x1: 50, y1: 30, x2: 120, y2: 18 },
                { x1: 50, y1: 30, x2: 100, y2: 44 },
                { x1: 120, y1: 18, x2: 180, y2: 32 },
                { x1: 100, y1: 44, x2: 180, y2: 32 },
                { x1: 180, y1: 32, x2: 240, y2: 15 },
                { x1: 180, y1: 32, x2: 260, y2: 42 },
                { x1: 240, y1: 15, x2: 300, y2: 28 },
                { x1: 260, y1: 42, x2: 300, y2: 28 },
                { x1: 300, y1: 28, x2: 360, y2: 15 },
                { x1: 300, y1: 28, x2: 380, y2: 42 },
                { x1: 360, y1: 15, x2: 440, y2: 28 },
                { x1: 380, y1: 42, x2: 440, y2: 28 },
                { x1: 440, y1: 28, x2: 510, y2: 18 },
                { x1: 440, y1: 28, x2: 490, y2: 44 },
                { x1: 510, y1: 18, x2: 560, y2: 30 },
                { x1: 490, y1: 44, x2: 560, y2: 30 },
              ].map((edge, idx) => (
                <motion.line
                  key={idx}
                  x1={edge.x1} y1={edge.y1} x2={edge.x2} y2={edge.y2}
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 0.7, delay: idx * 0.04 }}
                />
              ))}
            </g>
            {/* Nodes */}
            <g stroke="#FAF6EF" strokeWidth="1.5">
              {[
                { cx: 50, cy: 30, r: 4, fill: '#3F6253' },
                { cx: 120, cy: 18, r: 3.5, fill: '#7E9387' },
                { cx: 100, cy: 44, r: 3, fill: '#D9C3A3' },
                { cx: 180, cy: 32, r: 5, fill: '#222B31' },
                { cx: 240, cy: 15, r: 3.5, fill: '#7E9387' },
                { cx: 260, cy: 42, r: 4, fill: '#3F6253' },
                { cx: 300, cy: 28, r: 6, fill: '#22D3EE' },
                { cx: 360, cy: 15, r: 4, fill: '#7E9387' },
                { cx: 380, cy: 42, r: 3.5, fill: '#D9C3A3' },
                { cx: 440, cy: 28, r: 5, fill: '#222B31' },
                { cx: 510, cy: 18, r: 3.5, fill: '#7E9387' },
                { cx: 490, cy: 44, r: 3, fill: '#D9C3A3' },
                { cx: 560, cy: 30, r: 4, fill: '#3F6253' },
              ].map((node, idx) => (
                <motion.circle
                  key={idx}
                  cx={node.cx} cy={node.cy} r={node.r} fill={node.fill}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: idx * 0.05 + 0.3 }}
                />
              ))}
            </g>
          </svg>
        )}
      </div>
    </div>
  );
}
