"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function WorkGrid({ initialProjects = [] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "AI Agents", "Custom Software", "Business Automation", "Mobile Applications"];

  const filteredProjects = activeCategory === "All"
    ? initialProjects
    : initialProjects.filter(p => p.category === activeCategory);

  return (
    <div className="space-y-12">
      {/* Category filter tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#deddd6] pb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-xs sm:text-sm font-bold px-4 py-2 rounded-lg border transition-all duration-200 ${
              activeCategory === cat
                ? "bg-[#234b3a] border-[#234b3a] text-white"
                : "bg-transparent border-[#deddd6] text-[#6d6d68] hover:text-[#171717] hover:bg-[#fffdf9]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-20 border border-[#deddd6] rounded-2xl bg-[#fffdf9]">
          <p className="text-[#6d6d68] text-sm">No projects found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.slug}
              className="bg-[#fffdf9] border border-[#deddd6] hover:border-[#234b3a] rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-sm"
            >
              {/* Image Header */}
              <div className="relative h-48 overflow-hidden bg-[#f7f6f2]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-bold px-2.5 py-1 bg-[#fffdf9] border border-[#deddd6] rounded-full text-[#234b3a] uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-medium text-[#171717] mb-3 group-hover:text-[#234b3a] transition-colors" style={{ fontFamily: 'Georgia, serif' }}>
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#6d6d68] leading-relaxed mb-4 line-clamp-2">
                    {project.shortDescription}
                  </p>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono text-[#6d6d68] bg-[#faf9f5] border border-[#deddd6] px-2 py-0.5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-[#deddd6] flex justify-between items-center">
                  <span className="text-[10px] text-[#6d6d68] uppercase tracking-widest font-bold">
                    Demo Concept
                  </span>
                  <Link
                    href={`/work/${project.slug}`}
                    className="text-xs font-bold text-[#234b3a] flex items-center gap-1.5 transition-colors"
                  >
                    View Details
                    <ArrowRight className="w-3.5 h-3.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
