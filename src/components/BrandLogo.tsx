"use client";

import React from "react";

interface BrandLogoProps {
  size?: number;
  className?: string;
  withText?: boolean;
}

export default function BrandLogo({
  size = 32,
  className = "",
  withText = false,
}: BrandLogoProps) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-200 hover:scale-105"
        style={{ width: size, height: size }}
      >
        <defs>
          <linearGradient id="brandBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b2216" />
            <stop offset="50%" stopColor="#301b11" />
            <stop offset="100%" stopColor="#211109" />
          </linearGradient>

          <linearGradient id="brandTerracotta" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f87158" />
            <stop offset="60%" stopColor="#e05d44" />
            <stop offset="100%" stopColor="#ba3921" />
          </linearGradient>

          <linearGradient id="brandCream" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f5eee3" />
          </linearGradient>

          <linearGradient id="brandAmber" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="60%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>

          <filter id="brandShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000000" floodOpacity="0.32" />
          </filter>

          <filter id="brandGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Squircle Tile */}
        <rect x="6" y="6" width="108" height="108" rx="28" fill="url(#brandBg)" stroke="#5c3e2c" strokeWidth="2.5" />
        <rect x="8.5" y="8.5" width="103" height="103" rx="25.5" fill="none" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="1.5" />

        {/* Schema Layer (Cream) */}
        <g filter="url(#brandShadow)">
          <path d="M 33 46 L 60 30 L 87 46 L 60 62 Z" fill="url(#brandCream)" />
          <path d="M 33 46 L 60 62 L 60 68 L 33 52 Z" fill="#ede5d8" />
          <path d="M 87 46 L 60 62 L 60 68 L 87 52 Z" fill="#ded3c3" />
          <line x1="46" y1="38" x2="74" y2="54" stroke="#362117" strokeWidth="2.2" strokeLinecap="round" strokeOpacity="0.28" />
          <line x1="40" y1="46" x2="68" y2="62" stroke="#362117" strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.18" />
        </g>

        {/* Dynamic Execution Layer (Terracotta) */}
        <g filter="url(#brandShadow)">
          <path d="M 33 66 L 60 50 L 87 66 L 60 82 Z" fill="url(#brandTerracotta)" />
          <path d="M 33 66 L 60 82 L 60 89 L 33 73 Z" fill="#9e2e1b" />
          <path d="M 87 66 L 60 82 L 60 89 L 87 73 Z" fill="#782314" />
          <line x1="46" y1="58" x2="74" y2="74" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeOpacity="0.6" />
          <line x1="40" y1="66" x2="68" y2="82" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.4" />
        </g>

        {/* Dynamic Spark */}
        <g transform="translate(86, 24)" filter="url(#brandGlow)">
          <path d="M 0 -9 Q 0 0 9 0 Q 0 0 0 9 Q 0 0 -9 0 Q 0 0 0 -9 Z" fill="url(#brandAmber)" />
          <circle cx="0" cy="0" r="2.8" fill="#ffffff" />
        </g>
      </svg>

      {withText && (
        <span className="tracking-tight font-extrabold text-[#362117] text-lg">
          antd-dynamic-ui
        </span>
      )}
    </div>
  );
}
