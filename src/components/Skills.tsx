import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const skills = [
  {
    name: 'TypeScript',
    bounty: '200M',
    level: 95,
    devilFruit: 'Gomu Gomu no TypeScript',
    color: '#3178c6',
    icon: '⚡',
    type: 'Paramecia',
    description: 'Stretching type safety across the entire codebase',
  },
  {
    name: 'React / Next.js',
    bounty: '180M',
    level: 92,
    devilFruit: 'Niku Niku no React',
    color: '#61dafb',
    icon: '⚛️',
    type: 'Logia',
    description: 'Component-based UI like Logia powers — rendering everywhere',
  },
  {
    name: 'Three.js / WebGL',
    bounty: '150M',
    level: 88,
    devilFruit: 'Soru Soru no Three.js',
    color: '#ffffff',
    icon: '🌐',
    type: 'Mythical',
    description: 'Creating worlds within the browser — the ultimate illusion',
  },
  {
    name: 'Node.js / Python',
    bounty: '160M',
    level: 90,
    devilFruit: 'Mera Mera no Backend',
    color: '#68a063',
    icon: '🔥',
    type: 'Logia',
    description: 'Blazing fast server-side logic that never goes down',
  },
  {
    name: 'CSS / Tailwind',
    bounty: '140M',
    level: 93,
    devilFruit: 'Ope Ope no CSS',
    color: '#06b6d4',
    icon: '🎨',
    type: 'Paramecia',
    description: 'The Room of styling — full control over every pixel',
  },
  {
    name: 'DevOps / Cloud',
    bounty: '120M',
    level: 85,
    devilFruit: 'Suisui no Cloud',
    color: '#ff9900',
    icon: '☁️',
    type: 'Logia',
    description: 'Controlling the skies — deploying at the speed of thought',
  },
  {
    name: 'Database Design',
    bounty: '130M',
    level: 87,
    devilFruit: 'Gura Gura no Data',
    color: '#e06c75',
    icon: '💎',
    type: 'Paramecia',
    description: 'Tremoring through data with earth-shaking queries',
  },
  {
    name: 'UI/UX Design',
    bounty: '110M',
    level: 86,
    devilFruit: 'Hito Hito no Design',
    color: '#c084fc',
    icon: '✨',
    type: 'Mythical',
    description: 'Human-human fruit — understanding what users truly need',
  },
];

