# Architecture

## Document Contract

- **Purpose:** Define the implementation boundaries for the Messy Hub MVP and its extension points.
- **Status:** Current architecture decision for MVP planning; implementation details remain future work.
- **Source of truth:** `docs/PRD.md` for product scope; this document for technical boundaries.
- **Read this when:** Adding routes, content, motion, WebGL, assets, or future hub capabilities.
- **Do not read this for:** Visual direction, personal content, design tokens, or AI/RAG implementation.

## 1. Architecture Summary

Messy Hub is a Next.js App Router application using React and TypeScript. Routes compose semantic, server-rendered content from local content/data modules and reuse site layout, navigation, UI, and motion primitives.

DOM is the source of truth for headings, text, navigation, links, controls, and fallback states. Motion is an optional client-side enhancement. Three.js/React Three Fiber is a route-scoped, client-only visual layer used only where a specific experience justifies it. Content is kept independent of presentation so it can later support navigation, search, and approved AI sources.

The MVP has four routes: `/`, `/links`, `/lab`, and `/profile`. Future routes are additive and must not require a new application shell or global state model.

## 2. Architecture Principles

- Progressive enhancement is the default: content and navigation work before optional effects load, without WebGL, and with reduced motion.
- Route composition owns page purpose; reusable layers own behavior that is shared across pages.
- Semantic DOM interactions have an equivalent keyboard, touch, and non-cursor path.
- Motion expresses hierarchy, focus, continuity, or feedback; it must not carry essential information alone.
- WebGL scenes own visual computation, not site semantics, navigation, or content truth.
- Heavy client code and assets are loaded only by the route or experiment that needs them.
- Local, explicit data is sufficient for the MVP; no server data architecture is required.
- New capabilities must enter through narrow contracts instead of importing route internals into unrelated layers.

## 3. System Layers

| Layer | Responsibility | Boundary |
|---|---|---|
| App / routing | Route segments, metadata, layouts, loading/error/not-found composition, and page-level orchestration | May compose all layers; does not contain reusable scene or animation internals |
| DOM UI | Semantic structure, readable content, links, controls, focus order, fallbacks, and responsive layout | Must remain complete without motion or WebGL |
| Motion | Client-side DOM transitions, scroll-linked behavior, and interaction feedback | Receives DOM refs and small state signals; never becomes content state |
| Three.js / WebGL | Optional canvas scenes, visual atmosphere, and scene-local interaction | Client-only and route-scoped; communicates through explicit inputs/outputs, never through DOM queries for meaning |
| Content / data | Human-readable content and structured records for destinations, experiments, profile sections, and navigation metadata | Presentation-agnostic; no React or canvas dependencies |
| Future AI | Reserved boundary for approved content retrieval and constrained actions | No implementation, provider, API, database, or RAG pipeline in MVP |

## 4. Directory Responsibilities

`src/app` — App Router routes, shared route layouts, metadata, and route-level composition.

`src/components/ui` — Generic accessible UI primitives with no product-specific content or scene knowledge.

`src/components/layout` — Site-wide shell pieces such as page frame, skip link, footer, and shared orientation elements.

`src/components/navigation` — Primary navigation, route status, internal/external destination affordances, and navigation-specific responsive behavior.

`src/components/motion` — Reusable client-side DOM motion abstractions and reduced-motion-aware behavior.

`src/components/three` — React Three Fiber/Three.js scene components and route-level visual enhancement adapters; never semantic site content.

`src/components/assistant` — Reserved for a future assistant surface; do not create or populate it for MVP.

`src/content` — Human-readable authored content that may be consumed by pages and future approved search/RAG sources.

`src/data` — Structured application records such as navigation destinations, link cards, experiment entries, and visibility/status metadata.

`src/hooks` — Reusable React hooks whose contracts are independent of one page; browser-only hooks remain client-safe.

`src/lib/animation` — Framework-independent animation helpers and motion policy utilities.

`src/lib/three` — Framework-independent Three.js utilities, asset helpers, coordinate/interaction helpers, and disposal logic.

`src/lib/ai` — Reserved boundary for future AI functionality; no implementation in MVP.

`src/shaders` — GLSL assets only when a later WebGL experience requires them; not a default home-page dependency.

`src/types` — Shared TypeScript contracts for content, destinations, experiments, visual enhancement inputs, and future-safe metadata.

`src/config` — Stable application configuration such as route metadata and feature/enhancement policy, not mutable runtime state.

`public` — Static files addressed by URL, including approved images, fonts, icons, models, textures, mascot assets, and other public media.

The repository already reserves these directories as architectural boundaries. Reserved or empty directories should remain unpopulated until a task genuinely needs them.

## 5. Route Architecture

