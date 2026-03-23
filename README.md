# CHƯƠNG: PHÂN TÍCH NGHIỆP VỤ HỆ THỐNG VNCultureBridge AI

**Tên đề tài:**  
**Xây dựng VNCultureBridge AI – Web giới thiệu và giải thích phong tục, văn hoá Việt Nam cho người nước ngoài**

---

## 1. Bối cảnh, tính cấp thiết và bài toán nghiệp vụ

### 1.1. Bối cảnh thực tiễn

Trong bối cảnh toàn cầu hoá và hội nhập quốc tế ngày càng sâu rộng, nhu cầu tìm hiểu về văn hoá Việt Nam của người nước ngoài đang tăng lên rõ rệt. Đối tượng quan tâm không chỉ bao gồm khách du lịch mà còn có sinh viên quốc tế, giảng viên, nhà nghiên cứu, người lao động nước ngoài, cộng đồng Việt kiều và những người yêu thích văn hoá châu Á. Họ không chỉ cần biết **“Việt Nam có gì”** mà còn muốn hiểu **“vì sao người Việt lại có những phong tục, tập quán, tín ngưỡng và cách ứng xử như vậy”**.

Tuy nhiên, thực tế cho thấy phần lớn các website hiện nay mới chỉ dừng ở mức:

- Giới thiệu điểm đến hoặc thông tin du lịch
- Mô tả văn hoá ở mức khái quát
- Nội dung phân tán, thiếu hệ thống
- Chưa có cơ chế giải thích chiều sâu về ý nghĩa văn hoá
- Chưa hỗ trợ tốt người dùng quốc tế về mặt ngôn ngữ và ngữ cảnh tiếp nhận

Đặc biệt, nhiều phong tục, lễ hội, tín ngưỡng và biểu tượng văn hoá Việt Nam mang tính ngữ nghĩa sâu, gắn với lịch sử, đời sống tinh thần, niềm tin cộng đồng và khác biệt vùng miền. Những yếu tố này rất khó truyền tải đầy đủ nếu chỉ bằng bài viết tĩnh hoặc bản dịch đơn thuần. Người nước ngoài có thể đọc được nội dung nhưng vẫn chưa chắc hiểu đúng bản chất văn hoá.

### 1.2. Hạn chế của các giải pháp hiện có

Các nền tảng hiện có thường tồn tại một số hạn chế cơ bản:

- Nội dung chưa được tổ chức theo cấu trúc tri thức rõ ràng
- Ít hỗ trợ khám phá văn hoá theo vùng miền, dân tộc, chủ đề
- Khả năng song ngữ còn hạn chế, đặc biệt trong việc truyền đạt sắc thái văn hoá
- Chưa có cơ chế hỏi đáp thông minh giúp giải thích ngữ cảnh văn hoá
- Nếu ứng dụng AI, nhiều hệ thống vẫn để mô hình trả lời tự do, dẫn tới nguy cơ sai lệch thông tin, “ảo giác AI” hoặc diễn giải thiếu căn cứ
- Chưa có quy trình quản trị và kiểm duyệt nội dung đủ chặt để bảo đảm độ tin cậy học thuật

### 1.3. Tính cấp thiết của đề tài

Từ thực tiễn trên, việc xây dựng một nền tảng số chuyên biệt nhằm giới thiệu và giải thích văn hoá Việt Nam cho người nước ngoài là cần thiết cả về mặt học thuật lẫn ứng dụng thực tiễn. Một hệ thống như vậy không chỉ góp phần quảng bá bản sắc dân tộc bằng công nghệ số mà còn tạo nền tảng dữ liệu có giá trị cho giáo dục, nghiên cứu, truyền thông văn hoá và các ứng dụng AI trong lĩnh vực nhân văn số.

### 1.4. Bài toán nghiệp vụ đặt ra

Từ bối cảnh nêu trên, bài toán nghiệp vụ cốt lõi của hệ thống **VNCultureBridge AI** là:

> Xây dựng một nền tảng web thông minh có khả năng số hoá, tổ chức, quản trị, truy xuất và giải thích tri thức văn hoá Việt Nam cho người dùng quốc tế theo hình thức trực quan, song ngữ và có hỗ trợ AI, đồng thời bảo đảm rằng các phản hồi do AI sinh ra luôn bám sát nguồn dữ liệu đã được kiểm duyệt.

Nói cách khác, hệ thống phải giải quyết đồng thời các nhu cầu nghiệp vụ sau:

- Xây dựng kho tri thức văn hoá Việt Nam có cấu trúc, trực quan và song ngữ
- Hỗ trợ người dùng khám phá, tra cứu và học hỏi theo vùng miền, dân tộc, chủ đề
- Cho phép giải thích ngữ nghĩa văn hoá bằng AI Chatbot thay vì chỉ hiển thị thông tin tĩnh
- Kiểm soát chất lượng phản hồi AI bằng cơ chế truy xuất tri thức từ nguồn dữ liệu chuẩn
- Hỗ trợ quản trị viên cập nhật, kiểm duyệt và làm giàu dữ liệu tri thức liên tục

### 1.5. Tính mới của đề tài

So với các website giới thiệu văn hoá thông thường, đề tài có các điểm mới nổi bật:

- Không chỉ cung cấp thông tin văn hoá dạng tĩnh mà còn hỗ trợ giải thích chiều sâu văn hoá theo ngữ cảnh câu hỏi
- Kết hợp quản trị tri thức văn hoá với AI hỏi đáp song ngữ
- Ứng dụng cơ chế **RAG (Retrieval-Augmented Generation)** để tăng độ tin cậy của câu trả lời
- Tổ chức nội dung theo nhiều lớp tri thức như vùng miền, dân tộc, chủ đề, từ khoá, bài viết liên quan
- Hướng tới đối tượng người dùng quốc tế, do đó nhấn mạnh yếu tố quốc tế hoá nội dung và khả năng truyền đạt văn hoá xuyên ngôn ngữ

---

## 2. Mục tiêu của hệ thống

### 2.1. Mục tiêu tổng quát

Xây dựng một nền tảng web thông minh có khả năng giới thiệu, giải thích và đề xuất nội dung văn hoá Việt Nam cho người nước ngoài theo hình thức trực quan, song ngữ và có hỗ trợ AI, qua đó giúp người dùng hiểu đúng, hiểu sâu và tiếp cận dễ dàng hơn với bản sắc văn hoá Việt Nam.

