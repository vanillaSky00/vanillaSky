---
title: "Yuzuru Hanyu Gallery"
subtitle: "Explore the different shades of the world"
year: "2026"
category: "Web Design"
tags: ["React", "Web Design", "Frontend", "Gallery"]
description: "An immersive gallery website celebrating figure skater Yuzuru Hanyu."
coverImage: "/images/yuzuru-cover.png"
featured: true
order: 1
link: "https://vanillasky00.github.io/yuzuru-hanyu-gallery/"
github: "https://github.com/vanillaSky00/yuzuru-hanyu-gallery"
---


## About the Project

A visual diary website for Yuzuru Hanyu's artistic skating career, built as an exploration of **SDD-driven (Specification-Driven Development) prompting** — where a structured `skill.md` acts as the single source of rendering truth for an AI agent, decoupling content from presentation.

The content lives in Markdown (`content.md`, `entries/*.md`). The rendering spec lives in modular `skill.md` sections (MODULE A–L). The AI agent reads the spec and scaffolds the full Astro + React site from it.

## Workflow

The process is a manual iteration loop, not a fully automated pipeline:

1. **Write or refine a module** in the `skill.md` spec (layout rules, composition grammar, hover behavior, etc.)
2. **Prompt the AI agent** to scaffold or update the output
3. **Review manually** — check the rendered page visually, inspect image sizing, verify URLs load
4. **Identify the gap** — if the output doesn't match intent, translate the artistic idea into a precise directive (e.g. "images may not exceed 65% width with intervening prose" rather than "make it feel more editorial")
5. **Update the spec** and re-prompt

The `skill.md` is a living document — it often lags behind what was actually implemented via direct iteration, which is a known limitation of this approach.

## Challenges

**Translating artistic intent into directives.** Natural language descriptions of aesthetic goals ("feel more like a magazine", "less like a blog") don't give the AI enough signal to reproduce a specific vision consistently. The real work is converting a mental image into explicit, verifiable rules — composition patterns, size constraints, sequencing guards — that can be enforced in the spec.

**Spec drift.** When you make a targeted fix directly (editing a component, nudging a CSS value), the `skill.md` doesn't automatically update to reflect it. Over time the spec and the actual implementation diverge, which degrades the AI's ability to regenerate consistent output from the spec alone.

**No automated test harness.** 
The iteration loop has two distinct layers of feedback, and they have very different automation ceilings.
- The first layer — structural correctness — is theoretically automatable: check that images don't exceed 65% width, that no two full-width media blocks appear consecutively, that every detail page has a navigation widget, that all URLs resolve. These are rules from the spec, and a test suite could enforce them.

- The second layer — aesthetic intent — resists automation entirely. Whether the page feels editorial, whether the image rhythm creates the right visual breathing room, whether the typography hierarchy reads as refined rather than merely correct: these require a human eye, and no diff or score captures them. The challenge isn't just that the harness wasn't built — it's that for the aesthetic layer, it's not clear what a passing test would even look like.
So every iteration cycle collapses both layers onto the same human review step, which is slower than it needs to be for the structural checks, and probably irreducible for the aesthetic ones.
