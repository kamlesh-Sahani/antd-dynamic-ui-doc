"use client";

import React, { useState } from "react";
import { Input, Button, Tag } from "antd";
import { Search, Filter, RotateCw, Download, Sliders } from "lucide-react";

export default function DynamicHeaderPreview() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
              Orders Management
            </h3>
            <Tag color="blue">Live Feed</Tag>
          </div>
          <p className="text-xs text-zinc-500">
            Real-time synchronization with active grid filter store
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Input
            placeholder="Search orders..."
            prefix={<Search size={14} className="text-zinc-400 mr-1" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-48 text-xs"
          />

          <Button
            icon={<Filter size={14} />}
            className="text-xs flex items-center"
          >
            Filters
          </Button>

          <Button
            icon={<Sliders size={14} />}
            className="text-xs flex items-center"
          >
            Columns
          </Button>

          <Button
            icon={<Download size={14} />}
            className="text-xs flex items-center"
          >
            Export
          </Button>

          <Button
            type="text"
            icon={<RotateCw size={14} />}
            className="text-xs flex items-center"
          />
        </div>
      </div>

      <div className="text-xs text-zinc-500 bg-zinc-50 dark:bg-zinc-950 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
        <span>Current Search Value:</span>
        <span className="font-mono text-blue-600 dark:text-blue-400">
          {searchTerm ? `"${searchTerm}"` : "(none)"}
        </span>
      </div>
    </div>
  );
}
