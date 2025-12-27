import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const PortfolioSection = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const categories = ['all', 'music', 'media', 'web', 'branding'];

  const projects = [
    {
      id: 1,
      title: 'Harmonic Studio',
      category: 'music',
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=600&fit=crop',
      description: 'Professional music production studio',
    },
    {
      id: 2,
      title: 'Visual Symphony',
      category: 'media',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop',
      description: 'Cinematic video production',
    },
    {
      id: 3,
      title: 'Digital Resonance',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      description: 'Modern web experiences',
    },
    {
      id: 4,
      title: 'Sound Identity',
      category: 'branding',
      image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop',
      description: 'Brand identity design',
    },
    {
      id: 5,
      title: 'Acoustic Waves',
      category: 'music',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=600&fit=crop',
      description: 'Audio engineering excellence',
    },
    {
      id: 6,
      title: 'Motion Graphics',
      category: 'media',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop',
      description: 'Dynamic visual storytelling',
    },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const parallaxY = useSpring(useTransform(scrollYProgress, [0, 1], [50, -50]), springConfig);

  const scrollToProject = (index: number) => {
    if (scrollRef.current) {
      const projectWidth = scrollRef.current.children[0]?.clientWidth || 0;
      const gap = 32;
      const scrollPosition = index * (projectWidth + gap);
      scrollRef.current.scrollTo({
        left: isRTL ? -scrollPosition : scrollPosition,
        behavior: 'smooth'
      });
      setActiveIndex(index);
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const projectWidth = scrollRef.current.children[0]?.clientWidth || 0;
      const gap = 32;
      const scrollLeft = Math.abs(scrollRef.current.scrollLeft);
      const newIndex = Math.round(scrollLeft / (projectWidth + gap));
      setActiveIndex(Math.min(newIndex, filteredProjects.length - 1));
    }
  };

  useEffect(() => {
    setActiveIndex(0);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [activeFilter]);

  const navigateProject = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next' 
      ? Math.min(activeIndex + 1, filteredProjects.length - 1)
      : Math.max(activeIndex - 1, 0);
    scrollToProject(newIndex);
  };

  return (
    <section 
      id="portfolio" 
      ref={containerRef}
      className="section-padding bg-secondary/30 relative overflow-hidden"
    >
      <div className="container-max">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-4">
            {t('portfolio.subtitle')}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            {t('portfolio.title')}
          </h2>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === category
                  ? 'bg-primary text-primary-foreground shadow-glow'
                  : 'bg-background border border-border hover:border-primary hover:text-primary'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t(`portfolio.categories.${category}`)}
            </motion.button>
          ))}
        </motion.div>

        {/* Navigation Arrows */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            <motion.button
              onClick={() => navigateProject('prev')}
              disabled={activeIndex === 0}
              className="p-3 rounded-full bg-background border border-border hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={() => navigateProject('next')}
              disabled={activeIndex === filteredProjects.length - 1}
              className="p-3 rounded-full bg-background border border-border hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Progress Dots */}
          <div className="flex gap-2">
            {filteredProjects.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => scrollToProject(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeIndex 
                    ? 'bg-primary w-8' 
                    : 'bg-border hover:bg-primary/50'
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative">
          <motion.div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              direction: isRTL ? 'rtl' : 'ltr'
            }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: isRTL ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] snap-center"
              >
                <div className="relative overflow-hidden rounded-3xl bg-background shadow-elegant">
                  {/* Parallax Image Container */}
                  <div className="aspect-[16/10] overflow-hidden relative">
                    {/* Background Layer - Slow parallax */}
                    <motion.div
                      className="absolute inset-0 scale-110"
                      style={{ y: parallaxY }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
                    </motion.div>

                    {/* Main Image - Medium parallax */}
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.2 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      whileHover={{ scale: 1.05 }}
                    />

                    {/* Foreground Overlay - Fast parallax */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent"
                      initial={{ opacity: 0.3 }}
                      whileHover={{ opacity: 0.7 }}
                      transition={{ duration: 0.4 }}
                    />

                    {/* Floating Elements - Depth layers */}
                    <motion.div
                      className="absolute top-4 right-4 w-20 h-20 bg-primary/10 rounded-full blur-2xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute bottom-8 left-8 w-16 h-16 bg-accent/20 rounded-full blur-xl"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2],
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    />
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium mb-3 backdrop-blur-sm">
                        {t(`portfolio.categories.${project.category}`)}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        {project.title}
                        <motion.span
                          initial={{ x: -10, opacity: 0 }}
                          whileHover={{ x: 0, opacity: 1 }}
                          className="inline-block"
                        >
                          <ArrowUpRight className="w-6 h-6" />
                        </motion.span>
                      </h3>
                      <p className="text-white/70 text-sm md:text-base">
                        {project.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Hover Glow Effect */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'radial-gradient(circle at center, hsl(var(--primary) / 0.15) 0%, transparent 70%)',
                    }}
                  />
                </div>

                {/* Project Number */}
                <motion.div
                  className="absolute -bottom-4 -right-4 md:-right-8 text-8xl md:text-9xl font-bold text-primary/10 select-none pointer-events-none"
                  style={{ y: parallaxY }}
                >
                  {String(index + 1).padStart(2, '0')}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Gradient Edges */}
          <div className={`absolute top-0 ${isRTL ? 'right-0' : 'left-0'} w-20 h-full bg-gradient-to-r ${isRTL ? 'from-transparent to-secondary/30' : 'from-secondary/30 to-transparent'} pointer-events-none z-10`} />
          <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} w-20 h-full bg-gradient-to-l ${isRTL ? 'from-transparent to-secondary/30' : 'from-secondary/30 to-transparent'} pointer-events-none z-10`} />
        </div>

        {/* Scroll Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="flex justify-center mt-8 text-muted-foreground text-sm"
        >
          <motion.span
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {isRTL ? '← ' : ''}Scroll to explore{isRTL ? '' : ' →'}
          </motion.span>
        </motion.div>
      </div>

      {/* Hide scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default PortfolioSection;
