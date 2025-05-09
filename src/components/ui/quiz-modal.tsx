"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  {
    question: "Bir grafın proper boyaması nedir?",
    options: [
      "Komşu düğümlere farklı renkler verilmesi",
      "Her düğüme aynı renk verilmesi",
      "Kenarları boyanması",
      "Düğümlerin silinmesi",
    ],
    answer: 0,
  },
  {
    question: "Kromatik sayı (χ(G)) neyi ifade eder?",
    options: [
      "Grafın kenar sayısı",
      "En az kaç renkle proper boyanabileceğini",
      "Düğüm derecesi",
      "Grafın çapı",
    ],
    answer: 1,
  },
  {
    question: "Welsh–Powell algoritmasının temel farkı nedir?",
    options: [
      "Düğümleri rastgele sıralar",
      "Düğümleri azalan dereceye göre sıralar",
      "Kenarları boyar",
      "Her düğüme aynı rengi verir",
    ],
    answer: 1,
  },
  {
    question: "Dört Renk Teoremi hangi graflar için geçerlidir?",
    options: ["Tüm graflar", "Düzlemsel graflar", "Ağaçlar", "Tam graflar"],
    answer: 1,
  },
  {
    question: "DSATUR algoritmasında öncelik hangi düğüme verilir?",
    options: [
      "En az komşusu olana",
      "En çok farklı renkli komşusu olana",
      "En yüksek dereceye sahip olana",
      "Rastgele seçilene",
    ],
    answer: 1,
  },
];

export const QuizModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );
  const [step, setStep] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  const correctCount = userAnswers.filter(
    (ans, i) => ans === questions[i].answer
  ).length;

  const handleSelect = (optIdx: number) => {
    const updated = [...userAnswers];
    updated[step] = optIdx;
    setUserAnswers(updated);
  };

  const handleNext = () => {
    if (step < questions.length - 1) setStep(step + 1);
    else setShowResult(true);
  };
  const handlePrev = () => setStep((s) => (s > 0 ? s - 1 : 0));
  const handleClose = () => {
    setShowResult(false);
    setUserAnswers(Array(questions.length).fill(null));
    setStep(0);
    onClose();
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      >
        <motion.div
          ref={modalRef}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-blue-900 rounded-2xl shadow-2xl p-8 max-w-lg w-full relative"
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-cyan-200 text-2xl font-bold hover:text-cyan-400"
          >
            ×
          </button>
          <h2 className="text-2xl font-bold text-cyan-200 mb-6 text-center">
            Graf Boyama Quiz
          </h2>
          {showResult ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-4"
            >
              <div className="text-lg text-cyan-200 font-semibold mb-4 text-center">
                Doğru Sayısı: {correctCount} / {questions.length}
              </div>
              <div className="space-y-4 mb-4">
                {questions.map((q, i) => {
                  const isCorrect = userAnswers[i] === q.answer;
                  const isAnswered = userAnswers[i] !== null;
                  return (
                    <motion.div
                      key={i}
                      className={`p-4 rounded-lg flex items-center gap-3 border transition relative ${
                        isAnswered
                          ? isCorrect
                            ? "bg-green-700/80 border-green-400 text-white"
                            : "bg-red-700/80 border-red-400 text-white"
                          : "bg-white/10 border-white/20 text-cyan-100"
                      }`}
                      animate={
                        isAnswered && !isCorrect
                          ? { x: [0, -10, 10, -8, 8, -4, 4, 0] }
                          : { x: 0 }
                      }
                      transition={{ duration: 0.5 }}
                    >
                      {isAnswered && isCorrect && (
                        <motion.svg
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 20,
                          }}
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2"
                        >
                          <motion.path
                            d="M5 13l4 4L19 7"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5 }}
                          />
                        </motion.svg>
                      )}
                      {isAnswered && !isCorrect && (
                        <motion.svg
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 20,
                          }}
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2"
                        >
                          <motion.line x1="6" y1="6" x2="18" y2="18" />
                          <motion.line x1="6" y1="18" x2="18" y2="6" />
                        </motion.svg>
                      )}
                      <div>
                        <div className="font-semibold">
                          {i + 1}. {q.question}
                        </div>
                        <div className="text-sm mt-1">
                          Senin cevabın:{" "}
                          {isAnswered ? (
                            q.options[userAnswers[i] as number]
                          ) : (
                            <span className="italic">Cevaplanmadı</span>
                          )}
                        </div>
                        <div className="text-sm mt-1">
                          Doğru cevap:{" "}
                          <span className="font-bold">
                            {q.options[q.answer]}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <div className="text-center">
                <button
                  onClick={handleClose}
                  className="mt-2 px-6 py-2 rounded-lg bg-cyan-700 text-white font-semibold hover:bg-cyan-800 transition"
                >
                  Kapat
                </button>
              </div>
            </motion.div>
          ) : (
            <>
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
              >
                <div className="font-semibold text-blue-100 mb-2">
                  {step + 1}. {questions[step].question}
                </div>
                <div className="space-y-2">
                  {questions[step].options.map((opt, j) => (
                    <label
                      key={j}
                      className={`block px-4 py-2 rounded-lg cursor-pointer border transition ${
                        userAnswers[step] === j
                          ? "bg-cyan-700/80 border-cyan-400 text-white"
                          : "bg-white/10 border-white/20 text-cyan-100 hover:bg-cyan-800/40"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q${step}`}
                        checked={userAnswers[step] === j}
                        onChange={() => handleSelect(j)}
                        className="mr-2 accent-cyan-400"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </motion.div>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={handlePrev}
                  disabled={step === 0}
                  className="px-4 py-2 rounded-lg bg-cyan-700 text-white font-semibold hover:bg-cyan-800 transition disabled:opacity-50"
                >
                  Geri
                </button>
                {step < questions.length - 1 ? (
                  <button
                    onClick={handleNext}
                    disabled={userAnswers[step] === null}
                    className="px-4 py-2 rounded-lg bg-cyan-700 text-white font-semibold hover:bg-cyan-800 transition disabled:opacity-50"
                  >
                    İleri
                  </button>
                ) : (
                  <button
                    onClick={() => setShowResult(true)}
                    disabled={userAnswers[step] === null}
                    className="px-4 py-2 rounded-lg bg-cyan-700 text-white font-semibold hover:bg-cyan-800 transition disabled:opacity-50"
                  >
                    Sonuçları Göster
                  </button>
                )}
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
