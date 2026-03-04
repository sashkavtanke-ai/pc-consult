import Link from 'next/link';
import {
  ArrowRight,
  BriefcaseBusiness,
  ChartColumnIncreasing,
  Landmark,
  Scale,
  ShieldCheck,
  WalletCards,
} from 'lucide-react';
import ContactForm from '@/components/forms/ContactForm';
import { getAllProjects } from '@/app/projects/data/getAllProjects';
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
    icon: <ChartColumnIncreasing size={22} className="text-primary" />,
  },
  {
    title: expressConsultations[2].title,
    description: expressConsultations[2].whatClientGets,
    href: '/services/express',
    icon: <WalletCards size={22} className="text-primary" />,
  },
  {
    title: expressConsultations[8].title,
    description: expressConsultations[8].whatClientGets,
    href: '/services/express',
    icon: <Scale size={22} className="text-primary" />,
  },
  {
    title: serviceOffers.find((item) => item.id === 'business-accounting')!.title,
    description: serviceOffers.find((item) => item.id === 'business-accounting')!.description,
    href: '/services/complex',
    icon: <BriefcaseBusiness size={22} className="text-primary" />,
  },
  {
    title: serviceOffers.find((item) => item.id === 'business-valuation')!.title,
    description: serviceOffers.find((item) => item.id === 'business-valuation')!.description,
    href: '/services/complex',
    icon: <Landmark size={22} className="text-primary" />,
  },
  {
    title: serviceOffers.find((item) => item.id === 'individual-tax-support')!.title,
    description: serviceOffers.find((item) => item.id === 'individual-tax-support')!.description,
    href: '/services/complex',
    icon: <ShieldCheck size={22} className="text-primary" />,
  },
];

const benefits = [
  {
    icon: <ChartColumnIncreasing size={18} className="text-primary" />,
    text: 'Помогаем навести порядок в финансах, снизить потери и увидеть точки роста бизнеса.',
  },
  {
    icon: <WalletCards size={18} className="text-primary" />,
    text: 'Разбираем ситуацию на языке цифр: прибыль, расходы, денежный поток, риски и управленческие решения.',
  },
  {
    icon: <Scale size={18} className="text-primary" />,
    text: 'Даём понятный план действий: от разовой консультации до комплексного сопровождения бизнеса.',
  },
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
      'Изучаем цифры, документы и контекст бизнеса. Не даём абстрактных советов без опоры на реальную ситуацию.',
  },
  {
    title: 'Выдаём решение',
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
      'Нет. Работаем в Санкт-Петербурге и по всей России: онлайн, с документами и удалённым сопровождением, а при необходимости — в очном формате.',
  },
  {
    question: 'Что происходит после заявки?',
    answer:
      'Мы связываемся, уточняем задачу, предлагаем подходящий формат и фиксируем следующий шаг: консультацию, аудит, подготовку документов или сопровождение.',
  },
];

function getBusinessTypeLabel(slug: string, fallbackTitle: string): string {
  switch (slug) {
    case '1-portfolio-distribution':
      return 'Дистрибьютор аудио- и видеопродукции';
    case '2-portfolio-vet':
      return 'Сеть ветеринарных клиник';
    case '3-portfolio-electronics':
      return 'Поставщик электроники';
    case '4-portfolio-construction':
      return 'Строительная компания';
    case '5-portfolio-beauty':
      return 'Салон красоты';
    case '6-portfolio-pvz':
      return 'Сеть ПВЗ';
    case '7-portfolio-legal':
      return 'Юридическая компания';
    case '8-portfolio-energy':
      return 'Энергетическая компания';
    default:
      return fallbackTitle;
  }
}

