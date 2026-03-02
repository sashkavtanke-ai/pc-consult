// src/components/dynamic-bg/DynamicBackgroundWrapper.tsx
"use client";

export default function DynamicBackgroundWrapper({ children }: { children?: React.ReactNode }) {
  return (
    <div className="site-shell">
      <div className="site-background" aria-hidden="true" />
      <div className="site-content">{children}</div>
    </div>
  );
}
