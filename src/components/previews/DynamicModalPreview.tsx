"use client";

import React, { useState } from "react";
import { DynamicModal } from "antd-dynamic-ui";
import { Button, Tag } from "antd";

export default function DynamicModalPreview() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center py-6 space-y-4">
      <Button type="primary" onClick={() => setIsOpen(true)}>
        Open DynamicModal
      </Button>

      <DynamicModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={
          <div className="flex items-center gap-2">
            <span>Security Access Confirmation</span>
            <Tag color="orange">Admin Only</Tag>
          </div>
        }
        close="icon"
        footer={
          <div className="flex justify-end gap-2">
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button type="primary" danger onClick={() => setIsOpen(false)}>
              Confirm Action
            </Button>
          </div>
        }
      >
        <div className="space-y-3 py-2 text-sm text-[#5c4738]">
          <p className="leading-relaxed">
            You are about to initiate an administrative configuration reload. This action will invalidate active session tokens and propagate changes across all edge nodes.
          </p>
          <div className="p-3.5 rounded-xl bg-[#f5eee3] border border-[#ede5d8] text-xs font-mono text-[#362117] font-semibold">
            Status: READY_FOR_DISPATCH
          </div>
        </div>
      </DynamicModal>
    </div>
  );
}
