import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = "", hover = true }) => (
  <motion.div
    whileHover={hover ? { y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" } : {}}
    className={`bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 transition-all shadow-sm ${className}`}
  >
    {children}
  </motion.div>
);

export default Card;
