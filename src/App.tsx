import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import { ConquerorsHaki, ArmamentHakiGlow } from './components/PowerEffects';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);

  // Scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // GSAP ScrollTrigger animations
  useEffect(() => {
    if (isLoading) return;

    // Refresh ScrollTrigger after content loads
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // Parallax for decorative elements
    gsap.utils.toArray('.parallax-slow').forEach((el) => {
      gsap.to(el as HTMLElement, {
        y: -100,
        scrollTrigger: {
          trigger: el as HTMLElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    gsap.utils.toArray('.parallax-fast').forEach((el) => {
      gsap.to(el as HTMLElement, {
        y: -200,
        scrollTrigger: {
          trigger: el as HTMLElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      });
    });

    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [isLoading]);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />

      {/* Power Effects — Conqueror's Haki on click, Armament Haki aura */}
      {!isLoading && <ConquerorsHaki />}
      {!isLoading && <ArmamentHakiGlow />}

      {/* Scroll Progress Bar - Dramatic Red/Gold */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-[100] origin-left"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, var(--op-red), var(--op-gold), var(--op-red), var(--op-purple), var(--op-gold))',
          backgroundSize: '200% 100%',
        }}
      />

      {/* Dramatic Ambient Particles — energy motes rising */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 rounded-full"
            style={{
              background: i % 3 === 0 ? 'var(--op-gold)' : i % 3 === 1 ? 'var(--op-red)' : 'var(--op-blue-ocean)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3,
            }}
            animate={{
              y: [0, -1000],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <div ref={mainRef} className="relative z-10">
        <Navigation />
        <Hero />
        
        {/* Swords Divider between sections */}
        <div className="swords-divider relative z-10 bg-[var(--op-darker)]">
          <span className="text-[var(--op-gold)] text-3xl">⚔️</span>
        </div>
        
        <About />
        
        <div className="swords-divider relative z-10 bg-[var(--op-darker)]">
          <span className="text-[var(--op-red)] text-3xl">🏴‍☠️</span>
        </div>
        
        <Skills />
        
        <div className="swords-divider relative z-10" style={{ background: 'linear-gradient(180deg, #001428, var(--op-darker))' }}>
          <span className="text-[var(--op-green)] text-3xl">🗺️</span>
        </div>
        
        <Projects />
        
        <div className="swords-divider relative z-10 bg-[var(--op-darker)]">
          <span className="text-[var(--op-orange)] text-3xl">📬</span>
        </div>
        
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default App;
