import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { dbConnect } from "@/lib/db";
import Lead from "@/models/Lead";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";
import { Users, FileText, CheckCircle, Clock, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const user = await getSessionUser();

  // Route protection
  if (!user || user.role !== "ADMIN") {
    redirect("/login");
  }

  await dbConnect();
  const leads = await Lead.find({}).lean();

  // Calculate metrics
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "NEW").length;
  const contactedLeads = leads.filter((l) => l.status === "CONTACTED").length;
  const wonLeads = leads.filter((l) => l.status === "WON").length;

  return (
    <div className="py-12 md:py-16">
      <div className="container">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#deddd6] pb-6 mb-8 gap-6">
          <div>
            <span className="text-xs font-bold text-[#234b3a] uppercase tracking-widest">
              Admin Console
            </span>
            <h1 className="text-3xl font-medium tracking-tight mt-1" style={{ fontFamily: "Georgia, serif" }}>
              Lead Pipeline Manager
            </h1>
          </div>
          <div className="flex items-center gap-4 bg-[#fffdf9] border border-[#deddd6] p-4 rounded-xl shadow-sm">
            <div className="text-xs">
              <span className="block font-bold text-[#171717]">Admin Portal</span>
              <span className="block text-[#6d6d68] mt-0.5">{user.email}</span>
            </div>
            <div className="border-l border-[#deddd6] pl-4">
              <LogoutButton />
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total Leads", count: totalLeads, color: "text-[#234b3a]", icon: FileText },
            { label: "New Leads", count: newLeads, color: "text-cyan-700", icon: Clock },
            { label: "Contacted", count: contactedLeads, color: "text-blue-700", icon: Users },
            { label: "Won Deals", count: wonLeads, color: "text-emerald-700", icon: CheckCircle }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="p-6 bg-[#fffdf9] border border-[#deddd6] rounded-2xl shadow-sm relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-[#6d6d68] uppercase tracking-widest">{item.label}</span>
                  <Icon className="w-5 h-5 text-[#6d6d68]" />
                </div>
                <p className={`text-4xl font-bold mt-4 ${item.color}`}>{item.count}</p>
              </div>
            );
          })}
        </div>

        {/* Quick Links Section */}
        <div className="bg-[#fffdf9] border border-[#deddd6] p-8 rounded-3xl shadow-sm max-w-2xl">
          <h2 className="text-xl font-medium mb-3" style={{ fontFamily: "Georgia, serif" }}>
            Operational Management
          </h2>
          <p className="text-sm text-[#6d6d68] mb-6">
            Review detailed case submissions, update deal statuses, and maintain client communications pipelines.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/admin/leads" className="btn btn-dark text-xs flex items-center gap-1.5">
              Manage Leads <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
