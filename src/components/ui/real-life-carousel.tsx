"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const examples = [
  {
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    title: "Sosyal Medya Analizi",
    desc: "Kullanıcı davranışlarını analiz etmek için grafik algoritmaları kullanılır.",
    badge: "Sosyal Medya",
  },
  {
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    title: "Finansal Ağlar",
    desc: "Finansal işlemlerde en kısa yol ve bağlantı analizi için grafik algoritmaları kullanılır.",
    badge: "Finans",
  },
  {
    image:
      "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80",
    title: "Oyun Geliştirme",
    desc: "Oyun haritalarında yol bulma ve karakter hareketleri için algoritmalar kullanılır.",
    badge: "Oyun",
  },
];

export const RealLifeCarousel = () => {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  const prev = () => setIndex((i) => (i === 0 ? examples.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === examples.length - 1 ? 0 : i + 1));

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="flex justify-between mb-2">
        <button
          onClick={prev}
          className="px-3 py-1 rounded-lg bg-cyan-700 text-white font-semibold hover:bg-cyan-800 transition"
        >
          Önceki
        </button>
        <button
          onClick={next}
          className="px-3 py-1 rounded-lg bg-cyan-700 text-white font-semibold hover:bg-cyan-800 transition"
        >
          Sonraki
        </button>
      </div>
      <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 w-full h-full"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <img
              src={examples[index].image}
              alt={examples[index].title}
              className={`w-full h-full object-cover transition duration-300 ${
                hovered ? "blur-md scale-105" : ""
              }`}
            />
            {/* Badge on hover */}
            {hovered && (
              <div className="absolute top-4 left-4 bg-cyan-700/80 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg z-10 animate-fade-in">
                {examples[index].badge}
              </div>
            )}
            {/* Card content always visible */}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#181f32]/90 to-transparent p-5">
              <h3 className="text-xl font-bold text-cyan-100 mb-1 drop-shadow">
                {examples[index].title}
              </h3>
              <p className="text-blue-100 text-sm drop-shadow">
                {examples[index].desc}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
