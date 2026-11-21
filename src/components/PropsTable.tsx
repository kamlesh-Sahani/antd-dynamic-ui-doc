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
    return <p className="text-sm text-[#785c4b] py-4 italic">No specific props required.</p>;
  }

  return (
    <div className="overflow-x-auto my-6 border border-[#ede5d8] rounded-xl bg-white shadow-[0_1px_4px_rgba(54,33,23,0.04)]">
      <table className="w-full text-left text-sm border-collapse">
        <thead>
          <tr className="border-b border-[#ede5d8] bg-[#f7f2ea]">
            <th className="py-3 px-4 font-bold text-[#362117]">Property</th>
            <th className="py-3 px-4 font-bold text-[#362117]">Type</th>
            <th className="py-3 px-4 font-bold text-[#362117]">Default</th>
            <th className="py-3 px-4 font-bold text-[#362117]">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#ede5d8]">
          {props.map((prop, idx) => (
            <tr
              key={idx}
              className="hover:bg-[#fcfaf7] transition-colors"
            >
              <td className="py-3 px-4 font-mono font-bold text-[#362117] whitespace-nowrap">
                {prop.name}
                {prop.required && (
                  <span className="ml-2 text-[10px] font-sans font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#feeae6] text-[#c4432b] border border-[#fcd3cb]">
                    Required
                  </span>
                )}
              </td>
              <td className="py-3 px-4 font-mono text-xs text-[#785c4b] break-all">
                <span className="px-1.5 py-0.5 rounded bg-[#f5eee3] border border-[#e8ded0]">
                  {prop.type}
                </span>
              </td>
              <td className="py-3 px-4 font-mono text-xs text-[#8a7566]">
                {prop.default || "—"}
              </td>
              <td className="py-3 px-4 text-[#5c4738] leading-relaxed">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
