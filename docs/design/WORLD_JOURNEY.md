# World Journey

## Document Contract

- **Purpose:** Define the authoritative visual concept, art direction, chapter progression, and visual invariants for the Messy Hub World Journey.
- **Status:** Core visual direction is **APPROVED**; implementation-level details, shaders, and asset models remain **TBD**.
- **Source of truth:** Art direction and thematic progression for World Journey. Complements `docs/PRD.md` (scope/roles) and `docs/DESIGN_SYSTEM.md` (system baseline).
- **Read this when:** Designing, budgeting, modeling, shading, or choreographing any World Journey scene or biome chapter.
- **Do not read this for:** Low-level technical architecture (see `docs/ARCHITECTURE.md` and upcoming TASK-023), design system tokens (see `docs/DESIGN_SYSTEM.md`), or production Three.js code.

---

## 1. Core Concept

**Approved Concept:** **Stylized Cinematic Nature**

The Home experience (`/`) unfolds as one continuous, unbroken descent through the distinct spatial layers of a unified world:

```
Orbit
  ↓
Atmosphere
  ↓
Primeval Forest
  ↓
Crystal Cave
  ↘
   → Living Ocean
       ↓
     Abyss
```

### Visual Experience Tone
- **Cinematic & Immense:** Sweeping vistas, grand scale, deliberate camera presence.
- **Atmospheric & Immersive:** Environmental density created by fog, light rays, and air/water particulates rather than clutter.
- **Natural with Subtle Wonder:** Grounded in organic natural biomes, elevated by gentle fantastical elements (luminous crystals, deep abyssal glows).
- **Visually Coherent:** Distinct biomes seamlessly belonging to the same continuous planetary environment.

### Negative Guardrails (Must NOT Become)
- NOT photorealistic (avoids uncanny valley, high asset weights, and GPU strain).
- NOT cartoon / low-poly flat-shaded toy style.
- NOT cyberpunk or neon sci-fi HUD aesthetic.
- NOT a generic high-fantasy RPG game environment.
- NOT a full-screen video game taking over desktop input.
- NOT a generic portfolio or developer landing page template.

---

## 2. Style Principles

1. **Stylized over photorealistic:** Cohesive authored art style with simplified forms, expressive lighting, and curated materials.
2. **Atmosphere over raw detail:** Prioritize volumetric fog, light falloff, and color mood over microscopic surface textures.
3. **Scale over object density:** Communicate vastness through a few monumental silhouettes rather than thousands of scattered objects.
4. **Lighting over texture complexity:** Let strong key lights, rims, and emissive accents define form and depth.
5. **Silhouette over hyper-detailed geometry:** Readability of major forms at distance takes precedence over high vertex counts.
6. **Depth over decoration:** Compose clear foreground, midground, and background planes to create spatial dimension.
7. **Restrained, natural motion:** Ambient movement feels slow, weighted, and organic; no rapid erratic animations.
8. **Unified world identity:** Each biome has an unmistakable mood while adhering to a shared color logic, lighting discipline, and material philosophy.
9. **Three.js owns the world, DOM owns the content:** Spatial environment lives in WebGL; semantic content, navigation, and critical interactions remain in DOM.
10. **Resilient baseline:** Essential site navigation and content remain completely usable, accessible, and structured without WebGL.

---

## 3. World Chapters

### 01 — Orbit
- **Mood:** Immense, silent, dark, distant.
- **Visual Direction:** Outer space overlooking Earth as the dominant large-scale curved body; faint star depth; subtle atmospheric rim glow; restrained orbital elements.
- **Primary Palette Direction:** Black, deep navy, atmospheric blue rim.
- **Role:** Entrance / Hub identity / Messy Hub introduction.
- **Transition:** Camera/world moves closer to Earth and initiates descent into the upper atmospheric veil.

