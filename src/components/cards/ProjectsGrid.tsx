// Компонент-клиент для анимационной сетки проектов
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { staggerContainer, fadeInItem } from '@/lib/animations';
import type { ProjectData } from '@/app/projects/types';

// Принимает список проектов и отображает сетку с анимацией
export default function ProjectsGrid({ projects }: { projects: ProjectData[] }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {projects.map((project, index) => (
        <Link
          href={`/projects/${project.slug}`}
          key={`${project.slug}-${index}`}
          className="contents"
        >
          <motion.div
            variants={fadeInItem}
            className="frosted-glass  p-8 rounded-card shadow-md text-center flex flex-col items-center cursor-pointer transition-transform hover:-translate-y-1 my-4"
          >
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <p className="text-sm text-gray-500">{project.category}</p>
            <div className="mt-4">
              <Image
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-32 object-cover rounded-md"
                width={400}
                height={128}
              />
            </div>
            <p className="mt-2 text-gray-700">{project.summary}</p>
          </motion.div>
        </Link>
      ))}
    </motion.div>
  );
}