import { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const PianoMovementSection = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const scrollVelocity = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), { stiffness: 300, damping: 50 });

  // Piano animations
  const pianoOpacity = useTransform(smoothProgress, [0, 0.15], [0, 1]);
  const lidRotation = useTransform(smoothProgress, [0.1, 0.4], [0, -25]);
  const pianoScale = useTransform(smoothProgress, [0, 0.2], [0.9, 1]);
  const parallaxY = useTransform(smoothProgress, [0, 1], [50, -50]);

  // Text animations
  const textOpacity = useTransform(smoothProgress, [0.5, 0.7], [0, 1]);
  const textY = useTransform(smoothProgress, [0.5, 0.7], [30, 0]);

  // Generate piano keys (white keys)
  const whiteKeys = useMemo(() => {
    const keys = [];
    for (let i = 0; i < 14; i++) {
      keys.push({
        id: i,
        x: isRTL ? 280 - i * 20 : 60 + i * 20,
      });
    }
    return keys;
  }, [isRTL]);

  // Black keys positions (between certain white keys)
  const blackKeys = useMemo(() => {
    const pattern = [0, 1, 3, 4, 5, 7, 8, 10, 11, 12]; // Skip positions for natural white key gaps
    return pattern.map((pos, idx) => ({
      id: idx,
      x: isRTL ? 290 - pos * 20 : 70 + pos * 20,
    }));
  }, [isRTL]);

  // Musical notes that emit from keys
  const musicalNotes = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      symbol: ['♪', '♫', '♩', '♬'][i % 4],
      startX: isRTL ? 280 - (i % 14) * 20 : 80 + (i % 14) * 20,
      delay: i * 0.15,
      direction: i % 3, // 0: up, 1: diagonal-left, 2: diagonal-right
    }));
  }, [isRTL]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[200vh] bg-background overflow-hidden"
    >
      {/* Sticky container for the piano */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Ambient glow background */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: useTransform(smoothProgress, [0.2, 0.5], [0, 0.3]) }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#4287f5]/10 rounded-full blur-[100px]" />
        </motion.div>

        {/* Main Piano Container */}
        <motion.div
          className="relative w-full max-w-4xl mx-auto px-4"
          style={{
            opacity: pianoOpacity,
            scale: pianoScale,
            y: parallaxY,
          }}
        >
          {/* Baby Grand Piano SVG */}
          <svg
            viewBox="0 0 400 300"
            className="w-full h-auto"
            style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }}
          >
            {/* Piano Body - Curved shape */}
            <defs>
              <linearGradient id="pianoBodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1a1a1a" />
                <stop offset="50%" stopColor="#0d0d0d" />
                <stop offset="100%" stopColor="#000000" />
              </linearGradient>
              <linearGradient id="pianoLidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2a2a2a" />
                <stop offset="100%" stopColor="#1a1a1a" />
              </linearGradient>
              <filter id="pianoglow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="softShadow">
                <feDropShadow dx="0" dy="10" stdDeviation="15" floodOpacity="0.3"/>
              </filter>
            </defs>

            {/* Piano shadow */}
            <ellipse
              cx="200"
              cy="280"
              rx="150"
              ry="15"
              fill="rgba(0,0,0,0.2)"
              filter="url(#softShadow)"
            />

            {/* Piano body (curved grand piano shape) */}
            <motion.path
              d="M50 180 Q50 120 120 100 L300 100 Q350 100 350 150 L350 220 Q350 240 330 240 L70 240 Q50 240 50 220 Z"
              fill="url(#pianoBodyGradient)"
              stroke="#333"
              strokeWidth="1"
              filter="url(#softShadow)"
            />

            {/* Piano lid (opens with scroll) */}
            <motion.g
              style={{ 
                originX: '50px',
                originY: '180px',
                rotateX: lidRotation,
              }}
            >
              <path
                d="M55 175 Q55 125 120 105 L295 105 Q340 105 345 145 L345 175 Z"
                fill="url(#pianoLidGradient)"
                stroke="#444"
                strokeWidth="0.5"
              />
              {/* Lid reflection */}
              <path
                d="M60 170 Q60 135 120 115 L280 115 Q320 115 335 140 L335 165 Z"
                fill="rgba(255,255,255,0.03)"
              />
            </motion.g>

            {/* Piano legs */}
            <rect x="70" y="240" width="8" height="40" fill="#0d0d0d" rx="2" />
            <rect x="322" y="240" width="8" height="40" fill="#0d0d0d" rx="2" />
            <rect x="196" y="240" width="8" height="35" fill="#0d0d0d" rx="2" />

            {/* Keyboard base */}
            <rect x="55" y="180" width="290" height="55" fill="#111" stroke="#222" strokeWidth="0.5" />

            {/* White keys */}
            {whiteKeys.map((key, index) => {
              const keyProgress = useTransform(
                smoothProgress,
                [0.2 + index * 0.03, 0.25 + index * 0.03, 0.3 + index * 0.03],
                [0, 1, 0]
              );
              
              return (
                <motion.g key={key.id}>
                  <motion.rect
                    x={key.x}
                    y={185}
                    width="18"
                    height="45"
                    fill="#fafafa"
                    stroke="#ddd"
                    strokeWidth="0.5"
                    rx="1"
                    style={{
                      y: useTransform(keyProgress, [0, 1], [185, 188]),
                    }}
                  />
                  {/* Key reflection */}
                  <rect
                    x={key.x + 2}
                    y={186}
                    width="14"
                    height="8"
                    fill="rgba(255,255,255,0.5)"
                    rx="1"
                  />
                  {/* Key glow when pressed */}
                  <motion.rect
                    x={key.x - 2}
                    y={183}
                    width="22"
                    height="50"
                    fill="#4287f5"
                    rx="2"
                    style={{
                      opacity: useTransform(keyProgress, [0, 0.5, 1], [0, 0.3, 0]),
                    }}
                    filter="url(#pianoglow)"
                  />
                </motion.g>
              );
            })}

            {/* Black keys */}
            {blackKeys.map((key, index) => {
              const keyProgress = useTransform(
                smoothProgress,
                [0.22 + index * 0.035, 0.27 + index * 0.035, 0.32 + index * 0.035],
                [0, 1, 0]
              );

              return (
                <motion.g key={key.id}>
                  <motion.rect
                    x={key.x}
                    y={185}
                    width="12"
                    height="28"
                    fill="#1a1a1a"
                    stroke="#000"
                    strokeWidth="0.3"
                    rx="1"
                    style={{
                      y: useTransform(keyProgress, [0, 1], [185, 187]),
                    }}
                  />
                  {/* Black key highlight */}
                  <rect
                    x={key.x + 1}
                    y={186}
                    width="4"
                    height="20"
                    fill="rgba(255,255,255,0.08)"
                    rx="0.5"
                  />
                  {/* Black key glow */}
                  <motion.rect
                    x={key.x - 2}
                    y={183}
                    width="16"
                    height="32"
                    fill="#4287f5"
                    rx="2"
                    style={{
                      opacity: useTransform(keyProgress, [0, 0.5, 1], [0, 0.4, 0]),
                    }}
                    filter="url(#pianoglow)"
                  />
                </motion.g>
              );
            })}

            {/* Music stand */}
            <rect x="170" y="115" width="60" height="4" fill="#222" rx="1" />
            <rect x="185" y="100" width="30" height="15" fill="#1a1a1a" stroke="#333" strokeWidth="0.5" rx="1" />

            {/* Brand name on piano */}
            <text x="200" y="170" textAnchor="middle" fill="#333" fontSize="8" fontFamily="serif">
              ♪ SYMPHONY ♪
            </text>
          </svg>

          {/* Flying Musical Notes */}
          {musicalNotes.map((note) => {
            const noteProgress = useTransform(
              smoothProgress,
              [0.25 + note.delay * 0.5, 0.4 + note.delay * 0.5, 0.6 + note.delay * 0.5],
              [0, 0.5, 1]
            );

            const noteOpacity = useTransform(
              noteProgress,
              [0, 0.2, 0.8, 1],
              [0, 1, 1, 0]
            );

            const noteY = useTransform(
              noteProgress,
              [0, 1],
              [0, -200 - note.id * 15]
            );

            const noteX = useTransform(
              noteProgress,
              [0, 1],
              [0, note.direction === 0 ? 0 : note.direction === 1 ? (isRTL ? 50 : -50) : (isRTL ? -50 : 50)]
            );

            const noteRotate = useTransform(noteProgress, [0, 1], [0, note.direction === 0 ? 0 : note.direction === 1 ? -30 : 30]);

            return (
              <motion.div
                key={note.id}
                className="absolute text-2xl md:text-3xl pointer-events-none"
                style={{
                  left: `${note.startX / 4 + 25}%`,
                  top: '45%',
                  opacity: noteOpacity,
                  y: noteY,
                  x: noteX,
                  rotate: noteRotate,
                  color: '#4287f5',
                  textShadow: '0 0 20px rgba(66, 135, 245, 0.6)',
                }}
              >
                {note.symbol}
              </motion.div>
            );
          })}

          {/* Particle trail effects */}
          {Array.from({ length: 20 }).map((_, i) => {
            const particleProgress = useTransform(
              smoothProgress,
              [0.3 + i * 0.02, 0.5 + i * 0.02, 0.7 + i * 0.02],
              [0, 0.5, 1]
            );

            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-[#4287f5] pointer-events-none"
                style={{
                  left: `${20 + (i % 10) * 6}%`,
                  top: '50%',
                  opacity: useTransform(particleProgress, [0, 0.3, 0.7, 1], [0, 0.8, 0.5, 0]),
                  y: useTransform(particleProgress, [0, 1], [0, -150 - i * 10]),
                  x: useTransform(particleProgress, [0, 1], [0, (i % 2 === 0 ? 1 : -1) * (10 + i * 3) * (isRTL ? -1 : 1)]),
                  scale: useTransform(particleProgress, [0, 0.5, 1], [0, 1.5, 0]),
                }}
              />
            );
          })}

          {/* Energy waves along strings (subtle) */}
          {[0, 1, 2].map((wave) => {
            const waveProgress = useTransform(
              scrollVelocity,
              [0, 0.5, 1],
              [0, 0.5, 1]
            );

            return (
              <motion.div
                key={wave}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{
                  width: 200 + wave * 100,
                  height: 100 + wave * 50,
                  border: '1px solid rgba(66, 135, 245, 0.2)',
                  borderRadius: '50%',
                  opacity: useTransform(waveProgress, [0, 0.5, 1], [0, 0.3 - wave * 0.1, 0]),
                  scale: useTransform(waveProgress, [0, 1], [0.8, 1.2 + wave * 0.2]),
                }}
              />
            );
          })}
        </motion.div>

        {/* Story text */}
        <motion.div
          className="absolute bottom-20 left-0 right-0 text-center px-4"
          style={{
            opacity: textOpacity,
            y: textY,
          }}
        >
          <motion.p
            className="text-lg md:text-2xl font-light text-foreground/80 tracking-wide"
            style={{
              letterSpacing: useTransform(smoothProgress, [0.6, 0.8], ['0.05em', '0.15em']),
            }}
          >
            {isRTL ? 'كل مفتاح يروي حكاية.' : 'Every key tells a story.'}
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{
            opacity: useTransform(smoothProgress, [0, 0.1, 0.3], [1, 1, 0]),
          }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-foreground/20 rounded-full flex justify-center"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-2 bg-[#4287f5] rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PianoMovementSection;
