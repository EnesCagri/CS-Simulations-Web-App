"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function FeaturedSimulations({
  data,
}: {
  data: { title: string; desc: string; image: string; href: string }[];
}) {
  const router = useRouter();

  return (
    <section className="relative z-10 w-full flex flex-col items-center py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
        Öne Çıkan Simülasyonlar
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl">
        {data.slice(0, 3).map((sim, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: i * 0.05, type: "spring" }}
            whileHover={{
              scale: 1.07,
              rotate: -2 + i * 2,
              boxShadow: "0 8px 32px 0 #0fb9b1cc, 0 0 0 4px #0fb9b133",
            }}
            className="rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl p-0 flex flex-col items-center text-center transition-all duration-300 cursor-pointer group overflow-hidden min-h-[420px]"
            onClick={() => router.push(sim.href)}
          >
            <div className="w-full h-56 md:h-64 bg-[#0fb9b1]/10 flex items-center justify-center overflow-hidden">
              <Image
                src={sim.image}
                alt={sim.title}
                width={800}
                height={600}
                className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-500"
                priority
              />
            </div>
            <div className="flex-1 flex flex-col justify-between p-6 w-full">
              <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                {sim.title}
              </h3>
              <p className="text-white/80 text-base mb-6 min-h-[48px]">
                {sim.desc}
              </p>
              <Button
                asChild
                className="rounded-xl bg-[#0fb9b1] hover:bg-[#0fb9b1]/90 font-semibold px-8 py-3 text-lg shadow-lg shadow-[#0fb9b1]/20 group-hover:scale-105 group-hover:shadow-[#0fb9b1]/40 transition-all duration-300"
              >
                <Link href={sim.href}>Simülasyonu Aç</Link>
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
