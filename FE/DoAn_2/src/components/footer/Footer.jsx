import styles from "./Footer.module.css";
import { FaFacebookF, FaInstagram, FaYoutube, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  // Hàm cuộn đến section
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className={styles.footer}>
      {/* Decorative top border with Vietnamese pattern */}
      <div className={styles.topPattern}></div>
      
      <div className={styles.container}>
        {/* Column 1: Logo & Description */}
        <div className={`${styles.column} ${styles.logoWeb}`}>
          <div className={styles.logoWrapper}>
            <img src="/img/Logo.png" alt="VNCultureBridge Logo" className={styles.logo} />
            <p className={styles.desc}>
              Discover and preserve Vietnamese culture through modern AI technology
            </p>
          </div>
        </div>

        {/* Column 2: Vietnamese Culture */}
        <div className={`${styles.column} ${styles.none}`}>
          <h3 className={styles.title}>
            <span className={styles.titleIcon}>🔗</span>
            Quick Links
          </h3>
          <ul>
            <li><a href="#home" onClick={(e) => scrollToSection(e, "home")} className={styles.link}>Home</a></li>
            <li><a href="#about" onClick={(e) => scrollToSection(e, "about")} className={styles.link}>About</a></li>
            <li><a href="#places" onClick={(e) => scrollToSection(e, "places")} className={styles.link}>Discover</a></li>
            <li><a href="#ai" onClick={(e) => scrollToSection(e, "ai")} className={styles.link}>AI Explain</a></li>
            <li><a href="#feedback" onClick={(e) => scrollToSection(e, "feedback")} className={styles.link}>Feedback</a></li>
            <li><a href="#contact" onClick={(e) => scrollToSection(e, "contact")} className={styles.link}>Contact</a></li>
          </ul>
        </div>

        {/* Column 3: Resources */}
        <div className={`${styles.column} ${styles.none}`}>
          <h3 className={styles.title}>
            <span className={styles.titleIcon}>📚</span>
            Resources
          </h3>
          <ul>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Support Center</a></li>
            <li><a href="#">About Us</a></li>
          </ul>
        </div>

        {/* Column 4: Contact & Social Media */}
        <div className={styles.column}>
          <h3 className={styles.title}>
            <span className={styles.titleIcon}>📞</span>
            Contact
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
              <span>Hung Yen University of Technology & Education</span>
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

        {/* Column 5: Vietnam Map */}
        <div className={`${styles.column} ${styles.mapColumn}`}>
          <h3 className={styles.title}>
            <span className={styles.titleIcon}>🗺️</span>
            Location
          </h3>
          <div className={styles.mapContainer}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12534.066520222692!2d106.05213751907066!3d20.936434890341136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135a30555555555%3A0x39a8acd006ab8e69!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBTxrAgUGjhuqFtIEvhu7kgVGh14bqtdCBIxrBuZyBZw6puLCBDxqEgc-G7nyAy!5e0!3m2!1svi!2s!4v1764081802115!5m2!1svi!2s"
              width="100%"
              height="200"
              style={{ border: 0, borderRadius: '8px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Vietnam Map - Hung Yen University"
              className={styles.mapIframe}
            ></iframe>
            <a 
              href="https://www.google.com/maps/searhttps://maps.app.goo.gl/9ZgZF4xCgWanXFet7ch/Hung+Yen+University+of+Technology+and+Education,+Vietnam" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.mapFallback}
            >
              <img src="/img/flyout-map.png" alt="Vietnam Map - Click to view on Google Maps" className={styles.mapImage} />
              <div className={styles.mapOverlay}>
                <span>Click to view on Google Maps</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom section with pattern */}
      <div className={styles.bottom}>
        <div className={styles.bottomPattern}></div>
        <p className={styles.copyright}>
          © 2025 <span className={styles.brand}>VNCultureBridge AI</span> | 
          Designed by the Scientific Research Student Group
        </p>
      </div>
    </footer>
  );
}
