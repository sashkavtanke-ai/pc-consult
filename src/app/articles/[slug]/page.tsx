import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ContactForm from '@/components/forms/ContactForm';
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
  const faq = article.faq?.filter((item) => item.question.trim() && item.answer.trim());

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-6 py-10">
        <Link href="/articles" className="mb-6 inline-block text-accent hover:underline">
          ← К списку статей
        </Link>

        <article className="frosted-glass rounded-card p-8 shadow-md">
          <h1 className="mb-4 font-heading text-h2 font-bold text-primary">{article.title}</h1>
          <p className="mb-6 text-sm text-text-muted">{article.datePublished}</p>

          {hasImage && (
            <div className="relative mb-8 h-80 w-full overflow-hidden rounded-lg">
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
            className="prose max-w-none text-body text-text-muted lg:prose-xl"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {article.ctaTopic && (
            <div className="mt-10 rounded-card border border-[rgba(33,115,70,0.25)] bg-[rgba(33,115,70,0.08)] p-6">
              <h2 className="text-h4 font-bold text-primary">Нужна финансовая модель для вашего бизнеса?</h2>
              <p className="mt-3 text-body text-text-muted">
                Оставьте заявку, и мы проведём первичную диагностику задачи, оценим риски и предложим формат
                работы.
              </p>
              <Link
                href="#article-contact-form"
                className="button-base mt-5 inline-flex items-center justify-center px-6 py-3 text-sm"
              >
                Оставить заявку
              </Link>
            </div>
          )}
        </article>

        {article.ctaTopic && (
          <section id="article-contact-form" className="frosted-glass mt-8 rounded-card p-8 shadow-md">
            <h2 className="text-h3 font-bold text-primary">Получить консультацию</h2>
            <p className="mt-3 text-body text-text-muted">
              Заполните форму, и мы свяжемся с вами, чтобы обсудить задачу и подготовить первичные рекомендации.
            </p>
            <div className="mt-6">
              <ContactForm
                initialMessage={`Тема консультации: ${article.ctaTopic}\n\nКратко опишите задачу бизнеса:`}
              />
            </div>
          </section>
        )}
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
      {faq && faq.length > 0 && (
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
      )}
    </main>
  );
}
