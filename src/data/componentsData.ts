import { PropItem } from "@/components/PropsTable";
import { CodeExampleItem } from "@/components/MultiCodeExamples";

export interface ComponentDoc {
  slug: string;
  title: string;
  category: "Core Dynamic Components" | "Standard Form Fields" | "UI Feedback" | "Advanced Modals & Data";
  badge?: string;
  summary: string;
  description: string;
  features: string[];
  props: PropItem[];
  code: string;
  examples: CodeExampleItem[];
  schema?: object | string;
  troubleshooting?: any[];
}

export const COMPONENTS_DATA: Record<string, ComponentDoc> = {
  "dynamic-table": {
    "slug": "dynamic-table",
    "title": "DynamicTable",
    "category": "Core Dynamic Components",
    "badge": "Flagship Data Grid",
    "summary": "High-performance enterprise data table with adaptive virtualization, composite cell renderers, and Zustand-backed filter synchronization.",
    "description": "DynamicTable is the core data presentation component of antd-dynamic-ui. Instead of declaring repetitive JSX Column tags, you supply a declarative JSON schema. DynamicTable natively supports 8 composite cell types (IMAGE, LINK, TEXT, STATUS, DYNAMIC_FORM, ACTION, MODAL, CUSTOM), adaptive virtualization threshold (>50 rows) for 60fps scrolling, server-side pagination (offset and cursor), and seamless integration with FilterDrawer, ColumnDrawer, and DownloadModal.",
    "features": [
      "Adaptive 60fps virtual scrolling for 100,000+ records with automatic DOM node recycling",
      "8 Discriminated Union Composite Cell Types: IMAGE, LINK, TEXT, STATUS, DYNAMIC_FORM, ACTION, MODAL, CUSTOM",
      "Dual Server-Side Pagination Models: Standard offset-limit and scalable cursor-based pagination",
      "Zero Layout Thrashing: requestAnimationFrame-throttled ResizeObserver with height memory",
      "Synchronized with useGridFilters for automated search, sorting, and multi-parameter filtering",
      "Built-in ColumnDrawer for drag-and-drop column reordering and visibility toggling",
      "Built-in DownloadModal with instant CSV and Excel XLSX export"
    ],
    "props": [
      {
        "name": "apiData",
        "type": "ApiDataType",
        "required": true,
        "description": "Remote endpoint configuration containing apiUrl, apiType ('get' | 'post'), default params, and body."
      },
      {
        "name": "filterKey",
        "type": "string",
        "required": true,
        "description": "Unique identifier connecting this table to Zustand filter state and DynamicHeader / FilterDrawer."
      },
      {
        "name": "paginationType",
        "type": "\"offset\" | \"cursor\"",
        "default": "\"offset\"",
        "description": "Controls whether pagination sends page/limit or nextCursor tokens."
      },
      {
        "name": "border",
        "type": "boolean",
        "default": "true",
        "description": "Toggles outer container border and subtle row divider lines."
      },
      {
        "name": "refreshTrigger",
        "type": "number",
        "default": "0",
        "description": "Incrementing numeric counter that forces the table to re-query the remote API immediately."
      },
      {
        "name": "onActionClick",
        "type": "(data: { actionKey: string; record: any }) => void",
        "description": "Callback triggered whenever an ACTION cell, row menu item, or button is clicked."
      },
      {
        "name": "className",
        "type": "string",
        "description": "Custom CSS class for the outermost table container."
      },
      {
        "name": "rowKey",
        "type": "string | ((record: any) => string)",
        "default": "\"id\"",
        "description": "Unique key field identifier for rows (defaults to 'id')."
      }
    ],
    "code": "import { DynamicTable } from \"antd-dynamic-ui\";\n\nexport default function UserList() {\n  return (\n    <DynamicTable\n      apiData={{\n        apiUrl: \"/api/v1/users\",\n        apiType: \"get\",\n        params: { status: \"active\" },\n      }}\n      filterKey=\"users_grid\"\n      border={true}\n    />\n  );\n}",
    "examples": [
      {
        "title": "Basic Remote API Grid",
        "description": "Quickstart configuration connecting DynamicTable to a paginated REST endpoint.",
        "language": "tsx",
        "filename": "DynamicTable.basic.tsx",
        "code": "import React from \"react\";\nimport { DynamicTable } from \"antd-dynamic-ui\";\n\nexport default function OrdersTable() {\n  return (\n    <div className=\"p-6\">\n      <h2 className=\"text-xl font-bold mb-4\">Customer Orders</h2>\n      <DynamicTable\n        apiData={{\n          apiUrl: \"/api/v1/orders\",\n          apiType: \"get\",\n          params: { department: \"logistics\" },\n        }}\n        filterKey=\"orders_grid\"\n        border={true}\n        onActionClick={(action) => {\n          console.log(\"User clicked row action:\", action);\n        }}\n      />\n    </div>\n  );\n}"
      },
      {
        "title": "Complete Props & Composite Cells",
        "description": "Enterprise setup utilizing cursor pagination, refresh counter, action event delegation, and all props.",
        "language": "tsx",
        "filename": "DynamicTable.complete.tsx",
        "code": "import React, { useState } from \"react\";\nimport { DynamicTable, DynamicHeader } from \"antd-dynamic-ui\";\nimport { message, Modal } from \"antd\";\n\nexport default function EnterpriseUsersGrid() {\n  const [refreshCount, setRefreshCount] = useState(0);\n\n  const handleActionClick = (actionData: any) => {\n    const { actionKey, record } = actionData;\n    if (actionKey === \"DELETE_USER\") {\n      Modal.confirm({\n        title: \"Delete User\",\n        content: `Are you sure you want to delete ${record?.name}?`,\n        onOk: async () => {\n          message.success(\"User deleted successfully\");\n          setRefreshCount((prev) => prev + 1); // Triggers table reload\n        },\n      });\n    } else if (actionKey === \"VIEW_PROFILE\") {\n      window.location.href = `/users/${record?.id}`;\n    }\n  };\n\n  return (\n    <div className=\"space-y-4\">\n      {/* DynamicHeader automatically syncs search & refresh with filterKey */}\n      <DynamicHeader\n        filterKey=\"enterprise_users_grid\"\n        title=\"Enterprise Accounts\"\n        subTitles={[\"System Administration\", \"Active Tenants\"]}\n        searchPlaceholder=\"Search accounts by name, email, or domain...\"\n        onRefresh={() => setRefreshCount((c) => c + 1)}\n      />\n\n      <DynamicTable\n        apiData={{\n          apiUrl: \"/api/v2/tenants/directory\",\n          apiType: \"post\",\n          body: { region: \"us-east-1\", activeOnly: true },\n        }}\n        filterKey=\"enterprise_users_grid\"\n        paginationType=\"cursor\"\n        border={true}\n        refreshTrigger={refreshCount}\n        onActionClick={handleActionClick}\n        className=\"shadow-sm rounded-xl\"\n      />\n    </div>\n  );\n}"
      },
      {
        "title": "StaticTable with In-Memory Mock Data",
        "description": "Using StaticTable for zero-network testing, offline storybooks, and local mock datasets.",
        "language": "tsx",
        "filename": "StaticTable.offline.tsx",
        "code": "import React from \"react\";\nimport { StaticTable, TableColumnType, TableDataType } from \"antd-dynamic-ui\";\n\nconst MOCK_COLUMNS: TableColumnType[] = [\n  { id: \"id\", title: \"ID\", width: 80, sortable: true },\n  { id: \"user\", title: \"User Profile\", minWidth: 200 },\n  { id: \"role\", title: \"Access Role\", width: 140 },\n  { id: \"status\", title: \"Account Status\", width: 130 },\n];\n\nconst MOCK_DATA: TableDataType = {\n  columns: MOCK_COLUMNS,\n  rows: [\n    {\n      id: [{ type: \"TEXT\", title: \"101\", isBold: true }],\n      user: [\n        { type: \"IMAGE\", src: \"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100\", width: 36, height: 36, shape: \"circle\", isPreview: true },\n        { type: \"TEXT\", title: \"Alexander Wright\", subTitle: \"alex@corp.io\", isBold: true },\n      ],\n      role: [{ type: \"STATUS\", title: \"Superadmin\", bgColor: \"#eff6ff\", textColor: \"#1d4ed8\" }],\n      status: [{ type: \"STATUS\", title: \"Active\", bgColor: \"#ecfdf5\", textColor: \"#047857\" }],\n    },\n  ],\n  features: { search: true, sort: true, export: true, refresh: true, columnToggle: true },\n  isPaginated: true,\n  pageNumber: 1,\n  pageSize: 10,\n  totalPages: 1,\n  totalRows: 1,\n  count: 1,\n};\n\nexport default function OfflineTableDemo() {\n  return (\n    <StaticTable\n      staticData={MOCK_DATA}\n      border={true}\n      pagination={true}\n      filterKey=\"offline_demo\"\n      onActionClick={(action) => alert(JSON.stringify(action))}\n    />\n  );\n}"
      }
    ],
    "schema": {
      "success": true,
      "message": "Data retrieved successfully",
      "data": {
        "columns": [
          {
            "id": "id",
            "title": "ID",
            "width": 80,
            "sortable": true
          },
          {
            "id": "user",
            "title": "User Profile",
            "minWidth": 200
          },
          {
            "id": "role",
            "title": "Role",
            "width": 140
          },
          {
            "id": "status",
            "title": "Status",
            "width": 130
          }
        ],
        "rows": [
          {
            "id": [
              {
                "type": "TEXT",
                "title": "101",
                "isBold": true
              }
            ],
            "user": [
              {
                "type": "TEXT",
                "title": "Alexander Wright",
                "subTitle": "alex@corp.io"
              }
            ],
            "role": [
              {
                "type": "STATUS",
                "title": "Superadmin",
                "bgColor": "#eff6ff",
                "textColor": "#1d4ed8"
              }
            ],
            "status": [
              {
                "type": "STATUS",
                "title": "Active",
                "bgColor": "#ecfdf5",
                "textColor": "#047857"
              }
            ]
          }
        ],
        "features": {
          "search": true,
          "sort": true,
          "export": true,
          "refresh": true,
          "columnToggle": true
        },
        "isPaginated": true,
        "pageNumber": 1,
        "pageSize": 10,
        "totalPages": 1,
        "totalRows": 1,
        "count": 1
      }
    },
    "troubleshooting": [
      {
        "issue": "Table shows 'No Data' even when HTTP API returns status 200",
        "cause": "Backend returned a raw array or wrapped payload under { items } instead of the required { success: true, data: { columns, rows, totalRows } } envelope.",
        "solution": "Transform the response on your API gateway or mock server to return the standard TableResponseType envelope.",
        "incorrectSnippet": "// \u274c INCORRECT: Returning flat array directly\nres.json([ { id: 1, name: \"Alice\" } ]);",
        "correctSnippet": "// \u2705 CORRECT: Standard TableResponseType structure\nres.json({\n  success: true,\n  data: {\n    columns: [ { id: \"id\", title: \"ID\" }, { id: \"name\", title: \"Name\" } ],\n    rows: [ { id: [{ type: \"TEXT\", title: \"1\" }], name: [{ type: \"TEXT\", title: \"Alice\" }] } ],\n    totalRows: 1,\n    pageNumber: 1,\n    pageSize: 10,\n    totalPages: 1\n  }\n});"
      }
    ]
  },
  "dynamic-form": {
    "slug": "dynamic-form",
    "title": "DynamicForm",
    "category": "Core Dynamic Components",
    "badge": "Automated Zod Engine",
    "summary": "Schema-driven form engine with automated Zod validation compilation, multi-column 24-grid matrix layout, and conditional field rendering.",
    "description": "DynamicForm compiles a declarative 2D matrix of field configurations (rows: FieldConfig[][]) into a fully validated React Hook Form. It dynamically generates an exact Zod validation schema from field rules (required, min, max, regex, file constraints), auto-populates initial values, and manages submission lifecycles with built-in or custom submit footers.",
    "features": [
      "Automated Zod Schema Generation: Converts backend validation rules into compile-time Zod schemas",
      "2D Matrix Layout: Organize inputs into flexible responsive rows with custom column span (span: 12 = 50% width)",
      "Conditional Visibility: Automatically shows or hides fields based on sibling values (equals, contains, gt, lt)",
      "React Hook Form Integration: Full performance benefits with uncontrolled inputs and mode: 'onBlur'",
      "Dynamic API Fetching: Pass apiUrl to fetch form schema on-the-fly from your backend microservices",
      "Custom Footer Renderer: renderFooter slot provides direct access to RHF methods (reset, getValues, setValue)"
    ],
    "props": [
      {
        "name": "schema",
        "type": "FormSchema",
        "description": "Form layout configuration containing rows: FieldConfig[][]. Optional if apiUrl is provided."
      },
      {
        "name": "apiUrl",
        "type": "string",
        "description": "Remote endpoint to fetch form schema dynamically from the server."
      },
      {
        "name": "method",
        "type": "\"GET\" | \"POST\"",
        "default": "\"GET\"",
        "description": "HTTP method used when querying apiUrl."
      },
      {
        "name": "initialValues",
        "type": "Record<string, any>",
        "description": "Default values to populate or override schema defaults."
      },
      {
        "name": "onSubmit",
        "type": "(data: any) => void | Promise<void>",
        "required": true,
        "description": "Callback invoked with validated form data upon successful submission."
      },
      {
        "name": "onError",
        "type": "(errors: Record<string, any>) => void",
        "description": "Callback triggered when form validation fails."
      },
      {
        "name": "submitText",
        "type": "string",
        "default": "\"Submit\"",
        "description": "Label displayed on the primary submit button."
      },
      {
        "name": "isSubmitting",
        "type": "boolean",
        "default": "false",
        "description": "Toggles loading spinner state on the submit button."
      },
      {
        "name": "showSubmitButton",
        "type": "boolean",
        "default": "true",
        "description": "Whether to render the default submit button."
      },
      {
        "name": "className",
        "type": "string",
        "default": "\"w-full p-4 flex flex-col gap-4\"",
        "description": "Custom class for the form wrapper container."
      },
      {
        "name": "renderFooter",
        "type": "(methods: UseFormReturn<any>) => React.ReactNode",
        "description": "Custom footer slot allowing complete control over buttons, cancel links, and reset actions."
      }
    ],
    "code": "import { DynamicForm, FormSchema } from \"antd-dynamic-ui\";\n\nconst schema: FormSchema = {\n  rows: [\n    [\n      { id: \"name\", type: \"text\", label: \"Full Name\", required: true, span: 12 },\n      { id: \"email\", type: \"email\", label: \"Work Email\", required: true, span: 12 },\n    ]\n  ]\n};\n\nexport default function Registration() {\n  return <DynamicForm schema={schema} onSubmit={(data) => console.log(data)} />;\n}",
    "examples": [
      {
        "title": "Basic Two-Column Registration Form",
        "description": "Standard two-column form with automatic Zod validation and submit callback.",
        "language": "tsx",
        "filename": "DynamicForm.basic.tsx",
        "code": "import React from \"react\";\nimport { DynamicForm, FormSchema } from \"antd-dynamic-ui\";\nimport { message } from \"antd\";\n\nconst registrationSchema: FormSchema = {\n  rows: [\n    [\n      {\n        id: \"fullName\",\n        type: \"text\",\n        label: \"Full Name\",\n        placeholder: \"e.g. Sarah Connor\",\n        required: true,\n        span: 12,\n        tooltip: \"Your legal full name as shown on passport\",\n      },\n      {\n        id: \"email\",\n        type: \"email\",\n        label: \"Email Address\",\n        placeholder: \"sarah@skynet.com\",\n        required: true,\n        span: 12,\n        validation: { required: true, pattern: \"^\\\\S+@\\\\S+\\\\.\\\\S+$\" },\n      },\n    ],\n    [\n      {\n        id: \"accountType\",\n        type: \"select\",\n        label: \"Account Plan\",\n        defaultValue: \"pro\",\n        options: [\n          { key: \"free\", value: \"Starter Plan (Free)\" },\n          { key: \"pro\", value: \"Professional ($29/mo)\" },\n          { key: \"enterprise\", value: \"Enterprise (Custom)\" },\n        ],\n        span: 24,\n      },\n    ],\n  ],\n};\n\nexport default function QuickRegisterForm() {\n  const handleSubmit = async (formData: any) => {\n    message.loading({ content: \"Registering account...\", key: \"reg\" });\n    await new Promise((resolve) => setTimeout(resolve, 800));\n    message.success({ content: `Welcome, ${formData.fullName}!`, key: \"reg\" });\n  };\n\n  return (\n    <div className=\"max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-sm border border-[#ede5d8]\">\n      <h2 className=\"text-xl font-bold mb-4\">Create Your Account</h2>\n      <DynamicForm\n        schema={registrationSchema}\n        onSubmit={handleSubmit}\n        submitText=\"Create Account\"\n      />\n    </div>\n  );\n}"
      },
      {
        "title": "Complete Props, Conditional Logic & Custom Footer",
        "description": "Enterprise checkout form with conditional fields, custom footer, initial values, and error listeners.",
        "language": "tsx",
        "filename": "DynamicForm.complete.tsx",
        "code": "import React, { useState } from \"react\";\nimport { DynamicForm, FormSchema, ButtonField } from \"antd-dynamic-ui\";\nimport { Alert, message } from \"antd\";\n\nconst enterpriseSchema: FormSchema = {\n  rows: [\n    [\n      {\n        id: \"organization\",\n        type: \"text\",\n        label: \"Company / Organization\",\n        required: true,\n        span: 12,\n      },\n      {\n        id: \"hasVatNumber\",\n        type: \"toggle\",\n        label: \"Do you have an EU VAT Number?\",\n        defaultValue: false,\n        span: 12,\n      },\n    ],\n    // Conditional row: Only appears if hasVatNumber === true\n    [\n      {\n        id: \"vatId\",\n        type: \"text\",\n        label: \"EU VAT ID\",\n        placeholder: \"e.g. DE123456789\",\n        span: 24,\n        conditions: [\n          { field: \"hasVatNumber\", operator: \"equals\", value: true },\n        ],\n        validation: { minLength: 8, maxLength: 14 },\n      },\n    ],\n    [\n      {\n        id: \"securityClearance\",\n        type: \"slider\",\n        label: \"Minimum Team Size Required\",\n        defaultValue: 25,\n        span: 12,\n      },\n      {\n        id: \"primaryCountry\",\n        type: \"country\",\n        label: \"Headquarters Region\",\n        defaultValue: \"DE\",\n        span: 12,\n      },\n    ],\n  ],\n};\n\nexport default function AdvancedOrganizationForm() {\n  const [isSubmitting, setIsSubmitting] = useState(false);\n  const [lastError, setLastError] = useState<string | null>(null);\n\n  const onSubmit = async (values: any) => {\n    setIsSubmitting(true);\n    setLastError(null);\n    try {\n      console.log(\"Validated Payload:\", values);\n      message.success(\"Organization profile saved!\");\n    } catch (err: any) {\n      setLastError(err.message);\n    } finally {\n      setIsSubmitting(false);\n    }\n  };\n\n  return (\n    <div className=\"space-y-4 max-w-3xl mx-auto p-6 bg-white border border-[#ede5d8] rounded-2xl shadow-sm\">\n      {lastError && <Alert type=\"error\" message={lastError} showIcon />}\n\n      <DynamicForm\n        schema={enterpriseSchema}\n        initialValues={{ organization: \"DeepMind Tech Ltd\" }}\n        onSubmit={onSubmit}\n        onError={(errors) => console.warn(\"Validation Errors:\", errors)}\n        isSubmitting={isSubmitting}\n        showSubmitButton={false} // Using custom footer instead\n        renderFooter={(methods) => (\n          <div className=\"flex items-center justify-between pt-4 border-t border-[#ede5d8]\">\n            <button\n              type=\"button\"\n              onClick={() => methods.reset()}\n              className=\"px-4 py-2 text-xs font-semibold text-zinc-600 hover:text-zinc-900\"\n            >\n              Reset to Defaults\n            </button>\n            <div className=\"flex gap-2\">\n              <ButtonField\n                type=\"default\"\n                onClick={() => console.log(\"Draft:\", methods.getValues())}\n              >\n                Save as Draft\n              </ButtonField>\n              <ButtonField\n                type=\"primary\"\n                loading={isSubmitting}\n                onClick={methods.handleSubmit(onSubmit)}\n              >\n                Publish Organization\n              </ButtonField>\n            </div>\n          </div>\n        )}\n      />\n    </div>\n  );\n}"
      },
      {
        "title": "Remote Schema from API Endpoint",
        "description": "Loading form structure dynamically from a microservice endpoint with zero client schema code.",
        "language": "tsx",
        "filename": "DynamicForm.remoteApi.tsx",
        "code": "import React from \"react\";\nimport { DynamicForm } from \"antd-dynamic-ui\";\nimport { message } from \"antd\";\n\nexport default function MicroserviceDynamicForm() {\n  return (\n    <div className=\"p-6\">\n      <h3 className=\"text-lg font-bold mb-3\">Dynamically Injected Form</h3>\n      <DynamicForm\n        apiUrl=\"/api/v1/schemas/vendor-onboarding\"\n        method=\"GET\"\n        onSubmit={async (data) => {\n          message.success(\"Vendor submitted successfully!\");\n          console.log(\"Payload:\", data);\n        }}\n        submitText=\"Complete Onboarding\"\n      />\n    </div>\n  );\n}"
      }
    ],
    "schema": {
      "rows": [
        [
          {
            "id": "username",
            "type": "text",
            "label": "Username",
            "required": true,
            "span": 12
          },
          {
            "id": "role",
            "type": "select",
            "label": "Role",
            "options": [
              {
                "key": "admin",
                "value": "Admin"
              }
            ],
            "span": 12
          }
        ]
      ]
    },
    "troubleshooting": [
      {
        "issue": "Form submission fails silently without error banners",
        "cause": "A field marked required or with a minLength rule is hidden or failing validation onBlur without user interaction.",
        "solution": "Pass an onError callback to DynamicForm: onError={(errors) => console.log(errors)}. This lets you inspect which field is blocking form validation.",
        "incorrectSnippet": "// \u274c Missing error inspection\n<DynamicForm schema={schema} onSubmit={handleSubmit} />",
        "correctSnippet": "// \u2705 Added onError callback to debug invalid fields\n<DynamicForm\n  schema={schema}\n  onSubmit={handleSubmit}\n  onError={(errors) => {\n    message.error(`Please fix validation errors in: ${Object.keys(errors).join(\", \")}`);\n  }}\n/>"
      }
    ]
  },
  "dynamic-modal": {
    "slug": "dynamic-modal",
    "title": "DynamicModal",
    "category": "Core Dynamic Components",
    "badge": "ReactModal Enterprise Wrapper",
    "summary": "Accessible, portal-based modal dialog supporting custom header actions, sticky footers, animated transitions, and embedded DynamicForms.",
    "description": "DynamicModal wraps ReactModal with Ant Design theme tokens, smooth enter/leave fade animations, overlay dismiss controls, header action slots, and accessible ARIA attributes. Designed to host complex forms, audit logs, and detail views without clipping or z-index collisions.",
    "features": [
      "Built-in smooth CSS fade-in and scale animations with closeTimeoutMS={200}",
      "Accessible ARIA App binding for zero Next.js hydration issues",
      "Header action slot for inline buttons, badges, or helper links next to the close button",
      "Custom footer slot with sticky positioning and responsive padding",
      "Configurable close mode: 'icon' (cross icon), 'text' ('Cancel'), or hidden close button",
      "Customizable zIndex and bodyClassName for nested modals and overflow scrolling"
    ],
    "props": [
      {
        "name": "isOpen",
        "type": "boolean",
        "required": true,
        "description": "Controls modal visibility state."
      },
      {
        "name": "onClose",
        "type": "() => void",
        "required": true,
        "description": "Callback triggered when clicking overlay, close icon, or pressing Escape key."
      },
      {
        "name": "title",
        "type": "React.ReactNode",
        "description": "Header title text or custom JSX node."
      },
      {
        "name": "headerAction",
        "type": "React.ReactNode",
        "description": "Optional JSX rendered on the right side of the header next to the close icon."
      },
      {
        "name": "footer",
        "type": "React.ReactNode",
        "description": "Modal footer content (e.g. Cancel and Save buttons)."
      },
      {
        "name": "close",
        "type": "\"icon\" | \"text\"",
        "default": "\"icon\"",
        "description": "Close button appearance: SVG cross icon or text link."
      },
      {
        "name": "hideCloseButton",
        "type": "boolean",
        "default": "false",
        "description": "Hides the header close button entirely."
      },
      {
        "name": "bodyClassName",
        "type": "string",
        "description": "Custom CSS class applied to the scrollable modal body area."
      },
      {
        "name": "headerClassName",
        "type": "string",
        "description": "Custom CSS class applied to the modal header container."
      },
      {
        "name": "zIndex",
        "type": "number",
        "default": "50",
        "description": "Custom stacking z-index for nested overlays."
      }
    ],
    "code": "import { useState } from \"react\";\nimport { DynamicModal, ButtonField } from \"antd-dynamic-ui\";\n\nexport default function ModalDemo() {\n  const [open, setOpen] = useState(false);\n  return (\n    <>\n      <ButtonField type=\"primary\" onClick={() => setOpen(true)}>Open Modal</ButtonField>\n      <DynamicModal isOpen={open} onClose={() => setOpen(false)} title=\"System Notification\">\n        <p>Your session will expire in 10 minutes.</p>\n      </DynamicModal>\n    </>\n  );\n}",
    "examples": [
      {
        "title": "Basic Controlled Modal",
        "description": "Standard modal dialog with title and default close icon.",
        "language": "tsx",
        "filename": "DynamicModal.basic.tsx",
        "code": "import React, { useState } from \"react\";\nimport { DynamicModal, ButtonField } from \"antd-dynamic-ui\";\n\nexport default function BasicModalExample() {\n  const [isOpen, setIsOpen] = useState(false);\n\n  return (\n    <div className=\"p-4\">\n      <ButtonField type=\"primary\" onClick={() => setIsOpen(true)}>\n        Open Confirmation Modal\n      </ButtonField>\n\n      <DynamicModal\n        isOpen={isOpen}\n        onClose={() => setIsOpen(false)}\n        title=\"Notice\"\n      >\n        <div className=\"py-4 text-sm text-[#5c4738]\">\n          This action will export user profiles to the designated cold storage bucket.\n        </div>\n      </DynamicModal>\n    </div>\n  );\n}"
      },
      {
        "title": "Complete Props with Header Action & Sticky Footer",
        "description": "Advanced modal with header action link, sticky footer buttons, body styling, and custom z-index.",
        "language": "tsx",
        "filename": "DynamicModal.complete.tsx",
        "code": "import React, { useState } from \"react\";\nimport { DynamicModal, ButtonField } from \"antd-dynamic-ui\";\nimport { Tag } from \"antd\";\nimport { ExternalLink } from \"lucide-react\";\n\nexport default function CompleteModalExample() {\n  const [isOpen, setIsOpen] = useState(false);\n  const [isSaving, setIsSaving] = useState(false);\n\n  const handleSave = async () => {\n    setIsSaving(true);\n    await new Promise((r) => setTimeout(r, 1000));\n    setIsSaving(false);\n    setIsOpen(false);\n  };\n\n  return (\n    <div className=\"p-4\">\n      <ButtonField type=\"primary\" onClick={() => setIsOpen(true)}>\n        Inspect Security Permissions\n      </ButtonField>\n\n      <DynamicModal\n        isOpen={isOpen}\n        onClose={() => setIsOpen(false)}\n        title={\n          <div className=\"flex items-center gap-2\">\n            <span>Security Policy #SEC-9021</span>\n            <Tag color=\"gold\">Audited</Tag>\n          </div>\n        }\n        headerAction={\n          <a\n            href=\"https://docs.enterprise.io/security\"\n            target=\"_blank\"\n            rel=\"noreferrer\"\n            className=\"flex items-center gap-1 text-xs text-blue-600 hover:underline\"\n          >\n            <span>Policy Specs</span>\n            <ExternalLink size={12} />\n          </a>\n        }\n        footer={\n          <div className=\"flex justify-end gap-2 w-full\">\n            <ButtonField type=\"default\" onClick={() => setIsOpen(false)}>\n              Cancel\n            </ButtonField>\n            <ButtonField type=\"primary\" loading={isSaving} onClick={handleSave}>\n              Apply Security Rules\n            </ButtonField>\n          </div>\n        }\n        close=\"icon\"\n        zIndex={100}\n        bodyClassName=\"max-h-[60vh] overflow-y-auto space-y-3 p-6\"\n      >\n        <p className=\"text-sm text-[#5c4738]\">\n          Enforce multi-factor authentication (MFA) and biometric passkeys for all\n          administrative accounts in the engineering organization.\n        </p>\n      </DynamicModal>\n    </div>\n  );\n}"
      },
      {
        "title": "Modal Hosting an Embedded DynamicForm",
        "description": "DynamicModal embedding a dynamic form that automatically validates and closes upon submission.",
        "language": "tsx",
        "filename": "DynamicModal.withForm.tsx",
        "code": "import React, { useState } from \"react\";\nimport { DynamicModal, DynamicForm, FormSchema, ButtonField } from \"antd-dynamic-ui\";\nimport { message } from \"antd\";\n\nconst editUserSchema: FormSchema = {\n  rows: [\n    [\n      { id: \"displayName\", type: \"text\", label: \"Display Name\", required: true, span: 12 },\n      { id: \"department\", type: \"select\", label: \"Department\", options: [{ key: \"eng\", value: \"Engineering\" }, { key: \"sales\", value: \"Sales\" }], span: 12 },\n    ]\n  ]\n};\n\nexport default function ModalWithDynamicForm() {\n  const [isOpen, setIsOpen] = useState(false);\n\n  return (\n    <div className=\"p-4\">\n      <ButtonField type=\"primary\" onClick={() => setIsOpen(true)}>\n        Edit User Profile\n      </ButtonField>\n\n      <DynamicModal\n        isOpen={isOpen}\n        onClose={() => setIsOpen(false)}\n        title=\"Edit User Profile\"\n      >\n        <DynamicForm\n          schema={editUserSchema}\n          initialValues={{ displayName: \"Grace Hopper\", department: \"eng\" }}\n          onSubmit={async (data) => {\n            message.success(\"Profile updated successfully!\");\n            console.log(\"Updated data:\", data);\n            setIsOpen(false);\n          }}\n          submitText=\"Update Profile\"\n        />\n      </DynamicModal>\n    </div>\n  );\n}"
      }
    ],
    "troubleshooting": [
      {
        "issue": "Modal doesn't close when pressing Escape or clicking outside",
        "cause": "The onClose callback was omitted or did not set the controlling isOpen state to false.",
        "solution": "Ensure onClose updates the isOpen state: onClose={() => setIsOpen(false)}.",
        "incorrectSnippet": "// \u274c Missing state update in onClose\n<DynamicModal isOpen={isOpen} onClose={() => console.log(\"closed\")} />",
        "correctSnippet": "// \u2705 Correctly toggles boolean state\n<DynamicModal isOpen={isOpen} onClose={() => setIsOpen(false)} />"
      }
    ]
  },
  "dynamic-drawer": {
    "slug": "dynamic-drawer",
    "title": "DynamicDrawer",
    "category": "Core Dynamic Components",
    "badge": "Ant Design Drawer Accelerator",
    "summary": "Full-height slide-out drawer supporting multi-directional placement, custom header extra badges, and sticky footers.",
    "description": "DynamicDrawer provides an ergonomic slide-out sheet for secondary inspection workflows, side-by-side editing, filter sidebars, and entity audit timelines. Supports full placement control (right, left, top, bottom), responsive width calculations, and custom header actions.",
    "features": [
      "Placement flexibility: 'right' (default), 'left', 'top', or 'bottom'",
      "Responsive widths: accepts CSS units ('80vw', '600px', 720)",
      "ExtraTitleChild slot for tags, status indicators, and secondary actions directly in the title bar",
      "Sticky footer slot with separate footerClassName styling",
      "Seamless integration with Ant Design token system and dark mode algorithms"
    ],
    "props": [
      {
        "name": "isOpen",
        "type": "boolean",
        "required": true,
        "description": "Whether the drawer panel is open."
      },
      {
        "name": "onClose",
        "type": "() => void",
        "required": true,
        "description": "Callback triggered when clicking backdrop mask or close icon."
      },
      {
        "name": "title",
        "type": "React.ReactNode",
        "description": "Title rendered at the top of the drawer."
      },
      {
        "name": "ExtraTitleChild",
        "type": "React.ReactNode",
        "description": "Additional element rendered adjacent to the title."
      },
      {
        "name": "footer",
        "type": "React.ReactNode",
        "description": "Sticky bottom footer for action buttons."
      },
      {
        "name": "placement",
        "type": "\"right\" | \"left\" | \"top\" | \"bottom\"",
        "default": "\"right\"",
        "description": "Direction from which drawer slides out."
      },
      {
        "name": "width",
        "type": "string | number",
        "default": "\"80vw\"",
        "description": "Custom width of the drawer sheet."
      },
      {
        "name": "bodyClassName",
        "type": "string",
        "description": "Custom CSS class for drawer body contents."
      },
      {
        "name": "headerClassName",
        "type": "string",
        "description": "Custom CSS class for header bar."
      },
      {
        "name": "footerClassName",
        "type": "string",
        "description": "Custom CSS class for footer bar."
      }
    ],
    "code": "import { useState } from \"react\";\nimport { DynamicDrawer, ButtonField } from \"antd-dynamic-ui\";\n\nexport default function DrawerDemo() {\n  const [open, setOpen] = useState(false);\n  return (\n    <>\n      <ButtonField onClick={() => setOpen(true)}>Open Drawer</ButtonField>\n      <DynamicDrawer isOpen={open} onClose={() => setOpen(false)} title=\"Audit Details\" width=\"500px\">\n        <p>Drawer Content...</p>\n      </DynamicDrawer>\n    </>\n  );\n}",
    "examples": [
      {
        "title": "Basic Right-Side Drawer",
        "description": "Slide-out panel for record inspection and logs.",
        "language": "tsx",
        "filename": "DynamicDrawer.basic.tsx",
        "code": "import React, { useState } from \"react\";\nimport { DynamicDrawer, ButtonField } from \"antd-dynamic-ui\";\n\nexport default function BasicDrawerDemo() {\n  const [isOpen, setIsOpen] = useState(false);\n\n  return (\n    <div className=\"p-4\">\n      <ButtonField type=\"primary\" onClick={() => setIsOpen(true)}>\n        Open Audit Drawer\n      </ButtonField>\n\n      <DynamicDrawer\n        isOpen={isOpen}\n        onClose={() => setIsOpen(false)}\n        title=\"Audit Logs\"\n        width=\"450px\"\n      >\n        <p className=\"text-sm text-zinc-600\">Event traces for this tenant account...</p>\n      </DynamicDrawer>\n    </div>\n  );\n}"
      },
      {
        "title": "Complete Props with Extra Title & Custom Placement",
        "description": "Drawer featuring extra title badge, custom width, custom placement, and sticky footer.",
        "language": "tsx",
        "filename": "DynamicDrawer.complete.tsx",
        "code": "import React, { useState } from \"react\";\nimport { DynamicDrawer, ButtonField } from \"antd-dynamic-ui\";\nimport { Tag } from \"antd\";\n\nexport default function CompleteDrawerDemo() {\n  const [isOpen, setIsOpen] = useState(false);\n\n  return (\n    <div className=\"p-4\">\n      <ButtonField onClick={() => setIsOpen(true)}>\n        Inspect Microservice Config\n      </ButtonField>\n\n      <DynamicDrawer\n        isOpen={isOpen}\n        onClose={() => setIsOpen(false)}\n        title=\"Service Mesh Config\"\n        ExtraTitleChild={<Tag color=\"green\">v2.4.1 Active</Tag>}\n        placement=\"right\"\n        width=\"650px\"\n        footer={\n          <div className=\"flex justify-between items-center w-full\">\n            <span className=\"text-xs text-zinc-500\">Last deployed 2 hours ago</span>\n            <div className=\"flex gap-2\">\n              <ButtonField onClick={() => setIsOpen(false)}>Close</ButtonField>\n              <ButtonField type=\"primary\">Rollback Config</ButtonField>\n            </div>\n          </div>\n        }\n      >\n        <div className=\"space-y-4\">\n          <h4 className=\"font-semibold text-sm\">Cluster Endpoint:</h4>\n          <code className=\"p-2 bg-zinc-100 rounded text-xs block\">https://cluster-us-east-2.internal.net</code>\n        </div>\n      </DynamicDrawer>\n    </div>\n  );\n}"
      }
    ]
  },
  "dynamic-card": {
    "slug": "dynamic-card",
    "title": "DynamicCard",
    "category": "Core Dynamic Components",
    "badge": "Grid Presentation",
    "summary": "Remote card grid engine with automated pagination, responsive multi-column layouts, and filter synchronization.",
    "description": "DynamicCard fetches card datasets from a remote endpoint and renders them in responsive CSS grid arrangements. Each card displays key/value data items with automated loading skeletons and pagination controls.",
    "features": [
      "Automated API fetching with CardSkeleton loading state",
      "Responsive grid configuration via gridClassName",
      "Synchronized with useGridFilters for search and filtering",
      "Configurable pageSize with server-side pagination controls"
    ],
    "props": [
      {
        "name": "apiData",
        "type": "ApiDataType",
        "required": true,
        "description": "Remote endpoint configuration containing apiUrl and apiType."
      },
      {
        "name": "filterKey",
        "type": "string",
        "required": true,
        "description": "Unique filter key for grid filter synchronization."
      },
      {
        "name": "refreshTrigger",
        "type": "number",
        "default": "0",
        "description": "Increment to trigger immediate data re-fetch."
      },
      {
        "name": "pageSize",
        "type": "number",
        "default": "12",
        "description": "Number of cards displayed per page."
      },
      {
        "name": "className",
        "type": "string",
        "description": "Wrapper container class name."
      },
      {
        "name": "gridClassName",
        "type": "string",
        "default": "\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4\"",
        "description": "CSS Grid class name controlling column responsive breakpoints."
      }
    ],
    "code": "import { DynamicCard } from \"antd-dynamic-ui\";\n\nexport default function ProductCards() {\n  return (\n    <DynamicCard\n      apiData={{ apiUrl: \"/api/v1/products\", apiType: \"get\" }}\n      filterKey=\"products_grid\"\n      pageSize={8}\n    />\n  );\n}",
    "examples": [
      {
        "title": "Basic Product Card Grid",
        "description": "Remote cards layout fetching item specifications from an API.",
        "language": "tsx",
        "filename": "DynamicCard.basic.tsx",
        "code": "import React from \"react\";\nimport { DynamicCard } from \"antd-dynamic-ui\";\n\nexport default function BasicCards() {\n  return (\n    <div className=\"p-6\">\n      <h2 className=\"text-xl font-bold mb-4\">Inventory Products</h2>\n      <DynamicCard\n        apiData={{ apiUrl: \"/api/v1/inventory\", apiType: \"get\" }}\n        filterKey=\"inventory_cards\"\n        pageSize={6}\n      />\n    </div>\n  );\n}"
      },
      {
        "title": "Custom Responsive Grid Breakpoints",
        "description": "Card grid with 4-column layout on wide screens and refresh counter.",
        "language": "tsx",
        "filename": "DynamicCard.complete.tsx",
        "code": "import React, { useState } from \"react\";\nimport { DynamicCard, DynamicHeader } from \"antd-dynamic-ui\";\n\nexport default function CompleteCardGrid() {\n  const [refresh, setRefresh] = useState(0);\n\n  return (\n    <div className=\"space-y-4 p-6\">\n      <DynamicHeader\n        filterKey=\"device_fleet_cards\"\n        title=\"IoT Device Fleet\"\n        onRefresh={() => setRefresh((c) => c + 1)}\n      />\n      <DynamicCard\n        apiData={{ apiUrl: \"/api/v1/devices\", apiType: \"get\" }}\n        filterKey=\"device_fleet_cards\"\n        gridClassName=\"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6\"\n        pageSize={12}\n        refreshTrigger={refresh}\n      />\n    </div>\n  );\n}"
      }
    ],
    "schema": {
      "success": true,
      "message": "Fetched cards",
      "data": {
        "rows": [
          {
            "title": "Server Node US-East-1",
            "info": [
              {
                "key": "CPU Load",
                "value": "42%"
              },
              {
                "key": "Memory",
                "value": "16 GB / 32 GB"
              },
              {
                "key": "Status",
                "value": "Healthy"
              }
            ]
          }
        ],
        "totalRows": 1
      }
    }
  },
  "dynamic-header": {
    "slug": "dynamic-header",
    "title": "DynamicHeader",
    "category": "Core Dynamic Components",
    "badge": "Filter Orchestrator",
    "summary": "Top bar orchestrator that synchronizes instant search, breadcrumb subtitles, filter drawers, and export modals.",
    "description": "DynamicHeader bridges the user experience across data tables and card grids. It provides a real-time debounced search input, breadcrumb subtitles, custom left and right action slots, and action buttons to trigger FilterDrawer, ColumnDrawer, and DownloadModal.",
    "features": [
      "Debounced search automatically synchronized with useGridFilters",
      "Breadcrumb subTitles array with chevron separators",
      "Custom actionButton slot (e.g. '+ New Entry')",
      "Built-in refresh button with onRefresh callback",
      "Seamlessly pairs with DynamicTable and DynamicCard using filterKey"
    ],
    "props": [
      {
        "name": "filterKey",
        "type": "string",
        "required": true,
        "description": "Grid filter key to synchronize search queries and column settings."
      },
      {
        "name": "title",
        "type": "string",
        "required": true,
        "description": "Primary header title text."
      },
      {
        "name": "subTitles",
        "type": "string[]",
        "default": "[]",
        "description": "Breadcrumb hierarchy path displayed above or beside the title."
      },
      {
        "name": "searchPlaceholder",
        "type": "string",
        "default": "\"Search here\"",
        "description": "Placeholder text for the search input box."
      },
      {
        "name": "actionButton",
        "type": "React.ReactNode",
        "description": "Primary CTA button rendered on the right."
      },
      {
        "name": "onRefresh",
        "type": "() => void",
        "description": "Callback triggered when clicking the reload icon."
      },
      {
        "name": "leftSection",
        "type": "React.ReactNode",
        "description": "Custom content rendered on the left."
      },
      {
        "name": "rightSection",
        "type": "React.ReactNode",
        "description": "Custom content rendered on the right."
      }
    ],
    "code": "import { DynamicHeader, ButtonField } from \"antd-dynamic-ui\";\n\nexport default function HeaderDemo() {\n  return (\n    <DynamicHeader\n      filterKey=\"users_grid\"\n      title=\"User Management\"\n      subTitles={[\"Dashboard\", \"Access Control\"]}\n      actionButton={<ButtonField type=\"primary\">+ Add User</ButtonField>}\n      onRefresh={() => console.log(\"Refreshed\")}\n    />\n  );\n}",
    "examples": [
      {
        "title": "Standard Search & Refresh Header",
        "description": "Basic header with instant search query connected to a data grid.",
        "language": "tsx",
        "filename": "DynamicHeader.basic.tsx",
        "code": "import React from \"react\";\nimport { DynamicHeader } from \"antd-dynamic-ui\";\n\nexport default function BasicHeader() {\n  return (\n    <DynamicHeader\n      filterKey=\"invoices_grid\"\n      title=\"Invoices & Billing\"\n      searchPlaceholder=\"Search invoices by invoice number or client...\"\n      onRefresh={() => alert(\"Refreshed!\")}\n    />\n  );\n}"
      },
      {
        "title": "Complete Header with Breadcrumbs & Action Button",
        "description": "Full header with multi-level subtitles, custom primary button, and search.",
        "language": "tsx",
        "filename": "DynamicHeader.complete.tsx",
        "code": "import React from \"react\";\nimport { DynamicHeader, ButtonField } from \"antd-dynamic-ui\";\nimport { Plus } from \"lucide-react\";\n\nexport default function CompleteHeader() {\n  return (\n    <DynamicHeader\n      filterKey=\"products_grid\"\n      title=\"Product Catalog\"\n      subTitles={[\"Storefront\", \"Catalog Management\", \"Spring 2026\"]}\n      searchPlaceholder=\"Filter SKUs, barcodes, or brands...\"\n      actionButton={\n        <ButtonField type=\"primary\" icon={<Plus size={16} />}>\n          Create New Product\n        </ButtonField>\n      }\n      onRefresh={() => console.log(\"Reloading dataset...\")}\n    />\n  );\n}"
      }
    ]
  },
  "dynamic-sidebar": {
    "slug": "dynamic-sidebar",
    "title": "DynamicSideBar",
    "category": "Core Dynamic Components",
    "badge": "Enterprise Nav Rail",
    "summary": "Full-featured enterprise navigation sidebar with user profile popover, module switcher, dirty form guards, and responsive collapse.",
    "description": "DynamicSideBar handles hierarchical navigation menus with search filtering, brand logo slots, tenant module switchers, and user authentication profile card with a confirmation modal on logout.",
    "features": [
      "Hierarchical menu items with Ant Design icon support",
      "Integrated user profile popover with department and avatar",
      "Form dirty protection: warns before navigating away from unsaved forms",
      "Module switcher for multi-tenant or multi-app suites",
      "Collapsible rail mode with smooth animations"
    ],
    "props": [
      {
        "name": "items",
        "type": "MenuProps[\"items\"]",
        "required": true,
        "description": "Ant Design menu items array containing key, label, icon, and route."
      },
      {
        "name": "user",
        "type": "{ name?: string; email?: string; role?: string; avatar?: string }",
        "description": "User profile metadata displayed at the bottom."
      },
      {
        "name": "onLogout",
        "type": "() => void | Promise<void>",
        "description": "Logout callback triggered after confirmation modal."
      },
      {
        "name": "collapsed",
        "type": "boolean",
        "default": "false",
        "description": "Controls collapsed/expanded state."
      },
      {
        "name": "collapsabled",
        "type": "boolean",
        "default": "true",
        "description": "Whether user can toggle collapse state."
      },
      {
        "name": "logo",
        "type": "React.ReactNode",
        "description": "Logo or branding element at the top."
      },
      {
        "name": "pathname",
        "type": "string",
        "description": "Current URL pathname for active route highlighting."
      },
      {
        "name": "modules",
        "type": "{ key: string; label: string }[]",
        "description": "Module switcher list for multi-app navigation."
      }
    ],
    "code": "import { DynamicSideBar } from \"antd-dynamic-ui\";\nimport { UserOutlined, DashboardOutlined } from \"@ant-design/icons\";\n\nexport default function SidebarDemo() {\n  const items = [\n    { key: \"dash\", label: \"Dashboard\", icon: <DashboardOutlined /> },\n    { key: \"users\", label: \"Users\", icon: <UserOutlined /> },\n  ];\n\n  return (\n    <DynamicSideBar\n      items={items}\n      user={{ name: \"Kamlesh\", role: \"Superadmin\" }}\n      onLogout={() => console.log(\"Logout\")}\n    />\n  );\n}",
    "examples": [
      {
        "title": "Basic App Navigation Menu",
        "description": "Navigation menu with icons and route keys.",
        "language": "tsx",
        "filename": "DynamicSidebar.basic.tsx",
        "code": "import React from \"react\";\nimport { DynamicSideBar } from \"antd-dynamic-ui\";\nimport { AppstoreOutlined, SettingOutlined } from \"@ant-design/icons\";\n\nexport default function BasicSidebar() {\n  const menuItems = [\n    { key: \"/dashboard\", label: \"Dashboard\", icon: <AppstoreOutlined /> },\n    { key: \"/settings\", label: \"Settings\", icon: <SettingOutlined /> },\n  ];\n\n  return (\n    <div className=\"h-[500px] w-64 border-r\">\n      <DynamicSideBar items={menuItems} />\n    </div>\n  );\n}"
      },
      {
        "title": "Complete Enterprise Sidebar with User Profile",
        "description": "Full sidebar with brand logo, module switcher, user profile card, and logout handler.",
        "language": "tsx",
        "filename": "DynamicSidebar.complete.tsx",
        "code": "import React from \"react\";\nimport { DynamicSideBar } from \"antd-dynamic-ui\";\nimport {\n  HomeOutlined,\n  TeamOutlined,\n  FileTextOutlined,\n  SecurityScanOutlined,\n} from \"@ant-design/icons\";\n\nexport default function EnterpriseSidebarDemo() {\n  const items = [\n    { key: \"home\", label: \"Overview\", icon: <HomeOutlined /> },\n    { key: \"team\", label: \"Team Members\", icon: <TeamOutlined /> },\n    { key: \"billing\", label: \"Invoices\", icon: <FileTextOutlined /> },\n    { key: \"audit\", label: \"Security & Audit\", icon: <SecurityScanOutlined /> },\n  ];\n\n  return (\n    <div className=\"h-[600px] w-64 border-r bg-white border-[#ede5d8]\">\n      <DynamicSideBar\n        items={items}\n        logo={<span className=\"font-bold text-lg px-4\">Corp Portal</span>}\n        user={{\n          name: \"Ada Lovelace\",\n          email: \"ada@computing.org\",\n          role: \"Chief Architect\",\n          avatar: \"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100\",\n        }}\n        onLogout={async () => {\n          alert(\"Logged out successfully\");\n        }}\n      />\n    </div>\n  );\n}"
      }
    ]
  },
  "input-field": {
    "slug": "input-field",
    "title": "InputField",
    "category": "Standard Form Fields",
    "summary": "Single-line text input with addon prefixes/suffixes, tooltip hints, clear buttons, and React Hook Form Controller integration.",
    "description": "InputField connects Ant Design's Input to React Hook Form. It supports inline prefixes (icons), addonBefore/addonAfter (protocols, domain suffixes), max character limits, info tooltips, and custom change listeners.",
    "features": [
      "React Hook Form Controller integration via control prop or safe context fallback",
      "AddonBefore / AddonAfter slots for URL schemes ('https://') and domain extensions ('.com')",
      "Prefix / Suffix slots for icons and status indicators",
      "Info tooltip icon rendered beside the form label",
      "Integrated validation error messages and asterisk for required fields"
    ],
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "description": "Form state key name registered in React Hook Form."
      },
      {
        "name": "control",
        "type": "Control<any>",
        "required": false,
        "description": "React Hook Form control instance (optional if inside FormProvider)."
      },
      {
        "name": "label",
        "type": "string",
        "description": "Field label displayed above the input."
      },
      {
        "name": "placeholder",
        "type": "string",
        "description": "Watermark placeholder text."
      },
      {
        "name": "tooltip",
        "type": "string",
        "description": "Informational tooltip text shown next to the label."
      },
      {
        "name": "helpText",
        "type": "string",
        "description": "Subordinate hint or disclaimer rendered below the input."
      },
      {
        "name": "required",
        "type": "boolean",
        "default": "false",
        "description": "Renders a red asterisk next to the label."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables user interaction."
      },
      {
        "name": "prefix",
        "type": "React.ReactNode",
        "description": "Icon or element placed inside the left edge of the input."
      },
      {
        "name": "suffix",
        "type": "React.ReactNode",
        "description": "Icon or element placed inside the right edge of the input."
      },
      {
        "name": "addonBefore",
        "type": "React.ReactNode",
        "description": "Addon box attached before the input."
      },
      {
        "name": "addonAfter",
        "type": "React.ReactNode",
        "description": "Addon box attached after the input."
      },
      {
        "name": "maxLength",
        "type": "number",
        "description": "Maximum character length permitted."
      },
      {
        "name": "onChange",
        "type": "(val: any) => void",
        "description": "Custom change listener triggered on every keystroke."
      },
      {
        "name": "rules",
        "type": "RegisterOptions",
        "description": "React Hook Form validation rules (pattern, minLength, required)."
      },
      {
        "name": "span",
        "type": "number",
        "default": "24",
        "description": "Grid column span out of 24 when rendered inside DynamicForm rows."
      }
    ],
    "code": "import { InputField } from \"antd-dynamic-ui\";\nimport { useForm } from \"react-hook-form\";\n\nexport default function BasicInput() {\n  const { control } = useForm();\n  return <InputField id=\"username\" control={control} label=\"Username\" placeholder=\"Enter username\" required />;\n}",
    "examples": [
      {
        "title": "Basic React Hook Form Input",
        "description": "Standard controlled single-line text input with label and placeholder.",
        "language": "tsx",
        "filename": "InputField.basic.tsx",
        "code": "import React from \"react\";\nimport { useForm } from \"react-hook-form\";\nimport { InputField } from \"antd-dynamic-ui\";\n\nexport default function BasicInputExample() {\n  const { control, handleSubmit } = useForm({\n    defaultValues: { fullName: \"Ada Lovelace\" },\n  });\n\n  return (\n    <form onSubmit={handleSubmit((d) => console.log(d))} className=\"max-w-md space-y-4\">\n      <InputField\n        id=\"fullName\"\n        control={control}\n        label=\"Full Name\"\n        placeholder=\"e.g. John Doe\"\n        required={true}\n      />\n    </form>\n  );\n}"
      },
      {
        "title": "Complete Props with URL Addons & Prefix Icons",
        "description": "Demonstrating addonBefore, addonAfter, prefix icon, tooltip, and live change listener.",
        "language": "tsx",
        "filename": "InputField.complete.tsx",
        "code": "import React from \"react\";\nimport { useForm } from \"react-hook-form\";\nimport { InputField } from \"antd-dynamic-ui\";\nimport { LinkOutlined } from \"@ant-design/icons\";\n\nexport default function CompleteInputExample() {\n  const { control } = useForm({\n    defaultValues: { customDomain: \"acme-corp\" },\n  });\n\n  return (\n    <div className=\"max-w-md space-y-4\">\n      <InputField\n        id=\"customDomain\"\n        control={control}\n        label=\"Custom Subdomain\"\n        tooltip=\"Your public vanity URL endpoint\"\n        helpText=\"Only lowercase letters and hyphens allowed\"\n        addonBefore=\"https://\"\n        addonAfter=\".saas-hub.io\"\n        prefix={<LinkOutlined className=\"text-zinc-400\" />}\n        maxLength={30}\n        required={true}\n        onChange={(val) => console.log(\"Current value:\", val)}\n      />\n    </div>\n  );\n}"
      },
      {
        "title": "Declarative DynamicForm Schema Row",
        "description": "How to define InputField in backend JSON schemas for DynamicForm.",
        "language": "tsx",
        "filename": "InputField.schema.tsx",
        "code": "import { FieldConfig } from \"antd-dynamic-ui\";\n\n// JSON object sent by backend API\nexport const inputFieldSchema: FieldConfig = {\n  id: \"corporateEmail\",\n  type: \"text\",\n  label: \"Corporate Email Address\",\n  placeholder: \"alex@company.com\",\n  tooltip: \"Must match your corporate SSO domain\",\n  helpText: \"We will send an activation link to this address\",\n  required: true,\n  span: 12,\n  validation: {\n    required: true,\n    pattern: \"^[a-zA-Z0-9._%+-]+@company\\\\.com$\",\n    customMessage: \"Must be a valid @company.com email address\",\n  },\n};"
      }
    ]
  },
  "password-field": {
    "slug": "password-field",
    "title": "PasswordField",
    "category": "Standard Form Fields",
    "summary": "Secure masked password input with show/hide visibility toggle, lock prefix icon, and strength validation.",
    "description": "PasswordField masks sensitive credentials with eye icon toggle buttons, caps lock detection, and seamless React Hook Form integration.",
    "features": [
      "Built-in eye icon toggle to reveal or mask passwords",
      "Optional lock prefix icon and custom tooltips",
      "Integrated validation rules (minLength, regex patterns)",
      "Works standalone or within DynamicForm matrix grids"
    ],
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "description": "Form state key name."
      },
      {
        "name": "control",
        "type": "Control<any>",
        "description": "React Hook Form control instance."
      },
      {
        "name": "label",
        "type": "string",
        "description": "Field label text."
      },
      {
        "name": "placeholder",
        "type": "string",
        "description": "Placeholder text."
      },
      {
        "name": "tooltip",
        "type": "string",
        "description": "Helpful tooltip next to label."
      },
      {
        "name": "required",
        "type": "boolean",
        "default": "false",
        "description": "Required asterisk indicator."
      },
      {
        "name": "prefix",
        "type": "React.ReactNode",
        "description": "Prefix icon."
      },
      {
        "name": "rules",
        "type": "RegisterOptions",
        "description": "Validation rules (minLength, pattern)."
      }
    ],
    "code": "import { PasswordField } from \"antd-dynamic-ui\";\nimport { useForm } from \"react-hook-form\";\n\nexport default function PasswordDemo() {\n  const { control } = useForm();\n  return <PasswordField id=\"pass\" control={control} label=\"Password\" required />;\n}",
    "examples": [
      {
        "title": "Basic Password Input",
        "description": "Masked password entry with eye visibility toggle.",
        "language": "tsx",
        "filename": "PasswordField.basic.tsx",
        "code": "import React from \"react\";\nimport { useForm } from \"react-hook-form\";\nimport { PasswordField } from \"antd-dynamic-ui\";\n\nexport default function BasicPasswordExample() {\n  const { control } = useForm();\n  return (\n    <div className=\"max-w-md\">\n      <PasswordField\n        id=\"password\"\n        control={control}\n        label=\"Account Password\"\n        placeholder=\"Enter at least 8 characters\"\n        required={true}\n      />\n    </div>\n  );\n}"
      },
      {
        "title": "Complete Props with Lock Icon & Tooltip",
        "description": "Password field with prefix lock icon, security tooltip, and minLength rules.",
        "language": "tsx",
        "filename": "PasswordField.complete.tsx",
        "code": "import React from \"react\";\nimport { useForm } from \"react-hook-form\";\nimport { PasswordField } from \"antd-dynamic-ui\";\nimport { LockOutlined } from \"@ant-design/icons\";\n\nexport default function CompletePasswordExample() {\n  const { control } = useForm();\n  return (\n    <div className=\"max-w-md\">\n      <PasswordField\n        id=\"securityToken\"\n        control={control}\n        label=\"Master Encryption Key\"\n        placeholder=\"Enter 16+ character passphrase\"\n        tooltip=\"Used for end-to-end payload signing\"\n        prefix={<LockOutlined className=\"text-zinc-400\" />}\n        required={true}\n        rules={{ minLength: { value: 16, message: \"Key must be at least 16 chars\" } }}\n      />\n    </div>\n  );\n}"
      }
    ]
  },
  "text-area-field": {
    "slug": "text-area-field",
    "title": "TextAreaField",
    "category": "Standard Form Fields",
    "summary": "Multi-line text input with character counting, custom row height, and auto-sizing.",
    "description": "TextAreaField manages multi-line textual comments, descriptions, notes, and addresses with character counters (showCount) and maximum length constraints.",
    "features": [
      "Configurable row count (rows: 4) and auto-sizing capabilities",
      "showCount character counter display (e.g. 142 / 500)",
      "React Hook Form integration with validation rules"
    ],
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "description": "Form state key name."
      },
      {
        "name": "control",
        "type": "Control<any>",
        "description": "React Hook Form control instance."
      },
      {
        "name": "label",
        "type": "string",
        "description": "Field label."
      },
      {
        "name": "placeholder",
        "type": "string",
        "description": "Placeholder text."
      },
      {
        "name": "rows",
        "type": "number",
        "default": "4",
        "description": "Initial visible row height."
      },
      {
        "name": "maxLength",
        "type": "number",
        "description": "Maximum character limit."
      },
      {
        "name": "showCount",
        "type": "boolean",
        "default": "false",
        "description": "Shows current character count and limit."
      }
    ],
    "code": "import { TextAreaField } from \"antd-dynamic-ui\";\nimport { useForm } from \"react-hook-form\";\n\nexport default function TextareaDemo() {\n  const { control } = useForm();\n  return <TextAreaField id=\"bio\" control={control} label=\"Biography\" rows={4} maxLength={500} showCount />;\n}",
    "examples": [
      {
        "title": "Basic Multi-line Description",
        "description": "Standard text area for remarks and notes.",
        "language": "tsx",
        "filename": "TextAreaField.basic.tsx",
        "code": "import React from \"react\";\nimport { useForm } from \"react-hook-form\";\nimport { TextAreaField } from \"antd-dynamic-ui\";\n\nexport default function BasicTextArea() {\n  const { control } = useForm();\n  return (\n    <div className=\"max-w-md\">\n      <TextAreaField\n        id=\"notes\"\n        control={control}\n        label=\"Order Notes\"\n        placeholder=\"Add delivery instructions or gate code...\"\n        rows={4}\n      />\n    </div>\n  );\n}"
      },
      {
        "title": "Complete Props with Character Counter",
        "description": "Text area with 500-char limit, character counter, and custom rows.",
        "language": "tsx",
        "filename": "TextAreaField.complete.tsx",
        "code": "import React from \"react\";\nimport { useForm } from \"react-hook-form\";\nimport { TextAreaField } from \"antd-dynamic-ui\";\n\nexport default function CompleteTextArea() {\n  const { control } = useForm();\n  return (\n    <div className=\"max-w-md\">\n      <TextAreaField\n        id=\"justification\"\n        control={control}\n        label=\"Project Justification\"\n        placeholder=\"Explain budget justification for audit approval...\"\n        rows={6}\n        maxLength={500}\n        showCount={true}\n        tooltip=\"Submitted to Finance review board\"\n        required={true}\n      />\n    </div>\n  );\n}"
      }
    ]
  },
  "number-field": {
    "slug": "number-field",
    "title": "NumberField",
    "category": "Standard Form Fields",
    "summary": "Numeric stepper input with min/max bounds, step increments, precision formatting, and currency prefixes.",
    "description": "NumberField handles numeric values, currencies, percentages, and quantities with precision controls, step increments, and unit addons.",
    "features": [
      "Min, max, and step controls with arrow steppers",
      "Custom currency prefixes ('$') and unit addons ('USD', 'kg')",
      "Precision decimal formatting (e.g. precision: 2)"
    ],
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "description": "Form state key name."
      },
      {
        "name": "control",
        "type": "Control<any>",
        "description": "React Hook Form control instance."
      },
      {
        "name": "label",
        "type": "string",
        "description": "Field label."
      },
      {
        "name": "min",
        "type": "number",
        "description": "Minimum allowed number."
      },
      {
        "name": "max",
        "type": "number",
        "description": "Maximum allowed number."
      },
      {
        "name": "step",
        "type": "number",
        "default": "1",
        "description": "Increment step size."
      },
      {
        "name": "precision",
        "type": "number",
        "description": "Number of decimal places."
      },
      {
        "name": "prefix",
        "type": "React.ReactNode",
        "description": "Prefix icon or currency symbol."
      },
      {
        "name": "addonAfter",
        "type": "React.ReactNode",
        "description": "Trailing unit label (e.g. 'USD')."
      }
    ],
    "code": "import { NumberField } from \"antd-dynamic-ui\";\nimport { useForm } from \"react-hook-form\";\n\nexport default function NumberDemo() {\n  const { control } = useForm();\n  return <NumberField id=\"price\" control={control} label=\"Price\" min={0} step={0.01} precision={2} prefix=\"$\" />;\n}",
    "examples": [
      {
        "title": "Basic Quantity Stepper",
        "description": "Integer quantity selector with min/max bounds.",
        "language": "tsx",
        "filename": "NumberField.basic.tsx",
        "code": "import React from \"react\";\nimport { useForm } from \"react-hook-form\";\nimport { NumberField } from \"antd-dynamic-ui\";\n\nexport default function BasicNumber() {\n  const { control } = useForm({ defaultValues: { qty: 1 } });\n  return (\n    <div className=\"max-w-xs\">\n      <NumberField\n        id=\"qty\"\n        control={control}\n        label=\"Order Quantity\"\n        min={1}\n        max={100}\n        step={1}\n      />\n    </div>\n  );\n}"
      },
      {
        "title": "Complete Currency Input with Precision",
        "description": "Decimal price input with currency prefix and USD unit addon.",
        "language": "tsx",
        "filename": "NumberField.complete.tsx",
        "code": "import React from \"react\";\nimport { useForm } from \"react-hook-form\";\nimport { NumberField } from \"antd-dynamic-ui\";\n\nexport default function CurrencyNumber() {\n  const { control } = useForm({ defaultValues: { unitCost: 49.99 } });\n  return (\n    <div className=\"max-w-xs\">\n      <NumberField\n        id=\"unitCost\"\n        control={control}\n        label=\"Unit Cost\"\n        min={0}\n        step={0.01}\n        precision={2}\n        prefix=\"$\"\n        addonAfter=\"USD\"\n        required={true}\n      />\n    </div>\n  );\n}"
      }
    ]
  },
  "select-field": {
    "slug": "select-field",
    "title": "SelectField",
    "category": "Standard Form Fields",
    "summary": "Dropdown select component supporting key/value option mapping, multi-select, search filtering, and in-menu create actions.",
    "description": "SelectField normalizes options arrays into { key, value } pairs, supports single and multiple selection modes, clearable options, and an embedded '+ Create New' action button.",
    "features": [
      "Key-value option normalization ({ key: 'us', value: 'United States' })",
      "Mode support: 'multiple' (tags) and standard single select",
      "Create action: embed a '+ Add Option' action directly inside the dropdown menu",
      "Key filtering with hideKeys prop"
    ],
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "description": "Form state key name."
      },
      {
        "name": "control",
        "type": "Control<any>",
        "required": true,
        "description": "React Hook Form control instance."
      },
      {
        "name": "options",
        "type": "FieldOption[]",
        "required": true,
        "description": "Array of { key: string, value: string } options."
      },
      {
        "name": "mode",
        "type": "\"multiple\" | \"tags\"",
        "description": "Enables multi-tag selection mode."
      },
      {
        "name": "showSearch",
        "type": "boolean",
        "default": "true",
        "description": "Enables text filtering across options."
      },
      {
        "name": "allowClear",
        "type": "boolean",
        "default": "true",
        "description": "Shows a cross icon to clear selection."
      },
      {
        "name": "create",
        "type": "SelectCreateAction",
        "description": "Config for '+ Add New' button inside dropdown footer."
      },
      {
        "name": "hideKeys",
        "type": "(string | number)[]",
        "description": "List of keys to omit from the dropdown list."
      }
    ],
    "code": "import { SelectField } from \"antd-dynamic-ui\";\nimport { useForm } from \"react-hook-form\";\n\nexport default function SelectDemo() {\n  const { control } = useForm();\n  const options = [{ key: \"dev\", value: \"Developer\" }, { key: \"pm\", value: \"Product Manager\" }];\n  return <SelectField id=\"role\" control={control} label=\"Role\" options={options} />;\n}",
    "examples": [
      {
        "title": "Basic Dropdown Selector",
        "description": "Standard single-select dropdown with key-value pairs.",
        "language": "tsx",
        "filename": "SelectField.basic.tsx",
        "code": "import React from \"react\";\nimport { useForm } from \"react-hook-form\";\nimport { SelectField } from \"antd-dynamic-ui\";\n\nexport default function BasicSelect() {\n  const { control } = useForm();\n  const roles = [\n    { key: \"admin\", value: \"Administrator\" },\n    { key: \"editor\", value: \"Editor\" },\n    { key: \"viewer\", value: \"Viewer\" },\n  ];\n\n  return (\n    <div className=\"max-w-md\">\n      <SelectField\n        id=\"role\"\n        control={control}\n        label=\"User Role\"\n        placeholder=\"Select access tier\"\n        options={roles}\n      />\n    </div>\n  );\n}"
      },
      {
        "title": "Multi-Select Mode with In-Menu '+ Add Option' Action",
        "description": "Multi-tag selection with search filter and an embedded create new option button.",
        "language": "tsx",
        "filename": "SelectField.complete.tsx",
        "code": "import React, { useState } from \"react\";\nimport { useForm } from \"react-hook-form\";\nimport { SelectField } from \"antd-dynamic-ui\";\nimport { PlusOutlined } from \"@ant-design/icons\";\n\nexport default function MultiSelectWithCreate() {\n  const { control } = useForm({ defaultValues: { tags: [\"react\", \"typescript\"] } });\n  const [tagOptions, setTagOptions] = useState([\n    { key: \"react\", value: \"React 19\" },\n    { key: \"typescript\", value: \"TypeScript 5.8\" },\n    { key: \"tailwind\", value: \"Tailwind CSS\" },\n  ]);\n\n  return (\n    <div className=\"max-w-md\">\n      <SelectField\n        id=\"tags\"\n        control={control}\n        label=\"Project Technologies\"\n        placeholder=\"Select or add tags\"\n        options={tagOptions}\n        mode=\"multiple\"\n        showSearch={true}\n        allowClear={true}\n        create={{\n          label: \"Add New Technology Tag\",\n          icon: <PlusOutlined />,\n          onClick: () => {\n            const newTag = prompt(\"Enter new tag name:\");\n            if (newTag) {\n              setTagOptions((prev) => [...prev, { key: newTag.toLowerCase(), value: newTag }]);\n            }\n          },\n        }}\n      />\n    </div>\n  );\n}"
      }
    ]
  },
  "select-api-field": {
    "slug": "select-api-field",
    "title": "SelectApiField",
    "category": "Standard Form Fields",
    "badge": "Debounced Async Query",
    "summary": "Remote API dropdown with debounced server search (400ms default), request cancellation, and infinite scroll pagination.",
    "description": "SelectApiField queries remote REST endpoints as the user types, debouncing queries with AbortController cancellation to eliminate stale responses.",
    "features": [
      "Debounced remote querying (400ms configurable debounceMs)",
      "AbortController request cancellation prevents out-of-order responses",
      "Configurable labelPath and valuePath for arbitrary backend JSON responses",
      "Supports multi-select mode and initialValue pre-hydration"
    ],
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "description": "Form state key name."
      },
      {
        "name": "control",
        "type": "Control<any>",
        "required": true,
        "description": "React Hook Form control instance."
      },
      {
        "name": "apiUrl",
        "type": "string",
        "required": true,
        "description": "Remote endpoint URL to fetch options from."
      },
      {
        "name": "searchParam",
        "type": "string",
        "default": "\"search\"",
        "description": "Query parameter name sent with user search text."
      },
      {
        "name": "labelPath",
        "type": "string",
        "default": "\"value\"",
        "description": "Key in response object to use as option label."
      },
      {
        "name": "valuePath",
        "type": "string",
        "default": "\"key\"",
        "description": "Key in response object to use as option value."
      },
      {
        "name": "debounceMs",
        "type": "number",
        "default": "400",
        "description": "Debounce delay in milliseconds before querying API."
      },
      {
        "name": "limit",
        "type": "number",
        "default": "50",
        "description": "Max results per page."
      },
      {
        "name": "extraParams",
        "type": "Record<string, any>",
        "description": "Static query parameters sent with every request."
      }
    ],
    "code": "import { SelectApiField } from \"antd-dynamic-ui\";\nimport { useForm } from \"react-hook-form\";\n\nexport default function RemoteSelectDemo() {\n  const { control } = useForm();\n  return (\n    <SelectApiField\n      id=\"userId\"\n      control={control}\n      apiUrl=\"/api/v1/users/search\"\n      searchParam=\"q\"\n      label=\"Assignee\"\n    />\n  );\n}",
    "examples": [
      {
        "title": "Basic Remote User Search",
        "description": "Search remote users endpoint with debounced queries.",
        "language": "tsx",
        "filename": "SelectApiField.basic.tsx",
        "code": "import React from \"react\";\nimport { useForm } from \"react-hook-form\";\nimport { SelectApiField } from \"antd-dynamic-ui\";\n\nexport default function BasicRemoteSelect() {\n  const { control } = useForm();\n  return (\n    <div className=\"max-w-md\">\n      <SelectApiField\n        id=\"assignee\"\n        control={control}\n        apiUrl=\"/api/v1/team/members\"\n        searchParam=\"search\"\n        label=\"Task Assignee\"\n        placeholder=\"Type name or email to search...\"\n      />\n    </div>\n  );\n}"
      },
      {
        "title": "Complete Props with Custom Keys & Extra Filters",
        "description": "Remote select with custom JSON paths, department filter, and 500ms debounce.",
        "language": "tsx",
        "filename": "SelectApiField.complete.tsx",
        "code": "import React from \"react\";\nimport { useForm } from \"react-hook-form\";\nimport { SelectApiField } from \"antd-dynamic-ui\";\n\nexport default function CompleteRemoteSelect() {\n  const { control } = useForm();\n  return (\n    <div className=\"max-w-md\">\n      <SelectApiField\n        id=\"customerId\"\n        control={control}\n        apiUrl=\"/api/v2/crm/accounts\"\n        searchParam=\"query\"\n        labelPath=\"companyName\"\n        valuePath=\"accountId\"\n        debounceMs={500}\n        extraParams={{ activeOnly: true, region: \"EMEA\" }}\n        label=\"Corporate Client\"\n        placeholder=\"Search EMEA accounts...\"\n        mode=\"multiple\"\n      />\n    </div>\n  );\n}"
      }
    ],
    "schema": {
      "success": true,
      "data": [
        {
          "key": "usr_101",
          "value": "Ada Lovelace (ada@computing.org)"
        },
        {
          "key": "usr_102",
          "value": "Alan Turing (alan@bletchley.uk)"
        }
      ]
    }
  },
  "upload-field": {
    "slug": "upload-field",
    "title": "UploadField",
    "category": "Standard Form Fields",
    "badge": "S3 Dropzone Ready",
    "summary": "Drag-and-drop file upload component supporting AWS S3 direct uploads, file type restrictions, and instant image preview modals.",
    "description": "UploadField provides an enterprise dropzone for documents and images. It supports single or multi-file uploads, AWS S3 presigned URL integration, file size validation, and in-browser preview modals.",
    "features": [
      "Direct-to-S3 upload integration via presigned URLs",
      "File format validation (PNG, JPG, PDF, XLSX, DOCX)",
      "PreviewModal for inspecting images directly in the browser",
      "Configurable folder path and return valueType ('files' array or single 'url' string)"
    ],
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "description": "Form state key name."
      },
      {
        "name": "control",
        "type": "Control<any>",
        "required": true,
        "description": "React Hook Form control instance."
      },
      {
        "name": "folder",
        "type": "string",
        "default": "\"uploads\"",
        "description": "S3 target folder name (e.g. 'avatars', 'invoices')."
      },
      {
        "name": "valueType",
        "type": "\"files\" | \"url\"",
        "default": "\"files\"",
        "description": "Controls whether form value is stored as an array of files or single URL string."
      },
      {
        "name": "title",
        "type": "string",
        "default": "\"Upload Files\"",
        "description": "Primary title in dropzone."
      },
      {
        "name": "subtitle",
        "type": "string",
        "description": "Secondary hint text (e.g. 'PNG, JPG | Max 5 MB')."
      },
      {
        "name": "buttonText",
        "type": "string",
        "default": "\"Choose File\"",
        "description": "Button label inside dropzone."
      },
      {
        "name": "validation",
        "type": "ValidationRule",
        "description": "Constraints: { multiple, maxFiles, maxSizeMB, accept }."
      },
      {
        "name": "onChange",
        "type": "(files: UploadFile[]) => void",
        "description": "Upload completion callback."
      }
    ],
    "code": "import { UploadField } from \"antd-dynamic-ui\";\nimport { useForm } from \"react-hook-form\";\n\nexport default function UploadDemo() {\n  const { control } = useForm();\n  return (\n    <UploadField\n      id=\"avatar\"\n      control={control}\n      folder=\"avatars\"\n      title=\"Upload Profile Picture\"\n      subtitle=\"PNG or JPG up to 5MB\"\n    />\n  );\n}",
    "examples": [
      {
        "title": "Basic Document Dropzone",
        "description": "Standard drag-and-drop file upload dropzone.",
        "language": "tsx",
        "filename": "UploadField.basic.tsx",
        "code": "import React from \"react\";\nimport { useForm } from \"react-hook-form\";\nimport { UploadField } from \"antd-dynamic-ui\";\n\nexport default function BasicUpload() {\n  const { control } = useForm();\n  return (\n    <div className=\"max-w-md\">\n      <UploadField\n        id=\"resume\"\n        control={control}\n        folder=\"resumes\"\n        title=\"Upload Resume / CV\"\n        subtitle=\"PDF, DOCX up to 10 MB\"\n      />\n    </div>\n  );\n}"
      },
      {
        "title": "Complete S3 Direct Upload with Strict Validation",
        "description": "Upload field returning single URL string with 5MB max size and image preview modal.",
        "language": "tsx",
        "filename": "UploadField.complete.tsx",
        "code": "import React from \"react\";\nimport { useForm } from \"react-hook-form\";\nimport { UploadField } from \"antd-dynamic-ui\";\n\nexport default function S3AvatarUpload() {\n  const { control } = useForm();\n  return (\n    <div className=\"max-w-md\">\n      <UploadField\n        id=\"profilePhotoUrl\"\n        control={control}\n        folder=\"user-avatars\"\n        valueType=\"url\"\n        title=\"Avatar Image\"\n        subtitle=\"Square PNG or JPG (max 5 MB)\"\n        buttonText=\"Select Image\"\n        buttonType=\"primary\"\n        validation={{\n          multiple: false,\n          maxSizeMB: 5,\n          accept: \"image/png,image/jpeg\",\n        }}\n        onChange={(files) => console.log(\"Uploaded S3 Files:\", files)}\n      />\n    </div>\n  );\n}"
      }
    ]
  },
  "date-field": {
    "slug": "date-field",
    "title": "DateField",
    "category": "Standard Form Fields",
    "summary": "Calendar date picker with customizable date formatting, time inclusion, and disabled date ranges.",
    "description": "DateField wraps Ant Design's DatePicker with React Hook Form, supporting ISO date string serialization and custom formats.",
    "features": [
      "Custom date format strings ('YYYY-MM-DD', 'DD/MM/YYYY')",
      "showTime toggle for timestamp picking",
      "disabledDate function to lock past or weekend dates"
    ],
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "description": "Form state key name."
      },
      {
        "name": "control",
        "type": "Control<any>",
        "required": true,
        "description": "React Hook Form control instance."
      },
      {
        "name": "label",
        "type": "string",
        "description": "Field label."
      },
      {
        "name": "format",
        "type": "string",
        "default": "\"YYYY-MM-DD\"",
        "description": "Display format string."
      },
      {
        "name": "showTime",
        "type": "boolean",
        "default": "false",
        "description": "Enables clock time selector."
      }
    ],
    "code": "import { DateField } from \"antd-dynamic-ui\";\nimport { useForm } from \"react-hook-form\";\n\nexport default function DateDemo() {\n  const { control } = useForm();\n  return <DateField id=\"dob\" control={control} label=\"Date of Birth\" format=\"YYYY-MM-DD\" />;\n}",
    "examples": [
      {
        "title": "Basic Date Picker",
        "description": "Standard single-date picker.",
        "language": "tsx",
        "filename": "DateField.basic.tsx",
        "code": "import React from \"react\";\nimport { useForm } from \"react-hook-form\";\nimport { DateField } from \"antd-dynamic-ui\";\n\nexport default function BasicDate() {\n  const { control } = useForm();\n  return (\n    <div className=\"max-w-xs\">\n      <DateField id=\"birthDate\" control={control} label=\"Date of Birth\" />\n    </div>\n  );\n}"
      },
      {
        "title": "Date and Time Picker with Custom Format",
        "description": "Timestamp picker with hour and minute selection.",
        "language": "tsx",
        "filename": "DateField.complete.tsx",
        "code": "import React from \"react\";\nimport { useForm } from \"react-hook-form\";\nimport { DateField } from \"antd-dynamic-ui\";\n\nexport default function DateTimePicker() {\n  const { control } = useForm();\n  return (\n    <div className=\"max-w-sm\">\n      <DateField\n        id=\"scheduledLaunch\"\n        control={control}\n        label=\"Scheduled Deployment Window\"\n        showTime={true}\n        format=\"YYYY-MM-DD HH:mm:ss\"\n        required={true}\n      />\n    </div>\n  );\n}"
      }
    ]
  },
  "date-range-field": {
    "slug": "date-range-field",
    "title": "DateRangeField",
    "category": "Standard Form Fields",
    "summary": "Dual-calendar date range picker for billing cycles, event durations, and analytics filtering.",
    "description": "DateRangeField selects start and end date pairs, returning [startDate, endDate] arrays for server queries.",
    "features": [
      "Dual calendar popup with linked date selection",
      "Preset range shortcuts ('This Month', 'Last 30 Days')",
      "React Hook Form integration"
    ],
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "description": "Form state key name."
      },
      {
        "name": "control",
        "type": "Control<any>",
        "required": true,
        "description": "React Hook Form control instance."
      },
      {
        "name": "label",
        "type": "string",
        "description": "Field label."
      },
      {
        "name": "format",
        "type": "string",
        "default": "\"YYYY-MM-DD\"",
        "description": "Date format string."
      }
    ],
    "code": "import { DateRangeField } from \"antd-dynamic-ui\";\nimport { useForm } from \"react-hook-form\";\n\nexport default function DateRangeDemo() {\n  const { control } = useForm();\n  return <DateRangeField id=\"billingPeriod\" control={control} label=\"Billing Period\" />;\n}",
    "examples": [
      {
        "title": "Basic Billing Date Range",
        "description": "Start and end date picker.",
        "language": "tsx",
        "filename": "DateRangeField.basic.tsx",
        "code": "import React from \"react\";\nimport { useForm } from \"react-hook-form\";\nimport { DateRangeField } from \"antd-dynamic-ui\";\n\nexport default function BasicDateRange() {\n  const { control } = useForm();\n  return (\n    <div className=\"max-w-md\">\n      <DateRangeField\n        id=\"fiscalQuarter\"\n        control={control}\n        label=\"Fiscal Period\"\n      />\n    </div>\n  );\n}"
      }
    ]
  },
  "time-picker-field": {
    "slug": "time-picker-field",
    "title": "TimePickerField",
    "category": "Standard Form Fields",
    "summary": "Clock time picker supporting 12-hour AM/PM and 24-hour military formats.",
    "description": "TimePickerField handles time selection for scheduling, meetings, and office hours.",
    "features": [
      "12-hour AM/PM or 24-hour format",
      "Custom minute step increments (e.g. minuteStep: 15)"
    ],
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "description": "Form state key name."
      },
      {
        "name": "control",
        "type": "Control<any>",
        "required": true,
        "description": "React Hook Form control instance."
      },
      {
        "name": "label",
        "type": "string",
        "description": "Field label."
      },
      {
        "name": "format",
        "type": "string",
        "default": "\"HH:mm\"",
        "description": "Time format."
      }
    ],
    "code": "import { TimePickerField } from \"antd-dynamic-ui\";\nimport { useForm } from \"react-hook-form\";\n\nexport default function TimeDemo() {\n  const { control } = useForm();\n  return <TimePickerField id=\"meetingTime\" control={control} label=\"Meeting Time\" />;\n}",
    "examples": [
      {
        "title": "Basic Time Picker",
        "description": "Standard hour and minute picker.",
        "language": "tsx",
        "filename": "TimePickerField.basic.tsx",
        "code": "import React from \"react\";\nimport { useForm } from \"react-hook-form\";\nimport { TimePickerField } from \"antd-dynamic-ui\";\n\nexport default function BasicTime() {\n  const { control } = useForm();\n  return (\n    <div className=\"max-w-xs\">\n      <TimePickerField id=\"startTime\" control={control} label=\"Start Time\" format=\"HH:mm\" />\n    </div>\n  );\n}"
      }
    ]
  },
  "time-range-field": {
    "slug": "time-range-field",
    "title": "TimeRangeField",
    "category": "Standard Form Fields",
    "summary": "Time range selector for business hours and operational shifts.",
    "description": "TimeRangeField manages start and end time pairs.",
    "features": [
      "Pair time selection",
      "Custom format string"
    ],
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "description": "Form state key name."
      },
      {
        "name": "control",
        "type": "Control<any>",
        "required": true,
        "description": "React Hook Form control instance."
      },
      {
        "name": "label",
        "type": "string",
        "description": "Field label."
      }
    ],
    "code": "import { TimeRangeField } from \"antd-dynamic-ui\";\nimport { useForm } from \"react-hook-form\";\n\nexport default function TimeRangeDemo() {\n  const { control } = useForm();\n  return <TimeRangeField id=\"shifts\" control={control} label=\"Shift Hours\" />;\n}",
    "examples": [
      {
        "title": "Operating Hours Range",
        "description": "Selecting business operational hours.",
        "language": "tsx",
        "filename": "TimeRangeField.basic.tsx",
        "code": "import React from \"react\";\nimport { useForm } from \"react-hook-form\";\nimport { TimeRangeField } from \"antd-dynamic-ui\";\n\nexport default function ShiftHours() {\n  const { control } = useForm();\n  return (\n    <div className=\"max-w-md\">\n      <TimeRangeField id=\"businessHours\" control={control} label=\"Support Hours\" />\n    </div>\n  );\n}"
      }
    ]
  },
  "switch-field": {
    "slug": "switch-field",
    "title": "SwitchField",
    "category": "Standard Form Fields",
    "summary": "Boolean toggle switch for feature flags and settings.",
    "description": "SwitchField renders an animated on/off toggle for boolean state variables.",
    "features": [
      "Checked and unchecked labels or icons",
      "React Hook Form boolean binding"
    ],
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "description": "Form state key name."
      },
      {
        "name": "control",
        "type": "Control<any>",
        "required": true,
        "description": "React Hook Form control instance."
      },
      {
        "name": "label",
        "type": "string",
        "description": "Field label."
      },
      {
        "name": "checkedChildren",
        "type": "React.ReactNode",
        "description": "Content when active."
      },
      {
        "name": "unCheckedChildren",
        "type": "React.ReactNode",
        "description": "Content when inactive."
      }
    ],
    "code": "import { SwitchField } from \"antd-dynamic-ui\";\nimport { useForm } from \"react-hook-form\";\n\nexport default function SwitchDemo() {\n  const { control } = useForm();\n  return <SwitchField id=\"enableNotifications\" control={control} label=\"Enable Notifications\" />;\n}",
    "examples": [
      {
        "title": "Basic Toggle Switch",
        "description": "Standard boolean switch.",
        "language": "tsx",
        "filename": "SwitchField.basic.tsx",
        "code": "import React from \"react\";\nimport { useForm } from \"react-hook-form\";\nimport { SwitchField } from \"antd-dynamic-ui\";\n\nexport default function BasicSwitch() {\n  const { control } = useForm({ defaultValues: { isPublic: true } });\n  return (\n    <div className=\"max-w-xs\">\n      <SwitchField id=\"isPublic\" control={control} label=\"Public Visibility\" />\n    </div>\n  );\n}"
      }
    ]
  },
  "checkbox-field": {
    "slug": "checkbox-field",
    "title": "CheckboxField",
    "category": "Standard Form Fields",
    "summary": "Single or multiple checkbox input for consent and option selection.",
    "description": "CheckboxField handles boolean agreements or multi-select option arrays.",
    "features": [
      "Single checkbox agreement",
      "Multiple checkbox group options"
    ],
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "description": "Form state key name."
      },
      {
        "name": "control",
        "type": "Control<any>",
        "required": true,
        "description": "React Hook Form control instance."
      },
      {
        "name": "label",
        "type": "string",
        "description": "Label text."
      },
      {
        "name": "options",
        "type": "FieldOption[]",
        "description": "Optional list for multiple checkboxes."
      }
    ],
    "code": "import { CheckboxField } from \"antd-dynamic-ui\";\nimport { useForm } from \"react-hook-form\";\n\nexport default function CheckboxDemo() {\n  const { control } = useForm();\n  return <CheckboxField id=\"agree\" control={control} label=\"I agree to terms\" />;\n}",
    "examples": [
      {
        "title": "Terms Agreement Checkbox",
        "description": "Single checkbox for terms and conditions.",
        "language": "tsx",
        "filename": "CheckboxField.basic.tsx",
        "code": "import React from \"react\";\nimport { useForm } from \"react-hook-form\";\nimport { CheckboxField } from \"antd-dynamic-ui\";\n\nexport default function ConsentCheckbox() {\n  const { control } = useForm();\n  return (\n    <div className=\"max-w-sm\">\n      <CheckboxField id=\"agreeToTerms\" control={control} label=\"I agree to the End User License Agreement\" />\n    </div>\n  );\n}"
      }
    ]
  },
  "radio-field": {
    "slug": "radio-field",
    "title": "RadioField",
    "category": "Standard Form Fields",
    "summary": "Radio button group for mutually exclusive options with standard or segmented button styles.",
    "description": "RadioField presents mutually exclusive options with regular circular indicators or solid segmented button styles.",
    "features": [
      "Standard circular radios",
      "Button style: optionType='button'"
    ],
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "description": "Form state key name."
      },
      {
        "name": "control",
        "type": "Control<any>",
        "required": true,
        "description": "React Hook Form control instance."
      },
      {
        "name": "label",
        "type": "string",
        "description": "Field label."
      },
      {
        "name": "options",
        "type": "FieldOption[]",
        "required": true,
        "description": "List of options."
      }
    ],
    "code": "import { RadioField } from \"antd-dynamic-ui\";\nimport { useForm } from \"react-hook-form\";\n\nexport default function RadioDemo() {\n  const { control } = useForm();\n  const options = [{ key: \"a\", value: \"Standard\" }, { key: \"b\", value: \"Express\" }];\n  return <RadioField id=\"shipping\" control={control} label=\"Shipping Method\" options={options} />;\n}",
    "examples": [
      {
        "title": "Basic Radio Group",
        "description": "Mutually exclusive options selection.",
        "language": "tsx",
        "filename": "RadioField.basic.tsx",
        "code": "import React from \"react\";\nimport { useForm } from \"react-hook-form\";\nimport { RadioField } from \"antd-dynamic-ui\";\n\nexport default function ShippingRadio() {\n  const { control } = useForm({ defaultValues: { method: \"standard\" } });\n  const options = [\n    { key: \"standard\", value: \"Standard Ground (3-5 Days)\" },\n    { key: \"express\", value: \"Express Priority (Overnight)\" },\n  ];\n  return (\n    <div className=\"max-w-md\">\n      <RadioField id=\"method\" control={control} label=\"Delivery Method\" options={options} />\n    </div>\n  );\n}"
      }
    ]
  },
  "slider-field": {
    "slug": "slider-field",
    "title": "SliderField",
    "category": "Standard Form Fields",
    "summary": "Numeric slider input supporting single handles or dual-handle range values.",
    "description": "SliderField allows selecting values by dragging a handle along a track with marks and step increments.",
    "features": [
      "Single or range slider",
      "Custom marks and step increments"
    ],
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "description": "Form state key name."
      },
      {
        "name": "control",
        "type": "Control<any>",
        "required": true,
        "description": "React Hook Form control instance."
      },
      {
        "name": "label",
        "type": "string",
        "description": "Field label."
      },
      {
        "name": "min",
        "type": "number",
        "default": "0",
        "description": "Minimum value."
      },
      {
        "name": "max",
        "type": "number",
        "default": "100",
        "description": "Maximum value."
      }
    ],
    "code": "import { SliderField } from \"antd-dynamic-ui\";\nimport { useForm } from \"react-hook-form\";\n\nexport default function SliderDemo() {\n  const { control } = useForm();\n  return <SliderField id=\"volume\" control={control} label=\"Volume Level\" min={0} max={100} />;\n}",
    "examples": [
      {
        "title": "Basic Slider",
        "description": "Slider with min/max values.",
        "language": "tsx",
        "filename": "SliderField.basic.tsx",
        "code": "import React from \"react\";\nimport { useForm } from \"react-hook-form\";\nimport { SliderField } from \"antd-dynamic-ui\";\n\nexport default function BasicSlider() {\n  const { control } = useForm({ defaultValues: { score: 75 } });\n  return (\n    <div className=\"max-w-md\">\n      <SliderField id=\"score\" control={control} label=\"Performance Score\" min={0} max={100} />\n    </div>\n  );\n}"
      }
    ]
  },
  "rating-field": {
    "slug": "rating-field",
    "title": "RatingField",
    "category": "Standard Form Fields",
    "summary": "Star rating input for reviews, satisfaction surveys, and feedback scores.",
    "description": "RatingField renders an interactive star rating bar with half-star precision.",
    "features": [
      "5 or 10 star count",
      "allowHalf precision"
    ],
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "description": "Form state key name."
      },
      {
        "name": "control",
        "type": "Control<any>",
        "required": true,
        "description": "React Hook Form control instance."
      },
      {
        "name": "label",
        "type": "string",
        "description": "Field label."
      }
    ],
    "code": "import { RatingField } from \"antd-dynamic-ui\";\nimport { useForm } from \"react-hook-form\";\n\nexport default function RatingDemo() {\n  const { control } = useForm();\n  return <RatingField id=\"stars\" control={control} label=\"Customer Satisfaction\" />;\n}",
    "examples": [
      {
        "title": "Customer Review Stars",
        "description": "Star rating for customer feedback.",
        "language": "tsx",
        "filename": "RatingField.basic.tsx",
        "code": "import React from \"react\";\nimport { useForm } from \"react-hook-form\";\nimport { RatingField } from \"antd-dynamic-ui\";\n\nexport default function BasicRating() {\n  const { control } = useForm({ defaultValues: { stars: 5 } });\n  return (\n    <div className=\"max-w-xs\">\n      <RatingField id=\"stars\" control={control} label=\"Service Quality\" />\n    </div>\n  );\n}"
      }
    ]
  },
  "color-picker-field": {
    "slug": "color-picker-field",
    "title": "ColorPickerField",
    "category": "Standard Form Fields",
    "summary": "Hex / RGB color picker with palette presets and alpha transparency.",
    "description": "ColorPickerField selects hex color codes with swatch popups and preset brand palettes.",
    "features": [
      "Hex output serialization",
      "Preset color swatches"
    ],
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "description": "Form state key name."
      },
      {
        "name": "control",
        "type": "Control<any>",
        "required": true,
        "description": "React Hook Form control instance."
      },
      {
        "name": "label",
        "type": "string",
        "description": "Field label."
      }
    ],
    "code": "import { ColorPickerField } from \"antd-dynamic-ui\";\nimport { useForm } from \"react-hook-form\";\n\nexport default function ColorDemo() {\n  const { control } = useForm();\n  return <ColorPickerField id=\"primaryColor\" control={control} label=\"Primary Brand Color\" />;\n}",
    "examples": [
      {
        "title": "Brand Color Selection",
        "description": "Hex color picker with popover swatch.",
        "language": "tsx",
        "filename": "ColorPickerField.basic.tsx",
        "code": "import React from \"react\";\nimport { useForm } from \"react-hook-form\";\nimport { ColorPickerField } from \"antd-dynamic-ui\";\n\nexport default function BrandColor() {\n  const { control } = useForm({ defaultValues: { themeColor: \"#2563eb\" } });\n  return (\n    <div className=\"max-w-xs\">\n      <ColorPickerField id=\"themeColor\" control={control} label=\"Brand Accent\" />\n    </div>\n  );\n}"
      }
    ]
  },
  "country-field": {
    "slug": "country-field",
    "title": "CountryField",
    "category": "Standard Form Fields",
    "summary": "Country dropdown with emoji flags, ISO country codes, and instant text search.",
    "description": "CountryField provides all 240+ world countries pre-populated with flag emojis and ISO 3166-1 alpha-2 codes.",
    "features": [
      "240+ countries pre-loaded",
      "Emoji flag renderers",
      "Search by country name or code"
    ],
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "description": "Form state key name."
      },
      {
        "name": "control",
        "type": "Control<any>",
        "required": true,
        "description": "React Hook Form control instance."
      },
      {
        "name": "label",
        "type": "string",
        "description": "Field label."
      }
    ],
    "code": "import { CountryField } from \"antd-dynamic-ui\";\nimport { useForm } from \"react-hook-form\";\n\nexport default function CountryDemo() {\n  const { control } = useForm();\n  return <CountryField id=\"country\" control={control} label=\"Country / Region\" />;\n}",
    "examples": [
      {
        "title": "Country Selector with Flags",
        "description": "Searchable country dropdown.",
        "language": "tsx",
        "filename": "CountryField.basic.tsx",
        "code": "import React from \"react\";\nimport { useForm } from \"react-hook-form\";\nimport { CountryField } from \"antd-dynamic-ui\";\n\nexport default function BasicCountry() {\n  const { control } = useForm({ defaultValues: { country: \"US\" } });\n  return (\n    <div className=\"max-w-sm\">\n      <CountryField id=\"country\" control={control} label=\"Nationality\" />\n    </div>\n  );\n}"
      }
    ]
  },
  "phone-field": {
    "slug": "phone-field",
    "title": "PhoneField",
    "category": "Standard Form Fields",
    "summary": "International phone number input with automatic dial code selector and E.164 validation.",
    "description": "PhoneField integrates country dial codes (+1, +44, +91) with phone number input.",
    "features": [
      "International dial codes",
      "Searchable country selector"
    ],
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "description": "Form state key name."
      },
      {
        "name": "control",
        "type": "Control<any>",
        "required": true,
        "description": "React Hook Form control instance."
      },
      {
        "name": "label",
        "type": "string",
        "description": "Field label."
      }
    ],
    "code": "import { PhoneField } from \"antd-dynamic-ui\";\nimport { useForm } from \"react-hook-form\";\n\nexport default function PhoneDemo() {\n  const { control } = useForm();\n  return <PhoneField id=\"mobile\" control={control} label=\"Mobile Number\" />;\n}",
    "examples": [
      {
        "title": "International Phone Number",
        "description": "Phone input with flag selector.",
        "language": "tsx",
        "filename": "PhoneField.basic.tsx",
        "code": "import React from \"react\";\nimport { useForm } from \"react-hook-form\";\nimport { PhoneField } from \"antd-dynamic-ui\";\n\nexport default function BasicPhone() {\n  const { control } = useForm();\n  return (\n    <div className=\"max-w-md\">\n      <PhoneField id=\"phone\" control={control} label=\"Contact Phone\" />\n    </div>\n  );\n}"
      }
    ]
  },
  "otp-field": {
    "slug": "otp-field",
    "title": "OtpField",
    "category": "Standard Form Fields",
    "summary": "One-Time Password / 2FA digit box with auto-focus and auto-advance.",
    "description": "OtpField provides segmented digit boxes for SMS verification codes and authenticator tokens.",
    "features": [
      "Configurable length (e.g. length: 6)",
      "Auto-advance on digit input"
    ],
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "description": "Form state key name."
      },
      {
        "name": "control",
        "type": "Control<any>",
        "required": true,
        "description": "React Hook Form control instance."
      },
      {
        "name": "length",
        "type": "number",
        "default": "6",
        "description": "Number of OTP digit boxes."
      },
      {
        "name": "size",
        "type": "\"small\" | \"middle\" | \"large\"",
        "default": "\"large\"",
        "description": "Input size."
      }
    ],
    "code": "import { OtpField } from \"antd-dynamic-ui\";\nimport { useForm } from \"react-hook-form\";\n\nexport default function OtpDemo() {\n  const { control } = useForm();\n  return <OtpField id=\"otp\" control={control} length={6} />;\n}",
    "examples": [
      {
        "title": "6-Digit SMS Verification Code",
        "description": "Segmented 6-digit OTP code input.",
        "language": "tsx",
        "filename": "OtpField.basic.tsx",
        "code": "import React from \"react\";\nimport { useForm } from \"react-hook-form\";\nimport { OtpField } from \"antd-dynamic-ui\";\n\nexport default function TwoFactorOtp() {\n  const { control } = useForm();\n  return (\n    <div className=\"max-w-sm\">\n      <label className=\"text-sm font-semibold mb-2 block\">Enter 6-digit code</label>\n      <OtpField id=\"twoFactorCode\" control={control} length={6} size=\"large\" />\n    </div>\n  );\n}"
      }
    ]
  },
  "autocomplete-select": {
    "slug": "autocomplete-select",
    "title": "AutocompleteSelect",
    "category": "Standard Form Fields",
    "summary": "Text input with dropdown search suggestions.",
    "description": "AutocompleteSelect allows freeform typing while providing autocomplete suggestions from an array or API.",
    "features": [
      "Freeform input with suggestions",
      "Searchable dropdown list"
    ],
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "description": "Form state key name."
      },
      {
        "name": "control",
        "type": "Control<any>",
        "required": true,
        "description": "React Hook Form control instance."
      },
      {
        "name": "label",
        "type": "string",
        "description": "Field label."
      },
      {
        "name": "options",
        "type": "FieldOption[]",
        "description": "Suggestion list."
      }
    ],
    "code": "import { AutocompleteSelect } from \"antd-dynamic-ui\";\nimport { useForm } from \"react-hook-form\";\n\nexport default function AutoDemo() {\n  const { control } = useForm();\n  return <AutocompleteSelect id=\"search\" control={control} label=\"Search\" />;\n}",
    "examples": [
      {
        "title": "Basic Autocomplete Input",
        "description": "Search input with quick suggestions.",
        "language": "tsx",
        "filename": "AutocompleteSelect.basic.tsx",
        "code": "import React from \"react\";\nimport { useForm } from \"react-hook-form\";\nimport { AutocompleteSelect } from \"antd-dynamic-ui\";\n\nexport default function BasicAuto() {\n  const { control } = useForm();\n  return (\n    <div className=\"max-w-md\">\n      <AutocompleteSelect\n        id=\"city\"\n        control={control}\n        label=\"City\"\n        placeholder=\"Start typing your city...\"\n      />\n    </div>\n  );\n}"
      }
    ]
  },
  "button-field": {
    "slug": "button-field",
    "title": "ButtonField",
    "category": "UI Feedback",
    "summary": "Enhanced Ant Design button with fullWidth styling, loading state, and icon alignment.",
    "description": "ButtonField standardizes action buttons across forms and modals with fullWidth support and loading indicators.",
    "features": [
      "fullWidth container fill",
      "Loading spinner integration",
      "Primary, default, dashed, danger variants"
    ],
    "props": [
      {
        "name": "type",
        "type": "\"primary\" | \"default\" | \"dashed\" | \"link\" | \"text\"",
        "default": "\"default\"",
        "description": "Ant Button variant type."
      },
      {
        "name": "loading",
        "type": "boolean",
        "default": "false",
        "description": "Shows loading spinner."
      },
      {
        "name": "fullWidth",
        "type": "boolean",
        "default": "false",
        "description": "Expands button width to 100% of container."
      },
      {
        "name": "danger",
        "type": "boolean",
        "default": "false",
        "description": "Renders destructive red styling."
      }
    ],
    "code": "import { ButtonField } from \"antd-dynamic-ui\";\n\nexport default function ButtonDemo() {\n  return <ButtonField type=\"primary\">Submit Form</ButtonField>;\n}",
    "examples": [
      {
        "title": "Button Variants",
        "description": "Primary, default, and destructive danger buttons.",
        "language": "tsx",
        "filename": "ButtonField.basic.tsx",
        "code": "import React from \"react\";\nimport { ButtonField } from \"antd-dynamic-ui\";\n\nexport default function ButtonsShowcase() {\n  return (\n    <div className=\"flex gap-3\">\n      <ButtonField type=\"primary\">Primary</ButtonField>\n      <ButtonField type=\"default\">Default</ButtonField>\n      <ButtonField type=\"primary\" danger>Delete</ButtonField>\n    </div>\n  );\n}"
      }
    ]
  },
  "loading-spinner": {
    "slug": "loading-spinner",
    "title": "LoadingSpinner",
    "category": "UI Feedback",
    "summary": "Loading indicator supporting inline cards, container wrappers, and fullScreen backdrops.",
    "description": "LoadingSpinner renders Ant Design's Spin with normalized sizing and an optional fullScreen backdrop overlay.",
    "features": [
      "fullScreen overlay with backdrop blur",
      "Normalized sizes: small, medium, large"
    ],
    "props": [
      {
        "name": "fullScreen",
        "type": "boolean",
        "default": "false",
        "description": "Renders full-viewport backdrop overlay."
      },
      {
        "name": "size",
        "type": "\"small\" | \"medium\" | \"large\"",
        "default": "\"medium\"",
        "description": "Spinner dimensions."
      },
      {
        "name": "tip",
        "type": "string",
        "description": "Descriptive loading message text."
      }
    ],
    "code": "import { LoadingSpinner } from \"antd-dynamic-ui\";\n\nexport default function SpinnerDemo() {\n  return <LoadingSpinner size=\"large\" tip=\"Loading dataset...\" />;\n}",
    "examples": [
      {
        "title": "Inline Spinner",
        "description": "Centered spinner for cards and sections.",
        "language": "tsx",
        "filename": "LoadingSpinner.basic.tsx",
        "code": "import React from \"react\";\nimport { LoadingSpinner } from \"antd-dynamic-ui\";\n\nexport default function InlineSpinner() {\n  return (\n    <div className=\"flex flex-col items-center justify-center p-8 space-y-3\">\n      <LoadingSpinner size=\"large\" />\n      <span className=\"text-xs text-zinc-500\">Fetching live analytics...</span>\n    </div>\n  );\n}"
      }
    ]
  },
  "error-api": {
    "slug": "error-api",
    "title": "ErrorApi",
    "category": "UI Feedback",
    "summary": "Enterprise error state card and full-page failure screen with retry triggers and illustration.",
    "description": "ErrorApi provides an attractive fallback state when HTTP queries fail, with custom error messages and retry buttons.",
    "features": [
      "Friendly error illustration",
      "Retry button with onRetry callback",
      "fullScreen option for 500 error pages"
    ],
    "props": [
      {
        "name": "title",
        "type": "string",
        "default": "\"Oops Something went wrong.\"",
        "description": "Error headline text."
      },
      {
        "name": "message",
        "type": "string",
        "description": "Detailed explanation or error reason."
      },
      {
        "name": "onRetry",
        "type": "() => void",
        "description": "Retry callback executed when user clicks the retry button."
      },
      {
        "name": "fullScreen",
        "type": "boolean",
        "default": "false",
        "description": "Expands container to fill 60vh+ viewport height."
      }
    ],
    "code": "import { ErrorApi } from \"antd-dynamic-ui\";\n\nexport default function ErrorDemo() {\n  return <ErrorApi title=\"Connection Lost\" message=\"Server timed out.\" onRetry={() => location.reload()} />;\n}",
    "examples": [
      {
        "title": "Network Error Card with Retry",
        "description": "Error banner shown inside cards when a query fails.",
        "language": "tsx",
        "filename": "ErrorApi.basic.tsx",
        "code": "import React from \"react\";\nimport { ErrorApi } from \"antd-dynamic-ui\";\n\nexport default function NetworkError() {\n  return (\n    <ErrorApi\n      title=\"Failed to Load Financial Summary\"\n      message=\"The accounting microservice is undergoing routine database maintenance. Please retry in a few moments.\"\n      onRetry={() => alert(\"Retrying request...\")}\n    />\n  );\n}"
      }
    ]
  }
};
