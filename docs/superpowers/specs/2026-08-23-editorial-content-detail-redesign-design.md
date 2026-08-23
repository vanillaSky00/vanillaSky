# Editorial Content Detail Redesign

## Context

The site currently treats projects and essays as separate experiences:

- Projects live in the `projects` content collection and render at `/work/{slug}`.
- Essays live in the `blog` content collection and render at `/blog/{slug}`.
- Project details use a sticky metadata sidebar, while essay details use a narrow article layout.
- The main navigation labels the essay section “Writing” even though its route is `/blog`.

The redesign keeps Work and Writing as distinct content types and clean route families, while giving every inner page a shared editorial presentation. Work remains a curated set of projects. Writing becomes the comprehensive editorial index containing links to both projects and essays.

## Goals

1. Use only `/work` and `/writing` for public content routes.
2. Reorder the primary and footer navigation to Work, Writing, About, Contact.
3. Keep the `/work` and `/writing` index pages visually unchanged.
4. Make `/work/{slug}` and `/writing/{slug}` share one content-led editorial layout.
5. Lead each detail page with at most one image or video beside its description and metadata.
6. Allow images and videos to appear naturally between article sections.
7. End each detail page with up to three automatically selected related stories.
8. Preserve the current brand colors, typography, theme behavior, and static Astro deployment.

## Non-goals

- Redesigning the Work or Writing index page layouts.
- Adding search, filters, categories, pagination, a CMS, or a new dependency.
- Redirecting project detail URLs from `/work/{slug}` to `/writing/{slug}`.
- Preserving `/blog` routes or adding `/blog` redirects.
- Rewriting article or project prose.
- Redesigning the global header, footer, theme toggle, or overall visual identity beyond navigation order and links.

## Information Architecture

The public content routes are:

```text
/work
/work/{work-slug}
/writing
/writing/{writing-slug}
```

The old `/blog` page and `/blog/{slug}` pages are removed. They intentionally return the static host's normal not-found response.

Work and Writing have distinct link behavior:

- `/work` lists only projects whose frontmatter has `featured: true` and links them to `/work/{slug}`.
- `/writing` combines every published writing entry with every project.
- Project rows on `/writing` link to `/work/{slug}`.
- Writing rows on `/writing` link to `/writing/{slug}`.

The primary and footer navigation use this order:

1. Work → `/work`
2. Writing → `/writing`
3. About → `/about`
4. Contact → `/#contact`

## Content Collections

Keep two collections because their content and metadata remain meaningfully different:

- `projects`: project case studies with `year`, project links, a cover image, and optional video.
- `writing`: essays and notes with publication dates and optional lead media.

Rename the current `blog` collection and directory to `writing`. Do not introduce a third aggregate collection or duplicate project files inside Writing.

The Writing schema retains the existing fields and gains optional media fields:

- `coverImage?: string`
- `heroVideo?: { src: string; poster?: string; caption?: string }`

The Projects schema keeps its existing metadata fields but replaces the `videos` array with the same optional singular `heroVideo` object and removes the `images` array. Existing array media is migrated before those fields are removed. The shared detail view uses `heroVideo` when present; otherwise it uses `coverImage`. Remaining media belongs inside the Markdown/MDX body rather than a separate post-body gallery.

For normalized sorting and recommendations:

- Writing entries use `updatedDate` when present, otherwise `date`.
- Projects use January 1 of the last four-digit year in `year` as their comparison date, so a range such as `2023–2026` sorts as 2026.
- Project `order` controls only the curated Work index, not Writing ordering or recommendation ranking.

## Index Page Behavior

The Work and Writing index pages keep their current visual structure and responsive CSS.

The Work index changes only its data selection: filter to `featured: true`, then sort by `order` ascending.

The Writing index keeps its current compact row presentation but receives normalized entries from both collections. Each row displays the metadata available for its content type:

- Writing: updated date and reading time.
- Project: year and category.

The existing row title and tags remain. Project rows use the same compact row layout without adding descriptions, gallery-style cards, or new visual sections.

## Shared Detail-Page Layout

Both detail route templates load their respective content entries and pass normalized metadata plus rendered body content into one shared editorial detail component.

The desktop hierarchy is:

```text
← Work or ← Writing                       category · date/year

TITLE

┌────────────────────────────┬──────────────────────────┐
│ one lead image or video    │ description              │
│                            │ tags                     │
│                            │ GitHub/live links        │
└────────────────────────────┴──────────────────────────┘

                     article body
          prose with media placed between sections

RELATED STORIES
┌ preview + title ┐ ┌ preview + title ┐ ┌ preview + title ┐
```

The detail header follows these rules:

- The page title spans the editorial content width above the lead grid.
- A lead video takes precedence over a lead image.
- Exactly one lead media item appears in the header.
- A writing entry without lead media uses a full-width text-led header; it does not render an empty media cell or placeholder.
- The right column contains description, tags, metadata, and optional live/GitHub links.
- Work pages link back to `/work`; Writing pages link back to `/writing`.

Remove the current project sidebar, project list, standalone gallery, and previous/next navigation. Remove the writing previous/next navigation. Related Stories replaces both navigation patterns.

