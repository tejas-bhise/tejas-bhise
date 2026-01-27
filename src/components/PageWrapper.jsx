import React from 'react';
import { motion } from 'framer-motion';

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    className="pt-32 pb-20"
  >
    {children}
  </motion.div>
);

export default PageWrapper;
