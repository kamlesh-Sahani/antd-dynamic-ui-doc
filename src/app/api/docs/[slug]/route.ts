import { NextRequest } from "next/server";
import { COMPONENTS_DATA } from "@/data/componentsData";
import { HOOKS_DATA } from "@/data/hooksData";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://antd-dynamic-ui.vercel.app";

  const component = COMPONENTS_DATA[slug];
  if (component) {
    const lines: string[] = [
      `# ${component.title}`,
      ``,
      `> Category: ${component.category}`,
      `> URL: ${baseUrl}/docs/components/${slug}`,
      ``,
      `## Summary`,
      component.summary,
      ``,
      `## Description`,
      component.description,
      ``,
      `## Features`,
      ...(component.features || []).map((f) => `- ${f}`),
      ``,
      `## Props`,
      `| Name | Type | Required | Default | Description |`,
      `| :--- | :--- | :--- | :--- | :--- |`,
      ...(component.props || []).map(
        (p) =>
          `| \`${p.name}\` | \`${p.type.replace(/\|/g, "\\|")}\` | ${p.required ? "Yes" : "No"} | ${p.default || "-"} | ${p.description.replace(/\n/g, " ")} |`
      ),
      ``,
      `## Examples`,
      ...(component.examples || []).flatMap((e, i) => [
        `### Example ${i + 1}: ${e.title}`,
        e.description || "",
        `\`\`\`${e.language || "tsx"}`,
        e.code.trim(),
        `\`\`\``,
        ``,
      ]),
    ];

    if (component.schema) {
      lines.push(
        `## Expected Schema`,
        `\`\`\`json`,
        typeof component.schema === "string"
          ? component.schema.trim()
          : JSON.stringify(component.schema, null, 2),
        `\`\`\``
      );
    }

    return new Response(lines.join("\n"), {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    });
  }

  const hook = HOOKS_DATA[slug];
  if (hook) {
    const lines: string[] = [
      `# ${hook.title}`,
      ``,
      `> Custom Reactive Hook`,
      `> URL: ${baseUrl}/docs/hooks/${slug}`,
      ``,
      `## Summary`,
      hook.summary,
      ``,
      `## Description`,
      hook.description,
      ``,
      `## Features`,
      ...(hook.features || []).map((f) => `- ${f}`),
      ``,
      `## Parameters`,
      `| Name | Type | Required | Default | Description |`,
      `| :--- | :--- | :--- | :--- | :--- |`,
      ...(hook.params || []).map(
        (p) =>
          `| \`${p.name}\` | \`${p.type.replace(/\|/g, "\\|")}\` | ${p.required ? "Yes" : "No"} | ${p.default || "-"} | ${p.description.replace(/\n/g, " ")} |`
      ),
      ``,
      `## Return Values`,
      `| Name | Type | Description |`,
      `| :--- | :--- | :--- |`,
      ...(hook.returns || []).map(
        (r) =>
          `| \`${r.name}\` | \`${r.type.replace(/\|/g, "\\|")}\` | ${r.description.replace(/\n/g, " ")} |`
      ),
      ``,
      `## Examples`,
      ...(hook.examples || []).flatMap((e, i) => [
        `### Example ${i + 1}: ${e.title}`,
        e.description || "",
        `\`\`\`${e.language || "tsx"}`,
        e.code.trim(),
        `\`\`\``,
        ``,
      ]),
    ];

    return new Response(lines.join("\n"), {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    });
  }

  return new Response("Documentation slug not found", { status: 404 });
}
