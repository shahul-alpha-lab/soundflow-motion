import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';

const GuitarScrollAnimation = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const stringProgress = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.3, 0.5], [50, 0]);

  const strings = [
    { color: 'hsl(217, 91%, 60%)', thickness: 2, delay: 0 },
    { color: 'hsl(217, 91%, 55%)', thickness: 3, delay: 0.1 },
    { color: 'hsl(217, 91%, 50%)', thickness: 4, delay: 0.2 },
    { color: 'hsl(217, 91%, 45%)', thickness: 3, delay: 0.3 },
    { color: 'hsl(217, 91%, 40%)', thickness: 2, delay: 0.4 },
    { color: 'hsl(217, 91%, 35%)', thickness: 2, delay: 0.5 },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-[150vh] flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Guitar Neck Visual */}
      <div className="sticky top-1/2 -translate-y-1/2 w-full max-w-4xl mx-auto px-8">
        <div className="relative">
          {/* Guitar Strings */}
          <div className="relative h-80 flex flex-col justify-between py-8">
            {strings.map((string, index) => (
              <motion.div
                key={index}
                className="relative w-full overflow-hidden"
                initial={{ scaleX: 0 }}
                style={{
                  scaleX: stringProgress,
                  transformOrigin: isRTL ? 'right' : 'left',
                }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    height: string.thickness,
                    background: `linear-gradient(${isRTL ? '270deg' : '90deg'}, ${string.color}, transparent)`,
                  }}
                  animate={{
                    boxShadow: [
                      `0 0 10px ${string.color}`,
                      `0 0 20px ${string.color}`,
                      `0 0 10px ${string.color}`,
                    ],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: index * 0.15,
                  }}
                />
                
                {/* Vibration effect */}
                <motion.div
                  className="absolute top-0 left-0 right-0"
                  style={{ height: string.thickness }}
                  animate={{
                    y: [-1, 1, -1],
                  }}
                  transition={{
                    duration: 0.1 + index * 0.02,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />

                {/* Notes traveling along strings */}
                <motion.div
                  className="absolute w-3 h-3 rounded-full bg-primary"
                  style={{
                    top: '50%',
                    transform: 'translateY(-50%)',
                    [isRTL ? 'right' : 'left']: 0,
                  }}
                  animate={{
                    [isRTL ? 'right' : 'left']: ['0%', '100%'],
                    opacity: [1, 0.5, 0],
                    scale: [1, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: string.delay + 1,
                    ease: 'easeOut',
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Guitar Pick */}
          <motion.div
            className={`absolute top-1/2 ${isRTL ? 'left-0' : 'right-0'}`}
            style={{
              x: isRTL ? '-100%' : '100%',
            }}
            animate={{
              rotate: [0, 15, -15, 0],
              y: [-5, 5, -5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <svg
              width="40"
              height="50"
              viewBox="0 0 40 50"
              className="fill-primary drop-shadow-lg"
            >
              <path d="M20 0 L40 20 L20 50 L0 20 Z" />
            </svg>
          </motion.div>
        </div>

        {/* Story Text */}
        <motion.div
          className="text-center mt-16"
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

      {/* Floating Musical Notes */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/20 text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.2, 0.5, 0.2],
              rotate: [0, 360],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            ♪
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default GuitarScrollAnimation;
