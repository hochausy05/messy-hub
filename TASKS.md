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

- [x] **TASK-005 — Create primary navigation and route foundations**
  - Goal: Establish navigation for `/`, `/links`, `/lab`, and `/profile`.
  - Read: `docs/PRD.md` §7-9, `docs/ARCHITECTURE.md` §5.
  - Skills: `vercel-react-best-practices`, `web-design-guidelines`.
  - Deliverables: Routable MVP destinations and shared primary navigation.
  - Acceptance: All MVP routes resolve; active/current location is understandable; external-link logic is not mixed into internal nav.

- [x] **TASK-006 — Add content and data contracts**
  - Goal: Define minimal typed structures for navigation, destinations, experiments, and profile content.
  - Read: `docs/ARCHITECTURE.md` §10, §13.
  - Skills: `vercel-react-best-practices`.
  - Deliverables: Shared types plus minimal content/data modules with `TBD` where owner content is missing.
  - Acceptance: UI can consume content without hardcoding personal facts into presentation components.

## Phase 1 — Home

- [x] **TASK-007 — Build Home DOM composition**
  - Goal: Create the accessible home information hierarchy and destination entry points before advanced effects.
  - Read: `docs/PRD.md` §8 Home, `docs/DESIGN_SYSTEM.md` §10 Home.
  - Skills: `design`, `ui-styling`, `web-design-guidelines`, `vercel-react-best-practices`.
  - Deliverables: DOM-first `/` composition.
  - Acceptance: Home communicates hub purpose and all major destinations without relying on motion or WebGL.

- [x] **TASK-008 — Add Home motion foundation**
  - Goal: Add purposeful entrance and interaction motion to the Home route.
  - Read: `docs/DESIGN_SYSTEM.md` §8, `docs/ARCHITECTURE.md` §7, §9.
  - Skills: `gsap-core`, `gsap-react`, `gsap-performance`.
  - Deliverables: Route-scoped motion with cleanup and reduced-motion behavior.
  - Acceptance: Motion enhances hierarchy, does not block navigation, and fully respects reduced-motion preference.

- [x] **TASK-009 — Add optional Home Three.js enhancement**
  - Goal: Introduce one approved, route-scoped 3D enhancement without making Home dependent on WebGL.
  - Read: `docs/ARCHITECTURE.md` §6-9, `docs/DESIGN_SYSTEM.md` §9, §14.
  - Skills: `threejs-fundamentals`, `threejs-interaction`, `threejs-lighting`, `threejs-materials`, `threejs-loaders`.
  - Deliverables: Lazy-loaded Home visual scene plus intentional non-WebGL fallback.
  - Acceptance: Core Home remains complete without canvas; scene cleans up on unmount; visual concept uses only owner-approved exploration decisions.

## Phase 2 — Links

- [x] **TASK-010 — Build structured Links data**
  - Goal: Create the owner-editable destination dataset for internal/external websites.
  - Read: `docs/PRD.md` §8 Links, `docs/ARCHITECTURE.md` §10.
  - Skills: `vercel-react-best-practices`.
  - Deliverables: Typed link records with stable IDs, titles, descriptions, URL/route, category/status as needed.
  - Acceptance: No fake destinations are presented as real; adding a destination does not require page-layout edits.

- [x] **TASK-011 — Build Links visual directory**
  - Goal: Render the destination dataset as a responsive rich-card experience.
  - Read: `docs/DESIGN_SYSTEM.md` §6-7, §10 Links.
  - Skills: `design`, `ui-styling`, `web-design-guidelines`, `vercel-react-best-practices`.
  - Deliverables: Responsive `/links` page and reusable destination-card UI.
  - Acceptance: Cards are understandable without hover; internal/external destinations are visually distinguishable.

- [x] **TASK-012 — Add Links interaction polish**
  - Goal: Add pointer/focus/touch-safe card motion and preview behavior where justified.
  - Read: `docs/DESIGN_SYSTEM.md` §7-8.
  - Skills: `gsap-core`, `gsap-react`, `gsap-performance`, `web-design-guidelines`.
  - Deliverables: Card interaction motion with keyboard/touch parity.
  - Acceptance: No essential information is hover-only; motion is interruptible and reduced-motion-safe.

## Phase 3 — Lab

- [x] **TASK-013 — Create Lab registry and index**
  - Goal: Establish an extensible experiment catalog and discovery surface.
  - Read: `docs/PRD.md` §8 Lab, `docs/ARCHITECTURE.md` §5, §10-11.
  - Skills: `vercel-react-best-practices`, `design`.
  - Deliverables: Typed experiment registry and `/lab` index.
  - Acceptance: New experiments can be registered without changing the site shell or unrelated routes.

