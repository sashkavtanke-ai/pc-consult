import type { Metadata } from 'next';
import FinancialModelingPageClient from './FinancialModelingPageClient';

export const metadata: Metadata = {
  title: 'Финансовая модель бизнеса и управленческий учет',
  description:
    'Разработка финансовой модели бизнеса: сценарное планирование, P&L, Cash Flow, баланс, управленческий учет и KPI для собственника.',
  alternates: {
    canonical: '/services/financial-modeling',
  },
};

export default function FinancialModelingPage() {
  return <FinancialModelingPageClient />;
}
