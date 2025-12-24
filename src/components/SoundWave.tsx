import { motion } from 'framer-motion';

interface SoundWaveProps {
  className?: string;
  barCount?: number;
}

const SoundWave = ({ className = '', barCount = 40 }: SoundWaveProps) => {
  return (
    <div className={`flex items-center justify-center gap-1 ${className}`}>
      {Array.from({ length: barCount }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-primary/20 rounded-full"
          initial={{ height: 4 }}
          animate={{
            height: [4, Math.random() * 40 + 10, 4],
          }}
          transition={{
            duration: 1 + Math.random() * 0.5,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: i * 0.05,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export default SoundWave;
