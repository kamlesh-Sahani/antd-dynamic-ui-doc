"use client";

import React, { useState } from "react";
import { Play, Code2, Sliders, FileJson, AlertCircle } from "lucide-react";
import PropsTable, { PropItem } from "./PropsTable";
import SchemaViewer from "./SchemaViewer";
import TroubleshootCard, { TroubleshootingItem } from "./TroubleshootCard";
import CodeBlock from "./CodeBlock";

export interface DocTabsProps {
  preview: React.ReactNode;
  code: string;
  propsList?: PropItem[];
  schema?: object | string;
  troubleshooting?: TroubleshootingItem[];
  defaultTab?: "preview" | "code" | "props" | "schema" | "troubleshooting";
}

export default function DocTabs({
  preview,
  code,
  propsList,
  schema,
  troubleshooting,
  defaultTab = "preview",
}: DocTabsProps) {
  const [activeTab, setActiveTab] = useState<string>(defaultTab);

  const tabs = [
    { id: "preview", label: "Live Preview", icon: Play },
    { id: "code", label: "Code Example", icon: Code2 },
    { id: "props", label: "Props & Config", icon: Sliders, count: propsList?.length },
    ...(schema ? [{ id: "schema", label: "Expected API Schema", icon: FileJson }] : []),
    ...(troubleshooting && troubleshooting.length > 0
      ? [{ id: "troubleshooting", label: "Troubleshooting", icon: AlertCircle, count: troubleshooting.length }]
      : []),
  ];

  return (
    <div className="my-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-xs overflow-hidden">
      {/* Tabs Header */}
      <div className="flex items-center gap-1 px-3 py-2 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/40 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? "bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-xs border border-zinc-200 dark:border-zinc-700 font-semibold"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
              }`}
            >
              <Icon size={14} className={isActive ? "text-blue-600 dark:text-blue-400" : "text-zinc-400"} />
              <span>{tab.label}</span>
              {typeof tab.count === "number" && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                      : "bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tabs Content */}
      <div className="p-6">
        {activeTab === "preview" && (
          <div className="p-6 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/30 min-h-[160px] flex items-center justify-center">
            <div className="w-full">{preview}</div>
          </div>
        )}

        {activeTab === "code" && (
          <div>
            <CodeBlock code={code} language="tsx" />
          </div>
        )}

        {activeTab === "props" && (
          <div>
            <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-2">Component Props Specification</h4>
            <PropsTable props={propsList || []} />
          </div>
        )}

        {activeTab === "schema" && schema && (
          <div>
            <SchemaViewer schema={schema} />
          </div>
        )}

        {activeTab === "troubleshooting" && troubleshooting && (
          <div>
            <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-2">
              Common Backend Response Mismatches & Solutions
            </h4>
            <TroubleshootCard items={troubleshooting} />
          </div>
        )}
      </div>
    </div>
  );
}
