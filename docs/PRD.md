# Product Requirements Document: Personal Digital Hub

**Status:** Initial product definition  
**Document owner:** TBD  
**Last updated:** 2026-09-18

## 1. Product Overview

This product is a personal digital hub: a central website that connects the owner's web experiences, external websites, experiments, and future interactive features.

It is not a traditional portfolio or résumé site. The product should feel like the owner's personal space on the web—distinctive, exploratory, and capable of growing over time. The home page establishes the identity of the hub, while dedicated areas provide focused ways to explore links, experiments, profile information, and a future hometown experience.

The repository is currently a minimal Next.js starter. No existing product content, visual system, personal facts, external links, or page concepts should be assumed to be authoritative.

## 2. Product Vision

Create a memorable personal web destination where visitors can understand the shape of the owner's online world and choose how deeply they want to explore it—from a fast tour of connected sites to immersive experiments and future interactive experiences.

The hub should feel authored rather than templated, expressive rather than résumé-like, and technically ambitious without making technology the product.

## 3. Product Philosophy

- Identity before convention: establish a recognizable point of view without copying generic portfolio or SaaS patterns.
- Exploration with orientation: invite discovery while keeping navigation, page purpose, and return paths clear.
- Meaningful motion: animation and 3D should communicate hierarchy, place, state, or transition—not exist only as decoration.
- Progressive enhancement: the core content and navigation remain usable as normal web content, with richer effects layered on where they add value.
- Content and presentation are separable: personal facts, links, experiments, and page metadata should remain conceptually independent from the UI that presents them.
- Quality over novelty: visual ambition must be balanced with performance, accessibility, responsive behavior, and maintainability.
- Evolving by design: new destinations should be addable without restructuring the entire product.

## 4. Product Goals

- Provide a compelling entrance to the owner's broader web presence.
- Give visitors clear paths to discover connected websites and future destinations.
- Establish a flexible visual and interaction language that can support both ordinary content pages and selective immersive experiences.
- Make the `/lab` area a durable home for experiments rather than a one-off showcase.
- Keep the profile present but subordinate to the larger hub concept.
- Prepare the content model and navigation conventions for future pages and an eventual AI assistant.
- Deliver a polished experience across desktop, tablet, and mobile without requiring WebGL for basic use.
- Set measurable quality expectations for accessibility, performance, and reduced-motion behavior.

## 5. Non-Goals

- Building a traditional résumé, employment, or case-study portfolio as the primary product.
- Finalizing a mascot, 3D object, shader, color palette, typography system, or home-page gimmick in this PRD.
- Making every page a Three.js or WebGL scene.
- Creating a Linktree-style plain list as the final `/links` experience.
- Defining or inventing the owner's biography, hometown details, projects, social links, achievements, or external websites.
- Building the future AI assistant, RAG pipeline, API layer, or chatbot in the MVP.
- Defining database schemas, detailed component architecture, or implementation code.
- Requiring future pages such as notes, archive, gallery, setup, guestbook, or timeline for MVP launch.

## 6. Target Experience

### Primary audience

- Curious visitors discovering the owner's web presence for the first time.
- Returning visitors who want to jump directly to a known area or experiment.
- Technical and creative peers interested in the owner's experiments and interactive work.

### Desired visitor journey

1. Arrive at `/` and quickly understand that this is a personal digital hub, not a standard résumé.
2. Notice a clear set of destinations and an invitation to explore.
3. Move into `/links`, `/lab`, or `/profile` based on intent, with future destinations added as the hub grows.
4. Understand where they are, what a page contains, and how to return or continue exploring.
5. Encounter visual depth and motion as an enhancement to the experience, not as a barrier to content.

### Experience qualities

The product should feel personal, coherent, curious, polished, responsive, and slightly surprising. It should avoid feeling cluttered, generic, overly corporate, or like a technology demo without purpose.

## 7. Information Architecture

The initial top-level destinations are:

| Route | Role | MVP status |
| --- | --- | --- |
| `/` | Main entrance and orientation layer for the entire hub | Required |
| `/links` | Visual directory of the owner's other websites and destinations | Required |
| `/lab` | Growing playground for visual and frontend experiments; route name is provisional and may be renamed during later design exploration | Required |
| `/profile` | Dedicated personal profile area | Required |
| `/hometown` | Possible future immersive hometown experience; initial content and concept are TBD | Future scope; not an MVP commitment |

The navigation model must support adding future top-level destinations without changing the mental model. Potential future routes include `/notes`, `/archive`, `/gallery`, `/setup`, `/guestbook`, and `/timeline`; these are not MVP commitments.

