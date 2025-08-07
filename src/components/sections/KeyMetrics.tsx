"use client";
// Компонент "Ключевые метрики" для страницы "О компании"
// Отображает инфографику с основными достижениями компании

import CountUp from 'react-countup';
import { Users, Briefcase, TrendingUp } from 'lucide-react';

const metrics = [
  {
    icon: <TrendingUp size={48} className="text-accent" />,
    value: 34,
    suffix: '+',
    label: 'Успешных проектов',
  },
  {
    icon: <Users size={48} className="text-accent" />,
    value: 10,
    suffix: '+',
    label: 'Клиентов по всему миру',
  },
  {
    icon: <Briefcase size={48} className="text-accent" />,
    value: 97,
    suffix: '%',
    label: 'Уровень удовлетворенности',
  },
];

export default function KeyMetrics() {
  return (
    <section className=" rounded-lg p-12">
      <h2 className="font-heading text-h2 font-bold text-primary text-center">Наши достижения в цифрах</h2>
      <div className="grid md:grid-cols-3 gap-8 mt-12 text-center">
        {metrics.map((metric) => (
          <div key={metric.label} className="flex flex-col items-center">
            {metric.icon}
            {/* Значение метрики по дизайн-системе */}
            <p className="font-heading text-h1 font-bold text-accent mt-4">
              <CountUp end={metric.value} duration={4} suffix={metric.suffix} />
            </p>
            {/* Название метрики по дизайн-системе */}
            <p className="text-body text-text-muted">{metric.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}