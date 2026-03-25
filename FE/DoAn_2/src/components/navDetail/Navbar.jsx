import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaSearch, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
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

  const handleBack = () => {
    navigate(-1);
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
        {/* --- LEFT SECTION --- */}
        <div className={styles.navLeft}>
          <Link to="/" className={styles.linkLogo}>
            <img src="/img/Logo.png" alt="Logo" className={styles.logo} />
          </Link>
          <Link to="/" className={styles.linka}>
            ← Back to Home
          </Link>
        </div>

        {/* --- CENTER SECTION: Search bar --- */}
        <div className={styles.navCenter}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchBtn}>
              <FaSearch />
            </button>
          </form>
        </div>

        {/* --- RIGHT SECTION --- */}
        <div className={styles.navRight}>
          {!isLoggedIn ? (
            <>
              <Link to="/signin" className={`${styles.btnLogin} ${styles.link} ${styles.btn}`}>
                Sign in
              </Link>
              <Link to="/signup" className={`${styles.btnRegister} ${styles.link} ${styles.btn}`}>
                Sign up
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
                <Link to="/profile" className={styles.dropdownItem}>Hồ sơ</Link>
                {isAdmin && <Link to="/admin" className={styles.dropdownItem}>Trang admin</Link>}
                <hr className={styles.divider} />
                <button onClick={handleLogout} className={styles.dropdownItem}>Đăng xuất</button>
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
        
        {/* Mobile Search and Menu */}
        <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ""}`}>
          <form onSubmit={handleSearch} className={styles.mobileSearchForm}>
            <input
              type="text"
              placeholder="Tìm kiếm..."
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
