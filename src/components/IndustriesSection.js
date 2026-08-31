import { siteConfig } from "@/lib/config";
import { Home, Factory, Briefcase, Rocket, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function IndustriesSection() {
  const iconMap = {
    Home: Home,
    Factory: Factory,
    Briefcase: Briefcase,
    Rocket: Rocket,
    MapPin: MapPin
  };

  return (
    <section className="py-24 bg-[#02050b] relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-brand-cyan/5 rounded-full blur-[90px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-brand-teal uppercase tracking-widest block mb-3">
            Who We Serve
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            Technology built around your industry.
          </h2>
          <p className="text-sm text-gray-400 mt-4">
            We don&apos;t build generic technology. We study the specific operational flow of your industry and implement software that solves your target bottlenecks.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteConfig.industries.map((ind) => {
            const Icon = iconMap[ind.icon] || Briefcase;
            return (
              <div
                key={ind.title}
                className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="flex flex-col gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 group-hover:text-brand-cyan group-hover:bg-brand-cyan/10 group-hover:border-brand-cyan/20 transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{ind.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{ind.description}</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5">
                  <Link
                    href={`/contact?industry=${encodeURIComponent(ind.title)}`}
                    className="text-xs font-semibold text-brand-cyan group-hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    Discuss Industry Solutions
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
