import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  type?: 'letter' | 'word' | 'line';
}

export const AnimatedHeading = ({ 
  children, 
  className = '', 
  delay = 0,
  type = 'letter'
}: AnimatedTextProps) => {
  const text = typeof children === 'string' ? children : '';
  
  if (type === 'letter' && typeof children === 'string') {
    return (
      <motion.span
        className={`inline-block ${className}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {text.split('').map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={{
              hidden: { 
                opacity: 0, 
                y: 20,
                rotateX: -90,
              },
              visible: { 
                opacity: 1, 
                y: 0,
                rotateX: 0,
              },
            }}
            transition={{
              duration: 0.4,
              delay: delay + i * 0.03,
              ease: [0.215, 0.61, 0.355, 1],
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.span>
    );
  }

  if (type === 'word' && typeof children === 'string') {
    return (
      <motion.span
        className={`inline-block ${className}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {text.split(' ').map((word, i) => (
          <motion.span
            key={i}
            className="inline-block mr-[0.25em]"
            variants={{
              hidden: { 
                opacity: 0, 
                y: 30,
                filter: 'blur(10px)',
              },
              visible: { 
                opacity: 1, 
                y: 0,
                filter: 'blur(0px)',
              },
            }}
            transition={{
              duration: 0.5,
              delay: delay + i * 0.1,
              ease: [0.215, 0.61, 0.355, 1],
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.215, 0.61, 0.355, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedParagraph = ({ 
  children, 
  className = '', 
  delay = 0 
}: AnimatedTextProps) => {
  const text = typeof children === 'string' ? children : '';
  const lines = text.split('\n').filter(Boolean);

  if (lines.length > 1) {
    return (
      <motion.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-30px' }}
      >
        {lines.map((line, i) => (
          <motion.p
            key={i}
            variants={{
              hidden: { 
                opacity: 0, 
                x: -20,
              },
              visible: { 
                opacity: 1, 
                x: 0,
              },
            }}
            transition={{
              duration: 0.5,
              delay: delay + i * 0.15,
              ease: 'easeOut',
            }}
          >
            {line}
          </motion.p>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.p
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.p>
  );
};

interface AnimatedIconProps {
  children: ReactNode;
  className?: string;
  hoverScale?: number;
  glowOnHover?: boolean;
}

export const AnimatedIcon = ({ 
  children, 
  className = '',
  hoverScale = 1.1,
  glowOnHover = true,
}: AnimatedIconProps) => {
  return (
    <motion.div
      className={`inline-flex ${className}`}
      animate={{
        y: [0, -3, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      whileHover={{
        scale: hoverScale,
        filter: glowOnHover ? 'drop-shadow(0 0 12px hsl(217 91% 60% / 0.6))' : undefined,
      }}
    >
      {children}
    </motion.div>
  );
};

interface MagneticHoverProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export const MagneticHover = ({ 
  children, 
  className = '',
  strength = 0.3,
}: MagneticHoverProps) => {
  return (
    <motion.div
      className={`inline-block ${className}`}
      whileHover={{
        scale: 1.02,
      }}
      whileTap={{ scale: 0.98 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * strength;
        const y = (e.clientY - rect.top - rect.height / 2) * strength;
        e.currentTarget.style.transform = `translate(${x}px, ${y}px) scale(1.02)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translate(0, 0) scale(1)';
      }}
      style={{ transition: 'transform 0.2s ease-out' }}
    >
      {children}
    </motion.div>
  );
};

interface ScrollFadeProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
}

export const ScrollFade = ({ 
  children, 
  className = '',
  direction = 'up',
  delay = 0,
}: ScrollFadeProps) => {
  const directionMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
  };

  const { x, y } = directionMap[direction];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.215, 0.61, 0.355, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

interface GlowTextProps {
  children: ReactNode;
  className?: string;
}

export const GlowText = ({ children, className = '' }: GlowTextProps) => {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      whileHover={{
        textShadow: '0 0 20px hsl(217 91% 60% / 0.6), 0 0 40px hsl(217 91% 60% / 0.3)',
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.span>
  );
};
