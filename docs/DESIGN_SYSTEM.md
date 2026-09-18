# Design System

## Document Contract

- **Purpose:** Define visual system rules, design token architecture, interaction states, and UI/motion/WebGL boundaries for Messy Hub.
- **Status:** Foundational design-system specification; aesthetic direction and concrete token values remain in exploration (TBD).
- **Source of truth:** `docs/PRD.md` for product and UX requirements; `docs/ARCHITECTURE.md` for technical boundaries.
- **Read this when:** Designing UI, establishing design tokens, coordinating motion, defining WebGL visual boundaries, or styling routes.
- **Do not read this for:** Product scope/IA (see `docs/PRD.md`), technical architecture/implementation (see `docs/ARCHITECTURE.md`), or unapproved brand assets (TBD).

## 1. Design Goals

- **Personal Digital Hub Identity:** Distinctive, authored personal web presence avoiding generic SaaS or portfolio templates.
- **Exploration with Clear Orientation:** Intuitive navigation, visible hierarchy, and clear return paths across diverse destinations.
- **Purposeful Expressiveness:** Visual depth, responsiveness, and motion serve hierarchy, state, and feedback rather than mere decoration.
- **Systemic Coherence:** Visual variance between routes anchored by a shared interaction model and design token structure.
- **Progressive Visual Resilience:** Baseline DOM experience is complete, polished, and accessible before layering optional motion or 3D effects.

## 2. Visual Direction Status

### APPROVED
- Personal digital hub concept (distinct from portfolio/resume sites).
- DOM-first semantic foundation: DOM carries all critical content, links, navigation, and controls.
- Progressive enhancement: motion and WebGL are optional client-side layers.
- Core route roles: `/` (entrance/identity), `/links` (directory), `/lab` (creative playground), `/profile` (calm content).
- Universal interaction parity and reduced-motion adaptation without information loss.
- Scope boundaries: `/hometown` and AI/RAG are excluded from current visual identity decisions.

### TBD
- Primary visual theme and aesthetic direction (surfaces, textures, styling paradigm).
- Concrete color palette (neutrals, semantics, light/dark themes, accent scales).
- Typography font families (display, heading, body, monospace).
- Brand marks, logo, mascot concept, and decorative icon styling.
- Specific 3D hero artifact, scene theme, lighting model, and shaders.
- Concrete token values (radii, elevation formulas, spacing units, motion timings/easings).

## 3. Design Principles

- **Hierarchy First:** Visual prominence reflects content priority; essential navigation and controls command immediate clarity before atmospheric effects.
- **Clarity Over Novelty:** Visual effects clarify affordances and state; never sacrifice legibility, contrast, or navigation predictability for visual spectacle.
- **Systemic Consistency:** Interaction states, layout rhythms, focus indicators, and navigation conventions remain uniform across all routes.
- **Bounded Experimentation:** High visual and technical freedom is isolated to dedicated contexts (`/lab`) without degrading global shell reliability.
- **Deliberate Restraint:** Limit simultaneous animated elements and visual layers to prevent cognitive fatigue.
- **Progressive Enhancement:** Visual polish is designed from the baseline DOM upwards. A page stripped of WebGL and motion must remain complete and intentional.

## 4. Design Token Model

The token architecture uses a three-tier model: **Primitive → Semantic → Component**. Concrete values remain TBD pending visual exploration.

### Naming Conventions & Categories
Tokens follow hierarchical dot-notation (`category.role.variant` or `component.element.property.state`):

- **Color (`color.*`):** Scoped by semantic role rather than hue.
  - `color.background.*` (primary, secondary, tertiary surfaces)
  - `color.surface.*` (base, raised, overlay)
  - `color.text.*` (primary, secondary, muted, inverse)
  - `color.border.*` (subtle, default, strong, focus)
  - `color.accent.*` (primary, secondary, muted)
  - `color.status.*` (info, success, warning, error)
  - `color.interactive.*` (hover, active, disabled)
- **Typography (`font.*`):** Role-based scales for hierarchy and readability.
  - `font.family.*` (heading, body, code)
  - `font.size.*`, `font.weight.*`, `font.lineHeight.*`, `font.letterSpacing.*`
- **Spacing & Sizing (`spacing.*`, `size.*`):** Consistent baseline scale for margins, padding, layout gaps, touch targets, and control dimensions.
- **Shape & Elevation (`radius.*`, `elevation.*`, `border.width.*`, `opacity.*`):** Defines surface curvature, depth, boundaries, and visual attenuation.
- **Layering (`z.*`):** Semantic stacking roles; navigation, overlays, and system UI remain reliably layered, while canvas depth adapts to the route and experience:
  - `z.base` (default document flow)
  - `z.canvas.back` (background or atmospheric 3D layers beneath DOM content)
  - `z.content` (standard interactive DOM UI and structure)
  - `z.canvas.front` (foregrounded, framed, or directly interactive 3D scenes, e.g., `/lab`)
  - `z.navigation` (persistent global navigation shell)
  - `z.overlay` (menus, dialogs, popovers)
  - `z.system` (skip link, focus indicators, system alerts)
