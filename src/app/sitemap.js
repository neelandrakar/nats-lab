import { siteConfig } from "@/lib/config";
import { demoProjects } from "@/lib/demo-projects";

export default async function sitemap() {
  const baseUrl = siteConfig.url || "https://natslab.com";

  // Base routes
  const routes = ["", "/services", "/work", "/about", "/contact"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Project dynamic routes
  const projectRoutes = demoProjects.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...routes, ...projectRoutes];
}
