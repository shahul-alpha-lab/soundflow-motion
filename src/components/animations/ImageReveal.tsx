import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
}

const ImageReveal = ({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  direction = 'left',
}: ImageRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { isRTL } = useLanguage();

  const getClipPath = () => {
    const rtlDirection = isRTL && (direction === 'left' || direction === 'right')
      ? direction === 'left' ? 'right' : 'left'
      : direction;

    switch (rtlDirection) {
      case 'left':
        return {
          initial: 'inset(0 100% 0 0)',
          animate: 'inset(0 0% 0 0)',
        };
      case 'right':
        return {
          initial: 'inset(0 0 0 100%)',
          animate: 'inset(0 0 0 0%)',
        };
      case 'up':
        return {
          initial: 'inset(100% 0 0 0)',
          animate: 'inset(0% 0 0 0)',
        };
      case 'down':
        return {
          initial: 'inset(0 0 100% 0)',
          animate: 'inset(0 0 0% 0)',
        };
      default:
        return {
          initial: 'inset(0 100% 0 0)',
          animate: 'inset(0 0% 0 0)',
        };
    }
  };

  const clipPath = getClipPath();

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      initial={{ clipPath: clipPath.initial, scale: 1.1 }}
      animate={isInView ? { clipPath: clipPath.animate, scale: 1 } : {}}
      transition={{
        clipPath: { duration, delay, ease: [0.4, 0, 0.2, 1] },
        scale: { duration: duration * 1.5, delay, ease: [0.4, 0, 0.2, 1] },
      }}
    >
      {children}
    </motion.div>
  );
};

export default ImageReveal;
