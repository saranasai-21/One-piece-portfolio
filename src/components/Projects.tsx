import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const projects = [
  {
    title: 'Grand Line Dashboard',
    subtitle: 'Full-Stack Analytics Platform',
    description: 'A comprehensive real-time analytics dashboard that visualizes data like a cartographer mapping the Grand Line. Features WebSocket updates, custom charts, and responsive design.',
    tech: ['React', 'TypeScript', 'D3.js', 'Node.js', 'PostgreSQL'],
    island: 'East Blue',
    color: '#006994',
    emoji: '🗺️',
    bounty: '85M',
    status: 'Conquered',
  },
  {
    title: 'Devil Fruit Store',
    subtitle: 'E-Commerce Platform',
    description: 'A magical marketplace where users can discover and purchase rare Devil Fruits. Built with server-side rendering, Stripe payments, and an immersive 3D product viewer.',
    tech: ['Next.js', 'Three.js', 'Prisma', 'Stripe', 'Vercel'],
    island: 'Alabasta',
    color: '#daa520',
    emoji: '🍎',
    bounty: '92M',
    status: 'Conquered',
  },
  {
    title: 'Straw Hat Chat',
    subtitle: 'Real-Time Communication',
    description: 'A pirate crew communication platform with end-to-end encryption, voice channels, and custom emoji reactions. Supports thousands of concurrent users.',
    tech: ['React', 'Socket.io', 'WebRTC', 'Redis', 'Docker'],
    island: 'Skypiea',
    color: '#87ceeb',
    emoji: '💬',
    bounty: '78M',
    status: 'Conquered',
  },
  {
    title: 'Log Pose Navigator',
    subtitle: 'AI-Powered Route Planner',
    description: 'An intelligent navigation system that uses machine learning to suggest optimal paths through complex project workflows. Visualized as an interactive 3D globe.',
    tech: ['Python', 'TensorFlow', 'React', 'MapboxGL', 'FastAPI'],
    island: 'Wano',
    color: '#c41e3a',
    emoji: '🧭',
    bounty: '95M',
    status: 'In Progress',
  },
  {
    title: 'Haki Training Grounds',
    subtitle: 'Interactive Learning Platform',
    description: 'A gamified coding challenge platform where developers train their "Haki" through progressive coding puzzles. Features leaderboards, achievements, and real-time competitions.',
    tech: ['Vue.js', 'GraphQL', 'MongoDB', 'WebSocket', 'AWS'],
    island: 'W7',
    color: '#6b21a8',
    emoji: '⚔️',
    bounty: '70M',
    status: 'Conquered',
  },
  {
    title: 'Thousand Sunny CI/CD',
    subtitle: 'DevOps Automation Suite',
    description: 'A self-hosted CI/CD pipeline that deploys faster than the Thousand Sunny sails. Supports multi-cloud, auto-scaling, and real-time build monitoring.',
    tech: ['Go', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Prometheus'],
    island: 'Zou',
    color: '#059669',
    emoji: '🚀',
    bounty: '88M',
    status: 'Conquered',
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9]);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, scale }}
      className="relative"
    >
      <div className={`grid md:grid-cols-2 gap-8 items-center ${isEven ? '' : 'md:direction-rtl'}`}>
        {/* Project Visual */}
        <motion.div
          style={{ y }}
          className={`${isEven ? '' : 'md:order-2'}`}
        >
          <div className="island-card group cursor-pointer">
            <div
              className="w-full aspect-video rounded-2xl relative overflow-hidden flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${project.color}22, ${project.color}44, ${project.color}11)`,
                boxShadow: `0 20px 60px ${project.color}22`,
              }}
            >
              {/* Island/Project Visual */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <span className="text-8xl block" style={{ filter: `drop-shadow(0 0 20px ${project.color})` }}>
                  {project.emoji}
                </span>
              </motion.div>

              {/* Island name */}
              <div className="absolute bottom-4 left-4 glass-dark rounded-lg px-3 py-1.5">
                <span className="text-xs text-[var(--op-gold)] font-[family-name:var(--font-pirate)]">
                  🏝️ {project.island}
                </span>
              </div>

              {/* Status badge */}
              <div className={`absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-bold ${
                project.status === 'In Progress' 
                  ? 'bg-[var(--op-gold)]/20 text-[var(--op-gold)] border border-[var(--op-gold)]/30' 
                  : 'bg-[var(--op-green)]/20 text-[var(--op-green)] border border-[var(--op-green)]/30'
              }`}>
                {project.status === 'In Progress' ? '⚓ Sailing...' : '✓ Conquered'}
              </div>

              {/* Anime energy effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0" style={{
                  background: `radial-gradient(circle at center, ${project.color}11, transparent 70%)`,
                }} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Project Info */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 60 : -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`${isEven ? '' : 'md:order-1'} space-y-4`}
        >
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 font-[family-name:var(--font-pirate)] uppercase tracking-wider">
              Island {String(index + 1).padStart(2, '0')}
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-gray-700 to-transparent" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-golden font-[family-name:var(--font-pirate)]">
            {project.title}
          </h3>
          
          <p className="text-sm text-gray-500 font-[family-name:var(--font-display)] italic">
            {project.subtitle}
          </p>

          <p className="text-gray-400 leading-relaxed">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 text-xs rounded-full border font-medium"
                style={{
                  borderColor: `${project.color}33`,
                  color: project.color,
                  background: `${project.color}11`,
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Bounty */}
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 uppercase tracking-wider">Bounty:</span>
              <span className="text-lg font-bold text-[var(--op-red)] font-[family-name:var(--font-pirate)]">
                {project.bounty} Berries
              </span>
            </div>
            <motion.button
              className="ml-auto px-5 py-2 rounded-full text-sm font-bold border-2 transition-all"
              style={{ borderColor: project.color, color: project.color }}
              whileHover={{ scale: 1.05, backgroundColor: `${project.color}22` }}
              whileTap={{ scale: 0.95 }}
            >
              Explore →
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--op-darker)] via-[#0a0a1a] to-[var(--op-darker)]" />

      {/* Map Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
           style={{
             backgroundImage: `
               linear-gradient(var(--op-gold) 1px, transparent 1px),
               linear-gradient(90deg, var(--op-gold) 1px, transparent 1px)
             `,
             backgroundSize: '60px 60px',
           }} />

      <div ref={sectionRef} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-[var(--op-green)] font-[family-name:var(--font-pirate)] text-lg tracking-widest">
            🗺️ GRAND LINE ADVENTURES 🗺️
          </span>
          <h2 className="text-pirate-title text-4xl sm:text-5xl md:text-6xl text-golden mt-4 relative">
            <span style={{ animation: 'auraFlare 3s ease-in-out infinite' }}>Islands Conquered</span>
          </h2>
          <p className="text-gray-400 mt-4 font-[family-name:var(--font-display)] italic max-w-xl mx-auto">
            "The world isn't perfect, but it's there for us doing the best we can!"
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[var(--op-green)] to-transparent mx-auto mt-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--op-green)] to-transparent blur-sm" />
          </div>
        </motion.div>

        {/* Projects */}
        <div className="space-y-24">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* Grand Line Progress */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 glass-dark rounded-2xl p-8"
        >
          <h3 className="text-xl font-[family-name:var(--font-pirate)] text-golden text-center mb-8">
            🧭 Grand Line Progress 🧭
          </h3>
          <div className="relative">
            {/* Progress track */}
            <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, var(--op-blue-ocean), var(--op-gold), var(--op-red))',
                }}
                initial={{ width: 0 }}
                whileInView={{ width: '75%' }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: 'power2.out' }}
              />
            </div>
            {/* Islands on track */}
            <div className="flex justify-between mt-4 text-xs text-gray-500">
              <span>East Blue</span>
              <span>Alabasta</span>
              <span>Skypiea</span>
              <span>Water 7</span>
              <span className="text-[var(--op-gold)] font-bold">Wano ⚓</span>
              <span className="opacity-30">Laugh Tale</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
