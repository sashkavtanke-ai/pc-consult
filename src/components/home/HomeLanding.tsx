import Link from 'next/link';
import {
  ArrowRight,
  BriefcaseBusiness,
  ChartColumnIncreasing,
  CircleCheckBig,
  Landmark,
  Scale,
  ShieldCheck,
  WalletCards,
} from 'lucide-react';
import ContactForm from '@/components/forms/ContactForm';
import {
  expressConsultations,
  legacyComplexServices,
  serviceOffers,
} from '@/app/services/servicesData';

const formatCards = [
  {
    title: 'Экспресс-консультации',
    description:
      'Быстрый разбор задачи, рекомендации и конкретный план действий для роста бизнеса или снижения финансовой нагрузки.',
    href: '/services/express',
    points: ['От 60 минут', 'Быстрый результат', 'Понятный следующий шаг'],
  },
  {
    title: 'Комплексное сопровождение',
    description:
      'Долгосрочная работа с собственником и командой: финансы, стратегия, операционная эффективность и юридический контур.',
    href: '/services/complex',
    points: ['Под ключ', 'Системные изменения', 'Поддержка внедрения'],
  },
];

const featuredSolutions = [
  {
    title: expressConsultations[0].title,
    description: expressConsultations[0].whatClientGets,
    href: '/services/express',
    icon: <ChartColumnIncreasing size={22} className="text-accent" />,
  },
  {
    title: expressConsultations[2].title,
    description: expressConsultations[2].whatClientGets,
    href: '/services/express',
    icon: <WalletCards size={22} className="text-accent" />,
  },
  {
    title: expressConsultations[8].title,
    description: expressConsultations[8].whatClientGets,
    href: '/services/express',
    icon: <Scale size={22} className="text-accent" />,
  },
  {
    title: serviceOffers.find((item) => item.id === 'business-accounting')!.title,
    description: serviceOffers.find((item) => item.id === 'business-accounting')!.description,
    href: '/services/complex',
    icon: <BriefcaseBusiness size={22} className="text-accent" />,
  },
  {
    title: serviceOffers.find((item) => item.id === 'business-valuation')!.title,
    description: serviceOffers.find((item) => item.id === 'business-valuation')!.description,
    href: '/services/complex',
    icon: <Landmark size={22} className="text-accent" />,
  },
  {
    title: serviceOffers.find((item) => item.id === 'individual-tax-support')!.title,
    description: serviceOffers.find((item) => item.id === 'individual-tax-support')!.description,
    href: '/services/complex',
    icon: <ShieldCheck size={22} className="text-accent" />,
  },
];

const benefits = [
  'Помогаем навести порядок в финансах, снизить потери и увидеть точки роста бизнеса.',
  'Разбираем ситуацию на языке цифр: прибыль, расходы, денежный поток, риски и управленческие решения.',
  'Даём понятный план действий: от разовой консультации до комплексного сопровождения бизнеса.',
];

const steps = [
  {
    title: 'Фиксируем задачу',
    description:
      'Понимаем, что именно нужно: рост выручки, финансовый контроль, снижение издержек, долговая нагрузка или юридическая поддержка.',
  },
  {
    title: 'Проводим разбор',
    description:
      'Изучаем цифры, документы и контекст бизнеса. Не даем абстрактных советов без опоры на реальную ситуацию.',
  },
  {
    title: 'Выдаем решение',
    description:
      'Формируем конкретные рекомендации, план внедрения и следующий шаг: экспресс-формат или комплексное сопровождение.',
  },
  {
    title: 'Сопровождаем внедрение',
    description:
      'Помогаем довести решения до результата: контролируем ход работ, корректируем маршрут и снимаем узкие места.',
  },
];

