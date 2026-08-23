import test from 'node:test';
import assert from 'node:assert/strict';
import { projectYearTimestamp, rankRelated } from '../src/lib/content.js';

const story = (id, tags, date, title = id, kind = 'writing') => ({
  id,
  kind,
  slug: id,
  href: `/writing/${id}`,
  title,
  description: '',
  tags,
  date,
});

test('rankRelated prefers shared tags, excludes the current story, and limits results', () => {
  const current = story('current', ['AI', '3D'], 10);
  const candidates = [
    current,
    story('new-no-tags', [], 50),
    story('one-tag', ['AI'], 30),
    story('two-tags', ['AI', '3D'], 20),
    story('old-no-tags', [], 5),
  ];

  assert.deepEqual(
    rankRelated(current, candidates, 3).map(({ id }) => id),
    ['two-tags', 'one-tag', 'new-no-tags'],
  );
});

test('rankRelated uses newest date then title for deterministic fallback', () => {
  const current = story('current', [], 10);
  const candidates = [
    story('zulu', [], 20, 'Zulu'),
    story('alpha', [], 20, 'Alpha'),
    story('older', [], 15, 'Older'),
  ];

  assert.deepEqual(
    rankRelated(current, candidates).map(({ id }) => id),
    ['alpha', 'zulu', 'older'],
  );
});

test('rankRelated prefers Work when tag scores are equal', () => {
  const current = story('current', ['AI'], 10);
  const writing = story('writing', ['AI'], 30);
  const work = story('work', ['AI'], 20, 'Work', 'project');

  assert.deepEqual(
    rankRelated(current, [writing, work]).map(({ id }) => id),
    ['work', 'writing'],
  );
});

test('rankRelated returns every available candidate when fewer than three exist', () => {
  const current = story('current', ['Design'], 10);
  const only = story('only', ['Design'], 20);
  assert.deepEqual(rankRelated(current, [current, only]).map(({ id }) => id), ['only']);
});

test('projectYearTimestamp uses the final year in a displayed range', () => {
  assert.equal(projectYearTimestamp('2023–2026'), Date.UTC(2026, 0, 1));
  assert.equal(projectYearTimestamp('2025'), Date.UTC(2025, 0, 1));
});
