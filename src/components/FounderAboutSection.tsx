import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';

const FounderAboutSection = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);
  const textX = useTransform(scrollYProgress, [0, 0.3], [isRTL ? -50 : 50, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePosition({ x, y });
      mouseX.set(x * 20);
      mouseY.set(y * 20);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Floating elements data
  const musicNotes = ['♪', '♫', '♬', '𝄞', '♩'];
  const floatingElements = [...Array(8)].map((_, i) => ({
    type: i % 3 === 0 ? 'heart' : 'note',
    content: i % 3 === 0 ? '♥' : musicNotes[i % musicNotes.length],
    angle: (i / 8) * 360,
    distance: 120 + (i % 3) * 30,
    delay: i * 0.3,
    duration: 4 + (i % 3),
  }));

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background Grid */}
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

      {/* Animated Sound Waves Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent"
            style={{ top: `${25 + i * 20}%` }}
            animate={{
              x: isRTL ? ['-100%', '100%'] : ['100%', '-100%'],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 2,
            }}
          />
        ))}
      </div>

      {/* Floating Musical Symbols Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/5"
            style={{
              left: `${10 + (i % 4) * 25}%`,
              top: `${15 + Math.floor(i / 4) * 30}%`,
              fontSize: `${24 + (i % 3) * 12}px`,
            }}
            animate={{
              y: [-10, 10, -10],
              x: isRTL ? [5, -5, 5] : [-5, 5, -5],
              opacity: [0.03, 0.08, 0.03],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          >
            {['♪', '♫', '♬', '𝄞'][i % 4]}
          </motion.div>
        ))}
      </div>

      <motion.div
        style={{ opacity }}
        className="container-max px-4 md:px-8 relative z-10"
      >
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${isRTL ? 'lg:grid-flow-dense' : ''}`}>
          {/* Founder Image - Left */}
          <motion.div
            ref={imageRef}
            style={{ scale: imageScale }}
            className={`relative flex justify-center ${isRTL ? 'lg:col-start-2' : ''}`}
          >
            {/* Orbiting Particles */}
            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-primary/30"
                  style={{
                    x: springX,
                    y: springY,
                  }}
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 20 + i * 2,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: i * 0.5,
                  }}
                >
                  <motion.div
                    className="absolute"
                    style={{
                      left: `${80 + (i % 4) * 20}px`,
                    }}
                    animate={{
                      opacity: [0.2, 0.6, 0.2],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 2 + (i % 3),
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Floating Music Notes & Hearts around Image */}
            {floatingElements.map((el, i) => (
              <motion.div
                key={i}
                className={`absolute ${el.type === 'heart' ? 'text-primary/50' : 'text-primary/40'}`}
                style={{
                  fontSize: el.type === 'heart' ? '18px' : '20px',
                  x: springX,
                  y: springY,
                }}
                animate={{
                  x: [
                    Math.cos((el.angle * Math.PI) / 180) * el.distance,
                    Math.cos(((el.angle + 30) * Math.PI) / 180) * (el.distance + 10),
                    Math.cos((el.angle * Math.PI) / 180) * el.distance,
                  ],
                  y: [
                    Math.sin((el.angle * Math.PI) / 180) * el.distance - 20,
                    Math.sin(((el.angle + 30) * Math.PI) / 180) * (el.distance + 10) - 30,
                    Math.sin((el.angle * Math.PI) / 180) * el.distance - 20,
                  ],
                  opacity: [0.3, 0.7, 0.3],
                  scale: el.type === 'heart' ? [1, 1.2, 1] : [1, 1.1, 1],
                  rotate: el.type === 'note' ? [-10, 10, -10] : [0, 0, 0],
                }}
                transition={{
                  duration: el.duration,
                  repeat: Infinity,
                  delay: el.delay,
                  ease: 'easeInOut',
                }}
              >
                {el.content}
              </motion.div>
            ))}

            {/* Image Container */}
            <motion.div
              className="relative"
              animate={{
                y: [-5, 5, -5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {/* Glowing Ring */}
              <motion.div
                className="absolute -inset-3 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary) / 0.3), hsl(var(--primary) / 0.1), hsl(var(--primary) / 0.3))',
                }}
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              
              {/* Pulsing Glow */}
              <motion.div
                className="absolute -inset-4 rounded-full bg-primary/10 blur-xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />

              {/* Image Frame */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
                {/* Placeholder founder silhouette */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
                <svg
                  viewBox="0 0 200 200"
                  className="w-full h-full"
                  fill="none"
                >
                  {/* Abstract founder silhouette with musical elements */}
                  <defs>
                    <linearGradient id="founderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                      <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>
                  <circle cx="100" cy="100" r="95" fill="url(#founderGradient)" />
                  {/* Head silhouette */}
                  <ellipse cx="100" cy="70" rx="35" ry="40" fill="hsl(var(--foreground))" fillOpacity="0.1" />
                  {/* Body silhouette */}
                  <path
                    d="M50 200 Q50 140 100 130 Q150 140 150 200"
                    fill="hsl(var(--foreground))"
                    fillOpacity="0.1"
                  />
                  {/* Musical note accent */}
                  <motion.text
                    x="140"
                    y="50"
                    fontSize="24"
                    fill="hsl(var(--primary))"
                    fillOpacity="0.4"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ♪
                  </motion.text>
                  <motion.text
                    x="50"
                    y="160"
                    fontSize="20"
                    fill="hsl(var(--primary))"
                    fillOpacity="0.3"
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                  >
                    ♫
                  </motion.text>
                </svg>
              </div>
            </motion.div>
          </motion.div>

          {/* Text Content - Right */}
          <motion.div
            style={{ x: textX }}
            className={`space-y-6 ${isRTL ? 'lg:col-start-1 text-right' : 'text-left'}`}
          >
            {/* Label */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-sm uppercase tracking-[0.2em] text-primary font-medium"
            >
              {t('founderAbout.label')}
            </motion.p>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
            >
              {t('founderAbout.headline').split(' ').map((word, i) => (
                <span
                  key={i}
                  className={
                    ['Passion', 'Music', 'الشغف', 'الموسيقى'].includes(word.replace('.', ''))
                      ? 'text-primary'
                      : ''
                  }
                >
                  {word}{' '}
                </span>
              ))}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground leading-relaxed max-w-xl"
            >
              {t('founderAbout.description')}
            </motion.p>

            {/* Founder Quote */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base italic text-foreground/70 border-l-2 border-primary pl-4 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-4"
            >
              "{t('founderAbout.quote')}"
            </motion.p>

            {/* Decorative musical elements */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`flex items-center gap-4 pt-4 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              {['♪', '♫', '♬', '♥', '♪'].map((symbol, i) => (
                <motion.span
                  key={i}
                  className="text-primary/40 text-xl"
                  animate={{
                    y: [-2, 2, -2],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                >
                  {symbol}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default FounderAboutSection;
