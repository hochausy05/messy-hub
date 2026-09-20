# World Journey Architecture

## Document Contract

- **Purpose:** Authoritative technical architecture for the Messy Hub World Journey. Converts the approved visual direction into a practical implementation system.
- **Status:** APPROVED architecture for greybox implementation.
- **Source of truth:** Technical decisions for World Journey implementation. Visual direction remains owned by [`docs/design/WORLD_JOURNEY.md`](file:///f:/Vibe/messy-hub/docs/design/WORLD_JOURNEY.md).
- **Read this when:** Implementing, greyboxing, or extending World Journey scenes; integrating scroll/camera systems; loading assets; defining chapter boundaries; or making responsive/performance decisions.
- **Do not read this for:** Visual concept, art direction, palette progression, or lighting mood (see `WORLD_JOURNEY.md`); general application architecture (see `docs/ARCHITECTURE.md`); design tokens (see `docs/DESIGN_SYSTEM.md`).

---

## 1. Experience Architecture

### Runtime Ownership

```
Home (Route: /)
├── DOM journey/content layer    ← semantic content, headings, links, a11y
├── Scroll progress/orchestration ← GSAP ScrollTrigger + progress refs
└── WorldJourneyCanvas            ← single route-scoped R3F Canvas
    └── WorldJourneyScene
        ├── Orbit
        ├── Atmosphere
        ├── Forest
        ├── Cave
        ├── Ocean
        └── Abyss
```

### Single Canvas Rationale

One route-scoped R3F `<Canvas>` instance renders the entire World Journey. Six independent Canvas instances are explicitly rejected.

**Minimizes:**
- **Context creation:** One WebGL context instead of six. Each context consumes GPU memory and most browsers limit concurrent contexts to ~8–16 before evicting older ones.
- **Transition seams:** A single scene graph means chapter-to-chapter transitions are continuous interpolations within one render pass, with no context teardown/recreation gaps.
- **Duplicated resources:** Shared materials, fog configuration, environment maps, and the global camera exist once. Chapters reuse the shared rendering pipeline.
- **Lifecycle complexity:** One mount/unmount cycle instead of six competing Canvas lifecycles fighting for the same viewport space.
- **Camera discontinuity:** One persistent camera travels the continuous path. No per-chapter camera handoff or cross-fade stitching required.

The existing Home enhancement (`HomeCanvas`) is a small contained scene inside the hero panel. World Journey will replace it with a full-viewport canvas. The current `HomeCanvasBoundary` lazy-loading and error isolation patterns remain valid architectural templates.

---

## 2. DOM / Canvas Layering

### Ownership Boundary

| Layer | Owns | Does NOT Own |
|---|---|---|
| **DOM** | Semantic content, headings, chapter text, Links/Lab/Profile entry points, accessibility landmarks, skip link, navigation, document scroll height, normal document flow | World geometry, camera, lighting, environmental depth, ambient motion |
| **Three.js Canvas** | World geometry, environment, fog, camera position/rotation, lighting, ambient visual motion, biome atmosphere | Readable text, navigation, buttons, links, focus targets, scroll input, document layout |

### Layering Strategy

The Canvas is **not** the document. It is a visual viewport behind DOM content.

```
┌─ viewport ─────────────────────────────┐
│  ┌─ Canvas (position: fixed/sticky) ──┐│
│  │    Three.js world fills viewport    ││
│  └────────────────────────────────────┘│
│  ┌─ DOM layer (normal document flow) ─┐│
│  │    Chapter content sections         ││
│  │    Headings, links, cards           ││
│  │    Scroll height = journey length   ││
│  └────────────────────────────────────┘│
└────────────────────────────────────────┘
```

**Pattern:** Route-scoped sticky/fixed visual viewport.

- The Canvas mounts as a `position: sticky` or `position: fixed` element covering the viewport, with `pointer-events: none` to pass interaction through to DOM.
- DOM chapter sections establish the total scroll height and contain all semantic content.
- The Three.js world responds to document scroll progress — it does not control scroll.
- Canvas `z-index` is below interactive DOM content.
- `aria-hidden="true"` and `tabIndex={-1}` on the Canvas container, matching the existing `HomeCanvas` pattern.

The exact CSS positioning (`sticky` vs `fixed`) is a TASK-024 implementation detail. Both are compatible with this architecture.

---

## 3. Scroll Ownership

### Invariant

User input is **native vertical browser scrolling**. No scroll-jacking, wheel interception, custom horizontal user scroll, or competing scroll managers.

### Scroll Flow

```
Native document scroll
    ↓
GSAP ScrollTrigger (single orchestrator)
    ↓
normalized journey progress (ref-based)
    ↓
Three.js camera/world state (read each frame)
```

### Responsibilities

| System | Role |
|---|---|
| **Browser** | Owns scroll input, scroll position, momentum, accessibility scroll API |
| **GSAP ScrollTrigger** | Single scroll measurement system. Creates one master `ScrollTrigger.create()` spanning the journey DOM container. Derives `globalProgress` (0→1) from scroll position. Writes to ref, not React state |
| **Chapter progress** | Derived from `globalProgress` by mapping against chapter range configuration. Pure computation, no additional scroll listeners |
| **Three.js** | Reads progress refs each frame via `useFrame`. Never reads `window.scrollY` or attaches its own scroll listeners |

### Prohibited

- Lenis or any custom smooth-scroll library (not an existing approved dependency)
- Multiple independent `ScrollTrigger` instances competing for the same scroll region
- `overflow: hidden` on `<body>` or `<html>` to simulate scroll
- Horizontal scroll input from the user

---

## 4. Chapter Progress Model

### Normalized Progress

```
globalProgress: 0 → 1   (entire journey)
chapterProgress: 0 → 1  (within each chapter)
```

### Chapter Configuration

One compact configuration object defines all chapter ranges. Magic scroll percentages must not be scattered across components.

```typescript
// src/components/three/world-journey/config/chapters.ts

interface ChapterConfig {
  id: 'orbit' | 'atmosphere' | 'forest' | 'cave' | 'ocean' | 'abyss';
  order: number;
  /** Global progress range [start, end] where this chapter is active */
  range: [number, number];
  /** Optional overlap zone for cross-fade transitions */
  transition?: { in: number; out: number };
  /** Preload activation range — chapter begins preloading when
      globalProgress enters this range */
  preloadRange: [number, number];
}

const CHAPTERS: ChapterConfig[] = [
  {
    id: 'orbit',
    order: 0,
    range: [0.0, 0.15],
    transition: { in: 0, out: 0.02 },
    preloadRange: [0.0, 0.18],
  },
  {
    id: 'atmosphere',
    order: 1,
    range: [0.13, 0.28],
    transition: { in: 0.02, out: 0.02 },
    preloadRange: [0.10, 0.32],
  },
  // ... etc.
];
```

> **Note:** Exact range values are TBD — TASK-024 greybox will tune them. The structure and contract are what this architecture locks.

### Chapter Resolution

A pure function maps `globalProgress` to active chapter and local progress:

```typescript
function resolveChapter(globalProgress: number): {
  activeChapter: ChapterConfig;
  chapterProgress: number;
} { /* ... */ }
```

This function runs each frame in `useFrame`, not in React state updates.

---

## 5. Camera Architecture

### Ownership

One `PerspectiveCamera` exists for the entire World Journey. It is owned by the `WorldJourneyScene` component, **not** by individual chapters.

### Camera Path Model

The camera follows a **continuous spline path** through 3D space. Each chapter defines a segment of the spline via control points. The complete path is assembled at mount time from all chapter contributions.

```
Orbit ──── Atmosphere ──── Forest ──── Cave ──╮
                                               │ (horizontal turn)
                                    Ocean ←────╯
                                      │
                                    Abyss
```

**Preferred interpolation:** `THREE.CatmullRomCurve3` — provides smooth C1-continuous interpolation between control points without requiring manual tangent authoring.

### Position and LookAt Derivation

Each frame:
1. Read `globalProgress` from ref (no React re-render).
2. `camera.position` = `pathCurve.getPointAt(globalProgress)`.
3. `camera lookAt target` = secondary spline or offset function that provides smooth look direction.
4. No `camera.updateProjectionMatrix()` unless viewport resizes.

### Chapter-Local Tuning

Individual chapters may define:
- Additional control points within their progress range
- Look-at target adjustments (e.g., Cave looks down; Ocean looks forward)
- FOV shifts within their range (interpolated, not stepped)

But they do NOT:
- Replace the camera
- Create a separate camera
- Directly set camera position from their own logic

### Deterministic Scroll Mapping

`globalProgress` → camera position is a pure function. The same scroll position always produces the same camera state. No velocity-dependent drift, spring physics, or momentum-based camera lag on the primary path.

---

## 6. Cave → Ocean Signature Transition

### Requirement

The user continues scrolling **vertically**. During the Cave→Ocean progress range, the camera/world trajectory transitions from primarily **vertical descent** to **horizontal travel**.

### Technical Model

The transition is expressed entirely within the camera spline path. During the Cave→Ocean range:

```
Cave (vertical descent)
    ↓
    ↓  Cave exit zone: spline curves laterally
    ╰─────→ Ocean (horizontal travel)
                ↓
              Abyss (vertical descent resumes)
```

- The spline control points in this zone curve the path from -Y dominant direction to +X/-X dominant direction.
- `globalProgress` continues advancing linearly with vertical scroll.
- The mapping from vertical scroll distance to horizontal camera travel is authored in the spline geometry, not in a separate coordinate transform.

### Constraints

| Requirement | Implementation |
|---|---|
| Native vertical scroll untouched | Scroll remains native; only progress → camera mapping changes |
| No horizontal scrollbar | DOM content remains normal flow; horizontal motion is purely within the Canvas world |
| DOM content stable | Chapter DOM sections remain vertically stacked regardless of camera direction |
| Progress-driven | Transition is a deterministic function of `globalProgress`, no velocity or momentum |
| Reduced-motion simplification | Spline control points compress the horizontal distance to near-zero, making the transition a gentler shift or static cut |
| Mobile adaptation | Spline may use shorter horizontal travel distance on mobile to reduce perceived disorientation |

### TASK-024 Greybox

TASK-024 will author the specific control points. This architecture requires only that the spline path supports non-vertical segments — which `CatmullRomCurve3` inherently does.

---

## 7. Chapter Ownership

### File Structure

```
src/components/three/world-journey/
  canvas/                  ← WorldJourneyCanvas, boundary, fallback
  scene/                   ← WorldJourneyScene (orchestrator)
  chapters/
    orbit.tsx
    atmosphere.tsx
    forest.tsx
    cave.tsx
    ocean.tsx
    abyss.tsx
  systems/                 ← camera, lighting, fog, shared environment
  config/                  ← chapter definitions, camera path data, constants
```

> Exact file names may differ. Do NOT create these folders during TASK-023.

### Chapter Module Contract

Each chapter component (`<Orbit>`, `<Forest>`, etc.) may own:
- ✅ Local geometry (meshes, groups, instances)
- ✅ Local materials (may reference shared material factories)
- ✅ Local lighting additions (point lights, spot lights for mood)
- ✅ Local ambient animation (gentle sway, floating particles)

Each chapter must NOT own:
- ❌ Its own independent `<Canvas>`
- ❌ Its own global scroll listener
- ❌ Arbitrary global event listeners (`window.addEventListener`)
- ❌ Its own camera or camera manipulation
- ❌ Direct writes to `globalProgress`

### Chapter Interface

```typescript
interface ChapterProps {
  chapterProgress: number;  // 0 → 1 within this chapter
  globalProgress: number;   // 0 → 1 overall
  state: ChapterState;      // 'active' | 'nearby' | 'preloading' | 'inactive'
  reducedMotion: boolean;
}
```

---

## 8. Chapter Activation

### State Model

| State | Behavior |
|---|---|
| **inactive** | Geometry may remain mounted but invisible (`visible: false`). No animation ticks. Expensive procedural content (particle systems, animated shaders) is paused or unmounted |
| **preloading** | Assets begin loading. Geometry may start mounting. Not yet rendered |
| **nearby** | Geometry visible, basic lighting active, ready for seamless transition. Light ambient animation may run |
| **active** | Full rendering, full ambient animation, camera is within this chapter's range |

### Activation Strategy

- **Current chapter:** `active` — full rendering and animation.
- **Adjacent chapters (±1):** `nearby` — visible and warm for seamless transition.
- **Next-adjacent (±2):** `preloading` or `inactive` depending on asset weight.
- **Distant chapters (>±2):** `inactive`.

### Balance

Aggressive unloading causes visible pop-in during fast scrolling. The strategy prefers keeping `nearby` chapters warm over destroying/recreating them. Heavy per-chapter assets (dense particle systems, animated shader uniforms) should pause rather than unmount when transitioning from `active` to `nearby`.

Chapters are React components in the R3F tree. Activation state is passed as a prop; chapters internally decide what to simplify or pause based on their state.

---

## 9. Asset Loading Strategy

> TASK-025 defines the detailed asset pipeline. This section defines only architectural loading behavior.

### Loading Principles

| Principle | Rationale |
|---|---|
| **Route-level lazy loading** | `WorldJourneyCanvas` is dynamically imported only on the Home route. Other routes (`/links`, `/lab`, `/profile`) never load World Journey code or assets |
| **Chapter asset preloading** | When `globalProgress` enters a chapter's `preloadRange`, that chapter's heavy assets (models, textures) begin loading via `useLoader` / `Suspense` |
| **No global preload** | Initial Home page load does NOT preload all six chapters' heavy assets. Orbit loads first; others load progressively as the user scrolls |
| **Shared resources** | Common materials, fog configuration, and environment maps are loaded once at the scene level and shared across chapters |
| **DOM never blocked** | Asset loading happens asynchronously behind the Canvas. DOM chapter content is server-rendered and visible immediately regardless of Three.js loading state |

### Loading UX

While chapter assets load, the chapter may display simplified placeholder geometry (e.g., fog-shrouded silhouettes). The DOM content for that chapter is already visible.

---

## 10. Render Loop Strategy

### Baseline

The existing Home Canvas uses `frameloop="demand"` with manual invalidation. The World Journey requires a different balance because it has continuous ambient biome motion.

### Strategy: Hybrid Adaptive

| Condition | Render Behavior |
|---|---|
| **User actively scrolling** | Render every frame (progress is changing, camera is moving) |
| **Scroll settled, active biome has ambient motion** | Continue rendering at normal rate for ambient animation (flora sway, particles, water) |
| **Scroll settled, reduced-motion active** | Reduce to on-demand rendering; invalidate only on viewport resize or visibility change |
| **Page visibility hidden (tab inactive)** | Stop rendering entirely. Pause GSAP timelines |
| **Canvas outside viewport intersection** | Stop rendering. This applies if the user scrolls past the journey or if navigation moves to another route section |

### Implementation Direction

Start with `frameloop="always"` during greybox (TASK-024). Once biome ambient animation patterns are established, evaluate whether `frameloop="demand"` with strategic invalidation is practical. If most chapters have continuous ambient motion, `frameloop="always"` with visibility gating is the simpler correct choice.

### Visibility Gating

```typescript
// Pseudocode — not production implementation
useFrame((state) => {
  if (documentHidden || !canvasIntersecting) {
    return; // skip render
  }
  // ... update camera, chapters
});
```

The existing `IntersectionObserver` and `document.visibilitychange` patterns from `HomeCanvas` (TASK-020) should be reused.

---

## 11. State Management

### No New Global State Library

No Redux, Zustand, Jotai, or other global state system is introduced. The existing application has no global state library; the World Journey does not justify adding one.

### Shared State Contract

| Value | Type | Mechanism | Why |
|---|---|---|---|
| `globalProgress` | `number` (0→1) | `React.useRef` or external mutable store | Written by ScrollTrigger callback. Read by `useFrame` every frame. Must not trigger React re-renders |
| `activeChapterId` | `string` | `React.useRef` | Derived from `globalProgress`. Used by chapter activation logic. Infrequent changes only |
| `chapterProgress` | `number` (0→1) | Computed in `useFrame` | Derived from `globalProgress` + chapter config. Never stored as React state |
| `reducedMotion` | `boolean` | `useReducedMotion()` hook (existing) | Read by chapters to disable/simplify animation |
| `deviceTier` | `'desktop' \| 'tablet' \| 'mobile'` | `React.useMemo` from viewport/DPR at mount | Determines geometry density, DPR cap, asset resolution |

### Ref-Based Progress Pattern

```typescript
// Written by ScrollTrigger onUpdate callback (DOM layer)
progressRef.current = self.progress;

// Read by Three.js (Canvas layer)
useFrame(() => {
  const p = progressRef.current;
  camera.position.copy(pathCurve.getPointAt(p));
});
```

This avoids React state updates at 60fps.

---

## 12. GSAP / Three.js Responsibilities

### Strict Boundary

| System | Owns | Does NOT Own |
|---|---|---|
| **GSAP / ScrollTrigger** | DOM-triggered scroll progress measurement; chapter transition timing for DOM content choreography; DOM element entrance/exit animation | Three.js object transforms; camera position; material uniforms; scene graph manipulation |
| **Three.js / R3F** | Scene transforms; camera rendering state; biome geometry and materials; environment/lighting animation; material/fog interpolation | Scroll measurement; DOM layout; chapter text/heading animation; navigation state |

### Contract Between Layers

GSAP ScrollTrigger writes a single `globalProgress` value to a shared ref. Three.js reads that ref. That is the entire coupling surface.

GSAP does NOT:
- Call `camera.position.set()` or manipulate Three.js objects directly
- Use `gsap.to(mesh, { position: ... })` for scene objects
- Maintain its own parallel model of chapter state

Three.js does NOT:
- Attach scroll listeners
- Call `ScrollTrigger.create()`
- Animate DOM elements

---

## 13. Responsive Strategy

### Three Experience Tiers

| Tier | Viewport | DPR Cap | Characteristics |
|---|---|---|---|
| **Desktop** | ≥1024px | `min(devicePixelRatio, 2)` | Full geometry detail, full ambient animation, full horizontal Cave→Ocean travel |
| **Tablet** | 768–1023px | `min(devicePixelRatio, 1.5)` | Moderate geometry reduction, slightly reduced particle counts, full journey |
| **Mobile** | <768px | `min(devicePixelRatio, 1.5)` | Reduced geometry density, simplified ambient animation, shorter Cave→Ocean horizontal distance, possible LOD reduction |

### Invariants Across Tiers

- Chapter **order** is the same on all tiers
- Chapter **semantic DOM content** is the same on all tiers
- The journey is always **one continuous vertical scroll**
- Native scroll behavior is preserved

### Tier-Specific Adaptation

Chapters receive `deviceTier` and may internally:
- Adjust camera FOV for mobile framing
- Reduce instanced geometry counts (fewer trees, fewer fish)
- Simplify or omit secondary ambient animation
- Use lower-resolution textures
- Reduce postprocessing (if any is added in TASK-034)

No separate route or component tree for mobile. One component tree adapts via tier-aware logic.

---

## 14. Reduced Motion

### Architecture

When `prefers-reduced-motion: reduce` is active (detected via the existing `useReducedMotion()` hook):

**Keep:**
- All chapter content and DOM structure
- Visual identity (colors, biome recognition, lighting mood)
- Normal navigation and interaction
- World continuity — the journey still has spatial depth

**Reduce:**
- Long camera travel → compress spline path or use discrete chapter viewpoints
- Parallax layers → static depth planes
- Continuous ambient motion (sway, drift, particles) → paused or static
- Cave → Ocean horizontal transition → much shorter spatial interpolation or a simple cross-fade

**Implementation:**
- `reducedMotion` is passed to every chapter component
- Camera path may use a simplified spline with fewer/closer control points
- `useFrame` callbacks check `reducedMotion` and skip animation updates
- Ambient shader uniforms (time-based) are frozen
- Real GPU work is reduced, not just visual output suppressed

---

## 15. Non-WebGL Fallback

### Contract

If WebGL is unavailable or fails at runtime, the DOM journey must form a **complete Home experience**.

### Fallback Architecture

```
Home (/)
├── DOM chapter sections (always rendered, server-side)
│   ├── Chapter 1: Orbit — heading, intro content
│   ├── Chapter 2: Atmosphere — bridge content
│   ├── Chapter 3: Forest — Links entry points
│   ├── Chapter 4: Cave — Lab entry points
│   ├── Chapter 5: Ocean — expansion content
│   └── Chapter 6: Abyss — closing content
└── [Canvas: not mounted / error boundary caught]
    └── Fallback: CSS gradient/static atmospheric backgrounds per chapter
```

### Fallback Visual Treatment

Without WebGL, each chapter section may use:
- CSS background gradients matching the chapter's palette direction
- Subtle CSS-based atmospheric overlays
- Static imagery (added in later tasks, not TASK-023)

### Error Isolation

Reuse the established `CanvasErrorBoundary` + `checkWebGLSupport()` pattern from `HomeCanvasBoundary`. The World Journey boundary:
1. Probes WebGL2 support before dynamic import
2. Wraps `<Canvas>` in a class-based error boundary
3. Listens for `webglcontextlost` to degrade gracefully at runtime
4. Never allows a Three.js failure to crash the root layout, navigation, or DOM content

---

## 16. Performance Budget

> TASK-025 will convert these into concrete asset budgets with specific polygon/texture numbers.

### Architectural Performance Rules

| Category | Budget / Rule |
|---|---|
| **DPR** | Bounded per tier: desktop ≤ 2, tablet/mobile ≤ 1.5. Never use raw `devicePixelRatio` uncapped |
| **Active biomes** | At most 2–3 chapters fully active at any time (current + nearby). Distant chapters reduce to minimal cost |
| **Texture resolution** | Use the minimum resolution that reads well at screen distance. Stylized art direction favors lower-res textures with authored detail over 4K photo scans |
| **Draw calls** | Minimize per chapter. Use instancing for repeated elements (trees, crystals, fish). Merge static geometry where possible |
| **Geometry reuse** | Repeated natural elements (vegetation, rocks, coral) use instanced meshes with transform variation, not unique geometries |
| **Object instancing** | Large populations (forest trees, fish schools, crystal clusters) must use `THREE.InstancedMesh` |
| **LOD / silhouettes** | Distant objects use simplified silhouette geometry or fog-based fade rather than unique high-detail meshes |
| **Shader / postprocessing** | Optional and must be justified. No postprocessing by default. Bloom, DOF, or color grading added only in TASK-034 with demonstrated visual payoff and measured performance impact |
| **Initial bundle** | World Journey code and assets load lazily on Home route only. Zero World Journey code in `/links`, `/lab`, `/profile` bundles |
| **Preload** | Only Orbit chapter assets preload on initial Home visit. Subsequent chapters load progressively as the user scrolls toward them |

---

## 17. Visibility / Suspension

### Behavior Matrix

| Condition | Action |
|---|---|
| **Home route is left** (navigation to `/links`, `/lab`, `/profile`) | Canvas unmounts. All Three.js resources, ScrollTrigger instances, and animation loops are disposed. Reuses the existing route-scoped cleanup pattern |
| **Browser tab becomes hidden** (`document.visibilitychange`) | Pause render loop. Pause GSAP timelines. Resume on visibility restoration |
| **Canvas outside viewport intersection** | Stop rendering (skip `useFrame` work). Resume when intersecting |
| **Reduced motion active** | Reduce render frequency. Pause ambient animation. Camera may still update on scroll but with simplified path |

### Reuse Existing Patterns

The TASK-020 improvements to `HomeCanvas` (visibility-aware rendering, context loss handling) established the project's approach to render suspension. World Journey follows the same patterns at a larger scale.

---

## 18. Error Isolation

### World Journey Error Boundary

A World Journey-specific error boundary wraps the Canvas. Architecture mirrors the existing `CanvasErrorBoundary` in `HomeCanvasBoundary`:

```
<WorldJourneyBoundary>
  <WorldJourneyCanvas />      ← dynamic import, WebGL check
  fallback={<JourneyFallback />}  ← CSS atmospheric backgrounds
</WorldJourneyBoundary>
```

### Isolation Guarantee

A world rendering failure must NOT crash:
- ❌ Root layout (`<html>`, `<body>`)
- ❌ `SiteShell` (header, main, footer)
- ❌ `PrimaryNavigation`
- ❌ DOM chapter content sections

The enhancement-isolation philosophy already validated across TASK-009, TASK-016, and TASK-020 applies directly.

---

## 19. Debug / Greybox Support

### TASK-024 Debug Capabilities

During greybox development, the following debug aids should be available:

| Capability | Purpose | Implementation Direction |
|---|---|---|
| **Progress HUD** | Show current `globalProgress`, `activeChapter`, `chapterProgress` | Small `<Html>` overlay from Drei, or a DOM `position:fixed` overlay. Development-only |
| **Camera path visualization** | Render the spline as a visible `Line` in the scene | `THREE.Line` from `CatmullRomCurve3.getPoints()`. Dev-only |
| **Chapter bounds markers** | Visual planes or wireframes marking chapter start/end positions in world space | Simple `BoxHelper` or colored planes at chapter transition points |
| **ScrollTrigger markers** | Standard GSAP `markers: true` on the master ScrollTrigger | `markers: process.env.NODE_ENV === 'development'` |

### Constraints

- Development-only, never shipped to production
- No external debug GUI dependencies (no lil-gui, leva, dat.GUI)
- Easy to enable/disable via environment flag or dev-only component
- Must not alter scroll behavior, camera path, or chapter timing

---

## 20. TASK-024 Handoff

### Greybox Requirements

TASK-024 must create, using **only simple geometry** (boxes, spheres, planes, cylinders), the following:

| Volume | Geometry | Purpose |
|---|---|---|
| **Orbit** | Large sphere or dome + small cube markers | Validate opening scale and camera entry |
| **Atmosphere** | Layered planes or transparent shells | Validate descent feel and transition from Orbit |
| **Forest** | Tall box columns on a ground plane | Validate canopy scale, camera at ground level |
| **Cave** | Enclosed box/cylinder volumes, some smaller cubes for crystals | Validate enclosed feeling, lighting contrast |
| **Cave → Ocean path** | Connected volume with visible horizontal spline segment | Validate the signature horizontal transition |
| **Ocean** | Open volume, some floating sphere/box markers for life | Validate horizontal travel and depth |
| **Abyss** | Deep box volume, sparse small markers | Validate final descent and resting state |

### Greybox Must Validate

- [ ] Scroll feel: native scrolling drives the entire journey smoothly
- [ ] Chapter spacing: each chapter occupies a comfortable scroll distance
- [ ] Camera continuity: no jumps, seams, or discontinuities between chapters
- [ ] Horizontal transition: Cave → Ocean direction change feels natural
- [ ] Responsive behavior: journey works on desktop, tablet, mobile viewports
- [ ] Reduced-motion behavior: simplified path or static viewpoints
- [ ] Chapter lifecycle: nearby chapters are warm, distant chapters reduce cost
- [ ] Error isolation: Three.js failure shows fallback, DOM remains functional

### What Greybox Must NOT Do

- ❌ Use production models, textures, or shaders
- ❌ Implement final lighting or materials
- ❌ Add postprocessing
- ❌ Add new dependencies
- ❌ Modify the architecture decisions below

---

## Architecture Decisions

| ID | Decision | Rationale |
|---|---|---|
| **WJA-001** | World Journey uses one route-scoped R3F Canvas for all six chapters | Eliminates context proliferation, transition seams, resource duplication, and camera discontinuity. Greybox may challenge this if a blocking limitation is discovered |
| **WJA-002** | Native vertical document scroll is the sole user scroll input | Preserves browser accessibility, momentum scrolling, and avoids scroll-jacking. Per WJ-003 |
| **WJA-003** | A single GSAP ScrollTrigger instance exposes normalized `globalProgress` (0→1) to the Three.js world via refs | One scroll measurement system, one progress contract, no competing scroll observers |
| **WJA-004** | One continuous camera follows a CatmullRomCurve3 spline through all six chapters | Provides smooth C1-continuous path, deterministic scroll mapping, chapter-local tuning via control points, no per-chapter camera handoff |
| **WJA-005** | Cave → Ocean horizontal camera movement is authored as a lateral curve segment in the camera spline, driven entirely by vertical scroll progress | No horizontal scrollbar, no user horizontal input, no coordinate system switch — just spline geometry |
| **WJA-006** | Chapters are isolated scene modules (React components in the R3F tree) sharing a single Canvas, camera, and render pipeline | Each chapter owns local geometry/materials/lighting but not its own Canvas, scroll system, or camera |
| **WJA-007** | Heavy chapter assets load progressively based on proximity to the active scroll position, not all at initial Home load | Orbit loads first; subsequent chapters preload as the user approaches. DOM content is never blocked |
| **WJA-008** | DOM chapter content is independent from WebGL and fully functional without it | Server-rendered DOM sections form a complete Home experience. CSS fallback backgrounds replace the Canvas when WebGL is unavailable |
| **WJA-009** | Mobile reduces visual complexity (geometry density, DPR, animation, horizontal travel distance) but preserves journey structure and content | One component tree with tier-aware adaptation, not a separate mobile implementation |
| **WJA-010** | Reduced motion reduces actual rendering and computation work, not only visible effects | Camera path simplifies, ambient animation pauses, shader time uniforms freeze, render frequency may decrease |
| **WJA-011** | Greybox (TASK-024) validates camera/scroll architecture with simple geometry before production asset work begins | Prevents expensive asset rework by proving the spatial and temporal architecture first |
| **WJA-012** | No new global state library is introduced without demonstrated cross-feature need | Ref-based progress sharing and the existing `useReducedMotion` hook are sufficient for World Journey state |

---

## TBD — Deferred to Later Tasks

The following remain intentionally unresolved:

- Exact camera coordinates and spline control points (TASK-024 greybox)
- Exact chapter scroll distances/lengths (TASK-024 greybox)
- Exact asset formats, model counts, polygon budgets (TASK-025)
- Exact texture resolutions and compression (TASK-025)
- Final water/ocean technique (TASK-031 / TASK-034)
- Final cloud/atmosphere technique (TASK-027 / TASK-034)
- Final crystal material and emissive shaders (TASK-029 / TASK-034)
- Final LOD thresholds and distance values (TASK-025)
- Final postprocessing stack (TASK-034)
- DOM content mapping to chapters (TASK-033)