- **Motion (`motion.*`):** Standardized motion tokens:
  - `motion.duration.*` (fast, normal, slow)
  - `motion.easing.*` (standard, entrance, exit)

## 5. Typography System

- **Role Hierarchy:**
  - `Display / Hero`: Primary entrance tone and focal impact on `/`; used selectively.
  - `Heading (H1–H4)`: Strictly sequential semantic structure for titles, sections, and cards.
  - `Body (Standard, Large, Small)`: Primary readable content, summaries, and descriptions.
  - `Label / Functional`: Button text, navigation labels, status badges, and micro-copy.
  - `Code / Monospace`: Code snippets, technical experiment metadata, and route paths.
- **Readability & Accessibility:**
  - Text sizing must use scalable, accessible typography that respects user and platform font-size preferences.
  - Line lengths and line heights must maintain comfortable reading proportions across viewport widths.
  - Contrast ratios must satisfy WCAG 2.2 AA standards as defined in `docs/PRD.md`.
- **Responsive Behavior:**
  - Typography scales smoothly across viewports without horizontal overflow or awkward line wraps.
  - Body text preserves legible baseline size across all screen classes.
- **Font Families:** TBD.

## 6. Layout & Responsive System

- **Layout Philosophy:** Mobile-first structural foundation progressively enhanced for larger displays (see `docs/PRD.md`).
- **Container Behavior:** Structured content uses bounded max-widths to prevent unconstrained line lengths on wide viewports.
- **Grids & Rhythms:** Responsive grids for collections (`/links`, `/lab`) that collapse smoothly from multi-column desktop layouts to single-column mobile views.
- **Spacing Consistency:** Layout padding, section margins, and component gaps derive strictly from the shared spacing token scale.
- **Input Parity:**
  - Interactive targets must accommodate comfortable touch operation on touch-enabled viewports (see `docs/PRD.md`).
  - Information or controls revealed via pointer hover must be accessible via tap or focus on touch devices.

## 7. Component Interaction States

Interactive elements must support a complete, accessible state set across pointer, keyboard, and touch:

- **Default:** Baseline resting appearance communicating clear interactivity.
- **Hover:** Pointer feedback; must not be the sole mechanism to reveal essential information.
- **Focus-Visible:** High-contrast outline or ring indicator active during keyboard navigation; never suppressed without accessible replacement.
- **Active / Pressed:** Tactile visual response confirming activation upon press or click.
- **Disabled:** Visually attenuated via defined opacity and muted tokens; non-interactive with semantic disabled attributes preserved.
- **Loading:** Non-interactive busy state; maintains element layout footprint to prevent layout shifts.
- **Selected / Active Route:** Visual distinction for current destinations or active toggles; not reliant on color alone.
- **Input Parity:** Keyboard and touch paths must provide equivalent state feedback and capabilities to pointer hover.

## 8. Motion Language

- **Purpose of Motion:** Motion communicates hierarchy, spatial continuity, focus, state change, and feedback. It must never exist as arbitrary ornament or impede user tasks.
- **Entrance & Reveal:** Subtle choreographed reveals that direct attention to primary landmarks. Essential content remains immediately accessible.
- **Interaction Feedback:** Fast micro-interactions (transform and opacity) delivering immediate feedback with zero perceptible latency.
- **Navigation Transitions:** Smooth transitions between routes that preserve spatial orientation without locking input or delaying navigation.
- **Scroll-Linked Motion:** Native-scroll observation; lightweight and subtle; never conceals or traps essential content.
- **Cursor-Responsive Behavior:** Optional pointer-responsive spatial effects for desktop; must cleanly bypass on touch or keyboard.
- **Reduced Motion:** Strict respect for `prefers-reduced-motion`; motion is replaced with instantaneous state changes or subtle crossfades without loss of information or navigation clarity (see `docs/PRD.md`).
- **Durations & Easings:** TBD.

## 9. Three.js / WebGL Visual Integration

- **Boundaries & Invariants:**
  - Semantic content, navigation, and critical actions must remain accessible in the DOM outside WebGL.
  - WebGL must never be the sole inaccessible representation of essential site functionality.
  - DOM and WebGL layering may vary by experience: WebGL can serve as an atmospheric background, a framed canvas element, or a visually foregrounded/interactive scene (e.g., in `/lab`).
- **Interaction Consistency:** Canvas scenes must not trap keyboard focus or hijack native scrolling (see `docs/PRD.md`, `docs/ARCHITECTURE.md`).
- **Visual Harmony:** 3D elements, shaders, and lighting must harmonize with DOM typography and surfaces rather than overwhelming them.
- **Fallback & Degraded Modes:** When WebGL is unsupported, slow, or disabled, render an intentional static visual fallback; scene motion ceases under reduced-motion preferences (see `docs/ARCHITECTURE.md`).
- **Route Confinement:** Canvas instances and 3D assets are route-scoped and disposed upon unmount (see `docs/ARCHITECTURE.md`).

