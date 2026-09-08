import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative py-16 overflow-hidden border-t border-[var(--op-gold)]/10">
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--op-darker)] to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Jolly Roger */}
        <motion.div
          className="flex justify-center mb-8"
          animate={{ rotate: [0, -3, 3, -3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg viewBox="0 0 120 100" className="w-20 h-16 drop-shadow-[0_0_20px_rgba(218,165,32,0.3)]">
            {/* Skull */}
            <circle cx="60" cy="35" r="25" fill="var(--op-gold)" opacity="0.9"/>
            <circle cx="52" cy="32" r="5" fill="var(--op-darker)"/>
            <circle cx="68" cy="32" r="5" fill="var(--op-darker)"/>
            <path d="M52 42 Q60 50 68 42" stroke="var(--op-darker)" strokeWidth="2" fill="none"/>
            {/* Teeth */}
            <line x1="54" y1="46" x2="54" y2="50" stroke="var(--op-darker)" strokeWidth="1.5"/>
            <line x1="58" y1="47" x2="58" y2="51" stroke="var(--op-darker)" strokeWidth="1.5"/>
            <line x1="62" y1="47" x2="62" y2="51" stroke="var(--op-darker)" strokeWidth="1.5"/>
            <line x1="66" y1="46" x2="66" y2="50" stroke="var(--op-darker)" strokeWidth="1.5"/>
            {/* Crossbones */}
            <line x1="15" y1="70" x2="105" y2="80" stroke="var(--op-gold)" strokeWidth="5" strokeLinecap="round"/>
            <line x1="105" y1="70" x2="15" y2="80" stroke="var(--op-gold)" strokeWidth="5" strokeLinecap="round"/>
            <circle cx="15" cy="70" r="6" fill="var(--op-gold)"/>
            <circle cx="105" cy="70" r="6" fill="var(--op-gold)"/>
            <circle cx="15" cy="80" r="6" fill="var(--op-gold)"/>
            <circle cx="105" cy="80" r="6" fill="var(--op-gold)"/>
            {/* Straw Hat */}
            <ellipse cx="60" cy="18" rx="35" ry="10" fill="#c41e3a"/>
            <rect x="32" y="5" width="56" height="16" rx="8" fill="#f4a460"/>
            <rect x="32" y="13" width="56" height="5" fill="#c41e3a"/>
          </svg>
        </motion.div>

        {/* Quote */}
        <p className="text-center text-gray-500 font-[family-name:var(--font-display)] italic text-lg mb-8">
          "I don't want to conquer anything. I just think the guy with the most freedom in this ocean... is the Pirate King!"
          <br />
        </p>
        <p className="text-center text-gray-600 text-sm">
          — Monkey D. Luffy
        </p>

        {/* Divider */}
        <div className="swords-divider my-8">
          <span className="text-[var(--op-gold)] text-2xl">⚔️</span>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <p>
            © 2026 <span className="text-[var(--op-gold)] font-[family-name:var(--font-pirate)]">Straw Hat Pirates</span>. All rights reserved.
          </p>
          <p className="flex items-center gap-2">
            Built with <span className="text-[var(--op-red)]">🔥</span> and the power of 
            <span className="text-[var(--op-gold)] font-[family-name:var(--font-pirate)]"> Conqueror's Haki</span>
          </p>
        </div>

        {/* Easter Egg */}
        <motion.div
          className="text-center mt-8 text-xs text-gray-700"
          whileHover={{ color: 'var(--op-gold)', scale: 1.1 }}
        >
          🏴‍☠️ I'm gonna be the Pirate King! 🏴‍☠️
        </motion.div>
      </div>
    </footer>
  );
}