### 02 — Atmosphere
- **Mood:** Airy, brightening, transitional, expansive.
- **Visual Direction:** Layered cloud depth, soft sun illumination, transitional gradient from deep space blue to bright sky and clouds; palpable sensation of dropping through altitude.
- **Primary Palette Direction:** Cyan, sky blue, pure white, soft warm sunlight.
- **Role:** Bridge between cosmic scale and the terrestrial realm.
- **Transition:** Soft descent emerging gradually through cloud cover into the canopy and landscape without hard scene cuts.

### 03 — Primeval Forest
- **Mood:** Lush, alive, peaceful, ancient.
- **Visual Direction:** Ancient primeval forest floor and canopy; majestic tree silhouettes, weathered rocks, mossy patches, rolling ground mist, tranquil water reflections, shafts of sunlight filtering through branches. Suggests exploration and branching paths.
- **Primary Palette Direction:** Emerald, moss green, deep forest green, restrained warm sunlight accents.
- **Role:** Links / Destinations chapter.
- **Transition:** Ground level leads toward a secluded descending fissure/rock opening into subterranean chambers.

### 04 — Crystal Cave
- **Mood:** Hidden, mysterious, luminous, intimate.
- **Visual Direction:** Subterranean cavern; dark rock formations, damp stone textures, green moss fringes, glowing crystal clusters providing localized emission, delicate airborne moisture/fog, quiet pools of light.
- **Primary Palette Direction:** Near-black stone, moss green, cyan / turquoise crystal emission.
- **Role:** Lab / Experiments chapter.
- **Transition:** Cave passages open outward laterally toward an expansive underwater boundary.

### 05 — Living Ocean
- **Mood:** Vast, fluid, alive, exploratory.
- **Visual Direction:** Transition out from cave into the open ocean; submerged rock formations, undulating marine flora, drifting fish schools, distant large marine life (e.g., distant whale silhouettes establishing majestic scale).
- **Primary Palette Direction:** Teal, cobalt, aqua, deepening into darker blues.
- **Role:** Exploration / Expansion chapter.
- **Signature Transition:** The user continues scrolling **vertically**, while the camera/world choreography turns **horizontally** from the Cave into the vast open Ocean. Does not require manual horizontal input.

### 06 — Abyss
- **Mood:** Dark, quiet, immense, mysterious, final.
- **Visual Direction:** Deep ocean floor and boundless depths; near-total darkness, sparse geometric forms, faint floating marine snow/particles, rare bioluminescent accents, distant silhouettes only when functionally meaningful.
- **Primary Palette Direction:** Black, very deep navy, sparse bioluminescent cyan/blue.
- **Role:** Final chapter / Conclusion of Home journey.
- **Transition / End State:** Settles into a calm, stable, resting composition rather than an endless loop of frantic motion.

---

## 4. Color Journey

The macro palette evolves continuously along the descent rather than resetting with abrupt cuts:

```
Orbit
[ Black / Deep Navy / Atmospheric Blue ]
               ↓
Atmosphere
[ Cyan / Sky Blue / White / Soft Sunlight ]
               ↓
Primeval Forest
[ Emerald / Moss Green / Deep Forest Green / Restrained Sunlight ]
               ↓
Crystal Cave
[ Near-black Stone / Moss Green / Cyan-Turquoise Crystal Light ]
               → (Horizontal World Shift)
Living Ocean
[ Teal / Cobalt / Aqua / Deepening Blues ]
               ↓
Abyss
[ Deepest Navy / Black / Sparse Bioluminescent Cyan ]
```

*Note: Final production hex codes and color tokens will be calibrated during technical and asset pipeline phases; this progression defines relative hue, luminance, and mood transitions.*

---

## 5. Scale & Composition

Scale is communicated through cinematic spatial techniques rather than polygon or object counts:

- **Large Silhouettes:** Singular monumental subjects (the curve of Earth, towering ancient trunks, massive sea forms).
- **Three-Plane Depth:** Distinct separation between foreground framing, midground focal action, and vast background atmospheric silhouettes.
- **Environmental Fog & Aerial Perspective:** Distant objects fade smoothly into ambient biome color.
- **Camera Framing & Perspective:** Low or elevated focal angles accentuating verticality and depth.
- **Restrained Motion:** Grand entities drift slowly, emphasizing mass and scale.

