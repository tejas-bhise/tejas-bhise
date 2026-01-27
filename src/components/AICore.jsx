import React from 'react';
import { motion } from 'framer-motion';

const AICore = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Simple animated circles - minimal and professional */}
      <div className="relative w-[400px] h-[400px]">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 m-auto border-2 rounded-full"
            style={{
              width: `${150 + i * 70}px`,
              height: `${150 + i * 70}px`,
              borderColor: `rgba(99, 102, 241, ${0.15 - i * 0.03})`,
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 20 + i * 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
        
        {/* Center dot */}
        <div className="absolute inset-0 m-auto w-4 h-4 bg-indigo-600 rounded-full" />
        
        {/* Orbiting dots */}
        {[0, 120, 240].map((angle, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 m-auto w-3 h-3 bg-indigo-400 rounded-full"
            style={{
              transformOrigin: '0 0',
            }}
            animate={{
              rotate: [angle, angle + 360],
              x: [0, 150 * Math.cos((angle * Math.PI) / 180)],
              y: [0, 150 * Math.sin((angle * Math.PI) / 180)],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AICore;
