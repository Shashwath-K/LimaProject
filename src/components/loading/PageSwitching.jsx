// PageSwitching.jsx

import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

const overlayVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const barVariants = {
  initial: { scaleX: 0 },
  animate: {
    scaleX: 1,
    transition: {
      duration: 1,
      ease: [0.4, 0, 0.2, 1],
      repeat: Infinity,
      repeatType: "mirror",
    },
  },
};

const PageSwitching = ({ isLoading = false }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center"
          variants={overlayVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.div className="flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-16 bg-white rounded-full origin-bottom"
                variants={barVariants}
                initial="initial"
                animate="animate"
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageSwitching;
