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
        <div className="space-y-4 text-sm text-[#362117]">
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#f5eee3] border border-[#ede5d8]">
            <span className="font-bold text-[#362117]">Transaction #84920</span>
            <Tag color="green">SUCCESS</Tag>
          </div>
          <p className="text-xs text-[#5c4738] leading-relaxed">
            DynamicDrawer renders smooth slide-out drawers on any edge (right, left, top, bottom) with custom title bars, back buttons, and sticky footers.
          </p>
          <div className="border-t border-[#ede5d8] pt-3 space-y-1.5">
            <div className="text-xs font-bold text-[#785c4b]">Timestamp</div>
            <div className="text-xs font-mono text-[#362117] bg-[#f2ebde] px-2.5 py-1 rounded-md inline-block">
              2026-11-21 12:45:00 UTC
            </div>
          </div>
        </div>
      </DynamicDrawer>
    </div>
  );
}
