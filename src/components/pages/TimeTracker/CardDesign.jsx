// src/components/CardDesign.jsx
import React from "react";

const CardDesign = ({ title, icon: Icon, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="flex flex-col items-center justify-center p-8 rounded-3xl shadow-lg cursor-pointer transition transform hover:scale-105 
            bg-gradient-to-br from-purple-500/40 via-indigo-500/30 to-blue-500/40 border border-white/20 backdrop-blur-md"
        >
            <Icon className="text-white text-4xl mb-4" />
            <h3 className="text-white font-bold text-lg">{title}</h3>
        </div>
    );
};

export default CardDesign;
