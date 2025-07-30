import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0, y: -60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.2,
            duration: 0.8,
            ease: 'easeOut',
        },
    },
};

const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

const Heading = () => {
    return (
        <motion.div
            className="relative text-center mb-24 px-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Background gradient glow */}
            <div className="absolute inset-0 -z-10">
                <div className="w-full h-full bg-gradient-to-br from-blue-700/30 via-purple-700/20 to-transparent blur-3xl opacity-70" />
            </div>

            {/* Heading */}
            <motion.h1
                className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight"
                variants={childVariants}
            >
                Unlock Your <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Potential</span> with <span className="text-blue-500">Lima</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
                className="mt-6 text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
                variants={childVariants}
            >
                Discover a platform crafted to inspire, educate, and propel you forward in your personal and professional growth.
            </motion.p>

            {/* Call-to-action Button */}
            <motion.div variants={childVariants} className="mt-10">
                <button className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition">
                    Get Started
                </button>
            </motion.div>
        </motion.div>
    );
};

export default Heading;
