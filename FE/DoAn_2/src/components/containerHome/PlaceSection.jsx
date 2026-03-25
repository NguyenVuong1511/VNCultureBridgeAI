import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./PlaceSection.module.css";
import { regionApi } from "../../api/regionApi";

export default function PlaceSection() {
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    const fetchRegions = async () => {
      // The current UI uses English, but let's fetch 'en' or fallback to 'vi' gracefully
      const res = await regionApi.getRegions('en');
      if (res && res.success && res.data) {
        setRegions(res.data);
      }
    };
    fetchRegions();
  }, []);

  const getRegionName = (index, fallback) => {
    if (regions && regions[index] && regions[index].name) {
      return regions[index].name.toUpperCase();
    }
    return fallback;
  };

  return (
    <section id="places" className={styles.places}>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className={styles.title}>Discover the Best of Vietnam</h2>
        <p className={styles.subtitle}>
          Vietnam is a wonderfully diverse country with many fascinating places to
          visit — from dramatic landscapes to rich cultural traditions. These
          highlighted experiences are a great place to start your journey.
        </p>
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
