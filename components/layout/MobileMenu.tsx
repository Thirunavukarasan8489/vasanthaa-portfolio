"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ArrowUpRight, Mail } from "lucide-react";

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

  return (
    <div
      className={`fixed inset-0 z-50 md:hidden transition-opacity duration-400 ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!isOpen}
    >
      {/* Dark Blur Backdrop Overlay */}
      <div
        className={`absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-400 ease-out ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-label="Close menu overlay"
      />

      {/* Slide-in Drawer Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
        className={`absolute top-0 right-0 bottom-0 w-full max-w-[85vw] sm:max-w-md bg-[#021D15] border-l border-[#053827] shadow-2xl flex flex-col justify-between px-6 sm:px-8 py-8 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Top Bar with Brand & Close Button */}
        <div className="flex items-center justify-between border-b border-[#053827] pb-6">
          <Link
            href="/"
            onClick={onClose}
            className="group flex items-baseline gap-1 focus:outline-none"
          >
            <span className="font-serif text-2xl font-normal tracking-tight text-[#F7F4EC] group-hover:text-[#C8A75A] transition-colors">
              Vasanthaa
            </span>
            <span className="text-[#C8A75A] text-xl font-serif">.</span>
          </Link>

          <button
            onClick={onClose}
            aria-label="Close navigation menu"
            className="p-2 -mr-2 text-[#AFCDC1] hover:text-[#C8A75A] hover:bg-[#053827]/60 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-[#C8A75A] rounded"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-5 py-8" aria-label="Mobile Navigation Links">
          <span className="text-[11px] uppercase tracking-widest text-[#79AD98] font-mono">
            Navigation
          </span>

          {navLinks.map((link, idx) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`group flex items-center justify-between py-2 text-2xl sm:text-3xl font-serif tracking-wide transition-all ${
                  isActive
                    ? "text-[#C8A75A] italic pl-2 border-l-2 border-[#C8A75A]"
                    : "text-[#F7F4EC] hover:text-[#C8A75A] hover:pl-2"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="text-xs font-mono text-[#79AD98] opacity-70">
                    0{idx + 1}
                  </span>
                  <span>{link.label}</span>
                </span>
                <span className="text-sm font-sans text-[#79AD98] group-hover:text-[#C8A75A] transition-transform transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            );
          })}

          <div className="pt-4 border-t border-[#053827]/60 flex items-center gap-3 text-xs font-mono text-[#AFCDC1]">
            <span>Words</span>
            <span className="text-[#0A4C38]">────────</span>
            <span>Voice</span>
            <span className="text-[#C8A75A]/60">∿∿∿∿</span>
          </div>
        </nav>

        {/* Bottom CTA & Direct Contacts */}
        <div className="border-t border-[#053827] pt-6 flex flex-col gap-4">
          <Link
            href="/contact"
            onClick={onClose}
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 bg-[#C8A75A] text-[#021D15] font-mono text-xs uppercase tracking-widest font-semibold hover:bg-[#D7BC76] active:scale-[0.99] transition-all"
          >
            <span>Let&apos;s Work Together</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <div className="flex items-center justify-between text-xs text-[#79AD98] font-mono pt-1">
            <a
              href="mailto:contact.vasanthaa@gmail.com"
              className="flex items-center gap-1.5 hover:text-[#C8A75A] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#C8A75A]" />
              <span>Email Direct</span>
            </a>
            <span>2+ Yrs Experience</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
