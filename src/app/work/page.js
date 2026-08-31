import dbConnect from "@/lib/db";
import Project from "@/models/Project";
import WorkGrid from "@/components/WorkGrid";
import { demoProjects } from "@/lib/demo-projects";

export const metadata = {
  title: "Our Work | Case Studies & Concept Systems",
  description: "Browse the custom software, business portals, and AI agents built by NATS Lab. Each project details the business problem, our solution, and outcomes."
};

export const revalidate = 60; // Cache and revalidate page every minute

export default async function WorkPage() {
  let projects = [];
  try {
    await dbConnect();
    const fetchedProjects = await Project.find({}).sort({ createdAt: -1 }).lean();
    
    if (fetchedProjects && fetchedProjects.length > 0) {
      projects = fetchedProjects.map((p) => ({
        title: p.title,
        slug: p.slug,
        category: p.category,
        shortDescription: p.shortDescription,
        description: p.description,
        services: p.services,
        technologies: p.technologies,
        image: p.image,
        gallery: p.gallery,
        featured: p.featured,
        _id: p._id.toString()
      }));
    } else {
      projects = demoProjects;
    }
  } catch (error) {
    console.error("Failed to load database projects on work route:", error.message);
    projects = demoProjects;
  }

  return (
    <div className="py-16 md:py-24">
      <div className="container">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="eyebrow block mb-3">
            Our Portfolio
          </span>
          <h1 className="mb-6" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
            Case studies & demo concepts.
          </h1>
          <p className="text-lg text-[#6d6d68] leading-relaxed">
            We build digital systems that help businesses solve bottlenecks, eliminate manual work, and operate more efficiently. Review our recent concept projects and deployments below.
          </p>
        </div>

        {/* Work Grid */}
        <WorkGrid initialProjects={projects} />

      </div>
    </div>
  );
}
