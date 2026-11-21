"use client";

import React, { useState } from "react";
import { StaticTable, TableDataType, TableColumnType } from "antd-dynamic-ui";

const sampleColumns: TableColumnType[] = [
  {
    id: "id",
    title: "ID",
    width: 80,
    sortable: true,
  },
  {
    id: "name",
    title: "User Profile",
    filterable: true,
  },
  {
    id: "role",
    title: "Role & Access",
    width: 140,
  },
  {
    id: "status",
    title: "Account Status",
    width: 120,
  },
  {
    id: "createdAt",
    title: "Registered",
    width: 150,
  },
];

const mockTableData: TableDataType = {
  columns: sampleColumns,
  rows: [
    {
      id: [{ type: "TEXT", title: "101", isBold: true }],
      name: [{ type: "TEXT", title: "Alexander Wright", subTitle: "alex@corp.io" }],
      role: [{ type: "STATUS", title: "Superadmin", bgColor: "#eff6ff", textColor: "#2563eb" }],
      status: [{ type: "STATUS", title: "Active", bgColor: "#ecfdf5", textColor: "#10b981" }],
      createdAt: [{ type: "TEXT", title: "2026-01-15" }],
    },
    {
      id: [{ type: "TEXT", title: "102", isBold: true }],
      name: [{ type: "TEXT", title: "Sophia Martinez", subTitle: "sophia@corp.io" }],
      role: [{ type: "STATUS", title: "Product Mgr", bgColor: "#f5f3ff", textColor: "#7c3aed" }],
      status: [{ type: "STATUS", title: "Active", bgColor: "#ecfdf5", textColor: "#10b981" }],
      createdAt: [{ type: "TEXT", title: "2026-02-01" }],
    },
    {
      id: [{ type: "TEXT", title: "103", isBold: true }],
      name: [{ type: "TEXT", title: "Marcus Chen", subTitle: "marcus@corp.io" }],
      role: [{ type: "STATUS", title: "Developer", bgColor: "#f0fdf4", textColor: "#16a34a" }],
      status: [{ type: "STATUS", title: "Pending", bgColor: "#fffbeb", textColor: "#d97706" }],
      createdAt: [{ type: "TEXT", title: "2026-02-14" }],
    },
    {
      id: [{ type: "TEXT", title: "104", isBold: true }],
      name: [{ type: "TEXT", title: "Emma Watson", subTitle: "emma@corp.io" }],
      role: [{ type: "STATUS", title: "Designer", bgColor: "#fdf2f8", textColor: "#db2777" }],
      status: [{ type: "STATUS", title: "Suspended", bgColor: "#fef2f2", textColor: "#dc2626" }],
      createdAt: [{ type: "TEXT", title: "2026-03-02" }],
    },
  ],
  features: {
    search: true,
    sort: true,
  },
  isPaginated: true,
  pageNumber: 1,
  pageSize: 10,
  totalPages: 1,
  totalRows: 4,
  count: 4,
};

export default function DynamicTablePreview() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-100/60 dark:bg-zinc-900/60 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-zinc-700 dark:text-zinc-300">Live Controls:</span>
          <span className="text-zinc-500">Virtual scrolling, multi-cell rendering, sorting & pagination</span>
        </div>
        <div className="text-zinc-500 font-mono">
          Showing 4 live records
        </div>
      </div>

      <StaticTable
        staticData={mockTableData}
        filterKey="demo-static-table"
        bordered
      />
    </div>
  );
}
