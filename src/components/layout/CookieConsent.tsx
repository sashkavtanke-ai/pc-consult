"use client"
// Компонент плашки cookies для Next.js/React/TypeScript
import React, { useEffect, useState } from "react";

// Стили минимальны, адаптированы под Tailwind (если используется)
const COOKIE_KEY = "cookie_consent";

interface CookieConsentProps {
  onOpenPrivacyPolicy: () => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ onOpenPrivacyPolicy }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Проверяем наличие согласия в localStorage
    if (typeof window !== "undefined") {
      const consent = localStorage.getItem(COOKIE_KEY);
      setVisible(consent !== "true");
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem(COOKIE_KEY, "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-black bg-opacity-80 text-white px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-2"
      style={{ backdropFilter: "blur(6px)" }}
    >
      <span>
        Мы используем cookies для улучшения работы сайта. Продолжая пользоваться сайтом, вы соглашаетесь с нашей{" "}
        <button
          type="button"
          className="underline text-accent bg-transparent border-0 p-0 m-0 cursor-pointer"
          style={{ textDecoration: "underline", background: "none" }}
          onClick={onOpenPrivacyPolicy}
        >
          политикой конфиденциальности
        </button>.
      </span>
      <button
        onClick={acceptCookies}
        className="mt-2 sm:mt-0 bg-transparent text-black dark:text-white font-bold py-2 px-3 rounded-[4px] text-lg border-2 transition-colors duration-500 active:scale-95 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary hover:bg-[color:var(--color-accent)] hover:text-white w-full sm:w-auto"
        style={{ borderColor: 'var(--color-accent)' }}
      >
        Принять
      </button>
    </div>
  );
};

export default CookieConsent;