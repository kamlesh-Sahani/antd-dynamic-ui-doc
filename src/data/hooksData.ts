import { PropItem } from "@/components/PropsTable";
import { TroubleshootingItem } from "@/components/TroubleshootCard";
import { CodeExampleItem } from "@/components/MultiCodeExamples";

export interface HookDoc {
  slug: string;
  title: string;
  summary: string;
  description: string;
  features: string[];
  params: PropItem[];
  returns: PropItem[];
  code: string;
  examples: CodeExampleItem[];
  schema?: object | string;
  troubleshooting?: TroubleshootingItem[];
}

export const HOOKS_DATA: Record<string, HookDoc> = {
  "use-fetch": {
    slug: "use-fetch",
    title: "useFetch",
    summary: "Zero-dependency HTTP data-fetching hook with AbortController cancellation, retry capabilities, and automatic JSON extraction.",
    description: "useFetch is built specifically for antd-dynamic-ui components. It tracks loading and error states, automatically cancels in-flight requests when query parameters or URLs change via AbortController, and provides a stable refetch() callback for manual data refreshing.",
    features: [
      "Built-in AbortController request cancellation prevents out-of-order responses and race conditions",
      "Automatic payload error detection (detects { success: false, message })",
      "Manual execution mode (dontCall: true) for submit buttons and search triggers",
      "Configurable onSuccess callback with guaranteed latest closure",
      "Zero re-render memoization for request options and body payloads",
    ],
    params: [
      { name: "client", type: "VelocityMethod | AxiosInstance", required: true, description: "HTTP client instance (e.g. api.get from antd-dynamic-ui)." },
      { name: "url", type: "string", required: true, description: "Endpoint URL to query." },
      { name: "options", type: "VelocityConfig", description: "Query params, headers, timeout, and custom request configs." },
      { name: "body", type: "any", description: "Request payload body for POST / PUT requests." },
      { name: "dontCall", type: "boolean", default: "false", description: "If true, does not fetch automatically on mount (manual execution mode)." },
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

  return <Table dataSource={(data as any)?.data?.rows || []} rowKey="id" />;
}`,
    examples: [
      {
        title: "Auto-Fetch on Component Mount",
        description: "Standard declarative data fetch on mount with loading and error boundaries.",
        language: "tsx",
        filename: "useFetch.mount.tsx",
        code: `import React from "react";
import { useFetch, api, LoadingSpinner, ErrorApi } from "antd-dynamic-ui";
import { Card } from "antd";

export default function AnalyticsCard() {
  const { data, loading, error, refetch } = useFetch({
    client: api.get,
    url: "/api/v1/dashboard/metrics",
    options: { params: { range: "30d" } },
  });

  if (loading) return <LoadingSpinner size="medium" tip="Loading KPIs..." />;
  if (error) return <ErrorApi title="Metrics Error" message={error} onRetry={refetch} />;

  return (
    <Card title="Monthly Performance">
      <div className="text-2xl font-bold font-mono">
        \${(data as any)?.revenue?.toLocaleString() || "0.00"}
      </div>
    </Card>
  );
}`
      },
      {
        title: "Manual Trigger on Button Click",
        description: "Using dontCall: true to execute an on-demand report download.",
        language: "tsx",
        filename: "useFetch.manual.tsx",
        code: `import React from "react";
import { useFetch, api, ButtonField } from "antd-dynamic-ui";
import { message } from "antd";

export default function GenerateReportButton() {
  const { loading, refetch } = useFetch({
    client: api.post,
    url: "/api/v1/reports/generate",
    dontCall: true, // Do not fetch on mount
    onSuccess: (res: any) => {
      message.success(\`Report \${res.reportId} generated successfully!\`);
    },
  });

  return (
    <ButtonField
      type="primary"
      loading={loading}
      onClick={() => refetch({ body: { format: "pdf", department: "audit" } })}
    >
      Generate Audit PDF
    </ButtonField>
  );
}`
      },
      {
        title: "Search Query with Cancellation",
        description: "Re-querying an endpoint dynamically when user input changes, canceling in-flight calls.",
        language: "tsx",
        filename: "useFetch.search.tsx",
        code: `import React, { useState } from "react";
import { useFetch, api } from "antd-dynamic-ui";
import { Input, List } from "antd";

export default function DebouncedLiveSearch() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, loading } = useFetch({
    client: api.get,
    url: "/api/v1/customers/autocomplete",
    options: { params: { query: searchTerm } },
    dontCall: !searchTerm, // Skip when input is empty
  });

  return (
    <div className="space-y-3">
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Type to search customers in real-time..."
        allowClear
      />
      <List
        loading={loading}
        dataSource={(data as any)?.customers || []}
        renderItem={(item: any) => <List.Item>{item.name} - {item.email}</List.Item>}
      />
    </div>
  );
}`
      }
    ],
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
        solution: "useFetch stabilizes options automatically using JSON serialization, but if passing non-serializable objects or functions, memoize them with useMemo.",
        incorrectSnippet: `// ❌ Non-serializable callback created every render
const { data } = useFetch({ client: api.get, url: "/api", options: { transform: () => {} } });`,
        correctSnippet: `// ✅ Standard serializable params or memoized options
const { data } = useFetch({ client: api.get, url: "/api", options: { params: { id } } });`
      }
    ]
  },

  "use-grid-filters": {
    slug: "use-grid-filters",
    title: "useGridFilters",
    summary: "Zustand-powered synchronized grid filter state hook across DynamicHeader, DynamicTable, and FilterDrawer.",
    description: "useGridFilters coordinates multi-component filtering state. When a user types in DynamicHeader, changes column visibility in ColumnDrawer, or applies dates in FilterDrawer, useGridFilters ensures every component reacts without prop drilling.",
    features: [
      "Zero prop-drilling: shared global Zustand state indexed by filterKey",
      "Persistent state: remembers search terms, page index, and active sort columns",
      "Type-safe getter and setter tuple: [filters, setFilters] = useGridFilters(key)",
    ],
    params: [
      { name: "filterKey", type: "string", required: true, description: "Unique grid namespace identifier." },
    ],
    returns: [
      { name: "filters", type: "T", description: "Current filter state object (search, page, limit, sort, columns)." },
      { name: "setFilters", type: "(updater: Partial<T> | ((prev: T) => T)) => void", description: "State setter accepting partial objects or updater functions." },
    ],
    code: `import { useGridFilters } from "antd-dynamic-ui";

export function CustomFilterToggle() {
  const [filters, setFilters] = useGridFilters("users_grid");
  return (
    <button onClick={() => setFilters({ status: "active" })}>
      Show Active Only
    </button>
  );
}`,
    examples: [
      {
        title: "Connecting Custom Filter Chips",
        description: "Reading active search state and toggling status filters.",
        language: "tsx",
        filename: "useGridFilters.chips.tsx",
        code: `import React from "react";
import { useGridFilters } from "antd-dynamic-ui";
import { Tag } from "antd";

export default function StatusFilterPills() {
  const [filters, setFilters] = useGridFilters<any>("orders_grid");

  const activeStatus = filters?.status || "ALL";

  return (
    <div className="flex gap-2">
      {["ALL", "PENDING", "SHIPPED", "DELIVERED"].map((st) => (
        <Tag.CheckableTag
          key={st}
          checked={activeStatus === st}
          onChange={() => setFilters({ status: st === "ALL" ? undefined : st, page: 1 })}
        >
          {st}
        </Tag.CheckableTag>
      ))}
    </div>
  );
}`
      },
      {
        title: "Resetting All Grid Filters",
        description: "Programmatically resetting search, pagination, and sort order.",
        language: "tsx",
        filename: "useGridFilters.reset.tsx",
        code: `import React from "react";
import { useGridFilters, ButtonField } from "antd-dynamic-ui";

export default function ResetFiltersButton() {
  const [, setFilters] = useGridFilters<any>("accounts_grid");

  const handleReset = () => {
    setFilters({
      search: "",
      page: 1,
      sortBy: "createdAt",
      order: "desc",
      status: undefined,
    });
  };

  return (
    <ButtonField onClick={handleReset}>
      Reset All Filters
    </ButtonField>
  );
}`
      }
    ]
  },

  "use-api-options": {
    slug: "use-api-options",
    title: "useApiOptions",
    summary: "Asynchronous dropdown options loader with debounced search, pagination, and data formatting.",
    description: "useApiOptions powers SelectApiField and remote autocompletes. It handles debounced search queries, infinite scroll loading, caching, and mapping backend keys to { key, value } options.",
    features: [
      "Debounced search queries (default: 400ms)",
      "Infinite scroll pagination (loadingMore state)",
      "Custom transformation via onFormatData callback",
    ],
    params: [
      { name: "apiUrl", type: "string", description: "Remote endpoint to query." },
      { name: "debounceMs", type: "number", default: "400", description: "Search debounce delay in milliseconds." },
      { name: "labelPath", type: "string", default: '"value"', description: "JSON key for option label." },
      { name: "valuePath", type: "string", default: '"key"', description: "JSON key for option value." },
    ],
    returns: [
      { name: "options", type: "OptionType[]", description: "Formatted array of { key, value } options." },
      { name: "loading", type: "boolean", description: "Initial query loading state." },
      { name: "loadingMore", type: "boolean", description: "Loading state during infinite scroll." },
      { name: "onSearch", type: "(text: string) => void", description: "Search callback to trigger debounced query." },
    ],
    code: `import { useApiOptions } from "antd-dynamic-ui";
import { Select } from "antd";

export function CustomRemoteDropdown() {
  const { options, loading, onSearch } = useApiOptions({
    apiUrl: "/api/v1/skills",
    debounceMs: 300,
  });

  return <Select showSearch onSearch={onSearch} loading={loading} options={options} />;
}`,
    examples: [
      {
        title: "Standalone Remote Select with useApiOptions",
        description: "Hook integration with Ant Design's standard Select component.",
        language: "tsx",
        filename: "useApiOptions.select.tsx",
        code: `import React from "react";
import { useApiOptions } from "antd-dynamic-ui";
import { Select } from "antd";

export default function DepartmentSelect() {
  const { options, loading, onSearch } = useApiOptions({
    apiUrl: "/api/v1/departments",
    labelPath: "deptName",
    valuePath: "deptId",
    debounceMs: 300,
  });

  return (
    <Select
      showSearch
      placeholder="Select department"
      loading={loading}
      onSearch={onSearch}
      options={options.map((o) => ({ label: o.value, value: o.key }))}
      className="w-72"
    />
  );
}`
      }
    ]
  },

  "use-safe-control": {
    slug: "use-safe-control",
    title: "useSafeControl",
    summary: "Smart control resolver that retrieves React Hook Form Control from props or falls back to FormContext.",
    description: "useSafeControl allows building modular form field components. If a developer explicitly passes control={control}, it uses it; otherwise, it grabs control from the nearest FormProvider context without throwing runtime errors.",
    features: [
      "Zero crash guarantee: gracefully falls back to useFormContext()",
      "Enables both standalone usage and parent FormProvider wrapping",
    ],
    params: [
      { name: "explicitControl", type: "Control<any>", description: "Optional control prop passed into component." },
    ],
    returns: [
      { name: "control", type: "Control<any> | undefined", description: "Resolved valid Control instance." },
    ],
    code: `import { useSafeControl } from "antd-dynamic-ui";
import { Controller } from "react-hook-form";

export function CustomInput({ control: explicitControl, name }: any) {
  const control = useSafeControl(explicitControl);
  return <Controller name={name} control={control} render={({ field }) => <input {...field} />} />;
}`,
    examples: [
      {
        title: "Creating a Modular Custom Form Field",
        description: "Building an input that works with or without explicit control prop.",
        language: "tsx",
        filename: "useSafeControl.custom.tsx",
        code: `import React from "react";
import { useSafeControl } from "antd-dynamic-ui";
import { Controller, Control } from "react-hook-form";
import { Input } from "antd";

interface CustomTagInputProps {
  name: string;
  label: string;
  control?: Control<any>;
}

export default function CustomTagInput({ name, label, control: explicitControl }: CustomTagInputProps) {
  const control = useSafeControl(explicitControl);

  return (
    <div className="space-y-1">
      <label className="text-xs font-semibold">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input {...field} placeholder="Enter custom tags..." />
        )}
      />
    </div>
  );
}`
      }
    ]
  },

  "use-dynamic-ui": {
    slug: "use-dynamic-ui",
    title: "useDynamicUI",
    summary: "Context hook providing global application UI configuration, current user session, active module, and sidebar toggling.",
    description: "useDynamicUI connects components to DynamicUIContext. It exposes the current user profile, active navigation module, sidebar collapse state, and audit modal handlers.",
    features: [
      "Access active user profile and permissions",
      "Toggle sidebar collapsed state across layouts",
      "Switch between active enterprise workspace modules",
    ],
    params: [],
    returns: [
      { name: "user", type: "any", description: "Current authenticated user profile object." },
      { name: "collapsed", type: "boolean", description: "Sidebar collapsed state." },
      { name: "setCollapsed", type: "(v: boolean) => void", description: "Toggle sidebar collapse state." },
      { name: "currentModule", type: "string", description: "Active suite module key." },
      { name: "setCurrentModule", type: "(mod: string) => void", description: "Module change setter." },
    ],
    code: `import { useDynamicUI } from "antd-dynamic-ui";

export function UserBadge() {
  const { user, collapsed, setCollapsed } = useDynamicUI();
  return (
    <div>
      <span>Logged in as: {user?.name}</span>
      <button onClick={() => setCollapsed(!collapsed)}>Toggle Sidebar</button>
    </div>
  );
}`,
    examples: [
      {
        title: "Consuming Global User Profile in Header",
        description: "Displaying avatar and role in application navbar.",
        language: "tsx",
        filename: "useDynamicUI.header.tsx",
        code: `import React from "react";
import { useDynamicUI } from "antd-dynamic-ui";
import { Avatar, Tag } from "antd";

export default function GlobalNavbarProfile() {
  const { user, currentModule } = useDynamicUI();

  return (
    <div className="flex items-center gap-3">
      <Tag color="blue">{currentModule || "Core Module"}</Tag>
      <Avatar src={user?.avatar}>{user?.name?.charAt(0) || "U"}</Avatar>
      <div className="text-xs">
        <div className="font-semibold">{user?.name || "Anonymous User"}</div>
        <div className="text-zinc-500">{user?.role || "Staff"}</div>
      </div>
    </div>
  );
}`
      }
    ]
  }
};
