"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Anasayfa", href: "/" },
  { label: "Simülasyonlar", href: "/simulations" },
];

export function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[95vw] max-w-4xl rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 shadow-lg flex items-center justify-between px-6 py-3">
      <div className="flex items-center gap-8">
        <span className="font-bold text-xl text-[#0fb9b1] tracking-tight">
          CS Sim
        </span>
        <ul className="flex gap-2 md:gap-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "px-4 py-1 rounded-full transition-colors text-sm font-medium",
                  pathname === item.href
                    ? "bg-[#0fb9b1] text-white shadow"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Button
        asChild
        variant="secondary"
        className="px-6 font-semibold bg-[#0fb9b1]  hover:bg-[#0fb9b1]/80 transition-colors hover:scale-105 hover:text-white transition-all duration-300"
      >
        <Link
          href="https://forms.gle/YDSzKVSvNJLrTzHS7"
          target="_blank"
          rel="noopener noreferrer"
        >
          Teste Katıl
        </Link>
      </Button>
    </nav>
  );
}
