import { motion } from 'framer-motion';
import { Music, Music2, Music3, Music4 } from 'lucide-react';

const FloatingParticles = () => {
  const particles = [
    { icon: Music, x: '10%', y: '20%', delay: 0, duration: 4 },
    { icon: Music2, x: '80%', y: '15%', delay: 1, duration: 5 },
    { icon: Music3, x: '20%', y: '70%', delay: 2, duration: 4.5 },
    { icon: Music4, x: '75%', y: '60%', delay: 0.5, duration: 5.5 },
    { icon: Music, x: '50%', y: '40%', delay: 1.5, duration: 4 },
    { icon: Music2, x: '30%', y: '85%', delay: 2.5, duration: 5 },
    { icon: Music3, x: '90%', y: '45%', delay: 0.8, duration: 4.8 },
    { icon: Music4, x: '5%', y: '50%', delay: 1.8, duration: 5.2 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, index) => {
        const Icon = particle.icon;
        return (
          <motion.div
            key={index}
            className="absolute"
            style={{ left: particle.x, top: particle.y }}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
            }}
          >
            <Icon className="w-6 h-6 text-primary/30" />
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingParticles;
