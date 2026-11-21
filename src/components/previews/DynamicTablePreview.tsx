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
      role: [{ type: "STATUS", title: "Superadmin", bgColor: "#f5eee3", textColor: "#784d2b" }],
      status: [{ type: "STATUS", title: "Active", bgColor: "#edf7ee", textColor: "#2e7d32" }],
      createdAt: [{ type: "TEXT", title: "2026-01-15" }],
    },
    {
      id: [{ type: "TEXT", title: "102", isBold: true }],
      name: [{ type: "TEXT", title: "Sophia Martinez", subTitle: "sophia.m@corp.io" }],
      role: [{ type: "STATUS", title: "Product Mgr", bgColor: "#f5eee3", textColor: "#5c4738" }],
      status: [{ type: "STATUS", title: "Active", bgColor: "#edf7ee", textColor: "#2e7d32" }],
      createdAt: [{ type: "TEXT", title: "2026-02-01" }],
    },
    {
      id: [{ type: "TEXT", title: "103", isBold: true }],
      name: [{ type: "TEXT", title: "Marcus Chen", subTitle: "m.chen@corp.io" }],
      role: [{ type: "STATUS", title: "Developer", bgColor: "#f5eee3", textColor: "#362117" }],
      status: [{ type: "STATUS", title: "Pending Review", bgColor: "#fdf5eb", textColor: "#c07212" }],
      createdAt: [{ type: "TEXT", title: "2026-02-14" }],
    },
    {
      id: [{ type: "TEXT", title: "104", isBold: true }],
      name: [{ type: "TEXT", title: "Emma Watson", subTitle: "emma.w@corp.io" }],
      role: [{ type: "STATUS", title: "Designer", bgColor: "#f5eee3", textColor: "#c4432b" }],
      status: [{ type: "STATUS", title: "Suspended", bgColor: "#feeae6", textColor: "#c4432b" }],
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
      <div className="flex items-center justify-between text-xs px-1 text-[#785c4b]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#437a3b]" />
          <span className="font-bold text-[#362117]">
            Live Interactive Grid
          </span>
          <span className="text-[#8a7566] hidden sm:inline">
            — Virtual scrollbar, status badges, sorting & pagination
          </span>
        </div>
        <div className="text-[#8a7566] font-mono text-[11px]">
          4 live records
        </div>
      </div>

      <div className="w-full overflow-hidden rounded-xl border border-[#ede5d8] bg-white shadow-xs">
        <StaticTable
          staticData={mockTableData}
          filterKey="demo-static-table"
          scroll={{ x: "100%" }}
        />
      </div>
    </div>
  );
}
