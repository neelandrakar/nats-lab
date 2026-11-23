import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="container footer-inner items-center">
        <Link href="/" className="flex items-center gap-2" aria-label="Nats LAB Home">
          <Image
            src="/logo-horizontal.png"
            alt="Nats LAB"
            width={130}
            height={26}
            className="h-6 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
          />
        </Link>
        <span>© 2026 NATS Lab · Software • Web • Automation</span>
      </div>
    </footer>
  );
}
