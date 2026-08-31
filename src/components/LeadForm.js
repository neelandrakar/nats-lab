"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/config";

// Zod Schema matching Lead model requirements
const leadFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().min(1, "Please select a budget range"),
  message: z.string().min(10, "Please explain your project details (min 10 characters)")
});

export default function LeadForm({ defaultService = "", defaultIndustry = "" }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      service: defaultService || "",
      budget: "",
      message: defaultIndustry ? `Interested in industry automation solutions for: ${defaultIndustry}.\n\n` : ""
    }
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...data,
          source: "Website Contact Form"
        })
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || "Failed to submit form. Please try again.");
      }

      setIsSuccess(true);
      reset();
    } catch (err) {
      console.error("Form submit error:", err);
      setSubmitError(err.message || "Something went wrong. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const servicesList = [
    "Website",
    "Web Application",
    "AI Agent",
    "AI Chatbot",
    "Business Automation",
    "Custom Software",
    "Mobile App",
    "API / Integration",
    "Maintenance",
    "Other"
  ];

  if (isSuccess) {
    return (
      <div className="p-8 sm:p-12 bg-[#fffdf9] border border-emerald-600/20 rounded-3xl shadow-sm text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-600/10 border border-emerald-600/30 flex items-center justify-center mx-auto text-emerald-700">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-[#171717] flex items-center justify-center gap-2">
            Project Scope Captured! <Sparkles className="w-5 h-5 text-emerald-600" />
          </h2>
          <p className="text-sm text-[#6d6d68] max-w-md mx-auto leading-relaxed">
            Thank you for reaching out to NATS Lab. Your project details have been securely logged in our lead database. 
            Founder Neelandra Kar will analyze your requirements and get back to you within 24 business hours.
          </p>
        </div>
        <button
          onClick={() => setIsSuccess(false)}
          className="text-xs font-semibold text-[#234b3a] hover:underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-[#fffdf9] border border-[#deddd6] p-6 sm:p-10 rounded-3xl shadow-sm relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#6d6d68] mb-2">Name *</label>
          <input
            type="text"
            {...register("name")}
            className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none"
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1 font-semibold">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#6d6d68] mb-2">Email *</label>
          <input
            type="email"
            {...register("email")}
            className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none"
            placeholder="john@company.com"
          />
          {errors.email && (
            <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1 font-semibold">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Phone */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#6d6d68] mb-2">Phone / WhatsApp</label>
          <input
            type="text"
            {...register("phone")}
            className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none"
            placeholder="+91 99999 99999"
          />
        </div>

        {/* Company */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#6d6d68] mb-2">Company Name</label>
          <input
            type="text"
            {...register("company")}
            className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none"
            placeholder="Acme Manufacturing"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Service Dropdown */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#6d6d68] mb-2">Service Needed *</label>
          <select
            {...register("service")}
            className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none"
          >
            <option value="">Select a service...</option>
            {servicesList.map((srv) => (
              <option key={srv} value={srv}>
                {srv}
              </option>
            ))}
          </select>
          {errors.service && (
            <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1 font-semibold">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.service.message}
            </p>
          )}
        </div>

        {/* Budget Dropdown */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#6d6d68] mb-2">Estimated Budget Range *</label>
          <select
            {...register("budget")}
            className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none"
          >
            <option value="">Select a budget...</option>
            {siteConfig.budgets.map((b) => (
              <option key={b.value} value={b.label}>
                {b.label}
              </option>
            ))}
          </select>
          {errors.budget && (
            <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1 font-semibold">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.budget.message}
            </p>
          )}
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#6d6d68] mb-2">Project Details & Requirements *</label>
        <textarea
          {...register("message")}
          rows="4"
          className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none"
          placeholder="Tell us what you are trying to build, automate, or optimize. What is the current manual process?"
        />
        {errors.message && (
          <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1 font-semibold">
            <AlertCircle className="w-3.5 h-3.5" /> {errors.message.message}
          </p>
        )}
      </div>

      {/* API Error Notification */}
      {submitError && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-600 text-xs flex items-center gap-2.5 font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-brand-accent hover:bg-brand-accent/90 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 btn btn-dark"
      >
        {isSubmitting ? (
          <>
            <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
            Submitting spec...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" /> Start a Project
          </>
        )}
      </button>
    </form>
  );
}
