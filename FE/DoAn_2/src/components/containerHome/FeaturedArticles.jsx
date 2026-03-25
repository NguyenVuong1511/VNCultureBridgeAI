import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./FeaturedArticles.module.css";
import { articleApi } from "../../api/articleApi";
import { useTranslation } from "react-i18next";

export default function FeaturedArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await articleApi.getFeaturedArticles(i18n.language);
        if (res && res.success && res.data) {
          setArticles(res.data);
        }
      } catch (error) {
        console.error("Failed to load featured articles", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [i18n.language]);

  if (loading) {
    return <div className={styles.loading}>Loading featured content...</div>;
  }

  if (!articles || articles.length === 0) {
    return null; // Do not render section if no featured articles
  }

  return (
    <section id="featured" className={styles.featuredSection}>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className={styles.title}>{t('featured.title')}</h2>
        <p className={styles.subtitle}>
          {t('featured.subtitle')}
        </p>
        
        <div className={styles.grid}>
          {articles.map((article, index) => (
            <motion.div 
              key={article.id || index}
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className={styles.imageWrapper}>
                <img 
                  src={article.primaryMediaUrl || "/img/Banh-chung-bac.jpg"} 
                  alt={article.title} 
                  className={styles.cardImage} 
                  onError={(e) => { e.target.src = "/img/Banh-chung-bac.jpg" }}
                />
              </div>
              <div className={styles.cardContent}>
                <span className={styles.cardCategory}>{article.type || "Culture"}</span>
                <h3 className={styles.cardTitle}>{article.title}</h3>
                <p className={styles.cardSummary}>
                  {article.summary ? (article.summary.length > 100 ? article.summary.substring(0, 100) + "..." : article.summary) : "Discover fascinating cultural traditions."}
                </p>
                {/* Notice link points to /articles/{slug} but if not exist, we just link to # */}
                <a href={article.slug ? `/articles/${article.slug}` : "#"} className={styles.readMoreBtn}>
                  {t('featured.read_more')}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
