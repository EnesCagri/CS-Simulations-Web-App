export function Footer() {
  return (
    <footer className="w-full bg-black/80 border-t border-white/10 py-8 mt-16">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
        <div className="font-bold text-xl text-[#0fb9b1] tracking-tight">
          CS Sim
        </div>
        <div className="text-white/80 text-sm">info@cssim.com</div>
        <div className="text-white/60 text-sm">
          Istanbul Medeniyet University
        </div>
      </div>
      <div className="text-center text-xs text-white/40 mt-4">
        © {new Date().getFullYear()} CS Sim. All rights reserved.
      </div>
    </footer>
  );
}
