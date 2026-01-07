import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Heart, Music, Waves, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedCounter from '@/components/animations/AnimatedCounter';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from 'react-i18next';

const SponsorshipSection = () => {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedAmount, setSelectedAmount] = useState(1);
  const [bgIndex, setBgIndex] = useState(0);

  const headlines = [
    t('sponsorship.headline1'),
    t('sponsorship.headline2'),
    t('sponsorship.headline3'),
  ];

  const subtexts = [
    t('sponsorship.subtext1'),
    t('sponsorship.subtext2'),
    t('sponsorship.subtext3'),
  ];

  const amounts = [100, 250, 500];

  // Auto-rotate headlines
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % headlines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [headlines.length]);

  // Auto-rotate backgrounds
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePayNow = () => {
    // Placeholder for payment flow
    console.log(`Processing payment of $${amounts[selectedAmount]}`);
  };

  const floatingElements = [
    { Icon: Music, delay: 0, x: '10%', y: '20%' },
    { Icon: Waves, delay: 0.5, x: '85%', y: '30%' },
    { Icon: Zap, delay: 1, x: '15%', y: '70%' },
    { Icon: Music, delay: 1.5, x: '80%', y: '75%' },
    { Icon: Waves, delay: 2, x: '50%', y: '15%' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 px-4 overflow-hidden"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-6xl mx-auto rounded-3xl overflow-hidden"
      >
        {/* Animated Backgrounds */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            {bgIndex === 0 && (
              <motion.div
                key="bg1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0"
              >
                {/* Sound Wave Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900" />
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
                    style={{
                      top: `${20 + i * 10}%`,
                      left: 0,
                      right: 0,
                    }}
                    animate={{
                      scaleX: [0.5, 1, 0.5],
                      opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </motion.div>
            )}
            {bgIndex === 1 && (
              <motion.div
                key="bg2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0"
              >
                {/* Abstract Sound Visuals */}
                <div className="absolute inset-0 bg-gradient-to-tl from-zinc-900 via-zinc-800 to-zinc-900" />
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full bg-primary/10"
                    style={{
                      width: `${100 + i * 50}px`,
                      height: `${100 + i * 50}px`,
                      left: `${20 + i * 15}%`,
                      top: '50%',
                      transform: 'translateY(-50%)',
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                      duration: 4,
                      delay: i * 0.3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </motion.div>
            )}
            {bgIndex === 2 && (
              <motion.div
                key="bg3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0"
              >
                {/* Digital Motion Textures */}
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900" />
                <div className="absolute inset-0">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 bg-gradient-to-b from-primary/30 to-transparent"
                      style={{
                        height: `${30 + Math.random() * 40}%`,
                        left: `${i * 5}%`,
                        bottom: 0,
                      }}
                      animate={{
                        scaleY: [0.5, 1, 0.5],
                        opacity: [0.2, 0.5, 0.2],
                      }}
                      transition={{
                        duration: 2 + Math.random() * 2,
                        delay: i * 0.1,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm" />
        </div>

        {/* Floating Music Elements */}
        {floatingElements.map(({ Icon, delay, x, y }, index) => (
          <motion.div
            key={index}
            className="absolute text-primary/20 pointer-events-none"
            style={{ left: x, top: y }}
            initial={{ opacity: 0 }}
            animate={isInView ? {
              opacity: [0.1, 0.3, 0.1],
              y: [0, -20, 0],
              rotate: [-5, 5, -5],
            } : {}}
            transition={{
              duration: 6,
              delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Icon className="w-8 h-8 md:w-12 md:h-12" />
          </motion.div>
        ))}

        {/* Content */}
        <div className="relative z-10 px-6 md:px-16 py-16 md:py-24">
          {/* Animated Headlines */}
          <div className="text-center mb-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-center gap-2 mb-4">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                  </motion.div>
                  <span className="text-sm uppercase tracking-widest text-primary">
                    {t('sponsorship.label')}
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                  {headlines[currentSlide]}
                </h2>
                <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
                  {subtexts[currentSlide]}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Payment Card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md mx-auto"
          >
            {/* Spotlight Glow */}
            <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-3xl opacity-50" />
            
            <div className="relative bg-zinc-900/90 backdrop-blur-md border border-zinc-700 p-8 shadow-2xl">
              <div className="text-center mb-6">
                <span className="text-xs uppercase tracking-widest text-primary">
                  {t('sponsorship.official')}
                </span>
              </div>

              {/* Amount Selection */}
              <div className="flex justify-center gap-3 mb-8">
                {amounts.map((amount, index) => (
                  <motion.button
                    key={amount}
                    onClick={() => setSelectedAmount(index)}
                    className={`px-6 py-3 font-semibold transition-all duration-300 ${
                      selectedAmount === index
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ${amount}
                  </motion.button>
                ))}
              </div>

              {/* Animated Amount Display */}
              <div className="text-center mb-8">
                <span className="text-5xl md:text-6xl font-bold text-white">
                  $<AnimatedCounter
                    value={amounts[selectedAmount]}
                    duration={0.5}
                    className="inline"
                  />
                </span>
              </div>

              {/* CTA Button */}
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(var(--primary), 0.3)',
                    '0 0 40px rgba(var(--primary), 0.5)',
                    '0 0 20px rgba(var(--primary), 0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative"
              >
                <Button
                  onClick={handlePayNow}
                  className="w-full py-6 text-lg font-semibold bg-primary hover:bg-primary/90 transition-all duration-300"
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2"
                  >
                    {t('sponsorship.payNow')}
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.div>
                  </motion.span>
                </Button>
                
                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                  initial={{ x: '-100%' }}
                  animate={isInView ? { x: '100%' } : {}}
                  transition={{ duration: 1, delay: 1 }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default SponsorshipSection;
