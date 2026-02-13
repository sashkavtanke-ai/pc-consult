'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Layers3, WalletCards, Zap, Scale, Calculator } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import { fadeInItem, staggerContainer } from '@/lib/animations';

const serviceDirections = [
  {
    title: 'Экспресс-консультации',
    description:
      'Точечные решения по финансам и долгам: форматы, результаты и быстрый старт.',
    href: '/services/express',
    icon: <Zap size={42} className="text-accent" />,
  },
  {
    title: 'Комплексное обслуживание',
    description:
      'Долгосрочное сопровождение бизнеса: стратегия, финансы и операционная эффективность.',
    href: '/services/complex',
    icon: <Layers3 size={42} className="text-accent" />,
  },
];

const popularSolutions = [
  {
    title: 'Финансовая модель и управленческий учет',
    description: 'Сценарное планирование, P&L, Cash Flow, контроль KPI и принятие решений на цифрах.',
    href: '/services/financial-modeling',
    icon: <Calculator size={24} className="text-accent" />,
  },
  {
    title: 'Реструктуризация долгов бизнеса',
    description: 'Снижение долговой нагрузки, переговоры с кредиторами, приоритизация обязательств.',
    href: '/services/debt-restructuring',
    icon: <WalletCards size={24} className="text-accent" />,
  },
  {
    title: 'Отмена судебного приказа',
    description: 'Экспресс-формат для бизнеса и физлиц: анализ, заявление, пошаговое сопровождение.',
    href: '/services/court-order-cancel',
    icon: <Scale size={24} className="text-accent" />,
  },
  {
    title: 'Оптимизация издержек за 30 дней',
    description: 'Аудит затрат и план сокращения потерь без ущерба для операционной деятельности.',
    href: '/services/cost-optimization',
    icon: <Zap size={24} className="text-accent" />,
  },
];

export default function ServicesPageClient() {
  return (
    <main className="min-h-screen">
      <PageHeader
        title="Консалтинг для бизнеса: стратегический, финансовый и управленческий"
        subtitle="Выберите формат работы: экспресс-консультации или комплексное сопровождение бизнеса."
        className="mt-28 md:mt-48 frosted-glass py-16 md:py-20 text-center overflow-hidden"
      />

      <div className="container mx-auto px-6 py-12 md:py-20">
        <section>
          <h2 className="mb-6 text-center text-h3 font-bold text-primary">Форматы работы</h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2"
          >
            {serviceDirections.map((direction) => (
              <motion.div key={direction.title} variants={fadeInItem}>
                <Link href={direction.href} className="block h-full">
                  <article className="frosted-glass rounded-card shadow-card flex h-full flex-col items-start p-8 transition-transform hover:-translate-y-1">
                    <div className="mb-5">{direction.icon}</div>
                    <h3 className="mb-3 text-h3 font-bold text-primary">{direction.title}</h3>
                    <p className="text-body text-text-muted">{direction.description}</p>
                  </article>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="mt-12">
          <h2 className="mb-6 text-center text-h3 font-bold text-primary">Популярные задачи бизнеса</h2>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
            {popularSolutions.map((solution) => (
              <Link key={solution.href} href={solution.href} className="block h-full">
                <article className="frosted-glass rounded-card shadow-card flex h-full flex-col p-6 transition-transform hover:-translate-y-1">
                  <div className="mb-4">{solution.icon}</div>
                  <h3 className="mb-2 text-h4 font-bold text-primary">{solution.title}</h3>
                  <p className="text-body text-text-muted">{solution.description}</p>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
