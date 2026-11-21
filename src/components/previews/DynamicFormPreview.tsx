"use client";

import React, { useState } from "react";
import { DynamicForm, FormSchema, ButtonField } from "antd-dynamic-ui";
import { CheckCircle2, Sparkles, Sliders, RefreshCw } from "lucide-react";
import { Alert, message, Switch, Slider, Select, Input } from "antd";

const basicSchema: FormSchema = {
  rows: [
    [
      {
        id: "fullName",
        label: "Full Name",
        type: "input",
        placeholder: "e.g. Sarah Connor",
        validation: { required: true, minLength: 3 },
      },
      {
        id: "workEmail",
        label: "Work Email",
        type: "email",
        placeholder: "sarah@resistance.org",
        validation: { required: true },
      },
    ],
    [
      {
        id: "accountPlan",
        label: "Account Plan",
        type: "select",
        defaultValue: "pro",
        options: [
          { key: "free", value: "Starter Plan (Free)" },
          { key: "pro", value: "Professional ($29/mo)" },
          { key: "enterprise", value: "Enterprise (Custom)" },
        ],
      },
    ],
  ],
};

export default function DynamicFormPreview({ exampleIndex = 0 }: { exampleIndex?: number }) {
  const [submittedData, setSubmittedData] = useState<Record<string, any> | null>(null);

  // Example 2 State: Conditional Logic & Custom Footer
  const [hasVat, setHasVat] = useState(false);
  const [teamSize, setTeamSize] = useState(25);
  const [orgName, setOrgName] = useState("DeepMind Tech Ltd");
  const [vatNumber, setVatNumber] = useState("");
  const [ex2Submitted, setEx2Submitted] = useState<Record<string, any> | null>(null);

  // Example 3 State: Remote Schema Reload Simulation
  const [remoteLoading, setRemoteLoading] = useState(false);
  const [remoteSchemaVersion, setRemoteSchemaVersion] = useState(1);

  if (exampleIndex === 1) {
    // Example 2: Complete Props, Conditional Logic & Custom Footer
    return (
      <div className="w-full space-y-4">
        <div className="p-3 bg-[#f5eee3] rounded-xl border border-[#ede5d8] text-xs text-[#5c4738] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders size={14} className="text-[#c4432b]" />
            <span className="font-bold text-[#362117]">Interactive Conditional Logic Engine</span>
          </div>
          <span className="text-[11px] text-[#785c4b]">Toggle switch below to reveal conditional field</span>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const data = { orgName, hasVat, vatNumber: hasVat ? vatNumber : null, teamSize };
            setEx2Submitted(data);
            message.success("Organization profile saved successfully!");
          }}
          className="p-6 rounded-2xl border border-[#ede5d8] bg-white space-y-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#362117]">Company / Organization *</label>
              <Input
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                placeholder="e.g. Acme Corp"
                className="rounded-lg"
              />
            </div>

            <div className="space-y-1.5 flex flex-col justify-center">
              <label className="text-xs font-bold text-[#362117] flex items-center gap-2">
                <span>Do you have an EU VAT Number?</span>
                <span className="text-[10px] font-normal text-[#785c4b]">(Conditional Field Trigger)</span>
              </label>
              <div className="pt-1 flex items-center gap-3">
                <Switch
                  checked={hasVat}
                  onChange={(checked) => setHasVat(checked)}
                  style={{ backgroundColor: hasVat ? "#e05d44" : undefined }}
                />
                <span className="text-xs font-medium text-[#5c4738]">
                  {hasVat ? "Yes, show EU VAT field" : "No VAT registration"}
                </span>
              </div>
            </div>
          </div>

          {/* Conditional Field (Appears only if hasVat is true) */}
          {hasVat && (
            <div className="p-4 rounded-xl bg-[#fbf8f2] border border-[#ede5d8] space-y-1.5 transition-all">
              <label className="text-xs font-bold text-[#362117] flex items-center gap-1.5">
                <span className="text-[#c4432b]">★</span>
                <span>EU VAT Identification Number</span>
              </label>
              <Input
                value={vatNumber}
                onChange={(e) => setVatNumber(e.target.value)}
                placeholder="e.g. DE123456789"
                className="rounded-lg"
              />
              <p className="text-[11px] text-[#785c4b]">
                Dynamically revealed when condition <code className="text-[#c4432b] bg-[#f2ebde] px-1 rounded">hasVatNumber === true</code> is satisfied.
              </p>
            </div>
          )}

          {/* Slider Field */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-[#362117]">Minimum Team Size Required</label>
              <span className="font-bold text-[#c4432b]">{teamSize} seats</span>
            </div>
            <Slider
              min={5}
              max={250}
              value={teamSize}
              onChange={(val) => setTeamSize(val)}
            />
          </div>

          {/* Custom Footer Render Slot */}
          <div className="flex flex-wrap items-center justify-between pt-4 border-t border-[#ede5d8] gap-3">
            <button
              type="button"
              onClick={() => {
                setOrgName("DeepMind Tech Ltd");
                setHasVat(false);
                setVatNumber("");
                setTeamSize(25);
                setEx2Submitted(null);
                message.info("Form reset to default values");
              }}
              className="text-xs font-bold text-[#785c4b] hover:text-[#362117] cursor-pointer"
            >
              Reset to Defaults
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => message.info("Draft saved locally")}
                className="text-xs font-bold px-4 py-2 rounded-xl bg-[#f2ebde] text-[#362117] border border-[#ede5d8] hover:bg-[#ede5d8] transition-colors cursor-pointer"
              >
                Save as Draft
              </button>
              <button
                type="submit"
                className="text-xs font-bold px-4 py-2 rounded-xl bg-[#362117] text-white hover:bg-[#261710] shadow-xs transition-colors cursor-pointer"
              >
                Publish Organization
              </button>
            </div>
          </div>
        </form>

        {ex2Submitted && (
          <div className="p-4 rounded-xl border border-[#c8e6c9] bg-[#edf7ee] space-y-1.5">
            <div className="flex items-center gap-2 text-[#2e7d32] font-bold text-xs">
              <CheckCircle2 size={16} />
              <span>Validated Payload Received:</span>
            </div>
            <pre className="text-xs font-mono text-[#1b5e20] p-2 bg-white/70 rounded-lg overflow-x-auto">
              {JSON.stringify(ex2Submitted, null, 2)}
            </pre>
          </div>
        )}
      </div>
    );
  }

  if (exampleIndex === 2) {
    // Example 3: Remote Schema Simulation
    return (
      <div className="w-full space-y-4">
        <div className="flex items-center justify-between p-3 bg-[#f5eee3] rounded-xl border border-[#ede5d8]">
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-[#362117]">Microservice Schema Engine</div>
            <div className="text-[11px] text-[#785c4b]">Simulates fetching dynamic schema from /api/v1/schemas</div>
          </div>
          <button
            onClick={() => {
              setRemoteLoading(true);
              setTimeout(() => {
                setRemoteSchemaVersion((v) => (v === 1 ? 2 : 1));
                setRemoteLoading(false);
                message.success("Injected updated remote schema!");
              }, 600);
            }}
            disabled={remoteLoading}
            className="text-xs font-bold px-3 py-1.5 rounded-lg bg-white border border-[#ede5d8] text-[#362117] hover:bg-[#fffdfa] shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw size={12} className={remoteLoading ? "animate-spin" : "text-[#c4432b]"} />
            <span>Switch Schema Version (v{remoteSchemaVersion})</span>
          </button>
        </div>

        <div className="p-6 rounded-2xl border border-[#ede5d8] bg-white space-y-4">
          <div className="text-xs font-bold text-[#785c4b] uppercase tracking-wider">
            Active Remote Form (Schema v{remoteSchemaVersion})
          </div>

          <DynamicForm
            schema={
              remoteSchemaVersion === 1
                ? basicSchema
                : {
                    rows: [
                      [
                        { id: "vendorName", label: "Vendor Legal Name", type: "input", placeholder: "e.g. Acme Logistics", validation: { required: true } },
                        { id: "taxId", label: "Federal Tax ID", type: "input", placeholder: "XX-XXXXXXX", validation: { required: true } },
                      ],
                    ],
                  }
            }
            submitText={`Submit Vendor Onboarding (v${remoteSchemaVersion})`}
            onSubmit={(data) => {
              message.success(`Vendor payload registered for schema v${remoteSchemaVersion}!`);
              setSubmittedData(data);
            }}
          />
        </div>
      </div>
    );
  }

  // Example 0: Basic Two-Column Form
  return (
    <div className="w-full space-y-4">
      <div className="w-full">
        <DynamicForm
          schema={basicSchema}
          submitText="Create Account"
          onSubmit={(data) => setSubmittedData(data)}
        />
      </div>

      {submittedData && (
        <div className="p-4 rounded-xl border border-[#c8e6c9] bg-[#edf7ee] space-y-1.5">
          <div className="flex items-center gap-2 text-[#2e7d32] font-bold text-xs">
            <CheckCircle2 size={16} />
            <span>Form Submitted Successfully (Zod Validated Output)</span>
          </div>
          <pre className="text-xs font-mono text-[#1b5e20] p-2 bg-white/70 rounded-lg overflow-x-auto">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
