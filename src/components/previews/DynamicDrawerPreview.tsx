"use client";

import React, { useState } from "react";
import { DynamicDrawer } from "antd-dynamic-ui";
import { Button, Tag } from "antd";

export default function DynamicDrawerPreview() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center py-6 space-y-4">
      <Button type="primary" onClick={() => setIsOpen(true)}>
        Open DynamicDrawer
      </Button>

      <DynamicDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Entity Audit Log & Event Traces"
        placement="right"
        width="480px"
        footer={
          <div className="flex justify-end gap-2">
            <Button onClick={() => setIsOpen(false)}>Close Drawer</Button>
            <Button type="primary" onClick={() => setIsOpen(false)}>Save Changes</Button>
          </div>
        }
      >
        <div className="space-y-4 text-sm text-zinc-700 dark:text-zinc-300">
          <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800">
            <span className="font-medium">Transaction #84920</span>
            <Tag color="green">SUCCESS</Tag>
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed">
            DynamicDrawer renders smooth slide-out drawers on any edge (right, left, top, bottom) with custom title bars, back buttons, and sticky footers.
          </p>
          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3 space-y-2">
            <div className="text-xs font-semibold text-zinc-400">Timestamp</div>
            <div className="text-xs font-mono">2026-11-21 12:45:00 UTC</div>
          </div>
        </div>
      </DynamicDrawer>
    </div>
  );
}
