"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Layers, Wrench, Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/docs", label: "Documentation", icon: BookOpen },
    { href: "/docs/components/dynamic-table", label: "Components", icon: Layers },
    { href: "/docs/hooks/use-fetch", label: "Hooks", icon: Layers },
    { href: "/docs/utils", label: "Utilities", icon: Wrench },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#ede5d8] bg-[#fbf8f2]/90 backdrop-blur-md">
      <div className="w-full px-4 sm:px-8 lg:px-12 flex items-center justify-between h-16">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-lg text-[#362117]">
            <div className="w-8 h-8 rounded-lg bg-[#362117] flex items-center justify-center text-[#fbf8f2] font-black text-xs shadow-xs">
              AD
            </div>
            <span className="tracking-tight font-extrabold text-[#362117]">antd-dynamic-ui</span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#f2ebde] text-[#785c4b] font-semibold border border-[#ede5d8]">
              v1.0.0
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    isActive
                      ? "text-[#362117] bg-[#f0e8dc] font-bold shadow-xs border border-[#e5dbc9]"
                      : "text-[#785c4b] hover:text-[#362117] hover:bg-[#f5eee3]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Actions: GitHub Pill */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/kamlesh-Sahani/antd-dynamic-ui"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Repository"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#f7f2ea] text-[#362117] text-xs font-semibold border border-[#ede5d8] shadow-[0_1px_4px_rgba(54,33,23,0.06)] hover:shadow-xs transition-all cursor-pointer"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="shrink-0"
              style={{ width: 18, height: 18 }}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            <span className="hidden sm:inline">GitHub</span>
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#785c4b] hover:text-[#362117] hover:bg-[#f5eee3]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#ede5d8] bg-[#fbf8f2] px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-[#5c4738] hover:text-[#362117] hover:bg-[#f0e8dc]"
            >
              <link.icon size={16} />
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
