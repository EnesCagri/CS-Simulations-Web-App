"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const RealLifeExamplesGrid = ({
  data,
}: {
  data: { image: string; title: string; desc: string; badge: string }[];
}) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 gap-6 ">
      {data.map((ex, i) => (
        <div
          key={i}
          className="relative rounded-2xl overflow-hidden bg-cyan-900/40 border border-cyan-800 shadow-lg group cursor-pointer"
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
        >
          <img
            src={ex.image}
            alt={ex.title}
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-bold text-cyan-100 mb-1">{ex.title}</h3>
            <span className="inline-block bg-cyan-700/80 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
              {ex.badge}
            </span>
          </div>
          <AnimatePresence>
            {hovered === i && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md z-20"
              >
                <div className="p-6 bg-cyan-900/90 rounded-2xl shadow-2xl max-w-xs text-center">
                  <h4 className="text-cyan-200 text-lg font-bold mb-2">
                    {ex.title}
                  </h4>
                  <p className="text-blue-100 text-sm mb-2">{ex.desc}</p>
                  <span className="inline-block bg-cyan-700/80 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                    {ex.badge}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};
