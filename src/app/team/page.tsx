import type { Metadata } from 'next';
import TeamPageClient from './TeamPageClient';

export const metadata: Metadata = {
  title: 'Команда',
  description:
    'Команда экспертов ООО «ПК»: управление, экономика, финансы, налоги и автоматизация бизнес-процессов.',
  alternates: {
    canonical: '/team',
  },
};

export default function TeamPage() {
  return <TeamPageClient />;
}
