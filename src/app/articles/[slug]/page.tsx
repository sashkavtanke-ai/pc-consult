import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllArticles } from '../data/getAllArticles';
import type { ArticleData } from '../types';

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

function getDescription(article: ArticleData): string {
  if (article.seoDescription?.trim()) {
    return article.seoDescription.trim();
  }

  const plain = stripHtml(article.content);
  return plain.slice(0, 160);
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

async function getArticleBySlug(slug: string): Promise<ArticleData | null> {
  const articles = await getAllArticles();
  return articles.find((article) => article.slug === slug) ?? null;
}

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Статья не найдена',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description = getDescription(article);
  const hasImage = Boolean(article.imageUrl && article.imageUrl.trim().length > 0);

  return {
    title: article.title,
    description,
    keywords: getKeywords(article.seoKeywords),
    alternates: {
      canonical: `/articles/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description,
      url: `/articles/${article.slug}`,
      type: 'article',
      locale: 'ru_RU',
      publishedTime: article.datePublished,
      images: hasImage ? [{ url: article.imageUrl!, alt: article.title }] : undefined,
    },
    twitter: {
      card: hasImage ? 'summary_large_image' : 'summary',
      title: article.title,
      description,
      images: hasImage ? [article.imageUrl!] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const hasImage = Boolean(article.imageUrl && article.imageUrl.trim().length > 0);
  const description = getDescription(article);

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-10 max-w-4xl">
        <Link href="/articles" className="inline-block mb-6 text-accent hover:underline">
          ← К списку статей
        </Link>

        <article className="frosted-glass p-8 rounded-card shadow-md">
          <h1 className="font-heading text-h2 font-bold text-primary mb-4">{article.title}</h1>
          <p className="text-sm text-text-muted mb-6">{article.datePublished}</p>

          {hasImage && (
            <div className="relative h-80 w-full mb-8 rounded-lg overflow-hidden">
              <Image
                src={article.imageUrl!}
                alt={`Обложка статьи ${article.title}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          )}

          <div
            className="prose lg:prose-xl max-w-none text-body text-text-muted"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: article.title,
            image: hasImage ? article.imageUrl : undefined,
            datePublished: article.datePublished,
            description,
            keywords: getKeywords(article.seoKeywords),
            author: {
              '@type': article.author.type,
              name: article.author.name,
            },
          }),
        }}
      />
    </main>
  );
}
