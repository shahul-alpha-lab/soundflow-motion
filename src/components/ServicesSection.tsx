import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Music, Video, Megaphone, Globe } from 'lucide-react';
import ServiceCard from './ServiceCard';

const ServicesSection = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: Music,
      titleKey: 'services.music.title',
      descKey: 'services.music.description',
    },
    {
      icon: Video,
      titleKey: 'services.media.title',
      descKey: 'services.media.description',
    },
    {
      icon: Megaphone,
      titleKey: 'services.marketing.title',
      descKey: 'services.marketing.description',
    },
    {
      icon: Globe,
      titleKey: 'services.web.title',
      descKey: 'services.web.description',
    },
  ];

  return (
    <section id="services" className="section-padding bg-background relative overflow-hidden">
      {/* Ambient Sound Wave Background - Continuous Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Flowing waveform lines */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[200%] h-px opacity-[0.04]"
            style={{
              top: `${20 + i * 15}%`,
              background: 'linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)',
            }}
            animate={{
              x: ['-50%', '0%'],
              opacity: [0.02, 0.06, 0.02],
            }}
            transition={{
              x: {
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: 'linear',
              },
              opacity: {
                duration: 4 + i,
                repeat: Infinity,
                ease: [0.4, 0, 0.2, 1],
              },
            }}
          />
        ))}

        {/* Frequency curve paths */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" preserveAspectRatio="none">
          <motion.path
            d="M0,50 Q250,20 500,50 T1000,50 T1500,50 T2000,50"
            stroke="hsl(var(--primary))"
            strokeWidth="1"
            fill="none"
            animate={{
              d: [
                "M0,50 Q250,20 500,50 T1000,50 T1500,50 T2000,50",
                "M0,50 Q250,80 500,50 T1000,50 T1500,50 T2000,50",
                "M0,50 Q250,20 500,50 T1000,50 T1500,50 T2000,50",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: [0.4, 0, 0.2, 1],
            }}
          />
          <motion.path
            d="M0,70 Q300,40 600,70 T1200,70 T1800,70 T2400,70"
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
            fill="none"
            animate={{
              d: [
                "M0,70 Q300,40 600,70 T1200,70 T1800,70 T2400,70",
                "M0,70 Q300,100 600,70 T1200,70 T1800,70 T2400,70",
                "M0,70 Q300,40 600,70 T1200,70 T1800,70 T2400,70",
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: [0.4, 0, 0.2, 1],
              delay: 1,
            }}
          />
        </svg>

        {/* Ambient glow orbs */}
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl bg-primary/5"
          style={{ top: '10%', left: '10%' }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
        <motion.div
          className="absolute w-80 h-80 rounded-full blur-3xl bg-primary/5"
          style={{ bottom: '10%', right: '15%' }}
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.04, 0.07, 0.04],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
            delay: 2,
          }}
        />
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container-max relative z-10">
        {/* Section Header with subtle floating animation */}
        <div className="text-center mb-16">
          <motion.p
            className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-4"
            animate={{
              y: [0, -2, 0],
              opacity: [0.98, 1, 0.98],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            {t('services.subtitle')}
          </motion.p>
          
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-foreground relative inline-block"
            animate={{
              y: [0, -1, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            {t('services.title')}
            {/* Animated underline accent */}
            <motion.span
              className="absolute -bottom-2 left-0 h-0.5 bg-primary/50 rounded-full"
              animate={{
                width: ['0%', '100%', '0%'],
                left: ['0%', '0%', '100%'],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: [0.4, 0, 0.2, 1],
              }}
            />
          </motion.h2>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.titleKey}
              icon={service.icon}
              title={t(service.titleKey)}
              description={t(service.descKey)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
