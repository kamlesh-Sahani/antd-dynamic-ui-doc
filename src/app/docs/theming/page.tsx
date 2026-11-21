import React from "react";
import CodeBlock from "@/components/CodeBlock";
import { Palette, Sparkles, Sliders } from "lucide-react";

export const metadata = {
  title: "Theming & Design Tokens",
  description: "Customize Ant Design theme tokens, brand colors, and component styles with the warm cream palette.",
};

export default function ThemingPage() {
  const themeConfigCode = `import React from "react";
import { ConfigProvider, theme as antdTheme, App } from "antd";
import { DynamicUIProvider } from "antd-dynamic-ui";

export default function AppThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        algorithm: antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: "#e05d44",       // Warm terracotta coral accent
          colorBgBase: "#fbf8f2",        // Soft warm cream page background
          colorBgContainer: "#ffffff",   // Pure white card & container background
          colorText: "#362117",          // Deep warm espresso text
          colorTextSecondary: "#785c4b", // Warm cocoa subtitle text
          colorBorder: "#ede5d8",        // Subtle warm border
          borderRadius: 12,              // Soft rounded corner radius
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        },
        components: {
          Button: {
            borderRadius: 10,
            primaryColor: "#ffffff",
          },
          Table: {
            headerBg: "#f7f2ea",
            headerColor: "#362117",
            rowHoverBg: "#f9f5ee",
            borderColor: "#ede5d8",
          },
          Card: {
            headerBg: "#fbf8f2",
          },
        },
      }}
    >
      <App>
        <DynamicUIProvider
          theme={{
            primaryColor: "#e05d44",
            mode: "light",
            borderRadius: 12,
          }}
        >
          {children}
        </DynamicUIProvider>
      </App>
    </ConfigProvider>
  );
}`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-[#ede5d8]">
        <div className="text-xs font-bold text-[#785c4b] uppercase tracking-wider">Customization</div>
        <h1 className="text-3xl font-extrabold tracking-tight text-[#362117]">
          Theming & Design Tokens
        </h1>
        <p className="text-sm text-[#5c4738] leading-relaxed">
          antd-dynamic-ui seamlessly inherits your Ant Design 5.x Design Tokens and custom brand palettes.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold text-[#362117] flex items-center gap-2">
          <Palette size={18} className="text-[#c4432b]" />
          <span>Configuring Warm Cream & Toast Design Tokens</span>
        </h2>
        <p className="text-sm text-[#5c4738] leading-relaxed">
          Use Ant Design's <code className="text-[#362117] bg-[#f5eee3] px-1.5 py-0.5 rounded font-mono border border-[#ede5d8]">ConfigProvider</code> together with
          <code className="text-[#362117] bg-[#f5eee3] px-1.5 py-0.5 rounded font-mono border border-[#ede5d8]">DynamicUIProvider</code> to customize global colors,
          border radius, and typography across all tables, forms, and cards simultaneously:
        </p>
        <CodeBlock code={themeConfigCode} language="tsx" filename="AppThemeProvider.tsx" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4 pt-4">
        <div className="p-5 rounded-2xl border border-[#ede5d8] bg-white space-y-2 shadow-[0_2px_8px_rgba(54,33,23,0.04)]">
          <div className="flex items-center gap-2 font-bold text-sm text-[#362117]">
            <Sparkles size={16} className="text-[#c4432b]" />
            <span>Artisanal Warm Palette</span>
          </div>
          <p className="text-xs text-[#5c4738] leading-relaxed">
            Uses soft cream base (<code className="text-[#362117] font-mono">#fbf8f2</code>), warm toast text (<code className="text-[#362117] font-mono">#362117</code>),
            and terracotta accents (<code className="text-[#c4432b] font-mono">#e05d44</code>) for a welcoming, craft-first UI experience.
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-[#ede5d8] bg-white space-y-2 shadow-[0_2px_8px_rgba(54,33,23,0.04)]">
          <div className="flex items-center gap-2 font-bold text-sm text-[#362117]">
            <Sliders size={16} className="text-[#362117]" />
            <span>Full Token Inheritance</span>
          </div>
          <p className="text-xs text-[#5c4738] leading-relaxed">
            Every component automatically adapts to your token overrides: table header backgrounds, row hover highlights,
            input borders, and button radiuses without manual CSS classes.
          </p>
        </div>
      </div>
    </div>
  );
}
