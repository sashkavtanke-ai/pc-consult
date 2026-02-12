'use client';

import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  className?: string;
}

export default function PageHeader({ title, subtitle, className }: PageHeaderProps) {
  return (
    /* Убрана py-16, добавлен pt-0 для отсутствия отступа сверху */
    <div className={`pt-0 pb-16 text-center overflow-hidden frosted-glass ${className || ''}`}>
      <div className="container mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-heading text-h1 font-bold text-primary"
        >{title}</motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-h4 text-text-muted mt-2 max-w-3xl mx-auto"
        >{subtitle}</motion.p>
      </div>
    </div>
  );
}