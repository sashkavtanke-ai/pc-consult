// Универсальный компонент модального окна с анимацией и закрытием по клику на фон
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'; // Импортируем ReactDOM для Portal

type ModalVariant = 'service' | 'project' | 'people' | 'article';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: React.ReactNode;
  overlayClassName?: string;
  variant?: ModalVariant; // <--- добавлено
}

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
  overlayClassName,
  variant = 'service', // <--- значение по умолчанию
}: ModalProps) {
  const [hasMounted, setHasMounted] = useState(false); // Состояние для отслеживания монтирования

  useEffect(() => {
    setHasMounted(true); // Устанавливаем true после монтирования на клиенте
  }, []);

  if (!hasMounted) {
    return null; // Не рендерим на сервере или до монтирования
  }

  // Portal всегда монтирован, чтобы overlay не мигал при появлении
  if (typeof window === 'undefined') {
    return null; // Не рендерим на сервере
  }

  const variantStyles = {
    service: {
      width: '400vw', // Основная ширина
      maxWidth: '700px', // Максимальная ширина для десктопов
      containerMaxHeight: undefined, // Не ограничиваем высоту контейнера
      contentMaxHeight: '80vh', // Максимальная высота содержимого (увеличено)
      buttonInside: false, // Кнопка закрытия внутри модального окна
    },
    people: {
      width: '90vw', // Основная ширина
      maxWidth: '560px', // Максимальная ширина для десктопов
      containerMaxHeight: undefined, // Не ограничиваем высоту контейнера
      contentMaxHeight: '60vh',   // Максимальная высота содержимого
      buttonInside: false, // Кнопка закрытия внутри модального окна
    },
    project: {
      width: '80vw',
      maxWidth: '80vw',
      containerMaxHeight: '80vh',
      contentMaxHeight: 'calc(80vh - 72px)',
      buttonInside: false,
    },
    article: {
      width: '80vw',
      maxWidth: '80vw',
      containerMaxHeight: '80vh',
      contentMaxHeight: 'calc(80vh - 72px)',
      buttonInside: false,
    },
  } as const;

  const current = variantStyles[variant];

  return ReactDOM.createPortal(
    <>
      {/* Static overlay */}
      {isOpen && (
        <motion.div
          onClick={onClose}
          className={`fixed inset-0 z-50 ${overlayClassName || ''}`}
          initial={{ opacity: 0, backgroundColor: 'rgba(0,0,0,0)' }}
          animate={{ opacity: 1, backgroundColor: 'rgba(0,0,0,0.8)' }}
          exit={{ opacity: 0, backgroundColor: 'rgba(0,0,0,0)' }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        />
      )}

      <AnimatePresence initial={false} mode="wait">
        {isOpen && (
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            onClick={(e) => e.stopPropagation()}
            className="fixed inset-0 z-50 flex items-center justify-center p-0"
            style={{ borderRadius: 0 }}
          >
            <div
              className="shadow-2xl relative border transition-all duration-300 ease-in-out flex flex-col"
              style={{
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-text)',
                borderColor: 'var(--color-border)',
                boxShadow: '0 8px 40px 0 rgba(0,0,0,0.18)',
                borderRadius: 4,
                width: current.width,
                maxWidth: current.maxWidth,
                maxHeight: current.containerMaxHeight,
                padding: 0,
              }}
            >
              {/* Фиксированный header с заголовком и кнопкой закрытия */}
              <div
                className="sticky top-0 z-10 flex items-center justify-between px-8 py-6 border-b bg-[var(--color-surface)]"
                style={{
                  borderColor: 'var(--color-surface)',
                }}
              >
                {/* Центрированный заголовок, не перекрывается кнопкой закрытия */}
                {title && (
                  <div className="text-h2 font-semibold text-center w-full px-4 pr-20 break-words min-h-[40px] flex items-center justify-center" style={{wordBreak: 'break-word'}}>
                    {title}
                  </div>
                )}
                <button
                  onClick={onClose}
                  className={`${
                    current.buttonInside
                      ? 'absolute right-8 top-1/2 -translate-y-1/2'
                      : 'fixed right-8 top-8'
                  } z-20 hover:text-accent transition-colors rounded-full shadow p-1 focus:outline-none focus:ring-2`}
                  style={{
                    backgroundColor: 'rgba(245,247,250,0.8)',
                    color: 'var(--color-text-muted)',
                    border: 'none',
                  }}
                  aria-label="Закрыть модальное окно"
                >
                  <X size={28} />
                </button>
              </div>
              {/* Прокручиваемая область для содержимого */}
              <div
                className="overflow-y-auto px-8 py-4"
                style={{
                  maxHeight: current.contentMaxHeight,
                }}
              >
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.body
  );
}