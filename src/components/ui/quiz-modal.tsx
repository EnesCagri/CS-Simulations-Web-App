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
  // Questions for Bubble Sort
  bubbleSort: [
    {
      question:
        "In the Bubble Sort algorithm, what must happen for an element to swap positions?",
      options: [
        "It must be the smallest element",
        "It must be larger than the element to its right",
        "It must be the largest element",
        "It must be larger than the element to its left",
      ],
      answer: 1,
      explanation:
        "In Bubble Sort, an element swaps if it's larger than the element to its right. This causes larger elements to 'bubble up' to the right.",
    },
    {
      question:
        "In the Bubble Sort algorithm, where does the largest element go in each pass?",
      options: [
        "To a random position",
        "To the middle of the list",
        "To the end of the list",
        "To the beginning of the list",
      ],
      answer: 2,
      explanation:
        "In each pass, the largest element goes to the end of the list. This is the fundamental logic of the algorithm - one element gets placed in its correct position each pass.",
    },
    {
      question:
        "In the Bubble Sort algorithm, what happens when the list is sorted?",
      options: [
        "Elements are sorted again",
        "Elements are randomly distributed",
        "Elements get mixed up",
        "No elements swap positions",
      ],
      answer: 3,
      explanation:
        "When the list is sorted, no elements swap positions because all elements are already in the correct order.",
    },
  ],

  // Questions for Linear Search
  linearSearch: [
    {
      question:
        "In the Linear Search algorithm, what happens when the target element is found?",
      options: [
        "The list gets sorted",
        "The list gets mixed up",
        "The search stops",
        "The search continues",
      ],
      answer: 2,
      explanation:
        "In Linear Search, when the target element is found, the search stops because the goal has been reached. There's no need to check the entire list.",
    },
    {
      question:
        "In the Linear Search algorithm, what is returned if the element is not found?",
      options: ["List length", "-1", "1", "0"],
      answer: 1,
      explanation:
        "If the element is not found, -1 is returned. This is a common convention used to indicate that the element is not in the list.",
    },
    {
      question: "How does the Linear Search algorithm check elements?",
      options: ["From the middle", "In reverse", "Sequentially", "Randomly"],
      answer: 2,
      explanation:
        "The Linear Search algorithm checks elements sequentially. It progresses by checking each element one by one.",
    },
  ],

  // Questions for Binary Search
  binarySearch: [
    {
      question:
        "What type of lists does the Binary Search algorithm work with?",
      options: [
        "Lists with duplicates",
        "Empty lists",
        "Unsorted lists",
        "Sorted lists",
      ],
      answer: 3,
      explanation:
        "Binary Search only works with sorted lists because it needs the list to be sorted to divide it in half for searching.",
    },
    {
      question:
        "How does the Binary Search algorithm divide the list in each step?",
      options: ["Into five", "Into four", "Into two", "Into three"],
      answer: 2,
      explanation:
        "Binary Search divides the list into two in each step. This allows it to quickly reduce the search space.",
    },
    {
      question: "Why is the Binary Search algorithm faster than linear search?",
      options: [
        "It works at the same speed",
        "It works slower",
        "It makes more comparisons",
        "It makes fewer comparisons",
      ],
      answer: 3,
      explanation:
        "Binary Search makes fewer comparisons because it halves the search space in each step. This allows it to reach the result much faster.",
    },
  ],

  // Questions for Graph Coloring
  graphColoring: [
    {
      question:
        "In the Graph Coloring algorithm, how should adjacent nodes be colored?",
      options: [
        "Only black and white",
        "With random colors",
        "With different colors",
        "With the same color",
      ],
      answer: 2,
      explanation:
        "Adjacent nodes should be colored with different colors. This is the fundamental rule of the graph coloring problem.",
    },
    {
      question:
        "As the number of neighbors of a node increases, how does the required number of colors change?",
      options: [
        "First increases then decreases",
        "Doesn't change",
        "Increases",
        "Decreases",
      ],
      answer: 2,
      explanation:
        "As the number of neighbors of a node increases, the required number of colors also increases because a different color may be needed for each neighbor.",
    },
    {
      question:
        "In the Graph Coloring algorithm, what is looked at when choosing a color for a node?",
      options: [
        "The shape of the graph",
        "The size of the graph",
        "Only the node itself",
        "The colors of neighboring nodes",
      ],
      answer: 3,
      explanation:
        "When choosing a color for a node, the colors of neighboring nodes are looked at. This ensures that the same color is not used as neighboring nodes.",
    },
  ],

  // Questions for Pathfinding
  pathfinding: [
    {
      question:
        "In the DFS (Depth First Search) algorithm, what is the order of visiting nodes?",
      options: [
        "Starts from the nearest node",
        "Progresses from random nodes",
        "Goes as deep as possible",
        "Progresses level by level",
      ],
      answer: 2,
      explanation:
        "The DFS algorithm goes as deep as possible. It follows one path to its end and then backtracks.",
    },
    {
      question: "How does the BFS (Breadth First Search) algorithm work?",
      options: [
        "Progresses level by level",
        "Goes deep",
        "Moves randomly",
        "Calculates path difficulty and progresses",
      ],
      answer: 0,
      explanation:
        "The BFS algorithm progresses level by level. It first visits all neighbors of the starting node, then their neighbors, and continues this way.",
    },
    {
      question: "What does the Dijkstra algorithm find?",
      options: [
        "Minimum spanning tree",
        "Shortest paths to all nodes",
        "Longest path",
        "Cycle",
      ],
      answer: 1,
      explanation:
        "The Dijkstra algorithm is used to find the shortest paths from the starting node to all other nodes.",
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
                  {showResults ? "Quiz Results" : "Quiz"}
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
                                ? "Correct!"
                                : "Incorrect!"}
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
                              ? "Next Question"
                              : "See Results"}
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
                          ? "Perfect! You got all questions correct!"
                          : score >= currentQuestions.length / 2
                          ? "Good job! You got most questions correct."
                          : "You need more practice."}
                      </div>
                      <button
                        onClick={handleRestart}
                        className="px-6 py-3 rounded-xl bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition-colors"
                      >
                        Try Again
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
