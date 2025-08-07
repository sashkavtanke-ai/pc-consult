'use client';

import React, { useState } from "react";

// Тип для хранения ошибок валидации по каждому полю
type FormErrors = {
  name?: string[];
  email?: string[];
  message?: string[];
};

// Форма обратной связи с отправкой на /api/contact
export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({}); // Состояние для ошибок по полям
  const [generalError, setGeneralError] = useState<string | null>(null); // Для общих ошибок (сеть, сервер)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setGeneralError(null);
    setSuccess(false);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        form.reset();
      } else {
        // Если есть детальные ошибки от Zod, сохраняем их
        if (data.details) {
          setErrors(data.details);
        } else {
          // Иначе показываем общую ошибку
          setGeneralError(data.error || "Ошибка при отправке. Попробуйте позже.");
        }
      }
    } catch {
      setGeneralError("Ошибка сети. Проверьте подключение к интернету.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-4 w-full h-full p-0 rounded-none shadow-none bg-transparent" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className="block text-sm font-medium label-base mb-1">Имя</label>
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
        <label htmlFor="email" className="block text-sm font-medium label-base mb-1">Email</label>
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
        <label htmlFor="message" className="block text-sm font-medium label-base mb-1">Сообщение</label>
        <textarea
          id="message"
          name="message"
          rows={14}
          className={`input-base block w-full p-3 min-h-[160px] ${errors.message ? 'border-red-500' : ''}`}
          required
        ></textarea>
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
          {loading ? "Отправка..." : "Отправить сообщение"}
        </button>
      </div>
    </form>
  );
}
