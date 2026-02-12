export default function Mission() {
  return (
    <section className="rounded-lg p-12 text-center">
      <h2 className="font-heading text-h2 font-bold text-primary">Наша миссия</h2>
      <div className="max-w-3xl mx-auto">
        {/* Приведение к дизайн-системе: text-body */}
        <p className="mt-4 text-body text-text-muted leading-relaxed">
          &quot;Предоставлять нашим клиентам <span className="text-accent font-semibold">передовые стратегические решения</span>, которые не только <span className="text-accent font-semibold">решают текущие задачи</span>, но и открывают <span className="text-accent font-semibold">новые горизонты</span> для <span className="text-accent font-semibold">роста</span>, <span className="text-accent font-semibold">инноваций</span> и <span className="text-accent font-semibold">долгосрочного успеха</span>.&quot;
        </p>
      </div>
    </section>
  );
}