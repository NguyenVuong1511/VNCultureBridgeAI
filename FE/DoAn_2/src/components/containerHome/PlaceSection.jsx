import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./PlaceSection.module.css";
import { regionApi } from "../../api/regionApi";
import { useTranslation } from "react-i18next";

export default function PlaceSection() {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const data = await regionApi.getRegions(i18n.language);
        if (data && Array.isArray(data)) {
          setRegions(data);
        }
      } catch (error) {
        console.error("Failed to load regions", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRegions();
  }, [i18n.language]);

  const getRegionName = (code, fallbackName) => {
    const region = regions.find(r => r.code === code);
    return region ? region.name : fallbackName;
  };

  return (
    <section id="places" className={styles.mapSection}>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>{t('places.title')}</h2>
          <p className={styles.subtitle}>
            {t('places.subtitle')}
          </p>
        </div>
      </motion.div>
      <div className={styles.container}>
        <img className={styles.map} src="/img/flyout-map.png" alt="" />

        <a className={`${styles.link} ${styles.north}`} href="/places-to-go/northern-vietnam">
          <span>{getRegionName(0, 'NORTHERN VIETNAM')}</span>
        </a>

        <a className={`${styles.link} ${styles.central}`} href="/places-to-go/central-vietnam">
          <span>{getRegionName(1, 'CENTRAL VIETNAM')}</span>
        </a>

        <a className={`${styles.link} ${styles.south}`} href="/places-to-go/southern-vietnam">
          <span>{getRegionName(2, 'SOUTHERN VIETNAM')}</span>
        </a>
      </div>
    </section>
  );
}