Each route owns its page purpose, composition, metadata, and route-specific enhancement policy. Shared layout, navigation, content contracts, and fallback conventions belong in reusable layers.

| Route | Architectural role | Enhancement posture |
|---|---|---|
| `/` | Entrance, orientation, hub identity, and links to major destinations | May opt into selective motion or WebGL; DOM remains complete and authoritative |
| `/links` | Data-driven visual directory of internal and external destinations | DOM-first cards; optional hover/focus motion and previews must not be required |
| `/lab` | Extensible index and entry point for experiments | Route-scoped lazy loading; individual experiments must be isolated and removable without changing the hub shell |
| `/profile` | Owner-provided profile content and relevant links | Primarily semantic content; optional restrained motion only |
| Future routes | Additive top-level destinations such as `/hometown`, `/notes`, or `/archive` | Introduce their own route-level composition and enhancement policy; do not expand MVP scope by reservation alone |

`/hometown` is a future route, not an MVP route. It may later use an immersive scene, but its content, world model, and implementation are intentionally undefined. Lab experiments may use nested route segments when an experiment needs a dedicated URL, while the lab index remains the stable discovery surface.

## 6. Rendering Strategy

- **Server Components:** Default for route pages, layouts, static content composition, navigation data, metadata, and accessible fallback markup. Keep serialized props small and presentation-oriented.
- **Client Components:** Use only for browser APIs, pointer/keyboard interaction state, motion lifecycle, canvas/WebGL, or other genuinely interactive behavior.
- **Dynamic import / lazy loading:** Use for route-specific motion packages, React Three Fiber/Three.js, experiment modules, models, textures, and other GPU-heavy code. The home route must not make unrelated lab assets part of its baseline bundle.
- **DOM:** Use for all semantic text, headings, links, buttons, form controls, status, focus targets, and content that must survive enhancement failure.
- **Canvas/WebGL:** Use only as a visual or interaction enhancement inside an explicit container with reserved layout space, an accessible DOM fallback, and a clear degraded mode.
- **Motion preference:** Resolve reduced-motion behavior at the enhancement boundary. Removing motion must preserve the same content, controls, and route transitions.

## 7. UI ↔ Motion ↔ Three.js Boundaries

Communication is one-way where possible and uses small typed contracts rather than shared internals.

- **Pointer input:** DOM controls receive actionable pointer/keyboard events. A scene may receive normalized pointer intent or a named interaction target for visual response; a canvas must not be the only clickable representation of a site action. Raycasting is limited to registered interactive objects and should be bounded/throttled for high-frequency hover work.
- **Scroll state:** The page remains native-scroll-first. Motion may observe scroll or use ScrollTrigger for route-local effects; it must not hide essential content or require a custom scroller. Scroll-linked scenes receive coarse progress/state, not DOM ownership.
- **Scene state:** Scene-local camera, selection, animation, and asset state stays inside the scene adapter. Expose only stable events or visual-state requests such as `active`, `hovered`, or `degraded`.
- **Route transitions:** Navigation is owned by the App Router and DOM. Motion may animate entry/exit around route changes but must clean up on unmount and never block navigation or focus restoration.
- **Reduced motion:** Motion and scene choreography are disabled or simplified from a shared preference signal. Scene state still has a static or non-animated representation, and all semantic content remains available.
- **Lifecycle:** GSAP work is client-only, scoped to component refs, and reverted on unmount/update. WebGL listeners, animation loops, controls, loaders, geometries, materials, textures, and renderers are disposed when their route/experiment leaves the tree.

## 8. Asset Strategy

- **Images:** Keep public, approved raster assets in `public` when they are URL-addressed; use responsive dimensions and formats, and reserve layout space before loading.
- **Fonts:** Keep only approved fonts in `public` or the framework-supported local-font path; load them at the application boundary only when globally required.
- **Icons:** Prefer small local SVG/icon assets or existing UI primitives. Give meaningful icons accessible names through the DOM; mark decorative icons as decorative.
- **Models:** Store route/experiment-specific models under `public` in a clear asset namespace. Load them only from the owning scene and provide a placeholder/fallback.
- **Textures:** Co-locate or namespace textures with their scene/experiment. Load progressively and choose compressed/appropriate formats when a real asset pipeline is justified.
- **Mascot assets:** Treat mascot imagery or models as content assets, not as an implicit global shell dependency; no mascot is currently committed by the PRD.
- **Shaders:** Keep GLSL under `src/shaders` only when needed by a specific scene. A shader must never be required for semantic content or baseline navigation.
- **Loading:** Use explicit loading/error states for asynchronous visual assets. Cache only when reuse is demonstrated; route isolation takes priority over speculative preloading.

## 9. Performance Boundaries

