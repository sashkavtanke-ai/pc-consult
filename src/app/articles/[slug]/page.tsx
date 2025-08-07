'use client';

import React from 'react';
import Image from 'next/image';
import Head from 'next/head';
import dynamic from "next/dynamic"; // ленивый импорт
const Modal = dynamic(() => import("@/components/layout/Modal")); // ленивый импорт модального окна
import type { ArticleData } from '../types';

// Получение статьи по slug из файлов
async function getArticleData(slug: string): Promise<ArticleData | null> {
  try {
    const articleModule = await import(`../data/${slug}`);
    return articleModule.default;
  } catch {
    return null;
  }
}

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const [article, setArticle] = React.useState<ArticleData | null>(null);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    setLoading(true);
    getArticleData(slug).then((data) => {
      setArticle(data);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return null; // Можно заменить на спиннер
  }

  if (!article) {
    return (
      <Modal isOpen={true} onClose={() => window.history.back()} variant="article">
        <div className="flex flex-col items-center justify-center min-h-[200px]">
          <h2 className="font-heading text-h2 font-bold text-primary mb-4">Статья не найдена</h2>
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
    <>
      {/* SEO meta-теги */}
      <Head>
        <title>{article.title} | ПК</title>
        <meta name="description" content={article.seoDescription || article.content?.slice(0, 160)} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.seoDescription || article.content?.slice(0, 160)} />
        <meta property="og:image" content={article.imageUrl} />
        <meta property="og:type" content="article" />
        <meta name="keywords" content={Array.isArray(article.seoKeywords) ? article.seoKeywords.join(', ') : ''} />
      </Head>
      <Modal
        isOpen={true}
        onClose={() => window.history.back()}
        variant="article"
        title={article.title}
      >
        <article
          className="p-8 relative w-full"
          style={{ minHeight: '60vh', borderRadius: 4 }}
        >
          {/* <h1 className="font-heading text-h1 font-bold text-primary">{article.title}</h1> */}
          {article.imageUrl && (
            <div className="relative h-96 w-full my-8 rounded-lg overflow-hidden">
              <Image
                src={article.imageUrl}
                alt={`Обложка статьи ${article.title}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          )}
          <div
            className="prose lg:prose-xl max-w-none text-body text-text-muted"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": article.title,
                "image": article.imageUrl,
                "datePublished": "2025-06-10",
                "description": article.seoDescription || article.content?.slice(0, 160),
                "keywords": article.seoKeywords,
                "author": {
                  "@type": "Organization",
                  "name": "ПК"
                }
              }),
            }}
          />
        </article>
      </Modal>
    </>
  );
}
