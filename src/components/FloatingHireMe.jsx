import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Copy, Check, X, ArrowRight, Sparkles, Send } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { PERSONAL_INFO } from '../content';

export default function FloatingHireMe({ onOpenResume }) {
  const [visible, setVisible] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      // Appear after hero section (scrollY > 480)
      if (window.scrollY > 480) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const scrollToContact = () => {
    setDrawerOpen(false);
    const el = document.getElementById('contact');
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 110;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Floating Pill on Bottom Left */}
      <AnimatePresence>
        {visible && !drawerOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 left-6 z-40 select-none"
          >
            <button
              onClick={() => setDrawerOpen(true)}
              className="px-4 py-2.5 rounded-full bg-[#231813] text-[#FAF6EF] border border-[#D9C3A3]/30 shadow-2xl hover:border-[#D9C3A3] transition-all duration-300 flex items-center gap-2 group min-h-[44px]"
              aria-label="Open Direct Contact Drawer"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#3F6253] animate-ping" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#3F6253] -ml-4.5" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider">
                Hire Me
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#D9C3A3] group-hover:rotate-12 transition-transform" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide-over Contact Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-end select-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Slide-in Drawer Window */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-md h-full bg-[#FAF6EF] text-[#1C1512] shadow-2xl border-l border-black/20 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto z-10"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-black/15 mb-6">
                  <div className="flex items-center gap-3">
                    <img
                      src="./profile.jpg"
                      alt="Shruti Dixit"
                      className="w-11 h-11 rounded-xl object-cover object-top border border-black/20"
                    />
                    <div>
                      <h3 className="font-display font-bold text-lg text-[#1C1512] leading-none">
                        Shruti Dixit
                      </h3>
                      <span className="text-[10px] font-mono text-[#3F6253] font-bold uppercase tracking-wider block mt-1">
                        AVAILABLE FOR ANALYST ROLES
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="p-1.5 rounded-lg hover:bg-black/10 text-[#1C1512] transition-colors"
                    aria-label="Close contact drawer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Direct Transmission Details */}
                <div className="space-y-3.5">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#7E9387] font-bold block">
                    FAST CONTACT CHANNELS
                  </span>

                  {/* Email */}
                  <div className="p-3.5 rounded-xl bg-white border border-black/15 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#FAF6EF] flex items-center justify-center">
                        <Mail className="w-4 h-4 text-[#222B31]" />
                      </div>
                      <div>
                        <span className="block text-[9px] font-mono uppercase text-[#7E9387] font-bold">EMAIL</span>
                        <a href={`mailto:${PERSONAL_INFO.email}`} className="text-xs font-bold font-mono text-[#1C1512] hover:text-[#3F6253]">
                          {PERSONAL_INFO.email}
                        </a>
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
                      className="p-2 rounded-lg hover:bg-black/5 text-[#1C1512]"
                      aria-label="Copy Email"
                    >
                      {copiedKey === 'email' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Phone */}
                  <div className="p-3.5 rounded-xl bg-white border border-black/15 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#FAF6EF] flex items-center justify-center">
                        <Phone className="w-4 h-4 text-[#222B31]" />
                      </div>
                      <div>
                        <span className="block text-[9px] font-mono uppercase text-[#7E9387] font-bold">PHONE</span>
                        <a href={`tel:${PERSONAL_INFO.phone}`} className="text-xs font-bold font-mono text-[#1C1512] hover:text-[#3F6253]">
                          {PERSONAL_INFO.phone}
                        </a>
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'phone')}
                      className="p-2 rounded-lg hover:bg-black/5 text-[#1C1512]"
                      aria-label="Copy Phone"
                    >
                      {copiedKey === 'phone' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* LinkedIn */}
                  <div className="p-3.5 rounded-xl bg-white border border-black/15 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#FAF6EF] flex items-center justify-center">
                        <Linkedin className="w-4 h-4 text-[#222B31]" />
                      </div>
                      <div>
                        <span className="block text-[9px] font-mono uppercase text-[#7E9387] font-bold">LINKEDIN</span>
                        <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-xs font-bold font-mono text-[#1C1512] hover:text-[#3F6253]">
                          shruti-dixit-3023512b5
                        </a>
                      </div>
                    </div>
                    <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="p-2 rounded-lg hover:bg-black/5 text-[#1C1512]" aria-label="Open LinkedIn profile">
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>

                  {/* GitHub */}
                  <div className="p-3.5 rounded-xl bg-white border border-black/15 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#FAF6EF] flex items-center justify-center">
                        <Github className="w-4 h-4 text-[#222B31]" />
                      </div>
                      <div>
                        <span className="block text-[9px] font-mono uppercase text-[#7E9387] font-bold">GITHUB</span>
                        <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-xs font-bold font-mono text-[#1C1512] hover:text-[#3F6253]">
                          github.com/Shrutidix
                        </a>
                      </div>
                    </div>
                    <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="p-2 rounded-lg hover:bg-black/5 text-[#1C1512]" aria-label="Open GitHub profile">
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Drawer Actions */}
              <div className="pt-6 border-t border-black/15 space-y-2 mt-6">
                <button
                  onClick={scrollToContact}
                  className="w-full py-3 rounded-xl bg-[#231813] text-[#FAF6EF] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm hover:bg-[#1A120E] border border-[#D9C3A3]/20 transition-colors"
                >
                  <Send className="w-3.5 h-3.5 text-[#D9C3A3]" />
                  <span>Send Detailed Inquiry &rarr;</span>
                </button>

                <button
                  onClick={() => {
                    setDrawerOpen(false);
                    if (onOpenResume) onOpenResume();
                  }}
                  className="w-full py-3 rounded-xl bg-white border border-black/20 text-[#1C1512] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#FAF6EF] transition-colors"
                >
                  <span>View Resume PDF</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
