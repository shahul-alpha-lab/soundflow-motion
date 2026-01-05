import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';

const menuItems = [
  { key: 'home', href: '#home' },
  { key: 'works', href: '#portfolio' },
  { key: 'pages', href: '#services' },
  { key: 'insights', href: '#about' },
  { key: 'contact', href: '#contact' },
];

const FloatingMenuButton = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Keep video playing continuously
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, [isOpen]);

  const scrollToSection = (href: string) => {
    setIsOpen(false);
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 400);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: isOpen ? 0 : 1, 
          opacity: isOpen ? 0 : 1 
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 right-6 z-[100] w-14 h-14 rounded-full flex items-center justify-center shadow-xl"
        style={{
          background: 'linear-gradient(145deg, hsl(220 20% 12%) 0%, hsl(220 20% 8%) 100%)',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Menu className="w-5 h-5 text-white" />
      </motion.button>

      {/* Expanded Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-[99] bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Expanded Menu Container */}
            <motion.div
              initial={{ scale: 0.3, opacity: 0, borderRadius: '100%' }}
              animate={{ scale: 1, opacity: 1, borderRadius: '2rem' }}
              exit={{ scale: 0.3, opacity: 0, borderRadius: '100%' }}
              transition={{ 
                duration: 0.6, 
                ease: [0.16, 1, 0.3, 1],
              }}
              className="fixed inset-4 md:inset-8 lg:inset-12 z-[100] overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, hsl(220 20% 8%) 0%, hsl(220 20% 5%) 100%)',
                transformOrigin: 'top right',
              }}
            >
              {/* Subtle noise overlay */}
              <div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
              />

              {/* Close Button */}
              <motion.button
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </motion.button>

              <div className="relative z-10 h-full p-8 md:p-12 lg:p-16 flex flex-col">
                <div className="flex-1 flex flex-col lg:flex-row gap-8 lg:gap-16">
                  {/* Left side - Menu */}
                  <div className="flex-1 flex flex-col justify-center">
                    <nav className="space-y-3 md:space-y-5">
                      {menuItems.map((item, index) => (
                        <motion.button
                          key={item.key}
                          onClick={() => scrollToSection(item.href)}
                          initial={{ opacity: 0, x: -60 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            duration: 0.5, 
                            delay: 0.2 + index * 0.08,
                            ease: [0.16, 1, 0.3, 1]
                          }}
                          className="group block text-left"
                        >
                          <span className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white/90 transition-all duration-300 group-hover:text-white group-hover:translate-x-4 inline-block">
                            {t(`creativeMenu.${item.key}`)}
                          </span>
                        </motion.button>
                      ))}
                    </nav>
                  </div>

                  {/* Right side - Video */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex-1 flex items-center justify-center"
                  >
                    <div className="relative w-full max-w-xs md:max-w-sm lg:max-w-md aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                      <video
                        ref={videoRef}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                      >
                        <source src="https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-playing-guitar-close-up-shot-42582-large.mp4" type="video/mp4" />
                      </video>
                      {/* Subtle gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                    </div>
                  </motion.div>
                </div>

                {/* Bottom footer text */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 md:pt-8 border-t border-white/10"
                >
                  <p className="text-white/40 text-sm">
                    Made with <span className="text-primary">♥</span> by Soundwave Studio
                  </p>
                  <p className="text-white/40 text-sm">
                    ©2025 All Rights Reserved
                  </p>
                </motion.div>
              </div>

              {/* Soft shadow glow */}
              <div className="absolute inset-0 rounded-[2rem] pointer-events-none" 
                style={{ boxShadow: 'inset 0 0 100px hsl(217 91% 60% / 0.03)' }} 
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingMenuButton;
