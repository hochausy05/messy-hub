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
