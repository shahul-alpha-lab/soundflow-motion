import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowDown, Play, ChevronLeft, ChevronRight } from 'lucide-react';

// Slide 1: Piano with floating notes
const PianoSlide = ({ isRTL }: { isRTL: boolean }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Glowing sound waves background */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20"
            style={{
              width: `${300 + i * 150}px`,
              height: `${300 + i * 150}px`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Floating musical notes */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-primary/40"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${20 + Math.random() * 60}%`,
            fontSize: `${16 + Math.random() * 24}px`,
          }}
          animate={{
            y: [-20, -60, -20],
            x: isRTL ? [0, -10, 0] : [0, 10, 0],
            opacity: [0.2, 0.6, 0.2],
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          {['♪', '♫', '♬', '𝄞'][i % 4]}
        </motion.div>
      ))}

      {/* Baby Grand Piano SVG */}
      <motion.div
        className={`absolute ${isRTL ? 'right-[10%]' : 'left-[10%]'} top-1/2 -translate-y-1/2`}
        initial={{ opacity: 0, x: isRTL ? 100 : -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <svg
          viewBox="0 0 400 300"
          className="w-[280px] md:w-[400px] lg:w-[500px] h-auto"
          fill="none"
        >
          {/* Piano body */}
          <motion.path
            d="M50 150 Q50 100 100 80 L350 80 Q380 80 380 110 L380 220 Q380 240 360 240 L80 240 Q50 240 50 210 Z"
            fill="hsl(var(--foreground))"
            fillOpacity="0.05"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2 }}
          />
          {/* Piano lid */}
          <motion.path
            d="M60 145 Q60 100 110 85 L340 85 Q365 85 365 105 L365 145 Z"
            fill="hsl(var(--primary))"
            fillOpacity="0.1"
            stroke="hsl(var(--primary))"
            strokeWidth="1.5"
            animate={{ 
              fillOpacity: [0.1, 0.15, 0.1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {/* Piano keys */}
          {[...Array(14)].map((_, i) => (
            <motion.rect
              key={i}
              x={90 + i * 18}
              y="180"
              width="16"
              height="50"
              rx="2"
              fill="white"
              stroke="hsl(var(--foreground))"
              strokeOpacity="0.2"
              strokeWidth="1"
              animate={{
                y: [180, 178, 180],
                fill: ['#ffffff', '#f0f0f0', '#ffffff'],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                delay: i * 0.15 + Math.random() * 0.5,
                repeatDelay: 2 + Math.random() * 3,
              }}
            />
          ))}
          {/* Black keys */}
          {[0, 1, 3, 4, 5, 7, 8, 10, 11, 12].map((i, idx) => (
            <motion.rect
              key={idx}
              x={100 + i * 18}
              y="180"
              width="10"
              height="30"
              rx="1"
              fill="hsl(var(--foreground))"
              animate={{
                y: [180, 178, 180],
              }}
              transition={{
                duration: 0.4,
                repeat: Infinity,
                delay: idx * 0.2 + Math.random() * 0.5,
                repeatDelay: 3 + Math.random() * 2,
              }}
            />
          ))}
          {/* Piano legs */}
          <rect x="70" y="240" width="15" height="40" fill="hsl(var(--foreground))" fillOpacity="0.1" rx="2" />
          <rect x="355" y="240" width="15" height="40" fill="hsl(var(--foreground))" fillOpacity="0.1" rx="2" />
        </svg>
      </motion.div>

      {/* Ambient particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-10, -30, -10],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
};

// Slide 2: Hearts + Music Notes
const LoveSlide = ({ isRTL }: { isRTL: boolean }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Abstract wave background */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        {[...Array(3)].map((_, i) => (
          <motion.path
            key={i}
            d={`M0 ${200 + i * 80} Q${250} ${150 + i * 60} 500 ${200 + i * 80} T1000 ${200 + i * 80} T1500 ${200 + i * 80}`}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeOpacity={0.1 - i * 0.02}
            strokeWidth="2"
            animate={{
              d: [
                `M0 ${200 + i * 80} Q${250} ${150 + i * 60} 500 ${200 + i * 80} T1000 ${200 + i * 80} T1500 ${200 + i * 80}`,
                `M0 ${200 + i * 80} Q${250} ${250 + i * 60} 500 ${200 + i * 80} T1000 ${200 + i * 80} T1500 ${200 + i * 80}`,
                `M0 ${200 + i * 80} Q${250} ${150 + i * 60} 500 ${200 + i * 80} T1000 ${200 + i * 80} T1500 ${200 + i * 80}`,
              ],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* Floating hearts */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute text-primary"
          style={{
            left: `${15 + i * 10}%`,
            top: `${30 + Math.random() * 40}%`,
            fontSize: `${20 + Math.random() * 20}px`,
          }}
          animate={{
            y: [-10, -30, -10],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2 + Math.random(),
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          ♥
        </motion.div>
      ))}

      {/* Floating music notes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`note-${i}`}
          className="absolute text-primary/50"
          style={{
            left: `${20 + i * 10}%`,
            top: `${40 + Math.random() * 30}%`,
            fontSize: `${18 + Math.random() * 16}px`,
          }}
          animate={{
            y: [-15, -40, -15],
            x: isRTL ? [0, -15, 0] : [0, 15, 0],
            rotate: [-10, 10, -10],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        >
          {['♪', '♫'][i % 2]}
        </motion.div>
      ))}

      {/* Pulsing heart center */}
      <motion.div
        className="absolute text-primary/20"
        style={{ fontSize: '200px' }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      >
        ♥
      </motion.div>
    </div>
  );
};

// Slide 3: Digital Audio World
const AudioSlide = ({ isRTL }: { isRTL: boolean }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Neon digital accents */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary to-transparent"
            style={{
              left: 0,
              right: 0,
              top: `${20 + i * 12}%`,
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scaleX: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Headphones SVG */}
      <motion.svg
        viewBox="0 0 200 200"
        className={`absolute ${isRTL ? 'right-[15%]' : 'left-[15%]'} top-1/2 -translate-y-1/2 w-[150px] md:w-[200px] lg:w-[250px]`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.path
          d="M40 100 Q40 40 100 40 Q160 40 160 100"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="8"
          strokeLinecap="round"
          animate={{
            strokeOpacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.rect
          x="25" y="95" width="30" height="50" rx="10"
          fill="hsl(var(--primary))"
          fillOpacity="0.3"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.rect
          x="145" y="95" width="30" height="50" rx="10"
          fill="hsl(var(--primary))"
          fillOpacity="0.3"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
        />
      </motion.svg>

      {/* Animated equalizer */}
      <div className={`absolute ${isRTL ? 'left-[15%]' : 'right-[15%]'} top-1/2 -translate-y-1/2 flex gap-2 items-end h-[120px]`}>
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="w-3 md:w-4 bg-gradient-to-t from-primary/60 to-primary rounded-t"
            animate={{
              height: [
                `${30 + Math.random() * 40}px`,
                `${60 + Math.random() * 60}px`,
                `${30 + Math.random() * 40}px`,
              ],
            }}
            transition={{
              duration: 0.5 + Math.random() * 0.3,
              repeat: Infinity,
              delay: i * 0.05,
            }}
          />
        ))}
      </div>

      {/* Waveform visualization */}
      <svg className="absolute bottom-20 left-0 right-0 h-20 opacity-30">
        <motion.path
          d="M0 40 Q50 20 100 40 T200 40 T300 40 T400 40 T500 40 T600 40 T700 40 T800 40"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          animate={{
            d: [
              "M0 40 Q50 20 100 40 T200 40 T300 40 T400 40 T500 40 T600 40 T700 40 T800 40",
              "M0 40 Q50 60 100 40 T200 40 T300 40 T400 40 T500 40 T600 40 T700 40 T800 40",
              "M0 40 Q50 20 100 40 T200 40 T300 40 T400 40 T500 40 T600 40 T700 40 T800 40",
            ],
          }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </svg>
    </div>
  );
};

// Slide 4: Technology & Rhythm
const TechSlide = ({ isRTL }: { isRTL: boolean }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Circuit pattern background */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        {[...Array(8)].map((_, i) => (
          <g key={i}>
            <motion.line
              x1={`${i * 15}%`}
              y1="0"
              x2={`${i * 15}%`}
              y2="100%"
              stroke="hsl(var(--primary))"
              strokeWidth="1"
              strokeDasharray="10 20"
              animate={{
                strokeDashoffset: isRTL ? [-30, 0] : [0, -30],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <motion.line
              x1="0"
              y1={`${i * 15}%`}
              x2="100%"
              y2={`${i * 15}%`}
              stroke="hsl(var(--primary))"
              strokeWidth="1"
              strokeDasharray="10 20"
              animate={{
                strokeDashoffset: [0, -30],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </g>
        ))}
        {/* Circuit nodes */}
        {[...Array(12)].map((_, i) => (
          <motion.circle
            key={i}
            cx={`${15 + (i % 4) * 25}%`}
            cy={`${20 + Math.floor(i / 4) * 30}%`}
            r="4"
            fill="hsl(var(--primary))"
            animate={{
              opacity: [0.3, 1, 0.3],
              r: [4, 6, 4],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </svg>

      {/* Motion lines flowing like energy */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
          style={{
            width: '200px',
            top: `${25 + i * 12}%`,
            left: isRTL ? 'auto' : '-100px',
            right: isRTL ? '-100px' : 'auto',
          }}
          animate={{
            x: isRTL ? [0, -window.innerWidth - 200] : [0, window.innerWidth + 200],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "linear",
          }}
        />
      ))}

      {/* Sound wave merging with circuits */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        {[...Array(3)].map((_, i) => (
          <motion.path
            key={i}
            d={`M0 ${300 + i * 50} Q250 ${250 + i * 30} 500 ${300 + i * 50} T1000 ${300 + i * 50}`}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeOpacity={0.15 - i * 0.03}
            strokeWidth="2"
            animate={{
              d: [
                `M0 ${300 + i * 50} Q250 ${250 + i * 30} 500 ${300 + i * 50} T1000 ${300 + i * 50}`,
                `M0 ${300 + i * 50} Q250 ${350 + i * 30} 500 ${300 + i * 50} T1000 ${300 + i * 50}`,
                `M0 ${300 + i * 50} Q250 ${250 + i * 30} 500 ${300 + i * 50} T1000 ${300 + i * 50}`,
              ],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
            }}
          />
        ))}
      </svg>
    </div>
  );
};

// Slide 5: Creative Future
const FutureSlide = ({ isRTL }: { isRTL: boolean }) => {
  const instruments = ['🎸', '🎹', '🎺', '🎻', '🥁', '🎷'];
  const digitalSymbols = ['⚡', '✦', '◈', '◇', '○', '△'];

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Light flares */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/10 blur-3xl"
          style={{
            width: `${200 + i * 100}px`,
            height: `${200 + i * 100}px`,
            left: `${20 + i * 20}%`,
            top: `${30 + i * 10}%`,
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Floating instruments */}
      {instruments.map((instrument, i) => (
        <motion.div
          key={`instrument-${i}`}
          className="absolute"
          style={{
            left: `${10 + i * 15}%`,
            top: `${25 + (i % 3) * 20}%`,
            fontSize: `${30 + Math.random() * 20}px`,
          }}
          animate={{
            y: [-15, -35, -15],
            x: isRTL ? [0, -10, 0] : [0, 10, 0],
            rotate: [-5, 5, -5],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          {instrument}
        </motion.div>
      ))}

      {/* Digital symbols */}
      {digitalSymbols.map((symbol, i) => (
        <motion.div
          key={`symbol-${i}`}
          className="absolute text-primary/40"
          style={{
            right: `${10 + i * 12}%`,
            top: `${30 + (i % 3) * 18}%`,
            fontSize: `${20 + Math.random() * 16}px`,
          }}
          animate={{
            y: [-10, -25, -10],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        >
          {symbol}
        </motion.div>
      ))}

      {/* Particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, -50, -20],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
};

const slides = [
  { id: 1, component: PianoSlide },
  { id: 2, component: LoveSlide },
  { id: 3, component: AudioSlide },
  { id: 4, component: TechSlide },
  { id: 5, component: FutureSlide },
];

const HeroSection = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const scrollToServices = () => {
    const element = document.querySelector('#services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const CurrentSlideComponent = slides[currentSlide].component;

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Animated Slide Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <CurrentSlideComponent isRTL={isRTL} />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 container-max px-4 md:px-8 text-center"
      >
        {/* Tagline */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`tagline-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-xs md:text-sm uppercase tracking-[0.2em] text-primary font-medium mb-4"
          >
            {t(`hero.slides.${currentSlide + 1}.tagline`)}
          </motion.p>
        </AnimatePresence>

        {/* Main Headline */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={`headline-${currentSlide}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
          >
            {t(`hero.slides.${currentSlide + 1}.headline`)}
          </motion.h1>
        </AnimatePresence>

        {/* Subtext */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`subtext-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            {t(`hero.slides.${currentSlide + 1}.subtext`)}
          </motion.p>
        </AnimatePresence>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}
        >
          <motion.button
            onClick={scrollToServices}
            className="group flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg shadow-glow magnetic-hover"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
            {t('hero.cta')}
          </motion.button>

          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-8 py-4 border-2 border-foreground/20 rounded-full font-semibold text-lg hover:border-primary hover:text-primary transition-colors magnetic-hover"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('hero.ctaSecondary')}
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Slide Navigation Arrows */}
      <button
        onClick={isRTL ? nextSlide : prevSlide}
        className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-background/50 backdrop-blur-sm border border-foreground/10 hover:bg-background/80 transition-colors`}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={isRTL ? prevSlide : nextSlide}
        className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-background/50 backdrop-blur-sm border border-foreground/10 hover:bg-background/80 transition-colors`}
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'w-8 bg-primary'
                : 'bg-foreground/20 hover:bg-foreground/40'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-1 text-muted-foreground cursor-pointer"
          onClick={scrollToServices}
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
