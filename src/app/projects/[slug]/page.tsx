import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllProjects } from '../data/getAllProjects';
import type { ProjectData } from '../types';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

type RelatedService = {
  href: string;
  title: string;
  description: string;
};

const relatedServiceByProjectSlug: Record<string, RelatedService> = {
  '1-portfolio-distribution': {
    href: '/services/cost-optimization',
    title: 'Оптимизация издержек',
    description: 'Аудит затрат и план снижения финансовой нагрузки без потери управляемости.',
  },
  '2-portfolio-vet': {
    href: '/services/financial-modeling',
    title: 'Финансовая модель бизнеса',
    description: 'Настройка управленческого контура и модели денежных потоков для сети клиник.',
  },
  '3-portfolio-electronics': {
    href: '/services/financial-modeling',
    title: 'Финансовая модель бизнеса',
    description: 'Финансовое планирование для устойчивого роста и контроля cash flow.',
  },
  '4-portfolio-construction': {
    href: '/services/ocenka-biznesa',
    title: 'Оценка стоимости бизнеса',
    description: 'Оценка компании и инвестиционной привлекательности для сделок и финансирования.',
  },
  '5-portfolio-beauty': {
    href: '/services/court-order-cancel',
    title: 'Отмена судебного приказа',
    description: 'Быстрая юридическая защита и снижение рисков взыскания.',
  },
  '6-portfolio-pvz': {
    href: '/services/debt-restructuring',
    title: 'Реструктуризация долгов',
    description: 'Снижение долговой нагрузки и стабилизация платежного графика.',
  },
  '7-portfolio-legal': {
    href: '/services/court-order-cancel',
    title: 'Отмена судебного приказа',
    description: 'Экспресс-формат для сложных споров и защиты бизнеса в сжатые сроки.',
  },
  '8-portfolio-energy': {
    href: '/services/ocenka-biznesa',
    title: 'Оценка стоимости бизнеса',
    description: 'Расчет стоимости компании и подготовка аргументов для инвесторов.',
  },
};

function stripHtml(html: string): string {
  return html
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getDescription(project: ProjectData): string {
  if (project.seoDescription?.trim()) {
    return project.seoDescription.trim();
  }

  return stripHtml(project.description).slice(0, 160);
}

function getKeywords(raw?: string): string[] | undefined {
  if (!raw?.trim()) {
    return undefined;
  }

  const items = raw
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  return items.length > 0 ? items : undefined;
}

async function getProjectBySlug(slug: string): Promise<ProjectData | null> {
  const projects = await getAllProjects();
  return projects.find((project) => project.slug === slug) ?? null;
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Проект не найден',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description = getDescription(project);

  return {
    title: project.title,
    description,
    keywords: getKeywords(project.seoKeywords),
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: project.title,
      description,
      url: `/projects/${project.slug}`,
      type: 'article',
      locale: 'ru_RU',
      images: [{ url: project.imageUrl, alt: project.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description,
      images: [project.imageUrl],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const description = getDescription(project);
  const relatedService = relatedServiceByProjectSlug[project.slug];

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-10 max-w-4xl">
        <Link href="/projects" className="inline-block mb-6 text-accent hover:underline">
          ← К списку проектов
        </Link>

        <article className="frosted-glass p-8 rounded-card shadow-md">
          <h1 className="font-heading text-h2 font-bold text-primary mb-3">{project.title}</h1>
          <p className="text-sm text-text-muted mb-6">Категория: {project.category}</p>

          <div className="relative h-80 w-full mb-8 rounded-lg overflow-hidden">
            <Image
              src={project.imageUrl}
              alt={`Обложка проекта ${project.title}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>

          <div
            className="prose lg:prose-xl max-w-none text-body text-text-muted"
            dangerouslySetInnerHTML={{ __html: project.description }}
          />

          {relatedService ? (
            <section className="mt-10 rounded-card border border-[rgba(33,115,70,0.25)] bg-[rgba(33,115,70,0.08)] p-6">
              <h2 className="text-h4 font-bold text-primary">Услуга по теме кейса</h2>
              <h3 className="mt-2 text-h4 font-semibold text-primary">{relatedService.title}</h3>
              <p className="mt-3 text-body text-text-muted">{relatedService.description}</p>
              <Link
                href={relatedService.href}
                className="button-base mt-5 inline-flex items-center justify-center px-6 py-3 text-sm text-black"
              >
                Перейти к услуге
              </Link>
            </section>
          ) : null}
        </article>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            headline: project.title,
            image: project.imageUrl,
            description,
            keywords: getKeywords(project.seoKeywords),
            author: {
              '@type': 'Organization',
              name: 'ПК',
            },
          }),
        }}
      />
    </main>
  );
}
