// Страница "Услуги" с сеткой карточек и модальными окнами для подробностей
'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import dynamic from "next/dynamic"; // ленивый импорт
const Modal = dynamic(() => import("@/components/layout/Modal")); // ленивый импорт модального окна
import { motion } from 'framer-motion';
import { staggerContainer, fadeInItem } from '@/lib/animations';
import { Briefcase, Zap, BarChart2, Gavel, DollarSign, Users } from 'lucide-react';

// Тип услуги
interface Service {
  title: string;
  icon: React.ReactNode;
  description: string;
  details: string;
  image: string;
}

const services: Service[] = [
  {
    icon: <BarChart2 size={40} className="text-accent" />,
    title: 'Стратегическое планирование',
    description: 'Дорожные карты для роста и лидерства на рынке.',
    details: 'Проводим глубокий анализ рынка, выявляем ключевые драйверы роста и риски, формируем пошаговый план с KPI и дорожной картой. Поддерживаем на всех этапах — от идеи до внедрения стратегии.',
    image: '/services/img/strategic_plan.webp'
  },
  {
    icon: <Briefcase size={40} className="text-accent" />,
    title: 'Финансовый консалтинг',
    description: 'Оптимизация финансов и управление рисками.',
    details: 'Строим прозрачную финансовую модель с прогнозом cash flow, оцениваем окупаемость и инвестиционные раунды, оптимизируем расходы и структуру капитала. Сопровождаем переговоры с инвесторами и кредиторами.',
    image: '/services/img/financial_consult.webp'
  },
  {
    icon: <Zap size={40} className="text-accent" />,
    title: 'Операционная эффективность',
    description: 'Оптимизация процессов и повышение производительности.',
    details: 'Документируем и оптимизируем бизнес‑процессы с помощью BPMN и Lean-практик, внедряем цифровые инструменты (ERP, RPA), настраиваем систему управленческой отчетности и контролируем показатели эффективности.',
    image: '/services/img/operations.webp'
  },
  {
    icon: <Gavel size={40} className="text-accent" />,
    title: 'Юридическое сопровождение',
    description: 'Обеспечиваем правовую защиту и поддержку сделок на всех этапах.',
    details: 'Анализируем договоры, разрабатываем корпоративную документацию и защищаем ваши интересы в переговорах и спорах.',
    image: '/services/img/legal.webp'
  },
  {
    icon: <DollarSign size={40} className="text-accent" />,
    title: 'Экономический анализ',
    description: 'Оцениваем рынок и финансовые показатели для взвешенных решений.',
    details: 'Проводим анализ финансовой отчётности, рассчитываем ключевые метрики, моделируем сценарии развития и даём рекомендации по повышению прибыли.',
    image: '/services/img/economic_analysis.webp'
  },
  {
    icon: <Users size={40} className="text-accent" />,
    title: 'Управление персоналом',
    description: 'Формируем HR-стратегию и повышаем вовлечённость команды.',
    details: 'Разрабатываем кадровую политику, внедряем системы мотивации и оценки эффективности, проводим подбор и адаптацию сотрудников.',
    image: '/services/img/HR.webp'
  },
  // Можно добавить больше услуг
];

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <main className="min-h-screen bg-background">
      <PageHeader
        title="Наши услуги"
        subtitle="Комплексные решения для роста и эффективности вашего бизнеса."
        className="mt-28 md:mt-48 frosted-glass py-16 md:py-20 text-center overflow-hidden"
      />
      <div className="container mx-auto px-6 py-12 md:py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div
              variants={fadeInItem}
              key={service.title}
              onClick={() => setSelectedService(service)}
              className="frosted-glass p-8 rounded-card shadow-md text-center flex flex-col items-center cursor-pointer transition-transform hover:-translate-y-1 my-4"
            >
              <img
                src={service.image}
                alt={service.title}
                className="mb-4 rounded-lg w-full object-contain"
                style={{ maxWidth: '100%' }}
              />
              <div className="mb-4">{service.icon}</div>
              <h3 className="font-heading text-h4 font-bold text-primary mb-2">{service.title}</h3>
              <p className="text-body text-text-muted">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      {/* Модальное окно с подробностями об услуге */}
      <Modal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        variant="service"
        title={selectedService?.title}
      >
        {selectedService && (
          <div
            className={`p-8 mx-auto my-8`}
          >
            <div className="flex flex-col items-center">
              <img
                src={selectedService.image}
                alt={selectedService.title}
                className="mb-4 rounded-lg w-full object-contain"
                style={{ maxWidth: '100%' }}
              />
              <div className="mb-4">{selectedService.icon}</div>
              {/* Название услуги убрано из содержимого, теперь только в title */}
              <p className="text-body text-text-muted mb-4">{selectedService.details}</p>
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
}