- [x] **TASK-014 — Establish isolated experiment entry pattern**
  - Goal: Define the route/component boundary used by individual experiments.
  - Read: `docs/ARCHITECTURE.md` §5-9.
  - Skills: `vercel-react-best-practices`, `gsap-performance`.
  - Deliverables: Reusable experiment entry/loading/error/fallback pattern.
  - Acceptance: Experiment code/assets load only when needed and clean up when leaving the experiment.

- [x] **TASK-015 — Build first UI/motion experiment**
  - Goal: Validate the Lab pattern with one focused DOM/GSAP interaction experiment.
  - Read: `docs/DESIGN_SYSTEM.md` §7-10.
  - Skills: `ui-styling`, `gsap-core`, `gsap-react`, `gsap-timeline`, `gsap-performance`.
  - Deliverables: One complete motion experiment registered in Lab.
  - Acceptance: Experiment has clear enter/exit behavior, reduced-motion handling, and does not affect other routes.

- [x] **TASK-016 — Build first Three.js interaction experiment**
  - Goal: Validate interactive 3D isolation and DOM/WebGL communication inside Lab.
  - Read: `docs/ARCHITECTURE.md` §7-9, `docs/DESIGN_SYSTEM.md` §9.
  - Skills: `threejs-fundamentals`, `threejs-interaction`, `threejs-geometry`, `threejs-materials`, `threejs-lighting`.
  - Deliverables: One route-scoped interactive Three.js experiment with fallback.
  - Acceptance: Pointer interaction is bounded; essential navigation remains DOM-accessible; resources/listeners are disposed on exit.

## Phase 4 — Profile

- [x] **TASK-017 — Add approved Profile content model**
  - Goal: Prepare profile content using only owner-provided information.
  - Read: `docs/PRD.md` §8 Profile, `docs/ARCHITECTURE.md` §10.
  - Skills: `vercel-react-best-practices`.
  - Deliverables: Structured profile content/data with unresolved fields kept `TBD` or omitted.
  - Acceptance: No invented biography, achievements, links, or history.

- [x] **TASK-018 — Build Profile page**
  - Goal: Create a calm, content-first profile experience consistent with the hub.
  - Read: `docs/DESIGN_SYSTEM.md` §5-7, §10 Profile.
  - Skills: `design`, `ui-styling`, `web-design-guidelines`, `vercel-react-best-practices`.
  - Deliverables: Responsive `/profile` page with restrained optional motion.
  - Acceptance: Content remains primary; page is fully usable without animation.

## Phase 5 — Quality & Release

- [x] **TASK-019 — Cross-route accessibility and responsive audit**
  - Goal: Validate all MVP routes across keyboard, touch, viewport, and reduced-motion modes.
  - Read: `docs/PRD.md` §13-14, `docs/DESIGN_SYSTEM.md` §12.
  - Skills: `web-design-guidelines`.
  - Deliverables: Fixes for discovered MVP accessibility/responsive issues.
  - Acceptance: Primary flows work by keyboard/touch, focus is visible, no essential hover-only interactions remain, and layouts remain stable across target viewport classes.

- [x] **TASK-020 — Performance and enhancement fallback audit**
  - Goal: Validate motion/WebGL lifecycle, loading isolation, fallback behavior, and route-level performance.
  - Read: `docs/ARCHITECTURE.md` §6-9.
  - Skills: `vercel-react-best-practices`, `gsap-performance`, relevant `threejs-*` skills for affected scenes.
  - Deliverables: Performance/fallback fixes and cleanup.
  - Acceptance: Heavy visual code is route-scoped; inactive scenes/animations stop; core content remains usable when enhancements are reduced/unavailable.

- [x] **TASK-021 — Production build and MVP release baseline**
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

## Phase 6 — World Journey Direction & Foundation

- [x] **TASK-022 — Define World Journey visual concept**
  - Goal: Chốt art direction cho hành trình Three.js từ ngoài không gian xuống đáy biển sâu và xác định vai trò của từng chapter.
  - Read: `docs/DESIGN_SYSTEM.md`
  - Skills: `design`, `design-system`, `web-design-guidelines`
  - Deliverables: Tài liệu ngắn `docs/design/WORLD_JOURNEY.md` xác định chapter, mood, palette direction, scale, lighting intent, transition intent và ranh giới DOM/Three.js.
  - Acceptance: Có một visual direction thống nhất cho Space → Atmosphere → Forest → Crystal Cave → Ocean → Abyss; không còn mơ hồ về vai trò từng vùng; chưa triển khai Three.js production.

