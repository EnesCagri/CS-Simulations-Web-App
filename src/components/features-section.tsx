import { LucideSparkles, LucideBookOpen, LucideUsers } from "lucide-react";

const features = [
  {
    icon: <LucideSparkles className="w-8 h-8 text-[#0fb9b1]" />,
    title: "Interactive Simulations",
    desc: "Learn algorithms step by step, visually and interactively.",
  },
  {
    icon: <LucideBookOpen className="w-8 h-8 text-[#0fb9b1]" />,
    title: "Real-Life Examples",
    desc: "Easily understand complex concepts through real-life examples.",
  },
  {
    icon: <LucideUsers className="w-8 h-8 text-[#0fb9b1]" />,
    title: "Accessible for Everyone",
    desc: "Understandable and accessible content for people of all ages and professions.",
  },
];

export function FeaturesSection() {
  return (
    <section className="relative z-10 w-full flex flex-col items-center py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
        Why CS Sim?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {features.map((f, i) => (
          <div
            key={i}
            className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl p-8 flex flex-col items-center text-center transition hover:scale-105 hover:shadow-2xl"
          >
            <div className="mb-4">{f.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2">{f.title}</h3>
            <p className="text-white/80 text-base">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
