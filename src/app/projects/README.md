# Как добавить новый проект

1. Создайте новый файл в папке `src/app/projects/data/` с именем, соответствующим вашему проекту (например, `00-my-new-project.ts`).
2. Скопируйте и вставьте следующий шаблон:
```
import type { ProjectData } from './types';

const project: ProjectData = {
  slug: '00-my-new-project',
  title: 'Мой новый проект',
  category: 'Категория',
  imageUrl: '/projects/data/img/my-new-project.jpg',
  description: 'Описание моего нового проекта.',
  seoDescription: 'SEO-описание моего нового проекта.',
  seoKeywords: 'ключевые слова, разделенные запятыми',
};

export default project;
```
2. Откройте файл `projectsData.ts` в этой папке. Добавьте новый проект в массив `projectsData`:
3. Откройте файл `getAllProjects.ts` в этой папке. Добавьте импорт вашего нового проекта:
```
import project from './00-my-new-project';
```
4. Сохраните файл. Новый проект появится на сайте автоматически.

> **Совет:** Изображение проекта загрузите в папку `/public/projects/img`.

---

**Поля:**
- `slug` — уникальный идентификатор (латиницей, используется в URL)
- `title` — название проекта
- `category` — категория/отрасль
- `imageUrl` — путь к изображению
- `description` — краткое описание
- `seoDescription` — SEO-описание (до 160 символов)
