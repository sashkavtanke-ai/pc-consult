export const revalidate = 60;

import type { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import ArticlesGrid from '@/components/cards/ArticlesGrid';
import { getAllArticles } from './data/getAllArticles';
import type { ArticleData } from './types';

export const metadata: Metadata = {
  title: 'Статьи по стратегии, финансам и управлению бизнесом',
  description:
    'Практические статьи для собственников и руководителей: стратегия роста, финансы, управленческий учет, продажи, операционная эффективность.',
  alternates: {
    canonical: '/articles',
  },
};

export default async function ArticlesPage() {
  const articles: ArticleData[] = await getAllArticles();
  const featuredSlugs = new Map([
    ['otchet-dvizheniya-denezhnyh-sredstv', 0],
    ['kak-snizit-nalogi', 1],
    ['finansovaya-model-kak-sostavit', 2],
    ['ocenka-biznesa-kak-opredelit-stoimost', 3],
    ['zarubezhnye-scheta-fns', 4],
  ]);

  const sortedArticles = [...articles].sort((a, b) => {
    const aRank = featuredSlugs.get(a.slug);
    const bRank = featuredSlugs.get(b.slug);

    if (aRank !== undefined || bRank !== undefined) {
      if (aRank === undefined) return 1;
      if (bRank === undefined) return -1;
      return aRank - bRank;
    }

    if (a.datePublished !== b.datePublished) {
      return b.datePublished.localeCompare(a.datePublished);
    }

    return a.title.localeCompare(b.title, 'ru');
  });

  return (
    <main>
      <PageHeader
        title="Практические статьи для роста бизнеса"
        subtitle="Материалы по стратегии, финансам, продажам и операционному управлению для малого и среднего бизнеса."
        className="mt-28 md:mt-48 frosted-glass py-16 md:py-6 text-center overflow-hidden"
      />

      <div className="container mx-auto px-6 py-6">
        <h2 className="mb-6 text-center text-h3 font-bold text-primary">
          Статьи по стратегии, финансам и управлению бизнесом
        </h2>
        <ArticlesGrid articles={sortedArticles} />
      </div>
    </main>
  );
}
