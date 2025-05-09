"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import simulations from "@/db/simulations.json";
import Link from "next/link";

const allSimulations = simulations.simulations;
const topics = [
  "Tümü",
  ...Array.from(new Set(allSimulations.map((sim) => sim.topic))),
];
const difficulties = [
  "Tümü",
  ...Array.from(new Set(allSimulations.map((sim) => sim.difficulty))),
];

const sortOptions = [
  { label: "Konu", value: "topic-json" },
  { label: "Zorluk (Kolay → Zor)", value: "difficulty-asc" },
  { label: "Zorluk (Zor → Kolay)", value: "difficulty-desc" },
  { label: "İsim", value: "title-az" },
];
const difficultyOrder = { Kolay: 1, Orta: 2, Zor: 3 };

const Simulations = () => {
  const [search, setSearch] = useState("");
  const [topic, setTopic] = useState("Tümü");
  const [difficulty, setDifficulty] = useState("Tümü");
  const [sortBy, setSortBy] = useState("topic-json");
  const [simulations, setSimulations] = useState(allSimulations);

  let filtered = simulations.filter((sim) => {
    const matchesSearch = sim.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesTopic = topic === "Tümü" || sim.topic === topic;
    const matchesDifficulty =
      difficulty === "Tümü" || sim.difficulty === difficulty;
    return matchesSearch && matchesTopic && matchesDifficulty;
  });

  // Sıralama
  filtered = filtered.slice().sort((a, b) => {
    if (sortBy === "topic-json") {
      return topics.indexOf(a.topic) - topics.indexOf(b.topic);
    } else if (sortBy === "difficulty-asc") {
      return (
        (difficultyOrder[a.difficulty as keyof typeof difficultyOrder] || 0) -
        (difficultyOrder[b.difficulty as keyof typeof difficultyOrder] || 0)
      );
    } else if (sortBy === "difficulty-desc") {
      return (
        (difficultyOrder[b.difficulty as keyof typeof difficultyOrder] || 0) -
        (difficultyOrder[a.difficulty as keyof typeof difficultyOrder] || 0)
      );
    } else if (sortBy === "title-az") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-blue-900 py-12 px-4 relative overflow-hidden">
      {/* Grid Background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <svg
          width="100%"
          height="100%"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#0fb9b1"
                strokeWidth="0.5"
                opacity="0.63"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div className="max-w-7xl mx-auto mb-10 relative z-10">
        <h1 className="text-3xl mt-12 md:text-4xl font-bold text-white mb-8">
          Simülasyonlar
        </h1>
        {/* Sekmeler (Tabs) */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {topics.map((t) => (
            <button
              key={t}
              className={`px-7 py-2 rounded-full font-semibold text-base transition-all duration-200 border-2 shadow-sm ${
                t === topic
                  ? "bg-[#0fb9b1] text-white border-[#0fb9b1] shadow-lg"
                  : "bg-white/10 text-white/70 border-transparent hover:bg-[#0fb9b1]/20"
              }`}
              onClick={() => setTopic(t)}
            >
              {t}
            </button>
          ))}
        </div>
        {/* Filtre ve Sort */}
        <div className="flex flex-col md:flex-row md:items-end gap-4 mb-10">
          <div className="flex gap-2 flex-wrap">
            {difficulties.map((d) => (
              <Button
                key={d}
                variant={d === difficulty ? "default" : "secondary"}
                className={`rounded-full px-5 ${
                  d === difficulty ? "bg-[#0fb9b1] text-white" : ""
                }`}
                onClick={() => setDifficulty(d)}
              >
                {d}
              </Button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Simülasyon ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl px-4 py-2 bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#0fb9b1] w-full md:w-64"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-xl px-4 py-2 bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#0fb9b1] w-full md:w-56"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="text-black">
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        {/* Kartlar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filtered.length === 0 && (
            <div className="col-span-full text-center text-white/70 py-16 text-xl">
              Hiç simülasyon bulunamadı.
            </div>
          )}
          {filtered.map((sim, i) => (
            <motion.div
              key={sim.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.07, type: "spring" }}
              whileHover={{
                scale: 1.06,
                boxShadow: "0 8px 32px 0 #0fb9b1cc, 0 0 0 4px #0fb9b133",
              }}
              className="relative rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl p-0 flex flex-col items-center text-center transition-all duration-300 cursor-pointer group overflow-hidden min-h-[420px]"
            >
              {" "}
              <Link href={`/simulations/${sim.id}`}>
                {/* Görsel ve overlay */}
                <div className="w-full h-60 md:h-72 bg-[#0fb9b1]/10 flex items-center justify-center overflow-hidden relative">
                  <img
                    src={sim.image}
                    alt={sim.title}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-all duration-300" />
                  <div className="absolute left-0 top-0 m-4 flex gap-2">
                    <span className="rounded-full bg-[#0fb9b1]/90 text-white text-xs font-semibold px-3 py-1 shadow">
                      {sim.topic}
                    </span>
                    <span className="rounded-full bg-white/30 text-white/90 text-xs font-semibold px-3 py-1 shadow">
                      {sim.difficulty}
                    </span>
                  </div>
                </div>
                {/* Kart içeriği */}
                <div className="flex-1 flex flex-col justify-end p-7 w-full">
                  <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg line-clamp-2">
                    {sim.title}
                  </h3>
                  <p className="text-white/80 text-base mb-6 min-h-[48px] line-clamp-3">
                    {sim.desc}
                  </p>
                  <Button className="rounded-xl cursor-pointer bg-[#0fb9b1] hover:bg-[#0fb9b1]/90 font-semibold px-8 py-3 text-lg shadow-lg shadow-[#0fb9b1]/20 group-hover:scale-105 group-hover:shadow-[#0fb9b1]/40 transition-all duration-300">
                    Simülasyonu Aç
                  </Button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Simulations;
