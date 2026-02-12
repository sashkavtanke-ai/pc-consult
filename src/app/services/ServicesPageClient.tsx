'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Layers3, Zap } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import { fadeInItem, staggerContainer } from '@/lib/animations';

const serviceDirections = [
  {
    title: 'Экспресс-консультации',
    description:
      'Точечные решения по финансам и долгам: таблица форматов, подробные описания и быстрый старт.',
    href: '/services/express',
    icon: <Zap size={42} className="text-accent" />,
  },
  {
    title: 'Комплексное обслуживание',
    description:
      'Три базовых направления долгосрочного сопровождения бизнеса: стратегия, финансы и операционная эффективность.',
    href: '/services/complex',
    icon: <Layers3 size={42} className="text-accent" />,
  },
];

export default function ServicesPageClient() {
  return (
    <main className="min-h-screen">
      <PageHeader
        title="Наши услуги"
        subtitle="Выберите формат работы: экспресс-консультации или комплексное обслуживание."
        className="mt-28 md:mt-48 frosted-glass py-16 md:py-20 text-center overflow-hidden"
      />

      <div className="container mx-auto px-6 py-12 md:py-20">
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
                  <h2 className="mb-3 text-h3 font-bold text-primary">{direction.title}</h2>
                  <p className="text-body text-text-muted">{direction.description}</p>
                </article>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
