import React from "react";
import type { Metadata } from "next";
import UtilsView from "@/components/UtilsView";
import Breadcrumbs from "@/components/Breadcrumbs";
import { UTILS_DATA } from "@/data/utilsData";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://antd-dynamic-ui-doc.vercel.app";

export const metadata: Metadata = {
  title: "Pure Utilities & Type Guards Reference (15+ Utils) - antd-dynamic-ui",
  description:
    "Comprehensive documentation and interactive live sandbox for 15+ zero-dependency utility functions, Zod schema generators, color adjusters, and TypeScript type guards in antd-dynamic-ui.",
  alternates: {
    canonical: "/docs/utils",
  },
  keywords: [
    "generateZodSchema",
    "isSafeUrl",
    "adjustColor",
    "numberToWords",
    "antd-dynamic-ui utilities",
    "typescript type guards",
    "ant design helper functions",
    "form validation helpers",
  ],
  openGraph: {
    title: "Pure Utilities & Type Guards Reference | antd-dynamic-ui",
    description:
      "Interactive playground and complete API documentation for 15+ pure utilities including generateZodSchema, isSafeUrl, and adjustColor.",
    url: "/docs/utils",
    type: "article",
    images: [
      {
        url: "/logo.svg",
        width: 120,
        height: 120,
        alt: "antd-dynamic-ui Utilities Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "antd-dynamic-ui Utilities & Type Guards Reference",
    description:
      "15+ pure utility functions with interactive live browser sandbox.",
    images: ["/logo.svg"],
  },
};

export default function UtilsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${siteUrl}/docs/utils#article`,
        headline: "Pure Utilities & Type Guards Reference - antd-dynamic-ui",
        description:
          "15+ zero-dependency utility functions, schema generators, and 100% dogfooded type guards for Ant Design and React 19.",
        url: `${siteUrl}/docs/utils`,
        inLanguage: "en-US",
        datePublished: "2026-11-01T00:00:00Z",
        dateModified: new Date().toISOString(),
        author: {
          "@type": "Person",
          name: "Kamlesh Sahani",
          url: "https://github.com/kamlesh-Sahani",
        },
        publisher: {
          "@type": "Organization",
          name: "antd-dynamic-ui",
          url: siteUrl,
          logo: {
            "@type": "ImageObject",
            url: `${siteUrl}/logo.svg`,
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/docs/utils#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Documentation",
            item: `${siteUrl}/docs`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Utilities & Type Guards",
            item: `${siteUrl}/docs/utils`,
          },
        ],
      },
    ],
  };

  return (
    <article
      itemScope
      itemType="https://schema.org/TechArticle"
      className="space-y-6"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs
        items={[
          { label: "Docs", href: "/docs" },
          { label: "Utilities & Type Guards" },
        ]}
      />
      <UtilsView />
    </article>
  );
}
