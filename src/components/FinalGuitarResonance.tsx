import { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from 'react-i18next';

const FinalGuitarResonance = () => {
  const { isRTL } = useLanguage();
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  
  // Animation transforms
  const guitarOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.5]);
  const guitarScale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.6, 0.8], [30, 0]);
  
  // String vibration based on scroll velocity
  const vibrationIntensity = useTransform(smoothVelocity, [-0.1, 0, 0.1], [3, 0, 3]);
  
  // Generate musical notes
  const musicalNotes = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      startX: 150 + (i % 4) * 50,
      startY: 100 + Math.floor(i / 4) * 100,
      symbol: ['♪', '♫', '♩', '♬'][i % 4],
    }));
  }, []);

  // Guitar strings configuration
  const strings = useMemo(() => [
    { y: 80, thickness: 1.5, delay: 0 },
    { y: 100, thickness: 1.8, delay: 0.1 },
    { y: 120, thickness: 2, delay: 0.2 },
    { y: 140, thickness: 2.2, delay: 0.3 },
    { y: 160, thickness: 2.5, delay: 0.4 },
    { y: 180, thickness: 2.8, delay: 0.5 },
  ], []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-background overflow-hidden py-20"
    >
      {/* Background subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-accent/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            {t('finalResonance.title', 'Final Resonance')}
          </h2>
        </motion.div>
        
        {/* Guitar SVG Container */}
        <motion.div
          className="relative w-full max-w-4xl mx-auto aspect-[16/9]"
          style={{
            opacity: guitarOpacity,
            scale: guitarScale,
            transform: isRTL ? 'scaleX(-1)' : 'scaleX(1)',
          }}
        >
          <svg
            viewBox="0 0 400 250"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Definitions for effects */}
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              
              <linearGradient id="stringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.3"/>
                <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="1"/>
                <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.3"/>
              </linearGradient>
              
              <radialGradient id="bodyGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.1"/>
                <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0"/>
              </radialGradient>
            </defs>
            
            {/* Guitar Body Silhouette */}
            <motion.path
              d="M280 130 
                 C280 80 320 60 340 60 
                 C360 60 380 80 380 110 
                 C380 140 370 170 350 190 
                 C330 210 300 220 270 220 
                 C240 220 210 210 190 190 
                 C170 170 160 140 160 110 
                 C160 80 180 60 200 60 
                 C220 60 260 80 280 130 Z"
              fill="none"
              stroke="hsl(var(--foreground))"
              strokeWidth="1.5"
              strokeOpacity="0.3"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
            
            {/* Sound hole */}
            <motion.circle
              cx="270"
              cy="140"
              r="25"
              fill="url(#bodyGlow)"
              stroke="hsl(var(--foreground))"
              strokeWidth="1"
              strokeOpacity="0.2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.5 }}
            />
            
            {/* Guitar Neck */}
            <motion.rect
              x="20"
              y="70"
              width="160"
              height="120"
              rx="3"
              fill="none"
              stroke="hsl(var(--foreground))"
              strokeWidth="1"
              strokeOpacity="0.2"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.5 }}
              style={{ transformOrigin: 'right center' }}
            />
            
            {/* Tuning head */}
            <motion.rect
              x="0"
              y="75"
              width="25"
              height="110"
              rx="5"
              fill="none"
              stroke="hsl(var(--foreground))"
              strokeWidth="1"
              strokeOpacity="0.3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.2 }}
            />
            
            {/* Tuning pegs */}
            {strings.map((string, i) => (
              <motion.circle
                key={`peg-${i}`}
                cx="5"
                cy={string.y}
                r="4"
                fill="hsl(var(--foreground))"
                fillOpacity="0.2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 1.4 + i * 0.1 }}
              />
            ))}
            
            {/* Guitar Strings with vibration */}
            {strings.map((string, i) => (
              <motion.g key={`string-group-${i}`}>
                {/* String base */}
                <motion.line
                  x1="20"
                  y1={string.y}
                  x2="320"
                  y2={string.y}
                  stroke="url(#stringGradient)"
                  strokeWidth={string.thickness}
                  filter="url(#glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.8 + string.delay }}
                />
                
                {/* Vibrating string overlay */}
                <motion.path
                  d={`M20 ${string.y} Q170 ${string.y} 320 ${string.y}`}
                  fill="none"
                  stroke="hsl(var(--accent))"
                  strokeWidth={string.thickness * 0.5}
                  strokeOpacity="0.6"
                  filter="url(#glow)"
                  animate={{
                    d: [
                      `M20 ${string.y} Q170 ${string.y - 3} 320 ${string.y}`,
                      `M20 ${string.y} Q170 ${string.y + 3} 320 ${string.y}`,
                      `M20 ${string.y} Q170 ${string.y - 3} 320 ${string.y}`,
                    ],
                  }}
                  transition={{
                    duration: 0.15 + i * 0.02,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ opacity: vibrationIntensity }}
                />
              </motion.g>
            ))}
            
            {/* Bridge */}
            <motion.rect
              x="300"
              y="75"
              width="8"
              height="110"
              rx="2"
              fill="hsl(var(--foreground))"
              fillOpacity="0.15"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.8 }}
            />
            
            {/* Fret markers */}
            {[60, 100, 140].map((x, i) => (
              <motion.circle
                key={`fret-${i}`}
                cx={x}
                cy="130"
                r="3"
                fill="hsl(var(--accent))"
                fillOpacity="0.3"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 1.6 + i * 0.1 }}
              />
            ))}
            
            {/* Sound wave ripples from sound hole */}
            {[1, 2, 3].map((ring) => (
              <motion.circle
                key={`wave-${ring}`}
                cx="270"
                cy="140"
                r={25 + ring * 15}
                fill="none"
                stroke="hsl(var(--accent))"
                strokeWidth="0.5"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: [0, 0.3, 0],
                  scale: [0.8, 1.2, 1.5],
                }}
                transition={{
                  duration: 3,
                  delay: ring * 0.5,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            ))}
          </svg>
          
          {/* Musical notes that emit from strings */}
          {musicalNotes.map((note) => (
            <motion.div
              key={note.id}
              className="absolute text-accent text-2xl font-light pointer-events-none"
              style={{
                left: `${(note.startX / 400) * 100}%`,
                top: `${(note.startY / 250) * 100}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0.5, 1, 0.5],
                x: isRTL 
                  ? [0, -50 - note.id * 10, -100 - note.id * 20]
                  : [0, 50 + note.id * 10, 100 + note.id * 20],
                y: [0, -30 - note.id * 5, -60 - note.id * 10],
              }}
              transition={{
                duration: 4,
                delay: note.id * 0.4,
                repeat: Infinity,
                ease: "easeOut",
              }}
            >
              {note.symbol}
            </motion.div>
          ))}
          
          {/* Ambient glow pulse */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, hsl(var(--accent) / 0.05) 0%, transparent 70%)',
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
        
        {/* Final text */}
        <motion.div
          className="text-center mt-16 max-w-xl mx-auto"
          style={{
            opacity: textOpacity,
            y: textY,
          }}
        >
          <motion.p
            className="text-xl md:text-2xl font-display text-foreground/80 tracking-wide"
            initial={{ letterSpacing: '0em' }}
            whileInView={{ letterSpacing: '0.05em' }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            {isRTL ? 'كل نغمة تترك أثرًا.' : 'Every sound leaves a trace.'}
          </motion.p>
        </motion.div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 rounded-full bg-accent/30"
              style={{
                left: `${10 + (i * 7)}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + i * 0.2,
                delay: i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FinalGuitarResonance;
