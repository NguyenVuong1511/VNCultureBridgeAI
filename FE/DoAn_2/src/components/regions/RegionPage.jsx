import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../navDetail/Navbar";
import FooterDetail from "../footer/FooterDetail";
import styles from "./RegionPage.module.css";

const ITEMS_PER_PAGE = 12;

export default function RegionPage({ regionData }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 when tab changes and scroll to top
  useEffect(() => {
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const tabs = [
    { id: "overview", label: "OVERVIEW" },
    { id: "destinations", label: "TOP DESTINATIONS" },
    { id: "food", label: "FOOD" },
    { id: "culture", label: "CULTURE" },
    { id: "nature", label: "NATURE" },
    { id: "beaches", label: "BEACHES" },
  ];

  // Pagination helper function
  const paginateItems = (items) => {
    const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedItems = items.slice(startIndex, endIndex);
    return { paginatedItems, totalPages };
  };

  // Render pagination controls
  const renderPagination = (totalPages, totalItems) => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
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

    // First page
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

    // Page numbers
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

    // Last page
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

    // Next button
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
          Showing {startItem} - {endItem} of {totalItems}
        </div>
        <div className={styles.paginationButtons}>{pages}</div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className={styles.contentSection}>
            <div className={styles.introText}>
              <p className={styles.highlightText}>{regionData.overview.highlight}</p>
              
              {/* First Image */}
              {regionData.overview.images && regionData.overview.images[0] && (
                <motion.div
                  className={styles.overviewImage}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <img src={regionData.overview.images[0].src} alt={regionData.overview.images[0].alt || `${regionData.title}`} />
                  {regionData.overview.images[0].caption && (
                    <p className={styles.imageCaption}>{regionData.overview.images[0].caption}</p>
                  )}
                </motion.div>
              )}
              
              <p>{regionData.overview.description1}</p>
              
              {/* Second Image */}
              {regionData.overview.images && regionData.overview.images[1] && (
                <motion.div
                  className={styles.overviewImage}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <img src={regionData.overview.images[1].src} alt={regionData.overview.images[1].alt || `${regionData.title}`} />
                  {regionData.overview.images[1].caption && (
                    <p className={styles.imageCaption}>{regionData.overview.images[1].caption}</p>
                  )}
                </motion.div>
              )}
              
              <p>{regionData.overview.description2}</p>
              
              {/* Simple Highlights List */}
              {regionData.overview.highlights && regionData.overview.highlights.length > 0 && (
                <div className={styles.simpleHighlights}>
                  <h3 className={styles.simpleHighlightsTitle}>What Makes This Region Special</h3>
                  <ul className={styles.highlightsList}>
                    {regionData.overview.highlights.map((highlight, index) => (
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
        const { paginatedItems: paginatedDests, totalPages: destPages } = paginateItems(regionData.destinations);
        const getItemSlug = (item) => {
          return item.name?.toLowerCase().replace(/\s+/g, "-") || 
                 item.title?.toLowerCase().replace(/\s+/g, "-");
        };
        const regionSlug = regionData.title.toLowerCase().replace(/\s+/g, "-");
        return (
          <div className={styles.contentSection}>
            <div className={styles.grid}>
              {paginatedDests.map((dest, index) => (
                <Link
                  key={(currentPage - 1) * ITEMS_PER_PAGE + index}
                  to={`/places-to-go/${regionSlug}/destinations/${getItemSlug(dest)}`}
                  className={styles.cardLink}
                >
                  <motion.div
                    className={styles.destinationCard}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className={styles.imageWrapper}>
                      <img src={dest.image} alt={dest.name} />
                    </div>
                    <div className={styles.cardOverlay}>
                      <h3>{dest.name}</h3>
                      <p>{dest.description}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
            {renderPagination(destPages, regionData.destinations.length)}
          </div>
        );

      case "food":
        const { paginatedItems: paginatedFood, totalPages: foodPages } = paginateItems(regionData.food);
        const getFoodSlug = (item) => {
          return item.name?.toLowerCase().replace(/\s+/g, "-") || 
                 item.title?.toLowerCase().replace(/\s+/g, "-");
        };
        const regionSlugFood = regionData.title.toLowerCase().replace(/\s+/g, "-");
        return (
          <div className={styles.contentSection}>
            <div className={styles.grid}>
              {paginatedFood.map((item, index) => (
                <Link
                  key={(currentPage - 1) * ITEMS_PER_PAGE + index}
                  to={`/places-to-go/${regionSlugFood}/food/${getFoodSlug(item)}`}
                  className={styles.cardLink}
                >
                  <motion.div
                    className={styles.contentCard}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className={styles.imageWrapper}>
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div className={styles.cardOverlay}>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
            {renderPagination(foodPages, regionData.food.length)}
          </div>
        );

      case "culture":
        const { paginatedItems: paginatedCulture, totalPages: culturePages } = paginateItems(regionData.culture);
        const getCultureSlug = (item) => {
          return item.name?.toLowerCase().replace(/\s+/g, "-") || 
                 item.title?.toLowerCase().replace(/\s+/g, "-");
        };
        const regionSlugCulture = regionData.title.toLowerCase().replace(/\s+/g, "-");
        return (
          <div className={styles.contentSection}>
            <div className={styles.grid}>
              {paginatedCulture.map((item, index) => (
                <Link
                  key={(currentPage - 1) * ITEMS_PER_PAGE + index}
                  to={`/places-to-go/${regionSlugCulture}/culture/${getCultureSlug(item)}`}
                  className={styles.cardLink}
                >
                  <motion.div
                    className={styles.contentCard}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className={styles.imageWrapper}>
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div className={styles.cardOverlay}>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
            {renderPagination(culturePages, regionData.culture.length)}
          </div>
        );

      case "nature":
        const { paginatedItems: paginatedNature, totalPages: naturePages } = paginateItems(regionData.nature);
        const getNatureSlug = (item) => {
          return item.name?.toLowerCase().replace(/\s+/g, "-") || 
                 item.title?.toLowerCase().replace(/\s+/g, "-");
        };
        const regionSlugNature = regionData.title.toLowerCase().replace(/\s+/g, "-");
        return (
          <div className={styles.contentSection}>
            <div className={styles.grid}>
              {paginatedNature.map((item, index) => (
                <Link
                  key={(currentPage - 1) * ITEMS_PER_PAGE + index}
                  to={`/places-to-go/${regionSlugNature}/nature/${getNatureSlug(item)}`}
                  className={styles.cardLink}
                >
                  <motion.div
                    className={styles.contentCard}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className={styles.imageWrapper}>
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div className={styles.cardOverlay}>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
            {renderPagination(naturePages, regionData.nature.length)}
          </div>
        );

      case "beaches":
        const { paginatedItems: paginatedBeaches, totalPages: beachesPages } = paginateItems(regionData.beaches);
        const getBeachesSlug = (item) => {
          return item.name?.toLowerCase().replace(/\s+/g, "-") || 
                 item.title?.toLowerCase().replace(/\s+/g, "-");
        };
        const regionSlugBeaches = regionData.title.toLowerCase().replace(/\s+/g, "-");
        return (
          <div className={styles.contentSection}>
            <div className={styles.grid}>
              {paginatedBeaches.map((item, index) => (
                <Link
                  key={(currentPage - 1) * ITEMS_PER_PAGE + index}
                  to={`/places-to-go/${regionSlugBeaches}/beaches/${getBeachesSlug(item)}`}
                  className={styles.cardLink}
                >
                  <motion.div
                    className={styles.contentCard}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className={styles.imageWrapper}>
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div className={styles.cardOverlay}>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
            {renderPagination(beachesPages, regionData.beaches.length)}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.regionPage}>
      <Navbar />
      
      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroImage}>
          <img src={regionData.heroImage} alt={regionData.title} />
        </div>
        <div className={styles.heroOverlay}>
          <h1 className={styles.heroTitle}>{regionData.title}</h1>
        </div>
        {regionData.heroCredit && (
          <div className={styles.heroCredit}>{regionData.heroCredit}</div>
        )}
      </div>

      {/* Navigation Tabs */}
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

      {/* Content Section */}
      <div className={styles.mainContent}>
        {renderContent()}
      </div>

      <FooterDetail />
    </div>
  );
}

