# План внедрения H-ключей (Title/H1/H2)

Файл: `seo/h-priority-implementation.csv`

## Что сделано
- Разложены приоритетные кластеры (`H`) по целевым URL.
- Для каждой страницы подготовлены готовые формулировки:
  - `title_recommended`
  - `h1_recommended`
  - `h2_recommended`
  - `meta_description_recommended`
- Добавлены ссылки на файлы, где вносить изменения (`source_files`).

## Порядок внедрения
1. Обновить существующие страницы:
   - `/services`
   - `/services/complex`
   - `/`
2. Создать новые посадочные под high-intent:
   - `/services/debt-restructuring`
   - `/services/financial-modeling`
   - `/services/court-order-cancel`
   - `/services/cost-optimization`
3. Добавить отраслевой раздел `/industry` и дочерние страницы.
4. Перелинковать:
   - из `/articles` в новые коммерческие страницы;
   - из `/services` в новые посадочные;
   - из кейсов в релевантные услуги.

## Где менять в коде сейчас
- Метаданные (`title`, `description`):
  - `src/app/page.tsx`
  - `src/app/services/page.tsx`
  - `src/app/services/complex/page.tsx`
  - `src/app/articles/page.tsx`
- H1/H2 (через `PageHeader` и секции):
  - `src/app/services/ServicesPageClient.tsx`
  - `src/app/services/complex/ComplexServicePageClient.tsx`
  - `src/components/sections/Hero.tsx`

## Критерии готовности
- Каждая money-страница закрывает свой кластер без каннибализации.
- В каждой странице есть 1 основной `H1` и 2-4 подзаголовка `H2` под подинтенты.
- На каждой коммерческой странице есть CTA и блок FAQ.
- В Search Console/Вебмастере запросы начинают группироваться по новым URL.
