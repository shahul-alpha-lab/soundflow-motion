import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight, ArrowLeft } from 'lucide-react';

// Import service images
import soundMixingImg from '@/assets/services/sound-mixing.jpg';
import voiceRecordingImg from '@/assets/services/voice-recording.jpg';
import trackMasteringImg from '@/assets/services/track-mastering.jpg';
import audioEditingImg from '@/assets/services/audio-editing.jpg';
import audioRestorationImg from '@/assets/services/audio-restoration.jpg';

interface ServicePanel {
  id: string;
  image: string;
  titleKey: string;
  descriptionKey: string;
}

const services: ServicePanel[] = [
  {
    id: 'mixing',
    image: soundMixingImg,
    titleKey: 'servicesShowcase.mixing.title',
    descriptionKey: 'servicesShowcase.mixing.description',
  },
  {
    id: 'recording',
    image: voiceRecordingImg,
    titleKey: 'servicesShowcase.recording.title',
    descriptionKey: 'servicesShowcase.recording.description',
  },
  {
    id: 'mastering',
    image: trackMasteringImg,
    titleKey: 'servicesShowcase.mastering.title',
    descriptionKey: 'servicesShowcase.mastering.description',
  },
  {
    id: 'editing',
    image: audioEditingImg,
    titleKey: 'servicesShowcase.editing.title',
    descriptionKey: 'servicesShowcase.editing.description',
  },
  {
    id: 'restoration',
    image: audioRestorationImg,
    titleKey: 'servicesShowcase.restoration.title',
    descriptionKey: 'servicesShowcase.restoration.description',
  },
];

const ServicePanelCard = ({
  service,
  index,
  isRTL,
}: {
  service: ServicePanel;
  index: number;
  isRTL: boolean;
}) => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <motion.div
      className="relative flex-1 min-w-[280px] md:min-w-0 h-[500px] md:h-[600px] overflow-hidden group cursor-pointer"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image with Zoom */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${service.image})` }}
        animate={{
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Dark Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"
        animate={{
          opacity: isHovered ? 1 : 0.7,
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Accent Border on Hover */}
      <motion.div
        className="absolute inset-0 border-2 border-primary/0 pointer-events-none"
        animate={{
          borderColor: isHovered ? 'hsl(var(--primary) / 0.5)' : 'hsl(var(--primary) / 0)',
          boxShadow: isHovered
            ? 'inset 0 0 30px hsl(var(--primary) / 0.2)'
            : 'inset 0 0 0px hsl(var(--primary) / 0)',
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Divider Line */}
      {index < services.length - 1 && (
        <div className="absolute top-0 bottom-0 end-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-8">
        {/* Title at Top */}
        <motion.h3
          className="text-2xl md:text-3xl font-bold text-white tracking-tight"
          animate={{
            y: isHovered ? -10 : 0,
          }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          {t(service.titleKey)}
        </motion.h3>

        {/* Description + Arrow at Bottom (appears on hover) */}
        <div className="space-y-4">
          <motion.p
            className="text-white/80 text-sm md:text-base leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20,
            }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            {t(service.descriptionKey)}
          </motion.p>

          <motion.div
            className="flex items-center gap-2 text-primary"
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 0 : isRTL ? 20 : -20,
            }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          >
            <span className="text-sm font-medium">{t('servicesShowcase.learnMore')}</span>
            <ArrowIcon className="w-4 h-4" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Animated Sound Wave
const AnimatedSoundWave = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden opacity-30">
      <svg
        viewBox="0 0 1200 100"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,50 Q150,20 300,50 T600,50 T900,50 T1200,50"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1],
            opacity: [0, 0.5, 0.5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.path
          d="M0,60 Q200,30 400,60 T800,60 T1200,60"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1],
            opacity: [0, 0.3, 0.3, 0],
          }}
          transition={{
            duration: 5,
            delay: 0.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </svg>
    </div>
  );
};

// Floating Particles
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, -60, -20],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            delay: Math.random() * 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

const ServicesShowcase = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-slate-950 py-20 md:py-32 overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Section Header */}
      <div className="container mx-auto px-4 mb-12 md:mb-16">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.span
            className="inline-block text-primary text-sm font-medium tracking-widest uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t('servicesShowcase.label')}
          </motion.span>
          <motion.h2
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('servicesShowcase.title')}
          </motion.h2>
          <motion.p
            className="text-white/60 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {t('servicesShowcase.subtitle')}
          </motion.p>
        </motion.div>
      </div>

      {/* Service Panels */}
      <div className="relative">
        {/* Desktop: Side by side panels */}
        <div className="hidden md:flex">
          {services.map((service, index) => (
            <ServicePanelCard
              key={service.id}
              service={service}
              index={index}
              isRTL={isRTL}
            />
          ))}
        </div>

        {/* Mobile: Horizontal Scroll */}
        <div className="md:hidden overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 px-4 pb-4" style={{ width: 'max-content' }}>
            {services.map((service, index) => (
              <ServicePanelCard
                key={service.id}
                service={service}
                index={index}
                isRTL={isRTL}
              />
            ))}
          </div>
        </div>

        {/* Sound Wave Animation */}
        <AnimatedSoundWave />
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
      />
    </section>
  );
};

export default ServicesShowcase;
