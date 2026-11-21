"use client";

import React from "react";
import { Tag, Badge } from "antd";

const sampleCards = [
  {
    title: "Project Alpha (Mobile Client)",
    status: "active",
    info: [
      { key: "Lead", value: "Alexander Wright" },
      { key: "Progress", value: "85% Complete" },
      { key: "Budget", value: "$45,000 USD" },
      { key: "Deadline", value: "Dec 31, 2026" },
    ],
  },
  {
    title: "Authentication Service v2",
    status: "pending",
    info: [
      { key: "Lead", value: "Sophia Martinez" },
      { key: "Progress", value: "40% Complete" },
      { key: "Budget", value: "$18,500 USD" },
      { key: "Deadline", value: "Jan 15, 2027" },
    ],
  },
  {
    title: "Cloud Infrastructure Migration",
    status: "active",
    info: [
      { key: "Lead", value: "Marcus Chen" },
      { key: "Progress", value: "92% Complete" },
      { key: "Budget", value: "$72,000 USD" },
      { key: "Deadline", value: "Nov 30, 2026" },
    ],
  },
];

export default function DynamicCardPreview() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-zinc-500 bg-zinc-100 dark:bg-zinc-800/60 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800">
        <span>Infinite Scroll Card Grid Presentation</span>
        <span className="font-mono">3 Sample Entities</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sampleCards.map((card, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs hover:border-blue-500/50 transition-all flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 leading-snug">
                  {card.title}
                </h4>
                <Tag color={card.status === "active" ? "green" : "gold"}>
                  {card.status.toUpperCase()}
                </Tag>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
                {card.info.map((item, i) => (
                  <div key={i} className="flex justify-between text-xs">
                    <span className="text-zinc-500">{item.key}:</span>
                    <span className="font-medium text-zinc-800 dark:text-zinc-200">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-[11px] text-blue-600 dark:text-blue-400 font-medium pt-2">
              Click to view details →
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