### 2.2. Mục tiêu cụ thể về nghiệp vụ

Hệ thống cần đạt được các mục tiêu cụ thể sau:

- Số hoá và tổ chức dữ liệu văn hoá Việt Nam theo cấu trúc tri thức rõ ràng
- Cung cấp giao diện khám phá văn hoá trực quan dựa trên bản đồ tương tác
- Hỗ trợ người dùng tra cứu nội dung theo vùng miền, dân tộc, danh mục và từ khoá
- Cung cấp nội dung song ngữ Việt – Anh một cách nhất quán
- Tích hợp AI Chatbot có khả năng hỏi đáp tự nhiên và giải thích văn hoá theo ngữ cảnh
- Bảo đảm phản hồi AI dựa trên dữ liệu đã được kiểm duyệt, hạn chế “ảo giác AI”
- Cho phép gợi ý bài viết và chủ đề liên quan để mở rộng trải nghiệm khám phá
- Hỗ trợ quản trị viên quản lý bài viết, media, danh mục, vùng miền, dân tộc và quy trình kiểm duyệt
- Đồng bộ nội dung đã duyệt sang tầng AI thông qua pipeline chuẩn hoá và vector hoá dữ liệu
- Theo dõi thống kê truy cập, hành vi tra cứu và câu hỏi phổ biến để cải thiện hệ thống

### 2.3. Mục tiêu nghiên cứu

Bên cạnh mục tiêu ứng dụng, đề tài còn hướng đến các mục tiêu nghiên cứu:

- Đề xuất mô hình hệ thống kết hợp quản trị tri thức văn hoá và hỏi đáp AI có kiểm soát
- Xây dựng quy trình truy xuất ngữ nghĩa phục vụ giải thích văn hoá cho người dùng quốc tế
- Đánh giá hiệu quả của mô hình về độ chính xác, tính dễ hiểu, tính hữu ích và trải nghiệm người dùng
- Góp phần mở rộng hướng nghiên cứu ứng dụng AI trong lĩnh vực nhân văn số và bảo tồn văn hoá

---

## 3. Phạm vi và ranh giới hệ thống

### 3.1. Phạm vi chức năng

Hệ thống **VNCultureBridge AI** tập trung vào các phạm vi sau:

- Giới thiệu và giải thích văn hoá Việt Nam trên nền tảng web
- Quản lý nội dung văn hoá thông qua hệ quản trị nội dung (CMS)
- Hỗ trợ tra cứu, tìm kiếm và khám phá dữ liệu văn hoá
- Hỗ trợ hỏi đáp AI có kiểm soát bằng dữ liệu nội bộ
- Cung cấp nội dung song ngữ Việt – Anh
- Lưu trữ phản hồi người dùng và dữ liệu phục vụ cải tiến hệ thống

### 3.2. Đối tượng nội dung

Phạm vi nội dung văn hoá có thể bao gồm:

- Lễ hội truyền thống
- Tín ngưỡng và phong tục tập quán
- Ẩm thực vùng miền
- Trang phục truyền thống
- Nghệ thuật dân gian
- Kiến trúc truyền thống
- Biểu tượng văn hoá
- Các nhóm dân tộc và nét đặc trưng văn hoá

### 3.3. Những nội dung ngoài phạm vi

Để bảo đảm tính tập trung của đề tài, hệ thống không đặt mục tiêu giải quyết các bài toán sau:

- Đặt tour du lịch, thương mại điện tử hoặc thanh toán trực tuyến
- Xây dựng mạng xã hội hoặc diễn đàn cộng đồng
- Cung cấp tư vấn pháp lý, chính trị hoặc tôn giáo chuyên sâu
- Cho phép người dùng khách chỉnh sửa trực tiếp nội dung tri thức
- Cho phép AI trả lời hoàn toàn tự do ngoài phạm vi tri thức đã kiểm duyệt

### 3.4. Ranh giới trách nhiệm của hệ thống AI

AI trong hệ thống chỉ đóng vai trò hỗ trợ:

- Giải thích
- Tổng hợp
- Diễn đạt
- Gợi ý nội dung liên quan

trên cơ sở dữ liệu nội bộ đã được chuẩn hoá và kiểm duyệt. AI không thay thế chuyên gia văn hoá, không được tự ý sáng tạo tri thức mới khi không có căn cứ dữ liệu.

---

## 4. Đối tượng sử dụng và vai trò nghiệp vụ

Hệ thống gồm ba nhóm tác nhân chính.

### 4.1. Người dùng khách (Guest / End-user)

Đây là nhóm người dùng cuối của hệ thống, có thể là:

- Người nước ngoài
- Khách du lịch quốc tế
- Sinh viên quốc tế
- Giảng viên, nhà nghiên cứu
- Người yêu thích văn hoá Việt Nam

#### Nhu cầu nghiệp vụ

- Tra cứu và khám phá nội dung văn hoá theo vùng miền, dân tộc, chủ đề
- Xem nội dung song ngữ Việt – Anh
- Tìm kiếm nhanh các khái niệm văn hoá
- Hỏi AI để được giải thích rõ hơn về ý nghĩa, nguồn gốc và bối cảnh văn hoá
- Nhận gợi ý các bài viết liên quan để tiếp tục tìm hiểu
- Gửi phản hồi đánh giá về nội dung và chất lượng trả lời của AI

### 4.2. Quản trị viên nội dung (Admin / Content Manager)

Đây là nhóm người chịu trách nhiệm vận hành kho tri thức của hệ thống.

#### Nhu cầu nghiệp vụ

- Đăng nhập vào hệ quản trị
- Thêm mới, sửa, xoá hoặc cập nhật bài viết văn hoá
- Quản lý danh mục, vùng miền, dân tộc, thẻ và từ khoá
- Quản lý ảnh, video và dữ liệu đa phương tiện
- Kiểm duyệt nội dung trước khi công khai
- Theo dõi dữ liệu thống kê truy cập và hành vi người dùng
- Theo dõi lịch sử câu hỏi AI để phát hiện lỗ hổng tri thức
- Kích hoạt hoặc giám sát quy trình đồng bộ dữ liệu sang tầng AI

### 4.3. Dịch vụ AI (AI Service)

