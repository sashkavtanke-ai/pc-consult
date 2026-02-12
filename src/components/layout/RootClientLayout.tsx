// Клиентская обёртка для управления модальным окном политики
"use client";
import React from "react";
import dynamic from "next/dynamic"; // ленивый импорт
const Footer = dynamic(() => import("./Footer"));
import CookieConsent from "./CookieConsent";
const PrivacyPolicyModal = dynamic(() => import("./PrivacyPolicyModal"));

interface RootClientLayoutProps {
  children: React.ReactNode;
}

const RootClientLayout: React.FC<RootClientLayoutProps> = ({ children }) => {
  const [isPrivacyOpen, setPrivacyOpen] = React.useState(false);

  const openPrivacyModal = () => setPrivacyOpen(true);

  return (
    <>
      <main id="main-content" className="flex-1 pt-[120px] md:pt-0">{children}</main>
      <Footer onOpenPrivacyPolicy={openPrivacyModal} />
      <CookieConsent onOpenPrivacyPolicy={openPrivacyModal} />
      <PrivacyPolicyModal isOpen={isPrivacyOpen} onClose={() => setPrivacyOpen(false)} />
    </>
  );
};

export default RootClientLayout;