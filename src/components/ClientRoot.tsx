// Клиентский корневой компонент для динамического фона и контента
"use client";
import DynamicBackgroundWrapper from "@/components/dynamic-bg/DynamicBackgroundWrapper";

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  return <DynamicBackgroundWrapper>{children}</DynamicBackgroundWrapper>;
}