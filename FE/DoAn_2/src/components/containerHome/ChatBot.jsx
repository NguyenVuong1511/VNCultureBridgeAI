import React, { useState, useRef, useEffect } from "react";
import styles from "./ChatBot.module.css";
import { FaComments, FaTimes, FaRobot } from "react-icons/fa";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      sender: "bot", 
      text: "Xin chào! Tôi là trợ lý AI của bạn. Tôi có thể giúp bạn khám phá về văn hóa Việt Nam như ẩm thực, lễ hội, trang phục, phong tục truyền thống. Hãy hỏi tôi bất cứ điều gì về văn hóa Việt Nam nhé!" 
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Kiểm tra xem câu hỏi có liên quan đến văn hóa Việt Nam không
  const isRelatedToVietnameseCulture = (text) => {
    const lowerText = text.toLowerCase();
    
    // Từ khóa liên quan đến văn hóa Việt Nam
    const vietnameseCultureKeywords = [
      // Về Việt Nam
      "việt nam", "vietnam", "việt", "viet nam",
      // Ẩm thực
      "món ăn", "ẩm thực", "phở", "bánh mì", "bún", "nem", "chả giò", 
      "bánh chưng", "bánh tét", "cơm", "canh", "nước mắm",
      // Lễ hội
      "tết", "lễ hội", "trung thu", "giỗ tổ", "hùng vương", "đền hùng",
      "lễ hội đền", "festival", "ngày lễ",
      // Trang phục
      "áo dài", "áo bà ba", "nón lá", "khăn đóng", "trang phục truyền thống",
      // Phong tục
      "phong tục", "tập quán", "truyền thống", "văn hóa", "văn minh",
      "lễ nghi", "nghi thức", "tục lệ",
      // Nghệ thuật
      "nhạc cụ", "đàn", "sáo", "trống", "cồng chiêng", "ca trù", "quan họ",
      "chèo", "tuồng", "cải lương", "hát xoan",
      // Địa danh văn hóa
      "hà nội", "huế", "hội an", "sapa", "hạ long", "phong nha",
      // Lịch sử văn hóa
      "lịch sử", "di tích", "di sản", "unesco", "bảo tàng",
      // Ngôn ngữ
      "tiếng việt", "chữ quốc ngữ", "chữ nôm",
      // Tôn giáo
      "phật giáo", "đạo phật", "đình", "chùa", "miếu",
      // Khác
      "văn hóa việt", "văn hóa việt nam", "truyền thống việt", "văn hóa dân tộc"
    ];

    // Kiểm tra xem có từ khóa nào trong câu hỏi không
    return vietnameseCultureKeywords.some(keyword => lowerText.includes(keyword));
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    const newMessages = [...messages, { sender: "user", text: userMessage }];
    setMessages(newMessages);
    setInput("");

    // Kiểm tra xem câu hỏi có liên quan đến văn hóa Việt Nam không
    setTimeout(() => {
      if (!isRelatedToVietnameseCulture(userMessage)) {
        const warningMessage = 
          "Xin lỗi, tôi chỉ có thể trả lời các câu hỏi về văn hóa Việt Nam. " +
          "Vui lòng hỏi tôi về ẩm thực, lễ hội, trang phục, phong tục truyền thống, " +
          "nghệ thuật, địa danh văn hóa hoặc các khía cạnh khác của văn hóa Việt Nam. " +
          "Cảm ơn bạn!";
        setMessages([...newMessages, { sender: "bot", text: warningMessage }]);
      } else {
        // Simulate AI response về văn hóa Việt Nam
        const botReply = generateCultureResponse(userMessage);
        setMessages([...newMessages, { sender: "bot", text: botReply }]);
      }
    }, 500);
  };

  // Tạo phản hồi về văn hóa Việt Nam (có thể mở rộng hoặc tích hợp API)
  const generateCultureResponse = (question) => {
    const lowerQuestion = question.toLowerCase();
    
    // Một số phản hồi mẫu (có thể thay thế bằng API thực tế)
    if (lowerQuestion.includes("tết") || lowerQuestion.includes("tet")) {
      return "Tết Nguyên Đán là lễ hội quan trọng nhất trong năm của người Việt Nam, " +
             "thường diễn ra vào cuối tháng 1 hoặc đầu tháng 2 dương lịch. " +
             "Đây là dịp để gia đình sum họp, thờ cúng tổ tiên, và chúc nhau những lời tốt đẹp. " +
             "Các hoạt động truyền thống bao gồm gói bánh chưng, dọn dẹp nhà cửa, và đi chúc Tết.";
    }
    
    if (lowerQuestion.includes("phở") || lowerQuestion.includes("pho")) {
      return "Phở là món ăn truyền thống nổi tiếng của Việt Nam, được làm từ bánh phở, " +
             "nước dùng trong, thịt bò hoặc thịt gà, cùng các loại rau thơm. " +
             "Phở được coi là một trong những món ăn đặc trưng nhất của ẩm thực Việt Nam " +
             "và đã được công nhận trên toàn thế giới.";
    }
    
    if (lowerQuestion.includes("áo dài") || lowerQuestion.includes("ao dai")) {
      return "Áo dài là trang phục truyền thống của phụ nữ Việt Nam, được mặc trong các dịp lễ, " +
             "Tết, hoặc các sự kiện quan trọng. Áo dài có thiết kế thanh lịch với phần thân áo dài " +
             "và quần dài, thể hiện vẻ đẹp duyên dáng của người phụ nữ Việt.";
    }
    
    if (lowerQuestion.includes("ẩm thực") || lowerQuestion.includes("mon an") || lowerQuestion.includes("food")) {
      return "Ẩm thực Việt Nam rất đa dạng và phong phú, nổi tiếng với sự cân bằng giữa các vị chua, cay, mặn, ngọt. " +
             "Các món ăn nổi tiếng bao gồm phở, bánh mì, bún chả, nem rán, bánh chưng, và nhiều món khác. " +
             "Bạn muốn biết thêm về món ăn cụ thể nào không?";
    }
    
    if (lowerQuestion.includes("lễ hội") || lowerQuestion.includes("le hoi") || lowerQuestion.includes("festival")) {
      return "Việt Nam có rất nhiều lễ hội truyền thống như Tết Nguyên Đán, Tết Trung Thu, " +
             "Lễ hội Đền Hùng, Lễ hội Chùa Hương, và nhiều lễ hội địa phương khác. " +
             "Mỗi lễ hội đều có ý nghĩa và phong tục riêng, thể hiện nét đẹp văn hóa dân tộc.";
    }
    
    // Phản hồi mặc định
    return `Cảm ơn bạn đã hỏi về "${question}". Đây là một câu hỏi thú vị về văn hóa Việt Nam! ` +
           `Tôi đang học hỏi thêm để có thể trả lời chi tiết hơn. ` +
           `Bạn có thể hỏi tôi về các chủ đề cụ thể như ẩm thực, lễ hội, trang phục, hoặc phong tục truyền thống của Việt Nam.`;
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Open chat
  const handleOpenChat = () => {
    const currentAcc = localStorage.getItem("CurrentAcc");
    if (currentAcc) {
      setOpen(true);
    } else {
      alert("Please log in before using the AI chat!");
      // Can redirect to login page:
      // window.location.href = "/login";
    }
  };

  return (
    <div className={styles.chatWrapper}>
      {open && (
        <div className={styles.chatBox}>
          <div className={styles.header}>
            <FaComments size={20} style={{ marginRight: 8 }} />
            <span>Chat AI</span>
            <button className={styles.closeButton} onClick={() => setOpen(false)}>
              <FaTimes size={16} />
            </button>
          </div>

          <div className={styles.messages}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={msg.sender === "user" ? styles.userMessage : styles.botMessage}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.inputArea}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}

      {!open && (
        <button className={styles.floatingButton} onClick={handleOpenChat}>
          <FaRobot size={24} color="white" />
        </button>
      )}
    </div>
  );
}
