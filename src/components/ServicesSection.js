import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { Globe, Bot, Zap, Cpu, Smartphone, Link as LinkIcon, Wrench, ArrowRight } from "lucide-react";

export default function ServicesSection() {
  // Helper to map icon name to Lucide Component
  const iconMap = {
    Globe: Globe,
    Bot: Bot,
    Zap: Zap,
    Cpu: Cpu,
    Smartphone: Smartphone,
    Link: LinkIcon,
    Wrench: Wrench
  };

  return (
    <section id="services" className="py-24 bg-[#02050b] relative overflow-hidden">
      {/* Glow backgrounds */}
      <div className="absolute top-1/3 right-0 w-[300px] h-[300px] bg-brand-teal/5 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 left-0 w-[300px] h-[300px] bg-brand-cyan/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="max-w-xl">
            <span className="text-xs font-bold text-brand-teal uppercase tracking-widest block mb-3">
              Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Premium engineering built around your business outcomes.
            </h2>
          </div>
          <Link
            href="/services"
            className="text-sm font-semibold text-brand-accent hover:text-white flex items-center gap-1.5 transition-colors group mt-2"
          >
            Detailed Service Breakdown
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteConfig.services.map((service) => {
            const IconComponent = iconMap[service.icon] || Globe;
            return (
              <div
                key={service.id}
                className="glow-card p-8 rounded-2xl flex flex-col justify-between min-h-[300px] group transition-all duration-300"
              >
                <div>
                  {/* Icon Wrapper */}
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 group-hover:text-brand-teal group-hover:bg-brand-teal/10 group-hover:border-brand-teal/20 transition-all duration-300 mb-6">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  
                  {/* Title & Desc */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-teal transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Card CTA */}
                <div className="mt-8 pt-6 border-t border-white/5">
                  <Link
                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                    className="text-xs font-semibold text-gray-400 group-hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    Discuss This Service
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
