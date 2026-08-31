"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Trash2, ShieldCheck, Mail, Phone, Calendar, Landmark, Briefcase } from "lucide-react";

export default function LeadDetailPage({ params }) {
  const { id } = params;
  const [lead, setLead] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const verifyAdmin = async () => {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      if (data.success && data.user?.role === "ADMIN") {
        setIsAdmin(true);
        fetchLeadDetails();
      } else {
        window.location.href = "/login";
      }
    } catch (err) {
      console.error("Admin verification error:", err);
      window.location.href = "/login";
    }
  };

  const fetchLeadDetails = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/leads/${id}`);
      const data = await res.json();
      if (data.success) {
        setLead(data.lead);
      } else {
        alert(data.error || "Lead not found");
      }
    } catch (err) {
      console.error("Failed to load lead details:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    verifyAdmin();
  }, []);

  const handleStatusChange = async (newStatus) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setLead((prev) => ({ ...prev, status: newStatus }));
      } else {
        alert(data.error || "Failed to update status");
      }
    } catch (err) {
      alert("Error updating status: " + err.message);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this enquiry log?")) return;
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (res.ok && data.success) {
        window.location.href = "/admin/leads";
      } else {
        alert(data.error || "Failed to delete lead");
      }
    } catch (err) {
      alert("Error deleting lead: " + err.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "NEW":
        return "bg-cyan-50 border-cyan-200 text-cyan-800";
      case "CONTACTED":
        return "bg-blue-50 border-blue-200 text-blue-800";
      case "QUALIFIED":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      case "PROPOSAL":
        return "bg-purple-50 border-purple-200 text-purple-800";
      case "WON":
        return "bg-emerald-50 border-emerald-200 text-emerald-800";
      case "LOST":
        return "bg-red-50 border-red-200 text-red-800";
      default:
        return "bg-gray-50 border-gray-200 text-gray-800";
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-sm text-[#6d6d68] animate-pulse">Verifying credentials...</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-sm text-[#6d6d68]">Loading lead record details...</p>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="container py-16 text-center">
        <p className="text-sm text-[#6d6d68] mb-4">Lead record not found.</p>
        <Link href="/admin/leads" className="btn btn-dark text-xs">
          Back to List
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-16">
      <div className="container">
        
        {/* Back Link */}
        <Link
          href="/admin/leads"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#6d6d68] hover:text-[#171717] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Leads Log
        </Link>

        {/* Detail Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Card (Col-span 8) */}
          <div className="lg:col-span-8 bg-[#fffdf9] border border-[#deddd6] p-8 rounded-3xl shadow-sm space-y-6">
            <div>
              <span className="eyebrow block mb-1" style={{ fontSize: "11px" }}>Record Details</span>
              <h1 className="text-3xl font-medium tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
                {lead.name}
              </h1>
              {lead.company && (
                <p className="text-sm text-[#6d6d68] mt-1">
                  Representative of <span className="font-bold text-[#171717]">{lead.company}</span>
                </p>
              )}
            </div>

            {/* Meta row */}
            <div className="flex flex-wrap gap-4 border-y border-[#deddd6] py-4 text-xs text-[#6d6d68]">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>Submitted: {new Date(lead.createdAt).toLocaleDateString()} {new Date(lead.createdAt).toLocaleTimeString()}</span>
              </div>
            </div>

            {/* Message block */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#6d6d68]">Project Scope Details</h4>
              <div className="p-5 bg-[#faf9f5] border border-[#deddd6] rounded-xl text-sm leading-relaxed text-[#171717] whitespace-pre-line">
                {lead.message || "(No message specifications provided by client)"}
              </div>
            </div>
          </div>

          {/* Sidebar controls (Col-span 4) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Status & Action controls */}
            <div className="bg-[#fffdf9] border border-[#deddd6] p-6 rounded-3xl shadow-sm space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#6d6d68] mb-3">Pipeline Status</h4>
                <select
                  value={lead.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm font-bold focus:outline-none cursor-pointer ${getStatusColor(
                    lead.status
                  )}`}
                >
                  {["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL", "WON", "LOST"].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#6d6d68] mb-3">Lead Requirements</h4>
                <div className="space-y-3">
                  <div className="flex gap-3 items-center text-xs">
                    <Briefcase className="w-4 h-4 text-[#234b3a] shrink-0" />
                    <div>
                      <span className="block text-[#6d6d68]">Requested Service</span>
                      <span className="block text-sm font-bold text-[#171717]">{lead.service}</span>
                    </div>
                  </div>
                  <div className="flex gap-3 items-center text-xs border-t border-[#deddd6] pt-3">
                    <Landmark className="w-4 h-4 text-[#234b3a] shrink-0" />
                    <div>
                      <span className="block text-[#6d6d68]">Budget Range</span>
                      <span className="block text-sm font-bold text-[#234b3a]">{lead.budget}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct contact controls */}
            <div className="bg-[#fffdf9] border border-[#deddd6] p-6 rounded-3xl shadow-sm space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#6d6d68]">Direct Channels</h4>
              
              <div className="space-y-3">
                <a
                  href={`mailto:${lead.email}`}
                  className="flex items-center gap-3 p-3 border border-[#deddd6] rounded-xl hover:bg-[#faf9f5] transition-colors text-xs"
                >
                  <Mail className="w-4 h-4 text-[#234b3a] shrink-0" />
                  <div>
                    <span className="block font-bold text-[#171717]">Send Email</span>
                    <span className="block text-[#6d6d68]">{lead.email}</span>
                  </div>
                </a>

                {lead.phone && (
                  <a
                    href={`tel:${lead.phone}`}
                    className="flex items-center gap-3 p-3 border border-[#deddd6] rounded-xl hover:bg-[#faf9f5] transition-colors text-xs"
                  >
                    <Phone className="w-4 h-4 text-[#234b3a] shrink-0" />
                    <div>
                      <span className="block font-bold text-[#171717]">Call / WhatsApp</span>
                      <span className="block text-[#6d6d68]">{lead.phone}</span>
                    </div>
                  </a>
                )}
              </div>
            </div>

            {/* Delete record */}
            <div className="bg-[#fffdf9] border border-red-200 p-6 rounded-3xl shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-red-700 mb-2">Danger Zone</h4>
              <p className="text-[11px] text-[#6d6d68] mb-4">
                Deleting this record is permanent and cannot be undone.
              </p>
              <button
                onClick={handleDelete}
                className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 hover:bg-red-100 border border-red-200 hover:border-red-300 text-red-800 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                <Trash2 className="w-4 h-4" /> Delete Enquiry Record
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