- Load by route and experiment. `/links` and `/profile` must not import lab scenes, model loaders, or shader code.
- Keep WebGL behind a client-only, lazy boundary and mount it only when the owning route/viewport and capability checks allow it.
- Preserve layout space for media, fonts, asynchronous content, and canvases to avoid avoidable layout shift.
- Prefer transform/opacity for DOM motion; avoid layout-property animation when a transform can express the same result.
- Scope and clean up GSAP timelines and ScrollTriggers; refresh scroll measurements only after real layout changes.
- Bound pointer, resize, and scroll work. Limit raycast targets, avoid per-frame object creation, and pause or simplify inactive/off-screen effects.
- Keep render cost local: use the simplest scene, materials, draw calls, pixel ratio, and asset detail that satisfy the feature. Do not add post-processing without product justification.
- Dispose Three.js resources and stop loops/listeners when an experiment unmounts or a route changes.
- Provide loading, unsupported-device, slow-connection, and reduced-motion fallbacks. Enhanced effects must never delay core content or trap focus.
- Measure actual performance during implementation; this document does not establish arbitrary numeric budgets beyond the PRD quality bar.

## 10. Content Architecture

Content is authored and stored separately from presentation. Human-readable content may live in `src/content`; stable records and indexes may live in `src/data`. Both are consumed by route composition through shared contracts in `src/types`.

Records should carry stable identifiers and, where relevant, title, description, route or URL, category, visibility/status, and internal/external destination metadata. Unknown personal information remains `TBD`; no placeholder facts are presented as real content.

The model must expose semantic text and metadata independently of cards, animation, canvas, or scene coordinates. This keeps navigation and future approved search/RAG source selection possible without designing or implementing RAG now.

## 11. Future Extension Points

- **Hometown experience:** Add a route and a route-owned scene adapter only after content, interaction, fallback, and device requirements are approved. It is not part of MVP.
- **AI assistant / RAG:** Future AI may read approved content contracts and issue a constrained set of named navigation or UI intents. No provider, API, database, retrieval pipeline, or assistant UI is defined now.
- **New hub pages:** Add route metadata and content records, then compose them through existing layout/navigation contracts. Avoid a new global state layer for a new page.
- **New lab experiments:** Add an indexed experiment record and an isolated route/component boundary. An experiment may opt into its own client code and assets without changing unrelated routes.

## 12. Dependency Policy

| Class | Technologies / policy |
|---|---|
| **CORE** | Next.js App Router 16, React 19, TypeScript, existing CSS/Tailwind tooling, and the browser platform. Use the existing package set as the baseline. |
| **APPROVED WHEN NEEDED** | Three.js, React Three Fiber, Drei, GSAP, `@gsap/react`, and loader/compression helpers for a specific approved visual feature or experiment. Add only when the owning task requires them. |
| **FUTURE / UNDECIDED** | AI/LLM or RAG packages, search/indexing, database, CMS, authentication, Supabase, Prisma, Redux, Zustand, API architecture, Docker, analytics, and testing infrastructure. None is required by the MVP architecture. |

## 13. Architecture Decisions

| ID | Decision | Reason |
|---|---|---|
| ARCH-001 | Use Next.js App Router with React and TypeScript as the application foundation. | Matches the repository and supports route-level composition and server-first rendering. |
| ARCH-002 | Keep semantic content and controls DOM-first. | Preserves accessibility, SEO, keyboard use, and fallback behavior when enhancements fail or are reduced. |
| ARCH-003 | Treat motion and WebGL as optional client-side enhancement layers. | Prevents visual features from becoming the application shell or baseline bundle. |
| ARCH-004 | Lazy-load route-specific and experiment-specific heavy code and assets. | Keeps unrelated pages independent from GPU and animation cost. |
| ARCH-005 | Use local content/data modules with shared TypeScript contracts; no database or CMS. | The MVP has no persistence requirement and needs presentation-independent content. |
| ARCH-006 | Avoid global state until a demonstrated cross-feature need exists. | Current routes can communicate through props, URL state, and local component state. |
| ARCH-007 | Use narrow typed interfaces between DOM, motion, and scenes. | Allows visual implementations to change without coupling semantic UI to scene internals. |
| ARCH-008 | Reserve, but do not implement, future AI and immersive-route boundaries. | Keeps `/hometown` and AI/RAG extensible without prematurely designing them into the MVP. |

## 14. TBD

- Final visual direction and the exact role of WebGL on `/`.
- Approved personal content, external destinations, and initial lab experiments.
- Whether `/lab` experiments need dedicated nested routes or can remain index-launched modules.
- Browser/device support floor for WebGL-enhanced experiences.
- Future content approval rules and constrained actions for an AI assistant.
- Whether analytics, persistence, or other infrastructure becomes justified after MVP usage evidence.
