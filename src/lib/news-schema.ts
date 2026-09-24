import { z } from 'astro/zod';

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const newsSchema = z.object({
  title: z.string().trim().min(1),
  slug: z.string().trim().regex(slugPattern, 'Slug must contain lowercase letters, numbers, and single hyphens only.'),
  category: z.enum(['Hunter × Hunter', 'JoJo', 'Anime & Manga']),
  excerpt: z.string().trim().min(1).max(240),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  tags: z.array(z.string().trim().min(1)),
  featured: z.boolean(),
  illustration: z.enum(['landscape', 'ornament', 'constellation']).optional(),
  demo: z.boolean().default(false),
}).superRefine((article, context) => {
  if (article.updatedAt < article.publishedAt) {
    context.addIssue({
      code: 'custom',
      path: ['updatedAt'],
      message: 'updatedAt must be the same as or later than publishedAt.',
    });
  }
});

export type NewsData = z.infer<typeof newsSchema>;
