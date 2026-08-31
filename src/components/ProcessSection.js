import { siteConfig } from "@/lib/config";

export default function ProcessSection() {
  return (
    <section className="py-24 bg-[#02050b] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-teal/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold text-brand-teal uppercase tracking-widest block mb-3">
            Our Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            From idea to working system.
          </h2>
          <p className="text-sm text-gray-400 mt-4">
            We follow a structured four-stage development lifecycle to ensure your software is delivered on scope, on budget, and built for production.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Horizontal line for desktop connecting steps */}
          <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-brand-teal/10 via-brand-cyan/20 to-brand-teal/10 z-0"></div>

          {siteConfig.process.map((p, i) => (
            <div key={p.step} className="flex flex-col items-center text-center relative z-10 group">
              
              {/* Step bubble */}
              <div className="w-16 h-16 rounded-full bg-brand-surface border border-white/10 group-hover:border-brand-teal/50 flex items-center justify-center text-xl font-black text-brand-teal mb-6 shadow-xl transition-all duration-300 relative">
                <span className="relative z-10">{p.step}</span>
                <span className="absolute inset-0 rounded-full bg-brand-teal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </div>

              {/* Title & Desc */}
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-brand-teal transition-colors">
                {p.title}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed max-w-xs px-2">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
