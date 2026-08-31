import { siteConfig } from "@/lib/config";
import { CheckCircle2, Award, Users, ShieldAlert, Cpu } from "lucide-react";

export default function WhyNatsLab() {
  return (
    <section className="py-24 bg-brand-dark relative overflow-hidden">
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-brand-teal/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Why Nats Lab Core Highlights (Col-span 7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <span className="text-xs font-bold text-brand-teal uppercase tracking-widest block mb-3">
                Our Philosophy
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                Technology should solve problems, not create more of them.
              </h2>
              <p className="text-sm text-gray-400 mt-4 leading-relaxed">
                We avoid buzzwords and overly complex setups. We build clean, high-performance applications designed specifically to achieve your business objectives.
              </p>
            </div>

            {/* Core Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              {siteConfig.whyUs.map((pillar) => (
                <div key={pillar.title} className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">{pillar.title}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">{pillar.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Founder Profile card (Col-span 5) */}
          <div className="lg:col-span-5">
            <div className="bg-[#0b0f19] border border-white/10 rounded-2xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-brand-teal/5 rounded-full blur-2xl"></div>
              
              <div className="flex items-center gap-4 mb-6">
                {/* Founder Avatar Placeholder */}
                <div className="w-16 h-16 rounded-full bg-brand-teal/10 border border-brand-teal/30 flex items-center justify-center shrink-0 overflow-hidden">
                  <svg className="w-8 h-8 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{siteConfig.founder.name}</h3>
                  <p className="text-xs text-brand-teal font-medium">{siteConfig.founder.role}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">Kolkata, India</p>
                </div>
              </div>

              {/* Bio text */}
              <p className="text-xs text-gray-300 leading-relaxed mb-6 font-medium italic">
                &ldquo;{siteConfig.founder.bio}&rdquo;
              </p>

              {/* Founder tech stack list */}
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-1">
                  <Cpu className="w-3.5 h-3.5 text-brand-teal" /> Technologies & Experience
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {siteConfig.founder.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-semibold px-2.5 py-1 bg-white/5 border border-white/5 hover:border-brand-teal/30 hover:text-brand-teal rounded-lg text-gray-400 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