Đây là tác nhân xử lý nghiệp vụ nội bộ, không phải người dùng trực tiếp nhưng có vai trò đặc biệt quan trọng trong hệ thống.

#### Nhiệm vụ nghiệp vụ

- Nhận câu hỏi từ người dùng
- Phát hiện ngôn ngữ và phân tích ý định câu hỏi
- Truy xuất dữ liệu liên quan từ kho tri thức
- Sinh phản hồi ngôn ngữ tự nhiên phù hợp với ngữ cảnh
- Gợi ý các bài viết hoặc chủ đề liên quan
- Ghi log lịch sử hỏi đáp, câu hỏi phổ biến, câu hỏi thiếu dữ liệu

---

## 5. Mô hình tri thức và các thực thể nghiệp vụ chính

Để hệ thống hoạt động hiệu quả, nội dung văn hoá cần được tổ chức theo mô hình tri thức có cấu trúc. Các thực thể nghiệp vụ chính bao gồm:

### 5.1. Bài viết văn hoá

Là đơn vị tri thức trung tâm của hệ thống, chứa các nội dung như:

- Tiêu đề
- Mô tả ngắn
- Phần giới thiệu
- Nguồn gốc
- Ý nghĩa văn hoá
- Bối cảnh sử dụng hoặc xuất hiện
- Vùng miền hoặc dân tộc liên quan
- Từ khoá
- Ngôn ngữ
- Trạng thái duyệt
- Media đính kèm

### 5.2. Danh mục chủ đề

Dùng để phân loại bài viết theo các nhóm như:

- Lễ hội
- Tín ngưỡng
- Phong tục
- Ẩm thực
- Trang phục
- Nghệ thuật dân gian
- Kiến trúc truyền thống

### 5.3. Vùng miền văn hoá

Dùng để định vị không gian văn hoá, ví dụ:

- Miền Bắc
- Miền Trung
- Miền Nam
- Tây Nguyên
- Đồng bằng sông Cửu Long

hoặc các không gian văn hoá đặc thù khác.

### 5.4. Dân tộc

Dùng để gắn bài viết với cộng đồng văn hoá cụ thể, đặc biệt hữu ích khi giới thiệu phong tục, lễ hội, trang phục, tín ngưỡng của các dân tộc Việt Nam.

### 5.5. Thẻ và từ khoá

Cho phép tăng khả năng liên kết ngữ nghĩa giữa các bài viết, hỗ trợ tìm kiếm và đề xuất nội dung.

### 5.6. Media

Bao gồm:

- Hình ảnh
- Video
- Âm thanh
- Tư liệu minh hoạ

Media giúp tăng tính trực quan và hỗ trợ người dùng quốc tế hiểu sâu hơn về bối cảnh văn hoá.

### 5.7. Câu hỏi người dùng

Lưu vết các truy vấn hoặc câu hỏi gửi tới AI, phục vụ:

- Thống kê chủ đề được quan tâm
- Phát hiện nội dung còn thiếu
- Cải thiện chất lượng phản hồi

### 5.8. Phản hồi đánh giá

Ghi nhận nhận xét của người dùng về:

- Mức độ hữu ích của bài viết
- Mức độ hữu ích của câu trả lời AI
- Nội dung còn khó hiểu
- Gợi ý cần bổ sung

---

## 6. Danh sách nghiệp vụ chính của hệ thống

### 6.1. Nhóm nghiệp vụ dành cho người dùng khách

#### NV01. Truy cập và khám phá bản đồ văn hoá

Người dùng có thể truy cập giao diện bản đồ tương tác của hệ thống để khám phá văn hoá theo không gian địa lý. Tại đây, người dùng có thể chọn các khu vực văn hoá như Bắc – Trung – Nam hoặc những vùng văn hoá đặc thù để xem các chủ đề, bài viết, lễ hội, phong tục và nét đặc trưng liên quan.

**Mục đích nghiệp vụ:**

- Tạo trải nghiệm khám phá trực quan và hấp dẫn
- Giúp người dùng quốc tế tiếp cận văn hoá Việt Nam qua không gian địa lý cụ thể
- Tăng khả năng nhận diện sự khác biệt văn hoá vùng miền

**Kết quả mong muốn:**

- Hiển thị được nội dung văn hoá theo khu vực
- Liên kết từ bản đồ tới bài viết chi tiết, media và chủ đề liên quan

#### NV02. Tra cứu nội dung văn hoá theo danh mục

Người dùng có thể duyệt các bài viết theo từng nhóm chủ đề như:

- Lễ hội
- Tín ngưỡng
- Ẩm thực
- Trang phục
- Nghệ thuật dân gian
- Phong tục tập quán
- Kiến trúc truyền thống

**Mục đích nghiệp vụ:**

- Hỗ trợ người dùng nhanh chóng tiếp cận đúng nhóm nội dung mong muốn
- Giảm khó khăn khi người dùng chưa biết chính xác từ khoá cần tìm

**Kết quả mong muốn:**

- Hệ thống hiển thị danh sách nội dung theo danh mục
- Cho phép lọc tiếp theo vùng miền, dân tộc hoặc từ khoá liên quan

#### NV03. Tìm kiếm nội dung văn hoá

Người dùng nhập từ khoá để tìm kiếm các khái niệm, phong tục, món ăn, lễ hội hoặc biểu tượng văn hoá.

**Yêu cầu nghiệp vụ:**

- Hỗ trợ tìm kiếm theo từ khoá thông thường
- Hỗ trợ tìm kiếm gần đúng theo ngữ nghĩa
- Hỗ trợ người dùng không thành thạo tiếng Việt
- Ưu tiên hiển thị các kết quả đã được kiểm duyệt và có độ liên quan cao

**Kết quả mong muốn:**

- Người dùng nhanh chóng tìm thấy nội dung phù hợp
- Hạn chế tình trạng không tìm thấy do khác biệt ngôn ngữ hoặc cách diễn đạt

#### NV04. Chuyển đổi ngôn ngữ song ngữ Việt – Anh

Người dùng có thể chuyển đổi toàn bộ giao diện và nội dung giữa tiếng Việt và tiếng Anh một cách thuận tiện, nhất quán.

**Mục tiêu nghiệp vụ:**