## 8. Initial Pages

### `/` — Home

Purpose: serve as the main entrance, establish the hub's identity, orient visitors, and direct them toward other areas.

Requirements:

- Communicate the personal digital hub concept without relying on résumé conventions.
- Present a strong visual identity and a clear navigation path.
- Support advanced motion and cursor-responsive interaction where appropriate.
- Allow selective Three.js use as a visual or interactive layer.
- Keep core text, navigation, buttons, and accessible controls DOM-based.
- Remain usable if enhanced visual layers fail, are unavailable, or are reduced for user preference.
- Leave the exact visual concept open for later design exploration.

### `/links` — Connected Websites

Purpose: provide an expandable visual hub for websites owned or curated by the user.

Requirements:

- Use rich cards or boxes rather than a plain Linktree-style list.
- Make the destination, title, and available description understandable without hover.
- Support future previews, hover states, motion, cursor interaction, transitions, and external navigation.
- Clearly distinguish internal navigation from external website navigation.
- Treat all link content as TBD until supplied by the owner.

### `/lab` — Experimental Playground

Purpose: provide a durable home for UI experiments, Three.js, WebGL, shaders, motion, GSAP, cursor interactions, visual effects, and frontend experiments. The `/lab` route name is provisional and may be renamed during later design exploration; it remains the current route for now.

Requirements:

- Be structured to grow as experiments are added.
- Allow experiments to have distinct presentation needs while retaining shared navigation and usability conventions.
- Provide an understandable way to identify an experiment and enter or leave it.
- Avoid requiring every experiment to be active, animated, or GPU-intensive at all times.

### `/profile` — Personal Profile

Purpose: present personal profile information as one part of the hub.

Requirements:

- Support clear personal context and relevant links when content becomes available.
- Remain subordinate to the overall hub rather than becoming the product's sole narrative.
- Use `TBD` for any missing biography, history, achievements, or other personal details.

### `/hometown` — Future Immersive Experience

Purpose: eventually provide an immersive experience about the owner's hometown.

Potential capabilities include interactive locations, stylized 3D environments, camera movement, atmosphere, lighting changes, and storytelling. The detailed concept, content, and interaction model are TBD.

This area is future scope. The product may reserve a coherent navigation concept for it later, but the route, content, world, scenes, landmarks, story, and Three.js implementation are not committed for MVP.

## 9. Functional Requirements

- FR-1: The MVP must provide routable entry points for `/`, `/links`, `/lab`, and `/profile`.
- FR-2: The product must provide consistent navigation between initial pages and a clear way to understand the current location.
- FR-3: The home page must direct visitors toward the hub's major destinations.
- FR-4: The links page must support a collection of visually rich destination items that can later point to internal or external websites.
- FR-5: Destination items must expose enough information to identify their target without requiring hover-only interaction.
- FR-6: The lab page must support adding new experiment entries without redesigning the page's fundamental information architecture.
- FR-7: The profile page must present owner-provided content without making unverified assumptions about the owner.
- FR-8: Interactive and visual enhancements must not prevent access to core content or navigation.
- FR-9: The content model must allow future destinations and metadata to be added without changing the core visitor mental model.
- FR-10: External links must communicate that they leave the hub and should use safe, intentional navigation behavior.
- FR-11: The product must provide meaningful fallback or simplified states when enhanced visual experiences are unavailable or intentionally reduced.

## 10. UX Requirements

- UX-1: Each page must have one clear primary purpose and a visible hierarchy.
- UX-2: Visitors must be able to orient themselves without understanding the underlying technologies.
- UX-3: The main navigation must be discoverable, predictable, and consistent across pages.
- UX-4: Important actions must not depend on hover, cursor precision, gesture-only behavior, or color alone.
- UX-5: Interactive elements must provide visible hover, focus, pressed, and disabled states where applicable.
- UX-6: Long-form text should maintain comfortable, readable widths across supported viewports.
- UX-7: Layout and spacing should use a consistent system across the hub; detailed values belong in a future design system.
- UX-8: Empty, unavailable, or TBD content should have an intentional explanatory state rather than looking broken.
- UX-9: Page transitions should preserve spatial context and never block input unnecessarily.
- UX-10: Visual style decisions must be made as a coherent system once design exploration begins; detailed typography, spacing, tokens, breakpoints, motion timings, easing, and effect specifications belong in a future `DESIGN_SYSTEM.md`.

## 11. Motion & Interaction Principles

