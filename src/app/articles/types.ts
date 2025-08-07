export interface ArticleAuthor {
  name: string;
  type: string;
}

export interface ArticleData {
  slug: string;
  title: string;
  imageUrl?: string;
  content: string;
  datePublished: string;
  author: ArticleAuthor;
  /** SEO-описание статьи (опционально) */
  seoDescription?: string;
  /** SEO-ключевые слова через запятую (опционально) */
  seoKeywords?: string;
}
