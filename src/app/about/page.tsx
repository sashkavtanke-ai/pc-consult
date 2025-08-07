// Страница "О компании" с базовой структурой и placeholder-блоками
import PageHeader from "@/components/layout/PageHeader";
// Импортируем компонент "Миссия"
import Mission from "@/components/sections/Mission";
import HistoryTimeline from "@/components/sections/HistoryTimeline"; // Импортируем компонент таймлайна
import KeyMetrics from "@/components/sections/KeyMetrics"; // Импортируем блок "Ключевые метрики"

export default function AboutPage() {
  return (
    <main>
      <PageHeader 
        title="О компании"
        subtitle="Мы помогаем малому и среднему бизнесу расти. Строим стратегии, оптимизируем процессы и внедряем цифровые решения. Работаем в Санкт-Петербурге и по всей России."
        className="mt-28 md:mt-48 frosted-glass py-16 md:py-20 text-center overflow-hidden"
      />
      
      {/* Разделы страницы будут здесь */}
      <div className="container mx-auto px-6 py-12">
        <div className="space-y-16">
          {/* Блок "Миссия" */}
          <div className="frosted-glass">
            <Mission />
          </div>

          {/* Блок "История" */}
          <div className="frosted-glass">
            <HistoryTimeline />
          </div>

          {/* Блок "Ключевые метрики" */}
          <div className="frosted-glass">
            <KeyMetrics />
          </div>
        </div>
      </div>
    </main>
  );
}