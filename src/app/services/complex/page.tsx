import type { Metadata } from 'next';
import ComplexServicePageClient from './ComplexServicePageClient';

export const metadata: Metadata = {
  title: 'Комплексное сопровождение бизнеса: стратегия, финансы, операции',
  description:
    'Комплексное обслуживание бизнеса под ключ: стратегическое планирование, финансовый консалтинг, операционная эффективность и контроль KPI.',
  alternates: {
    canonical: '/services/complex',
  },
};

export default function ComplexServicePage() {
  return <ComplexServicePageClient />;
}
