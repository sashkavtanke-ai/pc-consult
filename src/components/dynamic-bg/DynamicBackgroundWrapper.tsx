// src/components/dynamic-bg/DynamicBackgroundWrapper.tsx
"use client";
import BackgroundP5 from "./background_p5";

export default function DynamicBackgroundWrapper({ children }: { children?: React.ReactNode }) {
  return (
    <div style={{ position: "relative", isolation: "isolate" }}>
      <BackgroundP5 />
      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
