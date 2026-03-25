import { useEffect, useState, useMemo } from "react";
import { FiSearch, FiX, FiTrash2, FiStar } from "react-icons/fi";
import styles from "./Admin.module.css";

// Local storage keys
const RATINGS_KEY = "Ratings"; // [{id, userEmail, score, comment, createdAt}]

export default function RatingsPanel() {
	const [ratings, setRatings] = useState(() => {
		try {
			const raw = localStorage.getItem(RATINGS_KEY);
			return raw ? JSON.parse(raw) : [];
		} catch {
			return [];
		}
	});
	const [searchTerm, setSearchTerm] = useState("");
	const [deleteConfirm, setDeleteConfirm] = useState(null);

	useEffect(() => {
		localStorage.setItem(RATINGS_KEY, JSON.stringify(ratings));
	}, [ratings]);

	// Reload ratings khi component mount để sync với Feedback component
	useEffect(() => {
		const loadRatings = () => {
			try {
				const raw = localStorage.getItem(RATINGS_KEY);
				if (raw) {
					setRatings(JSON.parse(raw));
				}
			} catch {
				// Ignore error
			}
		};
		loadRatings();
		// Listen for storage changes
		window.addEventListener('storage', loadRatings);
		return () => window.removeEventListener('storage', loadRatings);
	}, []);

	const filteredRatings = useMemo(() => {
		if (!searchTerm.trim()) return ratings;
		const term = searchTerm.toLowerCase();
		return ratings.filter(
			(r) =>
				r.name?.toLowerCase().includes(term) ||
				r.userEmail?.toLowerCase().includes(term) ||
				r.comment?.toLowerCase().includes(term) ||
				r.text?.toLowerCase().includes(term)
		);
	}, [ratings, searchTerm]);

	const deleteRating = (id) => {
		if (deleteConfirm === id) {
			setRatings((prev) => prev.filter((r) => r.id !== id));
			setDeleteConfirm(null);
		} else {
			setDeleteConfirm(id);
		}
	};

	const renderStars = (score) => {
		const stars = [];
		const numScore = score || 0;
		for (let i = 1; i <= 5; i++) {
			stars.push(
				<FiStar
					key={i}
					style={{
						color: i <= numScore ? "#FFD700" : "#ddd",
						fill: i <= numScore ? "#FFD700" : "none",
					}}
				/>
			);
		}
		return stars;
	};

	return (
		<section className={styles.card}>
			<div className={styles.cardHeader}>
				<h2 className={styles.cardTitle}>Quản lý đánh giá</h2>
				<span className={styles.count}>{ratings.length}</span>
			</div>

			<p style={{ marginBottom: "20px", color: "#666", fontSize: "14px", lineHeight: "1.6" }}>
				Đánh giá được tạo từ trang chủ. Bạn chỉ có thể xem và xóa đánh giá.
			</p>

			<div className={styles.searchContainer}>
				<div className={styles.searchBox}>
					<FiSearch className={styles.searchIcon} />
					<input
						type="text"
						className={styles.searchInput}
						placeholder="Tìm kiếm theo tên, email hoặc nội dung đánh giá..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					{searchTerm && (
						<button className={styles.clearButton} onClick={() => setSearchTerm("")}>
							<FiX />
						</button>
					)}
				</div>
			</div>

			<div className={styles.table}>
				<div className={`${styles.row_feedback} ${styles.rowHead}`}>
					<div>Tên / Email</div>
					<div>Điểm</div>
					<div>Nhận xét</div>
					<div>Ngày tạo</div>
					<div className={styles.actionsCol}>Thao tác</div>
				</div>
				{filteredRatings.length === 0 ? (
					<div className={styles.row_feedback}>
						<div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px", color: "#999" }}>
							{searchTerm ? "Không tìm thấy đánh giá nào" : "Chưa có đánh giá nào"}
						</div>
					</div>
				) : (
					filteredRatings.map((r) => (
						<div key={r.id} className={styles.row_feedback}>
							<div>
								<div style={{ fontWeight: 600, color: "#333", marginBottom: "4px" }}>
									{r.name || r.userEmail?.split('@')[0] || "User"}
								</div>
								<div style={{ fontSize: "12px", color: "#666" }}>{r.userEmail || ""}</div>
							</div>
							<div>
								<div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "4px" }}>
									{renderStars(r.score || r.rating || 0)}
								</div>
								<div style={{ fontSize: "12px", color: "#666", fontWeight: 600 }}>
									{r.score || r.rating || 0}/5
								</div>
							</div>
							<div style={{ maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis", color: "#555" }}>
								{r.comment || r.text || "—"}
							</div>
							<div style={{ fontSize: "13px", color: "#666" }}>
								{r.createdAt ? new Date(r.createdAt).toLocaleString('vi-VN') : "—"}
							</div>
							<div className={styles.actions}>
								<button
									className={`${styles.button} ${styles.danger} ${styles.buttonIcon}`}
									onClick={() => deleteRating(r.id)}
									title="Xóa đánh giá"
								>
									<FiTrash2 /> {deleteConfirm === r.id ? "Xác nhận?" : "Xóa"}
								</button>
							</div>
						</div>
					))
				)}
			</div>
		</section>
	);
}


