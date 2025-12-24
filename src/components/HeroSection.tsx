import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import SoundWave from './SoundWave';
import FloatingParticles from './FloatingParticles';
import { ArrowDown, Play } from 'lucide-react';

const HeroSection = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const title = t('hero.title');
  const words = title.split(' ');

  const scrollToServices = () => {
    const element = document.querySelector('#services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient"
    >
      {/* Background Elements */}
      <FloatingParticles />
      
      {/* Animated Grid Pattern */}
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

      {/* Sound Wave Background */}
      <div className="absolute bottom-0 left-0 right-0 h-32 opacity-50">
        <SoundWave barCount={60} />
      </div>

      {/* Content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 container-max px-4 md:px-8 text-center"
      >
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm md:text-base uppercase tracking-[0.2em] text-primary font-medium mb-6"
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* Animated Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
          {words.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.4 + index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block mx-1 md:mx-2"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
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

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-muted-foreground cursor-pointer"
          onClick={scrollToServices}
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