| Approach | Recommended (Good) | Forbidden (Bad) |
|---|---|---|
| **Space** | One dominant Earth curve, deep star field | Dense artificial satellite clutter |
| **Forest** | A few monumental trees, soft canopy rays, depth fog | Dense realistic forest simulation with millions of leaves |
| **Cave** | Dramatic rock silhouettes, selective luminous crystal clusters | Overdecorated fantasy RPG dungeon props |
| **Ocean** | Distant whale silhouette, rhythmic fish flock, light shafts | Massive polygon-heavy coral reef simulation |
| **Abyss** | Vast empty dark space, faint floating dust, rare glow | Cluttered alien landscape |

---

## 6. Motion Language

- **Character:** Slow, weighted, organic, continuous, cinematic.
- **Encouraged Behaviors:** Gentle camera gliding, subtle floating particles, slow flora sway, gentle parallax between layers, responsive low-frequency cursor parallax.
- **Discouraged Behaviors:** Spring/bounce physics, snappy twitch-game cameras, abrupt cuts, disorienting 360-degree spins, hyperactive autonomous animations.
- **Input Philosophy:** User scrolling gently steers camera progression through the world. The world responds smoothly; user input is never hijacked.

---

## 7. Scroll Journey

- **Standard Document Flow:** The user navigates using normal, native vertical document scrolling.
- **Continuous World Choreography:** Scroll progress maps smoothly to camera position and environmental progression along a defined world track.
- **The Cave → Ocean Lateral Move:** As vertical scroll continues, the camera and environment gracefully pivot horizontally from the cavern interior out into the open sea.
- **Invariants:**
  - **No scroll-jacking:** The browser's native scroll mechanics are never replaced or locked.
  - **No manual horizontal scroll:** The user does not scroll horizontally; the camera path handles lateral motion internally based on vertical scroll distance.

---

## 8. DOM & Three.js Ownership

| Layer | Responsibility | Elements |
|---|---|---|
| **Three.js (Canvas)** | Spatial atmosphere, environment, lighting, scale, visual journey | Planets, terrain, flora, water, rocks, crystals, lighting, fog, camera travel |
| **DOM (HTML/React)** | Meaningful content, typography, site navigation, links, accessibility | Headings, descriptions, destination links (`/links`), experiment previews (`/lab`), bio access (`/profile`), skip link |

### Non-WebGL & Fallback Contract
- Essential content and navigation must never be rendered solely inside WebGL.
- If WebGL is unsupported, disabled, or fails to initialize:
  - All DOM content remains readable, navigable, and properly structured.
  - A stylized, lightweight static atmospheric background or gradient fallback is rendered behind the DOM.
- When `prefers-reduced-motion` is active:
  - Continuous camera travel, rotational orbits, and dynamic parallax are stopped or simplified into calm, stable viewpoints.

---

## 9. World Structure Direction

*Conceptual component hierarchy for future technical design (to be finalized in TASK-023):*

```
Home (Route: /)
└── WorldJourney
    ├── DOM Journey / Content Layer (Semantic landmarks, links, cards, overlays)
    └── WorldJourneyCanvas (Route-scoped, lazy-loaded Three.js canvas)
        ├── 01 Orbit Scene
        ├── 02 Atmosphere Scene
        ├── 03 Forest Scene
        ├── 04 Cave Scene
        ├── 05 Ocean Scene
        └── 06 Abyss Scene
```

---

## 10. Asset & Lighting Direction

### Asset Direction
- **Form:** Stylized, clean silhouettes, moderate geometry budgets optimized for real-time web rendering.
- **Materials:** Consistent material response across biomes; shared PBR properties with stylized roughness and subtle emissive accents.
- **Asset Integrity:** Never mix realistic 3D scans, anime models, or hyper-textured game assets into this stylized cinematic universe.

