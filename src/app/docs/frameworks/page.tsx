import React from "react";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "Framework Integration (Next.js & Vite)",
  description: "Step-by-step setup guides for Next.js 15 App Router, Pages Router, and Vite React SPAs.",
};

export default function FrameworksPage() {
  const nextAppRouterCode = `// app/layout.tsx
import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { DynamicUIProvider } from "antd-dynamic-ui";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <html lang="en">
      <body className="bg-[#fbf8f2] text-[#362117]">
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#e05d44",
                colorBgBase: "#fbf8f2",
                colorText: "#362117",
                borderRadius: 12,
              },
            }}
          >
            <DynamicUIProvider onNavigate={(url) => router.push(url)}>
              {children}
            </DynamicUIProvider>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}`;

  const nextConfigCode = `// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["antd-dynamic-ui"],
};

export default nextConfig;`;

  const viteSetupCode = `// src/main.tsx (Vite / React Router)
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { ConfigProvider } from "antd";
import { DynamicUIProvider } from "antd-dynamic-ui";
import App from "./App";

function Root() {
  const navigate = useNavigate();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#e05d44",
          colorBgBase: "#fbf8f2",
          colorText: "#362117",
          borderRadius: 12,
        },
      }}
    >
      <DynamicUIProvider onNavigate={(url) => navigate(url)}>
        <App />
      </DynamicUIProvider>
    </ConfigProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </React.StrictMode>
);`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-[#ede5d8]">
        <div className="text-xs font-bold text-[#785c4b] uppercase tracking-wider">Framework Integration</div>
        <h1 className="text-3xl font-extrabold tracking-tight text-[#362117]">
          Integrating with Next.js & Vite
        </h1>
        <p className="text-sm text-[#5c4738] leading-relaxed">
          antd-dynamic-ui is isomorphic and runs smoothly on both SSR/SSG environments and client-only Single Page Applications.
        </p>
      </div>

      {/* Next.js App Router */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#c4432b]" />
          <h2 className="text-xl font-bold text-[#362117]">
            Next.js 14 / 15 (App Router)
          </h2>
        </div>
        <p className="text-sm text-[#5c4738] leading-relaxed">
          To prevent Flash of Unstyled Content (FOUC) and ensure Ant Design CSS is extracted during server-side rendering,
          install <code className="text-[#362117] bg-[#f5eee3] px-1.5 py-0.5 rounded font-mono border border-[#ede5d8]">@ant-design/nextjs-registry</code> and wrap your Root Layout.
        </p>
        <CodeBlock code={nextAppRouterCode} language="tsx" filename="app/layout.tsx" />

        <p className="text-sm text-[#5c4738] mt-4 leading-relaxed">
          Ensure <code className="text-[#362117] bg-[#f5eee3] px-1.5 py-0.5 rounded font-mono border border-[#ede5d8]">transpilePackages</code> includes <code className="text-[#362117] bg-[#f5eee3] px-1.5 py-0.5 rounded font-mono border border-[#ede5d8]">antd-dynamic-ui</code> in your Next.js config:
        </p>
        <CodeBlock code={nextConfigCode} language="javascript" filename="next.config.mjs" />
      </div>

      {/* Vite / React Router */}
      <div className="space-y-4 pt-6 border-t border-[#ede5d8]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#437a3b]" />
          <h2 className="text-xl font-bold text-[#362117]">
            Vite / Create React App / React Router SPA
          </h2>
        </div>
        <p className="text-sm text-[#5c4738] leading-relaxed">
          In a client-side SPA, wrap your root with <code className="text-[#362117] bg-[#f5eee3] px-1.5 py-0.5 rounded font-mono border border-[#ede5d8]">ConfigProvider</code> and provide React Router’s <code className="text-[#362117] bg-[#f5eee3] px-1.5 py-0.5 rounded font-mono border border-[#ede5d8]">navigate</code> function to <code className="text-[#362117] bg-[#f5eee3] px-1.5 py-0.5 rounded font-mono border border-[#ede5d8]">DynamicUIProvider</code> so action buttons route without full page reloads.
        </p>
        <CodeBlock code={viteSetupCode} language="tsx" filename="src/main.tsx" />
      </div>
    </div>
  );
}
