"use client";

import React from "react";

export interface PropItem {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

export interface PropsTableProps {
  props: PropItem[];
}

export default function PropsTable({ props }: PropsTableProps) {
  if (!props || props.length === 0) {
    return <p className="text-sm text-zinc-500 py-4 italic">No specific props required.</p>;
  }

  return (
    <div className="overflow-x-auto my-6 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xs">
      <table className="w-full text-left text-sm border-collapse">
        <thead>
          <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/50">
            <th className="py-3 px-4 font-semibold text-zinc-900 dark:text-zinc-100">Property</th>
            <th className="py-3 px-4 font-semibold text-zinc-900 dark:text-zinc-100">Type</th>
            <th className="py-3 px-4 font-semibold text-zinc-900 dark:text-zinc-100">Default</th>
            <th className="py-3 px-4 font-semibold text-zinc-900 dark:text-zinc-100">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {props.map((prop, idx) => (
            <tr
              key={idx}
              className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors"
            >
              <td className="py-3 px-4 font-mono font-medium text-blue-600 dark:text-blue-400 whitespace-nowrap">
                {prop.name}
                {prop.required && (
                  <span className="ml-1.5 text-[10px] font-sans font-semibold uppercase px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400">
                    Required
                  </span>
                )}
              </td>
              <td className="py-3 px-4 font-mono text-xs text-amber-700 dark:text-amber-400 break-all">
                {prop.type}
              </td>
              <td className="py-3 px-4 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                {prop.default || "—"}
              </td>
              <td className="py-3 px-4 text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
