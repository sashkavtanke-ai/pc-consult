'use client';
import React from 'react';
import Image from 'next/image';
import dynamic from "next/dynamic"; // ленивый импорт
const Modal = dynamic(() => import("@/components/layout/Modal")); // ленивый импорт модального окна
import type { ProjectData } from '../types';

// Получение данных проекта по slug
async function getProjectData(slug: string): Promise<ProjectData | null> {
  try {
    const projectModule = await import(`../data/${slug}`);
    return projectModule.default;
  } catch {
    return null;
  }
}

// Получение данных проекта по slug (динамический импорт)

// Компонент страницы проекта — теперь клиентский, с useEffect/useState
export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const [project, setProject] = React.useState<ProjectData | null | undefined>(undefined);

  React.useEffect(() => {
    getProjectData(slug).then(setProject);
  }, [slug]);

  if (project === undefined) return null; // SSR/CSR guard

  if (!project) {
    return (
      <Modal isOpen={true} onClose={() => window.history.back()} title="Проект не найден">
        <div className="flex flex-col items-center justify-center min-h-[200px]">
          {/* Заголовок теперь только в header модального окна */}
          <p className="text-body text-text-muted mb-6">Возможно, вы перешли по устаревшей или неверной ссылке.</p>
          <button
            className="px-6 py-2 rounded-lg bg-primary color-text font-semibold hover:bg-primary-dark transition-colors"
            onClick={() => window.history.back()}
          >
            Вернуться назад
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={true}
      onClose={() => window.history.back()}
      title={project.title}
      variant="project"
    >
      <article className="p-8 relative w-full" style={{ borderRadius: 4 }}>
            {/* Дублируем заголовок в теле модального окна */}
            {/* <h2 className="text-2xl font-bold text-center mb-6">{project.title}</h2> */}
            {/* Заголовок теперь только в header модального окна */}
            <div className="relative w-full my-8 rounded-lg overflow-hidden flex justify-center">
              <Image
                src={project.imageUrl}
                alt={`Обложка проекта ${project.title}`}
                width={900}
                height={360}
                layout="responsive"
                objectFit="cover"
                className="rounded-lg"
                style={{ maxHeight: 320, width: '100%', objectFit: 'cover' }}
              />
            </div>
            <div
              className="text-body text-text-muted mb-6"
              dangerouslySetInnerHTML={{ __html: project.description }}
            />
            <div className="text-sm text-gray-400 mb-2">Категория: {project.category}</div>
            {/* SEO-описание, если есть */}
            {project.seoDescription && (
              <div className="text-xs text-gray-500 mb-2">SEO: {project.seoDescription}</div>
            )}
            {/* Ключевые слова, если есть */}
            {project.seoKeywords && Array.isArray(project.seoKeywords) && project.seoKeywords.length > 0 && (
              <div className="text-xs text-gray-400 mb-2">
                Ключевые слова: {project.seoKeywords.join(', ')}
              </div>
            )}
            {/* Структурированные данные для SEO */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "CreativeWork",
                  "headline": project.title,
                  "image": project.imageUrl,
                  "description": project.seoDescription || project.description,
                  "keywords": project.seoKeywords,
                  "author": {
                    "@type": "Organization",
                    "name": "ПК"
                  }
                }),
              }}
            />
          </article>
    </Modal>
  );
}

// Комментарии на русском для пояснения:
// — Динамический импорт данных проекта по slug
// — Обработка случая, когда проект не найден
// — Использование типа ProjectData
// — Вывод основных деталей проекта