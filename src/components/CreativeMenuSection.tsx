import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

const menuItems = [
  { key: 'home', href: '#home' },
  { key: 'works', href: '#portfolio' },
  { key: 'pages', href: '#services' },
  { key: 'insights', href: '#about' },
  { key: 'contact', href: '#contact' },
];

const CreativeMenuSection = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="w-full py-20 md:py-32 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="container-max relative overflow-hidden rounded-[2rem] md:rounded-[3rem]"
        style={{
          background: 'linear-gradient(145deg, hsl(220 20% 8%) 0%, hsl(220 20% 5%) 100%)',
        }}
      >
        {/* Subtle noise overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none rounded-[2rem] md:rounded-[3rem]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 p-8 md:p-12 lg:p-16">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 min-h-[500px] md:min-h-[600px]">
            {/* Left side - Menu */}
            <div className="flex-1 flex flex-col justify-center">
              <nav className="space-y-4 md:space-y-6">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.key}
                    onClick={() => scrollToSection(item.href)}
                    initial={{ opacity: 0, x: -40 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.1,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="group block text-left"
                  >
                    <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-white/90 transition-all duration-300 group-hover:text-white group-hover:translate-x-3 inline-block">
                      {t(`creativeMenu.${item.key}`)}
                    </span>
                  </motion.button>
                ))}
              </nav>
            </div>

            {/* Right side - Video */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 flex items-center justify-center"
            >
              <div className="relative w-full max-w-md lg:max-w-lg aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src="https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-playing-guitar-close-up-shot-42582-large.mp4" type="video/mp4" />
                </video>
                {/* Subtle parallax overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>

          {/* Bottom footer text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row justify-between items-center gap-4 mt-12 md:mt-16 pt-8 border-t border-white/10"
          >
            <p className="text-white/40 text-sm">
              Made with <span className="text-primary">♥</span> by Soundwave Studio
            </p>
            <p className="text-white/40 text-sm">
              ©2025 All Rights Reserved
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default CreativeMenuSection;
