// Включаем ISR: страница будет пересобираться не чаще, чем раз в 60 секунд
export const revalidate = 60;

import type { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
// Импортируем ArticlesGrid — клиентский компонент для анимационной сетки
import ArticlesGrid from '@/components/cards/ArticlesGrid';
import { getAllArticles } from './data/getAllArticles';
import type { ArticleData } from './types';

export const metadata: Metadata = {
  title: 'Статьи',
  description:
    'Практические статьи по стратегии, финансам, продажам, управлению и развитию бизнеса от экспертов ООО «ПК».',
  alternates: {
    canonical: '/articles',
  },
};

// Серверный компонент: получает данные на сервере и рендерит список статей
export default async function ArticlesPage() {
  const articles: ArticleData[] = await getAllArticles();

  return (
    <main>
      <PageHeader
        title="Наши статьи"
        subtitle="Делимся экспертизой, инсайтами и аналитикой из мира бизнеса, финансов и управления."
        className="mt-28 md:mt-48 frosted-glass py-16 md:py-6 text-center overflow-hidden"
      />

      <div className="container mx-auto px-6 py-6">
        {/* Передаём данные в клиентский компонент ArticlesGrid */}
        <ArticlesGrid articles={articles} />
      </div>
    </main>
	);
}
