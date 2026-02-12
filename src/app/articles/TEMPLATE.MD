---
# Шаблон для генерации TypeScript-файла статьи
# В ответе LLM должен быть только валидный TypeScript-код для вставки в папку data/
# файл для статьи в формате .ts
# с именем, соответствующим slug статьи (например, '1.ts' для slug '
---

import type { ArticleData } from '../types';

const article: ArticleData = {
  slug: '', // уникальный идентификатор статьи (например, '1')
  title: '', // заголовок статьи
  imageUrl: '', // путь к изображению статьи (например, '/articles/article1.jpg')
  content: `
    <p>Краткое введение...</p>
    <h2>Подзаголовок 1</h2>
    <p>Основной текст...</p>
    <ul>
      <li>Список 1</li>
      <li>Список 2</li>
    </ul>
    <h2>Подзаголовок 2</h2>
    <blockquote>Цитата или важная мысль</blockquote>
    <img src="путь_к_изображению" alt="Описание изображения" />
  `,
  datePublished: '', // дата публикации в формате 'YYYY-MM-DD'
  author: {
    name: '', // имя автора или организации
    type: '', // 'Person' или 'Organization'
  },
  seoDescription: '', // SEO-описание статьи
  seoKeywords: '', // SEO-ключевые слова
};

export default article;
