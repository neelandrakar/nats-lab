import Image from "next/image";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-brand-dark">
      <div className="flex flex-col items-center gap-4">
        {/* Pulsing official branding logo */}
        <div className="flex items-center animate-pulse">
          <Image
            src="/logo.png"
            alt="Nats LAB Loading..."
            width={160}
            height={80}
            className="h-14 w-auto object-contain"
            priority
          />
        </div>
        {/* Modern thin loading progress line */}
        <div className="w-48 bg-black/10 rounded-full h-0.5 overflow-hidden">
          <div className="bg-brand-accent h-full w-1/3 rounded-full animate-loading-slide"></div>
        </div>
      </div>
    </div>
  );
}
