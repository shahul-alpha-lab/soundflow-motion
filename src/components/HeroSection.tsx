import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { MagneticButton, FloatingElement, WordReveal } from '@/components/animations';

// Floating abstract shapes that follow mouse slightly
const FloatingShapes = ({ isRTL }: { isRTL: boolean }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 50, stiffness: 100 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) * 0.02;
      const y = (e.clientY - window.innerHeight / 2) * 0.02;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const shapes = useMemo(() => [
    { size: 300, x: '15%', y: '20%', delay: 0, speed: 0.8 },
    { size: 200, x: '75%', y: '15%', delay: 0.5, speed: 1.2 },
    { size: 150, x: '80%', y: '70%', delay: 1, speed: 0.6 },
    { size: 180, x: '10%', y: '75%', delay: 1.5, speed: 1 },
    { size: 120, x: '50%', y: '60%', delay: 2, speed: 0.7 },
  ], []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
            x: useTransform(springX, (v) => v * (i + 1) * shape.speed * (isRTL ? -1 : 1)),
            y: useTransform(springY, (v) => v * (i + 1) * shape.speed),
            background: `radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: shape.delay,
          }}
        />
      ))}
      
      {/* Musical notes floating */}
      {['♪', '♫', '♬', '𝄞', '♩'].map((note, i) => (
        <FloatingElement
          key={i}
          className="absolute text-primary/20"
          amplitude={30}
          frequency={5 + i}
          followMouse
          mouseStrength={0.05}
        >
          <motion.span
            style={{
              left: `${15 + i * 18}%`,
              top: `${25 + (i % 3) * 20}%`,
              fontSize: `${24 + i * 4}px`,
              position: 'absolute',
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            {note}
          </motion.span>
        </FloatingElement>
      ))}
    </div>
  );
};

// Animated headline with word-by-word reveal
const AnimatedHeadline = ({ text, className }: { text: string; className?: string }) => {
  const words = text.split(' ');
  
  return (
    <motion.h1 className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em] last:mr-0"
          initial={{ opacity: 0, y: 50, rotateX: -45 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.3 + i * 0.1,
            ease: [0.4, 0, 0.2, 1],
          }}
          style={{ perspective: 1000 }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
};

// Premium CTA button with hover effects
const CTAButton = ({ 
  children, 
  primary = false, 
  onClick,
  className = '',
}: { 
  children: React.ReactNode; 
  primary?: boolean; 
  onClick?: () => void;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <MagneticButton strength={0.2} onClick={onClick}>
      <motion.button
        className={`
          group relative flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-base md:text-lg
          overflow-hidden transition-colors duration-300
          ${primary 
            ? 'bg-primary text-primary-foreground shadow-glow' 
            : 'border-2 border-foreground/20 text-foreground hover:border-primary hover:text-primary'
          }
          ${className}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background slide effect */}
        {primary && (
          <motion.div
            className="absolute inset-0 bg-primary-glow"
            initial={{ x: '-100%' }}
            animate={{ x: isHovered ? '0%' : '-100%' }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          />
        )}
        
        <span className="relative z-10">{children}</span>
        
        {/* Arrow with rotation on hover */}
        <motion.span
          className="relative z-10"
          animate={{ 
            x: isHovered ? 5 : 0,
            rotate: isHovered ? -45 : 0,
          }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <ArrowRight className="w-5 h-5" />
        </motion.span>
        
        {/* Underline effect for secondary button */}
        {!primary && (
          <motion.div
            className="absolute bottom-3 left-8 right-8 h-0.5 bg-primary origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          />
        )}
      </motion.button>
    </MagneticButton>
  );
};

const HeroSection = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 30, stiffness: 100 });
  const y = useTransform(smoothProgress, [0, 1], [0, 150]);
  const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.5], [1, 0.95]);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Floating Abstract Elements */}
      <FloatingShapes isRTL={isRTL} />

      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Main Content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 container-max px-4 md:px-8 text-center"
      >
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          className="text-xs md:text-sm uppercase tracking-[0.25em] text-primary font-medium mb-6"
        >
          {t('hero.tagline')}
        </motion.p>

        {/* Main Headline - Word by word animation */}
        <AnimatedHeadline 
          text={t('hero.title')}
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-foreground"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: [0.4, 0, 0.2, 1] }}
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}
        >
          <CTAButton primary onClick={() => scrollToSection('#services')}>
            {t('hero.cta')}
          </CTAButton>
          <CTAButton onClick={() => scrollToSection('#contact')}>
            {t('hero.ctaSecondary')}
          </CTAButton>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.4, 0, 0.2, 1] }}
          className={`flex flex-wrap justify-center gap-8 md:gap-16 mt-16 ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          {[
            { value: '150+', label: t('hero.stats.projects') },
            { value: '50+', label: t('hero.stats.clients') },
            { value: '10+', label: t('hero.stats.years') },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 + i * 0.1, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.button
          onClick={() => scrollToSection('#services')}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-xs uppercase tracking-[0.2em] font-medium">
            {t('hero.scroll')}
          </span>
          <ArrowDown className="w-4 h-4" />
        </motion.button>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