- Giúp người nước ngoài dễ dàng tiếp cận và hiểu nội dung
- Bảo đảm trải nghiệm quốc tế hoá trên toàn hệ thống
- Hạn chế việc người dùng phải dùng công cụ dịch bên ngoài dẫn tới sai lệch ngữ nghĩa

#### NV05. Xem chi tiết bài viết văn hoá

Người dùng có thể xem nội dung đầy đủ của một bài viết văn hoá, bao gồm:

- Tên chủ đề
- Giới thiệu
- Nguồn gốc
- Ý nghĩa văn hoá
- Bối cảnh và phạm vi áp dụng
- Vùng miền hoặc dân tộc liên quan
- Hình ảnh/video minh hoạ
- Từ khoá liên quan
- Bài viết gợi ý

**Mục tiêu nghiệp vụ:**

- Cung cấp thông tin chính xác, có chiều sâu, dễ tiếp cận
- Tăng giá trị học tập và nghiên cứu cho người dùng

#### NV06. Hỏi đáp với AI Chatbot

Người dùng có thể đặt câu hỏi bằng tiếng Việt hoặc tiếng Anh để hệ thống AI giải thích nội dung văn hoá, ví dụ:

- “Why do Vietnamese people celebrate Tet?”
- “What is the meaning of áo dài in Vietnamese culture?”
- “Lễ hội đâm trâu có ý nghĩa gì?”

**Mục tiêu nghiệp vụ:**

- Trả lời rõ ràng, tự nhiên, dễ hiểu với người nước ngoài
- Giải thích được ý nghĩa văn hoá thay vì chỉ dịch lại thuật ngữ
- Tăng tính tương tác, cá nhân hoá và hỗ trợ học hỏi linh hoạt

#### NV07. Nhận gợi ý nội dung liên quan

Sau khi người dùng xem bài viết hoặc đặt câu hỏi cho AI, hệ thống đề xuất thêm:

- Bài viết tương tự
- Chủ đề liên quan
- Không gian văn hoá gần gũi
- Phong tục hoặc lễ hội có liên hệ ngữ nghĩa

**Mục đích nghiệp vụ:**

- Khuyến khích người dùng tiếp tục khám phá
- Tăng chiều sâu trải nghiệm học tập
- Mở rộng hiểu biết từ một chủ đề sang nhiều chủ đề liên quan

#### NV08. Gửi phản hồi hoặc đánh giá nội dung

Người dùng có thể phản hồi về:

- Mức độ hữu ích của bài viết
- Mức độ hữu ích của câu trả lời AI
- Nội dung chưa rõ
- Chủ đề còn thiếu

**Mục đích nghiệp vụ:**

- Thu thập dữ liệu cải tiến hệ thống
- Phát hiện các lỗ hổng trong kho tri thức
- Nâng cao chất lượng nội dung và trải nghiệm người dùng

---

### 6.2. Nhóm nghiệp vụ dành cho AI Chatbot

#### NV09. Nhận diện ngôn ngữ câu hỏi

Hệ thống tự động xác định câu hỏi được nhập bằng tiếng Việt hay tiếng Anh để lựa chọn ngôn ngữ phản hồi phù hợp.

**Mục tiêu nghiệp vụ:**

- Bảo đảm tính tự nhiên và thuận tiện cho người dùng
- Hạn chế lỗi hiểu sai do xử lý sai ngôn ngữ

#### NV10. Phân tích ý định và ngữ cảnh câu hỏi

AI cần xác định loại nhu cầu mà người dùng đang yêu cầu, chẳng hạn:

- Hỏi định nghĩa
- Hỏi nguồn gốc
- Hỏi ý nghĩa văn hoá
- Hỏi so sánh vùng miền
- Hỏi gợi ý chủ đề
- Hỏi hướng dẫn tìm hiểu sâu hơn

**Mục tiêu nghiệp vụ:**

- Tăng độ chính xác khi truy xuất tri thức
- Tạo phản hồi phù hợp với mục đích của người dùng

#### NV11. Truy xuất tri thức từ kho dữ liệu

Trước khi sinh câu trả lời, AI phải truy xuất dữ liệu từ các nguồn nội bộ như:

- Cơ sở dữ liệu bài viết
- Metadata nội dung
- Các đoạn tri thức đã chuẩn hoá
- Vector database
- Danh mục, thẻ, vùng miền, dân tộc

**Mục tiêu nghiệp vụ:**

- Bảo đảm AI trả lời dựa trên nguồn tri thức đã được kiểm duyệt
- Tăng độ tin cậy và khả năng kiểm soát nội dung

#### NV12. Sinh phản hồi ngôn ngữ tự nhiên

Sau khi truy xuất được tri thức liên quan, AI tiến hành tổng hợp và sinh câu trả lời bằng ngôn ngữ tự nhiên.

**Yêu cầu nghiệp vụ:**

- Trả lời ngắn gọn khi câu hỏi đơn giản
- Trả lời chi tiết khi câu hỏi mang tính học thuật hoặc nghiên cứu
- Ưu tiên diễn đạt dễ hiểu đối với người nước ngoài
- Không khẳng định thông tin vượt quá dữ liệu truy xuất được

#### NV13. Giải thích ngữ nghĩa văn hoá chuyên sâu

AI phải có khả năng giải thích các khái niệm văn hoá có chiều sâu, ví dụ:

- Ý nghĩa tục thờ cúng tổ tiên
- Ý nghĩa mâm ngũ quả ngày Tết
- Biểu tượng của áo dài
- Khác biệt phong tục giữa các miền

Đây là nghiệp vụ cốt lõi làm nổi bật giá trị nghiên cứu và ứng dụng của hệ thống, vì mục tiêu của hệ thống không chỉ là **“cung cấp dữ liệu”** mà còn **“truyền đạt tri thức văn hoá một cách có ngữ cảnh”**.

#### NV14. Đề xuất nội dung phù hợp

Dựa trên câu hỏi hiện tại và ngữ cảnh trao đổi, AI đề xuất:

- Bài viết liên quan
- Chủ đề mở rộng
- Phong tục tương đồng ở vùng khác
- Nội dung nên tìm hiểu tiếp theo

**Mục tiêu nghiệp vụ:**

- Hỗ trợ người dùng học theo lộ trình khám phá
- Tăng khả năng kết nối giữa các thành phần tri thức trong hệ thống

#### NV15. Ghi nhận câu hỏi phổ biến và câu hỏi chưa trả lời tốt

