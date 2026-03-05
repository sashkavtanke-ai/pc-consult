'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/layout/PageHeader';
import ContactForm from '@/components/forms/ContactForm';
import Modal from '@/components/layout/Modal';

type LandingSection = {
  title: string;
  points: string[];
};

type LandingFaqItem = {
  question: string;
  answer: string;
};

type SeoServiceLandingProps = {
  title: string;
  subtitle: string;
  intro: string;
  ctaTopic: string;
  sections: LandingSection[];
  faq?: LandingFaqItem[];
};

export default function SeoServiceLanding({
  title,
  subtitle,
  intro,
  ctaTopic,
  sections,
  faq = [],
}: SeoServiceLandingProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="min-h-screen">
      <PageHeader
        title={title}
        subtitle={subtitle}
        className="mt-28 md:mt-48 frosted-glass py-16 md:py-20 text-center overflow-hidden"
      />

      <div className="container mx-auto px-6 py-8 md:py-12">
        <section className="mx-auto max-w-5xl space-y-6">
          <article className="frosted-glass rounded-card shadow-card p-6">
            <h2 className="mb-3 text-h3 font-bold text-primary">Для каких задач подходит услуга</h2>
            <p className="text-body text-text-muted">{intro}</p>
          </article>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {sections.map((section) => (
              <article key={section.title} className="frosted-glass rounded-card shadow-card p-6">
                <h2 className="mb-3 text-h4 font-bold text-primary">{section.title}</h2>
                <ul className="list-disc space-y-2 pl-5 text-body text-text-muted">
                  {section.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="button-base rounded-[4px] px-6 py-3 text-sm text-black"
            >
              Получить консультацию
            </button>
            <Link
              href="/services"
              className="text-sm font-semibold text-primary transition-colors hover:text-accent"
            >
              ← Вернуться ко всем услугам
            </Link>
          </div>

          {faq.length > 0 ? (
            <article className="frosted-glass rounded-card shadow-card p-6">
              <h2 className="mb-4 text-h3 font-bold text-primary">Часто задаваемые вопросы</h2>
              <div className="space-y-3">
                {faq.map((item) => (
                  <details key={item.question} className="rounded-lg border border-[rgba(33,115,70,0.2)] p-4">
                    <summary className="cursor-pointer font-semibold text-primary">{item.question}</summary>
                    <p className="mt-3 text-body text-text-muted">{item.answer}</p>
                  </details>
                ))}
              </div>
            </article>
          ) : null}
        </section>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        variant="service"
        title="Получить консультацию"
      >
        <div className="mx-auto w-full max-w-xl py-2">
          <p className="mb-4 text-sm text-text-muted">Оставьте контакты и кратко опишите задачу.</p>
          <ContactForm initialMessage={`Тема консультации: ${ctaTopic}\n\nКратко опишите ваш запрос:`} />
        </div>
      </Modal>

      {faq.length > 0 ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faq.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: item.answer,
                },
              })),
            }),
          }}
        />
      ) : null}
    </main>
  );
}
