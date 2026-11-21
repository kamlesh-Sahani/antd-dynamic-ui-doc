"use client";

import React, { useState } from "react";
import { LayoutDashboard, Users, ShoppingCart, Settings, ShieldAlert, ChevronLeft, ChevronRight } from "lucide-react";

const mockNavItems = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard, badge: "New" },
  { key: "users", label: "Users & Teams", icon: Users },
  { key: "orders", label: "Orders & Sales", icon: ShoppingCart, badge: "12" },
  { key: "security", label: "Security & Audit", icon: ShieldAlert },
  { key: "settings", label: "System Settings", icon: Settings },
];

export default function DynamicSidebarPreview() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeKey, setActiveKey] = useState("dashboard");

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-xs px-2.5 py-1 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center gap-1 cursor-pointer"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          <span>{collapsed ? "Expand Sidebar" : "Collapse Sidebar"}</span>
        </button>
      </div>

      <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-zinc-50 dark:bg-zinc-950 flex h-72">
        {/* Sidebar */}
        <div
          className={`border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3 flex flex-col justify-between transition-all duration-300 ${
            collapsed ? "w-16" : "w-56"
          }`}
        >
          <div className="space-y-1">
            <div className="px-2 py-2 mb-2 font-bold text-xs text-zinc-400 uppercase tracking-wider">
              {!collapsed && "Platform Navigation"}
            </div>

            {mockNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeKey === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveKey(item.key)}
                  className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon size={16} className="shrink-0" />
                  {!collapsed && (
                    <div className="flex-1 flex items-center justify-between">
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-semibold">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {!collapsed && (
            <div className="p-2 border-t border-zinc-100 dark:border-zinc-800 text-[11px] text-zinc-400">
              Logged in as admin@corp.io
            </div>
          )}
        </div>

        {/* Mock Content */}
        <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
          <div className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
            Active Route: /{activeKey}
          </div>
          <p className="text-xs text-zinc-500 mt-1">
            DynamicSideBar handles hierarchical routing, permission-based filtering, and smooth collapse transitions.
          </p>
        </div>
      </div>
    </div>
  );
}
