import React from "react";
import TroubleshootCard, { TroubleshootingItem } from "@/components/TroubleshootCard";
import { AlertTriangle, CheckCircle2, FileJson, ShieldAlert } from "lucide-react";

export const metadata = {
  title: "Backend Response Mismatch & Troubleshooting Guide",
  description:
    "Comprehensive guide solving common backend API response mismatches, key discrepancies, and JSON payload issues in antd-dynamic-ui.",
};

const TROUBLESHOOTING_GUIDES: TroubleshootingItem[] = [
  {
    issue: "Table displays 'No Data' or empty rows despite HTTP 200 OK",
    cause:
      "DynamicTable expects rows to be located under 'data.rows' and the total row count under 'data.totalRows'. Many backend frameworks (e.g. Django Rest, Laravel, Express) return flat arrays or use different property names like 'items', 'list', 'records', or 'data.count'.",
    solution:
      "Map your backend response to match { data: { rows: [...], totalRows: number } } or transform it in your useFetch onSuccess handler.",
    incorrectSnippet: `// ❌ INCORRECT: Returning flat array or alternative keys
{
  "status": "success",
  "items": [
    { "id": 1, "name": "Alexander" }
  ],
  "total": 100
}`,
    correctSnippet: `// ✅ CORRECT: Expected by DynamicTable
{
  "success": true,
  "data": {
    "rows": [
      { "id": 1, "name": "Alexander" }
    ],
    "totalRows": 100,
    "pageNumber": 1,
    "pageSize": 10
  }
}`,
  },
  {
    issue: "Date column renders 'Invalid Date' or 'NaN/NaN/0NaN'",
    cause:
      "Backend sends Unix timestamps as 10-digit integers in seconds (e.g. 1773576000). JavaScript's Date and Dayjs parse integers as milliseconds (13 digits), resulting in timestamps from the year 1970.",
    solution:
      "Serialize timestamps on the backend as ISO 8601 strings (e.g. '2026-03-15T10:00:00Z') or multiply by 1000 before returning.",
    incorrectSnippet: `// ❌ INCORRECT: 10-digit seconds timestamp
{
  "id": 101,
  "createdAt": 1773576000
}`,
    correctSnippet: `// ✅ CORRECT: Standard ISO 8601 String
{
  "id": 101,
  "createdAt": "2026-03-15T10:00:00.000Z"
}`,
  },
  {
    issue: "SelectField or SelectApiField shows empty dropdown options",
    cause:
      "The options array contains objects with keys like 'id' and 'name' or 'label' and 'val', whereas antd-dynamic-ui standardizes on { key: string, value: string }.",
    solution:
      "Format dropdown arrays as objects containing 'key' (stored value) and 'value' (human visible label).",
    incorrectSnippet: `// ❌ INCORRECT: Non-standard key names
[
  { "id": "admin", "name": "System Administrator" },
  { "id": "staff", "name": "Support Staff" }
]`,
    correctSnippet: `// ✅ CORRECT: { key, value } structure
[
  { "key": "admin", "value": "System Administrator" },
  { "key": "staff", "value": "Support Staff" }
]`,
  },
  {
    issue: "DynamicForm submit output is missing field values",
    cause:
      "Field configurations inside the schema matrix used 'name' instead of 'id', or duplicate 'id' keys were specified across rows.",
    solution:
      "Always declare a unique 'id' for every FieldConfig object. The 'id' maps directly to the submitted JSON payload key.",
    incorrectSnippet: `// ❌ INCORRECT: Using 'name' instead of 'id'
[
  [{ "name": "userEmail", "type": "email", "label": "Email" }]
]`,
    correctSnippet: `// ✅ CORRECT: Explicit unique 'id'
[
  [{ "id": "userEmail", "type": "email", "label": "Email" }]
]`,
  },
  {
    issue: "DateRangeField fails with 'dates.map is not a function'",
    cause:
      "Backend populated form initialValues with two separate properties (e.g. { startDate: '...', endDate: '...' }) instead of a two-element array.",
    solution:
      "Initialize DateRangeField values with a tuple array: ['YYYY-MM-DD', 'YYYY-MM-DD'].",
    incorrectSnippet: `// ❌ INCORRECT: Split properties
{
  "startDate": "2026-01-01",
  "endDate": "2026-12-31"
}`,
    correctSnippet: `// ✅ CORRECT: Tuple array
{
  "dateRange": ["2026-01-01", "2026-12-31"]
}`,
  },
  {
    issue: "React warning: 'A component is changing an uncontrolled input to be controlled'",
    cause:
      "A field had undefined as its initial value, which became a defined string on first keystroke.",
    solution:
      "Provide default values in initialValues (e.g. '') or use antd-dynamic-ui's built-in useSafeControl hook.",
    incorrectSnippet: `// ❌ INCORRECT: undefined default value
const initialValues = {
  description: undefined
};`,
    correctSnippet: `// ✅ CORRECT: Safe string fallback
const initialValues = {
  description: ""
};`,
  },
];

export default function TroubleshootingPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div className="text-xs font-semibold text-amber-600 dark:text-amber-400">
          Troubleshooting & Diagnostics
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
          <AlertTriangle className="text-amber-500" size={28} />
          <span>Backend Response Mismatch Guide</span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-3xl">
          More than 80% of frontend issues in schema-driven UI libraries stem from subtle payload discrepancies between backend API responses and frontend component expectations. This diagnostic guide catalogs the most common payload mismatches and provides exact before-and-after solutions.
        </p>
      </div>

      {/* Troubleshooting Matrix Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <ShieldAlert size={18} className="text-rose-500" />
          Common Payload Incompatibilities & Fixes
        </h2>
        <TroubleshootCard items={TROUBLESHOOTING_GUIDES} />
      </div>
    </div>
  );
}
