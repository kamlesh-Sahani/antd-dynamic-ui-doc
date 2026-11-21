"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";

export interface NavGroup {
  title: string;
  items: {
    title: string;
    href: string;
    badge?: string;
  }[];
}

export const SIDEBAR_NAV: NavGroup[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation & Setup", href: "/docs/installation" },
      { title: "Framework Integration", href: "/docs/frameworks", badge: "Next & React" },
      { title: "Theming & Customization", href: "/docs/theming" },
    ],
  },
  {
    title: "Core Dynamic Components",
    items: [
      { title: "DynamicTable", href: "/docs/components/dynamic-table", badge: "Flagship" },
      { title: "DynamicForm", href: "/docs/components/dynamic-form", badge: "Zod Engine" },
      { title: "DynamicModal", href: "/docs/components/dynamic-modal" },
      { title: "DynamicDrawer", href: "/docs/components/dynamic-drawer" },
      { title: "DynamicCard", href: "/docs/components/dynamic-card" },
      { title: "DynamicHeader", href: "/docs/components/dynamic-header" },
      { title: "DynamicSideBar", href: "/docs/components/dynamic-sidebar" },
    ],
  },
  {
    title: "Standard Form Fields",
    items: [
      { title: "InputField", href: "/docs/components/input-field" },
      { title: "PasswordField", href: "/docs/components/password-field" },
      { title: "SelectField", href: "/docs/components/select-field" },
      { title: "SelectApiField", href: "/docs/components/select-api-field", badge: "Async Search" },
      { title: "AutocompleteSelect", href: "/docs/components/autocomplete-select" },
      { title: "DateField", href: "/docs/components/date-field" },
      { title: "DateRangeField", href: "/docs/components/date-range-field" },
      { title: "TimePickerField", href: "/docs/components/time-picker-field" },
      { title: "TimeRangeField", href: "/docs/components/time-range-field" },
      { title: "NumberField", href: "/docs/components/number-field" },
      { title: "TextAreaField", href: "/docs/components/text-area-field" },
      { title: "SwitchField", href: "/docs/components/switch-field" },
      { title: "CheckboxField", href: "/docs/components/checkbox-field" },
      { title: "RadioField", href: "/docs/components/radio-field" },
      { title: "SliderField", href: "/docs/components/slider-field" },
      { title: "RatingField", href: "/docs/components/rating-field" },
      { title: "ColorPickerField", href: "/docs/components/color-picker-field" },
      { title: "CountryField", href: "/docs/components/country-field" },
      { title: "PhoneField", href: "/docs/components/phone-field" },
      { title: "OtpField", href: "/docs/components/otp-field" },
      { title: "UploadField", href: "/docs/components/upload-field", badge: "S3 Ready" },
      { title: "ButtonField", href: "/docs/components/button-field" },
      { title: "LoadingSpinner", href: "/docs/components/loading-spinner" },
      { title: "ErrorApi", href: "/docs/components/error-api" },
    ],
  },
  {
    title: "Custom Hooks",
    items: [
      { title: "useFetch", href: "/docs/hooks/use-fetch", badge: "Velocity" },
      { title: "useGridFilters", href: "/docs/hooks/use-grid-filters", badge: "Zustand" },
      { title: "useApiOptions", href: "/docs/hooks/use-api-options" },
      { title: "useSafeControl", href: "/docs/hooks/use-safe-control" },
      { title: "useDynamicUI", href: "/docs/hooks/use-dynamic-ui" },
    ],
  },
  {
    title: "Pure Utilities",
    items: [
      { title: "All Utilities Reference", href: "/docs/utils", badge: "15+ Utils" },
    ],
  },
  {
    title: "Troubleshooting",
    items: [
      { title: "Backend Response Mismatch", href: "/docs/troubleshooting", badge: "Important" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNav = SIDEBAR_NAV.map((group) => ({
    ...group,
    items: group.items.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((group) => group.items.length > 0);

  return (
    <aside className="w-64 shrink-0 border-r border-[#ede5d8] bg-[#fbf8f2] min-h-[calc(100vh-4rem)] p-4 flex flex-col gap-6">
      {/* Quick Search */}
      <div className="relative">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7566]"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search documentation..."
          className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white border border-[#ede5d8] text-[#362117] placeholder-[#a49384] focus:outline-hidden focus:ring-1 focus:ring-[#e05d44] focus:border-[#e05d44] transition-all shadow-[0_1px_3px_rgba(54,33,23,0.03)]"
        />
      </div>

      {/* Nav Groups */}
      <div className="space-y-6 overflow-y-auto pr-1">
        {filteredNav.map((group, idx) => (
          <div key={idx} className="space-y-1.5">
            <h4 className="text-[11px] font-bold text-[#8a7566] uppercase tracking-wider px-2">
              {group.title}
            </h4>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-[#f0e8dc] text-[#362117] font-bold shadow-xs border border-[#e5dbc9]"
                        : "text-[#5c4738] hover:text-[#362117] hover:bg-[#f5eee3]"
                    }`}
                  >
                    <span className="truncate">{item.title}</span>
                    {item.badge && (
                      <span className="text-[10px] font-sans px-1.5 py-0.2 rounded-full bg-[#f2ebde] text-[#785c4b] font-semibold border border-[#ede5d8]">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
