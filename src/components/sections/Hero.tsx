import Scene from '../canvas/Scene'; // Импортируем компонент Canvas-сцены
import Link from 'next/link';

export default function Hero() {
  return (
    /* Изменено: высота секции теперь min-h-screen для полного заполнения экрана */
    <section className="relative flex items-center justify-center min-h-screen w-full">
      {/* Фон: 3D-сцена */}
      <div className="absolute inset-0 z-0">
        <Scene />
      </div>
      {/* Контент поверх Canvas */}
      {/* Добавлено: высота и выравнивание по всей секции */}
      <div className="relative z-10 container mx-auto flex flex-col items-center justify-center text-center px-3 py-8 frosted-glass max-w-7xl h-full min-h-0 pt-10 space-y-[16px]">
        <br />
        <br />
        <br />
        <h1 className="font-heading text-h1 font-bold text-primary leading-tight">
          <span className="text-accent">Консалтинг</span> который работает на практике
        </h1>
        <p className="text-h4 text-text-muted max-w-4xl leading-snug">
          Помогаем малому и среднему бизнесу расти — <span className="text-accent">от стратегий до внедрения</span>. В нашем портфеле: ветеринарные сети, строительство, юристы, ритейл, энергетика и другие отрасли. Работаем в Санкт-Петербурге и по всей России.
        </p>
        <br />
        <Link
          href="/projects"
          className="bg-transparent text-black dark:text-white font-bold py-2 px-3 rounded-[4px] text-lg border-2 transition-colors duration-500 active:scale-95 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary hover:bg-[color:var(--color-accent)] hover:text-white"
          style={{ borderColor: 'var(--color-accent)' }}
        >
          Наши проекты
        </Link>
        <br />
        <br />
        <br />
      </div>
    </section>
  );
}