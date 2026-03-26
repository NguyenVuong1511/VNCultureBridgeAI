import { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
	FiHome, 
	FiUsers, 
	FiFileText, 
	FiStar, 
	FiSearch, 
	FiMaximize2, 
	FiBell, 
	FiMessageCircle,
	FiChevronDown,
	FiMenu,
	FiChevronRight,
	FiArrowLeft
} from "react-icons/fi";
import styles from "../components/admin/Admin.module.css";
import UsersPanel from "../components/admin/UsersPanel";
import PostsPanel from "../components/admin/PostsPanel";
import RatingsPanel from "../components/admin/RatingsPanel";
import { getRegions, getCategories, getRegionItems } from "../utils/regions";

export default function Admin() {
	const navigate = useNavigate();

	const currentUser = useMemo(() => {
		const raw = localStorage.getItem("CurrentAcc");
		return raw ? JSON.parse(raw) : null;
	}, []);

	const isAdmin = useMemo(() => {
		if (!currentUser) return false;
		return currentUser.role === "admin";
	}, [currentUser]);

	useEffect(() => {
		if (!isAdmin) {
			navigate("/signin", { replace: true });
		}
	}, [isAdmin, navigate]);

	const handleSignOut = () => {
		localStorage.removeItem("CurrentAcc");
		localStorage.removeItem("AccessToken");
		navigate("/", { replace: true });
	};

	const [activeTab, setActiveTab] = useState("dashboard");
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [showUserMenu, setShowUserMenu] = useState(false);
	const userMenuRef = useRef(null);

	const stats = useMemo(() => {
		const users = JSON.parse(localStorage.getItem("User") || "[]");
		const ratings = JSON.parse(localStorage.getItem("Ratings") || "[]");
		let totalPosts = 0;
		const regions = getRegions();
		const categories = getCategories();
		regions.forEach(region => {
			categories.forEach(category => {
				totalPosts += getRegionItems(region, category).length;
			});
		});
		return {
			users: users.length,
			posts: totalPosts,
			ratings: ratings.length
		};
	}, [activeTab]);

	useEffect(() => {
		const checkMobile = () => {
			const mobile = window.innerWidth <= 768;
			setIsMobile(mobile);
			setSidebarOpen(!mobile);
		};
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (showUserMenu && userMenuRef.current && !userMenuRef.current.contains(e.target)) {
				setShowUserMenu(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [showUserMenu]);

	if (!isAdmin) return null;

	return (
		<div className={styles.page}>
			{/* Sidebar */}
			<aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
				<div className={styles.sidebarHeader}>
					<div className={styles.logo}>
						<span className={styles.logoText}>ADMIN PAGE</span>
					</div>
				</div>
				
				<nav className={styles.nav}>
					<div className={styles.navSection}>
						<div className={styles.navLabel}>Navigation</div>
						
						<button 
							className={`${styles.navLink} ${activeTab === "dashboard" ? styles.navLinkActive : ""}`}
							onClick={() => {
								setActiveTab("dashboard");
								if (isMobile) setSidebarOpen(false);
							}}
						>
							<FiHome className={styles.navIcon} />
							<span>Dashboard</span>
							<FiChevronRight className={styles.navArrow} />
						</button>

						<button 
							className={`${styles.navLink} ${activeTab === "users" ? styles.navLinkActive : ""}`}
							onClick={() => {
								setActiveTab("users");
								if (isMobile) setSidebarOpen(false);
							}}
						>
							<FiUsers className={styles.navIcon} />
							<span>Người dùng</span>
							<FiChevronRight className={styles.navArrow} />
						</button>

						<button 
							className={`${styles.navLink} ${activeTab === "posts" ? styles.navLinkActive : ""}`}
							onClick={() => {
								setActiveTab("posts");
								if (isMobile) setSidebarOpen(false);
							}}
						>
							<FiFileText className={styles.navIcon} />
							<span>Bài viết</span>
							<FiChevronRight className={styles.navArrow} />
						</button>

						<button 
							className={`${styles.navLink} ${activeTab === "ratings" ? styles.navLinkActive : ""}`}
							onClick={() => {
								setActiveTab("ratings");
								if (isMobile) setSidebarOpen(false);
							}}
						>
							<FiStar className={styles.navIcon} />
							<span>Đánh giá</span>
							<FiChevronRight className={styles.navArrow} />
						</button>
					</div>
				</nav>
			</aside>

			{/* Overlay for mobile */}
			{sidebarOpen && isMobile && (
				<div className={styles.overlay} onClick={() => setSidebarOpen(false)} />
			)}

			{/* Main Content Area */}
			<div className={styles.contentWrapper}>
				{/* Header */}
				<header className={styles.header}>
					<div className={styles.headerLeft}>
						<button className={styles.menuButton} onClick={() => setSidebarOpen(!sidebarOpen)}>
							<FiMenu />
						</button>
						<div className={styles.breadcrumb}>
							<FiHome className={styles.breadcrumbIcon} />
							<span> / {activeTab === "dashboard" ? "Dashboard" : activeTab === "users" ? "Người dùng" : activeTab === "posts" ? "Bài viết" : "Đánh giá"}</span>
						</div>
						<button 
							className={styles.homeButton}
							onClick={() => navigate("/")}
							title="Return to the homepage"
						>
							<FiArrowLeft />
							<span>BACK TO HOME</span>
						</button>
					</div>
					
					<div className={styles.headerRight}>
						<button className={styles.headerIcon}>
							<FiSearch />
						</button>
						<button className={styles.headerIcon}>
							<FiMaximize2 />
						</button>
						<button className={styles.headerIcon}>
							<FiBell />
							<span className={styles.badge}>5</span>
						</button>
						<button className={styles.headerIcon}>
							<FiMessageCircle />
							<span className={`${styles.badge} ${styles.badgeGreen}`}>3</span>
						</button>
						<div className={styles.userProfile} ref={userMenuRef}>
							<button 
								className={styles.userProfileButton}
								onClick={() => setShowUserMenu(!showUserMenu)}
							>
								{currentUser?.avatar ? (
									<img 
										src={currentUser.avatar} 
										alt={currentUser.username || "User"} 
										className={styles.userProfileAvatar}
										onError={(e) => {
											e.target.style.display = 'none';
											e.target.nextSibling.style.display = 'flex';
										}}
									/>
								) : null}
								<div 
									className={styles.userProfileAvatarPlaceholder}
									style={{ display: currentUser?.avatar ? 'none' : 'flex' }}
								>
									{(currentUser?.username || currentUser?.email || "A")[0].toUpperCase()}
								</div>
								<div className={styles.userInfo}>
									<span className={styles.userName}>{currentUser?.username || currentUser?.email || "Admin"}</span>
									<span className={styles.userRole}>
										{currentUser?.role === "admin" ? "Administrator" : "User"}
									</span>
								</div>
								<FiChevronDown className={`${styles.userDropdown} ${showUserMenu ? styles.userDropdownRotate : ""}`} />
							</button>
							{showUserMenu && (
								<div className={styles.userDropdownMenu}>
									<div className={styles.dropdownHeader}>
										<div className={styles.dropdownUserInfo}>
											<span className={styles.dropdownUserName}>{currentUser?.username || currentUser?.email || "Admin"}</span>
											<span className={styles.dropdownUserEmail}>{currentUser?.email || ""}</span>
										</div>
									</div>
									<hr className={styles.dropdownDivider} />
									<button 
										className={styles.dropdownItem} 
										onClick={() => {
											navigate("/profile");
											setShowUserMenu(false);
										}}
									>
										<FiUsers /> Profile
									</button>
									<button 
										className={styles.dropdownItem} 
										onClick={() => {
											navigate("/");
											setShowUserMenu(false);
										}}
									>
										<FiHome /> Home
									</button>
									<hr className={styles.dropdownDivider} />
									<button 
										className={`${styles.dropdownItem} ${styles.dropdownItemDanger}`} 
										onClick={() => {
											handleSignOut();
											setShowUserMenu(false);
										}}
									>
										Sign Out
									</button>
								</div>
							)}
						</div>
					</div>
				</header>

				{/* Main Content */}
				<main className={styles.main}>
					<div className={styles.pageTitle}>
						{activeTab === "dashboard" && <FiHome className={styles.pageTitleIcon} />}
						{activeTab === "users" && <FiUsers className={styles.pageTitleIcon} />}
						{activeTab === "posts" && <FiFileText className={styles.pageTitleIcon} />}
						{activeTab === "ratings" && <FiStar className={styles.pageTitleIcon} />}
						<h1>
							{activeTab === "dashboard" ? "Dashboard" : activeTab === "users" ? "Quản lý người dùng" : activeTab === "posts" ? "Quản lý bài viết" : "Quản lý đánh giá"}
						</h1>
					</div>
					<p className={styles.pageSubtitle}>
						{activeTab === "dashboard" ? "Tổng quan hệ thống và thống kê" : activeTab === "users" ? "Quản lý tài khoản người dùng và phân quyền" : activeTab === "posts" ? "Quản lý nội dung bài viết theo chủ đề" : "Xem và quản lý đánh giá từ người dùng"}
					</p>

					{activeTab === "dashboard" && (
						<div className={styles.dashboardContent}>
							{/* Stats Cards */}
							<div className={styles.statsGrid}>
								<div className={styles.statCard}>
									<div className={styles.statIconWrapper}>
										<div className={styles.statIcon}>
											<FiUsers />
										</div>
									</div>
									<div className={styles.statInfo}>
										<h3>Tổng người dùng</h3>
										<p className={styles.statValue}>{stats.users}</p>
										<span className={styles.statChange}>+12% so với tháng trước</span>
									</div>
								</div>
								<div className={styles.statCard}>
									<div className={styles.statIconWrapper}>
										<div className={styles.statIcon}>
											<FiFileText />
										</div>
									</div>
									<div className={styles.statInfo}>
										<h3>Tổng bài viết</h3>
										<p className={styles.statValue}>{stats.posts}</p>
										<span className={styles.statChange}>+8% so với tháng trước</span>
									</div>
								</div>
								<div className={styles.statCard}>
									<div className={styles.statIconWrapper}>
										<div className={styles.statIcon}>
											<FiStar />
										</div>
									</div>
									<div className={styles.statInfo}>
										<h3>Tổng đánh giá</h3>
										<p className={styles.statValue}>{stats.ratings}</p>
										<span className={styles.statChange}>+15% so với tháng trước</span>
									</div>
								</div>
							</div>

							{/* Dashboard Grid */}
							<div className={styles.dashboardGrid}>
								{/* Recent Activity */}
								<div className={styles.dashboardCard}>
									<div className={styles.cardHeader}>
										<h2 className={styles.cardTitle}>Hoạt động gần đây</h2>
									</div>
									<div className={styles.activityList}>
										<div className={styles.activityItem}>
											<div className={styles.activityIcon}>
												<FiUsers />
											</div>
											<div className={styles.activityContent}>
												<p className={styles.activityText}>Người dùng mới đã đăng ký</p>
												<span className={styles.activityTime}>2 giờ trước</span>
											</div>
										</div>
										<div className={styles.activityItem}>
											<div className={styles.activityIcon}>
												<FiFileText />
											</div>
											<div className={styles.activityContent}>
												<p className={styles.activityText}>Bài viết mới đã được thêm</p>
												<span className={styles.activityTime}>5 giờ trước</span>
											</div>
										</div>
										<div className={styles.activityItem}>
											<div className={styles.activityIcon}>
												<FiStar />
											</div>
											<div className={styles.activityContent}>
												<p className={styles.activityText}>Đánh giá mới đã được gửi</p>
												<span className={styles.activityTime}>1 ngày trước</span>
											</div>
										</div>
									</div>
								</div>

								{/* Quick Actions */}
								<div className={styles.dashboardCard}>
									<div className={styles.cardHeader}>
										<h2 className={styles.cardTitle}>Thao tác nhanh</h2>
									</div>
									<div className={styles.quickActions}>
										<button 
											className={styles.quickActionBtn}
											onClick={() => setActiveTab("users")}
										>
											<FiUsers />
											<span>Quản lý người dùng</span>
										</button>
										<button 
											className={styles.quickActionBtn}
											onClick={() => setActiveTab("posts")}
										>
											<FiFileText />
											<span>Quản lý bài viết</span>
										</button>
										<button 
											className={styles.quickActionBtn}
											onClick={() => setActiveTab("ratings")}
										>
											<FiStar />
											<span>Quản lý đánh giá</span>
										</button>
									</div>
								</div>
							</div>

							{/* Summary Table */}
							<div className={styles.dashboardCard}>
								<div className={styles.cardHeader}>
									<h2 className={styles.cardTitle}>Tổng quan hệ thống</h2>
								</div>
								<div className={styles.summaryTable}>
									<div className={styles.summaryRow}>
										<div className={styles.summaryLabel}>Tổng số người dùng</div>
										<div className={styles.summaryValue}>{stats.users}</div>
									</div>
									<div className={styles.summaryRow}>
										<div className={styles.summaryLabel}>Tổng số bài viết</div>
										<div className={styles.summaryValue}>{stats.posts}</div>
									</div>
									<div className={styles.summaryRow}>
										<div className={styles.summaryLabel}>Tổng số đánh giá</div>
										<div className={styles.summaryValue}>{stats.ratings}</div>
									</div>
									<div className={styles.summaryRow}>
										<div className={styles.summaryLabel}>Tỷ lệ tương tác</div>
										<div className={styles.summaryValue}>
											{stats.users > 0 ? ((stats.ratings / stats.users) * 100).toFixed(1) : 0}%
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
					{activeTab === "users" && <UsersPanel />}
					{activeTab === "posts" && <PostsPanel />}
					{activeTab === "ratings" && <RatingsPanel />}
				</main>
			</div>
		</div>
	);
}