// components/pages/Homepage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const mainContentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: 'easeOut', delay: 0.5 },
  },
};

const Homepage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');

    if (!hasVisited) {
      sessionStorage.setItem('hasVisited', 'true');
      navigate('/welcome'); // Redirect to welcome screen
    } else {
      setIsVisible(true); // Show content directly if user already visited
    }
  }, [navigate]);

  return (
    <motion.div
      className="w-full h-full flex items-center justify-center p-8 min-h-screen bg-gray-900 text-white font-inter"
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
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
  );
};

export default Homepage;
