import React from "react";
import { motion } from "framer-motion";

const Console = ({ output, onClear }) => {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 text-white z-10"
      style={{ width: "40%", height: "100%", display: "flex", flexDirection: "column" }}
    >
      {/* Nav-like header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700 bg-gray-800">
        <h2 className="text-sm font-medium text-gray-300">Console</h2>
        <button
          className="text-xs text-red-400 hover:text-red-200 border border-red-400 px-2 py-0.5 rounded"
          onClick={onClear}
        >
          Clear
        </button>
      </div>

      {/* Output body */}
      <div className="p-4 overflow-auto flex-1">
        <pre className="whitespace-pre-wrap text-sm text-gray-200">
          {output || "No output yet."}
        </pre>
      </div>
    </motion.div>
  );
};

export default Console;
