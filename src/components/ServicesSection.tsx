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
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-4"
          >
            {t('services.subtitle')}
          </motion.p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            {t('services.title')}
          </h2>
        </motion.div>

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
