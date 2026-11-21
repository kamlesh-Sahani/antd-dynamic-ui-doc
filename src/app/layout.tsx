import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import AntdProvider from "@/components/AntdProvider";
import Navbar from "@/components/Navbar";
import { RootJsonLd } from "@/components/JsonLd";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://antd-dynamic-ui-doc.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "./",
  },
  title: {
    template: "%s | antd-dynamic-ui",
    default: "antd-dynamic-ui | Schema-Driven UI Framework for Ant Design",
  },
  description:
    "Production-ready, highly optimized, JSON schema-driven Ant Design component suite for React 18/19 and Next.js. Featuring virtualized DynamicTable, Zod-powered DynamicForm, 22+ standard form controls, custom hooks, and comprehensive utilities.",
  keywords: [
    "antd",
    "ant-design",
    "dynamic-table",
    "dynamic-form",
    "react-hook-form",
    "zod",
    "virtualized-table",
    "nextjs",
    "react19",
    "schema-driven",
  ],
  authors: [{ name: "Kamlesh Sahani" }],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/logo.svg" },
    ],
    shortcut: ["/icon.svg"],
  },
  openGraph: {
    title: "antd-dynamic-ui | Schema-Driven UI Framework for Ant Design",
    description:
      "Build high-performance enterprise dashboards with declarative JSON schemas, virtualized tables, and automated Zod form validation.",
    type: "website",
    locale: "en_US",
    siteName: "antd-dynamic-ui Documentation",
    images: [
      {
        url: "/logo.svg",
        width: 120,
        height: 120,
        alt: "antd-dynamic-ui Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "antd-dynamic-ui | Enterprise Schema-Driven UI Suite",
    description: "Declarative React & Next.js Ant Design engine with virtualized tables and Zod validation.",
    images: ["/logo.svg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <RootJsonLd />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#fbf8f2] text-[#362117] antialiased font-sans selection:bg-[#ede5d8] selection:text-[#362117]"
      >
        <AntdRegistry>
          <AntdProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">{children}</main>
            </div>
          </AntdProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
