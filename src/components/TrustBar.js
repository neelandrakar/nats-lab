export default function TrustBar() {
  const capabilities = [
    "Web",
    "AI",
    "Automation",
    "Software",
    "Integrations",
  ];

  return (
    <section className="border-y border-white/5 bg-[#02050b]/80 backdrop-blur-sm py-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 md:gap-x-16 text-center">
          {capabilities.map((cap, i) => (
            <div key={cap} className="flex items-center gap-3">
              {i > 0 && (
                <span className="w-1.5 h-1.5 rounded-full bg-brand-teal/40 block"></span>
              )}
              <span className="text-sm font-semibold tracking-[0.2em] text-gray-400 uppercase hover:text-white transition-colors duration-200">
                {cap}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
