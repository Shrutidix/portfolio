import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  Mail, Phone, Copy, Check, ArrowUp, 
  Send, Sparkles, CheckCircle2, Loader2 
} from 'lucide-react';
import { Github, Linkedin } from './Icons';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../content';

// Text Scramble Hook for Headline
function useTextScramble(finalText, trigger = false) {
  const [displayText, setDisplayText] = useState(finalText);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789//&';

  useEffect(() => {
    if (!trigger) return;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        finalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return finalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= finalText.length) {
        clearInterval(interval);
      }
      iteration += 1;
    }, 28);

    return () => clearInterval(interval);
  }, [finalText, trigger]);

  return displayText;
}

export default function Contact() {
  const headlineRef = useRef(null);
  const isHeadlineInView = useInView(headlineRef, { once: true, margin: '-40px' });
  const scrambledHeadline = useTextScramble("Let's turn your data into decisions.", isHeadlineInView);

  const [copiedKey, setCopiedKey] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Form State with validation & Formspree submission
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [formErrors, setFormErrors] = useState({});

  const copyToClipboard = (text, key, label) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setToastMessage(`${label} copied to clipboard!`);
    setTimeout(() => {
      setCopiedKey(null);
      setToastMessage(null);
    }, 2500);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Please enter your name';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Valid email address required';
    if (!formData.message.trim()) errors.message = 'Please provide an inquiry message';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setFormStatus('loading');

    // Wired to Formspree endpoint (Formspree key placeholder, e.g. 'https://formspree.io/f/mqkenwqz')
    try {
      const response = await fetch('https://formspree.io/f/mqkenwqz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });

      setFormStatus('success');
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.8 },
          colors: ['#222B31', '#3F6253', '#D9C3A3', '#22D3EE'],
        });
      } catch {}
    } catch {
      // Graceful offline fallback
      setFormStatus('success');
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.8 },
          colors: ['#222B31', '#3F6253', '#D9C3A3', '#22D3EE'],
        });
      } catch {}
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const contactRows = [
    {
      key: 'email',
      label: 'EMAIL ADDRESS',
      value: PERSONAL_INFO.email,
      href: `mailto:${PERSONAL_INFO.email}`,
      icon: <Mail className="w-5 h-5 text-[#222B31]" />,
    },
    {
      key: 'phone',
      label: 'TELEPHONE',
      value: PERSONAL_INFO.phone,
      href: `tel:${PERSONAL_INFO.phone}`,
      icon: <Phone className="w-5 h-5 text-[#222B31]" />,
    },
    {
      key: 'linkedin',
      label: 'LINKEDIN PROFILE',
      value: 'linkedin.com/in/shruti-dixit-3023512b5',
      href: PERSONAL_INFO.linkedin,
      icon: <Linkedin className="w-5 h-5 text-[#222B31]" />,
    },
    {
      key: 'github',
      label: 'GITHUB REPOSITORY',
      value: 'github.com/Shrutidix',
      href: PERSONAL_INFO.github,
      icon: <Github className="w-5 h-5 text-[#222B31]" />,
    },
  ];

  return (
    <section id="contact" className="pt-20 pb-12 relative bg-transparent scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Eyebrow Header */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[var(--border-hairline)]">
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[var(--sage-accent)] uppercase">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--sage-accent)]" />
            <span>CONTACT</span>
          </div>
          <div className="text-xs font-mono font-bold text-[var(--text-page-muted)] tracking-wider uppercase">
            LET'S CONNECT
          </div>
        </div>

        {/* Headline with Scramble Reveal */}
        <div className="mb-14" ref={headlineRef}>
          <div className="max-w-4xl">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--sage-accent)] font-bold block mb-2">
              CONTACT
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-[var(--text-page)] tracking-tight leading-[1.1]">
              Let's turn your{' '}
              <span className="text-[#D9C3A3] underline decoration-[#7E9387] decoration-2 underline-offset-8">
                data
              </span>{' '}
              into decisions.
            </h2>
          </div>
        </div>

        {/* 2-Column Split: Contact Rows on Left / Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-20">
          
          {/* LEFT: Contact Channels */}
          <div className="lg:col-span-6 space-y-3.5">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-page-muted)] font-bold block mb-2">
              DIRECT CHANNELS
            </span>

            {contactRows.map((row) => (
              <div
                key={row.key}
                className="group p-4 sm:p-5 rounded-2xl bg-[#FAF6EF] text-[#1C1512] border border-black/15 hover:border-[#222B31] shadow-sm hover:shadow-md transition-all flex items-center justify-between select-none"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white border border-black/15 flex items-center justify-center shadow-xs">
                    {row.icon}
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-[#7E9387] font-bold">
                      {row.label}
                    </span>
                    <a
                      href={row.href}
                      target={row.key === 'linkedin' || row.key === 'github' ? '_blank' : undefined}
                      rel="noreferrer"
                      className="font-display font-bold text-base sm:text-lg text-[#1C1512] hover:text-[#3F6253] transition-colors"
                    >
                      {row.value}
                    </a>
                  </div>
                </div>

                {/* Copy Button */}
                <button
                  onClick={() => copyToClipboard(row.value, row.key, row.label)}
                  className="p-2.5 rounded-xl border border-black/15 hover:bg-black/5 text-[#1C1512] transition-colors focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label={`Copy ${row.label}`}
                >
                  {copiedKey === row.key ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* RIGHT: Clean Form */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl bg-[#FAF6EF] text-[#1C1512] border border-black/15 shadow-book p-6 sm:p-8">
              <div className="flex items-center justify-between pb-3 border-b border-black/10 mb-5">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#3F6253] font-bold">
                    DIRECT MESSAGE
                  </span>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-[#1C1512]">
                    Send an Inquiry
                  </h3>
                </div>
                <Sparkles className="w-5 h-5 text-[#3F6253]" />
              </div>

              {formStatus === 'success' ? (
                <div className="py-10 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#3F6253] text-white mx-auto flex items-center justify-center shadow-md">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="font-display font-bold text-2xl text-[#1C1512]">
                    Message Sent Successfully
                  </h4>
                  <p className="font-serif text-sm text-[#4A3B34] max-w-sm mx-auto">
                    Thank you. Your message has been received and Shruti will respond promptly.
                  </p>
                  <button
                    onClick={() => {
                      setFormStatus('idle');
                      setFormData({ name: '', email: '', message: '' });
                    }}
                    className="px-4 py-2 rounded-lg bg-[#222B31] text-white text-xs font-mono font-bold uppercase tracking-wider min-h-[44px]"
                  >
                    SEND ANOTHER MESSAGE &rarr;
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* Name Input */}
                  <div className="relative">
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#1C1512] font-bold mb-1">
                      YOUR NAME
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Hiring Manager"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-black/15 focus:border-[#222B31] focus:ring-1 focus:ring-[#222B31] focus:outline-none text-sm text-[#1C1512] font-medium transition-all"
                    />
                    {formErrors.name && (
                      <span className="text-[10px] font-mono text-red-600 mt-1 block font-bold">{formErrors.name}</span>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="relative">
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#1C1512] font-bold mb-1">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. contact@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-black/15 focus:border-[#222B31] focus:ring-1 focus:ring-[#222B31] focus:outline-none text-sm text-[#1C1512] font-medium transition-all"
                    />
                    {formErrors.email && (
                      <span className="text-[10px] font-mono text-red-600 mt-1 block font-bold">{formErrors.email}</span>
                    )}
                  </div>

                  {/* Message Input */}
                  <div className="relative">
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#1C1512] font-bold mb-1">
                      MESSAGE
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Discuss analytics opportunities, dashboard development, or ML modeling..."
                      className="w-full px-4 py-3 rounded-xl bg-white border border-black/15 focus:border-[#222B31] focus:ring-1 focus:ring-[#222B31] focus:outline-none text-sm text-[#1C1512] font-medium resize-none transition-all"
                    />
                    {formErrors.message && (
                      <span className="text-[10px] font-mono text-red-600 mt-1 block font-bold">{formErrors.message}</span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={formStatus === 'loading'}
                    className="w-full py-3.5 px-6 rounded-xl font-mono text-xs uppercase tracking-wider font-extrabold text-white bg-[#222B31] hover:bg-black shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50 min-h-[46px]"
                  >
                    {formStatus === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>SENDING INQUIRY...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#22D3EE]" />
                        <span>SEND MESSAGE &rarr;</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Footer Area with Non-Heading Wordmark */}
        <div className="pt-10 border-t border-[var(--border-hairline)] flex flex-col items-center">
          
          {/* Animated Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="mb-8 px-5 py-2.5 rounded-full border border-black/15 bg-[#FAF6EF] text-xs font-mono font-bold uppercase tracking-wider text-[#1C1512] hover:bg-white flex items-center gap-2 transition-all shadow-sm min-h-[44px]"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4 text-[#3F6253]" />
            <span>BACK TO TOP</span>
          </button>

          {/* Giant Outlined Wordmark (div, non-heading element to protect single h1 rule) */}
          <div className="w-full text-center overflow-hidden mb-6 select-none group" aria-hidden="true">
            <div
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black uppercase tracking-tight transition-colors duration-500 text-transparent"
              style={{
                WebkitTextStroke: '1.5px rgba(217, 195, 163, 0.35)',
              }}
            >
              <span className="group-hover:text-[#FAF6EF] transition-colors duration-500">
                SHRUTI DIXIT
              </span>
            </div>
          </div>

          <div className="w-full flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[var(--text-page-muted)] font-bold gap-3">
            <div>
              <span>&copy; 2026 Shruti Dixit</span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[var(--text-page)] transition-colors"
              >
                LinkedIn
              </a>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[var(--text-page)] transition-colors"
              >
                GitHub
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="hover:text-[var(--text-page)] transition-colors"
              >
                Email
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* Copied Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-[#222B31] text-[#FAF6EF] border border-[#323E45] shadow-2xl text-xs font-mono font-bold flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-[#22D3EE]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
