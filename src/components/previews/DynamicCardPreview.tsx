"use client";

import React, { useState } from "react";
import { Tag, message, Button } from "antd";
import { Sparkles, Layers, CheckCircle2 } from "lucide-react";

const sampleCards = [
  {
    id: "alpha",
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
    id: "auth",
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
    id: "cloud",
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

export default function DynamicCardPreview({ exampleIndex = 0 }: { exampleIndex?: number }) {
  const [cards, setCards] = useState(sampleCards);

  if (exampleIndex === 1) {
    // Example 2: Complete Props with Action Triggers & Interactive Badges
    return (
      <div className="w-full space-y-4">
        <div className="flex items-center justify-between text-xs px-1 text-[#785c4b]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#437a3b]" />
            <span className="font-bold text-[#362117]">Interactive Action Cards</span>
            <span className="text-[#8a7566] hidden sm:inline">— Interactive status toggles and card actions</span>
          </div>
          <span className="font-mono text-[#8a7566] text-[11px]">{cards.length} entities</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card) => (
            <div
              key={card.id}
              className="p-5 rounded-2xl border border-[#ede5d8] bg-white shadow-xs hover:border-[#e05d44] transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-bold text-sm text-[#362117] leading-snug">
                    {card.title}
                  </h4>
                  <Tag
                    color={card.status === "active" ? "green" : "gold"}
                    className="cursor-pointer"
                    onClick={() => {
                      setCards((prev) =>
                        prev.map((c) =>
                          c.id === card.id
                            ? { ...c, status: c.status === "active" ? "pending" : "active" }
                            : c
                        )
                      );
                      message.info(`Toggled status for ${card.title}`);
                    }}
                  >
                    {card.status.toUpperCase()}
                  </Tag>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-[#ede5d8]">
                  {card.info.map((item, i) => (
                    <div key={i} className="flex justify-between text-xs">
                      <span className="text-[#785c4b]">{item.key}:</span>
                      <span className="font-semibold text-[#362117]">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#f5eee3]">
                <button
                  onClick={() => message.success(`Inspecting ${card.title}`)}
                  className="text-xs font-bold text-[#c4432b] hover:underline cursor-pointer"
                >
                  View Details →
                </button>
                <button
                  onClick={() => {
                    setCards((prev) => prev.filter((c) => c.id !== card.id));
                    message.success(`Archived ${card.title}`);
                  }}
                  className="text-[11px] font-bold text-[#785c4b] hover:text-[#c4432b] cursor-pointer"
                >
                  Archive
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Example 0: Basic Responsive Card Grid
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between text-xs px-1 text-[#785c4b]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#437a3b]" />
          <span className="font-bold text-[#362117]">Infinite Scroll Card Grid</span>
        </div>
        <span className="font-mono text-[#8a7566] text-[11px]">3 sample entities</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sampleCards.map((card, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-[#ede5d8] bg-white shadow-xs hover:border-[#e05d44]/50 transition-all flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="font-bold text-sm text-[#362117] leading-snug">
                  {card.title}
                </h4>
                <Tag color={card.status === "active" ? "green" : "gold"}>
                  {card.status.toUpperCase()}
                </Tag>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-[#ede5d8]">
                {card.info.map((item, i) => (
                  <div key={i} className="flex justify-between text-xs">
                    <span className="text-[#785c4b]">{item.key}:</span>
                    <span className="font-semibold text-[#362117]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-[11px] text-[#c4432b] font-bold pt-2">
              Click to view details →
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
