import React from "react";
import CodeBlock from "@/components/CodeBlock";
import { Palette, Moon, Sun } from "lucide-react";

export const metadata = {
  title: "Theming & Customization",
  description: "Customize Ant Design theme tokens, brand colors, dark mode, and component styles.",
};

export default function ThemingPage() {
  const themeConfigCode = `import React from "react";
import { ConfigProvider, theme as antdTheme } from "antd";
import { DynamicUIProvider } from "antd-dynamic-ui";

export default function AppThemeProvider({ children, isDark }: { children: React.ReactNode; isDark: boolean }) {
  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: "#2563eb", // Tailwind Blue 600
          colorSuccess: "#10b981", // Emerald 500
          colorWarning: "#f59e0b", // Amber 500
          colorError: "#ef4444",   // Red 500
          borderRadius: 8,
          fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        },
        components: {
          Table: {
            headerBg: isDark ? "#18181b" : "#f4f4f5",
            rowHoverBg: isDark ? "#27272a" : "#f8fafc",
            borderColor: isDark ? "#27272a" : "#e4e4e7",
          },
          Card: {
            headerBg: "transparent",
          },
        },
      }}
    >
      <DynamicUIProvider
        theme={{
          primaryColor: "#2563eb",
          mode: isDark ? "dark" : "light",
          borderRadius: 8,
        }}
      >
        {children}
      </DynamicUIProvider>
    </ConfigProvider>
  );
}`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">Customization</div>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          Theming & Design Tokens
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          antd-dynamic-ui seamlessly inherits your Ant Design 5.x Design Tokens and Dark Mode algorithms.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Palette size={18} className="text-blue-500" />
          Configuring Design Tokens & Dark Mode
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          Use Ant Design's <code className="text-blue-500 font-mono">ConfigProvider</code> together with
          <code className="text-blue-500 font-mono">DynamicUIProvider</code> to customize global colors,
          border radius, and typography across all tables, forms, and cards simultaneously:
        </p>
        <CodeBlock code={themeConfigCode} language="tsx" filename="AppThemeProvider.tsx" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4 pt-4">
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
          <div className="flex items-center gap-2 font-semibold text-sm text-zinc-900 dark:text-zinc-100">
            <Sun size={16} className="text-amber-500" />
            <span>Light Mode</span>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Uses <code className="text-zinc-700 dark:text-zinc-300">antdTheme.defaultAlgorithm</code> with crisp borders,
            soft gray table headers (<code className="text-zinc-700 dark:text-zinc-300">#f4f4f5</code>), and blue primary accents.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
          <div className="flex items-center gap-2 font-semibold text-sm text-zinc-900 dark:text-zinc-100">
            <Moon size={16} className="text-indigo-400" />
            <span>Dark Mode</span>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Uses <code className="text-zinc-700 dark:text-zinc-300">antdTheme.darkAlgorithm</code> with deep zinc backgrounds
            (<code className="text-zinc-700 dark:text-zinc-300">#18181b</code>) and accessible contrast ratios.
          </p>
        </div>
      </div>
    </div>
  );
}
