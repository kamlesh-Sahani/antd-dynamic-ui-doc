"use client";

import React from "react";
import { ConfigProvider, theme as antdTheme, App } from "antd";
import { DynamicUIProvider } from "antd-dynamic-ui";
import { useRouter } from "next/navigation";

export default function AntdProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <ConfigProvider
      theme={{
        algorithm: antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: "#e05d44",
          colorBgBase: "#fbf8f2",
          colorBgContainer: "#ffffff",
          colorText: "#362117",
          colorTextSecondary: "#785c4b",
          colorBorder: "#ede5d8",
          colorBorderSecondary: "#f2ebde",
          borderRadius: 12,
          fontFamily: "inherit",
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
          onNavigate={(url) => router.push(url)}
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
}
