import Link from "next/link";
import { ArrowRight, Cpu, CheckCircle } from "lucide-react";

const fallbackProjects = [
  {
    title: "AI Sales Assistant",
    slug: "ai-sales-assistant",
    category: "AI Agents",
    shortDescription: "AI-powered chat assistant that engages website visitors, qualifies leads in real-time, and schedules meetings.",
    description: "An intelligent, multi-turn AI assistant designed to sit on customer-facing websites. It answers complex product queries, queries live product availability, qualifies visitors based on budget and timing, and automatically pushes qualified leads directly into CRM systems.",
    services: ["AI Agents", "Business Automation", "API & Integrations"],
    technologies: ["Next.js", "Node.js", "MongoDB", "OpenAI API", "Vector Embeddings"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    featured: true
  },
  {
    title: "Real Estate CRM & Automation Portal",
    slug: "real-estate-crm",
    category: "Custom Software",
    shortDescription: "A custom real estate platform that aggregates listings, tracks buyer leads, and automates email/SMS follow-ups.",
    description: "A comprehensive backend system and CRM built for real estate brokerages. The system ingests listings from multiple sources, parses inbound email inquiries from real estate portals, and assigns leads to agents based on ZIP code.",
    services: ["Custom Business Software", "Websites & Web Apps", "Business Automation"],
    technologies: ["React.js", "Node.js", "MongoDB", "Twilio SMS API", "SendGrid", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop",
    featured: true
  },
  {
    title: "B2B Dealer Management System",
    slug: "dealer-management-system",
    category: "Custom Software",
    shortDescription: "Order placement, live inventory tracking, and reporting dashboard for a network of 200+ active distributors.",
    description: "A robust distributor portal designed to replace manual phone/email order entries. Dealers log in to view customized pricing contracts, check real-time stock status, and download custom PDF invoices.",
    services: ["Custom Business Software", "API & Integrations"],
    technologies: ["Next.js", "Mongoose", "MongoDB", "Tailwind CSS", "PDFKit"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
    featured: true
  }
];

export default function PortfolioSection({ projects = [] }) {
  const displayProjects = projects.length > 0 ? projects.slice(0, 3) : fallbackProjects;

  return (
    <section id="work" className="py-24 bg-brand-dark relative overflow-hidden">
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-brand-teal/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="max-w-xl">
            <span className="text-xs font-bold text-brand-teal uppercase tracking-widest block mb-3">
              Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Featured Case Studies & Demo Concepts
            </h2>
          </div>
          <Link
            href="/work"
            className="text-sm font-semibold text-brand-accent hover:text-white flex items-center gap-1.5 transition-colors group mt-2"
          >
            See All Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {displayProjects.map((project) => (
            <div
              key={project.slug}
              className="bg-[#0b0f19] border border-white/5 hover:border-white/10 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              {/* Image Header */}
              <div className="relative h-48 overflow-hidden bg-brand-dark">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-bold px-2.5 py-1 bg-brand-dark/80 backdrop-blur border border-white/10 rounded-full text-brand-teal uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-2">
                    {project.shortDescription}
                  </p>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[9px] font-mono text-gray-500 bg-white/5 border border-white/5 px-2 py-0.5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                    Demo Concept
                  </span>
                  <Link
                    href={`/work/${project.slug}`}
                    className="text-xs font-semibold text-brand-teal group-hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    View Project Details
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
