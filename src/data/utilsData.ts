export interface UtilItem {
  name: string;
  category: "Form & Validation" | "API & Network" | "Security & Sanitization" | "Formatters & Colors" | "Type Guards";
  signature: string;
  description: string;
  params: { name: string; type: string; description: string }[];
  returns: string;
  example: string;
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
    example: `import { generateZodSchema } from "antd-dynamic-ui";

const schema = generateZodSchema([
  [
    { id: "email", type: "email", validation: { required: true } },
    { id: "age", type: "number", validation: { min: 18 } },
  ]
]);

const result = schema.safeParse({ email: "invalid", age: 16 });
console.log(result.success); // false`,
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
    example: `import { getInitialValues } from "antd-dynamic-ui";

const defaults = getInitialValues([
  [{ id: "country", type: "country", defaultValue: "US" }]
]);
console.log(defaults); // { country: "US" }`,
  },

  // API & Network
  {
    name: "api",
    category: "API & Network",
    signature: "api: VelocityInstance",
    description: "Pre-configured Velocity HTTP client with automatic response interceptors, JSON deserialization, and token header management. Provides .get(), .post(), .put(), .delete(), and .patch().",
    params: [],
    returns: "VelocityInstance",
    example: `import { api } from "antd-dynamic-ui";

const response = await api.get("/api/v1/users", {
  params: { limit: 10 }
});
console.log(response.data);`,
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
    example: `import { uploadApi } from "antd-dynamic-ui";

const res = await uploadApi("/api/upload", myFile, {
  onProgress: (percent) => console.log(\`Uploaded \${percent}%\`)
});`,
  },

  // Security
  {
    name: "isSafeUrl",
    category: "Security & Sanitization",
    signature: "isSafeUrl(url: string): boolean",
    description: "Verifies whether a given URL is safe for navigation or image rendering, blocking XSS attack vectors like 'javascript:', 'data:', or 'vbscript:'.",
    params: [
      { name: "url", type: "string", description: "Target URL string to validate." },
    ],
    returns: "boolean (true if protocol is http, https, mailto, or tel)",
    example: `import { isSafeUrl } from "antd-dynamic-ui";

console.log(isSafeUrl("https://corp.io")); // true
console.log(isSafeUrl("javascript:alert(1)")); // false`,
  },

  // Formatting & Colors
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
    example: `import { adjustColor } from "antd-dynamic-ui";

const darkerBlue = adjustColor("#2563eb", -20);
console.log(darkerBlue); // "#1e4fb6"`,
  },
  {
    name: "numberToWords",
    category: "Formatters & Colors",
    signature: "numberToWords(num: number): string",
    description: "Converts integer numbers into spoken English word strings, ideal for checks, financial receipts, and invoices.",
    params: [
      { name: "num", type: "number", description: "Number to convert." },
    ],
    returns: "string (e.g. 'One Thousand Two Hundred')",
    example: `import { numberToWords } from "antd-dynamic-ui";

console.log(numberToWords(1250)); // "One Thousand Two Hundred Fifty"`,
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

if (isArray(data)) {
  console.log(data.length);
}`,
  },
  {
    name: "isString",
    category: "Type Guards",
    signature: "isString(val: unknown): val is string",
    description: "Type guard asserting that a value is of primitive type string.",
    params: [{ name: "val", type: "unknown", description: "Value to inspect." }],
    returns: "val is string",
    example: `import { isString } from "antd-dynamic-ui";

if (isString(val)) {
  console.log(val.toUpperCase());
}`,
  },
  {
    name: "isNumber",
    category: "Type Guards",
    signature: "isNumber(val: unknown): val is number",
    description: "Type guard asserting that a value is a valid finite number (excluding NaN).",
    params: [{ name: "val", type: "unknown", description: "Value to inspect." }],
    returns: "val is number",
    example: `import { isNumber } from "antd-dynamic-ui";

if (isNumber(val)) {
  console.log(val.toFixed(2));
}`,
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
}`,
  },
  {
    name: "isFunction",
    category: "Type Guards",
    signature: "isFunction(val: unknown): val is Function",
    description: "Type guard asserting that a value is a callable JavaScript Function.",
    params: [{ name: "val", type: "unknown", description: "Value to inspect." }],
    returns: "val is Function",
    example: `import { isFunction } from "antd-dynamic-ui";

if (isFunction(callback)) {
  callback();
}`,
  },
  {
    name: "isUndefined",
    category: "Type Guards",
    signature: "isUndefined(val: unknown): val is undefined",
    description: "Type guard asserting that a value is strictly undefined.",
    params: [{ name: "val", type: "unknown", description: "Value to inspect." }],
    returns: "val is undefined",
    example: `import { isUndefined } from "antd-dynamic-ui";

if (isUndefined(val)) {
  val = fallbackDefault;
}`,
  },
  {
    name: "isNotEmpty",
    category: "Type Guards",
    signature: "isNotEmpty(val: unknown): boolean",
    description: "Checks whether a value is non-null, non-undefined, and not an empty string, array, or object.",
    params: [{ name: "val", type: "unknown", description: "Value to inspect." }],
    returns: "boolean",
    example: `import { isNotEmpty } from "antd-dynamic-ui";

if (isNotEmpty(userInput)) {
  submitData(userInput);
}`,
  },
  {
    name: "isNotEmptyArray",
    category: "Type Guards",
    signature: "isNotEmptyArray(val: unknown): val is any[]",
    description: "Type guard verifying that a value is an Array containing at least one element.",
    params: [{ name: "val", type: "unknown", description: "Value to inspect." }],
    returns: "val is any[]",
    example: `import { isNotEmptyArray } from "antd-dynamic-ui";

if (isNotEmptyArray(rows)) {
  renderTable(rows);
}`,
  },
  {
    name: "isNotEmptyObject",
    category: "Type Guards",
    signature: "isNotEmptyObject(val: unknown): val is Record<string, any>",
    description: "Type guard verifying that a value is a plain object with at least one enumerable key.",
    params: [{ name: "val", type: "unknown", description: "Value to inspect." }],
    returns: "val is Record<string, any>",
    example: `import { isNotEmptyObject } from "antd-dynamic-ui";

if (isNotEmptyObject(filters)) {
  applyFilters(filters);
}`,
  },
];
