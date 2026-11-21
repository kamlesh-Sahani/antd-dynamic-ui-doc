import { COMPONENTS_DATA } from "@/data/componentsData";
import { HOOKS_DATA } from "@/data/hooksData";
import { UTILS_DATA } from "@/data/utilsData";

export async function GET() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://antd-dynamic-ui-doc.vercel.app";

  const coreComponents = Object.values(COMPONENTS_DATA).filter(
    (c) => c.category === "Core Dynamic Components"
  );
  const formFields = Object.values(COMPONENTS_DATA).filter(
    (c) => c.category === "Standard Form Fields"
  );
  const otherComponents = Object.values(COMPONENTS_DATA).filter(
    (c) =>
      c.category !== "Core Dynamic Components" &&
      c.category !== "Standard Form Fields"
  );

  const lines: string[] = [
    `# antd-dynamic-ui`,
    ``,
    `> High-performance, declarative JSON schema-driven UI framework for Ant Design 5.x, React 18/19, and Next.js 15.`,
    ``,
    `antd-dynamic-ui eliminates boilerplate by allowing engineering teams to render enterprise data tables, complex forms, modals, drawers, and dashboards directly from clean, type-safe JSON schemas. Features adaptive 60fps virtualization, automated Zod validation, and zero layout thrashing.`,
    ``,
    `## Quick Installation`,
    ``,
    `\`\`\`bash`,
    `npm install antd-dynamic-ui antd @ant-design/icons react-hook-form zod`,
    `\`\`\``,
    ``,
    `## Next.js 15 / React 19 Setup`,
    ``,
    `In your root \`layout.tsx\`, wrap the app with \`@ant-design/nextjs-registry\` to prevent hydration mismatches:`,
    ``,
    `\`\`\`tsx`,
    `import { AntdRegistry } from "@ant-design/nextjs-registry";`,
    ``,
    `export default function RootLayout({ children }: { children: React.ReactNode }) {`,
    `  return (`,
    `    <html lang="en">`,
    `      <body>`,
    `        <AntdRegistry>{children}</AntdRegistry>`,
    `      </body>`,
    `    </html>`,
    `  );`,
    `}`,
    `\`\`\``,
    ``,
    `## Full Uncompressed LLM Reference`,
    ``,
    `- [Complete API & Props Reference](${baseUrl}/llms-full.txt): Single-file plain markdown documentation containing every prop, TypeScript interface, and working example.`,
    ``,
    `## Core Dynamic Components`,
    ``,
    ...coreComponents.map(
      (c) =>
        `- [${c.title}](${baseUrl}/docs/components/${c.slug}): ${c.summary}`
    ),
    ``,
    `## Standard Form Fields (22+ Controls)`,
    ``,
    ...formFields.map(
      (c) =>
        `- [${c.title}](${baseUrl}/docs/components/${c.slug}): ${c.summary}`
    ),
    ``,
    `## Feedback & Advanced Components`,
    ``,
    ...otherComponents.map(
      (c) =>
        `- [${c.title}](${baseUrl}/docs/components/${c.slug}): ${c.summary}`
    ),
    ``,
    `## Custom Reactive Hooks`,
    ``,
    ...Object.values(HOOKS_DATA).map(
      (h) => `- [${h.title}](${baseUrl}/docs/hooks/${h.slug}): ${h.summary}`
    ),
    ``,
    `## Pure Utility Functions`,
    ``,
    `- [All Utilities Reference](${baseUrl}/docs/utils): Comprehensive reference for 15+ pure utility functions including \`generateZodSchema\`, \`isSafeUrl\`, and \`adjustColor\`.`,
    ...UTILS_DATA.map(
      (u) =>
        `  - **${u.name}**: \`${u.signature}\` - ${u.description.slice(0, 100)}...`
    ),
    ``,
    `## Architecture & Schema Conventions`,
    ``,
    `- **DynamicTable Schemas**: Define \`apiData\` with \`apiUrl\`, \`apiType\`, and an optional \`filterKey\` linked to Zustand state. Virtual scrolling triggers automatically when rows exceed 50.`,
    `- **DynamicForm Schemas**: Organized as a 2D array of \`FieldConfig[][]\` (rows and columns) with automated Zod validation inferred via \`generateZodSchema\`.`,
    `- **Tree-Shakeable ESM**: Import components directly: \`import { DynamicTable, DynamicForm } from "antd-dynamic-ui";\`.`,
    ``,
    `## Canonical Documentation`,
    ``,
    `- Website: ${baseUrl}`,
    `- GitHub: https://github.com/kamlesh-Sahani/antd-dynamic-ui`,
    `- Documentation Repository: https://github.com/kamlesh-Sahani/antd-dynamic-ui-doc`,
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
