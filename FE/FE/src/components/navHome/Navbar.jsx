import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaGlobe } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const exploreMenuItems = [
  {
    title: "Miền Bắc",
    image: "/img/Sapa.webp",
    href: "/places-to-go/northern-vietnam",
    highlights: ["Sapa", "Hà Nội", "Hà Giang", "Vịnh Hạ Long"],
  },
  {
    title: "Miền Trung",
    image: "/img/Co-do-hue.jpg",
    href: "/places-to-go/central-vietnam",
    highlights: ["Huế", "Đà Nẵng", "Hội An", "Phong Nha"],
  },
  {
    title: "Miền Nam",
    image: "/img/Cho-noi-cai-rang.jpg",
    href: "/places-to-go/southern-vietnam",
    highlights: ["TP.HCM", "Cần Thơ", "Phú Quốc", "Châu Đốc"],
  },
];

const popularDestinations = [
  "Sapa",
  "Hà Nội",
  "Vịnh Hạ Long",
  "Huế",
  "Đà Nẵng",
  "Hội An",
  "Nha Trang",
  "Đà Lạt",
  "TP.HCM",
  "Cần Thơ",
  "Phú Quốc",
  "An Giang",
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentAcc, setCurrentAcc] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showDiscoverMenu, setShowDiscoverMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef();
  const discoverRef = useRef();

  useEffect(() => {
    const storedAcc = JSON.parse(localStorage.getItem("CurrentAcc"));
    if (storedAcc) {
      setCurrentAcc(storedAcc);
      setIsLoggedIn(true);
      setIsAdmin(storedAcc?.role === "admin");
    }

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
      if (discoverRef.current && !discoverRef.current.contains(e.target)) {
        setShowDiscoverMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("CurrentAcc");
    localStorage.removeItem("AccessToken");
    setIsLoggedIn(false);
    setCurrentAcc(null);
    window.location.reload();
  };

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
    setShowDiscoverMenu(false);
  };

  const toggleLanguage = () => {
    const nextLang = i18n.language === "en" ? "vi" : "en";
    i18n.changeLanguage(nextLang);
  };

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.container}`}>
        <div className={styles.navLeft}>
          <Link to="/" className={styles.linkLogo}>
            <img src="/img/Logo.png" alt="Logo" className={styles.logo} />
          </Link>
        </div>

        <ul className={`${styles.navItems} ${mobileMenuOpen ? styles.mobileMenuOpen : ""}`}>
          <li>
            <Link to="/" className={`${styles.link} ${styles.navItem}`}>
              {t("navbar.home")}
            </Link>
          </li>
          <li>
            <Link to="/#about" onClick={(e) => scrollToSection(e, "about")} className={`${styles.link} ${styles.navItem}`}>
              {t("navbar.about")}
            </Link>
          </li>

          <li
            ref={discoverRef}
            className={`${styles.discoverItem} ${showDiscoverMenu ? styles.discoverItemActive : ""}`}
            onMouseEnter={() => setShowDiscoverMenu(true)}
            onMouseLeave={() => setShowDiscoverMenu(false)}
          >
            <button
              type="button"
              className={`${styles.link} ${styles.navItem} ${styles.discoverTrigger}`}
              onClick={() => setShowDiscoverMenu((prev) => !prev)}
            >
              {t("navbar.discover")} <span className={styles.discoverChevron}>▾</span>
            </button>

            <div className={`${styles.megaMenu} ${showDiscoverMenu ? styles.megaMenuOpen : ""}`}>
              <div className={styles.megaMenuHeader}>
                <div>
                  <h3 className={styles.headerTitle}>{t("explore.mega_title")}</h3>
                  <p className={styles.headerDescription}>
                    {t("explore.mega_subtitle")}
                  </p>
                </div>
                <Link to="/explore" className={styles.headerAction} onClick={() => setShowDiscoverMenu(false)}>
                  {t("explore.view_all")}
                </Link>
              </div>

              <div className={styles.megaMenuBody}>
                <div className={styles.exploreCards}>
                  {exploreMenuItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={styles.exploreCard}
                      onClick={() => setShowDiscoverMenu(false)}
                    >
                      <img src={item.image} alt={item.title} className={styles.cardImage} />
                      <div className={styles.cardOverlay}>
                        <div className={styles.cardTitle}>{item.title}</div>
                      </div>
                      <div className={styles.cardContent}>
                        <ul className={styles.highlightList}>
                          {item.highlights.map((highlight) => (
                            <li key={highlight} className={styles.highlightItem}>{highlight}</li>
                          ))}
                        </ul>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className={styles.popularSection}>
                  <div className={styles.popularTitle}>{t("explore.popular_title")}</div>
                  <div className={styles.popularGrid}>
                    {popularDestinations.map((item) => (
                      <a
                        key={item}
                        href="#places"
                        className={styles.popularLink}
                        onClick={(e) => scrollToSection(e, "places")}
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li>
            <Link to="#ai" onClick={(e) => scrollToSection(e, "ai")} className={`${styles.link} ${styles.navItem}`}>
              {t("navbar.ai_feedback")}
            </Link>
          </li>
          <li>
            <Link to="/#contact" onClick={(e) => scrollToSection(e, "contact")} className={`${styles.link} ${styles.navItem}`}>
              {t("navbar.contact")}
            </Link>
          </li>
        </ul>

        <div className={styles.navRight}>
          <button className={styles.langToggle} onClick={toggleLanguage} title="Ngôn ngữ / Language">
            <FaGlobe className={styles.langIcon} />
            <span className={styles.langText}>{i18n.language === "en" ? "EN" : "VI"}</span>
          </button>

          {!isLoggedIn ? (
            <>
              <Link to="/signin" className={`${styles.btnLogin} ${styles.link} ${styles.btn}`}>
                {t("navbar.login")}
              </Link>
              <Link to="/signup" className={`${styles.btnRegister} ${styles.link} ${styles.btn}`}>
                {t("navbar.register")}
              </Link>
            </>
          ) : (
            <div className={styles.userMenu} ref={menuRef}>
              <button className={styles.userButton} onClick={() => setShowMenu((prev) => !prev)}>
                <img src={currentAcc?.avatar || "/img/avatar.png"} alt="User Avatar" className={styles.avatar} />
                <span className={styles.username}>{currentAcc?.username || "User"}</span>
              </button>

              <div className={`${styles.dropdown} ${showMenu ? styles.show : ""}`}>
                <Link to="/profile" className={styles.dropdownItem}>{t("navbar.profile")}</Link>
                {isAdmin && <Link to="/admin" className={styles.dropdownItem}>{t("navbar.admin")}</Link>}
                <hr className={styles.divider} />
                <button onClick={handleLogout} className={styles.dropdownItem}>{t("navbar.logout")}</button>
              </div>
            </div>
          )}

          <button
            className={styles.mobileMenuButton}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
