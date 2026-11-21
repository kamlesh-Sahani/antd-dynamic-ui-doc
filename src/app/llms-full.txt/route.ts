import { COMPONENTS_DATA } from "@/data/componentsData";
import { HOOKS_DATA } from "@/data/hooksData";
import { UTILS_DATA } from "@/data/utilsData";

export async function GET() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://antd-dynamic-ui.vercel.app";

  const lines: string[] = [
    `# antd-dynamic-ui - Complete Technical Reference for AI Agents & LLMs`,
    ``,
    `> Package: antd-dynamic-ui`,
    `> Version: 1.0.0`,
    `> Target: React 18/19, Next.js 15, Ant Design 5.x`,
    `> License: MIT`,
    `> Repository: https://github.com/kamlesh-Sahani/antd-dynamic-ui`,
    `> Canonical Docs: ${baseUrl}`,
    ``,
    `---`,
    ``,
    `## Installation`,
    ``,
    `\`\`\`bash`,
    `npm install antd-dynamic-ui antd @ant-design/icons react-hook-form zod`,
    `\`\`\``,
    ``,
    `---`,
    ``,
    `# PART 1: CORE DYNAMIC COMPONENTS & FORM CONTROLS`,
    ``,
  ];

  // Iterate over all components
  for (const component of Object.values(COMPONENTS_DATA)) {
    lines.push(`## Component: ${component.title}`);
    lines.push(``);
    lines.push(`- **Category**: ${component.category}`);
    if (component.badge) lines.push(`- **Badge**: ${component.badge}`);
    lines.push(`- **Documentation URL**: ${baseUrl}/docs/components/${component.slug}`);
    lines.push(`- **Summary**: ${component.summary}`);
    lines.push(``);
    lines.push(`### Description`);
    lines.push(component.description);
    lines.push(``);

    if (component.features && component.features.length > 0) {
      lines.push(`### Key Features`);
      for (const feat of component.features) {
        lines.push(`- ${feat}`);
      }
      lines.push(``);
    }

    if (component.props && component.props.length > 0) {
      lines.push(`### Props Specification`);
      lines.push(`| Prop Name | Type | Required | Default | Description |`);
      lines.push(`| :--- | :--- | :--- | :--- | :--- |`);
      for (const p of component.props) {
        lines.push(
          `| \`${p.name}\` | \`${p.type.replace(/\|/g, "\\|")}\` | ${p.required ? "**Yes**" : "No"} | ${p.default ? `\`${p.default}\`` : "-"} | ${p.description.replace(/\n/g, " ")} |`
        );
      }
      lines.push(``);
    }

    if (component.examples && component.examples.length > 0) {
      lines.push(`### Code Examples`);
      for (let i = 0; i < component.examples.length; i++) {
        const ex = component.examples[i];
        lines.push(`#### Example ${i + 1}: ${ex.title}`);
        if (ex.description) lines.push(ex.description);
        lines.push(``);
        lines.push(`\`\`\`${ex.language || "tsx"}`);
        lines.push(ex.code.trim());
        lines.push(`\`\`\``);
        lines.push(``);
      }
    } else if (component.code) {
      lines.push(`### Primary Code Example`);
      lines.push(``);
      lines.push(`\`\`\`tsx`);
      lines.push(component.code.trim());
      lines.push(`\`\`\``);
      lines.push(``);
    }

    if (component.schema) {
      lines.push(`### Expected Backend Schema`);
      lines.push(``);
      lines.push(`\`\`\`json`);
      lines.push(
        typeof component.schema === "string"
          ? component.schema.trim()
          : JSON.stringify(component.schema, null, 2)
      );
      lines.push(`\`\`\``);
      lines.push(``);
    }

    lines.push(`---`);
    lines.push(``);
  }

  lines.push(`# PART 2: CUSTOM REACTIVE HOOKS`);
  lines.push(``);

  for (const hook of Object.values(HOOKS_DATA)) {
    lines.push(`## Hook: ${hook.title}`);
    lines.push(``);
    lines.push(`- **Documentation URL**: ${baseUrl}/docs/hooks/${hook.slug}`);
    lines.push(`- **Summary**: ${hook.summary}`);
    lines.push(``);
    lines.push(`### Description`);
    lines.push(hook.description);
    lines.push(``);

    if (hook.features && hook.features.length > 0) {
      lines.push(`### Key Capabilities`);
      for (const f of hook.features) {
        lines.push(`- ${f}`);
      }
      lines.push(``);
    }

    if (hook.params && hook.params.length > 0) {
      lines.push(`### Hook Parameters`);
      lines.push(`| Parameter | Type | Required | Default | Description |`);
      lines.push(`| :--- | :--- | :--- | :--- | :--- |`);
      for (const p of hook.params) {
        lines.push(
          `| \`${p.name}\` | \`${p.type.replace(/\|/g, "\\|")}\` | ${p.required ? "**Yes**" : "No"} | ${p.default ? `\`${p.default}\`` : "-"} | ${p.description.replace(/\n/g, " ")} |`
        );
      }
      lines.push(``);
    }

    if (hook.returns && hook.returns.length > 0) {
      lines.push(`### Hook Return Value`);
      lines.push(`| Return Field | Type | Description |`);
      lines.push(`| :--- | :--- | :--- |`);
      for (const r of hook.returns) {
        lines.push(
          `| \`${r.name}\` | \`${r.type.replace(/\|/g, "\\|")}\` | ${r.description.replace(/\n/g, " ")} |`
        );
      }
      lines.push(``);
    }

    if (hook.examples && hook.examples.length > 0) {
      lines.push(`### Examples`);
      for (let i = 0; i < hook.examples.length; i++) {
        const ex = hook.examples[i];
        lines.push(`#### Example ${i + 1}: ${ex.title}`);
        if (ex.description) lines.push(ex.description);
        lines.push(``);
        lines.push(`\`\`\`${ex.language || "tsx"}`);
        lines.push(ex.code.trim());
        lines.push(`\`\`\``);
        lines.push(``);
      }
    } else if (hook.code) {
      lines.push(`### Primary Code Example`);
      lines.push(``);
      lines.push(`\`\`\`tsx`);
      lines.push(hook.code.trim());
      lines.push(`\`\`\``);
      lines.push(``);
    }

    lines.push(`---`);
    lines.push(``);
  }

  lines.push(`# PART 3: PURE UTILITY FUNCTIONS`);
  lines.push(``);

  for (const util of UTILS_DATA) {
    lines.push(`## Utility: ${util.name}`);
    lines.push(``);
    lines.push(`- **Category**: ${util.category}`);
    lines.push(`- **Signature**: \`${util.signature}\``);
    lines.push(`- **Returns**: \`${util.returns}\``);
    lines.push(`- **Description**: ${util.description}`);
    lines.push(``);

    if (util.params && util.params.length > 0) {
      lines.push(`### Parameters`);
      lines.push(`| Parameter | Type | Description |`);
      lines.push(`| :--- | :--- | :--- |`);
      for (const p of util.params) {
        lines.push(`| \`${p.name}\` | \`${p.type}\` | ${p.description} |`);
      }
      lines.push(``);
    }

    lines.push(`### Usage Example`);
    lines.push(``);
    lines.push(`\`\`\`ts`);
    lines.push(util.example.trim());
    lines.push(`\`\`\``);
    lines.push(``);

    if (util.secondaryExample) {
      lines.push(`### Advanced Example`);
      lines.push(``);
      lines.push(`\`\`\`ts`);
      lines.push(util.secondaryExample.trim());
      lines.push(`\`\`\``);
      lines.push(``);
    }

    lines.push(`---`);
    lines.push(``);
  }

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
