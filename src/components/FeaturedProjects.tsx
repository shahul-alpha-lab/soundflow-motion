import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const FeaturedProjects = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const projects = [
    {
      id: 1,
      title: 'UNUX',
      tags: ['Web design', 'Illustrations'],
      description: 'Creative studio template for modern agencies',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=1000&fit=crop',
      color: '#8B5CF6',
    },
    {
      id: 2,
      title: 'SONARA',
      tags: ['Music Production', 'Branding'],
      description: 'Audio-visual identity for immersive experiences',
      image: 'https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=800&h=1000&fit=crop',
      color: '#F59E0B',
    },
    {
      id: 3,
      title: 'WAVEFRONT',
      tags: ['3D Design', 'Motion'],
      description: 'Dynamic visual system for digital platforms',
      image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&h=1000&fit=crop',
      color: '#EC4899',
    },
    {
      id: 4,
      title: 'PULSE',
      tags: ['UI/UX', 'Development'],
      description: 'Interactive dashboard for audio analytics',
      image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&h=1000&fit=crop',
      color: '#06B6D4',
    },
    {
      id: 5,
      title: 'ECHO',
      tags: ['Mobile App', 'Sound Design'],
      description: 'Next-gen music streaming experience',
      image: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=800&h=1000&fit=crop',
      color: '#10B981',
    },
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const backgroundY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -100]), springConfig);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const scrollToProject = (index: number) => {
    if (galleryRef.current) {
      const cardWidth = galleryRef.current.children[0]?.clientWidth || 0;
      const gap = 32;
      const scrollPosition = index * (cardWidth + gap);
      galleryRef.current.scrollTo({
        left: isRTL ? -scrollPosition : scrollPosition,
        behavior: 'smooth'
      });
      setActiveIndex(index);
    }
  };

  const handleScroll = () => {
    if (galleryRef.current) {
      const cardWidth = galleryRef.current.children[0]?.clientWidth || 0;
      const gap = 32;
      const scrollLeft = Math.abs(galleryRef.current.scrollLeft);
      const newIndex = Math.round(scrollLeft / (cardWidth + gap));
      setActiveIndex(Math.min(newIndex, projects.length - 1));
    }
  };

  const navigateProject = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next' 
      ? Math.min(activeIndex + 1, projects.length - 1)
      : Math.max(activeIndex - 1, 0);
    scrollToProject(newIndex);
  };

  // 3D floating elements
  const floatingElements = [
    { type: 'sphere', size: 60, x: '10%', y: '20%', delay: 0 },
    { type: 'cube', size: 40, x: '85%', y: '15%', delay: 0.5 },
    { type: 'pyramid', size: 50, x: '75%', y: '70%', delay: 1 },
    { type: 'sphere', size: 30, x: '20%', y: '80%', delay: 1.5 },
    { type: 'cube', size: 35, x: '60%', y: '40%', delay: 2 },
  ];

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
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px]"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)',
            left: '10%',
            top: '20%',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px]"
          style={{
            background: 'radial-gradient(circle, hsl(var(--accent) / 0.1) 0%, transparent 70%)',
            right: '10%',
            bottom: '20%',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* 3D Floating Elements */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute pointer-events-none z-10"
          style={{ left: element.x, top: element.y }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: element.delay }}
        >
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotateY: [0, 360],
              rotateX: [0, 15, 0],
            }}
            transition={{
              y: { duration: 4 + index, repeat: Infinity, ease: "easeInOut" },
              rotateY: { duration: 20 + index * 2, repeat: Infinity, ease: "linear" },
              rotateX: { duration: 6 + index, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{
              width: element.size,
              height: element.size,
              transformStyle: 'preserve-3d',
              perspective: 1000,
            }}
          >
            {element.type === 'sphere' && (
              <div 
                className="w-full h-full rounded-full"
                style={{
                  background: `linear-gradient(135deg, hsl(var(--primary) / 0.3), hsl(var(--primary) / 0.1))`,
                  boxShadow: '0 0 40px hsl(var(--primary) / 0.2), inset 0 0 20px hsl(var(--primary) / 0.1)',
                }}
              />
            )}
            {element.type === 'cube' && (
              <div 
                className="w-full h-full"
                style={{
                  background: `linear-gradient(135deg, hsl(var(--accent) / 0.3), hsl(var(--accent) / 0.1))`,
                  boxShadow: '0 0 30px hsl(var(--accent) / 0.2)',
                  transform: 'rotateX(45deg) rotateZ(45deg)',
                }}
              />
            )}
            {element.type === 'pyramid' && (
              <div 
                className="w-0 h-0"
                style={{
                  borderLeft: `${element.size / 2}px solid transparent`,
                  borderRight: `${element.size / 2}px solid transparent`,
                  borderBottom: `${element.size}px solid hsl(var(--primary) / 0.25)`,
                  filter: 'drop-shadow(0 0 20px hsl(var(--primary) / 0.3))',
                }}
              />
            )}
          </motion.div>
        </motion.div>
      ))}

      {/* Particle Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Main Content - Split Screen */}
      <motion.div 
        className="relative z-20 min-h-screen flex flex-col lg:flex-row"
        style={{ opacity }}
      >
        {/* Left Side - Static Panel */}
        <div className="lg:w-1/2 flex flex-col justify-center px-8 lg:px-16 py-16 lg:py-0 lg:sticky lg:top-0 lg:h-screen">
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
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
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-background/30 text-background rounded-full overflow-hidden transition-all duration-500 hover:border-primary"
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
                  onClick={() => navigateProject('prev')}
                  disabled={activeIndex === 0}
                  className="p-3 rounded-full border border-background/30 text-background/70 hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
                <motion.button
                  onClick={() => navigateProject('next')}
                  disabled={activeIndex === projects.length - 1}
                  className="p-3 rounded-full border border-background/30 text-background/70 hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
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
                  {String(projects.length).padStart(2, '0')}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="flex-1 h-[2px] bg-background/10 rounded-full overflow-hidden max-w-[150px]">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: '0%' }}
                  animate={{ width: `${((activeIndex + 1) / projects.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side - Scrollable Gallery */}
        <div className="lg:w-1/2 py-8 lg:py-20">
          <motion.div
            ref={galleryRef}
            onScroll={handleScroll}
            className="flex gap-8 overflow-x-auto px-8 lg:px-0 lg:pe-8 scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollSnapType: 'x mandatory',
            }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group relative flex-shrink-0 w-[320px] md:w-[400px] snap-center"
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15,
                  ease: [0.4, 0, 0.2, 1]
                }}
                style={{ perspective: 1000 }}
              >
                <motion.div
                  className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden cursor-pointer"
                  whileHover={{ 
                    scale: 1.02,
                    rotateY: 5,
                    rotateX: -2,
                    z: 50,
                  }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Background Image */}
                  <motion.div
                    className="absolute inset-0"
                    initial={{ scale: 1.1 }}
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/50 to-transparent"
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 0.85 }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Glow Effect on Hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${project.color}30 0%, transparent 60%)`,
                    }}
                  />

                  {/* Border Glow */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      boxShadow: `inset 0 0 0 2px ${project.color}40, 0 0 40px ${project.color}20`,
                    }}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    {/* Tags */}
                    <motion.div
                      className="flex flex-wrap gap-2 mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 text-xs font-medium text-background/80 bg-background/10 backdrop-blur-sm rounded-full border border-background/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                      className="text-3xl md:text-4xl font-bold text-background mb-3"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      {project.title}
                    </motion.h3>

                    {/* Description */}
                    <motion.p
                      className="text-background/60 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={{ y: 10 }}
                      whileHover={{ y: 0 }}
                    >
                      {project.description}
                    </motion.p>

                    {/* View Project Link */}
                    <motion.div
                      className="mt-6 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-all duration-500"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      <span className="text-sm font-medium">{t('featuredProjects.viewProject')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>

                  {/* Project Number */}
                  <motion.div
                    className="absolute top-6 right-6 text-7xl font-bold text-background/5 pointer-events-none"
                    style={{ transform: 'translateZ(30px)' }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="flex justify-center lg:justify-start lg:ps-0 mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.div
              className="flex items-center gap-2 text-background/40 text-sm"
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span>{t('featuredProjects.scrollHint')}</span>
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-30" />

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