- [x] **TASK-023 — Define World Journey technical architecture**
  - Goal: Chốt kiến trúc scrollytelling trước khi sản xuất scene nặng.
  - Read: `docs/design/WORLD_JOURNEY.md`, `docs/ARCHITECTURE.md`
  - Skills: `vercel-react-best-practices`, `gsap-scrolltrigger`, `gsap-performance`, `threejs-fundamentals`
  - Deliverables: Kiến trúc camera/scroll, scene ownership, loading strategy, vertical/horizontal transition model, asset boundaries và performance budget.
  - Acceptance: Xác định rõ Canvas ownership, camera path, ScrollTrigger ownership, chapter lifecycle, mobile strategy, reduced-motion strategy và giới hạn GPU/asset trước khi dựng world thật.

- [ ] **TASK-024 — Build end-to-end World Journey greybox**
  - Goal: Dựng prototype toàn hành trình bằng geometry đơn giản để kiểm chứng scroll, camera và chuyển chapter.
  - Read: `docs/design/WORLD_JOURNEY.md`, World Journey architecture từ TASK-023
  - Skills: `threejs-fundamentals`, `threejs-animation`, `threejs-interaction`, `gsap-core`, `gsap-scrolltrigger`, `gsap-performance`
  - Deliverables: Greybox Space → Atmosphere → Surface → Cave → horizontal Ocean transition → Abyss.
  - Acceptance: Có thể cuộn xuyên suốt hành trình; camera path ổn định; chuyển dọc/ngang hoạt động; DOM không bị khóa; chưa dùng asset/model/shader production.

- [ ] **TASK-025 — Establish world asset and style pipeline**
  - Goal: Chuẩn hóa asset trước khi dựng từng biome để tránh lệch style và quá tải tài nguyên.
  - Read: `docs/design/WORLD_JOURNEY.md`, World Journey architecture
  - Skills: `threejs-loaders`, `threejs-textures`, `threejs-materials`
  - Deliverables: Quy ước asset, format, texture budget, model budget, naming, reuse strategy, LOD/instancing rules và nguồn asset được phép dùng.
  - Acceptance: Có pipeline thống nhất cho model/texture/environment; không cần thay đổi quy trình asset khi bắt đầu các biome production.

## Phase 7 — World Journey Biome Production

- [ ] **TASK-026 — Build Outer Space chapter**
  - Goal: Xây chapter mở đầu ngoài không gian với Trái Đất và cảm giác quy mô vĩ mô.
  - Read: `docs/design/WORLD_JOURNEY.md`, World Journey architecture
  - Skills: `threejs-fundamentals`, `threejs-materials`, `threejs-lighting`, `threejs-textures`
  - Deliverables: Earth/orbit composition, star depth, atmospheric rim và camera framing production-ready.
  - Acceptance: Opening scene có scale lớn, hoạt động responsive và chuyển tiếp được xuống Atmosphere mà không phá scroll architecture.

- [ ] **TASK-027 — Build Atmosphere and Sky descent**
  - Goal: Tạo quá trình đi xuyên khí quyển từ không gian xuống bầu trời.
  - Read: `docs/design/WORLD_JOURNEY.md`, World Journey architecture
  - Skills: `threejs-materials`, `threejs-lighting`, `threejs-animation`, `gsap-scrolltrigger`
  - Deliverables: Atmospheric transition, clouds/sky depth, lighting shift và descent choreography.
  - Acceptance: Space → Sky chuyển liên tục, không có cut gắt, không che DOM và không tạo scroll-jank.

- [ ] **TASK-028 — Build Primeval Forest and Surface chapter**
  - Goal: Xây vùng mặt đất gồm rừng nguyên sinh, hồ/suối và không gian thiên nhiên sống động.
  - Read: `docs/design/WORLD_JOURNEY.md`, asset pipeline
  - Skills: `threejs-loaders`, `threejs-textures`, `threejs-materials`, `threejs-lighting`, `threejs-animation`
  - Deliverables: Terrain/surface composition, vegetation system, water elements, environmental depth và restrained ambient movement.
  - Acceptance: Forest có chiều sâu và sức sống nhưng vẫn nằm trong performance budget; không cần hyper-real asset density.

- [ ] **TASK-029 — Build Crystal Cave chapter**
  - Goal: Xây hệ hang động dưới lòng đất với pha lê phát sáng, đá và rêu xanh.
  - Read: `docs/design/WORLD_JOURNEY.md`, asset pipeline
  - Skills: `threejs-materials`, `threejs-lighting`, `threejs-textures`, `threejs-loaders`
  - Deliverables: Cave geometry, crystal clusters, moss/rock environment và emissive/local-light treatment.
  - Acceptance: Cave có mood riêng nhưng vẫn cùng art direction; crystal lighting không gây chi phí GPU quá mức.

