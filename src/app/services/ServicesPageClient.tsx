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

interface DetailItem {
  label: string;
  text: string;
}

const DETAIL_LABELS = ['Цена', 'Формат', 'Что получает клиент', 'Быстрый результат', 'Дальнейший шаг'] as const;

function parseDetails(details: string): DetailItem[] {
  const source = details.replace(/\s+/g, ' ').trim();
  const pattern = new RegExp(`(${DETAIL_LABELS.join('|')}):`, 'g');
  const matches = Array.from(source.matchAll(pattern));

  if (matches.length === 0) {
    return [];
  }

  return matches.map((match, index) => {
    const label = match[1];
    const start = (match.index ?? 0) + match[0].length;
    const end = index + 1 < matches.length ? (matches[index + 1].index ?? source.length) : source.length;
    const text = source.slice(start, end).trim();

    return { label, text };
  }).filter((item) => item.text.length > 0);
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
  {
    icon: <BarChart2 size={40} className="text-accent" />,
    title: 'Экспресс-аудит роста бизнеса',
    description: 'Личный разбор бизнеса: анализ финансов, точек роста и структуры доходов.',
    details: 'Цена: 14 900 ₽. Формат: 60–90 минут + персональный отчёт. Что получает клиент: личный разбор бизнеса, анализ финансов, точек роста и структуры доходов; по итогам — 3–5 конкретных рекомендаций для увеличения прибыли или сокращения потерь. Быстрый результат: +5–50 тыс. ₽ выручки или экономии уже в первый месяц за счёт внедрения предложенных решений. Дальнейший шаг: переход в полноценную финансовую стратегию, финмодель или абонентское сопровождение.',
    image: '/services/img/strategic_plan.webp'
  },
  {
    icon: <Briefcase size={40} className="text-accent" />,
    title: 'Быстрый финансовый чек-ап + рекомендации',
    description: 'Разбор баланса, ОФР и банковских выписок с поиском точек роста.',
    details: 'Цена: 15 000 – 25 000 ₽. Формат: 1–2 часа. Что получает клиент: разбор баланса, отчёта о финансовых результатах и банковских выписок, выявление 2–4 точек роста или снижения потерь. Быстрый результат: выявление улучшений с потенциалом +10–40 тыс. ₽ к финансовому результату. Дальнейший шаг: внедрение решений «под ключ».',
    image: '/services/img/financial_consult.webp'
  },
  {
    icon: <DollarSign size={40} className="text-accent" />,
    title: 'Мини-финмодель на квартал',
    description: 'Финмодель в Excel с прогнозом выручки, расходов и точки безубыточности.',
    details: 'Цена: 15 000 – 30 000 ₽. Формат: 1–3 часа + готовый файл. Что получает клиент: простая финансовая модель в Excel с 1–2 сценариями развития, прогнозом выручки, расходов и точки безубыточности. Быстрый результат: понимание, как увеличить выручку на 10–30 % в ближайший квартал. Дальнейший шаг: абонентское сопровождение и расширенная финансовая модель.',
    image: '/services/img/economic_analysis.webp'
  },
  {
    icon: <Zap size={40} className="text-accent" />,
    title: 'Оптимизация издержек за 30 дней',
    description: 'Аудит расходов и план сокращения затрат на 10–20 %.',
    details: 'Цена: 18 000 – 33 000 ₽. Формат: 90 минут + детальный план. Что получает клиент: аудит расходов и конкретный план сокращения затрат на 10–20 % без ущерба операционной деятельности. Быстрый результат: экономия 20–100 тыс. ₽ в месяц. Дальнейший шаг: масштабирование выручки и комплексная финансовая стратегия.',
    image: '/services/img/operations.webp'
  },
  {
    icon: <Users size={40} className="text-accent" />,
    title: 'Чек-лист роста + 60-минутная консультация',
    description: 'Структурированный чек-лист роста и персональные корректировки.',
    details: 'Цена: 5 000 – 15 000 ₽. Формат: 60 минут. Что получает клиент: структурированный чек-лист роста и персональные корректировки под специфику бизнеса. Быстрый результат: +5–20 тыс. ₽ к выручке за счёт быстрых управленческих действий. Дальнейший шаг: экспресс-аудит и разработка стратегии роста.',
    image: '/services/img/HR.webp'
  },
  {
    icon: <Briefcase size={40} className="text-accent" />,
    title: 'Экспресс-аудит инвестиционных возможностей',
    description: 'Разбор финансового положения и идеи для инвестирования с расчётом доходности.',
    details: 'Цена: 19 900 – 29 900 ₽. Формат: 60–120 минут + отчёт. Что получает клиент: личный разбор текущего финансового положения и 3–5 идей для инвестирования с расчётом потенциальной доходности. Быстрый результат: выявление 1–3 вариантов инвестиций с ROI выше рыночного уровня (>15–30 %). Дальнейший шаг: подготовка инвестиционного проекта или сопровождение привлечения капитала.',
    image: '/services/img/financial_consult.webp'
  },
  {
    icon: <Gavel size={40} className="text-accent" />,
    title: 'Экспресс-отмена судебного приказа',
    description: 'Анализ приказа, готовое заявление на отмену и инструкции по подаче.',
    details: 'Цена: 15 000 – 25 000 ₽. Формат: 1–2 дня + готовое заявление. Что получает клиент: анализ судебного приказа, подготовленное заявление на отмену и инструкции по подаче. Быстрый результат: отмена приказа в течение 5–10 дней и экономия на штрафах и принудительном взыскании. Дальнейший шаг: комплексная работа с долгами или реструктуризация.',
    image: '/services/img/legal.webp'
  },
  {
    icon: <Gavel size={40} className="text-accent" />,
    title: 'Экспресс-отмена судебного приказа (ФЛ)',
    description: 'Готовый шаблон заявления и базовая инструкция по самостоятельной подаче.',
    details: 'Цена: 1 000 ₽. Что получает клиент: готовый шаблон заявления и базовая инструкция по самостоятельной подаче. Быстрый результат: возможность быстро остановить принудительное взыскание.',
    image: '/services/img/legal.webp'
  },
  {
    icon: <Gavel size={40} className="text-accent" />,
    title: 'Быстрый аудит долгов + план работы с кредиторами',
    description: 'Разбор долговой нагрузки и шаги по переговорам с кредиторами.',
    details: 'Цена: 20 000 – 30 000 ₽. Формат: 90 минут + отчёт. Что получает клиент: разбор долговой нагрузки, структуры обязательств и 3–5 шагов по переговорам с кредиторами. Быстрый результат: снижение финансовой нагрузки на 10–30 % уже в первый месяц. Дальнейший шаг: реструктуризация долгов или абонентское сопровождение переговоров.',
    image: '/services/img/legal.webp'
  },
  {
    icon: <Gavel size={40} className="text-accent" />,
    title: 'Экспресс-реструктуризация долгов',
    description: 'Анализ обязательств, приоритизация платежей и переговорная стратегия.',
    details: 'Цена: 25 000 – 40 000 ₽. Формат: 1–3 часа + план. Что получает клиент: анализ обязательств и план приоритизации платежей, переговорная стратегия. Быстрый результат: снижение ежемесячных выплат на 20–50 тыс. ₽. Дальнейший шаг: полное сопровождение переговоров или процедура банкротства при необходимости.',
    image: '/services/img/legal.webp'
  },
  // Можно добавить больше услуг
];

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const detailItems = selectedService ? parseDetails(selectedService.details) : [];

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
              {detailItems.length > 0 ? (
                <ul className="w-full space-y-4 text-left text-body text-text-muted mb-4">
                  {detailItems.map((item) => (
                    <li key={item.label}>
                      <span className="font-semibold text-primary">{item.label}: </span>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-body text-text-muted mb-4">{selectedService.details}</p>
              )}
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
}
