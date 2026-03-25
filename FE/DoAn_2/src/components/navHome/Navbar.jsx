import { Link } from "react-router-dom";
import styles from './Navbar.module.css';
import { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaGlobe } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentAcc, setCurrentAcc] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const storedAcc = JSON.parse(localStorage.getItem("CurrentAcc"));
    if (storedAcc) {
      setCurrentAcc(storedAcc);
      setIsLoggedIn(true);
      const admin = storedAcc?.role === "admin" || storedAcc?.email === "admin@vietculture.com";
      setIsAdmin(!!admin);
    }

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("CurrentAcc");
    setIsLoggedIn(false);
    setCurrentAcc(null);
    window.location.reload();
  };

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'vi' : 'en';
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
          <li><Link to="#home" onClick={(e) => { scrollToSection(e, "home"); setMobileMenuOpen(false); }} className={`${styles.link} ${styles.navItem}`}>{t('navbar.home')}</Link></li>
          <li><Link to="#about" onClick={(e) => { scrollToSection(e, "about"); setMobileMenuOpen(false); }} className={`${styles.link} ${styles.navItem}`}>{t('navbar.about')}</Link></li>
          <li><Link to="#places" onClick={(e) => { scrollToSection(e, "places"); setMobileMenuOpen(false); }} className={`${styles.link} ${styles.navItem}`}>{t('navbar.discover')}</Link></li>
          <li><Link to="#ai" onClick={(e) => { scrollToSection(e, "ai"); setMobileMenuOpen(false); }} className={`${styles.link} ${styles.navItem}`}>{t('navbar.ai_assistant')}</Link></li>
          <li><Link to="#feedback" onClick={(e) => { scrollToSection(e, "feedback"); setMobileMenuOpen(false); }} className={`${styles.link} ${styles.navItem}`}>{t('feedback.title')}</Link></li>
          <li><Link to="#contact" onClick={(e) => { scrollToSection(e, "contact"); setMobileMenuOpen(false); }} className={`${styles.link} ${styles.navItem}`}>{t('navbar.contact')}</Link></li>
        </ul>

        <div className={styles.navRight}>
          <button 
            className={styles.langToggle} 
            onClick={toggleLanguage}
            title="Ngôn ngữ / Language"
          >
            <FaGlobe className={styles.langIcon} />
            <span className={styles.langText}>{i18n.language === 'en' ? 'EN' : 'VI'}</span>
          </button>

          {!isLoggedIn ? (
            <>
              <Link to="/signin" className={`${styles.btnLogin} ${styles.link} ${styles.btn}`}>
                {t('navbar.login')}
              </Link>
              <Link to="/signup" className={`${styles.btnRegister} ${styles.link} ${styles.btn}`}>
                {t('navbar.register')}
              </Link>
            </>
          ) : (
            <div className={styles.userMenu} ref={menuRef}>
              <button
                className={styles.userButton}
                onClick={() => setShowMenu((prev) => !prev)}
              >
                <img
                  src={currentAcc?.avatar || "/img/avatar.png"}
                  alt="User Avatar"
                  className={styles.avatar}
                />
                <span className={styles.username}>
                  {currentAcc?.username || "User"}
                </span>
              </button>

              <div className={`${styles.dropdown} ${showMenu ? styles.show : ""}`}>
                <Link to="/profile" className={styles.dropdownItem}>{t('navbar.profile')}</Link>
                {isAdmin && <Link to="/admin" className={styles.dropdownItem}>{t('navbar.admin')}</Link>}
                <hr className={styles.divider} />
                <button onClick={handleLogout} className={styles.dropdownItem}>{t('navbar.logout')}</button>
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
