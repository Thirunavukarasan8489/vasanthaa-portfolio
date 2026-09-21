"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ArrowUpRight } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { label: string; href: string }[];
}

export default function MobileMenu({ isOpen, onClose, navLinks }: MobileMenuProps) {
  const pathname = usePathname();

  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#021D15]/95 backdrop-blur-md px-6 py-8 md:hidden transition-all"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-[#053827] pb-6">
        <span className="font-serif text-2xl font-bold tracking-tight text-[#F7F4EC]">
          Vasanthaa<span className="text-[#C8A75A]">.</span>
        </span>
        <button
          onClick={onClose}
          aria-label="Close navigation menu"
          className="p-2 text-[#AFCDC1] hover:text-[#C8A75A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C8A75A] rounded"
        >
          <X className="w-7 h-7" />
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-6 py-10" aria-label="Mobile Menu Links">
        <span className="text-xs uppercase tracking-widest text-[#79AD98] font-mono">
          Navigation
        </span>
        {navLinks.map((link, idx) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`group flex items-center justify-between text-2xl font-serif tracking-wide transition-colors ${
                isActive ? "text-[#C8A75A] italic" : "text-[#F7F4EC] hover:text-[#C8A75A]"
              }`}
            >
              <span className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#79AD98] opacity-70">
                  0{idx + 1}
                </span>
                {link.label}
              </span>
              <span className="text-sm font-sans text-[#79AD98] group-hover:text-[#C8A75A] transition-colors">
                →
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom CTA & Info */}
      <div className="border-t border-[#053827] pt-6 flex flex-col gap-4">
        <Link
          href="/contact"
          onClick={onClose}
          className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-none bg-[#C8A75A] text-[#021D15] font-sans font-semibold tracking-wide hover:bg-[#D7BC76] transition-colors"
        >
          <span>Let&apos;s Work Together</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
        <p className="text-xs text-[#79AD98] text-center font-mono">
          Words × Voice • 2+ Years Experience
        </p>
      </div>
    </div>
  );
}
