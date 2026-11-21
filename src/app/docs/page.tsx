import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "Introduction & Architecture",
  description: "Learn how antd-dynamic-ui turns declarative JSON schemas into high-performance Ant Design components.",
};

export default function DocsIntroPage() {
  const quickStartSnippet = `import React from "react";
import { DynamicTable } from "antd-dynamic-ui";

export default function UsersView() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">User Management</h2>
      <DynamicTable
        apiData={{
          apiUrl: "/api/v1/users",
          apiType: "get",
          params: { status: "active" },
        }}
        filterKey="users_grid"
        border={true}
      />
    </div>
  );
}`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-[#ede5d8]">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#785c4b] uppercase tracking-wider">
          <span>Overview</span>
          <span>•</span>
          <span>v1.0.0</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#362117]">
          Introduction to antd-dynamic-ui
        </h1>
        <p className="text-base text-[#5c4738] leading-relaxed">
          <strong className="text-[#362117]">antd-dynamic-ui</strong> is a next-generation, declarative UI framework
          designed for Ant Design 5.x and React 18/19. It eliminates boilerplate by allowing teams to drive tables,
          forms, modals, and layouts directly from clean, type-safe JSON schemas.
        </p>
      </div>

      {/* The Problem & Solution */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[#362117]">
          Why Schema-Driven UI?
        </h2>
        <p className="text-sm text-[#5c4738] leading-relaxed">
          In typical React enterprise apps, engineers write thousands of lines of repetitive JSX:
          configuring Ant Design table columns with custom render functions, wiring up
          form items with validation rules, managing pagination state, handling filter drawers,
          and writing ad-hoc responsive logic.
        </p>
        <p className="text-sm text-[#5c4738] leading-relaxed">
          <strong className="text-[#362117]">antd-dynamic-ui flips this paradigm:</strong> your backend or state management
          defines the schema (columns, fields, validation types, options), and the framework compiles
          it into optimized, accessible Ant Design components.
        </p>
      </div>

      {/* Feature Comparison */}
      <div className="my-6 overflow-x-auto border border-[#ede5d8] bg-white rounded-xl shadow-[0_1px_4px_rgba(54,33,23,0.04)]">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#f7f2ea] border-b border-[#ede5d8]">
              <th className="py-3 px-4 font-bold text-[#362117]">Capability</th>
              <th className="py-3 px-4 font-bold text-[#c4432b]">Traditional Ant Design</th>
              <th className="py-3 px-4 font-bold text-[#437a3b]">antd-dynamic-ui</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#ede5d8]">
            <tr className="hover:bg-[#fcfaf7]">
              <td className="py-3 px-4 font-bold text-[#362117]">Table Columns</td>
              <td className="py-3 px-4 text-[#785c4b]">Manual JSX renderers, explicit sorters and width logic</td>
              <td className="py-3 px-4 text-[#362117] font-semibold">Declarative JSON composite cell types (<code className="text-[#c4432b] bg-[#f5eee3] px-1 py-0.5 rounded font-mono">"STATUS"</code>, <code className="text-[#c4432b] bg-[#f5eee3] px-1 py-0.5 rounded font-mono">"IMAGE"</code>, <code className="text-[#c4432b] bg-[#f5eee3] px-1 py-0.5 rounded font-mono">"LINK"</code>)</td>
            </tr>
            <tr className="hover:bg-[#fcfaf7]">
              <td className="py-3 px-4 font-bold text-[#362117]">Form Validation</td>
              <td className="py-3 px-4 text-[#785c4b]">Manual Ant Design rules or custom async validators</td>
              <td className="py-3 px-4 text-[#362117] font-semibold">Automatic Zod compilation via <code className="text-[#437a3b] bg-[#f5eee3] px-1 py-0.5 rounded font-mono">generateZodSchema</code></td>
            </tr>
            <tr className="hover:bg-[#fcfaf7]">
              <td className="py-3 px-4 font-bold text-[#362117]">Virtual Scrolling</td>
              <td className="py-3 px-4 text-[#785c4b]">Requires complex virtual-list plugin integration</td>
              <td className="py-3 px-4 text-[#362117] font-semibold">Built-in adaptive 60fps virtualization (&gt;50 rows) with rAF throttling</td>
            </tr>
            <tr className="hover:bg-[#fcfaf7]">
              <td className="py-3 px-4 font-bold text-[#362117]">Column Reordering & Export</td>
              <td className="py-3 px-4 text-[#785c4b]">Requires third-party dnd-kit and xlsx wiring</td>
              <td className="py-3 px-4 text-[#362117] font-semibold">Out-of-the-box ColumnDrawer and DownloadModal built-in</td>
            </tr>
            <tr className="hover:bg-[#fcfaf7]">
              <td className="py-3 px-4 font-bold text-[#362117]">Type Safety & Guards</td>
              <td className="py-3 px-4 text-[#785c4b]">Prone to runtime errors on undefined fields</td>
              <td className="py-3 px-4 text-[#362117] font-semibold">100% dogfooded utility guards (<code className="text-[#362117] bg-[#f5eee3] px-1 py-0.5 rounded font-mono">isArray</code>, <code className="text-[#362117] bg-[#f5eee3] px-1 py-0.5 rounded font-mono">isObject</code>)</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Quick Start Snippet */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-[#362117]">
          5-Minute Quick Start
        </h2>
        <p className="text-sm text-[#5c4738]">
          Render a full featured table with pagination, column sorting, and custom cells with just a configuration array:
        </p>
        <CodeBlock code={quickStartSnippet} language="tsx" filename="UsersView.tsx" />
      </div>

      {/* Navigation Next steps */}
      <div className="pt-6 border-t border-[#ede5d8] grid sm:grid-cols-2 gap-4">
        <Link
          href="/docs/installation"
          className="p-5 rounded-2xl border border-[#ede5d8] hover:border-[#ded3c3] bg-white transition-all space-y-1 block shadow-[0_2px_8px_rgba(54,33,23,0.04)] hover:-translate-y-0.5"
        >
          <div className="text-xs font-bold text-[#785c4b] uppercase tracking-wider">Next Step</div>
          <div className="text-base font-extrabold text-[#362117] flex items-center justify-between">
            <span>Installation & Setup</span>
            <ArrowRight size={16} />
          </div>
          <p className="text-xs text-[#785c4b]">Install via npm, pnpm or yarn with peer dependencies.</p>
        </Link>

        <Link
          href="/docs/frameworks"
          className="p-5 rounded-2xl border border-[#ede5d8] hover:border-[#ded3c3] bg-white transition-all space-y-1 block shadow-[0_2px_8px_rgba(54,33,23,0.04)] hover:-translate-y-0.5"
        >
          <div className="text-xs font-bold text-[#785c4b] uppercase tracking-wider">Frameworks</div>
          <div className="text-base font-extrabold text-[#362117] flex items-center justify-between">
            <span>Next.js & Vite Integration</span>
            <ArrowRight size={16} />
          </div>
          <p className="text-xs text-[#785c4b]">Configure SSR registry, CSS extraction, and React 19.</p>
        </Link>
      </div>
    </div>
  );
}
