"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Bot, User, Database, ShieldCheck, Zap, Mail, ArrowRight, Play, RotateCcw } from "lucide-react";

const workflowSteps = [
  {
    title: "Visitor Arrives",
    description: "User lands on the site from Google/Ads."
  },
  {
    title: "AI Greeting",
    description: "Chatbot opens instantly to capture interest."
  },
  {
    title: "Intent Capture",
    description: "Details project requirements, budget, and contact."
  },
  {
    title: "Lead Qualification",
    description: "AI evaluates lead score based on target client criteria."
  },
  {
    title: "MongoDB Sync",
    description: "Lead record created instantly in MongoDB database."
  },
  {
    title: "Instant Slack Alert",
    description: "Dispatches automated notification to your sales team."
  },
  {
    title: "Follow-up Trigger",
    description: "Sends customized welcome email & calendar link."
  }
];

export default function FeaturedSolution() {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Simulating the flow
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setStep((prevStep) => (prevStep + 1) % workflowSteps.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleReset = () => {
    setStep(0);
    setIsPlaying(true);
  };

  // Mock data for UI state based on active step
  const getChatMessages = () => {
    if (step === 0) return [];
    if (step === 1) return [{ role: "assistant", content: "Hi! I am the sales assistant. What are you looking to build or automate?" }];
    if (step === 2) {
      return [
        { role: "assistant", content: "Hi! I am the sales assistant. What are you looking to build or automate?" },
        { role: "user", content: "I need a B2B distributor portal for my manufacturing business. Budget is around ₹1.5L." }
      ];
    }
    return [
      { role: "assistant", content: "Hi! I am the sales assistant. What are you looking to build or automate?" },
      { role: "user", content: "I need a B2B distributor portal for my manufacturing business. Budget is around ₹1.5L." },
      { role: "assistant", content: "That fits our custom software tier perfectly. Could I get your name and email to save these specifications?" },
      { role: "user", content: "Sure, Arjun Mehta (arjun@apexmanufacturing.com)." }
    ];
  };

  const getLeadInfo = () => {
    if (step < 3) return { name: "...", email: "...", service: "...", budget: "...", score: 0, status: "WAITING" };
    if (step === 3) return { name: "Arjun Mehta", email: "arjun@apex...", service: "Custom Portal", budget: "₹1.5L", score: 94, status: "QUALIFYING" };
    return { name: "Arjun Mehta", email: "arjun@apexmanufacturing.com", service: "Custom Software", budget: "₹1.5L", score: 96, status: "QUALIFIED" };
  };

  const leadInfo = getLeadInfo();

  return (
    <section className="py-24 bg-brand-dark relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-teal/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-brand-teal uppercase tracking-widest block mb-3">
            Featured Solution
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight mb-4">
            Turn every enquiry into an opportunity.
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            Below is a live visualization of an AI Lead Qualification Agent & Workflow. We design, build, and deploy systems like this tailored to your sales process.
          </p>
        </div>

        {/* Dashboard Interface Mockup */}
        <div className="bg-[#0b0f19] border border-white/10 rounded-3xl p-6 lg:p-8 shadow-2xl relative">
          
          {/* Simulation Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center border-b border-white/5 pb-6 mb-8 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-brand-teal animate-ping"></div>
              <span className="text-sm font-semibold text-white">Simulation Pipeline:</span>
              <span className="text-xs text-gray-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full font-mono">
                Step {step + 1} of {workflowSteps.length} — {workflowSteps[step].title}
              </span>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs flex items-center gap-1.5 transition-colors border border-white/10"
              >
                {isPlaying ? (
                  <>
                    <span className="w-2 h-2 rounded bg-amber-500 block"></span> Pause
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-brand-teal fill-brand-teal" /> Resume
                  </>
                )}
              </button>
              <button
                onClick={handleReset}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs flex items-center gap-1.5 transition-colors border border-white/10"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Restart
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Timeline Workflow (Col-span 4) */}
            <div className="lg:col-span-4 flex flex-col justify-center gap-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Automated Steps</h4>
              <div className="space-y-4">
                {workflowSteps.map((ws, i) => (
                  <div
                    key={ws.title}
                    onClick={() => { setStep(i); setIsPlaying(false); }}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      i === step
                        ? "bg-brand-teal/10 border-brand-teal text-white"
                        : i < step
                        ? "bg-emerald-500/5 border-emerald-500/10 text-gray-400"
                        : "bg-transparent border-transparent text-gray-600 hover:text-gray-400"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        i === step
                          ? "bg-brand-teal text-white"
                          : i < step
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-white/5 text-gray-600 border border-white/5"
                      }`}>
                        {i + 1}
                      </span>
                      <span className="text-xs font-bold">{ws.title}</span>
                    </div>
                    {i === step && (
                      <p className="text-[10px] text-gray-400 mt-1 pl-7">{ws.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Middle: Chat UI (Col-span 4) */}
            <div className="lg:col-span-4 bg-brand-dark/50 border border-white/5 rounded-2xl h-[360px] flex flex-col justify-between overflow-hidden shadow-inner">
              <div className="p-3 bg-white/5 border-b border-white/5 flex justify-between items-center">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5 text-brand-teal" /> AI Conversational Interface
                </span>
                <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse"></span>
              </div>
              
              {/* Chat logs */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 flex flex-col justify-end">
                {getChatMessages().length === 0 ? (
                  <div className="text-center text-xs text-gray-600 py-10">Waiting for visitor...</div>
                ) : (
                  getChatMessages().map((msg, i) => (
                    <div
                      key={i}
                      className={`flex gap-2 max-w-[85%] ${
                        msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl text-[11px] leading-relaxed ${
                        msg.role === "user"
                          ? "bg-brand-teal text-white rounded-tr-none"
                          : "bg-white/5 border border-white/10 text-gray-300 rounded-tl-none"
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-3 border-t border-white/5 bg-[#0b0f19] text-[10px] text-gray-500 italic flex justify-between">
                <span>AI is thinking...</span>
                <span>Agent Status: Live</span>
              </div>
            </div>

            {/* Right: Lead Data Profile (Col-span 4) */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              
              {/* Live Card */}
              <div className="bg-[#121824] border border-white/10 rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-brand-cyan/5 rounded-full blur-2xl"></div>
                
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="text-[10px] font-semibold tracking-wider text-gray-500 uppercase">MongoDB Lead Document</h5>
                    <h4 className="text-base font-bold text-white mt-1">Lead ID: {step >= 3 ? "L_88329b" : "..."}</h4>
                  </div>
                  {step >= 3 && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      step >= 4 ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
                    }`}>
                      {leadInfo.status}
                    </span>
                  )}
                </div>

                <div className="space-y-2 mt-2 text-xs font-mono">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-gray-500">Name:</span>
                    <span className="text-gray-300">{leadInfo.name}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-gray-500">Email:</span>
                    <span className="text-gray-300">{leadInfo.email}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-gray-500">Service:</span>
                    <span className="text-brand-teal">{leadInfo.service}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-gray-500">Budget:</span>
                    <span className="text-brand-cyan">{leadInfo.budget}</span>
                  </div>
                </div>

                {/* Score Bar */}
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-semibold text-gray-500 uppercase">Lead Qualification Score</span>
                    <span className="text-xs font-bold text-brand-teal">{leadInfo.score}%</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5">
                    <div
                      className="bg-gradient-to-r from-brand-teal to-brand-cyan h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${leadInfo.score}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Alert Mock */}
              <div className="bg-[#121824] border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                    step >= 5 ? "bg-brand-teal/15 text-brand-teal" : "bg-white/5 text-gray-500"
                  }`}>
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Slack/SMS Dispatcher</h4>
                    <p className="text-[10px] text-gray-500">{step >= 5 ? "Alert sent to Sales Representative" : "Idle"}</p>
                  </div>
                </div>
                {step >= 5 && (
                  <span className="text-[10px] bg-brand-teal/20 text-brand-teal border border-brand-teal/30 px-2 py-0.5 rounded font-bold uppercase animate-pulse">
                    Fired
                  </span>
                )}
              </div>
            </div>

          </div>
          
          {/* Final Callout */}
          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-xs text-gray-400">
              Need custom integrations to automatically sync leads, trigger WhatsApp alerts, or manage inventory?
            </span>
            <Link
              href="/contact?service=Business%20Automation"
              className="text-xs font-semibold text-brand-accent hover:text-white flex items-center gap-1.5 transition-colors group"
            >
              Build this for my business
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
