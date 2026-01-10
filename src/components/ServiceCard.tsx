import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useState } from 'react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

const ServiceCard = ({ icon: Icon, title, description, index }: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Different floating offsets for each card - creates rhythmic feel
  const floatDuration = 3 + index * 0.5;
  const floatDelay = index * 0.4;

  return (
    <motion.div
      // Continuous gentle floating animation - visible immediately
      animate={{
        y: [0, -4, 0],
      }}
      transition={{
        duration: floatDuration,
        repeat: Infinity,
        ease: [0.4, 0, 0.2, 1],
        delay: floatDelay,
      }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Ambient glow behind card - subtle breathing effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          opacity: [0.02, 0.05, 0.02],
          scale: [0.98, 1.02, 0.98],
        }}
        transition={{
          duration: 4 + index * 0.3,
          repeat: Infinity,
          ease: [0.4, 0, 0.2, 1],
          delay: index * 0.2,
        }}
      >
        <div className="absolute inset-0 rounded-2xl bg-primary/10 blur-xl" />
      </motion.div>

      {/* Musical Ripple Effect on Hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isHovered ? { scale: 1.1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="absolute inset-0 rounded-2xl bg-primary/5 blur-xl" />
        {/* Ripple circles */}
        {isHovered && (
          <>
            <motion.div
              className="absolute inset-0 rounded-2xl border border-primary/10"
              initial={{ scale: 0.9, opacity: 0.5 }}
              animate={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
            />
            <motion.div
              className="absolute inset-0 rounded-2xl border border-primary/10"
              initial={{ scale: 0.9, opacity: 0.5 }}
              animate={{ scale: 1.3, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
            />
          </>
        )}
      </motion.div>

      <div className="glass-card p-8 h-full transition-all duration-500 group-hover:shadow-glow relative overflow-hidden">
        {/* Gradient Border on Hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl bg-primary/20" />
        
        {/* Subtle glow intensification on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-primary/0 transition-colors duration-300"
          animate={isHovered ? { backgroundColor: 'hsl(var(--primary) / 0.03)' } : { backgroundColor: 'hsl(var(--primary) / 0)' }}
        />

        {/* Waveform line behind content - ambient animation */}
        <motion.div
          className="absolute inset-x-0 top-1/2 h-px opacity-[0.06] -z-0"
          style={{
            background: 'linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)',
          }}
          animate={{
            scaleX: [0.8, 1, 0.8],
            opacity: [0.03, 0.08, 0.03],
          }}
          transition={{
            duration: 3 + index * 0.5,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
            delay: index * 0.3,
          }}
        />
        
        {/* Icon with continuous pulse animation */}
        <motion.div
          className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors relative z-10"
          animate={{
            scale: [1, 1.03, 1],
            boxShadow: [
              '0 0 0 0 hsl(var(--primary) / 0)',
              '0 0 15px 2px hsl(var(--primary) / 0.08)',
              '0 0 0 0 hsl(var(--primary) / 0)',
            ],
          }}
          transition={{
            duration: 2.5 + index * 0.3,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
            delay: index * 0.4,
          }}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2 + index * 0.2,
              repeat: Infinity,
              ease: [0.4, 0, 0.2, 1],
              delay: index * 0.3,
            }}
          >
            <Icon className="w-7 h-7 text-primary" />
          </motion.div>
          
          {/* Subtle ambient dot particles near icon */}
          <motion.span
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            style={{ top: '20%', right: '15%' }}
            animate={{
              scale: [0.5, 1, 0.5],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: [0.4, 0, 0.2, 1],
              delay: index * 0.2,
            }}
          />
          <motion.span
            className="absolute w-0.5 h-0.5 rounded-full bg-primary/20"
            style={{ bottom: '25%', left: '10%' }}
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.15, 0.4, 0.15],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: [0.4, 0, 0.2, 1],
              delay: index * 0.3 + 0.5,
            }}
          />
          
          {/* Glow trail effect on hover */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.3, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 1, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
              style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)' }}
            />
          )}
        </motion.div>

        {/* Content */}
        <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors relative z-10">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed relative z-10">
          {description}
        </p>

        {/* Hover Indicator with continuous subtle animation */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-primary/30 rounded-b-2xl"
          animate={{
            scaleX: isHovered ? 1 : [0.3, 0.5, 0.3],
            opacity: isHovered ? 1 : [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: isHovered ? 0.3 : 3,
            repeat: isHovered ? 0 : Infinity,
            ease: [0.4, 0, 0.2, 1],
          }}
          style={{ transformOrigin: 'left' }}
        />
      </div>
    </motion.div>
  );
};

export default ServiceCard;
