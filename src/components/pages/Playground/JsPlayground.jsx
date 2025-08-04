import Editor from "@monaco-editor/react";
import ReactDom from "react-dom";

const JsPlayground = () => {
    return (
        <div>
            <h1>JavaScript Playground</h1>
            <p>Write and test your JavaScript code here.</p>
            <Editor
                height="90vh"
                defaultLanguage="javascript"
                defaultValue="// Write your code here"
            />
        </div>
    );
}
export default JsPlayground;