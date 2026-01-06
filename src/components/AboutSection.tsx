import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Music, Waves, Headphones, Piano } from 'lucide-react';

// Floating music note particle
const FloatingNote = ({ delay, x, duration }: { delay: number; x: number; duration: number }) => {
  const prefersReducedMotion = useReducedMotion();
  
  if (prefersReducedMotion) return null;
  
  return (
    <motion.div
      className="absolute text-primary/10 pointer-events-none"
      style={{ left: `${x}%` }}
      initial={{ opacity: 0, y: '100%', scale: 0.5 }}
      animate={{
        opacity: [0, 0.15, 0.15, 0],
        y: ['100%', '0%', '-20%'],
        scale: [0.5, 1, 0.8],
        rotate: [0, 10, -10, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <Music className="w-4 h-4" />
    </motion.div>
  );
};

// Sound wave background animation
const SoundWaveBackground = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  if (prefersReducedMotion || isMobile) return null;
  
  const bars = Array.from({ length: 60 }, (_, i) => i);
  
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="flex items-center gap-1 h-32"
        animate={{ x: ['-10%', '10%', '-10%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        {bars.map((i) => (
          <motion.div
            key={i}
            className="w-1 bg-primary/[0.03] rounded-full"
            animate={{
              height: [
                `${20 + Math.sin(i * 0.3) * 15}%`,
                `${40 + Math.cos(i * 0.5) * 30}%`,
                `${20 + Math.sin(i * 0.3) * 15}%`,
              ],
            }}
            transition={{
              duration: 2 + (i % 3) * 0.5,
              repeat: Infinity,
              delay: i * 0.05,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

// Light sweep effect
const LightSweep = ({ isInView }: { isInView: boolean }) => {
  const prefersReducedMotion = useReducedMotion();
  
  if (prefersReducedMotion) return null;
  
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
    >
      <motion.div
        className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-transparent via-primary/10 to-transparent skew-x-12"
        initial={{ x: '-100%' }}
        animate={isInView ? { x: '400%' } : { x: '-100%' }}
        transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
};

const AboutSection = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Parallax transforms - background moves slower, content moves forward
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const contentZ = useTransform(scrollYProgress, [0, 0.5, 1], [0, 20, 0]);
  
  // Smooth springs for premium feel
  const smoothBackgroundY = useSpring(backgroundY, { damping: 30, stiffness: 100 });
  const smoothContentY = useSpring(contentY, { damping: 25, stiffness: 80 });

  const keywords = [
    { key: 'creativity', delay: 0, icon: Music },
    { key: 'sound', delay: 0.1, icon: Waves },
    { key: 'branding', delay: 0.2, icon: Headphones },
    { key: 'innovation', delay: 0.3, icon: Piano },
  ];

  // Headline split into lines for animation
  const headlineText = t('about.title');
  const headlineLines = headlineText.split(' ');

  // Floating particles data
  const particles = Array.from({ length: 8 }, (_, i) => ({
    delay: i * 2,
    x: 10 + i * 12,
    duration: 8 + (i % 3) * 2,
  }));

  return (
    <section
      id="about"
      ref={containerRef}
      className="section-padding relative overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: isMobile || prefersReducedMotion ? 0 : smoothBackgroundY }}
      >
        {/* Abstract music/digital background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop')`,
            filter: 'blur(3px)',
          }}
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />
        
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </motion.div>

      {/* Sound Wave Background Animation */}
      <SoundWaveBackground />

      {/* Floating Music Note Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle, i) => (
          <FloatingNote key={i} {...particle} />
        ))}
      </div>

      {/* Main Content with 3D Transform */}
      <motion.div
        className="container-max relative z-10"
        style={{ 
          y: isMobile || prefersReducedMotion ? 0 : smoothContentY,
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40, z: -50 }}
            whileInView={{ opacity: 1, x: 0, z: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            onViewportEnter={() => setIsInView(true)}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Subtitle with gentle fade */}
            <motion.p
              className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t('about.subtitle')}
            </motion.p>

            {/* Headline with line-by-line reveal and Z-axis movement */}
            <div className="relative mb-6">
              <LightSweep isInView={isInView} />
              <h2 className="text-3xl md:text-5xl font-bold text-foreground flex flex-wrap gap-x-3">
                {headlineLines.map((word, index) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    initial={{ 
                      opacity: 0, 
                      y: 30,
                      rotateX: -20,
                    }}
                    whileInView={{ 
                      opacity: 1, 
                      y: 0,
                      rotateX: 0,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: 0.2 + index * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {word}
                  </motion.span>
                ))}
              </h2>
            </div>

            {/* Description */}
            <motion.p
              className="text-lg text-muted-foreground leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {t('about.description')}
            </motion.p>

            {/* Keywords with 3D hover effect */}
            <div className="flex flex-wrap gap-3">
              {keywords.map((keyword) => (
                <motion.span
                  key={keyword.key}
                  initial={{ opacity: 0, scale: 0.8, z: -30 }}
                  whileInView={{ opacity: 1, scale: 1, z: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + keyword.delay }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -2,
                    boxShadow: '0 10px 30px -10px hsl(var(--primary) / 0.3)',
                  }}
                  className="px-5 py-2 rounded-full border border-primary/30 text-primary font-medium text-sm hover:bg-primary/10 transition-colors cursor-default flex items-center gap-2"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <keyword.icon className="w-4 h-4" />
                  {t(`about.keywords.${keyword.key}`)}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Right Visual with 3D depth */}
          <motion.div
            initial={{ opacity: 0, x: 40, z: -50 }}
            whileInView={{ opacity: 1, x: 0, z: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Animated Circles with 3D perspective */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                style={{ transformStyle: 'preserve-3d', transform: 'translateZ(-20px)' }}
              />
              <motion.div
                className="absolute inset-8 rounded-full border-2 border-primary/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                style={{ transformStyle: 'preserve-3d', transform: 'translateZ(-10px)' }}
              />
              <motion.div
                className="absolute inset-16 rounded-full border-2 border-primary/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
              
              {/* Center Content */}
              <div className="absolute inset-24 rounded-full bg-primary/10 flex items-center justify-center backdrop-blur-sm">
                <motion.div
                  className="relative"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotateY: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <Waves className="w-16 h-16 text-primary" />
                </motion.div>
              </div>

              {/* Floating 3D Elements */}
              {[
                { icon: Piano, top: '10%', left: '-5%' },
                { icon: Music, top: '30%', left: '95%' },
                { icon: Headphones, top: '60%', left: '-8%' },
                { icon: Waves, top: '80%', left: '92%' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="absolute text-primary/60"
                  style={{
                    top: item.top,
                    left: item.left,
                    transformStyle: 'preserve-3d',
                  }}
                  animate={{
                    y: [0, -15, 0],
                    rotateY: [0, 20, -20, 0],
                    z: [0, 20, 0],
                  }}
                  transition={{
                    duration: 3 + index * 0.5,
                    repeat: Infinity,
                    delay: index * 0.3,
                    ease: 'easeInOut',
                  }}
                >
                  <item.icon className="w-8 h-8" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Subtle grain overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </section>
  );
};

export default AboutSection;
