import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { Guitar, Headphones, Music, Waves, Mic, Settings, Disc, Radio, Activity } from 'lucide-react';

// Import service images
import soundMixingImg from '@/assets/services/sound-mixing.jpg';
import voiceRecordingImg from '@/assets/services/voice-recording.jpg';
import trackMasteringImg from '@/assets/services/track-mastering.jpg';
import audioEditingImg from '@/assets/services/audio-editing.jpg';
import audioRestorationImg from '@/assets/services/audio-restoration.jpg';

interface ServiceSlide {
  id: string;
  image: string;
  titleKey: string;
  descriptionKey: string;
  color: string;
  icons: { icon: React.ElementType; x: string; y: string; delay: number }[];
}

const services: ServiceSlide[] = [
  {
    id: 'mixing',
    image: soundMixingImg,
    titleKey: 'servicesShowcase.mixing.title',
    descriptionKey: 'servicesShowcase.mixing.description',
    color: '#8B5CF6',
    icons: [
      { icon: Settings, x: '85%', y: '15%', delay: 0 },
      { icon: Waves, x: '10%', y: '70%', delay: 0.2 },
      { icon: Activity, x: '80%', y: '75%', delay: 0.4 },
    ],
  },
  {
    id: 'recording',
    image: voiceRecordingImg,
    titleKey: 'servicesShowcase.recording.title',
    descriptionKey: 'servicesShowcase.recording.description',
    color: '#F59E0B',
    icons: [
      { icon: Mic, x: '12%', y: '20%', delay: 0.1 },
      { icon: Headphones, x: '85%', y: '65%', delay: 0.3 },
      { icon: Music, x: '15%', y: '80%', delay: 0.5 },
    ],
  },
  {
    id: 'mastering',
    image: trackMasteringImg,
    titleKey: 'servicesShowcase.mastering.title',
    descriptionKey: 'servicesShowcase.mastering.description',
    color: '#EC4899',
    icons: [
      { icon: Disc, x: '80%', y: '20%', delay: 0 },
      { icon: Waves, x: '10%', y: '45%', delay: 0.2 },
      { icon: Radio, x: '75%', y: '80%', delay: 0.4 },
    ],
  },
  {
    id: 'editing',
    image: audioEditingImg,
    titleKey: 'servicesShowcase.editing.title',
    descriptionKey: 'servicesShowcase.editing.description',
    color: '#06B6D4',
    icons: [
      { icon: Guitar, x: '15%', y: '25%', delay: 0.1 },
      { icon: Settings, x: '82%', y: '55%', delay: 0.3 },
      { icon: Activity, x: '20%', y: '75%', delay: 0.5 },
    ],
  },
  {
    id: 'restoration',
    image: audioRestorationImg,
    titleKey: 'servicesShowcase.restoration.title',
    descriptionKey: 'servicesShowcase.restoration.description',
    color: '#10B981',
    icons: [
      { icon: Radio, x: '80%', y: '18%', delay: 0 },
      { icon: Mic, x: '12%', y: '50%', delay: 0.2 },
      { icon: Disc, x: '78%', y: '78%', delay: 0.4 },
    ],
  },
];

