import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  avatar: string;
}

const TestimonialsSection = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: t('testimonials.clients.client1.name'),
      role: t('testimonials.clients.client1.role'),
      company: t('testimonials.clients.client1.company'),
      quote: t('testimonials.clients.client1.quote'),
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    },
    {
      id: 2,
      name: t('testimonials.clients.client2.name'),
      role: t('testimonials.clients.client2.role'),
      company: t('testimonials.clients.client2.company'),
      quote: t('testimonials.clients.client2.quote'),
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    },
    {
      id: 3,
      name: t('testimonials.clients.client3.name'),
      role: t('testimonials.clients.client3.role'),
      company: t('testimonials.clients.client3.company'),
      quote: t('testimonials.clients.client3.quote'),
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    },
    {
      id: 4,
      name: t('testimonials.clients.client4.name'),
      role: t('testimonials.clients.client4.role'),
      company: t('testimonials.clients.client4.company'),
      quote: t('testimonials.clients.client4.quote'),
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    },
  ];

  const nextSlide = useCallback(() => {
    setDirection(isRTL ? -1 : 1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length, isRTL]);

  const prevSlide = useCallback(() => {
    setDirection(isRTL ? 1 : -1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length, isRTL]);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.9,
    }),
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="section-padding bg-secondary/30 relative overflow-hidden">
      {/* Background musical elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating music notes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/10 text-4xl"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              rotate: [-5, 5, -5],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          >
            {['♪', '♫', '♬', '♩'][i % 4]}
          </motion.div>
        ))}

        {/* Subtle wave lines */}
        <svg className="absolute bottom-0 left-0 w-full h-32 opacity-5" viewBox="0 0 1200 100" preserveAspectRatio="none">
          <motion.path
            d="M0,50 Q300,20 600,50 T1200,50"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            animate={{
              d: [
                "M0,50 Q300,20 600,50 T1200,50",
                "M0,50 Q300,80 600,50 T1200,50",
                "M0,50 Q300,20 600,50 T1200,50",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </div>

      <div className="container-max relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={isRTL ? nextSlide : prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-20 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-soft flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={isRTL ? prevSlide : nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-20 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-soft flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Testimonial Card */}
          <div className="relative min-h-[400px] md:min-h-[350px] flex items-center justify-center px-8">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 },
                }}
                className="absolute inset-x-0"
              >
                <div className="glass-card p-8 md:p-12 text-center relative">
                  {/* Quote Icon */}
                  <motion.div
                    className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-glow"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  >
                    <Quote className="w-5 h-5 text-primary-foreground" />
                  </motion.div>

                  {/* Stars */}
                  <motion.div
                    className="flex items-center justify-center gap-1 mb-6 mt-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                      >
                        <Star
                          className={`w-5 h-5 ${
                            i < currentTestimonial.rating
                              ? 'text-yellow-500 fill-yellow-500'
                              : 'text-muted-foreground'
                          }`}
                        />
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Quote Text */}
                  <motion.blockquote
                    className="text-lg md:text-xl text-foreground leading-relaxed mb-8 italic"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    "{currentTestimonial.quote}"
                  </motion.blockquote>

                  {/* Client Info */}
                  <motion.div
                    className="flex flex-col items-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="relative">
                      <img
                        src={currentTestimonial.avatar}
                        alt={currentTestimonial.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                      />
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-primary"
                        animate={{
                          scale: [1, 1.15, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    <div className="text-center">
                      <h4 className="font-semibold text-foreground">
                        {currentTestimonial.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {currentTestimonial.role}, {currentTestimonial.company}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Navigation */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary w-8'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
