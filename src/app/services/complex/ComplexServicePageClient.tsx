'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/layout/PageHeader';
import Modal from '@/components/layout/Modal';
import {
  legacyComplexServices,
  type LegacyServiceCard,
} from '../servicesData';

export default function ComplexServicePageClient() {
  const [selectedCard, setSelectedCard] = useState<LegacyServiceCard | null>(null);

  return (
    <main className="min-h-screen">
      <PageHeader
        title="Комплексное обслуживание"
        subtitle="Классические направления долгосрочной работы с бизнесом."
        className="mt-28 md:mt-48 frosted-glass py-16 md:py-20 text-center overflow-hidden"
      />

      <div className="container mx-auto px-6 py-8 md:py-12">
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
              <h2 className="mb-3 text-h4 font-bold text-primary">{service.title}</h2>
              <p className="mb-5 text-body text-text-muted">{service.description}</p>
              <button
                type="button"
                onClick={() => setSelectedCard(service)}
                className="mt-auto button-base rounded-[4px] px-4 py-2 text-sm text-black"
              >
                Подробнее
              </button>
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
    </main>
  );
}
