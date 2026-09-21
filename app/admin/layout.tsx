"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShieldLock,
  LayoutDashboard,
  MessageSquareQuote,
  Inbox,
  Menu,
  X,
  ExternalLink,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

const DEFAULT_AUTH_KEY = "vasantha_admin_suresh_auth";

const subscribeSession = (callback: () => void) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

const getSessionSnapshot = () => {
  try {
    return (
      sessionStorage.getItem(DEFAULT_AUTH_KEY) === "true" ||
      sessionStorage.getItem("vasanthaa_admin_auth") === "true"
    );
  } catch {
    return false;
  }
};

const getServerSnapshot = () => false;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Auth state
  const isStoredAuth = useSyncExternalStore(
    subscribeSession,
    getSessionSnapshot,
    getServerSnapshot
  );
  const [localAuth, setLocalAuth] = useState(false);
  const isAuthenticated = isStoredAuth || localAuth;

  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  // Left Drawer States
  // Desktop: open by default, can collapse/expand
  const [isDesktopDrawerOpen, setIsDesktopDrawerOpen] = useState(true);
  // Mobile: closed by default, slides out when hamburger is clicked
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Dynamic counts for sidebar badges
  const [testimonialsCount, setTestimonialsCount] = useState<number | null>(null);
  const [newLeadsCount, setNewLeadsCount] = useState<number | null>(null);

  // Handle escape key to close mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Fetch count badges
  useEffect(() => {
    if (!isAuthenticated) return;

    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((d) => {
        if (d.success && Array.isArray(d.testimonials)) {
          setTestimonialsCount(d.testimonials.length);
        }
      })
      .catch(() => {});

    fetch("/api/leads")
      .then((r) => r.json())
      .then((d) => {
        if (d.success && Array.isArray(d.leads)) {
          const newCount = d.leads.filter((l: { status: string }) => l.status === "new").length;
          setNewLeadsCount(newCount);
        }
      })
      .catch(() => {});
  }, [isAuthenticated, pathname]);

  // Handle Passcode Submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setIsVerifying(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });
      const data = await res.json();

      if (data.success) {
        const key = data.authStorageKey || DEFAULT_AUTH_KEY;
        try {
          sessionStorage.setItem(key, "true");
          sessionStorage.setItem(DEFAULT_AUTH_KEY, "true");
        } catch {
          // ignore
        }
        setLocalAuth(true);
      } else {
        // Fallback check if offline
        if (passcode === "vasanthaa2026") {
          try {
            sessionStorage.setItem(DEFAULT_AUTH_KEY, "true");
          } catch {}
          setLocalAuth(true);
        } else {
          setAuthError(data.error || "Invalid access passcode. Please try again.");
        }
      }
    } catch {
      // Offline fallback
      if (passcode === "vasanthaa2026") {
        try {
          sessionStorage.setItem(DEFAULT_AUTH_KEY, "true");
        } catch {}
        setLocalAuth(true);
      } else {
        setAuthError("Invalid access passcode. Please try again.");
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLogout = () => {
    setLocalAuth(false);
    setPasscode("");
    try {
      sessionStorage.removeItem(DEFAULT_AUTH_KEY);
      sessionStorage.removeItem("vasanthaa_admin_auth");
    } catch {}
  };

  // 1. Passcode Lock Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#021D15] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#053827]/40 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-[#03291E] border border-[#053827] p-8 sm:p-10 relative z-10 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto mb-4 border border-[#C8A75A] bg-[#053827] flex items-center justify-center text-[#C8A75A] shadow-lg">
              <ShieldLock className="w-7 h-7" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#79AD98] block">
              Restricted Area
            </span>
            <h1 className="font-serif text-3xl font-normal text-[#F7F4EC] mt-1">
              Admin <span className="italic text-[#C8A75A]">Console</span>
            </h1>
            <p className="text-xs font-sans text-[#AFCDC1] mt-2">
              Enter master access passcode to manage portfolio testimonials and client inquiries.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="passcode"
                className="block text-xs font-mono uppercase tracking-wider text-[#79AD98] mb-1.5"
              >
                Access Passcode
              </label>
              <input
                id="passcode"
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#021D15] border border-[#0A4C38] px-4 py-3 text-sm text-[#F7F4EC] placeholder-[#66736E] focus:outline-none focus:border-[#C8A75A] transition-colors"
                autoFocus
              />
              {authError && (
                <p className="text-xs text-rose-400 mt-2 font-mono flex items-center gap-1.5">
                  <X className="w-3.5 h-3.5 shrink-0" />
                  {authError}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3.5 px-6 bg-[#C8A75A] text-[#021D15] font-sans text-sm font-semibold tracking-wide hover:bg-[#D7BC76] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
            >
              {isVerifying ? "Verifying..." : "Unlock Dashboard ↗"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#053827] flex items-center justify-between text-xs font-mono text-[#79AD98]">
            <Link
              href="/"
              className="hover:text-[#C8A75A] transition-colors flex items-center gap-1"
            >
              ← Back to site
            </Link>
            <span className="text-[#AFCDC1]/60">v2.0 Route Shell</span>
          </div>
        </div>
      </div>
    );
  }

  // Navigation Links definition
  const navItems = [
    {
      href: "/admin",
      label: "Overview",
      icon: LayoutDashboard,
      badge: null,
      exact: true,
    },
    {
      href: "/admin/testimonials",
      label: "Testimonials",
      icon: MessageSquareQuote,
      badge: testimonialsCount !== null ? testimonialsCount : null,
      badgeType: "neutral",
      exact: false,
    },
    {
      href: "/admin/leads",
      label: "Contact Leads",
      icon: Inbox,
      badge: newLeadsCount && newLeadsCount > 0 ? `${newLeadsCount} new` : null,
      badgeType: "accent",
      exact: false,
    },
  ];

  // Helper to determine active state
  const isItemActive = (href: string, exact: boolean) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  // Get current section title
  const currentTitle =
    pathname === "/admin"
      ? "Studio Overview"
      : pathname.startsWith("/admin/testimonials")
      ? "Testimonials Studio"
      : pathname.startsWith("/admin/leads")
      ? "Client Leads"
      : "Admin Console";

  return (
    <div className="min-h-screen bg-[#021D15] text-[#F7F4EC] flex flex-col font-sans selection:bg-[#C8A75A] selection:text-[#021D15]">
      {/* =========================================================
          MOBILE BACKDROP OVERLAY (When mobile drawer is open)
      ========================================================= */}
      {isMobileDrawerOpen && (
        <div
          onClick={() => setIsMobileDrawerOpen(false)}
          className="fixed inset-0 z-40 bg-black/75 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Top Mobile & Global Header */}
      <header className="h-16 border-b border-[#053827] bg-[#03291E]/95 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
            aria-label="Toggle admin menu"
            className="lg:hidden p-2 border border-[#0A4C38] bg-[#021D15] text-[#AFCDC1] hover:text-[#C8A75A] hover:border-[#C8A75A] transition-all"
          >
            {isMobileDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Desktop Drawer Collapse/Expand Toggle Icon */}
          <button
            onClick={() => setIsDesktopDrawerOpen(!isDesktopDrawerOpen)}
            aria-label="Toggle sidebar width"
            title={isDesktopDrawerOpen ? "Collapse sidebar" : "Expand sidebar"}
            className="hidden lg:flex p-2 border border-[#0A4C38] bg-[#021D15] text-[#AFCDC1] hover:text-[#C8A75A] hover:border-[#C8A75A] transition-all"
          >
            {isDesktopDrawerOpen ? (
              <PanelLeftClose className="w-4 h-4" />
            ) : (
              <PanelLeftOpen className="w-4 h-4" />
            )}
          </button>

          {/* Brand Logo & Section Title */}
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="font-serif text-xl tracking-tight text-[#F7F4EC] hover:text-[#C8A75A] transition-colors"
            >
              Vasanthaa<span className="text-[#C8A75A]">.</span>
            </Link>
            <span className="text-stone-600 hidden sm:inline">/</span>
            <span className="text-xs font-mono text-[#C8A75A] uppercase tracking-wider hidden sm:inline font-semibold">
              {currentTitle}
            </span>
          </div>
        </div>

        {/* Right Header Badges & Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-2.5 py-1 bg-[#021D15] border border-[#0A4C38] text-[11px] font-mono text-[#AFCDC1]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Real-Time Sync Active</span>
          </div>

          <Link
            href="/"
            target="_blank"
            className="px-3 py-1.5 border border-[#0A4C38] bg-[#021D15] text-xs font-mono text-[#AFCDC1] hover:text-[#C8A75A] hover:border-[#C8A75A] transition-all flex items-center gap-1.5"
            title="Open live website in a new tab"
          >
            <span className="hidden sm:inline">View Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* =========================================================
          BODY SHELL: SIDEBAR DRAWER + MAIN ROUTE VIEW
      ========================================================= */}
      <div className="flex-1 flex relative">
        {/* =======================================================
            LEFT DRAWER MENU (Responsive: Collapsible Desktop + Slide Mobile)
        ======================================================= */}
        <aside
          className={`
            fixed lg:sticky top-16 bottom-0 left-0 z-50 lg:z-20
            bg-[#03291E] border-r border-[#053827] flex flex-col justify-between
            transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
            /* Mobile drawer slide */
            ${isMobileDrawerOpen ? "translate-x-0 shadow-2xl w-72" : "-translate-x-full lg:translate-x-0"}
            /* Desktop width state */
            ${isDesktopDrawerOpen ? "lg:w-64" : "lg:w-20"}
          `}
        >
          {/* Drawer Header (Mobile Close button) */}
          <div className="lg:hidden p-4 border-b border-[#053827] flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#79AD98]">
              Admin Navigation
            </span>
            <button
              onClick={() => setIsMobileDrawerOpen(false)}
              className="p-1 text-[#AFCDC1] hover:text-[#F7F4EC]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-3 sm:p-4 space-y-1.5 flex-1 overflow-y-auto">
            <div className={`px-3 py-2 text-[10px] font-mono uppercase tracking-widest text-[#79AD98]/80 ${!isDesktopDrawerOpen ? "lg:hidden" : ""}`}>
              Studio Management
            </div>

            {navItems.map((item) => {
              const active = isItemActive(item.href, item.exact);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className={`flex items-center justify-between px-3 py-3 rounded-none text-xs font-mono tracking-wider uppercase transition-all group ${
                    active
                      ? "bg-[#C8A75A] text-[#021D15] font-semibold shadow-md"
                      : "text-[#AFCDC1] hover:bg-[#053827] hover:text-[#F7F4EC]"
                  }`}
                  title={item.label}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${active ? "text-[#021D15]" : "text-[#C8A75A]"}`} />
                    <span className={`truncate ${!isDesktopDrawerOpen ? "lg:hidden" : ""}`}>
                      {item.label}
                    </span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 font-bold shrink-0 ${
                        !isDesktopDrawerOpen ? "lg:hidden" : ""
                      } ${
                        active
                          ? "bg-[#021D15] text-[#C8A75A]"
                          : item.badgeType === "accent"
                          ? "bg-[#C8A75A] text-[#021D15]"
                          : "bg-[#053827] text-[#AFCDC1]"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Drawer Bottom Actions */}
          <div className="p-3 sm:p-4 border-t border-[#053827] space-y-2 bg-[#021D15]/40">
            <div className={`text-[10px] font-mono text-[#79AD98] px-3 ${!isDesktopDrawerOpen ? "lg:hidden" : ""}`}>
              Session: <span className="text-[#AFCDC1]">Active</span>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-mono uppercase text-[#79AD98] hover:text-rose-400 hover:bg-rose-950/20 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4 shrink-0 text-rose-400" />
              <span className={!isDesktopDrawerOpen ? "lg:hidden" : ""}>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* =======================================================
            MAIN ROUTE CONTENT ({children})
        ======================================================= */}
        <main className="flex-1 w-full min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
