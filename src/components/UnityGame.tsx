"use client";

import { useEffect, useRef, useState } from "react";

interface UnityGameProps {
  simulationPath?: string;
}

export default function UnityGame({
  simulationPath = "Pathfinding",
}: UnityGameProps) {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    const script = document.createElement("script");
    script.src = `/simulations/${simulationPath}/Build/${simulationPath}.loader.js`;
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [simulationPath]);

  if (!isMounted) return null;

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        background: "#111",
        overflow: "hidden",
      }}
    >
      <iframe
        src={`/simulations/${simulationPath}/index.html`}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          display: "block",
          background: "#111",
        }}
        allowFullScreen
        scrolling="no"
      />
    </div>
  );
}
