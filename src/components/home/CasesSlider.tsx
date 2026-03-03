'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

type CaseSlide = {
  slug: string;
  title: string;
  category: string;
  summary: string;
};

type CasesSliderProps = {
  projects: CaseSlide[];
};

function getBusinessTypeLabel(project: CaseSlide): string {
  switch (project.slug) {
    case '1-portfolio-distribution':
      return 'Дистрибьютор аудио- и видеопродукции';
    case '2-portfolio-vet':
      return 'Сеть ветеринарных клиник';
    case '3-portfolio-electronics':
      return 'Поставщик электроники';
    case '4-portfolio-construction':
      return 'Строительная компания';
    case '5-portfolio-beauty':
      return 'Салон красоты';
    case '6-portfolio-pvz':
      return 'Сеть ПВЗ';
    case '7-portfolio-legal':
      return 'Юридическая компания';
    case '8-portfolio-energy':
      return 'Энергетическая компания';
    default:
      return project.title;
  }
}

export default function CasesSlider({ projects }: CasesSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  function getScrollStep(track: HTMLDivElement) {
    const firstCard = track.firstElementChild as HTMLElement | null;
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap || window.getComputedStyle(track).gap || '0');

    return (firstCard?.offsetWidth || 320) + gap;
  }

  function scrollByOffset(direction: -1 | 1) {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const step = getScrollStep(track);

    if (direction > 0 && track.scrollLeft + track.clientWidth >= track.scrollWidth - step / 2) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }

    if (direction < 0 && track.scrollLeft <= step / 2) {
      track.scrollTo({ left: Math.max(track.scrollWidth - track.clientWidth, 0), behavior: 'smooth' });
      return;
    }

    track.scrollBy({ left: direction * step, behavior: 'smooth' });
  }

  useEffect(() => {
    const track = trackRef.current;

    if (!track) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      scrollByOffset(1);
    }, 7000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      id="cases-slider"
      className="w-full overflow-hidden rounded-[20px] border border-[color:rgba(33,115,70,0.22)] bg-[color:rgba(33,115,70,0.08)] p-3 backdrop-blur-sm lg:h-[220px]"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Кейсы и результаты</p>
          <h2 className="mt-1 text-sm font-bold leading-5 text-primary">С кем уже работали</h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Показать предыдущие кейсы"
            onClick={() => scrollByOffset(-1)}
            className="button-soft-accent flex h-8 w-8 items-center justify-center"
          >
            <ChevronLeft size={15} />
          </button>
          <button
            type="button"
            aria-label="Показать следующие кейсы"
            onClick={() => scrollByOffset(1)}
            className="button-soft-accent flex h-8 w-8 items-center justify-center"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="mt-2 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project) => (
          <article
            key={project.slug}
            className="frosted-glass flex h-[100px] w-[72%] shrink-0 snap-start flex-col justify-between rounded-[16px] border border-white/50 p-3 shadow-none sm:w-[48%] lg:w-[calc((100%-0.75rem)/2)]"
          >
            <h3 className="overflow-hidden text-sm font-bold leading-5 text-primary">
              {getBusinessTypeLabel(project)}
            </h3>
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-2 text-xs font-semibold text-primary transition-colors hover:text-accent"
            >
              Смотреть кейс
              <ArrowRight size={14} />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
