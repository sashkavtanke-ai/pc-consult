import type { Metadata } from 'next';
import ComplexServicePageClient from './ComplexServicePageClient';

export const metadata: Metadata = {
  title: 'Комплексное обслуживание',
  description:
    'Комплексное обслуживание бизнеса: стратегическое планирование, финансовый консалтинг и операционная эффективность.',
  alternates: {
    canonical: '/services/complex',
  },
};

export default function ComplexServicePage() {
  return <ComplexServicePageClient />;
}
