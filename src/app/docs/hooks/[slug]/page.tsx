import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { HOOKS_DATA } from "@/data/hooksData";
import PropsTable from "@/components/PropsTable";
import CodeBlock from "@/components/CodeBlock";
import MultiCodeExamples from "@/components/MultiCodeExamples";
import SchemaViewer from "@/components/SchemaViewer";
import TroubleshootCard from "@/components/TroubleshootCard";
import { CheckCircle2, Cpu } from "lucide-react";

interface HookPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(HOOKS_DATA).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: HookPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = HOOKS_DATA[slug];

  if (!item) {
    return {
      title: "Hook Not Found",
    };
  }

  return {
    title: `${item.title} Hook - antd-dynamic-ui`,
    description: item.summary,
    keywords: [
      item.title,
      "react hook",
      "antd-dynamic-ui",
      "ant design",
      "typescript hook",
    ],
    openGraph: {
      title: `${item.title} Hook | antd-dynamic-ui Documentation`,
      description: item.summary,
    },
  };
}

export default async function HookDetailPage({ params }: HookPageProps) {
  const { slug } = await params;
  const item = HOOKS_DATA[slug];

  if (!item) {
    notFound();
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">
          Custom React Hook
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
          <Cpu className="text-blue-600 dark:text-blue-400" size={28} />
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

      {/* Code Examples */}
      <div className="space-y-2">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          Practical Hook Examples & Workflows
        </h2>
        <p className="text-xs text-zinc-500">
          Explore quickstart usage, full parameter integration, and production data workflows.
        </p>
        <MultiCodeExamples
          componentTitle={item.title}
          defaultCode={item.code}
          examples={(item as any).examples}
        />
      </div>

      {/* Parameters Table */}
      <div className="space-y-2">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          Hook Parameters
        </h2>
        <PropsTable props={item.params} />
      </div>

      {/* Return Values Table */}
      <div className="space-y-2">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          Return Object Properties
        </h2>
        <PropsTable props={item.returns} />
      </div>

      {/* Expected Schema if present */}
      {item.schema && (
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            Expected API Response Structure
          </h2>
          <SchemaViewer schema={item.schema} />
        </div>
      )}

      {/* Troubleshooting if present */}
      {item.troubleshooting && item.troubleshooting.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            Troubleshooting & Common Mistakes
          </h2>
          <TroubleshootCard items={item.troubleshooting} />
        </div>
      )}
    </div>
  );
}
