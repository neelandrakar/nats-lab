import { siteConfig } from "@/lib/config";
import { Cpu, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "About Us | Software Studio & Founder Bio",
  description: `Learn about NATS Lab and our founder ${siteConfig.founder.name}. We help small and medium businesses build digital operations with custom software and AI.`
};

export default function AboutPage() {
  const values = [
    {
      title: "Business Outcomes First",
      description: "We focus on real metrics: operational hours saved, lead conversion speed, and ordering efficiency, rather than just code quantity."
    },
    {
      title: "Direct Engineering Communication",
      description: `You work directly with ${siteConfig.founder.name}. No account managers, translation layers, or delayed communications.`
    },
    {
      title: "Clean, Maintainable Code",
      description: "We build systems using standard, modern frameworks (like Next.js and Node.js) that are highly readable and easy to hand off."
    },
    {
      title: "AI-First Operations",
      description: "We actively integrate Large Language Models (LLMs) to perform semantic data sorting, automatic chats, and document parsing."
    }
  ];

  return (
    <div className="py-16 md:py-24">
      <div className="container">
        
        {/* Section 1: Intro */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <span className="eyebrow block mb-3">
            Who We Are
          </span>
          <h1 className="mb-6" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
            We build digital systems that help businesses scale.
          </h1>
          <p className="text-lg text-[#6d6d68] leading-relaxed">
            NATS Lab is a software and automation studio. We build custom websites, business software, and AI-powered workflow pipelines. We operate as a direct technology partner, building strictly custom codebases that resolve specific operational bottlenecks.
          </p>
        </div>

        {/* Section 2: Founder Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          
          {/* Text Info (Col-span 7) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="eyebrow block mb-2" style={{ fontSize: '12px' }}>The Founder</span>
              <h2 className="text-3xl font-medium tracking-tight mb-1" style={{ fontFamily: 'Georgia, serif' }}>{siteConfig.founder.name}</h2>
              <p className="text-sm text-[#234b3a] font-semibold">{siteConfig.founder.role}</p>
            </div>
            
            <p className="text-base text-[#6d6d68] leading-relaxed">
              I am a full-stack software developer dedicated to building practical, performant applications. Through NATS Lab, I help businesses move away from fragile spreadsheets and slow manual copy-paste routines. 
            </p>
            
            <p className="text-base text-[#6d6d68] leading-relaxed">
              My engineering approach prioritizes speed, database stability, and automated notifications. I write clean JavaScript, Python, and Dart codes that interface with modern AI APIs to speed up lead captures and customer communications.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href={siteConfig.contact.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-light flex items-center gap-2"
                style={{ fontSize: '13px', padding: '10px 15px' }}
              >
                <svg className="w-4 h-4 text-[#234b3a] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                LinkedIn Profile
              </a>
              <a
                href={siteConfig.contact.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-light flex items-center gap-2"
                style={{ fontSize: '13px', padding: '10px 15px' }}
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                GitHub Repositories
              </a>
            </div>
          </div>

          {/* Graphic placeholder (Col-span 5) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="bg-[#fffdf9] border border-[#deddd6] rounded-2xl p-8 max-w-[360px] w-full text-center relative overflow-hidden shadow-sm">
              <div className="w-20 h-20 rounded-full bg-[#234b3a]/10 flex items-center justify-center mx-auto mb-6">
                <Cpu className="w-10 h-10 text-[#234b3a]" />
              </div>
              
              <h4 className="text-sm font-bold text-[#171717] uppercase tracking-wider mb-2">Technical Core Stack</h4>
              <p className="text-xs text-[#6d6d68] mb-6">Frameworks and languages built on years of active production codebases</p>
              
              <div className="flex flex-wrap justify-center gap-1.5">
                {siteConfig.founder.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2.5 py-1 border border-[#deddd6] rounded bg-[#faf9f5] text-[#6d6d68]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Section 3: Core Operating Values */}
        <div className="border-t border-[#deddd6] pt-16">
          <h2 className="text-3xl text-center mb-12" style={{ fontFamily: 'Georgia, serif' }}>Our Core Operating Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((v) => (
              <div
                key={v.title}
                className="p-6 rounded-2xl bg-[#fffdf9] border border-[#deddd6] hover:border-[#234b3a] transition-all flex gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-[#234b3a]/10 flex items-center justify-center text-[#234b3a] shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#171717] mb-2">{v.title}</h4>
                  <p className="text-sm text-[#6d6d68] leading-relaxed">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
