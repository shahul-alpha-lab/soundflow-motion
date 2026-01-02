import { motion, useInView, Variants } from 'framer-motion';
import { useRef, ReactNode, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface LineRevealProps {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  duration?: number;
  once?: boolean;
}

const LineReveal = ({
  children,
  className = '',
  delay = 0,
  staggerDelay = 0.15,
  duration = 0.7,
  once = true,
}: LineRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.3 });
  const { isRTL } = useLanguage();

  const lines = useMemo(() => children.split('\n').filter(line => line.trim()), [children]);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const lineVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      x: isRTL ? 20 : -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {lines.map((line, index) => (
        <motion.p
          key={index}
          variants={lineVariants}
          className="mb-2 last:mb-0"
        >
          {line}
        </motion.p>
      ))}
    </motion.div>
  );
};

export default LineReveal;
