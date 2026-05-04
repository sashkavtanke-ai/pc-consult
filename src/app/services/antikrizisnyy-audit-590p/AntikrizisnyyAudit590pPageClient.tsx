'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Activity, BarChart3, CheckCircle2, CreditCard, ShieldCheck, TrendingUp } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import ContactForm from '@/components/forms/ContactForm';
import Modal from '@/components/layout/Modal';

const urgencyPoints = [
  'Налоговая нагрузка выросла на 20-30 %, а ФНС усиливает внимание к компаниям с просадкой выручки.',
  'Просрочки по кредитам и лизингу ухудшают переговорную позицию бизнеса перед банками.',
  'Клиенты тратят осторожнее, поэтому ошибка в cash flow быстро превращается в кассовый разрыв.',
  'Банки оценивают заемщика по долговой нагрузке, качеству платежей и устойчивости денежного потока.',
];

const deliverables = [
  'Расчет DTI: доля обязательных платежей в выручке.',
  'Расчет DSCR: способность обслуживать долги из денежного потока.',
  'Рейтинг качества компании по логике банковской оценки.',
  'План легального снижения налоговой нагрузки и операционных потерь.',
  'Рекомендации по реструктуризации долгов и переговорам с банком.',
  'Прогноз денежного потока на 3-6 месяцев.',
];

const resultRows = [
  {
    company: 'Дистрибьютор электроники',
    before: 'DTI 62 %',
    action: 'Оптимизация налогов и графика платежей',
    result: 'Экономия 8 млн ₽ в год',
  },
  {
    company: 'Сеть ветеринарных клиник',
    before: 'DSCR 0,9',
    action: 'Перестройка расходов и долговой нагрузки',
    result: 'DSCR вырос до 1,45 + 1,5 млн ₽/год',
  },
  {
    company: 'Строительная компания',
    before: 'Просрочка по кредитам',
    action: 'Переговоры с банком и финансовый план',
    result: 'Новый удобный график платежей',
  },
];

const faq = [
  {
    question: 'Что такое антикризисный аудит 590-П?',
    answer:
      'Это диагностика бизнеса по логике банковской оценки заемщика: долговая нагрузка, денежный поток, качество обслуживания обязательств и финансовая устойчивость.',
  },
  {
    question: 'Какие данные нужны для старта?',
    answer:
      'Обычно достаточно выручки за последние периоды, основных платежей, налоговой нагрузки, кредитов, аренды и информации о просрочках или переговорах с банками.',
  },
  {
    question: 'Что компания получает на выходе?',
    answer:
      'Расчет DTI и DSCR, карту рисков, прогноз денежного потока и практический план действий: налоги, расходы, долги и переговоры с кредиторами.',
  },
];

