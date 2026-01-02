import { motion, useInView, Variants } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  once?: boolean;
  threshold?: number;
}

const ScrollReveal = ({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  direction = 'up',
  distance = 60,
  once = true,
  threshold = 0.25,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const { isRTL } = useLanguage();

  const getInitialPosition = () => {
    const rtlMultiplier = isRTL ? -1 : 1;
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 };
      case 'down':
        return { y: -distance, x: 0 };
      case 'left':
        return { y: 0, x: distance * rtlMultiplier };
      case 'right':
        return { y: 0, x: -distance * rtlMultiplier };
      default:
        return { y: distance, x: 0 };
    }
  };

  const initial = getInitialPosition();

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...initial,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration,
        delay,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
