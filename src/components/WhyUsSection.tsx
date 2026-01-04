import { motion, useInView, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sparkles, Music2, Users, Disc3 } from 'lucide-react';

// Mosaic images
import studioConsole from '@/assets/mosaic/studio-console.jpg';
import soundWaves from '@/assets/mosaic/sound-waves.jpg';
import guitarPerformance from '@/assets/mosaic/guitar-performance.jpg';
import headphonesStudio from '@/assets/mosaic/headphones-studio.jpg';
import vinylTurntable from '@/assets/mosaic/vinyl-turntable.jpg';

// Animated Counter Component
const AnimatedCounter = ({ target, duration = 2 }: { target: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const increment = target / (duration * 60);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}</span>;
};

// Floating 3D Music Element
const Floating3DElement = ({ 
  children, 
  delay = 0, 
  duration = 4,
  rotateRange = 15,
  floatRange = 20,
  className = ''
}: { 
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  rotateRange?: number;
  floatRange?: number;
  className?: string;
}) => {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        delay, 
        duration: 0.8, 
        ease: [0.4, 0, 0.2, 1] 
      }}
      animate={{
        y: [0, -floatRange, 0],
        rotateY: [-rotateRange, rotateRange, -rotateRange],
        rotateZ: [-5, 5, -5],
      }}
      style={{ 
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
    >
      <motion.div
        animate={{
          rotateX: [0, 10, 0],
        }}
        transition={{
          duration: duration * 1.5,
          delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

// Image Slice Component
const ImageSlice = ({ 
  src, 
  index, 
  isHovered, 
  onHover,
  totalSlices 
}: { 
  src: string;
  index: number;
  isHovered: number | null;
  onHover: (index: number | null) => void;
  totalSlices: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const isCurrentHovered = isHovered === index;
  const isNeighborHovered = isHovered !== null && Math.abs(isHovered - index) === 1;
  
  // Calculate dynamic width based on hover state
  const getWidth = () => {
    if (isHovered === null) return '20%';
    if (isCurrentHovered) return '28%';
    if (isNeighborHovered) return '17%';
    return '16%';
  };

  return (
    <motion.div
      ref={ref}
      className="relative h-full overflow-hidden cursor-pointer group"
      initial={{ opacity: 0, y: 100 + index * 20, x: index * 10 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        x: 0,
        width: getWidth(),
      } : {}}
      transition={{
        duration: 0.8,
        delay: 0.2 + index * 0.12,
        ease: [0.4, 0, 0.2, 1],
        width: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      style={{ width: '20%' }}
    >
      {/* Glow border on hover */}
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isCurrentHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          boxShadow: 'inset 0 0 30px rgba(66, 135, 245, 0.5), 0 0 40px rgba(66, 135, 245, 0.3)',
          border: '1px solid rgba(66, 135, 245, 0.4)',
        }}
      />

      {/* Image with parallax zoom */}
      <motion.div
        className="absolute inset-0"
        animate={{
          scale: isCurrentHovered ? 1.15 : 1.05,
        }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <img
          src={src}
          alt=""
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Dark overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"
        animate={{
          opacity: isCurrentHovered ? 0.9 : 0.6,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Accent line between slices */}
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
    </motion.div>
  );
};

// Pulsing Sound Wave Line
const SoundWaveLine = () => {
  const bars = 40;
  
  return (
    <div className="absolute bottom-0 left-0 right-0 h-16 flex items-end justify-center gap-[2px] overflow-hidden opacity-30">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-gradient-to-t from-primary/50 to-primary rounded-t-full"
          animate={{
            height: ['10%', `${30 + Math.random() * 70}%`, '10%'],
          }}
          transition={{
            duration: 0.8 + Math.random() * 0.4,
            delay: i * 0.03,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const WhyUsSection = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  const mosaicImages = [
    studioConsole,
    soundWaves,
    guitarPerformance,
    headphonesStudio,
    vinylTurntable,
  ];

  const features = [
    { icon: Sparkles, key: 'whyUsFeature.feature1' },
    { icon: Music2, key: 'whyUsFeature.feature2' },
    { icon: Users, key: 'whyUsFeature.feature3' },
  ];

  const stats = [
    { value: 12, suffix: '+', labelKey: 'whyUsFeature.stats.years' },
    { value: 500, suffix: '+', labelKey: 'whyUsFeature.stats.projects' },
    { value: 200, suffix: '+', labelKey: 'whyUsFeature.stats.artists' },
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-foreground text-background overflow-hidden py-20 lg:py-32"
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--background)) 1px, transparent 0)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Floating 3D Elements */}
      <Floating3DElement 
        delay={0.5} 
        duration={5} 
        className="top-20 right-[40%] z-30"
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/40 to-primary/10 backdrop-blur-sm flex items-center justify-center">
          <Music2 className="w-6 h-6 text-primary" />
        </div>
      </Floating3DElement>

      <Floating3DElement 
        delay={0.8} 
        duration={6} 
        floatRange={30}
        className="top-40 right-[55%] z-30"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-transparent backdrop-blur-sm flex items-center justify-center">
          <Disc3 className="w-4 h-4 text-primary/70" />
        </div>
      </Floating3DElement>

      <Floating3DElement 
        delay={1.1} 
        duration={4.5} 
        rotateRange={25}
        className="bottom-40 right-[45%] z-30"
      >
        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-transparent backdrop-blur-sm flex items-center justify-center rotate-12">
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-primary/60" fill="currentColor">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
        </div>
      </Floating3DElement>

      {/* Abstract sound wave floating element */}
      <Floating3DElement 
        delay={0.3} 
        duration={7} 
        floatRange={15}
        rotateRange={10}
        className="top-1/3 right-[35%] z-30"
      >
        <div className="flex gap-1 items-end">
          {[0.4, 0.7, 1, 0.6, 0.8, 0.5].map((h, i) => (
            <motion.div
              key={i}
              className="w-1 bg-primary/40 rounded-full"
              animate={{
                height: [10 * h, 25 * h, 10 * h],
              }}
              transition={{
                duration: 1.2,
                delay: i * 0.1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ height: 15 * h }}
            />
          ))}
        </div>
      </Floating3DElement>

      <motion.div 
        className={`container-max relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center ${isRTL ? 'lg:flex-row-reverse' : ''}`}
        style={{ opacity }}
      >
        {/* Left Side - Text Content */}
        <div className={`flex-1 space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium tracking-wider uppercase rounded-full">
              {t('whyUsFeature.label')}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
          >
            {t('whyUsFeature.headline')}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="text-lg md:text-xl text-background/70 leading-relaxed max-w-xl"
          >
            {t('whyUsFeature.description')}
          </motion.p>

          {/* Feature Points */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-4"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div 
                  key={feature.key}
                  className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}
                  initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1, ease: [0.4, 0, 0.2, 1] }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-base md:text-lg text-background/80">
                    {t(feature.key)}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className={`flex gap-8 md:gap-12 pt-8 border-t border-background/10 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.labelKey}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary">
                  <AnimatedCounter target={stat.value} />
                  {stat.suffix}
                </div>
                <div className="text-sm text-background/60 mt-1">
                  {t(stat.labelKey)}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right Side - Image Mosaic */}
        <div className="flex-1 w-full lg:w-auto">
          <motion.div 
            className={`relative h-[500px] md:h-[600px] lg:h-[700px] flex ${isRTL ? 'flex-row-reverse' : ''}`}
            style={{ y: springY }}
          >
            {mosaicImages.map((src, index) => (
              <ImageSlice
                key={index}
                src={src}
                index={index}
                isHovered={hoveredSlice}
                onHover={setHoveredSlice}
                totalSlices={mosaicImages.length}
              />
            ))}

            {/* Floating vinyl disc overlay */}
            <Floating3DElement 
              delay={1.5} 
              duration={8} 
              floatRange={25}
              rotateRange={180}
              className="-top-10 -right-10 z-30"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-foreground via-gray-800 to-foreground border border-primary/20 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-primary/30" />
              </div>
            </Floating3DElement>
          </motion.div>
        </div>
      </motion.div>

      {/* Animated sound wave at bottom */}
      <SoundWaveLine />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            initial={{ 
              x: Math.random() * 100 + '%', 
              y: Math.random() * 100 + '%',
              opacity: 0 
            }}
            animate={{ 
              y: [null, '-20%'],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default WhyUsSection;
