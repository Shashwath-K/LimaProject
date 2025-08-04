import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { motion, AnimatePresence } from "framer-motion";

const languages = [
  { label: "JavaScript", value: "javascript" },
  { label: "React (JSX)", value: "jsx" },
  { label: "Java", value: "java" },
];

const JsPlayground = () => {
  const [lang, setLang] = useState("javascript");
  const [code, setCode] = useState("// console.log('Hello, World!');\n\nfunction greet() {\n  console.log('Welcome to the JS Playground!');\n}\n\ngreet();");
  const [panelType, setPanelType] = useState(null); // 'console' | 'terminal' | null
  const [output, setOutput] = useState("");

  // capture console.log output
  useEffect(() => {
    const originalLog = console.log;
    const logs = [];
    console.log = (...args) => {
      logs.push(args.join(" "));
      originalLog(...args);
      setOutput(logs.join("\n"));
    };

    return () => {
      console.log = originalLog;
    };
  }, []);

  const handleRun = () => {
    setPanelType("terminal");
    setOutput("");
    try {
      // eslint-disable-next-line no-eval
      const result = eval(code);
      if (result !== undefined) console.log(result);
    } catch (err) {
      console.log("Error:", err.message);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-100 overflow-hidden">
      {/* Toolbar */}
      <div className="p-4 bg-white shadow-md flex justify-center gap-6 items-center">
        <select
          className="border rounded px-3 py-1"
          value={lang}
          onChange={(e) => setLang(e.target.value)}
        >
          {languages.map((l) => (
            <option key={l.value} value={l.value}>
              {l.label}
            </option>
          ))}
        </select>

        <button className="px-4 py-1 rounded bg-gray-300 text-gray-600 cursor-not-allowed" disabled>
          NULL
        </button>

        <button
          className="px-4 py-1 rounded bg-blue-500 text-white"
          onClick={handleRun}
        >
          Run Code
        </button>

        <button
          className={`px-4 py-1 rounded ${
            panelType === "console" ? "bg-indigo-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setPanelType(panelType === "console" ? null : "console")}
        >
          Show Console
        </button>

        <button
          className={`px-4 py-1 rounded ${
            panelType === "terminal" ? "bg-indigo-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setPanelType(panelType === "terminal" ? null : "terminal")}
        >
          Show Terminal
        </button>
      </div>

      {/* Editor & Panel Section */}
      <div className="flex flex-1 relative overflow-hidden">
        {/* Code Editor */}
        <motion.div
          className="bg-white"
          animate={{ width: panelType ? "60%" : "100%" }}
          transition={{ duration: 0.5 }}
          style={{ height: "100%" }}
        >
          <Editor
            height="100%"
            width="100%"
            language={lang}
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || "")}
          />
        </motion.div>

        {/* Side Panel (Console or Terminal) */}
        <AnimatePresence>
          {panelType && (
            <motion.div
              key={panelType}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5 }}
              className={`bg-gray-900 text-white p-4 overflow-auto z-10`}
              style={{ width: "40%", height: "100%" }}
            >
              <h2 className="text-lg font-semibold mb-2">
                {panelType === "console" ? "Console" : "Terminal"}
              </h2>
              <pre className="whitespace-pre-wrap">{output || "No output yet."}</pre>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default JsPlayground;
