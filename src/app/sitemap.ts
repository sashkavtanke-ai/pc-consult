import { MetadataRoute } from 'next';
import { promises as fs } from 'fs';
import path from 'path';

export const revalidate = 604800;

const baseUrl = 'https://pc-consult.ru';

async function getDirectoryFiles(dir: string): Promise<string[]> {
  const directoryPath = path.join(process.cwd(), dir);
  try {
    const files = await fs.readdir(directoryPath);
    return files.filter((file) => file.endsWith('.ts') && !file.startsWith('getAll'));
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articleFiles = await getDirectoryFiles('src/app/articles/data');
  const projectFiles = await getDirectoryFiles('src/app/projects/data');

  const articles = articleFiles.map((file) => ({
    url: `${baseUrl}/articles/${file.replace(/\.ts$/, '')}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const projects = projectFiles.map((file) => ({
    url: `${baseUrl}/projects/${file.replace(/\.ts$/, '')}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const staticRoutes = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.95 },
    { url: `${baseUrl}/services/express`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/services/complex`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/services/debt-restructuring`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${baseUrl}/services/financial-modeling`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${baseUrl}/services/court-order-cancel`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${baseUrl}/services/cost-optimization`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${baseUrl}/projects`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/articles`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/team`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
  ];

  return [...staticRoutes, ...articles, ...projects];
}
