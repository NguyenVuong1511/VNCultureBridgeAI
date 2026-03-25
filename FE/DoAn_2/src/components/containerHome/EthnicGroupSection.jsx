import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./EthnicGroupSection.module.css";
import { getEthnicGroups } from "../../api/ethnicGroupApi";

export default function EthnicGroupSection() {
  const [ethnicGroups, setEthnicGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEthnicGroups = async () => {
      try {
        const data = await getEthnicGroups();
        if (data && Array.isArray(data)) {
          // If too many, slice to show top ones, or show all in a horizontal scroller
          setEthnicGroups(data.slice(0, 8)); 
        }
      } catch (error) {
        console.error("Failed to load ethnic groups", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEthnicGroups();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Đang tải danh sách dân tộc...</div>;
  }

  // Defensively handle empty but still show the section introduction
  const groupsToRender = ethnicGroups.length > 0 ? ethnicGroups : [
    { id: 'placeholder-1', name: "Kinh", description: "Dân tộc đa số tại Việt Nam với nền văn hóa phong phú." },
    { id: 'placeholder-2', name: "Tày", description: "Cư trú chủ yếu ở vùng núi phía Bắc." },
    { id: 'placeholder-3', name: "Thái", description: "Nổi tiếng với điệu múa xòe và trang phục truyền thống." },
    { id: 'placeholder-4', name: "Mường", description: "Có nền văn hóa Hòa Bình nổi tiếng." }
  ];

  return (
    <section className={styles.ethnicSection}>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.textContent}>
          <motion.h2 
            className={styles.title}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Cộng Đồng 54 Dân Tộc
          </motion.h2>
          <motion.p 
            className={styles.description}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Việt Nam tự hào với 54 dân tộc anh em, mỗi dân tộc mang một bản sắc văn hóa riêng biệt, từ ngôn ngữ, trang phục, phong tục tập quán đến nghệ thuật truyền thống, cùng nhau tạo nên một bức tranh văn hóa Việt Nam đa màu sắc và rực rỡ.
          </motion.p>
          <motion.a 
            href="/dan-toc" 
            className={styles.exploreBtn}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Khám phá tất cả
          </motion.a>
        </div>

        <div className={styles.cardsContainer}>
          <div className={styles.cardTrack}>
            {groupsToRender.map((group, index) => (
              <motion.div
                key={group.id || index}
                className={styles.card}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className={styles.cardImagePlaceholder}>
                  <img 
                    src={group.thumbnail || "/img/Banh-chung-bac.jpg"} 
                    alt={group.name} 
                    className={styles.image}
                    onError={(e) => { e.target.src = "/img/Banh-chung-bac.jpg" }}
                  />
                  <div className={styles.overlay}>
                    <h3 className={styles.groupName}>{group.name}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