export default async function HomeLanding() {
  const caseStudies = (await getAllProjects()).slice(0, 4);

  return (
    <main className="min-h-screen">
      <section className="container mx-auto px-6 pt-22 pb-6 md:pt-28 md:pb-8">
        <div className="mx-auto max-w-[1280px]">
          <div className="frosted-glass flex h-full flex-col rounded-[24px] border border-white/50 px-8 py-7 md:px-12 md:py-10">
            <h1 className="max-w-[980px] font-heading text-[clamp(2.6rem,1.8vw+2rem,4rem)] font-bold leading-[1.02] text-primary">
              Прокладываем деньгам путь к вашему счёту.
            </h1>

            <p className="mt-4 max-w-[900px] text-[clamp(1.15rem,0.45vw+1rem,1.45rem)] leading-relaxed text-text-muted">
              Финансовые и юридические решения для бизнеса и частных клиентов.
            </p>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {benefits.map((item) => (
                <div
                  key={item.text}
                  className="rounded-card border border-white/45 bg-white/50 p-4 backdrop-blur-sm"
                >
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-[color:rgba(10,37,64,0.08)]">
                    {item.icon}
                  </div>
                  <p className="text-sm leading-6 text-text-muted">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-3 grid gap-3 md:grid-cols-3">
              <a
                href="#contact-form"
                className="button-base inline-flex min-h-[48px] w-full items-center justify-center px-5 py-2.5 text-sm"
              >
                Получить консультацию
              </a>
              <a
                href="#formats"
                className="button-soft-accent inline-flex min-h-[48px] w-full items-center justify-center px-5 py-2.5 text-sm"
              >
                Форматы работы
              </a>
              <a
                href="#cases"
                className="button-soft-accent inline-flex min-h-[48px] w-full items-center justify-center px-5 py-2.5 text-sm"
              >
                Кейсы и результаты
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="formats" className="container mx-auto px-6 py-6 md:py-8">
        <div className="mb-6 text-center">
          <h2 className="font-heading text-h2 font-bold text-primary">
            От разовой консультации до сопровождения бизнеса
          </h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {formatCards.map((card) => (
            <article
              key={card.title}
              className="frosted-glass rounded-[20px] border border-white/50 p-6 md:p-8"
            >
              <h3 className="text-center font-heading text-h3 font-bold text-primary">{card.title}</h3>
              <p className="mt-4 text-body text-text-muted">{card.description}</p>
              <ul className="mt-6 space-y-3 text-sm text-text-muted">
                {card.points.map((point) => (
                  <li key={point} className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-primary/80" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 grid gap-3 md:grid-cols-2">
                <Link
                  href={card.href}
                  className="button-soft-accent inline-flex min-h-[48px] w-full items-center justify-center px-5 py-3 text-center text-sm"
                >
                  Перейти к разделу
                </Link>
                <a
                  href="#contact-form"
                  className="button-base inline-flex min-h-[48px] w-full items-center justify-center px-5 py-3 text-center text-sm"
                >
                  Обсудить задачу
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="cases" className="container mx-auto px-6 py-6 md:py-8">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-heading text-h2 font-bold text-primary">Кейсы и результаты</h2>
            <p className="mt-3 max-w-[760px] text-body text-text-muted">
              Показываем не абстрактные обещания, а реальные проекты: где снижали издержки, выстраивали контроль и помогали собственнику принимать решения на цифрах.
            </p>
          </div>
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-accent">
            Все кейсы
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {caseStudies.map((project) => (
            <article
              key={project.slug}
              className="frosted-glass rounded-[18px] border border-white/50 p-6 md:p-7"
            >
              <h3 className="text-h4 font-bold text-primary">
                {getBusinessTypeLabel(project.slug, project.title)}
              </h3>
              <p className="mt-3 text-sm font-medium leading-6 text-primary/75">{project.title}</p>
              <p className="mt-4 text-sm leading-6 text-text-muted">{project.summary}</p>
              <Link
                href={`/projects/${project.slug}`}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-accent"
              >
                Смотреть кейс
                <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 py-6 md:py-8">
        <div className="mb-6 text-center">
          <h2 className="font-heading text-h2 font-bold text-primary">
            С чем к нам приходят чаще всего
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredSolutions.map((item) => (
            <article
              key={item.title}
              className="frosted-glass rounded-[18px] border border-white/50 p-6 md:p-7"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[color:rgba(10,37,64,0.08)]">
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

      <section className="container mx-auto px-6 py-6 md:py-8">
        <div className="grid gap-5 lg:grid-cols-3">
          {legacyComplexServices.map((item) => (
            <article
              key={item.title}
              className="frosted-glass rounded-[18px] border border-white/50 p-6 md:p-7"
            >
              <h3 className="text-h4 font-bold text-primary">{item.title}</h3>
              <p className="mt-3 text-body text-text-muted">{item.description}</p>
              <p className="mt-5 text-sm leading-6 text-text-muted">{item.details}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 py-6 md:py-8">
        <div className="mb-6 text-center">
          <h2 className="font-heading text-h2 font-bold text-primary">
            Работаем по понятной схеме
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="frosted-glass rounded-[18px] border border-white/50 p-6 md:p-7"
            >
              <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[color:rgba(10,37,64,0.08)] text-sm font-bold text-primary">
                0{index + 1}
              </div>
              <h3 className="text-h4 font-bold text-primary">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-text-muted">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 py-6 md:py-8">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="frosted-glass rounded-[22px] border border-white/50 p-6 md:p-7">
            <h2 className="font-heading text-h2 font-bold text-primary">
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
                className="frosted-glass rounded-[18px] border border-white/50 p-5 md:p-6"
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

      <section id="contact-form" className="container mx-auto px-6 py-6 md:py-8">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="frosted-glass rounded-[24px] border border-[color:rgba(33,115,70,0.24)] bg-[color:rgba(33,115,70,0.06)] p-7 md:p-9">
            <h2 className="font-heading text-h2 font-bold text-primary">
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

            <div className="mt-6 rounded-card border border-white/50 bg-white/45 p-4">
              <p className="text-sm font-semibold text-primary">Что будет после заявки</p>
              <ul className="mt-3 space-y-2 text-sm leading-5 text-text-muted">
                <li>Свяжемся и уточним задачу.</li>
                <li>Предложим подходящий формат работы.</li>
                <li>Согласуем следующий практический шаг.</li>
              </ul>
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
