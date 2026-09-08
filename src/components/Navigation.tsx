import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sections = [
  { id: 'hero', label: 'SAIL', sublabel: 'Start' },
  { id: 'about', label: 'THE PIRATE KING', sublabel: 'About' },
  { id: 'skills', label: 'BOUNTY', sublabel: 'Powers' },
  { id: 'projects', label: 'ISLANDS', sublabel: 'Quests' },
  { id: 'contact', label: 'MESSAGE', sublabel: 'Contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sectionEls = sections.map(s => document.getElementById(s.id));
      const scrollPos = window.scrollY + window.innerHeight / 3;
      
      for (let i = sectionEls.length - 1; i >= 0; i--) {
        if (sectionEls[i] && sectionEls[i]!.offsetTop <= scrollPos) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      {/* Fixed Navigation Bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'nav-glass py-3' : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo - Jolly Roger */}
          <motion.button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <svg viewBox="0 0 48 48" className="w-10 h-10 group-hover:drop-shadow-[0_0_10px_rgba(218,165,32,0.6)] transition-all">
                {/* Skull */}
                <circle cx="24" cy="18" r="12" fill="var(--op-gold)" opacity="0.9"/>
                <circle cx="20" cy="16" r="2.5" fill="var(--op-darker)"/>
                <circle cx="28" cy="16" r="2.5" fill="var(--op-darker)"/>
                <path d="M20 22 Q24 26 28 22" stroke="var(--op-darker)" strokeWidth="1.5" fill="none"/>
                {/* Crossbones */}
                <line x1="8" y1="32" x2="40" y2="36" stroke="var(--op-gold)" strokeWidth="3" strokeLinecap="round"/>
                <line x1="40" y1="32" x2="8" y2="36" stroke="var(--op-gold)" strokeWidth="3" strokeLinecap="round"/>
                <circle cx="8" cy="32" r="3" fill="var(--op-gold)"/>
                <circle cx="40" cy="32" r="3" fill="var(--op-gold)"/>
                <circle cx="8" cy="36" r="3" fill="var(--op-gold)"/>
                <circle cx="40" cy="36" r="3" fill="var(--op-gold)"/>
                {/* Straw Hat */}
                <ellipse cx="24" cy="10" rx="16" ry="4" fill="var(--op-red)"/>
                <rect x="16" y="6" width="16" height="6" rx="3" fill="#f4a460"/>
                <rect x="16" y="9" width="16" height="2" fill="var(--op-red)"/>
              </svg>
            </div>
            <span className="text-pirate-title text-xl text-golden hidden sm:block">
              THE PIRATE KING
            </span>
          </motion.button>

          {/* Desktop Log Pose Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeSection === section.id
                    ? 'text-golden'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activeSection === section.id && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full border border-[var(--op-gold)]/30 bg-[var(--op-gold)]/10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex flex-col items-center">
                  <span className="text-[10px] opacity-60 font-[family-name:var(--font-pirate)]">{section.sublabel}</span>
                  <span className="text-xs font-[family-name:var(--font-body)]">{section.label}</span>
                </span>
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <div className="flex flex-col gap-1.5">
              <motion.div
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-[var(--op-gold)]"
              />
              <motion.div
                animate={menuOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }}
                className="w-6 h-0.5 bg-[var(--op-gold)]"
              />
              <motion.div
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-[var(--op-gold)]"
              />
            </div>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/90 backdrop-blur-lg flex items-center justify-center md:hidden"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', bounce: 0.3 }}
              className="flex flex-col items-center gap-8"
            >
              {sections.map((section, i) => (
                <motion.button
                  key={section.id}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => scrollTo(section.id)}
                  className="text-center group"
                >
                  <div className="text-pirate-title text-3xl text-golden group-hover:scale-110 transition-transform">
                    {section.label}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 uppercase tracking-widest">
                    {section.sublabel}
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side Log Pose Dots */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
        {sections.map((section) => (
          <motion.button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            className="log-pose-dot group"
            whileHover={{ scale: 1.4 }}
            title={section.label}
          >
            {activeSection === section.id && (
              <motion.div
                layoutId="log-pose-glow"
                className="absolute inset-[-4px] rounded-full border border-[var(--op-gold)]/50"
                transition={{ type: 'spring', bounce: 0.3 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </>
  );
}
