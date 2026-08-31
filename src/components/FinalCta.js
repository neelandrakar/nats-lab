import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/config";

export default function FinalCta() {
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(siteConfig.contact.whatsappMsg)}`;

  return (
    <section className="py-24 bg-brand-dark relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-brand-teal/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 sm:p-16 rounded-3xl bg-gradient-to-br from-brand-surface to-[#080d1a] border border-white/10 text-center relative overflow-hidden shadow-2xl">
          {/* Subtle glowing orb */}
          <div className="absolute bottom-0 right-0 w-[200px] h-[200px] bg-brand-cyan/5 rounded-full blur-3xl"></div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight leading-tight">
            Have a business problem worth solving?
          </h2>
          
          <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto leading-relaxed mb-8">
            Tell us what you&apos;re trying to build, automate, or improve. We will analyze your operations and help you map out the right technology solutions.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-brand-accent hover:bg-brand-accent/90 text-white rounded-lg font-semibold flex items-center justify-center gap-2 group transition-all duration-200 shadow-lg shadow-brand-teal/20"
            >
              Start a Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 hover:border-[#25D366]/50 text-[#25D366] rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-200"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
