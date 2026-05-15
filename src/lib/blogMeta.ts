import type { CollectionEntry } from 'astro:content';

type BlogPost = CollectionEntry<'blog'>;

const WORDS_PER_MINUTE = 225;

const shortDateFormatter = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

const longDateFormatter = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export function getPostUpdatedDate(post: BlogPost) {
  return post.data.updatedDate ?? post.data.date;
}

export function getReadingMinutes(body = '') {
  const text = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)]\([^)]*\)/g, '$1')
    .replace(/<[^>]*>/g, ' ')
    .replace(/[^\p{L}\p{N}'-]+/gu, ' ')
    .trim();

  if (!text) return 1;

  const wordCount = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

export function formatShortDate(date: Date) {
  return shortDateFormatter.format(date);
}

export function formatLongDate(date: Date) {
  return longDateFormatter.format(date);
}

export function formatReadingTime(minutes: number) {
  return `${minutes} ${minutes === 1 ? 'min' : 'mins'} read`;
}
