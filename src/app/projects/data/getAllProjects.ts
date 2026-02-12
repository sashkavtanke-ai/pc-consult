// Импортируем тип ProjectData
import type { ProjectData } from '../types';

/**
 * Асинхронно импортирует все актуальные проекты.
 * Исключены служебные и устаревшие файлы.
 * Возвращает массив объектов ProjectData.
 */
export async function getAllProjects(): Promise<ProjectData[]> {
  // Динамический импорт каждого актуального файла
  const modules = await Promise.all([
    import('./1-portfolio-distribution'),
    import('./2-portfolio-vet'),
    import('./3-portfolio-electronics'),
    import('./4-portfolio-construction'),
    import('./5-portfolio-beauty'),
    import('./6-portfolio-pvz'),
    import('./7-portfolio-legal'),
    import('./8-portfolio-energy'),
  ]);
  // Каждый модуль экспортирует объект по умолчанию (включая summary)
  return modules.map((mod) => mod.default as ProjectData);
}