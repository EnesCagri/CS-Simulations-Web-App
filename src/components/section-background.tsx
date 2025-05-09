import React from "react";

export function SectionBackground({
  children,
  showGrid = true,
}: {
  children: React.ReactNode;
  showGrid?: boolean;
}) {
  return (
    <div className="relative w-full py-20 overflow-hidden bg-[#2551b6]">
      {showGrid && (
        <>
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none select-none" />
          {/* Radial gradient overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(125%_125%_at_50%_45%,rgba(55,55,79,0.3)_40%,rgba(15,23,42,1)_95%)] pointer-events-none select-none" />
        </>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
