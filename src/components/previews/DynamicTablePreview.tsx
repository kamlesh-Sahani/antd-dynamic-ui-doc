"use client";

import React, { useState } from "react";
import { StaticTable, TableDataType, TableColumnType } from "antd-dynamic-ui";
import { message, Modal, Button, Tag } from "antd";
import { RotateCw, Trash2, ExternalLink, Sparkles, Database } from "lucide-react";

const baseColumns: TableColumnType[] = [
  { id: "id", title: "ID", width: 80, sortable: true },
  { id: "name", title: "User Profile", minWidth: 220, filterable: true },
  { id: "role", title: "Role & Access", width: 160 },
  { id: "status", title: "Account Status", width: 140 },
  { id: "createdAt", title: "Joined Date", width: 150 },
];

const mockRows: any[] = [
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
    status: [{ type: "STATUS", title: "Pending", bgColor: "#fdf5eb", textColor: "#c07212" }],
    createdAt: [{ type: "TEXT", title: "2026-02-14" }],
  },
  {
    id: [{ type: "TEXT", title: "104", isBold: true }],
    name: [{ type: "TEXT", title: "Emma Watson", subTitle: "emma.w@corp.io" }],
    role: [{ type: "STATUS", title: "Designer", bgColor: "#f5eee3", textColor: "#c4432b" }],
    status: [{ type: "STATUS", title: "Suspended", bgColor: "#feeae6", textColor: "#c4432b" }],
    createdAt: [{ type: "TEXT", title: "2026-03-02" }],
  },
];

const mockTableData: TableDataType = {
  columns: baseColumns,
  rows: mockRows,
  features: { search: true, sort: true },
  isPaginated: true,
  pageNumber: 1,
  pageSize: 10,
  totalPages: 1,
  totalRows: 4,
  count: 4,
};

export default function DynamicTablePreview({ exampleIndex = 0 }: { exampleIndex?: number }) {
  const [refreshCount, setRefreshCount] = useState(0);
  const [rows, setRows] = useState(mockRows);

  const handleDelete = (name: string, id: string) => {
    Modal.confirm({
      title: "Delete User",
      content: `Are you sure you want to delete ${name}?`,
      okText: "Confirm Delete",
      okType: "danger",
      onOk: () => {
        setRows((prev) => prev.filter((r) => r.id[0]?.title !== id));
        message.success(`User ${name} removed`);
      },
    });
  };

  if (exampleIndex === 1) {
    // Example 2: Complete Props & Composite Action Cells
    return (
      <div className="w-full space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-[#f5eee3] rounded-xl border border-[#ede5d8]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#362117]">Enterprise Directory Grid</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#fdeee9] text-[#c4432b] font-bold">
              refreshTrigger: {refreshCount}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setRefreshCount((c) => c + 1);
                message.loading({ content: "Re-fetching remote data...", duration: 0.8 });
              }}
              className="text-xs font-bold px-3 py-1 rounded-lg bg-white border border-[#ede5d8] text-[#362117] hover:bg-[#fffdfa] shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCw size={13} className="text-[#c4432b]" />
              <span>Simulate Refresh</span>
            </button>
            <button
              onClick={() => setRows(mockRows)}
              className="text-xs font-bold px-3 py-1 rounded-lg bg-white border border-[#ede5d8] text-[#5c4738] hover:text-[#362117] shadow-xs cursor-pointer"
            >
              Reset Data
            </button>
          </div>
        </div>

        <div className="w-full overflow-hidden rounded-xl border border-[#ede5d8] bg-white shadow-xs">
          <StaticTable
            staticData={{
              ...mockTableData,
              rows: rows.map((r) => ({
                ...r,
                action: [
                  {
                    type: "ACTION",
                    title: "Delete",
                    actionKey: "DELETE",
                  },
                ],
              })),
              columns: [
                ...baseColumns,
                { id: "action", title: "Quick Actions", width: 120 },
              ],
            }}
            filterKey="demo-complete-table"
            border={true}
            scroll={{ x: "100%" }}
            onActionClick={({ record }: any) => {
              const name = record?.name?.[0]?.title || "User";
              const id = record?.id?.[0]?.title || "";
              handleDelete(name, id);
            }}
          />
        </div>
      </div>
    );
  }

  if (exampleIndex === 2) {
    // Example 3: StaticTable with In-Memory Mock Data & Image Composite Cells
    return (
      <div className="w-full space-y-3">
        <div className="flex items-center justify-between text-xs px-1 text-[#785c4b]">
          <div className="flex items-center gap-2">
            <Database size={14} className="text-[#437a3b]" />
            <span className="font-bold text-[#362117]">In-Memory Mock Dataset</span>
            <span className="text-[#8a7566] hidden sm:inline">— Zero network roundtrips</span>
          </div>
          <span className="text-[11px] font-mono text-[#8a7566]">{mockRows.length} mocked records</span>
        </div>

        <div className="w-full overflow-hidden rounded-xl border border-[#ede5d8] bg-white shadow-xs">
          <StaticTable
            staticData={{
              columns: [
                { id: "id", title: "ID", width: 70 },
                { id: "user", title: "Member", minWidth: 200 },
                { id: "role", title: "Role", width: 140 },
                { id: "status", title: "Status", width: 130 },
              ],
              rows: [
                {
                  id: [{ type: "TEXT", title: "001", isBold: true }],
                  user: [
                    { type: "TEXT", title: "Sarah Connor", subTitle: "sarah@resistance.org", isBold: true },
                  ],
                  role: [{ type: "STATUS", title: "Commander", bgColor: "#f5eee3", textColor: "#784d2b" }],
                  status: [{ type: "STATUS", title: "Active", bgColor: "#edf7ee", textColor: "#2e7d32" }],
                },
                {
                  id: [{ type: "TEXT", title: "002", isBold: true }],
                  user: [
                    { type: "TEXT", title: "John Doe", subTitle: "john@tech.io", isBold: true },
                  ],
                  role: [{ type: "STATUS", title: "Engineer", bgColor: "#f5eee3", textColor: "#5c4738" }],
                  status: [{ type: "STATUS", title: "Active", bgColor: "#edf7ee", textColor: "#2e7d32" }],
                },
              ],
              features: { search: false, sort: false },
              isPaginated: false,
              pageNumber: 1,
              pageSize: 10,
              totalPages: 1,
              totalRows: 2,
              count: 2,
            }}
            filterKey="demo-in-memory-table"
            border={true}
          />
        </div>
      </div>
    );
  }

  // Example 0: Basic Setup
  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between text-xs px-1 text-[#785c4b]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#437a3b]" />
          <span className="font-bold text-[#362117]">Live Interactive Grid</span>
          <span className="text-[#8a7566] hidden sm:inline">— Sorting, pagination & status cells</span>
        </div>
        <div className="text-[#8a7566] font-mono text-[11px]">4 live records</div>
      </div>

      <div className="w-full overflow-hidden rounded-xl border border-[#ede5d8] bg-white shadow-xs">
        <StaticTable
          staticData={mockTableData}
          filterKey="demo-basic-table"
          scroll={{ x: "100%" }}
        />
      </div>
    </div>
  );
}
