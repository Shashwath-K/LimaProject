import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css'; // Import your Tailwind CSS styles

// Main App component that renders the LoadingScreen
const App = () => {
  // State to control the visibility of the loading screen
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // Check if the user has visited this session before
    const hasVisited = sessionStorage.getItem('hasVisited');

    if (hasVisited) {
      // If visited, hide the loading screen immediately
      setShowLoading(false);
    } else {
      // If not visited, show the loading screen and set a timeout to hide it
      // The timeout duration should match or exceed your animation duration
      const timer = setTimeout(() => {
        setShowLoading(false);
        // Mark that the user has visited for this session
        sessionStorage.setItem('hasVisited', 'true');
      }, 4000); // Adjust this duration (in milliseconds) to match your animation length

      // Cleanup the timer if the component unmounts
      return () => clearTimeout(timer);
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Variants for the main content's fade-in animation
  const mainContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut', delay: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-inter flex flex-col items-center justify-center relative overflow-hidden">
      {/* AnimatePresence allows components to animate out when they are removed from the React tree */}
      <AnimatePresence>
        {showLoading && <LoadingScreen />}
      </AnimatePresence>

      {/* Main content of your application */}
      <motion.div
        className="w-full h-full flex items-center justify-center p-8"
        initial="hidden"
        animate={!showLoading ? "visible" : "hidden"} // Animate in when loading is false
        variants={mainContentVariants}
      >
        <div className="text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          >
            Welcome to Our Awesome App!
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.7 }}
          >
            This is your main content, loaded after the intro.
          </motion.p>
          <motion.button
            className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
          >
            Get Started
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

// LoadingScreen component
const LoadingScreen = () => {
  // Variants for the typing effect
  const typingVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: {
        duration: 2,
        ease: "linear",
        delay: 0.5, // Start typing after a short delay
        type: "tween", // Use tween for smoother width animation
      },
    },
  };

  // Variants for the overall loading screen fade-out
  const loadingScreenVariants = {
    initial: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: 3.5 }, // Start fading out after 3.5s (total 4s)
    },
  };

  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-purple-800 to-indigo-900 flex flex-col items-center justify-center z-50"
      variants={loadingScreenVariants}
      initial="initial"
      exit="exit"
    >
      <div className="relative w-32 h-32 mb-8">
        {/* Simple spinning loader using Framer Motion */}
        <motion.div
          className="absolute inset-0 border-4 border-t-4 border-t-white border-gray-400 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
        ></motion.div>
        <motion.div
          className="absolute inset-4 border-4 border-b-4 border-b-blue-300 border-gray-600 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, ease: "linear", repeat: Infinity }}
        ></motion.div>
      </div>
      <div className="text-center">
        <motion.h2
          className="text-4xl md:text-6xl font-extrabold text-white mb-4 overflow-hidden whitespace-nowrap border-r-[.15em] border-r-white"
          variants={typingVariants}
          initial="hidden"
          animate="visible"
        >
          Loading...
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }} // Fade in after typing starts
        >
          Preparing your experience.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default App;
