import type { Metadata } from 'next';
import ExpressConsultationsPageClient from './ExpressConsultationsPageClient';

export const metadata: Metadata = {
  title: 'Экспресс-консультации для бизнеса: финансы и долги',
  description:
    'Экспресс-консультации по росту бизнеса, финансовому чек-апу, оптимизации издержек, отмене судебного приказа и реструктуризации долгов.',
  alternates: {
    canonical: '/services/express',
  },
};

export default function ExpressConsultationsPage() {
  return <ExpressConsultationsPageClient />;
}
