import { useEffect, useState, useMemo } from "react";
import { FiSearch, FiX, FiUserCheck, FiUserX, FiTrash2 } from "react-icons/fi";
import styles from "./Admin.module.css";

// Component để hiển thị avatar với fallback
function UserAvatar({ user }) {
	const [imageError, setImageError] = useState(false);
	const hasAvatar = user.avatar && user.avatar.startsWith('data:') && !imageError;
	const initial = (user.username || user.email || "U").charAt(0).toUpperCase();

	return (
		<div style={{ position: 'relative' }}>
			{hasAvatar ? (
				<img 
					src={user.avatar} 
					alt={user.username || "User"} 
					className={styles.userAvatar}
					onError={() => setImageError(true)}
				/>
			) : (
				<div className={styles.userAvatarPlaceholder}>
					{initial}
				</div>
			)}
		</div>
	);
}

export default function UsersPanel() {
	const [users, setUsers] = useState(() => {
		const raw = localStorage.getItem("User");
		return raw ? JSON.parse(raw) : [];
	});
	const [searchTerm, setSearchTerm] = useState("");
	const [deleteConfirm, setDeleteConfirm] = useState(null);

	useEffect(() => {
		localStorage.setItem("User", JSON.stringify(users));
	}, [users]);

	const filteredUsers = useMemo(() => {
		if (!searchTerm.trim()) return users;
		const term = searchTerm.toLowerCase();
		return users.filter(
			(u) =>
				u.username?.toLowerCase().includes(term) ||
				u.email?.toLowerCase().includes(term) ||
				u.role?.toLowerCase().includes(term)
		);
	}, [users, searchTerm]);

	const promoteToAdmin = (userId) => {
		if (window.confirm("Bạn có chắc muốn cấp quyền admin cho người dùng này?")) {
			setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: "admin" } : u)));
		}
	};

	const revokeAdmin = (userId) => {
		if (window.confirm("Bạn có chắc muốn thu hồi quyền admin của người dùng này?")) {
			setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: undefined } : u)));
		}
	};

	const deleteUser = (userId) => {
		if (deleteConfirm === userId) {
			setUsers((prev) => prev.filter((u) => u.id !== userId));
			setDeleteConfirm(null);
		} else {
			setDeleteConfirm(userId);
			}
	};

	return (
		<section className={styles.card}>
			<div className={styles.cardHeader}>
				<h2 className={styles.cardTitle}>Quản lý người dùng</h2>
				<span className={styles.count}>{users.length}</span>
			</div>

			<div className={styles.searchContainer}>
				<div className={styles.searchBox}>
					<FiSearch className={styles.searchIcon} />
					<input
						type="text"
						className={styles.searchInput}
						placeholder="Tìm kiếm theo tên, email hoặc role..."
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
				<div className={`${styles.row_users} ${styles.rowHead}`}>
					<div>Avatar</div>
					<div>Thông tin người dùng</div>
					<div>Email</div>
					<div>Role</div>
					<div>Ngày tạo</div>
					<div className={styles.actionsCol}>Thao tác</div>
				</div>
				{filteredUsers.length === 0 ? (
					<div className={styles.row_users}>
						<div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px", color: "#999" }}>
							{searchTerm ? "Không tìm thấy người dùng nào" : "Chưa có người dùng nào"}
						</div>
					</div>
				) : (
					filteredUsers.map((u) => (
						<div key={u.id} className={styles.row_users}>
							<div>
								<UserAvatar user={u} />
							</div>
							<div>
								<div style={{ fontWeight: 600, color: "#333", marginBottom: "4px" }}>
									{u.username || "—"}
								</div>
								<div style={{ fontSize: "12px", color: "#999", fontFamily: "monospace" }}>
									ID: {u.id ? `${u.id.substring(0, 8)}...` : "—"}
								</div>
							</div>
							<div style={{ color: "#666" }}>{u.email || "—"}</div>
							<div>
								<span className={u.role === "admin" ? styles.badgeAdmin : styles.badgeUser}>
									{u.role === "admin" ? "Admin" : "User"}
								</span>
							</div>
							<div style={{ fontSize: "13px", color: "#666" }}>
								{u.createdAt 
									? new Date(u.createdAt).toLocaleDateString('vi-VN', {
										year: 'numeric',
										month: '2-digit',
										day: '2-digit',
										hour: '2-digit',
										minute: '2-digit'
									})
									: "—"
								}
							</div>
							<div className={styles.actions}>
								{u.role === "admin" ? (
									<button
										className={`${styles.button} ${styles.buttonIcon}`}
										onClick={() => revokeAdmin(u.id)}
										title="Thu hồi quyền admin"
									>
										<FiUserX /> Thu hồi
									</button>
								) : (
									<button
										className={`${styles.button} ${styles.buttonIcon}`}
										onClick={() => promoteToAdmin(u.id)}
										title="Cấp quyền admin"
									>
										<FiUserCheck /> Cấp quyền
									</button>
								)}
								<button
									className={`${styles.button} ${styles.danger} ${styles.buttonIcon}`}
									onClick={() => deleteUser(u.id)}
									title="Xóa người dùng"
								>
									<FiTrash2 /> {deleteConfirm === u.id ? "Xác nhận?" : "Xóa"}
								</button>
							</div>
						</div>
					))
				)}
			</div>
		</section>
	);
}


