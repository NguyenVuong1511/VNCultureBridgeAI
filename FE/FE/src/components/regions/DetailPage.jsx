import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Navbar from "../navDetail/Navbar";
import FooterDetail from "../footer/FooterDetail";
import styles from "./DetailPage.module.css";

export default function DetailPage({ regionData }) {
  const { category, id } = useParams();
  const navigate = useNavigate();

  // Scroll to top when component mounts or when category/id changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [category, id]);

  // Get the item data based on category and id
  const getItemData = () => {
    let items = [];
    let categoryName = "";

    switch (category) {
      case "destinations":
        items = regionData.destinations || [];
        categoryName = "Top Destinations";
        break;
      case "food":
        items = regionData.food || [];
        categoryName = "Food";
        break;
      case "culture":
        items = regionData.culture || [];
        categoryName = "Culture";
        break;
      case "nature":
        items = regionData.nature || [];
        categoryName = "Nature";
        break;
      case "beaches":
        items = regionData.beaches || [];
        categoryName = "Beaches";
        break;
      default:
        return null;
    }

    const item = items.find((item, index) => {
      // Try to match by id (if it's a number or slug)
      if (item.id && item.id.toString() === id) return true;
      // Try to match by index
      if (index.toString() === id) return true;
      // Try to match by slug (title converted to slug)
      const slug = item.name?.toLowerCase().replace(/\s+/g, "-") || 
                   item.title?.toLowerCase().replace(/\s+/g, "-");
      if (slug === id) return true;
      return false;
    });

    return { item, categoryName, items };
  };

  const { item, categoryName, items } = getItemData();

  if (!item) {
    return (
      <div className={styles.detailPage}>
        <Navbar />
        <div className={styles.notFound}>
          <h2>Item not found</h2>
          <Link to={`/places-to-go/${regionData.title.toLowerCase().replace(/\s+/g, "-")}`}>
            ← Back to {regionData.title}
          </Link>
        </div>
        <FooterDetail />
      </div>
    );
  }

  // Get current index and navigation
  const currentIndex = items.findIndex((i) => {
    const slug = i.name?.toLowerCase().replace(/\s+/g, "-") || 
                 i.title?.toLowerCase().replace(/\s+/g, "-");
    return slug === id || i.id?.toString() === id;
  });

  const prevItem = currentIndex > 0 ? items[currentIndex - 1] : null;
  const nextItem = currentIndex < items.length - 1 ? items[currentIndex + 1] : null;

  const getItemSlug = (item) => {
    return item.name?.toLowerCase().replace(/\s+/g, "-") || 
           item.title?.toLowerCase().replace(/\s+/g, "-");
  };

  const title = item.name || item.title;
  const description = item.description;
  const image = item.image;
  const content = item.content || item.detailedDescription || description;

  return (
    <div className={styles.detailPage}>
      <Navbar />
      
      {/* Hero Image */}
      <div className={styles.heroSection}>
        <div className={styles.heroImage}>
          <img src={image} alt={title} />
        </div>
        <div className={styles.heroOverlay}>
          <div className={styles.breadcrumb}>
            <Link to="/">Home</Link>
            <span> / </span>
            <Link to={`/places-to-go/${regionData.title.toLowerCase().replace(/\s+/g, "-")}`}>
              {regionData.title}
            </Link>
            <span> / </span>
            <span>{categoryName}</span>
            <span> / </span>
            <span>{title}</span>
          </div>
          <h1 className={styles.heroTitle}>{title}</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          {/* Article Content */}
          <article className={styles.article}>
            <div className={styles.articleHeader}>
              <span className={styles.categoryBadge}>{categoryName}</span>
              <h2 className={styles.articleTitle}>{title}</h2>
            </div>

            <div className={styles.articleBody}>
              {item.images && item.images.length > 0 && (
                <div className={styles.articleImages}>
                  {item.images.map((img, index) => (
                    <motion.div
                      key={index}
                      className={styles.articleImage}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <img src={img.src || img} alt={img.alt || `${title} ${index + 1}`} />
                      {img.caption && <p className={styles.imageCaption}>{img.caption}</p>}
                    </motion.div>
                  ))}
                </div>
              )}

              <div className={styles.articleText}>
                {Array.isArray(content) ? (
                  content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))
                ) : (
                  <p>{content}</p>
                )}

                {item.highlights && (
                  <div className={styles.highlightsSection}>
                    <h3>Highlights</h3>
                    <ul>
                      {item.highlights.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {item.tips && item.tips.length > 0 && (
                  <div className={styles.tipsSection}>
                    <h3>Travel Tips</h3>
                    <ul>
                      {item.tips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {item.location && (
                  <div className={styles.locationSection}>
                    <h3>Location</h3>
                    <p>{item.location}</p>
                  </div>
                )}
              </div>
            </div>
          </article>

          {/* Navigation */}
          <div className={styles.navigation}>
            {prevItem && (
              <Link
                to={`/places-to-go/${regionData.title.toLowerCase().replace(/\s+/g, "-")}/${category}/${getItemSlug(prevItem)}`}
                className={styles.navButton}
              >
                <span className={styles.navArrow}>←</span>
                <div className={styles.navContent}>
                  <span className={styles.navLabel}>Previous</span>
                  <span className={styles.navTitle}>{prevItem.name || prevItem.title}</span>
                </div>
              </Link>
            )}
            
            {nextItem && (
              <Link
                to={`/places-to-go/${regionData.title.toLowerCase().replace(/\s+/g, "-")}/${category}/${getItemSlug(nextItem)}`}
                className={`${styles.navButton} ${styles.navButtonNext}`}
              >
                <div className={styles.navContent}>
                  <span className={styles.navLabel}>Next</span>
                  <span className={styles.navTitle}>{nextItem.name || nextItem.title}</span>
                </div>
                <span className={styles.navArrow}>→</span>
              </Link>
            )}
          </div>

          {/* Back to Category */}
          <div className={styles.backSection}>
            <Link
              to={`/places-to-go/${regionData.title.toLowerCase().replace(/\s+/g, "-")}`}
              className={styles.backButton}
            >
              ← Back to {regionData.title}
            </Link>
          </div>
        </div>
      </div>

      <FooterDetail />
    </div>
  );
}

