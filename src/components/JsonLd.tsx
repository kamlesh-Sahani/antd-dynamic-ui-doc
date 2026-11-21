import React from "react";
import { ComponentDoc } from "@/data/componentsData";
import { HookDoc } from "@/data/hooksData";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://antd-dynamic-ui.vercel.app";

/**
 * Root Schema: SoftwareApplication + WebSite for Google Rich Results
 */
export function RootJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `${BASE_URL}/#software`,
        name: "antd-dynamic-ui",
        operatingSystem: "Any",
        applicationCategory: "DeveloperApplication",
        description:
          "Production-ready, highly optimized, JSON schema-driven Ant Design component suite for React 18/19 and Next.js 15. Features virtualized DynamicTable, Zod-powered DynamicForm, 22+ standard form controls, custom hooks, and comprehensive utilities.",
        license: "https://opensource.org/licenses/MIT",
        programmingLanguage: ["TypeScript", "JavaScript"],
        softwareVersion: "1.0.0",
        author: {
          "@type": "Person",
          name: "Kamlesh Sahani",
          url: "https://github.com/kamlesh-Sahani",
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "antd-dynamic-ui Documentation",
        description:
          "Official documentation and interactive live playground for antd-dynamic-ui schema-driven UI suite.",
        publisher: {
          "@id": `${BASE_URL}/#software`,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Component Schema: TechArticle + SoftwareSourceCode + BreadcrumbList + FAQPage
 */
export function ComponentJsonLd({ item }: { item: ComponentDoc }) {
  const pageUrl = `${BASE_URL}/docs/components/${item.slug}`;

  // Generate high-intent FAQs based on the component's category and features
  const faqItems = [
    {
      question: `What is ${item.title} in antd-dynamic-ui?`,
      answer: `${item.title} is a ${item.category.toLowerCase()} component in antd-dynamic-ui. ${item.description}`,
    },
    {
      question: `How do I configure and use ${item.title} with Ant Design?`,
      answer: `Import ${item.title} from "antd-dynamic-ui" and pass declarative schema props. For example, ${item.examples?.[0]?.description || "standard integration with default parameters"}. Complete TypeScript code snippets and live interactive sandbox previews are available in the documentation.`,
    },
    ...(item.features && item.features.length > 0
      ? [
          {
            question: `What are the key performance features of ${item.title}?`,
            answer: `${item.title} provides: ${item.features.slice(0, 4).join("; ")}.`,
          },
        ]
      : []),
    {
      question: `Is ${item.title} compatible with React 19 and Next.js 15?`,
      answer: `Yes, ${item.title} and the entire antd-dynamic-ui library are strictly tested and optimized for React 19 and Next.js 15 App Router using @ant-design/nextjs-registry to ensure zero hydration mismatches.`,
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${pageUrl}#article`,
        headline: `${item.title} Component - antd-dynamic-ui`,
        description: item.summary,
        url: pageUrl,
        inLanguage: "en-US",
        mainEntityOfPage: pageUrl,
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
          url: BASE_URL,
          logo: {
            "@type": "ImageObject",
            url: `${BASE_URL}/logo.svg`,
          },
        },
        about: {
          "@type": "SoftwareSourceCode",
          name: item.title,
          programmingLanguage: "TypeScript",
          runtimePlatform: "React 19 / Next.js 15",
          codeSampleType: "full snippet",
          sampleType: "code snippet",
          text: item.code,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: BASE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Documentation",
            item: `${BASE_URL}/docs`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Components",
            item: `${BASE_URL}/docs/components/dynamic-table`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: item.title,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: faqItems.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Hook Schema: TechArticle + BreadcrumbList
 */
export function HookJsonLd({ item }: { item: HookDoc }) {
  const pageUrl = `${BASE_URL}/docs/hooks/${item.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${pageUrl}#article`,
        headline: `${item.title} Hook - antd-dynamic-ui`,
        description: item.summary,
        url: pageUrl,
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
          url: BASE_URL,
          logo: {
            "@type": "ImageObject",
            url: `${BASE_URL}/logo.svg`,
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: BASE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Documentation",
            item: `${BASE_URL}/docs`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Hooks",
            item: `${BASE_URL}/docs/hooks/use-fetch`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: item.title,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
