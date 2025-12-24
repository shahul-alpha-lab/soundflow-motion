import { motion, useScroll, useTransform, useSpring, useVelocity } from 'framer-motion';
import { useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';

const PianoScrollAnimation = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 100, damping: 30 });

  const pianoProgress = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.4, 0.6], [40, 0]);

  // Generate piano keys with realistic properties
  const whiteKeys = useMemo(() => {
    const keys = [];
    for (let i = 0; i < 14; i++) {
      keys.push({
        index: i,
        hasBlackKey: ![2, 6, 9, 13].includes(i), // E and B don't have black keys after them
      });
    }
    return isRTL ? keys.reverse() : keys;
  }, [isRTL]);

  const blackKeyPositions = useMemo(() => {
    // Black keys appear after C, D, F, G, A (indices 0, 1, 3, 4, 5 in each octave)
    const positions = [0, 1, 3, 4, 5, 7, 8, 10, 11, 12];
    return isRTL ? positions.map(p => 13 - p) : positions;
  }, [isRTL]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[180vh] flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Light sweep effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(${isRTL ? '270deg' : '90deg'}, transparent 0%, hsl(var(--primary) / 0.05) 50%, transparent 100%)`,
          x: useTransform(scrollYProgress, [0, 1], [isRTL ? '100%' : '-100%', isRTL ? '-100%' : '100%']),
        }}
      />

      <div className="sticky top-1/2 -translate-y-1/2 w-full max-w-5xl mx-auto px-4">
        {/* Piano keyboard container */}
        <motion.div
          className="relative"
          style={{ opacity: pianoProgress }}
        >
          {/* Shadow/reflection under piano */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[90%] h-16 bg-gradient-to-b from-foreground/5 to-transparent blur-xl rounded-full" />

          {/* Piano body frame */}
          <div className="relative bg-gradient-to-b from-muted/30 to-muted/10 rounded-t-lg p-2 shadow-lg">
            {/* Piano keys container */}
            <div className="relative flex justify-center gap-0.5">
              {/* White keys */}
              {whiteKeys.map((key, i) => {
                const keyProgress = useTransform(
                  scrollYProgress,
                  [0.1 + i * 0.02, 0.2 + i * 0.02],
                  [0, 1]
                );
                
                const isActive = useTransform(
                  scrollYProgress,
                  [0.3 + i * 0.03, 0.35 + i * 0.03, 0.4 + i * 0.03],
                  [0, 1, 0]
                );

                return (
                  <motion.div
                    key={`white-${key.index}`}
                    className="relative"
                    style={{
                      scaleY: keyProgress,
                      transformOrigin: 'top',
                    }}
                  >
                    {/* White key */}
                    <motion.div
                      className="relative w-10 md:w-14 h-40 md:h-56 rounded-b-md cursor-pointer overflow-hidden"
                      style={{
                        background: 'linear-gradient(180deg, hsl(0 0% 98%) 0%, hsl(0 0% 94%) 100%)',
                        boxShadow: '0 4px 8px -2px hsl(var(--foreground) / 0.1), inset 0 -2px 4px hsl(var(--foreground) / 0.05)',
                      }}
                      whileHover={{ 
                        y: 2,
                        boxShadow: '0 2px 4px -1px hsl(var(--foreground) / 0.15), inset 0 -2px 4px hsl(var(--foreground) / 0.1)',
                      }}
                    >
                      {/* Key reflection */}
                      <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/80 to-transparent" />
                      
                      {/* Key depth/bevel */}
                      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-muted to-transparent" />
                      
                      {/* Active glow */}
                      <motion.div
                        className="absolute inset-0 bg-primary/20"
                        style={{ opacity: isActive }}
                      />
                      
                      {/* Light sweep on activation */}
                      <motion.div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(${isRTL ? '270deg' : '90deg'}, transparent, hsl(var(--primary) / 0.3), transparent)`,
                          x: useTransform(isActive, [0, 1], ['-100%', '100%']),
                          opacity: isActive,
                        }}
                      />

                      {/* Micro vibration on note pass */}
                      <motion.div
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary"
                        animate={{
                          scale: [0, 1, 0],
                          opacity: [0, 0.8, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.15,
                        }}
                      />
                    </motion.div>

                    {/* Shadow parallax under key */}
                    <motion.div
                      className="absolute -bottom-3 left-1 right-1 h-3 bg-foreground/10 rounded-full blur-sm"
                      style={{
                        scaleX: 0.8,
                        opacity: useTransform(scrollYProgress, [0.2, 0.5], [0.3, 0.6]),
                      }}
                    />
                  </motion.div>
                );
              })}

              {/* Black keys */}
              <div className="absolute top-0 left-0 right-0 flex justify-center">
                {whiteKeys.map((key, i) => {
                  if (!blackKeyPositions.includes(key.index)) return null;

                  const keyProgress = useTransform(
                    scrollYProgress,
                    [0.15 + i * 0.02, 0.25 + i * 0.02],
                    [0, 1]
                  );

                  const isActive = useTransform(
                    scrollYProgress,
                    [0.32 + i * 0.025, 0.37 + i * 0.025, 0.42 + i * 0.025],
                    [0, 1, 0]
                  );

                  // Calculate position based on white key index
                  const leftOffset = (i + 0.65) * (window.innerWidth < 768 ? 42 : 58);

                  return (
                    <motion.div
                      key={`black-${key.index}`}
                      className="absolute"
                      style={{
                        left: `calc(50% - ${whiteKeys.length * (window.innerWidth < 768 ? 21 : 29)}px + ${leftOffset}px)`,
                        scaleY: keyProgress,
                        transformOrigin: 'top',
                        zIndex: 10,
                      }}
                    >
                      <motion.div
                        className="w-6 md:w-8 h-24 md:h-36 rounded-b-md cursor-pointer overflow-hidden"
                        style={{
                          background: 'linear-gradient(180deg, hsl(220 20% 15%) 0%, hsl(220 20% 8%) 100%)',
                          boxShadow: '0 4px 12px -2px hsl(var(--foreground) / 0.4), inset 0 1px 2px hsl(0 0% 100% / 0.1)',
                        }}
                        whileHover={{
                          y: 1,
                          boxShadow: '0 2px 8px -1px hsl(var(--foreground) / 0.5)',
                        }}
                      >
                        {/* Key reflection */}
                        <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white/10 to-transparent" />
                        
                        {/* Active glow */}
                        <motion.div
                          className="absolute inset-0 bg-primary/40"
                          style={{ opacity: isActive }}
                        />
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Musical notes traveling over keys */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-primary text-xl"
                style={{
                  left: `${10 + i * 12}%`,
                  top: '20%',
                }}
                animate={{
                  y: [0, -60, -120],
                  x: [0, (isRTL ? -1 : 1) * (i % 2 === 0 ? 20 : -20), 0],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.3],
                  rotate: [0, i % 2 === 0 ? 15 : -15, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: 'easeOut',
                }}
              >
                ♪
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Story Text */}
        <motion.div
          className="text-center mt-20"
          style={{ opacity: textOpacity, y: textY }}
        >
          <p className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-4">
            {t('story.subtitle')}
          </p>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-relaxed text-foreground">
            {t('story.title')}
          </h2>
        </motion.div>
      </div>

      {/* Velocity-reactive particles */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: useTransform(smoothVelocity, [-0.5, 0, 0.5], [0.8, 0.2, 0.8]),
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/30"
            style={{
              left: `${20 + i * 12}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default PianoScrollAnimation;