Hệ thống AI lưu lại:

- Câu hỏi được hỏi nhiều
- Chủ đề được quan tâm cao
- Câu hỏi không có dữ liệu phù hợp
- Trường hợp phản hồi còn yếu hoặc thiếu căn cứ

**Mục đích nghiệp vụ:**

- Phục vụ dashboard quản trị
- Hỗ trợ phát hiện thiếu hụt nội dung
- Tạo cơ sở cho việc cải tiến kho tri thức và mô hình AI

---

### 6.3. Nhóm nghiệp vụ dành cho quản trị viên

#### NV16. Đăng nhập và xác thực quản trị

Quản trị viên đăng nhập vào hệ thống CMS để thực hiện các nghiệp vụ quản lý.

**Yêu cầu:**

- Có cơ chế xác thực an toàn
- Có phân quyền phù hợp giữa các vai trò quản trị
- Chỉ người có quyền mới được truy cập dashboard và dữ liệu nội bộ

#### NV17. Quản lý bài viết văn hoá

Admin có thể:

- Thêm mới bài viết
- Chỉnh sửa bài viết
- Xoá bài viết
- Lưu nháp
- Gửi duyệt
- Xuất bản
- Ẩn bài viết
- Gắn vùng miền, dân tộc, danh mục và thẻ liên quan

**Mục tiêu nghiệp vụ:**

- Duy trì và mở rộng kho tri thức văn hoá
- Bảo đảm thông tin được quản lý tập trung và có cấu trúc

#### NV18. Quản lý danh mục và cấu trúc tri thức

Admin quản lý các thực thể nền tảng như:

- Danh mục chủ đề
- Vùng miền
- Dân tộc
- Thẻ nội dung
- Từ khoá
- Liên kết bài viết

**Mục tiêu nghiệp vụ:**

- Tạo cấu trúc tri thức nhất quán
- Hỗ trợ tìm kiếm, lọc, đề xuất và truy xuất ngữ nghĩa hiệu quả

#### NV19. Quản lý dữ liệu đa phương tiện

Admin có thể:

- Tải ảnh lên
- Tải video lên
- Sửa thông tin mô tả media
- Gắn media vào bài viết
- Tối ưu kích thước và định dạng

**Mục đích nghiệp vụ:**

- Tăng tính trực quan cho bài viết
- Giúp người dùng quốc tế hiểu ngữ cảnh văn hoá tốt hơn
- Nâng cao chất lượng trình bày nội dung

#### NV20. Kiểm duyệt nội dung trước khi công khai

Mọi nội dung mới hoặc nội dung được chỉnh sửa phải trải qua quy trình kiểm duyệt trước khi hiển thị cho người dùng cuối.

**Mục tiêu nghiệp vụ:**

- Bảo đảm tính chính xác học thuật
- Tránh sai lệch thông tin, đặc biệt với nội dung nhạy cảm về tín ngưỡng, dân tộc hoặc phong tục
- Tạo nguồn tri thức đủ tin cậy cho AI sử dụng

#### NV21. Quản lý kho tri thức cho AI

Sau khi bài viết được duyệt, hệ thống phải đồng bộ dữ liệu sang tầng AI thông qua các bước:

- Chuẩn hoá nội dung
- Tách đoạn văn bản
- Gắn metadata
- Vector hoá dữ liệu
- Cập nhật vector database

Đây là nghiệp vụ quan trọng vì nó bảo đảm AI luôn sử dụng dữ liệu mới nhất đã được kiểm duyệt.

#### NV22. Theo dõi thống kê và hành vi người dùng

Dashboard quản trị cần hiển thị:

- Số lượt truy cập
- Bài viết được xem nhiều
- Chủ đề được tìm kiếm nhiều
- Câu hỏi AI phổ biến
- Tỷ lệ phản hồi hữu ích
- Nội dung chưa đủ dữ liệu

**Mục đích nghiệp vụ:**

- Hỗ trợ quản trị viên ra quyết định cải tiến nội dung
- Nhận diện xu hướng quan tâm của người dùng
- Đánh giá hiệu quả hoạt động của hệ thống

#### NV23. Quản lý phản hồi người dùng

Admin xem và xử lý các phản hồi đánh giá từ người dùng để:

- Sửa nội dung chưa rõ
- Bổ sung kiến thức còn thiếu
- Cải thiện trải nghiệm người dùng
- Điều chỉnh cơ chế trả lời của AI khi cần thiết

---

## 7. Quy trình nghiệp vụ cốt lõi

### 7.1. Quy trình tra cứu nội dung văn hoá

1. Người dùng truy cập website  
2. Người dùng chọn vùng miền, dân tộc hoặc danh mục nội dung  
3. Hệ thống truy vấn dữ liệu phù hợp từ kho tri thức  
4. Hệ thống trả về danh sách bài viết tương ứng  
5. Người dùng chọn một bài viết để xem chi tiết  
6. Hệ thống hiển thị nội dung song ngữ và media minh hoạ  
7. Hệ thống đề xuất bài viết và chủ đề liên quan  
8. Người dùng có thể tiếp tục tra cứu hoặc gửi phản hồi  

### 7.2. Quy trình hỏi đáp với AI Chatbot

1. Người dùng nhập câu hỏi bằng tiếng Việt hoặc tiếng Anh  
2. Hệ thống nhận diện ngôn ngữ đầu vào  
3. Hệ thống phân tích ý định, từ khoá và ngữ cảnh câu hỏi  
4. Hệ thống truy xuất dữ liệu liên quan từ kho tri thức và vector database  
5. Mô hình ngôn ngữ sinh phản hồi dựa trên ngữ cảnh đã truy xuất  
6. Hệ thống trả câu trả lời cho người dùng theo ngôn ngữ phù hợp  
7. Hệ thống đồng thời đề xuất bài viết hoặc chủ đề liên quan  
8. Lịch sử hỏi đáp và phản hồi đánh giá được lưu để phục vụ cải tiến hệ thống  

### 7.3. Quy trình cập nhật nội dung và đồng bộ AI

