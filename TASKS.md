# Tasks

## Status Legend

- [ ] Not started
- [x] Completed

## Completed Prerequisites

- [x] **TASK-001 — Initialize project baseline**
  - Goal: Establish the Next.js + TypeScript + Tailwind App Router project and reserved folder structure.
  - Read: None.
  - Skills: None.
  - Deliverables: Working project baseline and reserved architecture folders.
  - Acceptance: Development server runs successfully and repository structure matches the agreed baseline.

- [x] **TASK-002 — Establish core project documentation**
  - Goal: Define product scope, architecture boundaries, and design-system foundation.
  - Read: `docs/PRD.md`, `docs/ARCHITECTURE.md`, `docs/DESIGN_SYSTEM.md`.
  - Skills: None.
  - Deliverables: Approved core documentation set.
  - Acceptance: MVP scope, technical boundaries, and approved-vs-TBD design decisions are explicit and non-conflicting.

## Phase 0 — Foundation

- [x] **TASK-003 — Clean starter UI and establish global baseline**
  - Goal: Remove starter presentation and prepare the global DOM/CSS baseline without deciding unresolved visual identity.
  - Read: `docs/ARCHITECTURE.md` §6, `docs/DESIGN_SYSTEM.md` §3-6.
  - Skills: `vercel-react-best-practices`, `design-system`.
  - Deliverables: Clean root layout/page baseline and global styling foundation.
  - Acceptance: App builds; no starter/demo UI remains; no unapproved palette/font/style is invented.

- [x] **TASK-004 — Create shared site shell and accessibility baseline**
  - Goal: Add reusable page frame, skip-to-content behavior, and shared shell boundaries.
  - Read: `docs/ARCHITECTURE.md` §3-6, `docs/DESIGN_SYSTEM.md` §7, §12.
  - Skills: `vercel-react-best-practices`, `web-design-guidelines`.
  - Deliverables: Shared layout primitives and accessibility shell.
  - Acceptance: Keyboard flow, focus visibility, and semantic page landmarks work without motion/WebGL.

- [ ] **TASK-005 — Create primary navigation and route foundations**
  - Goal: Establish navigation for `/`, `/links`, `/lab`, and `/profile`.
  - Read: `docs/PRD.md` §7-9, `docs/ARCHITECTURE.md` §5.
  - Skills: `vercel-react-best-practices`, `web-design-guidelines`.
  - Deliverables: Routable MVP destinations and shared primary navigation.
  - Acceptance: All MVP routes resolve; active/current location is understandable; external-link logic is not mixed into internal nav.

- [ ] **TASK-006 — Add content and data contracts**
  - Goal: Define minimal typed structures for navigation, destinations, experiments, and profile content.
  - Read: `docs/ARCHITECTURE.md` §10, §13.
  - Skills: `vercel-react-best-practices`.
  - Deliverables: Shared types plus minimal content/data modules with `TBD` where owner content is missing.
  - Acceptance: UI can consume content without hardcoding personal facts into presentation components.

## Phase 1 — Home

- [ ] **TASK-007 — Build Home DOM composition**
  - Goal: Create the accessible home information hierarchy and destination entry points before advanced effects.
  - Read: `docs/PRD.md` §8 Home, `docs/DESIGN_SYSTEM.md` §10 Home.
  - Skills: `design`, `ui-styling`, `web-design-guidelines`, `vercel-react-best-practices`.
  - Deliverables: DOM-first `/` composition.
  - Acceptance: Home communicates hub purpose and all major destinations without relying on motion or WebGL.

- [ ] **TASK-008 — Add Home motion foundation**
  - Goal: Add purposeful entrance and interaction motion to the Home route.
  - Read: `docs/DESIGN_SYSTEM.md` §8, `docs/ARCHITECTURE.md` §7, §9.
  - Skills: `gsap-core`, `gsap-react`, `gsap-performance`.
  - Deliverables: Route-scoped motion with cleanup and reduced-motion behavior.
  - Acceptance: Motion enhances hierarchy, does not block navigation, and fully respects reduced-motion preference.

- [ ] **TASK-009 — Add optional Home Three.js enhancement**
  - Goal: Introduce one approved, route-scoped 3D enhancement without making Home dependent on WebGL.
  - Read: `docs/ARCHITECTURE.md` §6-9, `docs/DESIGN_SYSTEM.md` §9, §14.
  - Skills: `threejs-fundamentals`, `threejs-interaction`, `threejs-lighting`, `threejs-materials`, `threejs-loaders`.
  - Deliverables: Lazy-loaded Home visual scene plus intentional non-WebGL fallback.
  - Acceptance: Core Home remains complete without canvas; scene cleans up on unmount; visual concept uses only owner-approved exploration decisions.

## Phase 2 — Links

- [ ] **TASK-010 — Build structured Links data**
  - Goal: Create the owner-editable destination dataset for internal/external websites.
  - Read: `docs/PRD.md` §8 Links, `docs/ARCHITECTURE.md` §10.
  - Skills: `vercel-react-best-practices`.
  - Deliverables: Typed link records with stable IDs, titles, descriptions, URL/route, category/status as needed.
  - Acceptance: No fake destinations are presented as real; adding a destination does not require page-layout edits.

- [ ] **TASK-011 — Build Links visual directory**
  - Goal: Render the destination dataset as a responsive rich-card experience.
  - Read: `docs/DESIGN_SYSTEM.md` §6-7, §10 Links.
  - Skills: `design`, `ui-styling`, `web-design-guidelines`, `vercel-react-best-practices`.
  - Deliverables: Responsive `/links` page and reusable destination-card UI.
  - Acceptance: Cards are understandable without hover; internal/external destinations are visually distinguishable.

