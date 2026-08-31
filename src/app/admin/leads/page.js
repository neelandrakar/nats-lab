"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Database, RefreshCw, Trash2, Eye } from "lucide-react";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const verifyAdmin = async () => {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      if (data.success && data.user?.role === "ADMIN") {
        setIsAdmin(true);
        fetchLeads();
      } else {
        window.location.href = "/login";
      }
    } catch (err) {
      console.error("Admin verification error:", err);
      window.location.href = "/login";
    }
  };

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/leads");
      const data = await res.json();
      if (data.success) {
        setLeads(data.leads);
      }
    } catch (err) {
      console.error("Failed to load leads:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    verifyAdmin();
  }, []);

  const handleStatusChange = async (leadId, newStatus) => {
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setLeads((prev) =>
          prev.map((l) => (l._id === leadId ? { ...l, status: newStatus } : l))
        );
      } else {
        alert(data.error || "Failed to update status");
      }
    } catch (err) {
      alert("Error updating status: " + err.message);
    }
  };

  const handleDelete = async (leadId) => {
    if (!confirm("Are you sure you want to delete this enquiry log?")) return;
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setLeads((prev) => prev.filter((l) => l._id !== leadId));
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

  return (
    <div className="py-12 md:py-16">
      <div className="container">
        
        {/* Back Link */}
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#6d6d68] hover:text-[#171717] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Overview
        </Link>

        {/* Leads Logs Table Card */}
        <div className="bg-[#fffdf9] border border-[#deddd6] rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 bg-[#faf9f5] border-b border-[#deddd6] flex justify-between items-center flex-wrap gap-4">
            <h3 className="text-sm font-bold text-[#171717] flex items-center gap-2">
              <Database className="w-4 h-4 text-[#234b3a]" /> Captured Project Enquiries ({leads.length})
            </h3>
            <button
              onClick={fetchLeads}
              className="text-xs text-[#6d6d68] hover:text-[#171717] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Refresh List
            </button>
          </div>

          {isLoading ? (
            <div className="text-center py-20 text-xs text-[#6d6d68]">Querying database...</div>
          ) : leads.length === 0 ? (
            <div className="text-center py-20 text-xs text-[#6d6d68]">
              No enquiries submitted yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#deddd6] text-[10px] text-[#6d6d68] uppercase font-mono tracking-wider">
                    <th className="p-4">Contact</th>
                    <th className="p-4">Service</th>
                    <th className="p-4">Budget</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Date Ingested</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#deddd6] text-xs">
                  {leads.map((l) => (
                    <tr key={l._id} className="hover:bg-[#faf9f5] transition-colors">
                      {/* Contact details */}
                      <td className="p-4 max-w-[200px] truncate">
                        <div className="font-bold text-[#171717] text-sm">{l.name}</div>
                        {l.company && <div className="text-[10px] text-[#6d6d68] font-mono">Company: {l.company}</div>}
                        <div className="flex gap-3 text-[10px] text-[#6d6d68] mt-1 font-semibold">
                          <a href={`mailto:${l.email}`} className="hover:text-black">
                            {l.email}
                          </a>
                          {l.phone && <span>· {l.phone}</span>}
                        </div>
                      </td>

                      {/* Service */}
                      <td className="p-4 font-semibold text-[#171717]">{l.service}</td>

                      {/* Budget */}
                      <td className="p-4 font-bold text-[#234b3a]">{l.budget}</td>

                      {/* Status select dropdown */}
                      <td className="p-4">
                        <select
                          value={l.status}
                          onChange={(e) => handleStatusChange(l._id, e.target.value)}
                          className={`px-3 py-1.5 rounded-lg border text-xs font-bold focus:outline-none cursor-pointer ${getStatusColor(
                            l.status
                          )}`}
                          style={{ minWidth: "115px" }}
                        >
                          {["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL", "WON", "LOST"].map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Date */}
                      <td className="p-4 text-[#6d6d68] font-mono text-[10px]">
                        {new Date(l.createdAt).toLocaleDateString()}
                        <div className="text-[9px] mt-0.5">{new Date(l.createdAt).toLocaleTimeString()}</div>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-center">
                        <div className="flex justify-center items-center gap-3">
                          <Link
                            href={`/admin/leads/${l._id}`}
                            className="p-1.5 text-gray-500 hover:text-black transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(l._id)}
                            className="p-1.5 text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
