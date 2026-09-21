"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Inbox,
  Search,
  CheckCircle2,
  Clock,
  Archive,
  Trash2,
  RefreshCw,
  Mail,
  Phone,
  X,
  Radio,
} from "lucide-react";

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

function LeadsContent() {
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status");
  const initialStatus =
    statusParam && ["all", "new", "contacted", "archived"].includes(statusParam)
      ? (statusParam as "all" | "new" | "contacted" | "archived")
      : "all";

  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<"all" | "new" | "contacted" | "archived">(initialStatus);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Manual refresh callback
  const handleRefresh = useCallback(() => {
    setLoading(true);
    fetch("/api/leads")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.leads)) {
          setLeads(data.leads);
        }
      })
      .catch((err) => console.error("Error refreshing leads:", err))
      .finally(() => setLoading(false));
  }, []);

  // Initial load and URL query param initialization
  useEffect(() => {
    let cancelled = false;
    fetch("/api/leads")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && data.success && Array.isArray(data.leads)) {
          setLeads(data.leads);

          // If ?id= is in URL, open modal
          const idParam = searchParams.get("id");
          if (idParam) {
            const found = data.leads.find((l: Lead) => l.id === idParam);
            if (found) {
              setSelectedLead(found);
            }
          }
        }
      })
      .catch((err) => console.error("Error fetching leads:", err))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [searchParams]);

  // Update Status
  const handleUpdateStatus = async (id: string, status: "new" | "contacted" | "archived") => {
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
  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete inquiry from "${name}"?`)) return;

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
      console.error("Delete error:", err);
    }
  };

  // Filtering
  const filteredLeads = leads.filter((lead) => {
    const matchesStatus =
      statusFilter === "all" ? true : lead.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      lead.name.toLowerCase().includes(q) ||
      lead.email.toLowerCase().includes(q) ||
      (lead.company && lead.company.toLowerCase().includes(q)) ||
      lead.service.toLowerCase().includes(q) ||
      lead.details.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
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
              Client Leads <span className="italic text-[#C8A75A]">& Inquiries</span>
            </h1>
            <p className="text-xs font-sans text-[#79AD98] mt-1 max-w-xl">
              Direct project submissions from the website contact brief form. Review project scopes, manage follow-up states, and reach out directly.
            </p>
          </div>

          <button
            onClick={handleRefresh}
            className="p-2.5 self-start sm:self-auto border border-[#0A4C38] bg-[#021D15] text-[#AFCDC1] hover:text-[#C8A75A] hover:border-[#C8A75A] transition-all"
            title="Reload Leads"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-3 border-t border-[#053827]">
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
                  onClick={() => setStatusFilter(filter)}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
                    statusFilter === filter
                      ? "bg-[#C8A75A] text-[#021D15] font-semibold shadow-sm"
                      : "bg-[#021D15] border border-[#0A4C38] text-[#AFCDC1] hover:text-[#F7F4EC]"
                  }`}
                >
                  {filter} ({count})
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-[#79AD98] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search leads by name, email, scope..."
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
        </div>
      </div>

      {/* Leads List */}
      {loading ? (
        <div className="py-20 text-center font-mono text-xs text-[#79AD98]">
          Loading client leads...
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="bg-[#03291E] border border-[#053827] p-12 text-center">
          <Inbox className="w-10 h-10 text-[#79AD98] mx-auto mb-3 opacity-60" />
          <p className="font-serif text-lg text-[#F7F4EC]">No inquiries found</p>
          <p className="text-xs font-sans text-[#AFCDC1] mt-1">
            {searchQuery
              ? "Try adjusting your search criteria or status filter."
              : "Inbound briefs submitted via `/contact` will appear here automatically."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredLeads.map((lead) => (
            <div
              key={lead.id}
              className="bg-[#03291E] border border-[#053827] p-5 hover:border-[#0A4C38] transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md"
            >
              {/* Lead Information */}
              <div className="space-y-1.5 max-w-3xl">
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
                  {lead.phone && (
                    <>
                      <span>•</span>
                      <span>{lead.phone}</span>
                    </>
                  )}
                </div>

                <p className="text-xs font-sans text-[#79AD98] line-clamp-2 mt-1">
                  {lead.details}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                <button
                  onClick={() => setSelectedLead(lead)}
                  className="px-3 py-1.5 bg-[#021D15] border border-[#0A4C38] text-xs font-mono text-[#AFCDC1] hover:text-[#C8A75A] hover:border-[#C8A75A] transition-all"
                >
                  View Details
                </button>

                {lead.status === "new" ? (
                  <button
                    onClick={() => handleUpdateStatus(lead.id, "contacted")}
                    className="p-1.5 bg-[#021D15] border border-[#0A4C38] text-emerald-400 hover:border-emerald-400 transition-all"
                    title="Mark as Contacted"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                ) : lead.status === "contacted" ? (
                  <button
                    onClick={() => handleUpdateStatus(lead.id, "archived")}
                    className="p-1.5 bg-[#021D15] border border-[#0A4C38] text-stone-400 hover:border-stone-400 transition-all"
                    title="Archive Lead"
                  >
                    <Archive className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleUpdateStatus(lead.id, "new")}
                    className="p-1.5 bg-[#021D15] border border-[#0A4C38] text-blue-400 hover:border-blue-400 transition-all"
                    title="Re-open as New"
                  >
                    <Clock className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={() => handleDelete(lead.id, lead.name)}
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

      {/* Modal: View Details */}
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
                  Inquiry Details
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

            {/* Contact Cards */}
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
                    <span className="text-[10px] font-mono uppercase text-[#79AD98] block">Phone / WhatsApp</span>
                    <span className="text-xs font-mono text-[#F7F4EC] truncate block">
                      {selectedLead.phone}
                    </span>
                  </div>
                </a>
              ) : (
                <div className="p-3 bg-[#021D15] border border-[#0A4C38]/50 flex items-center gap-3 opacity-60">
                  <Phone className="w-4 h-4 text-[#79AD98]" />
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#79AD98] block">Phone / WhatsApp</span>
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

            {/* Project Scope */}
            <div>
              <span className="text-[10px] font-mono uppercase text-[#79AD98] block mb-2">
                Project Scope & Details
              </span>
              <div className="p-4 bg-[#021D15] border border-[#0A4C38] text-sm text-[#F7F4EC] font-sans leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
                {selectedLead.details}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#053827] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {selectedLead.status !== "contacted" && (
                  <button
                    onClick={() => handleUpdateStatus(selectedLead.id, "contacted")}
                    className="px-3 py-2 bg-[#021D15] border border-blue-700 text-blue-300 text-xs font-mono hover:bg-blue-950 transition-colors"
                  >
                    Mark Contacted
                  </button>
                )}
                {selectedLead.status !== "archived" && (
                  <button
                    onClick={() => handleUpdateStatus(selectedLead.id, "archived")}
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

export default function LeadsPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center font-mono text-xs text-[#79AD98]">
          Loading client inquiries...
        </div>
      }
    >
      <LeadsContent />
    </Suspense>
  );
}
