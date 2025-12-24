import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { Music, Music2, Music3, Music4, Guitar, Piano } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const { t, i18n } = useTranslation();
  const { isRTL } = useLanguage();
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const loadingTexts = [
    i18n.language === 'ar' ? 'ضبط النغمات...' : 'Tuning the Sound...',
    i18n.language === 'ar' ? 'تأليف التجربة...' : 'Composing the Experience...',
    i18n.language === 'ar' ? 'إطلاق الإيقاع...' : 'Launching the Rhythm...',
  ];

  const musicIcons = [
    { Icon: Music, size: 24, delay: 0 },
    { Icon: Music2, size: 20, delay: 0.2 },
    { Icon: Music3, size: 28, delay: 0.4 },
    { Icon: Music4, size: 22, delay: 0.6 },
    { Icon: Guitar, size: 26, delay: 0.8 },
    { Icon: Piano, size: 24, delay: 1 },
  ];

  useEffect(() => {
    const textInterval = setInterval(() => {
      setLoadingPhase((prev) => {
        if (prev < loadingTexts.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1200);

    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 4000);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 4800);

    return () => {
      clearInterval(textInterval);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete, loadingTexts.length]);

  // Progress bar segments (equalizer style)
  const equalizerBars = Array.from({ length: 12 });

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Orbiting musical icons */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {musicIcons.map((item, i) => {
              const angle = (i / musicIcons.length) * Math.PI * 2;
              const radius = 120 + (i % 2) * 40;
              
              return (
                <motion.div
                  key={i}
                  className="absolute text-primary/60"
                  initial={{
                    x: Math.cos(angle) * radius,
                    y: Math.sin(angle) * radius,
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    x: [
                      Math.cos(angle) * radius,
                      Math.cos(angle + Math.PI) * radius,
                      Math.cos(angle + Math.PI * 2) * radius,
                    ],
                    y: [
                      Math.sin(angle) * radius,
                      Math.sin(angle + Math.PI) * radius,
                      Math.sin(angle + Math.PI * 2) * radius,
                    ],
                    opacity: [0, 1, 1, 0.8],
                    scale: [0, 1, 1.1, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 4,
                    delay: item.delay,
                    ease: 'easeInOut',
                    times: [0, 0.3, 0.7, 1],
                  }}
                >
                  <item.Icon size={item.size} />
                </motion.div>
              );
            })}
          </div>

          {/* Central sound wave */}
          <div className="relative flex flex-col items-center">
            {/* Sound wave line */}
            <motion.div className="relative h-20 flex items-center justify-center gap-1 mb-8">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 rounded-full bg-primary"
                  initial={{ height: 4 }}
                  animate={{
                    height: [4, 20 + Math.sin(i * 0.5) * 30, 4],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.05,
                    ease: 'easeInOut',
                  }}
                />
              ))}
              
              {/* Heartbeat pulse effect */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              </motion.div>
            </motion.div>

            {/* Animated typing text */}
            <motion.div
              className="h-8 flex items-center justify-center overflow-hidden"
              key={loadingPhase}
            >
              <motion.p
                className="text-lg md:text-xl font-medium text-foreground/80"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {loadingTexts[loadingPhase].split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>

            {/* Equalizer-style progress bar */}
            <motion.div
              className="flex items-end gap-1 h-8 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {equalizerBars.map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 rounded-t-sm bg-primary/60"
                  animate={{
                    height: [8, 24 + Math.random() * 8, 8],
                    backgroundColor: [
                      'hsl(217 91% 60% / 0.4)',
                      'hsl(217 91% 60% / 1)',
                      'hsl(217 91% 60% / 0.4)',
                    ],
                  }}
                  transition={{
                    duration: 0.6 + Math.random() * 0.4,
                    repeat: Infinity,
                    delay: i * 0.08,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </motion.div>

            {/* Progress dots */}
            <div className="flex gap-2 mt-6">
              {loadingTexts.map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  animate={{
                    backgroundColor: i <= loadingPhase 
                      ? 'hsl(217 91% 60%)' 
                      : 'hsl(var(--muted))',
                    scale: i === loadingPhase ? [1, 1.3, 1] : 1,
                  }}
                  transition={{
                    duration: 0.5,
                    scale: { repeat: Infinity, duration: 1 },
                  }}
                />
              ))}
            </div>
          </div>

          {/* Floating particles that will dissolve */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-primary/40"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100],
                  x: [0, (isRTL ? -1 : 1) * (Math.random() * 50 - 25)],
                  opacity: [0, 0.6, 0],
                  scale: [0, 1, 0.5],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>

          {/* Guitar pick fragments */}
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${30 + i * 8}%`,
                top: `${60 + (i % 3) * 10}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 15, -15, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            >
              <svg width="16" height="20" viewBox="0 0 16 20" className="fill-primary/40">
                <path d="M8 0 L16 8 L8 20 L0 8 Z" />
              </svg>
            </motion.div>
          ))}

          {/* Piano key fragments */}
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-10 bg-gradient-to-b from-background to-muted rounded-b-sm shadow-md"
              style={{
                left: `${20 + i * 18}%`,
                top: `${70 + (i % 2) * 5}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.5, 0.2],
                rotateX: [0, 10, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </motion.div>
      ) : (
        /* Exit animation - particles dissolve and flow into hero */
        <motion.div
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-primary"
              style={{
                left: '50%',
                top: '50%',
              }}
              initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
              animate={{
                x: (Math.random() - 0.5) * window.innerWidth,
                y: (Math.random() - 0.5) * window.innerHeight,
                scale: 0,
                opacity: 0,
              }}
              transition={{
                duration: 0.8,
                delay: i * 0.02,
                ease: 'easeOut',
              }}
            >
              ♪
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
