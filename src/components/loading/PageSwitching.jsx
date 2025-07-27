// PageSwitching.jsx

import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

const overlayVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const blobVariants = {
  animate: {
    scale: [1, 1.1, 1],
    borderRadius: [
      "30% 70% 70% 30% / 30% 30% 70% 70%",
      "50% 50% 50% 50% / 50% 50% 50% 50%",
      "30% 70% 70% 30% / 30% 30% 70% 70%",
    ],
    rotate: [0, 180, 360],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const glowVariants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.6, 0.3, 0.6],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const PageSwitching = ({ isLoading = false }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
          variants={overlayVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Glow background */}
          <motion.div
            className="absolute w-72 h-72 rounded-full bg-purple-600 blur-3xl opacity-50"
            variants={glowVariants}
            animate="animate"
          />

          {/* Morphing blob */}
          <motion.div
            className="relative w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-500"
            variants={blobVariants}
            animate="animate"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageSwitching;
