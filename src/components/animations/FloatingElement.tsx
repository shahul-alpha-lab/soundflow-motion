import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, ReactNode, useEffect, useState, MouseEvent } from 'react';

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  frequency?: number;
  followMouse?: boolean;
  mouseStrength?: number;
}

const FloatingElement = ({
  children,
  className = '',
  amplitude = 20,
  frequency = 4,
  followMouse = false,
  mouseStrength = 0.1,
}: FloatingElementProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [randomOffset] = useState(() => Math.random() * Math.PI * 2);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 50, stiffness: 100 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (!followMouse) return;

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      mouseX.set((e.clientX - centerX) * mouseStrength);
      mouseY.set((e.clientY - centerY) * mouseStrength);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [followMouse, mouseStrength, mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      style={{
        x: followMouse ? springX : 0,
        y: followMouse ? springY : 0,
      }}
      animate={{
        y: [0, -amplitude, 0],
        rotate: [-2, 2, -2],
      }}
      transition={{
        y: {
          duration: frequency,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: randomOffset,
        },
        rotate: {
          duration: frequency * 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: randomOffset,
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FloatingElement;