- Motion must express a relationship: navigation, focus, hierarchy, continuity, or feedback.
- Use transform and opacity-based animation where possible to reduce layout work.
- Keep motion interruptible and responsive to user input.
- Use a consistent motion language across the hub, while allowing intensity to vary by page purpose; detailed timings and easing belong in a future design system.
- Limit the number of simultaneously prominent animated elements so the experience remains legible.
- Cursor-responsive effects should enhance spatial awareness and must have a non-cursor alternative.
- Scroll-triggered motion should not hide essential content or create disorientation.
- Auto-moving or rotating content must provide a pause/stop mechanism and stop or simplify on focus and reduced-motion preference.
- Respect `prefers-reduced-motion` by removing nonessential movement, parallax, and scene choreography while preserving state and navigation.

## 12. Three.js / WebGL Product Requirements

- Three.js, React Three Fiber, Drei, shaders, and post-processing are optional enhancement layers, not the default application substrate.
- Use 3D only when it materially improves identity, interaction, atmosphere, or storytelling for a specific page or feature.
- DOM must remain the source of truth for text, navigation, buttons, forms, and other semantic controls.
- Every significant 3D or WebGL experience must have a usable fallback or degraded mode for unsupported devices, disabled motion, slow connections, or rendering failure.
- WebGL scenes must not trap keyboard focus or prevent standard page scrolling and navigation.
- GPU-heavy effects should be lazy-loaded or limited to the route and viewport where they are needed.
- Post-processing requires a clear product justification and must be omitted when it does not create meaningful user value.
- The visual concept for the home page remains intentionally open; no specific mascot, object, shader, or palette is a requirement.

## 13. Responsive Requirements

- Design mobile-first, then enhance for larger viewports.
- Support small phones, large phones, tablets, desktop, and landscape orientations without horizontal scrolling.
- Preserve readable type, adequate spacing, and comfortable touch targets across viewport sizes.
- Ensure full-height experiences account for changing mobile browser chrome and do not hide content behind the viewport or fixed UI.
- Keep core content available before or alongside decorative effects on narrow screens.
- Adapt hover-driven interactions into tap, focus, or explicit control states.
- Respect safe areas for fixed or sticky navigation and ensure content is not hidden behind persistent UI.
- Maintain a coherent experience when WebGL is unavailable or intentionally reduced on mobile.

## 14. Accessibility Requirements

- Target WCAG 2.2 AA quality for core content and navigation.
- Maintain at least 4.5:1 contrast for normal text and verify non-text control contrast where it carries meaning.
- Provide visible keyboard focus indicators and a logical tab order.
- Provide a skip link or equivalent shortcut to the main content.
- Use semantic headings in a sequential hierarchy and semantic controls for actions.
- Provide accessible names for icon-only controls; decorative icons must not create noise for assistive technology.
- Provide text alternatives for meaningful images and non-text visual content.
- Do not communicate status or meaning with color alone.
- Support zoom and text scaling without clipping essential content or disabling user zoom.
- Ensure overlays and sticky elements do not obscure keyboard focus.
- Provide keyboard and non-gesture alternatives for any drag, swipe, or cursor-based behavior.
- Respect reduced-motion preferences and preserve equivalent information when animation is removed.

## 15. Performance Requirements

- The core experience should remain fast and usable before optional visual enhancements finish loading.
- Avoid making the initial route pay for all future experiments or all 3D assets.
- Lazy-load route-specific, below-the-fold, and GPU-intensive content when appropriate.
- Optimize images and media using responsive dimensions and modern formats where supported.
- Reserve layout space for images, fonts, asynchronous content, and scene containers to minimize layout shift.
- Keep high-frequency pointer, resize, and scroll work throttled or otherwise bounded.
- Keep motion responsive on capable devices and degrade gracefully when device or network conditions make intensive effects unsuitable.
- Use a network- and device-aware fallback for heavy experiences.
- Measure real performance during later implementation; initial targets should include good Core Web Vitals, with CLS below 0.1 as a quality bar.

## 16. Content Architecture Requirements

- Keep content conceptually separate from UI implementation.
- Represent destinations, experiments, profile content, and future pages as structured content concepts with stable identifiers, titles, descriptions, route or URL, category, and visibility/status metadata as needed.
- Do not invent biography, hometown details, external websites, project names, social links, personal history, or achievements.
- Mark unknown information as `TBD` until the owner provides it.
- Preserve enough semantic metadata for future search, recommendations, and approved RAG source selection.
- Support internal and external destinations without making either type feel accidental or ambiguous.
- Avoid embedding personal content exclusively inside visual effects or canvas scenes.

## 17. Future AI / RAG Direction

