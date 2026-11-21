import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { COMPONENTS_DATA } from "@/data/componentsData";
import DocTabs from "@/components/DocTabs";
import DynamicTablePreview from "@/components/previews/DynamicTablePreview";
import DynamicFormPreview from "@/components/previews/DynamicFormPreview";
import DynamicModalPreview from "@/components/previews/DynamicModalPreview";
import DynamicDrawerPreview from "@/components/previews/DynamicDrawerPreview";
import DynamicCardPreview from "@/components/previews/DynamicCardPreview";
import DynamicHeaderPreview from "@/components/previews/DynamicHeaderPreview";
import DynamicSidebarPreview from "@/components/previews/DynamicSidebarPreview";
import FormFieldPreview from "@/components/previews/FormFieldPreview";
import { CheckCircle2, Layers } from "lucide-react";

interface ComponentPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(COMPONENTS_DATA).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: ComponentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = COMPONENTS_DATA[slug];

  if (!item) {
    return {
      title: "Component Not Found",
    };
  }

  return {
    title: `${item.title} Component - antd-dynamic-ui`,
    description: item.summary,
    keywords: [
      item.title,
      "antd-dynamic-ui",
      "ant design",
      "react component",
      item.category,
      "schema driven",
    ],
    openGraph: {
      title: `${item.title} | antd-dynamic-ui Documentation`,
      description: item.summary,
    },
  };
}

export default async function ComponentDetailPage({
  params,
}: ComponentPageProps) {
  const { slug } = await params;
  const item = COMPONENTS_DATA[slug];

  if (!item) {
    notFound();
  }

  const renderPreview = () => {
    switch (slug) {
      case "dynamic-table":
        return <DynamicTablePreview />;
      case "dynamic-form":
        return <DynamicFormPreview />;
      case "dynamic-modal":
        return <DynamicModalPreview />;
      case "dynamic-drawer":
        return <DynamicDrawerPreview />;
      case "dynamic-card":
        return <DynamicCardPreview />;
      case "dynamic-header":
        return <DynamicHeaderPreview />;
      case "dynamic-sidebar":
        return <DynamicSidebarPreview />;
      default:
        return <FormFieldPreview type={slug} />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Component Header */}
      <div className="space-y-3 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
            {item.category}
          </span>
          {item.badge && (
            <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-semibold border border-blue-200 dark:border-blue-800">
              {item.badge}
            </span>
          )}
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
          <Layers className="text-blue-600 dark:text-blue-400" size={28} />
          <span>{item.title}</span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-3xl">
          {item.description}
        </p>

        {/* Feature Highlights */}
        {item.features && item.features.length > 0 && (
          <div className="pt-4 grid sm:grid-cols-2 gap-2 text-xs text-zinc-700 dark:text-zinc-300">
            {item.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5-Tab Interface: Preview, Code, Props, Expected API Schema, Troubleshooting */}
      <div>
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          Interactive Documentation & Specifications
        </h2>
        <p className="text-xs text-zinc-500 mb-4">
          Switch between tabs below to test live components, inspect TypeScript props, verify expected backend JSON schemas, and troubleshoot API mismatches.
        </p>

        <DocTabs
          preview={renderPreview()}
          code={item.code}
          propsList={item.props}
          schema={item.schema}
          troubleshooting={item.troubleshooting}
        />
      </div>
    </div>
  );
}
