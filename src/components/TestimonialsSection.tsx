import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, Play, Pause, Video } from 'lucide-react';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  avatar: string;
  hasVideo?: boolean;
  videoUrl?: string;
  videoPoster?: string;
}

const TestimonialsSection = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: t('testimonials.clients.client1.name'),
      role: t('testimonials.clients.client1.role'),
      company: t('testimonials.clients.client1.company'),
      quote: t('testimonials.clients.client1.quote'),
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
      hasVideo: true,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      videoPoster: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=400&fit=crop',
    },
    {
      id: 2,
      name: t('testimonials.clients.client2.name'),
      role: t('testimonials.clients.client2.role'),
      company: t('testimonials.clients.client2.company'),
      quote: t('testimonials.clients.client2.quote'),
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      hasVideo: true,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      videoPoster: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
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
      hasVideo: true,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      videoPoster: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=400&fit=crop',
    },
  ];

  const nextSlide = useCallback(() => {
    setShowVideo(false);
    setIsVideoPlaying(false);
    setDirection(isRTL ? -1 : 1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length, isRTL]);

  const prevSlide = useCallback(() => {
    setShowVideo(false);
    setIsVideoPlaying(false);
    setDirection(isRTL ? 1 : -1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length, isRTL]);

  // Auto-advance carousel (pause when video is playing)
  useEffect(() => {
    if (isVideoPlaying || showVideo) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide, isVideoPlaying, showVideo]);

  // Handle video play/pause
  const toggleVideo = () => {
    if (!showVideo) {
      setShowVideo(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play();
          setIsVideoPlaying(true);
        }
      }, 300);
    } else if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        videoRef.current.play();
        setIsVideoPlaying(true);
      }
    }
  };

  const closeVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setShowVideo(false);
    setIsVideoPlaying(false);
  };

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
          <div className="relative min-h-[500px] md:min-h-[450px] flex items-center justify-center px-8">
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

                  {/* Video Thumbnail (if has video) */}
                  {currentTestimonial.hasVideo && (
                    <motion.div
                      className="mb-6 mt-4 relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      <AnimatePresence mode="wait">
                        {!showVideo ? (
                          <motion.div
                            key="thumbnail"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative cursor-pointer group mx-auto max-w-md"
                            onClick={toggleVideo}
                          >
                            {/* Animated Thumbnail */}
                            <div className="relative rounded-xl overflow-hidden aspect-video">
                              <img
                                src={currentTestimonial.videoPoster}
                                alt={`${currentTestimonial.name} video testimonial`}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              
                              {/* Animated overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                              
                              {/* Pulsing play button */}
                              <motion.div
                                className="absolute inset-0 flex items-center justify-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                              >
                                <motion.div
                                  className="relative"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  {/* Pulse rings */}
                                  <motion.div
                                    className="absolute inset-0 rounded-full bg-primary/30"
                                    animate={{
                                      scale: [1, 1.5, 1.5],
                                      opacity: [0.5, 0, 0],
                                    }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                      ease: 'easeOut',
                                    }}
                                  />
                                  <motion.div
                                    className="absolute inset-0 rounded-full bg-primary/20"
                                    animate={{
                                      scale: [1, 1.8, 1.8],
                                      opacity: [0.3, 0, 0],
                                    }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                      ease: 'easeOut',
                                      delay: 0.3,
                                    }}
                                  />
                                  
                                  {/* Play button */}
                                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-glow relative z-10">
                                    <Play className="w-6 h-6 text-primary-foreground ml-1" fill="currentColor" />
                                  </div>
                                </motion.div>
                              </motion.div>

                              {/* Video badge */}
                              <motion.div
                                className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-foreground"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                              >
                                <Video className="w-3.5 h-3.5" />
                                {t('testimonials.watchVideo')}
                              </motion.div>

                              {/* Animated border */}
                              <motion.div
                                className="absolute inset-0 rounded-xl border-2 border-primary/0 group-hover:border-primary/50 transition-colors duration-300"
                                animate={{
                                  boxShadow: [
                                    '0 0 0 0 hsl(var(--primary) / 0)',
                                    '0 0 20px 2px hsl(var(--primary) / 0.2)',
                                    '0 0 0 0 hsl(var(--primary) / 0)',
                                  ],
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                              />
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="video"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative mx-auto max-w-md"
                          >
                            <div className="relative rounded-xl overflow-hidden aspect-video bg-background">
                              <video
                                ref={videoRef}
                                src={currentTestimonial.videoUrl}
                                poster={currentTestimonial.videoPoster}
                                className="w-full h-full object-cover"
                                onEnded={() => {
                                  setIsVideoPlaying(false);
                                  closeVideo();
                                }}
                              />
                              
                              {/* Video Controls Overlay */}
                              <motion.div
                                className="absolute inset-0 flex items-center justify-center bg-background/20 opacity-0 hover:opacity-100 transition-opacity duration-300"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                              >
                                <motion.button
                                  className="w-14 h-14 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                                  onClick={toggleVideo}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  {isVideoPlaying ? (
                                    <Pause className="w-5 h-5" />
                                  ) : (
                                    <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                                  )}
                                </motion.button>
                              </motion.div>

                              {/* Close button */}
                              <motion.button
                                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors duration-300"
                                onClick={closeVideo}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                whileHover={{ scale: 1.1 }}
                              >
                                ✕
                              </motion.button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}

                  {/* Stars */}
                  <motion.div
                    className={`flex items-center justify-center gap-1 mb-6 ${currentTestimonial.hasVideo ? '' : 'mt-4'}`}
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
                      {/* Video indicator badge */}
                      {currentTestimonial.hasVideo && (
                        <motion.div
                          className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.7, type: 'spring' }}
                        >
                          <Video className="w-3 h-3 text-primary-foreground" />
                        </motion.div>
                      )}
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

          {/* Dots Navigation with Video Indicators */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {testimonials.map((testimonial, index) => (
              <button
                key={index}
                onClick={() => {
                  setShowVideo(false);
                  setIsVideoPlaying(false);
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`relative transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-10 h-3 rounded-full bg-primary'
                    : 'w-3 h-3 rounded-full bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              >
                {testimonial.hasVideo && index !== currentIndex && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
