import dbConnect from "@/lib/db";
import Project from "@/models/Project";
import { demoProjects } from "@/lib/demo-projects";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = params;
  let project = null;

  try {
    await dbConnect();
    project = await Project.findOne({ slug }).lean();
  } catch (e) {
    project = demoProjects.find((p) => p.slug === slug);
  }

  if (!project) {
    project = demoProjects.find((p) => p.slug === slug);
  }

  if (!project) {
    return {
      title: "Project Not Found"
    };
  }

  return {
    title: `${project.title} | Case Studies`,
    description: project.shortDescription
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = params;
  let project = null;

  try {
    await dbConnect();
    project = await Project.findOne({ slug }).lean();
  } catch (error) {
    console.error("Failed to fetch project detail from database, using fallback:", error.message);
  }

  // Fallback to local copy if not found in db or db connection failed
  if (!project) {
    project = demoProjects.find((p) => p.slug === slug);
  }

  if (!project) {
    notFound();
  }

  return (
    <div className="py-16 md:py-24">
      <div className="container">
        
        {/* Back Link */}
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#6d6d68] hover:text-[#171717] transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Case Studies
        </Link>

        {/* Project Header */}
        <div className="mb-10">
          <span className="text-xs font-bold text-[#234b3a] bg-[#234b3a]/10 border border-[#234b3a]/20 px-2.5 py-1 rounded w-fit">
            {project.category}
          </span>
          <h1 className="text-3xl sm:text-5xl font-medium tracking-tight mt-4 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            {project.title}
          </h1>
          <p className="text-lg text-[#6d6d68] leading-relaxed max-w-3xl">
            {project.shortDescription}
          </p>
        </div>

        {/* Main Banner Image */}
        <div className="h-64 sm:h-[400px] w-full rounded-2xl overflow-hidden border border-[#deddd6] mb-16">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Project Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Description (Col-span 8) */}
          <div className="lg:col-span-8 space-y-10">
            <div>
              <h2 className="text-2xl font-medium text-[#171717] mb-4" style={{ fontFamily: 'Georgia, serif' }}>Project Overview</h2>
              <p className="text-sm text-[#6d6d68] leading-relaxed whitespace-pre-line">
                {project.description}
              </p>
            </div>

            {/* Simulated Case Study Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[#deddd6] pt-8">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-red-600 mb-2">The Challenge</h3>
                <p className="text-xs text-[#6d6d68] leading-relaxed">
                  The client suffered from highly fragmented, manual workflows. Inbound leads or dealer requests were handled through legacy Excel sheets and random email threads, leading to lost conversion opportunities and operational delays.
                </p>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#234b3a] mb-2">Our Solution</h3>
                <p className="text-xs text-[#6d6d68] leading-relaxed">
                  We built a bespoke Next.js and MongoDB-backed system, automating data synchronization, calculating instant validation scores, and wiring SMS/WhatsApp integrations to alert staff in real time.
                </p>
              </div>
            </div>

            {/* Gallery Screenshots */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="border-t border-[#deddd6] pt-8">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#6d6d68] mb-4">Screenshots & Interfaces</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {project.gallery.map((img, i) => (
                    <div key={i} className="h-40 rounded-xl overflow-hidden border border-[#deddd6] bg-[#fffdf9]">
                      <img src={img} alt={`Screenshot ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Specifications (Col-span 4) */}
          <div className="lg:col-span-4 space-y-8 lg:border-l lg:border-[#deddd6] lg:pl-10">
            {/* Services Rendered */}
            <div>
              <h3 className="text-xs font-bold text-[#6d6d68] uppercase tracking-widest mb-3">Services Rendered</h3>
              <ul className="space-y-2">
                {project.services.map((srv) => (
                  <li key={srv} className="flex items-center gap-2 text-xs text-[#171717]">
                    <CheckCircle2 className="w-4 h-4 text-[#234b3a] shrink-0" />
                    <span>{srv}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-xs font-bold text-[#6d6d68] uppercase tracking-widest mb-3">Technologies Used</h3>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono text-[#234b3a] bg-[#234b3a]/10 border border-[#234b3a]/20 px-2.5 py-1 rounded font-bold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Outcome Callout */}
            <div className="p-4 rounded-xl bg-[#fffdf9] border border-[#deddd6]">
              <h3 className="text-xs font-bold text-[#171717] mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#234b3a]" /> Verified Outcome
              </h3>
              <p className="text-[11px] text-[#6d6d68] leading-relaxed font-mono">
                System fully tested in sandbox environments. Leads correctly save to MongoDB, validation logic score succeeds, and API notifies dispatch receivers.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom CTA Card */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-[#fffdf9] border border-[#deddd6] text-center max-w-4xl mx-auto shadow-sm">
          <h2 className="text-2xl font-medium text-[#171717] mb-3" style={{ fontFamily: 'Georgia, serif' }}>
            Looking for a custom solution like this?
          </h2>
          <p className="text-sm text-[#6d6d68] mb-6">
            We will work directly with you to scope, design, and build the software or AI integrations your business needs.
          </p>
          <Link
            href={`/contact?service=${encodeURIComponent(project.category)}`}
            className="btn btn-dark inline-flex items-center gap-2 text-xs"
            style={{ padding: '12px 20px', width: 'fit-content' }}
          >
            Start Your Project
            <ArrowRight className="w-3.5 h-3.5 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
}
