"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ChevronDown, ChevronRight } from "lucide-react";

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
    <aside className="w-64 shrink-0 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-950/40 p-4 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
      {/* Search Input */}
      <div className="relative mb-5">
        <Search className="absolute left-2.5 top-2.5 text-zinc-400" size={15} />
        <input
          type="text"
          placeholder="Filter documentation..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Nav groups */}
      <div className="space-y-6">
        {filteredNav.map((group, idx) => (
          <div key={idx} className="space-y-1.5">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 px-2.5">
              {group.title}
            </h4>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      isActive
                        ? "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900/60"
                    }`}
                  >
                    <span>{item.title}</span>
                    {item.badge && (
                      <span className="text-[9px] font-sans px-1.5 py-0.2 rounded-full bg-zinc-200/70 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-semibold">
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
