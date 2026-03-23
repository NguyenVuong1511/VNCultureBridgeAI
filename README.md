# 🇻🇳 VNCultureBridge AI

## 📌 Giới thiệu

**VNCultureBridge AI** là nền tảng web thông minh giúp **giới thiệu và giải thích văn hoá Việt Nam cho người nước ngoài** thông qua hệ thống tri thức có cấu trúc kết hợp với **AI Chatbot**.

Hệ thống không chỉ cung cấp thông tin mà còn giúp người dùng **hiểu sâu ý nghĩa văn hoá, bối cảnh và giá trị truyền thống**, thay vì chỉ đọc mô tả đơn thuần.

---

## 🎯 Mục tiêu hệ thống

* Xây dựng kho tri thức văn hoá Việt Nam có cấu trúc, song ngữ (Việt – Anh)
* Hỗ trợ khám phá văn hoá theo:

  * Vùng miền
  * Dân tộc
  * Chủ đề
* Tích hợp AI Chatbot để:

  * Giải thích văn hoá theo ngữ cảnh
  * Trả lời câu hỏi tự nhiên
* Đảm bảo AI trả lời dựa trên **dữ liệu đã kiểm duyệt (RAG)**
* Hỗ trợ quản trị nội dung và cải tiến hệ thống liên tục

---

## 🌍 Bối cảnh & Bài toán

Hiện nay:

* Nội dung văn hoá trên internet còn rời rạc, thiếu chiều sâu
* Người nước ngoài khó hiểu đúng ý nghĩa phong tục Việt Nam
* AI hiện tại dễ “ảo giác” nếu không kiểm soát dữ liệu

👉 Bài toán:

> Xây dựng một hệ thống vừa **lưu trữ tri thức**, vừa **giải thích thông minh**, nhưng vẫn **đảm bảo độ tin cậy học thuật**

---

## 🚀 Tính năng chính

### 👤 Dành cho người dùng (Guest)

* 🌏 Khám phá văn hoá qua bản đồ tương tác
* 📚 Tra cứu theo danh mục (lễ hội, ẩm thực, tín ngưỡng…)
* 🔍 Tìm kiếm theo từ khoá & ngữ nghĩa
* 🌐 Chuyển đổi ngôn ngữ Việt – Anh
* 📖 Xem bài viết chi tiết (ý nghĩa, nguồn gốc, bối cảnh)
* 🤖 Hỏi đáp với AI Chatbot
* 💡 Nhận gợi ý nội dung liên quan
* ⭐ Gửi phản hồi đánh giá

---

### 🤖 AI Chatbot

* Nhận diện ngôn ngữ (Việt / Anh)
* Phân tích ý định câu hỏi
* Truy xuất dữ liệu từ kho tri thức (RAG)
* Sinh câu trả lời tự nhiên, dễ hiểu
* Giải thích sâu về:

  * Ý nghĩa văn hoá
  * Nguồn gốc
  * Sự khác biệt vùng miền
* Gợi ý nội dung liên quan
* Ghi log câu hỏi & phát hiện thiếu dữ liệu

---

### 🛠️ Quản trị viên (Admin)

* Quản lý bài viết (CRUD, xuất bản, ẩn)
* Quản lý:

  * Danh mục
  * Vùng miền
  * Dân tộc
  * Thẻ & từ khoá
* Quản lý media (ảnh, video)
* Kiểm duyệt nội dung trước khi công khai
* Đồng bộ dữ liệu sang AI (vector database)
* Theo dõi dashboard:

  * Lượt truy cập
  * Câu hỏi AI
  * Nội dung thiếu
* Quản lý phản hồi người dùng

---

## 🧠 Kiến trúc tri thức

Hệ thống tổ chức dữ liệu theo các thực thể chính:

* 📄 Bài viết văn hoá
* 🗂️ Danh mục chủ đề
* 🗺️ Vùng miền
* 🧑‍🤝‍🧑 Dân tộc
* 🏷️ Thẻ & từ khoá
* 🖼️ Media
* ❓ Câu hỏi người dùng
* ⭐ Phản hồi đánh giá

---

## 🔄 Quy trình chính

### 1. Tra cứu nội dung

1. Người dùng chọn vùng / danh mục
2. Hệ thống trả danh sách bài viết
3. Hiển thị nội dung + media
4. Gợi ý nội dung liên quan

### 2. Hỏi đáp AI

1. Người dùng nhập câu hỏi
2. AI phân tích & truy xuất dữ liệu
3. Sinh câu trả lời
4. Gợi ý thêm nội dung liên quan

### 3. Cập nhật nội dung

1. Admin tạo / sửa bài viết
2. Kiểm duyệt
3. Xuất bản
4. Đồng bộ sang AI (vector hóa)

---

## 📏 Quy tắc hệ thống (Business Rules)

* Nội dung phải **được kiểm duyệt trước khi hiển thị**
* AI chỉ trả lời dựa trên dữ liệu nội bộ
* Mọi bài viết phải:

  * Có danh mục
  * Có vùng miền hoặc dân tộc
  * Có song ngữ Việt – Anh
* Nếu thiếu dữ liệu → AI phải trả lời trung thực
* Nội dung nhạy cảm cần kiểm duyệt chặt

---

## ⚙️ Yêu cầu phi chức năng

* ✅ Độ chính xác cao (tránh sai lệch văn hoá)
* ⚡ Hiệu năng nhanh
* 🌐 Quốc tế hoá tốt
* 🔒 Bảo mật hệ thống
* 📈 Khả năng mở rộng
* 🤖 AI đáng tin cậy (giảm hallucination)

---

## 📊 Chỉ số đánh giá (KPIs)

* Tỷ lệ bài viết đủ song ngữ
* Tỷ lệ phản hồi AI hữu ích
* Thời gian phản hồi AI
* Tỷ lệ tìm kiếm thành công
* Mức độ hài lòng người dùng

---

## 💡 Điểm nổi bật

* Kết hợp **CMS + AI Chatbot**
* Sử dụng **RAG (Retrieval-Augmented Generation)**
* Tổ chức tri thức đa chiều (vùng miền – dân tộc – chủ đề)
* Hướng tới **người dùng quốc tế**
* Có khả năng mở rộng sang các ứng dụng AI văn hoá khác

---

## 🌏 Giá trị mang lại

* Giúp người nước ngoài hiểu đúng văn hoá Việt Nam
* Hỗ trợ giáo dục & nghiên cứu
* Quảng bá văn hoá bằng công nghệ
* Tạo nền tảng dữ liệu cho AI trong lĩnh vực nhân văn số

---

## 📚 Kết luận

VNCultureBridge AI không chỉ là website thông tin mà là một **nền tảng tri thức số thông minh**, kết hợp giữa:

* dữ liệu văn hoá đã kiểm duyệt
* và AI có kiểm soát

👉 Nhằm truyền tải văn hoá Việt Nam **một cách chính xác, trực quan và có chiều sâu** tới cộng đồng quốc tế.

---
