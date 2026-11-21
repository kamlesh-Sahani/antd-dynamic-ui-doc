"use client";

import React, { useEffect, useState } from "react";
import { ConfigProvider, theme as antdTheme, App } from "antd";
import { DynamicUIProvider } from "antd-dynamic-ui";
import { useRouter } from "next/navigation";

export default function AntdProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkDark();

    // Listen for theme changes on HTML element
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: "#2563eb",
          borderRadius: 8,
          fontFamily: "inherit",
        },
      }}
    >
      <App>
        <DynamicUIProvider
          onNavigate={(url) => router.push(url)}
          theme={{
            primaryColor: "#2563eb",
            mode: isDark ? "dark" : "light",
            borderRadius: 8,
          }}
        >
          {children}
        </DynamicUIProvider>
      </App>
    </ConfigProvider>
  );
}
