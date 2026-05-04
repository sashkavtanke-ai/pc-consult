'use client';

import Link from 'next/link';
import { Calculator, Phone, ShieldCheck, TrendingUp } from 'lucide-react';
import { useMemo, useState, type Dispatch, type SetStateAction } from 'react';

const formatNumber = new Intl.NumberFormat('ru-RU');

function parseAmount(value: string) {
  const normalized = value.replace(/\s/g, '').replace(',', '.');
  const parsed = Number(normalized);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function formatInput(value: string) {
  const parsed = parseAmount(value);
  return parsed ? formatNumber.format(parsed) : '';
}

export default function AntiCrisisAuditPromo() {
  const [revenue, setRevenue] = useState('5000000');
  const [requiredPayments, setRequiredPayments] = useState('1800000');
  const [cashFlow, setCashFlow] = useState('900000');
  const [debtPayments, setDebtPayments] = useState('650000');

  const metrics = useMemo(() => {
    const revenueValue = parseAmount(revenue);
    const requiredPaymentsValue = parseAmount(requiredPayments);
    const cashFlowValue = parseAmount(cashFlow);
    const debtPaymentsValue = parseAmount(debtPayments);

    const dti = revenueValue > 0 ? (requiredPaymentsValue / revenueValue) * 100 : 0;
    const dscr = debtPaymentsValue > 0 ? cashFlowValue / debtPaymentsValue : 0;

    return {
      dti,
      dscr,
      dtiStatus: dti <= 50 ? 'Нагрузка выглядит управляемой' : 'Нагрузка требует разбора',
      dscrStatus: dscr >= 1.2 ? 'Запас по долгу есть' : 'Нужен антикризисный сценарий',
    };
  }, [cashFlow, debtPayments, requiredPayments, revenue]);

  const calculatorFields: Array<[
    string,
    string,
    Dispatch<SetStateAction<string>>,
  ]> = [
    ['Выручка за период', revenue, setRevenue],
    ['Обязательные платежи', requiredPayments, setRequiredPayments],
    ['Денежный поток после расходов', cashFlow, setCashFlow],
    ['Платежи по долгам', debtPayments, setDebtPayments],
  ];

  return (
    <section className="container mx-auto px-6 py-6 md:py-8">
      <div className="mx-auto grid max-w-[1360px] gap-6 rounded-[28px] border border-[color:rgba(33,115,70,0.22)] bg-[linear-gradient(135deg,rgba(33,115,70,0.12),rgba(246,185,59,0.10),rgba(255,255,255,0.72))] p-6 shadow-[0_24px_80px_rgba(10,37,64,0.10)] backdrop-blur md:grid-cols-[1.05fr_0.95fr] md:p-9">
        <div className="flex flex-col justify-between gap-7">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[color:rgba(33,115,70,0.22)] bg-white/70 px-4 py-2 text-sm font-semibold text-primary">
              <ShieldCheck className="h-4 w-4 text-accent" />
              Антикризисный аудит по логике 590-П
            </div>

            <h2 className="max-w-[820px] font-heading text-[clamp(2rem,1.2vw+1.7rem,3.1rem)] font-bold leading-[1.05] text-primary">
              Кризис 2026: как сохранить бизнес и не потерять деньги
            </h2>

            <p className="mt-5 max-w-[860px] text-lg leading-8 text-text-muted">
              Налоги выросли. Клиенты тратят меньше. Банки и ФНС стали жестче.
              Мы оцениваем компанию так же внимательно, как банки смотрят на
              заемщиков по 590-П, только переводим это в понятный план действий
              для собственника.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {[
              'Снижаем налоговую нагрузку на 15-30%',
              'Увеличиваем чистый денежный поток на 1-8 млн ₽ в год',
              'Помогаем договориться с банком о реструктуризации',
            ].map((item) => (
              <div
                key={item}
                className="rounded-card border border-white/55 bg-white/65 p-4 text-sm font-semibold leading-6 text-primary shadow-sm"
              >
                <TrendingUp className="mb-3 h-5 w-5 text-accent" />
                {item}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/services/antikrizisnyy-audit-590p"
              className="button-base inline-flex min-h-[52px] items-center justify-center px-6 py-3 text-center text-sm"
            >
              Получить мини-аудит за 15 минут
            </Link>
            <a
              href="tel:+79817638900"
              className="button-soft-accent inline-flex min-h-[52px] items-center justify-center gap-2 px-6 py-3 text-center text-sm"
            >
              <Phone className="h-4 w-4" />
              +7 (981) 763-89-00
            </a>
          </div>
        </div>

        <div className="rounded-[24px] border border-white/60 bg-white/78 p-5 shadow-[0_18px_55px_rgba(10,37,64,0.10)] md:p-6">
          <div className="mb-5 flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[color:rgba(246,185,59,0.18)] text-accent">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-heading text-2xl font-bold text-primary">
                Быстрый расчет DTI и DSCR
              </h3>
              <p className="mt-1 text-sm leading-6 text-text-muted">
                Черновая диагностика долговой нагрузки. Полный вывод делаем
                после аудита платежного календаря, налогов и договоров.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {calculatorFields.map(([label, value, setter]) => (
              <label key={label} className="text-sm font-semibold text-primary">
                {label}
                <input
                  value={formatInput(value)}
                  onChange={(event) =>
                    setter(event.target.value.replace(/[^\d,.]/g, ''))
                  }
                  inputMode="decimal"
                  className="mt-2 w-full rounded-[16px] border border-[color:rgba(10,37,64,0.14)] bg-white px-4 py-3 text-base font-semibold text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-[color:rgba(246,185,59,0.24)]"
                />
              </label>
            ))}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[18px] bg-[color:rgba(10,37,64,0.06)] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                DTI
              </p>
              <p className="mt-2 font-heading text-3xl font-bold text-primary">
                {metrics.dti.toFixed(1)}%
              </p>
              <p className="mt-2 text-sm leading-6 text-text-muted">
                {metrics.dtiStatus}. Ориентир: до 40-50%.
              </p>
            </div>
            <div className="rounded-[18px] bg-[color:rgba(33,115,70,0.08)] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                DSCR
              </p>
              <p className="mt-2 font-heading text-3xl font-bold text-primary">
                {metrics.dscr.toFixed(2)}
              </p>
              <p className="mt-2 text-sm leading-6 text-text-muted">
                {metrics.dscrStatus}. Ориентир: от 1.2-1.3.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
