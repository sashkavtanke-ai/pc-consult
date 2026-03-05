import type { Metadata } from 'next';
import ExpressConsultationsPageClient from './ExpressConsultationsPageClient';

export const metadata: Metadata = {
  title: 'Экспресс-консультации для бизнеса в СПб и РФ: финансы и долги',
  description:
    'Экспресс-консультации для бизнеса в СПб и РФ: рост, финансовый чек-ап, оптимизация издержек, отмена судебного приказа и реструктуризация долгов.',
  alternates: {
    canonical: '/services/express',
  },
};

export default function ExpressConsultationsPage() {
  return <ExpressConsultationsPageClient />;
}
