import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Briefcase, Users, Award, Clock } from 'lucide-react';

const AnimatedCounter = ({ target, duration = 2 }: { target: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const increment = target / (duration * 60);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}</span>;
};

const WhyUsSection = () => {
  const { t } = useTranslation();

  const stats = [
    { icon: Briefcase, value: 250, suffix: '+', labelKey: 'whyUs.stats.projects' },
    { icon: Users, value: 120, suffix: '+', labelKey: 'whyUs.stats.clients' },
    { icon: Award, value: 15, suffix: '', labelKey: 'whyUs.stats.awards' },
    { icon: Clock, value: 8, suffix: '+', labelKey: 'whyUs.stats.years' },
  ];

  return (
    <section className="section-padding bg-foreground text-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--background)) 1px, transparent 0)',
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
          <p className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-4">
            {t('whyUs.subtitle')}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold">
            {t('whyUs.title')}
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.labelKey}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <motion.div
                  className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-background/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Icon className="w-8 h-8 text-primary" />
                </motion.div>
                
                <div className="text-4xl md:text-5xl font-bold mb-2 text-background">
                  <AnimatedCounter target={stat.value} />
                  {stat.suffix}
                </div>
                
                <p className="text-background/70 font-medium">
                  {t(stat.labelKey)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
