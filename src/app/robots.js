import { siteConfig } from "@/lib/config";

export default function robots() {
  const baseUrl = siteConfig.url || "https://natslab.com";
  
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin", // Protect admin workspace from index visibility
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
