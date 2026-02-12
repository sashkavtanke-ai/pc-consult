import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    { pattern: /(text|bg|border)-(primary|accent)/ },
    'motion-safe:animate-fadeIn'
  ],
  theme: {
    extend: {
      // Цвета связаны с CSS-переменными для поддержки темизации
      colors: {
        background: 'var(--color-bg)',        // фон
        foreground: 'var(--color-text)',      // основной текст
        primary: 'var(--color-primary)',      // основной акцент
        accent: 'var(--color-accent)',        // дополнительный акцент
        surface: 'var(--color-surface)',      // поверхность/карточки
        border: 'var(--color-border)',        // границы
      },
      fontFamily: {
        sans: ['var(--font-roboto)', 'sans-serif'],     // Roboto напрямую
        heading: ['var(--font-inter)', 'sans-serif'],   // Inter напрямую
      },
      fontSize: {
        'h1': ['clamp(2.2rem, 1.15vw + 1.9rem, 3rem)', { lineHeight: '1.2' }],
        'h2': ['clamp(1.7rem, 1vw + 1.3rem, 2.2rem)', { lineHeight: '1.3' }],
        'h3': ['clamp(1.3rem, 0.7vw + 1.1rem, 1.7rem)', { lineHeight: '1.4' }],
        'h4': ['clamp(1.1rem, 0.5vw + 1rem, 1.25rem)', { lineHeight: '1.5' }],
        'body': ['clamp(1rem, 0.2vw + 0.95rem, 1.1rem)', { lineHeight: '1.6' }],
        'sm': ['clamp(0.875rem, 0.1vw + 0.85rem, 1rem)', { lineHeight: '1.6' }],
      },
      spacing: {
        '1': 'var(--space-1)', // 8px
        '2': 'var(--space-2)', // 16px
        '3': 'var(--space-3)', // 24px
        '4': 'var(--space-4)', // 32px
        '5': 'var(--space-5)', // 40px
      },
      borderRadius: {
        'card': '8px',
        'button': '4px',
      },
      boxShadow: {
        'card': '0 1px 4px rgba(0,0,0,0.1)', // Тень для карточек по дизайн-системе
      },
      animation: {
        fadeIn: 'fadeIn 0.2s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
};
export default config;