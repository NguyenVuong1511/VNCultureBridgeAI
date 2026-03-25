import React from "react";
import { FaRobot } from "react-icons/fa";
import styles from "./AIExplainIntro.module.css";
import { motion } from "framer-motion";

export default function AIExplainIntro() {
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
        <h2 className={styles.aiTitle}>Welcome to AI Explain Web</h2>
        <p className={styles.aiText}>
          This website is powered by <strong>Artificial Intelligence</strong> to
          help you <strong>understand complex topics easily</strong>. Simply enter any
          content, and our AI will provide clear, simple, and easy-to-understand
          explanations.
        </p>
        <p className={styles.aiText}>
          Save time, learn efficiently, and explore knowledge with the help of
          AI right on this platform.
        </p>
      </motion.div>
    </section>
  );
}
