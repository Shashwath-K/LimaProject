import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
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
    <div className="flex flex-col h-screen w-screen bg-gray-100 overflow-hidden">
      <div className="p-4 bg-white shadow-md flex justify-center gap-4 items-center flex-wrap">
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
          className="px-4 py-1 rounded bg-green-600 text-white"
          onClick={handleSave}
        >
          Save Code
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
