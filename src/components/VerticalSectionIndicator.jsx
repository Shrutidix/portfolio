import React, { useState, useEffect } from 'react';

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];

export default function VerticalSectionIndicator() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 110;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-center gap-2 select-none" aria-hidden="true">
      <div className="w-[1px] h-8 bg-black/15 dark:bg-white/15" />

      {/* Mini dots progress rail without numbers or counters */}
      <div className="flex flex-col gap-2 py-1 px-1 rounded-full bg-[#222B31]/70 backdrop-blur-md border border-[#323E45]/60 shadow-lg">
        {SECTIONS.map((sec) => (
          <button
            key={sec.id}
            onClick={() => scrollTo(sec.id)}
            aria-label={`Jump to ${sec.label}`}
            className={`w-2 rounded-full transition-all duration-300 ${
              activeSection === sec.id
                ? 'h-5 bg-[#22D3EE]'
                : 'h-2 bg-white/30 hover:bg-[#7E9387]'
            }`}
          />
        ))}
      </div>

      <div className="w-[1px] h-8 bg-black/15 dark:bg-white/15" />
    </div>
  );
}
