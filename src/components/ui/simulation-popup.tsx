"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

type SimulationPopupProps = {
  title: string;
  description: string;
  difficulty: string;
  topic: string;
};

export const SimulationPopup = ({
  title,
  description,
  difficulty,
  topic,
}: SimulationPopupProps) => {
  const [isOpen, setIsOpen] = useState(true);

  // Popup'ı localStorage'da saklayarak bir kez gösterilmesini sağlayalım
  useEffect(() => {
    const hasSeenPopup = localStorage.getItem(`popup-${title}`);
    if (hasSeenPopup) {
      setIsOpen(false);
    }
  }, [title]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem(`popup-${title}`, "true");
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
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
                  className="text-2xl font-bold leading-6 text-cyan-300 mb-4"
                >
                  {title}
                </Dialog.Title>

                <div className="mt-2 space-y-4">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-cyan-600/20 text-cyan-300 text-sm font-medium">
                      {topic}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/10 text-white text-sm font-medium">
                      {difficulty}
                    </span>
                  </div>

                  <p className="text-white/90 text-lg">{description}</p>

                  <div className="mt-6">
                    <button
                      type="button"
                      className="w-full px-4 py-3 rounded-xl bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition-colors"
                      onClick={handleClose}
                    >
                      Anladım
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
