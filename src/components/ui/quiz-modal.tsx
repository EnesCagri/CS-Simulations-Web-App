"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

type Question = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

type Questions = {
  bubbleSort: Question[];
  linearSearch: Question[];
  binarySearch: Question[];
  graphColoring: Question[];
  pathfinding: Question[];
};

const questions: Questions = {
  // Bubble Sort için sorular
  bubbleSort: [
    {
      question:
        "Bubblesort algoritmasında, bir elemanın yerini değiştirmesi için ne olmalıdır?",
      options: [
        "En küçük eleman olmalı",
        "Sağındaki elemandan büyük olmalı",
        "En büyük eleman olmalı",
        "Solundaki elemandan büyük olmalı",
      ],
      answer: 1,
      explanation:
        "Bubblesort'ta bir eleman, sağındaki elemandan büyükse yer değiştirir. Bu sayede büyük elemanlar sağa doğru 'kabarcık' gibi yükselir.",
    },
    {
      question:
        "Bubblesort algoritmasında, her turda en büyük eleman nereye gider?",
      options: [
        "Rastgele bir yere",
        "Listenin ortasına",
        "Listenin sonuna",
        "Listenin başına",
      ],
      answer: 2,
      explanation:
        "Her turda en büyük eleman listenin sonuna gider. Bu, algoritmanın temel mantığıdır - her turda bir eleman doğru yerine yerleşir.",
    },
    {
      question: "Bubblesort algoritmasında, liste sıralandığında ne olur?",
      options: [
        "Elemanlar tekrar sıralanır",
        "Elemanlar rastgele dağılır",
        "Elemanlar karışır",
        "Hiçbir eleman yer değiştirmez",
      ],
      answer: 3,
      explanation:
        "Liste sıralandığında, hiçbir eleman yer değiştirmez çünkü tüm elemanlar zaten doğru sıradadır.",
    },
  ],

  // Linear Search için sorular
  linearSearch: [
    {
      question:
        "Linear Search algoritmasında, aranan eleman bulunduğunda ne olur?",
      options: [
        "Liste sıralanır",
        "Liste karışır",
        "Arama durur",
        "Arama devam eder",
      ],
      answer: 2,
      explanation:
        "Linear Search'ta aranan eleman bulunduğunda arama durur çünkü amaca ulaşılmıştır. Tüm listeyi kontrol etmeye gerek kalmaz.",
    },
    {
      question:
        "Linear Search algoritmasında, eleman bulunamazsa ne döndürülür?",
      options: ["Liste uzunluğu", "-1", "1", "0"],
      answer: 1,
      explanation:
        "Eleman bulunamazsa -1 döndürülür. Bu, elemanın listede olmadığını belirtmek için kullanılan yaygın bir konvansiyondur.",
    },
    {
      question: "Linear Search algoritması, elemanları nasıl kontrol eder?",
      options: ["Ortadan", "Tersten", "Sırayla", "Rastgele"],
      answer: 2,
      explanation:
        "Linear Search algoritması elemanları sırayla kontrol eder. Her elemanı tek tek kontrol ederek ilerler.",
    },
  ],

  // Binary Search için sorular
  binarySearch: [
    {
      question: "Binary Search algoritması hangi tür listelerde çalışır?",
      options: [
        "Tekrarlı listelerde",
        "Boş listelerde",
        "Karışık listelerde",
        "Sıralı listelerde",
      ],
      answer: 3,
      explanation:
        "Binary Search sadece sıralı listelerde çalışır çünkü listeyi ortadan bölerek arama yapabilmek için sıralı olması gerekir.",
    },
    {
      question: "Binary Search algoritması her adımda listeyi nasıl böler?",
      options: ["Beşe", "Dörde", "İkiye", "Üçe"],
      answer: 2,
      explanation:
        "Binary Search her adımda listeyi ikiye böler. Bu sayede arama alanını hızlıca küçültür.",
    },
    {
      question:
        "Binary Search algoritması, doğrusal aramaya göre neden daha hızlıdır?",
      options: [
        "Aynı hızda çalışır",
        "Daha yavaş çalışır",
        "Daha çok karşılaştırma yapar",
        "Daha az karşılaştırma yapar",
      ],
      answer: 3,
      explanation:
        "Binary Search daha az karşılaştırma yapar çünkü her adımda arama alanını yarıya indirir. Bu sayede çok daha hızlı sonuca ulaşır.",
    },
  ],

  // Graph Coloring için sorular
  graphColoring: [
    {
      question:
        "Graf boyama algoritmasında, komşu düğümler nasıl boyanmalıdır?",
      options: [
        "Sadece siyah-beyaz",
        "Rastgele renklerle",
        "Farklı renklerle",
        "Aynı renkle",
      ],
      answer: 2,
      explanation:
        "Komşu düğümler farklı renklerle boyanmalıdır. Bu, graf boyama probleminin temel kuralıdır.",
    },
    {
      question:
        "Bir düğümün komşu sayısı arttıkça, gerekli renk sayısı nasıl değişir?",
      options: ["Önce artar sonra azalır", "Değişmez", "Artar", "Azalır"],
      answer: 2,
      explanation:
        "Bir düğümün komşu sayısı arttıkça, gerekli renk sayısı da artar çünkü her komşu için farklı bir renk gerekebilir.",
    },
    {
      question:
        "Graf boyama algoritmasında, bir düğüm için renk seçerken neye bakılır?",
      options: [
        "Grafın şekline",
        "Grafın boyutuna",
        "Sadece düğümün kendisine",
        "Komşu düğümlerin renklerine",
      ],
      answer: 3,
      explanation:
        "Bir düğüm için renk seçerken komşu düğümlerin renklerine bakılır. Bu sayede komşu düğümlerle aynı renk kullanılmaz.",
    },
  ],

  // Pathfinding için sorular
  pathfinding: [
    {
      question:
        "DFS (Depth First Search) algoritmasında düğümleri ziyaret etme sırası nasıldır?",
      options: [
        "En yakın düğümden başlar",
        "Rastgele düğümlerden ilerler",
        "Mümkün olduğunca derine iner",
        "Seviye seviye ilerler",
      ],
      answer: 2,
      explanation:
        "DFS algoritması mümkün olduğunca derine iner. Bir yolda ilerlerken, o yolun sonuna kadar gider ve sonra geri döner.",
    },
    {
      question: "BFS (Breadth First Search) algoritması nasıl çalışır?",
      options: [
        "Seviye seviye ilerler",
        "Derinlemesine iner",
        "Rastgele hareket eder",
        "yol zorluğunu hesaplayarak ilerler",
      ],
      answer: 0,
      explanation:
        "BFS algoritması seviye seviye ilerler. Önce başlangıç düğümünün tüm komşularını ziyaret eder, sonra onların komşularını ve bu şekilde devam eder.",
    },
    {
      question:
        "Dijkstra algoritması aşağıdakilerden hangisini bulmak için kullanılır?",
      options: [
        "Minimum kapsayan ağaç",
        "Tüm düğümlere en kısa yol",
        "En uzun yol",
        "Çevrim",
      ],
      answer: 1,
      explanation:
        "Dijkstra algoritması, başlangıç düğümünden diğer tüm düğümlere olan en kısa yolları bulmak için kullanılır.",
    },
  ],
};

