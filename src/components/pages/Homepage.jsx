import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FeatureCard = ({ title, description, imageUrl, buttonText, link, index, hoveredIndex, setHoveredIndex }) => {
    return (
        <div
            className="relative group block p-1 h-full w-full"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
        >
            <AnimatePresence>
                {hoveredIndex === index && (
                    <motion.span
                        className="absolute inset-0 h-full w-full bg-slate-800/[0.8] block rounded-2xl z-0"
                        layoutId="hoverBackground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { duration: 0.15 } }}
                        exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
                    />
                )}
            </AnimatePresence>

            <motion.div
                className="relative z-10 flex flex-col md:flex-row bg-slate-900/80 rounded-2xl shadow-xl border border-slate-800 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{ y: -3 }}
            >
                <div className="md:w-1/3 p-4 flex items-center justify-center">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="rounded-xl w-full h-40 md:h-48 object-cover"
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300x200/F0F0F0/333333?text=Image"; }}
                    />
                </div>
                <div className="p-6 flex flex-col justify-between md:w-2/3">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
                        <p className="text-slate-300 text-base leading-relaxed">{description}</p>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <a
                            href={link}
                            className="inline-flex items-center px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
                        >
                            {buttonText}
                            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const Homepage = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const features = [
        {
            title: "Comprehensive Courses",
            description: "Dive deep into various subjects with our expertly curated courses. Learn at your own pace and track your progress.",
            imageUrl: "https://placehold.co/600x400/D1FAE5/10B981?text=Courses",
            buttonText: "Explore Courses",
            link: "#"
        },
        {
            title: "Interactive Quizzes",
            description: "Test your knowledge with engaging quizzes. Reinforce your learning and identify areas for improvement.",
            imageUrl: "https://placehold.co/600x400/DBEAFE/3B82F6?text=Quizzes",
            buttonText: "Take a Quiz",
            link: "#"
        },
        {
            title: "AI-Powered Tools",
            description: "Leverage cutting-edge AI features to enhance your learning experience and boost productivity.",
            imageUrl: "https://placehold.co/600x400/E0E7FF/6366F1?text=AI+Tools",
            buttonText: "Discover AI",
            link: "#"
        },
        {
            title: "Community & Support",
            description: "Connect with a vibrant community of learners. Share insights, ask questions, and get support.",
            imageUrl: "https://placehold.co/600x400/FFE4E6/EF4444?text=Community",
            buttonText: "Join Community",
            link: "#"
        },
        {
            title: "Progress Tracking",
            description: "Monitor your learning journey with detailed progress reports and analytics to stay on track.",
            imageUrl: "https://placehold.co/600x400/FEE2E2/EF4444?text=Progress",
            buttonText: "View Progress",
            link: "#"
        },
        {
            title: "Personalized Learning",
            description: "Receive tailored recommendations and content based on your learning style and goals.",
            imageUrl: "https://placehold.co/600x400/E0F2F7/0EA5E9?text=Personalized",
            buttonText: "Start Personalizing",
            link: "#"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white font-inter py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Heading */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                >
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
                        Unlock Your Potential with <span className="text-blue-600">Lima</span>
                    </h1>
                    <p className="mt-4 text-xl text-gray-300">
                        Explore a world of knowledge and tools designed to elevate your skills.
                    </p>
                </motion.div>

                {/* White Lorem Ipsum Text */}
                <motion.p
                    className="text-center max-w-3xl mx-auto text-lg text-white mb-16 leading-relaxed text-justify"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </motion.p>

                {/* Cards Section with Hover Background Effect */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            index={index}
                            hoveredIndex={hoveredIndex}
                            setHoveredIndex={setHoveredIndex}
                            {...feature}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Homepage;
