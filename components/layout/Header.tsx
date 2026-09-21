"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ArrowUpRight } from "lucide-react";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? "bg-[#021D15]/90 backdrop-blur-md border-b border-[#053827] shadow-sm shadow-black/20"
            : "bg-transparent border-b border-[#053827]/40"
        }`}
      >
        <div className="editorial-container flex h-20 items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="group flex items-baseline gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#C8A75A] rounded px-1"
          >
            <span className="font-serif text-2xl md:text-3xl font-normal tracking-tight text-[#F7F4EC] group-hover:text-[#C8A75A] transition-colors">
              Vasanthaa
            </span>
            <span className="text-[#C8A75A] text-xl font-serif">.</span>
            <span className="hidden lg:inline-block ml-3 pl-3 border-l border-[#0A4C38] text-[11px] uppercase tracking-widest text-[#79AD98] font-mono">
              Words × Voice
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 text-sm tracking-wide transition-colors ${
                    isActive
                      ? "text-[#C8A75A] font-medium"
                      : "text-[#AFCDC1] hover:text-[#F7F4EC]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 h-[1.5px] w-full bg-[#C8A75A]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-[#C8A75A] bg-transparent px-5 py-2.5 text-xs uppercase tracking-widest text-[#F7F4EC] hover:bg-[#C8A75A] hover:text-[#021D15] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#C8A75A]"
            >
              <span>Let&apos;s Work Together</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="p-2 text-[#AFCDC1] hover:text-[#C8A75A] focus:outline-none focus:ring-2 focus:ring-[#C8A75A] rounded"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
}
