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

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Musical Ripple Effect on Hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isHovered ? { scale: 1.1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute inset-0 rounded-2xl bg-primary/5 blur-xl" />
        {/* Ripple circles */}
        {isHovered && (
          <>
            <motion.div
              className="absolute inset-0 rounded-2xl border border-primary/10"
              initial={{ scale: 0.9, opacity: 0.5 }}
              animate={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 rounded-2xl border border-primary/10"
              initial={{ scale: 0.9, opacity: 0.5 }}
              animate={{ scale: 1.3, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2, repeat: Infinity }}
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
        
        {/* Icon with enhanced micro-animations */}
        <motion.div
          className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors relative z-10"
          whileHover={{ scale: 1.1, rotate: 5 }}
          animate={isHovered ? { 
            boxShadow: ['0 0 0 0 hsl(var(--primary) / 0.2)', '0 0 20px 5px hsl(var(--primary) / 0.1)', '0 0 0 0 hsl(var(--primary) / 0.2)'],
          } : {}}
          transition={isHovered ? { duration: 1.5, repeat: Infinity } : {}}
        >
          <motion.div
            animate={isHovered ? { 
              scale: [1, 1.1, 1],
            } : {}}
            transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0, repeatDelay: 0.5 }}
          >
            <Icon className="w-7 h-7 text-primary" />
          </motion.div>
          
          {/* Glow trail effect */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.3, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 1, repeat: Infinity }}
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

        {/* Hover Indicator */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-b-2xl"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

export default ServiceCard;
