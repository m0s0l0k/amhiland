import { getCollection } from 'astro:content';
import { validateNewsEntries, type NewsEntry } from './news-validation';
export { resolveNewsIllustration, sortNewsByPublishedAt } from './news-validation';
export type { NewsEntry } from './news-validation';

export async function getNewsEntries(): Promise<NewsEntry[]> {
  const entries = (await getCollection('news')) as unknown as NewsEntry[];
  return validateNewsEntries(entries);
}

export function formatNewsDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}
