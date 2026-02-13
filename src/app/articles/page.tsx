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
        <ArticlesGrid articles={articles} />
      </div>
    </main>
  );
}
