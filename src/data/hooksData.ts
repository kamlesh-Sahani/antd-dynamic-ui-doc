import { PropItem } from "@/components/PropsTable";
import { TroubleshootingItem } from "@/components/TroubleshootCard";

export interface HookDoc {
  slug: string;
  title: string;
  summary: string;
  description: string;
  features: string[];
  params: PropItem[];
  returns: PropItem[];
  code: string;
  schema?: object | string;
  troubleshooting?: TroubleshootingItem[];
}

export const HOOKS_DATA: Record<string, HookDoc> = {
  "use-fetch": {
    slug: "use-fetch",
    title: "useFetch",
    summary:
      "Enterprise HTTP data-fetching hook with AbortController cancellation, retry capabilities, and automatic JSON extraction.",
    description:
      "useFetch is a zero-dependency async data fetching hook built specifically for antd-dynamic-ui components. It tracks loading and error states, automatically cancels previous in-flight requests when parameters or URLs change via AbortController, and provides a stable refetch() callback for manual data refreshing.",
    features: [
      "Built-in AbortController request cancellation to eliminate race conditions",
      "Automatic payload error detection (detects { success: false, message })",
      "Manual execution mode (manual: true) for submit buttons and search triggers",
      "Configurable onSuccess callback with guaranteed latest ref closure",
      "Zero re-render memoization for request options and body payloads",
    ],
    params: [
      { name: "client", type: "VelocityMethod | AxiosInstance", required: true, description: "HTTP client instance (e.g. api.get from antd-dynamic-ui)." },
      { name: "url", type: "string", required: true, description: "Endpoint URL to query." },
      { name: "options", type: "VelocityConfig", description: "Query params, headers, timeout, and custom request configs." },
      { name: "body", type: "any", description: "Request payload body for POST / PUT requests." },
      { name: "manual", type: "boolean", default: "false", description: "If true, does not fetch automatically on mount." },
      { name: "onSuccess", type: "(data: R) => void", description: "Callback triggered upon successful response." },
    ],
    returns: [
      { name: "data", type: "R | null", description: "Parsed response data object." },
      { name: "loading", type: "boolean", description: "Whether request is in-flight." },
      { name: "error", type: "string | null", description: "Human-readable error message if failed." },
      { name: "refetch", type: "(overrides?: any) => Promise<void>", description: "Function to trigger a re-fetch with optional param overrides." },
    ],
    code: `import React from "react";
import { useFetch, api } from "antd-dynamic-ui";
import { Table, Spin, Alert } from "antd";

export default function UsersList() {
  const { data, loading, error, refetch } = useFetch({
    client: api.get,
    url: "/api/v1/users",
    options: { params: { limit: 20 } },
  });

  if (loading) return <Spin tip="Fetching users..." />;
  if (error) return <Alert type="error" message={error} action={<button onClick={() => refetch()}>Retry</button>} />;

  return (
    <div>
      <h3 className="font-bold mb-3">Active Users</h3>
      <Table dataSource={data?.data?.rows || []} rowKey="id" />
    </div>
  );
}`,
    schema: {
      success: true,
      message: "Fetched successfully",
      data: {
        rows: [{ id: 1, name: "Alice Johnson" }],
        totalRows: 1,
      },
    },
    troubleshooting: [
      {
        issue: "Infinite loop re-fetching on every component render",
        cause: "Passing an inline literal object to 'options' without useMemo (e.g. options: { params: { id } }).",
        solution: "useFetch automatically stabilizes options using JSON stringification, but if using custom non-serializable objects or functions, memoize them with useMemo.",
        incorrectSnippet: `// ❌ INCORRECT: Non-serializable callback created every render
const { data } = useFetch({
  client: api.get,
  url: "/api/users",
  options: { transformResponse: (res) => res.data }
});`,
        correctSnippet: `// ✅ CORRECT: Plain JSON serializable options
const { data } = useFetch({
  client: api.get,
  url: "/api/users",
  options: { params: { active: true } }
});`,
      },
    ],
  },

  "use-grid-filters": {
    slug: "use-grid-filters",
    title: "useGridFilters",
    summary:
      "Granular Zustand-powered filter store hook that synchronizes table search, column filters, and header inputs with zero window event listeners.",
    description:
      "useGridFilters replaces slow window event listeners and un-scoped React context with a high-performance Zustand store. It allows components anywhere in the tree (DynamicHeader, DynamicTable, DynamicCard) to share filter and search states by subscribing only to a specific key, preventing unnecessary re-renders across other tables.",
    features: [
      "Granular Zustand store: re-renders only components subscribed to the identical filterKey",
      "Seamless synchronization between DynamicHeader search bar and DynamicTable",
      "Partial state updater: setFilters only updates passed keys, preserving existing filters",
      "Zero memory leaks: automatic garbage collection when table unmounts",
    ],
    params: [
      { name: "key", type: "string", required: true, description: "Unique string key identifying the table or page filter memory." },
      { name: "defaultValue", type: "T", default: "{}", description: "Initial fallback filters if store is empty." },
    ],
    returns: [
      { name: "filters", type: "T", description: "Current active filter state object." },
      { name: "setFilters", type: "(partial: Partial<T>) => void", description: "Merges new filter values into the current key store." },
    ],
    code: `import React from "react";
import { useGridFilters } from "antd-dynamic-ui";
import { Input, Button } from "antd";

export default function TableSearchSync() {
  const [filters, setFilters] = useGridFilters("orders-grid", { tableSearch: "" });

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Search orders..."
        value={filters.tableSearch || ""}
        onChange={(e) => setFilters({ tableSearch: e.target.value })}
      />
      <Button onClick={() => setFilters({ tableSearch: "" })}>Reset</Button>
    </div>
  );
}`,
  },

  "use-api-options": {
    slug: "use-api-options",
    title: "useApiOptions",
    summary:
      "Debounced async options loader for remote Select and Cascader fields with memory caching.",
    description:
      "useApiOptions powers asynchronous select dropdowns. It debounces keystrokes (default 300ms), executes remote queries, caches responses by search term to prevent duplicate API calls, and automatically converts results to Ant Design's { label, value } format.",
    features: [
      "Built-in 300ms debounce buffer on user keystrokes",
      "Internal query cache to eliminate redundant network round-trips",
      "Custom labelKey and valueKey mappings for non-standard backend schemas",
    ],
    params: [
      { name: "apiUrl", type: "string", required: true, description: "Remote search endpoint URL." },
      { name: "queryParam", type: "string", default: '"search"', description: "Query parameter name sent to API." },
      { name: "debounceMs", type: "number", default: "300", description: "Debounce delay in milliseconds." },
    ],
    returns: [
      { name: "options", type: "FieldOption[]", description: "Array of mapped { key, value } options." },
      { name: "loading", type: "boolean", description: "Whether remote search query is executing." },
      { name: "onSearch", type: "(query: string) => void", description: "Search input change handler." },
    ],
    code: `import React from "react";
import { useApiOptions } from "antd-dynamic-ui";
import { Select } from "antd";

export default function RemoteSelect() {
  const { options, loading, onSearch } = useApiOptions("/api/v1/companies/search");

  return (
    <Select
      showSearch
      loading={loading}
      onSearch={onSearch}
      filterOption={false}
      options={options.map((o) => ({ label: o.value, value: o.key }))}
    />
  );
}`,
  },

  "use-safe-control": {
    slug: "use-safe-control",
    title: "useSafeControl",
    summary:
      "Type-safe React Hook Form controller wrapper providing safe fallback defaults for undefined values.",
    description:
      "useSafeControl wraps React Hook Form's useController to eliminate controlled vs uncontrolled component warnings in React. If a field's form state is undefined or null, it injects a safe fallback default (such as empty string, empty array, or false).",
    features: [
      "Prevents React warning: 'A component is changing an uncontrolled input to be controlled'",
      "Normalizes null / undefined values to safe type-appropriate fallbacks",
      "Extracts error message strings directly from form state",
    ],
    params: [
      { name: "name", type: "string", required: true, description: "Field name registered in React Hook Form." },
      { name: "control", type: "Control<any>", description: "Optional control instance if not using FormProvider." },
      { name: "defaultValue", type: "any", default: '""', description: "Safe fallback value." },
    ],
    returns: [
      { name: "field", type: "ControllerRenderProps", description: "Field binding props (value, onChange, onBlur, ref)." },
      { name: "error", type: "string | undefined", description: "Active validation error message." },
    ],
    code: `import React from "react";
import { useSafeControl } from "antd-dynamic-ui";
import { Input } from "antd";

export default function CustomField({ name }: { name: string }) {
  const { field, error } = useSafeControl(name, undefined, "");

  return (
    <div>
      <Input {...field} status={error ? "error" : undefined} />
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
}`,
  },

  "use-dynamic-ui": {
    slug: "use-dynamic-ui",
    title: "useDynamicUI",
    summary:
      "Consumer hook to access global DynamicUIContext, navigation handlers, active theme, and permissions.",
    description:
      "useDynamicUI gives any child component direct access to configuration provided by DynamicUIProvider, including SPA router navigation callbacks (onNavigate), active design tokens and dark mode status, and permission checking predicates.",
    features: [
      "Access global onNavigate router push abstraction (Next.js / Vite / React Router)",
      "Access active theme tokens and dark/light mode state",
      "Evaluate user permissions for sensitive action buttons",
    ],
    params: [],
    returns: [
      { name: "onNavigate", type: "(url: string) => void", description: "Client-side router push function." },
      { name: "theme", type: "DynamicUITheme", description: "Current theme configuration object." },
      { name: "permissionChecker", type: "(perm: string) => boolean", description: "Evaluates whether user has specified permission." },
    ],
    code: `import React from "react";
import { useDynamicUI } from "antd-dynamic-ui";

export default function NavigationButton() {
  const { onNavigate, theme } = useDynamicUI();

  return (
    <button
      onClick={() => onNavigate("/settings")}
      style={{ borderColor: theme?.primaryColor }}
      className="px-4 py-2 border rounded"
    >
      Go to Settings ({theme?.mode} mode)
    </button>
  );
}`,
  },
};
