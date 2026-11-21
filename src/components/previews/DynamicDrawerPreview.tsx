"use client";

import React, { useState } from "react";
import { DynamicDrawer } from "antd-dynamic-ui";
import { Button, Tag, message } from "antd";
import { Sliders, CheckCircle2 } from "lucide-react";

export default function DynamicDrawerPreview({ exampleIndex = 0 }: { exampleIndex?: number }) {
  const [basicOpen, setBasicOpen] = useState(false);
  const [completeOpen, setCompleteOpen] = useState(false);
  const [placement, setPlacement] = useState<"right" | "left" | "top" | "bottom">("right");

  if (exampleIndex === 1) {
    // Example 2: Complete Props with Multi-Edge Placement
    return (
      <div className="flex flex-col items-center justify-center py-6 space-y-4">
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-[#f2ebde] border border-[#ede5d8]">
          <span className="text-xs font-bold text-[#785c4b] px-2">Placement:</span>
          {(["right", "left", "top", "bottom"] as const).map((pos) => (
            <button
              key={pos}
              onClick={() => setPlacement(pos)}
              className={`text-xs px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                placement === pos
                  ? "bg-white text-[#362117] shadow-xs border border-[#ede5d8]"
                  : "text-[#785c4b] hover:text-[#362117]"
              }`}
            >
              {pos.toUpperCase()}
            </button>
          ))}
        </div>

        <button
          onClick={() => setCompleteOpen(true)}
          className="text-xs font-bold px-5 py-2.5 rounded-xl bg-[#362117] hover:bg-[#261710] text-white shadow-xs transition-colors cursor-pointer flex items-center gap-2"
        >
          <Sliders size={14} className="text-[#e05d44]" />
          <span>Open Drawer from {placement.toUpperCase()}</span>
        </button>

        <DynamicDrawer
          isOpen={completeOpen}
          onClose={() => setCompleteOpen(false)}
          title={`Entity Inspector (${placement.toUpperCase()})`}
          placement={placement}
          width={placement === "top" || placement === "bottom" ? "100%" : "480px"}
          height={placement === "top" || placement === "bottom" ? "320px" : undefined}
          footer={
            <div className="flex justify-between items-center w-full">
              <span className="text-xs text-[#785c4b]">Unsaved changes auto-saved</span>
              <div className="flex gap-2">
                <Button onClick={() => setCompleteOpen(false)}>Close</Button>
                <Button
                  type="primary"
                  onClick={() => {
                    setCompleteOpen(false);
                    message.success("Drawer preferences updated");
                  }}
                >
                  Save Drawer Config
                </Button>
              </div>
            </div>
          }
        >
          <div className="space-y-4 text-sm text-[#362117]">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#f5eee3] border border-[#ede5d8]">
              <span className="font-bold">Active Placement</span>
              <Tag color="blue">{placement.toUpperCase()}</Tag>
            </div>
            <p className="text-xs text-[#5c4738] leading-relaxed">
              DynamicDrawer cleanly transitions from any viewport edge with responsive dimensions, keyboard accessibility (Escape to dismiss), and sticky action footers.
            </p>
          </div>
        </DynamicDrawer>
      </div>
    );
  }

  // Example 0: Basic Drawer
  return (
    <div className="flex flex-col items-center justify-center py-6 space-y-4">
      <Button type="primary" onClick={() => setBasicOpen(true)}>
        Open Audit Drawer
      </Button>

      <DynamicDrawer
        isOpen={basicOpen}
        onClose={() => setBasicOpen(false)}
        title="Entity Audit Log & Event Traces"
        placement="right"
        width="460px"
        footer={
          <div className="flex justify-end gap-2">
            <Button onClick={() => setBasicOpen(false)}>Close</Button>
            <Button
              type="primary"
              onClick={() => {
                setBasicOpen(false);
                message.success("Audit records acknowledged");
              }}
            >
              Acknowledge
            </Button>
          </div>
        }
      >
        <div className="space-y-4 text-sm text-[#362117]">
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#f5eee3] border border-[#ede5d8]">
            <span className="font-bold">Transaction #84920</span>
            <Tag color="green">SUCCESS</Tag>
          </div>
          <p className="text-xs text-[#5c4738] leading-relaxed">
            DynamicDrawer renders smooth slide-out drawers on any edge with custom title bars, back buttons, and sticky footers.
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
