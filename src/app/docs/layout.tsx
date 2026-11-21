"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex min-h-[calc(100vh-4rem)]">
      <div className="hidden lg:block shrink-0">
        <Sidebar />
      </div>
      <div className="flex-1 min-w-0 py-8 px-4 sm:px-8 lg:px-12 w-full">
        {children}
      </div>
    </div>
  );
}
