'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

import DynamicBackgroundWrapper from "@/components/dynamic-bg/DynamicBackgroundWrapper"; // Динамический фон

const navLinks = [
  { href: '/', label: 'Главная' },
  { href: '/about', label: 'О нас' },
  { href: '/services', label: 'Услуги' },
  // { href: '/team', label: 'Команда' },
  { href: '/projects', label: 'Проекты' },
  { href: '/articles', label: 'Статьи' },
  { href: '/contact', label: 'Контакты' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Динамический фон на всём фоне приложения */}
      <DynamicBackgroundWrapper />
      {/* Закрепляем хедер поверх страницы */}
      <header
        className="frosted-glass"
        style={{
          position: 'fixed', // фиксированное позиционирование
          top: 0,            // прижать к верху
          left: 0,           // прижать к левому краю
          width: '100%',     // на всю ширину
          zIndex: 100        // поверх остального контента
        }}
      >
      {/* Контейнер с отступами и высотой по дизайн-системе */}
      <div className="container mx-auto px-3 h-16 flex justify-between items-center">
        <Link
          href="/"
          className="font-heading text-h2 font-bold"
          style={{ color: '#0A2540' }}
        >
          ПК
        </Link>
        {/* Навигация для десктопа с отступами по дизайн-системе */}
        <nav className="hidden md:flex gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              // Стили ссылок с подчеркиванием по дизайн-системе
              className={`text-body font-medium hover:text-accent transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-accent after:scale-x-0 after:origin-left after:transition-transform ${pathname === link.href ? 'text-accent after:scale-x-100' : 'text-text'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        {/* Кнопка-бургер для мобильных устройств */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-primary focus:outline-none focus:ring-2 focus:ring-accent rounded-sm" // Добавлены стили фокуса для доступности
            aria-label="Открыть меню"
          >
            {/* Иконки по размеру из дизайн-системы */}
            {isOpen ? <X size="24" /> : <Menu size="24" />}
          </button>
        </div>
      </div>
      {/* Мобильное меню */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border">
          {/* Навигация с отступами и размером шрифта по дизайн-системе */}
          <nav className="flex flex-col items-center gap-4 p-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-body font-medium hover:text-accent transition-colors ${pathname === link.href ? 'text-accent' : 'text-text'}`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
    </>
  );
}