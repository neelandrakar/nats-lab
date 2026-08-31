import LeadForm from "@/components/LeadForm";
import { siteConfig } from "@/lib/config";
import { Mail, Phone, Clock, MessageSquare } from "lucide-react";

export const metadata = {
  title: "Contact & Project Intake | NATS Lab",
  description: "Discuss your project scope with NATS Lab. Submit our secure intake form detailing websites, AI chatbots, automation, or custom software requirements."
};

export default function ContactPage({ searchParams }) {
  const defaultService = searchParams?.service || "";
  const defaultIndustry = searchParams?.industry || "";

  return (
    <div className="py-16 md:py-24">
      <div className="container">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <span className="eyebrow block mb-3">
            Get in Touch
          </span>
          <h1 className="mb-6" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
            Start a Project.
          </h1>
          <p className="text-lg text-[#6d6d68] leading-relaxed">
            Tell us about the bottlenecks you are trying to solve or the system you are planning to build. We will review your scope and follow up within 24 hours.
          </p>
        </div>

        {/* Form and Info Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Intake Form (Col-span 8) */}
          <div className="lg:col-span-8">
            <LeadForm defaultService={defaultService} defaultIndustry={defaultIndustry} />
          </div>

          {/* Sidebar Contact details (Col-span 4) */}
          <div className="lg:col-span-4 space-y-8 lg:pl-8">
            
            {/* Quick Contact Block */}
            <div className="p-6 rounded-2xl bg-[#fffdf9] border border-[#deddd6] space-y-6">
              <h3 className="text-xs font-bold text-[#6d6d68] uppercase tracking-widest">General Inquiries</h3>
              
              <div className="space-y-4">
                {/* Email */}
                <div className="flex gap-3">
                  <Mail className="w-5 h-5 text-[#234b3a] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#171717] mb-0.5">Email Us</h4>
                    <a href={`mailto:${siteConfig.contact.email}`} className="text-sm text-[#6d6d68] hover:text-[#171717] transition-colors">
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-3">
                  <Phone className="w-5 h-5 text-[#234b3a] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#171717] mb-0.5">Call / WhatsApp</h4>
                    <a href={`tel:${siteConfig.contact.phone}`} className="text-sm text-[#6d6d68] hover:text-[#171717] transition-colors">
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                </div>

                {/* Response time */}
                <div className="flex gap-3">
                  <Clock className="w-5 h-5 text-[#234b3a] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#171717] mb-0.5">Studio Hours</h4>
                    <p className="text-sm text-[#6d6d68]">Monday — Friday, 9:00 AM — 6:00 PM IST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Credential Callout */}
            <div className="p-6 rounded-2xl bg-[#fffdf9] border border-[#deddd6] space-y-4">
              <div className="w-8 h-8 rounded-lg bg-[#234b3a]/10 flex items-center justify-center text-[#234b3a]">
                <MessageSquare className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-[#171717]">No Sales Pitch. Direct Engineering.</h4>
              <p className="text-xs text-[#6d6d68] leading-relaxed">
                When you schedule a discovery session with NATS Lab, you align directly with engineer Neelandra Kar. We dive straight into technical design options, scopes, and budget realities.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