- [ ] **TASK-012 — Add Links interaction polish**
  - Goal: Add pointer/focus/touch-safe card motion and preview behavior where justified.
  - Read: `docs/DESIGN_SYSTEM.md` §7-8.
  - Skills: `gsap-core`, `gsap-react`, `gsap-performance`, `web-design-guidelines`.
  - Deliverables: Card interaction motion with keyboard/touch parity.
  - Acceptance: No essential information is hover-only; motion is interruptible and reduced-motion-safe.

## Phase 3 — Lab

- [ ] **TASK-013 — Create Lab registry and index**
  - Goal: Establish an extensible experiment catalog and discovery surface.
  - Read: `docs/PRD.md` §8 Lab, `docs/ARCHITECTURE.md` §5, §10-11.
  - Skills: `vercel-react-best-practices`, `design`.
  - Deliverables: Typed experiment registry and `/lab` index.
  - Acceptance: New experiments can be registered without changing the site shell or unrelated routes.

- [ ] **TASK-014 — Establish isolated experiment entry pattern**
  - Goal: Define the route/component boundary used by individual experiments.
  - Read: `docs/ARCHITECTURE.md` §5-9.
  - Skills: `vercel-react-best-practices`, `gsap-performance`.
  - Deliverables: Reusable experiment entry/loading/error/fallback pattern.
  - Acceptance: Experiment code/assets load only when needed and clean up when leaving the experiment.

- [ ] **TASK-015 — Build first UI/motion experiment**
  - Goal: Validate the Lab pattern with one focused DOM/GSAP interaction experiment.
  - Read: `docs/DESIGN_SYSTEM.md` §7-10.
  - Skills: `ui-styling`, `gsap-core`, `gsap-react`, `gsap-timeline`, `gsap-performance`.
  - Deliverables: One complete motion experiment registered in Lab.
  - Acceptance: Experiment has clear enter/exit behavior, reduced-motion handling, and does not affect other routes.

- [ ] **TASK-016 — Build first Three.js interaction experiment**
  - Goal: Validate interactive 3D isolation and DOM/WebGL communication inside Lab.
  - Read: `docs/ARCHITECTURE.md` §7-9, `docs/DESIGN_SYSTEM.md` §9.
  - Skills: `threejs-fundamentals`, `threejs-interaction`, `threejs-geometry`, `threejs-materials`, `threejs-lighting`.
  - Deliverables: One route-scoped interactive Three.js experiment with fallback.
  - Acceptance: Pointer interaction is bounded; essential navigation remains DOM-accessible; resources/listeners are disposed on exit.

## Phase 4 — Profile

- [ ] **TASK-017 — Add approved Profile content model**
  - Goal: Prepare profile content using only owner-provided information.
  - Read: `docs/PRD.md` §8 Profile, `docs/ARCHITECTURE.md` §10.
  - Skills: `vercel-react-best-practices`.
  - Deliverables: Structured profile content/data with unresolved fields kept `TBD` or omitted.
  - Acceptance: No invented biography, achievements, links, or history.

- [ ] **TASK-018 — Build Profile page**
  - Goal: Create a calm, content-first profile experience consistent with the hub.
  - Read: `docs/DESIGN_SYSTEM.md` §5-7, §10 Profile.
  - Skills: `design`, `ui-styling`, `web-design-guidelines`, `vercel-react-best-practices`.
  - Deliverables: Responsive `/profile` page with restrained optional motion.
  - Acceptance: Content remains primary; page is fully usable without animation.

## Phase 5 — Quality & Release

- [ ] **TASK-019 — Cross-route accessibility and responsive audit**
  - Goal: Validate all MVP routes across keyboard, touch, viewport, and reduced-motion modes.
  - Read: `docs/PRD.md` §13-14, `docs/DESIGN_SYSTEM.md` §12.
  - Skills: `web-design-guidelines`.
  - Deliverables: Fixes for discovered MVP accessibility/responsive issues.
  - Acceptance: Primary flows work by keyboard/touch, focus is visible, no essential hover-only interactions remain, and layouts remain stable across target viewport classes.

- [ ] **TASK-020 — Performance and enhancement fallback audit**
  - Goal: Validate motion/WebGL lifecycle, loading isolation, fallback behavior, and route-level performance.
  - Read: `docs/ARCHITECTURE.md` §6-9.
  - Skills: `vercel-react-best-practices`, `gsap-performance`, relevant `threejs-*` skills for affected scenes.
  - Deliverables: Performance/fallback fixes and cleanup.
  - Acceptance: Heavy visual code is route-scoped; inactive scenes/animations stop; core content remains usable when enhancements are reduced/unavailable.

- [ ] **TASK-021 — Production build and MVP release baseline**
  - Goal: Verify the MVP can build and run as a coherent production application.
  - Read: `PLAN.md` Phase 5, `docs/PRD.md` §22.
  - Skills: `vercel-react-best-practices`.
  - Deliverables: Successful production build and final release-readiness fixes.
  - Acceptance: Production build succeeds; all completed-task acceptance criteria remain satisfied.

## Future — Not MVP

No actionable MVP checkboxes are created for:
- `/hometown`
- AI assistant / RAG
- notes / archive / gallery / setup / guestbook / timeline
- database / authentication / CMS / analytics

Add future tasks only after scope is explicitly approved.