## 10. Route Design Roles

- **`/` — Home:**
  - *Visual Role:* Main entrance and primary identity anchor.
  - *Tone:* Strongest identity and visual depth; selective motion or atmospheric WebGL; immediate orientation and clear pathing to hub destinations.
- **`/links` — Connected Websites:**
  - *Visual Role:* Content-first visual directory of the owner's web presence.
  - *Tone:* High visual clarity, structured scannability, rich preview cards, and explicit visual distinction between internal routes and external destinations.
- **`/lab` — Experimental Playground:**
  - *Visual Role:* Creative sandbox for visual, motion, WebGL, and frontend experiments.
  - *Tone:* Highest experimentation freedom; individual experiments may adopt distinct visual treatments while adhering to shared navigation conventions.
- **`/profile` — Personal Profile:**
  - *Visual Role:* Authoritative personal context and background.
  - *Tone:* Calmer, grounded, content-centric, and intentionally restrained in motion. Subordinate to the broader hub identity.

## 11. Iconography & Media Principles

- **Icon Consistency:** Harmonious optical weight, stroke, and geometry across the hub. Style family: TBD.
- **Semantic vs. Decorative Media:**
  - Semantic media require descriptive text alternatives and preserved aspect ratios.
  - Decorative icons and background visuals must be hidden from assistive technology (`aria-hidden="true"`).
- **Media Containers:** Dimensions must be reserved before load to prevent layout shifts.
- **3D & Mascot Assets:** 3D assets are scoped to scene containers with fallback states. Mascot concept and assets remain TBD.

## 12. Accessibility & Reduced Effects

*(Specific visual-system rules complementing WCAG 2.2 AA requirements in `docs/PRD.md` Section 14)*

- **Color Independence:** Color is never the sole conveyer of information, status, or interactive state.
- **Contrast Integrity:** Text against any surface or WebGL canvas must satisfy contrast requirements (see `docs/PRD.md`).
- **Focus Rings:** Focus indicators must maintain at least 3:1 contrast against adjacent backgrounds; never obscured by sticky or floating UI.
- **Reduced Effects State:** Complex blend modes, heavy blur filters, and continuous animations simplify gracefully under reduced-motion or resource-constrained contexts.

## 13. Design Decisions

| ID | Decision | Reason |
|---|---|---|
| DS-001 | Semantic DOM is the foundation for all readable content, controls, and navigation. | Preserves accessibility, SEO, keyboard navigation, and baseline resilience (`docs/PRD.md`, `docs/ARCHITECTURE.md`). |
| DS-002 | Three-tier token architecture (Primitive → Semantic → Component) with values held at TBD. | Establishes tokenized design contracts while allowing visual exploration without premature styling commitments. |
| DS-003 | Three.js/WebGL layering is flexible, but must not replace accessible DOM semantics or controls. | Enables foregrounded or interactive 3D (e.g., `/lab`) while preserving accessibility and site navigation (`docs/ARCHITECTURE.md`). |
| DS-004 | Native scrolling is preserved; no custom scroll-jacking. | Preserves predictable platform ergonomics and accessibility (`docs/PRD.md`). |
| DS-005 | High-contrast `focus-visible` indicators are mandatory across all interactive elements. | Guarantees compliance with WCAG 2.2 AA keyboard accessibility requirements (`docs/PRD.md`). |
| DS-006 | Motion must strictly respect `prefers-reduced-motion` without loss of information or state. | Protects users with vestibular sensitivities (`docs/PRD.md`). |
| DS-007 | Distinct visual roles established for `/`, `/links`, `/lab`, and `/profile`. | Balances identity and experimentation with predictable orientation (`docs/PRD.md`). |
| DS-008 | External destinations must be visually distinguished from internal hub routes. | Prevents navigational disorientation when leaving the hub (`docs/PRD.md` FR-10). |

## 14. TBD / Design Exploration

The following visual choices require dedicated design exploration and remain intentionally uncommitted:

- **Primary Visual Direction:** Final aesthetic paradigm, surface styling, and atmosphere.
- **Color System:** Concrete primitives, semantic mappings, light/dark themes, and accent palette.
- **Typography:** Exact font family selections for display, heading, body, and monospace roles.
- **Icon Language:** Chosen icon set, line weights, and corner radiuses.
- **Home (`/`) Visual Concept:** Specific hero composition and 3D visual role.
- **Three.js Visual Execution:** Scene themes, geometry style, lighting, and shader usage.
- **Mascot Usage:** Decision on whether a mascot exists, its visual design, and its product role.
- **Motion Personality:** Concrete animation durations, easing curves, and micro-interaction timing.
