export default function Loading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-brand-dark">
      <div className="flex flex-col items-center gap-4">
        {/* Pulsing branding logo */}
        <div className="font-bold text-2xl tracking-tight text-white flex items-center animate-pulse">
          NATS
          <span className="text-brand-accent ml-1 font-extrabold px-1.5 py-0.5 rounded bg-brand-accent/15 border border-brand-accent/30 text-xs">
            LAB
          </span>
        </div>
        {/* Modern thin loading progress line */}
        <div className="w-48 bg-white/5 rounded-full h-0.5 overflow-hidden">
          <div className="bg-brand-accent h-full w-1/3 rounded-full animate-loading-slide"></div>
        </div>
      </div>
    </div>
  );
}
