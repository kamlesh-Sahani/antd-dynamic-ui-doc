"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 flex">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="flex-1 min-w-0 py-8 px-0 sm:px-6 lg:px-10 max-w-4xl">
        {children}
      </div>
    </div>
  );
}
