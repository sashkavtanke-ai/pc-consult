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
