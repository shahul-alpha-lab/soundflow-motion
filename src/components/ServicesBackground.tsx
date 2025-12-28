import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const ServicesBackground = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

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

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  
  // Wave movement based on scroll
  const waveOffset1 = useTransform(smoothProgress, [0, 1], isRTL ? [100, -100] : [-100, 100]);
  const waveOffset2 = useTransform(smoothProgress, [0, 1], isRTL ? [50, -150] : [-50, 150]);
  const waveOffset3 = useTransform(smoothProgress, [0, 1], isRTL ? [150, -50] : [-150, 50]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Particle count based on device
  const particleCount = isMobile ? 8 : 16;
  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 3,
    duration: Math.random() * 4 + 4,
  }));

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ opacity }}
    >
      {/* Sound Wave Lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        style={{ opacity: 0.06 }}
      >
        <defs>
          <linearGradient id="servicesWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Wave 1 */}
        <motion.path
          d="M-100,120 Q100,80 300,120 T700,120 T1100,120 T1500,120 T1900,120"
          fill="none"
          stroke="url(#servicesWaveGradient)"
          strokeWidth="2"
          style={{ x: waveOffset1 }}
        />
        
        {/* Wave 2 */}
        <motion.path
          d="M-100,200 Q150,160 350,200 T750,200 T1150,200 T1550,200 T1950,200"
          fill="none"
          stroke="url(#servicesWaveGradient)"
          strokeWidth="1.5"
          style={{ x: waveOffset2 }}
        />
        
        {/* Wave 3 */}
        <motion.path
          d="M-100,280 Q200,240 400,280 T800,280 T1200,280 T1600,280 T2000,280"
          fill="none"
          stroke="url(#servicesWaveGradient)"
          strokeWidth="1"
          style={{ x: waveOffset3 }}
        />
      </svg>

      {/* Frequency Curves */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        style={{ opacity: 0.05 }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.ellipse
            key={i}
            cx="50%"
            cy="50%"
            rx={150 + i * 80}
            ry={50 + i * 30}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [0.8, 1, 0.8],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}
      </svg>

      {/* Floating Musical Dots */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            opacity: 0.08,
          }}
          animate={{
            y: [0, -30, 0],
            x: isRTL ? [0, -10, 0] : [0, 10, 0],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: particle.delay,
          }}
        />
      ))}

      {/* Diagonal Drift Lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.04 }}
      >
        {[...Array(isMobile ? 3 : 6)].map((_, i) => (
          <motion.line
            key={i}
            x1={`${10 + i * 15}%`}
            y1="0%"
            x2={`${20 + i * 15}%`}
            y2="100%"
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
            strokeDasharray="4 8"
            animate={{
              x1: [`${10 + i * 15}%`, `${15 + i * 15}%`, `${10 + i * 15}%`],
              x2: [`${20 + i * 15}%`, `${25 + i * 15}%`, `${20 + i * 15}%`],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </svg>
    </motion.div>
  );
};

export default ServicesBackground;
