"use client";

import React from "react";
import { StaticTable, TableDataType, TableColumnType } from "antd-dynamic-ui";

const sampleColumns: TableColumnType[] = [
  {
    id: "id",
    title: "ID",
    width: 90,
    sortable: true,
  },
  {
    id: "name",
    title: "User Profile",
    minWidth: 240,
    filterable: true,
  },
  {
    id: "role",
    title: "Role & Access",
    width: 170,
  },
  {
    id: "status",
    title: "Account Status",
    width: 150,
  },
  {
    id: "createdAt",
    title: "Registration Date",
    width: 180,
  },
];

const mockTableData: TableDataType = {
  columns: sampleColumns,
  rows: [
    {
      id: [{ type: "TEXT", title: "101", isBold: true }],
      name: [{ type: "TEXT", title: "Alexander Wright", subTitle: "alex.wright@corp.io" }],
      role: [{ type: "STATUS", title: "Superadmin", bgColor: "#eff6ff", textColor: "#2563eb" }],
      status: [{ type: "STATUS", title: "Active", bgColor: "#ecfdf5", textColor: "#10b981" }],
      createdAt: [{ type: "TEXT", title: "2026-01-15" }],
    },
    {
      id: [{ type: "TEXT", title: "102", isBold: true }],
      name: [{ type: "TEXT", title: "Sophia Martinez", subTitle: "sophia.m@corp.io" }],
      role: [{ type: "STATUS", title: "Product Mgr", bgColor: "#f5f3ff", textColor: "#7c3aed" }],
      status: [{ type: "STATUS", title: "Active", bgColor: "#ecfdf5", textColor: "#10b981" }],
      createdAt: [{ type: "TEXT", title: "2026-02-01" }],
    },
    {
      id: [{ type: "TEXT", title: "103", isBold: true }],
      name: [{ type: "TEXT", title: "Marcus Chen", subTitle: "m.chen@corp.io" }],
      role: [{ type: "STATUS", title: "Developer", bgColor: "#f0fdf4", textColor: "#16a34a" }],
      status: [{ type: "STATUS", title: "Pending Review", bgColor: "#fffbeb", textColor: "#d97706" }],
      createdAt: [{ type: "TEXT", title: "2026-02-14" }],
    },
    {
      id: [{ type: "TEXT", title: "104", isBold: true }],
      name: [{ type: "TEXT", title: "Emma Watson", subTitle: "emma.w@corp.io" }],
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
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between text-xs px-1 text-zinc-500">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="font-semibold text-zinc-700 dark:text-zinc-300">
            Live Interactive Grid
          </span>
          <span className="text-zinc-400 hidden sm:inline">
            — Virtual scrollbar, custom status badges, sorting & pagination
          </span>
        </div>
        <div className="text-zinc-400 font-mono text-[11px]">
          4 live records
        </div>
      </div>

      <div className="w-full overflow-hidden rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-xs">
        <StaticTable
          staticData={mockTableData}
          filterKey="demo-static-table"
          scroll={{ x: "100%" }}
        />
      </div>
    </div>
  );
}
