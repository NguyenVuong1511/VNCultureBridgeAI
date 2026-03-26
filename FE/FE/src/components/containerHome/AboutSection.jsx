import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import styles from "./AboutSection.module.css";
import { useTranslation } from "react-i18next";

export default function AboutSection() {
  const { t } = useTranslation();
  const images = [
    { src: "/img/Food.jpeg", alt: "Vietnamese Cuisine" },
    { src: "/img/Tet.jpg", alt: "Vietnamese Festival" },
    { src: "/img/Ruoc-kieu.jpg", alt: "Vietnamese Tradition" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {t('about.title')}
        </motion.h2>

        <motion.p
          className={styles.desc}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {t('about.description_1')}
          <br/><br/>
          {t('about.description_2')}
        </motion.p>

        <motion.div
          className={styles.slideshow}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className={styles.slideWrapper}>
            {images.map((img, index) => (
              <motion.div
                key={index}
                className={`${styles.slide} ${
                  index === currentIndex ? styles.active : ""
                }`}
                animate={{ opacity: index === currentIndex ? 1 : 0 }}
                transition={{ duration: 0.8 }}
              >
                <img src={img.src} alt={img.alt} />
                <p>{img.alt}</p>
              </motion.div>
            ))}
          </div>

          <div className={styles.dots}>
            {images.map((_, index) => (
              <span
                key={index}
                className={`${styles.dot} ${
                  index === currentIndex ? styles.activeDot : ""
                }`}
                onClick={() => setCurrentIndex(index)}
              ></span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
