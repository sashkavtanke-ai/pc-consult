import type { Metadata } from 'next';
import dynamic from "next/dynamic"; // ленивый импорт
const Hero = dynamic(() => import('@/components/sections/Hero')); // ленивый импорт HeroSection
// Импорт превью услуг
import ServicesPreview from '@/components/sections/ServicesPreview';

export const metadata: Metadata = {
  title: 'Стратегический и финансовый консалтинг',
  description:
    'Помогаем малому и среднему бизнесу расти: стратегия, финансы, операционная эффективность и юридическое сопровождение.',
  alternates: {
    canonical: '/',
  },
};

// Главная страница: теперь используется компонент Hero вместо заглушки
export default function Home() {
  return (
    <main>
      <Hero />
      {/* Секция превью услуг */}
      <ServicesPreview />
    </main>
  );
}