const faqItems = [
  {
    question: 'С какими компаниями вы работаете?',
    answer:
      'Основной фокус — малый и средний бизнес, собственники, руководители и компании, которым нужен финансовый, стратегический или управленческий контур.',
  },
  {
    question: 'Можно ли начать с одной консультации?',
    answer:
      'Да. Для этого на сайте выделен отдельный формат экспресс-консультаций. Он подходит, когда нужно быстро разобраться в ситуации и получить рабочий план.',
  },
  {
    question: 'Вы работаете только в Санкт-Петербурге?',
    answer:
      'Нет. Работаем в Санкт-Петербурге и по всей России: онлайн, с документами и удаленным сопровождением, а при необходимости — в очном формате.',
  },
  {
    question: 'Что происходит после заявки?',
    answer:
      'Мы связываемся, уточняем задачу, предлагаем подходящий формат и фиксируем следующий шаг: консультацию, аудит, подготовку документов или сопровождение.',
  },
];

export default function HomeLanding() {
  return (
    <main className="min-h-screen">
      <section className="container mx-auto px-6 pt-28 pb-8 md:pt-36 md:pb-12">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-stretch">
          <div className="frosted-glass rounded-[24px] border border-white/50 px-7 py-8 md:px-10 md:py-12">
            <div className="mb-5 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              <span>Санкт-Петербург</span>
              <span>Финансы</span>
              <span>Стратегия</span>
              <span>Сопровождение бизнеса</span>
            </div>

            <h1 className="max-w-4xl font-heading text-h1 font-bold leading-[1.05] text-primary">
              Консалтинг для бизнеса: стратегия, финансы и управленческие решения
            </h1>

            <p className="mt-5 max-w-3xl text-h4 leading-relaxed text-text-muted">
              Помогаем собственникам и руководителям навести порядок в финансах, увидеть точки роста,
              снизить риски и перейти от разрозненных действий к понятной системе управления.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact-form" className="button-base px-6 py-3 text-sm">
                Получить консультацию
              </a>
              <a href="#formats" className="button-soft-accent px-6 py-3 text-sm">
                Смотреть форматы работы
              </a>
              <Link href="/projects" className="button-soft-accent px-6 py-3 text-sm">
                Кейсы и результаты
              </Link>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {benefits.map((item) => (
                <div
                  key={item}
                  className="rounded-card border border-white/45 bg-white/50 p-4 backdrop-blur-sm"
                >
                  <CircleCheckBig size={18} className="mb-3 text-accent" />
                  <p className="text-sm leading-6 text-text-muted">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="frosted-glass rounded-[24px] border border-white/50 px-7 py-8 md:px-8 md:py-10">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
              Быстрый старт
            </p>
            <h2 className="mt-3 font-heading text-h3 font-bold text-primary">
              Выберите формат и оставьте заявку
            </h2>
            <p className="mt-4 text-body text-text-muted">
              Если задача уже понятна, перейдите к нужному формату. Если нужна помощь с выбором, оставьте
              заявку и мы предложим оптимальный сценарий работы.
            </p>

            <div className="mt-6 space-y-3">
              {formatCards.map((card) => (
                <Link
                  key={card.title}
                  href={card.href}
                  className="block rounded-card border border-white/45 bg-white/55 p-4 transition-transform hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-bold text-primary">{card.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-text-muted">{card.description}</p>
                    </div>
                    <ArrowRight size={18} className="mt-1 shrink-0 text-accent" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-6 rounded-card border border-[color:rgba(33,115,70,0.22)] bg-[color:rgba(33,115,70,0.08)] p-4">
              <p className="text-sm font-semibold text-primary">Что чаще всего запрашивают</p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-text-muted">
                <li>Финансовый чек-ап и управленческий учет</li>
                <li>Оптимизация издержек и прибыльности</li>
                <li>Работа с долгами, судами и кредиторами</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="formats" className="container mx-auto px-6 py-8 md:py-12">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">Форматы работы</p>
          <h2 className="mt-3 font-heading text-h2 font-bold text-primary">
            От разовой консультации до сопровождения бизнеса
          </h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {formatCards.map((card) => (
            <article
              key={card.title}
              className="frosted-glass rounded-[20px] border border-white/50 p-7"
            >
              <h3 className="font-heading text-h3 font-bold text-primary">{card.title}</h3>
              <p className="mt-3 text-body text-text-muted">{card.description}</p>
              <ul className="mt-5 space-y-2 text-sm text-text-muted">
                {card.points.map((point) => (
                  <li key={point} className="flex items-center gap-2">
                    <CircleCheckBig size={16} className="text-accent" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={card.href} className="button-soft-accent px-5 py-3 text-sm">
                  Перейти к разделу
                </Link>
                <a href="#contact-form" className="button-base px-5 py-3 text-sm">
                  Обсудить задачу
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 py-8 md:py-12">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">Популярные запросы</p>
          <h2 className="mt-3 font-heading text-h2 font-bold text-primary">
            С чем к нам приходят чаще всего
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredSolutions.map((item) => (
            <article
              key={item.title}
              className="frosted-glass rounded-[18px] border border-white/50 p-6"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[color:rgba(33,115,70,0.10)]">
                {item.icon}
              </div>
              <h3 className="text-h4 font-bold text-primary">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-text-muted">{item.description}</p>
              <Link href={item.href} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-accent">
                Подробнее
                <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 py-8 md:py-12">
        <div className="grid gap-6 lg:grid-cols-3">
          {legacyComplexServices.map((item) => (
            <article
              key={item.title}
              className="frosted-glass rounded-[18px] border border-white/50 p-7"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-accent">
                Комплексное сопровождение
              </p>
              <h3 className="mt-3 text-h4 font-bold text-primary">{item.title}</h3>
              <p className="mt-3 text-body text-text-muted">{item.description}</p>
              <p className="mt-5 text-sm leading-6 text-text-muted">{item.details}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 py-8 md:py-12">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">Этапы работы</p>
          <h2 className="mt-3 font-heading text-h2 font-bold text-primary">
            Работаем по понятной схеме
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="frosted-glass rounded-[18px] border border-white/50 p-6"
            >
              <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[color:rgba(33,115,70,0.12)] text-sm font-bold text-primary">
                0{index + 1}
              </div>
              <h3 className="text-h4 font-bold text-primary">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-text-muted">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 py-8 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="frosted-glass rounded-[22px] border border-white/50 p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">FAQ</p>
            <h2 className="mt-3 font-heading text-h2 font-bold text-primary">
              Частые вопросы перед стартом
            </h2>
            <p className="mt-4 text-body text-text-muted">
              Если вопрос не закрыт, отправьте заявку. Мы быстро подскажем, какой формат работы вам подходит.
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="frosted-glass rounded-[18px] border border-white/50 p-6"
              >
                <summary className="cursor-pointer list-none text-h4 font-bold text-primary">
                  {item.question}
                </summary>
                <p className="mt-4 text-body text-text-muted">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact-form" className="container mx-auto px-6 py-8 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="frosted-glass rounded-[24px] border border-white/50 p-7 md:p-9">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">Связаться с нами</p>
            <h2 className="mt-3 font-heading text-h2 font-bold text-primary">
              Оставьте заявку на консультацию
            </h2>
            <p className="mt-4 text-body text-text-muted">
              Опишите задачу, а мы предложим подходящий формат: экспресс-консультацию, аудит или комплексное сопровождение.
            </p>

            <div className="mt-6 space-y-4 text-sm text-text-muted">
              <div>
                <p className="font-semibold text-primary">Телефон</p>
                <p>+7 (981) 763-89-00</p>
              </div>
              <div>
                <p className="font-semibold text-primary">Email</p>
                <p>info@pc-consult.ru</p>
              </div>
              <div>
                <p className="font-semibold text-primary">Формат работы</p>
                <p>Санкт-Петербург и вся Россия, онлайн и очно по согласованию.</p>
              </div>
            </div>
          </div>

          <div className="frosted-glass rounded-[24px] border border-white/50 p-7 md:p-9">
            <ContactForm initialMessage="Интересует консультация. Кратко описываю задачу:" />
          </div>
        </div>
      </section>
    </main>
  );
}
