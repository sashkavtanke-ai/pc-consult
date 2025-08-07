import Image from 'next/image';
import Link from 'next/link';

interface ArticleCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  href: string;
  date: string; // Дата публикации статьи
  seoDescription?: string;
}

export default function ArticleCard({ title, description, imageUrl, href, date, seoDescription }: ArticleCardProps) {
  return (
    <Link href={href} className="block overflow-hidden flex flex-col h-full">
      {/* Высота изображения по дизайн-системе */}
      {imageUrl && (
      <div className="relative h-[200px] w-full">
        <Image
          src={imageUrl}
          alt={`Обложка статьи ${title}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      )}
      {/* Отступы по дизайн-системе */}
      <div className="p-3 flex flex-col h-full">
        {/* Отступы заголовка и описания по дизайн-системе */}
        <h3 className="font-heading text-h4 font-bold text-primary mt-1">{title}</h3>
        {seoDescription && <p className="text-body text-text-muted mt-1">{seoDescription}</p>}
        <div className="flex-1" />
        <p className="text-sm text-text-muted mt-4">{date}</p>
      </div>
    </Link>
  );
}