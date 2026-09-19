# Agent Guide

## Core Rules

- Start from the requested task; do not preload the whole repository context.
- Read only the docs and skills listed by the task, plus the minimum code needed to implement it.
- Respect existing product, architecture, and design decisions.
- Do not modify files outside task scope unless required for correctness.
- Do not add dependencies, infrastructure, or global state without a task-level need.
- Do not invent personal content or resolve `TBD` decisions without owner approval.
- Preserve accessibility, responsive behavior, native scrolling, and reduced-motion behavior.
- Keep semantic content and essential actions DOM-accessible even when motion/WebGL is present.
- Validate the task before marking it complete.
- Stop when the requested scope is complete.

## Documentation Router

| Need | Read |
|---|---|
| Product scope / feature intent | `docs/PRD.md` |
| Architecture / routing / rendering / performance boundaries | `docs/ARCHITECTURE.md` |
| UI / visual / interaction / motion rules | `docs/DESIGN_SYSTEM.md` |
| Roadmap / phase sequencing | `PLAN.md` |
| Current implementation task | `TASKS.md` |
| Historical changes / prior decisions only when needed | `docs/CHANGELOG.md` |

Do **not** read PRD, Architecture, Design System, Plan, Tasks, and Changelog together by default.

## Skill Router

- React / Next.js: `vercel-react-best-practices`
- UI structure / styling: relevant UI UX Pro Max skill(s), typically `design-system`, `ui-styling`, or `design`
- UI audit: `web-design-guidelines`
- GSAP: load only the relevant skill(s): `gsap-core`, `gsap-react`, `gsap-scrolltrigger`, `gsap-timeline`, `gsap-performance`
- Three.js: load only the relevant `threejs-*` skill(s) required by the task

Do not load all GSAP or Three.js skills for every task.

## Task Execution Contract

Before implementation:
1. Read the target entry in `TASKS.md`.
2. Read only its listed docs/sections and skills.
3. Inspect the relevant existing code.
4. Implement only the stated scope.

After implementation:
1. Run the task's relevant validation.
2. Mark its checkbox `[x]` only when all acceptance criteria pass.
3. Append one concise entry to `docs/CHANGELOG.md`.
4. Do not rewrite unrelated docs unless the task explicitly requires it.

## Changelog Rule

`docs/CHANGELOG.md` is **Vietnamese-only** and **append-only**.

- Never delete or rewrite old entries.
- Append completed work in chronological order.
- Log actual changes only; never log planned work as completed.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