function SkillCard({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="card-3d cursor-pointer"
      style={{ perspective: '1000px' }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full"
        style={{ 
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center',
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.175, 0.885, 0.32, 1.275] }}
      >
        {/* Front - Wanted Poster */}
        <div
          className="w-full p-6 rounded-2xl relative overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: `linear-gradient(145deg, #f5e6c8, #e8d5a8, #f5e6c8)`,
            boxShadow: `0 10px 40px rgba(0,0,0,0.4), inset 0 0 30px rgba(139,69,19,0.2)`,
          }}
        >
          {/* Bounty header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-[10px] tracking-[0.2em] text-[#5a4030] uppercase font-bold">Wanted</div>
              <div className="text-[8px] tracking-[0.15em] text-[#8a7060] uppercase">{skill.type} Devil Fruit</div>
            </div>
            <div className="text-right">
              <div className="text-xl font-black" style={{ fontFamily: 'var(--font-pirate)', color: 'var(--op-red-dark)' }}>
                {skill.bounty}
              </div>
              <div className="text-[8px] text-[#8a7060] tracking-wider">BERRIES</div>
            </div>
          </div>

          {/* Skill Icon */}
          <div className="w-full aspect-square rounded-xl mb-4 flex items-center justify-center relative overflow-hidden"
               style={{ background: `linear-gradient(135deg, ${skill.color}22, ${skill.color}11)` }}>
            <span className="text-6xl relative z-10" style={{ filter: `drop-shadow(0 0 15px ${skill.color})` }}>
              {skill.icon}
            </span>
            {/* Dramatic Anime Energy Lines — radiating from center */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 origin-left"
                  style={{
                    width: '100%',
                    height: '1.5px',
                    background: `linear-gradient(90deg, ${skill.color}, transparent)`,
                    transform: `rotate(${i * 30}deg)`,
                    animation: `lightningSurge ${2 + i * 0.3}s ease-in-out infinite ${i * 0.2}s`,
                  }}
                />
              ))}
            </div>
            {/* Power aura ring */}
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                 style={{
                   boxShadow: `inset 0 0 30px ${skill.color}33, 0 0 20px ${skill.color}22`,
                 }} />
          </div>

          {/* Skill Name */}
          <h3 className="text-lg font-black text-center mb-1"
              style={{ fontFamily: 'var(--font-pirate)', color: '#2a1810', textShadow: '1px 1px 0 rgba(0,0,0,0.1)' }}>
            {skill.name}
          </h3>
          
          {/* Progress bar */}
          <div className="mt-3 bg-[#d4c4a0] rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${skill.color}, ${skill.color}cc)` }}
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.3 + index * 0.1, ease: 'power2.out' }}
            />
          </div>
          <div className="text-center mt-1 text-xs" style={{ color: '#5a4030' }}>
            {skill.level}% Mastery
          </div>

          {/* Click hint */}
          <div className="text-center mt-3 text-[10px] text-[#a09080] tracking-wider uppercase">
            ↻ Click to activate Devil Fruit power
          </div>
        </div>

        {/* Back - Devil Fruit Card */}
        <div
          className="w-full p-6 rounded-2xl absolute inset-0"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: `linear-gradient(135deg, ${skill.color}33, ${skill.color}11, #0a0a2e)`,
            border: `2px solid ${skill.color}44`,
            boxShadow: `0 0 40px ${skill.color}22, inset 0 0 30px ${skill.color}11`,
          }}
        >
          <div className="h-full flex flex-col items-center justify-center text-center relative">
            {/* Dramatic power activation effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl opacity-30"
              animate={{
                boxShadow: [
                  `inset 0 0 20px ${skill.color}33`,
                  `inset 0 0 40px ${skill.color}66`,
                  `inset 0 0 20px ${skill.color}33`,
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.span
              className="text-7xl mb-4 block relative z-10"
              animate={{
                rotateY: [0, 360],
                filter: [
                  `drop-shadow(0 0 10px ${skill.color})`,
                  `drop-shadow(0 0 30px ${skill.color}) drop-shadow(0 0 60px ${skill.color})`,
                  `drop-shadow(0 0 10px ${skill.color})`,
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              {skill.icon}
            </motion.span>
            <h3 className="text-xl font-bold text-golden font-[family-name:var(--font-pirate)] mb-2 relative z-10">
              {skill.devilFruit}
            </h3>
            <p className="text-sm text-gray-400 mb-4 relative z-10" style={{ fontFamily: 'var(--font-display)' }}>
              "{skill.description}"
            </p>
            <div className="glass-gold rounded-lg px-4 py-2 text-xs relative z-10 observation-pulse">
              <span style={{ color: skill.color }}>Type: </span>
              <span className="text-golden font-bold">{skill.type}</span>
            </div>
            <div className="mt-4 text-[10px] text-gray-600 uppercase tracking-wider relative z-10">
              ↻ Click to deactivate
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 ocean-bg" />
      
      {/* Wave decoration at top */}
      <div className="absolute top-0 left-0 right-0 h-24 overflow-hidden">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
          <path d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z" fill="#0a0a2e" opacity="0.5"/>
        </svg>
      </div>

      <div ref={sectionRef} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-[var(--op-red)] font-[family-name:var(--font-pirate)] text-lg tracking-widest">
            💀 DEVIL FRUIT ARSENAL 💀
          </span>
          <h2 className="text-pirate-title text-4xl sm:text-5xl md:text-6xl text-golden mt-4 relative">
            <span style={{ animation: 'auraFlare 3s ease-in-out infinite' }}>Bounty & Powers</span>
          </h2>
          <p className="text-gray-400 mt-4 font-[family-name:var(--font-display)] italic max-w-xl mx-auto">
            "The world's strongest warriors are defined by the Devil Fruits they possess!"
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[var(--op-red)] to-transparent mx-auto mt-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--op-red)] to-transparent blur-sm" />
          </div>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>

        {/* Devil Fruit Classification */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 glass-dark rounded-2xl p-8 anime-panel"
        >
          <h3 className="text-xl font-[family-name:var(--font-pirate)] text-golden text-center mb-6">
            ⚡ Power Classification ⚡
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-xl bg-[var(--op-red)]/10 border border-[var(--op-red)]/20 haki-hover observation-pulse transition-all duration-300">
              <div className="text-4xl mb-3">🏋️</div>
              <h4 className="text-[var(--op-red)] font-bold mb-1 text-lg">Paramecia</h4>
              <p className="text-xs text-gray-500">Superhuman abilities that alter the body or manipulate the environment</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-[var(--op-blue-ocean)]/10 border border-[var(--op-blue-ocean)]/20 haki-hover observation-pulse transition-all duration-300">
              <div className="text-4xl mb-3">💨</div>
              <h4 className="text-[var(--op-blue-ocean)] font-bold mb-1 text-lg">Logia</h4>
              <p className="text-xs text-gray-500">Elemental powers granting intangibility and natural element transformation</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-[var(--op-purple)]/10 border border-[var(--op-purple)]/20 haki-hover gear-fifth-hover transition-all duration-300">
              <div className="text-4xl mb-3">🐉</div>
              <h4 className="text-[var(--op-purple)] font-bold mb-1 text-lg">Mythical</h4>
              <p className="text-xs text-gray-500">Powers based on legendary creatures — the rarest Devil Fruits in existence</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
