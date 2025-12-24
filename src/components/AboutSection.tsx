import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

const AboutSection = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const keywords = [
    { key: 'creativity', delay: 0 },
    { key: 'sound', delay: 0.1 },
    { key: 'branding', delay: 0.2 },
    { key: 'innovation', delay: 0.3 },
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="section-padding bg-background relative overflow-hidden"
    >
      {/* Background Decoration */}
      <motion.div
        style={{ y }}
        className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none"
      >
        <div className="w-full h-full bg-gradient-to-br from-primary to-transparent rounded-full blur-3xl" />
      </motion.div>

      <div className="container-max relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-4">
              {t('about.subtitle')}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              {t('about.title')}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {t('about.description')}
            </p>

            {/* Keywords */}
            <div className="flex flex-wrap gap-3">
              {keywords.map((keyword) => (
                <motion.span
                  key={keyword.key}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: keyword.delay }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-5 py-2 rounded-full border border-primary/30 text-primary font-medium text-sm hover:bg-primary/10 transition-colors cursor-default"
                >
                  {t(`about.keywords.${keyword.key}`)}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Animated Circles */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-8 rounded-full border-2 border-primary/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-16 rounded-full border-2 border-primary/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
              
              {/* Center Content */}
              <div className="absolute inset-24 rounded-full bg-primary/10 flex items-center justify-center">
                <motion.div
                  className="text-6xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  🎵
                </motion.div>
              </div>

              {/* Floating Elements */}
              {['🎹', '🎸', '🎤', '🎧'].map((emoji, index) => (
                <motion.div
                  key={index}
                  className="absolute text-3xl"
                  style={{
                    top: `${20 + index * 20}%`,
                    left: index % 2 === 0 ? '-10%' : '90%',
                  }}
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 3 + index * 0.5,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                >
                  {emoji}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
