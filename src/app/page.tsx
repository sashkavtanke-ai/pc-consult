import dynamic from "next/dynamic"; // ленивый импорт
const Hero = dynamic(() => import('@/components/sections/Hero')); // ленивый импорт HeroSection
// Импорт превью услуг
import ServicesPreview from '@/components/sections/ServicesPreview';

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