export default function AntikrizisnyyAudit590pPageClient() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="min-h-screen">
      <PageHeader
        title="Антикризисный аудит 590-П для бизнеса"
        subtitle="Показываем, как банк и ФНС видят вашу компанию, и готовим план защиты денежного потока."
        className="mt-28 md:mt-48 frosted-glass py-16 md:py-20 text-center overflow-hidden"
      />

      <div className="container mx-auto px-6 py-8 md:py-12">
        <section className="mx-auto max-w-6xl space-y-8">
          <article className="frosted-glass rounded-card shadow-card p-6 md:p-8">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <p className="mb-4 text-body text-text-muted">
                  Налоги выросли, клиенты тратят осторожнее, а банки жестче смотрят на долговую
                  нагрузку. Мы оцениваем бизнес по близкой к банковской логике 590-П и заранее
                  показываем слабые места, которые могут ударить по кредитам, налогам и cash flow.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="button-base rounded-[4px] px-6 py-3 text-sm text-black"
                  >
                    Получить мини-аудит
                  </button>
                  <Link
                    href="/services"
                    className="inline-flex items-center text-sm font-semibold text-primary transition-colors hover:text-accent"
                  >
                    ← Вернуться ко всем услугам
                  </Link>
                </div>
              </div>

              <div className="rounded-card border border-[rgba(33,115,70,0.18)] bg-white/65 p-5 shadow-card">
                <p className="mb-4 text-sm font-semibold uppercase text-accent">Ключевые показатели</p>
                <div className="space-y-4 text-text-muted">
                  <div>
                    <p className="text-h4 font-bold text-primary">DTI</p>
                    <p>Обязательные платежи / выручка × 100 %. Нормальный ориентир: до 40-50 %.</p>
                  </div>
                  <div>
                    <p className="text-h4 font-bold text-primary">DSCR</p>
                    <p>Денежный поток после расходов / платежи по долгам. Целевой ориентир: от 1,2-1,3.</p>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <section className="grid gap-6 md:grid-cols-2">
            <article className="frosted-glass rounded-card shadow-card p-6">
              <div className="mb-4 flex items-center gap-3 text-primary">
                <ShieldCheck className="text-accent" size={28} />
                <h2 className="text-h3 font-bold">Что это такое</h2>
              </div>
              <p className="text-body text-text-muted">
                По 590-П банки оценивают финансовое положение заемщика и качество обслуживания
                долга. Мы переводим эту логику в управленческий аудит: быстро считаем риски,
                показываем рейтинг компании и даем практический план улучшения.
              </p>
            </article>

            <article className="frosted-glass rounded-card shadow-card p-6">
              <div className="mb-4 flex items-center gap-3 text-primary">
                <Activity className="text-accent" size={28} />
                <h2 className="text-h3 font-bold">Когда нужен аудит</h2>
              </div>
              <ul className="list-disc space-y-2 pl-5 text-body text-text-muted">
                {urgencyPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          </section>

          <section className="frosted-glass rounded-card shadow-card p-6">
            <div className="mb-5 flex items-center gap-3 text-primary">
              <BarChart3 className="text-accent" size={28} />
              <h2 className="text-h3 font-bold">Что вы получите</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {deliverables.map((item) => (
                <div key={item} className="flex gap-3 rounded-lg border border-[rgba(33,115,70,0.16)] p-4">
                  <CheckCircle2 className="mt-1 shrink-0 text-accent" size={20} />
                  <p className="text-body text-text-muted">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="frosted-glass rounded-card shadow-card p-6">
            <div className="mb-5 flex items-center gap-3 text-primary">
              <TrendingUp className="text-accent" size={28} />
              <h2 className="text-h3 font-bold">Реальные результаты</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[rgba(33,115,70,0.22)] text-primary">
                    <th className="px-4 py-3 font-bold">Компания</th>
                    <th className="px-4 py-3 font-bold">Проблема до</th>
                    <th className="px-4 py-3 font-bold">Что сделали</th>
                    <th className="px-4 py-3 font-bold">Результат</th>
                  </tr>
                </thead>
                <tbody>
                  {resultRows.map((row) => (
                    <tr key={row.company} className="border-b border-[rgba(33,115,70,0.12)]">
                      <td className="px-4 py-3 text-text-muted">{row.company}</td>
                      <td className="px-4 py-3 text-text-muted">{row.before}</td>
                      <td className="px-4 py-3 text-text-muted">{row.action}</td>
                      <td className="px-4 py-3 font-semibold text-primary">{row.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <article className="frosted-glass rounded-card shadow-card p-6">
              <div className="mb-4 flex items-center gap-3 text-primary">
                <CreditCard className="text-accent" size={28} />
                <h2 className="text-h3 font-bold">Цены и форматы</h2>
              </div>
              <div className="space-y-3 text-body text-text-muted">
                <p>
                  <strong className="text-primary">Экспресс-аудит 15 минут</strong> — бесплатно.
                </p>
                <p>
                  <strong className="text-primary">Полный аудит + план</strong> — от 45 000 ₽.
                </p>
                <p>
                  <strong className="text-primary">Сопровождение 3-6 месяцев</strong> — фиксированная цена после диагностики.
                </p>
              </div>
            </article>

            <article id="form" className="frosted-glass rounded-card shadow-card p-6">
              <h2 className="mb-3 text-h3 font-bold text-primary">Получить мини-аудит</h2>
              <p className="mb-4 text-body text-text-muted">
                Оставьте контакты и кратко опишите выручку, основные платежи и текущие риски.
              </p>
              <ContactForm initialMessage="Тема консультации: Антикризисный аудит 590-П для бизнеса&#10;&#10;Кратко опишите выручку, платежи, кредиты и текущие сложности:" />
            </article>
          </section>

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
        </section>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} variant="service" title="Получить мини-аудит">
        <div className="mx-auto w-full max-w-xl py-2">
          <p className="mb-4 text-sm text-text-muted">Оставьте контакты и кратко опишите задачу.</p>
          <ContactForm initialMessage="Тема консультации: Антикризисный аудит 590-П для бизнеса&#10;&#10;Кратко опишите выручку, платежи, кредиты и текущие сложности:" />
        </div>
      </Modal>

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
    </main>
  );
}