An AI assistant may later help visitors explore the hub using approved website content. Possible capabilities include answering questions about the website or owner, searching site information, finding projects or websites, recommending relevant pages, navigating visitors to destinations, and triggering safe predefined UI actions.

Examples of future intent:

- “Show me your Three.js experiments.” → navigate to `/lab`.
- “Show your hometown at night.” → navigate to `/hometown` and request a predefined scene state, if that state is later designed and approved.

This is a future product direction only. The MVP must not include the assistant, RAG implementation, model integration, APIs, database design, or unrestricted action execution. Future AI behavior must use approved, separable content and constrained actions with clear user feedback.

## 18. Extensibility Requirements

- New top-level destinations must be addable without restructuring the navigation model.
- New lab experiments must be addable without requiring a bespoke page architecture for every entry.
- Page-level visual intensity must be configurable conceptually so a content page can remain DOM-first while an immersive page can opt into richer layers.
- Shared orientation, accessibility, and fallback conventions must remain consistent as pages diverge visually.
- Future content sources should be able to expose human-readable content and metadata independently of presentation.
- The product must leave room for notes, archive, gallery, setup, guestbook, timeline, and other experiences without treating them as present requirements.

## 19. MVP Scope

The MVP includes:

- A coherent home page at `/` that establishes the digital hub and directs exploration.
- Routable initial destinations: `/links`, `/lab`, and `/profile`.
- A visually rich but understandable links experience with owner-provided content when available.
- A lab experience that can grow beyond a single experiment.
- A profile page that remains one part of the hub.
- Responsive, keyboard-accessible, reduced-motion-aware navigation and core content.
- Progressive enhancement boundaries for optional Three.js/WebGL and motion.
- Content separation and extensibility conventions sufficient for future expansion.

The exact visual direction, personal content, and final interaction details are design exploration deliverables after this PRD.

## 20. Future Scope

- Additional destinations such as notes, archive, gallery, setup, guestbook, and timeline.
- Rich previews and deeper interactions for linked websites.
- More sophisticated lab indexing, filtering, or experiment launch patterns.
- A hometown experience with scenes, locations, camera movement, atmosphere, lighting, and narrative.
- AI assistant capabilities backed by approved site content and constrained navigation or scene actions.
- Optional persistence, analytics, personalization, or sharing features if later justified by product needs.

## 21. Out of Scope

- AI assistant, RAG, chatbot, semantic search, or recommendation implementation.
- API routes, external integrations, data stores, authentication, or database schemas.
- Detailed design-system tokens, component specifications, or implementation architecture.
- Production Three.js scenes, shaders, GSAP timelines, post-processing pipelines, or other application code in this PRD phase.
- Invented personal facts or placeholder external destinations presented as real content.
- A commitment to a specific visual theme, mascot, 3D object, color palette, or shader.
- Building every future route listed in this document.

## 22. Success Criteria

The MVP is successful when:

- A first-time visitor can understand the site as a personal digital hub within one visit to the home page.
- Visitors can reach every initial destination through clear, predictable navigation.
- The links and lab areas communicate their purpose and are structured to grow.
- Profile content is discoverable without making the whole product feel like a résumé.
- Core content and navigation remain usable with JavaScript/WebGL enhancement reduced or unavailable.
- Keyboard users can navigate the primary experience with visible focus and no inaccessible interaction dependency.
- Reduced-motion users receive an equivalent information architecture and usable transitions.
- The experience works without horizontal scrolling across supported viewport classes.
- Optional visual layers do not cause unacceptable layout shift, input blocking, or sustained jank on representative devices.
- No unverified personal information is presented as fact.
- New destinations can be added conceptually without changing the core navigation model.

## 23. Open Questions / TBD

- What is the owner's preferred name, voice, and level of personal disclosure?
- Which external websites and projects belong on `/links`?
- Which experiments should launch the first version of `/lab`?
- What profile content is approved for `/profile`?
- What hometown, locations, stories, and emotional tone should shape `/hometown`?
- What visual direction best expresses the hub after design exploration: typography, palette, surface treatment, icon language, and 3D role?
- Should the home page use a persistent visual scene, a route-specific scene, or a mostly DOM-based composition with selective 3D moments?
- Which destinations are internal routes versus external links, and how should external navigation be signaled?
- What level of motion and interaction is appropriate for the owner's audience and content?
- Which devices and browsers define the minimum supported WebGL experience?
- Which future pages should be prioritized after MVP?
- What approved content boundaries and safe actions would be required for a future AI assistant?
- What analytics, if any, are acceptable for understanding navigation and performance?

Until answered, unknown values must remain `TBD` and must not be replaced with invented content.
