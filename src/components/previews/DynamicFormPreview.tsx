"use client";

import React, { useState } from "react";
import { DynamicForm } from "antd-dynamic-ui";
import { FormSchema } from "antd-dynamic-ui";
import { CheckCircle2, Send } from "lucide-react";

const sampleFormSchema: FormSchema = {
  rows: [
    [
      {
        id: "fullName",
        label: "Full Name",
        type: "input",
        placeholder: "Enter full name (e.g. Sarah Connor)",
        validation: { required: true, minLength: 3 },
      },
      {
        id: "workEmail",
        label: "Work Email",
        type: "email",
        placeholder: "sarah@cyberdyne.com",
        validation: { required: true },
      },
    ],
    [
      {
        id: "department",
        label: "Department",
        type: "select",
        placeholder: "Select your team",
        options: [
          { key: "eng", value: "Engineering" },
          { key: "product", value: "Product Management" },
          { key: "security", value: "Cyber Security" },
          { key: "ops", value: "DevOps / Infrastructure" },
        ],
        validation: { required: true },
      },
      {
        id: "country",
        label: "Country",
        type: "country",
        placeholder: "Select your country",
        validation: { required: true },
      },
    ],
    [
      {
        id: "bio",
        label: "Professional Bio",
        type: "textarea",
        placeholder: "Brief description of role and background...",
      },
    ],
  ],
};

export default function DynamicFormPreview() {
  const [submittedData, setSubmittedData] = useState<Record<string, any> | null>(null);

  const handleSubmit = (data: any) => {
    setSubmittedData(data);
  };

  return (
    <div className="w-full space-y-6">
      <div className="w-full">
        <DynamicForm
          schema={sampleFormSchema}
          submitText="Create Account"
          onSubmit={handleSubmit}
        />
      </div>

      {submittedData && (
        <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-2">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-semibold text-xs">
            <CheckCircle2 size={16} />
            <span>Form Submitted Successfully (Zod Validated Output)</span>
          </div>
          <pre className="text-xs font-mono text-emerald-800 dark:text-emerald-300 bg-white/80 dark:bg-zinc-950 p-3 rounded-lg overflow-x-auto border border-emerald-200/60 dark:border-emerald-900/40">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
