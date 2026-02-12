// Клиентский компонент для анимационной сетки статей
'use client';

import { motion } from 'framer-motion';
import ArticleCard from '@/components/cards/ArticleCard';
import { staggerContainer, fadeInItem } from '@/lib/animations';
import type { ArticleData } from '@/app/articles/types';

// Принимает список статей и отображает сетку с анимацией
export default function ArticlesGrid({ articles }: { articles: ArticleData[] }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {articles.map((article) => (
        <motion.div
          variants={fadeInItem}
          key={article.slug}
          className="frosted-glass p-8 rounded-card shadow-md text-center flex flex-col items-center my-4"
        >
          <ArticleCard
            title={article.title}
            imageUrl={article.imageUrl}
            description={article.content.slice(0, 120) + (article.content.length > 120 ? '...' : '')}
            href={`/articles/${article.slug}`}
            date={article.datePublished}
            seoDescription={article.seoDescription}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}