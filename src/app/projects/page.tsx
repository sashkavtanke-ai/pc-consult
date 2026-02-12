// Включаем ISR: страница будет пересобираться не чаще, чем раз в 60 секунд
export const revalidate = 60;

import type { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
// Импортируем ProjectsGrid — клиентский компонент для анимационной сетки
import ProjectsGrid from '@/components/cards/ProjectsGrid';
import { getAllProjects } from './data/getAllProjects';
import type { ProjectData } from './types';

export const metadata: Metadata = {
  title: 'Проекты',
  description:
    'Кейсы ООО «ПК»: внедренные решения в финансах, операционном управлении, юридическом сопровождении и росте бизнеса.',
  alternates: {
    canonical: '/projects',
  },
};

// Серверный компонент: получает данные на сервере и рендерит список проектов
export default async function ProjectsPage() {
  const projects: ProjectData[] = await getAllProjects();

  return (
    <main>
      <PageHeader
        title="Наши проекты"
        subtitle="Мы гордимся результатами, которых достигли вместе с нашими клиентами. Ознакомьтесь с некоторыми из наших успешных кейсов."
        className="mt-28 md:mt-48 frosted-glass py-16 md:py-16 text-center overflow-hidden"
      />

      <div className="container mx-auto px-6 py-6">
        {/* Передаём данные в клиентский компонент ProjectsGrid */}
        <ProjectsGrid projects={projects} />
      </div>

      {/* Модальное окно удалено, переход теперь осуществляется по ссылке */}
    </main>
  );
}
