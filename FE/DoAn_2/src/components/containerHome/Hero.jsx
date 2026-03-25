import { Parallax } from "react-parallax";
import { motion, scale } from "framer-motion";
import styles from "./Hero.module.css";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    const currentAcc = localStorage.getItem("CurrentAcc");
    const isLoggedIn = currentAcc !== null;

    if (isLoggedIn) {
      // Cuộn mượt xuống section #topics
      const section = document.getElementById("places");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Chuyển trang đăng nhập
      navigate("/signin");
    }
  };
  return (
    <section id="home" className={styles.hero}>
      <Parallax
        bgImage="/img/Banner.png" // ảnh nền
        strength={400} // độ mạnh parallax
        className={styles.banner}
      >
        <div className={styles.content}>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: false }}
          >
            Discover Vietnamese Culture
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            viewport={{ once: false }}
          >
            Explore traditional food, festivals, clothing, and customs of
            Vietnam.
          </motion.p>

          <motion.button
            className={styles.ctaBtn}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{
              opacity: 1,
              scale: 1,
              
            }}
            whileHover={{
              scale: 1.08,
            }}
            viewport={{ once: false }}
            onClick={handleGetStarted}
          >
            Get Started
          </motion.button>
        </div>
      </Parallax>
    </section>
  );
}
