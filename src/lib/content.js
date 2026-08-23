/**
 * @typedef {'project' | 'writing'} ContentKind
 * @typedef {Object} ContentSummary
 * @property {string} id
 * @property {ContentKind} kind
 * @property {string} slug
 * @property {string} href
 * @property {string} title
 * @property {string} description
 * @property {string[]} tags
 * @property {number} date
 * @property {string | undefined} previewImage
 */

export function projectYearTimestamp(year) {
  const years = String(year).match(/\d{4}/g);
  return Date.UTC(Number(years?.at(-1) ?? 1970), 0, 1);
}

export function toProjectSummary(project) {
  const { data, slug } = project;
  return {
    id: `project:${slug}`,
    kind: 'project',
    slug,
    href: `/work/${slug}`,
    title: data.title,
    description: data.description,
    tags: data.tags,
    date: projectYearTimestamp(data.year),
    previewImage: data.coverImage ?? data.heroVideo?.poster,
  };
}

export function toWritingSummary(entry) {
  const { data, slug } = entry;
  return {
    id: `writing:${slug}`,
    kind: 'writing',
    slug,
    href: `/writing/${slug}`,
    title: data.title,
    description: data.description,
    tags: data.tags,
    date: (data.updatedDate ?? data.date).valueOf(),
    previewImage: data.coverImage ?? data.heroVideo?.poster,
  };
}

export function rankRelated(current, candidates, limit = 3) {
  const currentTags = new Set(current.tags);

  return candidates
    .filter(({ id }) => id !== current.id)
    .map((entry) => ({
      entry,
      score: entry.tags.filter((tag) => currentTags.has(tag)).length,
    }))
    .sort((a, b) =>
      b.score - a.score
      || Number(b.entry.kind === 'project') - Number(a.entry.kind === 'project')
      || b.entry.date - a.entry.date
      || a.entry.title.localeCompare(b.entry.title),
    )
    .slice(0, limit)
    .map(({ entry }) => entry);
}