- [ ] **TASK-030 — Build Cave-to-Ocean horizontal transition**
  - Goal: Xây cú chuyển hướng đặc trưng từ hành trình dọc trong hang sang hành trình ngang ra đại dương.
  - Read: `docs/design/WORLD_JOURNEY.md`, World Journey architecture
  - Skills: `gsap-core`, `gsap-scrolltrigger`, `gsap-performance`, `threejs-animation`
  - Deliverables: Camera/path transition dọc → ngang, cave exit, ocean reveal và DOM-scroll coordination.
  - Acceptance: Chuyển ngang có chủ đích, không scroll-jack khó chịu, có thể thoát/re-enter ổn định và reduced-motion có phương án đơn giản hơn.

- [ ] **TASK-031 — Build Ocean ecosystem chapter**
  - Goal: Xây vùng đại dương với đáy biển, thực vật, đàn cá và sinh vật lớn ở nhiều tầng sâu.
  - Read: `docs/design/WORLD_JOURNEY.md`, asset pipeline
  - Skills: `threejs-loaders`, `threejs-animation`, `threejs-materials`, `threejs-lighting`, `threejs-textures`
  - Deliverables: Ocean environment, fish schools, large-creature silhouettes/whale presence, vegetation and depth layers.
  - Acceptance: Đại dương có cảm giác rộng và sống động; sinh vật không gây object-count/render-loop quá lớn; interaction không cản scroll.

- [ ] **TASK-032 — Build Deep Sea Abyss ending**
  - Goal: Xây chapter cuối ở biển sâu tối đen và tạo ending mạnh cho hành trình.
  - Read: `docs/design/WORLD_JOURNEY.md`, World Journey architecture
  - Skills: `threejs-materials`, `threejs-lighting`, `threejs-animation`
  - Deliverables: Abyss environment, sparse bioluminescent details, depth/fog treatment và final resting composition.
  - Acceptance: Ending có cảm giác sâu, yên và vĩ mô; không cần object density cao; cuối trang có trạng thái ổn định thay vì scene chuyển động vô hạn.

## Phase 8 — Content & Visual Integration

- [ ] **TASK-033 — Integrate site content into World Journey**
  - Goal: Gắn nội dung thật của Messy Hub vào các chapter mà không biến Three.js thành hệ thống navigation duy nhất.
  - Read: `docs/PRD.md`, `docs/design/WORLD_JOURNEY.md`, `docs/DESIGN_SYSTEM.md`
  - Skills: `design`, `ui-styling`, `web-design-guidelines`, `vercel-react-best-practices`
  - Deliverables: DOM content mapping, chapter copy, Links/Lab/Profile entry points và route transitions.
  - Acceptance: Nội dung chính vẫn semantic DOM; mỗi chapter có vai trò rõ ràng; site vẫn usable nếu WebGL bị vô hiệu hóa.

- [ ] **TASK-034 — Advanced materials, shaders and cinematic polish**
  - Goal: Nâng chất lượng hình ảnh sau khi toàn bộ world đã ổn định.
  - Read: `docs/design/WORLD_JOURNEY.md`, World Journey architecture
  - Skills: `threejs-shaders`, `threejs-materials`, `threejs-lighting`, `threejs-postprocessing`, `threejs-textures`
  - Deliverables: Shader/material polish, atmosphere/fog, water/crystal treatment, restrained postprocessing và chapter color grading.
  - Acceptance: Hiệu ứng chỉ được thêm khi tạo khác biệt rõ ràng; không phá performance budget; mỗi effect có fallback hoặc degraded state hợp lý.

## Phase 9 — Adaptation & Release

- [ ] **TASK-035 — Adapt World Journey for mobile, reduced motion and fallback**
  - Goal: Tạo phiên bản trải nghiệm phù hợp cho thiết bị yếu và người dùng giảm chuyển động.
  - Read: `docs/design/WORLD_JOURNEY.md`, `docs/DESIGN_SYSTEM.md`, World Journey architecture
  - Skills: `threejs-fundamentals`, `threejs-animation`, `gsap-performance`, `web-design-guidelines`
  - Deliverables: Mobile camera/framing, reduced scene complexity, reduced-motion path và non-WebGL fallback.
  - Acceptance: Mobile không chỉ là desktop thu nhỏ; native scrolling ổn định; reduced-motion không chạy choreography nặng; nội dung vẫn hoàn chỉnh khi WebGL không khả dụng.

- [ ] **TASK-036 — World Journey performance and production release audit**
  - Goal: Chốt production baseline mới sau khi World Journey hoàn thiện.
  - Read: World Journey architecture, `docs/ARCHITECTURE.md`
  - Skills: `vercel-react-best-practices`, `gsap-performance`, relevant `threejs-*`
  - Deliverables: Bundle/GPU/memory/lifecycle audit, asset audit, production build, route regression và final fixes.
  - Acceptance: Production build pass; không Canvas/listener/timeline leak; asset/code route-scoped; mobile/desktop stable; fallback hoạt động; không có release-blocking runtime/hydration error.
