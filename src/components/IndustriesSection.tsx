import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useMemo } from 'react';
import { Music, Megaphone, ShoppingCart, Video, Landmark, Building2, GraduationCap, Plane } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const industries = [
  { icon: Music, titleKey: 'musicEntertainment' },
  { icon: Megaphone, titleKey: 'digitalMarketing' },
  { icon: ShoppingCart, titleKey: 'ecommerce' },
  { icon: Video, titleKey: 'videoProduction' },
  { icon: Landmark, titleKey: 'bankingFintech' },
  { icon: Building2, titleKey: 'enterprise' },
  { icon: GraduationCap, titleKey: 'education' },
  { icon: Plane, titleKey: 'travel' },
];

const WaveformBackground = () => {
  const lines = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    id: i,
    delay: i * 0.3,
    height: 20 + Math.random() * 60,
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated waveform lines */}
      <div className="absolute bottom-0 left-0 right-0 h-40 flex items-end justify-center gap-2 opacity-[0.04]">
        {lines.map((line) => (
          <motion.div
            key={line.id}
            className="w-1 bg-primary rounded-full"
            animate={{
              height: [line.height, line.height * 1.5, line.height * 0.7, line.height],
            }}
            transition={{
              duration: 2,
              delay: line.delay,
              repeat: Infinity,
              ease: [0.4, 0, 0.2, 1],
            }}
          />
        ))}
      </div>

      {/* Floating music particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/20 rounded-full"
          style={{
            left: `${10 + i * 12}%`,
            bottom: '10%',
          }}
          animate={{
            y: [-20, -100],
            opacity: [0, 0.3, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4 + i * 0.5,
            delay: i * 0.8,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      ))}

      {/* Abstract sound wave curves */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.03]"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,200 Q200,100 400,200 T800,200 T1200,200 T1600,200"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary"
          animate={{
            d: [
              "M0,200 Q200,100 400,200 T800,200 T1200,200 T1600,200",
              "M0,200 Q200,250 400,200 T800,150 T1200,200 T1600,200",
              "M0,200 Q200,100 400,200 T800,200 T1200,200 T1600,200",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
        <motion.path
          d="M0,300 Q200,250 400,300 T800,300 T1200,300 T1600,300"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-primary"
          animate={{
            d: [
              "M0,300 Q200,250 400,300 T800,300 T1200,300 T1600,300",
              "M0,300 Q200,350 400,300 T800,250 T1200,300 T1600,300",
              "M0,300 Q200,250 400,300 T800,300 T1200,300 T1600,300",
            ],
          }}
          transition={{
            duration: 6,
            delay: 1,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      </svg>
    </div>
  );
};

const IndustryCard = ({ 
  icon: Icon, 
  title, 
  index 
}: { 
  icon: typeof Music; 
  title: string; 
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1],
      }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
      }}
      className="group relative"
    >
      {/* Card glow effect on hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500" />
      
      <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 h-full transition-all duration-500 group-hover:border-primary/30 group-hover:bg-card/95 group-hover:shadow-xl group-hover:shadow-primary/5">
        {/* Gradient shift on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-transparent transition-all duration-500" />
        
        {/* Icon container */}
        <motion.div 
          className="relative w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors duration-300"
          whileHover={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <Icon className="w-6 h-6 text-primary transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
          
          {/* Pulse effect */}
          <motion.div
            className="absolute inset-0 rounded-xl bg-primary/20"
            initial={{ scale: 1, opacity: 0 }}
            whileHover={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          />
        </motion.div>

        {/* Title */}
        <h3 className="relative text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>

        {/* Subtle animated line */}
        <motion.div
          className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          whileHover={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </motion.div>
  );
};

const IndustriesSection = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.5 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  const industryTitles: Record<string, string> = {
    musicEntertainment: t('industries.musicEntertainment'),
    digitalMarketing: t('industries.digitalMarketing'),
    ecommerce: t('industries.ecommerce'),
    videoProduction: t('industries.videoProduction'),
    bankingFintech: t('industries.bankingFintech'),
    enterprise: t('industries.enterprise'),
    education: t('industries.education'),
    travel: t('industries.travel'),
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Soft background with parallax */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-muted/30 via-muted/50 to-muted/30"
        style={{ y: backgroundY }}
      />

      {/* Music-inspired background pattern */}
      <motion.div
        className="absolute inset-0 opacity-[0.02]"
        style={{ 
          y: backgroundY,
          backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--primary)) 1px, transparent 1px),
                           radial-gradient(circle at 80% 50%, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <WaveformBackground />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left side - Text content */}
          <div ref={headingRef} className="lg:sticky lg:top-32">
            {/* Small title */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="inline-block text-sm font-medium text-primary tracking-wider uppercase mb-4"
            >
              {t('industries.label')}
            </motion.span>

            {/* Main heading */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6"
            >
              {t('industries.heading')}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="text-lg text-muted-foreground leading-relaxed max-w-md"
            >
              {t('industries.description')}
            </motion.p>

            {/* Decorative element */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isHeadingInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="w-20 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mt-8 origin-left"
            />
          </div>

          {/* Right side - Cards grid */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {industries.map((industry, index) => (
              <IndustryCard
                key={industry.titleKey}
                icon={industry.icon}
                title={industryTitles[industry.titleKey]}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
