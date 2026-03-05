import type { Metadata } from 'next';
import OcenkaBiznesaPageClient from './OcenkaBiznesaPageClient';

export const metadata: Metadata = {
  title: 'Оценка стоимости бизнеса для компаний в СПб и РФ',
  description:
    'Профессиональная оценка стоимости бизнеса для сделок, инвестиций и кредитования. Анализ финансов, рисков и инвестиционной привлекательности для компаний в СПб и РФ.',
  alternates: {
    canonical: '/services/ocenka-biznesa',
  },
};

export default function OcenkaBiznesaPage() {
  return <OcenkaBiznesaPageClient />;
}

