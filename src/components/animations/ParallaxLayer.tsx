import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ParallaxLayerProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down';
}

const ParallaxLayer = ({
  children,
  className = '',
  speed = 0.5,
  direction = 'up',
}: ParallaxLayerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const multiplier = direction === 'up' ? -1 : 1;
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed * multiplier, -100 * speed * multiplier]);
  const springY = useSpring(y, { damping: 30, stiffness: 100 });

  return (
    <motion.div
      ref={ref}
      style={{ y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxLayer;
