import type { Metadata } from 'next';
import ServicesPageClient from './ServicesPageClient';

export const metadata: Metadata = {
  title: 'Услуги',
  description:
    'Услуги стратегического, финансового и юридического консалтинга для роста бизнеса: аудит, финмодели, оптимизация издержек, работа с долгами.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Услуги | ПК',
    description:
      'Услуги стратегического, финансового и юридического консалтинга для роста бизнеса.',
    url: '/services',
    type: 'website',
  },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
