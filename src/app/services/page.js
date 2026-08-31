import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { Globe, Bot, Zap, Cpu, Smartphone, Link as LinkIcon, Wrench, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Services | Websites, AI Agents & Business Automation",
  description: "Explore the technical capabilities of NATS Lab. We build custom websites, AI chatbots, automations, mobile apps, and CRMs designed to scale operations."
};

export default function ServicesPage() {
  const iconMap = {
    Globe: Globe,
    Bot: Bot,
    Zap: Zap,
    Cpu: Cpu,
    Smartphone: Smartphone,
    Link: LinkIcon,
    Wrench: Wrench
  };

  // Extra details for service expansion
  const serviceDetails = {
    "websites-webapps": {
      deliverables: ["Landing Pages & Conversion Optimizers", "B2B / B2C Web Applications", "Client Portals & Booking Platforms", "SEO-optimized Blog & News Hubs"],
      techUsed: "Next.js, React, Tailwind CSS, Node.js, Vercel"
    },
    "ai-agents": {
      deliverables: ["24/7 AI Sales Assistants", "Custom Support Chatbots", "AI Document Reader & Classifier", "Automatic WhatsApp/SMS Responders"],
      techUsed: "OpenAI API, Claude LLM, LangChain, Vector DBs, Mongoose"
    },
    "business-automation": {
      deliverables: ["Spreadsheet-to-Database Migrations", "Automated Billing & Invoice Dispatch", "Slack / Email Status Pipelines", "Reporting & Performance Dashboards"],
      techUsed: "Node.js, Cron Scheduling, APIs, Zapier, Webhooks"
    },
    "custom-software": {
      deliverables: ["Customer Relationship Managers (CRM)", "Inventory & Supply Chain Trackers", "Dealer & Network Booking Systems", "Employee Portal & Timesheet Loggers"],
      techUsed: "MongoDB, Express, React, Node.js, Chart.js"
    },
    "mobile-apps": {
      deliverables: ["iOS & Android Cross-Platform Apps", "Offline-first Mobile Architectures", "Live Map Tracking Apps", "Mobile Stripe Gateway Integrations"],
      techUsed: "Flutter, Dart, Node.js REST API, SQLite"
    },
    "api-integrations": {
      deliverables: ["Stripe / PayPal Gateway Setup", "WhatsApp Business API pipelines", "HubSpot & Salesforce Integrations", "Custom API Webhook Engineering"],
      techUsed: "REST APIs, GraphQL, HTTPS Endpoints, Zod"
    },
    "software-maintenance": {
      deliverables: ["Database Performance Tuning", "Codebase Modernization & Refactoring", "Bug Diagnostics & Diagnostics", "Security Patching & Version Upgrades"],
      techUsed: "JavaScript, PHP, SQL, Git, Linux VPS"
    }
  };

  return (
    <div className="py-16 md:py-24">
      <div className="container">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <span className="eyebrow block mb-3">
            What We Build
          </span>
          <h1 className="mb-6" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
            Custom systems that solve bottlenecks.
          </h1>
          <p className="text-lg text-[#6d6d68] leading-relaxed">
            We focus on building functional, responsive, and secure digital assets. Below is the detailed breakdown of the products we engineer, the target deliverables, and the technologies we employ.
          </p>
        </div>

        {/* Detailed Services list */}
        <div className="space-y-12">
          {siteConfig.services.map((service) => {
            const Icon = iconMap[service.icon] || Globe;
            const details = serviceDetails[service.id] || { deliverables: [], techUsed: "" };
            
            return (
              <div
                key={service.id}
                id={service.id}
                className="p-8 lg:p-12 rounded-3xl bg-[#fffdf9] border border-[#deddd6] hover:border-[#234b3a] transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 shadow-sm"
              >
                {/* Column 1: Icon, Title & Basic Info (Col-span 5) */}
                <div className="lg:col-span-5 flex flex-col justify-between">
                  <div className="flex flex-col gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#234b3a]/10 flex items-center justify-center text-[#234b3a]">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-medium mb-3" style={{ fontFamily: 'Georgia, serif' }}>{service.title}</h2>
                      <p className="text-sm text-[#6d6d68] leading-relaxed">{service.description}</p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <span className="text-[10px] font-bold text-[#6d6d68] uppercase tracking-widest block mb-2">Technologies</span>
                    <p className="text-xs font-mono text-[#234b3a] font-bold">{details.techUsed}</p>
                  </div>
                </div>

                {/* Column 2: Deliverables & CTA (Col-span 7) */}
                <div className="lg:col-span-7 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#deddd6] pt-8 lg:pt-0 lg:pl-12">
                  <div>
                    <h3 className="text-xs font-bold text-[#6d6d68] uppercase tracking-wider mb-4">Core Deliverables</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                      {details.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-xs text-[#171717]">
                          <CheckCircle2 className="w-4 h-4 text-[#234b3a] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <Link
                      href={`/contact?service=${encodeURIComponent(service.title)}`}
                      className="btn btn-dark flex items-center gap-2 text-xs"
                      style={{ padding: '10px 15px', width: 'fit-content' }}
                    >
                      Discuss {service.title}
                      <ArrowRight className="w-3.5 h-3.5 transition-transform" />
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