## Article Body and Inline Media

The main prose column remains optimized for reading at approximately 65 characters per line. Headings, paragraphs, lists, blockquotes, code, and links retain the established typography and theme tokens.

Images and videos may be inserted between paragraphs from Markdown or MDX:

- Markdown images render at the normal article width and may use a shared wide-media class when authored in MDX.
- The existing `VideoEmbed` component remains the supported path for local and YouTube video embeds.
- Media includes meaningful alt text or captions supplied by the content author.
- Inline media may break wider than the prose column on desktop but remains within the viewport.

No new gallery component or rich-text system is introduced.

## Related Stories

A shared content helper normalizes projects and writing entries into a small summary shape containing:

- content type
- slug and canonical path
- title and description
- tags
- normalized comparison date
- preview image, using a project cover image or writing cover image when available

For a current entry, recommendation candidates include all other published projects and writing entries. Ranking is deterministic:

1. Exclude the current entry.
2. Count case-sensitive exact tag matches with the current entry.
3. Sort by shared-tag count descending.
4. Break ties by normalized comparison date descending.
5. Break remaining ties by title ascending.
6. Return the first three candidates.

This naturally uses the newest content as fallback when candidates share no tags. If fewer than three other entries exist, render only those available. A recommendation without preview media renders as a text-led card without a placeholder.

## Component and Data Boundaries

The implementation should use the fewest shared units that prevent duplicated behavior:

- A content helper loads and normalizes both collections, generates canonical paths, and ranks related entries.
- A shared editorial-detail component owns the lead grid, body slot, metadata, and Related Stories section.
- A shared related-story card owns the image and text-only preview states.
- The two route templates remain responsible only for fetching their collection entry, rendering its body, selecting its lead media, and supplying the correct back link.

The existing Work project card, Writing row styling, `VideoEmbed`, `BaseLayout`, and theme tokens are reused.

## Responsive and Accessibility Behavior

At tablet/mobile widths:

- The title remains first.
- The lead media and description columns stack into one column.
- Lead media uses its intrinsic ratio and full available width.
- Related-story cards stack vertically.
- Inline media never overflows the viewport.
- Links and video controls remain keyboard accessible.
- Images require useful `alt` text; decorative media uses empty alt text.
- Existing reduced-motion and color-theme behavior remain unchanged.

The layout must not hide essential content behind hover-only interactions.

## Failure and Empty States

- Missing optional lead media selects the text-led header state.
- Missing preview media selects the text-only related card state.
- Missing external links omits the links group.
- Empty tags still produce date-based recommendations.
- Fewer than three candidates renders a shorter recommendation list.
- Content-schema violations fail the Astro build rather than producing a partially broken page.
- Missing slugs continue to use the site's normal static 404 behavior.

## Migration

1. Rename `src/content/blog` to `src/content/writing` and update the collection name from `blog` to `writing`.
2. Move the current `/blog` route templates to `/writing` and update all internal references.
3. Remove the old `/blog` route files after the Writing routes exist.
4. Keep project files in `src/content/projects` and project detail URLs under `/work`.
5. Update navigation and footer links from `/blog` to `/writing` and place Writing immediately after Work.
6. Filter the Work index to featured projects.
7. Aggregate projects and writing entries on the Writing index without changing its visual row layout.
8. Rename each project's current single `videos` entry to the singular `heroVideo` field.
9. Move valid paths from each project's current `images` frontmatter array into that project's Markdown/MDX body in the same order before removing the standalone gallery.
10. Do not render the existing Dadaocheng gallery paths `/images/dadaocheng-01.jpg` and `/images/dadaocheng-02.jpg`, because those files are absent from `public`; its valid cover image remains the lead image.
11. Replace both existing detail layouts with the shared editorial detail component.

## Verification

Implementation follows test-driven development for the related-content ranking helper:

- A focused test first proves shared-tag ranking, newest fallback, current-entry exclusion, deterministic ties, and fewer-than-three behavior.
- The test must fail before the helper exists and pass after the minimal implementation.

Final verification includes:

- Run the focused related-content test.
- Run `npm run build` successfully.
- Confirm generated pages exist for `/work/{slug}` and `/writing/{slug}`.
- Confirm `/blog` and `/blog/{slug}` are absent from the static output.
- Confirm no source links reference `/blog`.
- Visually inspect representative Work and Writing details at desktop and mobile widths.
- Confirm a media-led project, a media-led writing entry when available, and a text-only writing entry all use the correct header state.
- Confirm inline images/video and related links work with the configured Astro base path.

## Acceptance Criteria

- The only content route families are `/work` and `/writing`.
- Navigation order is Work, Writing, About, Contact in the header and footer.
- Work and Writing indexes retain their current visual layouts.
- Work lists only featured projects.
- Writing lists every project and published writing entry with canonical links.
- Every Work and Writing inner page uses the approved editorial hierarchy.
- A detail header displays no more than one lead image or video.
- Text-only writing entries render without an empty media region.
- Article bodies support inline images and videos.
- Related Stories returns up to three deterministic cross-content recommendations.
- The design introduces no new runtime dependency.
- The production build and focused ranking test pass.
