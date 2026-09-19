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
