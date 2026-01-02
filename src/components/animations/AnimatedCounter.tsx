import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';

interface AnimatedCounterProps {
  value: number;
  className?: string;
  duration?: number;
  delay?: number;
  suffix?: string;
  prefix?: string;
}

const AnimatedCounter = ({
  value,
  className = '',
  duration = 2,
  delay = 0,
  suffix = '',
  prefix = '',
}: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  const springValue = useSpring(0, {
    damping: 50,
    stiffness: 100,
    duration: duration * 1000,
  });

  const displayValue = useTransform(springValue, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        springValue.set(value);
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [isInView, value, springValue, delay]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
