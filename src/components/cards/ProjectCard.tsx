// Карточка проекта для страницы "Проекты"
import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  category: string;
  imageUrl: string;
}

export default function ProjectCard({ title, category, imageUrl }: ProjectCardProps) {
  return (
    <div className="overflow-hidden">
      <div className="relative h-[200px] w-full">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`Изображение проекта ${title}`}
            layout="fill"
            objectFit="cover"
          />
        ) : null}
      </div>
      <div className="p-3">
        <p className="text-accent text-sm font-semibold">{category}</p>
        <h3 className="font-heading text-h4 font-bold text-primary mt-1">{title}</h3>
      </div>
    </div>
  );
}