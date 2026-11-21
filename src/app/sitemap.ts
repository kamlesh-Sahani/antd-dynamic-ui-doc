import { MetadataRoute } from "next";
import { COMPONENTS_DATA } from "@/data/componentsData";
import { HOOKS_DATA } from "@/data/hooksData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://antd-dynamic-ui.dev";

  const staticRoutes = [
    "",
    "/docs",
    "/docs/installation",
    "/docs/frameworks",
    "/docs/theming",
    "/docs/utils",
    "/docs/troubleshooting",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const componentRoutes = Object.keys(COMPONENTS_DATA).map((slug) => ({
    url: `${baseUrl}/docs/components/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: slug === "dynamic-table" || slug === "dynamic-form" ? 0.9 : 0.7,
  }));

  const hookRoutes = Object.keys(HOOKS_DATA).map((slug) => ({
    url: `${baseUrl}/docs/hooks/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...componentRoutes, ...hookRoutes];
}