// 3D Floating Icon Component
const Floating3DIcon = ({
  icon: Icon,
  x,
  y,
  delay,
  color,
  isActive,
  isTransitioning,
}: {
  icon: React.ElementType;
  x: string;
  y: string;
  delay: number;
  color: string;
  isActive: boolean;
  isTransitioning: boolean;
}) => {
  return (
    <motion.div
      className="absolute z-30 pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0, z: -80 }}
      animate={{ 
        opacity: isActive ? 1 : 0, 
        scale: isActive ? 1 : 0,
        z: isTransitioning ? 30 : 0,
        rotateY: isTransitioning ? 15 : 0,
      }}
      transition={{ 
        duration: 0.6, 
        delay: isActive ? delay + 0.4 : 0,
        ease: [0.4, 0, 0.2, 1]
      }}
    >
      <motion.div
        animate={isActive && !isTransitioning ? {
          y: [0, -10, 0],
          z: [0, 20, 0],
          rotateZ: [-3, 3, -3],
        } : {}}
        transition={{
          duration: 4 + delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transformStyle: 'preserve-3d',
          filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.5))',
        }}
      >
        <div 
          className="p-3 rounded-lg backdrop-blur-md"
          style={{
            background: `linear-gradient(135deg, ${color}50, ${color}20)`,
            border: `1px solid ${color}60`,
            boxShadow: `
              0 0 30px ${color}40,
              inset 0 1px 0 rgba(255,255,255,0.1)
            `,
          }}
        >
          <Icon 
            size={24} 
            style={{ color: color }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const ServicesShowcase = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const lastScrollTime = useRef(0);
  const scrollAccumulator = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Handle scroll lock and slide transitions
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleWheel = (e: WheelEvent) => {
      const rect = section.getBoundingClientRect();
      const inSection = rect.top <= 100 && rect.bottom >= window.innerHeight - 100;

      if (inSection && !isTransitioning) {
        const now = Date.now();
        const delta = e.deltaY;
        
        // Accumulate scroll
        scrollAccumulator.current += delta;
        
        // Debounce and threshold
        if (now - lastScrollTime.current > 80 && Math.abs(scrollAccumulator.current) > 50) {
          lastScrollTime.current = now;
          
          if (scrollAccumulator.current > 0 && activeIndex < services.length - 1) {
            e.preventDefault();
            setIsTransitioning(true);
            setActiveIndex(prev => Math.min(prev + 1, services.length - 1));
            setTimeout(() => setIsTransitioning(false), 800);
          } else if (scrollAccumulator.current < 0 && activeIndex > 0) {
            e.preventDefault();
            setIsTransitioning(true);
            setActiveIndex(prev => Math.max(prev - 1, 0));
            setTimeout(() => setIsTransitioning(false), 800);
          }
          
          scrollAccumulator.current = 0;
        }
        
        // Prevent default at boundaries when in section
        if ((activeIndex > 0 && delta < 0) || (activeIndex < services.length - 1 && delta > 0)) {
          e.preventDefault();
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeIndex, isTransitioning]);

  const currentService = services[activeIndex];
  const prevService = services[activeIndex - 1] || null;

  return (
    <section
      ref={sectionRef}
      className="relative bg-slate-950 py-24 md:py-32 overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [-30, -80, -30],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 4,
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Section Header */}
      <div className="container mx-auto px-4 mb-16 relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.span
            className="inline-block text-primary text-sm font-medium tracking-widest uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t('servicesShowcase.label')}
          </motion.span>
          <motion.h2
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('servicesShowcase.title')}
          </motion.h2>
          <motion.p
            className="text-white/60 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {t('servicesShowcase.subtitle')}
          </motion.p>
        </motion.div>
      </div>

      {/* Main Slide Container - Limited area, sharp corners */}
      <div className="container mx-auto px-4">
        <div 
          ref={containerRef}
          className="relative mx-auto max-w-5xl h-[500px] md:h-[550px] overflow-hidden"
          style={{
            transformStyle: 'preserve-3d',
            perspective: 1500,
          }}
        >
          {/* Current Slide */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`current-${activeIndex}`}
              className="absolute inset-0"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-15%', opacity: 0, scale: 0.95 }}
              transition={{ 
                duration: 0.7, 
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              {/* White slide container for visual effect */}
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: isTransitioning ? 0.02 : 0 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Background Image */}
              <motion.div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${currentService.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                initial={{ scale: 1.15 }}
                animate={{ 
                  scale: isTransitioning ? 1.1 : 1.05,
                  filter: isTransitioning ? 'blur(3px)' : 'blur(0px)',
                }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />

              {/* Subtle shadow under moving slide */}
              <motion.div
                className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)',
                }}
                animate={{
                  opacity: isTransitioning ? 1 : 0.3,
                }}
                transition={{ duration: 0.4 }}
              />

              {/* Light depth glow while moving */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at center, ${currentService.color}15 0%, transparent 70%)`,
                }}
                animate={{
                  opacity: isTransitioning ? 0.8 : 0.3,
                }}
                transition={{ duration: 0.4 }}
              />

              {/* 3D Floating Icons */}
              {currentService.icons.map((iconData, index) => (
                <Floating3DIcon
                  key={`${currentService.id}-icon-${index}`}
                  icon={iconData.icon}
                  x={iconData.x}
                  y={iconData.y}
                  delay={iconData.delay}
                  color={currentService.color}
                  isActive={true}
                  isTransitioning={isTransitioning}
                />
              ))}

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 z-20">
                <motion.h3
                  className="text-3xl md:text-5xl font-bold text-white mb-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ 
                    opacity: isTransitioning ? 0.7 : 1, 
                    y: 0,
                    filter: isTransitioning ? 'blur(1px)' : 'blur(0px)',
                  }}
                  transition={{ duration: 0.5, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                >
                  {t(currentService.titleKey)}
                </motion.h3>
                <motion.p
                  className="text-white/70 text-base md:text-lg max-w-xl leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: isTransitioning ? 0.5 : 1, 
                    y: 0,
                  }}
                  transition={{ duration: 0.5, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
                >
                  {t(currentService.descriptionKey)}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Dots */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30">
            {services.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  if (!isTransitioning) {
                    setIsTransitioning(true);
                    setActiveIndex(index);
                    setTimeout(() => setIsTransitioning(false), 800);
                  }
                }}
                className={`w-2 transition-all duration-300 ${
                  index === activeIndex 
                    ? 'h-8 bg-primary' 
                    : 'h-2 bg-white/30 hover:bg-white/50'
                }`}
                whileHover={{ scale: 1.3 }}
              />
            ))}
          </div>

          {/* Slide Counter */}
          <div className="absolute bottom-6 left-6 flex items-center gap-3 z-30">
            <span className="text-3xl font-bold text-white">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <div className="w-12 h-px bg-white/30" />
            <span className="text-sm text-white/50">
              {String(services.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* Sound Wave Animation at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden opacity-20">
        <svg
          viewBox="0 0 1200 100"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,50 Q150,20 300,50 T600,50 T900,50 T1200,50"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1],
              opacity: [0, 0.6, 0.6, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <motion.path
            d="M0,65 Q200,35 400,65 T800,65 T1200,65"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1],
              opacity: [0, 0.4, 0.4, 0],
            }}
            transition={{
              duration: 6,
              delay: 0.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </svg>
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
      />
    </section>
  );
};

export default ServicesShowcase;
