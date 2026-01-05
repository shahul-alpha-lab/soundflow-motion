import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ChevronLeft, ChevronRight, Guitar, Headphones, Music, Waves, Cpu, Activity, Zap, Radio } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// 3D Music & Tech Icons with depth
const Icon3D = ({ 
  icon: Icon, 
  size = 40, 
  color = 'primary',
  offsetY = 0,
  offsetZ = 0,
  delay = 0,
  scrollProgress 
}: { 
  icon: React.ElementType;
  size?: number;
  color?: string;
  offsetY?: number;
  offsetZ?: number;
  delay?: number;
  scrollProgress: any;
}) => {
  const y = useTransform(scrollProgress, [0, 1], [offsetY, offsetY - 50]);
  const z = useTransform(scrollProgress, [0, 1], [offsetZ, offsetZ + 20]);
  const rotateY = useTransform(scrollProgress, [0, 1], [0, 15]);
  
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ 
        y,
        z,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.4, 0, 0.2, 1]
      }}
    >
      <motion.div
        animate={{
          y: [0, -8, 0],
          rotateZ: [-2, 2, -2],
        }}
        transition={{
          duration: 4 + delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          filter: `drop-shadow(0 10px 20px hsl(var(--${color}) / 0.3))`,
        }}
      >
        <div 
          className="p-3 rounded-lg"
          style={{
            background: `linear-gradient(135deg, hsl(var(--${color}) / 0.2), hsl(var(--${color}) / 0.05))`,
            border: `1px solid hsl(var(--${color}) / 0.3)`,
            backdropFilter: 'blur(8px)',
            boxShadow: `
              0 0 20px hsl(var(--${color}) / 0.2),
              inset 0 1px 0 hsl(var(--${color}) / 0.2)
            `,
          }}
        >
          <Icon 
            size={size} 
            className="text-primary"
            style={{ 
              filter: 'drop-shadow(0 0 8px hsl(var(--primary) / 0.5))',
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

// Slide data for left vertical scroll
const slides = [
  {
    id: 1,
    title: 'UNUX',
    tags: ['Web design', 'Illustrations'],
    description: 'Creative studio template for modern agencies with immersive 3D experiences',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop',
    color: '#8B5CF6',
    icons: [
      { icon: Guitar, x: '10%', y: '15%', delay: 0 },
      { icon: Waves, x: '80%', y: '25%', delay: 0.2 },
      { icon: Cpu, x: '15%', y: '75%', delay: 0.4 },
    ]
  },
  {
    id: 2,
    title: 'SONARA',
    tags: ['Music Production', 'Branding'],
    description: 'Audio-visual identity for immersive sound experiences',
    image: 'https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=800&h=600&fit=crop',
    color: '#F59E0B',
    icons: [
      { icon: Headphones, x: '85%', y: '20%', delay: 0 },
      { icon: Music, x: '8%', y: '60%', delay: 0.3 },
      { icon: Activity, x: '75%', y: '70%', delay: 0.5 },
    ]
  },
  {
    id: 3,
    title: 'WAVEFRONT',
    tags: ['3D Design', 'Motion'],
    description: 'Dynamic visual system for digital platforms',
    image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&h=600&fit=crop',
    color: '#EC4899',
    icons: [
      { icon: Radio, x: '12%', y: '30%', delay: 0.1 },
      { icon: Zap, x: '82%', y: '55%', delay: 0.3 },
      { icon: Waves, x: '20%', y: '80%', delay: 0.5 },
    ]
  },
  {
    id: 4,
    title: 'PULSE',
    tags: ['UI/UX', 'Development'],
    description: 'Interactive dashboard for audio analytics',
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&h=600&fit=crop',
    color: '#06B6D4',
    icons: [
      { icon: Cpu, x: '78%', y: '15%', delay: 0 },
      { icon: Music, x: '10%', y: '45%', delay: 0.2 },
      { icon: Activity, x: '85%', y: '75%', delay: 0.4 },
    ]
  },
  {
    id: 5,
    title: 'ECHO',
    tags: ['Mobile App', 'Sound Design'],
    description: 'Next-gen music streaming experience',
    image: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=800&h=600&fit=crop',
    color: '#10B981',
    icons: [
      { icon: Guitar, x: '75%', y: '20%', delay: 0.1 },
      { icon: Headphones, x: '12%', y: '35%', delay: 0.3 },
      { icon: Radio, x: '80%', y: '65%', delay: 0.5 },
    ]
  },
];

const FeaturedProjects = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const leftScrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const backgroundY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -50]), springConfig);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  // Handle scroll in left panel to update active slide
  useEffect(() => {
    const leftScroll = leftScrollRef.current;
    if (!leftScroll) return;

    const handleScroll = () => {
      const scrollTop = leftScroll.scrollTop;
      const slideHeight = leftScroll.clientHeight * 0.85; // Account for card height
      const newIndex = Math.round(scrollTop / slideHeight);
      setActiveIndex(Math.min(newIndex, slides.length - 1));
    };

    leftScroll.addEventListener('scroll', handleScroll);
    return () => leftScroll.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSlide = (index: number) => {
    if (leftScrollRef.current) {
      const slideHeight = leftScrollRef.current.clientHeight * 0.85;
      leftScrollRef.current.scrollTo({
        top: index * slideHeight,
        behavior: 'smooth'
      });
      setActiveIndex(index);
    }
  };

  const navigateSlide = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next' 
      ? Math.min(activeIndex + 1, slides.length - 1)
      : Math.max(activeIndex - 1, 0);
    scrollToSlide(newIndex);
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-foreground overflow-hidden"
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}
    >
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                               linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        {/* Gradient Orbs */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px]"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, transparent 70%)',
            left: '5%',
            top: '30%',
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Main Content - Split Screen (Reversed: Left scrolls, Right static) */}
      <motion.div 
        className="relative z-20 min-h-screen flex flex-col lg:flex-row"
        style={{ opacity }}
      >
        {/* LEFT SIDE - Vertical Scrollable Slides */}
        <div 
          ref={leftScrollRef}
          className="lg:w-1/2 h-screen overflow-y-auto snap-y snap-mandatory scrollbar-hide"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
          }}
        >
          <div className="flex flex-col">
            {slides.map((slide, index) => (
              <motion.div
                key={slide.id}
                className="relative h-[85vh] min-h-[500px] flex items-center justify-center px-6 lg:px-12 snap-center"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ 
                  duration: 0.9, 
                  ease: [0.4, 0, 0.2, 1]
                }}
              >
                {/* Slide Card - Sharp corners, limited width */}
                <motion.div 
                  className="relative w-full max-w-[500px] h-[400px] md:h-[450px] overflow-hidden group"
                  style={{ 
                    transformStyle: 'preserve-3d',
                    perspective: 1200,
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
                  }}
                >
                  {/* Background Image */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${slide.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                    initial={{ scale: 1.1 }}
                    whileInView={{ scale: 1 }}
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                  />

                  {/* Dark Overlay with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />

                  {/* 3D Floating Icons - Travel with slide */}
                  {slide.icons.map((iconData, iconIndex) => (
                    <motion.div
                      key={iconIndex}
                      className="absolute z-20"
                      style={{ 
                        left: iconData.x, 
                        top: iconData.y,
                      }}
                      initial={{ opacity: 0, scale: 0, z: -50 }}
                      whileInView={{ 
                        opacity: 1, 
                        scale: 1,
                        z: 0,
                      }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.7, 
                        delay: iconData.delay + 0.3,
                        ease: [0.4, 0, 0.2, 1]
                      }}
                    >
                      <motion.div
                        animate={{
                          y: [0, -12, 0],
                          z: [0, 15, 0],
                          rotateY: [0, 10, 0],
                        }}
                        transition={{
                          duration: 4 + iconIndex * 0.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: iconData.delay,
                        }}
                        style={{
                          transformStyle: 'preserve-3d',
                          filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))',
                        }}
                      >
                        <div 
                          className="p-2.5 rounded-lg backdrop-blur-md"
                          style={{
                            background: `linear-gradient(135deg, ${slide.color}40, ${slide.color}15)`,
                            border: `1px solid ${slide.color}50`,
                            boxShadow: `0 0 25px ${slide.color}30`,
                          }}
                        >
                          <iconData.icon 
                            size={22} 
                            style={{ color: slide.color }}
                          />
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                    {/* Tags */}
                    <motion.div
                      className="flex flex-wrap gap-2 mb-4"
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      {slide.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 text-xs font-medium text-white/80 bg-white/10 backdrop-blur-sm border border-white/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                      className="text-3xl md:text-4xl font-bold text-white mb-3"
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      {slide.title}
                    </motion.h3>

                    {/* Description */}
                    <motion.p
                      className="text-white/70 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    >
                      {slide.description}
                    </motion.p>

                    {/* View Link */}
                    <motion.div
                      className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500"
                      style={{ color: slide.color }}
                    >
                      <span className="text-sm font-medium">{t('featuredProjects.viewProject')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>

                  {/* Slide Number */}
                  <div 
                    className="absolute top-6 right-6 text-6xl font-bold text-white/5 pointer-events-none"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE - Static Panel */}
        <div className="lg:w-1/2 flex flex-col justify-center px-8 lg:px-16 py-16 lg:py-0 lg:sticky lg:top-0 lg:h-screen">
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Label */}
            <motion.p
              className="text-primary text-sm uppercase tracking-[0.3em] font-medium mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t('featuredProjects.label')}
            </motion.p>

            {/* Heading */}
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-background mb-6 leading-[1.1]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              {t('featuredProjects.title')}
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              className="text-lg md:text-xl text-background/60 mb-10 max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {t('featuredProjects.subtitle')}
            </motion.p>

            {/* All Works Button */}
            <motion.button
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-background/30 text-background overflow-hidden transition-all duration-500 hover:border-primary"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 font-medium tracking-wide">
                {t('featuredProjects.allWorks')}
              </span>
              <motion.span
                className="relative z-10"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
              >
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-primary"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              />
            </motion.button>

            {/* Navigation Controls */}
            <motion.div
              className="flex items-center gap-6 mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex gap-3">
                <motion.button
                  onClick={() => navigateSlide('prev')}
                  disabled={activeIndex === 0}
                  className="p-3 border border-background/30 text-background/70 hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
                <motion.button
                  onClick={() => navigateSlide('next')}
                  disabled={activeIndex === slides.length - 1}
                  className="p-3 border border-background/30 text-background/70 hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Progress Indicator */}
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-background">
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
                <span className="text-background/40">/</span>
                <span className="text-sm text-background/40">
                  {String(slides.length).padStart(2, '0')}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="flex-1 h-[2px] bg-background/10 overflow-hidden max-w-[150px]">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: '0%' }}
                  animate={{ width: `${((activeIndex + 1) / slides.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
            </motion.div>

            {/* Slide Dots */}
            <motion.div
              className="flex gap-2 mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              {slides.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => scrollToSlide(index)}
                  className={`h-2 transition-all duration-300 ${
                    index === activeIndex 
                      ? 'w-8 bg-primary' 
                      : 'w-2 bg-background/30 hover:bg-background/50'
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Hide scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default FeaturedProjects;