export const QuizModal = ({
  open,
  onClose,
  simulationType = "BubbleSort",
}: {
  open: boolean;
  onClose: () => void;
  simulationType?: string;
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Map simulation paths to quiz types
  const quizTypeMap: Record<string, keyof Questions> = {
    BubbleSort: "bubbleSort",
    LinearSearch: "linearSearch",
    BinarySearch: "binarySearch",
    GraphColoring: "graphColoring",
    Pathfinding: "pathfinding",
  };

  const currentQuestions =
    questions[quizTypeMap[simulationType || "BubbleSort"]] ||
    questions.bubbleSort;

  // Reset state when modal opens
  useEffect(() => {
    if (open) {
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setScore(0);
      setShowResults(false);
    }
  }, [open]);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    if (answerIndex === currentQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResults(false);
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-blue-900/95 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-bold leading-6 text-cyan-300 mb-6"
                >
                  {showResults ? "Quiz Sonuçları" : "Quiz"}
                </Dialog.Title>

                <AnimatePresence mode="wait">
                  {!showResults ? (
                    <motion.div
                      key="question"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="text-lg text-white">
                        {currentQuestions[currentQuestion].question}
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        {currentQuestions[currentQuestion].options.map(
                          (option, index) => (
                            <button
                              key={index}
                              onClick={() => handleAnswer(index)}
                              className={`p-4 rounded-xl text-left transition-all ${
                                selectedAnswer === index
                                  ? index ===
                                    currentQuestions[currentQuestion].answer
                                    ? "bg-green-500/20 border-2 border-green-500"
                                    : "bg-red-500/20 border-2 border-red-500"
                                  : "bg-white/10 hover:bg-white/20"
                              }`}
                              disabled={selectedAnswer !== null}
                            >
                              {option}
                            </button>
                          )
                        )}
                      </div>

                      {selectedAnswer !== null && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-4"
                        >
                          <div
                            className={`p-4 rounded-xl ${
                              selectedAnswer ===
                              currentQuestions[currentQuestion].answer
                                ? "bg-green-500/20 border-2 border-green-500"
                                : "bg-red-500/20 border-2 border-red-500"
                            }`}
                          >
                            <p className="text-white font-medium">
                              {selectedAnswer ===
                              currentQuestions[currentQuestion].answer
                                ? "Doğru!"
                                : "Yanlış!"}
                            </p>
                            <p className="text-white/80 mt-2">
                              {currentQuestions[currentQuestion].explanation}
                            </p>
                          </div>
                          <motion.button
                            onClick={handleNext}
                            className="w-full py-3 px-6 rounded-xl bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition-colors"
                          >
                            {currentQuestion < currentQuestions.length - 1
                              ? "Sonraki Soru"
                              : "Sonuçları Gör"}
                          </motion.button>
                        </motion.div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="results"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center space-y-6"
                    >
                      <div className="text-4xl font-bold text-cyan-300">
                        {score} / {currentQuestions.length}
                      </div>
                      <div className="text-white">
                        {score === currentQuestions.length
                          ? "Mükemmel! Tüm soruları doğru bildiniz!"
                          : score >= currentQuestions.length / 2
                          ? "İyi iş! Çoğu soruyu doğru bildiniz."
                          : "Daha fazla pratik yapmalısınız."}
                      </div>
                      <button
                        onClick={handleRestart}
                        className="px-6 py-3 rounded-xl bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition-colors"
                      >
                        Tekrar Dene
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
