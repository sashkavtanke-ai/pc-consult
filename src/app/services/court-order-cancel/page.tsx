import type { Metadata } from 'next';
import CourtOrderCancelPageClient from './CourtOrderCancelPageClient';

export const metadata: Metadata = {
  title: 'Отмена судебного приказа в СПб и РФ: бизнес и физлица',
  description:
    'Экспресс-отмена судебного приказа в СПб и РФ для бизнеса и физлиц: анализ ситуации, подготовка заявления, сроки, риски и дальнейшие шаги.',
  alternates: {
    canonical: '/services/court-order-cancel',
  },
};

export default function CourtOrderCancelPage() {
  return <CourtOrderCancelPageClient />;
}
