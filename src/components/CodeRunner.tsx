import React, { useState, useRef, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

export default function CodeRunner({ initialCode }: { initialCode: string }) {
  const [code, setCode] = useState(initialCode);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "log") {
        setConsoleLogs((prev) => [...prev, event.data.message]);
      } else if (event.data?.type === "error") {
        setConsoleLogs((prev) => [...prev, `Error: ${event.data.message}`]);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const runCode = () => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.srcdoc = `
        <!DOCTYPE html>
        <html><body>
        <script>
          const logs = [];
          const originalLog = console.log;
          console.log = function(...args) {
            logs.push(args.join(' '));
            window.parent.postMessage({ type: 'log', message: args.join(' ') }, '*');
            originalLog.apply(console, args);
          };
          try {
            ${code} // 用户输入的代码
          } catch (e) {
            window.parent.postMessage({ type: 'error', message: e.message }, '*');
          }
        <\/script>
        </body></html>
      `;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <CodeMirror
        value={code}
        height="200px"
        extensions={[javascript()]}
        onChange={(val) => setCode(val)}
      />
      <button
        onClick={runCode}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        运行代码
      </button>
      <div className="w-full h-60 border rounded overflow-auto">
        {consoleLogs.map((log, index) => (
          <div key={index} className="p-2 not-last-of-type:border-b">
            {log}
          </div>
        ))}
      </div>
      <iframe ref={iframeRef} sandbox="allow-scripts" className="hidden" />
    </div>
  );
}
