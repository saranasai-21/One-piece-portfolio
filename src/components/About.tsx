import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';

const stats = [
  { label: 'Years Coding', value: 8, suffix: '+', icon: '⚔️' },
  { label: 'Projects Shipped', value: 50, suffix: '+', icon: '🗺️' },
  { label: 'Bounty (XP)', value: 315, suffix: 'M', icon: '💰' },
  { label: 'Crew Members', value: 20, suffix: '+', icon: '👒' },
];

const personalityTraits = [
  { name: 'Creativity', emoji: '🎨', color: '#ff69b4' },
  { name: 'Problem Solving', emoji: '🧩', color: '#daa520' },
  { name: 'Leadership', emoji: '👑', color: '#c41e3a' },
  { name: 'Adaptability', emoji: '🌊', color: '#006994' },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    gsap.to({ val: 0 }, {
      val: target,
      duration: 2,
      ease: 'power2.out',
      onUpdate: function() {
        setCount(Math.floor(this.targets()[0].val));
      }
    });
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Dramatic Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--op-darker)] via-[#0a0a2e] to-[var(--op-darker)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(100,20,60,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(30,50,100,0.1),transparent_60%)]" />
      
      {/* Dramatic Devil Fruit Decorations with Power Auras */}
      <div className="absolute top-10 left-10 opacity-15 text-6xl devil-fruit-spin" style={{ animationDelay: '0s', filter: 'drop-shadow(0 0 15px rgba(196,30,58,0.5))' }}>
        <span style={{ animation: 'devilsFruitGlow 2s ease-in-out infinite' }}>🍎</span>
      </div>
      <div className="absolute top-20 right-20 opacity-15 text-5xl" style={{ animationDelay: '1s', filter: 'drop-shadow(0 0 15px rgba(75,0,130,0.5))' }}>
        <span style={{ animation: 'devilsFruitGlow 2.5s ease-in-out infinite 0.5s' }}>🍇</span>
      </div>
      <div className="absolute bottom-20 left-1/4 opacity-15 text-7xl" style={{ animationDelay: '2s', filter: 'drop-shadow(0 0 15px rgba(255,140,0,0.5))' }}>
        <span style={{ animation: 'devilsFruitGlow 3s ease-in-out infinite 1s' }}>🍊</span>
      </div>
      <div className="absolute bottom-10 right-1/3 opacity-15 text-4xl" style={{ animationDelay: '0.5s', filter: 'drop-shadow(0 0 15px rgba(100,50,200,0.5))' }}>
        <span style={{ animation: 'devilsFruitGlow 2.8s ease-in-out infinite 1.5s' }}>🫐</span>
      </div>

      <div ref={sectionRef} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-[var(--op-gold)] font-[family-name:var(--font-pirate)] text-lg tracking-widest">
            ⚔️ CAPTAIN'S LOG ⚔️
          </span>
          <h2 className="text-pirate-title text-4xl sm:text-5xl md:text-6xl text-golden mt-4 relative">
            <span style={{ animation: 'auraFlare 3s ease-in-out infinite' }}>About The Captain</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[var(--op-gold)] to-transparent mx-auto mt-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--op-gold)] to-transparent blur-sm" />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Character Card */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="wanted-poster p-8 relative" style={{ background: 'linear-gradient(145deg, #f5e6c8 0%, #e8d5a8 50%, #f5e6c8 100%)' }}>
              {/* WANTED header */}
              <div className="text-center mb-6">
                <h3 className="text-3xl sm:text-4xl font-black tracking-wider"
                    style={{ fontFamily: 'var(--font-pirate)', color: 'var(--op-red-dark)', textShadow: '2px 2px 0 rgba(0,0,0,0.2)' }}>
                  WANTED
                </h3>
                <div className="w-full h-0.5 bg-[var(--op-brown)] mt-2" />
              </div>

              {/* Avatar placeholder - Character silhouette */}
              <div className="w-full aspect-square rounded-lg overflow-hidden mb-6 relative bg-gradient-to-br from-[#d4c4a0] to-[#c4b490] flex items-center justify-center">
                <div className="relative">
                  {/* Animated silhouette */}
                  <svg viewBox="0 0 200 250" className="w-40 h-52">
                    {/* Body */}
                    <circle cx="100" cy="80" r="50" fill="var(--op-brown)" opacity="0.6"/>
                    <rect x="60" y="120" width="80" height="100" rx="10" fill="var(--op-brown)" opacity="0.5"/>
                    {/* Straw Hat */}
                    <ellipse cx="100" cy="55" rx="55" ry="15" fill="#c41e3a" opacity="0.8"/>
                    <rect x="55" y="35" width="90" height="25" rx="12" fill="#f4a460" opacity="0.9"/>
                    <rect x="55" y="48" width="90" height="5" fill="#c41e3a" opacity="0.8"/>
                    {/* Scar */}
                    <path d="M80 75 Q85 70 90 75" stroke="var(--op-brown)" strokeWidth="2" fill="none" opacity="0.4"/>
                  </svg>
                </div>
                {/* Animated overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#d4c4a0] via-transparent to-transparent" />
              </div>

              {/* Name */}
              <div className="text-center">
                <h4 className="text-2xl font-black tracking-wider"
                    style={{ fontFamily: 'var(--font-pirate)', color: '#2a1810' }}>
                  FULL STACK PIRATE
                </h4>
                <p className="text-sm mt-1" style={{ color: '#5a4030', fontFamily: 'var(--font-display)' }}>
                  — The Code Shogun —
                </p>
              </div>

              {/* Bounty */}
              <div className="mt-4 text-center border-t-2 border-[var(--op-brown)]/30 pt-4">
                <span className="text-xs tracking-widest uppercase" style={{ color: '#5a4030' }}>
                  Dead or Alive
                </span>
                <div className="bounty-value text-3xl mt-1">
                  <CountUp target={315} suffix="M" /> Berries
                </div>
              </div>
            </div>

            {/* Decorative rope */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-4 border-[var(--op-brown)]/60" />
          </motion.div>

          {/* Bio & Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <p className="text-lg text-gray-300 leading-relaxed font-[family-name:var(--font-display)]">
                Like Luffy searching for the One Piece, I'm on a quest to find the 
                <span className="text-golden font-bold relative"> perfect code<span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--op-gold)] to-transparent" /></span>. Armed with the power of 
                <span className="text-[var(--op-red)] font-bold haki-hover inline-block px-1 rounded"> Gomu Gomu no TypeScript</span> and 
                <span className="text-[var(--op-blue-ocean)] font-bold observation-pulse inline-block px-1 rounded"> Haki of Observation</span> for debugging, 
                I craft web experiences that make users feel like they've awakened a Devil Fruit.
              </p>
              <p className="text-gray-400 leading-relaxed">
                From the East Blue of basic HTML to the New World of full-stack applications, 
                every project is a new island to conquer. My crew and I build with the ferocity of 
                <span className="text-[var(--op-purple)] font-medium"> Kaido's flames</span> and the determination of 
                <span className="text-[var(--op-red)] font-medium"> a Conqueror's Haki</span>, 
                believing the code we write today will change the Grand Line forever.
              </p>
            </motion.div>

            {/* Personality Traits */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
              {personalityTraits.map((trait) => (
                <motion.div
                  key={trait.name}
                  className="glass-gold rounded-xl p-4 flex items-center gap-3"
                  whileHover={{ scale: 1.05, borderColor: trait.color }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <span className="text-2xl">{trait.emoji}</span>
                  <span className="text-sm font-medium" style={{ color: trait.color }}>{trait.name}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  className="glass-dark rounded-xl p-4 text-center"
                  whileHover={{ scale: 1.08, y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="text-2xl font-bold text-golden font-[family-name:var(--font-pirate)]">
                    <CountUp target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
