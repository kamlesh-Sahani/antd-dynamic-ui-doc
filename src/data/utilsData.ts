export interface UtilItem {
  name: string;
  category: "Form & Validation" | "API & Network" | "Security & Sanitization" | "Formatters & Colors" | "Type Guards";
  signature: string;
  description: string;
  params: { name: string; type: string; description: string }[];
  returns: string;
  example: string;
  secondaryExample?: string;
  advancedExample?: string;
}

export const UTILS_DATA: UtilItem[] = [
  // Form & Validation
  {
    name: "generateZodSchema",
    category: "Form & Validation",
    signature: "generateZodSchema(rows: FieldConfig[][]): z.ZodObject<any>",
    description: "Traverses a 2D matrix of field configurations and dynamically generates a fully typed Zod validation schema, applying rules for required fields, min/max length, regex patterns, email validation, and custom error messages.",
    params: [
      { name: "rows", type: "FieldConfig[][]", description: "2D array of form field definitions." },
    ],
    returns: "z.ZodObject<any> (executable Zod schema)",
    example: `// Example 1: Basic Zod Schema Generation
import { generateZodSchema } from "antd-dynamic-ui";

const schema = generateZodSchema([
  [
    { id: "email", type: "email", validation: { required: true } },
    { id: "age", type: "number", validation: { min: 18, max: 99 } },
  ]
]);

const result = schema.safeParse({ email: "alex@corp.io", age: 25 });
console.log(result.success); // true`,
    secondaryExample: `// Example 2: Complex Validation with Regex, Custom Messages & MinLength
import { generateZodSchema, FieldConfig } from "antd-dynamic-ui";

const securityFields: FieldConfig[][] = [
  [
    {
      id: "apiKey",
      type: "password",
      validation: {
        required: true,
        minLength: 16,
        pattern: "^sk_live_[a-zA-Z0-9]{24}$",
        customMessage: "API Key must start with 'sk_live_' followed by 24 alphanumeric characters",
      },
    },
  ],
];

const securitySchema = generateZodSchema(securityFields);
const parsed = securitySchema.safeParse({ apiKey: "invalid_key" });
if (!parsed.success) {
  console.log(parsed.error.issues[0].message);
  // "API Key must start with 'sk_live_' followed by 24 alphanumeric characters"
}`,
    advancedExample: `// Example 3: Full React Hook Form Integration with zodResolver
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateZodSchema, InputField, ButtonField } from "antd-dynamic-ui";

const formMatrix = [
  [{ id: "subdomain", type: "text", validation: { required: true, minLength: 3 } }]
];

export default function SubdomainValidator() {
  const zodSchema = generateZodSchema(formMatrix);
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(zodSchema),
    mode: "onBlur",
  });

  return (
    <form onSubmit={handleSubmit((d) => console.log("Validated:", d))}>
      <InputField id="subdomain" control={control} label="Organization Subdomain" />
      <ButtonField type="primary" htmlType="submit">Verify Subdomain</ButtonField>
    </form>
  );
}`
  },

  {
    name: "getInitialValues",
    category: "Form & Validation",
    signature: "getInitialValues(rows: FieldConfig[][]): Record<string, any>",
    description: "Extracts defaultValue and value properties from all field configurations in the matrix, returning a clean dictionary of initial values for React Hook Form.",
    params: [
      { name: "rows", type: "FieldConfig[][]", description: "2D matrix of field configurations." },
    ],
    returns: "Record<string, any>",
    example: `// Example 1: Extract Default Values from Schema Matrix
import { getInitialValues } from "antd-dynamic-ui";

const defaults = getInitialValues([
  [
    { id: "country", type: "country", defaultValue: "US" },
    { id: "notifications", type: "toggle", defaultValue: true },
  ]
]);

console.log(defaults);
// { country: "US", notifications: true }`,
    secondaryExample: `// Example 2: Merging Schema Defaults with Backend Record Overrides
import { getInitialValues } from "antd-dynamic-ui";

const schemaDefaults = getInitialValues(formRows);
const userApiProfile = { country: "DE", customNotes: "VIP Customer" };

// Merge so server values override schema defaults cleanly:
const formInitialValues = { ...schemaDefaults, ...userApiProfile };
console.log(formInitialValues);`
  },

  {
    name: "validatePhoneNumber",
    category: "Form & Validation",
    signature: "validatePhoneNumber(phone: string, countryCode?: string): boolean",
    description: "Validates international phone numbers according to E.164 specifications and regional dial code rules.",
    params: [
      { name: "phone", type: "string", description: "Raw phone number string." },
      { name: "countryCode", type: "string", description: "ISO 2-letter country code (e.g. 'US', 'IN')." },
    ],
    returns: "boolean",
    example: `// Example 1: Direct Validation
import { validatePhoneNumber } from "antd-dynamic-ui";

console.log(validatePhoneNumber("+1 555 019 2834", "US")); // true
console.log(validatePhoneNumber("123", "US")); // false`,
    secondaryExample: `// Example 2: Usage in React Hook Form rules
const phoneRules = {
  validate: (val: string) => validatePhoneNumber(val) || "Please enter a valid international phone number"
};`
  },

  // API & Network
  {
    name: "api",
    category: "API & Network",
    signature: "api: VelocityInstance",
    description: "Pre-configured Velocity HTTP client with automatic response interceptors, JSON deserialization, and token header management. Provides .get(), .post(), .put(), .delete(), and .patch().",
    params: [],
    returns: "VelocityInstance",
    example: `// Example 1: Standard REST GET Query
import { api } from "antd-dynamic-ui";

const response = await api.get("/api/v1/users", {
  params: { status: "active", limit: 20 },
  headers: { "X-Custom-Tenant": "org_452" }
});
console.log(response.data);`,
    secondaryExample: `// Example 2: POST Payload with Automatic JSON Deserialization
import { api } from "antd-dynamic-ui";

try {
  const result = await api.post("/api/v1/orders/checkout", {
    cartId: "cart_8921",
    paymentMethod: "stripe",
  });
  console.log("Invoice created:", result.data.invoiceId);
} catch (err: any) {
  console.error("Checkout failed:", err.message);
}`
  },

  {
    name: "uploadApi",
    category: "API & Network",
    signature: "uploadApi(url: string, file: File | FormData, options?: any): Promise<any>",
    description: "Dedicated multipart/form-data upload utility with upload progress callback support, content-type header injection, and response parsing.",
    params: [
      { name: "url", type: "string", description: "Upload target endpoint URL." },
      { name: "file", type: "File | FormData", description: "Binary file or FormData payload." },
      { name: "options", type: "any", description: "Optional progress tracking callbacks." },
    ],
    returns: "Promise<any>",
    example: `// Example 1: Multipart File Upload with Progress Bar
import { uploadApi } from "antd-dynamic-ui";

const res = await uploadApi("/api/v1/storage/upload", userSelectedFile, {
  onProgress: (percent: number) => {
    console.log(\`Uploaded \${percent}%\`);
  }
});
console.log("File S3 URL:", res.data.fileUrl);`
  },

  // Security
  {
    name: "isSafeUrl",
    category: "Security & Sanitization",
    signature: "isSafeUrl(url?: string): boolean",
    description: "Verifies whether a given URL is safe for navigation or image rendering, blocking XSS attack vectors like 'javascript:', 'data:', or 'vbscript:'.",
    params: [
      { name: "url", type: "string", description: "Target URL string to validate." },
    ],
    returns: "boolean (true if protocol is http, https, mailto, or tel)",
    example: `// Example 1: Blocking XSS Vectors
import { isSafeUrl } from "antd-dynamic-ui";

console.log(isSafeUrl("https://deepmind.google/technologies")); // true
console.log(isSafeUrl("javascript:alert(document.cookie)")); // false
console.log(isSafeUrl("data:text/html;base64,PHNjcmlwdD5...")); // false`,
    secondaryExample: `// Example 2: Sanitizing Table Link Cells Before Navigation
import { isSafeUrl } from "antd-dynamic-ui";

function handleExternalLink(url: string) {
  if (isSafeUrl(url)) {
    window.open(url, "_blank", "noopener,noreferrer");
  } else {
    console.warn("Blocked potentially malicious URL:", url);
  }
}`
  },

  // Formatters & Colors
  {
    name: "adjustColor",
    category: "Formatters & Colors",
    signature: "adjustColor(hex: string, amount: number): string",
    description: "Lightens or darkens a hexadecimal color string by a specified percentage offset for hover, active, and disabled states.",
    params: [
      { name: "hex", type: "string", description: "6-digit hex color string (e.g. '#2563eb')." },
      { name: "amount", type: "number", description: "Percentage to adjust (-100 to 100)." },
    ],
    returns: "string (adjusted hex color)",
    example: `// Example 1: Generating Hover and Background Colors
import { adjustColor } from "antd-dynamic-ui";

const primary = "#2563eb";
const hoverColor = adjustColor(primary, -15); // Darker for hover
const pastelBg = adjustColor(primary, 85);    // Very light tint for card background

console.log({ primary, hoverColor, pastelBg });`,
    secondaryExample: `// Example 2: Dynamic Badge Styling
const statusColor = "#10b981"; // Emerald
const badgeStyle = {
  backgroundColor: adjustColor(statusColor, 80),
  color: adjustColor(statusColor, -20),
  borderColor: adjustColor(statusColor, 40),
};`
  },

  {
    name: "numberToWords",
    category: "Formatters & Colors",
    signature: "numberToWords(num: number): string",
    description: "Converts integer numbers into spoken English word strings, ideal for checks, financial receipts, and invoices.",
    params: [
      { name: "num", type: "number", description: "Number to convert." },
    ],
    returns: "string (e.g. 'One Thousand Two Hundred Fifty')",
    example: `// Example 1: Converting Invoice Totals
import { numberToWords } from "antd-dynamic-ui";

const checkAmount = 14500;
console.log(numberToWords(checkAmount));
// "Fourteen Thousand Five Hundred"`,
    secondaryExample: `// Example 2: Formal Check Printing Text
const invoiceTotal = 3280;
const spelledOut = \`\${numberToWords(invoiceTotal)} Dollars Only\`;
console.log(spelledOut);
// "Three Thousand Two Hundred Eighty Dollars Only"`
  },

  // Type Guards
  {
    name: "isArray",
    category: "Type Guards",
    signature: "isArray(val: unknown): val is any[]",
    description: "Type guard asserting that a value is a valid Array instance.",
    params: [{ name: "val", type: "unknown", description: "Value to inspect." }],
    returns: "val is any[]",
    example: `import { isArray } from "antd-dynamic-ui";

function processPayload(data: unknown) {
  if (isArray(data)) {
    data.forEach((item) => console.log(item));
  }
}`
  },

  {
    name: "isNotEmptyArray",
    category: "Type Guards",
    signature: "isNotEmptyArray<T>(val: unknown): val is NonNullable<T[]>",
    description: "Type guard verifying that a value is an Array containing at least one element.",
    params: [{ name: "val", type: "unknown", description: "Value to inspect." }],
    returns: "val is NonNullable<T[]>",
    example: `import { isNotEmptyArray } from "antd-dynamic-ui";

if (isNotEmptyArray(apiRows)) {
  renderTable(apiRows); // TypeScript knows apiRows.length > 0
}`
  },

  {
    name: "isObject",
    category: "Type Guards",
    signature: "isObject(val: unknown): val is Record<string, any>",
    description: "Type guard asserting that a value is a non-null, non-array JavaScript object.",
    params: [{ name: "val", type: "unknown", description: "Value to inspect." }],
    returns: "val is Record<string, any>",
    example: `import { isObject } from "antd-dynamic-ui";

if (isObject(config)) {
  console.log(Object.keys(config));
}`
  },

  {
    name: "isNotEmptyObject",
    category: "Type Guards",
    signature: "isNotEmptyObject<T extends object>(val: unknown): val is NonNullable<T>",
    description: "Type guard verifying that a value is a plain object with at least one enumerable key.",
    params: [{ name: "val", type: "unknown", description: "Value to inspect." }],
    returns: "val is NonNullable<T>",
    example: `import { isNotEmptyObject } from "antd-dynamic-ui";

if (isNotEmptyObject(searchFilters)) {
  applyFiltersToQuery(searchFilters);
}`
  },

  {
    name: "isString",
    category: "Type Guards",
    signature: "isString(val: unknown): val is string",
    description: "Type guard asserting that a value is of primitive type string.",
    params: [{ name: "val", type: "unknown", description: "Value to inspect." }],
    returns: "val is string",
    example: `import { isString } from "antd-dynamic-ui";

if (isString(rawTitle)) {
  console.log(rawTitle.trim().toUpperCase());
}`
  },

  {
    name: "isNumber",
    category: "Type Guards",
    signature: "isNumber(val: unknown): val is number",
    description: "Type guard asserting that a value is a valid finite number (excluding NaN).",
    params: [{ name: "val", type: "unknown", description: "Value to inspect." }],
    returns: "val is number",
    example: `import { isNumber } from "antd-dynamic-ui";

if (isNumber(discountRate)) {
  console.log(\`Discount: \${(discountRate * 100).toFixed(1)}%\`);
}`
  },

  {
    name: "isNotEmpty",
    category: "Type Guards",
    signature: "isNotEmpty(val: unknown): boolean",
    description: "Checks whether a value is non-null, non-undefined, and not an empty string, array, or object.",
    params: [{ name: "val", type: "unknown", description: "Value to inspect." }],
    returns: "boolean",
    example: `import { isNotEmpty } from "antd-dynamic-ui";

if (isNotEmpty(formData.postalCode)) {
  dispatchShipping(formData);
}`
  }
];
