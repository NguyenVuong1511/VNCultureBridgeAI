import { useState } from "react";
import styles from "./Contact.module.css";
import { FaEnvelope, FaFacebookF, FaPhoneAlt, FaYoutube } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Cảm ơn bạn đã gửi phản hồi!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <motion.div className={styles.contactContainer}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Left side: Form */}
        <div className={styles.leftSide}>
          <h2 className={styles.contactTitle}>Contact Us</h2>
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="off"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="off"
            />
            <textarea
              name="message"
              placeholder="Content"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button type="submit" className={styles.submitBtn}>
              SEND
            </button>
          </form>
        </div>

        {/* Right side: Info Cards */}
        <div className={styles.rightSide}>
          <div className={styles.infoCard}>
            <div className={styles.iconWrapper}>
              <FaEnvelope className={styles.icon} />
            </div>
            <div className={styles.infoContent}>
              <p className={styles.cardTitle}>Email</p>
              <a href="mailto:nguyenvuong151125@gmail.com">info@vnculturebridge.vn</a>
            </div>
          </div>
          <div className={styles.infoCard}>
            <div className={styles.iconWrapper}>
              <FaFacebookF className={styles.icon} />
            </div>
            <div className={styles.infoContent}>
              <p className={styles.cardTitle}>Facebook</p>
              <a href="https://facebook.com" target="_blank">facebook.com/vnculturebridge</a>
            </div>
          </div>
          <div className={styles.infoCard}>
            <div className={styles.iconWrapper}>
              <FaYoutube className={styles.icon} />
            </div>
            <div className={styles.infoContent}>
              <p className={styles.cardTitle}>Youtube</p>
              <a href="https://youtube.com" target="_blank">youtube.com/vnculturebridge</a>
            </div>
          </div>
          <div className={styles.infoCard}>
            <div className={styles.iconWrapper}>
              <FaPhoneAlt className={styles.icon} />
            </div>
            <div className={styles.infoContent}>
              <p className={styles.cardTitle}>Phone</p>
              <a href="tel:+84123456789">+84 123 456 789</a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
