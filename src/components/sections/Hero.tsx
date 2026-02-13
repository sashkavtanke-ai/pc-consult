import Link from 'next/link';
import Scene from '../canvas/Scene';

export default function Hero() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Scene />
      </div>

      <div className="relative z-10 container mx-auto flex max-w-7xl flex-col items-center justify-center space-y-6 px-3 py-20 text-center frosted-glass">
        <h1 className="font-heading text-h1 font-bold leading-tight text-primary">
          Консалтинг для бизнеса: <span className="text-accent">стратегия, финансы и рост</span>
        </h1>

        <p className="max-w-4xl text-h4 leading-snug text-text-muted">
          Помогаем малому и среднему бизнесу расти через стратегический, финансовый и управленческий консалтинг.
          Работаем в Санкт-Петербурге и по всей России: от экспресс-консультаций до комплексного сопровождения.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/services"
            className="rounded-[4px] border-2 border-[color:var(--color-accent)] bg-transparent px-4 py-2 text-lg font-bold text-black transition-colors duration-500 hover:bg-[color:var(--color-accent)] hover:text-white dark:text-white"
          >
            Услуги консалтинга
          </Link>
          <Link
            href="/projects"
            className="rounded-[4px] border-2 border-[color:var(--color-accent)] bg-transparent px-4 py-2 text-lg font-bold text-black transition-colors duration-500 hover:bg-[color:var(--color-accent)] hover:text-white dark:text-white"
          >
            Кейсы и результаты
          </Link>
        </div>
      </div>
    </section>
  );
}
