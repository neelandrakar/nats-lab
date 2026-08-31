import { AlertTriangle, Clock, RefreshCw, EyeOff, LayoutGrid, Cpu, Link } from "lucide-react";

export default function ProblemSection() {
  const problems = [
    {
      title: "Leads getting lost",
      description: "Inquiries sit in email inboxes or are forgotten, meaning missed revenue and lost sales opportunities.",
      icon: EyeOff,
    },
    {
      title: "Slow customer responses",
      description: "Customers expect instant replies. Waiting hours or days to answer standard questions leads them to competitors.",
      icon: Clock,
    },
    {
      title: "Repetitive manual tasks",
      description: "Copy-pasting data between spreadsheets, email templates, and CRM dashboards eats away productive hours.",
      icon: RefreshCw,
    },
    {
      title: "Scattered customer information",
      description: "Customer contacts, history, and invoices are split across multiple files and platforms that don't talk to each other.",
      icon: LayoutGrid,
    },
    {
      title: "Systems that don't communicate",
      description: "Your website, accounting package, CRM, and communication tools are silos, forcing manual data synchronizations.",
      icon: Link,
    },
    {
      title: "Wasted employee productivity",
      description: "Skilled staff spend their working days on basic administrative tasks that simple software could handle in seconds.",
      icon: Cpu,
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-brand-dark">
      {/* Decorative Blur */}
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-brand-teal/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="text-xs font-bold text-red-500 uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            The Operational Bottleneck
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            Your business shouldn&apos;t run on spreadsheets and repetitive manual work.
          </h2>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {problems.map((prob) => {
            const Icon = prob.icon;
            return (
              <div
                key={prob.title}
                className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all duration-300 flex flex-col gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 group-hover:text-red-400 group-hover:bg-red-500/10 group-hover:border-red-500/20 transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{prob.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{prob.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* NATS Lab Pivot Banner */}
        <div className="mt-24 p-8 sm:p-12 rounded-3xl bg-gradient-to-tr from-brand-surface to-[#0e1628] border border-white/10 relative overflow-hidden text-center max-w-4xl mx-auto">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-brand-teal/10 rounded-full blur-[80px] pointer-events-none"></div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 relative z-10">
            We turn these problems into <span className="accent-gradient">simple digital systems.</span>
          </h3>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed relative z-10">
            Instead of spending hours patching holes, we build customized web tools, software layers, and AI assistants that link your operations together seamlessly.
          </p>
        </div>
      </div>
    </section>
  );
}
