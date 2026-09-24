import type { NewsData } from './news-schema';

export type NewsEntry = {
  id: string;
  collection: 'news';
  data: NewsData;
  body?: string;
};

export function validateNewsEntries(entries: NewsEntry[]): NewsEntry[] {
  const errors: string[] = [];
  const slugFiles = new Map<string, string>();

  for (const entry of entries) {
    const fileName = entry.id.split('/').at(-1);
    if (fileName !== entry.data.slug) {
      errors.push(`slug "${entry.data.slug}" does not match content filename "${entry.id}.md".`);
    }

    const existingFile = slugFiles.get(entry.data.slug);
    if (existingFile) {
      errors.push(`duplicate slug "${entry.data.slug}" found in "${existingFile}.md" and "${entry.id}.md".`);
    } else {
      slugFiles.set(entry.data.slug, entry.id);
    }
  }

  if (errors.length > 0) {
    throw new Error(`Invalid news collection:\n- ${errors.join('\n- ')}`);
  }

  return entries;
}

export function sortNewsByPublishedAt(entries: NewsEntry[]): NewsEntry[] {
  return [...entries].sort(
    (left, right) => right.data.publishedAt.getTime() - left.data.publishedAt.getTime(),
  );
}

export function resolveNewsIllustration(
  category: NewsData['category'],
  illustration?: NewsData['illustration'],
): NonNullable<NewsData['illustration']> {
  if (illustration) return illustration;

  switch (category) {
    case 'Hunter × Hunter': return 'landscape';
    case 'JoJo': return 'ornament';
    case 'Anime & Manga': return 'constellation';
  }
}
