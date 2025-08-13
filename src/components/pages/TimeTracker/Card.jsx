// src/components/Card.jsx
import React from "react";
import { motion } from "framer-motion";

const Card = ({ title, icon, onClick }) => (
    <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white/20 cursor-pointer flex flex-col items-center justify-center transition"
    >
        {icon}
        <p className="mt-4 text-white text-lg font-semibold">{title}</p>
    </motion.div>
);

export default Card;
