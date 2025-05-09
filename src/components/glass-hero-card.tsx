"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Typewriter } from "react-simple-typewriter";

export function GlassHeroCard() {
  return (
    <div className="glass-hero-card relative z-10 w-full max-w-3xl min-h-[370px] min-w-[340px] mt-8  mx-auto rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl px-10 py-16 flex flex-col items-center text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 min-h-[110px] flex flex-col justify-center">
        Algoritmanın <span className="text-[#f5c645]">Sihrini</span> Keşfet
        <span className="inline-block text-3xl">
          <Typewriter
            words={[
              "Graf Boyama!",
              "BFS & DFS Keşfi!",
              "Hamilton Çemberi!",
              "Lineer Search!",
              "Binary Search!",
              "Bubble Sort!",
            ]}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={60}
            deleteSpeed={40}
            delaySpeed={1200}
          />
        </span>
      </h1>
      <p className="text-lg md:text-2xl text-white/80 max-w-2xl mb-8">
        Algoritmaların gücünü interaktif simülasyonlarla keşfet. Bilgisayar
        simülasyonlarının önemi ve sitemizin amacı burada öne çıkacak.
      </p>
      <Button
        asChild
        size="lg"
        className="rounded-xl px-8 text-lg font-semibold bg-[#0fb9b1] hover:bg-[#0fb9b1]/90 shadow-lg shadow-[#0fb9b1]/20 animate-pulse"
      >
        <Link href="/simulations">Algoritmaları Keşfet</Link>
      </Button>
    </div>
  );
}
