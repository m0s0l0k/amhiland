import assert from 'node:assert/strict';
import test from 'node:test';
import { newsSchema } from '../src/lib/news-schema.ts';
import {
  resolveNewsIllustration,
  sortNewsByPublishedAt,
  validateNewsEntries,
} from '../src/lib/news-validation.ts';

function createArticle(overrides = {}) {
  const { id, ...dataOverrides } = overrides;
  const data = {
    title: 'Article de démonstration',
    slug: 'article-demo',
    category: 'Hunter × Hunter',
    excerpt: 'Résumé de démonstration.',
    publishedAt: new Date('2026-09-20T00:00:00.000Z'),
    updatedAt: new Date('2026-09-20T00:00:00.000Z'),
    tags: ['démo'],
    featured: false,
    demo: true,
    ...dataOverrides,
  };

  return {
    id: id ?? data.slug,
    collection: 'news',
    data,
  };
}

test('sorts articles by publication date, newest first, without mutating the input', () => {
  const older = createArticle({ slug: 'older', publishedAt: new Date('2026-09-19T00:00:00Z') });
  const newer = createArticle({ slug: 'newer', publishedAt: new Date('2026-09-21T00:00:00Z') });
  const entries = [older, newer];

  assert.deepEqual(sortNewsByPublishedAt(entries), [newer, older]);
  assert.deepEqual(entries, [older, newer]);
});

test('accepts valid dates and rejects invalid or reversed publication dates', () => {
  assert.equal(newsSchema.safeParse(createArticle().data).success, true);
  assert.equal(newsSchema.safeParse(createArticle({ publishedAt: 'not-a-date' }).data).success, false);

  const reversedDates = createArticle({ updatedAt: new Date('2026-09-19T00:00:00Z') });
  const result = newsSchema.safeParse(reversedDates.data);
  assert.equal(result.success, false);
  assert.ok(result.error.issues.some((issue) => issue.path.join('.') === 'updatedAt'));
});

test('accepts safe slugs and rejects path-like or malformed slugs', () => {
  assert.equal(newsSchema.safeParse(createArticle({ slug: 'hunter-x-hunter-2026' }).data).success, true);

  for (const slug of ['Uppercase', '../article', 'two--hyphens', '-leading', 'trailing-']) {
    assert.equal(newsSchema.safeParse(createArticle({ slug }).data).success, false, slug);
  }
});

test('rejects blank text and reports invalid collection data clearly', () => {
  for (const data of [
    createArticle({ title: '   ' }).data,
    createArticle({ excerpt: '\t ' }).data,
    createArticle({ tags: ['  '] }).data,
  ]) {
    assert.equal(newsSchema.safeParse(data).success, false);
  }

  assert.throws(
    () => validateNewsEntries([createArticle({ id: 'actual-file', slug: 'different-from-file' })]),
    /Invalid news collection:[\s\S]*does not match content filename/,
  );
});

test('rejects duplicate slugs and supplies a category-based illustration fallback', () => {
  const first = createArticle();
  const second = createArticle({ id: 'another-file' });

  assert.throws(
    () => validateNewsEntries([first, second]),
    /duplicate slug "article-demo"/,
  );
  assert.equal(resolveNewsIllustration('Hunter × Hunter'), 'landscape');
  assert.equal(resolveNewsIllustration('JoJo'), 'ornament');
  assert.equal(resolveNewsIllustration('Anime & Manga'), 'constellation');
});
