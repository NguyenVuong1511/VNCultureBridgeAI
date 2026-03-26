import styles from "./Footer.module.css";
import { FaFacebookF, FaInstagram, FaYoutube, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.topPattern}></div>

      <div className={styles.container}>
        <div className={`${styles.column} ${styles.logoWeb}`}>
          <div className={styles.logoWrapper}>
            <img src="/img/Logo.png" alt="VNCultureBridge Logo" className={styles.logo} />
            <p className={styles.desc}>{t("footer.desc")}</p>
          </div>
        </div>

        <div className={`${styles.column} ${styles.none}`}>
          <h3 className={styles.title}>
            <span className={styles.titleIcon}>🔗</span>
            {t("footer.quick_links")}
          </h3>
          <ul>
            <li><a href="#home" onClick={(e) => scrollToSection(e, "home")} className={styles.link}>{t("navbar.home")}</a></li>
            <li><a href="#about" onClick={(e) => scrollToSection(e, "about")} className={styles.link}>{t("navbar.about")}</a></li>
            <li><a href="#places" onClick={(e) => scrollToSection(e, "places")} className={styles.link}>{t("navbar.discover")}</a></li>
            <li><a href="#ai" onClick={(e) => scrollToSection(e, "ai")} className={styles.link}>{t("navbar.ai_assistant")}</a></li>
            <li><a href="#feedback" onClick={(e) => scrollToSection(e, "feedback")} className={styles.link}>{t("feedback.title")}</a></li>
            <li><a href="#contact" onClick={(e) => scrollToSection(e, "contact")} className={styles.link}>{t("navbar.contact")}</a></li>
          </ul>
        </div>

        <div className={`${styles.column} ${styles.none}`}>
          <h3 className={styles.title}>
            <span className={styles.titleIcon}>📚</span>
            {t("footer.resources")}
          </h3>
          <ul>
            <li><a href="#">{t("footer.faq")}</a></li>
            <li><a href="#">{t("footer.privacy")}</a></li>
            <li><a href="#">{t("footer.terms")}</a></li>
            <li><a href="#">{t("footer.support")}</a></li>
            <li><a href="#">{t("footer.about_us")}</a></li>
          </ul>
        </div>

        <div className={styles.column}>
          <h3 className={styles.title}>
            <span className={styles.titleIcon}>📞</span>
            {t("footer.contact")}
          </h3>
          <div className={styles.contactInfo}>
            <p className={styles.contactItem}>
              <FaEnvelope className={styles.contactIcon} />
              <span>info@vnculturebridge.vn</span>
            </p>
            <p className={styles.contactItem}>
              <FaPhoneAlt className={styles.contactIcon} />
              <span>+84 123 456 789</span>
            </p>
            <p className={styles.contactItem}>
              <FaMapMarkerAlt className={styles.contactIcon} />
              <span>{t("footer.address")}</span>
            </p>
          </div>

          <div className={styles.socials}>
            <a href="#" className={styles.socialLink} aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" className={styles.socialLink} aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" className={styles.socialLink} aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
        </div>

        <div className={`${styles.column} ${styles.mapColumn}`}>
          <h3 className={styles.title}>
            <span className={styles.titleIcon}>🗺️</span>
            {t("footer.location")}
          </h3>
          <div className={styles.mapContainer}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12534.066520222692!2d106.05213751907066!3d20.936434890341136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135a30555555555%3A0x39a8acd006ab8e69!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBTxrAgUGjhuqFtIEvhu7kgVGh14bqtdCBIxrBuZyBZw6puLCBDxqEgc-G7nyAy!5e0!3m2!1svi!2s!4v1764081802115!5m2!1svi!2s"
              width="100%"
              height="200"
              style={{ border: 0, borderRadius: "8px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Vietnam Map - Hung Yen University"
              className={styles.mapIframe}
            ></iframe>
            <a
              href="https://maps.app.goo.gl/9ZgZF4xCgWanXFet7"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapFallback}
            >
              <img src="/img/flyout-map.png" alt="Vietnam Map" className={styles.mapImage} />
              <div className={styles.mapOverlay}>
                <span>{t("footer.map_cta")}</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottomPattern}></div>
        <p className={styles.copyright}>
          © 2025 <span className={styles.brand}>VNCultureBridge AI</span> | {t("footer.bottom_credit")}
        </p>
      </div>
    </footer>
  );
}
