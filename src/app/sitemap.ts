import { MetadataRoute } from "next";
import { COMPONENTS_DATA } from "@/data/componentsData";
import { HOOKS_DATA } from "@/data/hooksData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://antd-dynamic-ui.vercel.app";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/docs/installation`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/docs/frameworks`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/docs/theming`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/docs/utils`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const componentRoutes: MetadataRoute.Sitemap = Object.keys(COMPONENTS_DATA).map(
    (slug) => {
      const isFlagship = slug === "dynamic-table" || slug === "dynamic-form";
      return {
        url: `${baseUrl}/docs/components/${slug}`,
        lastModified: now,
        changeFrequency: isFlagship ? "weekly" : "monthly",
        priority: isFlagship ? 0.9 : 0.8,
      };
    }
  );

  const hookRoutes: MetadataRoute.Sitemap = Object.keys(HOOKS_DATA).map((slug) => ({
    url: `${baseUrl}/docs/hooks/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...componentRoutes, ...hookRoutes];
}
