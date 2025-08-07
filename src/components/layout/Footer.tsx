// Компонент футера с кнопкой вызова модального окна политики
"use client";
import React from 'react'; // Добавлен импорт React
import Link from 'next/link';

const footerNav = [
    { href: '/projects', label: 'Проекты' },
    { href: '/about', label: 'О компании' },
    { href: '/articles', label: 'Статьи' },
];

interface FooterProps {
  onOpenPrivacyPolicy: () => void;
}

// Обернули компонент в React.memo для оптимизации перерисовок
const Footer: React.FC<FooterProps> = React.memo(function Footer({ onOpenPrivacyPolicy }) {
  return (
    <footer className="frosted-glass">
      <div className="container mx-auto px-3 py-5">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <div className="font-heading text-h4 font-bold">ООО «ПК»</div>
            <p className="text-sm text-text-muted opacity-50 mt-1">© {new Date().getFullYear()} ООО «ПК». Все права защищены.</p>
          </div>
          <nav className="flex gap-4 mb-4 md:mb-0">
            {footerNav.map(link => (
                <Link key={link.href} href={link.href} className="text-body hover:text-accent transition-colors">
                    {link.label}
                </Link>
            ))}
            {/* Ссылка на политику конфиденциальности */}
            <button
              type="button"
              className="text-body hover:text-accent transition-colors underline"
              onClick={onOpenPrivacyPolicy}
            >
              Политика конфиденциальности
            </button>
          </nav>
          {/* <div className="flex gap-3">
            {socialLinks.map((link, index) => (
              <a key={index} href={link.href} className="text-text-muted opacity-75 hover:text-accent transition-colors">
                {link.icon}
              </a>
            ))}
          </div> */}
        </div>
      </div>
    </footer>
  );
});

export default Footer;