import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Variants for the container of the dots
const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger the animation of child elements
      delayChildren: 0.2,   // Delay before child animations start
    },
  },
  exit: { opacity: 0, transition: { duration: 0.3 } }, // Quick fade out
};

// Variants for each individual dot
const dotVariants = {
  initial: { y: "0%", opacity: 0.5 },
  animate: {
    y: ["0%", "-50%", "0%"], // Move up and down
    opacity: [0.5, 1, 0.5],  // Fade in and out slightly
    transition: {
      duration: 1.2,        // Animation duration for one cycle
      repeat: Infinity,     // Loop indefinitely
      ease: "easeInOut",    // Smooth easing
      repeatDelay: 0.1,     // Small delay before repeating
    },
  },
};

/**
 * PageSwitching component displays a dynamic loading animation.
 * It's designed to be used when transitioning between pages.
 * The loading dots are white, and the background is a semi-transparent gray-900.
 *
 * @param {object} props - The component props.
 * @param {boolean} props.isVisible - Controls the visibility of the loading animation.
 */
const PageSwitching = ({ isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-gray-900 bg-opacity-90 flex items-center justify-center z-[9999]" // High z-index to ensure it's on top
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className="flex space-x-3">
            {/* Dot 1 */}
            <motion.span
              className="block w-4 h-4 rounded-full bg-white"
              variants={dotVariants}
            ></motion.span>
            {/* Dot 2 */}
            <motion.span
              className="block w-4 h-4 rounded-full bg-white"
              variants={dotVariants}
              transition={{ ...dotVariants.animate.transition, delay: 0.2 }} // Stagger delay for second dot
            ></motion.span>
            {/* Dot 3 */}
            <motion.span
              className="block w-4 h-4 rounded-full bg-white"
              variants={dotVariants}
              transition={{ ...dotVariants.animate.transition, delay: 0.4 }} // Stagger delay for third dot
            ></motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageSwitching;
