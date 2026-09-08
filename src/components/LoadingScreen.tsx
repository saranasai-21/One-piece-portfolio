import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  isLoading: boolean;
  onComplete?: () => void;
}

export default function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[var(--op-darker)] flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Straw Hat Animation */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <svg viewBox="0 0 120 80" className="w-32 h-22">
              <motion.ellipse
                cx="60" cy="55" rx="55" ry="12"
                fill="#c41e3a"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              />
              <motion.rect
                x="20" y="30" width="80" height="30" rx="20"
                fill="#f4a460"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                style={{ transformOrigin: '60px 55px' }}
              />
              <motion.rect
                x="20" y="45" width="80" height="8"
                fill="#c41e3a"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                style={{ transformOrigin: '60px 49px' }}
              />
            </svg>
          </motion.div>

          {/* Loading Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-8 text-center"
          >
            <h2 className="text-pirate-title text-3xl text-golden mb-4">
              ACTIVATING HAKI...
            </h2>
            
            {/* Dramatic Progress Bar */}
            <div className="w-48 h-1.5 bg-gray-800 rounded-full overflow-hidden mx-auto relative">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, var(--op-red), var(--op-gold), var(--op-red))',
                }}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              />
              {/* Energy pulse on progress */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{ boxShadow: ['0 0 5px rgba(218,165,32,0.3)', '0 0 15px rgba(218,165,32,0.6)', '0 0 5px rgba(218,165,32,0.3)'] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </div>
            
            <motion.p
              className="text-xs text-gray-600 mt-3 font-[family-name:var(--font-display)] italic"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Awakening the Conqueror's Haki...
            </motion.p>
          </motion.div>

          {/* Particle Effect */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[var(--op-gold)]"
              initial={{
                x: 0,
                y: 0,
                opacity: 0,
              }}
              animate={{
                x: Math.cos(i * 30 * Math.PI / 180) * 100,
                y: Math.sin(i * 30 * Math.PI / 180) * 100,
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 1.5,
                delay: 0.5 + i * 0.1,
                repeat: Infinity,
                repeatDelay: 0.5,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
