// PageSwitching.jsx

import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';

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

const textVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const loadingMessages = ["Loading_text#1", "Loading_text#2", "Loading_text#3"];

const PageSwitching = ({ isLoading = false }) => {
  const [currentText, setCurrentText] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % loadingMessages.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
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

          {/* Centered content */}
          <div className="relative flex flex-col items-center space-y-6 z-10">
            {/* Morphing blob */}
            <motion.div
              className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-500"
              variants={blobVariants}
              animate="animate"
            />

            {/* Rotating loading text */}
            <div className="h-6 text-white text-lg font-medium overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentText}
                  variants={textVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.5 }}
                >
                  {loadingMessages[currentText]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageSwitching;
