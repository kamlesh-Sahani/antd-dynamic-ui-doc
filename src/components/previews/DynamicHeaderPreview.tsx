"use client";

import React, { useState } from "react";
import { Input, Button, Tag } from "antd";
import { Search, Filter, RotateCw, Download, Sliders } from "lucide-react";

export default function DynamicHeaderPreview() {
  const [searchTerm, setSearchTerm] = useState("");

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
            className="text-xs flex items-center border-[#ede5d8] text-[#362117]"
          >
            Filters
          </Button>

          <Button
            icon={<Sliders size={14} />}
            className="text-xs flex items-center border-[#ede5d8] text-[#362117]"
          >
            Columns
          </Button>

          <Button
            icon={<Download size={14} />}
            className="text-xs flex items-center border-[#ede5d8] text-[#362117]"
          >
            Export
          </Button>

          <Button
            type="text"
            icon={<RotateCw size={14} />}
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
