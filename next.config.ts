import withBundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Включает standalone-режим для оптимизации деплоя
  output: 'standalone',
  // Удаляет все console.* из production-сборки
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

// Экспорт с поддержкой bundle-analyzer
export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === '1',
})(nextConfig);
