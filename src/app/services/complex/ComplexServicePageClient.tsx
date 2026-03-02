'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/layout/PageHeader';
import Modal from '@/components/layout/Modal';
import ContactForm from '@/components/forms/ContactForm';
import {
  legacyComplexServices,
  serviceOffers,
  type LegacyServiceCard,
} from '../servicesData';

export default function ComplexServicePageClient() {
  const [selectedCard, setSelectedCard] = useState<LegacyServiceCard | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const individualOffers = serviceOffers.filter((item) => item.audience === 'Физические лица');
  const businessOffers = serviceOffers.filter((item) => item.audience === 'Юридические лица');
  const initialMessage = selectedTopic
    ? `Тема консультации: ${selectedTopic}\n\nКратко опишите ваш запрос:`
    : '';

  return (
    <main className="min-h-screen">
      <PageHeader
        title="Комплексное обслуживание бизнеса под ключ"
        subtitle="Стратегическое планирование, финансовый контур и операционная эффективность для стабильного роста компании."
        className="mt-28 md:mt-48 frosted-glass py-16 md:py-20 text-center overflow-hidden"
      />

      <div className="container mx-auto px-6 py-8 md:py-12">
        <h2 className="mb-6 text-center text-h3 font-bold text-primary">Направления комплексного обслуживания</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {legacyComplexServices.map((service) => (
            <article
              key={service.title}
              className="frosted-glass rounded-card shadow-card flex h-full flex-col p-6"
            >
              <img
                src={service.image}
                alt={service.title}
                className="mb-5 h-48 w-full rounded-lg object-cover"
              />
              <h3 className="mb-3 text-h4 font-bold text-primary">{service.title}</h3>
              <p className="mb-5 text-body text-text-muted">{service.description}</p>
              <div className="mt-auto flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedCard(service)}
                  className="button-soft-accent px-4 py-2 text-sm"
                >
                  Подробнее
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedTopic(service.title)}
                  className="button-soft-accent px-4 py-2 text-sm"
                >
                  Получить услугу
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/services"
            className="text-sm font-semibold text-primary transition-colors hover:text-accent"
          >
            ← Вернуться ко всем услугам
          </Link>
        </div>

        <section className="mt-14 space-y-10">
          <div>
            <h2 className="mb-6 text-center text-h3 font-bold text-primary">Услуги для физических лиц</h2>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {individualOffers.map((item) => (
                <article
                  key={item.id}
                  className="frosted-glass rounded-card shadow-card flex h-full flex-col p-6"
                >
                  <h3 className="mb-3 text-h4 font-bold text-primary">{item.title}</h3>
                  <p className="mb-4 text-body text-text-muted">{item.description}</p>
                  <p className="text-sm font-semibold text-primary">Стоимость от: {item.priceFrom}</p>
                  <button
                    type="button"
                    onClick={() => setSelectedTopic(item.title)}
                    className="button-soft-accent mt-auto w-fit px-4 py-2 text-sm"
                  >
                    Получить услугу
                  </button>
                </article>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-6 text-center text-h3 font-bold text-primary">Услуги для юридических лиц</h2>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {businessOffers.map((item) => (
                <article
                  key={item.id}
                  className="frosted-glass rounded-card shadow-card flex h-full flex-col p-6"
                >
                  <h3 className="mb-3 text-h4 font-bold text-primary">{item.title}</h3>
                  <p className="mb-4 text-body text-text-muted">{item.description}</p>
                  <p className="text-sm font-semibold text-primary">Стоимость от: {item.priceFrom}</p>
                  <button
                    type="button"
                    onClick={() => setSelectedTopic(item.title)}
                    className="button-soft-accent mt-auto w-fit px-4 py-2 text-sm"
                  >
                    Получить услугу
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Modal
        isOpen={Boolean(selectedCard)}
        onClose={() => setSelectedCard(null)}
        variant="service"
        title={selectedCard?.title}
      >
        {selectedCard ? (
          <div className="space-y-5 py-2">
            <img
              src={selectedCard.image}
              alt={selectedCard.title}
              className="h-56 w-full rounded-lg object-cover"
            />
            <p className="text-body text-text-muted">{selectedCard.details}</p>
          </div>
        ) : null}
      </Modal>

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
