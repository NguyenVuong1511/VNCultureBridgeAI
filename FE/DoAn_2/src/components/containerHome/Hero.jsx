import { Parallax } from "react-parallax";
import { motion } from "framer-motion";
import styles from "./Hero.module.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleGetStarted = () => {
    const currentAcc = localStorage.getItem("CurrentAcc");
    const isLoggedIn = currentAcc !== null;

    if (isLoggedIn) {
      const section = document.getElementById("places");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/signin");
    }
  };

  return (
    <section id="home" className={styles.hero}>
      <Parallax
        bgImage="/img/Banner.png"
        strength={400}
        className={styles.banner}
      >
        <div className={styles.content}>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: false }}
          >
            {t('hero.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            viewport={{ once: false }}
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.button
            className={styles.ctaBtn}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.08 }}
            viewport={{ once: false }}
            onClick={handleGetStarted}
          >
            {t('hero.explore_btn')}
          </motion.button>
        </div>
      </Parallax>
    </section>
  );
}
