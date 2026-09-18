# Development Plan

## Document Contract

- **Purpose:** Define the MVP implementation sequence at phase level.
- **Status:** Active MVP roadmap.
- **Source of truth:** `docs/PRD.md` for scope; `docs/ARCHITECTURE.md` for technical boundaries; `docs/DESIGN_SYSTEM.md` for design rules.
- **Read this when:** Sequencing work, adding/removing tasks, or checking phase readiness.
- **Do not read this for:** Task-level implementation instructions.

## Phase 0 — Foundation

**Goal:** Establish a clean shared application shell and implementation baseline.

**Main outcomes**
- Starter UI removed without breaking the App Router baseline.
- Shared global styling/token hooks prepared without locking unresolved visual values.
- Site shell, navigation foundation, metadata, accessibility baseline, and route placeholders established.
- Dependencies introduced only by tasks that actually need them.

**Exit condition:** Core routes can be composed consistently without Three.js or advanced motion.

## Phase 1 — Home

**Goal:** Build the hub entrance as a strong DOM-first experience with optional motion/3D enhancement.

**Main outcomes**
- Home information hierarchy and destination navigation.
- Shared motion behavior for the entrance.
- Optional route-scoped Three.js enhancement with fallback/reduced-effects behavior.

**Exit condition:** `/` is usable and visually intentional with or without motion/WebGL.

## Phase 2 — Links

**Goal:** Build the visual directory for internal/external destinations.

**Main outcomes**
- Structured link/destination data.
- Responsive rich-card layout.
- Clear internal vs external navigation behavior.
- Interaction polish without hover-only dependencies.

**Exit condition:** `/links` can grow by adding data rather than redesigning the page.

## Phase 3 — Lab

**Goal:** Establish an extensible experiment area without coupling experiments to the site shell.

**Main outcomes**
- Experiment registry/index.
- Stable experiment entry pattern.
- Initial motion/UI experiment.
- Initial Three.js interaction experiment.
- Heavy assets and client code isolated by experiment.

**Exit condition:** New experiments can be added independently with route-safe cleanup and loading boundaries.

## Phase 4 — Profile

**Goal:** Add the personal-context area without turning the hub into a résumé site.

**Main outcomes**
- Owner-provided profile content structure.
- Accessible, content-first profile page.
- Restrained visual/motion treatment consistent with the shared system.

**Exit condition:** `/profile` is complete using approved content only.

## Phase 5 — Quality & Release

**Goal:** Validate the MVP as one coherent, production-ready hub.

**Main outcomes**
- Cross-route responsive and accessibility review.
- Reduced-motion and WebGL fallback verification.
- Performance cleanup and route-level bundle sanity.
- Production build verification.

**Exit condition:** MVP acceptance criteria pass across the supported experience modes.

## Future — Not MVP

Possible later work:
- `/hometown`
- AI assistant / RAG
- notes / archive / gallery / setup / guestbook / timeline
- persistence, analytics, personalization, or other infrastructure only if later justified
