---
# Шаблон для генерации TypeScript-файла проекта
# В ответе LLM должен быть только валидный TypeScript-код для вставки в папку data/
---

import type { ProjectData } from '../data/types';

const project: ProjectData = {
  slug: '', // уникальный идентификатор проекта (например, '1-portfolio-distribution')
  title: '', // название проекта
  imageUrl: '', // путь к изображению проекта (например, '/projects/img/project1.jpg')
  description: `
    <p>Краткое описание проекта...</p>
    <h2>Особенности</h2>
    <ul>
      <li>Преимущество 1</li>
      <li>Преимущество 2</li>
    </ul>
    <h2>Результаты</h2>
    <p>Описание достигнутых результатов...</p>
    <img src="путь_к_изображению" alt="Описание изображения" />
  `,
  datePublished: '', // дата публикации/завершения проекта в формате 'YYYY-MM-DD'
  client: '', // название клиента или 'Конфиденциально'
  tags: [], // массив ключевых слов или тегов
  seoDescription: '', // SEO-описание проекта
  seoKeywords: '', // SEO-ключевые слова
};

export default project;
