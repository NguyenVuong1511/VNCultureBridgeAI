import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "../navDetail/Navbar";
import FooterDetail from "../footer/FooterDetail";
import styles from "./RegionPage.module.css";

const ITEMS_PER_PAGE = 12;

export default function RegionPage({ regionData }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("overview");
  const [currentPage, setCurrentPage] = useState(1);

  const regionKey = regionData.title === "Northern Vietnam"
    ? "northern"
    : regionData.title === "Central Vietnam"
      ? "central"
      : "southern";

  const localizedRegionTitle = t(`regions.${regionKey}.title`, { defaultValue: regionData.title });
  const localizedHeroCredit = t(`regions.${regionKey}.heroCredit`, { defaultValue: regionData.heroCredit || "" });
  const localizedOverview = {
    highlight: t(`regions.${regionKey}.overview.highlight`, { defaultValue: regionData.overview.highlight }),
    description1: t(`regions.${regionKey}.overview.description1`, { defaultValue: regionData.overview.description1 }),
    description2: t(`regions.${regionKey}.overview.description2`, { defaultValue: regionData.overview.description2 }),
  };

  const localizedHighlights = (regionData.overview.highlights || []).map((highlight, index) => ({
    ...highlight,
    title: t(`regions.${regionKey}.overview.highlights.${index}.title`, { defaultValue: highlight.title }),
    description: t(`regions.${regionKey}.overview.highlights.${index}.description`, { defaultValue: highlight.description }),
  }));

  const tabs = [
    { id: "overview", label: t("region.tabs.overview") },
    { id: "destinations", label: t("region.tabs.destinations") },
    { id: "food", label: t("region.tabs.food") },
    { id: "culture", label: t("region.tabs.culture") },
    { id: "nature", label: t("region.tabs.nature") },
    { id: "beaches", label: t("region.tabs.beaches") },
  ];

  const regionSlug = regionData.title.toLowerCase().replace(/\s+/g, "-");

  useEffect(() => {
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const paginateItems = (items = []) => {
    const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedItems = items.slice(startIndex, endIndex);
    return { paginatedItems, totalPages };
  };

  const getItemSlug = (item) => item.name?.toLowerCase().replace(/\s+/g, "-") || item.title?.toLowerCase().replace(/\s+/g, "-");

  const renderPagination = (totalPages, totalItems) => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    pages.push(
      <button
        key="prev"
        className={`${styles.pageButton} ${currentPage === 1 ? styles.disabled : ""}`}
        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
        disabled={currentPage === 1}
      >
        ‹
      </button>
    );

    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          className={`${styles.pageButton} ${currentPage === 1 ? styles.active : ""}`}
          onClick={() => setCurrentPage(1)}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="ellipsis1" className={styles.ellipsis}>...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`${styles.pageButton} ${currentPage === i ? styles.active : ""}`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="ellipsis2" className={styles.ellipsis}>...</span>);
      }
      pages.push(
        <button
          key={totalPages}
          className={`${styles.pageButton} ${currentPage === totalPages ? styles.active : ""}`}
          onClick={() => setCurrentPage(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    pages.push(
      <button
        key="next"
        className={`${styles.pageButton} ${currentPage === totalPages ? styles.disabled : ""}`}
        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
        disabled={currentPage === totalPages}
      >
        ›
      </button>
    );

    const startItem = ((currentPage - 1) * ITEMS_PER_PAGE) + 1;
    const endItem = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);

    return (
      <div className={styles.pagination}>
        <div className={styles.paginationInfo}>
          {t("region.pagination", { startItem, endItem, totalItems })}
        </div>
        <div className={styles.paginationButtons}>{pages}</div>
      </div>
    );
  };

  const renderCardGrid = (items, category) => {
    const { paginatedItems, totalPages } = paginateItems(items || []);

    return (
      <div className={styles.contentSection}>
        <div className={styles.grid}>
          {paginatedItems.map((item, index) => (
            <Link
              key={(currentPage - 1) * ITEMS_PER_PAGE + index}
              to={`/places-to-go/${regionSlug}/${category}/${getItemSlug(item)}`}
              className={styles.cardLink}
            >
              <motion.div
                className={category === "destinations" ? styles.destinationCard : styles.contentCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={styles.imageWrapper}>
                  <img src={item.image} alt={item.name || item.title} />
                </div>
                <div className={styles.cardOverlay}>
                  <h3>{item.name || item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
        {renderPagination(totalPages, items.length)}
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className={styles.contentSection}>
            <div className={styles.introText}>
              <p className={styles.highlightText}>{localizedOverview.highlight}</p>

              {regionData.overview.images?.[0] && (
                <motion.div
                  className={styles.overviewImage}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <img src={regionData.overview.images[0].src} alt={regionData.overview.images[0].alt || localizedRegionTitle} />
                  {regionData.overview.images[0].caption && (
                    <p className={styles.imageCaption}>{regionData.overview.images[0].caption}</p>
                  )}
                </motion.div>
              )}

              <p>{localizedOverview.description1}</p>

              {regionData.overview.images?.[1] && (
                <motion.div
                  className={styles.overviewImage}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <img src={regionData.overview.images[1].src} alt={regionData.overview.images[1].alt || localizedRegionTitle} />
                  {regionData.overview.images[1].caption && (
                    <p className={styles.imageCaption}>{regionData.overview.images[1].caption}</p>
                  )}
                </motion.div>
              )}

              <p>{localizedOverview.description2}</p>

              {localizedHighlights.length > 0 && (
                <div className={styles.simpleHighlights}>
                  <h3 className={styles.simpleHighlightsTitle}>{t("region.special_title")}</h3>
                  <ul className={styles.highlightsList}>
                    {localizedHighlights.map((highlight, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <span className={styles.highlightIcon} dangerouslySetInnerHTML={{ __html: highlight.icon }}></span>
                        <div>
                          <strong>{highlight.title}</strong>
                          <span> - {highlight.description}</span>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        );
      case "destinations":
        return renderCardGrid(regionData.destinations || [], "destinations");
      case "food":
        return renderCardGrid(regionData.food || [], "food");
      case "culture":
        return renderCardGrid(regionData.culture || [], "culture");
      case "nature":
        return renderCardGrid(regionData.nature || [], "nature");
      case "beaches":
        return renderCardGrid(regionData.beaches || [], "beaches");
      default:
        return null;
    }
  };

  return (
    <div className={styles.regionPage}>
      <Navbar />

      <div className={styles.hero}>
        <div className={styles.heroImage}>
          <img src={regionData.heroImage} alt={localizedRegionTitle} />
        </div>
        <div className={styles.heroOverlay}>
          <h1 className={styles.heroTitle}>{localizedRegionTitle}</h1>
        </div>
        {localizedHeroCredit && (
          <div className={styles.heroCredit}>{localizedHeroCredit}</div>
        )}
      </div>

      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.active : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.mainContent}>
        {renderContent()}
      </div>

      <FooterDetail />
    </div>
  );
}
