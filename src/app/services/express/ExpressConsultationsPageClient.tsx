'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/layout/PageHeader';
import ContactForm from '@/components/forms/ContactForm';
import Modal from '@/components/layout/Modal';
import {
  expressConsultations,
  type ExpressConsultationItem,
} from '../servicesData';

type ConsultationCategory = ExpressConsultationItem['category'];

const categoryOrder: ConsultationCategory[] = [
  'Экспресс-консультации для роста бизнеса',
  'Долги, кредиторы, суды',
];

export default function ExpressConsultationsPageClient() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const groupedItems = useMemo(
    () =>
      categoryOrder
        .map((category) => ({
          category,
          items: expressConsultations.filter((item) => item.category === category),
        }))
        .filter((group) => group.items.length > 0),
    [],
  );

  const initialMessage = selectedTopic
    ? `Тема консультации: ${selectedTopic}\n\nКратко опишите ваш запрос:`
    : '';

  return (
    <main className="min-h-screen">
      <PageHeader
        title="Экспресс-консультации"
        subtitle="Подробные описания услуг с быстрым результатом для бизнеса и работы с долговой нагрузкой."
        className="mt-28 md:mt-48 frosted-glass py-16 md:py-20 text-center overflow-hidden"
      />

      <div className="container mx-auto px-6 py-8 md:py-12">
        <section>
          {groupedItems.map((group, index) => (
            <div
              key={group.category}
              className={index === 0 ? 'space-y-5' : 'space-y-5 pt-5'}
            >
              <h2 className="text-h3 font-bold text-primary text-center">{group.category}</h2>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {group.items.map((item) => (
                  <article
                    key={item.id}
                    className="frosted-glass rounded-card shadow-card flex h-full flex-col p-6"
                  >
                    <h3 className="mb-4 text-h4 font-semibold text-primary">{item.title}</h3>
                    <ul className="list-disc space-y-2 pl-5 text-sm text-text-muted">
                      <li>
                        <span className="font-semibold text-primary">Цена:</span> {item.price}
                      </li>
                      <li>
                        <span className="font-semibold text-primary">Формат:</span> {item.format}
                      </li>
                      <li>
                        <span className="font-semibold text-primary">Что вы получите:</span>{' '}
                        {item.whatClientGets}
                      </li>
                      <li>
                        <span className="font-semibold text-primary">Быстрый результат:</span>{' '}
                        {item.quickResult}
                      </li>
                      {item.nextStep ? (
                        <li>
                          <span className="font-semibold text-primary">Дальнейший шаг:</span>{' '}
                          {item.nextStep}
                        </li>
                      ) : null}
                    </ul>
                    <button
                      type="button"
                      onClick={() => setSelectedTopic(item.title)}
                      className="button-base mt-auto rounded-[4px] px-6 py-3 text-sm text-black"
                    >
                      Получить консультацию
                    </button>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>

        <div className="mt-12">
          <Link
            href="/services"
            className="text-sm font-semibold text-primary transition-colors hover:text-accent"
          >
            ← Вернуться ко всем услугам
          </Link>
        </div>
      </div>

      <Modal
        isOpen={Boolean(selectedTopic)}
        onClose={() => setSelectedTopic(null)}
        variant="service"
        title="Получить консультацию"
      >
        <div className="mx-auto w-full max-w-xl py-2">
          <p className="mb-4 text-sm text-text-muted">
            Оставьте контакты и кратко опишите задачу.
          </p>
          <ContactForm initialMessage={initialMessage} />
        </div>
      </Modal>
    </main>
  );
}
