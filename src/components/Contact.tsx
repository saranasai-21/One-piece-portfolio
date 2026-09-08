import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--op-darker)] via-[#1a0a0a] to-[var(--op-darker)]" />
      
      {/* Floating Den Den Mushi decorations */}
      <div className="absolute top-20 left-10 opacity-10 text-8xl" style={{ animation: 'float 8s ease-in-out infinite' }}>🐚</div>
      <div className="absolute bottom-20 right-10 opacity-10 text-7xl" style={{ animation: 'float 6s ease-in-out infinite 1s' }}>📬</div>

      <div ref={sectionRef} className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[var(--op-orange)] font-[family-name:var(--font-pirate)] text-lg tracking-widest">
            📬 DEN DEN MUSHI 📬
          </span>
          <h2 className="text-pirate-title text-4xl sm:text-5xl md:text-6xl text-golden mt-4 relative">
            <span style={{ animation: 'auraFlare 3s ease-in-out infinite' }}>Send a Message</span>
          </h2>
          <p className="text-gray-400 mt-4 font-[family-name:var(--font-display)] italic max-w-xl mx-auto">
            "I'm not going to die. Not yet. There are still things I need to do!"
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[var(--op-orange)] to-transparent mx-auto mt-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--op-orange)] to-transparent blur-sm" />
          </div>
        </motion.div>

        {/* Contact Form - Wanted Poster Style */}
        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: -10 }}
          animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-2xl mx-auto"
        >
          {/* Wanted Poster Frame */}
          <div className="wanted-poster p-8 sm:p-12 relative"
               style={{ background: 'linear-gradient(145deg, #f5e6c8 0%, #e8d5a8 30%, #f5e6c8 70%, #e8d5a8 100%)' }}>
            
            {/* Header */}
            <div className="text-center mb-8">
              <h3 className="text-4xl sm:text-5xl font-black tracking-wider"
                  style={{ fontFamily: 'var(--font-pirate)', color: 'var(--op-red-dark)', textShadow: '3px 3px 0 rgba(0,0,0,0.2)' }}>
                WANTED
              </h3>
              <div className="w-full h-1 bg-[var(--op-brown)] mt-3" />
              <p className="text-sm mt-2" style={{ color: '#5a4030', fontFamily: 'var(--font-display)' }}>
                Dead or Alive — Your Message Is Treasure!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-bold mb-2 uppercase tracking-wider"
                       style={{ color: '#2a1810', fontFamily: 'var(--font-pirate)' }}>
                  ⚔️ Pirate Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Monkey D. Luffy"
                  className="w-full px-4 py-3 rounded-lg border-2 text-[#2a1810] placeholder-[#b0a090] focus:outline-none focus:border-[var(--op-red)] transition-colors"
                  style={{
                    background: '#f0e0c0',
                    borderColor: '#c4b490',
                    fontFamily: 'var(--font-body)',
                  }}
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-bold mb-2 uppercase tracking-wider"
                       style={{ color: '#2a1810', fontFamily: 'var(--font-pirate)' }}>
                  📬 Den Den Mushi Number (Email)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="luffy@strawhats.com"
                  className="w-full px-4 py-3 rounded-lg border-2 text-[#2a1810] placeholder-[#b0a090] focus:outline-none focus:border-[var(--op-red)] transition-colors"
                  style={{
                    background: '#f0e0c0',
                    borderColor: '#c4b490',
                    fontFamily: 'var(--font-body)',
                  }}
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-bold mb-2 uppercase tracking-wider"
                       style={{ color: '#2a1810', fontFamily: 'var(--font-pirate)' }}>
                  🗡️ Your Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="I'm going to be the King of the Pirates!"
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border-2 text-[#2a1810] placeholder-[#b0a090] focus:outline-none focus:border-[var(--op-red)] transition-colors resize-none"
                  style={{
                    background: '#f0e0c0',
                    borderColor: '#c4b490',
                    fontFamily: 'var(--font-body)',
                  }}
                  required
                />
              </div>

              {/* Submit */}
              <div className="text-center pt-4">
                {submitted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-center py-4"
                  >
                    <span className="text-5xl block mb-3">🏴‍☠️</span>
                    <p className="text-xl font-bold" style={{ fontFamily: 'var(--font-pirate)', color: 'var(--op-red-dark)' }}>
                      Message Sent!
                    </p>
                    <p className="text-sm mt-1" style={{ color: '#5a4030' }}>
                      Your message has been sent across the Grand Line!
                    </p>
                  </motion.div>
                ) : (
                  <motion.button
                    type="submit"
                    className="px-10 py-4 rounded-lg text-lg font-bold tracking-wider uppercase transition-all"
                    style={{
                      background: 'linear-gradient(135deg, var(--op-red), var(--op-red-dark))',
                      color: '#fff',
                      fontFamily: 'var(--font-pirate)',
                      boxShadow: '0 4px 15px rgba(196, 30, 58, 0.4)',
                    }}
                    whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(196, 30, 58, 0.6)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    📤 Send to the Grand Line
                  </motion.button>
                )}
              </div>
            </form>

            {/* Corner decorations */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[var(--op-brown)]/50" />
            <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[var(--op-brown)]/50" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[var(--op-brown)]/50" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[var(--op-brown)]/50" />
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center gap-6 mt-16"
        >
          {[
            { name: 'GitHub', icon: '🐙', color: '#fff' },
            { name: 'Twitter', icon: '🐦', color: '#1da1f2' },
            { name: 'LinkedIn', icon: '💼', color: '#0077b5' },
            { name: 'Discord', icon: '🎮', color: '#5865f2' },
          ].map((social) => (
            <motion.a
              key={social.name}
              href="#"
              className="w-14 h-14 rounded-full glass-dark flex items-center justify-center text-2xl transition-all"
              whileHover={{
                scale: 1.2,
                boxShadow: `0 0 20px ${social.color}44`,
                borderColor: social.color,
              }}
              whileTap={{ scale: 0.9 }}
              title={social.name}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
