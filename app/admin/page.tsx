"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  MessageSquareQuote,
  Inbox,
  Radio,
  ArrowRight,
  Plus,
  Clock,
  RefreshCw,
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

export default function AdminOverviewPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  // Manual refresh callback
  const handleRefresh = useCallback(() => {
    setLoading(true);
    Promise.all([fetch("/api/testimonials"), fetch("/api/leads")])
      .then(async ([testRes, leadRes]) => {
        const testData = await testRes.json();
        const leadData = await leadRes.json();
        if (testData.success && Array.isArray(testData.testimonials)) {
          setTestimonials(testData.testimonials);
        }
        if (leadData.success && Array.isArray(leadData.leads)) {
          setLeads(leadData.leads);
        }
      })
      .catch((err) => console.error("Refresh error:", err))
      .finally(() => setLoading(false));
  }, []);

  // Initial load
  useEffect(() => {
    let cancelled = false;
    Promise.all([fetch("/api/testimonials"), fetch("/api/leads")])
      .then(async ([testRes, leadRes]) => {
        const testData = await testRes.json();
        const leadData = await leadRes.json();
        if (!cancelled) {
          if (testData.success && Array.isArray(testData.testimonials)) {
            setTestimonials(testData.testimonials);
          }
          if (leadData.success && Array.isArray(leadData.leads)) {
            setLeads(leadData.leads);
          }
        }
      })
      .catch((err) => console.error("Dashboard load error:", err))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const newLeads = leads.filter((l) => l.status === "new");
  const contactedLeads = leads.filter((l) => l.status === "contacted");

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-[#03291E] border border-[#053827] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden shadow-xl">
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C8A75A] animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#79AD98]">
              Executive Studio Overview
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#F7F4EC]">
            Welcome back, <span className="italic text-[#C8A75A]">Vasanthaa</span>
          </h1>
          <p className="text-xs sm:text-sm font-sans text-[#AFCDC1] max-w-xl">
            Manage your endorsements and inbound client briefs. Content updates made in your studio synchronize to website visitors in real-time without reloading the page.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <button
            onClick={handleRefresh}
            className="p-3 border border-[#0A4C38] bg-[#021D15] text-[#AFCDC1] hover:text-[#C8A75A] hover:border-[#C8A75A] transition-all"
            title="Refresh statistics"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <Link
            href="/admin/testimonials?action=new"
            className="px-4 py-3 bg-[#C8A75A] text-[#021D15] text-xs font-mono font-semibold uppercase tracking-wider hover:bg-[#D7BC76] transition-all flex items-center gap-2 shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add Testimonial</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Metric 1: Testimonials */}
        <Link
          href="/admin/testimonials"
          className="bg-[#03291E] border border-[#053827] p-5 sm:p-6 hover:border-[#C8A75A] transition-all group relative flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#79AD98]">
              Live Endorsements
            </span>
            <div className="w-8 h-8 border border-[#0A4C38] bg-[#021D15] flex items-center justify-center text-[#C8A75A] group-hover:border-[#C8A75A] transition-colors">
              <MessageSquareQuote className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="font-serif text-3xl sm:text-4xl text-[#F7F4EC]">
              {loading ? "..." : testimonials.length}
            </div>
            <div className="text-xs font-mono text-[#AFCDC1] mt-1 flex items-center justify-between">
              <span>Published reviews</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C8A75A] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>

        {/* Metric 2: New Inquiries */}
        <Link
          href="/admin/leads?status=new"
          className="bg-[#03291E] border border-[#053827] p-5 sm:p-6 hover:border-[#C8A75A] transition-all group relative flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#79AD98]">
              New Inquiries
            </span>
            <div className="w-8 h-8 border border-emerald-800 bg-emerald-950 flex items-center justify-center text-emerald-400">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="font-serif text-3xl sm:text-4xl text-emerald-400">
              {loading ? "..." : newLeads.length}
            </div>
            <div className="text-xs font-mono text-[#AFCDC1] mt-1 flex items-center justify-between">
              <span>Awaiting response</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>

        {/* Metric 3: Total Leads */}
        <Link
          href="/admin/leads"
          className="bg-[#03291E] border border-[#053827] p-5 sm:p-6 hover:border-[#C8A75A] transition-all group relative flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#79AD98]">
              Total Inquiries
            </span>
            <div className="w-8 h-8 border border-[#0A4C38] bg-[#021D15] flex items-center justify-center text-[#AFCDC1]">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="font-serif text-3xl sm:text-4xl text-[#F7F4EC]">
              {loading ? "..." : leads.length}
            </div>
            <div className="text-xs font-mono text-[#AFCDC1] mt-1 flex items-center justify-between">
              <span>{contactedLeads.length} contacted</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C8A75A] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>

        {/* Metric 4: Real-time Sync Engine */}
        <div className="bg-[#03291E] border border-[#053827] p-5 sm:p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#79AD98]">
              Sync Engine
            </span>
            <div className="w-8 h-8 border border-[#C8A75A] bg-[#053827] flex items-center justify-center text-[#C8A75A]">
              <Radio className="w-4 h-4 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="font-serif text-xl sm:text-2xl text-[#C8A75A]">
              Sub-Second
            </div>
            <div className="text-xs font-mono text-[#79AD98] mt-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>BroadcastChannel 0-reload</span>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Section: Recent Leads & Recent Testimonials */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Recent Inquiries */}
        <div className="bg-[#03291E] border border-[#053827] p-6 sm:p-7 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#053827]">
            <div className="flex items-center gap-2.5">
              <Inbox className="w-5 h-5 text-[#C8A75A]" />
              <h2 className="font-serif text-xl text-[#F7F4EC]">Recent Inquiries</h2>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs font-mono uppercase text-[#C8A75A] hover:underline flex items-center gap-1"
            >
              <span>View All ({leads.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="py-8 text-center font-mono text-xs text-[#79AD98]">
              Loading inquiries...
            </div>
          ) : leads.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono text-[#AFCDC1]">
              No inquiries yet. Submissions from `/contact` appear here automatically.
            </div>
          ) : (
            <div className="space-y-3">
              {leads.slice(0, 3).map((lead) => (
                <div
                  key={lead.id}
                  className="p-4 bg-[#021D15] border border-[#0A4C38] flex items-start justify-between gap-4"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-base text-[#F7F4EC] truncate">
                        {lead.name}
                      </span>
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.2 uppercase ${
                          lead.status === "new"
                            ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                            : lead.status === "contacted"
                            ? "bg-blue-950 text-blue-300 border border-blue-800"
                            : "bg-stone-900 text-stone-400 border border-stone-800"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-[#AFCDC1]">
                      {lead.service} {lead.company ? `• @${lead.company}` : ""}
                    </p>
                    <p className="text-xs font-sans text-[#79AD98] line-clamp-1">
                      {lead.details}
                    </p>
                  </div>

                  <Link
                    href={`/admin/leads?id=${lead.id}`}
                    className="shrink-0 p-2 text-xs font-mono border border-[#0A4C38] text-[#AFCDC1] hover:text-[#C8A75A] hover:border-[#C8A75A]"
                  >
                    View
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Recent Testimonials */}
        <div className="bg-[#03291E] border border-[#053827] p-6 sm:p-7 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#053827]">
            <div className="flex items-center gap-2.5">
              <MessageSquareQuote className="w-5 h-5 text-[#C8A75A]" />
              <h2 className="font-serif text-xl text-[#F7F4EC]">Testimonials Showcase</h2>
            </div>
            <Link
              href="/admin/testimonials"
              className="text-xs font-mono uppercase text-[#C8A75A] hover:underline flex items-center gap-1"
            >
              <span>Manage All ({testimonials.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="py-8 text-center font-mono text-xs text-[#79AD98]">
              Loading testimonials...
            </div>
          ) : testimonials.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono text-[#AFCDC1]">
              No testimonials created. Click &ldquo;Add Testimonial&rdquo; to publish one.
            </div>
          ) : (
            <div className="space-y-3">
              {testimonials.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-[#021D15] border border-[#0A4C38] flex items-start justify-between gap-4"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-base text-[#F7F4EC] truncate">
                        {item.author}
                      </span>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 uppercase bg-[#053827] text-[#C8A75A] border border-[#0A4C38]">
                        {item.discipline}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-[#AFCDC1]">
                      {item.role} • {item.company}
                    </p>
                    <p className="text-xs font-serif italic text-[#79AD98] line-clamp-1">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  <Link
                    href={`/admin/testimonials?edit=${item.id}`}
                    className="shrink-0 p-2 text-xs font-mono border border-[#0A4C38] text-[#AFCDC1] hover:text-[#C8A75A] hover:border-[#C8A75A]"
                  >
                    Edit
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
