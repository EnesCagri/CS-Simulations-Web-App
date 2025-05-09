import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  children: string;
  language: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ children, language }) => {
  return (
    <div className="rounded-lg overflow-hidden">
      <SyntaxHighlighter
        language={language}
        style={darcula}
        customStyle={{
          margin: 0,
          borderRadius: "0.75rem",
          background: "#282a36",
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};
