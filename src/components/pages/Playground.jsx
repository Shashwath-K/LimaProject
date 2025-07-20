import React, {useState, useEffect} from "react";
import {motion,AnimatePresence, useAnimation} from "framer-motion";

const PlayGround = () => {
    // Framer Motion variants for the live drawing "noodle" lines
    const pathVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                duration: 2, // Duration for the drawing animation
                ease: "easeInOut",
                delay: 0.8 // Start drawing shortly after the screen appears
            }
        },
        exit: {
            pathLength: 0,
            opacity: 0,
            transition: {
                duration: 1.5, // Duration for retraction
                ease: "easeOut", // Smooth retraction
                delay: 6 // Start retracting before the main screen fades out
            }
        }
    };
    return(
        <div className="w-full h-full flex items-center justify-center p-8 min-h-screen bg-gray-900 text-white font-inter">
            <h1>Test Page</h1>
            
            {/* SVG for live drawing "noodle" lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                    {/* Gradient for the top-left noodle line */}
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8B5CF6" /> {/* Purple-500 */}
                        <stop offset="100%" stopColor="#3B82F6" /> {/* Blue-500 */}
                    </linearGradient>
                    {/* Gradient for the bottom-right noodle line */}
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" /> {/* Blue-500 */}
                        <stop offset="100%" stopColor="#8B5CF6" /> {/* Purple-500 */}
                    </linearGradient>
                </defs>

                {/* Top-left noodle line - Adjusted path to curve down towards center */}
                <motion.path
                    d="M0,0 C2000,250 350,400 500,500" // Path from top-left towards center
                    stroke="url(#gradient1)"
                    strokeWidth="2"
                    fill="none"
                    variants={pathVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit" // Apply exit animation for this path
                />

                {/* Bottom-right noodle line - Adjusted path to start from bottom-right and move up towards center */}
                <motion.path
                    d="M15300,2000 C850,750 650,600 500,500" // Path from bottom-right towards center
                    stroke="url(#gradient2)"
                    strokeWidth="2"
                    fill="none"
                    variants={pathVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit" // Apply exit animation for this path
                />
            </svg>
        </div>
    );
}
export default PlayGround;