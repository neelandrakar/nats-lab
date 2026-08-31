"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/config";
import { ChevronDown } from "lucide-react";

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <section className="py-24 bg-[#02050b] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-brand-teal uppercase tracking-widest block mb-3">
            Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQs List */}
        <div className="space-y-4">
          {siteConfig.faqs.map((faq, i) => {
            const isOpen = activeIndex === i;
            return (
              <div
                key={i}
                className="border border-white/5 bg-brand-surface rounded-2xl overflow-hidden transition-all duration-300"
              >
                {/* Header Toggle button */}
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-white/5 transition-colors focus:outline-none"
                >
                  <span className="text-sm sm:text-base font-bold text-white pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-brand-teal" : ""
                    }`}
                  />
                </button>

                {/* Body Content */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[300px] border-t border-white/5" : "max-h-0"
                  }`}
                >
                  <p className="p-6 text-xs sm:text-sm text-gray-400 leading-relaxed bg-brand-dark/20">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
