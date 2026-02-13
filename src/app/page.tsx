import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import ServicesPreview from '@/components/sections/ServicesPreview';

const Hero = dynamic(() => import('@/components/sections/Hero'));

export const metadata: Metadata = {
  title: 'Консалтинг для бизнеса в Санкт-Петербурге и по России',
  description:
    'Консалтинг для малого и среднего бизнеса: стратегия, финансовое моделирование, управленческий учет, оптимизация издержек и работа с долговой нагрузкой.',
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <ServicesPreview />
    </main>
  );
}