### Lighting Direction
- **Orbit:** High-contrast directional sunlight casting strong rim highlights across the planet curve against black space.
- **Atmosphere:** Broad, high-key ambient light, soft skylight, bright cloud reflections.
- **Forest:** Dappled sunlight breaking through canopy gaps, soft god rays, rich ambient ground occlusion.
- **Cave:** Dramatic low-key lighting punctuated by vivid, localized point/emissive lighting from crystal clusters.
- **Ocean:** Caustics and filtered downward sunbeams gradually attenuating with depth into deep ocean blues.
- **Abyss:** Near-zero ambient light; isolated, delicate bioluminescent glows accentuating creature and rock silhouettes.

---

## 11. Detail Strategy

Detail must be applied selectively to maintain both 60fps performance and visual clarity:

1. **Tier 1 — Major Silhouettes:** Distinct, iconic outlines readable against the background.
2. **Tier 2 — Environmental Atmosphere:** Volumetric fog, light shafts, and particulate dust giving scale.
3. **Tier 3 — Key Lighting:** Form-defining highlights, rims, and localized emission.
4. **Tier 4 — Depth Planes:** Layered foreground and background framing.
5. **Tier 5 — Hero Focal Assets:** Selected stylized focal points (e.g., glowing crystal cluster, distant whale).
6. **Tier 6 — Micro Details:** Minimal, restrained secondary elements only where performance allows.

---

## 12. Approved vs. TBD

### APPROVED
- Concept: **Stylized Cinematic Nature**.
- Six-chapter descent: **Orbit → Atmosphere → Primeval Forest → Crystal Cave → Living Ocean → Abyss**.
- Signature **Cave → Ocean** horizontal world/camera transition driven by vertical document scroll.
- User input model: Standard **native vertical scrolling** without scroll-jacking or manual horizontal scrolling.
- **DOM / Three.js division of responsibility:** Three.js renders the spatial world; DOM retains all content, navigation, and semantic structure.
- Prioritization of scale, atmosphere, and silhouette over polygon density and micro-textures.
- Full support for graceful non-WebGL fallback and reduced-motion states.

### TBD (Deferred to Technical Architecture & Production Tasks)
- Exact Earth geometry, shader, and cloud-layering implementation technique (TASK-023 / TASK-026 / TASK-027).
- Concrete 3D models and polygon budgets for trees, rocks, marine life, and whale (TASK-025).
- Precise water surface and underwater caustic shader implementations (TASK-023 / TASK-031 / TASK-034).
- Exact crystal material and emissive glow shader specifications (TASK-029 / TASK-034).
- Specific camera coordinate spline and chapter scroll-distance breakpoints (TASK-023 / TASK-024).
- Exact CSS hex color values and token assignments (TASK-023 / TASK-025).
- Post-processing pipeline choices (Bloom, DOF, Tone mapping) (TASK-023 / TASK-034).

---

## 13. Decisions

- **WJ-001:** Stylized Cinematic Nature is the approved visual direction for World Journey.
- **WJ-002:** World Journey contains six consecutive chapters: Orbit, Atmosphere, Primeval Forest, Crystal Cave, Living Ocean, Abyss.
- **WJ-003:** User interaction remains standard native vertical browser scrolling; no custom scroll-jacking is permitted.
- **WJ-004:** The Cave → Ocean sequence utilizes a horizontal world/camera translation choreographed from vertical scroll progress.
- **WJ-005:** Three.js owns the spatial environment and visual atmosphere; the DOM strictly owns readable content, navigation, and accessibility.
- **WJ-006:** Scale, depth, and lighting take precedence over high geometry counts and texture complexity.
- **WJ-007:** World Journey must provide graceful degradation for non-WebGL environments and complete support for `prefers-reduced-motion`.
- **WJ-008:** Specific shaders, 3D asset geometries, and spline camera parameters remain technical TBDs until TASK-023 and subsequent tasks.
