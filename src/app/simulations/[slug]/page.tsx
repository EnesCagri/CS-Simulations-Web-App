"use client";

import React from "react";
import { CodeTabs } from "@/components/ui/code-tabs";
import { Card } from "@/components/ui/card";
import { RealLifeExamplesGrid } from "@/components/ui/real-life-examples-grid";
import UnityGame from "@/components/UnityGame";
import { motion } from "framer-motion";
import { QuizModal } from "@/components/ui/quiz-modal";
import simulationsData from "@/db/simulations.json";
import { useParams } from "next/navigation";
import codesData from "@/db/codes.json";
import { DescriptionCard } from "@/components/DescriptionCard";
import lecturesData from "@/db/lectures.json";

// Tip tanımlamaları
type Section = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
};

type Lecture = {
  simulation_id: number;
  title: string;
  sections: Section[];
};

const Simulation = () => {
  const [quizOpen, setQuizOpen] = React.useState(false);
  const { slug } = useParams();
  const allSimulations = simulationsData.simulations;

  // Simülasyonu bul (örneğin id ile)
  const simulation = allSimulations.find(
    (sim) => String(sim.id) === String(slug)
  );

  // Açıklamayı bul
  const lecture = (lecturesData as unknown as Lecture[]).find(
    (lec) => lec.simulation_id === simulation?.id
  );

  // Kodları bul
  const codeEntry = codesData.codes.find(
    (code) => code.simulation_id === simulation?.id
  );

  const codeTabsData = codeEntry?.codeTabs || [
    { label: "Python", language: "python", code: "" },
    { label: "Java", language: "java", code: "" },
    { label: "C++", language: "cpp", code: "" },
  ];

  // Real life examples
  const realLifeExamples = (simulation?.real_life_examples || []).map(
    (example) => ({
      image: example.image,
      title: example.example,
      desc: example.example,
      badge: "Gerçek Hayat",
    })
  );

  // Related simulations
  const relatedSimulations = (simulation?.related_simulations || [])
    .map((id) => allSimulations.find((sim) => sim.id === id))
    .filter((sim): sim is (typeof allSimulations)[0] => !!sim)
    .map((sim) => ({
      image: sim.image,
      title: sim.title,
      desc: sim.desc,
      href: `/simulations/${sim.id}`,
    }));

  return (
    <div className="min-h-screen w-full bg-blue-900 px-4 py-10 relative overflow-hidden">
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
      <div className="relative z-10 mt-16">
        {/* Header Row: Title & Quiz Button */}
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 mb-8">
          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, type: "spring" }}
            className="text-4xl font-bold text-cyan-300 drop-shadow"
          >
            {simulation?.title || "Simulation Title"}
          </motion.h1>
          <motion.button
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, type: "spring", delay: 0.2 }}
            onClick={() => setQuizOpen(true)}
            className="px-5 py-2 rounded-full bg-cyan-700 text-white font-semibold shadow-lg hover:bg-cyan-800 transition text-lg"
            whileHover={{ scale: 1.08, boxShadow: "0 4px 24px #0fb9b1aa" }}
            whileTap={{ scale: 0.96 }}
          >
            Kendini Dene
          </motion.button>
        </div>
        <QuizModal open={quizOpen} onClose={() => setQuizOpen(false)} />
        {/* Unity Simulation Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
          className="max-w-5xl mx-auto mb-8 relative rounded-2xl overflow-hidden border border-gray-800 bg-gray-900/50 backdrop-blur-sm w-full"
          style={{
            aspectRatio: "16/9",
            maxHeight: "calc(100vh - 200px)",
            minHeight: "600px",
          }}
        >
          <UnityGame />
        </motion.div>
        {/* Main Content */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Detailed Explanation */}
            {lecture && <DescriptionCard data={lecture} />}

            {/* Code Examples */}
            <Card className="p-6 bg-white/10 border border-white/20 rounded-2xl shadow-md text-blue-50">
              <h2 className="text-2xl font-semibold text-cyan-200 mb-4">
                Code Examples
              </h2>
              <CodeTabs tabs={codeTabsData} />
            </Card>
          </div>
          {/* Right Column - Related Simulations */}
          <div className="space-y-6">
            <Card className="p-6 bg-white/10 border border-white/20 rounded-2xl shadow-md text-blue-50">
              <h2 className="text-2xl font-semibold text-cyan-200 mb-4">
                Related Simulations
              </h2>
              <ul className="space-y-4">
                {relatedSimulations.map((sim, index) => (
                  <li
                    key={index}
                    className="bg-cyan-900/40 rounded-xl hover:bg-cyan-900/60 cursor-pointer transition overflow-hidden"
                  >
                    <img
                      src={sim.image}
                      alt={sim.title}
                      className="w-full h-28 object-cover"
                    />
                    <div className="p-3">
                      <h3 className="font-medium text-cyan-100">{sim.title}</h3>
                      <p className="text-sm text-blue-100">{sim.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Real Life Examples */}
            <Card className="p-6 bg-white/10 border border-white/20 rounded-2xl shadow-md text-blue-50">
              <h2 className="text-2xl font-semibold text-cyan-200 mb-4">
                Real Life Examples
              </h2>
              <RealLifeExamplesGrid data={realLifeExamples} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulation;
