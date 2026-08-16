# VLU Entrance Exam Lab

Website luyện thi Tiếng Anh đầu vào dựa trên file đề đã cung cấp.

## Nội dung

- Mock Test theo cấu trúc 4 sections / 56 scored items / 100 marks.
- Question palette, đánh dấu câu cần xem lại, bộ lọc theo section và đồng hồ làm bài.
- Đáp án + giải thích chi tiết bằng tiếng Việt.
- Nhãn độ tin cậy của đáp án: xác minh từ PDF / suy luận / thiếu source passage.
- 23 tab lý thuyết, mỗi tab có subtab **Lý thuyết** và **Bài tập thực hành**.
- Khung Study Guide để ôn theo nhóm dạng bài.
- Responsive cho desktop và mobile.

## Cấu trúc đề

- Section 1: Multiple Choice — 30 marks
- Section 2: Fill in the Blanks — 20 marks
- Section 3: Short Answer — 20 marks
- Section 4: Long Answer — 30 marks

Lưu ý: PDF hiển thị Question 1–53, nhưng Question 21 có 3 sub-items và Question 22 có 2 sub-items. Khi tính riêng 21A–C và 22A–B, tổng số scored items là 56, khớp thông tin đầu đề.

## GitHub Pages

Workflow `.github/workflows/pages.yml` được cấu hình để deploy static site khi push vào `main`.

Nếu Pages chưa được bật cho repository, vào **Settings → Pages → Build and deployment → Source → GitHub Actions** một lần, sau đó chạy lại workflow.

## Source integrity

Một số câu hỏi trong Section 2–4 tham chiếu các passages không xuất hiện trong PDF được cung cấp. Website không tự nhận các phần đó là đáp án chính thức; chúng được đánh dấu rõ là **Suy luận** hoặc **Thiếu source** để tránh học sai từ dữ liệu không có trong nguồn.
