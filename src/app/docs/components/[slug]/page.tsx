import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { COMPONENTS_DATA } from "@/data/componentsData";
import PropsTable from "@/components/PropsTable";
import ExampleCard from "@/components/ExampleCard";
import SchemaViewer from "@/components/SchemaViewer";
import TroubleshootCard from "@/components/TroubleshootCard";
import DynamicTablePreview from "@/components/previews/DynamicTablePreview";
import DynamicFormPreview from "@/components/previews/DynamicFormPreview";
import DynamicModalPreview from "@/components/previews/DynamicModalPreview";
import DynamicDrawerPreview from "@/components/previews/DynamicDrawerPreview";
import DynamicCardPreview from "@/components/previews/DynamicCardPreview";
import DynamicHeaderPreview from "@/components/previews/DynamicHeaderPreview";
import DynamicSidebarPreview from "@/components/previews/DynamicSidebarPreview";
import FormFieldPreview from "@/components/previews/FormFieldPreview";
import {
  CheckCircle2,
  Layers,
  Play,
  Sliders,
  FileJson,
  AlertTriangle,
} from "lucide-react";

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

  const renderPreview = (exampleIndex: number = 0) => {
    switch (slug) {
      case "dynamic-table":
        return <DynamicTablePreview key={`dynamic-table-${exampleIndex}`} exampleIndex={exampleIndex} />;
      case "dynamic-form":
        return <DynamicFormPreview key={`dynamic-form-${exampleIndex}`} exampleIndex={exampleIndex} />;
      case "dynamic-modal":
        return <DynamicModalPreview key={`dynamic-modal-${exampleIndex}`} exampleIndex={exampleIndex} />;
      case "dynamic-drawer":
        return <DynamicDrawerPreview key={`dynamic-drawer-${exampleIndex}`} exampleIndex={exampleIndex} />;
      case "dynamic-card":
        return <DynamicCardPreview key={`dynamic-card-${exampleIndex}`} exampleIndex={exampleIndex} />;
      case "dynamic-header":
        return <DynamicHeaderPreview key={`dynamic-header-${exampleIndex}`} exampleIndex={exampleIndex} />;
      case "dynamic-sidebar":
        return <DynamicSidebarPreview key={`dynamic-sidebar-${exampleIndex}`} exampleIndex={exampleIndex} />;
      default:
        return <FormFieldPreview key={`${slug}-${exampleIndex}`} type={slug} exampleIndex={exampleIndex} />;
    }
  };

  const examplesList =
    item.examples && item.examples.length > 0
      ? item.examples
      : [
          {
            title: "Basic Setup",
            description: `Standard integration for ${item.title} with default configurations.`,
            code: item.code,
            language: "tsx",
            filename: `${item.title}.basic.tsx`,
          },
        ];

  return (
    <div className="space-y-12 pb-16">
      {/* 1. Header Section */}
      <div className="space-y-4 pb-8 border-b border-[#ede5d8]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#785c4b] uppercase tracking-wider">
            {item.category}
          </span>
          {item.badge && (
            <span className="text-[10px] font-sans px-2.5 py-0.5 rounded-full bg-[#f2ebde] text-[#785c4b] font-bold border border-[#ede5d8]">
              {item.badge}
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#362117] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#f5eee3] flex items-center justify-center text-[#362117] border border-[#ede5d8] shadow-xs">
            <Layers size={22} />
          </div>
          <span>{item.title}</span>
        </h1>

        <p className="text-sm sm:text-base text-[#5c4738] leading-relaxed max-w-3xl">
          {item.description}
        </p>

        {/* Feature Highlights */}
        {item.features && item.features.length > 0 && (
          <div className="pt-4 grid sm:grid-cols-2 gap-2.5 text-xs text-[#362117]">
            {item.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle2 size={15} className="text-[#437a3b] shrink-0 mt-0.5" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 2. Props & Configuration Table */}
      <section className="space-y-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#362117] flex items-center gap-2">
              <Sliders size={18} className="text-[#362117]" />
              <span>Props & Configuration</span>
            </h2>
            {item.props && item.props.length > 0 && (
              <span className="text-[10px] font-sans px-2.5 py-0.5 rounded-full bg-[#f2ebde] text-[#785c4b] font-bold border border-[#ede5d8]">
                {item.props.length} props
              </span>
            )}
          </div>
          <p className="text-xs text-[#8a7566]">
            Complete property specifications, parameter types, and default fallbacks.
          </p>
        </div>

        <PropsTable props={item.props || []} />
      </section>

      {/* 3. Interactive Examples & Live Demos */}
      <section className="space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#362117] flex items-center gap-2">
              <Play size={18} className="text-[#c4432b]" />
              <span>Interactive Examples & Live Previews</span>
            </h2>
            <span className="text-[10px] font-sans px-2.5 py-0.5 rounded-full bg-[#f2ebde] text-[#785c4b] font-bold border border-[#ede5d8]">
              {examplesList.length} Demos
            </span>
          </div>
          <p className="text-xs text-[#8a7566]">
            Every example includes its own live, interactive preview element alongside the corresponding copyable TypeScript snippet.
          </p>
        </div>

        <div className="space-y-8">
          {examplesList.map((example, idx) => (
            <ExampleCard
              key={`${slug}-example-card-${idx}`}
              index={idx}
              title={example.title}
              description={example.description}
              code={example.code}
              language={example.language || "tsx"}
              filename={example.filename}
              preview={renderPreview(idx)}
            />
          ))}
        </div>
      </section>

      {/* 4. Expected API Response Schema (if available) */}
      {item.schema && (
        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-[#362117] flex items-center gap-2">
              <FileJson size={18} className="text-[#c4432b]" />
              <span>Expected Backend API Response Schema</span>
            </h2>
            <p className="text-xs text-[#8a7566]">
              Ensure your backend endpoint returns JSON matching this exact structure to prevent hydration and rendering errors.
            </p>
          </div>

          <SchemaViewer schema={item.schema} />
        </section>
      )}

      {/* 5. Troubleshooting & Response Mismatches (if available) */}
      {item.troubleshooting && item.troubleshooting.length > 0 && (
        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-[#362117] flex items-center gap-2">
              <AlertTriangle size={18} className="text-[#c07212]" />
              <span>Common Response Mismatches & Solutions</span>
            </h2>
            <p className="text-xs text-[#8a7566]">
              Known backend schema pitfalls and side-by-side incorrect vs. expected payload fixes.
            </p>
          </div>

          <TroubleshootCard items={item.troubleshooting} />
        </section>
      )}
    </div>
  );
}
