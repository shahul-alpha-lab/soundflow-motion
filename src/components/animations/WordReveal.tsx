import { motion, useInView, Variants } from 'framer-motion';
import { useRef, ReactNode, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface WordRevealProps {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  duration?: number;
  once?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

const WordReveal = ({
  children,
  className = '',
  delay = 0,
  staggerDelay = 0.08,
  duration = 0.6,
  once = true,
  as: Component = 'span',
}: WordRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.5 });
  const { isRTL } = useLanguage();

  const words = useMemo(() => children.split(' '), [children]);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      rotateX: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const MotionComponent = motion[Component] as typeof motion.span;

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={`inline-flex flex-wrap ${isRTL ? 'flex-row-reverse' : ''} ${className}`}
      style={{ perspective: 1000 }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className="inline-block mr-[0.3em] last:mr-0"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default WordReveal;
