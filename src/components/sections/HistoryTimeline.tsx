const timelineEvents = [
  {
    year: '2015',
    title: 'Запуск компании',
    description: 'Собрали команду и начали работать с первыми клиентами.',
  },
  {
    year: '2018',
    title: 'Первый крупный заказ',
    description: 'Разработали стратегию для лидера рынка. Клиент остался с нами надолго.',
  },
  {
    year: '2021',
    title: 'Новые услуги',
    description: 'Добавили финансовое планирование и настройку бизнес-процессов.',
  },
  {
    year: '2024',
    title: 'Новые горизонты',
    description: 'Работа с клиентами, ведущими деятельность в разных юрисдикциях, расширила наши компетенции в международном сопровождении.',
  },
];

// Компонент вертикального таймлайна для секции "Наша история"
export default function HistoryTimeline() {
	return (
		<section>
			<h2 className="font-heading text-h2 font-bold text-primary text-center">
				Наша история
			</h2>
			<div className="w-full max-w-[100vw] px-4 mx-auto overflow-x-auto py-2">
				<div className="flex justify-center">
					<div className="relative flex items-center space-x-8 py-4 min-h-[720px] md:min-h-[720px]">
						{/* Горизонтальная линия */}
						<div className="absolute top-1/2 left-0 right-0 h-1 bg-border transform -translate-y-1/2 z-0"></div>
						{timelineEvents.map((event, index) => {
							const isTop = index % 2 === 0;
							return (
								<div
									key={index}
									className="relative flex flex-col items-center w-64"
								>
									{/* Карточка */}
									<div
										className={`absolute ${
											isTop ? 'bottom-full mb-4' : 'top-full mt-4'
										} left-1/2 -translate-x-1/2 z-10`}
										style={{ width: '16rem' }}
									>
										<div className="bg-surface p-3 rounded-card shadow-card text-center">
											<h3 className="font-heading text-h3 font-bold text-accent">
												{event.year}
											</h3>
											<h4 className="font-heading text-h4 font-bold text-primary">
												{event.title}
											</h4>
											<p className="text-body text-text-muted mt-2">
												{event.description}
											</p>
										</div>
									</div>
									{/* Линия от точки к карточке */}
									<div
										className={`absolute left-1/2 -translate-x-1/2 w-1 bg-border z-0 ${
											isTop
												? 'bottom-1/2 top-auto h-4'
												: 'top-1/2 bottom-auto h-4'
										}`}
									></div>
									{/* Точка */}
									<div className="absolute top-1/2 left-1/2 w-4 h-4 bg-accent rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10 border-2 border-surface"></div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}