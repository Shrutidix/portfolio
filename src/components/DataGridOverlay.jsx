import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid, X } from 'lucide-react';

export default function DataGridOverlay({ isEnabled, onToggle }) {
  const [active, setActive] = useState(isEnabled || false);

  useEffect(() => {
    if (isEnabled !== undefined) {
      setActive(isEnabled);
    }
  }, [isEnabled]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing in an input, textarea, or contentEditable
      const tag = e.target.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) {
        return;
      }

      if (e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        setActive((prev) => {
          const next = !prev;
          if (onToggle) onToggle(next);
          return next;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onToggle]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[150] pointer-events-none select-none overflow-hidden"
          aria-hidden="true"
        >
          {/* Subtle Isometric Blueprint Data Grid (32px x 32px) */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(126, 147, 135, 0.35) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(126, 147, 135, 0.35) 1px, transparent 1px)
              `,
              backgroundSize: '32px 32px',
            }}
          />

          {/* 12-Column Blueprint Overlay without cluttered text */}
          <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 grid grid-cols-6 sm:grid-cols-12 gap-4 opacity-15">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="h-full border-x border-[#22D3EE] bg-[#22D3EE]/5"
              />
            ))}
          </div>

          {/* Active Overlay Status Pill in Bottom Right */}
          <div className="absolute bottom-6 right-6 pointer-events-auto">
            <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#222B31] text-[#FAF6EF] border border-[#7E9387] shadow-2xl backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
              <Grid className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span className="text-xs font-mono font-bold tracking-wider">
                GRID OVERLAY // PRESS <kbd className="px-1.5 py-0.5 rounded bg-black/60 border border-white/20 text-[#FAF6EF]">D</kbd> TO TOGGLE
              </span>
              <button
                onClick={() => {
                  setActive(false);
                  if (onToggle) onToggle(false);
                }}
                className="p-1 rounded-full hover:bg-white/10 transition-colors ml-1"
                aria-label="Dismiss grid"
              >
                <X className="w-3.5 h-3.5 text-[#FAF6EF]" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
