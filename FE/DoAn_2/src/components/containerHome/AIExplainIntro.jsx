import React from "react";
import { FaRobot } from "react-icons/fa";
import styles from "./AIExplainIntro.module.css";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function AIExplainIntro() {
  const { t } = useTranslation();

  return (
    <section id="ai" className={styles.aiSection}>
      <motion.div
        className={styles.aiContainer}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className={styles.aiIconWrapper}>
          <FaRobot size={40} color="#fec816" />
        </div>
        <h2 className={styles.aiTitle}>{t('ai.title')}</h2>
        <p className={styles.aiText}>
          {t('ai.subtitle')}
        </p>
      </motion.div>
    </section>
  );
}
