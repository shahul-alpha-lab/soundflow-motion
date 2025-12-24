import { motion, useScroll, useTransform, useSpring, useVelocity } from 'framer-motion';
import { useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { Music, Headphones, Globe, Code } from 'lucide-react';

const AdvancedGuitarAnimation = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 100, damping: 30 });

  // Stage progress transforms
  const stage1Progress = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const stage2Progress = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const stage3Progress = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);
  const stage4Progress = useTransform(scrollYProgress, [0.6, 0.85], [0, 1]);

  // Guitar body path animation
  const bodyPathLength = useTransform(stage1Progress, [0, 0.6], [0, 1]);
  const neckProgress = useTransform(stage1Progress, [0.3, 0.8], [0, 1]);
  const stringsProgress = useTransform(stage1Progress, [0.5, 1], [0, 1]);

  // Service icons for morphing notes
  const serviceIcons = useMemo(() => [
    { Icon: Music, label: t('services.music'), color: 'hsl(217 91% 60%)' },
    { Icon: Headphones, label: t('services.media'), color: 'hsl(217 91% 55%)' },
    { Icon: Globe, label: t('services.marketing'), color: 'hsl(217 91% 50%)' },
    { Icon: Code, label: t('services.websites'), color: 'hsl(217 91% 45%)' },
  ], [t]);

  // Guitar strings configuration
  const strings = useMemo(() => [
    { thickness: 1.5, frequency: 0.08, color: 'hsl(217 91% 65%)' },
    { thickness: 2, frequency: 0.1, color: 'hsl(217 91% 60%)' },
    { thickness: 2.5, frequency: 0.12, color: 'hsl(217 91% 55%)' },
    { thickness: 3, frequency: 0.14, color: 'hsl(217 91% 50%)' },
    { thickness: 3.5, frequency: 0.16, color: 'hsl(217 91% 45%)' },
    { thickness: 4, frequency: 0.18, color: 'hsl(217 91% 40%)' },
  ], []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[350vh] bg-background"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Main guitar container - diagonal placement */}
        <motion.div
          className="relative w-full max-w-6xl mx-auto"
          style={{
            rotate: isRTL ? -15 : 15,
            scale: useTransform(stage1Progress, [0, 1], [0.8, 1]),
          }}
        >
          <svg
            viewBox="0 0 800 600"
            className="w-full h-auto"
            style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }}
          >
            <defs>
              {/* Metallic string gradient */}
              <linearGradient id="stringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(217 91% 70%)" stopOpacity="0.3" />
                <stop offset="50%" stopColor="hsl(217 91% 80%)" stopOpacity="1" />
                <stop offset="100%" stopColor="hsl(217 91% 70%)" stopOpacity="0.3" />
              </linearGradient>

              {/* Body gradient */}
              <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(30 30% 85%)" />
                <stop offset="50%" stopColor="hsl(30 40% 75%)" />
                <stop offset="100%" stopColor="hsl(30 30% 65%)" />
              </linearGradient>

              {/* Glow filter */}
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Sound hole gradient */}
              <radialGradient id="soundHoleGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="hsl(220 20% 5%)" />
                <stop offset="100%" stopColor="hsl(220 20% 15%)" />
              </radialGradient>
            </defs>

            {/* Stage 1: Guitar Body - Draws itself */}
            <motion.g style={{ opacity: stage1Progress }}>
              {/* Guitar body outline */}
              <motion.path
                d="M600 300 
                   C600 200, 550 120, 480 100 
                   C420 85, 380 85, 320 100 
                   C250 120, 200 200, 200 300 
                   C200 400, 250 480, 320 500 
                   C380 515, 420 515, 480 500 
                   C550 480, 600 400, 600 300"
                fill="url(#bodyGradient)"
                stroke="hsl(30 30% 50%)"
                strokeWidth="3"
                style={{
                  pathLength: bodyPathLength,
                  opacity: bodyPathLength,
                }}
              />

              {/* Sound hole */}
              <motion.circle
                cx="400"
                cy="320"
                r="50"
                fill="url(#soundHoleGradient)"
                stroke="hsl(30 25% 40%)"
                strokeWidth="4"
                style={{
                  scale: useTransform(stage1Progress, [0.4, 0.7], [0, 1]),
                  opacity: useTransform(stage1Progress, [0.4, 0.7], [0, 1]),
                }}
              />

              {/* Rosette decoration */}
              <motion.circle
                cx="400"
                cy="320"
                r="55"
                fill="none"
                stroke="hsl(217 91% 60%)"
                strokeWidth="2"
                strokeDasharray="4 4"
                style={{
                  opacity: useTransform(stage1Progress, [0.5, 0.8], [0, 0.6]),
                }}
              />

              {/* Bridge */}
              <motion.rect
                x="350"
                y="420"
                width="100"
                height="15"
                rx="3"
                fill="hsl(30 40% 25%)"
                style={{
                  opacity: useTransform(stage1Progress, [0.6, 0.9], [0, 1]),
                }}
              />
            </motion.g>

            {/* Guitar Neck */}
            <motion.g style={{ opacity: neckProgress }}>
              {/* Neck */}
              <motion.rect
                x="365"
                y="20"
                width="70"
                height="250"
                rx="5"
                fill="hsl(30 40% 30%)"
                style={{
                  scaleY: neckProgress,
                  transformOrigin: 'center bottom',
                }}
              />

              {/* Fretboard */}
              <motion.rect
                x="370"
                y="25"
                width="60"
                height="240"
                rx="3"
                fill="hsl(220 20% 12%)"
                style={{
                  scaleY: neckProgress,
                  transformOrigin: 'center bottom',
                }}
              />

              {/* Frets */}
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.rect
                  key={i}
                  x="372"
                  y={45 + i * 18}
                  width="56"
                  height="2"
                  fill="hsl(40 50% 70%)"
                  style={{
                    opacity: useTransform(neckProgress, [0.3 + i * 0.05, 0.5 + i * 0.05], [0, 1]),
                  }}
                />
              ))}

              {/* Fret markers */}
              {[2, 4, 6, 8, 11].map((fret, i) => (
                <motion.circle
                  key={i}
                  cx="400"
                  cy={55 + fret * 18}
                  r="4"
                  fill="hsl(0 0% 95%)"
                  style={{
                    opacity: useTransform(neckProgress, [0.5, 0.8], [0, 1]),
                  }}
                />
              ))}

              {/* Headstock */}
              <motion.path
                d="M360 20 L370 0 L430 0 L440 20 L360 20"
                fill="hsl(30 40% 25%)"
                style={{
                  opacity: neckProgress,
                }}
              />

              {/* Tuning pegs */}
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.circle
                  key={i}
                  cx={375 + (i % 3) * 20}
                  cy={i < 3 ? -5 : 5}
                  r="6"
                  fill="hsl(40 50% 60%)"
                  stroke="hsl(40 60% 40%)"
                  strokeWidth="1"
                  style={{
                    opacity: useTransform(neckProgress, [0.7, 1], [0, 1]),
                  }}
                />
              ))}
            </motion.g>

            {/* Stage 2: Guitar Strings with vibration */}
            <motion.g filter="url(#glow)">
              {strings.map((string, i) => {
                const stringY = 380 + i * 8;
                const stringStartY = 10 + i * 8;
                
                return (
                  <motion.g key={i}>
                    {/* Main string */}
                    <motion.line
                      x1="375"
                      y1={stringStartY}
                      x2="425"
                      y2={stringY + 40}
                      stroke="url(#stringGradient)"
                      strokeWidth={string.thickness}
                      strokeLinecap="round"
                      style={{
                        opacity: useTransform(stringsProgress, [i * 0.1, 0.3 + i * 0.1], [0, 1]),
                        pathLength: useTransform(stringsProgress, [i * 0.1, 0.3 + i * 0.1], [0, 1]),
                      }}
                    />

                    {/* Vibrating string overlay */}
                    <motion.line
                      x1="375"
                      y1={stringStartY}
                      x2="425"
                      y2={stringY + 40}
                      stroke={string.color}
                      strokeWidth={string.thickness + 1}
                      strokeLinecap="round"
                      style={{
                        opacity: useTransform(stage2Progress, [0, 0.5, 1], [0, 0.8, 0.4]),
                      }}
                      animate={{
                        y1: [stringStartY - 1, stringStartY + 1, stringStartY - 1],
                        y2: [stringY + 39, stringY + 41, stringY + 39],
                      }}
                      transition={{
                        duration: string.frequency * 10,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                  </motion.g>
                );
              })}
            </motion.g>

            {/* Guitar pick */}
            <motion.g
              style={{
                x: useTransform(stage2Progress, [0, 0.5, 1], [0, 20, -10]),
                y: useTransform(stage2Progress, [0, 0.3, 0.6, 1], [0, -15, 15, 0]),
                rotate: useTransform(stage2Progress, [0, 0.5, 1], [0, 15, -10]),
              }}
            >
              <motion.path
                d="M440 300 L460 285 L455 330 L440 300"
                fill="hsl(217 91% 60%)"
                stroke="hsl(217 91% 50%)"
                strokeWidth="1"
                style={{
                  opacity: useTransform(stage1Progress, [0.8, 1], [0, 1]),
                  filter: 'drop-shadow(0 4px 8px hsl(217 91% 60% / 0.4))',
                }}
              />
            </motion.g>
          </svg>

          {/* Stage 2 & 3: Particles and notes from strings */}
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            style={{ opacity: stage2Progress }}
          >
            {/* Sound wave ripples from sound hole */}
            {Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border-2 border-primary/30"
                style={{
                  left: '50%',
                  top: isRTL ? '45%' : '55%',
                  width: 60 + i * 40,
                  height: 60 + i * 40,
                  marginLeft: -(30 + i * 20),
                  marginTop: -(30 + i * 20),
                }}
                animate={{
                  scale: [1, 1.5, 2],
                  opacity: [0.6, 0.3, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: 'easeOut',
                }}
              />
            ))}

            {/* Musical particles */}
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-primary/60"
                style={{
                  left: `${40 + Math.sin(i) * 15}%`,
                  top: `${40 + Math.cos(i) * 15}%`,
                  fontSize: 16 + (i % 3) * 8,
                }}
                animate={{
                  x: [0, (isRTL ? -1 : 1) * (30 + i * 5), 0],
                  y: [0, -50 - i * 10, -100],
                  opacity: [0, 0.8, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 3 + i * 0.2,
                  repeat: Infinity,
                  delay: i * 0.25,
                  ease: 'easeOut',
                }}
              >
                ♪
              </motion.div>
            ))}
          </motion.div>

          {/* Stage 3: Notes morphing into service icons */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ 
              opacity: stage3Progress,
              rotate: isRTL ? 15 : -15, // Counter-rotate to straighten icons
            }}
          >
            <div className="grid grid-cols-2 gap-8 md:gap-16">
              {serviceIcons.map((service, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col items-center gap-2"
                  style={{
                    x: useTransform(
                      stage3Progress,
                      [0, 0.5, 1],
                      [isRTL ? 100 : -100, 0, 0]
                    ),
                    scale: useTransform(stage3Progress, [0.2 + i * 0.1, 0.5 + i * 0.1], [0, 1]),
                  }}
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                >
                  <motion.div
                    className="p-4 rounded-xl glass glow"
                    whileHover={{ scale: 1.1 }}
                  >
                    <service.Icon 
                      size={32} 
                      className="text-primary"
                    />
                  </motion.div>
                  <span className="text-xs md:text-sm font-medium text-foreground/80">
                    {service.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Stage 4: Scroll progress indicator styled as guitar strings */}
        <motion.div
          className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 flex flex-col gap-2`}
          style={{ opacity: stage4Progress }}
        >
          {strings.map((string, i) => (
            <motion.div
              key={i}
              className="relative h-20 w-1 rounded-full overflow-hidden"
              style={{ backgroundColor: 'hsl(var(--muted))' }}
            >
              <motion.div
                className="absolute bottom-0 left-0 right-0 rounded-full"
                style={{
                  backgroundColor: string.color,
                  height: useTransform(
                    scrollYProgress,
                    [i * 0.15, 0.2 + i * 0.15],
                    ['0%', '100%']
                  ),
                  boxShadow: `0 0 10px ${string.color}`,
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Velocity-reactive glow intensity */}
        <motion.div
          className="absolute inset-0 pointer-events-none bg-primary/5"
          style={{
            opacity: useTransform(smoothVelocity, [-0.5, 0, 0.5], [0.3, 0, 0.3]),
          }}
        />
      </div>
    </section>
  );
};

export default AdvancedGuitarAnimation;
