import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { dbConnect } from "@/lib/db";
import Lead from "@/models/Lead";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";
import { Database, Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function UserDashboard() {
  const user = await getSessionUser();

  // Route protection: redirect unauthenticated users to login
  if (!user) {
    redirect("/login");
  }

  // Redirect admin to admin dashboard
  if (user.role === "ADMIN") {
    redirect("/admin");
  }

  await dbConnect();
  
  // Fetch only this user's leads
  const leads = await Lead.find({ userId: user.id }).sort({ createdAt: -1 }).lean();

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "NEW":
        return "bg-cyan-50 border border-cyan-200 text-cyan-800";
      case "CONTACTED":
        return "bg-blue-50 border border-blue-200 text-blue-800";
      case "QUALIFIED":
        return "bg-yellow-50 border border-yellow-200 text-yellow-800";
      case "PROPOSAL":
        return "bg-purple-50 border border-purple-200 text-purple-800";
      case "WON":
        return "bg-emerald-50 border border-emerald-200 text-emerald-800";
      case "LOST":
        return "bg-red-50 border border-red-200 text-red-800";
      default:
        return "bg-gray-50 border border-gray-200 text-gray-800";
    }
  };

  return (
    <div className="py-12 md:py-16">
      <div className="container">
        
        {/* Header / Profile Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#deddd6] pb-6 mb-8 gap-6">
          <div>
            <span className="text-xs font-bold text-[#234b3a] uppercase tracking-widest">
              User Dashboard
            </span>
            <h1 className="text-3xl font-medium tracking-tight mt-1" style={{ fontFamily: "Georgia, serif" }}>
              Welcome, {user.name}
            </h1>
          </div>
          <div className="flex items-center gap-4 bg-[#fffdf9] border border-[#deddd6] p-4 rounded-xl shadow-sm">
            <div className="text-xs">
              <span className="block font-bold text-[#171717]">Account Profile</span>
              <span className="block text-[#6d6d68] mt-0.5">{user.email}</span>
            </div>
            <div className="border-l border-[#deddd6] pl-4">
              <LogoutButton />
            </div>
          </div>
        </div>

        {/* Dashboard Enquiries Section */}
        <div className="bg-[#fffdf9] border border-[#deddd6] rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 bg-[#faf9f5] border-b border-[#deddd6] flex justify-between items-center flex-wrap gap-4">
            <h3 className="text-sm font-bold text-[#171717] flex items-center gap-2">
              <Database className="w-4 h-4 text-[#234b3a]" /> My Project Enquiries ({leads.length})
            </h3>
            <Link href="/#contact" className="btn btn-dark py-2 px-3 text-xs flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" /> Start a Project
            </Link>
          </div>

          {leads.length === 0 ? (
            <div className="text-center py-16 px-4">
              <p className="text-sm text-[#6d6d68] mb-4">
                You haven&apos;t submitted any project enquiries yet.
              </p>
              <Link href="/#contact" className="btn btn-light text-xs">
                Submit Your First Request
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#deddd6] text-[10px] text-[#6d6d68] uppercase font-mono tracking-wider">
                    <th className="p-4">Service</th>
                    <th className="p-4">Budget Range</th>
                    <th className="p-4">Message / Requirements</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Date Submitted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#deddd6] text-xs">
                  {leads.map((lead) => (
                    <tr key={lead._id.toString()} className="hover:bg-[#faf9f5] transition-colors">
                      <td className="p-4 font-bold text-[#171717]">{lead.service}</td>
                      <td className="p-4 font-semibold text-[#234b3a]">{lead.budget}</td>
                      <td className="p-4 max-w-[300px] truncate text-[#6d6d68] italic">
                        {lead.message || "(No description provided)"}
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1.5 rounded-lg text-xs font-bold ${getStatusBadgeClass(lead.status)}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="p-4 text-[#6d6d68] font-mono text-[10px]">
                        {new Date(lead.createdAt).toLocaleDateString()}
                        <div className="text-[9px] mt-0.5">{new Date(lead.createdAt).toLocaleTimeString()}</div>
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
