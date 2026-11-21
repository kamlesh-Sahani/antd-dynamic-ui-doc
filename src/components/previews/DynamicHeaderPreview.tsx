"use client";

import React, { useState } from "react";
import { Input, Button, message } from "antd";
import { Search, Filter, RotateCw, Download, Sliders, X } from "lucide-react";

export default function DynamicHeaderPreview({ exampleIndex = 0 }: { exampleIndex?: number }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>(["Status: Active", "Region: US-East"]);
  const [isExporting, setIsExporting] = useState(false);

  if (exampleIndex === 1) {
    // Example 2: Complete Props with FilterDrawer, Column Drawer & Export Triggers
    return (
      <div className="space-y-4">
        <div className="p-4 rounded-xl border border-[#ede5d8] bg-white shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-[#362117]">
                Enterprise Accounts Directory
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#fdeee9] text-[#c4432b] font-bold border border-[#fbdcd5]">
                {activeFilters.length} Active Filters
              </span>
            </div>
            <p className="text-xs text-[#785c4b]">
              Synchronized with useGridFilters Zustand store across table and drawers
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Input
              placeholder="Search by name, email..."
              prefix={<Search size={14} className="text-[#8a7566] mr-1" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-52 text-xs rounded-lg border-[#ede5d8]"
            />

            <Button
              icon={<Filter size={14} />}
              onClick={() => {
                if (activeFilters.includes("Department: Eng")) {
                  setActiveFilters((f) => f.filter((x) => x !== "Department: Eng"));
                } else {
                  setActiveFilters((f) => [...f, "Department: Eng"]);
                  message.info("Filter applied: Department = Eng");
                }
              }}
              className="text-xs flex items-center border-[#ede5d8] text-[#362117]"
            >
              Filters ({activeFilters.length})
            </Button>

            <Button
              icon={<Sliders size={14} />}
              onClick={() => message.info("Opening ColumnDrawer (drag to reorder)...")}
              className="text-xs flex items-center border-[#ede5d8] text-[#362117]"
            >
              Columns
            </Button>

            <Button
              icon={<Download size={14} />}
              loading={isExporting}
              onClick={async () => {
                setIsExporting(true);
                await new Promise((r) => setTimeout(r, 800));
                setIsExporting(false);
                message.success("Downloaded directory_export.xlsx");
              }}
              className="text-xs flex items-center border-[#ede5d8] text-[#362117]"
            >
              Export XLSX
            </Button>

            <Button
              type="text"
              icon={<RotateCw size={14} />}
              onClick={() => message.loading({ content: "Re-querying remote dataset...", duration: 0.8 })}
              className="text-xs flex items-center text-[#785c4b] hover:text-[#362117]"
            />
          </div>
        </div>

        {/* Active Filter Pills Bar */}
        <div className="flex flex-wrap items-center gap-2 p-3 bg-[#f5eee3] rounded-xl border border-[#ede5d8] text-xs">
          <span className="font-bold text-[#785c4b]">Active Filter Tags:</span>
          {activeFilters.map((filter, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#ede5d8] text-[#362117] font-semibold text-[11px] shadow-2xs"
            >
              <span>{filter}</span>
              <button
                onClick={() => setActiveFilters((f) => f.filter((_, i) => i !== idx))}
                className="hover:text-[#c4432b] cursor-pointer"
              >
                <X size={12} />
              </button>
            </span>
          ))}
          {activeFilters.length === 0 && (
            <span className="text-[#8a7566] italic">No active filters applied</span>
          )}
        </div>
      </div>
    );
  }

  // Example 0: Standard Search Header
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl border border-[#ede5d8] bg-white shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-base text-[#362117]">
              Orders Management
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#fdeee9] text-[#c4432b] font-bold border border-[#fbdcd5]">
              Live Feed
            </span>
          </div>
          <p className="text-xs text-[#785c4b]">
            Real-time synchronization with active grid filter store
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Input
            placeholder="Search orders..."
            prefix={<Search size={14} className="text-[#8a7566] mr-1" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-48 text-xs rounded-lg border-[#ede5d8]"
          />

          <Button
            icon={<Filter size={14} />}
            onClick={() => message.info("Opening filter drawer...")}
            className="text-xs flex items-center border-[#ede5d8] text-[#362117]"
          >
            Filters
          </Button>

          <Button
            icon={<Sliders size={14} />}
            onClick={() => message.info("Opening column reorder drawer...")}
            className="text-xs flex items-center border-[#ede5d8] text-[#362117]"
          >
            Columns
          </Button>

          <Button
            icon={<Download size={14} />}
            onClick={() => message.success("Triggered report download")}
            className="text-xs flex items-center border-[#ede5d8] text-[#362117]"
          >
            Export
          </Button>

          <Button
            type="text"
            icon={<RotateCw size={14} />}
            onClick={() => message.loading({ content: "Refreshed orders", duration: 0.5 })}
            className="text-xs flex items-center text-[#785c4b] hover:text-[#362117]"
          />
        </div>
      </div>

      <div className="text-xs text-[#5c4738] bg-[#f5eee3] p-3 rounded-xl border border-[#ede5d8] flex justify-between items-center font-medium">
        <span>Current Search Value:</span>
        <span className="font-mono text-[#c4432b] font-bold">
          {searchTerm ? `"${searchTerm}"` : "(none)"}
        </span>
      </div>
    </div>
  );
}
