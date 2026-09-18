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

