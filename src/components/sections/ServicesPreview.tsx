'use client';

import React from 'react';
import { Briefcase, Zap, BarChart2, Gavel } from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInItem } from '@/lib/animations';

const services = [
	{
		icon: <BarChart2 size={40} className="text-accent" />,
		title: 'Стратегия роста',
		description: 'Строим стратегию развития, основанную на данных, целях и реалиях вашего рынка.',
	},
	{
		icon: <Briefcase size={40} className="text-accent" />,
		title: 'Финансовая модель и инвестиции',
		description: 'Создаём финансовую модель, оптимизируем издержки, оцениваем риски и готовим проект к инвестициям.',
	},
	{
		icon: <Zap size={40} className="text-accent" />,
		title: 'Операции и управление',
		description: 'Автоматизируем рутину, настраиваем управленческий учёт и улучшаем ключевые бизнес-процессы.',
	},
	{
		icon: <Gavel size={40} className="text-accent" />,
		title: 'Управление долговой нагрузкой',
		description: 'Анализируем и оптимизируем долговую нагрузку',
	},
];

export default function ServicesPreview() {
	return (
		<section className="bg-bg py-2">
			<div className="container mx-auto px-2 flex flex-col items-center">
				<div className="text-center mb-12 frosted-glass p-6 rounded-xl max-w-7xl">
          <br />
					<h2 className="font-heading text-h2 font-bold text-primary">Наши компетенции</h2>
					<p className="text-body text-text-muted mt-2 max-w-2xl text-center">
						Мы предлагаем комплексные решения для ключевых вызовов вашего бизнеса.
					</p>
          <br />
				</div>
				<motion.div
					variants={staggerContainer}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, amount: 0.3 }}
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
				>
					{services.map((service) => (
						<motion.div
							variants={fadeInItem}
							key={service.title}
							className="p-8 rounded-card shadow-md text-center flex flex-col items-center frosted-glass space-y-6"
						>
							<div>{React.cloneElement(service.icon, { className: 'text-accent', size: 40 })}</div>
							<h3 className="font-heading text-h4 font-bold text-primary">{service.title}</h3>
							<p className="text-body text-text-muted">{service.description}</p>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
