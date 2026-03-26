import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./CategorySection.module.css";
import { getCategories } from "../../api/categoryApi";
import { useTranslation } from "react-i18next";

// Helper function to map category code to an icon or fallback image
const getCategoryIcon = (code) => {
  const iconMap = {
    'LE_HOI': '🎉',
    'TIN_NGUONG': '🙏',
    'NGHE_THUAT': '🎭',
    'AM_THUC': '🍜',
    'TRANG_PHUC': '👗',
    'PHONG_TUC': '🏮',
    'LICH_SU': '📜',
    'DAN_GIAN': '🎶'
  };
  return iconMap[code] || '✨';
};

export default function CategorySection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories(i18n.language);
        if (data && Array.isArray(data)) {
          setCategories(data);
        }
      } catch (error) {
        console.error("Failed to load categories", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [i18n.language]);

  if (loading) {
    return <div className={styles.loading}>Đang tải chủ đề văn hóa...</div>;
  }

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section className={styles.categorySection}>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>{t('categories.title')}</h2>
          <p className={styles.subtitle}>
            {t('categories.subtitle')}
          </p>
        </div>
        
        <div className={styles.grid}>
          {categories.map((category, index) => (
            <motion.a 
              href={`/khám-phá?category=${category.slug || category.code}`}
              key={category.id || index}
              className={styles.card}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
            >
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>{getCategoryIcon(category.code)}</span>
              </div>
              <h3 className={styles.cardTitle}>{category.name}</h3>
              {category.description && (
                <p className={styles.cardDescription}>
                  {category.description.length > 60 ? category.description.substring(0, 60) + '...' : category.description}
                </p>
              )}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
