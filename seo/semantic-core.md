# Семантическое ядро для pc-consult.ru

Дата: 2026-02-13  
Источник: `c:\\Users\\QSERVER\\Downloads\\semantic-core-updated.csv`  
Рабочий файл: `seo/semantic-core.csv`

## Формат файла
- Кодировка: UTF-8 (BOM).
- Разделитель: запятая (`,`).
- Колонки: `query, cluster, intent, priority, target_url, page_type, status, notes`.

## Общий объём
- Всего запросов: 516.

## Кластеры
- Коммерческое ядро: 168
- Гео-коммерция: 120
- Информационное ядро (статьи): 96
- Экспресс-услуги: 70
- Отраслевые B2B: 18
- Проблемно-решенческие: 15
- Комплексное обслуживание: 15
- Брендовые: 14

## Приоритеты
- H: 282
- L: 48
- M: 186

## Распределение по целевым URL
- /services: 184
- /articles: 96
- /services/debt-restructuring: 64
- /services/financial-modeling: 57
- /services/court-order-cancel: 39
- /services/cost-optimization: 37
- /: 14
- /services/complex: 13
- /industry: 12

## Статус посадочных
- existing: 483
- new: 33

## Что дальше
1. Сначала закрыть H-запросы на существующих страницах.
2. Для status=new создать недостающие посадочные и связать их с блоком услуг/кейсами.
3. Добавить частотности и конкурентность (Wordstat/Key Collector), чтобы приоритизировать по ROI.

