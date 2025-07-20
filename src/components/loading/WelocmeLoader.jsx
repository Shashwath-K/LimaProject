import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const logo = "/assets/min-logo/lima-logo-minimal-wh.png";
const loader = "/assets/load/load.gif";

const WelcomeLoader = () => {
  const navigate = useNavigate();
  const [startZoom, setStartZoom] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const loaderRef = useRef(null);
  const [splashPosition, setSplashPosition] = useState({ x: "50%", y: "50%" });

  useEffect(() => {
    // Start zoom and splash after 4s
    const zoomTimer = setTimeout(() => {
      setStartZoom(true);

      // Get splash origin from loader position
      if (loaderRef.current) {
        const rect = loaderRef.current.getBoundingClientRect();
        setSplashPosition({
          x: `${rect.left + rect.width / 2}px`,
          y: `${rect.top + rect.height / 2}px`,
        });
      }

      // Trigger splash effect
      setShowSplash(true);

      // Navigate after splash ends
      setTimeout(() => {
        navigate("/");
      }, 500);
    }, 5000);

    return () => clearTimeout(zoomTimer);
  }, [navigate]);

  return (
    <motion.div
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 overflow-hidden font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Logo */}
      <motion.img
        src={logo}
        alt="Project Lima Logo"
        className="mb-10"
        style={{ width: 384 }} // 3x size
        animate={startZoom ? { scale: 5, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      />

      {/* Loader (larger) */}
      {!startZoom && (
        <motion.img
          ref={loaderRef}
          src={loader}
          alt="Loading animation"
          className="w-14 h-14 mb-9" // increased size
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        />
      )}

      {/* Text */}
      {!startZoom && (
        <motion.p
          className="text-white text-sm opacity-70 tracking-wider"
          style={{ fontFamily: "Segoe UI, sans-serif" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          Preparing your experience.
        </motion.p>
      )}

      {/* Splash from loader location */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash"
            initial={{ opacity: 1, scale: 0 }}
            animate={{ scale: 30, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
              position: "fixed",
              top: splashPosition.y,
              left: splashPosition.x,
              width: 100,
              height: 100,
              backgroundColor: "white",
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 60,
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default WelcomeLoader;
