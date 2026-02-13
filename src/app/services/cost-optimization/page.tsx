import type { Metadata } from 'next';
import CostOptimizationPageClient from './CostOptimizationPageClient';

export const metadata: Metadata = {
  title: 'Оптимизация издержек бизнеса за 30 дней',
  description:
    'Оптимизация издержек и бизнес-процессов: аудит затрат, план сокращения потерь, контроль экономического эффекта и внедрение решений.',
  alternates: {
    canonical: '/services/cost-optimization',
  },
};

export default function CostOptimizationPage() {
  return <CostOptimizationPageClient />;
}
