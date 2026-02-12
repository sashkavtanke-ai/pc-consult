export interface ProjectData {
  slug: string;
  title: string;
  category: string;
  imageUrl: string; // Для новых проектов используйте путь imageUrl: '/app/projects/data/img/data/img/your-image.jpg'
  summary: string; // Краткое описание для карточки
  description: string;
  /** SEO-описание для поисковых систем (до 160 символов) */
  seoDescription: string;
  /** Ключевые слова для SEO (через запятую) */
  seoKeywords: string;
}
