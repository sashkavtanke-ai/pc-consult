import type { Metadata } from 'next';
import AntikrizisnyyAudit590pPageClient from './AntikrizisnyyAudit590pPageClient';

export const metadata: Metadata = {
  title: 'Антикризисный аудит 590-П для бизнеса в СПб и РФ',
  description:
    'Антикризисный аудит бизнеса по логике 590-П: расчет DTI и DSCR, оценка долговой нагрузки, налоговых рисков и план восстановления денежного потока.',
  alternates: {
    canonical: '/services/antikrizisnyy-audit-590p',
  },
  openGraph: {
    title: 'Антикризисный аудит 590-П для бизнеса | ПК',
    description:
      'Показываем финансовый рейтинг бизнеса глазами банка и готовим план снижения рисков, налоговой нагрузки и долгового давления.',
    url: '/services/antikrizisnyy-audit-590p',
    type: 'website',
  },
};

export default function AntikrizisnyyAudit590pPage() {
  return <AntikrizisnyyAudit590pPageClient />;
}
