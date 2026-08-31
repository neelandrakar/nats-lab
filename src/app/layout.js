import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AiChatbot from "@/components/AiChatbot";
import { siteConfig } from "@/lib/config";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: `${siteConfig.companyName} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.companyName}`
  },
  description: siteConfig.description,
  keywords: ["AI automation", "software development", "business automation", "AI agents", "web development", "mobile app development", "custom CRM", "Neelandra Kar"],
  authors: [{ name: siteConfig.founder.name }],
  creator: siteConfig.founder.name,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: `${siteConfig.companyName} | Premium Software & AI Automation Studio`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.companyName,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.companyName} | Premium Software & AI Automation Studio`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <AiChatbot />
      </body>
    </html>
  );
}
