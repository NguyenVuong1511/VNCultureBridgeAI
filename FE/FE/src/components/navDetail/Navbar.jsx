import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useState, useEffect, useRef } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentAcc, setCurrentAcc] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.navLeft}>
          <Link to="/" className={styles.linkLogo}>
            <img src="/img/Logo.png" alt="Logo" className={styles.logo} />
          </Link>
          <Link to="/" className={styles.linka}>
            ← {t("search.back_home")}
          </Link>
        </div>

        <div className={styles.navCenter}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <input
              type="text"
              placeholder={t("search.placeholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchBtn}>
              <FaSearch />
            </button>
          </form>
        </div>

        <div className={styles.navRight}>
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
                <img
                  src={currentAcc?.avatar || "/img/avatar.png"}
                  alt="User Avatar"
                  className={styles.avatar}
                />
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

        <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ""}`}>
          <form onSubmit={handleSearch} className={styles.mobileSearchForm}>
            <input
              type="text"
              placeholder={t("search.placeholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchBtn}>
              <FaSearch />
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
