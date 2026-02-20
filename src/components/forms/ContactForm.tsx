'use client';

import React, { useEffect, useRef, useState } from 'react';

type FormErrors = {
  name?: string[];
  phone?: string[];
  email?: string[];
  message?: string[];
};

type ContactFormProps = {
  initialMessage?: string;
};

export default function ContactForm({ initialMessage = '' }: ContactFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [messageValue, setMessageValue] = useState(initialMessage);
  const startedAtRef = useRef<number>(Date.now());

  useEffect(() => {
    setMessageValue(initialMessage);
  }, [initialMessage]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setGeneralError(null);
    setSuccess(false);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const email = formData.get('email');
    const website = formData.get('website');
    const formStartedAt = formData.get('form_started_at');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          message: messageValue,
          website,
          formStartedAt,
        }),
      });

      let data: { details?: FormErrors; error?: string } | null = null;
      const contentType = res.headers.get('content-type') || '';

      if (contentType.includes('application/json')) {
        data = (await res.json()) as { details?: FormErrors; error?: string };
      } else {
        await res.text();
        if (res.status === 403) {
          data = {
            error:
              'Запрос отклонен системой безопасности сервера (HTTP 403). Уберите из текста спецконструкции и отправьте снова.',
          };
        } else {
          data = { error: `Сервер вернул неожиданный ответ (HTTP ${res.status}).` };
        }
      }

      if (res.ok) {
        setSuccess(true);
        form.reset();
        setMessageValue(initialMessage);
      } else if (data?.details) {
        setErrors(data.details);
      } else {
        setGeneralError(data?.error || `Ошибка при отправке (HTTP ${res.status}). Попробуйте позже.`);
      }
    } catch {
      setGeneralError('Не удалось отправить запрос. Проверьте подключение и попробуйте снова.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="space-y-4 w-full h-full p-0 rounded-none shadow-none bg-transparent"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form_started_at" value={startedAtRef.current} />
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Ваш сайт</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>
      <div>
        <label htmlFor="name" className="block text-sm font-medium label-base mb-1">
          Имя
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className={`input-base block w-full h-10 px-3 ${errors.name ? 'border-red-500' : ''}`}
          required
        />
        {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name[0]}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium label-base mb-1">
          Телефон
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className={`input-base block w-full h-10 px-3 ${errors.phone ? 'border-red-500' : ''}`}
          placeholder="+7 (___) ___-__-__"
          required
        />
        {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone[0]}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium label-base mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className={`input-base block w-full h-10 px-3 ${errors.email ? 'border-red-500' : ''}`}
          required
        />
        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email[0]}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium label-base mb-1">
          Сообщение
        </label>
        <textarea
          id="message"
          name="message"
          rows={14}
          className={`input-base block w-full p-3 min-h-[160px] ${errors.message ? 'border-red-500' : ''}`}
          value={messageValue}
          onChange={(e) => setMessageValue(e.target.value)}
          required
        />
        {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message[0]}</p>}
      </div>

      {success && <div className="text-green-600 text-sm">Сообщение отправлено!</div>}
      {generalError && <div className="text-red-600 text-sm">{generalError}</div>}

      <div>
        <button
          type="submit"
          className="mt-4 bg-transparent text-black dark:text-white font-bold py-2 px-3 rounded-[4px] text-lg border-2 transition-colors duration-500 active:scale-95 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary hover:bg-[color:var(--color-accent)] hover:text-white w-full"
          style={{ borderColor: 'var(--color-accent)' }}
          disabled={loading}
        >
          {loading ? 'Отправка...' : 'Отправить сообщение'}
        </button>
      </div>
    </form>
  );
}