1. Admin tạo mới hoặc chỉnh sửa bài viết  
2. Nội dung được lưu ở trạng thái nháp  
3. Admin gửi nội dung sang bước kiểm duyệt  
4. Người có thẩm quyền kiểm tra và xác nhận nội dung hợp lệ  
5. Bài viết được xuất bản  
6. Hệ thống đánh dấu nội dung cần đồng bộ sang tầng AI  
7. Pipeline chuẩn hoá và vector hoá được kích hoạt  
8. Dữ liệu tri thức được cập nhật vào vector database  
9. AI sử dụng ngay tri thức mới trong các phiên hỏi đáp tiếp theo  

### 7.4. Quy trình xử lý phản hồi người dùng

1. Người dùng đánh giá bài viết hoặc câu trả lời AI  
2. Hệ thống lưu phản hồi vào cơ sở dữ liệu  
3. Dashboard thống kê hiển thị các phản hồi theo mức độ ưu tiên  
4. Admin xem xét phản hồi, xác định nguyên nhân  
5. Nếu cần, admin chỉnh sửa nội dung, bổ sung bài viết hoặc cập nhật tri thức cho AI  
6. Hệ thống ghi nhận trạng thái đã xử lý phản hồi  

---

## 8. Quy tắc nghiệp vụ (Business Rules)

### BR01
Mọi nội dung công khai cho người dùng phải ở trạng thái đã duyệt.

### BR02
Mọi phản hồi từ AI phải ưu tiên dựa trên dữ liệu đã được kiểm duyệt trong hệ thống, không được trả lời tự do ngoài phạm vi tri thức khi không có căn cứ rõ ràng.

### BR03
Nếu không tìm thấy dữ liệu phù hợp, AI phải phản hồi theo hướng trung thực, chẳng hạn:

- Chưa có dữ liệu đầy đủ
- Đề nghị người dùng xem bài viết liên quan
- Hoặc đưa câu hỏi vào nhóm cần bổ sung nội dung

### BR04
Mỗi bài viết phải thuộc ít nhất một danh mục.

### BR05
Mỗi bài viết phải gắn với ít nhất một vùng miền hoặc một nhóm dân tộc liên quan.

### BR06
Mỗi bài viết công khai phải hỗ trợ tối thiểu hai ngôn ngữ: tiếng Việt và tiếng Anh.

### BR07
Media tải lên phải gắn với ít nhất một bài viết hoặc một thực thể văn hoá cụ thể.

### BR08
Khi bài viết đã xuất bản được cập nhật nội dung, hệ thống phải đánh dấu trạng thái cần đồng bộ lại dữ liệu vector cho AI.

### BR09
Câu hỏi của người dùng có thể được lưu để cải thiện hệ thống nhưng phải tuân thủ nguyên tắc bảo mật dữ liệu và bảo vệ thông tin cá nhân.

### BR10
Dashboard thống kê chỉ hiển thị cho người có quyền quản trị.

### BR11
Người dùng khách không được phép chỉnh sửa, xuất bản hoặc kiểm duyệt nội dung tri thức.

### BR12
Nội dung công khai cần có nguồn tham khảo hoặc căn cứ kiểm chứng phù hợp để bảo đảm độ tin cậy học thuật.

### BR13
Bản dịch song ngữ phải bảo đảm tương đương về nghĩa, không được chỉ phụ thuộc vào dịch máy mà không qua kiểm tra.

### BR14
Đối với nội dung nhạy cảm liên quan đến tín ngưỡng, dân tộc, tập quán đặc thù hoặc diễn giải lịch sử, hệ thống phải áp dụng mức kiểm duyệt chặt hơn trước khi công khai.

### BR15
AI không được tạo nguồn tham khảo giả hoặc khẳng định chắc chắn khi độ tin cậy truy xuất thấp.

### BR16
Khi hệ thống không đủ cơ sở dữ liệu để trả lời, mức độ khẳng định trong phản hồi AI phải được giảm xuống tương ứng.

### BR17
Mỗi thay đổi đối với bài viết đã xuất bản cần được lưu vết để phục vụ kiểm tra và truy hồi nội dung khi cần.

### BR18
Chỉ nội dung đã được đồng bộ thành công sang kho tri thức AI mới được xem là sẵn sàng phục vụ hỏi đáp.

---

## 9. Luồng ngoại lệ và tình huống đặc biệt

### 9.1. Đối với người dùng khách

- Nếu người dùng tìm kiếm nhưng không có kết quả, hệ thống cần gợi ý từ khoá gần đúng hoặc danh mục liên quan
- Nếu người dùng đặt câu hỏi ngoài phạm vi tri thức, AI cần từ chối mềm và hướng người dùng sang nội dung gần nhất
- Nếu người dùng nhập câu hỏi mơ hồ, hệ thống có thể trả lời theo hướng khái quát trước, sau đó gợi ý đào sâu thêm

### 9.2. Đối với quản trị viên

- Nếu bài viết thiếu bản dịch tiếng Anh hoặc tiếng Việt, hệ thống không cho phép xuất bản công khai
- Nếu bài viết chưa gắn danh mục hoặc vùng miền/dân tộc, hệ thống cảnh báo thiếu dữ liệu bắt buộc
- Nếu media không đúng định dạng hoặc dung lượng vượt ngưỡng, hệ thống từ chối tải lên
- Nếu quá trình đồng bộ vector thất bại, hệ thống phải ghi log lỗi và hiển thị trạng thái chưa sẵn sàng cho AI

### 9.3. Đối với AI

- Nếu không truy xuất được ngữ cảnh phù hợp, AI phải trả lời trung thực thay vì đoán
- Nếu câu hỏi chứa yếu tố nhạy cảm hoặc dễ gây hiểu sai văn hoá, AI cần phản hồi thận trọng, trung tính và có định hướng nguồn nội dung chính thống
- Nếu có sự mâu thuẫn giữa các nguồn dữ liệu nội bộ, hệ thống cần ưu tiên nội dung đã được đánh dấu kiểm duyệt chính thức

---

## 10. Yêu cầu chức năng chi tiết

### 10.1. Yêu cầu chức năng cho người dùng khách

- Xem trang chủ và phần giới thiệu hệ thống
- Khám phá bản đồ văn hoá tương tác
- Xem nội dung theo vùng miền, dân tộc, danh mục
- Tìm kiếm nội dung theo từ khoá và ngữ nghĩa
- Chuyển đổi ngôn ngữ Việt – Anh
- Xem bài viết chi tiết
- Hỏi đáp với AI Chatbot
- Nhận đề xuất nội dung liên quan
- Gửi phản hồi đánh giá bài viết hoặc phản hồi AI

