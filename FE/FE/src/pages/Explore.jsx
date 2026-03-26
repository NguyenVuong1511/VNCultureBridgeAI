import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MainLayout from "../layouts/MainLayout";
import FeaturedArticles from "../components/containerHome/FeaturedArticles";
import { northernVietnamData } from "./NorthernVietnam";
import { centralVietnamData } from "./CentralVietnam";
import { southernVietnamData } from "./SouthernVietnam";
import styles from "./Explore.module.css";

const regionRoutes = {
  "Northern Vietnam": "/places-to-go/northern-vietnam",
  "Central Vietnam": "/places-to-go/central-vietnam",
  "Southern Vietnam": "/places-to-go/southern-vietnam",
};

const regionOrder = [northernVietnamData, centralVietnamData, southernVietnamData];

const getFeaturedDestinations = () =>
  regionOrder.flatMap((region) =>
    (region.destinations || []).slice(0, 3).map((item) => ({
      regionTitle: region.title,
      regionRoute: regionRoutes[region.title],
      title: item.name || item.title,
      description: item.description,
      image: item.image,
    }))
  );

export default function Explore() {
  const { t } = useTranslation();
  const featuredDestinations = getFeaturedDestinations();

  return (
    <MainLayout>
      <div className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <span className={styles.badge}>{t("explore.badge")}</span>
              <h1 className={styles.heroTitle}>{t("explore.title")}</h1>
              <p className={styles.heroSubtitle}>{t("explore.subtitle")}</p>

              <div className={styles.heroActions}>
                <a href="#regions" className={styles.primaryBtn}>{t("explore.cta_regions")}</a>
                <a href="#featured-destinations" className={styles.secondaryBtn}>{t("explore.cta_destinations")}</a>
              </div>
            </div>

            <div className={styles.heroPanel}>
              <div className={styles.quickCard}>
                <h3>{t("explore.quick_title")}</h3>
                <div className={styles.quickLinks}>
                  <Link to="/places-to-go/northern-vietnam">{t("explore.north")}</Link>
                  <Link to="/places-to-go/central-vietnam">{t("explore.central")}</Link>
                  <Link to="/places-to-go/southern-vietnam">{t("explore.south")}</Link>
                  <Link to="/search">{t("explore.search_cta")}</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="regions" className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>{t("explore.regions_title")}</h2>
            <p>{t("explore.regions_subtitle")}</p>
          </div>

          <div className={styles.regionGrid}>
            {regionOrder.map((region) => (
              <Link key={region.title} to={regionRoutes[region.title]} className={styles.regionCard}>
                <img src={region.heroImage} alt={region.title} className={styles.regionImage} />
                <div className={styles.regionBody}>
                  <span className={styles.regionLabel}>{t(`explore.region_labels.${region.title}`)}</span>
                  <h3>{t(`explore.region_titles.${region.title}`)}</h3>
                  <p>{region.overview.highlight}</p>
                  <ul className={styles.regionHighlights}>
                    {region.overview.highlights.slice(0, 3).map((item) => (
                      <li key={item.title}>{item.title}</li>
                    ))}
                  </ul>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section id="featured-destinations" className={styles.sectionAlt}>
          <div className={styles.portalLayout}>
            <div className={styles.mainColumn}>
              <div className={styles.sectionHeaderLeft}>
                <h2>{t("explore.destinations_title")}</h2>
                <p>{t("explore.destinations_subtitle")}</p>
              </div>

              <div className={styles.destinationGrid}>
                {featuredDestinations.map((item, index) => (
                  <Link key={`${item.regionTitle}-${item.title}-${index}`} to={item.regionRoute} className={styles.destinationCard}>
                    <img src={item.image} alt={item.title} className={styles.destinationImage} />
                    <div className={styles.destinationContent}>
                      <span className={styles.destinationRegion}>{t(`explore.region_titles.${item.regionTitle}`)}</span>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <aside className={styles.sidebar}>
              <div className={styles.sidebarCard}>
                <h3>{t("explore.sidebar_title")}</h3>
                <p>{t("explore.sidebar_subtitle")}</p>
                <div className={styles.sidebarLinks}>
                  <Link to="/search?q=ha-noi">Hà Nội</Link>
                  <Link to="/search?q=hoi-an">Hội An</Link>
                  <Link to="/search?q=phu-quoc">Phú Quốc</Link>
                  <Link to="/search?q=ha-long">Vịnh Hạ Long</Link>
                </div>
              </div>

              <div className={styles.sidebarCardAccent}>
                <h3>{t("explore.guide_title")}</h3>
                <p>{t("explore.guide_subtitle")}</p>
                <a href="#featured" className={styles.guideBtn}>{t("explore.guide_cta")}</a>
              </div>
            </aside>
          </div>
        </section>

        <FeaturedArticles />
      </div>
    </MainLayout>
  );
}
