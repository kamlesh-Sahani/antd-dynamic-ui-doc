import { PropItem } from "@/components/PropsTable";
import { TroubleshootingItem } from "@/components/TroubleshootCard";

export interface ComponentDoc {
  slug: string;
  title: string;
  category: "Core Dynamic Components" | "Standard Form Fields" | "UI Feedback";
  badge?: string;
  summary: string;
  description: string;
  features: string[];
  props: PropItem[];
  code: string;
  schema?: object | string;
  troubleshooting?: TroubleshootingItem[];
}

export const COMPONENTS_DATA: Record<string, ComponentDoc> = {
  "dynamic-table": {
    slug: "dynamic-table",
    title: "DynamicTable",
    category: "Core Dynamic Components",
    badge: "Flagship Data Grid",
    summary:
      "Virtual-scrolling, schema-driven enterprise data grid with adaptive virtualization, nested filters drawer, column visibility toggles, and Excel/CSV export.",
    description:
      "DynamicTable is the flagship component of antd-dynamic-ui. Rather than manually defining dozens of JSX Column tags and custom cell renderers, you pass a clean JSON column schema. DynamicTable optimizes DOM rendering using an adaptive virtualization threshold (>50 rows), throttles ResizeObserver events with requestAnimationFrame to prevent layout thrashing, and includes built-in column reordering drawers and export modals.",
    features: [
      "60 FPS Virtual Scrolling for 100,000+ records with adaptive threshold (>50 rows)",
      "Zero Layout Thrashing via requestAnimationFrame-throttled ResizeObserver",
      "Declarative column types: 'string', 'number', 'tag', 'badge', 'date', 'image', 'action'",
      "Built-in ColumnDrawer for reordering and toggling column visibility",
      "Built-in DownloadModal supporting CSV and Excel XLSX export",
      "Nested FilterDrawer with custom condition predicates (equals, contains, between)",
      "Supports server-side pagination with both page/limit and cursor models",
    ],
    props: [
      {
        name: "columns",
        type: "TableColumn[]",
        required: true,
        description: "Array of column definition objects specifying key, title, type, width, sortable, filterable.",
      },
      {
        name: "rows",
        type: "any[]",
        required: true,
        description: "Array of row data objects to display.",
      },
      {
        name: "totalRows",
        type: "number",
        required: true,
        description: "Total count of records available on the server for pagination calculations.",
      },
      {
        name: "pagination",
        type: "{ page: number; limit: number }",
        default: "{ page: 1, limit: 10 }",
        description: "Current pagination state controlling active page index and page size.",
      },
      {
        name: "onPaginationChange",
        type: "(page: number, limit: number) => void",
        description: "Callback invoked when user changes the active page or items per page dropdown.",
      },
      {
        name: "searchable",
        type: "boolean",
        default: "false",
        description: "Whether to display the global search input in the table header.",
      },
      {
        name: "onSearch",
        type: "(term: string) => void",
        description: "Callback invoked when search input changes (debounced by default).",
      },
      {
        name: "filterOptions",
        type: "{ showFilters?: boolean; onFilter?: (filters: any) => void }",
        description: "Configuration for the slide-out FilterDrawer.",
      },
      {
        name: "exportOptions",
        type: "{ enabled?: boolean; fileName?: string }",
        description: "Configuration for enabling Excel (.xlsx) and CSV data export dialog.",
      },
      {
        name: "columnVisibilityOptions",
        type: "{ enabled?: boolean }",
        description: "Enables the user to customize column visibility and ordering via ColumnDrawer.",
      },
    ],
    code: `import React, { useState } from "react";
import { DynamicTable, TableColumn } from "antd-dynamic-ui";

const columns: TableColumn[] = [
  { title: "ID", key: "id", type: "number", width: 80, sortable: true },
  { title: "Customer Name", key: "name", type: "string", filterable: true, searchable: true },
  { title: "Email", key: "email", type: "string" },
  { title: "Subscription", key: "tier", type: "tag", width: 130, tagColor: "blue" },
  { title: "Account Status", key: "status", type: "badge", width: 120 },
  { title: "Created At", key: "createdAt", type: "date", width: 160 },
];

export default function CustomersTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  return (
    <DynamicTable
      columns={columns}
      rows={[
        { id: 1, name: "Marcus Wright", email: "marcus@corp.io", tier: "Enterprise", status: "success", createdAt: "2026-03-01T10:00:00Z" },
        { id: 2, name: "Elena Rostova", email: "elena@corp.io", tier: "Pro", status: "processing", createdAt: "2026-03-02T11:15:00Z" },
      ]}
      totalRows={2}
      pagination={{ page, limit }}
      onPaginationChange={(p, l) => {
        setPage(p);
        setLimit(l);
      }}
      searchable
      filterOptions={{ showFilters: true }}
      exportOptions={{ enabled: true, fileName: "customers" }}
    />
  );
}`,
    schema: {
      success: true,
      data: {
        rows: [
          {
            id: 1,
            name: "Alexander Wright",
            email: "alex@enterprise.com",
            role: "Admin",
            status: "success",
            createdAt: "2026-03-15T09:30:00.000Z",
          },
        ],
        totalRows: 1250,
        pageNumber: 1,
        pageSize: 10,
        totalPages: 125,
      },
    },
    troubleshooting: [
      {
        issue: "Table shows 'No Data' even though backend API returned HTTP 200",
        cause:
          "The backend returned data under a different key than 'rows' (e.g. 'items', 'list', or 'results'), or the response array was returned directly without nesting under { data: { rows } }.",
        solution:
          "Map your backend response to { rows: data.items, totalRows: data.totalCount } before passing to DynamicTable.",
        incorrectSnippet: `// ❌ INCORRECT: Returning { items: [...] } or flat array
{
  "status": "ok",
  "items": [{ "id": 1, "name": "Alice" }],
  "total": 1
}`,
        correctSnippet: `// ✅ CORRECT: Expected schema by DynamicTable
{
  "success": true,
  "data": {
    "rows": [{ "id": 1, "name": "Alice" }],
    "totalRows": 1
  }
}`,
      },
      {
        issue: "Date column displays 'Invalid Date' or 'NaN/NaN/0NaN'",
        cause:
          "Date values are Unix timestamps in seconds (10 digits) instead of ISO 8601 strings or milliseconds (13 digits).",
        solution:
          "Ensure your backend serializes timestamps in ISO 8601 format (e.g. '2026-03-15T12:00:00Z') or multiply Unix seconds by 1000 before rendering.",
        incorrectSnippet: `// ❌ INCORRECT: Raw 10-digit unix seconds
{
  "id": 1,
  "createdAt": 1773576000
}`,
        correctSnippet: `// ✅ CORRECT: ISO 8601 string or 13-digit millisecond timestamp
{
  "id": 1,
  "createdAt": "2026-03-15T12:00:00.000Z"
}`,
      },
    ],
  },

  "dynamic-form": {
    slug: "dynamic-form",
    title: "DynamicForm",
    category: "Core Dynamic Components",
    badge: "Zod Schema Engine",
    summary:
      "Automated 2D form layout engine powered by React Hook Form and Zod runtime schema generation.",
    description:
      "DynamicForm eliminates the manual orchestration of form controllers and validation rules. Given a 2D matrix of field configurations (rows and columns), DynamicForm compiles a type-safe Zod schema on the fly, wires up reactivity through React Hook Form, and handles conditional field visibility, custom error messaging, and dirty tracking.",
    features: [
      "2D Matrix Grid: Define form layouts with row arrays containing multiple fields per row",
      "Automatic Zod Schema: Compiles validation rules (required, min, max, regex, email) at runtime",
      "Zero Re-Render Overhead: Uses React Hook Form context for high performance typing",
      "Conditional Visibility: Show/hide fields dynamically using condition expressions",
      "Custom Submit Footer: Configurable submit button label or custom footer renderer",
    ],
    props: [
      {
        name: "schema",
        type: "{ rows: FieldConfig[][] }",
        required: true,
        description: "2D matrix of field configuration rows.",
      },
      {
        name: "onSubmit",
        type: "(data: any) => void | Promise<void>",
        required: true,
        description: "Async callback fired when form validation succeeds.",
      },
      {
        name: "initialValues",
        type: "Record<string, any>",
        default: "{}",
        description: "Pre-populated form values to edit existing entities.",
      },
      {
        name: "submitText",
        type: "string",
        default: '"Submit"',
        description: "Custom label text for the submit button.",
      },
      {
        name: "isSubmitting",
        type: "boolean",
        default: "false",
        description: "Sets loading spinner on the submit button.",
      },
      {
        name: "showSubmitButton",
        type: "boolean",
        default: "true",
        description: "Whether to render the built-in submit button.",
      },
    ],
    code: `import React from "react";
import { DynamicForm, FormSchema } from "antd-dynamic-ui";

const schema: FormSchema = {
  rows: [
    [
      { id: "username", label: "Username", type: "input", validation: { required: true, minLength: 3 } },
      { id: "email", label: "Email", type: "email", validation: { required: true } },
    ],
    [
      {
        id: "role",
        label: "Role",
        type: "select",
        options: [
          { key: "admin", value: "Administrator" },
          { key: "staff", value: "Staff Member" },
        ],
      },
      { id: "country", label: "Country", type: "country", validation: { required: true } },
    ],
  ],
};

export default function RegisterUser() {
  const handleSubmit = (data: any) => {
    console.log("Validated Form Data:", data);
  };

  return <DynamicForm schema={schema} onSubmit={handleSubmit} submitText="Save User" />;
}`,
    schema: {
      rows: [
        [
          {
            id: "firstName",
            type: "input",
            label: "First Name",
            placeholder: "John",
            validation: { required: true },
          },
          {
            id: "lastName",
            type: "input",
            label: "Last Name",
            placeholder: "Doe",
            validation: { required: true },
          },
        ],
        [
          {
            id: "workEmail",
            type: "email",
            label: "Work Email",
            validation: { required: true },
          },
        ],
      ],
    },
    troubleshooting: [
      {
        issue: "Field value is not captured upon form submit",
        cause:
          "The field configuration used 'name' instead of 'id', or duplicate 'id' keys were specified in the schema matrix.",
        solution:
          "Always specify a unique 'id' property on each FieldConfig object. The 'id' maps directly to the submitted JSON payload key.",
        incorrectSnippet: `// ❌ INCORRECT: Using 'name' instead of 'id'
{
  "name": "companyEmail",
  "label": "Email",
  "type": "email"
}`,
        correctSnippet: `// ✅ CORRECT: Standard 'id' property
{
  "id": "companyEmail",
  "label": "Email",
  "type": "email"
}`,
      },
    ],
  },

  "dynamic-modal": {
    slug: "dynamic-modal",
    title: "DynamicModal",
    category: "Core Dynamic Components",
    summary:
      "Accessible modal dialogue with customizable headers, animated backdrops, and action buttons.",
    description:
      "DynamicModal provides a controlled dialog layer built on top of standard modal access controls. It supports customizable header actions, close buttons (icon or text), custom footers, and accessible focus management.",
    features: [
      "Customizable Header with icon or text close actions",
      "Custom Header Action slots for badges and status indicators",
      "Full responsive screen adaptation on mobile screens",
      "Accessible keyboard navigation (Escape to close)",
    ],
    props: [
      { name: "isOpen", type: "boolean", required: true, description: "Controls whether the modal is visible." },
      { name: "onClose", type: "() => void", required: true, description: "Callback invoked when modal is dismissed." },
      { name: "title", type: "React.ReactNode", description: "Modal title content in the header." },
      { name: "footer", type: "React.ReactNode", description: "Action buttons or footer content." },
      { name: "close", type: '"icon" | "text"', default: '"icon"', description: "Close button variant style." },
    ],
    code: `import React, { useState } from "react";
import { DynamicModal } from "antd-dynamic-ui";
import { Button } from "antd";

export default function ModalDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <DynamicModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Session Expired"
        footer={<Button type="primary" onClick={() => setOpen(false)}>Re-authenticate</Button>}
      >
        <p>Your session has expired. Please log in again to continue.</p>
      </DynamicModal>
    </>
  );
}`,
  },

  "dynamic-drawer": {
    slug: "dynamic-drawer",
    title: "DynamicDrawer",
    category: "Core Dynamic Components",
    summary:
      "Slide-out panel for entity inspections, audit logs, and secondary editing flows.",
    description:
      "DynamicDrawer extends Ant Design's Drawer with unified header styles, back-arrow dismiss triggers, custom widths, and sticky action footers.",
    features: [
      "Placements: 'right', 'left', 'top', 'bottom'",
      "Custom responsive widths (e.g. '80vw', '500px')",
      "Custom ExtraTitleChild slot for tags and secondary badges",
      "Sticky footer integration",
    ],
    props: [
      { name: "isOpen", type: "boolean", required: true, description: "Whether drawer is open." },
      { name: "onClose", type: "() => void", required: true, description: "Close handler." },
      { name: "title", type: "React.ReactNode", description: "Header title." },
      { name: "placement", type: '"right" | "left" | "top" | "bottom"', default: '"right"', description: "Slide origin." },
      { name: "width", type: "number | string", default: '"80vw"', description: "Drawer width." },
    ],
    code: `import React, { useState } from "react";
import { DynamicDrawer } from "antd-dynamic-ui";
import { Button } from "antd";

export default function DrawerDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Audit Drawer</Button>
      <DynamicDrawer
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Entity Audit Log"
        placement="right"
        width="450px"
      >
        <p>Event traces recorded for this account...</p>
      </DynamicDrawer>
    </>
  );
}`,
  },

  "dynamic-card": {
    slug: "dynamic-card",
    title: "DynamicCard",
    category: "Core Dynamic Components",
    summary:
      "Infinite-scroll card grid fed by remote APIs with built-in filter synchronisation.",
    description:
      "DynamicCard turns API responses into responsive card grids with infinite scrolling, sentinel ref observation, empty state handlers, and search filter synchronization via useGridFilters.",
    features: [
      "Infinite scroll via IntersectionObserver sentinel ref",
      "Automatic grid filter synchronization with table search stores",
      "Built-in CardSkeleton placeholder states",
      "Key-value pair layout with line clamps and title tooltips",
    ],
    props: [
      { name: "apiData", type: "ApiDataType", required: true, description: "API configuration containing url, method, params." },
      { name: "filterKey", type: "string", required: true, description: "Unique filter key used to sync search and filters." },
      { name: "pageSize", type: "number", default: "20", description: "Number of cards fetched per page." },
      { name: "gridClassName", type: "string", description: "Custom Tailwind CSS classes for the grid container." },
    ],
    code: `import React from "react";
import { DynamicCard } from "antd-dynamic-ui";

export default function CardGridDemo() {
  return (
    <DynamicCard
      apiData={{ url: "/api/v1/projects", method: "GET" }}
      filterKey="projects-grid"
      pageSize={12}
    />
  );
}`,
    schema: {
      success: true,
      message: "Fetched projects",
      data: {
        rows: [
          {
            title: "Project Alpha",
            info: [
              { key: "Lead", value: "Alexander Wright" },
              { key: "Budget", value: "$45,000" },
            ],
          },
        ],
        totalRows: 1,
        pageNumber: 1,
        pageSize: 12,
      },
    },
  },

  "dynamic-header": {
    slug: "dynamic-header",
    title: "DynamicHeader",
    category: "Core Dynamic Components",
    summary:
      "Top bar with global search, filter count badges, export triggers, and column customization.",
    description:
      "DynamicHeader connects to useGridFilters to synchronize global table search, active filter count badges, and triggers for FilterDrawer, ColumnDrawer, and DownloadModal.",
    features: [
      "Synchronized search input with useGridFilters tableSearch",
      "Active filter counter badge",
      "Integrated triggers for CSV/Excel export and column reordering",
      "Custom left and right action slots",
    ],
    props: [
      { name: "filterKey", type: "string", required: true, description: "Filter store key to bind with." },
      { name: "title", type: "string", required: true, description: "Header title." },
      { name: "searchPlaceholder", type: "string", default: '"Search here"', description: "Placeholder for search input." },
      { name: "onRefresh", type: "() => void", description: "Callback when refresh button is clicked." },
    ],
    code: `import React from "react";
import { DynamicHeader } from "antd-dynamic-ui";

export default function HeaderDemo() {
  return (
    <DynamicHeader
      filterKey="orders-table"
      title="Orders Management"
      searchPlaceholder="Search order ID or customer..."
      onRefresh={() => console.log("Refreshed")}
    />
  );
}`,
  },

  "dynamic-sidebar": {
    slug: "dynamic-sidebar",
    title: "DynamicSideBar",
    category: "Core Dynamic Components",
    summary:
      "Responsive collapsible navigation sidebar supporting hierarchical routing, badges, and user profile.",
    description:
      "DynamicSideBar provides a multi-level hierarchical menu bar with smooth collapse animations, search filtering across routes, permission-based item pruning, and user profile popovers.",
    features: [
      "Hierarchical nested routes with permission-based checks",
      "Smooth collapse state with tooltips on hover",
      "Route map precomputation for zero latency navigation",
      "User profile popover with logout confirmation modal",
    ],
    props: [
      { name: "menuItems", type: "any[]", description: "Array of menu navigation items with route, icon, and label." },
      { name: "collapsed", type: "boolean", default: "false", description: "Whether sidebar is collapsed." },
      { name: "onCollapseChange", type: "(collapsed: boolean) => void", description: "Collapse state change callback." },
    ],
    code: `import React, { useState } from "react";
import { DynamicSideBar } from "antd-dynamic-ui";

export default function SidebarDemo() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <DynamicSideBar
      collapsed={collapsed}
      onCollapseChange={setCollapsed}
    />
  );
}`,
  },

  // Standard Form Fields
  "input-field": {
    slug: "input-field",
    title: "InputField",
    category: "Standard Form Fields",
    summary: "Single-line text input with tooltip hints, prefix/suffix icons, and clear button.",
    description: "Standard text input field fully integrated with React Hook Form. Supports required indicators, info tooltips, and custom change listeners.",
    features: ["RHF Controller integration", "Info tooltip icon beside label", "Custom placeholder & clear button"],
    props: [
      { name: "id", type: "string", required: true, description: "Form state key name." },
      { name: "label", type: "string", description: "Field label." },
      { name: "placeholder", type: "string", description: "Input placeholder." },
      { name: "tooltip", type: "string", description: "Tooltip text shown next to label." },
      { name: "required", type: "boolean", default: "false", description: "Shows red asterisk." },
    ],
    code: `<InputField id="fullName" label="Full Name" placeholder="e.g. John Doe" required />`,
  },

  "password-field": {
    slug: "password-field",
    title: "PasswordField",
    category: "Standard Form Fields",
    summary: "Masked password input with eye icon visibility toggle.",
    description: "Secure password entry input with built-in show/hide eye toggle button and RHF integration.",
    features: ["Toggle visibility button", "Caps lock warning", "RHF integration"],
    props: [
      { name: "id", type: "string", required: true, description: "Form state key." },
      { name: "label", type: "string", description: "Field label." },
      { name: "placeholder", type: "string", description: "Input placeholder." },
    ],
    code: `<PasswordField id="password" label="Account Password" required />`,
  },

  "select-field": {
    slug: "select-field",
    title: "SelectField",
    category: "Standard Form Fields",
    summary: "Single or multi-select dropdown supporting key/value option objects.",
    description: "Dropdown selector taking array of { key, value } options with search filtering and clear buttons.",
    features: ["Key-value option normalization", "Searchable filter options", "Multi-select mode support"],
    props: [
      { name: "id", type: "string", required: true, description: "Form state key." },
      { name: "options", type: "FieldOption[]", required: true, description: "List of { key: string, value: string } options." },
      { name: "placeholder", type: "string", description: "Select placeholder." },
    ],
    code: `<SelectField id="role" label="Role" options={[{ key: "admin", value: "Administrator" }]} />`,
  },

  "select-api-field": {
    slug: "select-api-field",
    title: "SelectApiField",
    category: "Standard Form Fields",
    badge: "Async Debounced Search",
    summary: "Remote data select dropdown with debounced search and asynchronous API fetching.",
    description: "Queries remote APIs as user types with configurable debounce intervals and request cancellation.",
    features: ["Debounced remote query (300ms default)", "AbortController request cancellation", "Auto-mapping of response keys"],
    props: [
      { name: "id", type: "string", required: true, description: "Form state key." },
      { name: "apiUrl", type: "string", required: true, description: "Remote search endpoint URL." },
      { name: "queryParam", type: "string", default: '"search"', description: "Query string parameter name." },
    ],
    code: `<SelectApiField id="userId" apiUrl="/api/v1/users/search" queryParam="q" label="Assignee" />`,
    schema: {
      success: true,
      data: [
        { key: "usr_1", value: "Dr. Gregory House" },
        { key: "usr_2", value: "Dr. James Wilson" },
      ],
    },
    troubleshooting: [
      {
        issue: "Dropdown shows empty options list even after API returns results",
        cause: "API response returned objects without 'key' and 'value' attributes (e.g. using 'id' and 'name').",
        solution: "Format the API response or use valueKey/labelKey props to map the schema.",
        incorrectSnippet: `// ❌ INCORRECT: Missing 'key' / 'value'
[{ "id": 101, "name": "Alexander" }]`,
        correctSnippet: `// ✅ CORRECT: Standard { key, value } objects
[{ "key": "101", "value": "Alexander" }]`,
      },
    ],
  },

  "autocomplete-select": {
    slug: "autocomplete-select",
    title: "AutocompleteSelect",
    category: "Standard Form Fields",
    summary: "Typeahead combobox allowing both free text input and dropdown option selection.",
    description: "Combines an input field with an option dropdown, letting users select an existing option or enter custom text.",
    features: ["Hybrid input and dropdown", "Instant search filtering", "RHF integration"],
    props: [
      { name: "id", type: "string", required: true, description: "Form state key." },
      { name: "options", type: "FieldOption[]", required: true, description: "Autocomplete options." },
    ],
    code: `<AutocompleteSelect id="domain" label="Primary Domain" options={[{ key: "app.io", value: "app.io" }]} />`,
  },

  "date-field": {
    slug: "date-field",
    title: "DateField",
    category: "Standard Form Fields",
    summary: "Single date picker with Dayjs conversion and ISO 8601 string normalization.",
    description: "DatePicker supporting string serialization. Automatically parses ISO date strings to Dayjs and returns standardized strings back to form state.",
    features: ["Automatic Dayjs conversion", "ISO 8601 string serialization", "Disabled date constraints"],
    props: [
      { name: "id", type: "string", required: true, description: "Form state key." },
      { name: "format", type: "string", default: '"YYYY-MM-DD"', description: "Display date format." },
    ],
    code: `<DateField id="birthDate" label="Birth Date" />`,
  },

  "date-range-field": {
    slug: "date-range-field",
    title: "DateRangeField",
    category: "Standard Form Fields",
    summary: "Range picker for selecting start and end dates.",
    description: "Dual calendar picker returning an array of two ISO date strings [startDate, endDate].",
    features: ["Presets support (This Week, This Month, YTD)", "Dual calendar popup", "RHF serialization"],
    props: [
      { name: "id", type: "string", required: true, description: "Form state key." },
      { name: "label", type: "string", description: "Field label." },
    ],
    code: `<DateRangeField id="billingPeriod" label="Billing Period" />`,
  },

  "time-picker-field": {
    slug: "time-picker-field",
    title: "TimePickerField",
    category: "Standard Form Fields",
    summary: "Time selection control with hour, minute, and second columns.",
    description: "Ant Design TimePicker wrapper with format customization and 12/24 hour display.",
    features: ["12-hour (AM/PM) and 24-hour mode", "Custom minute/second steps", "RHF serialization"],
    props: [
      { name: "id", type: "string", required: true, description: "Form state key." },
      { name: "format", type: "string", default: '"HH:mm:ss"', description: "Time format." },
    ],
    code: `<TimePickerField id="shiftStart" label="Shift Start Time" format="HH:mm" />`,
  },

  "time-range-field": {
    slug: "time-range-field",
    title: "TimeRangeField",
    category: "Standard Form Fields",
    summary: "Time interval picker for start and end operating hours.",
    description: "Allows selection of start and end hours with validation ensuring end time is after start time.",
    features: ["Time range validation", "Format customization", "RHF integration"],
    props: [
      { name: "id", type: "string", required: true, description: "Form state key." },
      { name: "label", type: "string", description: "Field label." },
    ],
    code: `<TimeRangeField id="businessHours" label="Operating Hours" />`,
  },

  "number-field": {
    slug: "number-field",
    title: "NumberField",
    category: "Standard Form Fields",
    summary: "Numeric input with min, max, precision, and step increment controls.",
    description: "Constrains input to numeric values, supporting decimal precision, min/max bounds, and formatting (e.g. currency).",
    features: ["Min/Max boundary enforcement", "Decimal precision control", "Up/Down step controls"],
    props: [
      { name: "id", type: "string", required: true, description: "Form state key." },
      { name: "min", type: "number", description: "Minimum allowable value." },
      { name: "max", type: "number", description: "Maximum allowable value." },
      { name: "step", type: "number", default: "1", description: "Step increment." },
    ],
    code: `<NumberField id="quantity" label="Item Quantity" min={1} max={999} />`,
  },

  "text-area-field": {
    slug: "text-area-field",
    title: "TextAreaField",
    category: "Standard Form Fields",
    summary: "Multi-line text area with auto-resize and character count.",
    description: "Multi-line text area supporting autosize ({ minRows, maxRows }), character count display, and maxLength constraints.",
    features: ["Auto-sizing height", "Character count badge", "RHF integration"],
    props: [
      { name: "id", type: "string", required: true, description: "Form state key." },
      { name: "rows", type: "number", default: "4", description: "Initial row count." },
      { name: "maxLength", type: "number", description: "Character limit." },
    ],
    code: `<TextAreaField id="notes" label="Meeting Notes" rows={4} maxLength={500} />`,
  },

  "switch-field": {
    slug: "switch-field",
    title: "SwitchField",
    category: "Standard Form Fields",
    summary: "Boolean toggle switch for binary preferences and features.",
    description: "Ant Design Switch wrapped with RHF Controller, returning boolean true or false.",
    features: ["Checked / unchecked label icons", "Loading state support", "RHF integration"],
    props: [
      { name: "id", type: "string", required: true, description: "Form state key." },
      { name: "label", type: "string", description: "Switch description." },
    ],
    code: `<SwitchField id="enableNotifications" label="Enable Email Notifications" />`,
  },

  "checkbox-field": {
    slug: "checkbox-field",
    title: "CheckboxField",
    category: "Standard Form Fields",
    summary: "Single checkbox or checkbox group for selecting one or multiple options.",
    description: "Standard checkbox control for consent terms or boolean flags.",
    features: ["RHF boolean binding", "Custom label content with links", "Disabled states"],
    props: [
      { name: "id", type: "string", required: true, description: "Form state key." },
      { name: "label", type: "React.ReactNode", description: "Label next to checkbox." },
    ],
    code: `<CheckboxField id="agreeToTerms" label="I agree to Terms & Conditions" />`,
  },

  "radio-field": {
    slug: "radio-field",
    title: "RadioField",
    category: "Standard Form Fields",
    summary: "Radio button group for mutually exclusive options.",
    description: "Displays radio choices horizontally or vertically, ensuring exactly one option is selected.",
    features: ["Horizontal or vertical layouts", "Button style or radio dot style", "RHF integration"],
    props: [
      { name: "id", type: "string", required: true, description: "Form state key." },
      { name: "options", type: "FieldOption[]", required: true, description: "Option items." },
    ],
    code: `<RadioField id="plan" label="Select Plan" options={[{ key: "free", value: "Free Tier" }, { key: "pro", value: "Pro Tier" }]} />`,
  },

  "slider-field": {
    slug: "slider-field",
    title: "SliderField",
    category: "Standard Form Fields",
    summary: "Interactive slider for picking numeric values or ranges along a track.",
    description: "Track slider with customizable marks, tooltips, and min/max boundaries.",
    features: ["Single point or range slider", "Custom mark points on track", "Tooltip value formatter"],
    props: [
      { name: "id", type: "string", required: true, description: "Form state key." },
      { name: "min", type: "number", default: "0", description: "Track minimum." },
      { name: "max", type: "number", default: "100", description: "Track maximum." },
    ],
    code: `<SliderField id="cpuThreshold" label="Alert CPU Threshold (%)" min={0} max={100} />`,
  },

  "rating-field": {
    slug: "rating-field",
    title: "RatingField",
    category: "Standard Form Fields",
    summary: "Star rating selector for reviews, scores, and customer feedback.",
    description: "Star rating widget with half-star precision and customizable icon tooltips.",
    features: ["Half-star rating precision", "Custom tooltips for each star", "RHF integration"],
    props: [
      { name: "id", type: "string", required: true, description: "Form state key." },
      { name: "count", type: "number", default: "5", description: "Number of stars." },
      { name: "allowHalf", type: "boolean", default: "false", description: "Allow half star selection." },
    ],
    code: `<RatingField id="serviceScore" label="Customer Rating" allowHalf />`,
  },

  "color-picker-field": {
    slug: "color-picker-field",
    title: "ColorPickerField",
    category: "Standard Form Fields",
    summary: "Hex/RGB color selection input with preset swatches.",
    description: "Interactive color picker returning hex color strings (e.g. '#2563eb') with preset color palette swatches.",
    features: ["Hex / RGB / HSB mode support", "Preset swatches palette", "RHF string binding"],
    props: [
      { name: "id", type: "string", required: true, description: "Form state key." },
      { name: "label", type: "string", description: "Field label." },
    ],
    code: `<ColorPickerField id="primaryColor" label="Brand Accent Color" />`,
  },

  "country-field": {
    slug: "country-field",
    title: "CountryField",
    category: "Standard Form Fields",
    summary: "Country selector with ISO country codes and flag emojis.",
    description: "Pre-populated dropdown containing 240+ world countries, complete with ISO-3166 codes and emoji flags.",
    features: ["240+ countries pre-loaded", "Searchable country names and dial codes", "Returns 2-letter ISO code"],
    props: [
      { name: "id", type: "string", required: true, description: "Form state key." },
      { name: "label", type: "string", description: "Field label." },
    ],
    code: `<CountryField id="countryCode" label="Billing Country" />`,
  },

  "phone-field": {
    slug: "phone-field",
    title: "PhoneField",
    category: "Standard Form Fields",
    summary: "International phone input with country dial code prefix selector.",
    description: "Combines a country calling code dropdown (e.g. +1, +44, +91) with a national number input and formatting.",
    features: ["International calling code dropdown", "Auto-formatting national number", "E.164 phone string output"],
    props: [
      { name: "id", type: "string", required: true, description: "Form state key." },
      { name: "label", type: "string", description: "Field label." },
    ],
    code: `<PhoneField id="mobile" label="Mobile Phone Number" />`,
  },

  "otp-field": {
    slug: "otp-field",
    title: "OtpField",
    category: "Standard Form Fields",
    summary: "Multi-digit One Time Password input with automatic focus hopping.",
    description: "Splits OTP codes into individual character boxes with auto-focus advance, backspace retraction, and paste support.",
    features: ["Configurable length (default: 6)", "Auto-advance on typing", "Paste entire OTP string support"],
    props: [
      { name: "id", type: "string", required: true, description: "Form state key." },
      { name: "length", type: "number", default: "6", description: "Number of OTP digits." },
    ],
    code: `<OtpField id="otpToken" label="Verification Code" length={6} />`,
  },

  "upload-field": {
    slug: "upload-field",
    title: "UploadField",
    category: "Standard Form Fields",
    badge: "S3 Ready Dropzone",
    summary: "Drag-and-drop file upload zone supporting S3 presigned URLs, size limits, and file types.",
    description: "UploadField offers an enterprise dropzone supporting single or multiple files, image previews, file extension filtering, and automatic S3 upload orchestration.",
    features: ["Drag and drop file upload zone", "Direct S3 presigned URL support", "Max file size and count validation", "Preview modal for uploaded images and PDFs"],
    props: [
      { name: "id", type: "string", required: true, description: "Form state key." },
      { name: "maxCount", type: "number", default: "1", description: "Maximum number of files allowed." },
      { name: "accept", type: "string", description: "Allowed file MIME types or extensions (e.g. '.pdf,image/*')." },
      { name: "uploadConfig", type: "UploadConfig", description: "Dropzone titles, button colors, and hints." },
    ],
    code: `<UploadField id="companyLogo" label="Company Logo" maxCount={1} accept="image/*" />`,
    schema: {
      success: true,
      data: {
        fileUrl: "https://s3.amazonaws.com/uploads/sample-logo.png",
        fileName: "sample-logo.png",
        fileSize: 248900,
      },
    },
  },

  "button-field": {
    slug: "button-field",
    title: "ButtonField",
    category: "UI Feedback",
    summary: "Stylized button with loading states, variants, and icon integration.",
    description: "Standardized button component wrapping Ant Design Button with consistent variants: primary, secondary, and danger.",
    features: ["Primary, secondary, danger variants", "Built-in loading spinner", "Icon prefix / suffix support"],
    props: [
      { name: "variant", type: '"primary" | "secondary" | "danger"', default: '"primary"', description: "Color theme." },
      { name: "loading", type: "boolean", default: "false", description: "Shows loading spinner." },
    ],
    code: `<ButtonField variant="primary" loading={isSubmitting}>Submit Changes</ButtonField>`,
  },

  "loading-spinner": {
    slug: "loading-spinner",
    title: "LoadingSpinner",
    category: "UI Feedback",
    summary: "Animated spinner indicator for loading and pending states.",
    description: "Provides consistent spinner animation for async operations and table placeholders.",
    features: ["Small, medium, large sizes", "Custom color tokens", "Accessible ARIA attributes"],
    props: [
      { name: "size", type: '"small" | "default" | "large"', default: '"default"', description: "Spinner dimension." },
      { name: "tip", type: "string", description: "Optional loading message." },
    ],
    code: `<LoadingSpinner size="large" tip="Loading audit log..." />`,
  },

  "error-api": {
    slug: "error-api",
    title: "ErrorApi",
    category: "UI Feedback",
    summary: "User-friendly error notification banner with retry callback.",
    description: "Displays actionable error alerts with message extraction, HTTP status codes, and an optional Retry button.",
    features: ["Extracts error message from Axios, Fetch, or Error objects", "Retry button callback", "Compact alert banner styling"],
    props: [
      { name: "error", type: "any", required: true, description: "Error object or string." },
      { name: "onRetry", type: "() => void", description: "Retry callback handler." },
    ],
    code: `<ErrorApi error={fetchError} onRetry={refetch} />`,
  },
};
