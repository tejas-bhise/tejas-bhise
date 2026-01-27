import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Interactive3DCard = () => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div 
      className="w-full h-full flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="relative w-[400px] h-[500px]"
        style={{
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateX: rotate.x,
          rotateY: rotate.y,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        {/* Main Card */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl shadow-2xl p-8 flex flex-col justify-between"
          style={{ transform: 'translateZ(50px)' }}
        >
          <div>
            <div className="text-white/80 text-sm font-mono mb-4">// portfolio.py</div>
            <h3 className="text-3xl font-bold text-white mb-2">Python Engineer</h3>
            <p className="text-white/90 text-sm">Backend & AI Systems</p>
          </div>
          
          <div className="space-y-2 font-mono text-sm">
            <div className="text-green-300">import fastapi</div>
            <div className="text-blue-300">import openai</div>
            <div className="text-purple-300">from ai import LLM</div>
          </div>

          <div className="flex gap-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
        </div>

        {/* Shadow layer */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl blur-xl opacity-50"
          style={{ transform: 'translateZ(-50px)' }}
        ></div>

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      {/* Instruction */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-6 py-2 rounded-full border border-gray-200 shadow-lg">
        <p className="text-sm text-gray-700 font-medium">Move your mouse over the card ✨</p>
      </div>
    </div>
  );
};

export default Interactive3DCard;
