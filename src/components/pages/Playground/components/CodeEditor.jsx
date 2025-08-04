import React from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ code, onChange, language, isShrunk }) => {
  return (
    <div
      className="bg-white"
      style={{
        height: "100%",
        width: isShrunk ? "60%" : "100%",
        transition: "width 0.5s ease",
      }}
    >
      <Editor
        height="100%"
        width="100%"
        language={language}
        theme="vs-dark"
        value={code}
        onChange={(value) => onChange(value || "")}
      />
    </div>
  );
};

export default CodeEditor;
