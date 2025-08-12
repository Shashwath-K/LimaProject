import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CodeEditor from "./components/CodeEditor";
import Terminal from "./components/Terminal";
import Console from "./components/Console";

const languages = [
  { label: "JavaScript", value: "javascript", extension: "js" },
  { label: "React (JSX)", value: "jsx", extension: "jsx" },
  { label: "Java", value: "java", extension: "java" },
];

const JsPlayground = () => {
  const [lang, setLang] = useState("javascript");
  const [code, setCode] = useState("// Write your code here");
  const [panelType, setPanelType] = useState(null);
  const [output, setOutput] = useState("");

  const logsRef = useRef([]);

  useEffect(() => {
    const originalLog = console.log;

    console.log = (...args) => {
      logsRef.current.push(args.join(" "));
      originalLog(...args);
      setOutput(logsRef.current.join("\n"));
    };

    return () => {
      console.log = originalLog;
    };
  }, []);

  const handleRun = () => {
    setPanelType("terminal");
    logsRef.current = [];
    setOutput("");
    try {
      // eslint-disable-next-line no-eval
      const result = eval(code);
      if (result !== undefined) console.log(result);
    } catch (err) {
      console.log("Error:", err.message);
    }
  };

  const handleClear = () => {
    logsRef.current = [];
    setOutput("");
  };

  const handleSave = () => {
    const selectedLang = languages.find((l) => l.value === lang);
    const ext = selectedLang?.extension || "txt";
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `code.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
      {/* Top Toolbar */}
      <motion.div
        className="p-4 bg-white/80 backdrop-blur-md shadow-lg flex justify-center gap-4 items-center flex-wrap rounded-b-2xl"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80 }}
      >
        <select
          className="border border-gray-300 rounded-xl px-4 py-2 text-sm shadow-sm hover:shadow-md transition focus:ring-2 focus:ring-indigo-400 outline-none"
          value={lang}
          onChange={(e) => setLang(e.target.value)}
        >
          {languages.map((l) => (
            <option key={l.value} value={l.value}>
              {l.label}
            </option>
          ))}
        </select>

        <button
          className="px-4 py-2 rounded-xl bg-gray-300 text-gray-600 cursor-not-allowed"
          disabled
        >
          NULL
        </button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 rounded-xl bg-blue-500 text-white shadow hover:bg-blue-600 transition"
          onClick={handleRun}
        >
          Run Code
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 rounded-xl bg-green-600 text-white shadow hover:bg-green-700 transition"
          onClick={handleSave}
        >
          Save Code
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded-xl shadow transition ${
            panelType === "console"
              ? "bg-indigo-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() =>
            setPanelType(panelType === "console" ? null : "console")
          }
        >
          Show Console
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded-xl shadow transition ${
            panelType === "terminal"
              ? "bg-indigo-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() =>
            setPanelType(panelType === "terminal" ? null : "terminal")
          }
        >
          Show Terminal
        </motion.button>
      </motion.div>

      {/* Main Content */}
      <div className="flex flex-1 relative overflow-hidden">
        <CodeEditor
          code={code}
          onChange={setCode}
          language={lang}
          isShrunk={panelType !== null}
        />

        <AnimatePresence>
          {panelType === "console" && (
            <Console output={output} onClear={handleClear} />
          )}
          {panelType === "terminal" && (
            <Terminal output={output} onClear={handleClear} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default JsPlayground;
