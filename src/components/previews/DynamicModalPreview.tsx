"use client";

import React, { useState } from "react";
import { DynamicModal } from "antd-dynamic-ui";
import { Button, Tag, message } from "antd";
import { ExternalLink, ShieldCheck } from "lucide-react";

export default function DynamicModalPreview({ exampleIndex = 0 }: { exampleIndex?: number }) {
  const [basicOpen, setBasicOpen] = useState(false);
  const [completeOpen, setCompleteOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  if (exampleIndex === 1) {
    // Example 2: Complete Props with Audited Tag, External Link, and Custom Footer
    return (
      <div className="flex flex-col items-center justify-center py-6 space-y-4">
        <button
          onClick={() => setCompleteOpen(true)}
          className="text-xs font-bold px-5 py-2.5 rounded-xl bg-[#362117] hover:bg-[#261710] text-white shadow-xs transition-colors cursor-pointer flex items-center gap-2"
        >
          <ShieldCheck size={15} className="text-[#e05d44]" />
          <span>Inspect Security Policy #SEC-9021</span>
        </button>

        <DynamicModal
          isOpen={completeOpen}
          onClose={() => setCompleteOpen(false)}
          title={
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#362117]">Security Policy #SEC-9021</span>
              <Tag color="gold">Audited</Tag>
            </div>
          }
          headerAction={
            <a
              href="#specs"
              onClick={(e) => {
                e.preventDefault();
                message.info("Opening policy specification docs...");
              }}
              className="flex items-center gap-1 text-xs text-[#c4432b] hover:underline font-bold"
            >
              <span>Policy Specs</span>
              <ExternalLink size={12} />
            </a>
          }
          footer={
            <div className="flex justify-end gap-2 w-full pt-2">
              <Button onClick={() => setCompleteOpen(false)}>
                Cancel
              </Button>
              <Button
                type="primary"
                loading={isSaving}
                onClick={async () => {
                  setIsSaving(true);
                  await new Promise((r) => setTimeout(r, 900));
                  setIsSaving(false);
                  setCompleteOpen(false);
                  message.success("Security policy updated across edge clusters!");
                }}
              >
                Apply Security Rules
              </Button>
            </div>
          }
          close="icon"
          zIndex={100}
        >
          <div className="space-y-3 py-2 text-sm text-[#5c4738]">
            <p className="leading-relaxed">
              Enforce multi-factor authentication (MFA) and hardware passkeys for all
              administrative accounts in the engineering organization.
            </p>
            <div className="p-3.5 rounded-xl bg-[#f5eee3] border border-[#ede5d8] text-xs font-mono text-[#362117] flex justify-between items-center">
              <span>Cluster Status:</span>
              <span className="text-[#437a3b] font-bold">READY_FOR_DEPLOYMENT</span>
            </div>
          </div>
        </DynamicModal>
      </div>
    );
  }

  // Example 0: Basic Confirmation Modal
  return (
    <div className="flex flex-col items-center justify-center py-6 space-y-4">
      <Button type="primary" onClick={() => setBasicOpen(true)}>
        Open Confirmation Modal
      </Button>

      <DynamicModal
        isOpen={basicOpen}
        onClose={() => setBasicOpen(false)}
        title="Administrative Confirmation"
        close="icon"
        footer={
          <div className="flex justify-end gap-2 pt-2">
            <Button onClick={() => setBasicOpen(false)}>Cancel</Button>
            <Button
              type="primary"
              danger
              onClick={() => {
                setBasicOpen(false);
                message.success("Cold storage export initiated");
              }}
            >
              Confirm Export
            </Button>
          </div>
        }
      >
        <div className="space-y-3 py-2 text-sm text-[#5c4738]">
          <p className="leading-relaxed">
            This action will export user profiles to the designated cold storage bucket. Active sessions will remain unaffected.
          </p>
          <div className="p-3 rounded-xl bg-[#f5eee3] border border-[#ede5d8] text-xs font-mono text-[#362117]">
            Target: s3://enterprise-archives-2026/users.tar.gz
          </div>
        </div>
      </DynamicModal>
    </div>
  );
}