### 10.2. Yêu cầu chức năng cho quản trị viên

- Đăng nhập và đăng xuất quản trị
- Quản lý bài viết văn hoá
- Quản lý danh mục
- Quản lý vùng miền và dân tộc
- Quản lý thẻ và từ khoá
- Quản lý media
- Kiểm duyệt nội dung
- Xuất bản hoặc ẩn bài viết
- Theo dõi dashboard thống kê
- Theo dõi lịch sử câu hỏi AI
- Quản lý nội dung cần bổ sung cho AI
- Kích hoạt hoặc giám sát quá trình đồng bộ tri thức sang tầng AI

### 10.3. Yêu cầu chức năng cho AI

- Nhận diện ngôn ngữ đầu vào
- Phân tích ý định câu hỏi
- Truy xuất dữ liệu liên quan từ kho tri thức
- Sinh phản hồi ngôn ngữ tự nhiên có kiểm soát
- Giải thích ngữ nghĩa văn hoá theo ngữ cảnh
- Gợi ý nội dung liên quan
- Ghi nhận lịch sử hỏi đáp
- Ghi nhận câu hỏi thiếu dữ liệu hoặc độ tin cậy thấp

---

## 11. Yêu cầu phi chức năng

### 11.1. Tính chính xác

Nội dung văn hoá và phản hồi AI phải bám sát dữ liệu đã được kiểm duyệt, hạn chế tối đa sai lệch hoặc suy diễn không có căn cứ.

### 11.2. Tính dễ sử dụng

Giao diện cần trực quan, rõ ràng, thân thiện với cả người Việt và người nước ngoài, đặc biệt với người chưa quen văn hoá Việt Nam.

### 11.3. Hiệu năng

Hệ thống phải phản hồi nhanh khi:

- Tìm kiếm nội dung
- Tải bài viết
- Truy cập bản đồ
- Hỏi đáp AI

### 11.4. Khả năng mở rộng

Hệ thống phải dễ dàng mở rộng:

- Thêm chủ đề văn hoá mới
- Thêm dữ liệu cho các dân tộc
- Thêm ngôn ngữ khác ngoài Việt – Anh
- Mở rộng quy mô kho tri thức

### 11.5. Bảo mật

Hệ thống phải:

- Bảo vệ tài khoản admin
- Bảo vệ dữ liệu người dùng
- Bảo vệ API backend và AI
- Kiểm soát truy cập tới dashboard và CMS

### 11.6. Khả năng bảo trì

Kiến trúc phần mềm cần phân tầng rõ ràng, dễ cập nhật module frontend, backend, CMS, AI service và cơ sở dữ liệu.

### 11.7. Tính quốc tế hoá

Hệ thống phải hỗ trợ định dạng nội dung, cách trình bày và diễn đạt phù hợp với người dùng quốc tế.

### 11.8. Độ tin cậy của AI

AI phải có cơ chế truy xuất tri thức trước khi trả lời, giảm nguy cơ ảo giác và có khả năng phản hồi trung thực khi thiếu dữ liệu.

### 11.9. Khả năng quan sát và giám sát

Hệ thống cần ghi log các hoạt động chính như:

- Truy vấn người dùng
- Lịch sử hỏi đáp AI
- Trạng thái đồng bộ tri thức
- Thao tác quản trị

để phục vụ giám sát, kiểm tra lỗi và cải tiến hệ thống.

---

## 12. Chỉ số đánh giá hiệu quả nghiệp vụ và hệ thống

Để đánh giá mức độ thành công của hệ thống, có thể sử dụng các chỉ số sau:

### 12.1. Chỉ số về nội dung

- Tỷ lệ bài viết công khai có đủ 2 ngôn ngữ
- Tỷ lệ bài viết có đầy đủ metadata: danh mục, vùng miền/dân tộc, thẻ, media
- Tỷ lệ bài viết đã duyệt trên tổng số bài viết

### 12.2. Chỉ số về tìm kiếm và khám phá

- Tỷ lệ truy vấn tìm kiếm trả về kết quả phù hợp
- Số lượt xem trung bình trên mỗi phiên truy cập
- Tỷ lệ người dùng tiếp tục xem bài viết liên quan sau khi đọc bài đầu tiên

### 12.3. Chỉ số về AI

- Thời gian phản hồi trung bình của AI
- Tỷ lệ phản hồi AI được người dùng đánh giá hữu ích
- Tỷ lệ câu hỏi không có đủ dữ liệu để trả lời
- Tỷ lệ phản hồi AI có căn cứ từ kho tri thức nội bộ

### 12.4. Chỉ số về trải nghiệm người dùng

- Mức độ hài lòng của người dùng qua phản hồi đánh giá
- Tỷ lệ người dùng quay lại hệ thống
- Thời gian trung bình người dùng ở lại hệ thống

### 12.5. Chỉ số về vận hành và cải tiến

- Số lượng câu hỏi phổ biến được phát hiện qua hệ thống AI
- Số lượng nội dung được bổ sung dựa trên phản hồi người dùng
- Thời gian từ khi bài viết được duyệt đến khi tri thức được cập nhật cho AI

---

## 13. Mô hình nghiệp vụ theo Use Case

### 13.1. Use Case cho Guest

- Xem bản đồ văn hoá
- Xem danh mục văn hoá
- Tìm kiếm nội dung
- Chuyển ngôn ngữ
- Xem bài viết chi tiết
- Hỏi AI
- Xem gợi ý liên quan
- Gửi phản hồi

### 13.2. Use Case cho Admin

- Đăng nhập
- Quản lý bài viết
- Quản lý danh mục
- Quản lý vùng miền / dân tộc
- Quản lý media
- Kiểm duyệt nội dung
- Theo dõi dashboard
- Quản lý dữ liệu AI
- Xem phản hồi người dùng
- Theo dõi lịch sử câu hỏi AI

### 13.3. Use Case cho AI Service

- Nhận câu hỏi
- Xác định ngôn ngữ
- Phân tích ý định
- Truy xuất tri thức
- Sinh câu trả lời
- Đề xuất nội dung
- Ghi log câu hỏi
- Gắn cờ câu hỏi thiếu dữ liệu

---

## 14. Giá trị khoa học và thực tiễn của hệ thống

### 14.1. Giá trị khoa học

