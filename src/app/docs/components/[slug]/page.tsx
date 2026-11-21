import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { COMPONENTS_DATA } from "@/data/componentsData";
import PropsTable from "@/components/PropsTable";
import MultiCodeExamples from "@/components/MultiCodeExamples";
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
  Code2,
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

      {/* 2. Live Interactive Preview */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-[#362117] flex items-center gap-2">
              <Play size={18} className="text-[#c4432b]" />
              <span>Live Interactive Preview</span>
            </h2>
            <p className="text-xs text-[#8a7566]">
              Interact with the live component directly in this browser sandbox.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-[#ede5d8] bg-white p-6 shadow-[0_2px_12px_rgba(54,33,23,0.04)]">
          {renderPreview()}
        </div>
      </section>

      {/* 3. Props & Configuration Table */}
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

      {/* 4. Interactive Code Examples & Features */}
      <section className="space-y-3">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-[#362117] flex items-center gap-2">
            <Code2 size={18} className="text-[#c4432b]" />
            <span>Interactive Code Examples & Features</span>
          </h2>
          <p className="text-xs text-[#8a7566]">
            Switch between practical examples below demonstrating basic setups, complete props, and declarative backend schemas.
          </p>
        </div>

        <MultiCodeExamples
          componentTitle={item.title}
          defaultCode={item.code}
          examples={item.examples}
        />
      </section>

      {/* 5. Expected API Response Schema (if available) */}
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

      {/* 6. Troubleshooting & Response Mismatches (if available) */}
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
