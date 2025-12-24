import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';

const PortfolioSection = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = ['all', 'music', 'media', 'web', 'branding'];

  const projects = [
    {
      id: 1,
      title: 'Harmonic Studio',
      category: 'music',
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=600&fit=crop',
    },
    {
      id: 2,
      title: 'Visual Symphony',
      category: 'media',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop',
    },
    {
      id: 3,
      title: 'Digital Resonance',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    },
    {
      id: 4,
      title: 'Sound Identity',
      category: 'branding',
      image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop',
    },
    {
      id: 5,
      title: 'Acoustic Waves',
      category: 'music',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=600&fit=crop',
    },
    {
      id: 6,
      title: 'Motion Graphics',
      category: 'media',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop',
    },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="portfolio" className="section-padding bg-secondary/30 relative overflow-hidden">
      <div className="container-max">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-4">
            {t('portfolio.subtitle')}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            {t('portfolio.title')}
          </h2>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === category
                  ? 'bg-primary text-primary-foreground shadow-glow'
                  : 'bg-background border border-border hover:border-primary hover:text-primary'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t(`portfolio.categories.${category}`)}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative overflow-hidden rounded-2xl cursor-pointer"
                whileHover={{ y: -8 }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-primary-foreground/80 text-sm uppercase tracking-wider mb-2">
                    {t(`portfolio.categories.${project.category}`)}
                  </p>
                  <h3 className="text-xl font-bold text-primary-foreground flex items-center gap-2">
                    {project.title}
                    <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-primary/10 blur-2xl" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
