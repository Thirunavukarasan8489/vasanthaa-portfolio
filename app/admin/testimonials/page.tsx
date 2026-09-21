"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  MessageSquareQuote,
  Plus,
  Pencil,
  Trash2,
  RefreshCw,
  Search,
  Check,
  X,
  Radio,
  Star,
} from "lucide-react";
import { Testimonial } from "@/data/testimonials";

function TestimonialsContent() {
  const searchParams = useSearchParams();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [form, setForm] = useState<Partial<Testimonial>>({
    quote: "",
    author: "",
    role: "",
    company: "",
    discipline: "Content Strategy & Scripts",
    highlightMetric: "",
    rating: 5,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Broadcast channel for real-time front page sync
  const broadcastUpdate = (updatedList: Testimonial[]) => {
    try {
      const channel = new BroadcastChannel("portfolio-testimonials-sync");
      channel.postMessage({ type: "UPDATE", testimonials: updatedList });
      channel.close();
    } catch {}
    try {
      localStorage.setItem("portfolio-testimonials-sync", JSON.stringify(updatedList));
    } catch {}
  };

  // Manual refresh callback
  const handleRefresh = useCallback(() => {
    setLoading(true);
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.testimonials)) {
          setTestimonials(data.testimonials);
        }
      })
      .catch((err) => console.error("Error refreshing testimonials:", err))
      .finally(() => setLoading(false));
  }, []);

  // Initial load and URL query param initialization
  useEffect(() => {
    let cancelled = false;
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && data.success && Array.isArray(data.testimonials)) {
          setTestimonials(data.testimonials);

          // Check URL query parameters (?action=new or ?edit=id)
          const actionParam = searchParams.get("action");
          const editId = searchParams.get("edit");

          if (actionParam === "new") {
            setEditingItem(null);
            setForm({
              quote: "",
              author: "",
              role: "",
              company: "",
              discipline: "Content Strategy & Scripts",
              highlightMetric: "",
              rating: 5,
            });
            setModalOpen(true);
          } else if (editId) {
            const found = data.testimonials.find((t: Testimonial) => t.id === editId);
            if (found) {
              setEditingItem(found);
              setForm(found);
              setModalOpen(true);
            }
          }
        }
      })
      .catch((err) => console.error("Error fetching testimonials:", err))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [searchParams]);

  // Open modal for new
  const handleOpenAdd = () => {
    setEditingItem(null);
    setForm({
      quote: "",
      author: "",
      role: "",
      company: "",
      discipline: "Content Strategy & Scripts",
      highlightMetric: "",
      rating: 5,
    });
    setModalOpen(true);
  };

  // Open modal for edit
  const handleOpenEdit = (item: Testimonial) => {
    setEditingItem(item);
    setForm(item);
    setModalOpen(true);
  };

  // Save (Create or Update)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.quote || !form.author) {
      alert("Please fill in both the quote and the author name.");
      return;
    }

    try {
      if (editingItem) {
        // PUT update
        const payload = {
          ...form,
          id: editingItem.id,
        };
        const res = await fetch("/api/testimonials", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success && data.testimonials) {
          setTestimonials(data.testimonials);
          broadcastUpdate(data.testimonials);
          setModalOpen(false);
          showToast("⚡ Testimonial updated! Synced to homepage in under 0.1s.");
        } else {
          alert(data.error || "Failed to update testimonial");
        }
      } else {
        // POST create
        const res = await fetch("/api/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (data.success && data.testimonials) {
          setTestimonials(data.testimonials);
          broadcastUpdate(data.testimonials);
          setModalOpen(false);
          showToast("⚡ New testimonial added! Front page updated instantly.");
        } else {
          alert(data.error || "Failed to create testimonial");
        }
      }
    } catch (err) {
      console.error("Save error:", err);
      alert("Network error while saving testimonial");
    }
  };

  // Delete
  const handleDelete = async (id: string, author: string) => {
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
        broadcastUpdate(data.testimonials);
        showToast("🗑️ Testimonial deleted! Reflected instantly on homepage.");
      } else {
        alert(data.error || "Failed to delete testimonial");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting testimonial");
    }
  };

  const filteredTestimonials = testimonials.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      !searchQuery ||
      item.author.toLowerCase().includes(q) ||
      item.company.toLowerCase().includes(q) ||
      item.discipline.toLowerCase().includes(q) ||
      item.quote.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#053827] border border-[#C8A75A] text-[#F7F4EC] px-5 py-3 shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <Radio className="w-4 h-4 text-[#C8A75A] animate-pulse" />
          <span className="text-xs font-mono">{toastMessage}</span>
        </div>
      )}

      {/* Top Header & Actions Toolbar */}
      <div className="bg-[#03291E] border border-[#053827] p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#F7F4EC]">
              Testimonials <span className="italic text-[#C8A75A]">Studio</span>
            </h1>
            <p className="text-xs font-sans text-[#79AD98] mt-1 max-w-xl">
              Add, update, or remove client quotes and performance metrics. Changes are broadcasted to active visitors in real-time without reloading the page.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              className="p-2.5 border border-[#0A4C38] bg-[#021D15] text-[#AFCDC1] hover:text-[#C8A75A] hover:border-[#C8A75A] transition-all"
              title="Reload Testimonials"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2.5 bg-[#C8A75A] text-[#021D15] text-xs font-mono font-semibold uppercase tracking-wider hover:bg-[#D7BC76] transition-all flex items-center gap-2 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add Testimonial</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="pt-3 border-t border-[#053827] flex items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-3.5 h-3.5 text-[#79AD98] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by author, company, quote..."
              className="w-full bg-[#021D15] border border-[#0A4C38] pl-9 pr-3 py-2 text-xs text-[#F7F4EC] placeholder-[#66736E] focus:outline-none focus:border-[#C8A75A] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#79AD98] hover:text-[#F7F4EC]"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="text-xs font-mono text-[#79AD98] hidden sm:block">
            Showing {filteredTestimonials.length} of {testimonials.length} endorsements
          </div>
        </div>
      </div>

      {/* Testimonials Grid */}
      {loading ? (
        <div className="py-20 text-center font-mono text-xs text-[#79AD98]">
          Fetching testimonials data...
        </div>
      ) : filteredTestimonials.length === 0 ? (
        <div className="bg-[#03291E] border border-[#053827] p-12 text-center">
          <MessageSquareQuote className="w-10 h-10 text-[#79AD98] mx-auto mb-3 opacity-60" />
          <p className="font-serif text-lg text-[#F7F4EC]">No testimonials found</p>
          <p className="text-xs font-sans text-[#AFCDC1] mt-1">
            {searchQuery
              ? "Try adjusting your search criteria."
              : "Click \"Add Testimonial\" to post your first client recommendation."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTestimonials.map((item, index) => (
            <div
              key={item.id}
              className="bg-[#03291E] border border-[#053827] p-6 sm:p-7 flex flex-col justify-between hover:border-[#0A4C38] transition-all relative group shadow-lg"
            >
              <div>
                {/* Header: Discipline & Highlight Metric */}
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

              {/* Footer: Author Info & Actions */}
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
                    onClick={() => handleOpenEdit(item)}
                    className="p-2 border border-[#0A4C38] bg-[#021D15] text-[#AFCDC1] hover:text-[#C8A75A] hover:border-[#C8A75A] transition-all"
                    title="Edit"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.author)}
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

      {/* Modal: Add / Edit Testimonial */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#03291E] border border-[#053827] w-full max-w-xl p-6 sm:p-8 relative shadow-2xl my-8">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-[#79AD98] hover:text-[#F7F4EC] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#79AD98] block">
                {editingItem ? "Edit Endorsement" : "Create Endorsement"}
              </span>
              <h3 className="font-serif text-2xl text-[#F7F4EC]">
                {editingItem ? "Update Testimonial" : "New Client Testimonial"}
              </h3>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#79AD98] mb-1.5">
                  Client Quote *
                </label>
                <textarea
                  rows={4}
                  required
                  value={form.quote || ""}
                  onChange={(e) => setForm({ ...form, quote: e.target.value })}
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
                    value={form.author || ""}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
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
                    value={form.role || ""}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
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
                    value={form.company || ""}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
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
                    value={form.discipline || ""}
                    onChange={(e) => setForm({ ...form, discipline: e.target.value })}
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
                    value={form.highlightMetric || ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
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
                        onClick={() => setForm({ ...form, rating: star })}
                        className="text-[#C8A75A] hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            (form.rating || 5) >= star
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
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-mono uppercase tracking-wider text-[#79AD98] hover:text-[#F7F4EC] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#C8A75A] text-[#021D15] text-xs font-mono font-semibold uppercase tracking-wider hover:bg-[#D7BC76] transition-all flex items-center gap-2 shadow-md"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingItem ? "Update & Sync" : "Save & Publish"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TestimonialsStudioPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center font-mono text-xs text-[#79AD98]">
          Loading testimonials studio...
        </div>
      }
    >
      <TestimonialsContent />
    </Suspense>
  );
}
