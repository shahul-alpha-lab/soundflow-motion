import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { X, Music } from 'lucide-react';

const NewsletterPopup = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isClosing, setIsClosing] = useState(false);
  const hasTriggered = useRef(false);

  useEffect(() => {
    // Check if already shown this session
    const hasShown = sessionStorage.getItem('newsletter-popup-shown');
    if (hasShown) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggered.current) {
            hasTriggered.current = true;
            // Delay popup by 1.5s after footer is visible
            setTimeout(() => {
              setIsVisible(true);
              sessionStorage.setItem('newsletter-popup-shown', 'true');
            }, 1500);
          }
        });
      },
      { threshold: 0.3 }
    );

    const footer = document.querySelector('footer');
    if (footer) {
      observer.observe(footer);
    }

    return () => observer.disconnect();
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // Auto-close after success
      setTimeout(() => {
        handleClose();
      }, 3000);
    }
  };

  // Musical notes for background animation
  const musicalNotes = ['♪', '♫', '♩', '♬'];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ 
            opacity: isClosing ? 0 : 1, 
            y: isClosing ? 100 : 0, 
            scale: isClosing ? 0.9 : 1 
          }}
          exit={{ opacity: 0, y: 100, scale: 0.9 }}
          transition={{ 
            type: 'spring', 
            stiffness: 260, 
            damping: 25,
            duration: 0.5 
          }}
          className={`fixed z-50 ${
            isRTL ? 'left-4 right-4 md:left-auto md:right-6' : 'left-4 right-4 md:left-auto md:right-6'
          } bottom-4 md:bottom-6 md:w-[380px] mx-auto md:mx-0`}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <div className="relative overflow-hidden rounded-2xl bg-background/80 backdrop-blur-xl border border-border/50 shadow-card">
            {/* Background Musical Animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* Animated wave lines */}
              <svg 
                className="absolute bottom-0 left-0 w-full h-24 opacity-[0.05]"
                viewBox="0 0 400 100"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M0,50 Q100,20 200,50 T400,50"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  fill="none"
                  animate={{
                    d: [
                      "M0,50 Q100,20 200,50 T400,50",
                      "M0,50 Q100,80 200,50 T400,50",
                      "M0,50 Q100,20 200,50 T400,50"
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.path
                  d="M0,60 Q100,30 200,60 T400,60"
                  stroke="hsl(var(--primary))"
                  strokeWidth="1.5"
                  fill="none"
                  animate={{
                    d: [
                      "M0,60 Q100,30 200,60 T400,60",
                      "M0,60 Q100,90 200,60 T400,60",
                      "M0,60 Q100,30 200,60 T400,60"
                    ]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />
              </svg>

              {/* Floating musical notes */}
              {musicalNotes.map((note, i) => (
                <motion.span
                  key={i}
                  className="absolute text-primary/10 text-2xl select-none"
                  style={{
                    left: `${15 + i * 20}%`,
                    bottom: '20%'
                  }}
                  animate={{
                    y: [-10, -30, -10],
                    x: isRTL ? [0, -10, 0] : [0, 10, 0],
                    opacity: [0.1, 0.2, 0.1],
                    rotate: [-5, 5, -5]
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.8
                  }}
                >
                  {note}
                </motion.span>
              ))}

              {/* Frequency bars */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 opacity-[0.08]">
                {[...Array(7)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-primary rounded-full"
                    animate={{
                      height: [8, 16 + Math.random() * 16, 8]
                    }}
                    transition={{
                      duration: 0.8 + i * 0.1,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.15
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Close Button */}
            <motion.button
              onClick={handleClose}
              className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'} p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all z-10`}
              whileHover={{ scale: 1.1, opacity: 0.7 }}
              whileTap={{ scale: 0.95 }}
            >
              <X size={16} />
            </motion.button>

            {/* Content */}
            <div className="relative z-10 p-6">
              {!isSubmitted ? (
                <>
                  {/* Header Icon */}
                  <motion.div
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                  >
                    <Music className="w-5 h-5 text-primary" />
                  </motion.div>

                  {/* Headline */}
                  <motion.h3
                    className="text-lg font-semibold text-foreground mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {t('newsletter.headline')}
                  </motion.h3>

                  {/* Subtext */}
                  <motion.p
                    className="text-sm text-muted-foreground mb-5"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {t('newsletter.subtext')}
                  </motion.p>

                  {/* Form */}
                  <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {/* Name Field (Optional) */}
                    <div className="relative">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t('newsletter.namePlaceholder')}
                        className="w-full px-4 py-2.5 rounded-lg bg-secondary/50 border border-border/50 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                      />
                    </div>

                    {/* Email Field */}
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t('newsletter.emailPlaceholder')}
                        required
                        className="w-full px-4 py-2.5 rounded-lg bg-secondary/50 border border-border/50 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm transition-all hover:shadow-glow"
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: '0 0 20px hsl(217 91% 60% / 0.4)'
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {t('newsletter.cta')}
                    </motion.button>
                  </motion.form>
                </>
              ) : (
                /* Success State */
                <motion.div
                  className="text-center py-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring' }}
                >
                  {/* Animated Notes */}
                  <div className="relative h-12 mb-4">
                    {musicalNotes.map((note, i) => (
                      <motion.span
                        key={i}
                        className="absolute text-primary text-xl"
                        style={{
                          left: `${30 + i * 12}%`
                        }}
                        initial={{ opacity: 0, y: 0 }}
                        animate={{
                          opacity: [0, 1, 0],
                          y: [0, -30, -50],
                          scale: [1, 1.2, 0.8]
                        }}
                        transition={{
                          duration: 1.5,
                          delay: i * 0.2,
                          ease: "easeOut"
                        }}
                      >
                        {note}
                      </motion.span>
                    ))}
                  </div>

                  {/* Success Icon */}
                  <motion.div
                    className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-primary/10 mb-3"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                  >
                    <motion.div
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                    >
                      <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none">
                        <motion.path
                          d="M5 13l4 4L19 7"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: 0.5, duration: 0.4 }}
                        />
                      </svg>
                    </motion.div>
                  </motion.div>

                  {/* Success Message */}
                  <motion.p
                    className="text-foreground font-medium"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    {t('newsletter.success')}
                  </motion.p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewsletterPopup;
