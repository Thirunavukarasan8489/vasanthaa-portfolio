"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  ShieldLock,
  MessageSquareQuote,
  Inbox,
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  Clock,
  Archive,
  ExternalLink,
  LogOut,
  RefreshCw,
  Search,
  Check,
  X,
  Mail,
  Phone,
  Radio,
  Star,
} from "lucide-react";
import { Testimonial } from "@/data/testimonials";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget?: string;
  details: string;
  status: "new" | "contacted" | "archived";
  createdAt: string;
}

const ADMIN_PASSCODE = "vasanthaa2026";
const AUTH_STORAGE_KEY = "vasanthaa_admin_auth";

const subscribeSession = (callback: () => void) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

const getSessionSnapshot = () => {
  try {
    return sessionStorage.getItem(AUTH_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
};

const getServerSnapshot = () => false;

export default function AdminPage() {
  // Session storage sync
  const isStoredAuth = useSyncExternalStore(subscribeSession, getSessionSnapshot, getServerSnapshot);
  const [localAuth, setLocalAuth] = useState(false);
  const isAuthenticated = isStoredAuth || localAuth;

  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");

  // Active Tab
  const [activeTab, setActiveTab] = useState<"testimonials" | "leads">("testimonials");

  // Testimonials state
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);
  const [testimonialModalOpen, setTestimonialModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [testimonialForm, setTestimonialForm] = useState<Partial<Testimonial>>({
    quote: "",
    author: "",
    role: "",
    company: "",
    discipline: "Content Strategy & Scripts",
    highlightMetric: "",
    rating: 5,
  });

  // Leads state
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(true);
  const [leadStatusFilter, setLeadStatusFilter] = useState<"all" | "new" | "contacted" | "archived">("all");
  const [leadSearchQuery, setLeadSearchQuery] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Broadcast channel for real-time front page sync
  const broadcastTestimonialUpdate = (updatedList: Testimonial[]) => {
    try {
      const channel = new BroadcastChannel("portfolio-testimonials-sync");
      channel.postMessage({ type: "UPDATE", testimonials: updatedList });
      channel.close();
    } catch {
      // BroadcastChannel fallback
    }
    try {
      localStorage.setItem("portfolio-testimonials-sync", JSON.stringify(updatedList));
    } catch {
      // Storage fallback
    }
  };

  // Asynchronously fetch testimonials and leads on authenticated mount
  useEffect(() => {
    if (!isAuthenticated) return;
    let isCancelled = false;

    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        if (!isCancelled && data.success && Array.isArray(data.testimonials)) {
          setTestimonials(data.testimonials);
        }
      })
      .catch((err) => console.error("Error loading testimonials:", err))
      .finally(() => {
        if (!isCancelled) setLoadingTestimonials(false);
      });

    fetch("/api/leads")
      .then((res) => res.json())
      .then((data) => {
        if (!isCancelled && data.success && Array.isArray(data.leads)) {
          setLeads(data.leads);
        }
      })
      .catch((err) => console.error("Error loading leads:", err))
      .finally(() => {
        if (!isCancelled) setLoadingLeads(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [isAuthenticated]);

  // Manual refresh triggers
  const fetchTestimonials = useCallback(() => {
    setLoadingTestimonials(true);
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.testimonials)) {
          setTestimonials(data.testimonials);
        }
      })
      .catch((err) => console.error("Error reloading testimonials:", err))
      .finally(() => setLoadingTestimonials(false));
  }, []);

  const fetchLeads = useCallback(() => {
    setLoadingLeads(true);
    fetch("/api/leads")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.leads)) {
          setLeads(data.leads);
        }
      })
      .catch((err) => console.error("Error reloading leads:", err))
      .finally(() => setLoadingLeads(false));
  }, []);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === ADMIN_PASSCODE) {
      setLocalAuth(true);
      setAuthError("");
      try {
        sessionStorage.setItem(AUTH_STORAGE_KEY, "true");
      } catch {
        // Ignore
      }
    } else {
      setAuthError("Invalid access passcode. Please try again.");
    }
  };

  const handleLogout = () => {
    setLocalAuth(false);
    setPasscode("");
    try {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  // Open Testimonial Modal for Add
  const handleOpenAddModal = () => {
    setEditingTestimonial(null);
    setTestimonialForm({
      quote: "",
      author: "",
      role: "",
      company: "",
      discipline: "Content Strategy & Scripts",
      highlightMetric: "",
      rating: 5,
    });
    setTestimonialModalOpen(true);
  };

  // Open Testimonial Modal for Edit
  const handleOpenEditModal = (item: Testimonial) => {
    setEditingTestimonial(item);
    setTestimonialForm(item);
    setTestimonialModalOpen(true);
  };

  // Save Testimonial (Create or Update)
  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testimonialForm.quote || !testimonialForm.author) {
      alert("Please fill in both the quote and the author name.");
      return;
    }

    try {
      if (editingTestimonial) {
        // Update (PUT)
        const payload = {
          ...testimonialForm,
          id: editingTestimonial.id,
        };
        const res = await fetch("/api/testimonials", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success && data.testimonials) {
          setTestimonials(data.testimonials);
          broadcastTestimonialUpdate(data.testimonials);
          setTestimonialModalOpen(false);
          showToast("⚡ Testimonial updated! Synced to homepage in real time.");
        } else {
          alert(data.error || "Failed to update testimonial");
        }
      } else {
        // Create (POST)
        const res = await fetch("/api/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(testimonialForm),
        });
        const data = await res.json();
        if (data.success && data.testimonials) {
          setTestimonials(data.testimonials);
          broadcastTestimonialUpdate(data.testimonials);
          setTestimonialModalOpen(false);
          showToast("⚡ New testimonial added! Front page updated instantly.");
        } else {
          alert(data.error || "Failed to create testimonial");
        }
      }
    } catch (err) {
      console.error("Save testimonial error:", err);
      alert("Network error while saving testimonial");
    }
  };

  // Delete Testimonial
  const handleDeleteTestimonial = async (id: string, author: string) => {
    if (!window.confirm(`Are you sure you want to delete the testimonial from "${author}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/testimonials?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success && data.testimonials) {
        setTestimonials(data.testimonials);
        broadcastTestimonialUpdate(data.testimonials);
        showToast("🗑️ Testimonial deleted! Reflected instantly on homepage.");
      } else {
        alert(data.error || "Failed to delete testimonial");
      }
    } catch (err) {
      console.error("Delete testimonial error:", err);
      alert("Error deleting testimonial");
    }
  };

  // Update Lead Status
  const handleUpdateLeadStatus = async (id: string, status: "new" | "contacted" | "archived") => {
    try {
      const res = await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) =>
          prev.map((lead) => (lead.id === id ? { ...lead, status } : lead))
        );
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead((prev) => (prev ? { ...prev, status } : null));
        }
        showToast(`Lead marked as ${status}`);
      }
    } catch (err) {
      console.error("Error updating lead status:", err);
    }
  };

  // Delete Lead
  const handleDeleteLead = async (id: string, name: string) => {
    if (!window.confirm(`Delete lead from "${name}"?`)) return;

    try {
      const res = await fetch(`/api/leads?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead(null);
        }
        showToast("Lead inquiry removed.");
      }
    } catch (err) {
      console.error("Delete lead error:", err);
    }
  };

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesStatus =
      leadStatusFilter === "all" ? true : lead.status === leadStatusFilter;
    const q = leadSearchQuery.toLowerCase();
    const matchesSearch =
      !leadSearchQuery ||
      lead.name.toLowerCase().includes(q) ||
      lead.email.toLowerCase().includes(q) ||
      (lead.company && lead.company.toLowerCase().includes(q)) ||
      lead.service.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const newLeadsCount = leads.filter((l) => l.status === "new").length;

  // 1. Passcode Lock Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#021D15] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
        {/* Background Subtle Ambience */}
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
              className="w-full py-3.5 px-6 bg-[#C8A75A] text-[#021D15] font-sans text-sm font-semibold tracking-wide hover:bg-[#D7BC76] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-md"
            >
              Unlock Dashboard ↗
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#053827] flex items-center justify-between text-xs font-mono text-[#79AD98]">
            <Link
              href="/"
              className="hover:text-[#C8A75A] transition-colors flex items-center gap-1"
            >
              ← Back to site
            </Link>
            <span className="text-[#AFCDC1]/60">v1.2 Secure Sync</span>
          </div>
        </div>
      </div>
    );
  }

  // 2. Main Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-[#021D15] text-[#F7F4EC] flex flex-col font-sans selection:bg-[#C8A75A] selection:text-[#021D15]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#053827] border border-[#C8A75A] text-[#F7F4EC] px-5 py-3 shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <Radio className="w-4 h-4 text-[#C8A75A] animate-pulse" />
          <span className="text-xs font-mono">{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="border-b border-[#053827] bg-[#03291E]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="font-serif text-2xl tracking-tight text-[#F7F4EC] hover:text-[#C8A75A] transition-colors"
            >
              Vasanthaa<span className="text-[#C8A75A]">.</span>
            </Link>
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 bg-[#021D15] border border-[#0A4C38] text-[11px] font-mono text-[#AFCDC1]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Broadcast Sync Active (Zero Reload)</span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/"
              target="_blank"
              className="px-3.5 py-2 border border-[#0A4C38] bg-[#021D15] text-xs font-mono text-[#AFCDC1] hover:text-[#C8A75A] hover:border-[#C8A75A] transition-all flex items-center gap-1.5"
              title="Open website in new tab to test real-time reflection"
            >
              <span>Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="px-3 py-2 text-xs font-mono text-[#79AD98] hover:text-rose-400 transition-colors flex items-center gap-1.5"
              title="Sign out of admin"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 sm:gap-4 -mb-[1px]">
          <button
            onClick={() => setActiveTab("testimonials")}
            className={`pb-3 pt-1 px-3 sm:px-4 text-xs font-mono uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all ${
              activeTab === "testimonials"
                ? "border-[#C8A75A] text-[#C8A75A] font-semibold"
                : "border-transparent text-[#79AD98] hover:text-[#F7F4EC]"
            }`}
          >
            <MessageSquareQuote className="w-4 h-4" />
            <span>Testimonials</span>
            <span className="ml-1 px-1.5 py-0.2 bg-[#053827] text-[10px] text-[#AFCDC1]">
              {testimonials.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("leads")}
            className={`pb-3 pt-1 px-3 sm:px-4 text-xs font-mono uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all ${
              activeTab === "leads"
                ? "border-[#C8A75A] text-[#C8A75A] font-semibold"
                : "border-transparent text-[#79AD98] hover:text-[#F7F4EC]"
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Contact Leads</span>
            {newLeadsCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-[#C8A75A] text-[10px] text-[#021D15] font-bold">
                {newLeadsCount} new
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1 w-full">
        {/* =======================================================
            TAB 1: TESTIMONIALS CRUD
        ======================================================= */}
        {activeTab === "testimonials" && (
          <div className="space-y-6">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#03291E] border border-[#053827] p-4 sm:p-6">
              <div>
                <h2 className="font-serif text-2xl font-normal text-[#F7F4EC]">
                  Testimonials <span className="italic text-[#C8A75A]">Management</span>
                </h2>
                <p className="text-xs font-sans text-[#79AD98] mt-1 max-w-xl">
                  Add, edit, or delete endorsements. Any modification is instantly dispatched to all active website visitors without page reload.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={fetchTestimonials}
                  className="p-2.5 border border-[#0A4C38] bg-[#021D15] text-[#AFCDC1] hover:text-[#C8A75A] hover:border-[#C8A75A] transition-all"
                  title="Reload Testimonials"
                >
                  <RefreshCw className={`w-4 h-4 ${loadingTestimonials ? "animate-spin" : ""}`} />
                </button>
                <button
                  onClick={handleOpenAddModal}
                  className="px-4 py-2.5 bg-[#C8A75A] text-[#021D15] text-xs font-mono font-semibold uppercase tracking-wider hover:bg-[#D7BC76] transition-all flex items-center gap-2 shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Testimonial</span>
                </button>
              </div>
            </div>

            {/* Testimonials Grid / List */}
            {loadingTestimonials ? (
              <div className="py-20 text-center font-mono text-xs text-[#79AD98]">
                Fetching testimonials data...
              </div>
            ) : testimonials.length === 0 ? (
              <div className="bg-[#03291E] border border-[#053827] p-12 text-center">
                <MessageSquareQuote className="w-10 h-10 text-[#79AD98] mx-auto mb-3 opacity-60" />
                <p className="font-serif text-lg text-[#F7F4EC]">No testimonials found</p>
                <p className="text-xs font-sans text-[#AFCDC1] mt-1">
                  Click &ldquo;Add Testimonial&rdquo; to post your first client recommendation.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-[#03291E] border border-[#053827] p-6 sm:p-7 flex flex-col justify-between hover:border-[#0A4C38] transition-all relative group shadow-lg"
                  >
                    <div>
                      {/* Card Header: Discipline & Metric */}
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-[#79AD98]">
                            #{index + 1}
                          </span>
                          <span className="px-2 py-0.5 bg-[#021D15] border border-[#0A4C38] text-[10px] font-mono text-[#C8A75A] uppercase tracking-wider">
                            {item.discipline}
                          </span>
                        </div>

                        {item.highlightMetric && (
                          <span className="text-[11px] font-mono text-[#AFCDC1] bg-[#053827] px-2.5 py-0.5 border border-[#0A4C38]">
                            {item.highlightMetric}
                          </span>
                        )}
                      </div>

                      {/* Quote */}
                      <p className="font-serif italic text-base sm:text-lg text-[#F7F4EC] leading-relaxed mb-6 font-light">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                    </div>

                    {/* Footer: Author Info & Action Buttons */}
                    <div className="pt-4 border-t border-[#053827] flex items-end justify-between gap-4">
                      <div>
                        <div className="font-serif text-base text-[#F7F4EC]">
                          {item.author}
                        </div>
                        <div className="text-xs font-mono text-[#AFCDC1] mt-0.5">
                          {item.role} • <span className="text-[#C8A75A]">{item.company}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleOpenEditModal(item)}
                          className="p-2 border border-[#0A4C38] bg-[#021D15] text-[#AFCDC1] hover:text-[#C8A75A] hover:border-[#C8A75A] transition-all"
                          title="Edit"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteTestimonial(item.id, item.author)}
                          className="p-2 border border-[#0A4C38] bg-[#021D15] text-[#AFCDC1] hover:text-rose-400 hover:border-rose-400 transition-all"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* =======================================================
            TAB 2: CONTACT FORM LEADS
        ======================================================= */}
        {activeTab === "leads" && (
          <div className="space-y-6">
            {/* Top Toolbar */}
            <div className="bg-[#03291E] border border-[#053827] p-4 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl font-normal text-[#F7F4EC]">
                    Client Leads <span className="italic text-[#C8A75A]">& Inquiries</span>
                  </h2>
                  <p className="text-xs font-sans text-[#79AD98] mt-1">
                    Direct inquiries submitted via the website contact form, categorized and actionable.
                  </p>
                </div>

                <button
                  onClick={fetchLeads}
                  className="p-2.5 self-start sm:self-auto border border-[#0A4C38] bg-[#021D15] text-[#AFCDC1] hover:text-[#C8A75A] hover:border-[#C8A75A] transition-all"
                  title="Reload Leads"
                >
                  <RefreshCw className={`w-4 h-4 ${loadingLeads ? "animate-spin" : ""}`} />
                </button>
              </div>

              {/* Filters & Search */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2 border-t border-[#053827]">
                {/* Status Filter Badges */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                  {(["all", "new", "contacted", "archived"] as const).map((filter) => {
                    const count =
                      filter === "all"
                        ? leads.length
                        : leads.filter((l) => l.status === filter).length;
                    return (
                      <button
                        key={filter}
                        onClick={() => setLeadStatusFilter(filter)}
                        className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
                          leadStatusFilter === filter
                            ? "bg-[#C8A75A] text-[#021D15] font-semibold"
                            : "bg-[#021D15] border border-[#0A4C38] text-[#AFCDC1] hover:text-[#F7F4EC]"
                        }`}
                      >
                        {filter} ({count})
                      </button>
                    );
                  })}
                </div>

                {/* Search Bar */}
                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-[#79AD98] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={leadSearchQuery}
                    onChange={(e) => setLeadSearchQuery(e.target.value)}
                    placeholder="Search leads..."
                    className="w-full bg-[#021D15] border border-[#0A4C38] pl-9 pr-3 py-1.5 text-xs text-[#F7F4EC] placeholder-[#66736E] focus:outline-none focus:border-[#C8A75A] transition-colors"
                  />
                  {leadSearchQuery && (
                    <button
                      onClick={() => setLeadSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#79AD98] hover:text-[#F7F4EC]"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Leads List / Table */}
            {loadingLeads ? (
              <div className="py-20 text-center font-mono text-xs text-[#79AD98]">
                Loading inquiries...
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="bg-[#03291E] border border-[#053827] p-12 text-center">
                <Inbox className="w-10 h-10 text-[#79AD98] mx-auto mb-3 opacity-60" />
                <p className="font-serif text-lg text-[#F7F4EC]">No inquiries found</p>
                <p className="text-xs font-sans text-[#AFCDC1] mt-1">
                  {leadSearchQuery
                    ? "Try adjusting your search criteria or status filter."
                    : "New inquiries will appear here automatically when clients submit the contact form."}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="bg-[#03291E] border border-[#053827] p-4 sm:p-5 hover:border-[#0A4C38] transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    {/* Lead Info */}
                    <div className="space-y-1.5 max-w-2xl">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="font-serif text-lg text-[#F7F4EC] font-medium">
                          {lead.name}
                        </span>
                        {lead.company && (
                          <span className="text-xs font-mono text-[#C8A75A]">
                            @{lead.company}
                          </span>
                        )}
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 uppercase tracking-wider ${
                            lead.status === "new"
                              ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                              : lead.status === "contacted"
                              ? "bg-blue-950 text-blue-300 border border-blue-800"
                              : "bg-stone-900 text-stone-400 border border-stone-800"
                          }`}
                        >
                          {lead.status}
                        </span>
                        <span className="text-[10px] font-mono text-[#79AD98]">
                          {new Date(lead.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#AFCDC1]">
                        <span className="text-[#C8A75A] font-semibold">{lead.service}</span>
                        {lead.budget && (
                          <>
                            <span>•</span>
                            <span>{lead.budget}</span>
                          </>
                        )}
                      </div>

                      <p className="text-xs font-sans text-[#79AD98] line-clamp-2 mt-1">
                        {lead.details}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="px-3 py-1.5 bg-[#021D15] border border-[#0A4C38] text-xs font-mono text-[#AFCDC1] hover:text-[#C8A75A] hover:border-[#C8A75A] transition-all"
                      >
                        View Details
                      </button>

                      {lead.status === "new" ? (
                        <button
                          onClick={() => handleUpdateLeadStatus(lead.id, "contacted")}
                          className="p-1.5 bg-[#021D15] border border-[#0A4C38] text-emerald-400 hover:border-emerald-400 transition-all"
                          title="Mark as Contacted"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      ) : lead.status === "contacted" ? (
                        <button
                          onClick={() => handleUpdateLeadStatus(lead.id, "archived")}
                          className="p-1.5 bg-[#021D15] border border-[#0A4C38] text-stone-400 hover:border-stone-400 transition-all"
                          title="Archive Lead"
                        >
                          <Archive className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUpdateLeadStatus(lead.id, "new")}
                          className="p-1.5 bg-[#021D15] border border-[#0A4C38] text-blue-400 hover:border-blue-400 transition-all"
                          title="Re-open as New"
                        >
                          <Clock className="w-4 h-4" />
                        </button>
                      )}

                      <button
                        onClick={() => handleDeleteLead(lead.id, lead.name)}
                        className="p-1.5 bg-[#021D15] border border-[#0A4C38] text-[#79AD98] hover:text-rose-400 hover:border-rose-400 transition-all"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* =======================================================
          MODAL: ADD / EDIT TESTIMONIAL
      ======================================================= */}
      {testimonialModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#03291E] border border-[#053827] w-full max-w-xl p-6 sm:p-8 relative shadow-2xl my-8">
            <button
              onClick={() => setTestimonialModalOpen(false)}
              className="absolute top-5 right-5 text-[#79AD98] hover:text-[#F7F4EC] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#79AD98] block">
                {editingTestimonial ? "Edit Endorsement" : "Create Endorsement"}
              </span>
              <h3 className="font-serif text-2xl text-[#F7F4EC]">
                {editingTestimonial ? "Update Testimonial" : "New Client Testimonial"}
              </h3>
            </div>

            <form onSubmit={handleSaveTestimonial} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#79AD98] mb-1.5">
                  Client Quote *
                </label>
                <textarea
                  rows={4}
                  required
                  value={testimonialForm.quote || ""}
                  onChange={(e) =>
                    setTestimonialForm({ ...testimonialForm, quote: e.target.value })
                  }
                  placeholder="The scripts Vasanthaa crafted delivered our highest-performing reel series..."
                  className="w-full bg-[#021D15] border border-[#0A4C38] p-3 text-sm text-[#F7F4EC] placeholder-[#66736E] focus:outline-none focus:border-[#C8A75A] transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#79AD98] mb-1.5">
                    Author Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={testimonialForm.author || ""}
                    onChange={(e) =>
                      setTestimonialForm({ ...testimonialForm, author: e.target.value })
                    }
                    placeholder="e.g. Vasanthaa"
                    className="w-full bg-[#021D15] border border-[#0A4C38] px-3 py-2 text-sm text-[#F7F4EC] placeholder-[#66736E] focus:outline-none focus:border-[#C8A75A] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#79AD98] mb-1.5">
                    Role / Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={testimonialForm.role || ""}
                    onChange={(e) =>
                      setTestimonialForm({ ...testimonialForm, role: e.target.value })
                    }
                    placeholder="e.g. Creative Producer"
                    className="w-full bg-[#021D15] border border-[#0A4C38] px-3 py-2 text-sm text-[#F7F4EC] placeholder-[#66736E] focus:outline-none focus:border-[#C8A75A] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#79AD98] mb-1.5">
                    Company / Brand *
                  </label>
                  <input
                    type="text"
                    required
                    value={testimonialForm.company || ""}
                    onChange={(e) =>
                      setTestimonialForm({ ...testimonialForm, company: e.target.value })
                    }
                    placeholder="e.g. Bloom Digital"
                    className="w-full bg-[#021D15] border border-[#0A4C38] px-3 py-2 text-sm text-[#F7F4EC] placeholder-[#66736E] focus:outline-none focus:border-[#C8A75A] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#79AD98] mb-1.5">
                    Discipline / Category
                  </label>
                  <input
                    type="text"
                    value={testimonialForm.discipline || ""}
                    onChange={(e) =>
                      setTestimonialForm({ ...testimonialForm, discipline: e.target.value })
                    }
                    placeholder="e.g. Content Strategy & Scripts"
                    className="w-full bg-[#021D15] border border-[#0A4C38] px-3 py-2 text-sm text-[#F7F4EC] placeholder-[#66736E] focus:outline-none focus:border-[#C8A75A] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#79AD98] mb-1.5">
                    Highlight Metric (Optional)
                  </label>
                  <input
                    type="text"
                    value={testimonialForm.highlightMetric || ""}
                    onChange={(e) =>
                      setTestimonialForm({
                        ...testimonialForm,
                        highlightMetric: e.target.value,
                      })
                    }
                    placeholder="e.g. +42% Watch Time"
                    className="w-full bg-[#021D15] border border-[#0A4C38] px-3 py-2 text-sm text-[#F7F4EC] placeholder-[#66736E] focus:outline-none focus:border-[#C8A75A] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#79AD98] mb-1.5">
                    Rating (Stars)
                  </label>
                  <div className="flex items-center gap-1.5 py-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() =>
                          setTestimonialForm({ ...testimonialForm, rating: star })
                        }
                        className="text-[#C8A75A] hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            (testimonialForm.rating || 5) >= star
                              ? "fill-[#C8A75A]"
                              : "text-[#0A4C38]"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#053827]">
                <button
                  type="button"
                  onClick={() => setTestimonialModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-mono uppercase tracking-wider text-[#79AD98] hover:text-[#F7F4EC] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#C8A75A] text-[#021D15] text-xs font-mono font-semibold uppercase tracking-wider hover:bg-[#D7BC76] transition-all flex items-center gap-2 shadow-md"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingTestimonial ? "Update & Sync" : "Save & Publish"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =======================================================
          MODAL: VIEW LEAD DETAILS
      ======================================================= */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#03291E] border border-[#053827] w-full max-w-xl p-6 sm:p-8 relative shadow-2xl my-8 space-y-6">
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-5 right-5 text-[#79AD98] hover:text-[#F7F4EC] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#79AD98]">
                  Lead Inquiry Details
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.2 uppercase tracking-wider ${
                    selectedLead.status === "new"
                      ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                      : selectedLead.status === "contacted"
                      ? "bg-blue-950 text-blue-300 border border-blue-800"
                      : "bg-stone-900 text-stone-400 border border-stone-800"
                  }`}
                >
                  {selectedLead.status}
                </span>
              </div>
              <h3 className="font-serif text-2xl text-[#F7F4EC]">{selectedLead.name}</h3>
              {selectedLead.company && (
                <p className="text-xs font-mono text-[#C8A75A] mt-0.5">
                  {selectedLead.company}
                </p>
              )}
            </div>

            {/* Contact Details Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={`mailto:${selectedLead.email}`}
                className="p-3 bg-[#021D15] border border-[#0A4C38] flex items-center gap-3 hover:border-[#C8A75A] transition-colors group"
              >
                <Mail className="w-4 h-4 text-[#C8A75A] group-hover:scale-110 transition-transform" />
                <div className="truncate">
                  <span className="text-[10px] font-mono uppercase text-[#79AD98] block">Email</span>
                  <span className="text-xs font-mono text-[#F7F4EC] truncate block">
                    {selectedLead.email}
                  </span>
                </div>
              </a>

              {selectedLead.phone ? (
                <a
                  href={`tel:${selectedLead.phone}`}
                  className="p-3 bg-[#021D15] border border-[#0A4C38] flex items-center gap-3 hover:border-[#C8A75A] transition-colors group"
                >
                  <Phone className="w-4 h-4 text-[#C8A75A] group-hover:scale-110 transition-transform" />
                  <div className="truncate">
                    <span className="text-[10px] font-mono uppercase text-[#79AD98] block">Phone</span>
                    <span className="text-xs font-mono text-[#F7F4EC] truncate block">
                      {selectedLead.phone}
                    </span>
                  </div>
                </a>
              ) : (
                <div className="p-3 bg-[#021D15] border border-[#0A4C38]/50 flex items-center gap-3 opacity-60">
                  <Phone className="w-4 h-4 text-[#79AD98]" />
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#79AD98] block">Phone</span>
                    <span className="text-xs font-mono text-[#AFCDC1] block">Not provided</span>
                  </div>
                </div>
              )}
            </div>

            {/* Service & Budget */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-[#021D15] border border-[#0A4C38]">
                <span className="text-[10px] font-mono uppercase text-[#79AD98] block">Requested Service</span>
                <span className="text-xs font-mono text-[#C8A75A] font-semibold block mt-0.5">
                  {selectedLead.service}
                </span>
              </div>

              <div className="p-3 bg-[#021D15] border border-[#0A4C38]">
                <span className="text-[10px] font-mono uppercase text-[#79AD98] block">Project Budget</span>
                <span className="text-xs font-mono text-[#F7F4EC] font-semibold block mt-0.5">
                  {selectedLead.budget || "Flexible / Not stated"}
                </span>
              </div>
            </div>

            {/* Message / Scope */}
            <div>
              <span className="text-[10px] font-mono uppercase text-[#79AD98] block mb-2">
                Project Scope & Details
              </span>
              <div className="p-4 bg-[#021D15] border border-[#0A4C38] text-sm text-[#F7F4EC] font-sans leading-relaxed whitespace-pre-wrap">
                {selectedLead.details}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-[#053827] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {selectedLead.status !== "contacted" && (
                  <button
                    onClick={() => handleUpdateLeadStatus(selectedLead.id, "contacted")}
                    className="px-3 py-2 bg-[#021D15] border border-blue-700 text-blue-300 text-xs font-mono hover:bg-blue-950 transition-colors"
                  >
                    Mark Contacted
                  </button>
                )}
                {selectedLead.status !== "archived" && (
                  <button
                    onClick={() => handleUpdateLeadStatus(selectedLead.id, "archived")}
                    className="px-3 py-2 bg-[#021D15] border border-stone-700 text-stone-300 text-xs font-mono hover:bg-stone-900 transition-colors"
                  >
                    Archive
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${selectedLead.email}?subject=Regarding your project inquiry - Vasanthaa`}
                  className="px-4 py-2 bg-[#C8A75A] text-[#021D15] text-xs font-mono font-semibold uppercase hover:bg-[#D7BC76] transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
