import React from "react";
import CodeBlock from "@/components/CodeBlock";
import { AlertTriangle, Package, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Installation & Setup",
  description: "Install antd-dynamic-ui and its peer dependencies with npm, pnpm, yarn, or bun.",
};

export default function InstallationPage() {
  const npmCmd = `npm install antd-dynamic-ui antd @ant-design/icons react-hook-form zod dayjs`;
  const pnpmCmd = `pnpm add antd-dynamic-ui antd @ant-design/icons react-hook-form zod dayjs`;
  const yarnCmd = `yarn add antd-dynamic-ui antd @ant-design/icons react-hook-form zod dayjs`;
  const bunCmd = `bun add antd-dynamic-ui antd @ant-design/icons react-hook-form zod dayjs`;

  const react19Note = `// If installing on React 19, use the --legacy-peer-deps flag if any third-party peer dependency has not updated its peer ranges:
npm install antd-dynamic-ui --legacy-peer-deps`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-[#ede5d8]">
        <div className="text-xs font-bold text-[#785c4b] uppercase tracking-wider">Getting Started</div>
        <h1 className="text-3xl font-extrabold tracking-tight text-[#362117]">
          Installation & Dependencies
        </h1>
        <p className="text-sm text-[#5c4738] leading-relaxed">
          antd-dynamic-ui requires React 18+ or 19+, Ant Design 5+, and modern form validation libraries.
        </p>
      </div>

      {/* Package Managers */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-[#362117] flex items-center gap-2">
          <Package size={18} className="text-[#c4432b]" />
          <span>Package Manager Installation</span>
        </h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-xs font-bold text-[#785c4b] uppercase tracking-wider mb-1.5">npm</h3>
            <CodeBlock code={npmCmd} language="bash" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#785c4b] uppercase tracking-wider mb-1.5">pnpm</h3>
            <CodeBlock code={pnpmCmd} language="bash" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#785c4b] uppercase tracking-wider mb-1.5">yarn</h3>
            <CodeBlock code={yarnCmd} language="bash" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#785c4b] uppercase tracking-wider mb-1.5">bun</h3>
            <CodeBlock code={bunCmd} language="bash" />
          </div>
        </div>
      </div>

      {/* Peer Dependencies Table */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-[#362117] flex items-center gap-2">
          <ShieldCheck size={18} className="text-[#437a3b]" />
          <span>Peer Dependencies Overview</span>
        </h2>
        <div className="overflow-x-auto border border-[#ede5d8] bg-white rounded-xl shadow-[0_1px_4px_rgba(54,33,23,0.04)]">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#f7f2ea] border-b border-[#ede5d8]">
                <th className="py-3 px-4 font-bold text-[#362117]">Package</th>
                <th className="py-3 px-4 font-bold text-[#362117]">Required Version</th>
                <th className="py-3 px-4 font-bold text-[#362117]">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ede5d8]">
              <tr className="hover:bg-[#fcfaf7]">
                <td className="py-3 px-4 font-mono font-bold text-[#362117]">react</td>
                <td className="py-3 px-4 font-mono text-[#785c4b]">&gt;=18.0.0 || ^19.0.0</td>
                <td className="py-3 px-4 text-[#5c4738]">Core React UI runtime</td>
              </tr>
              <tr className="hover:bg-[#fcfaf7]">
                <td className="py-3 px-4 font-mono font-bold text-[#362117]">antd</td>
                <td className="py-3 px-4 font-mono text-[#785c4b]">&gt;=5.0.0</td>
                <td className="py-3 px-4 text-[#5c4738]">Ant Design base component library</td>
              </tr>
              <tr className="hover:bg-[#fcfaf7]">
                <td className="py-3 px-4 font-mono font-bold text-[#362117]">@ant-design/icons</td>
                <td className="py-3 px-4 font-mono text-[#785c4b]">&gt;=5.0.0</td>
                <td className="py-3 px-4 text-[#5c4738]">Ant Design icon system for drawers, tables, and buttons</td>
              </tr>
              <tr className="hover:bg-[#fcfaf7]">
                <td className="py-3 px-4 font-mono font-bold text-[#362117]">react-hook-form</td>
                <td className="py-3 px-4 font-mono text-[#785c4b]">&gt;=7.0.0</td>
                <td className="py-3 px-4 text-[#5c4738]">High-performance form state engine without unnecessary re-renders</td>
              </tr>
              <tr className="hover:bg-[#fcfaf7]">
                <td className="py-3 px-4 font-mono font-bold text-[#362117]">zod</td>
                <td className="py-3 px-4 font-mono text-[#785c4b]">&gt;=3.20.0</td>
                <td className="py-3 px-4 text-[#5c4738]">Runtime schema parsing and client-side form validation</td>
              </tr>
              <tr className="hover:bg-[#fcfaf7]">
                <td className="py-3 px-4 font-mono font-bold text-[#362117]">dayjs</td>
                <td className="py-3 px-4 font-mono text-[#785c4b]">&gt;=1.11.0</td>
                <td className="py-3 px-4 text-[#5c4738]">Immutable lightweight date-time parsing for DateField & DateRangeField</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* React 19 Note */}
      <div className="rounded-2xl border border-[#ede5d8] bg-[#f5eee3] p-5 space-y-2 shadow-xs">
        <div className="flex items-center gap-2 text-[#c07212] font-bold text-sm">
          <AlertTriangle size={18} />
          <span>React 19 Installation Tip</span>
        </div>
        <p className="text-xs text-[#5c4738] leading-relaxed">
          antd-dynamic-ui is verified 100% compatible with React 19. If you encounter peer dependency warnings
          with legacy tooling during npm install, simply pass the <code className="text-[#c4432b] bg-white px-1.5 py-0.5 rounded font-mono border border-[#ede5d8]">--legacy-peer-deps</code> flag.
        </p>
        <CodeBlock code={react19Note} language="bash" />
      </div>
    </div>
  );
}
