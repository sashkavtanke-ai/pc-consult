import React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "@/components/layout/Header";
import RootClientLayout from "@/components/layout/RootClientLayout";
import YandexMetrika from "@/components/layout/YandexMetrika";
import "./globals.css";
import ClientRoot from "@/components/ClientRoot";

const inter = localFont({
  src: [
    {
      path: "../../public/fonts/inter/inter-v19-cyrillic_cyrillic-ext_latin-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/inter/inter-v19-cyrillic_cyrillic-ext_latin-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

const roboto = localFont({
  src: [
    {
      path: "../../public/fonts/roboto/roboto-v48-cyrillic_cyrillic-ext_latin-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/roboto/roboto-v48-cyrillic_cyrillic-ext_latin-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pc-consult.ru"),
  title: {
    default: "ПК | Стратегический и финансовый консалтинг",
    template: "%s | ПК",
  },
  description: "Повышаем эффективность бизнеса через стратегический, финансовый и управленческий консалтинг. Разработка бизнес-планов, финансовое моделирование, оптимизация процессов.",
  keywords: [
    "стратегический консалтинг", "финансовый консалтинг", "управленческий консалтинг",
    "бизнес-планирование", "финансовое моделирование", "оптимизация бизнес-процессов",
    "развитие бизнеса", "антикризисное управление", "налоговая оптимизация", "налоги",
    "финансовая безопасность", "аутсорсинг бухгалтерии", "финансовый аудит",
    "реструктуризация долгов", "оптимизация издержек", "повышение эффективности",
    "бизнес-консультант", "консалтинг для бизнеса", "финансовое планирование",
    "разработка бизнес-стратегии", "ПК", "ООО ПК"
  ],
  authors: [
    {
      name: "ООО ПК",
      url: "https://pc-consult.ru",
    },
  ],
  openGraph: {
    title: "ПК | Стратегический и финансовый консалтинг",
    description: "Повышаем эффективность бизнеса через стратегический, финансовый и управленческий консалтинг. Разработка бизнес-планов, финансовое моделирование, оптимизация процессов.",
    url: "https://pc-consult.ru",
    siteName: "ПК",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ПК | Консалтинг для вашего бизнеса",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ПК | Стратегический и финансовый консалтинг",
    description: "Повышаем эффективность бизнеса через стратегический, финансовый и управленческий консалтинг. Разработка бизнес-планов, финансовое моделирование, оптимизация процессов.",
    images: ["/og-image.png"],
  },
  verification: {
    google: "YhmmTpw8F2JBMgj3FhiC8gilqdEF2w_FcIGS5rdwIZ4",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${roboto.variable}`}>
      <body className="text-text antialiased bg-background text-foreground">
        <ClientRoot>
          <div className="min-h-screen flex flex-col bg-background">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Organization",
                  "name": "ПК",
                  "url": "https://pc-consult.ru",
                  "logo": "/logo.png"
                }),
              }}
            />
            <a href="#main-content" className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 bg-accent text-black px-4 py-2 rounded-button font-bold transition-colors duration-200">Перейти к содержимому</a>
            <Header />
            <RootClientLayout>
              {children}
            </RootClientLayout>
          </div>
        </ClientRoot>
        <YandexMetrika />
      </body>
    </html>
  );
}
