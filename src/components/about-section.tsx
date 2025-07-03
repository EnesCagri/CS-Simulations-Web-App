import Image from "next/image";
import { Button } from "@/components/ui/button";

export function AboutSection() {
  return (
    <section className="relative z-10 w-full flex flex-col items-center py-20">
      <div className="max-w-5xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-8 md:p-14">
        {/* Left Column */}
        <div className="flex flex-col gap-6 items-start justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 text-left">
            Learn Algorithms by Doing with CS Sim
          </h2>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0fb9b1]/20 text-[#0fb9b1] text-xs font-semibold mb-2">
            <span>Our Mission</span>
            <span className="text-lg">🎯</span>
          </div>
          <p className="text-white/80 text-base md:text-lg text-left mb-2">
            To present algorithm and computer science concepts in an
            understandable and interactive way through simulations for everyone.
          </p>
          <Button className="rounded-xl mt-2 w-fit bg-[#0fb9b1] hover:bg-[#0fb9b1]/90 font-semibold px-6">
            Learn More
          </Button>
        </div>
        {/* Right Column: Large image and badge */}
        <div className="flex flex-col items-center justify-center relative">
          <div className="relative w-full aspect-[4/3] max-w-md rounded-2xl overflow-hidden shadow-xl border border-white/20 bg-white flex items-center justify-center">
            <Image
              src="/images/medeniyet.png"
              alt="Our Team"
              fill
              className="object-cover"
              priority
            />
            {/* Optional: animated effect or svg can be added on top of the image */}
          </div>
        </div>
      </div>
    </section>
  );
}
