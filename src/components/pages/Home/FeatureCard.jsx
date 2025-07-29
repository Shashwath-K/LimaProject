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
                    <motion.div
                        className="absolute inset-0 h-full w-full bg-slate-800/[0.8] block rounded-2xl z-0"
                        layoutId="hoverBackground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.2, delay: 0.2 } }}
                    />
                )}
            </AnimatePresence>

            <motion.div
                className="relative z-10 flex flex-col md:flex-row bg-slate-900/80 rounded-2xl shadow-xl border border-slate-800 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.03]"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{ scale: 1.02, y: -3 }}
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
                    <h3 className="text-2xl font-semibold text-white mb-2">{title}</h3>
                    <p className="text-slate-300 text-base leading-relaxed">{description}</p>
                    <a
                        href={link}
                        className="inline-flex items-center mt-4 px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
                    >
                        {buttonText}
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                    </a>
                </div>
            </motion.div>
        </div>
    );
};

export default FeatureCard;
