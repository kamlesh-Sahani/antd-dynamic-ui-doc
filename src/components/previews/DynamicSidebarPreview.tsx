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
          className="text-xs px-3 py-1.5 rounded-xl bg-[#f2ebde] hover:bg-[#ede5d8] text-[#362117] border border-[#ede5d8] flex items-center gap-1.5 cursor-pointer font-bold shadow-xs transition-colors"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          <span>{collapsed ? "Expand Sidebar" : "Collapse Sidebar"}</span>
        </button>
      </div>

      <div className="border border-[#ede5d8] rounded-2xl overflow-hidden bg-[#fbf8f2] flex h-80 shadow-xs">
        {/* Sidebar */}
        <div
          className={`border-r border-[#ede5d8] bg-white p-3.5 flex flex-col justify-between transition-all duration-300 ${
            collapsed ? "w-16" : "w-60"
          }`}
        >
          <div className="space-y-1.5">
            <div className="px-2 py-1.5 mb-1 font-bold text-xs text-[#785c4b] uppercase tracking-wider">
              {!collapsed && "Platform Navigation"}
            </div>

            {mockNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeKey === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveKey(item.key)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                    isActive
                      ? "bg-[#f2ebde] text-[#362117] font-bold border border-[#ede5d8] shadow-xs"
                      : "text-[#5c4738] hover:bg-[#f5eee3] hover:text-[#362117]"
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon size={16} className={`shrink-0 ${isActive ? "text-[#c4432b]" : "text-[#785c4b]"}`} />
                  {!collapsed && (
                    <div className="flex-1 flex items-center justify-between">
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#fdeee9] text-[#c4432b] font-bold border border-[#fbdcd5]">
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
            <div className="p-2 border-t border-[#ede5d8] text-[11px] text-[#8a7566] font-medium">
              Logged in as <span className="font-semibold text-[#362117]">admin@corp.io</span>
            </div>
          )}
        </div>

        {/* Mock Content */}
        <div className="flex-1 p-6 flex flex-col items-center justify-center text-center bg-[#fbf8f2]">
          <div className="text-base font-bold text-[#362117]">
            Active Route: <span className="font-mono text-[#c4432b]">/{activeKey}</span>
          </div>
          <p className="text-xs text-[#5c4738] mt-2 max-w-sm leading-relaxed">
            DynamicSideBar handles hierarchical routing, permission-based filtering, and smooth collapse transitions.
          </p>
        </div>
      </div>
    </div>
  );
}
