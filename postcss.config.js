/** @type {import('postcss-load-config').Config} */
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // Добавляем cssnano только для production
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
  },
}
