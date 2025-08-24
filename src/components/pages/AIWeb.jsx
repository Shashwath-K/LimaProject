import React from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkedAlt,
  FaBookOpen,
  FaFilePdf,
  FaUserSecret,
  FaPenNib,
} from "react-icons/fa";

// 🔹 AI Website Data (icons mapped here)
const aiWebsites = [
  {
    name: "Mapify",
    icon: FaMapMarkedAlt,
    description:
      "Mapify transforms your raw data into interactive, AI-powered maps for research, planning, and analytics.",
  },
  {
    name: "NoteBookLM",
    icon: FaBookOpen,
    description:
      "NotebookLM is your AI-powered research assistant by Google, helping summarize, link, and organize knowledge.",
  },
  {
    name: "PDF Drive",
    icon: FaFilePdf,
    description:
      "PDF Drive provides free access to millions of eBooks, research papers, and articles in downloadable PDF format.",
  },
  {
    name: "Undetectable AI",
    icon: FaUserSecret,
    description:
      "Undetectable AI rewrites AI-generated text to bypass plagiarism detectors, keeping your writing original and human-like.",
  },
  {
    name: "Writefull",
    icon: FaPenNib,
    description:
      "Writefull is an AI tool for academic writing, offering real-time feedback, grammar corrections, and phrasing improvements.",
  },
];

// 🔹 Card Component (based on MenuCard style)
const AIWebsiteCard = ({ title, description, Icon, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    className="group bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950/90 
               border border-gray-700 rounded-3xl p-6 text-center cursor-pointer 
               shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 
               transform hover:-translate-y-2 hover:scale-[1.02] backdrop-blur-lg"
  >
    <div className="flex justify-center mb-4">
      <div
        className="bg-gray-700 group-hover:bg-cyan-600/20 p-5 rounded-full 
                   transition-all ring-2 ring-cyan-500/30 group-hover:ring-cyan-400"
      >
        <Icon className="text-cyan-400 text-4xl group-hover:scale-110 transition-transform duration-300" />
      </div>
    </div>
    <h3 className="text-2xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
      {title}
    </h3>
    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
      {description}
    </p>
  </motion.div>
);

// 🔹 Page Component
export function AIWeb() {
  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 px-4 sm:px-6 lg:px-8 pt-28 pb-32 overflow-x-hidden">
      <div className="w-full max-w-6xl mx-auto text-center">
        <motion.h1
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold text-white mb-6 drop-shadow-sm bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
        >
          🚀 Productive AI Websites
        </motion.h1>

        <p className="text-gray-400 mb-14 text-lg tracking-wide max-w-3xl mx-auto">
          Discover powerful AI-driven tools to enhance your workflow, research, and productivity.
        </p>

        {/* Website Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-2 sm:px-0">
          {aiWebsites.map((site, index) => (
            <AIWebsiteCard
              key={index}
              title={site.name}
              description={site.description}
              Icon={site.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default AIWeb;
