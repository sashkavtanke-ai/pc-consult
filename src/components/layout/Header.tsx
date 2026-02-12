'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';


const navLinks = [
  { href: '/', label: 'Главная' },
  { href: '/about', label: 'О нас' },
  { href: '/services', label: 'Услуги' },
  // { href: '/team', label: 'РљРѕРјР°РЅРґР°' },
  { href: '/projects', label: 'Проекты' },
  { href: '/articles', label: 'Статьи' },
  { href: '/contact', label: 'Контакты' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Р—Р°РєСЂРµРїР»СЏРµРј С…РµРґРµСЂ РїРѕРІРµСЂС… СЃС‚СЂР°РЅРёС†С‹ */}
      <header
        className="frosted-glass font-sans"
        style={{
          position: 'fixed', // С„РёРєСЃРёСЂРѕРІР°РЅРЅРѕРµ РїРѕР·РёС†РёРѕРЅРёСЂРѕРІР°РЅРёРµ
          top: 0,            // РїСЂРёР¶Р°С‚СЊ Рє РІРµСЂС…Сѓ
          left: 0,           // РїСЂРёР¶Р°С‚СЊ Рє Р»РµРІРѕРјСѓ РєСЂР°СЋ
          width: '100%',     // РЅР° РІСЃСЋ С€РёСЂРёРЅСѓ
          zIndex: 100        // РїРѕРІРµСЂС… РѕСЃС‚Р°Р»СЊРЅРѕРіРѕ РєРѕРЅС‚РµРЅС‚Р°
        }}
      >
      {/* РљРѕРЅС‚РµР№РЅРµСЂ СЃ РѕС‚СЃС‚СѓРїР°РјРё Рё РІС‹СЃРѕС‚РѕР№ РїРѕ РґРёР·Р°Р№РЅ-СЃРёСЃС‚РµРјРµ */}
      <div className="container mx-auto px-3 h-16 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center"
          aria-label="ПК - на главную"
        >
          <Image
            src="/logo.png"
            alt="Логотип ПК"
            width={1536}
            height={1024}
            priority
            className="h-12 w-auto md:h-14"
          />
        </Link>
        {/* РќР°РІРёРіР°С†РёСЏ РґР»СЏ РґРµСЃРєС‚РѕРїР° СЃ РѕС‚СЃС‚СѓРїР°РјРё РїРѕ РґРёР·Р°Р№РЅ-СЃРёСЃС‚РµРјРµ */}
        <nav className="hidden md:flex gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              // РЎС‚РёР»Рё СЃСЃС‹Р»РѕРє СЃ РїРѕРґС‡РµСЂРєРёРІР°РЅРёРµРј РїРѕ РґРёР·Р°Р№РЅ-СЃРёСЃС‚РµРјРµ
              className={`text-body font-medium hover:text-accent transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-accent after:scale-x-0 after:origin-left after:transition-transform ${pathname === link.href ? 'text-accent after:scale-x-100' : 'text-text'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        {/* РљРЅРѕРїРєР°-Р±СѓСЂРіРµСЂ РґР»СЏ РјРѕР±РёР»СЊРЅС‹С… СѓСЃС‚СЂРѕР№СЃС‚РІ */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-primary focus:outline-none focus:ring-2 focus:ring-accent rounded-sm" // Р”РѕР±Р°РІР»РµРЅС‹ СЃС‚РёР»Рё С„РѕРєСѓСЃР° РґР»СЏ РґРѕСЃС‚СѓРїРЅРѕСЃС‚Рё
            aria-label="Открыть меню"
          >
            {/* РРєРѕРЅРєРё РїРѕ СЂР°Р·РјРµСЂСѓ РёР· РґРёР·Р°Р№РЅ-СЃРёСЃС‚РµРјС‹ */}
            {isOpen ? <X size="24" /> : <Menu size="24" />}
          </button>
        </div>
      </div>
      {/* РњРѕР±РёР»СЊРЅРѕРµ РјРµРЅСЋ */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border">
          {/* РќР°РІРёРіР°С†РёСЏ СЃ РѕС‚СЃС‚СѓРїР°РјРё Рё СЂР°Р·РјРµСЂРѕРј С€СЂРёС„С‚Р° РїРѕ РґРёР·Р°Р№РЅ-СЃРёСЃС‚РµРјРµ */}
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
