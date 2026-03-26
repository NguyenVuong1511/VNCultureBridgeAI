import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import styles from "./Feedback.module.css";
import { motion } from "framer-motion";
import { feedbackApi } from "../../api/feedbackApi";
import { useTranslation } from "react-i18next";

export default function Feedback() {
  const [user, setUser] = useState(null);
  const { t } = useTranslation();

  // 🔹 Lấy user từ localStorage (giống Navbar)
  useEffect(() => {
    const currentAcc = JSON.parse(localStorage.getItem("CurrentAcc"));
    if (currentAcc) {
      setUser(currentAcc);
    }
  }, []);

  // Hàm mask email: chỉ hiển thị 3 ký tự đầu + *** + domain
  const maskEmail = (email) => {
    if (!email || !email.includes('@')) return "***@***";
    const [localPart, domain] = email.split('@');
    if (localPart.length <= 3) {
      return `${localPart}***@${domain}`;
    }
    return `${localPart.substring(0, 3)}***@${domain}`;
  };

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await feedbackApi.getPublicFeedbacks();
      if (res.success && res.data) {
        const formattedReviews = res.data.map(r => ({
          id: r.id,
          email: r.userEmail || "",
          maskedEmail: maskEmail(r.userEmail || ""),
          text: r.comment || "",
          rating: r.score || 5,
        }));
        setReviews(formattedReviews);
      }
    };
    fetchReviews();
  }, []);
  const [formData, setFormData] = useState({ text: "", rating: 5 });
  const [hoverRating, setHoverRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to submit feedback!");
      return;
    }

    const res = await feedbackApi.submitFeedback({ text: formData.text, rating: formData.rating });
    if (res.success) {
      // Refresh feedbacks
      const refreshRes = await feedbackApi.getPublicFeedbacks();
      if (refreshRes.success && refreshRes.data) {
        const formattedReviews = refreshRes.data.map(r => ({
          id: r.id,
          email: r.userEmail || "",
          maskedEmail: maskEmail(r.userEmail || ""),
          text: r.comment || "",
          rating: r.score || 5,
        }));
        setReviews(formattedReviews);
      }
      
      setFormData({ text: "", rating: 5 });
      setHoverRating(0);
      setCurrentPage(1);
    } else {
      alert("Failed to submit feedback. Please try again.");
    }
  };

  // Tính số lượng theo rating
  const ratingCounts = reviews.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {});

  // Phân trang
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section id="feedback" className={styles.feedbackSection}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className={styles.feedbackTitle}>{t('feedback.title')}</h2>

        {/* Form */}
        <form className={styles.feedbackForm} onSubmit={handleSubmit}>
          <textarea
            name="text"
            placeholder={
              user ? t('feedback.placeholder') : t('feedback.placeholder_login')
            }
            value={formData.text}
            onChange={handleChange}
            disabled={!user}
            required
          />

          <div className={styles.starRating}>
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`${styles.star} ${
                  (hoverRating || formData.rating) >= star
                    ? styles.selected
                    : ""
                }`}
                onMouseEnter={() => user && setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() =>
                  user && setFormData({ ...formData, rating: star })
                }
              />
            ))}
          </div>

          <button type="submit" className={styles.submitBtn} disabled={!user}>
            {t('feedback.submit')}
          </button>
        </form>

        {/* Rating summary */}
        <div className={styles.ratingSummary}>
          <div className={styles.ratingGrid}>
            {[1, 2, 3, 4, 5].map((star) => (
              <div key={star} className={styles.ratingRow}>
                <span className={styles.stars}>
                  {Array(star)
                    .fill()
                    .map((_, i) => (
                      <FaStar key={i} className={styles.smallStar} />
                    ))}
                </span>
                <span> ({ratingCounts[star] || 0})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback cards */}
        <div className={styles.feedbackContainer}>
          {currentReviews.map((fb, index) => (
            <div key={index} className={styles.feedbackCard}>
              <h3 className={styles.feedbackName}>{fb.maskedEmail}</h3>
              <div className={styles.feedbackStars}>
                {Array(fb.rating)
                  .fill()
                  .map((_, i) => (
                    <FaStar key={i} />
                  ))}
              </div>
              <p className={styles.feedbackText}>{fb.text}</p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              className={styles.btn}
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              &lt;&lt;
            </button>
            <button
              className={styles.btn}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              &lt;
            </button>

            {(() => {
              const pages = [];
              const maxPages = 4;
              let start = Math.max(1, currentPage - 1);
              let end = Math.min(totalPages, start + maxPages - 1);
              start = Math.max(1, end - maxPages + 1);
              for (let i = start; i <= end; i++) pages.push(i);
              return pages.map((page) => (
                <button
                  key={page}
                  className={`${styles.pageBtn} ${
                    page === currentPage ? styles.activePage : ""
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ));
            })()}

            <button
              className={styles.btn}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
            <button
              className={styles.btn}
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              &gt;&gt;
            </button>
          </div>
        )}
      </motion.div>
    </section>
  );
}
