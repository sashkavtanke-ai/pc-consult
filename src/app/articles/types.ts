export interface ArticleAuthor {
  name: string;
  type: string;
}

export interface ArticleFaqItem {
  question: string;
  answer: string;
}

export interface ArticleData {
  slug: string;
  title: string;
  imageUrl?: string;
  content: string;
  datePublished: string;
  author: ArticleAuthor;
  ctaTopic?: string;
  seoDescription?: string;
  seoKeywords?: string;
  faq?: ArticleFaqItem[];
}
