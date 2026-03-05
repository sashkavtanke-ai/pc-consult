import type { Metadata } from 'next';
import DebtRestructuringPageClient from './DebtRestructuringPageClient';

export const metadata: Metadata = {
  title: 'Реструктуризация долгов бизнеса в СПб и РФ: работа с кредиторами',
  description:
    'Снижаем долговую нагрузку бизнеса в СПб и РФ: аудит обязательств, стратегия переговоров с кредиторами, план реструктуризации и сопровождение внедрения.',
  alternates: {
    canonical: '/services/debt-restructuring',
  },
};

export default function DebtRestructuringPage() {
  return <DebtRestructuringPageClient />;
}
