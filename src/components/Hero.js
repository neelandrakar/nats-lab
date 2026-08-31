"use client";

import Link from "next/link";
import { ArrowRight, Globe, Bot, ShieldCheck, Database, Send } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-10 pb-16 overflow-hidden">
      {/* Decorative background grid and glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-teal/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-brand-cyan/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Text Content (Left Column) */}
          <div className="lg:col-span-6 flex flex-col gap-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-teal/10 border border-brand-teal/30 w-fit">
              <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse"></span>
              <span className="text-xs font-semibold text-brand-teal tracking-wide uppercase">
                Software & AI Studio
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
              Build Better.
              <br />
              <span className="accent-gradient">Automate Smarter.</span>
            </h1>
            
            <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
              NATS Lab builds websites, custom software, and AI-powered automation that help businesses capture more leads, eliminate repetitive manual work, and operate at maximum efficiency.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-brand-accent hover:bg-brand-accent/90 text-white rounded-lg font-semibold flex items-center justify-center gap-2 group transition-all duration-200 shadow-lg shadow-brand-teal/20"
              >
                Start a Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/work"
                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 rounded-lg font-semibold flex items-center justify-center transition-all duration-200"
              >
                Explore Our Work
              </Link>
            </div>
          </div>

          {/* Connected Systems Visual (Right Column) */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            <div className="w-full max-w-[500px] h-[360px] bg-brand-surface border border-white/10 rounded-2xl p-6 relative flex flex-col justify-between overflow-hidden shadow-2xl backdrop-blur-md">
              {/* Card Title */}
              <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">
                  Active Automation Engine
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-[10px] text-emerald-400 font-semibold uppercase animate-pulse">
                  System Live
                </span>
              </div>

              {/* Connected Flow */}
              <div className="relative flex-grow flex items-center justify-between px-2">
                {/* SVG for drawing animated connection lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  {/* Website to AI Agent */}
                  <path d="M 50 110 L 130 110" stroke="rgba(255,255,255,0.05)" strokeWidth="2" fill="none" />
                  <path d="M 50 110 L 130 110" stroke="#0D9488" strokeWidth="2" strokeDasharray="8 4" className="animate-dash" fill="none" />

                  {/* AI Agent to Lead */}
                  <path d="M 170 110 L 250 110" stroke="rgba(255,255,255,0.05)" strokeWidth="2" fill="none" />
                  <path d="M 170 110 L 250 110" stroke="#06B6D4" strokeWidth="2" strokeDasharray="8 4" className="animate-dash" fill="none" />

                  {/* Lead to CRM */}
                  <path d="M 290 110 L 370 110" stroke="rgba(255,255,255,0.05)" strokeWidth="2" fill="none" />
                  <path d="M 290 110 L 370 110" stroke="#0D9488" strokeWidth="2" strokeDasharray="8 4" className="animate-dash" fill="none" />

                  {/* CRM to Sales Team */}
                  <path d="M 410 110 L 410 180" stroke="rgba(255,255,255,0.05)" strokeWidth="2" fill="none" />
                  <path d="M 410 110 L 410 180" stroke="#06B6D4" strokeWidth="2" strokeDasharray="8 4" className="animate-dash" fill="none" />
                </svg>

                {/* Website Node */}
                <div className="flex flex-col items-center gap-2 z-10">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg group hover:border-brand-teal/50 hover:bg-brand-teal/10 transition-all duration-300">
                    <Globe className="w-5 h-5 text-gray-400 group-hover:text-brand-teal" />
                  </div>
                  <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Website</span>
                </div>

                {/* AI Agent Node */}
                <div className="flex flex-col items-center gap-2 z-10">
                  <div className="w-12 h-12 rounded-xl bg-brand-teal/10 border border-brand-teal/30 flex items-center justify-center shadow-lg hover:border-brand-teal/50 transition-all duration-300">
                    <Bot className="w-5 h-5 text-brand-teal animate-bounce" />
                  </div>
                  <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">AI Agent</span>
                </div>

                {/* Lead Node */}
                <div className="flex flex-col items-center gap-2 z-10">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg hover:border-brand-cyan/50 hover:bg-brand-cyan/10 transition-all duration-300">
                    <ShieldCheck className="w-5 h-5 text-brand-cyan" />
                  </div>
                  <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Qualified Lead</span>
                </div>

                {/* CRM Node */}
                <div className="flex flex-col items-center gap-2 z-10">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg hover:border-brand-teal/50 hover:bg-brand-teal/10 transition-all duration-300">
                    <Database className="w-5 h-5 text-gray-400" />
                  </div>
                  <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">MongoDB / CRM</span>
                </div>
              </div>

              {/* Final target row */}
              <div className="flex justify-end pr-2.5 z-10">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center shadow-lg animate-pulse">
                    <Send className="w-5 h-5 text-brand-cyan" />
                  </div>
                  <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Sales Team Notified</span>
                </div>
              </div>

              {/* Bottom activity log mock */}
              <div className="mt-4 border-t border-white/5 pt-3 flex justify-between items-center text-[10px] text-gray-500 font-mono">
                <span>$ python process_lead.py</span>
                <span className="text-brand-teal">✓ Success - Status: WON</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
