import React, { useState } from "react";
import { CodeBlock } from "@/components/ui/code-block";

interface CodeTabsProps {
  tabs: {
    label: string;
    language: string;
    code: string;
  }[];
}

export const CodeTabs: React.FC<CodeTabsProps> = ({ tabs }) => {
  const [active, setActive] = useState(0);

  return (
    <div className="w-full">
      <div className="flex space-x-2 mb-2">
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            onClick={() => setActive(idx)}
            className={`px-4 py-1 rounded-t-lg font-medium transition-colors text-sm
              ${
                active === idx
                  ? "bg-cyan-700 text-white"
                  : "bg-white/10 text-cyan-200 hover:bg-cyan-800/40"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="rounded-b-xl rounded-tr-xl overflow-hidden shadow bg-[#181f32] border border-white/10">
        <CodeBlock language={tabs[active].language}>
          {tabs[active].code}
        </CodeBlock>
      </div>
    </div>
  );
};
