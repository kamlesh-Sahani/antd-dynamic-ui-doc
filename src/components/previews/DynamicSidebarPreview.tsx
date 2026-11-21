"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Settings,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Layers,
} from "lucide-react";
import { Modal, message, Select } from "antd";

const mockNavItems = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard, badge: "New" },
  { key: "users", label: "Users & Teams", icon: Users },
  { key: "orders", label: "Orders & Sales", icon: ShoppingCart, badge: "12" },
  { key: "security", label: "Security & Audit", icon: ShieldAlert },
  { key: "settings", label: "System Settings", icon: Settings },
];

export default function DynamicSidebarPreview({ exampleIndex = 0 }: { exampleIndex?: number }) {
  const [collapsed, setCollapsed] = useState(false);
  const [activeKey, setActiveKey] = useState("dashboard");
  const [activeModule, setActiveModule] = useState("sales");

  if (exampleIndex === 1) {
    // Example 2: Complete Enterprise Sidebar with Module Switcher & User Profile
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-[#f5eee3] rounded-xl border border-[#ede5d8]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#362117]">Active Workspace Module:</span>
            <Select
              value={activeModule}
              onChange={(val) => {
                setActiveModule(val);
                message.info(`Switched to ${val.toUpperCase()} module`);
              }}
              size="small"
              className="w-40"
              options={[
                { value: "sales", label: "CRM & Sales" },
                { value: "billing", label: "Financial Invoices" },
                { value: "audit", label: "Compliance & Audit" },
              ]}
            />
          </div>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-xs px-3 py-1.5 rounded-xl bg-white text-[#362117] border border-[#ede5d8] flex items-center gap-1.5 cursor-pointer font-bold shadow-xs transition-colors hover:bg-[#fffdfa]"
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            <span>{collapsed ? "Expand" : "Collapse"}</span>
          </button>
        </div>

        <div className="border border-[#ede5d8] rounded-2xl overflow-hidden bg-[#fbf8f2] flex h-84 shadow-xs">
          {/* Sidebar */}
          <div
            className={`border-r border-[#ede5d8] bg-white p-3 flex flex-col justify-between transition-all duration-300 ${
              collapsed ? "w-16" : "w-64"
            }`}
          >
            <div className="space-y-2">
              {!collapsed && (
                <div className="px-3 py-2 rounded-xl bg-[#f5eee3] border border-[#ede5d8] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers size={14} className="text-[#c4432b]" />
                    <span className="text-xs font-bold text-[#362117]">
                      {activeModule === "sales" ? "Sales CRM" : activeModule === "billing" ? "Billing Ops" : "Audit Hub"}
                    </span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#fdeee9] text-[#c4432b] font-bold">
                    v2.4
                  </span>
                </div>
              )}

              <div className="space-y-1">
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
            </div>

            {/* User Profile & Logout */}
            {!collapsed && (
              <div className="p-3 border-t border-[#ede5d8] flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-[#362117] text-white flex items-center justify-center text-xs font-bold shrink-0">
                    AL
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-bold text-[#362117] truncate">Ada Lovelace</div>
                    <div className="text-[10px] text-[#8a7566] truncate">Chief Architect</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    Modal.confirm({
                      title: "Confirm Sign Out",
                      content: "Are you sure you want to log out of the platform session?",
                      onOk: () => message.success("Logged out successfully"),
                    });
                  }}
                  className="p-1.5 rounded-lg hover:bg-[#feeae6] text-[#785c4b] hover:text-[#c4432b] transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut size={14} />
                </button>
              </div>
            )}
          </div>

          {/* Mock Content */}
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center bg-[#fbf8f2]">
            <div className="text-base font-bold text-[#362117]">
              Current Module: <span className="text-[#c4432b]">{activeModule.toUpperCase()}</span>
            </div>
            <div className="text-xs font-mono text-[#785c4b] mt-1">
              Active Route: /{activeKey}
            </div>
            <p className="text-xs text-[#5c4738] mt-3 max-w-sm leading-relaxed">
              DynamicSideBar manages multi-tenant modules, role access checks, and uncommitted form confirmation guards.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Example 0: Collapsible Navigation
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
