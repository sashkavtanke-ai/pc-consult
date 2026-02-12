import type { Metadata } from 'next';
import ExpressConsultationsPageClient from './ExpressConsultationsPageClient';

export const metadata: Metadata = {
  title: 'Экспресс-консультации',
  description:
    'Экспресс-консультации по росту бизнеса и работе с долговой нагрузкой: таблица услуг, формат, быстрый результат и следующие шаги.',
  alternates: {
    canonical: '/services/express',
  },
};

export default function ExpressConsultationsPage() {
  return <ExpressConsultationsPageClient />;
}
