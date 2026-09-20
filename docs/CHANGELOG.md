# Nhật ký thay đổi

## 2026-09-18 — Thiết lập nền tảng dự án và tài liệu lõi

- **Trạng thái:** Hoàn thành
- **Thay đổi:** Khởi tạo nền tảng Next.js, tạo cấu trúc thư mục dự kiến, cài bộ skill phục vụ UI/UX, React, GSAP và Three.js; chốt PRD, kiến trúc kỹ thuật và nền tảng design system; bổ sung bộ tài liệu vận hành cho agent và roadmap/task backlog.
- **Tệp:** `docs/PRD.md`, `docs/ARCHITECTURE.md`, `docs/DESIGN_SYSTEM.md`, `AGENTS.md`, `PLAN.md`, `TASKS.md`, `docs/CHANGELOG.md`
- **Kiểm tra:** Project Next.js đã chạy được ở môi trường phát triển; phạm vi MVP và ranh giới kiến trúc/design đã được rà soát trong quá trình setup.
- **Ghi chú:** Chưa bắt đầu triển khai tính năng ứng dụng của MVP.

## 2026-09-18 — TASK-003: Làm sạch giao diện khởi đầu và thiết lập nền tảng toàn cục

- **Thay đổi:** Gỡ giao diện demo Next.js, giữ trang gốc tối giản, loại bỏ font khởi tạo và thiết lập nền CSS trung tính theo cấu trúc token Primitive → Semantic → Component.
- **Tệp:** `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `TASKS.md`, `docs/CHANGELOG.md`
- **Kiểm tra:** `npm run build`, `npx eslint src/app/layout.tsx src/app/page.tsx`, chạy dev và xác nhận `/` trả HTTP 200; rà soát không còn nội dung demo mặc định. `npm run lint` còn lỗi có sẵn trong `.agents/skills/**`.

## 2026-09-18 — TASK-004: Tạo shell dùng chung và nền tảng khả năng tiếp cận

- **Thay đổi:** Thêm `SiteShell` với vùng `<main>` ổn định và các điểm mở rộng header/footer tùy chọn; thêm skip link native có thể truy cập bằng bàn phím và đưa focus đến nội dung chính.
- **Tệp:** `src/components/layout/site-shell.tsx`, `src/components/layout/skip-link.tsx`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `TASKS.md`, `docs/CHANGELOG.md`
- **Kiểm tra:** `npm run build`, lint các tệp nguồn đã sửa, dev server trả `/` HTTP 200; Tab đến skip link và Enter chuyển focus đến `main-content`. `npm run lint` còn lỗi có sẵn trong `.agents/skills/**`.

## 2026-09-18 — TASK-005: Tạo điều hướng chính và nền tảng route

- **Thay đổi:** Thêm điều hướng nội bộ dùng chung cho Home, Links, Lab và Profile; tích hợp vào `SiteShell`; tạo nền tảng tối giản cho ba route MVP và trạng thái `aria-current` theo route hiện tại.
- **Tệp:** `src/components/navigation/primary-navigation.tsx`, `src/app/layout.tsx`, `src/app/globals.css`, `src/app/links/page.tsx`, `src/app/lab/page.tsx`, `src/app/profile/page.tsx`, `TASKS.md`, `docs/CHANGELOG.md`
- **Kiểm tra:** `npm run build`, lint các tệp nguồn đã sửa, bốn route trả HTTP 200; điều hướng bằng trình duyệt đến `/links`, kiểm tra trạng thái route hiện tại, và xác nhận skip link vẫn chuyển focus đến `main-content`. Không thêm dependency; `npm run lint` vẫn có lỗi có sẵn trong `.agents/skills/**`.

## 2026-09-18 — TASK-006: Bổ sung hợp đồng content và data

- **Thay đổi:** Thêm các type dùng chung cho navigation, link destination, lab experiment và profile; tập trung dữ liệu navigation; tạo các nguồn dữ liệu links, lab và profile rỗng, không chứa thông tin cá nhân chưa được cung cấp.
- **Tệp:** `src/types/content.ts`, `src/data/navigation.ts`, `src/content/links/index.ts`, `src/content/lab/index.ts`, `src/content/profile/index.ts`, `src/components/navigation/primary-navigation.tsx`, `TASKS.md`, `docs/CHANGELOG.md`
- **Kiểm tra:** `npm run build`, lint các tệp nguồn đã sửa, bốn route trả HTTP 200, navigation và `aria-current` được kiểm tra; xác nhận không có URL hoặc dữ liệu cá nhân được phát minh. `npm run lint` vẫn có lỗi có sẵn trong `.agents/skills/**`.

## 2026-09-18 — TASK-007: Xây dựng bố cục DOM-first cho trang Home

- **Thay đổi:** Thiết kế và triển khai bố cục hoàn chỉnh cho trang Home (`/`) theo hướng tiếp cận DOM-first semantic; tạo `HomeHero` với tiêu đề chính, tuyên bố mục đích và panel định hướng bất đối xứng; tạo `HomeDestinations` và component tái sử dụng `DestinationEntry` kết nối trực tiếp đến 3 phân vùng chính (`/links`, `/lab`, `/profile`); tạo `HomeOverview` giải thích kiến trúc không gian cá nhân; bổ sung `SiteFooter` vào `SiteShell`; thiết lập bảng token trung tính thử nghiệm (exploratory baseline) với độ tương phản cao và trạng thái focus rõ ràng; cập nhật kiểu `HubDestination` và dữ liệu điều hướng tập trung.
- **Tệp:** `src/types/content.ts`, `src/data/navigation.ts`, `src/app/globals.css`, `src/components/ui/section-frame.tsx`, `src/components/ui/destination-entry.tsx`, `src/components/sections/home-hero.tsx`, `src/components/sections/home-destinations.tsx`, `src/components/sections/home-overview.tsx`, `src/components/layout/site-footer.tsx`, `src/app/layout.tsx`, `src/app/page.tsx`, `TASKS.md`, `docs/CHANGELOG.md`
- **Kiểm tra:** `npm run build` thành công; `npx eslint src/` không có lỗi; kiểm tra thực tế bằng trình duyệt subagent với viewport desktop (1280x800) và mobile (375x667) không bị tràn ngang; kiểm tra bàn phím qua Tab/skip-link hoạt động mượt mà; các route trả HTTP 200; không thêm GSAP/Three.js, không thêm dependency và không tự tạo thông tin cá nhân giả. `npm run lint` còn lỗi có sẵn trong `.agents/skills/**`.

## 2026-09-18 — TASK-008: Bổ sung nền tảng chuyển động (motion foundation) cho trang Home

- **Thay đổi:** Cài đặt tối thiểu hai gói `gsap` và `@gsap/react`; thiết lập các thông số thời gian và easing tập trung trong `src/lib/animation/motion-presets.ts`; tạo client component `HomeMotionWrapper` quản lý vòng đời chuyển động GSAP, ngữ cảnh scoped ref và xử lý tự động dọn dẹp (cleanup) khi chuyển route; tích hợp chuỗi chuyển động xuất hiện (entrance sequence) theo trật tự thị giác không làm ẩn nội dung SSR gốc; hỗ trợ tương tác hover/focus tinh tế cho thẻ điểm đến trên thiết bị con trỏ chính xác; tuân thủ triệt để chế độ `prefers-reduced-motion: reduce` (loại bỏ độ trễ và dịch chuyển vị trí); bổ sung `will-change` có điều kiện trong `globals.css`.
- **Tệp:** `package.json`, `package-lock.json`, `src/lib/animation/motion-presets.ts`, `src/components/motion/home-motion-wrapper.tsx`, `src/components/sections/home-hero.tsx`, `src/components/sections/home-destinations.tsx`, `src/components/ui/destination-entry.tsx`, `src/components/sections/home-overview.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `TASKS.md`, `docs/CHANGELOG.md`
- **Kiểm tra:** `npm run build` thành công; `npx eslint src/` không có lỗi; kiểm tra thực tế bằng trình duyệt subagent xác nhận hiệu ứng xuất hiện chạy mượt mà, điều hướng qua lại giữa các route (`/` -> `/links` -> `/`) dọn dẹp sạch sẽ không sinh duplicate timeline hay rò rỉ listener; bàn phím và skip-link hoạt động bình thường; không thêm Three.js/WebGL hay dependency ngoài luồng. `npm run lint` còn lỗi có sẵn trong `.agents/skills/**`.

## 2026-09-19 — TASK-009: Bổ sung lớp trải nghiệm 3D Three.js tùy chọn cho trang Home

- **Thay đổi:** Cài đặt các gói `three`, `@react-three/fiber`, `@react-three/drei` và `@types/three`; tạo cấu trúc 3D route-scoped gồm `HomeCanvas`, `HomeScene`, `HubSystem` (mô hình không gian trừu tượng thể hiện lõi hub và 3 node vệ tinh đại diện cho Links, Lab, Profile); đóng gói biên giới nạp động lười (lazy boundary) với kiểm tra hỗ trợ WebGL và `CanvasErrorBoundary` trong `HomeCanvasBoundary`; thiết kế bản vẽ vector tĩnh `HomeCanvasFallback` dự phòng không gây gián đoạn bố cục; tích hợp hook `useReducedMotion` với `useSyncExternalStore` để triệt tiêu chuyển động quay và hiệu ứng thị sai khi người dùng bật giảm chuyển động; tích hợp khung nhìn 3D có giới hạn kích thước vào khu vực định hướng của `HomeHero` mà không che khuất hay thay thế nội dung DOM ngữ nghĩa.
- **Tệp:** `package.json`, `package-lock.json`, `src/hooks/use-reduced-motion.ts`, `src/components/three/canvas/home-canvas-fallback.tsx`, `src/components/three/objects/hub-system.tsx`, `src/components/three/scenes/home-scene.tsx`, `src/components/three/canvas/home-canvas.tsx`, `src/components/three/canvas/home-canvas-boundary.tsx`, `src/components/sections/home-hero.tsx`, `src/components/ui/section-frame.tsx`, `TASKS.md`, `docs/CHANGELOG.md`
- **Kiểm tra:** `npm run build` thành công; `npx eslint src/` không có lỗi; kiểm tra thực tế bằng trình duyệt subagent xác nhận canvas nạp mượt mà, không có lỗi hydration hay console error, canvas dọn dẹp và khởi tạo lại sạch sẽ khi chuyển qua lại giữa các route (`/` -> `/links` -> `/`); bàn phím và skip-link hoạt động bình thường, canvas được đánh dấu trang trí (`aria-hidden="true"`, `tabIndex={-1}`) không cản trở tương tác; không thêm shader hay thư viện ngoài luồng. `npm run lint` còn lỗi có sẵn trong `.agents/skills/**`.

## 2026-09-19 — TASK-010: Hoàn thiện nguồn dữ liệu Links có cấu trúc

- **Thay đổi:** Xác nhận nguồn dữ liệu Links có cấu trúc và chuyển dataset sang kiểm tra kiểu tĩnh bằng `satisfies`; giữ dataset external rỗng vì chưa có đích đến được chủ sở hữu phê duyệt.
- **Tệp:** `src/content/links/index.ts`, `TASKS.md`, `docs/CHANGELOG.md`
- **Kiểm tra:** Đã kiểm tra build, lint có mục tiêu và xác nhận không thêm dependency, không tạo UI Links hoặc URL chưa được cung cấp.

## 2026-09-19 — TASK-011: Xây dựng danh mục thị giác Links (visual directory)

- **Thay đổi:** Thiết kế và triển khai bố cục hoàn chỉnh cho route `/links` dựa trên cấu trúc DOM-first ngữ nghĩa; tạo component tái sử dụng `DestinationCard` hỗ trợ phân biệt rõ ràng đích đến nội bộ (Next.js Link) và bên ngoài (`target="_blank"`, `rel="noreferrer noopener"`, nhãn phân biệt có chỉ báo trực quan và văn bản trợ năng) mà không phụ thuộc vào hover; tạo `LinksHeader` với tiêu đề chính H1 và nội dung định hướng; xây dựng `LinksDirectory` đọc nguồn dữ liệu chuẩn `linkDestinations` và tự động thích ứng với 0, ít hoặc nhiều liên kết; thiết kế `LinksEmptyState` tinh tế và liền mạch khi dataset chưa có liên kết nào được phê duyệt; đảm bảo bố cục co giãn mượt mà giữa mobile (375px) và desktop (1280px) không tràn viền ngang; hỗ trợ điều hướng bàn phím Tab với vòng focus rõ ràng và đạt chuẩn tương tác chạm tối thiểu 44px.
- **Tệp:** `src/components/ui/destination-card.tsx`, `src/components/sections/links/links-header.tsx`, `src/components/sections/links/links-empty-state.tsx`, `src/components/sections/links/links-directory.tsx`, `src/app/links/page.tsx`, `TASKS.md`, `docs/CHANGELOG.md`
- **Kiểm tra:** `npm run build` thành công; `npx eslint src/` không có lỗi; kiểm tra thực tế bằng trình duyệt subagent xác nhận `/links` trả HTTP 200, hiển thị trạng thái empty state chuẩn mực và điều hướng Tab/skip-link hoạt động tốt; kiểm tra giả lập dữ liệu xác nhận thẻ hiển thị chuẩn, phân biệt nội bộ/ngoài trực quan và co giãn tốt trên mobile 375px mà không bị tràn ngang; khôi phục nguồn dữ liệu chuẩn về trạng thái rỗng không tự ý tạo liên kết giả; không thêm GSAP, Three.js hay dependency mới. `npm run lint` còn lỗi có sẵn trong `.agents/skills/**`.

## 2026-09-19 — TASK-012: Hoàn thiện tương tác vi mô cho các thẻ đích đến Links

- **Thay đổi:** Nâng cấp tương tác vi mô cho `DestinationCard` bằng GSAP và CSS với ranh giới Client Component cục bộ; sử dụng `useGSAP` và `gsap.matchMedia` giới hạn chuyển động nhấc thẻ (`y: -3px`) và dịch chuyển mũi tên định hướng (ngang cho nội bộ, chéo cho bên ngoài) riêng trên thiết bị con trỏ chính xác có hỗ trợ hover (`hover: hover and pointer: fine`); đồng bộ hiệu ứng nhấc thẻ và dịch chuyển mũi tên khi focus bằng bàn phím (Tab) kết hợp vòng focus tương phản cao; hỗ trợ tương tác chạm/nhấn tức thì qua CSS `:active` không gây kẹt trạng thái hover trên màn hình cảm ứng; tuân thủ triệt để `prefers-reduced-motion: reduce` (xóa toàn bộ transform, chỉ giữ highlight màu nền/viền tĩnh); xử lý dọn dẹp listener và timeline tự động khi unmount hoặc chuyển route; giữ nguyên `LinksDirectory`, `LinksHeader`, `LinksEmptyState` và trang `/links` là Server Components.
- **Tệp:** `src/components/ui/destination-card.tsx`, `TASKS.md`, `docs/CHANGELOG.md`
- **Kiểm tra:** `npm run build` thành công; `npx eslint src/` không có lỗi; kiểm tra thực tế bằng trình duyệt subagent xác nhận hiệu ứng hover và Tab focus mượt mà, phản hồi mũi tên chính xác theo loại liên kết, điều hướng vòng qua `/` và trở lại `/links` không sinh lỗi console hay hydration; kiểm tra màn hình mobile 375px không tràn viền ngang và cuộn trang tự nhiên; khôi phục dataset thật về trạng thái rỗng; không thêm dependency hay Three.js. `npm run lint` còn lỗi có sẵn trong `.agents/skills/**`.

## 2026-09-19 — TASK-013: Thiết lập registry và trang chỉ mục Lab

- **Thay đổi:** Xây dựng cấu trúc registry chuẩn và trang chỉ mục `/lab` có khả năng mở rộng cho Messy Hub; mở rộng kiểu `LabExperiment` trong `src/types/content.ts` với các trường định danh, danh mục (`ui`, `motion`, `three`, `shader`), trạng thái (`active`, `prototype`, `archived`, `planned`), `slug` và `href`; tạo nguồn dữ liệu thẩm quyền duy nhất trong `src/content/lab/index.ts` đi kèm helper `getExperimentHref` và `isExperimentOpenable`, giữ mảng rỗng theo đúng nguyên tắc không bịa đặt thử nghiệm; tạo `LabHeader` với ngữ nghĩa H1 duy nhất, mô tả định hướng và nhãn các mảng thử nghiệm; tạo component tái sử dụng `LabExperimentCard` phân biệt rõ ràng thử nghiệm có thể mở được (Link) và thử nghiệm dự kiến (thẻ bài viết tĩnh không tạo liên kết lỗi 404); xây dựng `LabEmptyState` chỉn chu giới thiệu 4 mảng thử nghiệm của phòng lab và nút chuyển hướng về Home/Links; xây dựng `LabRegistry` đọc từ dataset và render lưới co giãn thích ứng từ 0 đến nhiều thử nghiệm; tích hợp bố cục vào `src/app/lab/page.tsx` hoàn toàn dưới dạng Server Components, không thêm GSAP, Three.js hay thư viện ngoài.
- **Tệp:** `src/types/content.ts`, `src/content/lab/index.ts`, `src/components/sections/lab/lab-header.tsx`, `src/components/sections/lab/lab-empty-state.tsx`, `src/components/sections/lab/lab-experiment-card.tsx`, `src/components/sections/lab/lab-registry.tsx`, `src/app/lab/page.tsx`, `TASKS.md`, `docs/CHANGELOG.md`
- **Kiểm tra:** `npm run build` thành công, các route được prerender tĩnh; `npx eslint` có mục tiêu đạt 0 lỗi; kiểm tra thực tế bằng trình duyệt subagent tại các độ phân giải 375x700 và 1280x800 xác nhận không tràn viền ngang, H1 chuẩn ngữ nghĩa, banner trạng thái và 4 khối định hướng hiển thị rõ ràng, phím Tab và skip-link hoạt động tốt; kiểm tra giả lập dữ liệu xác nhận thẻ hiển thị và phân loại đúng trạng thái trước khi khôi phục về mảng rỗng; không thêm dependency mới.

## 2026-09-19 — TASK-014: Thiết lập ranh giới route cô lập cho Lab experiment

- **Thay đổi:** Tạo route động `/lab/[slug]` phân giải metadata từ registry Lab thẩm quyền, mapping implementation kiểu tường minh chỉ được route experiment sử dụng, cùng `ExperimentFrame`; bổ sung loading, not-found và error boundary cục bộ; giữ registry rỗng, không tạo experiment giả và không đưa mã nặng vào `/lab` hoặc site shell.
- **Tệp:** `src/app/lab/[slug]/page.tsx`, `src/app/lab/[slug]/loading.tsx`, `src/app/lab/[slug]/not-found.tsx`, `src/app/lab/[slug]/error.tsx`, `src/components/lab/experiment-frame.tsx`, `src/content/lab/index.ts`, `src/experiments/index.ts`, `TASKS.md`, `docs/CHANGELOG.md`
- **Kiểm tra:** `npm run build` thành công; ESLint có mục tiêu cho các tệp sửa đổi không có lỗi; `/lab` trả HTTP 200; slug chưa đăng ký đi qua not-found boundary cục bộ với `noindex`; không thêm dependency, không thêm GSAP/Three.js/shader experiment.


## 2026-09-19 — TASK-015: Hoàn thiện thử nghiệm Kinetic Focus Grid

- **Thay đổi:** Đăng ký thử nghiệm thật đầu tiên với danh mục `motion`, trạng thái `active`, mở tại `/lab/kinetic-focus-grid` qua registry và kiến trúc TASK-014. Tạo lưới 8 ô DOM thích ứng, phản hồi phân cấp và khoảng cách bằng GSAP khi hover/focus, hỗ trợ giữ/xóa lựa chọn bằng chuột, bàn phím hoặc chạm; dùng thông số chuyển động chung, dọn dẹp ngữ cảnh khi rời route và tắt nạp trước trên thẻ Lab. Không thêm thư viện, Three.js, WebGL hay shader.
- **Tệp:** `src/experiments/kinetic-focus-grid/kinetic-focus-grid.tsx`, `src/experiments/kinetic-focus-grid/kinetic-focus-grid.module.css`, `src/content/lab/index.ts`, `src/experiments/index.ts`, `src/components/sections/lab/lab-experiment-card.tsx`, `TASKS.md`, `docs/CHANGELOG.md`.
- **Kiểm tra tự động:** `npm run build` và ESLint có mục tiêu đạt; năm route liên quan trả HTTP 200; mã thử nghiệm chỉ được tải tại route riêng. Kiểm tra trình duyệt đạt với hover, bàn phím, bố cục 375/768/1280px, điều hướng Lab lặp lại và hồi quy Home/Links/Profile; lựa chọn được đặt lại, không ghi nhận lỗi ứng dụng hay hydration.
- **Chủ sở hữu xác nhận thủ công:** Trên thiết bị cảm ứng ở khoảng 375px, cuộn tự nhiên, không kẹt hover, không tràn ngang và phản hồi lựa chọn tĩnh hoạt động đúng. Với `prefers-reduced-motion: reduce`, loại bỏ xuất hiện so le và chuyển động không gian; bố cục/nội dung hiện ngay, trạng thái focus/lựa chọn tĩnh rõ ràng và thử nghiệm vẫn sử dụng đầy đủ.

## 2026-09-19 — TASK-016: Hoàn thiện thử nghiệm Spatial Node Field

- **Thay đổi:** Đăng ký thử nghiệm thật thứ hai với danh mục `three`, trạng thái `active`, mở tại `/lab/spatial-node-field` thông qua registry Lab thẩm quyền và kiến trúc nạp lười cô lập (isolated lazy-loading) tại `src/experiments/experiment-entries.tsx` giúp cả hai thử nghiệm Lab tải riêng biệt, không kéo chéo mã của nhau và không làm nặng trang `/lab` hay shell chung. Triển khai cảnh Three.js/R3F gồm lõi icosahedron trung tâm cố định cùng 6 node octahedron bao quanh ở các độ sâu khác nhau; hỗ trợ phản hồi khoảng cách con trỏ (pointer proximity interaction) có giới hạn (nhấc nhẹ, tăng kích thước, sáng dần và tự giảm chấn dừng lại nhờ `frameloop="demand"`); góc nhìn camera cố định ổn định; tích hợp ranh giới dự phòng tĩnh SVG (`FieldFallback`) qua `FieldErrorBoundary` khi thiếu WebGL2 hoặc mất ngữ cảnh; tích hợp kiểm soát `prefers-reduced-motion: reduce` triệt tiêu chuyển động không gian và chuyển động quay; dọn dẹp đầy đủ ngữ cảnh WebGL, observer và listener sự kiện khi rời route. Không thêm dependency, shader, hậu kỳ hay mô hình 3D bên ngoài.
- **Tệp:** `src/content/lab/index.ts`, `src/experiments/index.ts`, `src/experiments/experiment-entries.tsx`, `src/experiments/spatial-node-field/field-layout.ts`, `src/experiments/spatial-node-field/spatial-node-field.module.css`, `src/experiments/spatial-node-field/spatial-node-field.tsx`, `src/experiments/spatial-node-field/spatial-node-scene.tsx`, `TASKS.md`, `docs/CHANGELOG.md`.
- **Kiểm tra tự động:** `npm run build` và ESLint có mục tiêu trên toàn bộ mã nguồn `src/` đạt 0 lỗi, 0 cảnh báo; toàn bộ các route trả về HTTP 200; kiểm tra bundle xác nhận `/lab` không tải mã thử nghiệm, `/lab/kinetic-focus-grid` chỉ nạp chunk của Kinetic Focus Grid và `/lab/spatial-node-field` chỉ nạp chunk của Spatial Node Field; kiểm tra trình duyệt qua subagent xác nhận phản hồi con trỏ mượt mà, bố cục co giãn tốt trên 375px/desktop không tràn viền ngang, điều hướng vòng lặp chuyển đổi giữa các thử nghiệm và dọn dẹp canvas/context WebGL hoàn toàn sạch sẽ, không lỗi console hay hydration.
- **Chủ sở hữu xác nhận thủ công:** Trên thiết bị cảm ứng ở độ rộng mobile, cuộn trang native hoạt động bình thường, Canvas không chiếm quyền cuộn, không kẹt trạng thái hover giả lập, không tràn ngang và khung cảnh ổn định. Với `prefers-reduced-motion: reduce` từ hệ điều hành, toàn bộ chuyển động không gian theo con trỏ và chuyển động liên tục được vô hiệu hóa, camera giữ nguyên vị trí, khung cảnh tĩnh hiển thị trực quan và nhãn gợi ý giảm chuyển động hiển thị chính xác.

## 2026-09-20 — TASK-017

- **Thay đổi:** Hoàn thiện mô hình nội dung Profile kiểu hóa, gọn và độc lập với phần trình bày; bổ sung cấu trúc liên kết nội bộ/bên ngoài có mã ổn định. Nguồn nội dung thẩm quyền nằm tại `src/content/profile/index.ts` và hiện được chủ ý giữ trống vì chưa có thông tin cá nhân nào được chủ sở hữu phê duyệt.
- **Tệp:** `src/types/content.ts`, `src/content/profile/index.ts`, `TASKS.md`, `docs/CHANGELOG.md`.
- **Kiểm tra:** `npm run build` và ESLint có mục tiêu trên các tệp nguồn đã sửa đều đạt; các route `/`, `/links`, `/lab` và `/profile` đều trả về HTTP 200; không thêm dependency, dữ liệu cá nhân hay liên kết giả.

## 2026-09-20 — TASK-018

- **Thay đổi:** Bổ sung tên hiển thị và tiểu sử đã được chủ sở hữu phê duyệt vào nguồn `src/content/profile/index.ts`; xây dựng trang `/profile` tĩnh, điềm tĩnh và ưu tiên nội dung với khối giới thiệu cùng khung nhận diện chữ trừu tượng, không biến trang thành sơ yếu lý lịch.
- **Thành phần:** Thêm `ProfileIntro` và `ProfileLinks`; khối liên kết tự động được lược bỏ hoàn toàn khi danh sách rỗng. Các liên kết Profile hiện vẫn rỗng vì chủ sở hữu chưa cung cấp.
- **Khả dụng:** Bố cục một cột ở màn hình 375px và hai cột cân bằng ở 1280px, không tràn ngang; duy trì đúng một tiêu đề cấp một, cấu trúc ngữ nghĩa, liên kết bỏ qua nội dung, điều hướng bàn phím và trạng thái tập trung rõ ràng.
- **Tệp:** `src/app/profile/page.tsx`, `src/content/profile/index.ts`, `src/components/sections/profile/profile-intro.tsx`, `src/components/sections/profile/profile-links.tsx`, `TASKS.md`, `docs/CHANGELOG.md`.
- **Kiểm tra:** `npm run build`, ESLint có mục tiêu và rà soát giao diện theo hướng dẫn web đều đạt; kiểm thử trình duyệt xác nhận `/profile` cùng toàn bộ route hồi quy được yêu cầu trả về HTTP 200, không có lỗi console từ ứng dụng, không thêm GSAP, Three.js hay dependency mới.

## 2026-09-20 — TASK-019

- **Phạm vi:** Rà soát toàn bộ route MVP `/`, `/links`, `/lab`, `/profile`, hai route thử nghiệm và trạng thái Lab không tồn tại ở các độ rộng 375px, 768px và 1280px; kiểm tra ngữ nghĩa, bàn phím, tiêu điểm, cảm ứng, giảm chuyển động và vòng đời khi chuyển route.
- **Vấn đề và sửa lỗi:** Loại bỏ landmark `main` lồng nhau ở route thử nghiệm; mở rộng mục tiêu điều hướng đầu và chân trang lên tối thiểu 44×44px; bảo đảm nội dung Home hiện ngay khi bàn phím đưa tiêu điểm vào trong lúc timeline đang chạy; đánh dấu Lab là route hiện tại trên các route con; giới hạn chuyển tiếp thẻ Lab vào màu sắc; thêm khoảng cuộn cho ô Kinetic để vòng tiêu điểm không bị cắt.
- **Kết quả:** Không tràn ngang ở 375px, 768px và 1280px; mỗi route có đúng một `h1` và một `main`; liên kết bỏ qua nội dung, thứ tự Tab, trạng thái tiêu điểm và điều khiển Kinetic hoạt động đúng. Chủ sở hữu xác nhận cuộn cảm ứng native, Canvas không chiếm cuộn, không có hover dính, thao tác chạm Kinetic ổn định và các trạng thái `prefers-reduced-motion` của Home, Links, Kinetic Focus Grid, Spatial Node Field cùng điều hướng đều đúng.
- **Vòng đời và kiểm tra:** Chuyển route lặp lại không tạo Canvas trùng, không để lại timeline hay biến đổi cũ và không có lỗi hydration/console từ ứng dụng; `npm run build`, `npm run lint -- src` và `git diff --check` đều đạt.
- **Tệp:** `src/app/globals.css`, `src/components/lab/experiment-frame.tsx`, `src/components/layout/site-footer.tsx`, `src/components/motion/home-motion-wrapper.tsx`, `src/components/navigation/primary-navigation.tsx`, `src/components/sections/lab/lab-experiment-card.tsx`, `src/experiments/kinetic-focus-grid/kinetic-focus-grid.module.css`, `TASKS.md`, `docs/CHANGELOG.md`.
