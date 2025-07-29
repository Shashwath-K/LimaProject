import { motion } from 'framer-motion';

const Heading = () => {
    return (
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
    );
};

export default Heading;