Về mặt khoa học, hệ thống **VNCultureBridge AI** không chỉ là một website giới thiệu văn hoá mà còn là một mô hình ứng dụng AI trong lĩnh vực nhân văn số. Điểm đóng góp chính của đề tài là:

- Số hoá tri thức văn hoá theo cấu trúc có tổ chức
- Kết hợp truy xuất ngữ nghĩa và sinh ngôn ngữ tự nhiên
- Kiểm soát chất lượng phản hồi AI bằng dữ liệu đã kiểm duyệt
- Hỗ trợ truyền đạt tri thức văn hoá xuyên ngôn ngữ và xuyên bối cảnh

Đề tài góp phần minh hoạ cách ứng dụng AI có kiểm soát trong các lĩnh vực giàu sắc thái ngữ nghĩa như văn hoá, lịch sử, tập quán và tín ngưỡng.

### 14.2. Giá trị thực tiễn

Về mặt thực tiễn, hệ thống có thể mang lại các lợi ích sau:

- Giúp người nước ngoài hiểu đúng và sâu hơn về văn hoá Việt Nam
- Tăng khả năng quảng bá văn hoá dân tộc bằng nền tảng số hiện đại
- Hỗ trợ giảng dạy, học tập, nghiên cứu và truyền thông văn hoá
- Góp phần bảo tồn và lan toả tri thức văn hoá theo cách có hệ thống
- Tạo nền tảng dữ liệu mở rộng cho các ứng dụng AI văn hoá trong tương lai

### 14.3. Ý nghĩa xã hội

Hệ thống có ý nghĩa trong việc:

- Tăng cường giao lưu văn hoá quốc tế
- Hỗ trợ phổ biến tri thức văn hoá chuẩn xác
- Góp phần xây dựng hình ảnh Việt Nam thân thiện, sâu sắc và giàu bản sắc trong mắt bạn bè quốc tế

---

## 15. Kết luận phần nghiệp vụ

Từ các phân tích trên, có thể xác định rằng **VNCultureBridge AI** là một hệ thống tích hợp nhiều nhóm nghiệp vụ quan trọng, bao gồm quản trị tri thức văn hoá, tra cứu thông minh, hỗ trợ song ngữ, hỏi đáp bằng AI và theo dõi dữ liệu vận hành để cải tiến liên tục. Hệ thống không chỉ phục vụ nhu cầu tra cứu thông tin đơn thuần mà còn đóng vai trò như một nền tảng trung gian giúp truyền tải bản sắc văn hoá Việt Nam tới cộng đồng quốc tế theo cách chính xác, trực quan, hiện đại và có chiều sâu ngữ nghĩa.

Điểm cốt lõi của hệ thống nằm ở việc kết hợp giữa kho tri thức văn hoá đã kiểm duyệt với AI Chatbot sử dụng cơ chế truy xuất tri thức để tạo ra các phản hồi vừa tự nhiên, vừa đáng tin cậy. Điều này giúp hệ thống vượt ra khỏi mô hình website giới thiệu nội dung truyền thống, tiến tới một nền tảng tri thức số có giá trị học thuật và ứng dụng thực tiễn cao.

---

## 16. Đề xuất bổ sung để tăng tính thông minh và tính tế nhị của hệ thống

Dù bản phân tích nghiệp vụ đã tương đối đầy đủ, để tăng sức thuyết phục với hội đồng đánh giá, có thể bổ sung và làm rõ thêm một số nội dung sau:

### 16.1. Xử lý “Culture Shock” (Sốc văn hoá)

Hệ thống AI nên được bổ sung khả năng **điều chỉnh sắc thái diễn giải** đối với những nội dung có thể gây bỡ ngỡ hoặc hiểu lầm cho người dùng quốc tế. Ví dụ, với những phong tục có yếu tố hiến tế, nghi lễ liên quan đến cái chết, hoặc tập quán tín ngưỡng khác biệt với tư duy phương Tây, AI không chỉ giải thích khái niệm mà cần trình bày dưới góc nhìn tôn trọng sự đa dạng văn hoá, tránh phán xét hoặc đơn giản hoá vấn đề.

### 16.2. Nguồn dữ liệu chuẩn (Source of Truth)

Để tăng độ tin cậy học thuật, cần làm rõ rằng dữ liệu đưa vào hệ thống phải được thu thập từ các nguồn có thẩm quyền, ví dụ:

- Công trình nghiên cứu của Viện Văn hoá
- Sách của các nhà nghiên cứu uy tín như Hữu Ngọc, Toan Ánh
- Tư liệu từ bảo tàng, thư viện, cơ quan quản lý văn hoá
- Nguồn tư liệu chính thống đã được kiểm chứng

Điều này giúp hệ thống có cơ sở dữ liệu chuẩn để vừa phục vụ hiển thị nội dung, vừa bảo đảm AI không sinh phản hồi thiếu căn cứ.

### 16.3. Cá nhân hoá theo quốc gia của người dùng

Hệ thống AI có thể nâng cao trải nghiệm bằng cách phân tích **ngữ cảnh tiếp nhận** của người dùng. Ví dụ:

- Một người Nhật hỏi về Tết có thể được giải thích bằng cách so sánh với một số đặc điểm quen thuộc trong văn hoá Nhật
- Một người Mỹ hỏi về Tết có thể được diễn đạt theo hướng giúp họ liên hệ với khái niệm đoàn tụ gia đình, năm mới âm lịch, hoặc nghi thức cộng đồng

Việc cá nhân hoá như vậy giúp AI truyền đạt hiệu quả hơn, dễ hiểu hơn và phù hợp hơn với nền tảng văn hoá của từng nhóm người dùng.

### 16.4. Làm rõ mô hình bản đồ tương tác

Cần xác định rõ bản đồ trong hệ thống là:

- **Bản đồ địa lý 2D**, gắn với ranh giới hành chính hiện đại, hoặc
- **Bản đồ vùng văn hoá**, phản ánh không gian văn hoá thực tế, vốn có thể không trùng khít hoàn toàn với địa giới hành chính

Đối với đề tài này, bản đồ vùng văn hoá thường phù hợp hơn về mặt học thuật và nghiệp vụ, vì nó phản ánh đúng bản chất lan toả, giao thoa và đặc trưng của đời sống văn hoá Việt Nam.

---
