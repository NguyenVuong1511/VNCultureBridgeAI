import { useEffect, useMemo, useState } from "react";
import { FiSearch, FiX, FiEdit2, FiTrash2, FiEye, FiSave, FiXCircle } from "react-icons/fi";
import styles from "./Admin.module.css";
import { 
    getRegions, 
    getCategories, 
    getRegionItems, 
    upsertRegionItem, 
    deleteRegionItem 
} from "../../utils/regions";

export default function PostsPanel() {
    const [selectedRegion, setSelectedRegion] = useState("Northern Vietnam");
    const [selectedCategory, setSelectedCategory] = useState("destinations");
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [editingId, setEditingId] = useState(null);
    
    // Form fields
    const [itemId, setItemId] = useState("");
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [content, setContent] = useState("");
    const [images, setImages] = useState("");
    const [highlights, setHighlights] = useState("");
    const [tips, setTips] = useState("");
    const [location, setLocation] = useState("");

    const regions = getRegions();
    const categories = getCategories();

    useEffect(() => {
        loadItems();
        setEditingId(null);
        resetForm();
    }, [selectedRegion, selectedCategory]);

    const loadItems = () => {
        const loaded = getRegionItems(selectedRegion, selectedCategory);
        setItems(loaded);
    };

    const filteredItems = useMemo(() => {
        if (!searchTerm.trim()) return items;
        const term = searchTerm.toLowerCase();
        return items.filter(
            (item) =>
                (item.name || item.title || "").toLowerCase().includes(term) ||
                (item.description || "").toLowerCase().includes(term) ||
                (item.id || "").toLowerCase().includes(term)
        );
    }, [items, searchTerm]);

    const canSave = useMemo(() => {
        // Kiểm tra: Phải có (Name hoặc Title) VÀ Description
        return (name.trim() || title.trim()) && description.trim();
    }, [name, title, description]);

    const resetForm = () => {
        setItemId("");
        setName("");
        setTitle("");
        setDescription("");
        setImage("");
        setContent("");
        setImages("");
        setHighlights("");
        setTips("");
        setLocation("");
        setEditingId(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!canSave) return;

        // 1. Logic Validation URL mới
        if (image.trim()) {
            // Regex: Chấp nhận bắt đầu bằng http://, https:// HOẶC /img/
            const imgRegex = /^(https?:\/\/|\/img\/).+/;
            if (!imgRegex.test(image.trim())) {
                alert("Lỗi: Đường dẫn ảnh phải bắt đầu bằng 'http://', 'https://' hoặc '/img/'");
                return;
            }
        }

        // Parse images JSON
        let parsedImages = undefined;
        if (images.trim()) {
            try {
                parsedImages = JSON.parse(images.trim());
            } catch (e) {
                alert("Lỗi: Images phải là JSON hợp lệ. Vui lòng kiểm tra lại.");
                return;
            }
        }

        const item = {
            id: itemId.trim() || undefined,
            name: name.trim() || undefined,
            title: title.trim() || undefined,
            description: description.trim(),
            image: image.trim() || undefined,
            content: content.trim() ? (Array.isArray(content.trim().split('\n')) ? content.trim().split('\n').filter(l => l.trim()) : content.trim()) : undefined,
            images: parsedImages,
            highlights: highlights.trim() ? highlights.trim().split('\n').filter(l => l.trim()) : undefined,
            tips: tips.trim() ? tips.trim().split('\n').filter(l => l.trim()) : undefined,
            location: location.trim() || undefined,
        };

        // Remove undefined fields
        Object.keys(item).forEach(key => {
            if (item[key] === undefined) delete item[key];
        });

        const updated = upsertRegionItem(selectedRegion, selectedCategory, item);
        setItems(updated);
        resetForm();
    };

    const handleDelete = (id) => {
        if (deleteConfirm === id) {
            const updated = deleteRegionItem(selectedRegion, selectedCategory, id);
            setItems(updated);
            setDeleteConfirm(null);
        } else {
            setDeleteConfirm(id);
        }
    };

    const handleEdit = (item) => {
        setItemId(item.id || "");
        setName(item.name || "");
        setTitle(item.title || "");
        setDescription(item.description || "");
        setImage(item.image || "");
        setContent(item.content ? (Array.isArray(item.content) ? item.content.join('\n') : item.content) : "");
        setImages(item.images ? JSON.stringify(item.images, null, 2) : "");
        setHighlights(item.highlights ? (Array.isArray(item.highlights) ? item.highlights.join('\n') : item.highlights) : "");
        setTips(item.tips ? (Array.isArray(item.tips) ? item.tips.join('\n') : item.tips) : "");
        setLocation(item.location || "");
        setEditingId(item.id);
        document.querySelector(`.${styles.form}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const getDisplayName = (item) => {
        return item.name || item.title || "Untitled";
    };

    const getItemUrl = (item) => {
        const regionSlug = selectedRegion.toLowerCase().replace(/\s+/g, "-");
        const itemSlug = item.id || (item.name || item.title || "").toLowerCase().replace(/\s+/g, "-");
        return `/places-to-go/${regionSlug}/${selectedCategory}/${itemSlug}`;
    };

    return (
        <section className={styles.card}>
            <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Quản lý bài viết các miền</h2>
                <span className={styles.count}>{items.length}</span>
            </div>

            <div className={styles.filterForm}>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Chọn Region</label>
                    <select className={styles.input} value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
                        {regions.map((r) => (
                            <option key={r} value={r}>{r}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Chọn Category</label>
                    <select className={styles.input} value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        {categories.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
                {editingId && (
                    <div className={styles.editBanner}>
                        <span className={styles.editBannerText}>✏️ Đang chỉnh sửa: <strong>{editingId}</strong></span>
                        <button type="button" className={`${styles.button} ${styles.buttonCancel}`} onClick={resetForm}>
                            <FiXCircle /> Hủy chỉnh sửa
                        </button>
                    </div>
                )}

                <div className={styles.formSection}>
                    <div className={styles.formSectionTitle}>Thông tin cơ bản</div>
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>ID (tùy chọn)</label>
                            <input className={styles.input} placeholder="item-id" value={itemId} onChange={(e) => setItemId(e.target.value)} />
                        </div>
                        
                        {/* 2. Logic Hiển thị thông minh: Destinations hiện Name, còn lại hiện Title */}
                        {selectedCategory === 'destinations' ? (
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Name (Tên điểm đến) *</label>
                                <input className={styles.input} placeholder="Ví dụ: Ho Chi Minh City" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                        ) : (
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Title (Tiêu đề bài viết) *</label>
                                <input className={styles.input} placeholder="Ví dụ: Top 10 món ăn..." value={title} onChange={(e) => setTitle(e.target.value)} />
                            </div>
                        )}
                    </div>

                    <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
                        <label className={styles.formLabel}>Mô tả *</label>
                        <textarea className={`${styles.input} ${styles.textarea}`} placeholder="Mô tả ngắn gọn" value={description} onChange={(e) => setDescription(e.target.value)} required style={{ minHeight: "80px" }} />
                    </div>
                    
                    {/* 3. Đã sửa input hình ảnh sang type="text" */}
                    <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
                        <label className={styles.formLabel}>Hình ảnh (URL hoặc /img/...)</label>
                        <input 
                            className={styles.input} 
                            placeholder="https://example.com/img.jpg hoặc /img/ten-file.jpg" 
                            value={image} 
                            onChange={(e) => setImage(e.target.value)} 
                            type="text" 
                        />
                    </div>
                </div>

                <div className={styles.formSection}>
                    <div className={styles.formSectionTitle}>Nội dung chi tiết (tùy chọn)</div>
                    <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
                        <label className={styles.formLabel}>Content (mỗi dòng là một đoạn)</label>
                        <textarea className={`${styles.input} ${styles.textarea}`} placeholder="Nội dung chi tiết, mỗi dòng là một đoạn" value={content} onChange={(e) => setContent(e.target.value)} />
                    </div>
                    <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
                        <label className={styles.formLabel}>Images (JSON array)</label>
                        <textarea className={`${styles.input} ${styles.textarea}`} placeholder='[{"src": "/img/1.jpg", "alt": "Alt text", "caption": "Caption"}]' value={images} onChange={(e) => setImages(e.target.value)} style={{ fontFamily: "monospace", fontSize: "12px" }} />
                    </div>
                    <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
                        <label className={styles.formLabel}>Highlights (mỗi dòng một highlight)</label>
                        <textarea className={`${styles.input} ${styles.textarea}`} placeholder="Highlight 1&#10;Highlight 2" value={highlights} onChange={(e) => setHighlights(e.target.value)} />
                    </div>
                    <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
                        <label className={styles.formLabel}>Tips (mỗi dòng một tip)</label>
                        <textarea className={`${styles.input} ${styles.textarea}`} placeholder="Tip 1&#10;Tip 2" value={tips} onChange={(e) => setTips(e.target.value)} />
                    </div>
                    <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
                        <label className={styles.formLabel}>Location</label>
                        <input className={styles.input} placeholder="Vị trí" value={location} onChange={(e) => setLocation(e.target.value)} />
                    </div>
                </div>

                <div className={styles.formActions}>
                    {editingId && (
                        <button type="button" className={`${styles.button} ${styles.buttonCancel}`} onClick={resetForm}>
                            <FiXCircle /> Hủy
                        </button>
                    )}
                    <button className={`${styles.button} ${styles.buttonPrimary}`} type="submit" disabled={!canSave}>
                        <FiSave /> {editingId ? "Cập nhật" : "Thêm mới"}
                    </button>
                </div>
            </form>

            <div className={styles.searchContainer}>
                <div className={styles.searchBox}>
                    <FiSearch className={styles.searchIcon} />
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="Tìm kiếm theo tên, tiêu đề hoặc mô tả..."
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
                <div className={`${styles.row_posts} ${styles.rowHead}`}>
                    <div>ID</div>
                    <div>Tên / Tiêu đề</div>
                    <div>Mô tả</div>
                    <div>Ngày tạo</div>
                    <div className={styles.actionsCol}>Thao tác</div>
                </div>
                {filteredItems.length === 0 ? (
                    <div className={styles.row_posts}>
                        <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px", color: "#999" }}>
                            {searchTerm ? "Không tìm thấy item nào" : "Chưa có item nào. Hãy thêm mới."}
                        </div>
                    </div>
                ) : (
                    filteredItems.map((item) => (
                        <div key={item.id} className={styles.row_posts}>
                            <div style={{ fontWeight: 600, color: "#333" }}>{item.id}</div>
                            <div>
                                <div style={{ fontWeight: 500, color: "#333", marginBottom: "4px" }}>
                                    {getDisplayName(item)}
                                </div>
                                {item.image && (
                                    <div style={{ fontSize: "12px", color: "#999", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                        📷 {item.image}
                                    </div>
                                )}
                            </div>
                            <div style={{ fontSize: "13px", color: "#666", maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {item.description || "—"}
                            </div>
                            <div style={{ fontSize: "12px", color: "#999" }}>
                                {item.created_at ? new Date(item.created_at).toLocaleDateString('vi-VN') : "—"}
                            </div>
                            <div className={styles.actions}>
                                <a className={`${styles.button} ${styles.buttonIcon}`} href={getItemUrl(item)} target="_blank" rel="noopener noreferrer" title="Xem bài viết">
                                    <FiEye /> Xem
                                </a>
                                <button className={`${styles.button} ${styles.buttonIcon}`} onClick={() => handleEdit(item)} title="Chỉnh sửa">
                                    <FiEdit2 /> Sửa
                                </button>
                                <button
                                    className={`${styles.button} ${styles.danger} ${styles.buttonIcon}`}
                                    onClick={() => handleDelete(item.id)}
                                    title="Xóa"
                                >
                                    <FiTrash2 /> {deleteConfirm === item.id ? "Xác nhận?" : "Xóa"}
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}