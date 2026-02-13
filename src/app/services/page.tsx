import type { Metadata } from 'next';
import ServicesPageClient from './ServicesPageClient';

export const metadata: Metadata = {
  title: 'Консалтинг для бизнеса: услуги и стоимость',
  description:
    'Услуги консалтинга для бизнеса: экспресс-консультации и комплексное сопровождение. Стратегия, финансы, оптимизация издержек, работа с долгами.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Консалтинг для бизнеса: услуги и стоимость | ПК',
    description:
      'Стратегический, финансовый и управленческий консалтинг для малого и среднего бизнеса.',
    url: '/services',
    type: 'website',
  },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
