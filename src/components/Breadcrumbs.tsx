import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav
      aria-label="Breadcrumbs"
      className="flex items-center text-xs text-[#785c4b] font-medium mb-4 overflow-x-auto whitespace-nowrap py-1"
    >
      <ol
        className="flex items-center gap-1.5"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
          className="flex items-center"
        >
          <Link
            href="/"
            itemProp="item"
            className="flex items-center gap-1 text-[#5c4738] hover:text-[#362117] transition-colors"
          >
            <Home size={13} className="shrink-0" />
            <span itemProp="name">Home</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>

        {items.map((item, index) => {
          const position = index + 2;
          const isLast = index === items.length - 1;

          return (
            <li
              key={index}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              className="flex items-center gap-1.5"
            >
              <ChevronRight size={12} className="text-[#a49384] shrink-0" />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  itemProp="item"
                  className="text-[#5c4738] hover:text-[#362117] transition-colors"
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
              ) : (
                <span
                  itemProp="name"
                  className="font-bold text-[#362117]"
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              {item.href && <meta itemProp="item" content={item.href} />}
              <meta itemProp="position" content={String(position)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
