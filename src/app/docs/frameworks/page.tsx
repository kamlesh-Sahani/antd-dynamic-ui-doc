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
import "antd/dist/reset.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <ConfigProvider theme={{ token: { colorPrimary: "#2563eb", borderRadius: 8 } }}>
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
import "antd/dist/reset.css";

function Root() {
  const navigate = useNavigate();

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#2563eb", borderRadius: 8 } }}>
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
      <div className="space-y-3 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">Framework Integration</div>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          Integrating with Next.js & Vite
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          antd-dynamic-ui is isomorphic and runs smoothly on both SSR/SSG environments and client-only Single Page Applications.
        </p>
      </div>

      {/* Next.js App Router */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Next.js 14 / 15 (App Router)
          </h2>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          To prevent Flash of Unstyled Content (FOUC) and ensure Ant Design CSS is extracted during server-side rendering,
          install <code className="text-blue-500 font-mono">@ant-design/nextjs-registry</code> and wrap your Root Layout.
        </p>
        <CodeBlock code={nextAppRouterCode} language="tsx" filename="app/layout.tsx" />

        <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-4 leading-relaxed">
          Ensure <code className="text-blue-500 font-mono">transpilePackages</code> includes <code className="text-blue-500 font-mono">antd-dynamic-ui</code> in your Next.js config:
        </p>
        <CodeBlock code={nextConfigCode} language="javascript" filename="next.config.mjs" />
      </div>

      {/* Vite / React Router */}
      <div className="space-y-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Vite / Create React App / React Router SPA
          </h2>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          In a client-side SPA, wrap your root with <code className="text-blue-500 font-mono">ConfigProvider</code> and provide React Router’s <code className="text-blue-500 font-mono">navigate</code> function to <code className="text-blue-500 font-mono">DynamicUIProvider</code> so action buttons route without full page reloads.
        </p>
        <CodeBlock code={viteSetupCode} language="tsx" filename="src/main.tsx" />
      </div>
    </div>
  );
}
